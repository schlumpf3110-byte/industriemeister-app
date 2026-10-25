// Berechnet die Vektoren aller Lösungspunkte mit demselben Modell wie auf dem Gerät
import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';import vm from 'vm';
env.allowLocalModels=false;
const W='../www/';const ctx={window:{},S:{},console,caches:undefined,fetch:undefined,save(){},atob:s=>Buffer.from(s,'base64').toString('binary')};ctx.window=ctx;vm.createContext(ctx);
let code='';for(const f of ['q_open.js','q_open_more.js','q_nachbau.js','q_parts.js','fachgespraech.js','appki.js','passages.js','theory.js'])code+=fs.readFileSync(W+f,'utf8')+'\n';
code+='this.__=[OPEN,NACHBAU,FG,AppKI,PASS,THEORY];';vm.runInContext(code,ctx);
const [OPEN,NACHBAU,FG,AppKI,PASS,THEORY]=ctx.__;
if(process.env.KI_MODE)AppKI.configure({...AppKI.PRESETS[process.env.KI_MODE],...(process.env.KI_PREPASS?{prePass:process.env.KI_PREPASS}:{})});
const cfg=AppKI.cfg;if(cfg.local){env.allowLocalModels=true;env.allowRemoteModels=false;env.localModelPath=new URL('../www/models/',import.meta.url).pathname}
const points=new Set();
for(const q of [...OPEN,...NACHBAU]){(q.sol||[]).forEach(x=>points.add(x));(q.parts||[]).forEach(p=>(p.sol||[]).forEach(x=>points.add(x)))}
/* Karteikarten-Lösungspunkte */for(const k of ['BT','FT','MT','KW','PS','AUG','PF','PE','QM']){try{const c2={window:{}};vm.createContext(c2);vm.runInContext(fs.readFileSync(W+'fc_'+k+'.js','utf8'),c2);for(const c of (c2.window.FC||{})[k]||[])c.pts.forEach(x=>points.add(x))}catch(e){console.log('fc',k,e.message)}}
for(const g of FG)for(const f of g.fragen)f.a.forEach(x=>points.add(x));
const texts=[...new Set([...points].flatMap(p=>AppKI.pointTexts(p)))];
console.log('points',points.size,'texts',texts.length);
const ext=await pipeline('feature-extraction',cfg.model,{dtype:cfg.dtype,...cfg.opts});
const cfgR=cfg.ret||cfg;const extR=cfg.ret?await pipeline('feature-extraction',cfgR.model,{dtype:cfgR.dtype,...(cfgR.opts||{})}):ext;
const items={};const t0=Date.now();
for(let i=0;i<texts.length;i+=32){const ch=texts.slice(i,i+32);const out=(await ext(ch.map(t=>cfg.pre+t),{pooling:'mean',normalize:true})).tolist();
  ch.forEach((t,k)=>{const v=out[k];const mx=Math.max(...v.map(Math.abs))||1;const sc=mx/127;const buf=Buffer.alloc(4+v.length);buf.writeFloatLE(sc,0);v.forEach((x,j)=>buf.writeInt8(Math.max(-127,Math.min(127,Math.round(x/sc))),4+j));items[t]=buf.toString('base64')})}
const model=cfg.model+'@'+cfg.dtype+(cfg.opts&&cfg.opts.model_file_name?'/'+cfg.opts.model_file_name:'');
fs.writeFileSync('appki-vec.json',JSON.stringify({model,items}));
/* Textstellen für „Frag die App-KI“ (Sinn-Suche) */
const pass=[];
for(const k of Object.keys(THEORY))PASS.ofChapters('Theorie','',k,THEORY[k]).forEach(p=>pass.push(p));
for(const f of fs.readdirSync(W).filter(x=>/^tb_[A-Z]+\.js$/.test(x))){const c3={window:{}};vm.createContext(c3);vm.runInContext(fs.readFileSync(W+f,'utf8'),c3);const T=c3.window.TEXTBAND||{};for(const k of Object.keys(T))PASS.ofChapters('Textband','',k,T[k].ch).forEach(p=>pass.push(p))}
{const FCall={};for(const k of ['BT','FT','MT','KW','PS','AUG','PF','PE','QM']){try{const c2={window:{}};vm.createContext(c2);vm.runInContext(fs.readFileSync(W+'fc_'+k+'.js','utf8'),c2);FCall[k]=(c2.window.FC||{})[k]||[]}catch(e){}}PASS.ofCards(FCall).forEach(p=>pass.push(p))}
PASS.ofOpen(OPEN).forEach(p=>pass.push(p));
const ph={};for(const p of pass)ph[p.h]=PASS.embText(p);
const keys=Object.keys(ph);console.log('Textstellen',pass.length,'eindeutig',keys.length);
const pitems={};const t1=Date.now();
for(let i=0;i<keys.length;i+=24){const ch=keys.slice(i,i+24);const out=(await extR(ch.map(k=>(cfgR.prePass||cfgR.pre)+ph[k]),{pooling:'mean',normalize:true})).tolist();
  ch.forEach((k,j)=>{const v=out[j];const mx=Math.max(...v.map(Math.abs))||1;const sc=mx/127;const buf=Buffer.alloc(4+v.length);buf.writeFloatLE(sc,0);v.forEach((x,q)=>buf.writeInt8(Math.max(-127,Math.min(127,Math.round(x/sc))),4+q));pitems[k]=buf.toString('base64')});
  if(i%480===0)console.log('Textstellen',i,'/',keys.length,Date.now()-t1,'ms')}
const modelR=cfgR.model+'@'+cfgR.dtype+(cfgR.opts&&cfgR.opts.model_file_name?'/'+cfgR.opts.model_file_name:'');fs.writeFileSync('appki-pass.json',JSON.stringify({model:modelR,items:pitems}));console.log('appki-pass.json',fs.statSync('appki-pass.json').size,'Bytes');
console.log('done',texts.length,'in',Date.now()-t0,'ms size',fs.statSync('appki-vec.json').size);
