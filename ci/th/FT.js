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
