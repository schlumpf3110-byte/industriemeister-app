import {chromium} from 'playwright';
import {P} from './pairs.js';
import fs from 'fs';
const out={};
const b=await chromium.launch();const p=await b.newPage();
const logs=[];p.on('console',m=>logs.push(m.type()+': '+m.text().slice(0,200)));p.on('pageerror',e=>logs.push('pageerror: '+e.message.slice(0,300)));
await p.goto('http://localhost:8080/');await p.waitForTimeout(1500);
const CANDS=[{dtype:'q4'},{dtype:'q8'},{model:'Xenova/multilingual-e5-small',dtype:'q8',pre:'query: '}];
for(const c of CANDS){const key=(c.model||'gemma')+'@'+c.dtype;
  try{const r=await p.evaluate(async([c,P])=>{AppKI.configure(c);const t0=performance.now();await AppKI.load();const tl=performance.now()-t0;
    const rows=[];for(const [a,b,y] of P){rows.push({s:+(await AppKI.sim(a,b)).toFixed(3),y})}
    const t1=performance.now();const g=await AppKI.gradePoints(['Betriebsrat beteiligen (Mitbestimmung)','Anforderungsprofil der Stelle festlegen (fachlich, Führung, sozial)','Entscheidung allein nach Eignung, nicht nach Alter oder Geschlecht (AGG)'],'Zuerst schreibe ich auf, was der neue Schichtführer können muss. Dann hole ich den Betriebsrat mit ins Boot. Das Alter spielt keine Rolle.');
    return {loadMs:Math.round(tl),gradeMs:Math.round(performance.now()-t1),g,rows}},[c,P]);
    const pos=r.rows.filter(x=>x.y).map(x=>x.s),neg=r.rows.filter(x=>!x.y).map(x=>x.s);let best={acc:0};
    for(let th=0;th<1;th+=0.005){const tp=pos.filter(x=>x>=th).length/pos.length,tn=neg.filter(x=>x<th).length/neg.length;if((tp+tn)/2>best.acc)best={acc:+((tp+tn)/2).toFixed(3),th:+th.toFixed(3),tp:+tp.toFixed(2),tn:+tn.toFixed(2)}}
    out[key]={best,loadMs:r.loadMs,gradeMs:r.gradeMs,g:r.g,pos:pos.sort(),neg:neg.sort()};
  }catch(e){out[key]={error:String(e).slice(0,400)}}}
out.logs=logs.slice(-25);
fs.writeFileSync('browser.json',JSON.stringify(out,null,1));await b.close();
