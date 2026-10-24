// Frage-Test: Wie gut finden die Modelle die richtige Textstelle zu Fragen in eigenen Worten?
import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';import vm from 'vm';
env.allowLocalModels=false;
const W='../www/';const ctx={window:{},S:{},console};ctx.window=ctx;vm.createContext(ctx);
let code='';for(const f of ['q_open.js','passages.js','theory.js'])code+=fs.readFileSync(W+f,'utf8')+'\n';
code+='this.__=[OPEN,PASS,THEORY];';vm.runInContext(code,ctx);const [OPEN,PASS,THEORY]=ctx.__;
const pass=[];
for(const k of Object.keys(THEORY))PASS.ofChapters('Theorie','',k,THEORY[k]).forEach(p=>pass.push(p));
for(const f of fs.readdirSync(W).filter(x=>/^tb_[A-Z]+\.js$/.test(x))){const c3={window:{}};vm.createContext(c3);vm.runInContext(fs.readFileSync(W+f,'utf8'),c3);const T=c3.window.TEXTBAND||{};for(const k of Object.keys(T))PASS.ofChapters('Textband','',k,T[k].ch).forEach(p=>pass.push(p))}
{const FCall={};for(const k of ['BT','FT','MT','KW','PS','AUG','PF','PE','QM']){try{const c2={window:{}};vm.createContext(c2);vm.runInContext(fs.readFileSync(W+'fc_'+k+'.js','utf8'),c2);FCall[k]=(c2.window.FC||{})[k]||[]}catch(e){}}PASS.ofCards(FCall).forEach(p=>pass.push(p))}
PASS.ofOpen(OPEN).forEach(p=>pass.push(p));
const seen=new Set(),P=pass.filter(p=>!seen.has(p.h)&&seen.add(p.h));
// Frage → erwartete Stichwörter (Treffer in Kapitel, Zwischenüberschrift oder Text der Stelle)
const Q=[
['Woran erkenne ich, ob meine Maschine genau genug fertigt?',/fähigkeit|cm\b|cmk|cpk/i],
['Wie viel Prozent der Arbeit ist in der Montage wirklich wertschöpfend?',/wirkungsgrad|primär/i],
['Was muss der Kunde aufschreiben, bevor ich ein Angebot mache?',/lastenheft/i],
['Wie verhindere ich, dass Mitarbeiter etwas falsch zusammenbauen?',/poka/i],
['Ab wann darf eine Maschine mit CE ausgeliefert werden?',/konformität|CE-|ce-kenn|einbauerkl/i],
['Welche Fehler soll ich zuerst abstellen?',/pareto/i],
['Wie viele Teile muss ich aus einer Lieferung prüfen?',/stichprobe|aql/i],
['Warum soll ich die Mitarbeiter am Anfang informieren?',/informier|beteilig|einbezieh|mitbestimm/i],
['Wie oft muss die Maschine gewartet werden?',/wartungs|inspektion|instandhaltung/i],
['Was passiert, wenn ich einem Mitarbeiter kündigen will, der ständig zu spät kommt?',/abmahn|kündig/i],
['Wie rechne ich aus, ob sich eine Investition lohnt?',/amortisation|investitions|kapitalwert|rendite|roi/i],
['Wie kommt es zu Qualitätsproblemen und wie suche ich die Ursache?',/ishikawa|ursache|5-why|5 why/i],
['Was ist der Unterschied zwischen Wartung und Instandsetzung?',/instandsetz|wartung/i],
['Wie schütze ich die Mitarbeiter vor Lärm?',/lärm|gehörschutz|stop-prinzip|tops?/i],
['Welche Schritte hat eine Gefährdungsbeurteilung?',/gefährdungsbeurteilung/i],
['Wann zahlt der Lieferant, wenn die Ware kaputt ankommt?',/gewährleistung|mängel|sachmangel|garantie|haftung/i],
['Wie verteile ich die Arbeit gleichmäßig auf die Stationen am Band?',/takt|leistungsabstimmung|taktabstimmung|stationen/i],
['Wie berechne ich die Drehzahl beim Drehen?',/drehzahl|schnittgeschwindigkeit/i],
['Was darf ich als Meister bei Überstunden nicht allein entscheiden?',/betriebsrat|überstunden|mitbestimmung/i],
['Wie erkenne ich, ob ein Prozess aus dem Ruder läuft?',/regelkarte|eingriffsgrenze|spc/i]];
const MODELS=[['Xenova/multilingual-e5-small','q8','query: ','passage: '],['Xenova/multilingual-e5-small','q8','query: ','query: '],['Xenova/multilingual-e5-base','q8','query: ','passage: ']];
const out={n:P.length,res:[]};
for(const [M,dt,pq,pp] of MODELS){const key=M.split('/')[1]+' '+pq.trim()+'/'+pp.trim();
  try{const t0=Date.now();const ext=await pipeline('feature-extraction',M,{dtype:dt});
  const texts=P.map(p=>PASS.embText(p));const V=[];
  for(let i=0;i<texts.length;i+=32){const o=(await ext(texts.slice(i,i+32).map(t=>pp+t),{pooling:'mean',normalize:true})).tolist();V.push(...o)}
  const tp=Date.now()-t0;const qv=(await ext(Q.map(q=>pq+q[0]),{pooling:'mean',normalize:true})).tolist();
  let top1=0,top3=0,top5=0;const rows=[];
  Q.forEach((q,qi)=>{const sc=V.map((v,i)=>[v.reduce((a,x,k)=>a+x*qv[qi][k],0),i]).sort((a,b)=>b[0]-a[0]);
    const ok=r=>q[1].test((P[sc[r][1]].ch||'')+' '+(P[sc[r][1]].sec||'')+' '+(P[sc[r][1]].q||'')+' '+P[sc[r][1]].txt);
    const h1=ok(0),h3=[0,1,2].some(ok),h5=[0,1,2,3,4].some(ok);top1+=h1;top3+=h3;top5+=h5;
    rows.push({q:q[0],s:+sc[0][0].toFixed(3),s5:+sc[4][0].toFixed(3),top:sc.slice(0,3).map(([s,i])=>P[i].src[0]+':'+(P[i].q||P[i].ch||'').slice(0,60)),h1,h3})});
  out.res.push({key,top1:top1/Q.length,top3:top3/Q.length,top5:top5/Q.length,msAll:tp,rows});
  }catch(e){out.res.push({key,error:String(e).slice(0,300)})}
  fs.writeFileSync('qa.json',JSON.stringify(out,null,1))}
console.log(JSON.stringify(out.res.map(r=>[r.key,r.top1,r.top3,r.top5,r.msAll,r.error])));
