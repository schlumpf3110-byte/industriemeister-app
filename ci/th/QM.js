{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
// Binomialverteilung für die OC-Kurve
const binom=(n,c,p)=>{let s=0,b=Math.pow(1-p,n);for(let k=0;k<=c;k++){s+=b;b*=(n-k)/(k+1)*p/(1-p)}return s};
const oc=(n,c,x0,y0,w,h,pmax)=>{let d='';for(let i=0;i<=60;i++){const p=pmax*i/60,y=binom(n,c,p/100);d+=(i?'L':'M')+(x0+w*p/pmax).toFixed(1)+','+(y0-h*y).toFixed(1)}return d};
// Normalverteilung: Fläche zwischen a und b (in Sigma)
const gy=(x,c,base,h)=>base-h*Math.exp(-x*x/2);
const area=(a,b,cx,base,h,s)=>{let d=`M${cx+a*s},${base}`;for(let i=0;i<=40;i++){const x=a+(b-a)*i/40;d+=`L${(cx+x*s).toFixed(1)},${gy(x,cx,base,h).toFixed(1)}`}return d+`L${cx+b*s},${base}Z`};
const gauss=(cx,base,h,s,lo,hi)=>{let d='';for(let i=0;i<=80;i++){const x=lo+(hi-lo)*i/80;d+=(i?'L':'M')+(cx+x*s).toFixed(1)+','+gy(x,cx,base,h).toFixed(1)}return d};
addTheory('QM',[
{t:'Qualität verstehen: Begriff, Kunde, Entwicklung der QM-Systeme',b:[
 {p:'Qualität ist der Grad, in dem ein Satz inhärenter Merkmale eines Objekts Anforderungen erfüllt (DIN EN ISO 9000:2015). Inhärent heißt: dem Objekt innewohnend, ständig. Anforderungen sind ausdrücklich festgelegte oder üblicherweise vorausgesetzte Erwartungen, etwa aus Gesetzen, Normen, Verträgen, Lasten- und Pflichtenheften.'},
 {tab:[['Merkmalsart','Beispiele'],['physisch','mechanisch, elektrisch, chemisch, biologisch'],['sensorisch','Geruch, Berührung, Geschmack, Optik, Akustik'],['verhaltensbezogen','Höflichkeit, Ehrlichkeit, Entgegenkommen'],['zeitbezogen','Pünktlichkeit, Zuverlässigkeit, Verfügbarkeit'],['funktional','Geschwindigkeit, Belastbarkeit']]},
 fig(520,250,
  ln(40,125,490,125,'sk-dim')+ln(265,18,265,232,'sk-dim')+
  t(265,12,'Zufriedenheit',{s:sm})+t(490,142,'Erfüllungsgrad',{s:sm,a:'end'})+
  path('M80,220 Q200,132 480,122','sk-l','stroke:var(--bad);stroke-width:2.5')+
  path('M80,208 L480,42','sk-l','stroke:var(--blue);stroke-width:2.5')+
  path('M80,120 Q300,114 480,24','sk-l','stroke:var(--ok);stroke-width:2.5')+
  t(470,112,'Basisanforderung',{s:sm,a:'end',c:'acc'}).replace('class="sk-t acc"','class="sk-t" style="font-size:12px;fill:var(--bad)"')+
  t(100,172,'Leistung',{s:sm,a:'start'}).replace('class="sk-t"','class="sk-t" style="font-size:12px;fill:var(--blue)"')+
  t(470,38,'Begeisterung',{s:sm,a:'end'}).replace('class="sk-t"','class="sk-t" style="font-size:12px;fill:var(--ok)"'),
  'Kano-Modell: Basisanforderungen verhindern nur Unzufriedenheit, Leistungsanforderungen wirken linear, Begeisterungsmerkmale heben die Zufriedenheit überproportional'),
 {ul:['Basis: selbstverständlich, nicht genannt, aber erwartet – Nichterfüllung führt zu großer Unzufriedenheit.','Leistung: konkret genannt – je mehr erfüllt, desto zufriedener.','Begeisterung: unerwartet – ihr Fehlen schadet nicht, ihr Vorhandensein begeistert.']},
 {h:'Von der Kontrolle zum integrierten Managementsystem'},
 fig(520,225,
  rect(8,150,98,60,'r')+ls(57,170,['Qualitäts-','kontrolle'],{s:sm})+t(57,203,'sortieren gut/schlecht',{s:'font-size:9.5px'})+
  rect(108,124,98,86,'y')+ls(157,144,['Qualitäts-','sicherung'],{s:sm})+t(157,190,'Prüfung in der',{s:'font-size:9.5px'})+t(157,202,'Fertigung',{s:'font-size:9.5px'})+
  rect(208,98,98,112,'y')+ls(257,118,['Qualitäts-','management'],{s:sm})+t(257,172,'strategische Aufgabe,',{s:'font-size:9.5px'})+t(257,184,'Prozesse beherrscht',{s:'font-size:9.5px'})+
  rect(308,72,98,138,'g')+ls(357,92,['TQM'],{s:sm})+t(357,148,'alle Unterneh-',{s:'font-size:9.5px'})+t(357,160,'mensprozesse,',{s:'font-size:9.5px'})+t(357,172,'alle Mitarbeiter',{s:'font-size:9.5px'})+
  rect(408,46,106,164,'g')+ls(461,66,['integriertes','Management-','system (IMS)'],{s:sm})+t(461,140,'Qualität + Umwelt',{s:'font-size:9.5px'})+t(461,152,'+ Arbeitsschutz',{s:'font-size:9.5px'})+t(461,164,'+ Risiko in einem',{s:'font-size:9.5px'})+t(461,176,'Gesamtsystem',{s:'font-size:9.5px'})+
  t(260,24,'Einfluss der Qualität auf das Unternehmen wächst',{c:'acc'}),
  'Entwicklung: Fehlerentdeckung → Fehlervermeidung → alle Prozesse → alle Managementbereiche'),
 {h:'Qualität und Wirtschaftlichkeit'},
 {tab:[['Kostenart','Inhalt','Wirkung'],['Fehlerverhütungskosten','Planung, Schulung, Wartung, FMEA','vorbeugend'],['Prüfkosten','Wareneingangs-, Zwischen-, Endprüfung, Prüfmittel','Fehler wird nicht vermieden, aber entdeckt'],['Fehlerkosten intern','Ausschuss, Nacharbeit, Selektion','vor Auslieferung'],['Fehlerkosten extern','Reklamation, Garantie, Rückruf, Schadensersatz, Imageverlust','nach Auslieferung – am teuersten']]},
 {p:'Heute werden teils nur zwei Arten unterschieden: Konformitätskosten (Verhütung und Prüfung) und Nichtkonformitätskosten (Fehlerkosten). Merksatz: Qualität kostet Geld, fehlende Qualität kostet mehr. Das Zieldreieck lautet Qualität, Zeit, Kosten.'}]},

{t:'ISO 9001, Prozessorientierung und Risiken',b:[
 {p:'Die Normenfamilie DIN EN ISO 9000 ff. wird von der ISO erarbeitet, vom Europäischen Komitee für Normung als EN übernommen und vom DIN in das deutsche Normenwerk überführt. ISO 9000 erklärt Grundlagen und Begriffe, ISO 9001 enthält die Anforderungen und ist als einzige zertifizierbar, ISO 9004 ist ein Leitfaden zur Weiterentwicklung mit Empfehlungscharakter (z. B. Selbstbewertung des Reifegrads).'},
 {ol:['Kundenorientierung','Führung','Engagement von Personen','prozessorientierter Ansatz','Verbesserung','faktengestützte Entscheidungsfindung','Beziehungsmanagement (Lieferanten, Partner, Kunden, Investoren, Mitarbeiter, Gesellschaft)']},
 fig(520,262,
  box(8,10,246,86,['PLAN','4 Kontext der Organisation','6 Planung (Risiken, Chancen, Ziele)','7 Unterstützung (Ressourcen, Dokumente)'],{k:'b',s:sm})+
  box(266,10,246,86,['DO','8 Betrieb','Planung und Steuerung der','Produkte und Dienstleistungen'],{k:'g',s:sm})+
  box(266,168,246,86,['CHECK','9 Bewertung der Leistung','Überwachung, internes Audit,','Managementbewertung'],{k:'y',s:sm})+
  box(8,168,246,86,['ACT','10 Verbesserung','Nichtkonformität, Korrekturmaßnahme,','ständige Verbesserung'],{k:'a',s:sm})+
  circ(260,132,38,'b')+ls(260,127,['5 Führung','Politik, Ziele'],{s:sm,lh:15}),
  'High-Level-Structure der ISO 9001:2015: Kapitel 4 bis 10 folgen dem PDCA-Zyklus, Kapitel 5 Führung steht im Zentrum (Kapitel 1–3: Anwendungsbereich, Verweise, Begriffe)'),
 {ul:['Ein QM-Handbuch ist nicht mehr gefordert; verlangt werden dokumentierte Informationen (Anwendungsbereich, Qualitätspolitik, Qualitätsziele, Nachweise).','Kontext: interne und externe Themen sowie die Anforderungen interessierter Parteien (Kunden, Mitarbeiter, Lieferanten, Behörden) bestimmen den Anwendungsbereich.','Die frühere Vorbeugemaßnahme ist im risikobasierten Denken aufgegangen: Risiken und Chancen werden schon in der Planung berücksichtigt. Bei Nichtkonformitäten: reagieren, Ursache bewerten, Korrekturmaßnahme, Wirksamkeit prüfen.']},
 {h:'Prozess und Prozesslandkarte'},
 fig(520,150,
  box(8,34,98,60,['Eingaben','Bedarf, Material,','Information'],{k:'b',s:sm})+fa(106,64,138,64)+
  box(140,34,130,60,['Prozess','zusammenhängende','Tätigkeiten'],{k:'a',s:sm})+fa(270,64,302,64)+
  box(304,34,98,60,['Ergebnis','Produkt,','Dienstleistung'],{k:'g',s:sm})+
  ln(205,34,205,18,'sk-dim')+ln(205,94,205,112,'sk-dim')+t(205,12,'Ressourcen: Personal, Werkzeug, Plan, Qualifikation',{s:'font-size:11px'})+t(205,128,'Unterstützt durch QM: Lieferanten qualifizieren, auditieren, Wareneingangsprüfung',{s:'font-size:11px'})+
  box(414,34,100,60,['Kunde','Bedarf ↔','Zufriedenheit'],{s:xs}),
  'Prozess = Satz zusammenhängender Tätigkeiten, der Eingaben zu einem Ergebnis umwandelt – vom Kundenbedarf bis zur Kundenzufriedenheit'),
 {p:'Prozessorientierung heißt: Geschäftsprozesse kennen, gestalten und verbessern, Unterprozesse mit Rechten und Pflichten der Verantwortlichen abbilden, Abläufe dokumentieren, prozessorientiert kalkulieren und klare Schnittstellen festlegen. Die Prozesslandkarte zeigt Haupt- bzw. Kernprozesse (vom Kundenwunsch zur Lieferung), Führungs- und Unterstützungsprozesse mit ihren Wechselwirkungen und Verantwortlichen. Vorteile: Konzentration auf Wertschöpfung, Orientierung an Kennzahlen, höhere Effektivität, Einbeziehung der Mitarbeiter.'},
 {p:'Risikomanagement: Risiko = Auswirkung von Ungewissheit, negativ (Risiko) oder positiv (Chance). Risiken werden identifiziert, bewertet (Bedeutung · Eintrittswahrscheinlichkeit, je 1–10, ähnlich der FMEA), priorisiert und mit Maßnahmen abgemildert.'}]},

{t:'Audits: Arten, Ablauf und Lieferantenbewertung',b:[
 {p:'Audit (lat. audire = hören): geplante, eigenständige Überprüfung, bei der der Sollzustand mit dem Istzustand verglichen wird. Es klärt, ob das QM-System wirksam ist und Normforderungen (z. B. ISO 9001) und eigene Regelungen umgesetzt sind. Abweichungen sind Nichtkonformitäten; es werden Maßnahmen mit Terminen vereinbart und nachverfolgt. Positive Feststellungen werden ebenfalls dokumentiert. Ziele: Genauigkeit und Zuverlässigkeit von Daten, Einhaltung von Vorschriften, Schwachstellen und Risiken erkennen, Effizienz steigern, Vertrauen bilden. Ein Audit ist eine Chance zur Verbesserung.'},
 {tab:[['Einteilung','Art','Merkmal'],
  ['nach Beteiligten','First-Party-Audit','internes Audit durch geschulten Betriebsangehörigen; Vorbereitung auf externe Audits, Teil des KVP'],
  ['','Second-Party-Audit','Kunde auditiert Lieferanten (externes Audit), z. B. Lieferantenaudit'],
  ['','Third-Party-Audit','unabhängige Dritte, Zertifizierungsaudit'],
  ['nach Anlass','Zertifizierungsaudit','Erlangen des Zertifikats'],
  ['','Überwachungsaudit','jährlich durch die Zertifizierungsstelle'],
  ['','Rezertifizierungsaudit','vor Ablauf des Zertifikats (meist 3 Jahre), wieder vollständige Auditierung'],
  ['','Nachaudit','nötig bei Abweichungen aus Überwachung oder Zertifizierung'],
  ['','Folgeaudit','nach Auditprogramm in festgelegten Abständen'],
  ['nach Gegenstand','Systemaudit','Wirksamkeit des Managementsystems'],
  ['','Prozessaudit','Qualitätsfähigkeit spezieller Prozesse, meist Produktentstehung (Automobil: VDA 6.3)'],
  ['','Produktaudit','Produkt gegen Kundenvorgaben, Erwartungen, rechtliche Vorgaben']]},
 fig(520,120,
  box(4,30,94,56,['Planung','Programm, Umfang,','Auditor'],{k:'b',s:xs})+fa(98,58,114,58)+box(116,30,94,56,['Vorbereitung','Checkliste'],{k:'b',s:xs})+fa(210,58,226,58)+
  box(228,30,94,56,['Durchführung','Eröffnung, Befragen,','Beobachten'],{k:'g',s:xs})+fa(322,58,338,58)+box(340,30,86,56,['Bericht','Abschluss-','gespräch'],{k:'y',s:xs})+fa(426,58,442,58)+box(444,30,72,56,['Verfolgung','der Maß-','nahmen'],{k:'a',s:xs})+
  t(260,112,'Auditoren sind unabhängig und neutral',{s:sm}),
  'Ablauf eines internen Audits'),
 {p:'Feststellungen: Konformität, Abweichung (Haupt- oder Nebenabweichung), Hinweis, Verbesserungspotenzial. Erstmusterprüfung (EMPB/PPAP) weist nach, dass der Lieferant mit Serienmitteln Teile fertigt, die alle Anforderungen erfüllen – erforderlich bei Erstlieferung und nach Änderungen an Produkt, Werkzeug, Verfahren oder Lieferort sowie nach längerer Unterbrechung.'},
 {p:'Lieferanten bewerten: Kriterien Qualität (Fehlerquote in ppm), Termintreue, Preis, Service, Flexibilität, Reklamationsverhalten, Zertifikate, Auditergebnisse. Gewichtete Punktbewertung (Nutzwertanalyse) und Einstufung A (bevorzugt), B (bedingt), C (nicht mehr) mit Entwicklungsgesprächen und Maßnahmenplan.'}]},

{t:'Statistik und Stichprobenprüfung',b:[
 {p:'Statistik erfasst, wertet aus, analysiert, interpretiert und präsentiert Daten. Beschreibende (deskriptive) Statistik ordnet und stellt Daten dar und berechnet Kennwerte – dazu gehören die sieben Qualitätswerkzeuge. Beurteilende (analytische) Statistik schließt von Stichproben auf die Grundgesamtheit, prüft Hypothesen und schätzt Parameter.'},
 {tab:[['Begriff','Bedeutung'],['Grundgesamtheit','alle möglichen Objekte, über die eine Aussage getroffen werden soll'],['Stichprobe, Umfang n','begrenzte Teilmenge der Grundgesamtheit, n = ihre Größe'],['Merkmal','untersuchte Eigenschaft; quantitativ (mess-/zählbar: Maß, Gewicht) oder qualitativ (Farbe, Fehlerart)'],['Merkmalsausprägung','Werte, die ein Merkmal annehmen kann'],['Urliste','ursprüngliche, ungeordnete Aufzeichnung der Messwerte']]},
 {ul:['Vorteile der Stichprobenprüfung: schneller, günstiger, sorgfältigere Prüfung der Einzelteile, zerstörende Prüfungen nur so möglich.','Grenzen: Aussagen gelten für das ganze Los, nicht für einzelne Teile, und nur mit einer Wahrscheinlichkeit – Fehlentscheidungen sind möglich (Lieferantenrisiko: gutes Los wird abgelehnt, Abnehmerrisiko: schlechtes Los wird angenommen).','Beispiel: Los von 50 Teilen mit 2 fehlerhaften (4 %): Mit n = 1 greift man nur mit 2:50 ein schlechtes Teil. Größere Stichprobe erhöht die Chance, schafft aber nie Sicherheit.','Mahnung aus dem Zweiten Weltkrieg: Man untersuchte nur zurückgekehrte Flugzeuge – die Stichprobe war verzerrt (Überlebensfehler).']},
 fig(520,250,
  ln(60,210,490,210,'sk-dim')+ln(60,20,60,210,'sk-dim')+
  [0,20,40,60,80,100].map(v=>ln(56,210-v*1.9,490,210-v*1.9,'sk-c').replace('sk-c','sk-c" style="opacity:.35')+t(50,214-v*1.9,v+'',{a:'end',s:xs})).join('')+
  [0,1,2,3,4,5,6].map(p=>t(60+p*70,228,p+' %',{s:xs})).join('')+
  path(oc(100,4,60,210,420,190,6),'sk-l','stroke:var(--blue);stroke-width:2.5')+path(oc(200,4,60,210,420,190,6),'sk-l','stroke:var(--accent);stroke-width:2.5')+
  t(250,60,'n = 100',{a:'start',s:sm}).replace('class="sk-t"','class="sk-t" style="font-size:12px;fill:var(--blue)"')+t(138,166,'n = 200',{a:'start',s:sm}).replace('class="sk-t"','class="sk-t" style="font-size:12px;fill:var(--accent)"')+
  t(275,246,'tatsächlicher Fehleranteil im Los',{s:sm})+t(16,100,'P(Annahme) in %',{s:xs,a:'start'}).replace('x="16" y="100"','x="14" y="110" transform="rotate(-90 14 110)"').replace('text-anchor="start"','text-anchor="middle"'),
  'OC-Kurve (Annahmewahrscheinlichkeit) für Annahmezahl c = 4: größerer Stichprobenumfang trennt gute und schlechte Lose schärfer (n = 200: bei 1 % Fehleranteil ca. 95 % Annahme, bei 3 % nur etwa 28 %)'),
 {p:'AQL (Acceptable Quality Limit/Level) legt den Fehleranteil fest, den der Abnehmer laut Stichprobenplan noch akzeptiert; überschreitet die Zahl fehlerhafter Teile in der Stichprobe die Annahmezahl, wird das Prüflos zurückgewiesen. Aus Losgröße und Prüfniveau ergibt sich ein Kennbuchstabe (Code Letter) und daraus der Stichprobenumfang. Prüfniveau I = kleiner Umfang (zuverlässige Lieferanten), II = Standard, III = großer Umfang (höchste Sicherheit, höhere Kosten).'},
 {tab:[['Fehlerschwere','Beispiel für AQL'],['Fehler mit schweren Schäden','0'],['Sicherheit/Leistungsfähigkeit betroffen','0,065'],['Funktionalität betroffen, kein Schaden','0,4'],['Schönheitsfehler (Kratzer)','1']]}]},

{t:'Prozessfähigkeit, Normalverteilung und Six Sigma',b:[
 fig(520,230,
  path(area(-3,3,260,170,130,55),'sk-l','fill:color-mix(in srgb,var(--blue) 14%,var(--paper));stroke:none')+
  path(area(-2,2,260,170,130,55),'sk-l','fill:color-mix(in srgb,var(--blue) 26%,var(--paper));stroke:none')+
  path(area(-1,1,260,170,130,55),'sk-l','fill:color-mix(in srgb,var(--accent) 34%,var(--paper));stroke:none')+
  path(gauss(260,170,130,55,-3.9,3.9),'sk-l','stroke:var(--ink);stroke-width:2')+ln(40,170,480,170,'sk-dim')+
  [-3,-2,-1,0,1,2,3].map(k=>ln(260+k*55,170,260+k*55,176,'sk-dim')+t(260+k*55,190,k===0?'μ':(k>0?'+':'−')+Math.abs(k)+'σ',{s:xs})).join('')+
  t(260,120,'68,3 %',{s:sm,c:'acc'})+
  ls(412,60,['±1σ: 68,3 %','±2σ: 95,4 %','±3σ: 99,73 %'],{s:sm,a:'end'})+
  ln(95,40,95,170,'sk-f')+ln(425,40,425,170,'sk-f')+t(95,34,'UTG',{c:'acc'})+t(425,34,'OTG',{c:'acc'})+
  t(260,214,'Toleranzgrenzen bei ±3σ → cp = 1,00; bei ±6σ → cp = 2,00 (Six Sigma)',{s:sm}),
  'Normalverteilung: Anteil der Werte innerhalb ±1σ, ±2σ, ±3σ; rote Linien = Toleranzgrenzen (UTG/OTG)'),
 {fx:{n:'Potenzieller Prozessfähigkeitsindex (Streuung gegen Toleranz)',tex:'C_p=\\frac{\\text{OTG}-\\text{UTG}}{6\\cdot\\sigma}',leg:[['\\text{OTG},\\text{UTG}','obere und untere Toleranzgrenze'],['\\sigma','Standardabweichung (s)']],e:'Cp ignoriert die Lage des Mittelwerts.'}},
 {fx:{n:'Kritischer Prozessfähigkeitsindex (Streuung und Lage)',tex:'C_{pk}=\\frac{\\Delta_\\text{krit}}{3\\cdot\\sigma},\\quad \\Delta_\\text{krit}=\\min(\\text{OTG}-\\bar{x},\\ \\bar{x}-\\text{UTG})',leg:[['\\bar{x}','Mittelwert der Stichprobe'],['\\Delta_\\text{krit}','kleinster Abstand des Mittelwerts zur Toleranzgrenze']],e:'Cpk ≤ Cp; gleich, wenn der Prozess genau mittig liegt. Maschinenfähigkeit heißt Cm/Cmk, Berechnung identisch.'}},
 {tab:[['Sigma bis zur Grenze','Cpk','Ausschuss','ppm'],['1','0,33','32 %','320.000'],['2','0,67','4,6 %','46.000'],['3','1,00','0,27 %','2.700'],['4','1,33','0,0063 %','63'],['5','1,67','0,000057 %','0,57'],['6','2,00','0,0000002 %','0,002']]},
 {tab:[['','Maschinenfähigkeit (Cm, Cmk)','Prozessfähigkeit (Cp, Cpk)'],['Untersuchung','Kurzzeit: alle Einflüsse konstant (gleicher Mitarbeiter, gleiche Charge, möglichst konstante Umgebung), 50 aufeinanderfolgende Teile','Langzeit: wechselnde Bedingungen, Stichproben verteilt über etwa 20 Tage'],['Forderung (üblich)','≥ 1,67','≥ 1,33 (je nach Kunde 1,67)'],['Zeitpunkt','Vorabnahme beim Hersteller','nach Installation beim Anwender']]},
 {tab:[['','nicht fähig','fähig'],['nicht beherrscht','Ergebnisse unvorhersehbar und oft außerhalb der Toleranz','vorhersehbar? nein – Lage oder Streuung driften'],['beherrscht','vorhersehbar, aber zu viel Ausschuss: Lage verschoben (Justage hilft) oder Streuung zu groß','Ziel: vorhersehbar und innerhalb der Toleranz']]},
 {p:'Natürliche Prozessgrenzen (Mittelwert ± 3σ) zeigen, was der Prozess tatsächlich leistet; Toleranzgrenzen gibt der Kunde vor. Fähig ist ein Prozess, wenn die natürlichen Grenzen sicher innerhalb der Toleranz liegen.'},
 {p:'Six Sigma ist Qualitätsziel, Managementsystem und Methode zur systematischen Prozessoptimierung. Rechnerisch liegt die Toleranzgrenze sechs Standardabweichungen vom Mittelwert; mit der üblichen Prozessverschiebung von 1,5σ entspricht das höchstens 3,4 Fehlern je eine Million Möglichkeiten (DPMO). Projektablauf DMAIC: Define, Measure, Analyze, Improve, Control. Lean Six Sigma verbindet Verschwendungsabbau mit Streuungsreduzierung.'}]},

{t:'Die sieben Qualitätswerkzeuge im Bild',b:[
 {p:'Qualität ist messbar. Die sieben Werkzeuge (auf Kaoru Ishikawa zurückgehend) dienen der Fehlererfassung und der Fehleranalyse und gehören zur beschreibenden Statistik. Keines allein klärt Ursachen vollständig.'},
 fig(520,262,
  ln(50,204,470,204,'sk-dim')+ln(50,30,50,204,'sk-dim')+ln(470,30,470,204,'sk-dim')+
  [[30,'Automat','außer Betr.'],[26,'Kaffee','zu schwach'],[21,'Kaffee','kalt'],[15,'Kaffee','zu stark'],[12,'Zucker','leer'],[5,'Schoko','falsch']].map(([v,a,b2],i)=>{const x=64+i*66,hh=v/109*174,y=204-hh;return rect(x,y,50,hh,i<3?'a':'b')+t(x+25,y-5,v+'',{s:xs})+t(x+25,218,a,{s:'font-size:10px'})+t(x+25,229,b2,{s:'font-size:10px'})}).join('')+
  path('M89,'+(204-0.28*174)+' L155,'+(204-0.51*174)+' L221,'+(204-0.71*174)+' L287,'+(204-0.84*174)+' L353,'+(204-0.95*174)+' L419,30','sk-l','stroke:var(--accent);stroke-width:2.5')+
  ln(50,204-0.8*174,470,204-0.8*174,'sk-c')+t(474,204-0.8*174+4,'80 %',{a:'start',s:xs})+t(474,30,'100 %',{a:'start',s:xs})+
  t(260,16,'Pareto: 3 von 6 Fehlerarten verursachen 71 % der 109 Beschwerden',{s:sm}),
  'Pareto-Diagramm (Beispiel Kaffeeautomat): sortierte Fehlerarten als Säulen, kumulierte Häufigkeit als Linie – zuerst die wenigen wichtigen Ursachen angehen (80/20-Regel)'),
 fig(520,225,
  ln(30,110,400,110,'sk-l')+box(400,88,112,44,['Problem /','Wirkung'],{k:'r',s:sm})+
  ln(80,30,130,110)+ln(210,30,260,110)+ln(340,30,380,110)+ln(80,190,130,110)+ln(260,190,300,110)+
  box(50,6,64,26,['Mensch'],{k:'b',s:xs})+box(180,6,64,26,['Maschine'],{k:'b',s:xs})+box(312,6,64,26,['Material'],{k:'b',s:xs})+box(50,190,64,26,['Methode'],{k:'b',s:xs})+box(232,190,64,26,['Mitwelt'],{k:'b',s:xs})+
  ls(122,56,['Schulung','Ermüdung'],{s:'font-size:10px',lh:12,a:'start'})+ls(252,56,['Verschleiß','Wartung'],{s:'font-size:10px',lh:12,a:'start'})+ls(368,56,['Charge','Lieferant'],{s:'font-size:10px',lh:12,a:'start'})+ls(120,160,['Arbeits-','anweisung'],{s:'font-size:10px',lh:12,a:'start'})+ls(292,160,['Temperatur','Lärm, Licht'],{s:'font-size:10px',lh:12,a:'start'}),
  'Ishikawa-Diagramm (Ursache-Wirkung, Fischgräte): Ursachen systematisch nach den 5 M suchen – Mensch, Maschine, Material, Methode, Mitwelt (Milieu); erweitert 7 M mit Messbarkeit und Management'),
 fig(520,250,
  rect(10,20,500,210,null,' fill="none"').replace(/style="[^"]*"/,'style="fill:none;stroke:var(--line)"')+
  ln(40,118,490,118,'sk-c')+ln(40,63,490,63,'sk-f')+ln(40,173,490,173,'sk-f')+
  t(46,58,'obere Eingriffsgrenze (+3σ)',{a:'start',s:'font-size:10.5px',c:'acc'})+t(488,189,'untere Eingriffsgrenze (−3σ)',{a:'end',s:'font-size:10.5px',c:'acc'})+t(488,113,'Mittellinie',{a:'end',s:'font-size:10.5px'})+
  ln(40,90,490,90,'sk-c').replace('sk-c','sk-c" style="opacity:.4')+ln(40,146,490,146,'sk-c').replace('sk-c','sk-c" style="opacity:.4')+
  (()=>{const v=[0.1,-0.4,0.3,-0.2,0.5,-0.7,0.2,0.6,0.9,1.1,1.5,1.8,2.2,2.6,3.3,0.2,-0.3,0.4,-0.1,0.3];let d='';const pts=v.map((y,i)=>[48+i*22.4,118-y*18.3]);d+=path('M'+pts.map(p=>p.join(',')).join(' L'),'sk-l','stroke:var(--blue);stroke-width:1.8');pts.forEach((p,i)=>{d+=circ(p[0].toFixed(1),p[1].toFixed(1),3.4,i===14?'r':'b')});return d})()+
  t(190,42,'Trend: 7 Punkte steigend',{s:xs,c:'acc'})+t(430,90,'Punkt außerhalb',{s:xs,c:'acc'})+t(430,103,'→ Eingriff',{s:xs,c:'acc'})+
  t(260,244,'Stichproben in zeitlicher Reihenfolge →',{s:sm}),
  'Qualitätsregelkarte (Shewhart): Mittellinie, Warngrenzen (±2σ) und Eingriffsgrenzen (±3σ); Trend, Run oder Punkt außerhalb zeigen systematische Einflüsse – eingegriffen wird vor der Toleranzgrenze'),
 fig(520,150,
  ['A positiv','B negativ','C kein Zusammenhang','D nichtlinear'].map((l,i)=>{const x=10+i*128;let pts='';const seeds=[[.1,.15],[.2,.3],[.3,.28],[.4,.5],[.5,.45],[.6,.7],[.7,.62],[.8,.85],[.9,.9],[.25,.15],[.55,.62],[.75,.72],[.35,.42],[.85,.78]];seeds.forEach(([a,b],j)=>{let X=a,Y=b;if(i===1)Y=1-b;if(i===2)Y=seeds[(j*5+3)%seeds.length][1];if(i===3)Y=1-4*(a-.5)*(a-.5)+((j%3)-1)*.06;pts+=circ((x+10+X*90).toFixed(1),(100-Y*80).toFixed(1),3,'b')});return rect(x,16,112,100,null,' fill="none"').replace(/style="[^"]*"/,'style="fill:none;stroke:var(--line)"')+pts+t(x+56,134,l,{s:xs})}).join(''),
  'Korrelationsdiagramm (Streudiagramm): Beziehung zweier Merkmale – A stark positiv, B negativ, C keine, D Zusammenhang vorhanden, aber nicht linear (mind. etwa 30 Wertepaare)'),
 {tab:[['Werkzeug','Zweck','Vorteil','Nachteil'],
  ['Strichliste / Datensammelliste','Fehler und Häufigkeit erfassen','einfach, keine Schulung','unübersichtlich bei vielen Fehlerarten, keine Ursachenanalyse'],
  ['Histogramm','Häufigkeitsverteilung von Messwerten','große Datenmengen übersichtlich','keine Ursachenanalyse, viele Daten nötig'],
  ['Qualitätsregelkarte','Prozess über die Zeit beobachten','frühes Erkennen des Weglaufens','Schulung nötig, keine kurzfristigen Ergebnisse'],
  ['Pareto-Diagramm','wichtige von unwichtigen Fehlern trennen','Prioritäten sofort sichtbar','zeigt nur Häufigkeit oder Kosten'],
  ['Ablaufdiagramm','Prozessschritte, Entscheidungen darstellen','deckt überflüssige Schritte und Mehrfachprüfungen auf','Aufwand bei komplexen Prozessen'],
  ['Korrelationsdiagramm','Zusammenhang zweier Merkmale','Art der Beziehung schnell sichtbar','Fehlinterpretation möglich, weitere Werkzeuge nötig'],
  ['Ishikawa-Diagramm','Ursachen systematisch sammeln','Brainstorming findet auch versteckte Ursachen','zeitaufwändig, gefundene Ursache muss nicht die tatsächliche sein']]},
 {p:'Boxplot: Die Box zeigt das mittlere Datenviertel zwischen unterem und oberem Quartil, die Linie darin den Median; Whisker reichen zu den äußeren Werten, Ausreißer werden einzeln markiert – gut zum Vergleich von Schichten oder Maschinen.'}]},

{t:'Methoden: Poka-Yoke, Jidoka, 5-Why, 8D, Fehlerbaum',b:[
 {p:'Poka-Yoke (japanisch: unbeabsichtigte Fehler vermeiden) verhindert Fehler durch technische Vorkehrungen im Prozess selbst, statt sie nachträglich zu prüfen. Eingriffsmethode (Abschaltmethode): beim Fehler stoppt Maschine oder Prozess sofort. Alarmmethode: optisches und/oder akustisches Signal. Beispiele: asymmetrische Stecker (USB), Bändel am Tankdeckel, Abreißsicherung am Tankschlauch, Kettenbremse bei Rückschlag, Montagevorrichtung passend zur Werkstückgeometrie, Drehmomentschrauber mit Steuerung, einheitliche Schrauben, farbliche Markierung.'},
 {tab:[['Methode','Kern'],['Jidoka','Automation mit menschlichem Verstand: Maschine stoppt selbst bei Fehlern, damit keine Fehler weitergegeben werden'],['Andon','Signalsystem (Lampe, Zugleine): Mitarbeiter melden Fehler und halten die Linie an'],['5-Why','wiederholtes Fragen nach dem Warum, bis die systemische Grundursache gefunden ist: Maschine steht – Lager defekt – nicht geschmiert – Schmierplan fehlt – Wartung nicht definiert'],['Wertstromanalyse','Material- und Informationsfluss aufnehmen (Bestände, Zykluszeiten, Durchlaufzeit), Verschwendung erkennen, Soll-Zustand entwerfen'],['Net Promoter Score','Promoter (9–10) minus Detraktoren (0–6) in Prozent, −100 bis +100'],['First Pass Yield','gute Teile im ersten Durchgang ÷ eingesetzte Teile; mehrere Schritte multiplizieren sich (Rolled Throughput Yield)']]},
 fig(520,240,
  box(160,6,200,34,['Maschine steht still'],{k:'r',s:sm})+ln(260,40,260,54)+box(232,54,56,26,['≥ 1'],{s:xs})+ln(260,80,260,92)+ln(90,92,430,92)+ln(90,92,90,104)+ln(260,92,260,104)+ln(430,92,430,104)+
  box(30,104,120,32,['Energie fehlt'],{k:'y',s:sm})+box(200,104,120,32,['Steuerung defekt'],{k:'y',s:sm})+box(370,104,120,32,['Mechanik blockiert'],{k:'y',s:sm})+
  ln(90,136,90,148)+box(62,148,56,26,['&'],{s:xs})+ln(90,174,90,186)+ln(50,186,140,186)+ln(50,186,50,198)+ln(140,186,140,198)+
  box(8,198,84,32,['Netz aus'],{s:sm})+box(98,198,84,32,['Notstrom','defekt'],{s:sm})+
  ls(330,196,['Beispiel: Die Energie fehlt nur,','wenn Netz UND Notstrom ausfallen.'],{s:xs,a:'start'}),
  'Fehlerbaum (FTA): vom unerwünschten Top-Ereignis nach unten; ODER-Gatter (≥1): eine Ursache genügt, UND-Gatter (&): nur mehrere zugleich'),
 fig(520,130,
  box(4,28,60,50,['D1','Team'],{k:'b',s:xs})+box(70,28,60,50,['D2','Problem'],{k:'b',s:xs})+box(136,28,60,50,['D3','Sofort-','maßnahme'],{k:'b',s:xs})+box(202,28,60,50,['D4','Ursache'],{k:'b',s:xs})+
  box(268,28,60,50,['D5','Abstell-','maßnahme'],{k:'g',s:xs})+box(334,28,60,50,['D6','Umsetzen,','prüfen'],{k:'g',s:xs})+box(400,28,60,50,['D7','Wieder-','holung'],{k:'g',s:xs})+box(466,28,50,50,['D8','Abschluss'],{k:'g',s:'font-size:10px'})+
  t(133,100,'Planung und Analyse (Tag 1–4)',{s:xs})+t(391,100,'Umsetzung nach PDCA (Tag 5–10)',{s:xs}),
  '8D-Report der Reklamationsbearbeitung: acht Disziplinen von der Teambildung bis zum Abschluss'),
 {p:'Reklamation = vom Kunden geäußerte Unzufriedenheit mit Produkten, Services oder Prozessen, bei der eine Rückmeldung erwartet wird. Sie ist zugleich ein vom Kunden eingebrachter Verbesserungsansatz; professioneller Umgang stärkt die Kunden-Lieferanten-Beziehung. Das 8D-Verfahren hat den Charakter eines kleinen Projekts: Sofortmaßnahme (Eindämmung) trennt sich von der dauerhaften Abstellmaßnahme.'}]},

{t:'Gewährleistung, Garantie und Produkthaftung',b:[
 {tab:[['','Garantie','Gewährleistung (Sachmängelhaftung)','Produkthaftung'],
  ['Grundlage','freiwillige, einseitige Erklärung','Kaufvertrag, BGB','Produkthaftungsgesetz und BGB'],
  ['Voraussetzung','Garantieerklärung; gilt oft nur für Teilbereiche','tatsächlicher Mangel an der Sache','fehlerhaftes Produkt verursacht Schaden an Personen, Sachen, Vermögen'],
  ['Verpflichteter','Garantiegeber','Verkäufer','Inverkehrbringer/Hersteller – verschuldensunabhängig (ProdHaftG)'],
  ['Zweck','Vertrauen stärken','Anspruch des Käufers auf mangelfreie Ware','Schutz vor Schäden durch Produktfehler']]},
 fig(520,130,
  ln(40,70,490,70,'sk-dim')+rect(40,44,225,50,'g')+rect(265,44,225,50,'y')+
  t(152,66,'0–12 Monate',{s:sm})+t(152,82,'Mangel gilt als bei Übergabe vorhanden',{s:xs})+
  t(377,66,'13–24 Monate',{s:sm})+t(377,82,'Käufer muss Mangel bei Übergabe beweisen',{s:xs})+
  ls(40,118,['Übergabe'],{s:xs,a:'start'})+t(490,118,'Ende der Gewährleistung (2 Jahre)',{s:xs,a:'end'}),
  'Gewährleistung für Sachmängel: zwei Jahre, in den ersten zwölf Monaten Beweislastumkehr zugunsten des Käufers'),
 {ul:['Mangel: ungeeignet für gewöhnliche oder vereinbarte Verwendung, fehlt übliche Beschaffenheit, falsches Produkt oder zu geringe Menge geliefert.','Ansprüche des Käufers: Nacherfüllung (Reparatur oder Ersatz), Kaufpreisminderung, Rücktritt, Schadensersatz.','Produkthaftung (ProdHaftG): verschuldensunabhängig für Schäden an Leben, Körper und privatem Eigentum durch Konstruktions-, Fabrikations- und Instruktionsfehler; Produzentenhaftung (BGB) setzt Verschulden voraus.','Sorgfaltspflichten des Herstellers: Konstruktions- und Entwicklungsverantwortung (Stand der Technik, FMEA), Produktionsverantwortung (frühzeitige Qualitätskontrolle), Instruktionsverantwortung (Warnhinweise, Anleitung), Produktbeobachtungsverantwortung (Warnung bis Rückruf).']},
 {merke:'Ein funktionierendes QM, Rückverfolgbarkeit und Dokumentation sind der beste Schutz gegen Haftungsansprüche.'}]},

{t:'Planung, Lenkung, Verbesserung und Mitarbeiter',b:[
 {p:'Damit Prozesse dauerhaft und reproduzierbar laufen, müssen sie geplant (Qualitätsplanung), gelenkt (Qualitätslenkung) und geprüft (Qualitätsprüfung) werden. Qualitätsplanung ist Bestandteil jeder Phase des Produktlebenszyklus (Design, Realisierung, Nutzung): Sie legt fest, wann, wie und anhand welcher Kriterien die Erfüllung der messbaren Anforderungen geprüft wird.'},
 fig(520,120,
  box(8,26,150,56,['Planen','Anforderungen, Prüfplan,','Meilensteine'],{k:'b',s:sm})+fa(158,54,186,54)+
  box(188,26,150,56,['Prüfen','Methoden je Meilenstein','messen und auswerten'],{k:'y',s:sm})+fa(338,54,366,54)+
  box(368,26,146,56,['Lenken','Ergebnisse nutzen,','Maßnahmen ableiten'],{k:'g',s:sm})+
  t(260,106,'Lenkung: mittelbar (Bedingungen verbessern, z. B. Schulung, Wartung) · unmittelbar (Eingriff in den laufenden Prozess)',{s:'font-size:10.5px'}),
  'Qualitätsplanung, -prüfung und -lenkung bilden einen Regelkreis'),
 {ul:['Lenkung fehlerhafter Produkte: eindeutig identifizieren, Bearbeitungsstand kennen, Nichtkonformität feststellen, sperren, Ursache analysieren, Wiederholung verhindern.','PDCA, Plan: Kernproblem, benötigte und vorhandene Ressourcen, bestgeeignete Lösung, Erfolgsbedingungen und Ziel. Do: Versuch durchführen. Check: Ergebnis beurteilen. Act: anpassen und standardisieren.','Mitarbeiter einbinden: an der Festlegung der Qualitätsziele beteiligen, Ziele nachvollziehbar machen, Stand regelmäßig kommunizieren, Qualitätszirkel und betriebliches Vorschlagswesen nutzen, Rollen und Verantwortlichkeiten klären. Veränderungen werden besser akzeptiert, wenn offen informiert wird.','Null-Fehler-Strategie: Fehler dürfen nicht von vornherein eingeplant werden, jeder Fehler ist eine Chance zur Verbesserung. Führung gestaltet Arbeitsverfahren so, dass fehlerfreie Arbeit möglich ist – ohne personenbezogene Schuldzuweisung.','Messunsicherheit: Bereich, in dem der wahre Wert mit festgelegter Wahrscheinlichkeit liegt; beim Prüfen nahe der Toleranzgrenze zu berücksichtigen. Prüfmittel nach Kalibrierintervallen überwachen, kennzeichnen (Prüfplakette), überfällige sperren.']}]}
]);}
