import {chromium} from 'playwright';
import {P} from './pairs.js';
import {Q as Q1} from './qaset.mjs';
import {Q2} from './qaset2.mjs';
import {Q3} from './qaset3.mjs';
const Q=[...Q1,...Q2,...Q3];
const JUNK=['Rezept für Lasagne','Wer wird Fußball Weltmeister','Wie wird das Wetter morgen','Welche Aktien soll ich kaufen','Wie alt ist der Eiffelturm','Wo kann ich günstig Urlaub buchen','Wie funktioniert ein Smartphone Display','Was ist die Hauptstadt von Australien','Wie trainiere ich meinen Hund','Welche Farbe hat der Himmel','Wie lange dauert ein Marathon','Beste Pizza in Zürich'];
import fs from 'fs';
const out={};
const b=await chromium.launch();const logs=[];
const KM=process.env.KI_MODE;const CANDS=[KM?{__mode:KM,...(process.env.KI_PREPASS?{prePass:process.env.KI_PREPASS}:{})}:{}];
for(const c of CANDS){const key=(c.model||'gemma')+'@'+(c.dtype||'default')+(c.opts&&c.opts.model_file_name?'/'+c.opts.model_file_name:'');
  const p=await (await b.newContext()).newPage();p.on('console',m=>{if(m.type()==='error')logs.push(key+' '+m.text().slice(0,200))});p.on('pageerror',e=>logs.push(key+' pageerror: '+e.message.slice(0,300)));
  await p.goto('http://localhost:8080/');await p.waitForTimeout(1500);
  try{const r=await Promise.race([new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout 540s')),540000)),p.evaluate(async([c,P])=>{if(c.__mode){const {__mode,...rest}=c;AppKI.configure({...AppKI.PRESETS[__mode],...rest})}else AppKI.configure(c);const t0=performance.now();await AppKI.load(x=>{if(x.status==='done'||x.status==='ready')console.error('PROG '+x.status+' '+(x.file||''))});const tl=performance.now()-t0;
    const rows=[];for(const [a,b,y] of P){rows.push({s:+(await AppKI.sim(a,b)).toFixed(3),y})}
    const t1=performance.now();const g=await AppKI.gradePoints(['Betriebsrat beteiligen (Mitbestimmung)','Anforderungsprofil der Stelle festlegen (fachlich, Führung, sozial)','Entscheidung allein nach Eignung, nicht nach Alter oder Geschlecht (AGG)'],'Zuerst schreibe ich auf, was der neue Schichtführer können muss. Dann hole ich den Betriebsrat mit ins Boot. Das Alter spielt keine Rolle.');
    const g1=Math.round(performance.now()-t1);const t2=performance.now();
    const LONG='Zuerst schreibe ich auf, was der neue Schichtführer können muss. Dann hole ich den Betriebsrat mit ins Boot. Außerdem prüfe ich die Gefährdungen an der Maschine. Die Mitarbeiter werden vor Beginn unterwiesen und unterschreiben das. Das Alter spielt keine Rolle, nur die Eignung. Am Ende kontrolliere ich die Termine.';
    await AppKI.gradePoints(['Betriebsrat beteiligen','Gefährdungsbeurteilung durchführen','Unterweisung dokumentieren','Eignung statt Alter','Termine nachhalten'],LONG);const g2=Math.round(performance.now()-t2);
    return {loadMs:Math.round(tl),gradeMs:g1,gradeLongMs:g2,g,rows}},[c,P])]);
    const pos=r.rows.filter(x=>x.y).map(x=>x.s),neg=r.rows.filter(x=>!x.y).map(x=>x.s);let best={acc:0};
    for(let th=0;th<1;th+=0.005){const tp=pos.filter(x=>x>=th).length/pos.length,tn=neg.filter(x=>x<th).length/neg.length;if((tp+tn)/2>best.acc)best={acc:+((tp+tn)/2).toFixed(3),th:+th.toFixed(3),tp:+tp.toFixed(2),tn:+tn.toFixed(2)}}
    const qa=await p.evaluate(async Q=>{const r=[];await ASK.ready();let l1=0,l3=0,l5=0,s1=0,s3=0,s5=0,n1=0,n3=0,n5=0;
      for(const [q,rx] of Q){const re=new RegExp(rx,'i');const ok=h=>re.test((h.p.ch||'')+' '+(h.p.sec||'')+' '+(h.p.q||'')+' '+h.p.txt);const lexH=ASK.search(q,{n:8});const noH=ASK.search(q,{n:8,noAlt:true});const t0=performance.now();const sh=(await ASK.semantic(q,lexH))||[];const ms=Math.round(performance.now()-t0);
        const f=(a,k)=>a.slice(0,k).some(ok)?1:0;n1+=f(noH,1);n3+=f(noH,3);n5+=f(noH,5);l1+=f(lexH,1);l3+=f(lexH,3);l5+=f(lexH,5);s1+=f(sh,1);s3+=f(sh,3);s5+=f(sh,5);
        r.push({q,lex:lexH.slice(0,3).map(x=>(x.p.q||x.p.ch||'').slice(0,50)+' ['+x.p.src+']'),sem:sh.slice(0,3).map(x=>(x.p.q||x.p.ch||'').slice(0,50)+' ['+x.p.src+'] z'+(x.sem||0).toFixed(1)),ok1:f(sh,1),ms})}
      return {n:Q.length,lexOhneWoerterbuch:[n1,n3,n5],lex:[l1,l3,l5],sem:[s1,s3,s5],rows:r}},Q).catch(e=>String(e).slice(0,200));
    out.qa=qa;
    out.junk=await p.evaluate(async J=>{const r=[];for(const q of J){const lexH=ASK.search(q,{n:8});const sh=(await ASK.semantic(q,lexH))||[];r.push({q,lexN:lexH.length,lex1:lexH[0]?{c:+lexH[0].cov.toFixed(2),t:(lexH[0].p.q||lexH[0].p.ch||'').slice(0,50)}:null,semN:sh.length,sem1:sh[0]?{z:+(sh[0].sem||0).toFixed(2),c:+sh[0].cov.toFixed(2),t:(sh[0].p.q||sh[0].p.ch||'').slice(0,50)}:null})}return r},JUNK).catch(e=>String(e).slice(0,100));
    out.qv=await p.evaluate(async Q=>{const o={};for(const [q] of Q){const [v]=await AppKI.embedR([q]);o[q]=Array.from(v).map(x=>+x.toFixed(4))}return o},[...Q,...JUNK.map(x=>[x])]).catch(e=>String(e).slice(0,100));
    out[key]={best,loadMs:r.loadMs,gradeMs:r.gradeMs,gradeLongMs:r.gradeLongMs,g:r.g,pos:pos.sort(),neg:neg.sort(),cfg:await p.evaluate(()=>AppKI.cfg)};
  }catch(e){out[key]={error:String(e).slice(0,400)}}
  out.logs=logs.slice(-25);fs.writeFileSync('browser.json',JSON.stringify(out,null,1));await p.context().close()}
out.logs=logs.slice(-25);
fs.writeFileSync('browser.json',JSON.stringify(out,null,1));await b.close();
