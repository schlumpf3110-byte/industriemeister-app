// Destillation: Das große Modell (Gemma) ist Lehrer, das kleine (e5-small) Schüler. Hier werden nur die Vektoren beider Modelle für viele Fachtexte berechnet.
import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';import vm from 'vm';
import {P as PA} from './pairs.js';import {P2} from './pairs2.mjs';
env.allowLocalModels=false;
const W='../www/';const ctx={window:{},S:{},console,caches:undefined,fetch:undefined,save(){},atob:s=>Buffer.from(s,'base64').toString('binary')};ctx.window=ctx;vm.createContext(ctx);
let code='';for(const f of ['q_open.js','q_open_more.js','q_nachbau.js','q_parts.js','fachgespraech.js','appki.js','passages.js','theory.js'])code+=fs.readFileSync(W+f,'utf8')+'\n';
code+='this.__=[OPEN,NACHBAU,FG,AppKI,PASS,THEORY];';vm.runInContext(code,ctx);
const [OPEN,NACHBAU,FG,AppKI,PASS,THEORY]=ctx.__;
const points=new Set();
for(const q of [...OPEN,...NACHBAU]){(q.sol||[]).forEach(x=>points.add(x));(q.parts||[]).forEach(p=>(p.sol||[]).forEach(x=>points.add(x)))}
const cards=[];
for(const k of ['BT','FT','MT','KW','PS','AUG','PF','PE','QM']){try{const c2={window:{}};vm.createContext(c2);vm.runInContext(fs.readFileSync(W+'fc_'+k+'.js','utf8'),c2);for(const c of (c2.window.FC||{})[k]||[]){c.pts.forEach(x=>points.add(x));cards.push(c)}}catch(e){}}
for(const g of FG)for(const f of g.fragen)f.a.forEach(x=>points.add(x));
const ptxt=[...new Set([...points].flatMap(p=>AppKI.pointTexts(p)))].filter(t=>t.length>=4&&t.length<=200);
/* Sätze aus Skripten und Kartenantworten (so sehen auch Antwort-Abschnitte aus) */
const sents=new Set();const add=t=>String(t).split(/(?<=[.!?])\s+|;\s+/).map(x=>x.trim()).filter(x=>x.length>=25&&x.length<=220&&x.split(/\s+/).length>=4).forEach(x=>sents.add(x));
for(const k of Object.keys(THEORY))PASS.ofChapters('Theorie','',k,THEORY[k]).forEach(p=>add(p.txt));
for(const f of fs.readdirSync(W).filter(x=>/^tb_[A-Z]+\.js$/.test(x))){const c3={window:{}};vm.createContext(c3);vm.runInContext(fs.readFileSync(W+f,'utf8'),c3);const T=c3.window.TEXTBAND||{};for(const k of Object.keys(T))PASS.ofChapters('Textband','',k,T[k].ch).forEach(p=>add(p.txt))}
cards.forEach(c=>add(c.a));
let seed=12345;const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
const sl=[...sents];for(let i=sl.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[sl[i],sl[j]]=[sl[j],sl[i]]}
const MAXS=+process.env.MAXS||4500;
const train=[...new Set([...ptxt,...sl.slice(0,MAXS)])];
const evalT=[...new Set([...PA,...P2].flatMap(x=>[x[0],x[1]]))];
const texts=[...new Set([...train,...evalT])];
console.log('Punkte-Texte',ptxt.length,'Sätze',sents.size,'Training',train.length,'Prüfpaare-Texte',evalT.length,'gesamt',texts.length);
async function run(M,dt,pre,opts,file){const ext=await pipeline('feature-extraction',M,{dtype:dt,...opts});const t0=Date.now();const out=[];
  for(let i=0;i<texts.length;i+=16){const o=(await ext(texts.slice(i,i+16).map(t=>pre+t),{pooling:'mean',normalize:true})).tolist();out.push(...o);if((i/16)%40===0)console.log(file,i,Math.round((Date.now()-t0)/1000)+'s')}
  const d=out[0].length;const f=new Float32Array(texts.length*d);out.forEach((v,i)=>f.set(v,i*d));fs.writeFileSync(file,Buffer.from(f.buffer));return d}
const d1=await run('Xenova/multilingual-e5-small','q8','query: ',{},'e5.f32');
const d2=await run('onnx-community/embeddinggemma-300m-ONNX','q4','task: sentence similarity | query: ',{model_file_name:'model_no_gather',use_external_data_format:true},'gem.f32');
fs.writeFileSync('texts.json',JSON.stringify({texts,nTrain:train.length,d1,d2,pairs:[...PA.map(x=>[...x,'p1']),...P2.map(x=>[...x,'p2'])]}));
console.log('fertig');
