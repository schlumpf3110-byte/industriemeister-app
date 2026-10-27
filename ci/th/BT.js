{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
addTheory('BT',[
{t:'Elektrische Antriebe: Frequenzumrichter, Geber, Motorwahl',b:[
 {p:'Moderne Maschinenantriebe sind drehzahlveränderbar. Der Frequenzumrichter (FU) erzeugt aus dem festen Netz (50 Hz) eine Spannung mit veränderlicher Frequenz und Amplitude. Er besteht aus drei Stufen: Gleichrichter, Zwischenkreis und Wechselrichter.'},
 fig(520,178,
  box(4,38,64,52,['Netz','3~ 50 Hz'],{k:'b',s:xs})+fa(68,64,88,64)+
  box(90,28,98,72,['Gleichrichter','Dioden in','Brückenschaltung'],{k:'g',s:xs})+fa(188,64,208,64)+
  box(210,28,98,72,['Zwischenkreis','Kondensator','glättet (DC)'],{k:'y',s:xs})+fa(308,64,328,64)+
  box(330,28,98,72,['Wechselrichter','Transistoren,','variable f und U'],{k:'a',s:xs})+fa(428,64,448,64)+
  circ(482,64,28,'b')+t(482,69,'M 3~',{s:sm})+
  ln(259,100,259,118)+box(209,118,100,34,['Bremswiderstand'],{k:'r',s:xs})+
  t(380,134,'Motor als Generator speist',{s:xs,a:'start'})+t(380,148,'Energie in den Zwischenkreis',{s:xs,a:'start'})+t(380,162,'→ Spannung steigt → Wärme',{s:xs,a:'start'}),
  'Frequenzumrichter: Gleichrichter → Zwischenkreis → Wechselrichter; beim generatorischen Bremsen vernichtet der Bremswiderstand die überschüssige Energie'),
 {p:'Beim Abbremsen oder Absenken wirkt der Motor als Generator. Seine Energie lädt den Zwischenkreis; die Spannung steigt. Der Bremswiderstand (Brems-Chopper) wandelt sie in Wärme um. Alternativen: Netzrückspeisung oder ein gemeinsamer Zwischenkreis mehrerer Antriebe, bei dem ein bremsender Antrieb einen beschleunigenden speist.'},
 {h:'Geber: inkremental oder absolut?'},
 fig(520,175,
  t(120,16,'Inkrementalgeber',{c:'acc'})+
  path('M20,66 H40 V46 H60 V66 H80 V46 H100 V66 H120 V46 H140 V66 H160 V46 H180 V66 H210','sk-l','stroke:var(--blue);stroke-width:2')+
  path('M20,112 H50 V92 H70 V112 H90 V92 H110 V112 H130 V92 H150 V112 H170 V92 H190 V112 H210','sk-l','stroke:var(--accent);stroke-width:2')+
  t(12,60,'A',{a:'end',s:sm})+t(12,106,'B',{a:'end',s:sm})+
  ls(120,138,['A und B um 90° versetzt → Drehrichtung','Zählen der Impulse = Position','Stromausfall: Position weg → Referenzfahrt'],{s:xs,lh:13})+
  ln(250,24,250,165,'sk-c')+
  t(385,14,'Absolutgeber',{c:'acc'})+
  circ(385,82,38,'g')+ln(385,44,385,120)+ln(347,82,423,82)+
  t(405,66,'00',{s:xs})+t(405,104,'01',{s:xs})+t(365,104,'11',{s:xs})+t(365,66,'10',{s:xs})+
  t(385,37,'0°',{s:xs})+t(442,86,'90°',{s:xs})+t(385,134,'180°',{s:xs})+t(328,86,'270°',{s:xs})+
  ls(385,152,['jede Stellung hat eigenen Code','Position sofort nach dem Einschalten'],{s:xs,lh:13}),
  'Inkrementalgeber zählen Impulse, Absolutgeber liefern für jede Winkelstellung einen eindeutigen Code (Beispiel Gray-Code mit 2 Bit)'),
 {tab:[['Motor / Bauteil','Eigenschaft','Einsatz'],
  ['Schrittmotor','feste Schritte (1,8° = 200 je Umdrehung), offener Regelkreis ohne Geber; bei Überlast verlorene Schritte','einfache Positionierung, 3D-Drucker, kleine Achsen'],
  ['Servomotor','geregelt mit Geberrückführung; hohe Dynamik, Genauigkeit, Drehmoment über den ganzen Drehzahlbereich; teurer','Werkzeugmaschinenachsen, Roboter, Spindeln'],
  ['Asynchronmotor am FU','robust, wartungsarm; Drehzahl über Frequenz einstellbar','Pumpen, Lüfter, Förderer, Hauptspindeln'],
  ['Gleichrichter','AC → DC, Glättung durch Kondensator; Restwelligkeit sinkt','Netzteile, Zwischenkreis des FU']]},
 {p:'Isolationsklasse: Sie nennt die höchste zulässige Dauertemperatur der Wicklung: B 130 °C, F 155 °C, H 180 °C. Faustregel: 10 K mehr halbieren die Lebensdauer der Isolation. Übliche Motoren haben Klasse F, werden aber nur nach B ausgenutzt (Reserve).'},
 {merke:'Inkremental = zählen (Referenzfahrt nötig). Absolut = Code (sofort bekannt). Schrittmotor = Steuerung ohne Rückführung, Servo = Regelung mit Geber.'}]},

{t:'Elektrische Sicherheit, Blindleistung und Schutzorgane',b:[
 {h:'Netzformen im Überblick'},
 {tab:[['Netzform','Aufbau','Merkmal / Einsatz'],
  ['TN-S','Betriebserde am Trafo; N und PE getrennt geführt','Standard in Neuanlagen; Schutz über Abschaltung'],
  ['TN-C','gemeinsamer PEN-Leiter für N und PE','Altanlagen; empfindlich bei Unterbrechung des PEN'],
  ['TT','Anlage mit eigener Erdung, getrennt von der Trafo-Erde','FI-Schutzschalter erforderlich'],
  ['IT','Sternpunkt isoliert oder hochohmig geerdet','erster Fehler führt nicht zur Abschaltung → Isolationsüberwachung (Krankenhaus, Prozessanlagen)']]},
 {p:'Potentialausgleich: Alle leitfähigen Teile (Rohre, Maschinengestelle, Metallkonstruktionen) werden untereinander und mit dem Schutzleiter verbunden. Dadurch entstehen zwischen gleichzeitig berührbaren Teilen keine gefährlichen Spannungen; zugleich sinken elektromagnetische Störungen.'},
 {p:'Oberschwingungen entstehen durch nichtlineare Verbraucher (Frequenzumrichter, Netzteile, Gleichrichter), die nicht-sinusförmigen Strom aufnehmen. Es treten ganzzahlige Vielfache der Netzfrequenz auf. Folgen: Erwärmung von Kabeln, Trafos und Kondensatoren, Fehlauslösungen, überlasteter Neutralleiter. Abhilfe: Netzdrosseln, Filter, Trennen empfindlicher Verbraucher.'},
 {h:'Blindleistung und Kompensation'},
 fig(520,185,
  ln(40,150,250,150)+ln(250,150,250,50)+ln(40,150,250,50)+
  path('M40,150 L250,98','sk-dim','stroke-dasharray:5 3;stroke:var(--ok);stroke-width:2')+
  t(145,170,'Wirkleistung P (Nutzarbeit, kW)',{s:xs})+t(262,100,'Q',{a:'start',s:sm})+t(262,114,'Blindleistung',{a:'start',s:xs})+
  t(112,92,'S',{s:sm,a:'end'})+t(112,106,'Scheinleistung',{s:xs,a:'end'})+
  path('M80,150 A40,40 0 0 0 76,134','sk-l')+t(92,144,'φ',{s:sm})+
  t(165,142,'nach Kompensation',{s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--ok)"')+
  ls(420,50,['cos φ = P / S','','Kondensatoren ver-','ringern Q → S sinkt','→ cos φ ≈ 0,9 … 0,95','','Einzel-, Gruppen- oder','Zentralkompensation'],{s:xs,lh:15,a:'middle'}),
  'Leistungsdreieck: Kondensatoren senken die Blindleistung (grün gestrichelt), der Leistungsfaktor cos φ steigt'),
 {p:'Induktive Verbraucher (Motoren, Transformatoren) pendeln Blindleistung hin und her. Sie leistet keine Nutzarbeit, erhöht aber Strom und Leitungsverluste. Kompensation mit Kondensatoren (einzeln am Verbraucher, in Gruppen oder zentral) hebt cos φ auf etwa 0,9 bis 0,95 und vermeidet Blindleistungsentgelte.'},
 {h:'Wer schützt wen?'},
 {tab:[['Schutzorgan','schützt','vor','Merkmal'],
  ['Leitungsschutzschalter (LS)','Leitungen','Überlast, Kurzschluss','Charakteristik B, C, D je nach Einschaltstrom'],
  ['Motorschutzschalter','Motor und Leitung','Überlast, Kurzschluss','auf den Motorstrom einstellbar'],
  ['Thermorelais (Bimetall)','Motor','Überlast','löst bei Erwärmung aus; im Schütz-Aufbau'],
  ['Sanftanlasser','Netz und Mechanik','hohen Anlaufstrom und -moment','Spannungsrampe beim Anlauf'],
  ['FI-Schutzschalter (RCD)','Personen','Fehlerstrom gegen Erde','Pflicht im TT-Netz']]}]},

{t:'Energie sparen: Lastspitzen, Druckluft, ISO 50001',b:[
 {h:'Lastspitzenmanagement'},
 {p:'Der Netzbetreiber berechnet den Leistungspreis nach der höchsten gemittelten Leistung im Abrechnungszeitraum (meist Viertelstundenmittel). Eine einzige Spitze bestimmt also die Kosten des ganzen Jahres. Man glättet Spitzen durch Verschieben von Verbrauchern, gestaffelte Anläufe oder Lastabwurf. Grundlage ist die Lastgangmessung.'},
 fig(520,190,
  ar(50,160,495,160)+ar(50,160,50,12)+
  path('M50,110 H120 V50 H190 V100 H250 V80 H330 V62 H400 V92 H490','sk-l','stroke:var(--ink);stroke-width:2')+
  `<rect x="120" y="50" width="70" height="30" style="fill:color-mix(in srgb,var(--bad) 28%,var(--paper));stroke:var(--bad)"/>`+
  `<rect x="190" y="80" width="60" height="20" style="fill:color-mix(in srgb,var(--ok) 28%,var(--paper));stroke:var(--ok)"/>`+
  ln(50,80,490,80,'sk-dim').replace('class="sk-dim"','class="sk-dim" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:6 3"')+
  t(492,76,'Limit',{a:'end',s:xs})+t(155,44,'Spitze',{s:xs})+t(220,114,'Tal',{s:xs})+
  t(30,90,'Leistung',{a:'middle',s:xs}).replace('x="30" y="90"','x="14" y="95" transform="rotate(-90 14 95)"')+
  t(270,180,'Tageszeit (15-Minuten-Mittelwerte)',{s:xs})+
  ls(330,128,['Spitze abwerfen/verschieben','→ Tal füllen → Leistungspreis sinkt'],{s:xs,lh:13,a:'start'}),
  'Lastgang: Die rote Spitze wird abgeflacht, die Energie ins Tal verschoben – der Verbrauch bleibt, der Leistungspreis sinkt'),
 {h:'Druckluft: Leckagen kosten Geld'},
 {p:'Leckagen an Schläuchen, Kupplungen, Verschraubungen und Ventilen können 20 bis 30 % der erzeugten Druckluft verschlucken. Der Verlust wächst etwa quadratisch mit dem Lochdurchmesser: doppelter Durchmesser = vierfacher Verlust.'},
 fig(520,175,
  ar(50,150,300,150)+ar(50,150,50,12)+
  path(pl([0,.2,.4,.6,.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3].map(d=>[50+d*80,150-d*d*14])),'sk-l','stroke:var(--bad);stroke-width:2.5')+
  [1,2,3].map(d=>ln(50+d*80,150,50+d*80,153)+t(50+d*80,166,d+' mm',{s:xs})).join('')+
  circ(130,136,3,'r')+circ(210,94,3,'r')+circ(290,24,3,'r')+
  t(142,128,'1 ×',{a:'start',s:xs})+t(222,86,'4 ×',{a:'start',s:xs})+t(272,22,'9 ×',{a:'end',s:xs})+
  t(175,172,'Lochdurchmesser',{s:xs}).replace('y="172"','y="148"').replace('x="175"','x="176"')+
  ls(395,40,['Gegenmaßnahmen:','• Ultraschall-Leckortung','• regelmäßige Rundgänge','• Absperrventile außerhalb','   der Betriebszeit schließen','• dichte Verbinder','• Druck nicht höher als nötig'],{s:xs,lh:15,a:'start'}),
  'Leckageverlust ∼ Lochdurchmesser²'),
 {h:'ISO 50001, Wärmepumpe und KWK'},
 {p:'ISO 50001 beschreibt ein Energiemanagementsystem nach dem PDCA-Zyklus: Energiepolitik, energetische Bewertung, Kennzahlen und Zielwerte, Maßnahmenplan, Messung und Überwachung, interne Audits und Managementbewertung. Ziel ist die ständige Verbesserung der Energieeffizienz.'},
 fig(520,170,
  t(130,14,'Wärmepumpe',{c:'acc'})+
  box(2,36,80,34,['Umweltwärme','3 Teile'],{k:'g',s:xs})+box(2,92,80,34,['Strom','1 Teil'],{k:'y',s:xs})+
  fa(82,53,102,70)+fa(82,109,102,92)+box(100,58,80,46,['Wärme-','pumpe'],{k:'a',s:sm})+fa(180,81,206,81)+box(206,58,80,46,['Heizwärme','4 Teile'],{k:'r',s:xs})+
  t(130,150,'COP = Nutzwärme / Antriebsstrom = 4 : 1 = 4',{s:xs})+
  ln(300,22,300,160,'sk-c')+
  t(410,14,'Kraft-Wärme-Kopplung (BHKW)',{c:'acc'})+
  box(312,56,64,50,['Brennstoff','100 %'],{k:'y',s:xs})+fa(376,81,398,81)+box(398,56,60,50,['BHKW'],{k:'a',s:sm})+
  fa(458,66,474,46)+fa(458,81,474,81)+fa(458,96,474,116)+
  t(478,50,'Strom',{a:'start',s:xs})+t(478,85,'Wärme',{a:'start',s:xs})+t(478,120,'Verlust',{a:'start',s:xs})+
  t(410,150,'Gesamtwirkungsgrad bis ca. 90 %',{s:xs}),
  'Wärmepumpe (typischer COP 3 bis 5) und Kraft-Wärme-Kopplung nutzen Energie mehrfach'),
 {merke:'Leistungspreis = höchste Viertelstunde. Leckage: Ø verdoppeln = Verlust vervierfachen. COP = Nutzwärme / eingesetzter Strom.'}]},

{t:'Getriebe, Kupplungen und Bremsen',b:[
 {h:'Planetengetriebe'},
 fig(520,215,
  circ(110,108,100,'').replace('class="sk-body"','class="sk-body" style="fill:var(--soft);stroke:var(--ink)"')+
  circ(110,108,88,'').replace('class="sk-body"','class="sk-body" style="fill:var(--paper);stroke:var(--ink)"')+
  [90,210,330].map(a=>{const x=110+44*Math.cos(a*Math.PI/180),y=108-44*Math.sin(a*Math.PI/180);return circ(x,y,20,'g')}).join('')+
  circ(110,108,22,'a')+
  `<circle cx="110" cy="108" r="44" class="sk-dim" style="stroke-dasharray:4 3;fill:none"/>`+
  t(110,112,'Sonne',{s:xs})+
  ln(205,60,260,40,'sk-c')+t(266,44,'Hohlrad (Innenverzahnung)',{a:'start',s:sm})+
  ln(135,150,260,100,'sk-c')+t(266,104,'Planetenräder (auf Planetenträger)',{a:'start',s:sm})+
  ln(115,108,260,160,'sk-c')+t(266,164,'Sonnenrad (Eingang)',{a:'start',s:sm})+
  t(266,190,'gestrichelt: Planetenträger',{a:'start',s:xs}),
  'Planetengetriebe: Sonnenrad im Zentrum, Planetenräder auf dem Träger, außen das Hohlrad'),
 {p:'Je nachdem, welches Element festgehalten wird, ergeben sich verschiedene Übersetzungen. Beispiel: Sonne treibt an, Hohlrad steht fest, der Träger gibt ab: i = 1 + z_Hohlrad / z_Sonne (ins Langsame). Vorteile: kompakt, koaxial (An- und Abtrieb auf einer Achse), hohe Übersetzung und hohes Drehmoment, gute Lastverteilung auf mehrere Planeten.'},
 {tab:[['Bauteil','Eigenschaft','Hinweis'],
  ['Kugelgewindetrieb','Kugeln rollen zwischen Spindel und Mutter; Wirkungsgrad > 90 %; hohe Genauigkeit, Steifigkeit; wenig Verschleiß','nicht selbsthemmend → bei senkrechter Achse Bremse; teurer; Schmutzschutz'],
  ['Trapezgewinde','Gleitreibung, Wirkungsgrad deutlich niedriger','kann selbsthemmend sein, billig, robust'],
  ['Profilschienenführung','Wagen mit umlaufenden Kugeln/Rollen auf gehärteter Schiene; hohe Tragfähigkeit in alle Richtungen; geringe Reibung','ebene, steife Anschlussfläche; Spanschutz']]},
 {h:'Kupplungen: schaltbar, starr, schützend'},
 {tab:[['Kupplung','Wirkprinzip','Schalten','Typische Aufgabe'],
  ['Lamellenkupplung','reibschlüssig','auch unter Last schaltbar','definiertes Moment übertragen, sanftes Einkuppeln'],
  ['Klauenkupplung','formschlüssig','nur im Stillstand oder bei Gleichlauf','drehstarre Verbindung, einfach'],
  ['Rutschkupplung','reibschlüssig, Moment begrenzt','rutscht bei Überlast durch','Überlastschutz'],
  ['Freilaufkupplung','Klemmkörper / Sperrklinken','überträgt nur in einer Drehrichtung','Rücklaufsperre, Überholen']]},
 {h:'Betriebsbremse oder Haltebremse'},
 fig(520,128,
  box(8,16,236,48,['Betriebsbremse','verzögert die Bewegung im Betrieb'],{k:'b',s:sm})+
  ls(126,86,['Scheiben-, Trommelbremse, Bremsen über den Antrieb'],{s:xs})+
  box(276,16,236,48,['Haltebremse','hält den Stillstand'],{k:'g',s:sm})+
  ls(394,86,['Federspeicherbremse: stromlos = Bremse zu','mit Strom gelüftet (fail-safe)'],{s:xs,lh:13})+
  t(260,120,'Haltebremse nie zum dynamischen Bremsen verwenden – sie verschleißt',{s:xs,c:'acc'}),
  'Betriebsbremse verzögert, Haltebremse hält'),
 {falle:'Federspeicherbremse: Sie bremst im stromlosen Zustand und wird mit Strom gelüftet. Bei Stromausfall fällt also die Bremse ein – das ist gewollt (fail-safe), nicht Fehlfunktion.'}]},

{t:'Hydraulik im Bild: Zylinder, Drosseln, Druckübersetzer',b:[
 {h:'Druck, Kraft, Fläche'},
 {fx:{n:'Kolbenkraft',tex:'p=\\frac{F}{A}\\quad F=p\\cdot A',leg:[['p','Druck in N/mm² (1 bar = 0,1 N/mm²)'],['F','Kraft in N'],['A','wirksame Kolbenfläche in mm²']],e:'Beispiel: 100 bar = 10 N/mm² auf Ø 50 mm (A ≈ 1.963 mm²) → F ≈ 19,6 kN. Pascal = N/m²; 1 bar = 10⁵ Pa.'}},
 {fx:{n:'Hebelgesetz',tex:'F_1\\cdot l_1=F_2\\cdot l_2',leg:[['F','Kraft in N'],['l','Hebelarm in m']],e:'Beispiel: 200 N am Arm 0,6 m halten am Arm 0,2 m eine Last von 600 N im Gleichgewicht. Kraftgewinn wird mit längerem Weg bezahlt.'}},
 {h:'Differentialzylinder und Eilgang'},
 fig(520,230,
  `<rect x="40" y="26" width="270" height="60" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/>`+
  `<rect x="150" y="26" width="10" height="60" style="fill:color-mix(in srgb,var(--accent) 40%,var(--paper));stroke:var(--accent);stroke-width:1.5"/>`+
  `<rect x="160" y="49" width="190" height="14" style="fill:var(--soft);stroke:var(--ink);stroke-width:1.5"/>`+
  ln(70,26,70,12)+ln(280,26,280,12)+t(70,10,'A',{s:sm})+t(280,10,'B',{s:sm})+
  t(95,60,'Kolbenseite',{s:xs})+t(95,74,'Kolbenfläche (groß)',{s:xs})+t(220,46,'Ringseite',{s:xs})+t(240,82,'Ringfläche = Kolben − Stange',{s:xs})+t(370,57,'Stange',{a:'start',s:xs})+
  box(4,108,168,114,['Normal','A: Druck, B: Tank','Kolbenfläche','große Kraft','langsam'],{k:'b',s:xs,lh:16})+
  box(176,108,168,114,['Differentialschaltung','A und B: Druck','wirksam nur Stangenfläche','Öl der Ringseite fließt','zusätzlich zur Kolbenseite','→ Eilgang, kleine Kraft'],{k:'a',s:xs,lh:16})+
  box(348,108,168,114,['Einfahren','B: Druck, A: Tank','Ringfläche','mittlere Kraft','schneller als Ausfahren'],{k:'g',s:xs,lh:16}),
  'Differentialzylinder: Differentialschaltung = schneller, aber schwächer (F = p · Stangenfläche)'),
 {h:'Druckübersetzer'},
 fig(520,150,
  `<rect x="30" y="30" width="150" height="80" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/>`+
  `<rect x="180" y="55" width="150" height="30" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/>`+
  `<rect x="170" y="30" width="10" height="80" style="fill:color-mix(in srgb,var(--blue) 35%,var(--paper));stroke:var(--blue);stroke-width:1.5"/>`+
  `<rect x="320" y="55" width="10" height="30" style="fill:color-mix(in srgb,var(--accent) 35%,var(--paper));stroke:var(--accent);stroke-width:1.5"/>`+
  ln(180,70,320,70)+
  t(95,65,'p₁ = 60 bar',{s:sm})+t(95,82,'A₁ = 40 cm²',{s:sm})+t(255,100,'p₂ = 240 bar',{s:sm})+t(255,117,'A₂ = 10 cm²',{s:sm})+
  ls(420,50,['p₁ · A₁ = p₂ · A₂','p₂ = 60 · 40 / 10','= 240 bar'],{s:sm,lh:18})+
  t(260,140,'Volumenstrom sinkt im gleichen Verhältnis (Energie bleibt, ohne Verluste)',{s:xs}),
  'Druckübersetzer: kleine Fläche → hoher Druck'),
 {h:'Drosselungsarten'},
 fig(520,192,
  [0,1,2].map(i=>{const x=i*174;
   const base=`<rect x="${x+24}" y="100" width="100" height="30" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/><rect x="${x+68}" y="100" width="8" height="30" style="fill:color-mix(in srgb,var(--accent) 40%,var(--paper));stroke:var(--accent)"/><rect x="${x+76}" y="111" width="38" height="8" style="fill:var(--soft);stroke:var(--ink)"/>`;
   const dr=(cx,cy)=>`<rect x="${cx-11}" y="${cy-8}" width="22" height="16" rx="3" style="fill:color-mix(in srgb,var(--bad) 25%,var(--paper));stroke:var(--bad)"/>`+t(cx,cy+4,'D',{s:xs});
   const pump=t(x+8,80,'Pumpe',{a:'start',s:xs});
   const tank=(px,py)=>t(px+10,py-4,'Tank',{s:xs});
   if(i===0)return base+pump+ln(x+8,64,x+60,64)+ln(x+60,64,x+60,100)+dr(x+34,64)+ln(x+112,100,x+112,64)+ln(x+112,64,x+150,64)+tank(x+150,58)+t(x+87,150,'Drossel vor',{s:xs})+t(x+87,163,'dem Zylinder',{s:xs});
   if(i===1)return base+pump+ln(x+8,64,x+60,64)+ln(x+60,64,x+60,100)+ln(x+112,100,x+112,64)+ln(x+112,64,x+150,64)+dr(x+132,64)+tank(x+150,58)+t(x+87,150,'Drossel am Ablauf',{s:xs})+t(x+87,163,'hält ziehende Last',{s:xs});
   return base+pump+ln(x+8,64,x+60,64)+ln(x+60,64,x+60,100)+ln(x+34,64,x+34,40)+dr(x+34,32)+ln(x+112,100,x+112,64)+ln(x+112,64,x+150,64)+tank(x+150,58)+t(x+87,150,'Nebenstrom am Zylinder',{s:xs})+t(x+87,163,'vorbei zum Tank',{s:xs});
  }).join('')+t(87,180,'Zulaufdrosselung',{c:'acc'})+t(261,180,'Ablaufdrosselung',{c:'acc'})+t(435,180,'Nebenstromdrosselung',{c:'acc'}),
  'Drosselschaltungen: wo die Drossel sitzt, entscheidet über Verhalten bei ziehender Last'),
 {tab:[['Drosselung','Eignung','Hinweis'],
  ['Zulaufdrosselung','nicht für ziehende Last','Last kann dem Zylinder vorauseilen'],
  ['Ablaufdrosselung','hält ziehende Lasten','erzeugt Gegendruck'],
  ['Nebenstromdrosselung','geringerer Verlust','Geschwindigkeit hängt von der Last ab']]},
 {p:'Drosseln erzeugen immer Verlustwärme. Hydrauliköl wird nach Viskositätsklasse gewählt: ISO VG 46 bedeutet 46 mm²/s bei 40 °C. Zu dünnes Öl führt zu Leckage und Verschleiß, zu dickes zu Verlusten und Kavitation. Die Filterfeinheit (β-Wert, Reinheitsklasse nach ISO 4406) legt fest, welche Partikel abgeschieden werden; Verschmutzung ist die häufigste Ursache von Hydraulikausfällen.'}]},

{t:'Verfügbarkeit, Weibull-Verteilung und RCM',b:[
 {fx:{n:'Verfügbarkeit',tex:'V=\\frac{MTBF}{MTBF+MTTR}',leg:[['MTBF','mittlere Betriebsdauer zwischen Ausfällen'],['MTTR','mittlere Reparaturzeit']],e:'Beispiel: MTBF 400 h, MTTR 4 h → V = 400/404 ≈ 99,0 %. Steigern: längere MTBF (Wartung, Verbesserung) oder kürzere MTTR (Ersatzteile, Schulung).'}},
 {h:'Ausfallverhalten: Die Badewannenkurve'},
 fig(520,230,
  ar(50,190,500,190)+ar(50,190,50,14)+
  path('M50,45 C80,120 110,150 150,150 L300,150 C360,150 390,110 420,40','sk-l','stroke:var(--bad);stroke-width:2.8')+
  ln(150,190,150,28,'sk-c')+ln(300,190,300,28,'sk-c')+
  t(100,38,'Frühausfälle',{s:xs})+t(100,52,'β < 1',{s:xs,c:'acc'})+t(100,66,'fallend',{s:xs})+
  t(225,100,'Zufallsausfälle',{s:xs})+t(225,114,'β ≈ 1, konstant',{s:xs,c:'acc'})+
  t(390,28,'Verschleiß',{s:xs})+t(390,42,'β > 1',{s:xs,c:'acc'})+t(450,60,'steigend',{s:xs,a:'start'}).replace('x="450"','x="425"').replace('y="60"','y="58"')+
  t(100,172,'Montage, Einlauf',{s:xs})+t(225,172,'Nutzungsdauer',{s:xs})+t(400,172,'Alterung',{s:xs})+
  t(275,212,'Betriebszeit',{s:xs})+t(22,112,'Ausfallrate',{s:xs}).replace('x="22" y="112"','x="16" y="115" transform="rotate(-90 16 115)"'),
  'Badewannenkurve: Der Weibull-Formparameter β verrät den Ausfalltyp'),
 {tab:[['Formparameter β','Ausfallart','Strategie'],
  ['< 1','Frühausfälle (Montage- und Materialfehler)','Einlauftest, Qualität sichern'],
  ['≈ 1','Zufallsausfälle','vorbeugender Austausch lohnt nicht → Zustandsüberwachung oder Ausfall akzeptieren'],
  ['> 1','Verschleiß-/Alterungsausfälle','vorbeugender Austausch vor dem Ausfall lohnt']]},
 {h:'RCM – zuverlässigkeitsorientierte Instandhaltung'},
 {p:'RCM analysiert für jede Funktion einer Anlage mögliche Funktionsausfälle, Ursachen und Folgen (ähnlich der FMEA) und wählt danach die wirtschaftlich sinnvollste Strategie. Sicherheits- und Umweltfolgen haben Vorrang.'},
 fig(520,128,
  box(4,16,120,44,['Funktion','definieren'],{k:'b',s:sm})+fa(124,38,142,38)+box(144,16,120,44,['Ausfälle,','Ursachen, Folgen'],{k:'b',s:sm})+fa(264,38,282,38)+box(284,16,120,44,['Bewertung','Sicherheit / Umwelt / €'],{k:'y',s:xs})+fa(404,38,422,38)+box(424,16,92,44,['Strategie','wählen'],{k:'g',s:sm})+
  ls(260,92,['Vorbeugung  ·  Zustandsüberwachung  ·  Ausfall akzeptieren  ·  Konstruktion ändern'],{s:xs})+
  t(260,116,'wirtschaftlich sinnvollste Maßnahme je Funktion',{s:xs,c:'acc'}),
  'RCM-Ablauf'),
 {h:'Schwingungsanalyse: Muster im Spektrum'},
 fig(520,190,
  ar(50,150,500,150)+ar(50,150,50,14)+
  [[90,95,'Unwucht','1 × Drehfrequenz'],[180,60,'Fluchtungsfehler','2–3 × Drehfrequenz'],[290,100,'Wälzlager','Überrollfrequenzen'],[410,80,'Zahnräder','Zahneingriffsfrequenz']].map(([x,h,n,s])=>ln(x,150,x,150-h,'sk-l').replace('class="sk-l"','class="sk-l" style="stroke:var(--accent);stroke-width:4"')+t(x,164,n,{s:xs})+t(x,176,s,{s:xs})).join('')+
  t(275,10,'Amplitude über Frequenz',{s:xs,c:'acc'}),
  'Schwingungsspektrum: jede Schadensart hat ihre typische Frequenz (Höhen nur schematisch)'),
 {p:'Sensoren messen Schwingschnelle oder -beschleunigung an den Lagerstellen. Trends zeigen die Verschlechterung früh an. Das Anlagenbuch (Maschinenakte) dokumentiert je Anlage Stammdaten, Wartungs- und Prüfpläne, durchgeführte Arbeiten, Ersatzteile, Störungen und Prüfnachweise (auch für Betriebssicherheit und Haftung). Ein CMMS (Computerized Maintenance Management System) verwaltet das digital: Aufträge, Intervalle, Ersatzteilbestand, Kosten, Kennzahlen.'}]},

{t:'Lagerung, Schmierung, Verschleiß und Korrosion',b:[
 {h:'Reibungszustände und Stribeck-Kurve'},
 fig(520,215,
  ar(50,175,500,175)+ar(50,175,50,14)+
  path('M60,40 C100,60 120,125 170,140 C210,150 240,152 280,148 C340,142 420,132 490,118','sk-l','stroke:var(--bad);stroke-width:2.8')+
  ln(155,175,155,28,'sk-c')+ln(270,175,270,28,'sk-c')+
  box(58,182,96,28,['Fest-/Mischreibung'],{k:'r',s:xs})+box(158,182,106,28,['Übergang (Minimum)'],{k:'y',s:xs})+box(268,182,224,28,['Flüssigkeitsreibung: Film trennt'],{k:'g',s:xs})+
  circ(215,151,4,'a')+t(215,134,'Reibungszahl minimal',{s:xs})+
  t(275,12,'Drehzahl / Viskosität / (1 / Last)  →',{s:xs}).replace('y="12"','y="22"')+t(16,100,'Reibungszahl',{s:xs}).replace('x="16" y="100"','x="16" y="105" transform="rotate(-90 16 105)"'),
  'Stribeck-Kurve: Ziel ist Flüssigkeitsreibung im Dauerbetrieb'),
 {tab:[['Thema','Kernaussage'],
  ['Festlager / Loslager','Festlager führt axial und nimmt Axialkräfte auf; Loslager lässt Wärmedehnung zu'],
  ['Lagerluft','zu klein → Erwärmung und Verspannen; zu groß → Geräusche, Verschleiß; CN normal, C3 größer'],
  ['O-Anordnung','Druckkegel nach außen: breite Stützbasis, starr gegen Kippen'],
  ['X-Anordnung','Druckkegel nach innen: kurze Basis, tolerant gegen Fluchtungsfehler'],
  ['Vorspannen','entfernt Spiel, erhöht Steifigkeit und Laufgenauigkeit (Spindel), aber mehr Reibung und Wärme'],
  ['NLGI-Klasse','Konsistenz von 000 (halbflüssig) bis 6 (sehr fest); Wälzlager üblich NLGI 2, Zentralschmierung weicher (0–1)']]},
 {h:'Schmierverfahren'},
 {tab:[['Verfahren','Einsatz'],
  ['Fettschmierung','Wälzlager, wartungsarm'],['Tauch-/Spritzschmierung','Getriebe'],['Umlaufschmierung (Pumpe, Filter)','hohe Last, Kühlung'],['Ölnebelschmierung','hohe Drehzahlen'],['Zentralschmierung','viele Schmierstellen automatisch'],['Verlustschmierung','Öl/Fett wird nicht zurückgeführt']]},
 {h:'Verschleißarten'},
 fig(520,128,
  box(4,10,122,52,['Abrasion','Furchen durch','harte Partikel'],{k:'y',s:xs})+box(134,10,122,52,['Adhäsion','Verschweißen,','Fressen'],{k:'r',s:xs})+box(264,10,122,52,['Oberflächen-','zerrüttung','Pitting, Ermüdung'],{k:'b',s:xs})+box(394,10,122,52,['Tribochemische','Reaktion','Korrosion + Reibung'],{k:'g',s:xs})+
  ls(260,92,['Gegenmaßnahmen: Schmierung · Härte · Filterung · geeignete Werkstoffpaarung'],{s:xs})+
  t(260,116,'Reibkorrosion (Passungsrost): Mikrobewegung zerstört die Oxidschicht – rotbrauner Abrieb',{s:xs,c:'acc'}),
  'Vier Grundformen des Verschleißes'),
 {h:'Korrosion'},
 fig(520,175,
  `<rect x="30" y="80" width="180" height="60" class="sk-body" style="fill:color-mix(in srgb,var(--blue) 18%,var(--paper));stroke:var(--blue)"/>`+t(120,115,'Elektrolyt (Wasser, Salz)',{s:xs})+
  `<rect x="40" y="40" width="64" height="60" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/>`+t(72,66,'Stahl',{s:xs})+t(72,80,'Kathode',{s:xs})+
  `<rect x="140" y="40" width="64" height="60" class="sk-body" style="fill:color-mix(in srgb,var(--warn) 25%,var(--paper));stroke:var(--warn)"/>`+t(172,66,'Zink',{s:xs})+t(172,80,'Opferanode',{s:xs})+
  path('M104,52 H140','sk-f')+t(122,44,'e⁻',{s:xs})+t(120,160,'unedleres Metall löst sich auf',{s:xs,c:'acc'})+
  ls(250,38,['Kathodischer Schutz','Bauteil wird mit Opferanode (Zink, Magnesium)','verbunden oder per Fremdstrom Kathode.','','Kontaktkorrosion','zwei verschieden edle Metalle im Elektrolyt:','das unedlere wird angegriffen.'],{s:xs,lh:14,a:'start'}),
  'Kathodischer Schutz mit Opferanode'),
 {tab:[['Korrosionsform','Merkmal'],['Lochfraß','örtliche tiefe Löcher an passivierten Metallen, meist durch Chloride (Edelstahl)'],['Spaltkorrosion','enge Spalten mit Sauerstoffmangel, z. B. unter Dichtungen, Schrauben'],['Reibkorrosion','Passungsrost: Mikrobewegungen zwischen Passflächen; Ausgangspunkt für Dauerbrüche']]},
 {p:'Dauerbruch (Schwingbruch): Bruch durch wechselnde Belastung weit unter der Zugfestigkeit. Von einer Kerbe geht ein Anriss aus, der langsam wächst (glatte Fläche mit Rastlinien), bis der Restquerschnitt gewaltsam bricht. Vermeiden: Kerben vermeiden (Radien, glatte Oberflächen), Dauerfestigkeit beachten, Überlasten und Schwingungen mindern, Randschichten verfestigen.'}]},

{t:'Pumpen, Sensoren, Steuerung und Feldbus',b:[
 {h:'Kavitation und NPSH'},
 fig(520,170,
  ar(50,130,500,130)+ar(50,130,50,14)+
  path('M50,40 C150,42 250,52 330,70 C400,90 440,110 480,125','sk-l','stroke:var(--accent);stroke-width:2.8')+
  path('M50,125 C150,100 250,75 350,50 C420,32 460,20 490,14','sk-l','stroke:var(--bad);stroke-width:2.8')+
  t(115,34,'NPSH vorhanden (Anlage)',{s:xs,a:'start'})+t(400,24,'NPSH erforderlich (Pumpe)',{s:xs,a:'end'}).replace('x="400"','x="490"').replace('y="24"','y="8"')+
  circ(318,67,4,'y')+ln(318,67,318,130,'sk-c')+t(318,146,'Kavitationsgrenze',{s:xs,a:'middle'})+
  t(150,146,'sicherer Bereich',{s:xs,c:'ok'}).replace('class="sk-t ok"','class="sk-t" style="font-size:11px;fill:var(--ok)"')+t(440,146,'Kavitation',{s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--bad)"')+
  t(490,164,'Förderstrom Q  →',{s:xs,a:'end'}),
  'Kavitationsfrei nur, wenn NPSH vorhanden > NPSH erforderlich + Sicherheitszuschlag'),
 {p:'Kavitation: Fällt der Druck lokal unter den Dampfdruck, bilden sich Dampfblasen, die bei höherem Druck schlagartig implodieren. Merkmale: Geräusche wie Kies, Vibration, Förderstromabfall, Materialabtrag (Pitting) am Laufrad. Abhilfe: Saughöhe verringern, Saugleitung kurz und weit, Filter sauber, Flüssigkeit kühler, Drehzahl senken.'},
 {h:'Sensoren für Temperatur und Kraft'},
 {tab:[['Sensor','Prinzip','Merkmale'],
  ['Thermoelement','Thermospannung zweier verbundener Metalle (Seebeck-Effekt)','robust, hohe Temperaturen, braucht Vergleichsstelle'],
  ['Pt100','Platin-Widerstand, 100 Ω bei 0 °C','genau und stabil bis ca. 600 °C; braucht Strom, 3- oder 4-Leiter-Technik zur Leitungskompensation'],
  ['Dehnungsmessstreifen (DMS)','Widerstand ändert sich bei Dehnung/Stauchung; Wheatstone-Brücke misst kleine Änderung','Kraft-, Drehmoment-, Druck-, Wägezellen']]},
 {h:'SPS-Programmiersprachen (IEC 61131-3)'},
 fig(520,120,
  box(4,10,98,50,['KOP','Kontaktplan','grafisch'],{k:'b',s:xs})+box(108,10,98,50,['FBS / FUP','Funktions-','bausteine'],{k:'b',s:xs})+box(212,10,98,50,['AWL','Anweisungsliste','textuell'],{k:'g',s:xs})+box(316,10,98,50,['ST','Strukturierter','Text (Hochspr.)'],{k:'g',s:xs})+box(420,10,96,50,['AS','Ablaufsprache','Schrittketten'],{k:'a',s:xs})+
  t(260,86,'Meist werden die Sprachen gemischt, z. B. AS für den Ablauf und ST/KOP in den Schritten',{s:xs}),
  'Die fünf Sprachen der IEC 61131-3'),
 {h:'Feldbus und Schnittstellen'},
 {tab:[['System','Merkmal'],
  ['Profibus / Profinet','Siemens, weit verbreitet; Profinet läuft auf Ethernet'],
  ['AS-Interface','zweiadrig für Sensoren und Aktoren (Energie + Daten)'],
  ['IO-Link','Punkt-zu-Punkt zu intelligenten Sensoren/Aktoren'],
  ['EtherCAT, Modbus','echtzeitfähiges Ethernet bzw. einfaches serielles Protokoll'],
  ['OPC UA','herstellerunabhängiger Standard zum Datenaustausch bis in die IT-Ebene (Industrie 4.0)']]}]},

{t:'Maschinensicherheit: Kategorie, PL, Sicherheitsabstand, Not-Halt',b:[
 {p:'Sicherheitsfunktionen werden nach DIN EN ISO 13849 durch Kategorie (B, 1, 2, 3, 4: Struktur, Fehlertoleranz, Prüfung) und Performance Level PL (a bis e: Wahrscheinlichkeit gefährlicher Ausfälle) eingestuft. Das erforderliche PL ergibt sich aus der Risikobeurteilung: Schwere der Verletzung, Häufigkeit der Gefährdung, Möglichkeit der Vermeidung. Kategorie 3 heißt: einfehlersicher, zweikanalig mit Fehlererkennung; PL d ist für viele Maschinen üblich.'},
 {h:'Sicherheitsabstand nach ISO 13855'},
 fig(520,185,
  `<rect x="30" y="60" width="90" height="90" class="sk-body" style="fill:color-mix(in srgb,var(--bad) 18%,var(--paper));stroke:var(--bad)"/>`+t(75,100,'Gefahr-',{s:sm})+t(75,116,'stelle',{s:sm})+
  ln(300,40,300,160,'sk-l').replace('class="sk-l"','class="sk-l" style="stroke:var(--ok);stroke-width:3"')+t(300,34,'Schutzeinrichtung (z. B. Lichtvorhang)',{s:xs})+
  ar(300,98,120,98)+t(210,90,'S',{s:sm})+
  ar(480,150,305,150)+t(400,142,'Annäherung K = 2000 mm/s',{s:xs}),
  'Der Abstand S muss mindestens so groß sein, dass der Körper die Gefahrstelle nicht vor dem Stillstand erreicht'),
 {fx:{n:'Sicherheitsabstand',tex:'S=K\\cdot T+C',leg:[['K','Annäherungsgeschwindigkeit, meist 2000 mm/s (bei größerem Abstand 1600 mm/s)'],['T','Gesamtnachlaufzeit = Reaktionszeit Schutzeinrichtung + Steuerung + Stillsetzzeit der Maschine'],['C','Zuschlag je nach Eindringtiefe in mm']],e:'Längere Nachlaufzeit ⇒ größerer Abstand. Beispiel: T = 0,3 s, K = 2000 mm/s, C = 100 mm → S = 700 mm.'}},
 {h:'Not-Halt oder Not-Aus?'},
 {tab:[['Stopp-Kategorie','Wirkung'],
  ['0','sofortiges Abschalten der Energie (ungesteuert)'],
  ['1','gesteuertes Stillsetzen, danach Abschalten der Energie'],
  ['2','gesteuertes Stillsetzen, Energie bleibt']]},
 {p:'Der Not-Halt stoppt gefährliche Bewegungen schnell. Not-Aus trennt zusätzlich die Energiezufuhr, um elektrischen Gefahren zu begegnen. Der Taster ist rot auf gelbem Grund, rastend und jederzeit erreichbar. Rücksetzen darf die Maschine nicht automatisch anlaufen lassen.'},
 {merke:'S = K · T + C: Nachlaufzeit steigt ⇒ Abstand steigt. Not-Halt nicht automatisch zurücksetzen – erst Quittieren, dann Neustart.'}]}
]);}
