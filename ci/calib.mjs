import {pipeline,env} from '@huggingface/transformers';
import fs from 'fs';
env.allowLocalModels=false;
const MODELS=['Xenova/paraphrase-multilingual-MiniLM-L12-v2','Xenova/multilingual-e5-small'];
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
];
const out={};
for(const M of MODELS){try{
  const ext=await pipeline('feature-extraction',M,{dtype:'q8'});
  const pre=M.includes('e5')?'query: ':'';
  const rows=[];
  for(const [a,b,y] of P){const e=await ext([pre+a,pre+b],{pooling:'mean',normalize:true});const [x,z]=e.tolist();const s=x.reduce((q,v,i)=>q+v*z[i],0);rows.push({s:+s.toFixed(3),y,a:a.slice(0,40),b:b.slice(0,50)})}
  const pos=rows.filter(r=>r.y).map(r=>r.s),neg=rows.filter(r=>!r.y).map(r=>r.s);
  out[M]={rows,minPos:Math.min(...pos),maxNeg:Math.max(...neg),avgPos:pos.reduce((a,b)=>a+b)/pos.length,avgNeg:neg.reduce((a,b)=>a+b)/neg.length};
}catch(e){out[M]={error:String(e)}}}
fs.writeFileSync('calib.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out).slice(0,2000));
