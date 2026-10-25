// Prüft das verkleinerte, quantisierte Modell in transformers.js gegen die Referenz aus Python
import {pipeline,env} from '@huggingface/transformers';import fs from 'fs';import path from 'path';
env.allowRemoteModels=false;env.allowLocalModels=true;env.localModelPath=path.resolve('out')+'/';
const ext=await pipeline('feature-extraction','e5-ft',{dtype:'q8'});
const R=JSON.parse(fs.readFileSync('ft_ref.json','utf8'));let min=1,sum=0;
for(let i=0;i<R.texts.length;i+=16){const ch=R.texts.slice(i,i+16);const out=(await ext(ch.map(t=>'query: '+t),{pooling:'mean',normalize:true})).tolist();
  out.forEach((v,k)=>{const r=R.vecs[i+k];let c=0;for(let j=0;j<v.length;j++)c+=v[j]*r[j];min=Math.min(min,c);sum+=c})}
console.log('transformers.js q8 gegen Python fp32: Kosinus min',min.toFixed(4),'mittel',(sum/R.texts.length).toFixed(4));
