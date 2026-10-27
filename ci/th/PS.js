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
