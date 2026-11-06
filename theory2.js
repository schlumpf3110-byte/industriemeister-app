// Ergänzende Theorie-Kapitel (aus Dozentenunterlagen, Prüfungsrecherche und neuen Karteikarten) mit Schaubildern.
// Zeichen-Helfer für SVG-Schaubilder: alle Farben über CSS-Variablen, damit Hell- und Dunkelmodus funktionieren.
const TH2=(()=>{
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const tint={b:'--blue',a:'--accent',g:'--ok',r:'--bad',y:'--warn'};
  const fillOf=k=>k&&tint[k]?`fill:color-mix(in srgb,var(${tint[k]}) 20%,var(--paper));stroke:var(${tint[k]})`:'';
  const t=(x,y,s,o={})=>`<text x="${x}" y="${y}" text-anchor="${o.a||'middle'}" class="sk-t${o.c?' '+o.c:''}"${o.s?` style="${o.s}"`:''}>${esc(s)}</text>`;
  const ls=(x,y,arr,o={})=>arr.map((s,i)=>t(x,y+i*(o.lh||15),s,o)).join('');
  const box=(x,y,w,h,arr,o={})=>{arr=[].concat(arr);const lh=o.lh||15;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx==null?6:o.rx}" class="sk-body${o.ghost?' ghost':''}"${fillOf(o.k)?` style="${fillOf(o.k)}"`:''}/>`+ls(x+w/2,y+h/2-(arr.length-1)*lh/2+5,arr,o)};
  const ln=(x1,y1,x2,y2,c='sk-l')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
  const ar=(x1,y1,x2,y2,c='sk-f')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" marker-end="url(#ar)"/>`;
  const fa=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="sk-dim" style="stroke-width:1.6;stroke:var(--accent)" marker-end="url(#ar)"/>`;
  const rect=(x,y,w,h,k,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"${extra} style="${fillOf(k)||'fill:var(--soft);stroke:var(--ink)'};stroke-width:1.5"/>`;
  const circ=(x,y,r,k)=>`<circle cx="${x}" cy="${y}" r="${r}" class="sk-body"${fillOf(k)?` style="${fillOf(k)}"`:''}/>`;
  const path=(d,c='sk-l',st='')=>`<path d="${d}" class="${c}"${st?` style="${st}"`:''}/>`;
  const fig=(w,h,body,cap)=>({svg:{w,h,body,cap}});
  return {esc,t,ls,box,ln,ar,fa,rect,circ,path,fig};
})();
function addTheory(k,chs){(THEORY[k]=THEORY[k]||[]).push(...chs)}
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px';
addTheory('MT',[
{t:'Montagestrukturen und Organisationsformen',b:[
 {p:'Die Montagestruktur gliedert das gesamte Montagesystem in Teilbereiche, ausgehend von der Zusammenbaufolge. Sie richtet sich nach dem Produktspektrum, der Stückzahl (Produktionsvolumen) und der Produktstruktur. Für jedes Teilsystem wird danach die wirtschaftlichste Organisationsform gewählt.'},
 {tab:[['Gliederung','Prinzip','Typisches Beispiel / Folge'],
  ['produktbezogen','verschiedene Produkte in großer Stückzahl in voneinander unabhängigen Bereichen','Bereiche und Mitarbeiter spezialisiert, völlig unabhängig – kaum Abstimmungsprobleme'],
  ['baustufenbezogen','folgt der Produktstruktur: Baugruppen- und Endmontage getrennt','parallele Abläufe verkürzen die Durchlaufzeit; Teilsysteme voneinander abhängig'],
  ['verfahrensbezogen','Prozesse, die sich stören, werden getrennt','Lärm und Staub (Schleifen, Nieten) nicht neben sauberer Feinmontage'],
  ['qualifikationsbezogen','Aufgaben nach Können der Mitarbeiter gebündelt','anspruchsvolle Justage bei Fachkräften, einfache Fügearbeit bei Angelernten']]},
 {p:'In der Praxis kommen meist Mischformen vor. Außer bei rein produktbezogener Gliederung hängen die Teilsysteme voneinander ab; das führt oft zu Problemen im Material- und Informationsfluss.'},
 {h:'Organisationsformen der Montage'},
 {p:'Die Merkmale einer Organisationsform sind die Arbeitsteilung und das Bewegungsverhalten von Mitarbeitern und Montageobjekt. Die Wahl hängt ab von Masse, Abmessungen und Komplexität des Objekts, Schwierigkeitsgrad, Montagezeit, Losgröße und Jahresstückzahl.'},
 fig(520,205,
  box(165,6,190,30,['Organisationsformen'],{k:'b'})+ln(260,36,260,52)+ln(62,52,458,52)+
  [62,194,326,458].map(x=>ln(x,52,x,66)).join('')+
  box(4,66,116,44,['Einzelplatz-','montage'],{k:'g'})+box(136,66,116,44,['Gruppen-','montage'],{k:'g'})+box(268,66,116,44,['Reihen-','montage'],{k:'g'})+box(400,66,116,44,['Fließ-','montage'],{k:'a'})+
  ls(62,130,['ein Platz, kein','Wechsel; bei Großteilen','Baustellenmontage'],{s:sm,lh:15})+
  ls(194,130,['Objekte stehen,','Mitarbeiter rücken','von Objekt zu Objekt'],{s:sm,lh:15})+
  ls(326,130,['Objekt wandert von','Station zu Station;','kein fester Takt'],{s:sm,lh:15})+
  ls(458,130,['Stationen verkettet,','Takt; kontinuierlich','oder intermittierend'],{s:sm,lh:15})+
  t(260,198,'Arbeitsteilung nimmt von links nach rechts zu',{c:'acc'}),
  'Organisationsformen der Montage im Überblick: von der Einzelplatzmontage ohne Arbeitsteilung bis zur verketteten Fließmontage'),
 {tab:[['Form','Kennzeichen','Vorteile','Nachteile'],
  ['Einzelplatzmontage','alle Vorgänge an einem Arbeitsplatz, keine Arbeitsteilung; Teile am Platz bereitgestellt','flexibel bei Stückzahl und Typenvielfalt; Störung wirkt nicht auf andere Plätze; großer Handlungsspielraum','begrenzte Kapazität; viele Plätze = hohe Kosten; viel Sekundäraufwand; kaum Wiederholung, daher schwer automatisierbar'],
  ['Baustellenmontage','Sonderform für große Objekte: Objekt bleibt stationär, wird an einer Stelle komplett montiert (Maschinenbau)','Zugänglichkeit von allen Seiten','sehr hoher Platzbedarf; Materialbereitstellung getrennt von der Montage'],
  ['Gruppenmontage','Objekte stehen, spezialisierte Mitarbeiter wandern von Objekt zu Objekt (meist große Objekte)','Spezialisierung, kein Transport des Objekts','Wege der Mitarbeiter, Koordination'],
  ['Reihenmontage','Objekt wandert zwischen Stationen; einfachste Form der Fließfertigung; keine Taktzeit, kein exakt festgelegter Transport','kurze Durchlaufzeiten; für mittlere bis große Maschinen geeignet','grobe Arbeitsteilung führt zu Warte- und Transportzeiten'],
  ['Fließmontage (Bandmontage)','mehrere verkettete Arbeitsplätze im Takt','hohe Stückzahl, hohe Produktivität','unflexibel bei Stückzahl- und Variantenänderung']]},
 fig(520,262,
  box(185,6,150,28,['Fließmontage'],{k:'a'})+ln(260,34,260,48)+ln(125,48,395,48)+ln(125,48,125,60)+ln(395,48,395,60)+
  box(30,60,190,44,['kontinuierlich','Objekt + Personal synchron'],{k:'g',s:sm})+box(300,60,190,44,['intermittierend','Objekt bleibt am Platz'],{k:'g',s:sm})+
  ls(125,128,['Personal läuft oder fährt mit','Autoindustrie, Großgeräte'],{s:sm})+
  ln(395,104,395,118)+ln(335,118,455,118)+ln(335,118,335,130)+ln(455,118,455,130)+
  box(280,130,110,36,['manuell','fördern'],{k:'y',s:sm})+box(400,130,110,36,['mechanisiert','fördern'],{k:'y',s:sm})+
  ln(455,166,455,178)+ln(405,178,505,178)+ln(405,178,405,190)+ln(505,178,505,190)+
  box(350,190,100,36,['geordnet','Werkstückträger'],{s:sm})+box(458,190,56,36,['ungeord.'],{s:sm})+
  ls(342,186,['manuell: flexibel,','aber viel Ablegen/','Greifen, unkontrol-','lierte Puffer'],{s:'font-size:11px',lh:12,a:'end'})+
  t(260,254,'starr verkettet = Takt, synchroner Transport  ·  lose verkettet = Puffer, kein Taktzwang',{s:sm}),
  'Fließmontage: kontinuierlich oder intermittierend, mit manuellem oder mechanisiertem Fördern'),
 {merke:'Reihenmontage: Objekt wandert, aber ohne festen Takt. Gruppenmontage: Objekt steht, Mitarbeiter wandern. Fließmontage: verkettet und getaktet.'},
 {h:'Stückweise oder verrichtungsweise montieren?'},
 {tab:[['','Stückweise Montage','Verrichtungsweise (satzweise) Montage'],
  ['Ablauf','ein Objekt wird am Arbeitsplatz komplett fertig, dann das nächste','mehrere Objekte liegen am Platz, Schritt 1 an allen, dann Schritt 2 usw.'],
  ['Wirkung','keine Bewegungswiederholung','Bewegungswiederholung, weniger Werkzeugwechsel, Kleinteile in Mengen gegriffen'],
  ['Sekundäraufwand','hoch (Hinlangen/Bringen je Teil)','sinkt, damit steigt die Produktivität'],
  ['Eignung','Einzelstücke, kleine Serien, große Teile','nur bei gleichen Objekten in höherer Stückzahl']]},
 {p:'Vor-, Teil- und Endmontage: Die Vormontage fertigt Baugruppen unabhängig vom Hauptprodukt, die Teilmontage setzt sie zu größeren Einheiten zusammen, die Endmontage vereint alles zum Erzeugnis. Eine Montageinsel ist ein abgegrenzter Arbeitsbereich, in dem ein Team ein Produkt weitgehend selbstständig montiert.'},
 {p:'Optimierte Gestaltung: Arbeitsinhalte möglichst gleichmäßig auf die Plätze verteilen, personengebundene Arbeitsteilung vermeiden (jeder kann alles in der Gruppe), statt einer langen Linie mehrere kurze Linien einsetzen – das senkt Abtaktungsverluste und erhöht die Flexibilität bei Stückzahlschwankungen, braucht aber mehr Betriebsmittel.'}]},

{t:'Materialbereitstellung in der Montage',b:[
 {p:'Für eine reibungslose Montage müssen alle Bauelemente in der geforderten Qualität, in ausreichender Menge und termingerecht vorliegen (Disposition von Eigen- und Fremdteilen). Die Bereitstellungsform bestimmt Lager- und Kapitalbindung auf der einen und den Logistikaufwand auf der anderen Seite.'},
 fig(520,190,
  t(260,18,'Welche Form passt? Die Zielgrößen laufen gegeneinander',{c:'acc'})+
  ln(40,100,480,100)+
  box(30,52,130,56,['geschlossene','auftragsabhängige','Bereitstellung'],{k:'b',s:sm})+box(195,52,130,56,['gemischte','Bereitstellung'],{k:'g',s:sm})+box(360,52,130,56,['montagesynchron','(Just-in-time)','Kanban'],{k:'a',s:sm})+
  ar(40,142,480,142)+t(40,162,'Lager- und Kapitalbindung hoch',{a:'start',s:sm})+t(480,162,'niedrig',{a:'end',s:sm})+
  ar(480,176,40,176)+t(480,190,'Logistikaufwand hoch',{a:'end',s:sm})+t(40,190,'niedrig',{a:'start',s:sm}),
  'Bereitstellungsformen im Vergleich: Wer Lagerkosten spart, zahlt mit höherem Logistikaufwand'),
 {tab:[['Form','Prinzip','Passt zu'],
  ['geschlossen, auftragsabhängig','alles Material wird zu Beginn der Montage bereitgestellt','wenig komplexe Produkte mit kurzer Montagezeit (Stunden) und hoher Varianz, z. B. Fahrräder; ungeeignet bei langen Montagezeiten wegen Lager- und Kapitalbindung'],
  ['montagesynchron','Material kommt zum Bedarfstermin ohne Zwischenlager direkt in die Montage','geringste Lagerkosten, in der Praxis wegen des extremen Logistikaufwands meist nicht wirtschaftlich'],
  ['gemischt','C-Teile, Normteile und Teile, die in mehreren Produkten vorkommen, liegen im Lager; große, wertvolle Teile kommen montagesynchron','häufigster Kompromiss: Preisvorteile durch große Mengen, geringe Kapitalbindung bei teuren Teilen'],
  ['Just-in-time','bedarfssynchron: Material genau zum Zeitpunkt und in der Menge, wie es gebraucht wird; enge Abstimmung mit Lieferanten','Automobilindustrie; senkt Durchlaufzeit, Kapitalbindung und Lagerrisiko'],
  ['Kanban','dezentrale Steuerung im Regelkreis: Verbraucher meldet Bedarf, Produzent liefert nach („Supermarktprinzip“)','Teilsystem von JIT; einfache Nachschubsteuerung'],
  ['Kitting','alle Teile eines Auftrags in einem Behälter (Kit) zusammengestellt','spart Suchzeit, hilft bei Variantenvielfalt und kleinen Losen; Aufwand in der Kommissionierung']]},
 {merke:'Gemischte Bereitstellung ist der Normalfall: C-Teile ins Lager, A-Teile montagesynchron.'}]},

{t:'Arbeitsplatzgestaltung im Bild: Greifraum, Blickwinkel, Licht',b:[
 {p:'Ergonomie (griech. ergon = Arbeit, nomos = Gesetz) passt Arbeitsumgebung und Arbeitsgeräte an den Menschen an. Das erhält die Leistung dauerhaft, beugt Gesundheitsschäden vor, senkt die Ermüdung, den Ausschuss und den Sekundäraufwand.'},
 fig(520,275,
  path('M260,235 L145,71 A200,200 0 0 1 375,71 Z','sk-l','fill:color-mix(in srgb,var(--blue) 14%,var(--paper));stroke:var(--blue)')+
  path('M260,235 L217,76 A165,165 0 0 1 303,76 Z','sk-l','fill:color-mix(in srgb,var(--accent) 24%,var(--paper));stroke:var(--accent)')+
  ln(260,235,260,30,'sk-c')+
  circ(260,238,9,'g')+t(260,262,'Werker',{s:sm})+
  t(260,56,'Vorrichtung optimal ±15°',{s:sm,c:'acc'})+
  t(150,70,'Greifbereich bis ±35°',{s:sm,a:'end'})+
  ls(40,150,['häufig benötigte','Teile in diesen','Sektor legen'],{s:sm,a:'start'})+
  ls(400,150,['außerhalb: Kopf- und','Körperdrehung =','Sekundäraufwand'],{s:sm,a:'start'}),
  'Draufsicht auf den Montageplatz: Vorrichtung im ±15°-Sektor, Greifbereich innerhalb ±35°, Handhabungswege etwa 30 cm'),
 {tab:[['Grundsatz','Richtwert / Begründung'],
  ['Blickwinkel','Greifbereich bis ±35°, Montagevorrichtung und häufigste Teile im optimalen Bereich ±15°; darüber Kopf- und Körperdrehungen = Sekundäraufwand'],
  ['Handhabungswege','Einzelteile im Bereich von etwa 30 cm'],
  ['Höhe','Greif- und Fügevorgänge nicht über Herzhöhe (Durchblutung); Arbeitshöhe, Sitzhöhe und Greifraum verstellbar; Wechsel Sitzen/Stehen ermöglichen'],
  ['Beleuchtung','schatten- und blendfrei; meist 500 lx, bei sehr kleinen oder komplizierten Teilen 1000–1500 lx'],
  ['Schwere Teile','nicht aus der untersten Regalebene greifen, sondern Hubgeräte oder Materialwagen einsetzen'],
  ['Takt','Fließmontage mit manueller Förderung bringt Leistungsdruck; mit Puffern (Entkopplungszeit) ist individuelles Leistungsverhalten möglich']]},
 {bsp:{t:'Beispiel: Jahresbelastung durch schwere Teile',b:['Pro Stunde werden je ein Teil mit 15 kg und mit 25 kg vom Boden gehandhabt, bei 1.600 Arbeitsstunden im Jahr: (15 kg + 25 kg) · 1.600 h/a = 64.000 kg/a = 64 t/a.','Diese Last gefährdet die Gesundheit und mindert die Leistung. Gegenmaßnahmen: Hubtisch, Höhenverstellung, Drehvorrichtung statt Bücken.']}},
 {falle:'Hauptursachen für Leistungsminderung: Armbewegungen außerhalb von Greif- und Blickwinkel, Taktbindung in der Fließmontage und bei Großgeräten Gehen, Bücken und Drehen unter Last.'}]},

{t:'Schraubverbindungen: Festigkeit, Anziehen, Sichern',b:[
 {p:'Schrauben erzeugen durch das Anziehen eine Vorspannkraft, die die Bauteile aufeinanderpresst. Betriebskräfte werden dann über Reibung zwischen den Teilen (Kraftschluss) übertragen. Das Anzugsmoment ist nur der Weg dorthin.'},
 fig(520,150,
  t(260,18,'Wohin geht das Anzugsmoment?',{c:'acc'})+
  rect(40,34,48,40,'g')+rect(88,34,230,40,'b')+rect(318,34,162,40,'a')+
  t(64,59,'10 %',{s:sm})+t(203,59,'Gewinde ~40 %',{s:sm})+t(399,59,'Kopfauflage ~50 %',{s:sm})+
  fa(64,106,64,80)+t(64,126,'Vorspannkraft',{s:sm})+t(260,126,'Reibung: etwa 90 % gehen in Wärme',{s:sm,c:'acc'})+ln(92,100,480,100,'sk-dim'),
  'Aufteilung des Anzugsmoments (Richtwerte): nur etwa 10 % erzeugen Vorspannung, der Rest geht in die Reibung'),
 {tab:[['Festigkeitsklasse','Zugfestigkeit Rm','Streckgrenze Re','Rechenweg'],
  ['8.8','800 N/mm²','640 N/mm²','8 · 100 = 800;  8 · 8 · 10 = 640'],
  ['10.9','1000 N/mm²','900 N/mm²','10 · 100 = 1000;  10 · 9 · 10 = 900'],
  ['12.9','1200 N/mm²','1080 N/mm²','12 · 100 = 1200;  12 · 9 · 10 = 1080']]},
 {merke:'Erste Zahl mal 100 = Mindestzugfestigkeit in N/mm². Erste mal zweite Zahl mal 10 = Streckgrenze.'},
 {fx:{n:'Anzugsmoment aus Vorspannkraft (vereinfacht)',tex:'M_\\text{A}=\\frac{F_\\text{V}\\cdot P}{2\\pi\\cdot\\eta}',leg:[['M_\\text{A}','erforderliches Anzugsmoment in Nm'],['F_\\text{V}','Vorspannkraft in N'],['P','Gewindesteigung in m (M5: 0,8 mm = 0,0008 m)'],['\\eta','Wirkungsgrad der Schraubverbindung (Reibung berücksichtigt, hier klein, z. B. 0,11)']],e:'Beispiel: F_V = 12.000 N, P = 0,0008 m, η = 0,11 → M = 12.000 · 0,0008 / (2π · 0,11) ≈ 13,9 Nm. Ein Drehmomentschlüssel mit nur 10 Nm Endwert reicht dafür nicht.'}},
 {tab:[['Anziehverfahren','Prinzip','Vorspannkraft'],
  ['drehmomentgesteuert','Moment wird gemessen, Reibung streut','streut stark (Schmierung, Oberfläche)'],
  ['drehwinkelgesteuert','nach Fügemoment um festen Winkel weiterdrehen','genauer'],
  ['streckgrenzgesteuert','bis zur Streckgrenze anziehen','höchste und gleichmäßigste Vorspannung, Schraube meist nur einmal verwendbar']]},
 {ul:['Setzen: Rauheiten ebnen sich ein, die Vorspannkraft sinkt. Lange, elastische Schrauben und Nachziehen begrenzen den Verlust.',
  'Sicherung gegen Lockern: mikroverkapselter Klebstoff, Klemmmuttern, Sicherungsscheiben, formschlüssig mit Splint oder Draht. Gewindeeinsätze (Heli-Coil) reparieren Gewinde in weichen Werkstoffen.',
  'Kritische Verschraubungen mit Schraubsystemen (Drehmoment- und Winkelüberwachung), Werte je Schraube der Seriennummer zuordnen (Rückverfolgbarkeit); Station sperren, wenn nicht i. O.',
  'Drehmomentschlüssel nach Prüfmittelplan kalibrieren, nach Sturz oder Überlastung sofort prüfen, nach Gebrauch auf Skalenanfang entspannen und nicht zum Lösen verwenden.']},
 {falle:'Anzugsmomente aus Tabellen gelten nur für den angegebenen Schmierzustand. Geschmiert erzeugt dasselbe Moment viel mehr Vorspannkraft – im Extremfall wird die Schraube überlastet.'}]},

{t:'Lager-, Press- und Maschinenmontage',b:[
 {h:'Wälzlager montieren'},
 {ul:['Sauber arbeiten, Lager erst kurz vor der Montage auspacken, Sitze und Passmaße prüfen.','Fügekraft nur über den Ring mit dem Festsitz leiten – nie über die Wälzkörper.','Mit Montagehülse oder Presse fügen oder erwärmen (induktiv oder Heizplatte, höchstens etwa 120 °C); nach induktivem Anwärmen entmagnetisieren.','Festlager führt axial, Loslager lässt Wärmedehnung zu. Lagerluft CN ist normal, C3 größer; zu kleine Luft erwärmt und verspannt, zu große macht Geräusche und Verschleiß.']},
 fig(520,215,
  t(130,18,'O-Anordnung',{c:'acc'})+t(390,18,'X-Anordnung',{c:'acc'})+
  ln(10,100,250,100,'sk-c')+ln(270,100,510,100,'sk-c')+
  rect(66,72,28,56,'b')+rect(166,72,28,56,'b')+rect(326,72,28,56,'b')+rect(426,72,28,56,'b')+
  ln(80,72,35,114,'sk-f')+ln(180,72,225,114,'sk-f')+ln(340,72,385,114,'sk-f')+ln(440,72,395,114,'sk-f')+
  circ(50,100,3,'a')+circ(210,100,3,'a')+circ(370,100,3,'a')+circ(410,100,3,'a')+
  ar(50,150,210,150,'sk-dim')+ar(210,150,50,150,'sk-dim')+ls(130,175,['breite Stützbasis,','starr gegen Kippen'],{s:sm})+
  ar(370,150,410,150,'sk-dim')+ar(410,150,370,150,'sk-dim')+ls(390,175,['kurze Basis,','fluchtungsfehlertolerant'],{s:sm}),
  'Schrägkugellager: Die Druckkegel zeigen bei der O-Anordnung nach außen (große Stützbasis), bei der X-Anordnung nach innen'),
 {p:'Vorspannen entfernt das Lagerspiel, erhöht Steifigkeit und Laufgenauigkeit (z. B. Spindel), erzeugt aber mehr Reibung und Wärme. Die Vorspannung muss genau eingestellt werden.'},
 {p:'Dichtungen: Radialwellendichtring – Lauffläche glatt und gehärtet, Schutzlippe zur Schmutzseite, mit Einführhülse montieren. Flachdichtung – ebene Flansche, gleichmäßig über Kreuz anziehen. Werkstoff passend zu Medium und Temperatur.'},
 {h:'Pressverbände'},
 {tab:[['Verbindung','Fügen','Merkmal'],
  ['Längspressverband','axial mit Presse, Fügekraft','Rauheit wird geglättet, geringere Übertragung'],
  ['Querpressverband (Schrumpfen / Dehnen)','Erwärmen oder Abkühlen, dann ohne Kraft fügen','keine Rauheitsverluste, hohe Übertragungsfähigkeit'],
  ['Spannsatz, Konusverbindung','Pressung durch Spannelemente oder kegelige Flächen','lösbar und spielfrei']]},
 {fx:{n:'Erforderliche Erwärmung beim Schrumpfen',tex:'\\Delta T=\\frac{U+s}{\\alpha\\cdot d}',leg:[['\\Delta T','Temperaturerhöhung in K'],['U','Übermaß in mm'],['s','Fügespiel in mm'],['\\alpha','Längenausdehnungskoeffizient (Stahl ca. 12 · 10⁻⁶ je K)'],['d','Fügedurchmesser in mm']],e:'Beispiel: Welle 40 mm, U = 0,03 mm, s = 0,04 mm → ΔT = 0,07 / (12·10⁻⁶ · 40) ≈ 146 K. Zieltemperatur = Raumtemperatur + ΔT; Werkstoffgrenzen beachten.'}},
 {h:'Maschinen aufstellen, ausrichten, auswuchten'},
 {ul:['Fundament mit ausreichender Tragfähigkeit, Maschine nivellieren (Wasserwaage, Nivellierschrauben), Schwingungsdämpfer bei Bedarf.','Wellen mit Kupplung auf Winkel- und Parallelversatz ausrichten (Messuhr oder Laser): erst nivellieren, Fußauflage prüfen (weicher Fuß), Versatz messen, mit Passblechen korrigieren, erneut messen. Sonst Schwingungen, Lagerschäden, Dichtungsverschleiß.','Rotierende Teile auswuchten (Unwucht beseitigen), Auswuchtgüte nach ISO 21940. Schwingungsmessung bei der Inbetriebnahme zeigt, ob Aufstellung und Wuchtung stimmen.','Rohrleitungen entgraten, innen reinigen, spannungsfrei verlegen; Hydraulik mit Filter spülen, Druckprobe, Dichtheit prüfen, mit niedrigem Druck in Betrieb nehmen.','Schaltschrank: Aderendhülsen crimpen, Klemmen mit vorgegebenem Moment anziehen, Schutzleiter und Potentialausgleich anschließen, kennzeichnen; danach Schutzleiterdurchgang, Isolationswiderstand (z. B. 500 V DC) und Funktion durch eine Elektrofachkraft prüfen.']}]},

{t:'Takt, Bandwirkungsgrad und montagegerechtes Konstruieren',b:[
 {fx:{n:'Bandwirkungsgrad (Liniengütegrad)',tex:'\\eta_\\text{Band}=\\frac{\\sum t_\\text{Station}}{n\\cdot t_\\text{Takt}}',leg:[['\\sum t_\\text{Station}','Summe der Arbeitsinhalte aller Stationen in s'],['n','Anzahl der Stationen'],['t_\\text{Takt}','Taktzeit in s (längster Arbeitsinhalt oder Vorgabe)']],e:'Verlustzeit je Station = Takt − Arbeitsinhalt der Station.'}},
 fig(520,235,
  t(260,16,'Σ Arbeitsinhalt = 54 s  ·  6 Stationen · 10 s = 60 s  →  54 / 60 = 90 %',{s:sm})+
  ln(50,202,500,202)+ln(50,50,50,202)+
  [[9,'1'],[10,'2'],[8,'3'],[9,'4'],[10,'5'],[8,'6']].map(([v,l],i)=>{const x=70+i*72,hh=v*15,y=202-hh;return rect(x,y,48,hh,'b')+t(x+24,y+18,v+' s',{s:sm})+t(x+24,220,'Station '+l,{s:'font-size:11px'})+(v<10?rect(x,52,48,150-hh,'r',' fill-opacity=".35"'):'')}).join('')+
  ln(50,52,500,52,'sk-f')+t(500,44,'Takt 10 s',{a:'end',c:'acc'}),
  'Bandabstimmung: Die roten Flächen sind Verlustzeit je Station; der Bandwirkungsgrad beträgt hier 90 %'),
 {h:'Montagegerecht konstruieren (DFA)'},
 {ul:['wenige und gleiche Teile, Normteile bevorzugen','Fügerichtung von oben, Teile selbstzentrierend und selbsthaltend, Einführschrägen','Justierarbeiten vermeiden, Zugänglichkeit für Werkzeuge','Fehlmontage ausschließen (Asymmetrie, Poka-Yoke)']},
 {p:'Toleranzen ausgleichen: Passscheiben und Distanzringe, Langlöcher und Exzenter, selektive Montage (Teile in Gruppen sortiert), Justieren oder – als letzte Wahl – Nacharbeit.'},
 {p:'Unterlagen: Der Montageplan legt Reihenfolge, Verfahren, Betriebsmittel, Prüfschritte und Vorgabezeiten fest. Die Arbeitsunterweisung zeigt dem Werker an der Station den Ablauf (Bilder, Stückliste, Drehmomente). Die Explosionszeichnung zeigt alle Teile in Montagereihenfolge auseinandergezogen, der Kontrollplan die Prüfschritte, die Einstellvorschrift die Sollwerte für das Justieren.'},
 {p:'Planungsarten: Neuplanung (neues Produkt, neue Montage), Anpassungsplanung (bestehende Montage an Änderungen anpassen), Umplanung (grundlegende Neuordnung, z. B. anderer Montageort oder Verfahren). Muss-Kriterien müssen erfüllt sein, Soll-Kriterien sind wünschenswert.'},
 {p:'Qualität in der Montage: Werkerselbstprüfung, Poka-Yoke (Teilepräsenzkontrolle), Prüfschritte nach kritischen Operationen, Messen und Protokollieren, Endprüfung; bei Abweichung sperren und rückverfolgen. Zehnerregel: Ein Fehler kostet mit jedem Prozessschritt etwa das Zehnfache.'}]},

{t:'Automatisierte Montagesysteme',b:[
 {p:'Automatisierung soll Qualität sichern, Montagezeiten verkürzen, Produktivität erhöhen, Kosten senken und zu anspruchslose Tätigkeiten vermeiden.'},
 fig(520,150,
  box(8,40,92,50,['Fördern','Transfer,','Werkstückträger'],{k:'b',s:sm})+fa(100,65,118,65)+
  box(120,40,92,50,['Handhaben','Greifer,','Roboter'],{k:'b',s:sm})+fa(212,65,230,65)+
  box(232,40,92,50,['Ordnen,','Zuführen','Schwingförderer'],{k:'b',s:sm})+fa(324,65,342,65)+
  box(344,40,80,50,['Fügen','Schrauben,','Pressen'],{k:'b',s:sm})+fa(424,65,436,65)+
  box(438,40,76,50,['Steuern,','Überwachen'],{k:'a',s:sm}),
  'Funktionen und Funktionsträger: Fördern, Handhaben, Ordnen/Zuführen, Fügen, Steuern und Überwachen'),
 {tab:[['','Teilautomatisiert (Hybrid)','Vollautomatisiert'],
  ['Prinzip','manuelle Plätze und Automatikstationen kombiniert','alle Vorgänge inkl. Steuern und Regeln laufen selbstständig'],
  ['Mensch','führt aus, was sich nicht wirtschaftlich automatisieren lässt','überwacht, beseitigt Störungen, versorgt mit Material'],
  ['Einsatz','wenn Vollautomatisierung unwirtschaftlich ist','Sondermaschinen: teuer, wenig flexibel'],
  ['Voraussetzungen','–','hohe Stückzahlen und Laufzeiten; automatisierungsgerecht konstruiertes Produkt; termingerechte Materialversorgung in Qualität; qualifiziertes Personal für Überwachung und Instandhaltung']]},
 {p:'Montageroboter (SCARA, Knickarm, Delta) arbeiten schnell und präzise bei hoher Stückzahl, meist hinter Schutzeinrichtungen. Cobots arbeiten ohne Schutzzaun mit dem Menschen, mit Kraft- und Geschwindigkeitsbegrenzung nach ISO/TS 15066 – geeignet für kleine Serien und ergonomische Entlastung. Eine Risikobeurteilung bleibt Pflicht.'},
 {p:'Elementare Montagevorgänge (Verrichtungsgruppen) sind Fügen, Handhaben, Kontrollieren, Justieren und Sonderoperationen wie Reinigen, Entgraten, Auspacken, Ölen. Fügeverbindungen unterscheidet man nach Wirkung: formschlüssig (Passfeder), kraftschlüssig (Pressverbindung), stoffschlüssig (Schweißen, Kleben); außerdem lösbar, bedingt lösbar, unlösbar, starr oder beweglich, mittelbar (mit Hilfsfügeteil wie Schraube, Stift, Lot) oder unmittelbar.'}]},

{t:'Inbetriebnahme, Abnahme und rechtliche Grundlagen im Bild',b:[
 fig(520,168,
  box(4,30,80,56,['Anlieferung','Transport-','schäden?'],{k:'b',s:sm})+fa(84,58,98,58)+
  box(100,30,80,56,['Installieren','Aufstellen,','Anschließen'],{k:'b',s:sm})+fa(180,58,194,58)+
  box(196,30,80,56,['Inbetrieb-','nahme','Funktionstest'],{k:'g',s:sm})+fa(276,58,290,58)+
  box(292,30,80,56,['Erprobung','Probe-','werkstücke'],{k:'g',s:sm})+fa(372,58,386,58)+
  box(388,30,60,56,['Abnahme'],{k:'a',s:sm})+fa(448,58,460,58)+
  box(462,30,54,56,['Dauer-','betrieb'],{s:sm})+
  ls(44,108,['Gewährleistungs-','protokoll'],{s:'font-size:11px',lh:13})+ls(236,108,['Inbetriebnahme-','protokoll'],{s:'font-size:11px',lh:13})+ls(418,108,['Abnahme-','protokoll'],{s:'font-size:11px',lh:13})+
  t(260,150,'Erstinbetriebnahme: Ruhezustand → Dauerbetrieb  ·  Wiederinbetriebnahme: Stillstand → Dauerbetrieb',{s:'font-size:11px'}),
  'Ablauf von der Anlieferung bis zum Dauerbetrieb mit den drei Protokollen'),
 {tab:[['Abnahmeart','Inhalt','Hinweis'],
  ['direkte messtechnische Prüfung','Geradheit, Ebenheit, Parallelität, Rechtwinkligkeit, Rundlauf, Positioniergenauigkeit und Umkehrspiel','sehr aufwendig, normalerweise nur beim Hersteller'],
  ['indirekte messtechnische Prüfung','Probewerkstücke bearbeiten und messen','Abweichungen am Werkstück zeigen die Maschinengenauigkeit'],
  ['Fähigkeitsuntersuchung','Maschinenfähigkeit (50 Teile in Folge, Kurzzeit) beim Hersteller, Prozessfähigkeit (Langzeit) beim Anwender','Cmk und Cpk']]},
 {p:'Eine Anlage verbindet Apparate (Wärmetauscher, Behälter), Rohrleitungen, Prozessleittechnik und Maschinen (Rührwerke, Verdichter). Ihre Gesamtfunktion hängt von allen Komponenten ab. Vor der Inbetriebnahme werden Anlage und Komponenten gereinigt (z. B. Öl und Fett in Sauerstoffanwendungen) und die Montage kontrolliert (Armaturen, Sicherheitsventile, Einbauten). Die Erstinbetriebnahme endet mit dem Garantieversuch: Er weist nach, dass die Anlage alle vertraglichen Anforderungen erfüllt, und ist juristisch die Abnahmeprüfung.'},
 {p:'Die Abnahme einer Anlage prüft drei Bereiche: (1) Anlagenkonzept gegen das Pflichtenheft mit Nachweisen (statische Berechnungen, Prüfprotokolle von TÜV oder BG, Werkstoffnachweise, Druckprüf-, Röntgen- und Schweißnachweise), (2) Anlagenverfügbarkeit – der Garantieversuch, (3) Anlagendokumentation (Prüfdokumente, Genehmigungen, Konformitätserklärungen, Wartungsplan, Betriebshandbuch, Schalt- und Hydraulikpläne, Ersatzteilkatalog, Softwaredokumentation).'},
 fig(520,196,
  box(160,6,200,32,['EU-Richtlinie (z. B. Maschinen,','Druckgeräte 2014/68/EU)'],{k:'b',s:'font-size:11px',lh:13})+fa(260,38,260,56)+
  box(160,58,200,32,['Harmonisierte Normen','CEN · CENELEC · ETSI'],{k:'b',s:sm})+fa(260,90,260,108)+
  box(160,110,200,32,['ProdSG + Verordnungen (ProdSV)','9. ProdSV = Maschinenverordnung'],{k:'g',s:'font-size:11px',lh:13})+fa(260,142,260,160)+
  box(160,162,200,30,['CE-Kennzeichen + Konformitätserklärung'],{k:'a',s:'font-size:11px'})+
  ls(130,24,['gilt für Inverkehr-','bringen in der EU'],{s:'font-size:11px',lh:13,a:'end'})+ls(130,76,['Vermutungswirkung,','im Amtsblatt der EU'],{s:'font-size:11px',lh:13,a:'end'})+ls(390,128,['Umsetzung in','deutsches Recht'],{s:'font-size:11px',lh:13,a:'start'}),
  'Von der EU-Richtlinie zur CE-Kennzeichnung: Richtlinie → harmonisierte Normen → nationales Recht → Konformität'),
 {tab:[['Begriff','Bedeutung'],
  ['EG-Konformitätserklärung','für Maschinen, die das Werk verwendungsfertig verlassen; bestätigt die Übereinstimmung mit den Richtlinien'],
  ['EG-Einbauerklärung','für unvollständige Maschinen, die erst an Ort und Stelle in andere Maschinen eingebaut werden'],
  ['CE-Kennzeichen','bestätigt, dass die grundlegenden Sicherheits- und Gesundheitsanforderungen aller relevanten Richtlinien erfüllt sind und das Konformitätsbewertungsverfahren durchgeführt wurde; angebracht vom Hersteller oder seinem Bevollmächtigten in der EU'],
  ['TRBS','Technische Regeln zur Betriebssicherheit – Konkretisierung für den Betreiber']]},
 {p:'Betriebsanleitung: unbedingter Bestandteil der technischen Dokumentation; ohne sie darf eine Maschine nicht in Betrieb genommen werden. Mindestinhalt: bestimmungsgemäße Verwendung und ihre Grenzen, Beschreibung von Inbetriebnahme, Instandhaltung und Entsorgung, Warnungen vor Fehlgebrauch samt Risiken, Hinweise zu Wartung, Inspektion und Instandsetzung. Keine unzulässigen Formulierungen, zielgruppengerechte Sprache, klare Gliederung.'},
 {merke:'Hinweis: Die Maschinenrichtlinie 2006/42/EG wird ab dem 20. Januar 2027 durch die EU-Maschinenverordnung 2023/1230 abgelöst. Für die Prüfung 2026 gelten die bisherigen Begriffe (EG-Konformitätserklärung, Einbauerklärung).'}]},

{t:'FMEA und Fehlerkosten im Bild',b:[
 fig(520,150,
  box(4,40,92,56,['1 Struktur-','analyse'],{k:'b',s:sm})+fa(96,68,110,68)+box(112,40,92,56,['2 Funktions-','analyse'],{k:'b',s:sm})+fa(204,68,218,68)+box(220,40,92,56,['3 Fehler-','analyse'],{k:'b',s:sm})+fa(312,68,326,68)+box(328,40,92,56,['4 Risiko-','bewertung','B · A · E'],{k:'a',s:sm})+fa(420,68,432,68)+box(434,40,82,56,['5 Optimie-','rung'],{k:'g',s:sm})+
  ls(150,118,['Systemanalyse'],{s:sm})+ls(380,118,['Risikoanalyse und Maßnahmen'],{s:sm})+ln(10,106,290,106,'sk-dim')+ln(326,106,514,106,'sk-dim'),
  'Die fünf Schritte der FMEA; sie gelten für System-, Konstruktions- und Prozess-FMEA'),
 {tab:[['Bewertung','1','10'],['Bedeutung B (Folge für den Kunden)','keine Auswirkung, Kunde merkt nichts','Gefahr für Leib und Leben, Gesetzesverstoß'],['Auftreten A','Fehler sehr unwahrscheinlich','Fehler tritt nahezu sicher auf'],['Entdeckung E','Fehler wird sicher entdeckt','keine Entdeckungsmaßnahme']]},
 {p:'Risikoprioritätszahl RPZ = B · A · E. Abgearbeitet wird nach dem Pareto-Prinzip (höchste RPZ zuerst) – zusätzlich immer dann, wenn B oder A gleich 9 oder 10 ist, auch bei kleiner RPZ. Zwei Fehler können dieselbe RPZ haben (z. B. 10·7·2 = 7·2·10 = 140), sind aber nicht gleich dringend: Die RPZ ist nur eine formale Größe. Bei der neueren AIAG/VDA-FMEA ersetzt die Aktionspriorität (hoch, mittel, niedrig) die RPZ; die Bedeutung hat dabei Vorrang. Nach Maßnahmen wird neu bewertet und die neue RPZ mit der alten verglichen.'},
 {tab:[['FMEA-Art','Untersucht','Zeitpunkt'],['System-FMEA','Produktentwurf, Systemfunktionen, Schnittstellen','früh im Entwurf'],['Konstruktions-FMEA (Design-FMEA)','Bauteilfunktion und -eigenschaften, Werkstoffe, Dimensionierung','nach der Produktentwicklung, vor der Detailkonstruktion'],['Prozess-FMEA','geplanter Montage- und Fertigungsprozess, Prozessfehler','vor Beginn von Fertigung und Montage']]},
 fig(520,205,
  ln(50,170,500,170)+ln(50,30,50,170)+
  [[1,'Entwicklung','1'],[10,'Planung','10'],[100,'Fertigung','100'],[1000,'Prüfung/Montage','1.000'],[10000,'beim Kunden','10.000']].map(([v,l,s],i)=>{const x=70+i*86,hh=Math.max(6,(Math.log10(v)+0.15)*28),y=170-hh;return rect(x,y,62,hh,i<2?'g':i<4?'y':'r')+t(x+31,y-6,s+' €',{s:sm})+t(x+31,188,l,{s:'font-size:11px'})}).join('')+
  t(280,16,'Zehnerregel der Fehlerkosten (logarithmisch dargestellt, Beispielwerte)',{s:sm}),
  'Zehnerregel: Ein Fehler wird mit jeder Stufe etwa zehnmal so teuer – Fehlervermeidung ist besser als Fehlerbehebung')]}
]);}
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
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
const g=(c)=>`class="sk-t" style="font-size:11px;fill:var(${c})"`;
addTheory('FT',[
{t:'CNC-Programmierung, thermische Verformung und Messmittel',b:[
 {h:'Wichtige G- und M-Befehle'},
 {tab:[['Befehl','Bedeutung','Befehl','Bedeutung'],
  ['G00','Eilgang','M03','Spindel rechts'],
  ['G01','Linearinterpolation mit Vorschub','M05','Spindel halt'],
  ['G02 / G03','Kreisinterpolation im / gegen den Uhrzeigersinn','M06','Werkzeugwechsel'],
  ['G90 / G91','Absolutmaß / Inkrementalmaß (Kettenmaß)','M08','Kühlmittel ein'],
  ['G54 … G59','Nullpunktverschiebungen','M30','Programmende'],
  ['G41 / G42','Fräserradiuskorrektur links / rechts','','']]},
 {p:'G-Befehle sind Wegbedingungen (wie gefahren wird), M-Befehle Schalt- und Zusatzfunktionen der Maschine. Ein Beispielsatz: N30 G01 X50 Z-20 F0.2 – linear auf X50, Z-20 mit Vorschub 0,2 mm je Umdrehung.'},
 {h:'Thermische Verformung'},
 {p:'Wärme aus Antrieben, Lagern, Zerspanung und Umgebung dehnt Spindel, Bett und Werkstück ungleich aus und verschiebt den Werkzeugpunkt – bei hoher Genauigkeit um mehrere Mikrometer.'},
 fig(520,175,
  box(10,30,150,64,['Wärmequellen','Antrieb, Lager,','Zerspanung, Halle'],{k:'r',s:xs})+fa(160,62,196,62)+
  box(198,30,140,64,['ungleiche Dehnung','von Spindel, Bett,','Werkstück'],{k:'y',s:xs})+fa(338,62,374,62)+
  box(376,30,134,64,['Werkzeugpunkt','verschiebt sich','→ Maßfehler'],{k:'a',s:xs})+
  ls(260,138,['Gegenmaßnahmen: Warmlaufen · Kühlung von Spindel und Antrieben · symmetrischer Aufbau ·','Temperierung von Kühlschmierstoff und Halle · Kompensation mit Temperatursensoren'],{s:xs,lh:15}),
  'Ursache-Wirkung-Kette der thermischen Verformung'),
 {h:'Welches Messmittel – wie genau?'},
 {tab:[['Messmittel','Ablesung / Eigenschaft','Einsatz'],
  ['Messschieber','0,1 bis 0,01 mm','Werkstatt, Außen-/Innen-/Tiefenmaß'],
  ['Bügelmessschraube','0,01 bis 0,001 mm','genaue Außenmaße'],
  ['Messuhr','Differenzmessung, Rundlauf','Rund-/Planlauf, Vergleich'],
  ['Endmaße','höchste Genauigkeit','Kalibrierung, Einstellen'],
  ['Grenzlehrdorn','Gut-/Ausschussseite','schnelle Serienprüfung von Bohrungen'],
  ['KMG','Koordinatenmessmaschine','Form und Lage, komplexe Teile'],
  ['optisch / Laser','berührungslos','empfindliche Teile, schnelle Messung']]},
 {merke:'Die Wahl des Messmittels richtet sich nach Toleranz, Messunsicherheit und Stückzahl – als Faustregel soll die Messunsicherheit höchstens ein Zehntel der Toleranz betragen.'}]},

{t:'Toleranzen, Passungen und Oberflächen im Bild',b:[
 {h:'Aufbau eines Passungsmaßes: Ø40 H7/g6'},
 fig(520,230,
  ln(40,100,250,100,'sk-l').replace('class="sk-l"','class="sk-l" style="stroke:var(--ink);stroke-width:2.2"')+t(260,104,'Nulllinie = Nennmaß 40 mm',{a:'start',s:xs})+
  `<rect x="70" y="60" width="70" height="40" style="fill:color-mix(in srgb,var(--blue) 25%,var(--paper));stroke:var(--blue);stroke-width:1.5"/>`+
  `<rect x="150" y="114" width="70" height="26" style="fill:color-mix(in srgb,var(--accent) 25%,var(--paper));stroke:var(--accent);stroke-width:1.5"/>`+
  t(105,50,'Bohrung H7',{s:xs})+t(105,82,'+25 µm',{s:xs})+t(105,96,'0',{s:xs})+
  t(185,152,'Welle g6',{s:xs})+t(185,125,'−9',{s:xs})+t(185,137,'−25 µm',{s:xs})+
  ln(235,100,235,114,'sk-c')+
  ls(260,138,['Spiel: Höchstspiel 50 µm,','Mindestspiel 9 µm → Spielpassung'],{s:xs,a:'start',lh:14})+
  box(10,170,500,50,['H = Lage des Toleranzfeldes der Bohrung (Einheitsbohrung), 7 = Toleranzgrad (Weite)','g = Lage des Wellen-Toleranzfeldes, 6 = Toleranzgrad (Welle immer etwas kleiner)'],{s:xs,lh:16,k:'y'}),
  'Toleranzfelder von Bohrung H7 und Welle g6 (Zahlenwerte für Ø40, Mikrometer)'),
 {p:'Großbuchstaben bezeichnen Bohrungen, Kleinbuchstaben Wellen. H7/g6 gehört zum System Einheitsbohrung: Das untere Abmaß der Bohrung ist 0, die Wellen werden gegen sie gestaffelt. Je kleiner die Ziffer, desto enger die Toleranz.'},
 {h:'Rauheit: Ra und Rz'},
 fig(520,190,
  path(pl([[30,100],[50,88],[70,112],[90,76],[110,118],[130,92],[150,108],[170,70],[190,122],[210,96],[230,104],[250,82],[270,115],[290,90],[310,108],[330,74],[350,124],[370,98],[390,102],[410,84],[430,112],[450,92],[470,106],[490,100]]),'sk-l','stroke:var(--ink);stroke-width:1.8')+
  ln(30,100,490,100,'sk-dim').replace('class="sk-dim"','class="sk-dim" style="stroke:var(--accent);stroke-dasharray:6 3;stroke-width:1.6"')+t(496,96,'Mittellinie',{a:'end',s:xs}).replace('x="496" y="96"','x="490" y="140"')+
  ln(170,70,222,70,'sk-c')+ln(190,122,222,122,'sk-c')+ln(216,70,216,122,'sk-l')+t(224,100,'Rz',{a:'start',s:xs})+
  ls(260,162,['Ra = mittlerer Abstand des Profils von der Mittellinie (arithmetischer Mittenrauwert)','Rz = Mittel der größten Höhenunterschiede (Spitze bis Tal) mehrerer Einzelmessstrecken'],{s:xs,lh:15}),
  'Rauheitsprofil: Ra mittelt, Rz erfasst Spitzen und Riefen'),
 {p:'Ra ist unempfindlich gegen einzelne Ausreißer, Rz erfasst Spitzen und Riefen besser – deshalb wird bei Dichtflächen und Laufbahnen oft Rz verlangt. Radialwellendichtringe brauchen glatte, gehärtete Laufflächen.'},
 {h:'Form- und Lagetoleranzen (ISO 1101)'},
 {tab:[['Gruppe','Toleranzen','Frage'],
  ['Form','Geradheit, Ebenheit, Rundheit, Zylinderform','Wie gut ist das Element für sich?'],
  ['Richtung','Parallelität, Rechtwinkligkeit, Neigung','Wie liegt es zu einem Bezug?'],
  ['Ort','Position, Koaxialität, Symmetrie','Sitzt es am richtigen Ort?'],
  ['Lauf','Rundlauf, Planlauf','Wie läuft es beim Drehen um die Bezugsachse?']]},
 {p:'Sie begrenzen Abweichungen von der idealen Geometrie unabhängig von den Maßtoleranzen. Das Toleranzrahmen-Symbol enthält Symbol, Toleranzwert und Bezug.'}]},

{t:'Zerspanung: Winkel am Schneidkeil, Kühlung, Bohrer',b:[
 {h:'Die Winkel am Schneidkeil'},
 fig(520,215,
  `<rect x="60" y="110" width="270" height="70" style="fill:var(--soft);stroke:var(--ink)"/>`+t(150,150,'Werkstück',{s:xs})+
  `<polygon points="200,110 308,91 308,18 225,18" style="fill:color-mix(in srgb,var(--blue) 18%,var(--paper));stroke:var(--blue);stroke-width:2"/>`+
  ln(90,110,330,110,'sk-dim')+ln(200,200,200,12,'sk-dim')+
  t(90,126,'Schnittebene',{a:'start',s:xs})+t(208,10,'Bezugsebene',{a:'start',s:xs})+
  path('M255,110 A55,55 0 0 0 253.5,100.5','sk-l','stroke:var(--accent);stroke-width:2.2')+t(268,108,'α',{s:sm,a:'start'})+
  path('M200,55 A55,55 0 0 1 214,57','sk-l','stroke:var(--ok);stroke-width:2.2')+t(207,45,'γ',{s:sm})+
  path('M259,100 A60,60 0 0 0 215.5,52','sk-l','stroke:var(--bad);stroke-width:2.2')+t(244,76,'β',{s:sm})+
  t(318,91,'Freifläche',{a:'start',s:xs})+t(190,24,'Spanfläche',{a:'end',s:xs})+
  ls(418,50,['α Freiwinkel','β Keilwinkel','γ Spanwinkel','','α + β + γ = 90°'],{s:sm,lh:20,a:'middle'})+
  t(425,160,'γ groß: leichter Schnitt,',{s:xs})+t(425,174,'schwächere Schneide',{s:xs})+t(425,192,'γ klein/negativ: stabil',{s:xs}),
  'Winkel am Schneidkeil im Orthogonalschnitt (schematisch)'),
 {tab:[['Winkel','Wirkung','Wahl'],
  ['Spanwinkel γ groß','leichter Schnitt, kleinere Schnittkraft, aber schwächere Schneide','weiche Werkstoffe'],
  ['Spanwinkel γ klein / negativ','stabile Schneide','harte Werkstoffe, unterbrochener Schnitt'],
  ['Freiwinkel α','verhindert Reibung der Freifläche am Werkstück','immer > 0']]},
 {h:'Spitzenwinkel von Spiralbohrern'},
 {tab:[['Werkstoff','Spitzenwinkel'],['Stahl (Normalbohrer)','ca. 118°'],['harte und zähe Werkstoffe','ca. 130° bis 140°'],['weiche Werkstoffe, Kunststoffe','ca. 80° bis 100°'],['Aluminium','130° bis 140° mit größerem Spanwinkel']]},
 {p:'Der richtige Winkel und Anschliff bestimmen Zentrierung, Schneidenbelastung und Maßhaltigkeit.'},
 {h:'Hochdruckkühlung und Minimalmengenschmierung'},
 {tab:[['','Hochdruckkühlung','Minimalmengenschmierung (MMS)'],
  ['Prinzip','KSS mit 70 bis über 100 bar gezielt an die Schneide','nur wenige ml Öl je Stunde als Aerosol an die Wirkstelle'],
  ['Wirkung','bessere Kühlung, Spanbruch, Spanabfuhr, höhere Standzeit','kaum Kühlung, aber Schmierung'],
  ['Vorteil','Titan, Nickelbasis, Tieflochbohren','spart Entsorgung und Reinigung']]},
 {h:'Drehzahl und Leistung'},
 {fx:{n:'Schnittgeschwindigkeit / Drehzahl',tex:'v_c=\\pi\\cdot d\\cdot n\\quad n=\\frac{v_c}{\\pi\\cdot d}',leg:[['vc','Schnittgeschwindigkeit in m/min'],['d','Durchmesser in m'],['n','Drehzahl in 1/min']],e:'Beispiel: vc = 100 m/min, d = 0,1 m → n = 100 / (π · 0,1) ≈ 318 1/min. Mit d in mm: vc = π · d · n / 1000.'}},
 {fx:{n:'Schnitt- und Antriebsleistung',tex:'P_c=F_c\\cdot v_c\\quad F_c=k_c\\cdot a_p\\cdot f\\quad P_a=\\frac{P_c}{\\eta}',leg:[['Fc','Schnittkraft in N'],['kc','spezifische Schnittkraft in N/mm²'],['ap · f','Spanungsquerschnitt in mm²'],['η','Maschinenwirkungsgrad, meist 0,7 bis 0,9']],e:'Die Antriebsleistung ist größer als die Schnittleistung – wichtig für die Auslegung des Hauptantriebs.'}}]},

{t:'Schneidstoffe und Schleifen: Wahl nach Werkstoff',b:[
 {tab:[['Schneidstoff','zerspant','nicht geeignet für'],
  ['CBN (kubisches Bornitrid)','gehärtete Stähle, Guss; hohe Temperaturen (Hartdrehen, Hartfräsen)','–'],
  ['PKD (polykristalliner Diamant)','Aluminium, NE-Metalle, Kunststoffe, Verbundwerkstoffe','Eisenwerkstoffe: Diamant reagiert mit Eisen']]},
 {h:'Schleifscheibe: Körnung und Härte'},
 fig(520,160,
  box(10,14,236,56,['Körnung = Korngröße','grob 24–46: hoher Abtrag','fein 80–220: gute Oberfläche'],{k:'b',s:xs})+
  box(274,14,236,56,['Härte = Bindung hält die Körner','A weich … Z hart'],{k:'g',s:xs})+
  ls(128,92,['Zielkonflikt: Abtrag ↔ Oberflächengüte'],{s:xs})+
  ls(392,92,['harter Werkstoff → weiche Bindung (Scheibe schärft sich selbst)','weicher Werkstoff, kleine Berührfläche → harte Bindung'],{s:xs,lh:15})+
  t(260,148,'Abrichten stellt Form und Schärfe der Scheibe wieder her',{s:xs,c:'acc'}),
  'Kennzeichen einer Schleifscheibe'),
 {merke:'Harter Werkstoff – weiche Scheibe: abgestumpfte Körner sollen ausbrechen, damit sich die Scheibe selbst schärft. Weicher Werkstoff – harte Scheibe.'}]},

{t:'Schweißen im Detail: Verzug, Verfahren, Gase, Löten und Kleben',b:[
 {h:'Verzug und Eigenspannungen vermeiden'},
 fig(520,155,
  [0,1,2,3,4].map(i=>`<rect x="${30+i*90}" y="40" width="86" height="26" style="fill:color-mix(in srgb,var(--warn) 18%,var(--paper));stroke:var(--warn)"/>`+fa(30+i*90+78,53,30+i*90+8,53)+t(30+i*90+43,86,'Abschnitt '+(i+1),{s:xs})).join('')+
  fa(30,112,470,112)+t(250,132,'Gesamtfortschritt der Naht',{s:xs})+t(250,26,'jeder Abschnitt rückwärts geschweißt – Pilgerschrittverfahren',{s:xs,c:'acc'}),
  'Pilgerschritt: Die Schweißrichtung je Abschnitt ist entgegen der Gesamtrichtung'),
 {ul:['Wenig Wärme einbringen (kleine Nähte, passendes Verfahren).','Symmetrisch und in Pilgerschritt- oder Wechselfolge schweißen; Nähte abwechselnd setzen.','Teile spannen oder heften; Vorverformen oder Vorwärmen.','Nachträglich spannungsarm glühen oder richten.']},
 {h:'Verfahren im Vergleich'},
 {tab:[['Verfahren','Merkmal'],
  ['Laserstrahlschweißen','hohe Energiedichte, schmale tiefe Naht, geringer Verzug, schnell, gut automatisierbar; braucht genaue Fugenvorbereitung'],
  ['Reibschweißen','Fügen im plastischen Zustand durch Reibungswärme und Stauchen; ohne Zusatzwerkstoff; auch ungleiche Werkstoffe; rotationssymmetrische Teile'],
  ['Löten','Lot schmilzt, Grundwerkstoff nicht (Weichlöten < 450 °C, Hartlöten darüber); dicht, ungleiche Werkstoffe, geringer Verzug'],
  ['Kleben','ohne Wärme, flächig, verteilt Spannungen, auch ungleiche und wärmeempfindliche Werkstoffe; braucht saubere Flächen, Aushärtezeit, Temperaturgrenzen'],
  ['Schweißen','höchste Festigkeit bei gleichen Werkstoffen']]},
 {h:'Vorwärmen, Zusatzwerkstoff, Schutzgas'},
 {p:'Stähle mit hohem Kohlenstoffäquivalent (CEV) neigen zu Aufhärtung und Kaltrissen. Vorwärmen verlangsamt die Abkühlung und senkt Härte und Spannungen; die Temperatur richtet sich nach CEV, Blechdicke und Verfahren. Der Schweißzusatz muss zum Grundwerkstoff passen (Festigkeit, Zähigkeit, Korrosionsverhalten) und wird nach der Schweißanweisung (WPS) gewählt.'},
 {tab:[['Gasart','Gase','Verfahren','Wirkung'],
  ['Inertgas','Argon, Helium','MIG, WIG','reagiert nicht'],
  ['Aktivgas','CO₂, Mischgase Argon + CO₂/O₂','MAG','wirkt oxidierend; Mischgase mindern Spritzer und verbessern die Naht']]}]},

{t:'Umformen im Bild: Tiefziehen, Verfestigung, Innenhochdruck',b:[
 {h:'Tiefziehen und Ziehverhältnis'},
 fig(520,205,
  `<rect x="40" y="110" width="90" height="50" style="fill:var(--soft);stroke:var(--ink)"/><rect x="230" y="110" width="90" height="50" style="fill:var(--soft);stroke:var(--ink)"/>`+
  `<rect x="30" y="102" width="110" height="8" style="fill:color-mix(in srgb,var(--warn) 30%,var(--paper));stroke:var(--warn)"/><rect x="220" y="102" width="110" height="8" style="fill:color-mix(in srgb,var(--warn) 30%,var(--paper));stroke:var(--warn)"/>`+
  `<rect x="30" y="84" width="100" height="18" style="fill:color-mix(in srgb,var(--blue) 22%,var(--paper));stroke:var(--blue)"/><rect x="230" y="84" width="100" height="18" style="fill:color-mix(in srgb,var(--blue) 22%,var(--paper));stroke:var(--blue)"/>`+
  `<rect x="130" y="102" width="100" height="8" style="fill:color-mix(in srgb,var(--warn) 30%,var(--paper));stroke:var(--warn)"/>`+
  `<rect x="150" y="20" width="60" height="82" style="fill:color-mix(in srgb,var(--accent) 22%,var(--paper));stroke:var(--accent);stroke-width:2"/>`+
  t(180,66,'Stempel',{s:xs})+t(85,96,'Niederhalter',{s:xs})+t(275,96,'Niederhalter',{s:xs})+t(85,140,'Ziehring',{s:xs})+t(275,140,'Ziehring',{s:xs})+t(70,176,'Blechronde Ø D',{s:xs})+
  ar(180,14,180,50)+
  ls(420,40,['β = D / d','','D = Ronde, d = Stempel','','Grenzziehverhältnis','Erstzug Tiefziehstahl','≈ 1,8 … 2,0','','Beispiel: 120 / 60 = 2,0'],{s:xs,lh:15}),
  'Tiefziehwerkzeug (Schnitt): Stempel zieht die Ronde durch den Ziehring, der Niederhalter verhindert Falten'),
 {p:'Ist β größer als das Grenzverhältnis, sind weitere Züge nötig (Weiterzug). Faltenhalterkraft, Schmierung und Ziehspalt beeinflussen das Ergebnis.'},
 {h:'Kaltumformung und Verfestigung'},
 {p:'Umformen unterhalb der Rekristallisationstemperatur erhöht die Versetzungsdichte: Festigkeit und Härte steigen, die Dehnung sinkt (Verfestigung). Vorteile: gute Oberfläche, hohe Maßgenauigkeit, Festigkeitssteigerung. Grenzen: begrenzter Umformgrad, höhere Kräfte. Zwischenglühen (Rekristallisationsglühen) stellt die Umformbarkeit wieder her.'},
 {p:'Innenhochdruckumformen (IHU): Ein Rohr wird im geschlossenen Werkzeug mit Flüssigkeitsdruck von innen ausgeformt. So entstehen komplexe, leichte Hohlprofile ohne Schweißnähte (Rahmenteile, Abgaskrümmer) mit gleichmäßiger Wanddicke. Nachteile: hoher Druck, Werkzeugaufwand, Taktzeit.'}]},

{t:'Gefüge, ZTU, Zugversuch, Härteprüfung und Wöhlerkurve',b:[
 {h:'Gefügebestandteile des Stahls'},
 {tab:[['Gefüge','Eigenschaft'],
  ['Ferrit','weiches kubisch-raumzentriertes Eisen mit wenig Kohlenstoff'],
  ['Perlit','lamellare Mischung aus Ferrit und Zementit'],
  ['Austenit','kubisch-flächenzentriert, oberhalb ca. 727 °C; löst viel Kohlenstoff; unmagnetisch'],
  ['Martensit','hartes, verspanntes Gefüge durch schnelles Abschrecken von Austenit (Härten)']]},
 {h:'ZTU-Schaubild: Abkühlgeschwindigkeit bestimmt das Gefüge'},
 fig(520,230,
  ar(50,200,500,200)+ar(50,200,50,14)+
  ln(50,60,500,60,'sk-dim')+t(496,54,'727 °C (Austenit-Grenze)',{a:'end',s:xs})+
  ln(50,150,500,150,'sk-dim').replace('class="sk-dim"','class="sk-dim" style="stroke:var(--bad);stroke-dasharray:6 3"')+t(496,144,'Martensitstart Ms',{a:'end',s:xs})+
  path('M100,62 C120,70 150,95 185,112 C230,128 300,145 380,150','sk-l','stroke:var(--accent);stroke-width:2.4')+
  path('M70,55 L120,175','sk-l','stroke:var(--bad);stroke-width:2.6')+t(128,186,'schnell → Martensit',{s:xs,a:'start'})+
  path('M70,55 C120,100 200,140 270,170','sk-l','stroke:var(--warn);stroke-width:2.6')+t(310,174,'mittel → Bainit',{s:xs,a:'start'})+
  path('M70,55 C150,70 300,78 430,95','sk-l','stroke:var(--ok);stroke-width:2.6')+t(436,100,'langsam → Ferrit + Perlit',{s:xs,a:'start'}).replace('x="436"','x="235"').replace('y="100"','y="98"')+
  t(275,222,'Zeit (logarithmisch)  →',{s:xs})+t(22,120,'Temperatur',{s:xs}).replace('x="22" y="120"','x="16" y="130" transform="rotate(-90 16 130)"')+
  t(210,106,'Perlitbeginn',{s:xs,a:'start'}).replace('x="210" y="106"','x="232" y="120"'),
  'Schematisches ZTU-Schaubild: Für Martensit schneller als die kritische Abkühlgeschwindigkeit abkühlen'),
 {p:'Das ZTU-Schaubild (Zeit-Temperatur-Umwandlung) dient der Wahl von Abschreckmedium und Härteverfahren: Wer Martensit will, muss schneller als die kritische Abkühlgeschwindigkeit abkühlen.'},
 {h:'Zugversuch: Kennwerte'},
 fig(520,215,
  ar(50,190,500,190)+ar(50,190,50,14)+
  path('M50,190 L110,66 L130,62 L175,66 C230,40 300,28 340,30 C380,36 410,60 430,120','sk-l','stroke:var(--accent);stroke-width:2.8')+
  circ(430,120,5,'r')+t(446,124,'Bruch',{a:'start',s:xs})+
  circ(115,64,4,'g')+t(122,52,'Streckgrenze',{a:'start',s:xs})+
  circ(340,30,4,'b')+t(352,22,'Zugfestigkeit',{a:'start',s:xs})+
  ln(50,30,340,30,'sk-c')+ln(50,64,115,64,'sk-c')+
  t(56,24,'Rm',{a:'start',s:xs})+t(56,58,'Re',{a:'start',s:xs})+
  t(500,208,'Dehnung ε',{a:'end',s:xs})+t(16,110,'Spannung σ',{s:xs}).replace('x="16" y="110"','x="16" y="115" transform="rotate(-90 16 115)"')+
  ln(430,190,430,120,'sk-c')+t(430,206,'A',{s:xs})+
  t(78,178,'elastisch (Hooke)',{s:xs,a:'start'}).replace('x="78" y="178"','x="130" y="170"')+
  t(190,98,'plastisch',{s:xs,a:'start'}),
  'Spannungs-Dehnungs-Diagramm eines Stahls mit ausgeprägter Streckgrenze'),
 {tab:[['Kennwert','Bedeutung'],
  ['Re bzw. Rp0,2','Streck- bzw. 0,2-%-Dehngrenze: Beginn der plastischen Verformung'],
  ['Rm','Zugfestigkeit: höchste Spannung'],
  ['A','Bruchdehnung: bleibende Verlängerung in %'],
  ['Z','Brucheinschnürung'],
  ['E','Elastizitätsmodul aus der Hookeschen Geraden'],
  ['σ = F / A₀','Spannung bezogen auf den Anfangsquerschnitt']]},
 {h:'Härteprüfung'},
 {tab:[['Verfahren','Eindringkörper / Messgröße','Geeignet für'],
  ['Brinell (HBW)','Hartmetallkugel; Eindruckdurchmesser','weiche bis mittelharte Werkstoffe'],
  ['Vickers (HV)','Diamantpyramide; Eindruckdiagonale','alle Härten, dünne Schichten'],
  ['Rockwell (HRC)','Diamantkegel; Eindringtiefe','gehärtete Stähle; schnell, einfach']]},
 {p:'Die Prüfung ist zerstörungsarm; Härtewerte lassen sich nur näherungsweise umrechnen.'},
 {h:'Wöhlerkurve: Ermüdung'},
 fig(520,190,
  ar(50,160,500,160)+ar(50,160,50,14)+
  path('M70,40 L330,110 L490,110','sk-l','stroke:var(--bad);stroke-width:2.8')+
  ln(330,110,330,160,'sk-c')+
  t(200,110,'Zeitfestigkeit:',{s:xs})+t(200,124,'sinkt mit Lastwechseln',{s:xs})+t(420,98,'Dauerfestigkeit',{s:xs})+
  [[70,'10³'],[190,'10⁴'],[270,'10⁵'],[330,'10⁶'],[420,'10⁷']].map(([x,l])=>t(x,176,l,{s:xs})).join('')+
  t(275,188,'Lastspielzahl N (log.)',{s:xs}).replace('y="188"','y="188"')+t(16,90,'Spannungsamplitude',{s:xs}).replace('x="16" y="90"','x="16" y="95" transform="rotate(-90 16 95)"'),
  'Wöhlerkurve: Ab etwa 10⁶ bis 10⁷ Lastspielen flacht sie bei Stahl zur Dauerfestigkeit ab'),
 {p:'Kerben, Oberflächenrauheit und Eigenspannungen senken die Dauerfestigkeit. Deshalb gilt: Radien statt scharfer Ecken, glatte Oberflächen, Randschichten verfestigen.'}]}
]);}
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
addTheory('PS',[
{t:'Zeitwirtschaft und Kennzahlen im Bild',b:[
 {h:'Aufbau der Auftragszeit nach REFA'},
 fig(520,230,
  box(190,6,140,32,['Auftragszeit T'],{k:'a',s:sm})+ln(260,38,260,50)+ln(110,50,410,50)+ln(110,50,110,62)+ln(410,50,410,62)+
  box(40,62,140,34,['Rüstzeit tr','je Auftrag einmal'],{k:'y',s:xs})+box(330,62,160,34,['Ausführungszeit ta = m · te','m = Menge'],{k:'b',s:xs})+
  ln(410,96,410,110)+ln(330,110,490,110)+ln(330,110,330,122)+ln(490,110,490,122)+
  box(250,122,160,34,['Grundzeit tg','je Einheit'],{k:'g',s:xs})+box(420,122,96,34,['Verteilzeit tv','sachl. + persönl.'],{k:'g',s:xs})+
  ln(330,156,330,170)+ln(260,170,400,170)+ln(260,170,260,182)+ln(330,170,330,182)+ln(400,170,400,182)+
  box(214,182,92,34,['Hauptzeit','(Hauptnutzung)'],{s:xs})+box(310,182,80,34,['Nebenzeit'],{s:xs})+box(394,182,80,34,['Zusatzzeit'],{s:xs})+
  ls(120,150,['te = tg + tv','T = tr + m · te'],{s:sm,lh:18})+
  t(120,200,'Erholzeit: bei der Grundzeit',{s:xs})+t(120,213,'oder gesondert',{s:xs}),
  'Zeitgliederung: Der Rüstanteil fällt je Auftrag einmal an, der Ausführungsanteil je Stück'),
 {fx:{n:'Sollzeit aus Leistungsgrad',tex:'t_{soll}=t_{ist}\\cdot LG',leg:[['LG','Leistungsgrad (Normalleistung = 100 %)'],['t_ist','beobachtete Zeit']],e:'Wer schneller arbeitet (LG > 100 %), erhält eine längere Sollzeit – bezogen auf die Normalleistung.'}},
 {tab:[['Aufnahmeverfahren','Prinzip'],
  ['Zeitaufnahme','Messen mit Zeitnehmer (Einzel- oder Mehrfachmessung)'],
  ['Multimomentaufnahme','Stichprobe von Zuständen → Anteile (Verteilzeiten, Auslastung)'],
  ['MTM','System vorbestimmter Zeiten aus Grundbewegungen'],
  ['Selbstaufschreibung, Schätzen','einfach, aber ungenau']]},
 {h:'Produktivität, Durchlaufgrad, Termintreue'},
 fig(520,120,
  box(4,16,164,60,['Produktivität','Output / Input','z. B. Stück je Arbeitsstunde'],{k:'b',s:xs})+
  box(178,16,164,60,['Durchlaufgrad','Bearbeitungszeit / Durchlaufzeit','Anteil wertschöpfender Zeit'],{k:'g',s:xs})+
  box(352,16,164,60,['Termintreue','pünktliche Aufträge /','alle Aufträge'],{k:'a',s:xs})+
  t(260,106,'Der Durchlaufgrad ist oft nur wenige Prozent – der Rest ist Liegen und Warten',{s:xs,c:'acc'}),
  'Drei Kennzahlen, die ein Meister regelmäßig vergleicht (Soll-Ist, Zeitreihe)'),
 {h:'Ergonomische Richtwerte am Arbeitsplatz'},
 {tab:[['Faktor','Richtwert'],
  ['Arbeitshöhe','an Körpergröße und Tätigkeit anpassen; Häufiges im Greifraum / Nahbereich'],
  ['Beleuchtung','ca. 500 lx bei Büro und Feinarbeit, bei Feinmontage mehr'],
  ['Raumtemperatur','ca. 20 °C bei leichter Arbeit; Zugluft vermeiden'],
  ['Lärm','unter 85 dB(A); bei geistiger Arbeit deutlich darunter'],
  ['Blendung','vermeiden']]}]},

{t:'Aufbauorganisation, Stellen und Prozessdarstellung',b:[
 {h:'Linie, Stab-Linie, Matrix'},
 fig(520,196,
  t(80,14,'Linienorganisation',{c:'acc'})+box(40,24,80,28,['Leiter'],{k:'b',s:xs})+ln(80,52,80,66)+ln(35,66,125,66)+ln(35,66,35,76)+ln(125,66,125,76)+box(0,76,70,28,['Meister A'],{s:xs})+box(90,76,70,28,['Meister B'],{s:xs})+
  ls(80,124,['Einliniensystem: ein','Vorgesetzter, klare Wege,','aber lange Dienstwege'],{s:xs,lh:13})+
  t(260,14,'Stab-Linie',{c:'acc'})+box(220,24,80,28,['Leiter'],{k:'b',s:xs})+ln(260,52,260,66)+ln(215,66,305,66)+ln(215,66,215,76)+ln(305,66,305,76)+box(180,76,70,28,['Meister A'],{s:xs})+box(270,76,70,28,['Meister B'],{s:xs})+
  box(320,24,66,28,['Stab'],{k:'y',s:xs})+`<line x1="300" y1="38" x2="320" y2="38" class="sk-dim" style="stroke-dasharray:3 2"/>`+
  ls(260,124,['Stab berät, hat keine','Weisungsbefugnis'],{s:xs,lh:13})+
  t(440,14,'Matrix',{c:'acc'})+box(414,24,50,24,['Proj. A'],{k:'g',s:xs})+box(468,24,50,24,['Proj. B'],{k:'g',s:xs})+
  box(364,54,46,24,['Fert.'],{k:'b',s:xs})+box(364,84,46,24,['Einkauf'],{k:'b',s:xs})+
  [[414,54],[468,54],[414,84],[468,84]].map(([x,y])=>circ(x+25,y+12,9,'a')).join('')+
  ls(440,124,['Mitarbeiter unterstehen','zwei Leitungen:','schnell, aber Konfliktgefahr'],{s:xs,lh:13})+
  t(260,186,'Matrix: Funktions- und Projektleitung teilen sich die Weisung',{s:xs,c:'acc'}),
  'Drei Leitungssysteme im Vergleich'),
 {p:'Die Leitungsspanne ist die Zahl der Mitarbeiter, die einer Führungskraft direkt unterstellt sind. Sie wächst bei Routineaufgaben, hoher Qualifikation, räumlicher Nähe, guten Hilfsmitteln und Standardisierung – in der Produktion sind daher größere Spannen möglich als in der Entwicklung.'},
 {h:'Kongruenzprinzip'},
 fig(520,150,
  path('M260,16 L110,128 L410,128 Z','sk-l','fill:color-mix(in srgb,var(--blue) 12%,var(--paper));stroke:var(--blue);stroke-width:2')+
  t(260,10,'Aufgabe',{s:sm,c:'acc'})+t(90,142,'Kompetenz',{s:sm,c:'acc',a:'middle'})+t(430,142,'Verantwortung',{s:sm,c:'acc'})+
  ls(260,80,['Stelle','alle drei müssen','deckungsgleich sein'],{s:xs,lh:15}),
  'Aufgabe, Kompetenz und Verantwortung gehören zusammen'),
 {p:'Wer verantwortlich ist, braucht auch die Befugnisse und Mittel; wem Entscheidungen übertragen werden, trägt die Verantwortung dafür. Verstöße führen zu Frust, Konflikten und Fehlern. Die Stellenbeschreibung hält fest: Bezeichnung, Einordnung (Vorgesetzter, Vertretung), Ziele und Aufgaben, Kompetenzen, Verantwortung, Anforderungen, Zusammenarbeit. Das Funktionendiagramm ordnet Aufgaben den Stellen zu (durchführen, entscheiden, mitwirken, informiert werden).'},
 {h:'Ablauf darstellen: Swimlane-Diagramm'},
 fig(520,205,
  [['Meister',16],['Werker',70],['Qualität',124]].map(([n,y])=>`<rect x="6" y="${y}" width="508" height="52" class="sk-body" style="fill:var(--soft);stroke:var(--line)"/>`+t(40,y+30,n,{s:xs})).join('')+
  box(80,24,86,34,['Auftrag','freigeben'],{k:'b',s:xs})+fa(166,41,196,41)+ln(196,41,196,95,'sk-dim')+
  box(150,78,90,34,['Teil fertigen'],{k:'g',s:xs})+fa(240,95,290,95)+
  box(290,78,90,34,['Teil prüfen'],{k:'g',s:xs}).replace('y="78"','y="78"')+fa(335,112,335,138)+
  box(290,132,90,34,['Entscheidung','i. O.?'],{k:'y',s:xs})+fa(380,149,430,149)+box(430,132,76,34,['Freigabe'],{k:'a',s:xs})+
  t(260,198,'Bahnen zeigen Zuständigkeiten – Schnittstellen und Übergaben werden sichtbar',{s:xs,c:'acc'}),
  'Swimlane: Prozess nach Zuständigkeit gegliedert'),
 {p:'Weitere Notationen: Flussdiagramm (Start, Schritt, Entscheidung, Ende), EPK (Ereignisse und Funktionen im Wechsel), BPMN (standardisierte Notation für Geschäftsprozesse). Prozessdokumentation dient Schulung, Audit und Verbesserung.'}]},

{t:'Ablauf- und Terminplanung im Bild',b:[
 {h:'Das Dilemma der Ablaufplanung'},
 fig(520,200,
  ar(50,170,500,170)+ar(50,170,50,14)+
  path(pl([0,.1,.2,.3,.4,.5,.6,.7,.75,.8,.85,.9,.93,.95].map(u=>[50+u*440,164-20*(u*u/(1-u+0.1))])),'sk-l','stroke:var(--bad);stroke-width:2.8')+
  ln(50+.9*440,170,50+.9*440,28,'sk-c')+
  t(250,190,'Kapazitätsauslastung  →',{s:xs})+t(16,95,'Durchlaufzeit',{s:xs}).replace('x="16" y="95"','x="16" y="100" transform="rotate(-90 16 100)"')+
  t(66,120,'wenig Auslastung =',{s:xs,a:'start'})+t(66,133,'freie Kapazität, kurze',{s:xs,a:'start'})+t(66,146,'Durchlaufzeit',{s:xs,a:'start'})+
  ls(250,40,['hohe Auslastung =','Warteschlangen vor den Maschinen','= lange Durchlaufzeit'],{s:xs,lh:14,a:'start'}),
  'Hohe Auslastung und kurze Durchlaufzeit gleichzeitig sind nicht zu haben'),
 {p:'Ähnlich stehen Termintreue und niedrige Bestände im Konflikt: Puffer sichern den Termin, kosten aber Kapital.'},
 {h:'Prioritätsregeln'},
 {tab:[['Regel','Bedeutung','Wirkung'],
  ['FIFO','First In First Out','fair, einfach'],['KOZ','kürzeste Operationszeit zuerst','senkt die mittlere Durchlaufzeit'],['SZ','kleinste Schlupfzeit (Zeitreserve) zuerst','verbessert Termintreue'],['EDD','frühester Liefertermin zuerst','Termintreue'],['LOZ','längste Operationszeit zuerst','gleichmäßige Auslastung']]},
 {p:'Johnson-Regel (zwei Maschinen, gleiche Reihenfolge): Kleinsten Zeitwert aller Operationen suchen. Gehört er zur ersten Maschine, kommt der Auftrag nach vorn, sonst nach hinten; dann mit den übrigen Aufträgen wiederholen. Ergebnis: minimale Gesamtdurchlaufzeit.'},
 {h:'Netzplan und kritischer Pfad'},
 fig(520,215,
  box(10,76,70,50,['A','2 d'],{k:'b'})+fa(80,92,150,52)+fa(80,110,150,150)+
  box(150,26,70,50,['B','4 d'],{k:'a'})+box(150,126,70,50,['C','3 d'],{k:'b'})+
  fa(220,52,290,92)+fa(220,150,290,110)+box(290,76,70,50,['D','2 d'],{k:'a'})+fa(360,101,410,101)+box(410,76,70,50,['Ende'],{k:'g'})+
  t(185,98,'kritischer Pfad A–B–D = 8 d',{s:xs,c:'acc'}).replace('x="185" y="98"','x="430" y="40"')+
  t(185,196,'C hat 1 d Pufferzeit',{s:xs}).replace('x="185"','x="185"')+
  ls(412,160,['Vorwärts: früheste Zeiten','Rückwärts: späteste Zeiten','Puffer = spätester −','frühester Anfang'],{s:xs,lh:14,a:'middle'}),
  'Netzplan: Vorgänge ohne Puffer bilden den kritischen Pfad'),
 {p:'Verzögerung auf dem kritischen Pfad verschiebt das Projektende; Vorgänge mit Puffer dürfen sich um diese Zeit verspäten.'},
 {h:'Termine verfolgen: Fortschrittszahlen'},
 fig(520,190,
  ar(50,160,500,160)+ar(50,160,50,14)+
  path('M50,160 L480,34','sk-dim','stroke:var(--ink);stroke-dasharray:6 3;stroke-width:2')+
  path('M50,160 C150,148 250,120 330,100 C400,86 440,80 470,78','sk-l','stroke:var(--accent);stroke-width:2.8')+
  fa(330,98,330,64)+fa(330,64,330,98)+t(342,86,'Rückstand',{a:'start',s:xs})+
  t(400,30,'Soll',{a:'start',s:xs})+t(470,95,'Ist',{a:'start',s:xs}).replace('x="470" y="95"','x="478" y="86"')+
  t(275,180,'Zeit  →',{s:xs})+t(16,95,'kumulierte Menge',{s:xs}).replace('x="16" y="95"','x="16" y="100" transform="rotate(-90 16 100)"'),
  'Fortschrittszahlen: Der Abstand zwischen Soll- und Ist-Kurve zeigt Rückstand oder Vorlauf'),
 {p:'Rückmeldungen aus der Betriebsdatenerfassung (BDE) zeigen Abweichungen früh. Der Meister kann dann umplanen, Kapazität verschieben oder Eilaufträge einschieben. Typische Ursachen für Terminverzug: fehlendes Material, Maschinenausfall, Rüstzeiten, Nacharbeit, Krankheit, ungenaue Vorgabezeiten, Eilaufträge, Überlast, späte Rückmeldungen, fehlende Werkzeuge, Konstruktionsänderungen. Abhilfe: Pufferzeiten, Engpassplanung, schnelle Störungsbehebung.'},
 {h:'Kapazität'},
 {fx:{n:'Auslastungsgrad',tex:'\\text{Auslastung}=\\frac{\\text{Belastung}}{\\text{Kapazitätsangebot}}',leg:[['Angebot','Anzahl Maschinen/Personen · Arbeitszeit · Nutzungsgrad'],['Belastung','Mengen · Vorgabezeit der Aufträge']],e:'Über- oder Unterlast ausgleichen durch Überstunden, Schichten, Fremdvergabe oder Umplanung.'}}]},

{t:'Prognose, Programmplanung und Arbeitszeit',b:[
 {h:'Von der Prognose zum Fertigungsauftrag'},
 fig(520,160,
  box(4,16,110,40,['Absatzplan','Prognose, Aufträge'],{k:'b',s:xs})+fa(114,36,128,36)+box(130,16,110,40,['Hauptproduktions-','programm'],{k:'b',s:xs})+fa(240,36,254,36)+box(256,16,110,40,['Materialbedarf','(Stückliste)'],{k:'g',s:xs})+fa(366,36,380,36)+box(382,16,134,40,['Kapazitätsplanung'],{k:'g',s:xs})+
  ln(449,56,449,76)+ln(60,76,449,76)+ln(60,76,60,88)+
  box(4,88,120,40,['Fertigungs-','auftrag bilden'],{k:'y',s:xs})+fa(124,108,138,108)+box(140,88,100,40,['Terminierung'],{k:'y',s:xs})+fa(240,108,254,108)+box(256,88,130,40,['Freigabe und','Steuerung'],{k:'a',s:xs})+
  t(260,150,'Planung wird rollierend angepasst',{s:xs,c:'acc'}),
  'Produktionsprogrammplanung Schritt für Schritt'),
 {h:'Prognoseverfahren'},
 {tab:[['Verfahren','Prinzip'],
  ['Gleitender Durchschnitt','Mittel der letzten n Perioden; glättet Zufall'],
  ['Exponentielle Glättung','Prognose = α · Ist + (1 − α) · alte Prognose; neuere Werte zählen mehr'],
  ['Trend (lineare Regression)','Gerade durch die Vergangenheitswerte, fortgeschrieben'],
  ['Saisonbereinigung','saisonale Schwankungen berücksichtigen']]},
 {p:'Prognosen enthalten immer Fehler; Sicherheitsbestände decken sie ab.'},
 {h:'Arbeitszeitflexibilisierung'},
 {tab:[['Modell','Merkmal'],['Gleitzeit mit Kernzeit','Beginn und Ende variabel, Anwesenheit in der Kernzeit'],['Arbeitszeitkonten','Zeitguthaben und -schulden ausgleichen'],['Schichtmodelle, Teilzeit, Jobsharing','Besetzung und Auslastung steuern'],['Vertrauensarbeitszeit, mobiles Arbeiten','Ergebnis zählt, nicht Anwesenheit'],['Bereitschaft, Rufbereitschaft','Erreichbarkeit außerhalb der Arbeitszeit']]},
 {merke:'Der Betriebsrat hat bei der Lage der Arbeitszeit Mitbestimmungsrechte; das Arbeitszeitgesetz begrenzt die Dauer.'}]},

{t:'Materialwirtschaft im Bild: Bestellung, Bestand, Kanban',b:[
 {h:'Bedarfsrechnung (MRP)'},
 fig(520,125,
  box(4,20,100,44,['Primärbedarf','Aufträge, Prognose'],{k:'b',s:xs})+fa(104,42,120,42)+box(122,20,100,44,['Stückliste →','Bruttobedarf'],{k:'b',s:xs})+fa(222,42,238,42)+
  box(240,20,170,44,['− Lagerbestand','− Bestellungen, Reservierungen','+ Sicherheitsbestand'],{k:'y',s:xs,lh:13})+fa(410,42,426,42)+box(428,20,88,44,['Nettobedarf','→ Aufträge'],{k:'a',s:xs})+
  t(260,98,'Nettobedarf = Bruttobedarf − verfügbarer Bestand + Sicherheitsbestand',{s:xs,c:'acc'})+t(260,114,'Bestell-/Fertigungsaufträge werden um die Vorlaufzeit vorgezogen',{s:xs}),
  'Bruttobedarf wird zum Nettobedarf'),
 {h:'Bestellpunktverfahren'},
 fig(520,205,
  ar(50,170,500,170)+ar(50,170,50,14)+
  path('M60,40 L250,135 L250,40 L440,135 L440,40 L490,65','sk-l','stroke:var(--ink);stroke-width:2.4')+
  ln(50,40,500,40,'sk-dim')+t(496,34,'Höchstbestand',{a:'end',s:xs})+
  ln(50,90,500,90,'sk-dim').replace('class="sk-dim"','class="sk-dim" style="stroke:var(--accent);stroke-dasharray:6 3;stroke-width:1.6"')+t(496,84,'Meldebestand',{a:'end',s:xs})+
  ln(50,135,500,135,'sk-dim').replace('class="sk-dim"','class="sk-dim" style="stroke:var(--bad);stroke-dasharray:6 3;stroke-width:1.6"')+t(496,150,'Sicherheitsbestand',{a:'end',s:xs})+
  circ(165,90,4,'a')+t(165,76,'Bestellung',{s:xs})+ar(165,110,250,110)+t(208,124,'WBZ',{s:xs})+t(250,30,'Lieferung',{s:xs})+
  t(275,190,'Zeit  →',{s:xs}),
  'Bestandsverlauf (Sägezahn): Bei Erreichen des Meldebestands wird eine feste Menge bestellt'),
 {fx:{n:'Meldebestand',tex:'M=\\text{Tagesverbrauch}\\cdot WBZ+\\text{Sicherheitsbestand}',leg:[['WBZ','Wiederbeschaffungszeit in Tagen']],e:'Bestellpunktverfahren: feste Menge, variabler Zeitpunkt. Bestellrhythmusverfahren: feste Abstände, schwankende Menge.'}},
 {fx:{n:'Optimale Bestellmenge (Andler)',tex:'x_{opt}=\\sqrt{\\frac{200\\cdot B\\cdot K_B}{P\\cdot q}}',leg:[['B','Jahresbedarf in Stück'],['K_B','Bestellkosten je Bestellung in €'],['P','Einstandspreis je Stück in €'],['q','Lagerhaltungskostensatz in %']],e:'Beispiel: 10.000 Stück, 40 €, 5 €, 20 % → √(200·10.000·40/(5·20)) ≈ 894 Stück. Mehr Bestellkosten → größere Menge; mehr Preis oder Lagerkostensatz → kleinere Menge.'}},
 {fx:{n:'Kanban-Karten',tex:'n=\\frac{\\text{Tagesverbrauch}\\cdot WBZ\\cdot(1+s)}{\\text{Behälterinhalt}}',leg:[['s','Sicherheitszuschlag']],e:'Beispiel: 480 Stück/Tag, 2 Tage, 10 %, 50 je Behälter → 480·2·1,1/50 = 21,1 ⇒ 22 Karten (aufrunden). Verbrauch löst Nachschub aus (Pull).'}},
 {h:'Lagerkennzahlen'},
 {tab:[['Kennzahl','Formel'],
  ['durchschnittlicher Bestand','(Anfangsbestand + Endbestand) / 2'],
  ['Umschlagshäufigkeit','Jahresverbrauch / durchschnittlicher Bestand'],
  ['durchschnittliche Lagerdauer','360 Tage / Umschlagshäufigkeit'],
  ['Servicegrad','termingerecht belieferte Anforderungen / Gesamtanforderungen'],
  ['Kapitalbindung','Bestand · Einstandspreis']]},
 {h:'Stücklisten, Inventur und Lagerformen'},
 {tab:[['Begriff','Merkmal'],
  ['Mengenstückliste','alle Teile mit Gesamtmenge, keine Struktur'],
  ['Strukturstückliste','Baugruppenhierarchie mit Mengen je Ebene'],
  ['Baukastenstückliste','nur eine Ebene; Baugruppen haben eigene Listen'],
  ['Stichtagsinventur','alle Bestände zu einem Stichtag, oft mit Stillstand'],
  ['permanente Inventur','über das Jahr verteilt, z. B. Zählzyklen, ohne Stillstand'],
  ['Festplatzlagerung','fester Platz je Artikel; übersichtlich, schlechte Flächennutzung'],
  ['chaotische Lagerung','Platz wird per System zugewiesen; hohe Raumnutzung, Lagerverwaltungssystem nötig'],
  ['VMI','Lieferant überwacht den Bestand des Kunden und füllt auf'],
  ['Konsignationslager','Ware beim Kunden, bis zur Entnahme Eigentum des Lieferanten']]}]},

{t:'Lean-Werkzeuge im Bild',b:[
 {h:'Sieben (plus eine) Verschwendungsarten'},
 fig(520,150,
  [['Über-','produktion'],['Warte-','zeit'],['Trans-','port'],['unnötige','Bearbeitung'],['Bestände',''],['Bewegung',''],['Fehler,','Nacharbeit']].map((l,i)=>box(4+i*74,16,70,46,l,{k:i%2?'y':'r',s:xs})).join('')+
  box(4,78,512,36,['achte Verschwendung: ungenutztes Mitarbeiterpotenzial'],{k:'g',s:xs})+
  t(260,138,'Jede Tätigkeit: wertschöpfend – notwendig, aber nicht wertschöpfend – Verschwendung',{s:xs,c:'acc'}),
  'Verschwendung (Muda) erkennen und beseitigen'),
 {h:'Theory of Constraints und Drum-Buffer-Rope'},
 fig(520,190,
  box(4,60,76,42,['Material-','freigabe'],{k:'b',s:xs})+fa(80,81,96,81)+box(98,60,76,42,['Station 1'],{s:xs})+fa(174,81,190,81)+
  box(192,60,50,42,['Puffer'],{k:'y',s:xs})+fa(242,81,256,81)+box(258,56,90,50,['Engpass','(Drum)'],{k:'r',s:sm})+fa(348,81,364,81)+box(366,60,70,42,['Station 3'],{s:xs})+fa(436,81,450,81)+box(452,60,64,42,['Versand'],{k:'g',s:xs})+
  path('M303,56 C303,20 42,20 42,60','sk-f','stroke-dasharray:6 3;stroke:var(--accent);stroke-width:1.8').replace('class="sk-f"','class="sk-f" marker-end="url(#ar)"')+t(170,16,'Seil (Rope): Freigabe nach dem Takt des Engpasses',{s:xs})+
  ls(260,130,['Fünf Schritte: Engpass identifizieren → ausnutzen → alles andere unterordnen → erweitern → nächsten suchen','Puffer (Buffer) schützt den Engpass vor Stillstand'],{s:xs,lh:16}),
  'Die Leistung des Systems bestimmt der Engpass'),
 {h:'5S, Heijunka, Standardisierung'},
 fig(520,100,
  ['Sortieren','Systematisieren','Säubern','Standardisieren','Selbstdisziplin'].map((n,i)=>box(4+i*104,16,100,36,[(i+1)+'. '+n],{k:'g',s:xs})).join('')+
  t(260,82,'Ergebnis: weniger Suchzeit, höhere Sicherheit und Qualität',{s:xs,c:'acc'}),
  '5S: fünf Schritte zum geordneten Arbeitsplatz'),
 {tab:[['Begriff','Kernaussage'],
  ['Heijunka','Produktionsglättung: Menge und Mix gleichmäßig über die Zeit statt große Chargen – stabiler Takt, weniger Bestände'],
  ['Standardarbeitsblatt','Reihenfolge, Zeit, Takt, Qualitätsmerkmale, Sicherheitshinweise, Standardbestand; Basis für PDCA/Kaizen und Einarbeitung'],
  ['Kaizen-Event','kurzer (3–5 Tage) Verbesserungsworkshop am Arbeitsplatz mit schneller Umsetzung'],
  ['A3-Report','ein Blatt A3: Problem, Analyse, Ziele, Maßnahmen, Ergebnis nach PDCA'],
  ['Shopfloor Management','Führung vor Ort: Kennzahlen an der Tafel (Q, Liefertreue, Produktivität, Sicherheit), tägliche Runden, Maßnahmen verfolgen']]}]},

{t:'Industrie 4.0, Informationssicherheit und Projektmanagement',b:[
 {p:'Industrie 4.0: Vernetzung von Maschinen, Produkten und Menschen über das Internet der Dinge, Datenanalyse und Automatisierung. Cyber-physische Systeme verbinden Sensorik und Aktorik mit Software und Netzwerk. Typische Bausteine: Digitaler Zwilling, MES, selbststeuernde Fertigung.'},
 fig(520,185,
  path('M130,22 L50,150 L210,150 Z','sk-l','fill:color-mix(in srgb,var(--blue) 12%,var(--paper));stroke:var(--blue);stroke-width:2')+
  t(130,16,'Vertraulichkeit',{s:xs,c:'acc'})+t(36,166,'Integrität',{s:xs,c:'acc',a:'middle'})+t(216,166,'Verfügbarkeit',{s:xs,c:'acc'})+
  ls(130,110,['Schutzziele','der Informations-','sicherheit'],{s:xs,lh:14})+
  path('M390,22 L310,150 L470,150 Z','sk-l','fill:color-mix(in srgb,var(--ok) 12%,var(--paper));stroke:var(--ok);stroke-width:2')+
  t(390,16,'Qualität',{s:xs,c:'acc'})+t(296,166,'Kosten',{s:xs,c:'acc',a:'middle'})+t(476,166,'Zeit',{s:xs,c:'acc'})+
  ls(390,110,['magisches Dreieck','im Projekt'],{s:xs,lh:14}),
  'Links: Schutzziele der Informationssicherheit; rechts: Zielgrößen im Projekt – sie hängen zusammen'),
 {p:'Maßnahmen der Informationssicherheit: Berechtigungskonzept (Rollen und Rechte), Passwortregeln, getestete Datensicherung (Backup), Updates, Virenschutz, Schulung, Trennung von Produktions- und Büronetz.'},
 {p:'Projekt: Phasen Definition, Planung, Durchführung (mit Steuerung), Abschluss mit Lessons Learned. Der Projektstrukturplan gliedert hierarchisch in Teilaufgaben und Arbeitspakete (Verantwortliche, Termine, Kosten). Risikomanagement: identifizieren, bewerten (Eintrittswahrscheinlichkeit · Auswirkung), Gegenmaßnahmen planen, überwachen und dokumentieren.'}]}
]);}
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
const stk='stroke-width:2.6';
addTheory('KW',[
{t:'Break-even, Engpass und kritische Menge im Bild',b:[
 {h:'Break-even-Analyse'},
 fig(520,230,
  ar(50,195,500,195)+ar(50,195,50,14)+
  path('M50,155 L470,56','sk-l',`stroke:var(--bad);${stk}`)+
  path('M50,195 L470,30','sk-l',`stroke:var(--ok);${stk}`)+
  ln(50,155,500,155,'sk-dim')+t(410,170,'Fixkosten 60.000 €',{s:xs})+
  circ(302,96,5,'a')+ln(302,96,302,195,'sk-c')+ln(50,96,302,96,'sk-c')+
  t(302,210,'3.000 Stück',{s:xs})+t(44,100,'150.000 €',{a:'end',s:xs})+
  t(500,70,'Gesamtkosten',{a:'end',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--bad)"').replace('y="70"','y="76"')+
  t(480,24,'Erlös',{a:'end',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--ok)"')+
  t(410,50,'Gewinnzone',{s:xs,c:'acc'}).replace('y="50"','y="64"')+t(140,148,'Verlustzone',{s:xs,c:'acc'}).replace('x="140" y="148"','x="150" y="150"')+
  t(275,226,'Menge  →',{s:xs}),
  'Break-even bei 60.000 € Fixkosten, Preis 50 €, variablen Kosten 30 €: x = 60.000 / (50 − 30) = 3.000 Stück'),
 {fx:{n:'Break-even und Sicherheit',tex:'x_{BE}=\\frac{K_f}{p-k_v}\\quad SK=\\frac{x_{plan}-x_{BE}}{x_{plan}}\\cdot 100',leg:[['Kf','Fixkosten'],['p − kv','Stückdeckungsbeitrag'],['SK','Sicherheitskoeffizient in %']],e:'Beispiel: Plan 5.000 Stück, Break-even 3.000 → SK = 40 %: Der Absatz kann um 40 % sinken, bevor Verluste entstehen.'}},
 {h:'Engpass: Deckungsbeitrag je Engpasseinheit'},
 fig(520,125,
  box(4,14,248,60,['Produkt A: DB 20 €, 2 h','→ 10 € je Maschinenstunde'],{k:'b',s:sm})+
  box(268,14,248,60,['Produkt B: DB 12 €, 1 h','→ 12 € je Maschinenstunde'],{k:'g',s:sm})+
  t(260,98,'B hat Vorrang – obwohl der absolute DB kleiner ist',{s:xs,c:'acc'})+
  t(260,114,'Produziert wird in dieser Rangfolge, bis die Kapazität verbraucht ist',{s:xs}),
  'Bei Engpass zählt der Deckungsbeitrag je Engpasseinheit'),
 {tab:[['Preisuntergrenze','Höhe','Wann?'],
  ['kurzfristig','variable Stückkosten','freie Kapazität, vorübergehend – jeder Preis darüber deckt Fixkosten mit'],
  ['langfristig','Selbstkosten (Vollkosten)','auf Dauer müssen alle Kosten gedeckt werden, sonst Verlust']]},
 {h:'Eigenfertigung oder Fremdbezug: kritische Menge'},
 fig(520,205,
  ar(50,175,500,175)+ar(50,175,50,14)+
  path('M50,143 L450,66','sk-l',`stroke:var(--accent);${stk}`)+
  path('M50,175 L450,47','sk-l',`stroke:var(--blue);${stk}`)+
  circ(300,95,5,'a')+ln(300,95,300,175,'sk-c')+t(300,190,'5.000 Stück',{s:xs})+
  t(60,26,'Eigenfertigung: 20.000 € + 6 €/Stück',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--accent)"')+t(60,42,'Fremdbezug: 10 €/Stück',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--blue)"')+
  t(130,166,'Fremdbezug günstiger',{s:xs})+t(400,110,'Eigenfertigung',{s:xs})+t(400,123,'günstiger',{s:xs}),
  'Kritische Menge: x = 20.000 / (10 − 6) = 5.000 Stück'),
 {p:'Unter der kritischen Menge lohnt Fremdbezug, darüber Eigenfertigung. Zusätzlich Qualität, Liefersicherheit und Know-how bewerten.'},
 {h:'Fixkostendegression, sprungfixe Kosten, Leerkosten'},
 fig(520,190,
  ar(50,160,500,160)+ar(50,160,50,14)+
  path(pl([.1,.15,.2,.3,.4,.5,.6,.7,.8,.9,1].map(u=>[50+u*430,160-(30+6/u-20)*1.5])),'sk-l',`stroke:var(--bad);${stk}`)+
  ln(50,145,500,145,'sk-dim')+t(496,140,'variable Stückkosten',{a:'end',s:xs})+
  t(150,40,'Fixkosten je Stück sinken',{a:'start',s:xs})+t(150,54,'mit steigender Auslastung',{a:'start',s:xs})+
  t(275,180,'Auslastung / Menge  →',{s:xs})+
  ls(380,30,['Leerkosten =','Fixkosten · (1 − Beschäftigungsgrad)','120.000 € bei 75 % → 30.000 €'],{s:xs,lh:14}),
  'Stückkosten = variable Stückkosten + Fixkosten je Stück (Hyperbel)'),
 {tab:[['Begriff','Bedeutung'],
  ['sprungfixe Kosten','fix in einem Bereich, steigen stufenweise bei Erweiterung (z. B. zusätzliche Schicht)'],
  ['Leerkosten','Fixkosten für ungenutzte Kapazität'],
  ['mehrstufige DB-Rechnung','Erlös − variable Kosten = DB I; − Produktfixkosten = DB II; − Produktgruppenfixkosten = DB III; − Unternehmensfixkosten = Ergebnis']]}]},

{t:'Kalkulation im Bild: Zuschläge, Rückwärtsrechnung, Spanne',b:[
 {h:'Zuschlagskalkulation – das Schema'},
 fig(520,205,
  box(6,8,158,26,['Fertigungsmaterial (Einzelk.)'],{k:'b',s:xs})+t(176,25,'+',{s:sm})+box(188,8,160,26,['Materialgemeinkosten'],{k:'y',s:xs})+t(360,25,'=',{s:sm})+box(372,8,108,26,['Materialkosten'],{k:'g',s:xs})+
  box(6,44,158,26,['Fertigungslöhne (Einzelk.)'],{k:'b',s:xs})+t(176,61,'+',{s:sm})+box(188,44,160,26,['Fertigungsgemeinkosten'],{k:'y',s:xs})+t(360,61,'=',{s:sm})+box(372,44,108,26,['Fertigungskosten'],{k:'g',s:xs})+
  t(260,84,'(+ Sondereinzelkosten der Fertigung)',{s:xs})+
  box(6,94,158,26,['Materialkosten'],{k:'g',s:xs})+t(176,111,'+',{s:sm})+box(188,94,160,26,['Fertigungskosten'],{k:'g',s:xs})+t(360,111,'=',{s:sm})+box(372,94,108,26,['Herstellkosten'],{k:'a',s:xs})+
  box(6,130,110,26,['Herstellkosten'],{k:'a',s:xs})+t(126,147,'+',{s:sm})+box(136,130,116,26,['Verwaltungsgemk.'],{k:'y',s:xs})+t(262,147,'+',{s:sm})+box(272,130,106,26,['Vertriebsgemk.'],{k:'y',s:xs})+t(390,147,'=',{s:sm})+box(402,130,112,26,['Selbstkosten'],{k:'a',s:xs})+
  t(260,184,'Zuschlagssatz = Gemeinkosten / Zuschlagsgrundlage · 100  (z. B. 12.000 / 40.000 = 30 %)',{s:xs,c:'acc'}),
  'Selbstkosten = Herstellkosten + Verwaltungs- und Vertriebsgemeinkosten'),
 {tab:[['Verfahren','Prinzip','Einsatz'],
  ['Divisionskalkulation','Stückkosten = Gesamtkosten / Menge','Einproduktfertigung'],
  ['Äquivalenzziffern','Sorten werden mit Gewichtungsfaktoren in Recheneinheiten umgerechnet','ähnliche Sortenprodukte'],
  ['Zuschlagskalkulation','Gemeinkosten prozentual auf Einzelkosten','Mehrproduktfertigung, Einzelfertigung'],
  ['Bezugsgrößenkalkulation','Kostensätze je Bezugsgröße (Maschinenstunde, Rüstvorgang)','hoher Gemeinkostenanteil, automatisierte Fertigung']]},
 {tab:[['Zeitpunkt','Basis','Zweck'],['Vorkalkulation','Plan-/Normalkosten','Angebotspreis'],['mitlaufend','laufende Istwerte','Abweichungen früh erkennen'],['Nachkalkulation','Istkosten','Preis und Wirtschaftlichkeit prüfen, Datenbasis für künftige Kalkulation']]},
 {h:'Rückwärts- und Differenzkalkulation'},
 fig(520,175,
  `<rect x="30" y="20" width="110" height="110" class="sk-body" style="fill:color-mix(in srgb,var(--blue) 20%,var(--paper));stroke:var(--blue)"/>`+t(85,80,'1.000 €',{s:sm})+t(85,96,'Listenpreis',{s:xs})+
  `<rect x="170" y="38" width="110" height="92" class="sk-body" style="fill:color-mix(in srgb,var(--ok) 20%,var(--paper));stroke:var(--ok)"/>`+t(225,86,'900 €',{s:sm})+t(225,102,'Zielverkaufspreis',{s:xs})+
  `<rect x="310" y="42" width="110" height="88" class="sk-body" style="fill:color-mix(in srgb,var(--accent) 20%,var(--paper));stroke:var(--accent)"/>`+t(365,88,'882 €',{s:sm})+t(365,104,'bar (Skonto)',{s:xs})+
  fa(140,70,170,70)+fa(280,80,310,80)+t(155,62,'−10 %',{s:xs})+t(295,72,'−2 %',{s:xs})+
  ls(260,155,['danach Vertriebskosten, Verwaltungskosten und Gewinn abziehen','→ höchstzulässige Selbstkosten'],{s:xs,lh:14}),
  'Rückwärtskalkulation: vom Marktpreis zu den erlaubten Kosten'),
 {p:'Differenzkalkulation vergleicht den erreichbaren Preis mit den Selbstkosten und zeigt Gewinn oder Verlust.'},
 {h:'Handelsspanne und Kalkulationszuschlag'},
 fig(520,120,
  `<rect x="60" y="30" width="200" height="34" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/>`+t(160,52,'Einstandspreis 100 €',{s:xs})+
  `<rect x="260" y="30" width="100" height="34" class="sk-body" style="fill:color-mix(in srgb,var(--ok) 25%,var(--paper));stroke:var(--ok)"/>`+t(310,52,'Rohgewinn 50 €',{s:xs})+
  t(160,92,'Kalkulationszuschlag: 50 / 100 = 50 %',{s:xs,c:'acc'})+
  ln(60,26,360,26,'sk-c')+t(210,20,'Verkaufspreis 150 €',{s:xs})+
  t(310,108,'Handelsspanne: 50 / 150 = 33,3 %',{s:xs,c:'acc'}),
  'Gleicher Rohgewinn, andere Bezugsgröße'),
 {h:'Kostenstellen: Ist-, Normal-, Plan-Zuschlag'},
 {tab:[['Zuschlag','Basis','Folge'],
  ['Ist','tatsächliche Gemeinkosten des Zeitraums','schwankt, erst nachträglich'],
  ['Normal','Durchschnitt vergangener Perioden','stabile Zuschläge'],
  ['Plan','Planwerte','Vorgabe für Steuerung']]},
 {p:'Weichen verrechnete (Normal-)Gemeinkosten von den Ist-Gemeinkosten ab, entsteht Kostenüberdeckung (verrechnet mehr als angefallen) oder Kostenunterdeckung (weniger); sie wird im BAB ermittelt. Gegenseitige Leistungen von Hilfskostenstellen verrechnet das Gleichungsverfahren: Für jede Hilfsstelle wird ein Verrechnungspreis als Unbekannte angesetzt, das Gleichungssystem berücksichtigt die gegenseitige Belieferung – genauer als Anbau- und Treppenverfahren.'}]},

{t:'Lohn, Finanzierung und Bilanzkennzahlen im Bild',b:[
 {h:'Entgeltformen'},
 {tab:[['Form','Berechnung','Beispiel'],
  ['Zeitlohn','Stunden · Stundenlohn','160 h · 19,50 € = 3.120 €'],
  ['Akkordlohn','Vorgabezeit je Einheit · Menge · Minutenfaktor (Akkordrichtsatz/60)','4 min · 120 · 0,30 = 144 €'],
  ['Prämienlohn','Grundlohn + Prämie für Mehrleistung, Qualität, Einsparung','–']]},
 {p:'Mindestlohn und Garantielohn sind zu beachten. Personalkosten = Bruttolohn + Arbeitgeberanteile zur Sozialversicherung + weitere Lohnnebenkosten (Urlaubs-/Weihnachtsgeld, Betriebsrente). Der Stundensatz = Jahreskosten / produktive Stunden (Arbeitstage minus Urlaub, Feiertage, Krankheit, Schulung): z. B. 60.000 € / (1.704 h · 85 %) ≈ 41,43 €/h.'},
 {h:'Finanzierung'},
 {tab:[['Form','Merkmal'],
  ['Eigenfinanzierung','Einlagen, einbehaltene Gewinne; unabhängig von Gläubigern'],
  ['Fremdfinanzierung','Kredite, Anleihen mit Zins und Rückzahlung'],
  ['Leasing','Nutzung gegen Rate, Eigentum beim Leasinggeber; schont Liquidität, flexibel, meist teurer'],
  ['Mietkauf','Mietraten mit Option auf Eigentumserwerb']]},
 {fx:{n:'Effektiver Jahreszins bei Verzicht auf Skonto',tex:'i\\approx\\frac{s}{100-s}\\cdot\\frac{360}{Z-F}\\cdot 100',leg:[['s','Skonto in %'],['Z','Zahlungsziel in Tagen'],['F','Skontofrist in Tagen']],e:'Beispiel: 2 % bei 10 Tagen, Ziel 30 Tage: 2/98 · 360/20 = 36,7 % p. a. → meist teurer als ein Bankkredit, Skonto in der Regel ausnutzen.'}},
 {h:'Bilanzkennzahlen'},
 fig(520,225,
  `<rect x="30" y="20" width="190" height="100" class="sk-body" style="fill:color-mix(in srgb,var(--blue) 18%,var(--paper));stroke:var(--blue)"/>`+t(125,64,'Anlagevermögen',{s:xs})+t(125,80,'500',{s:sm})+
  `<rect x="30" y="120" width="190" height="100" class="sk-body" style="fill:color-mix(in srgb,var(--ok) 18%,var(--paper));stroke:var(--ok)"/>`+t(125,164,'Umlaufvermögen',{s:xs})+t(125,180,'500',{s:sm})+
  `<rect x="240" y="20" width="190" height="80" class="sk-body" style="fill:color-mix(in srgb,var(--accent) 18%,var(--paper));stroke:var(--accent)"/>`+t(335,54,'Eigenkapital',{s:xs})+t(335,70,'400',{s:sm})+
  `<rect x="240" y="100" width="190" height="120" class="sk-body" style="fill:color-mix(in srgb,var(--warn) 18%,var(--paper));stroke:var(--warn)"/>`+t(335,154,'Fremdkapital',{s:xs})+t(335,170,'600',{s:sm})+
  t(125,14,'Aktiva = 1.000',{s:xs,c:'acc'})+t(335,14,'Passiva = 1.000',{s:xs,c:'acc'})+
  ls(470,52,['EK-Quote','40 %'],{s:xs,lh:14})+ls(470,128,['Verschuldungs-','grad 150 %'],{s:xs,lh:14})+ls(470,196,['Anlagen-','deckung 80 %'],{s:xs,lh:14}),
  'Bilanz-Beispiel: Eigenkapitalquote = 400/1.000, Verschuldungsgrad = 600/400, Anlagendeckung = EK / Anlagevermögen = 400/500'),
 {tab:[['Kennzahl','Formel'],
  ['Liquidität 1. Grades','flüssige Mittel / kurzfristige Verbindlichkeiten'],
  ['Liquidität 2. Grades','(flüssige Mittel + Forderungen) / kurzfr. Verbindlichkeiten'],
  ['Liquidität 3. Grades','Umlaufvermögen / kurzfr. Verbindlichkeiten'],
  ['Working Capital','Umlaufvermögen − kurzfristiges Fremdkapital'],
  ['Eigenkapitalrentabilität','Gewinn / Eigenkapital · 100'],
  ['Gesamtkapitalrentabilität','(Gewinn + Fremdkapitalzinsen) / Gesamtkapital · 100'],
  ['Umsatzrentabilität','Gewinn / Umsatz · 100'],
  ['Cashflow','Jahresüberschuss + Abschreibungen + Rückstellungsbildung (Innenfinanzierungskraft)'],
  ['EBIT / EBITDA','Ergebnis vor Zinsen und Steuern / zusätzlich vor Abschreibungen']]},
 {p:'Goldene Bilanzregel: Langfristig gebundenes Vermögen langfristig finanzieren.'},
 fig(520,110,
  box(10,32,120,44,['ROI','10 %'],{k:'a',s:sm})+t(150,60,'=',{s:sm})+box(165,32,150,44,['Umsatzrendite','Gewinn / Umsatz = 5 %'],{k:'g',s:xs})+t(335,60,'·',{s:sm})+box(350,32,160,44,['Kapitalumschlag','Umsatz / Kapital = 2'],{k:'b',s:xs})+
  t(260,100,'DuPont-Schema: ROI = Umsatzrendite · Kapitalumschlag',{s:xs,c:'acc'}),
  'ROI nach DuPont'),
 {p:'Incoterms (ICC) regeln, wer Transport, Versicherung, Zoll und Gefahrenübergang trägt (EXW ab Werk, FCA, DAP, DDP) – und damit, welche Kosten in den Einstandspreis eingehen.'}]},

{t:'Investitionsrechnung im Bild: Barwert, Kapitalwert, Zinsfuß',b:[
 {fx:{n:'Auf- und Abzinsen',tex:'K_n=K_0\\cdot(1+i)^n\\quad K_0=\\frac{K_n}{(1+i)^n}',leg:[['i','Zinssatz'],['n','Jahre']],e:'10.000 € bei 5 % nach 3 Jahren = 11.576,25 €; 10.000 € in 3 Jahren sind heute 8.638,38 € wert (Barwert).'}},
 {h:'Kapitalwertmethode – Zahlungsstrahl'},
 fig(520,225,
  ar(30,100,505,100)+
  [0,1,2,3,4].map(i=>ln(70+i*100,94,70+i*100,106)+t(70+i*100,i===0?88:120,i===0?'heute':i+' Jahr'+(i>1?'e':''),{s:xs})).join('')+
  `<rect x="58" y="100" width="24" height="60" style="fill:color-mix(in srgb,var(--bad) 30%,var(--paper));stroke:var(--bad)"/>`+t(70,176,'−100.000',{s:xs,c:'acc'}).replace('x="70"','x="70"')+
  [1,2,3,4].map(i=>`<rect x="${58+i*100}" y="40" width="24" height="60" style="fill:color-mix(in srgb,var(--ok) 30%,var(--paper));stroke:var(--ok)"/>`+t(70+i*100,34,'+30.000',{s:xs})+t(70+i*100,140,'Barwert',{s:xs})+t(70+i*100,154,['27.778','25.720','23.815','22.051'][i-1],{s:xs,c:'acc'})).join('')+
  t(300,196,'Σ Barwerte = 99.364 € → Kapitalwert = 99.364 − 100.000 = − 636 €  (bei 8 %)',{s:xs})+
  t(260,214,'Kapitalwert > 0 vorteilhaft  ·  = 0 gleichwertig  ·  < 0 nicht vorteilhaft',{s:xs,c:'acc'}),
  'Kapitalwert: alle Zahlungen auf heute abzinsen'),
 {h:'Interner Zinsfuß'},
 fig(520,205,
  ar(40,100,500,100)+ar(40,185,40,12)+
  path(pl([[60,50],[160,77.8],[260,101.6],[360,122],[460,140]]),'sk-l',`stroke:var(--accent);${stk}`)+
  [[60,'0 %'],[160,'4 %'],[260,'8 %'],[360,'12 %'],[460,'16 %']].map(([x,l])=>t(x,116,l,{s:xs})).join('')+
  circ(252,100,5,'a')+t(300,84,'interner Zinsfuß ≈ 7,7 %',{s:xs,c:'acc'})+
  t(62,38,'+20.000 €',{s:xs,a:'start'})+t(400,164,'Kapitalwert negativ',{s:xs})+
  t(270,196,'Kalkulationszinssatz  →',{s:xs})+t(14,100,'Kapitalwert',{s:xs}).replace('x="14" y="100"','x="14" y="100" transform="rotate(-90 14 100)"'),
  'Kapitalwertkurve des Beispiels: Der Zinssatz, bei dem sie die Nulllinie schneidet, ist der interne Zinsfuß'),
 {p:'Liegt der interne Zinsfuß über dem geforderten Kalkulationszinssatz, ist die Investition vorteilhaft. Er wird iterativ oder durch Interpolation bestimmt.'},
 {fx:{n:'Annuität',tex:'A=K\\cdot\\frac{i\\,(1+i)^n}{(1+i)^n-1}',leg:[['K','Anschaffungsauszahlung'],['i','Kalkulationszins'],['n','Nutzungsjahre']],e:'Beispiel: 100.000 € über 4 Jahre bei 8 % → ca. 30.192 € je Jahr. Ist der jährliche Überschuss größer, lohnt die Investition.'}},
 {h:'Statisch oder dynamisch?'},
 {tab:[['','Statisch','Dynamisch'],
  ['Verfahren','Kosten-, Gewinn-, Rentabilitätsvergleich, Amortisation','Kapitalwert, interner Zinsfuß, Annuität'],
  ['Rechnet mit','Durchschnittswerten eines Jahres','Zahlungszeitpunkten (Abzinsen)'],
  ['Zeitwert','ignoriert','berücksichtigt'],
  ['Eignung','kurze Nutzung, Vorauswahl','längere Nutzung']]},
 {fx:{n:'Kalkulatorische Kosten und Amortisation',tex:'\\text{Abschr.}=\\frac{AK-RW}{ND}\\quad Z=\\frac{AK+RW}{2}\\cdot i\\quad T=\\frac{AK}{\\bar R}',leg:[['AK','Anschaffungskosten'],['RW','Restwert'],['ND','Nutzungsdauer'],['R̄','durchschnittlicher jährlicher Rückfluss (Gewinn + Abschreibung)']],e:'Zinsen: (100.000 + 20.000)/2 · 0,08 = 4.800 €/a. Amortisation: 100.000 / 25.000 = 4 Jahre (Nachteil: Erträge danach und Zinsen bleiben unberücksichtigt). Rentabilität: 9.000 / 50.000 = 18 % (durchschnittliches Kapital = halbe Anschaffung).'}}]},

{t:'Kostenarten und Kostenbeeinflussung im Bild',b:[
 {h:'Abschreibungsarten im Vergleich'},
 fig(520,205,
  ar(50,170,500,170)+ar(50,170,50,14)+
  [0,1,2,3].map(i=>`<rect x="${90+i*55}" y="${170-60}" width="22" height="60" style="fill:color-mix(in srgb,var(--blue) 30%,var(--paper));stroke:var(--blue)"/>`).join('')+
  [2000,1600,1280,1024].map((v,i)=>`<rect x="${112+i*55}" y="${170-v*0.024}" width="22" height="${v*0.024}" style="fill:color-mix(in srgb,var(--accent) 30%,var(--paper));stroke:var(--accent)"/>`).join('')+
  [0,1,2,3].map(i=>t(112+i*55,186,'Jahr '+(i+1),{s:xs})).join('')+
  t(380,60,'■ linear: 2.500 € je Jahr',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--blue)"')+t(380,76,'■ degressiv: fallende Beträge',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--accent)"')+
  ls(380,104,['degressiv, 20 % vom','Restbuchwert (10.000 €):','2.000 → 1.600 → 1.280 …'],{s:xs,a:'start',lh:14}),
  'Lineare und degressive Abschreibung (Schemabild)'),
 {fx:{n:'Leistungsabschreibung',tex:'A=AK\\cdot\\frac{\\text{Ist-Leistung}}{\\text{Gesamtleistung}}',leg:[['AK','Anschaffungskosten']],e:'Beispiel: 15.000 € · 60.000 / 200.000 = 4.500 €. Sinnvoll bei stark schwankender Auslastung oder verschleißabhängiger Nutzung. Steuerlich ist die degressive Abschreibung nur zeitweise und begrenzt zulässig; in der Kalkulation zählt der tatsächliche Wertverzehr.'}},
 {h:'Mischkosten auflösen'},
 fig(520,205,
  ar(50,170,500,170)+ar(50,170,50,14)+
  path('M50,110 L440,48','sk-l',`stroke:var(--accent);${stk}`)+
  circ(160,93,5,'a')+circ(350,63,5,'a')+
  t(160,84,'40.000 € bei 1.000',{s:xs})+t(350,54,'52.000 € bei 1.800',{s:xs}).replace('x="350"','x="385"').replace('y="54"','y="58"')+
  ln(50,110,500,110,'sk-dim')+t(50,126,'Kf = 25.000 €',{a:'start',s:xs})+
  t(275,190,'Menge  →',{s:xs}),
  'Zwei Beobachtungen genügen: kv = (52.000 − 40.000) / (1.800 − 1.000) = 15 €; Kf = 40.000 − 15 · 1.000 = 25.000 €'),
 {h:'Abgrenzungsrechnung'},
 fig(520,150,
  box(4,20,100,50,['Aufwand','(Buchhaltung)'],{k:'b',s:xs})+fa(104,45,150,45)+
  box(152,6,140,26,['neutraler Aufwand/Ertrag'],{k:'r',s:xs})+box(152,38,140,26,['+ Zusatzkosten'],{k:'g',s:xs})+box(152,70,140,26,['≈ Anderskosten'],{k:'y',s:xs})+
  fa(292,45,330,45)+box(332,20,90,50,['Kosten','(Betrieb)'],{k:'a',s:xs})+fa(422,45,440,45)+box(442,20,74,50,['Betriebs-','ergebnis'],{k:'g',s:xs})+
  ls(260,120,['neutral: betriebsfremd, außerordentlich, periodenfremd → ausgrenzen','Zusatzkosten (kalkulatorischer Unternehmerlohn) kommen hinzu','Anderskosten: kalkulatorische Abschreibung/Zinsen ersetzen buchhalterische Werte'],{s:xs,lh:14}),
  'Von Aufwand zu Kosten'),
 {h:'Kosten steuern: Target Costing, LCC, Wertanalyse'},
 fig(520,170,
  box(4,14,250,60,['Target Costing (marktorientiert)','Zielkosten = Zielpreis − Zielgewinn','→ auf Funktionen/Komponenten verteilen'],{k:'b',s:xs})+
  box(266,14,250,60,['klassisch (kostenorientiert)','Kosten + Gewinn = Preis'],{s:xs})+
  ar(30,150,490,150)+
  `<rect x="30" y="100" width="70" height="42" style="fill:color-mix(in srgb,var(--blue) 25%,var(--paper));stroke:var(--blue)"/>`+t(65,126,'Anschaffung',{s:xs})+
  `<rect x="100" y="100" width="140" height="42" style="fill:color-mix(in srgb,var(--warn) 25%,var(--paper));stroke:var(--warn)"/>`+t(170,126,'Betrieb, Energie',{s:xs})+
  `<rect x="240" y="100" width="130" height="42" style="fill:color-mix(in srgb,var(--bad) 25%,var(--paper));stroke:var(--bad)"/>`+t(305,126,'Wartung, Stillstand',{s:xs})+
  `<rect x="370" y="100" width="60" height="42" style="fill:var(--soft);stroke:var(--ink)"/>`+t(400,126,'Entsorgung',{s:xs})+
  t(260,92,'Lebenszykluskosten (LCC/TCO): Der Anschaffungspreis ist oft nur ein kleiner Teil',{s:xs,c:'acc'}),
  'Zielkosten und Lebenszykluskosten'),
 {p:'Wertanalyse: Funktionen eines bestehenden Produkts bestimmen, Funktionskosten ermitteln, Alternativen entwickeln (Werkstoff, Fertigung, Normteile) und bewerten – gleicher oder höherer Nutzen bei geringeren Kosten. Value Engineering setzt schon in der Entwicklung an. Gemeinkostenwertanalyse: Leistungen indirekter Bereiche erfassen, nach Kundennutzen bewerten, Einsparpotenziale (weglassen, vereinfachen, automatisieren) umsetzen. Zero-Base-Budgeting: Budget jedes Jahr neu begründen statt fortschreiben.'},
 {h:'Plan- und Istkosten: Abweichungen'},
 {tab:[['Abweichung','Berechnung','Ursache / Verantwortung'],
  ['Preisabweichung','(Istpreis − Planpreis) · Istmenge','Einkaufspreise → Einkauf'],
  ['Mengenabweichung','(Istmenge − Planmenge) · Planpreis','Mehr-/Minderverbrauch → Fertigung']]},
 {p:'Istkostenrechnung rechnet nachträglich mit tatsächlichen Kosten (schwankend), Normalkostenrechnung mit Durchschnittswerten der Vergangenheit, Plankostenrechnung mit Vorgabewerten bei geplanter Beschäftigung – sie vergleicht Soll mit Ist. Standardkostenrechnung: feste Standardwerte für Mengen und Preise, geeignet bei stabiler Fertigung mit wiederkehrenden Produkten.'},
 {p:'Kosten senken: Material – Lieferanten vergleichen, Mengen bündeln, Rahmenverträge, Standardteile, weniger Ausschuss und Verschnitt, weniger Bestand. Gemeinkosten – Prozesse vereinfachen, Energie sparen, Instandhaltung planen, Leerlauf und Rüstzeiten verringern.'}]}
]);}
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
const mix=(v,p=24)=>`fill:color-mix(in srgb,var(${v}) ${p}%,var(--paper));stroke:var(${v})`;
addTheory('AUG',[
{t:'Sicherheitszeichen und Brandschutz im Bild',b:[
 {h:'Farben und Formen der Sicherheitszeichen'},
 fig(520,185,
  circ(55,60,34,'').replace('class="sk-body"','class="sk-body" style="fill:var(--paper);stroke:var(--bad);stroke-width:7"')+ln(32,37,78,83,'sk-l').replace('class="sk-l"','class="sk-l" style="stroke:var(--bad);stroke-width:6"')+
  circ(150,60,34,'').replace('class="sk-body"','class="sk-body" style="fill:var(--blue);stroke:var(--blue)"')+`<path d="M150,40 L150,80 M135,55 L150,40 L165,55" style="fill:none;stroke:var(--paper);stroke-width:6"/>`+
  `<polygon points="245,26 280,92 210,92" style="fill:var(--warn);stroke:var(--ink);stroke-width:4;stroke-linejoin:round"/>`+t(245,82,'!',{s:'font-size:26px;font-weight:700'})+
  `<rect x="318" y="28" width="68" height="64" rx="4" style="fill:var(--ok);stroke:var(--ok)"/><path d="M335,60 L368,60 M356,48 L368,60 L356,72" style="fill:none;stroke:var(--paper);stroke-width:5"/>`+
  `<rect x="418" y="28" width="68" height="64" rx="4" style="fill:var(--bad);stroke:var(--bad)"/><rect x="440" y="52" width="24" height="32" rx="4" style="fill:var(--paper)"/><rect x="446" y="44" width="12" height="9" style="fill:var(--paper)"/><path d="M458,46 L470,46 L474,56" style="fill:none;stroke:var(--paper);stroke-width:3"/>`+
  t(55,116,'Verbot',{s:sm,c:'acc'})+ls(55,131,['rund, rot, Balken','schwarzes Symbol'],{s:xs,lh:13})+
  t(150,116,'Gebot',{s:sm,c:'acc'})+ls(150,131,['rund, blau,','weißes Symbol'],{s:xs,lh:13})+
  t(245,116,'Warnung',{s:sm,c:'acc'})+ls(245,131,['dreieckig, gelb,','schwarzer Rand'],{s:xs,lh:13})+
  t(352,116,'Rettung',{s:sm,c:'acc'})+ls(352,131,['rechteckig, grün,','weißes Symbol'],{s:xs,lh:13})+
  t(452,116,'Brandschutz',{s:sm,c:'acc'})+ls(452,131,['rechteckig, rot,','weißes Symbol'],{s:xs,lh:13}),
  'Die fünf Zeichenarten nach Form und Farbe'),
 {h:'Brandklassen und Löschmittel'},
 {tab:[['Klasse','Brennstoff','Löschmittel','Hinweis'],
  ['A','feste, glutbildende Stoffe','Wasser, Schaum, ABC-Pulver',''],
  ['B','flüssige Stoffe','Schaum, Pulver, CO₂',''],
  ['C','Gase','Pulver; Gaszufuhr stoppen',''],
  ['D','Metalle','Metallbrandpulver','kein Wasser!'],
  ['F','Speiseöle und -fette','Fettbrandlöscher','kein Wasser!']]},
 {p:'CO₂ eignet sich für elektrische Anlagen, Wasser nicht. Der Arbeitgeber benennt Brandschutzhelfer (Richtwert rund 5 % der Beschäftigten), stellt geeignete Feuerlöscher bereit und lässt sie regelmäßig prüfen, erstellt Brandschutz- und Alarmordnung, unterweist die Beschäftigten und führt Räumungsübungen durch. Die Arbeitsstättenregel ASR A2.3 beschreibt Fluchtwege, Notausgänge, Flucht- und Rettungsplan (Mindestbreiten, maximale Fluchtweglängen, Kennzeichnung, Türen, Beleuchtung).'}]},

{t:'Maschinen, Schutzeinrichtungen, Stapler und Leitern',b:[
 {h:'Pflichten des Herstellers: Drei-Stufen-Methode'},
 fig(520,175,
  box(6,10,168,76,['1. Inhärent sichere','Konstruktion','Gefahr gar nicht','erst entstehen lassen'],{k:'g',s:xs})+fa(174,47,190,47)+
  box(192,10,168,76,['2. Schutzeinrichtungen','trennend / nicht trennend','wo Konstruktion nicht reicht'],{k:'y',s:xs})+fa(360,47,376,47)+
  box(378,10,138,76,['3. Benutzer-','information','Restrisiko,','Betriebsanleitung'],{k:'r',s:xs})+
  ls(260,108,['Außerdem: Risikobeurteilung · Konformitätsbewertung · technische Unterlagen ·','Betriebsanleitung · EU-Konformitätserklärung · CE-Kennzeichnung'],{s:xs,lh:15})+
  t(260,150,'Rangfolge: Konstruktion vor Schutzeinrichtung vor Information',{s:xs,c:'acc'}),
  'Maschinenrichtlinie (künftig Maschinenverordnung): Reihenfolge der Maßnahmen'),
 {tab:[['Schutzeinrichtung','Beispiele','Prinzip'],
  ['trennend','feste Verkleidung, bewegliche Schutztür mit Verriegelung','verhindert den Zugang'],
  ['nicht trennend','Lichtvorhang, Laserscanner, Zweihandschaltung, Schaltmatte, Not-Halt','erkennt Personen oder sichert Handlungen']]},
 {falle:'Schutzeinrichtungen dürfen nicht umgangen oder manipuliert werden – auch nicht „nur kurz zum Einrichten“.'},
 {h:'Gabelstapler und Flurförderzeuge'},
 {ul:['Fahrer: Ausbildung, schriftliche Beauftragung, jährliche Unterweisung.','Tägliche Sichtprüfung; Tragfähigkeit und Lastschwerpunkt beachten.','Gabeln tief fahren; Last bergwärts; rückwärts bei Sichtbehinderung.','Fahrwege kennzeichnen; Mitfahren verboten; Prüfung durch befähigte Person mindestens jährlich.']},
 {h:'Leitern sicher benutzen'},
 fig(520,205,
  ln(40,180,500,180,'sk-l')+`<rect x="330" y="20" width="14" height="160" style="fill:var(--soft);stroke:var(--ink)"/>`+`<rect x="344" y="62" width="150" height="10" style="fill:var(--soft);stroke:var(--ink)"/>`+
  path('M266,180 L326,22','sk-l','stroke:var(--accent);stroke-width:4')+path('M278,180 L338,22','sk-l','stroke:var(--accent);stroke-width:4')+
  [0,1,2,3,4,5].map(i=>{const f=(i+1)/7;return ln(266+f*60,180-f*158,278+f*60,180-f*158,'sk-l').replace('class="sk-l"','class="sk-l" style="stroke:var(--accent);stroke-width:3"')}).join('')+
  path('M296,180 A30,30 0 0 0 277.7,152.4','sk-l','stroke:var(--ok);stroke-width:2.2')+t(302,168,'65–75°',{s:xs,a:'start'})+
  ar(406,22,406,62,'sk-dim')+t(412,46,'≈ 1 m',{a:'start',s:xs})+t(420,56,'Leiter überragt den Austritt',{a:'start',s:xs}).replace('y="56"','y="100"').replace('x="420"','x="352"')+
  ls(40,40,['3 Haltepunkte (Kontaktstellen)','nicht auf der obersten Sprosse stehen','nicht seitlich hinauslehnen','vorher Sichtprüfung'],{s:xs,lh:15,a:'start'})+
  t(120,200,'nur kurze Arbeiten geringer Gefährdung – länger: Gerüst',{s:xs,c:'acc'}).replace('x="120"','x="260"'),
  'Anstellwinkel 65 bis 75°, Überstand etwa einen Meter'),
 ]},

{t:'Gefährdungsbeurteilung: Risikomatrix und STOP',b:[
 {h:'Risikomatrix: Schwere × Wahrscheinlichkeit'},
 fig(520,230,
  Array.from({length:25},(_,k)=>{const c=k%5+1,r=Math.floor(k/5)+1;const v=c*r;const col=v<=4?'--ok':v<=9?'--warn':'--bad';return `<rect x="${86+(c-1)*38}" y="${150-(r-1)*30}" width="38" height="30" style="${mix(col,34)};stroke-width:1"/>`+t(86+(c-1)*38+19,150-(r-1)*30+19,v,{s:xs})}).join('')+
  [1,2,3,4,5].map(i=>t(86+(i-1)*38+19,196,i,{s:xs})+t(76,150-(i-1)*30+19,i,{s:xs,a:'end'})).join('')+
  t(176,214,'Eintrittswahrscheinlichkeit  →',{s:xs})+t(18,100,'Schwere',{s:xs}).replace('x="18" y="100"','x="22" y="105" transform="rotate(-90 22 105)"')+
  box(300,26,206,40,['hoch (z. B. ≥ 10)','Maßnahmen vor Weiterarbeit'],{k:'r',s:xs})+box(300,74,206,40,['mittel (z. B. 5–9)','Maßnahmen planen'],{k:'y',s:xs})+box(300,122,206,40,['gering (z. B. ≤ 4)','beobachten'],{k:'g',s:xs})+
  t(404,190,'Nach den Maßnahmen: Restrisiko neu bewerten',{s:xs,c:'acc'}),
  'Risiko = Schwere · Wahrscheinlichkeit (Stufen 1 bis 5, Grenzen betriebsspezifisch)'),
 {h:'STOP-Prinzip: Rangfolge der Schutzmaßnahmen'},
 fig(520,185,
  box(10,10,300,34,['S  Substitution – Gefahr ersetzen oder vermeiden'],{k:'g',s:xs})+
  box(40,50,300,34,['T  Technische Maßnahmen – Kapselung, Absaugung'],{k:'b',s:xs})+
  box(70,90,300,34,['O  Organisation – Zeitbegrenzung, Unterweisung'],{k:'y',s:xs})+
  box(100,130,300,34,['P  Persönliche Schutzausrüstung – letzte Möglichkeit'],{k:'r',s:xs})+
  ar(440,16,440,164,'sk-f')+t(470,90,'wirksamer',{s:xs}).replace('x="470" y="90"','x="466" y="60"')+t(466,130,'weniger wirksam',{s:xs}).replace('x="466" y="130"','x="448" y="178"')+
  t(300,178,'kollektiv vor individuell',{s:xs,c:'acc'}).replace('x="300"','x="200"'),
  'STOP: Von der Ursache bis zum Individualschutz'),
 {h:'Psychische Belastung und Gesundheitsschutz'},
 {p:'Psychische Belastung (Zeitdruck, Arbeitsmenge, Störungen, Monotonie, Konflikte, unklare Rollen) muss seit 2013 im Arbeitsschutzgesetz ausdrücklich beurteilt werden. Maßnahmen: Arbeitsgestaltung, Pausen, Information, Beteiligung der Beschäftigten. Betriebliches Eingliederungsmanagement (BEM): Wer innerhalb von zwölf Monaten länger als sechs Wochen ununterbrochen oder wiederholt arbeitsunfähig ist, dem muss der Arbeitgeber ein BEM anbieten; Teilnahme freiwillig, Betriebsrat (ggf. Betriebsarzt) beteiligt.'},
 {p:'Mobbing und Konflikte: früh hinschauen und das Gespräch suchen, Vorfälle sachlich dokumentieren, beide Seiten anhören, Verhalten klar benennen, Betriebsrat, Personalabteilung oder Beratungsstellen einbinden, Betroffene schützen. Bildschirmarbeit: Pausen oder Mischarbeit, Bildschirm entspiegelt, Blickabstand ca. 50–70 cm, Oberkante etwa auf Augenhöhe, Sitz-/Tischhöhe einstellbar, Beleuchtung ohne Blendung, Angebot einer Augenuntersuchung.'}]},

{t:'Gefahrstoffe: Kennzeichnung, Explosionsschutz, Lagerung',b:[
 {h:'Etikett und Sicherheitsdatenblatt'},
 {tab:[['Angabe','Bedeutung'],
  ['H-Sätze (Hazard)','beschreiben die Gefahr, z. B. „entzündbar“'],
  ['P-Sätze (Precaution)','Sicherheitshinweise zu Vorbeugung, Reaktion, Lagerung, Entsorgung'],
  ['Betriebsanweisung','Stoffbezeichnung, Gefahren, Schutzmaßnahmen, Verhalten bei Gefahr, Erste Hilfe, Entsorgung – nach SDB, verständlich'],
  ['Gefahrstoffverzeichnis','alle Gefahrstoffe: Bezeichnung, Einstufung, Mengenbereich, Arbeitsbereich, Verweis auf SDB; zugänglich halten'],
  ['AGW','zeitlich gewichtete Konzentration in der Luft (meist 8 h), bei der keine Gesundheitsschäden zu erwarten sind; TRGS 900'],
  ['biologischer Grenzwert','Konzentration im Körper (Blut, Urin); TRGS 903']]},
 {h:'Explosionsschutz: drei Stufen'},
 fig(520,205,
  path('M110,24 L40,140 L180,140 Z','sk-l','fill:color-mix(in srgb,var(--bad) 12%,var(--paper));stroke:var(--bad);stroke-width:2')+
  t(110,18,'Brennstoff (Gas, Staub)',{s:xs})+t(26,156,'Sauerstoff',{s:xs,a:'start'})+t(216,156,'Zündquelle',{s:xs,a:'end'})+
  ls(110,100,['explosionsfähige','Atmosphäre =','alle drei'],{s:xs,lh:13})+
  box(230,10,280,50,['Primär','explosionsfähige Atmosphäre vermeiden oder begrenzen','(Lüftung, Inertisierung)'],{k:'b',s:xs,lh:14})+
  box(230,70,280,50,['Sekundär','Zündquellen vermeiden','(Zündquellenfreiheit, ATEX-Betriebsmittel)'],{k:'y',s:xs,lh:14})+
  box(230,130,280,50,['Tertiär','Auswirkungen begrenzen','(explosionsfeste Bauweise, Druckentlastung)'],{k:'r',s:xs,lh:14})+
  t(110,190,'Zonen + Explosionsschutzdokument',{s:xs,c:'acc'}),
  'Explosionsschutz: Reihenfolge primär → sekundär → tertiär'),
 {h:'Atemschutz und Lagerung'},
 {tab:[['Thema','Merkmal'],
  ['FFP1 – FFP3','partikelfiltrierende Halbmasken; FFP2 ≥ 94 %, FFP3 ≥ 99 % Rückhaltevermögen; gegen Stäube und Aerosole, nicht gegen Gase (Gasfilter nötig); Tragezeitbegrenzung beachten'],
  ['Zusammenlagerung','nach Lagerklassen getrennt (brennbare Flüssigkeiten nicht mit Oxidationsmitteln, Säuren nicht mit Laugen)'],
  ['Behälter, Wanne','verschließbar, gekennzeichnet; Auffangwanne für wassergefährdende Flüssigkeiten'],
  ['Arbeitsplatz','Tagesbedarf, Sicherheitsschrank, Lüftung, Zündquellen fernhalten, Zugang nur für Befugte']]},
 {p:'Hautschutz bei Kühlschmierstoffen: Hautschutzplan (Schutz vor der Arbeit, milde Reinigung, Pflege danach), geeignete Handschuhe, Spritzschutz, Absaugung von Nebel, nasse Kleidung wechseln, arbeitsmedizinische Vorsorge anbieten.'}]},

{t:'Lärm, Vibration, Heben und persönliche Schutzausrüstung',b:[
 {h:'Lärm: Auslösewerte'},
 fig(520,175,
  `<rect x="30" y="52" width="140" height="34" style="${mix('--ok',34)}"/>`+`<rect x="170" y="52" width="90" height="34" style="${mix('--warn',40)}"/>`+`<rect x="260" y="52" width="230" height="34" style="${mix('--bad',34)}"/>`+
  t(100,74,'unter 80 dB(A)',{s:xs})+t(215,74,'80–85',{s:xs})+t(375,74,'ab 85 dB(A)',{s:xs})+
  ln(170,40,170,100,'sk-l')+ln(260,40,260,100,'sk-l')+t(170,34,'untere Auslösewerte',{s:xs})+t(260,20,'obere Auslösewerte',{s:xs}).replace('x="260"','x="300"')+
  ls(170,118,['80 dB(A) / 135 dB(C) Spitze','Gehörschutz bereitstellen,','Vorsorge anbieten'],{s:xs,lh:14})+
  ls(375,118,['85 dB(A) / 137 dB(C) Spitze','Tragepflicht, Bereich kennzeichnen,','Lärmminderungsprogramm'],{s:xs,lh:14}),
  'Lärmauslösewerte und die daraus folgenden Pflichten'),
 {tab:[['Belastung','Auslösewert','Grenzwert (A(8))'],['Hand-Arm-Vibration','2,5 m/s²','5 m/s²'],['Ganzkörpervibration','0,5 m/s²','1,15 m/s²']]},
 {p:'Maßnahmen: vibrationsarme Geräte, Wartung, kürzere Expositionszeiten und Pausen, Handschuhe, Sitzfederung, arbeitsmedizinische Vorsorge.'},
 {h:'Manuelle Lastenhandhabung'},
 {p:'Nach der Lastenhandhabungsverordnung sind schwere Lasten möglichst zu vermeiden (Hilfsmittel). Bleibt manuelle Handhabung nötig, wird das Risiko mit der Leitmerkmalmethode beurteilt: Lastgewicht, Haltung, Ausführungsbedingungen, Zeitdauer. Maßnahmen: Lasten verkleinern, Hebehilfen, Tätigkeitswechsel, Unterweisung in rückengerechtem Heben.'},
 {h:'Persönliche Schutzausrüstung (PSA)'},
 fig(520,150,
  box(6,12,168,50,['Kategorie I','minimale Risiken'],{k:'g',s:xs})+box(176,12,168,50,['Kategorie II','mittlere Risiken'],{k:'y',s:xs})+box(346,12,168,50,['Kategorie III','irreversible Folgen / Tod','z. B. Atemschutz'],{k:'r',s:xs,lh:14})+
  ls(260,92,['Kopf · Gehör · Augen/Gesicht · Atem · Hand · Fuß · Körper · Absturzschutz'],{s:xs})+
  t(260,116,'Arbeitgeber stellt bereit und unterweist – Beschäftigte tragen bestimmungsgemäß',{s:xs,c:'acc'})+t(260,136,'Wartung und Prüfung der PSA nicht vergessen',{s:xs}),
  'PSA-Kategorien nach EU-Verordnung'),
 {h:'Arbeitszeit: Nachtarbeit'},
 {p:'Nachtzeit: 23 bis 6 Uhr. Nachtarbeitnehmer arbeiten regelmäßig in Wechselschicht oder mindestens 48 Tage im Jahr nachts. Rechte: arbeitsmedizinische Untersuchung, Versetzung auf einen Tagesarbeitsplatz bei gesundheitlichen Bedenken, angemessener Ausgleich (Freizeit oder Zuschlag). Die Arbeitszeit darf im Schnitt acht Stunden nicht überschreiten.'}]},

{t:'Arbeitsunfall, Anzeige und betriebliche Akteure',b:[
 {h:'Wann ist ein Unfall anzuzeigen?'},
 fig(520,185,
  box(4,26,100,50,['Unfalltag','(zählt nicht mit)'],{k:'r',s:xs})+fa(104,51,120,51)+
  box(122,26,130,50,['> 3 Tage','Arbeitsunfähigkeit','oder tödlich'],{k:'y',s:xs})+fa(252,51,268,51)+
  box(270,26,110,50,['Anzeige binnen','3 Tagen'],{k:'a',s:xs})+fa(380,51,396,51)+box(398,26,118,50,['Unfallversicherungs-','träger'],{k:'g',s:xs})+
  ls(260,104,['Kopie an Aufsichtsbehörde und Betriebsrat','Jede Erste-Hilfe-Leistung ins Verbandbuch'],{s:xs,lh:15})+
  ls(260,146,['Auch Beinaheunfälle melden – ohne Schuldzuweisung,','damit Schwachstellen vor dem Schaden auffallen'],{s:xs,c:'acc',lh:15}),
  'Meldekette bei Arbeitsunfällen'),
 {tab:[['Begriff','Merkmal'],
  ['Wegeunfall','auf dem direkten Weg von/zur Arbeit versichert, private Umwege nicht'],
  ['Leistungen der Unfallversicherung','Heilbehandlung, Reha, Verletztengeld, Renten, Hinterbliebenenleistung, Prävention; Haftungsprivileg: Arbeitgeber haftet nur bei Vorsatz'],
  ['Berufskrankheit','in der BK-Verordnung gelistet (z. B. Lärmschwerhörigkeit, Hautkrankheiten, Asbestose); begründeter Verdacht muss gemeldet werden'],
  ['1000-Mann-Quote','meldepflichtige Unfälle je 1000 Beschäftigte'],
  ['Schweregrad','Ausfalltage je Unfall'],
  ['LTIR','Unfälle mit Ausfalltagen je 1 Mio. Arbeitsstunden']]},
 {h:'Wer macht was im Arbeitsschutz?'},
 fig(520,150,
  box(4,12,160,60,['Fachkraft für','Arbeitssicherheit','Betriebsarzt (ASiG)'],{k:'b',s:xs})+box(180,12,160,60,['Sicherheits-','beauftragter','ab 20 Beschäftigten'],{k:'g',s:xs})+box(356,12,160,60,['Arbeitsschutz-','ausschuss','mind. vierteljährlich'],{k:'y',s:xs})+
  ls(84,92,['beraten, begehen,','nicht weisungsgebunden'],{s:xs,lh:14})+ls(260,92,['ehrenamtlich, meldet Mängel,','trägt keine Verantwortung'],{s:xs,lh:14})+ls(436,92,['Arbeitgeber, Betriebsrat,','FaSi, Betriebsarzt, SiBe'],{s:xs,lh:14})+
  t(260,136,'Verantwortung bleibt beim Arbeitgeber und den Führungskräften – also auch beim Meister',{s:xs,c:'acc'}),
  'Betriebliche Akteure'),
 {h:'Elektrische Betriebsmittel'},
 {tab:[['Größe','Bedeutung'],
  ['IP54','1. Ziffer: Fremdkörper/Berührung (5 = staubgeschützt), 2. Ziffer: Wasser (4 = Spritzwasser aus allen Richtungen)'],
  ['FI/RCD','vergleicht Hin- und Rückstrom, schaltet bei Fehlerstrom ab; Personenschutz höchstens 30 mA'],
  ['Schutzklasse I','Basisisolierung + Gehäuse am Schutzleiter'],
  ['Schutzklasse II','doppelte/verstärkte Isolierung, kein Schutzleiter'],
  ['Schutzklasse III','Schutzkleinspannung (SELV)']]}]},

{t:'Rechtsgrundlagen, Unterweisung, Umweltrecht und Managementsysteme',b:[
 {h:'Rangfolge der Regeln'},
 fig(520,200,
  `<polygon points="260,12 140,52 380,52" style="${mix('--bad',22)};stroke-width:1.5"/>`+t(260,44,'Gesetze, Verordnungen',{s:xs})+
  `<polygon points="140,52 100,92 420,92 380,52" style="${mix('--warn',26)};stroke-width:1.5"/>`+t(260,78,'DGUV Vorschriften – verbindlich (autonomes Recht)',{s:xs})+
  `<polygon points="100,92 60,132 460,132 420,92" style="${mix('--blue',22)};stroke-width:1.5"/>`+t(260,118,'DGUV Regeln – konkretisieren (Vermutungswirkung)',{s:xs})+
  `<polygon points="60,132 20,172 500,172 460,132" style="${mix('--ok',22)};stroke-width:1.5"/>`+t(260,158,'DGUV Informationen – Empfehlungen, nicht verbindlich',{s:xs})+
  t(260,192,'z. B. DGUV Vorschrift 1 „Grundsätze der Prävention“',{s:xs,c:'acc'}),
  'Verbindlichkeit der Regelwerke'),
 {h:'Unterweisung'},
 {p:'Unterweisen: vor Aufnahme der Tätigkeit, bei Änderungen (neue Maschine, Verfahren, Gefahrstoff), nach Unfällen und danach regelmäßig, mindestens einmal jährlich (Jugendliche halbjährlich). Dokumentieren: Datum, Inhalt, Unterweisender, Teilnehmer mit Unterschrift. Sie muss verständlich und arbeitsplatzbezogen sein und in der Arbeitszeit stattfinden.'},
 {h:'Umweltrecht und Umweltmanagement'},
 {tab:[['Thema','Kernaussage'],
  ['Abfallschlüssel','sechsstellig nach Abfallverzeichnis-Verordnung; gefährliche Abfälle mit Stern (*)'],
  ['Erzeugerpflicht','Erzeuger bleibt verantwortlich, wählt zugelassene Entsorger, führt Nachweise und Begleitscheine'],
  ['BImSchG','Schutz vor Luftverunreinigung, Lärm, Erschütterungen, Licht, Strahlen; Genehmigung, Stand der Technik, Messungen, Betriebsbeauftragte'],
  ['Ökobilanz','Ressourcenverbrauch und Emissionen über den Lebensweg; Ziele im Umweltprogramm'],
  ['ISO 14001','Umweltmanagementsystem (Umweltaspekte, Rechtskonformität, KVP)'],
  ['ISO 45001','Arbeitsschutzmanagement (Gefährdungen, Chancen/Risiken, Beteiligung)']]},
 {p:'ISO 14001 und ISO 45001 folgen der High-Level-Structure und dem PDCA-Zyklus und sind zertifizierbar.'}]}
]);}
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const mix=(v,p=24)=>`fill:color-mix(in srgb,var(${v}) ${p}%,var(--paper));stroke:var(${v})`;
addTheory('PF',[
{t:'Kündigung und Fristen im Bild',b:[
 {h:'Kündigungsfristen für den Arbeitgeber (§ 622 BGB)'},
 fig(520,230,
  ar(40,180,505,180)+ar(40,180,40,14)+
  [['Probezeit','2 Wo.',0.5],['Grundfrist','4 Wo.',0.93],['ab 2 J.','1 Mon.',1],['ab 5 J.','2 Mon.',2],['ab 8 J.','3 Mon.',3],['ab 10 J.','4 Mon.',4],['ab 12 J.','5 Mon.',5],['ab 15 J.','6 Mon.',6],['ab 20 J.','7 Mon.',7]].map(([n,l,m],i)=>`<rect x="${58+i*50}" y="${180-m*20}" width="38" height="${m*20}" style="${mix(i<2?'--blue':'--accent',30)}"/>`+t(77+i*50,174-m*20,l,{s:xs})+t(77+i*50,196,n,{s:xs})).join('')+
  t(275,216,'Betriebszugehörigkeit  →',{s:xs})+t(14,100,'Frist',{s:xs}).replace('x="14" y="100"','x="16" y="100" transform="rotate(-90 16 100)"')+
  t(60,34,'Grundfrist: 4 Wochen zum 15. oder zum Monatsende',{s:xs,a:'start'})+t(60,48,'ab 2 Jahren: Monatsende',{s:xs,a:'start'}),
  'Verlängerte Fristen gelten für die Kündigung durch den Arbeitgeber; die Probezeit (bis 6 Monate) hat 2 Wochen Frist'),
 {h:'Kündigungsarten und Fristen im Überblick'},
 fig(520,200,
  box(4,10,250,48,['Ordentliche Kündigung','mit Frist (§ 622 BGB)'],{k:'b',s:xs})+box(266,10,250,48,['Außerordentliche (fristlose) Kündigung','wichtiger Grund, § 626 BGB'],{k:'r',s:xs})+
  ls(130,82,['KSchG: Betrieb > 10 Arbeitnehmer,','Beschäftigte nach 6 Monaten','Gründe: personen-, verhaltens-,','betriebsbedingt (Sozialauswahl)','Klage binnen 3 Wochen'],{s:xs,lh:14})+
  ls(392,82,['Erklärung binnen 2 Wochen ab Kenntnis','Abwägung beider Interessen:','Fortsetzung bis Fristende unzumutbar','meist Abmahnung vorher,','außer bei schwersten Verstößen'],{s:xs,lh:14})+
  box(30,160,460,36,['Betriebsrat vorher anhören (§ 102 BetrVG)','Bedenken: 1 Woche (ordentlich) · 3 Tage (außerordentlich) – sonst unwirksam'],{k:'y',s:xs,lh:14}),
  'Kündigung: zwei Wege und die Pflicht zur Betriebsratsanhörung'),
 {h:'Abmahnung und Zeugnis'},
 {tab:[['Thema','Kernaussage'],
  ['Abmahnung','Bei verhaltensbedingten Pflichtverletzungen meist vor der Kündigung nötig: Verstoß konkret beschreiben (Datum, Ort, Hergang), vertragsgemäßes Verhalten fordern (Rüge), Konsequenzen androhen (Warnfunktion); zeitnah, in die Personalakte; Mitarbeiter kann Stellung nehmen'],
  ['einfaches Zeugnis','Person, Dauer und Art der Tätigkeit'],
  ['qualifiziertes Zeugnis','zusätzlich Leistung und Verhalten; wohlwollend, aber wahr und klar; keine Geheimcodes'],
  ['Anspruch','bei Beendigung (§ 109 GewO); auf Wunsch auch Zwischenzeugnis']]}]},

{t:'Arbeitsrecht kompakt: Verträge, Tarif, Urlaub, Mitbestimmung',b:[
 {tab:[['Thema','Regel'],
  ['Weisungsrecht (§ 106 GewO)','Inhalt, Ort, Zeit der Arbeit nach billigem Ermessen im Rahmen von Gesetz, Tarifvertrag, Betriebsvereinbarung, Arbeitsvertrag; unzulässig bei Gesetzesverstoß oder Missachtung von Persönlichkeits- und Gesundheitsschutz'],
  ['Befristung (TzBfG)','Schriftform; ohne Sachgrund bis 2 Jahre, höchstens dreimal verlängerbar, nur wenn zuvor kein Arbeitsverhältnis mit demselben Arbeitgeber bestand; mit Sachgrund (Vertretung, Projekt) länger; keine Schlechterbehandlung'],
  ['Mindesturlaub','24 Werktage bei 6-Tage-Woche = 20 Tage bei 5-Tage-Woche; Tarifverträge oft mehr'],
  ['Krankheit','Entgeltfortzahlung bis 6 Wochen; unverzügliche Meldung; ärztlicher Nachweis ab dem 4. Tag (elektronisch)'],
  ['AGG','verbietet Benachteiligung wegen ethnischer Herkunft, Geschlecht, Religion, Weltanschauung, Behinderung, Alter, sexueller Identität; Arbeitgeber: vorbeugen, Beschwerdestelle, einschreiten'],
  ['DSGVO','Zweckbindung, Datenminimierung, Rechtsgrundlage (Vertrag, Gesetz, Einwilligung), Schutz, Löschung; Auskunfts-, Berichtigungs-, Löschrechte; der Meister gibt Personaldaten nicht unbefugt weiter'],
  ['Kurzarbeit','vorübergehende Verkürzung bei erheblichem Arbeitsausfall; vertraglich/tariflich/betrieblich geregelt, Mitbestimmung; Kurzarbeitergeld rund 60 bzw. 67 % des Nettoentgeltausfalls; Anzeige beim Arbeitsamt']]},
 {h:'Tarifvertrag und Betriebsvereinbarung'},
 fig(520,175,
  box(10,12,230,40,['Tarifvertrag','Gewerkschaft ↔ Arbeitgeber(verband)'],{k:'b',s:xs})+box(280,12,230,40,['Betriebsvereinbarung','Betriebsrat ↔ Arbeitgeber (für den Betrieb)'],{k:'g',s:xs})+
  fa(125,52,125,86)+fa(395,52,395,86)+
  box(10,86,500,34,['Arbeitsvertrag – Günstigkeitsprinzip: das für den Arbeitnehmer Günstigere gilt'],{k:'y',s:xs})+
  t(260,142,'Tarifvorrang: Was üblicherweise tariflich geregelt wird, darf nicht Gegenstand einer Betriebsvereinbarung sein',{s:xs,c:'acc'}).replace('x="260"','x="260"'),
  'Rangfolge von Tarifvertrag, Betriebsvereinbarung und Arbeitsvertrag'),
 {h:'Mitbestimmung des Betriebsrats'},
 {tab:[['Norm','Gegenstand','Recht'],
  ['§ 87 BetrVG','soziale Angelegenheiten: Arbeitszeit, Pausen, Urlaubsgrundsätze, Verhaltensregeln, Überwachungstechnik, Entgeltgrundsätze','echte Mitbestimmung'],
  ['§ 99 BetrVG','Einstellung, Versetzung, Ein- und Umgruppierung','Zustimmung nötig; Verweigerung aus gesetzlichen Gründen'],
  ['§ 102 BetrVG','Kündigung','Anhörung vor jeder Kündigung; sonst unwirksam']]}]},

{t:'Führungsmodelle im Bild',b:[
 {h:'Kontinuum der Führungsstile (Tannenbaum/Schmidt)'},
 fig(520,150,
  [['autoritär','Chef entscheidet'],['patriarchal','überzeugt'],['beratend','fragt vor'],['kooperativ','Gruppe im Rahmen'],['delegativ','Gruppe entscheidet']].map((l,i)=>box(4+i*104,40,100,52,l,{k:['r','y','g','g','b'][i],s:xs})).join('')+
  ar(30,22,490,22)+t(30,14,'Entscheidungsspielraum des Chefs',{a:'start',s:xs})+t(490,14,'Spielraum der Mitarbeiter',{a:'end',s:xs})+
  t(260,120,'Je größer der Entscheidungsspielraum der Mitarbeiter, desto kooperativer der Stil',{s:xs,c:'acc'})+t(260,138,'Welcher Stil passt, hängt von Führungskraft, Mitarbeitern und Situation ab',{s:xs}),
  'Vom autoritären Befehl bis zur Gruppenentscheidung'),
 {h:'3-D-Modell nach Reddin'},
 fig(520,225,
  ln(60,200,60,16)+ln(60,200,480,200)+
  `<rect x="60" y="16" width="210" height="92" style="${mix('--blue',16)}"/><rect x="270" y="16" width="210" height="92" style="${mix('--ok',22)}"/><rect x="60" y="108" width="210" height="92" style="${mix('--warn',16)}"/><rect x="270" y="108" width="210" height="92" style="${mix('--accent',20)}"/>`+
  ls(165,50,['Beziehungstyp','effektiv: Förderer','ineffektiv: Missionar'],{s:xs,lh:15})+ls(375,50,['Integrationstyp','effektiv: Integrator','ineffektiv: Kompromissler'],{s:xs,lh:15})+
  ls(165,142,['Verfahrenstyp','effektiv: Verwalter','ineffektiv: Deserteur'],{s:xs,lh:15})+ls(375,142,['Aufgabentyp','effektiv: Macher','ineffektiv: Autokrat'],{s:xs,lh:15})+
  t(270,218,'Aufgabenorientierung  →',{s:xs})+t(26,108,'Beziehungsorientierung  →',{s:xs}).replace('x="26" y="108"','x="26" y="108" transform="rotate(-90 26 108)"'),
  'Dritte Dimension: Effektivität – derselbe Stil kann je nach Situation wirksam oder unwirksam sein'),
 {p:'Kein Führungsstil ist an sich der beste: Der Integrator ist effektiv, der Kompromissler ineffektiv; der Verwalter wirkt im richtigen Umfeld, der Autokrat nicht.'},
 {tab:[['Modell','Aussage'],
  ['Theorie X (McGregor)','Menschen arbeiten ungern und müssen kontrolliert und geführt werden → eher autoritär'],
  ['Theorie Y (McGregor)','Menschen suchen Verantwortung, identifizieren sich mit Zielen und steuern sich selbst, wenn die Bedingungen stimmen → kooperativ'],
  ['transaktional','Austausch: Leistung gegen Belohnung, klare Ziele, Kontrolle nach Abweichungen'],
  ['transformational','Vision, Vorbild, individuelle Förderung, Sinn – über das Erwartete hinaus'],
  ['Management by Exception','Eingriff nur bei Abweichung; entlastet, braucht klare Toleranzgrenzen; Gefahr: Gutes wird nicht gewürdigt'],
  ['Management by Objectives','Zielvereinbarung: messbare (SMART) Ziele, Mitarbeiter wählt den Weg, Ergebnis wird besprochen; braucht Kompetenzen, Ressourcen, Rückmeldung, Vertrauen'],
  ['Führen auf Distanz','Ergebnisse statt Anwesenheit, feste Kommunikationsrituale, Erreichbarkeitsregeln, Vertrauen; Arbeitszeit- und Datenschutz einhalten'],
  ['Vielfalt / Generationen','Unterschiede anerkennen, Stärken nutzen (Mentoring), Vorurteile abbauen, einheitliche Regeln, AGG beachten']]},
 {h:'Delegation: was ja, was nein'},
 fig(520,140,
  box(6,10,250,92,['Delegierbar','Routine- und Fachaufgaben','Aufgaben, für die der Mitarbeiter qualifiziert ist','und Befugnis + Mittel erhält'],{k:'g',s:xs,lh:16})+
  box(264,10,250,92,['Nicht delegierbar','Zielsetzung, Personalauswahl, Beurteilung,','Disziplinarmaßnahmen, Motivation,','vertrauliche Aufgaben, Gesamtverantwortung'],{k:'r',s:xs,lh:16})+
  t(260,126,'Die Gesamtverantwortung bleibt immer bei der Führungskraft',{s:xs,c:'acc'}),
  'Delegation überträgt Aufgabe und Kompetenz – die Verantwortung bleibt')]},

{t:'Kommunikation und Gespräche im Bild',b:[
 {h:'Vier-Seiten-Modell (Schulz von Thun)'},
 fig(520,200,
  box(190,6,140,36,['Sachinhalt','worüber ich informiere'],{k:'b',s:xs})+box(20,82,150,36,['Selbstoffenbarung','was ich von mir zeige'],{k:'y',s:xs})+box(350,82,150,36,['Beziehung','was ich von dir halte'],{k:'g',s:xs})+box(190,158,140,36,['Appell','was ich bei dir erreichen will'],{k:'r',s:xs})+
  circ(260,100,36,'a')+t(260,104,'Nachricht',{s:sm})+
  fa(260,42,260,64)+fa(170,100,224,100)+fa(350,100,296,100)+fa(260,158,260,136),
  'Jede Nachricht hat vier Seiten – der Empfänger hört mit vier Ohren'),
 {p:'Das einfache Sender-Empfänger-Modell beschreibt Codierung, Kanal und Decodierung mit möglichen Störungen. Watzlawick: „Man kann nicht nicht kommunizieren“ – jedes Verhalten, auch Schweigen, hat Mitteilungscharakter. Weitere Axiome: Inhalts- und Beziehungsaspekt, Interpunktion von Ereignisfolgen, digital und analog, symmetrisch und komplementär.'},
 {h:'Johari-Fenster'},
 fig(520,205,
  `<rect x="140" y="30" width="170" height="70" style="${mix('--ok',26)}"/><rect x="310" y="30" width="170" height="70" style="${mix('--warn',26)}"/><rect x="140" y="100" width="170" height="70" style="${mix('--blue',22)}"/><rect x="310" y="100" width="170" height="70" style="${mix('--ink',10)}"/>`+
  t(225,22,'mir bekannt',{s:xs})+t(395,22,'mir unbekannt',{s:xs})+t(130,70,'anderen',{s:xs,a:'end'})+t(130,84,'bekannt',{s:xs,a:'end'})+t(130,140,'anderen',{s:xs,a:'end'})+t(130,154,'unbekannt',{s:xs,a:'end'})+
  ls(225,62,['Öffentliche Person','(beiden bekannt)'],{s:xs,lh:15})+ls(395,62,['Blinder Fleck','(nur den anderen bekannt)'],{s:xs,lh:15})+ls(225,132,['Fassade','(nur mir bekannt)'],{s:xs,lh:15})+ls(395,132,['Unbekanntes','(keinem bekannt)'],{s:xs,lh:15})+
  t(260,194,'Feedback verkleinert den blinden Fleck, Offenheit die Fassade → größere öffentliche Fläche = Vertrauen',{s:xs,c:'acc'}),
  'Johari-Fenster'),
 {h:'Feedback und aktives Zuhören'},
 {tab:[['Thema','Regeln'],
  ['Feedback','zeitnah und konkret; beschreibend statt wertend (Beobachtung – Wirkung – Wunsch); Ich-Botschaften; ausgewogen; nur zu änderbarem Verhalten; Kritik unter vier Augen; Empfänger darf nachfragen und entscheidet, was er annimmt'],
  ['aktives Zuhören','volle Aufmerksamkeit, Blickkontakt, nicken, offene Fragen, Paraphrasieren, Gefühle verbalisieren, zusammenfassen, Pausen aushalten']]},
 {h:'Kritikgespräch in Phasen'},
 fig(520,155,
  ['Vorbereiten','Anlass nennen','Sicht anhören','Wirkung erklären'].map((n,i)=>box(4+i*130,10,122,40,[n],{k:'b',s:xs})+(i<3?fa(126+i*130,30,134+i*130,30):'')).join('')+
  ['Lösung erarbeiten','Vereinbarung + Termin','positiv abschließen'].map((n,i)=>box(4+i*130,70,122,40,[n],{k:'g',s:xs})+(i<2?fa(126+i*130,90,134+i*130,90):'')).join('')+
  box(394,70,122,40,['nachfassen'],{k:'a',s:xs})+fa(386,90,394,90)+
  t(260,138,'Kritik betrifft das Verhalten, nicht die Person',{s:xs,c:'acc'}),
  'Kritikgespräch: sieben Schritte'),
 {h:'Zielvereinbarung: SMART'},
 fig(520,95,
  [['S','spezifisch'],['M','messbar'],['A','attraktiv (akzeptiert)'],['R','realistisch'],['T','terminiert']].map(([a,b],i)=>box(4+i*104,12,100,46,[a,b],{k:['b','g','y','a','r'][i],s:xs})).join('')+
  t(260,82,'Ergebnis schriftlich festhalten, Zwischenstände und Unterstützung vereinbaren, im Beurteilungsgespräch prüfen',{s:xs}),
  'SMART-Ziele'),
 {p:'Rückkehr- oder Fehlzeitengespräch: persönlich Interesse zeigen, Hilfe anbieten, Arbeitsplatzbedingungen besprechen, keine Diagnosen verlangen (Datenschutz); bei häufigen Fehlzeiten Muster ansprechen, Unterstützung (BEM), klare Erwartungen und Folgen; vertraulich dokumentieren.'}]},

{t:'Team, Besprechung und Zeitmanagement',b:[
 {h:'Teamrollen nach Belbin'},
 fig(520,175,
  box(4,10,166,28,['handlungsorientiert'],{k:'r',s:sm})+box(177,10,166,28,['kommunikationsorientiert'],{k:'g',s:sm})+box(350,10,166,28,['wissensorientiert'],{k:'b',s:sm})+
  [['Macher','Umsetzer','Perfektionist'],['Koordinator','Teamarbeiter','Weichensteller'],['Neuerer','Beobachter','Spezialist']].map((r,c)=>r.map((n,i)=>box(4+c*173,48+i*38,166,32,[n],{s:xs})).join('')).join('')+
  t(260,168,'Ein erfolgreiches Team deckt die Rollen ab und nutzt die Stärken',{s:xs,c:'acc'}),
  'Neun Teamrollen in drei Gruppen'),
 {h:'Eisenhower-Matrix'},
 fig(520,215,
  `<rect x="100" y="24" width="190" height="80" style="${mix('--bad',22)}"/><rect x="290" y="24" width="190" height="80" style="${mix('--warn',22)}"/><rect x="100" y="104" width="190" height="80" style="${mix('--ok',22)}"/><rect x="290" y="104" width="190" height="80" style="${mix('--ink',10)}"/>`+
  t(195,18,'dringend',{s:xs})+t(385,18,'nicht dringend',{s:xs})+t(94,68,'wichtig',{s:xs,a:'end'})+t(94,148,'unwichtig',{s:xs,a:'end'})+
  ls(195,58,['A: sofort selbst','erledigen'],{s:sm,lh:16})+ls(385,58,['B: terminieren','(Zeit blocken)'],{s:sm,lh:16})+ls(195,138,['C: delegieren'],{s:sm})+ls(385,138,['D: streichen'],{s:sm})+
  t(280,206,'Dringend ist nicht automatisch wichtig – erst nach Wichtigkeit, dann nach Dringlichkeit sortieren',{s:xs,c:'acc'}),
  'Aufgaben nach wichtig/dringend ordnen'),
 {p:'ALPEN-Methode: Aufgaben notieren, Länge schätzen, Pufferzeiten einplanen, Entscheidungen über Prioritäten treffen, Nachkontrolle. Dazu Pareto (80/20) und Zeitfresser-Analyse.'},
 {h:'Besprechung und Entscheidung'},
 {tab:[['Thema','Merkmale'],
  ['Besprechung wirksam leiten','Ziel und Agenda vorher klären, Teilnehmer auswählen, pünktlich beginnen und enden, Regeln und Redezeit, Ergebnisse visualisieren, Protokoll mit Maßnahme · Verantwortlicher · Termin, Nachverfolgung – nur treffen, wenn nötig'],
  ['Entscheidungsmethoden','Konsens, Mehrheitsentscheid, Entscheid der Führungskraft nach Beratung, Nutzwertanalyse (Kriterien gewichten), Paarvergleich, Punktabfrage, Entscheidungsmatrix'],
  ['Auswahl','nach Zeit, Tragweite, Akzeptanz: je wichtiger die Akzeptanz, desto mehr Beteiligung']]}]},

{t:'Konflikte und Verhandeln im Bild',b:[
 {h:'Eskalationsstufen nach Glasl'},
 fig(520,205,
  ['Verhärtung','Debatte','Taten statt Worte','Images, Koalitionen','Gesichtsverlust','Drohstrategien','begrenzte Schläge','Zersplitterung','gemeinsam in den Abgrund'].map((n,i)=>`<rect x="${6+i*44}" y="${6+i*19}" width="150" height="18" rx="3" style="${mix(i<3?'--ok':i<6?'--warn':'--bad',32)}"/>`+t(10+i*44,19+i*19,(i+1)+' '+n,{a:'start',s:'font-size:10px'})).join('')+
  ls(10,118,['Stufe 1–3: win-win möglich','→ Gespräch, Moderation'],{a:'start',s:xs,lh:14})+ls(10,150,['Stufe 4–6: win-lose','→ Mediation, Prozessbegleitung'],{a:'start',s:xs,lh:14})+ls(10,182,['Stufe 7–9: lose-lose','→ Machteingriff'],{a:'start',s:xs,lh:14}),
  'Neun Stufen, drei Phasen: je höher, desto eher braucht es Hilfe von außen'),
 {h:'Konfliktstrategien nach Thomas-Kilmann'},
 fig(520,215,
  ar(60,190,490,190)+ar(60,190,60,14)+
  `<rect x="66" y="22" width="210" height="82" style="${mix('--bad',20)}"/><rect x="276" y="22" width="210" height="82" style="${mix('--ok',26)}"/><rect x="66" y="104" width="210" height="82" style="${mix('--ink',10)}"/><rect x="276" y="104" width="210" height="82" style="${mix('--blue',20)}"/>`+
  ls(171,58,['Wettbewerben','(durchsetzen)'],{s:sm,lh:16})+ls(381,58,['Zusammenarbeiten','(win-win)'],{s:sm,lh:16})+ls(171,142,['Vermeiden','(ausweichen)'],{s:sm,lh:16})+ls(381,142,['Nachgeben','(anpassen)'],{s:sm,lh:16})+
  circ(276,104,34,'a')+t(276,108,'Kompromiss',{s:xs})+
  t(275,208,'Kooperation (Interesse des anderen)  →',{s:xs})+t(28,108,'Durchsetzung (eigenes Interesse)  →',{s:xs}).replace('x="28" y="108"','x="28" y="108" transform="rotate(-90 28 108)"'),
  'Fünf Strategien – dauerhaft tragfähig ist meist die Zusammenarbeit'),
 {h:'Mediation und Harvard-Konzept'},
 fig(520,150,
  ['Einführung','Sichtweisen','Interessen klären','Lösungen sammeln','Vereinbarung'].map((n,i)=>box(4+i*104,10,92,40,[n],{k:'g',s:xs})+(i<4?fa(96+i*104,30,108+i*104,30):'')).join('')+
  ls(260,76,['Neutraler Dritter ohne Entscheidungsbefugnis – Lösung erarbeiten die Beteiligten freiwillig','Schiedsspruch: Dritter legt verbindlich fest'],{s:xs,lh:15})+
  ls(260,122,['Harvard-Konzept: Mensch und Problem trennen · Interessen statt Positionen ·','Optionen zum beiderseitigen Vorteil · objektive Beurteilungskriterien'],{s:xs,c:'acc',lh:15}),
  'Mediationsphasen')]},

{t:'Motivation und Veränderung im Bild',b:[
 {h:'Erwartungstheorie (Vroom)'},
 fig(520,120,
  box(4,24,150,50,['Erwartung','Führt meine Anstrengung','zur Leistung?'],{k:'b',s:xs})+t(166,54,'×',{s:'font-size:18px'})+box(178,24,150,50,['Instrumentalität','Führt die Leistung','zum Ergebnis?'],{k:'g',s:xs})+t(340,54,'×',{s:'font-size:18px'})+box(352,24,164,50,['Valenz','Ist mir das Ergebnis wichtig?'],{k:'y',s:xs})+
  t(260,100,'Ist einer der Faktoren null, entfällt die Motivation',{s:xs,c:'acc'}),
  'Motivation = Erwartung · Instrumentalität · Valenz'),
 {h:'Equity-Theorie (Adams)'},
 fig(520,125,
  box(10,20,190,44,['eigener Ertrag','eigener Einsatz'],{k:'b',s:sm,lh:18})+t(260,48,'verglichen mit',{s:xs})+box(320,20,190,44,['Ertrag des anderen','Einsatz des anderen'],{k:'g',s:sm,lh:18})+
  ls(260,92,['Gefühlte Ungerechtigkeit → Ausgleich: Einsatz senken, Ertrag erhöhen, Vergleich ändern oder wechseln'],{s:xs})+
  t(260,114,'Führungskraft: transparente, faire Bewertung und Entlohnung',{s:xs,c:'acc'}),
  'Vergleich von Einsatz und Ertrag'),
 {p:'Stress und Burnout früh erkennen: Warnzeichen sind Leistungsabfall, Rückzug, Gereiztheit, häufige Fehlzeiten. Maßnahmen: Gespräch suchen, Arbeitslast und Prioritäten klären, Pausen sichern, Unterstützung anbieten, Beratung und Betriebsarzt einbinden, Ursachen in der Arbeitsorganisation beseitigen. Eine Diagnose stellt der Meister nicht.'},
 {h:'Veränderung nach Lewin und Kotter'},
 fig(520,225,
  box(4,10,164,52,['1. Auftauen','Bedarf verdeutlichen,','Bereitschaft schaffen'],{k:'b',s:xs})+fa(168,36,178,36)+box(180,10,164,52,['2. Verändern','neue Verhaltensweisen','einführen'],{k:'y',s:xs})+fa(344,36,354,36)+box(356,10,160,52,['3. Einfrieren','Neues verankern,','stabilisieren'],{k:'g',s:xs})+
  ['Dringlichkeit erzeugen','Führungskoalition bilden','Vision und Strategie','Vision kommunizieren','Hindernisse beseitigen','kurzfristige Erfolge','Erfolge ausbauen','in der Kultur verankern'].map((n,i)=>box(4+(i%4)*130,98+Math.floor(i/4)*52,124,42,[(i+1)+'. '+n],{k:i<4?'b':'a',s:xs})).join('')+
  t(260,86,'Kotter: acht Schritte',{s:xs,c:'acc'}),
  'Zwei Modelle für Veränderungsprozesse'),
 {p:'Widerstände ernst nehmen: Ursachen verstehen (Angst um den Arbeitsplatz, Gewohnheit, fehlende Information), frühzeitig und ehrlich informieren, Betroffene beteiligen, Nutzen verdeutlichen, Qualifizierung anbieten, kleine Erfolge sichtbar machen.'},
 {fx:{n:'Personalkennzahlen',tex:'FQ=\\frac{\\text{Abgänge (ohne Altersabgänge)}}{\\text{Ø Personalbestand}}\\cdot100\\quad KQ=\\frac{\\text{Krankheits-Fehltage}}{\\text{Soll-Arbeitstage}}\\cdot100',leg:[['FQ','Fluktuationsquote'],['KQ','Krankenquote (Soll-Arbeitstage = Tage · Mitarbeiter)']],e:'Beide sind Frühindikatoren für Betriebsklima und Führungsqualität; hohe Werte erfordern eine Ursachenanalyse.'}}]}
]);}
{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
const mix=(v,p=24)=>`fill:color-mix(in srgb,var(${v}) ${p}%,var(--paper));stroke:var(${v})`;
addTheory('PE',[
{t:'Duale Ausbildung: Vertrag, Ausbilder, AEVO',b:[
 {h:'Wer macht was in der dualen Ausbildung?'},
 fig(520,220,
  box(190,6,140,36,['Auszubildender'],{k:'a',s:sm})+
  box(6,80,150,52,['Ausbildungsbetrieb','Ausbildender + Ausbilder','praktische Ausbildung'],{k:'b',s:xs})+box(364,80,150,52,['Berufsschule','theoretische Ausbildung'],{k:'g',s:xs})+
  fa(110,80,200,42)+fa(410,80,320,42)+
  box(165,150,190,50,['IHK (zuständige Stelle)','Eintragung des Vertrags, Prüfungen,','Prüfungsausschuss'],{k:'y',s:xs,lh:14})+
  fa(81,132,175,170)+fa(439,132,345,170)+
  t(260,214,'Jugend- und Auszubildendenvertretung (JAV) vertritt die Auszubildenden gegenüber dem Betriebsrat',{s:'font-size:10px'}),
  'Duales System: zwei Lernorte, eine Prüfung'),
 {tab:[['Thema','Inhalt'],
  ['Ausbildungsvertrag (BBiG)','schriftlich; Art, Ziel, sachliche und zeitliche Gliederung, Beginn und Dauer, Ausbildungsstätte, tägliche Arbeitszeit, Probezeit (1 bis 4 Monate), Vergütung, Urlaub, Kündigungsvoraussetzungen, Hinweise auf Tarifverträge/Betriebsvereinbarungen; Eintragung bei der IHK'],
  ['Ausbilder','Eignung nach AEVO; plant nach Ausbildungsrahmenplan der Ausbildungsordnung, erstellt den betrieblichen Ausbildungsplan, vermittelt Fertigkeiten, kontrolliert das Berichtsheft, bereitet auf Prüfungen vor'],
  ['Prüfungen','Zwischen-/Teil-1-Prüfung und Abschlussprüfung vor dem IHK-Prüfungsausschuss (Arbeitgeber-, Arbeitnehmer-, Berufsschulvertreter)'],
  ['Pflichten Ausbildende','Ziel vermitteln, Ausbilder bestellen, Ausbildungsmittel kostenlos stellen, zu Berichtsheft und Berufsschulbesuch anhalten, nur ausbildungsgemäße Aufgaben, Zeugnis'],
  ['Pflichten Auszubildende','lernen, Weisungen befolgen, Betriebsordnung beachten, Berufsschule besuchen, Berichtsheft führen, Stillschweigen wahren']]},
 {h:'AEVO: vier Handlungsfelder'},
 fig(520,110,
  ['Ausbildungs-','voraussetzungen','prüfen, planen'].length&&[['Voraussetzungen','prüfen, planen'],['Ausbildung','vorbereiten'],['Ausbildung','durchführen'],['Ausbildung','abschließen']].map((l,i)=>box(4+i*130,14,122,52,l,{k:['b','g','y','a'][i],s:xs})+(i<3?fa(126+i*130,40,134+i*130,40):'')).join('')+
  t(260,92,'Der AEVO-Nachweis berechtigt zum Ausbilden und ist Teil der Meisterprüfung',{s:xs,c:'acc'}),
  'Die vier Handlungsfelder der Ausbilder-Eignungsverordnung')]},

{t:'Lernen und Unterweisen im Bild',b:[
 {h:'Vier-Stufen-Methode'},
 fig(520,175,
  ['1. Vorbereiten','2. Vormachen','3. Nachmachen','4. Üben'].map((n,i)=>`<rect x="${6+i*128}" y="${110-i*30}" width="124" height="${60+i*30}" rx="5" style="${mix(['--blue','--ok','--warn','--accent'][i],24)}"/>`+t(68+i*128,128-i*30,n,{s:sm})).join('')+
  ls(68,148,['motivieren, Ziel und','Vorwissen klären'],{s:xs,lh:13})+ls(196,118,['in kleinen Schritten','zeigen und erklären,','Schlüsselstellen betonen'],{s:xs,lh:13})+ls(324,88,['Lernende erklären','und üben selbst,','Fehler sofort korrigieren'],{s:xs,lh:13})+ls(452,58,['selbstständig anwenden,','Erfolgskontrolle,','Rückmeldung'],{s:xs,lh:13}),
  'Vier-Stufen-Methode: vom Vorbereiten bis zum selbstständigen Üben'),
 {h:'Lernkurve und Plateaus'},
 fig(520,185,
  ar(50,150,500,150)+ar(50,150,50,14)+
  path('M50,150 C90,60 140,50 190,50 C230,50 250,50 290,50 C320,50 330,35 360,30 C400,26 440,26 490,26','sk-l','stroke:var(--accent);stroke-width:2.8')+
  t(240,42,'Plateau',{s:xs})+t(300,100,'scheinbar kein Fortschritt – nicht aufgeben',{s:xs,a:'start'}).replace('x="300" y="100"','x="260" y="76"').replace('text-anchor="start"','text-anchor="start"')+
  t(275,172,'Übungszeit  →',{s:xs})+t(16,90,'Können',{s:xs}).replace('x="16" y="90"','x="16" y="95" transform="rotate(-90 16 95)"')+
  t(95,100,'anfangs schnell',{s:xs,a:'start'}),
  'Lernfortschritt: schnell zu Beginn, dann flacher mit Plateaus'),
 {p:'Der Meister plant Wiederholungen und Übungsphasen ein, gibt Rückmeldung und ermutigt über Plateaus hinweg. Lerntypen (sehen, hören, lesen, handeln) gelten als wissenschaftlich schwach; praktisch sinnvoll: mehrere Sinne ansprechen (zeigen, erklären, selbst machen lassen) und Wiederholung einbauen.'},
 {tab:[['Lernhindernis','Gegenmaßnahme'],
  ['mangelnde Motivation','klare Ziele und Nutzen'],['Über-/Unterforderung','passende Schrittgröße'],['Lärm, schlechte Umgebung','ruhige Umgebung'],['fehlendes Vorwissen','Hilfen, Wiederholung'],['Angst vor Fehlern','Fehlerkultur'],['Sprachbarrieren','einfache Sprache, Beteiligung der Lernenden']]},
 {h:'Lernziele: von grob nach fein'},
 fig(520,190,
  path('M260,14 L120,150 L400,150 Z','sk-l','fill:var(--soft);stroke:var(--ink)')+
  ln(190,82,330,82,'sk-c')+ln(155,116,365,116,'sk-c')+
  t(260,64,'Richtziel',{s:xs,c:'acc'})+t(260,104,'Grobziel',{s:xs,c:'acc'})+t(260,140,'Feinlernziel',{s:xs,c:'acc'})+
  ls(420,40,['allgemeine Kompetenz','(selbstständig','Maschinen warten)'],{s:xs,lh:13,a:'start'})+ls(420,92,['für einen Lernabschnitt'],{s:xs,a:'start'})+ls(420,128,['genau: Verhalten +','Bedingungen + Maßstab'],{s:xs,lh:13,a:'start'})+
  t(260,174,'Beispiel Feinziel: wechselt den Filter in 10 Minuten fehlerfrei nach Anleitung',{s:xs,c:'acc'}),
  'Richtziel → Grobziel → Feinlernziel'),
 {tab:[['Lernzielbereich','Inhalt','Verben (Beispiele)'],
  ['kognitiv','Wissen, Denken: kennen, verstehen, anwenden, analysieren, beurteilen','nennen, erklären, anwenden, bewerten'],
  ['affektiv','Einstellungen und Werte','akzeptieren, vertreten'],
  ['psychomotorisch','Fertigkeiten, Bewegungsabläufe','bedienen, montieren, einstellen']]},
 {h:'Methoden und Unterweisungsplan'},
 {tab:[['Methode','Merkmal'],
  ['Lehrvortrag','viel Stoff in kurzer Zeit, aber einseitig und wenig aktivierend'],
  ['Lehrgespräch','Fragen beziehen Lernende ein; Verständnis und Beteiligung; mehr Zeit nötig'],
  ['Leittextmethode','selbstständig mit Leitfragen: Informieren, Planen, Entscheiden, Ausführen, Kontrollieren, Bewerten'],
  ['Lernzirkel','Stationenlernen in Gruppen'],
  ['Planspiel','Simulation betrieblicher Entscheidungen'],
  ['Fallstudie','Analyse eines Falls, übt Problemlösung und Entscheidung'],
  ['Unterweisungsplan','Thema und Zielgruppe, Lernziele, Vorkenntnisse, Ablauf nach vier Stufen mit Zeiten, Methoden und Medien, Kontrollfragen, Dokumentation']]}]},

{t:'Kompetenz, Beurteilung und Potenzial im Bild',b:[
 {h:'Handlungskompetenz'},
 fig(520,185,
  circ(260,92,40,'a')+t(260,90,'Handlungs-',{s:xs})+t(260,104,'kompetenz',{s:xs})+
  box(190,6,140,36,['Fachkompetenz','Wissen und Können'],{k:'b',s:xs})+box(6,74,150,36,['Methodenkompetenz','Arbeitstechniken'],{k:'g',s:xs})+box(364,74,150,36,['Sozialkompetenz','Team, Kommunikation'],{k:'y',s:xs})+box(176,142,168,36,['Selbstkompetenz','Verantwortung, Zuverlässigkeit'],{k:'r',s:xs})+
  fa(260,42,260,52)+fa(156,92,220,92)+fa(364,92,300,92)+fa(260,142,260,132),
  'Vier Kompetenzen bilden zusammen die Handlungskompetenz'),
 {p:'E-Learning: zeit- und ortsunabhängig, wiederholbar, skalierbar – aber Selbstdisziplin nötig, ersetzt praktische Übung nicht. Blended Learning kombiniert Online-Phasen mit Präsenz, Übung am Arbeitsplatz und Betreuung.'},
 {h:'Neun-Felder-Portfolio: Leistung und Potenzial'},
 fig(520,230,
  Array.from({length:9},(_,k)=>{const c=k%3,r=Math.floor(k/3);const col=[['--warn','--ok','--ok'],['--bad','--warn','--ok'],['--bad','--bad','--warn']][r][c];return `<rect x="${120+c*120}" y="${18+r*58}" width="120" height="58" style="${mix(col,26)}"/>`}).join('')+
  t(180,12,'Leistung niedrig',{s:xs})+t(300,12,'mittel',{s:xs})+t(420,12,'hoch',{s:xs})+
  t(112,50,'hoch',{s:xs,a:'end'})+t(112,108,'mittel',{s:xs,a:'end'})+t(112,166,'niedrig',{s:xs,a:'end'})+t(40,100,'Potenzial',{s:xs}).replace('x="40" y="100"','x="26" y="100" transform="rotate(-90 26 100)"')+
  ls(180,42,['Ursachen','klären'],{s:xs,lh:14})+ls(420,42,['Stars /','Leistungsträger','fördern'],{s:xs,lh:14})+ls(420,158,['wichtige','Fachkräfte halten'],{s:xs,lh:14})+ls(180,158,['Maßnahmen oder','Trennung prüfen'],{s:xs,lh:14})+
  t(260,210,'Potenzial wird getrennt von der aktuellen Leistung betrachtet – daraus folgen Entwicklungsmaßnahmen',{s:xs,c:'acc'}),
  'Mitarbeiter nach Leistung und Potenzial einordnen'),
 {h:'Beurteilungsfehler und Beurteilungsgespräch'},
 {tab:[['Fehler','Wirkung'],
  ['Halo-/Hofeffekt','ein Merkmal überstrahlt alles'],['Tendenz zur Mitte','alle landen im Mittelfeld'],['Milde-/Strengefehler','zu gut oder zu schlecht'],['Recency-Effekt','letzte Ereignisse zählen mehr'],['Sympathie-/Ähnlichkeitsfehler','Ähnliche werden besser bewertet']]},
 {p:'Gegenmaßnahmen: klare Kriterien, Beobachtungsprotokolle, Schulung der Beurteiler, mehrere Beurteiler. Beurteilungsgespräch: vorbereiten (Beobachtungen, Kriterien), Rahmen schaffen, Selbsteinschätzung erfragen, Beurteilung mit Beispielen begründen, Stärken und Entwicklungsfelder besprechen, Ziele und Maßnahmen vereinbaren (Förderplan), schriftlich festhalten, nachverfolgen.'},
 {h:'Laufbahnen und Nachfolge'},
 fig(520,150,
  box(6,10,166,46,['Führungslaufbahn','Aufstieg in Leitungsfunktionen'],{k:'b',s:xs})+box(177,10,166,46,['Fachlaufbahn','Expertenstatus ohne Führung'],{k:'g',s:xs})+box(348,10,166,46,['Projektlaufbahn','wachsende Projektverantwortung'],{k:'y',s:xs})+
  ['Schlüsselposition','Anforderungsprofil','Potenzialträger','Entwicklung','Übergabe'].map((n,i)=>box(4+i*104,84,96,36,[n],{k:'a',s:xs})+(i<4?fa(100+i*104,102,108+i*104,102):'')).join('')+
  t(260,142,'Nachfolgeplanung verringert Risiken bei Ausscheiden, Ruhestand oder Krankheit',{s:xs,c:'acc'}),
  'Karrieremodelle und Nachfolgeplanung')]},

{t:'Weiterbildung, Controlling und Entwicklungsplan',b:[
 {h:'Wirkung messen: Kirkpatrick'},
 fig(520,205,
  [['4','Ergebnisse','Nutzen für das Unternehmen, z. B. weniger Ausschuss'],['3','Verhalten','Transfer in die Arbeit'],['2','Lernen','Wissenszuwachs'],['1','Reaktion','Zufriedenheit der Teilnehmer']].map(([n,a,b],i)=>`<rect x="${130-i*0}" y="${10+i*46}" width="${260+ (3-i)*0}" height="40" style="${mix(['--accent','--warn','--ok','--blue'][i],26)}"/>`+t(260,28+i*46,'Ebene '+n+': '+a,{s:sm})+t(260,42+i*46,b,{s:xs})).join('')+
  ar(100,190,100,14,'sk-f')+t(100,206,'wächst der Aufwand',{s:xs}),
  'Vier Ebenen des Bildungscontrollings'),
 {p:'Bildungscontrolling vergleicht Kosten und Nutzen und steuert die Auswahl der Maßnahmen. Lerntransfer sichern: Vorgesetzten einbinden, Anwendungsaufgaben direkt nach der Maßnahme, Zeit und Ressourcen für die Umsetzung, Nachgespräche, Mentoren, Erfolge sichtbar machen – ohne Transfer bleibt Weiterbildung wirkungslos.'},
 {h:'Entwicklungsplan aufbauen'},
 fig(520,125,
  ['Ist-Qualifikation','Ziel festlegen','Lücken bestimmen','Maßnahmen planen','überprüfen'].map((n,i)=>box(4+i*104,12,96,42,[n],{k:['b','b','y','g','a'][i],s:xs})+(i<4?fa(100+i*104,33,108+i*104,33):'')).join('')+
  ls(260,80,['Methode, Zeitrahmen, Kosten · Verantwortliche und Meilensteine · regelmäßig anpassen'],{s:xs})+t(260,104,'Mitarbeiter wird beteiligt und trägt Mitverantwortung',{s:xs,c:'acc'}),
  'Vom Ist zum Ziel'),
 {h:'Förderung und Freistellung'},
 {tab:[['Instrument','Inhalt'],
  ['Aufstiegs-BAföG','für Meister- und Fachwirtlehrgänge: Zuschuss und Darlehen'],
  ['Bildungsgutschein','Arbeitsagentur'],
  ['Qualifizierungschancengesetz','Förderung für Beschäftigte'],
  ['Bildungsurlaub','nach Landesrecht, meist 5 Tage im Jahr'],
  ['betriebliche Freistellung','Kostenübernahme, oft mit Rückzahlungsklauseln']]}]},

{t:'Personalplanung, Recruiting und Wissen im Bild',b:[
 {h:'Personalbedarf'},
 fig(520,135,
  box(4,14,130,46,['Arbeitsmenge · Zeit','je Einheit / Arbeitszeit','je Mitarbeiter'],{k:'b',s:xs})+t(146,40,'+',{s:sm})+box(158,14,110,46,['Ausfallzuschlag','Urlaub, Krankheit,','Schulung'],{k:'y',s:xs})+t(280,40,'=',{s:sm})+box(292,14,100,46,['Brutto-','personalbedarf'],{k:'g',s:xs})+fa(392,37,404,37)+
  box(404,14,112,46,['− vorhandene MA','+ Abgänge'],{k:'r',s:xs})+
  fa(260,60,260,76)+box(180,76,160,30,['Nettopersonalbedarf'],{k:'a',s:sm})+
  t(130,124,'positiv: einstellen / qualifizieren',{s:xs})+t(400,124,'negativ: Abbau / Umsetzung',{s:xs}),
  'Vom Brutto- zum Nettopersonalbedarf'),
 {tab:[['Planung','Frage'],['quantitativ','Wie viele Mitarbeiter?'],['qualitativ','Welche Qualifikation?'],['zeitlich','Wann und wie lange (Schichten, Arbeitszeit)?'],['örtlich','Wo werden sie eingesetzt?']]},
 {p:'Die Einzelpläne ergeben die Personaleinsatzplanung; sie ist mit Produktions- und Kapazitätsplanung abzustimmen.'},
 {h:'Einstellung und Einarbeitung'},
 fig(520,200,
  ['Bedarf klären','Anforderungs-profil','Ausschreibung','Unterlagen sichten','Interview (strukturiert)','Test / Probearbeit','Entscheidung','Vertrag'].map((n,i)=>box(4+(i%4)*130,10+Math.floor(i/4)*54,122,40,[n.replace('-profil','profil')],{k:i<7?'b':'g',s:xs})).join('')+
  box(80,122,360,30,['Betriebsrat informieren – Zustimmung nach § 99 BetrVG; Gleichbehandlung (AGG)'],{k:'y',s:xs})+
  ls(260,176,['Onboarding: Einarbeitungsplan mit Paten, Betriebsrundgang, Sicherheitsunterweisung vor Beginn,','steigender Schwierigkeitsgrad, Feedbackgespräche (Tage, Wochen, Probezeitende), Qualifizierungsplan'],{s:xs,lh:14}),
  'Auswahlprozess und Einarbeitung'),
 {h:'Wissensmanagement'},
 fig(520,205,
  `<polygon points="10,60 120,60 140,76 120,92 10,92" style="${mix('--blue',24)}"/>`+t(76,80,'explizites Wissen',{s:xs})+
  `<rect x="10" y="100" width="130" height="80" style="${mix('--warn',24)}"/>`+ls(75,134,['implizites Wissen','(Köpfe und Hände)','schwer zu dokumentieren'],{s:xs,lh:14})+
  ls(190,24,['Sichern und weitergeben:'],{s:sm,a:'start'})+
  ls(190,48,['Dokumentation (Arbeitsanweisungen, Wiki, Lessons Learned)','Mentoring und Tandems · Stellvertretungen · Rotation','Übergabegespräche · Erfahrungsaustausch, Communities','Storytelling · Videoaufnahmen von Handgriffen'],{s:xs,a:'start',lh:16})+
  t(190,130,'Wichtig: Zugänglichkeit, Aktualität, Kultur des Teilens',{s:xs,c:'acc',a:'start'})+t(190,150,'besonders vor dem Ausscheiden Älterer',{s:xs,a:'start'}),
  'Explizites und implizites Wissen sichern'),
 {h:'Lernende Organisation nach Senge'},
 fig(520,120,
  ['Personal Mastery','mentale Modelle','gemeinsame Vision','Teamlernen','Systemdenken'].map((n,i)=>box(4+i*104,14,100,44,[n],{k:['b','g','y','a','r'][i],s:xs})).join('')+
  t(260,90,'Fehler gelten als Lernchance – Wissen wird systematisch geteilt',{s:xs,c:'acc'}),
  'Fünf Disziplinen')]}
]);}
