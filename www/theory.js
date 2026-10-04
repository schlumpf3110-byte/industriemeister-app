// Textband – Theorie je Qualifikationsschwerpunkt
// Bausteine: {p:'Absatz'} {ul:['…']} {ol:['…']} {tab:[[kopf…],[zeile…]]} {fx:['Formel','Erklärung']} {merke:'…'} {falle:'…'}
const THEORY = {
BT:[
 {t:'Instandhaltung nach DIN 31051',b:[
  {p:'Instandhaltung umfasst alle Maßnahmen zur Erhaltung und Wiederherstellung des funktionsfähigen Zustands. Der Abnutzungsvorrat einer Anlage wird durch Betrieb abgebaut; Instandhaltung baut ihn wieder auf.'},
  {tab:[['Grundmaßnahme','Inhalt','Beispiel'],['Wartung','Abbau des Abnutzungsvorrats verzögern','Schmieren, Reinigen, Nachstellen, Filter tauschen'],['Inspektion','Ist-Zustand feststellen und beurteilen','Messen, Prüfen, Sichtkontrolle, Schwingungsmessung'],['Instandsetzung','Wiederherstellen des Soll-Zustands','Lager tauschen, Dichtung erneuern'],['Verbesserung','Funktionssicherheit erhöhen ohne Funktion zu ändern','Schwachstelle konstruktiv beseitigen']]},
  {merke:'Wartung – Inspektion – Instandsetzung – Verbesserung: die vier Grundmaßnahmen werden in der Prüfung sehr oft abgefragt.'}]},
 {t:'Instandhaltungsstrategien',b:[
  {tab:[['Strategie','Auslöser','Vorteile','Nachteile'],['Ausfallbedingt (reaktiv)','Ausfall','Lebensdauer voll genutzt, kein Planungsaufwand','ungeplante Stillstände, Folgeschäden, hohe Ausfallkosten'],['Vorbeugend (periodisch)','Zeit/Laufstunden','planbar, weniger Ausfälle','Teile werden zu früh getauscht'],['Zustandsorientiert','Messwert/Zustand','Abnutzungsvorrat gut genutzt','Messtechnik, Know-how nötig'],['Vorausschauend (Predictive)','Prognose aus Sensordaten','höchste Verfügbarkeit, optimaler Zeitpunkt','hohe Investition, IT, Datensicherheit']]},
  {p:'Die Auswahl hängt ab von: Bedeutung der Anlage (Engpass?), Sicherheitsrelevanz, Ausfallkosten, Vorhersagbarkeit des Verschleißes, Kosten der Messtechnik.'},
  {p:'TPM (Total Productive Maintenance): Ziel null Ausfälle, null Fehler, null Unfälle. Säule „autonome Instandhaltung“: Bediener übernehmen Reinigen, Inspizieren, Schmieren und kleine Wartungen; Instandhaltung konzentriert sich auf Fachaufgaben.'}]},
 {t:'Kennzahlen der Instandhaltung',b:[
  {fx:['MTBF = Betriebszeit / Anzahl Ausfälle','mittlere Zeit zwischen Ausfällen – Maß für Zuverlässigkeit']},
  {fx:['MTTR = Summe Reparaturzeiten / Anzahl Ausfälle','mittlere Reparaturdauer – Maß für Instandhaltbarkeit']},
  {fx:['Verfügbarkeit = MTBF / (MTBF + MTTR) · 100 %','technische Verfügbarkeit']},
  {fx:['OEE = Verfügbarkeit · Leistungsgrad · Qualitätsrate','Gesamtanlageneffektivität, Weltklasse ≈ 85 %']}]},
 {t:'Schwachstellenanalyse',b:[
  {ol:['Störungen und Ausfälle erfassen (Maschinentagebuch, BDE/MDE, Instandhaltungsaufträge)','Auswerten: Häufigkeit, Dauer, Kosten (Pareto: 20 % der Ursachen = 80 % der Ausfälle)','Ursachen ermitteln (Ishikawa, 5-Why, Schadensbild)','Maßnahmen festlegen (konstruktiv, Werkstoff, Schmierung, Bedienung, Intervall)','Wirtschaftlichkeit prüfen, umsetzen, Wirksamkeit kontrollieren']},
  {merke:'Schwachstelle = Bauteil/Baugruppe, die häufiger als erwartet ausfällt und deren Beseitigung technisch möglich und wirtschaftlich vertretbar ist.'}]},
 {t:'Lasten- und Pflichtenheft',b:[
  {tab:[['','Lastenheft','Pflichtenheft'],['Ersteller','Auftraggeber (Kunde)','Auftragnehmer (Lieferant)'],['Frage','WAS und WOFÜR?','WIE und WOMIT?'],['Inhalt','Anforderungen, Rahmenbedingungen, Schnittstellen, Termine, Budget','technische Umsetzung, Komponenten, Abnahmekriterien, Dokumentation'],['Bedeutung','Grundlage für Angebote','Vertragsgrundlage, Basis der Abnahme']]}]},
 {t:'Energieversorgung und Druckluft',b:[
  {p:'Druckluft ist die teuerste Energieform im Betrieb (nur ca. 5–10 % der eingesetzten elektrischen Energie kommen als Nutzarbeit an).'},
  {ul:['Leckagen orten (Ultraschall) und beseitigen – oft 20–30 % Verlust','Netzdruck senken: 1 bar weniger spart ca. 6–8 % Energie','Wärmerückgewinnung (bis ca. 90 % der Antriebsenergie wird zu Wärme)','Drehzahlgeregelte Kompressoren, übergeordnete Steuerung','Abschalten außerhalb der Produktionszeit','Ansaugung kühler Außenluft']},
  {fx:['P = U · I (Gleichstrom),  P = √3 · U · I · cos φ (Drehstrom)','elektrische Leistung']},
  {fx:['η = P_ab / P_zu;  η_ges = η1 · η2 · η3 …','Wirkungsgrad, Wirkungsgradkette']}]},
 {t:'Hebe- und Fördermittel, Anschlagen',b:[
  {fx:['F_Strang = F_G / (n · cos β)','β = Neigungswinkel zur Senkrechten; bei 3- und 4-Strang nur 2 bzw. 3 Stränge tragend ansetzen']},
  {ul:['Neigungswinkel max. 60°','Tragfähigkeitsanhänger, Prüfplakette prüfen (jährliche Prüfung durch befähigte Person)','Kantenschutz, keine Knoten, nicht über Kanten ziehen','Probehub, Last unter dem Schwerpunkt anschlagen','Niemals unter schwebenden Lasten aufhalten','Kranführer: mind. 18 Jahre, geeignet, unterwiesen, schriftlich beauftragt']},
  {falle:'Winkel zur Waagerechten gegeben? Dann sin statt cos verwenden!'}]},
 {t:'Kühlschmierstoffe und Schmierung',b:[
  {p:'Aufgaben des KSS: Kühlen, Schmieren, Späne abführen, Korrosionsschutz.'},
  {tab:[['Verfahren','Merkmal','Einsatz'],['Nassbearbeitung (Emulsion)','große Menge im Kreislauf, gute Kühlung','Schleifen, Bohren, hohe Wärme'],['Minimalmengenschmierung','Aerosol, 5–50 ml/h, verbraucht sich','Aluminium, Sägen, trockene Späne'],['Trockenbearbeitung','kein KSS','Gusseisen, beschichtete HM-Werkzeuge']]},
  {p:'KSS-Überwachung (DGUV-R 109-003): Konzentration (Refraktometer), pH-Wert, Nitrit, Keimzahl, Fremdöl; Hautschutzplan, Absaugung, Betriebsanweisung.'}]}
],
FT:[
 {t:'Fertigungsverfahren nach DIN 8580',b:[
  {tab:[['Hauptgruppe','Prinzip','Beispiele'],['1 Urformen','Zusammenhalt schaffen','Gießen, Sintern, additiv'],['2 Umformen','Zusammenhalt beibehalten','Biegen, Tiefziehen, Schmieden'],['3 Trennen','Zusammenhalt vermindern','Drehen, Fräsen, Schneiden, Sägen'],['4 Fügen','Zusammenhalt vermehren (Teile)','Schweißen, Schrauben, Kleben'],['5 Beschichten','Zusammenhalt vermehren (Schicht)','Lackieren, Verzinken, PVD'],['6 Stoffeigenschaft ändern','Werkstoffeigenschaften','Härten, Glühen, Nitrieren']]}]},
 {t:'Zerspanung: Formeln',b:[
  {fx:['n = vc · 1000 / (π · d)','Drehzahl in 1/min (vc in m/min, d in mm)']},
  {fx:['vf = f · n  bzw.  vf = fz · z · n','Vorschubgeschwindigkeit in mm/min']},
  {fx:['th = L · i / (n · f)  mit L = l + la + lu','Hauptnutzungszeit Drehen; Fräsen: th = L · i / vf']},
  {fx:['Fc = kc · A · C;  A = ap · f bzw. b · h','Schnittkraft; kc = kc1.1 / h^mc']},
  {fx:['Pc = Fc · vc;  P1 = Pc / η','Schnittleistung (vc in m/s!) und Antriebsleistung']},
  {fx:['Rth = f² / (8 · r)','theoretische Rautiefe beim Drehen']},
  {falle:'vc in m/min für die Drehzahl, aber in m/s für die Leistung. Anzahl der Schnitte immer aufrunden.'}]},
 {t:'Schneidstoffe',b:[
  {tab:[['Schneidstoff','Eigenschaften','Einsatz'],['HSS','zäh, bis ca. 600 °C, nachschleifbar','Bohrer, Gewindebohrer, Formwerkzeuge'],['Hartmetall (HM)','hart, warmfest bis ca. 1000 °C, vc 3–5× HSS','Standard für Drehen/Fräsen, Wendeplatten'],['Cermet','hohe Verschleißfestigkeit, gute Oberflächen','Schlichten von Stahl'],['Schneidkeramik','sehr warmfest, spröde','Guss, gehärtete Stähle, hohe vc'],['CBN / PKD','extrem hart','CBN: gehärteter Stahl; PKD: Aluminium, NE-Metalle']]}]},
 {t:'Schweißverfahren (Kennzahlen nach ISO 4063)',b:[
  {tab:[['Nr.','Verfahren','Schutz','Merkmal'],['111','Lichtbogenhandschweißen (E-Hand)','Umhüllung/Schlacke','baustellentauglich, alle Lagen'],['121','Unterpulverschweißen (UP)','Pulver + Schlacke','verdeckter Lichtbogen, hohe Abschmelzleistung, nur Wanne/Horizontal'],['131/135','MIG/MAG (Massivdraht)','inertes/aktives Schutzgas','wirtschaftlich, mechanisierbar'],['136','MAG mit Fülldraht','aktives Gas + Füllung','hohe Leistung, Zwangslagen'],['141','WIG','Argon','hohe Qualität, dünne Bleche, Edelstahl, Alu'],['21/22','Punkt-/Rollennahtschweißen','–','Widerstandsschweißen von Blechen']]},
  {p:'Schweißnahtsinnbilder nach ISO 2553: Pfeillinie, Bezugslinie, Kehlnaht als Dreieck mit Nahtdicke a, Stumpfnähte als I/V/Y-Symbol; Angaben links Maß der Naht, rechts Länge.'}]},
 {t:'Wärmebehandlung und Oberflächen',b:[
  {tab:[['Verfahren','Ziel'],['Normalglühen','gleichmäßiges, feines Gefüge'],['Weichglühen','bessere Zerspanbarkeit/Umformbarkeit'],['Spannungsarmglühen','Eigenspannungen abbauen (nach Schweißen)'],['Härten + Anlassen (Vergüten)','hohe Festigkeit bei guter Zähigkeit'],['Einsatzhärten','harte Randschicht, zäher Kern'],['Nitrieren','harte, verschleißfeste Randschicht, verzugsarm']]},
  {p:'Korrosionsschutz: Phosphatieren (Haftgrund), Lackieren, Pulverbeschichten, Feuerverzinken, galvanisch Verzinken/Verchromen, Brünieren, Eloxieren (Aluminium).'}]},
 {t:'CNC-Technik',b:[
  {ul:['Achsen nach Rechte-Hand-Regel: Z = Spindelachse, X, Y; Drehachsen A, B, C um X, Y, Z','Bezugspunkte: Maschinennullpunkt M, Werkstücknullpunkt W, Referenzpunkt R, Werkzeugträgerbezugspunkt','Wegbedingungen: G0 Eilgang, G1 Gerade, G2/G3 Kreis im/gegen Uhrzeigersinn, G90 absolut, G91 inkremental','CAD/CAM: Programm aus 3D-Modell, Simulation, Kollisionsprüfung, DNC-Übertragung']}]},
 {t:'Additive Fertigung',b:[
  {tab:[['Merkmal','additiv','subtraktiv'],['Prinzip','schichtweiser Aufbau','Abtrag vom Rohteil'],['Geometrie','nahezu frei, innere Kanäle','begrenzt durch Werkzeugzugang'],['Material','kaum Abfall','viel Span'],['Stückzahl','Einzelteile, Prototypen','Serie'],['Nacharbeit','Stützen entfernen, Oberfläche bearbeiten','oft fertig']]}]},
 {t:'Industrieroboter',b:[
  {tab:[['Bauart','Achsen','Einsatz'],['Portal (kartesisch)','3 Linearachsen','großer Arbeitsraum, Palettieren, schwere Lasten'],['Knickarm (Vertikal)','6 Drehachsen','universell: Schweißen, Handling, Lackieren'],['SCARA','2 Dreh + 1 Linear horizontal','schnelle Montage, Pick & Place'],['Delta/Parallel','parallele Arme','sehr schnelles Sortieren leichter Teile']]},
  {p:'Sicherheit: Schutzzaun mit verriegelten Türen, Lichtvorhang/Laserscanner, Not-Halt, reduzierte Geschwindigkeit im Einrichtbetrieb mit Zustimmtaster; Cobots ohne Zaun durch Kraft- und Leistungsbegrenzung (ISO/TS 15066).'}]}
],
MT:[
 {t:'Montageorganisation',b:[
  {tab:[['Form','Merkmal','geeignet für'],['Baustellenmontage','Produkt steht, Personal kommt','Einzelfertigung, Großanlagen'],['Gruppen-/Inselmontage','Team montiert Baugruppen komplett','mittlere Stückzahlen, Varianten'],['Reihenmontage','Stationen nach Ablauf, ohne festen Takt','Serien'],['Fließmontage','getaktet, Fördertechnik','Großserie, Massenfertigung']]},
  {p:'Montageprinzipien: Stationär oder fließend; manuell, teilautomatisiert, vollautomatisch. Vormontage von Baugruppen entlastet die Endmontage.'}]},
 {t:'Montageplan und Montageplanung',b:[
  {ol:['Erzeugnisgliederung analysieren (Stückliste, Baugruppen)','Montagereihenfolge festlegen (Montagevorranggraph)','Arbeitsschritte beschreiben: Teile, Menge, Werkzeuge, Hilfsstoffe, Anzugsmomente','Prüfschritte und Prüfmittel festlegen','Vorgabezeiten ermitteln','Arbeitsplatz und Materialbereitstellung gestalten']},
  {merke:'Ein Montageplan enthält je Schritt: Nr., Tätigkeit, Bauteile/Pos.-Nr., Werkzeug/Hilfsmittel, Prüfung, Zeit, Sicherheitshinweise.'}]},
 {t:'Fügeverfahren in der Montage',b:[
  {ul:['Kraftschlüssig: Schrauben, Klemmen, Pressverbände (Reibung)','Formschlüssig: Passfedern, Stifte, Profilwellen','Stoffschlüssig: Schweißen, Löten, Kleben','Schraubenanzug: drehmomentgesteuert, drehwinkelgesteuert, streckgrenzgesteuert']}]},
 {t:'Ergonomie und Bewegungsgestaltung',b:[
  {ul:['Bewegungsvereinfachung: Greifen und Fügen erleichtern (Fasen, Greifschalen)','Bewegungsverdichtung: beidhändig arbeiten, Teile im Greifraum, Fallschächte','Teilmechanisierung: Hebehilfen, Schrauber, Vorrichtungen','Greifraum, Arbeitshöhe, Sehabstand, Beleuchtung nach anthropometrischen Daten']}]},
 {t:'FMEA',b:[
  {ol:['Planung und Vorbereitung','Strukturanalyse','Funktionsanalyse','Fehleranalyse (Folge – Art – Ursache)','Risikoanalyse: B, A, E bewerten','Optimierung: Maßnahmen, Verantwortliche, Termine','Ergebnisdokumentation']},
  {fx:['RPZ = B · A · E (1…1000)','klassisch; heute Aufgabenpriorität AP hoch/mittel/niedrig nach AIAG/VDA']},
  {merke:'B (Bedeutung) lässt sich nur durch Konstruktionsänderung senken. A durch Vermeidungsmaßnahmen, E durch bessere Prüfung.'}]},
 {t:'Inbetriebnahme und Abnahme',b:[
  {ul:['Vorabnahme beim Hersteller (FAT), Endabnahme beim Kunden (SAT)','Prüfung von Funktion, Leistung (Taktzeit, Ausbringung), Qualität (Maschinenfähigkeit Cmk)','Sicherheit: CE-Kennzeichnung, Konformitätserklärung, Betriebsanleitung, Gefährdungsbeurteilung','Abnahmeprotokoll mit Mängelliste und Fristen; mit Abnahme beginnt die Gewährleistung, Gefahrübergang']}]}
],
KW:[
 {t:'Kostenbegriffe',b:[
  {tab:[['Begriff','Bedeutung'],['Einzelkosten','direkt einem Produkt zurechenbar (Fertigungsmaterial, Fertigungslohn, Sondereinzelkosten)'],['Gemeinkosten','nur über Schlüssel zurechenbar (Miete, Strom, Gehälter)'],['Fixkosten','unabhängig von der Beschäftigung'],['variable Kosten','ändern sich mit der Beschäftigung'],['Kalkulatorische Kosten','Abschreibung, Zinsen, Wagnisse, Unternehmerlohn, Miete']]},
  {p:'Kostenrechnung: Kostenartenrechnung (welche Kosten?) → Kostenstellenrechnung (wo?) mit dem BAB → Kostenträgerrechnung (wofür?).'}]},
 {t:'Zuschlagskalkulation',b:[
  {tab:[['Schema',''],['Fertigungsmaterial','Einzelkosten'],['+ Materialgemeinkosten','% vom Fertigungsmaterial'],['= Materialkosten',''],['Fertigungslöhne',''],['+ Fertigungsgemeinkosten / Restgemeinkosten','% von den Löhnen'],['+ Maschinenkosten','Stunden · Maschinenstundensatz'],['+ Sondereinzelkosten der Fertigung',''],['= Fertigungskosten',''],['Herstellkosten = MK + FK',''],['+ Verwaltungs- und Vertriebsgemeinkosten','% von den Herstellkosten'],['= Selbstkosten',''],['+ Gewinn','% von den Selbstkosten'],['= Barverkaufspreis',''],['+ Skonto (im Hundert)','BVP / (1 − s)'],['= Zielverkaufspreis',''],['+ Rabatt (im Hundert)','ZVP / (1 − r)'],['= Listenverkaufspreis','']]},
  {falle:'Skonto und Rabatt werden auf den Zielpreis bzw. Listenpreis bezogen – also durch (1 − Satz) teilen!'}]},
 {t:'Betriebsabrechnungsbogen (BAB)',b:[
  {ol:['Gemeinkosten auf Kostenstellen verteilen (Schlüssel: m², kWh, Köpfe)','Allgemeine Kostenstellen und Hilfskostenstellen umlegen (innerbetriebliche Leistungsverrechnung)','Zuschlagssätze bilden: Ist-Gemeinkosten / Zuschlagsgrundlage · 100','Normalgemeinkosten = Normalzuschlagssatz · Ist-Grundlage','Über-/Unterdeckung = Normal − Ist']},
  {tab:[['Kostenstelle','Zuschlagsgrundlage'],['Material','Fertigungsmaterial'],['Fertigung','Fertigungslöhne (oder Maschinenstunden)'],['Verwaltung, Vertrieb','Herstellkosten des Umsatzes']]},
  {fx:['HK d. U. = HK d. Erzeugung + Bestandsminderung − Bestandsmehrung','Herstellkosten des Umsatzes']},
  {fx:['Betriebsergebnis = Umsatzerlöse − Ist-Selbstkosten; Umsatzergebnis = Erlöse − Normal-Selbstkosten','Umsatzergebnis − Verrechnungsergebnis = Betriebsergebnis']}]},
 {t:'Maschinenstundensatz',b:[
  {ul:['kalk. Abschreibung = Wiederbeschaffungswert / Nutzungsdauer','kalk. Zinsen = (AW / 2) · Zinssatz','Raumkosten = m² · Miete/m² · 12','Energiekosten = kW · Laufzeit · Preis/kWh','Instandhaltung = % vom AW']},
  {fx:['MSS = Maschinenkosten pro Jahr / Laufzeit pro Jahr','Restgemeinkosten werden weiterhin über einen Zuschlag auf die Löhne verrechnet']}]},
 {t:'Deckungsbeitragsrechnung',b:[
  {fx:['db = p − kv;  DB = db · x;  Ergebnis = DB − Kf','Stück- und Gesamtdeckungsbeitrag']},
  {fx:['Break-even x = Kf / db','Gewinnschwelle (aufrunden)']},
  {ul:['Kurzfristige Preisuntergrenze = kv (bei freier Kapazität)','Langfristige Preisuntergrenze = Selbstkosten','Engpass: Reihenfolge nach relativem DB = db / Engpasszeit','Eigenfertigung oder Fremdbezug: variable Kosten vs. Bezugspreis']}]},
 {t:'Plankostenrechnung',b:[
  {fx:['Sollkosten = Kf + kv · Ist-Beschäftigung','flexible Plankostenrechnung']},
  {fx:['verrechnete Plankosten = Plankostenverrechnungssatz · Ist-Beschäftigung','']},
  {fx:['Verbrauchsabweichung = Istkosten − Sollkosten','verantwortet der Kostenstellenleiter (Meister)']},
  {fx:['Beschäftigungsabweichung = Sollkosten − verrechnete Plankosten','Folge der Auslastung (Leerkosten)']}]},
 {t:'Prozesskostenrechnung',b:[
  {p:'Gemeinkosten indirekter Bereiche (Einkauf, Logistik, AV) werden über Prozesse und Kostentreiber verursachungsgerecht verrechnet.'},
  {ul:['lmi-Prozesse: abhängig von der Menge des Kostentreibers (Bestellungen, Rüstvorgänge)','lmn-Prozesse: mengenunabhängig (Abteilung leiten) → Umlage auf lmi','Prozesskostensatz = Prozesskosten / Prozessmenge','Gesamtprozesskostensatz = lmi-Satz + Umlagesatz lmn']},
  {merke:'Effekte: Allokationseffekt (Kleinaufträge werden teurer), Degressionseffekt (Großaufträge günstiger), Komplexitätseffekt (Varianten werden teurer).'}]},
 {t:'Investitionsrechnung (statisch)',b:[
  {fx:['A = (AK − RW) / n;  Z = (AK + RW) / 2 · i','kalk. Abschreibung und Zinsen']},
  {fx:['x_krit = (Kf1 − Kf2) / (kv2 − kv1)','kritische Menge beim Kostenvergleich']},
  {fx:['R = (Gewinn + Zinsen) / Ø Kapital · 100 %','Rentabilität']},
  {fx:['t = AK / (Gewinn + Abschreibung)','Amortisationsdauer (Durchschnittsmethode)']},
  {p:'Nichtmonetäre Kriterien (Ergonomie, Sicherheit, Flexibilität) werden mit der Nutzwertanalyse bewertet: Kriterien gewichten, Erfüllungsgrad bewerten, Nutzwerte summieren.'}]}
],
PS:[
 {t:'Zeitwirtschaft nach REFA',b:[
  {fx:['T = tr + ta;  ta = m · te','Auftragszeit']},
  {fx:['te = tg + ter + tv','Zeit je Einheit: Grundzeit, Erholungszeit, Verteilzeit']},
  {fx:['Zeitgrad = Vorgabezeit / Istzeit · 100 %','Leistungsgrad: beobachtete zu Bezugsleistung']},
  {p:'Zeitermittlung: Zeitaufnahme (Stoppuhr), MTM (Systeme vorbestimmter Zeiten), Multimomentaufnahme, Schätzen/Vergleichen, Planzeiten.'}]},
 {t:'Durchlaufzeit und Terminplanung',b:[
  {fx:['DLZ = Rüstzeit + Bearbeitungszeit + Transportzeit + Liegezeit','Übergangszeiten machen oft > 80 % aus']},
  {ul:['Vorwärtsterminierung: ab Starttermin, ergibt frühesten Endtermin','Rückwärtsterminierung: ab Liefertermin, ergibt spätesten Starttermin','Netzplan (Vorgangsknoten): FAZ, FEZ, SAZ, SEZ; Puffer = SAZ − FAZ; kritischer Weg = Puffer 0','Belegungsplan/Gantt: Maschinenbelegung, Liegezeiten sichtbar','Verkürzen: überlappende Fertigung, Splitten, Losgrößen senken, Rüstzeit senken (SMED)']}]},
 {t:'Materialwirtschaft',b:[
  {fx:['Meldebestand = Tagesverbrauch · Wiederbeschaffungszeit + Sicherheitsbestand','']},
  {fx:['Ø Bestand = (AB + 12 Monatsendbestände) / 13  bzw. (AB + EB) / 2','']},
  {fx:['Umschlagshäufigkeit = Verbrauch / Ø Bestand;  Lagerdauer = 360 / UH','']},
  {fx:['optimale Bestellmenge (Andler) = √(200 · Jahresbedarf · Bestellkosten / (Einstandspreis · Lagerhaltungskostensatz))','']},
  {ul:['ABC-Analyse: Wertanteil (A: wenige Teile, hoher Wert)','XYZ-Analyse: Verbrauchsschwankung','Kanban, Just-in-time, Just-in-sequence, Konsignationslager']}]},
 {t:'Lean Production',b:[
  {ul:['7 Verschwendungen: Überproduktion, Bestände, Transport, Warten, Überbearbeitung, Bewegung, Fehler (+ ungenutzte Potenziale)','5S: Sortieren, Systematisieren, Sauberkeit, Standardisieren, Selbstdisziplin','Wertstromanalyse, Pull-Prinzip, One-Piece-Flow, Kaizen, Poka-Yoke, Shopfloor-Management','SMED: internes Rüsten in externes umwandeln']}]},
 {t:'Informations- und Kommunikationssysteme',b:[
  {tab:[['Ebene der Automatisierungspyramide','System'],['Unternehmensebene','ERP (Aufträge, Material, Finanzen)'],['Betriebsleitebene','MES (Feinplanung, BDE/MDE, Kennzahlen)'],['Prozessleitebene','SCADA, Leitstand'],['Steuerungsebene','SPS, CNC'],['Feldebene','Sensoren, Aktoren']]},
  {p:'PPS-Aufgaben: Produktionsprogrammplanung, Mengenplanung (Stücklistenauflösung), Termin- und Kapazitätsplanung, Auftragsfreigabe, Fertigungssteuerung, Rückmeldung.'},
  {p:'Industrie 4.0: vernetzte Maschinen (IoT), digitaler Zwilling, Condition Monitoring, papierlose Fertigung. Risiken: Datensicherheit, Abhängigkeit von IT, Qualifizierungsbedarf.'}]},
 {t:'Personalbedarfsrechnung',b:[
  {fx:['Personalbedarf = Arbeitszeitbedarf / (verfügbare Zeit je MA · Anwesenheitsfaktor)','Anwesenheit = Gesundheitsquote − Urlaubsquote']},
  {merke:'Personalbedarf immer aufrunden. Bei fehlenden Mitarbeitern: Mehrarbeit, Leiharbeit, Umsetzung, Fremdvergabe, Zeitgrad erhöhen.'}]}
],
AUG:[
 {t:'Rechtsgrundlagen und Verantwortung',b:[
  {ul:['Arbeitsschutzgesetz (ArbSchG): Gefährdungsbeurteilung (§ 5), Unterweisung (§ 12), Pflichten des Arbeitgebers','Arbeitssicherheitsgesetz (ASiG): Betriebsarzt und Fachkraft für Arbeitssicherheit (beratend)','Betriebssicherheitsverordnung (BetrSichV): Arbeitsmittel, Prüfungen','Gefahrstoffverordnung (GefStoffV): Gefahrstoffe, Betriebsanweisung (§ 14)','Arbeitsstättenverordnung (ArbStättV), Jugendarbeitsschutzgesetz (JArbSchG), Mutterschutzgesetz','DGUV-Vorschriften der Berufsgenossenschaft']},
  {p:'Der Unternehmer kann Pflichten schriftlich auf den Meister übertragen (§ 13 ArbSchG, DGUV V1 § 13). Der Meister ist dann verantwortlich für Organisation, Auswahl, Anweisung und Kontrolle in seinem Bereich. Sicherheitsbeauftragte unterstützen ehrenamtlich, haben aber keine Verantwortung.'}]},
 {t:'Gefährdungsbeurteilung',b:[
  {ol:['Arbeitsbereiche und Tätigkeiten festlegen','Gefährdungen ermitteln (mechanisch, elektrisch, Gefahrstoffe, Lärm, Ergonomie, psychisch …)','Gefährdungen beurteilen (Risiko = Wahrscheinlichkeit × Schwere, z. B. Nohl-Matrix)','Maßnahmen festlegen nach STOP','Maßnahmen umsetzen','Wirksamkeit überprüfen','Dokumentieren und fortschreiben']},
  {p:'STOP-Prinzip (verbindliche Rangfolge): Substitution → Technische Maßnahmen → Organisatorische Maßnahmen → Persönliche Schutzausrüstung.'}]},
 {t:'Unterweisung',b:[
  {ul:['vor Aufnahme der Tätigkeit, bei Veränderungen, mindestens jährlich; Jugendliche halbjährlich','arbeitsplatz- und tätigkeitsbezogen, verständlich (Sprache!)','Inhalt aus Gefährdungsbeurteilung und Betriebsanweisungen','Dokumentation mit Unterschrift, Verständniskontrolle','digitale Unterweisung möglich, wenn Rückfragen möglich sind und Verständnis geprüft wird']}]},
 {t:'Arbeitsunfall',b:[
  {ol:['Erste Hilfe, Rettungskette, Unfallstelle sichern','Durchgangsarzt bei Arbeitsunfähigkeit über den Unfalltag hinaus','Eintrag ins Verbandbuch (Aufbewahrung 5 Jahre)','Unfallanzeige an die BG, wenn mehr als 3 Kalendertage arbeitsunfähig – innerhalb von 3 Tagen; Betriebsrat unterschreibt mit','Ursachen analysieren, Gefährdungsbeurteilung anpassen, erneut unterweisen']}]},
 {t:'Gefahrstoffe',b:[
  {ul:['Kennzeichnung nach CLP/GHS: Piktogramme, Signalwort, H-Sätze (Gefahren), P-Sätze (Sicherheitshinweise)','Sicherheitsdatenblatt: 16 Abschnitte, vom Hersteller','Betriebsanweisung: vom Arbeitgeber, arbeitsplatzbezogen; Aufbau: Anwendungsbereich, Gefahren, Schutzmaßnahmen, Verhalten im Gefahrfall, Erste Hilfe, Entsorgung','Gefahrstoffverzeichnis führen, Substitutionsprüfung']}]},
 {t:'Umweltschutz und Abfall',b:[
  {ul:['Kreislaufwirtschaftsgesetz: Vermeiden → Wiederverwenden → Recycling → sonstige Verwertung → Beseitigen','Abfallschlüssel (AVV) mit * = gefährlicher Abfall → Nachweisverfahren (eANV, Begleitschein)','Wasserhaushaltsgesetz: Auffangwannen für wassergefährdende Stoffe','Immissionsschutz: Lärm, Staub, Emissionen','Umweltmanagement ISO 14001, EMAS']}]},
 {t:'Jugendarbeitsschutz',b:[
  {ul:['max. 8 h/Tag, 40 h/Woche, 5-Tage-Woche','keine gefährlichen Arbeiten (§ 22), außer zur Ausbildung unter Aufsicht','Erstuntersuchung vor Beginn, Nachuntersuchung nach 1 Jahr','Unterweisung vor Beschäftigung und mindestens halbjährlich','Pausen: 30 min bei 4,5–6 h, 60 min über 6 h']}]}
],
PF:[
 {t:'Führungsstile und Führungsmodelle',b:[
  {tab:[['Modell','Kern'],['Autoritär – kooperativ – Laissez-faire','Grad der Mitarbeiterbeteiligung'],['Situatives Führen (Hersey/Blanchard)','Stil nach Reifegrad: unterweisen, verkaufen, partizipieren, delegieren'],['Management by Objectives','Führen durch Zielvereinbarung'],['Management by Delegation','Aufgaben mit Kompetenz und Verantwortung übertragen'],['Agiles Führen','Selbstorganisation, Coach-Rolle, kurze Feedbackzyklen']]}]},
 {t:'Motivation',b:[
  {ul:['Maslow: Bedürfnispyramide – physiologische, Sicherheit, soziale, Wertschätzung, Selbstverwirklichung','Herzberg: Hygienefaktoren (Lohn, Arbeitsbedingungen – verhindern Unzufriedenheit) und Motivatoren (Anerkennung, Verantwortung, Aufgabe – erzeugen Zufriedenheit)','Leistung = Können (Fähigkeit) × Wollen (Bereitschaft) × Dürfen (Möglichkeit)','Arbeitsstrukturierung: Job Rotation, Job Enlargement, Job Enrichment, teilautonome Gruppen']}]},
 {t:'Delegation',b:[
  {ol:['Aufgabe und Ziel erklären','Kompetenzen und Verantwortung festlegen (Handlungsverantwortung geht über, Führungsverantwortung bleibt)','Termine und Zwischenziele vereinbaren','Mittel und Informationen klären','Kontrolle und Rückmeldung vereinbaren']},
  {merke:'Nicht delegierbar: Führungsaufgaben wie Mitarbeiterbeurteilung, Personalgespräche, disziplinarische Maßnahmen, Zielsetzung, Gesamtverantwortung.'}]},
 {t:'Mitarbeitergespräche',b:[
  {ul:['Phasen: Vorbereitung – Eröffnung – Sachverhalt – Stellungnahme – Lösung/Vereinbarung – Abschluss – Nachbereitung','Kritikgespräch: zeitnah, unter vier Augen, Verhalten statt Person, Ich-Botschaften, Vereinbarung dokumentieren','Anerkennungsgespräch: konkret, zeitnah, ehrlich','Kommunikation: aktives Zuhören, Vier-Seiten-Modell (Schulz von Thun): Sachinhalt, Selbstoffenbarung, Beziehung, Appell']}]},
 {t:'Gruppen und Konflikte',b:[
  {ul:['Gruppenphasen (Tuckman): Forming, Storming, Norming, Performing, Adjourning','Formelle und informelle Gruppen, Rollen, Gruppennormen','Konfliktarten: Sach-, Beziehungs-, Verteilungs-, Ziel-, Rollenkonflikt','Konfliktlösung: Ursachen klären, Einzel- und gemeinsame Gespräche, Moderation, Win-win-Lösung, Vereinbarung, Kontrolle; Eskalationsstufen nach Glasl']}]},
 {t:'KVP und Vorschlagswesen',b:[
  {ul:['KVP: kleine, ständige Verbesserungen durch alle Mitarbeiter (Kaizen), PDCA-Zyklus','BVW: freiwillige Verbesserungsvorschläge außerhalb der Arbeitsaufgabe, Prämie nach Betriebsvereinbarung','Ablehnung von Vorschlägen: Dank, Würdigung, sachliche Begründung, Ermutigung','Mitbestimmung des Betriebsrats (§ 87 BetrVG)']}]},
 {t:'Arbeits- und Betriebsverfassungsrecht für Meister',b:[
  {ul:['Abmahnung: Rüge, konkrete Pflichtverletzung, Androhung von Konsequenzen; Voraussetzung für verhaltensbedingte Kündigung','Betriebsrat: Mitbestimmung bei Arbeitszeit, Überstunden, Urlaubsplan, Entlohnung, technischer Überwachung, Arbeitsschutz (§ 87); Anhörung bei Kündigung (§ 102)','Mehrarbeit nur im Rahmen von Arbeitszeitgesetz (max. 10 h/Tag) und Mitbestimmung']}]}
],
PE:[
 {t:'Personalentwicklung – Ablauf',b:[
  {ol:['Bedarf ermitteln: Soll-Anforderungsprofil vs. Ist-Qualifikation (Qualifikationsmatrix)','Ziele festlegen','Maßnahmen planen und auswählen','Durchführen','Transfer sichern (Transfergespräch)','Erfolg kontrollieren (Zufriedenheit, Lernerfolg, Verhalten am Arbeitsplatz, Unternehmenserfolg)']}]},
 {t:'Methoden der Personalentwicklung',b:[
  {tab:[['Form','Beispiele'],['into the job','Ausbildung, Einarbeitung, Traineeprogramm'],['on the job','Unterweisung am Arbeitsplatz, Job Rotation, Job Enrichment, Projektarbeit, Stellvertretung'],['near the job','Qualitätszirkel, Lernstatt, KVP-Gruppen'],['off the job','Seminare, Lehrgänge, E-Learning'],['along the job','Laufbahnplanung, Mentoring, Coaching']]}]},
 {t:'Potenzialeinschätzung und Beurteilung',b:[
  {ul:['Quellen: Leistungsbeurteilung, Mitarbeitergespräch, Selbsteinschätzung, Assessment-Center, Projekt-/Vertretungsaufgaben, 360°-Feedback','Beurteilungsfehler: Halo-Effekt, Mildefehler, Strengefehler, Tendenz zur Mitte, Nikolaus-Effekt (nur letzte Zeit), Sympathie, Vorurteile','Beurteilungskriterien: Arbeitsqualität, -menge, Zusammenarbeit, Führung, Selbstständigkeit']}]},
 {t:'Unterweisen nach der Vier-Stufen-Methode',b:[
  {ol:['Vorbereiten: Lernziel, Arbeitsplatz, Mitarbeiter einstimmen','Vormachen und erklären (was, wie, warum)','Nachmachen lassen und erklären lassen','Üben und Erfolg kontrollieren']}]},
 {t:'Wissensmanagement',b:[
  {ul:['Explizites Wissen: dokumentierbar (Arbeitsanweisungen, Datenbanken)','Implizites Wissen: Erfahrung, „Fingerspitzengefühl“ – sichern durch Tandem, Paten, Interviews, Videos, Lessons Learned','Wissensdatenbank: Wiederholfehler vermeiden, Einarbeitung beschleunigen, Wissen bleibt erhalten']}]}
],
QM:[
 {t:'Qualitätsmanagementsysteme',b:[
  {ul:['ISO 9001: prozessorientiert, risikobasiertes Denken, PDCA, kontinuierliche Verbesserung','Grundsätze: Kundenorientierung, Führung, Einbeziehung der Personen, Prozessorientierung, Verbesserung, faktengestützte Entscheidungen, Beziehungsmanagement','Dokumentation: Prozessbeschreibungen, Arbeits- und Prüfanweisungen, Aufzeichnungen','Audits: intern, Lieferanten-, Zertifizierungsaudit; System-, Prozess-, Produktaudit','TQM: umfassende Qualitätsorientierung des gesamten Unternehmens']}]},
 {t:'Die 7 Qualitätswerkzeuge (Q7)',b:[
  {tab:[['Werkzeug','Zweck'],['Fehlersammelliste','Fehler nach Art und Häufigkeit erfassen'],['Histogramm','Verteilung von Messwerten darstellen'],['Qualitätsregelkarte','Prozess über die Zeit überwachen, Eingriffsgrenzen'],['Pareto-Diagramm','wichtigste Fehler finden (80/20)'],['Korrelationsdiagramm','Zusammenhang zweier Merkmale'],['Ishikawa-Diagramm','Ursachen nach 6M sammeln'],['Brainstorming / Flussdiagramm','Ideen sammeln / Ablauf darstellen']]}]},
 {t:'Problemlösung',b:[
  {ul:['PDCA: Plan – Do – Check – Act','8D-Report: Team, Problembeschreibung, Sofortmaßnahmen, Ursachen, Abstellmaßnahmen wählen, einführen, Wiederholung verhindern, Team würdigen','5-Why-Methode: fünfmal „warum?“ bis zur Grundursache','6M: Mensch, Maschine, Material, Methode, Mitwelt, Messung']}]},
 {t:'Statistische Prozesslenkung',b:[
  {fx:['Cp = (OGW − UGW) / 6σ','Prozessfähigkeit (nur Streuung)']},
  {fx:['Cpk = min(OGW − x̄; x̄ − UGW) / 3σ','berücksichtigt die Lage; fähig ab 1,33']},
  {fx:['Cm, Cmk','Maschinenfähigkeit (Kurzzeit), meist ≥ 1,67']},
  {ul:['Eingriffssignale: Wert außerhalb der Eingriffsgrenze, Run (7 Werte einer Seite), Trend (7 steigend/fallend), Middle Third verletzt','Prüfmittelfähigkeit (MSA), Prüfmittelüberwachung und Kalibrierung']}]},
 {t:'Qualitätskennzahlen und Kosten',b:[
  {ul:['Ausschussquote, ppm (Fehler je Million), First Pass Yield, Reklamationsquote, Nacharbeitsquote','Qualitätskosten: Fehlerverhütungskosten, Prüfkosten, interne und externe Fehlerkosten','Zehnerregel: Fehlerkosten steigen von Phase zu Phase um den Faktor 10']}]},
 {t:'Rückverfolgbarkeit und Lenkung',b:[
  {ul:['Rückverfolgbarkeit: Seriennummer, Material-Charge, Lieferant, Maschine, Werkzeug, Datum/Schicht, Mitarbeiter, Prüfergebnisse','Produktionslenkungsplan (Control Plan): Prozessschritt, Merkmal, Spezifikation, Prüfmethode, Stichprobe, Häufigkeit, Reaktionsplan','Poka-Yoke: Fehlhandlungen technisch unmöglich machen']}]}
]};
