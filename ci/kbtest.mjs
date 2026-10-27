import {createRequire} from 'module';const require=createRequire('/opt/node-tools/node_modules/');const {chromium}=require('playwright');import fs from 'fs';
const Q=[
['Reihenfolge Sicherheitsregeln Arbeiten an Elektroanlagen','Nennen Sie die fünf Sicherheitsregeln'],
['wofür steht IP54','Wofür steht die Schutzart IP54'],
['wie lange darf ein Arbeitsvertrag befristet werden ohne Grund','Was gilt bei befristeten Arbeitsverträgen'],
['Kündigungsfrist Probezeit','Welche Kündigungsarten gibt es'],
['fristlose Kündigung Voraussetzungen','Welche Voraussetzungen hat die fristlose'],
['wann muss der Betriebsrat vor Kündigung gehört werden','Welche Rechte hat der Betriebsrat vor einer Kündigung'],
['Mindesturlaub bei Fünf-Tage-Woche','Welche Regeln gelten für Urlaub'],
['Mutterschutz Fristen vor und nach der Geburt','Welche Schutzfristen gelten nach dem Mutterschutzgesetz'],
['Lärm Auslösewerte 80 85 dB','Welche Auslösewerte gelten für Lärm'],
['was ist ein Beinaheunfall','Was ist ein Beinaheunfall'],
['Verfügbarkeit berechnen MTBF MTTR','Wie berechnet man die Verfügbarkeit'],
['Weibull Formparameter bedeutet','Was zeigt die Weibull-Verteilung'],
['Druckübersetzer Formel','Wie arbeitet ein Druckübersetzer'],
['Kapitalwertmethode erklären','Wie funktioniert die Kapitalwertmethode'],
['Annuität Formel Investition','Was ist die Annuitätenmethode'],
['Break-even-Menge ausrechnen','Wie berechnet man die Break-even-Menge'],
['Preisabweichung Mengenabweichung','Wie unterscheiden sich Preisabweichung'],
['Johnson Regel Reihenfolge zwei Maschinen','Was ist die Johnson-Regel'],
['Engpasstheorie Trommel Puffer Seil','Was besagt die Theory of Constraints'],
['OEE Berechnung','Wie berechnet man die Gesamtanlageneffektivität'],
['Bandwirkungsgrad Fließmontage','Wie berechnet man den Bandwirkungsgrad'],
['Passung H7 g6 Bedeutung','Wie ist ein ISO-Passungsmaß'],
['Drehzahl aus Schnittgeschwindigkeit ausrechnen','Wie berechnet man Schnittgeschwindigkeit und Drehzahl'],
['Cp Cpk Unterschied','Wie unterscheiden sich Cp und Cpk'],
['8D Report Schritte','Wie läuft ein 8D-Report ab'],
['Belbin Rollen','Welche Teamrollen beschreibt Belbin'],
['Kotter acht Schritte Wandel','Welche acht Schritte nennt Kotter'],
['Glasl Eskalation Stufen','Was zeigt das Eskalationsmodell von Glasl'],
['Kirkpatrick Bildungscontrolling','Wie beurteilt man den Erfolg einer Weiterbildung'],
['Beurteilungsfehler Halo','Welche Beurteilungsfehler treten häufig auf'],
['Abfallhierarchie Reihenfolge','Was besagt die fünfstufige Abfallhierarchie'],
['Brandklassen Löschmittel','Welche Brandklassen gibt es'],
['Wärme in Maschine verändert Genauigkeit CNC','Warum ist die thermische Verformung'],
['Rückfederung Biegen','Was ist Rückfederung beim Biegen'],
['Schraube streckgrenzengesteuert anziehen','Wie unterscheiden sich Anziehen nach Drehmoment'],
['Heijunka','Was bedeutet Heijunka'],
['Net Promoter Score','Was ist der Net Promoter Score'],
];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage();await p.route(/jsdelivr.*\.(wasm|mjs)$/,r=>{const f=r.request().url().split('/').pop();r.fulfill({body:fs.readFileSync('/tmp/ortw/package/dist/'+f),contentType:f.endsWith('wasm')?'application/wasm':'text/javascript'})});
p.on('pageerror',e=>console.log('E',e.message.slice(0,200)));
await p.goto('http://localhost:8765/');await p.waitForTimeout(1500);
const r=await p.evaluate(async Q=>{await AppKI.load();await ASK.ready();const out=[];
 for(const [q,t] of Q){const lex=ASK.search(q,{n:12});const s=await ASK.semantic(q,lex);const lst=(s||lex);const idx=lst.findIndex(e=>(e.p.q||'').startsWith(t));const li=lex.findIndex(e=>(e.p.q||'').startsWith(t));out.push({q,rank:idx,lex:li,top:(lst[0]?.p.q||lst[0]?.p.ch||'?').slice(0,60)})}return out},Q);
let ok1=0,ok3=0;for(const x of r){if(x.rank===0)ok1++;if(x.rank>=0&&x.rank<3)ok3++;console.log(x.rank,x.lex,x.q,x.rank!==0?'-> '+x.top:'')}
console.log('Top1',ok1,'Top3',ok3,'von',r.length);await b.close();
