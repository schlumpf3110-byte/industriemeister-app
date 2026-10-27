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
