import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';
env.allowLocalModels=false;
const MODELS=[['Xenova/multilingual-e5-small','query: ','q8'],['Xenova/multilingual-e5-base','query: ','q8'],['Xenova/paraphrase-multilingual-mpnet-base-v2','','q8'],['onnx-community/embeddinggemma-300m-ONNX','task: sentence similarity | query: ','q8'],['onnx-community/embeddinggemma-300m-ONNX','task: sentence similarity | query: ','q4']];
// [Lösungspunkt, Antwort des Prüflings, soll passen (1) oder nicht (0)]
const P=[
['Betriebsrat beteiligen (Mitbestimmung)','Ich hole den Betriebsrat mit ins Boot.',1],
['Betriebsrat beteiligen (Mitbestimmung)','Ich spreche mit dem Kunden über den Preis.',0],
['Anforderungsprofil der Stelle festlegen','Zuerst schreibe ich auf, was der neue Schichtführer können muss.',1],
['Anforderungsprofil der Stelle festlegen','Ich bestelle neue Werkzeuge.',0],
['Gefährdungsbeurteilung durchführen bzw. aktualisieren','Ich prüfe, welche Gefahren an der neuen Maschine entstehen, und dokumentiere das.',1],
['Gefährdungsbeurteilung durchführen bzw. aktualisieren','Die Maschine wird lackiert.',0],
['Unterweisung der Mitarbeiter vor Aufnahme der Tätigkeit, dokumentiert','Die Leute werden vorher eingewiesen und unterschreiben das.',1],
['Unterweisung der Mitarbeiter vor Aufnahme der Tätigkeit, dokumentiert','Ich mache Überstunden.',0],
['zuerst persönlich und unter vier Augen, vor der Bekanntgabe','Ich sage es ihm zuerst allein im Gespräch, bevor es die anderen erfahren.',1],
['zuerst persönlich und unter vier Augen, vor der Bekanntgabe','Ich hänge einen Zettel ans Schwarze Brett.',0],
['Leckagen orten (Ultraschall) und beseitigen','Undichte Stellen im Druckluftnetz suchen und abdichten.',1],
['Leckagen orten (Ultraschall) und beseitigen','Den Kompressor neu streichen.',0],
['Lastenheft: vom Auftraggeber erstellt – beschreibt WAS gefordert ist','Das Lastenheft schreibt der Kunde, darin steht was er will.',1],
['Pflichtenheft: vom Auftragnehmer erstellt – beschreibt WIE und WOMIT die Anforderungen umgesetzt werden','Im Pflichtenheft beschreibt der Lieferant, wie er es umsetzt.',1],
['Pflichtenheft: vom Auftragnehmer erstellt – beschreibt WIE und WOMIT die Anforderungen umgesetzt werden','Das Lastenheft schreibt der Kunde, darin steht was er will.',0],
['Entscheidung allein nach Eignung, nicht nach Alter oder Geschlecht (AGG)','Das Alter darf keine Rolle spielen, nur wer besser geeignet ist.',1],
['Entscheidung allein nach Eignung, nicht nach Alter oder Geschlecht (AGG)','Ich nehme den Jüngeren, weil er länger bleibt.',0],
['Ursachenanalyse mit dem Team (Ishikawa, 5-Why)','Wir suchen gemeinsam mit den Kollegen nach den Gründen für den Fehler.',1],
['Ursachenanalyse mit dem Team (Ishikawa, 5-Why)','Ich kaufe eine neue Kaffeemaschine.',0],
['Wertschätzung für Leistung und Erfahrung','Ich bedanke mich für seine gute Arbeit in den letzten Jahren.',1],
['Netzdruck auf das notwendige Maß absenken','Den Druck im Netz reduzieren, so weit es geht.',1],
['Netzdruck auf das notwendige Maß absenken','Mehr Druck geben, damit es schneller geht.',0],
['Regress der BG bei Vorsatz oder grober Fahrlässigkeit','Die Berufsgenossenschaft kann sich das Geld von mir zurückholen, wenn ich grob fahrlässig war.',1],
['Wärmerückgewinnung aus den Kompressoren (Heizung, Brauchwasser)','Mit der Abwärme der Kompressoren die Halle heizen.',1],
['Wärmerückgewinnung aus den Kompressoren (Heizung, Brauchwasser)','Die Halle mit Gas heizen.',0],
['Personalabteilung einbeziehen','Ich spreche das mit HR ab.',1],
['Personalabteilung einbeziehen','Ich frage den Kunden.',0],
['Fachkraft für Arbeitssicherheit und Betriebsarzt hinzuziehen','Ich hole die Sifa und den Werksarzt dazu.',1],
['Fachkraft für Arbeitssicherheit und Betriebsarzt hinzuziehen','Ich rufe den Lieferanten an.',0],
['Ziele und Termine vereinbaren und nachhalten','Wir legen fest, bis wann was erledigt ist, und ich kontrolliere das.',1],
['Ziele und Termine vereinbaren und nachhalten','Ich lasse die Leute machen.',0],
['Abmahnung als Voraussetzung für eine verhaltensbedingte Kündigung','Bevor ich ihm kündigen kann, muss er erst abgemahnt werden.',1],
['Abmahnung als Voraussetzung für eine verhaltensbedingte Kündigung','Ich kündige ihm sofort fristlos.',0],
['Schutzbrille und Gehörschutz bereitstellen (PSA)','Die Mitarbeiter bekommen Brillen und Ohrstöpsel.',1],
['Schutzbrille und Gehörschutz bereitstellen (PSA)','Die Mitarbeiter bekommen mehr Lohn.',0],
['Wartungsplan mit Intervallen erstellen','Ich lege fest, wann die Maschine regelmäßig gewartet wird.',1],
['Wartungsplan mit Intervallen erstellen','Wenn sie kaputt ist, reparieren wir sie.',0],
['Mitarbeiter frühzeitig informieren und beteiligen','Ich sage dem Team früh Bescheid und frage nach ihrer Meinung.',1],
['Mitarbeiter frühzeitig informieren und beteiligen','Das entscheide ich allein und sage es am Ende.',0],
['Kosten-Nutzen-Vergleich / Wirtschaftlichkeit prüfen','Ich rechne aus, ob sich die Investition lohnt.',1],
['Kosten-Nutzen-Vergleich / Wirtschaftlichkeit prüfen','Ich kaufe die teuerste Maschine.',0],
];
const out={};
for(const [M,pre,dt] of MODELS){const key=M+' '+dt;try{
  const t0=Date.now();const ext=await pipeline('feature-extraction',M,{dtype:dt});const tl=Date.now()-t0;
  const rows=[];
  for(const [a,b,y] of P){const e=await ext([pre+a,pre+b],{pooling:'mean',normalize:true});const [x,z]=e.tolist();const s=x.reduce((q,v,i)=>q+v*z[i],0);rows.push({s:+s.toFixed(3),y,a:a.slice(0,40),b:b.slice(0,50)})}
  const pos=rows.filter(r=>r.y).map(r=>r.s),neg=rows.filter(r=>!r.y).map(r=>r.s);
  let best={acc:0};for(let th=0;th<1;th+=0.005){const tp=pos.filter(x=>x>=th).length/pos.length,tn=neg.filter(x=>x<th).length/neg.length;const acc=(tp+tn)/2;if(acc>best.acc)best={acc:+acc.toFixed(3),th:+th.toFixed(3),tp:+tp.toFixed(2),tn:+tn.toFixed(2)}}
  // paarweise: richtige Antwort ähnlicher als falsche zum selben Punkt
  let pw=0,pn=0;const by={};rows.forEach(r=>{(by[r.a]=by[r.a]||[]).push(r)});for(const k in by){const P=by[k].filter(r=>r.y),N=by[k].filter(r=>!r.y);for(const p of P)for(const n of N){pn++;if(p.s>n.s)pw++}}
  const t1=Date.now();await ext(['Das ist ein kurzer Testsatz für die Messung der Geschwindigkeit.'],{pooling:'mean',normalize:true});
  out[key]={best,pairwise:+(pw/pn).toFixed(3),loadMs:tl,embedMs:Date.now()-t1,rows};
}catch(e){out[key]={error:String(e).slice(0,300)}}}
// Dateigrößen
for(const [M,,dt] of MODELS){try{const r=await fetch('https://huggingface.co/api/models/'+M+'/tree/main/onnx');const j=await r.json();out['size '+M]=j.map(f=>f.path+':'+Math.round(f.size/1e6)+'MB').join(', ')}catch(e){}}
fs.writeFileSync('calib.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out).slice(0,2000));
