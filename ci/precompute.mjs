// Berechnet die Vektoren aller Lösungspunkte mit demselben Modell wie auf dem Gerät
import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';import vm from 'vm';
env.allowLocalModels=false;
const W='../www/';const ctx={window:{},S:{},console,caches:undefined,fetch:undefined,save(){},atob:s=>Buffer.from(s,'base64').toString('binary')};ctx.window=ctx;vm.createContext(ctx);
let code='';for(const f of ['q_open.js','q_open_more.js','q_nachbau.js','q_parts.js','fachgespraech.js','appki.js'])code+=fs.readFileSync(W+f,'utf8')+'\n';
code+='this.__=[OPEN,NACHBAU,FG,AppKI];';vm.runInContext(code,ctx);
const [OPEN,NACHBAU,FG,AppKI]=ctx.__;const cfg=AppKI.cfg;const points=new Set();
for(const q of [...OPEN,...NACHBAU]){(q.sol||[]).forEach(x=>points.add(x));(q.parts||[]).forEach(p=>(p.sol||[]).forEach(x=>points.add(x)))}
for(const g of FG)for(const f of g.fragen)f.a.forEach(x=>points.add(x));
const texts=[...new Set([...points].flatMap(p=>AppKI.pointTexts(p)))];
console.log('points',points.size,'texts',texts.length);
const ext=await pipeline('feature-extraction',cfg.model,{dtype:cfg.dtype,...cfg.opts});
const items={};const t0=Date.now();
for(let i=0;i<texts.length;i+=32){const ch=texts.slice(i,i+32);const out=(await ext(ch.map(t=>cfg.pre+t),{pooling:'mean',normalize:true})).tolist();
  ch.forEach((t,k)=>{const v=out[k];const mx=Math.max(...v.map(Math.abs))||1;const sc=mx/127;const buf=Buffer.alloc(4+v.length);buf.writeFloatLE(sc,0);v.forEach((x,j)=>buf.writeInt8(Math.max(-127,Math.min(127,Math.round(x/sc))),4+j));items[t]=buf.toString('base64')})}
const model=cfg.model+'@'+cfg.dtype+(cfg.opts&&cfg.opts.model_file_name?'/'+cfg.opts.model_file_name:'');
fs.writeFileSync('appki-vec.json',JSON.stringify({model,items}));
console.log('done',texts.length,'in',Date.now()-t0,'ms size',fs.statSync('appki-vec.json').size);
