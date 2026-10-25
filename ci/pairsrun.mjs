// Bewertungs-Test: Kosinus-Ähnlichkeit aller Prüfpaare für mehrere Modelle (roh gespeichert, Auswertung danach)
import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';
import {P} from './pairs.js';
import {P2} from './pairs2.mjs';
env.allowLocalModels=false;
const ALL=[...P.map(x=>[...x,'p1']),...P2.map(x=>[...x,'p2'])];
const MODELS=[['Xenova/multilingual-e5-small','q8','query: '],['Xenova/multilingual-e5-base','q8','query: '],['Xenova/paraphrase-multilingual-mpnet-base-v2','q8',''],['Xenova/paraphrase-multilingual-MiniLM-L12-v2','q8','']];
const out={n:ALL.length,pairs:ALL,res:{}};
for(const [M,dt,pre] of MODELS){const key=M.split('/')[1];
  try{const t0=Date.now();const ext=await pipeline('feature-extraction',M,{dtype:dt});const tl=Date.now()-t0;
    const texts=[...new Set(ALL.flatMap(x=>[x[0],x[1]]))];const E=new Map();
    const t1=Date.now();for(let i=0;i<texts.length;i+=16){const ch=texts.slice(i,i+16);const o=(await ext(ch.map(t=>pre+t),{pooling:'mean',normalize:true})).tolist();ch.forEach((t,k)=>E.set(t,o[k]))}
    const per=(Date.now()-t1)/texts.length;
    out.res[key]={loadMs:tl,msPerText:+per.toFixed(1),s:ALL.map(x=>+E.get(x[0]).reduce((a,v,k)=>a+v*E.get(x[1])[k],0).toFixed(4))};
  }catch(e){out.res[key]={error:String(e).slice(0,300)}}
  fs.writeFileSync('pairs.json',JSON.stringify(out));}
