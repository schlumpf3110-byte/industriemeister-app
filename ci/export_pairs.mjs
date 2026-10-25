// Alle Prüf- und Lehrpaare als eine JSON-Datei (für das Nachtrainieren)
import fs from 'fs';
import {P} from './pairs.js';import {P2} from './pairs2.mjs';import {P3} from './pairs3.mjs';import {D4} from './pairs4.mjs';
let more=[];try{const m=await import('./pairs5.mjs');more=m.D5||[]}catch(e){}
try{const m=await import('./pairs6.mjs');more=more.concat(m.D6||[])}catch(e){}
const out=[];
for(const [a,b,y] of P)out.push({p:a,a:b,y,s:'p1'});
for(const [a,b,y] of P2)out.push({p:a,a:b,y,s:'p2'});
for(const [a,b,y] of P3)out.push({p:a,a:b,y,s:'p3'});
for(const [p,pos,neg] of [...D4,...more]){pos.forEach(a=>out.push({p,a,y:1,s:'d'}));neg.forEach(a=>out.push({p,a,y:0,s:'d'}))}
fs.writeFileSync('pairs_all.json',JSON.stringify(out));console.log(out.length,'Paare');
