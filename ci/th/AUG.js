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
