// Bewertungs-Test, Teil 2: stärkere Prüfer (NLI-Modelle, größere Satz-Modelle, kleine Sprachmodelle als Richter) auf allen Prüfpaaren
import {pipeline,env,AutoTokenizer,AutoModelForCausalLM,AutoModelForSequenceClassification} from '@huggingface/transformers';
import fs from 'fs';
import {P} from './pairs.js';
import {P2} from './pairs2.mjs';
import {P3} from './pairs3.mjs';
env.allowLocalModels=false;
const ALL=[...P.map(x=>[...x,'p1']),...P2.map(x=>[...x,'p2']),...P3.map(x=>[...x,'p3'])];
const out={n:ALL.length,pairs:ALL,res:{}};const save=()=>fs.writeFileSync('pairs2.json',JSON.stringify(out));
const T=(k,fn)=>fn().then(r=>{out.res[k]=r;save()}).catch(e=>{out.res[k]={error:String(e).slice(0,300)};save()});
// 1) Satz-Modelle
const EMB=[['Xenova/multilingual-e5-small','q8','query: '],['Xenova/multilingual-e5-large','q8','query: ']];
for(const [M,dt,pre] of EMB)await T('emb:'+M.split('/')[1],async()=>{const t0=Date.now();const ext=await pipeline('feature-extraction',M,{dtype:dt});const tl=Date.now()-t0;const texts=[...new Set(ALL.flatMap(x=>[x[0],x[1]]))];const E=new Map();const t1=Date.now();
  for(let i=0;i<texts.length;i+=8){const ch=texts.slice(i,i+8);const o=(await ext(ch.map(t=>pre+t),{pooling:M.includes('bge')?'cls':'mean',normalize:true})).tolist();ch.forEach((t,k)=>E.set(t,o[k]))}
  return {loadMs:tl,msPerText:+((Date.now()-t1)/texts.length).toFixed(1),s:ALL.map(x=>+E.get(x[0]).reduce((a,v,k)=>a+v*E.get(x[1])[k],0).toFixed(4))}});
// 2) NLI: folgt der Lösungspunkt aus der Antwort?
const NLI=['onnx-community/multilingual-MiniLMv2-L6-mnli-xnli-ONNX','onnx-community/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7-ONNX'];
for(const M of NLI)await T('nli:'+M.split('/')[1],async()=>{const t0=Date.now();const tok=await AutoTokenizer.from_pretrained(M);let model;let dt='q8';try{model=await AutoModelForSequenceClassification.from_pretrained(M,{dtype:'q8'})}catch(e){dt='fp32';model=await AutoModelForSequenceClassification.from_pretrained(M)}
  const id2=model.config.id2label;const ent=Object.keys(id2).find(k=>/entail/i.test(id2[k])),con=Object.keys(id2).find(k=>/contra/i.test(id2[k]));const tl=Date.now()-t0;const t1=Date.now();const s=[],c=[];
  for(const [pt,an] of ALL){const inp=tok(an,{text_pair:pt,padding:true,truncation:true});const {logits}=await model(inp);const d=Array.from(logits.data);const mx=Math.max(...d);const e=d.map(x=>Math.exp(x-mx));const z=e.reduce((a,b)=>a+b,0);s.push(+(e[+ent]/z).toFixed(4));c.push(+(e[+con]/z).toFixed(4))}
  return {dtype:dt,labels:id2,loadMs:tl,msPerPair:+((Date.now()-t1)/ALL.length).toFixed(1),s,contra:c}});
// 3) kleine Sprachmodelle als Richter: Wahrscheinlichkeit für „Ja“
const LLM=[['onnx-community/Qwen2.5-1.5B-Instruct','q4'],['onnx-community/Qwen2.5-3B-Instruct','q4']];
for(const [M,dt] of LLM)await T('llm:'+M.split('/')[1],async()=>{const t0=Date.now();const tok=await AutoTokenizer.from_pretrained(M);const model=await AutoModelForCausalLM.from_pretrained(M,{dtype:dt});const tl=Date.now()-t0;
  const ja=tok.encode('Ja',{add_special_tokens:false})[0],nein=tok.encode('Nein',{add_special_tokens:false})[0];const t1=Date.now();const s=[];
  for(const [pt,an] of ALL){const msgs=[{role:'system',content:'Du bist ein strenger, fairer IHK-Prüfer für Industriemeister. Antworte nur mit Ja oder Nein.'},{role:'user',content:`Lösungspunkt: ${pt}\nAntwort des Prüflings: ${an}\n\nGibt die Antwort den Lösungspunkt inhaltlich richtig wieder (auch mit anderen Worten)? Eine Antwort, die dem Punkt widerspricht oder ein anderes Thema behandelt, gilt als Nein.`}];
    const inputs=tok.apply_chat_template(msgs,{add_generation_prompt:true,return_dict:true,...(M.includes('Qwen3')?{enable_thinking:false}:{})});const {logits}=await model(inputs);const V=logits.dims[2],off=(logits.dims[1]-1)*V;const a=logits.data[off+ja],b=logits.data[off+nein];s.push(+(a-b).toFixed(3))}
  return {dtype:dt,loadMs:tl,msPerPair:+((Date.now()-t1)/ALL.length).toFixed(1),s}});
