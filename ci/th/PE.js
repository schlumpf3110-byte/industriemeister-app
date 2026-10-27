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
