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
