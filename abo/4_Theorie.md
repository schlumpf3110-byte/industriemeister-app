# Theorie – HQ Industriemeister Metall (Kurzfassung)

## Betriebstechnik

### Instandhaltung nach DIN 31051
Instandhaltung umfasst alle Maßnahmen zur Erhaltung und Wiederherstellung des funktionsfähigen Zustands. Der Abnutzungsvorrat einer Anlage wird durch Betrieb abgebaut; Instandhaltung baut ihn wieder auf.

| Grundmaßnahme | Inhalt | Beispiel |
| Wartung | Abbau des Abnutzungsvorrats verzögern | Schmieren, Reinigen, Nachstellen, Filter tauschen |
| Inspektion | Ist-Zustand feststellen und beurteilen | Messen, Prüfen, Sichtkontrolle, Schwingungsmessung |
| Instandsetzung | Wiederherstellen des Soll-Zustands | Lager tauschen, Dichtung erneuern |
| Verbesserung | Funktionssicherheit erhöhen ohne Funktion zu ändern | Schwachstelle konstruktiv beseitigen |

Wartung – Inspektion – Instandsetzung – Verbesserung: die vier Grundmaßnahmen werden in der Prüfung sehr oft abgefragt.

### Instandhaltungsstrategien
| Strategie | Auslöser | Vorteile | Nachteile |
| Ausfallbedingt (reaktiv) | Ausfall | Lebensdauer voll genutzt, kein Planungsaufwand | ungeplante Stillstände, Folgeschäden, hohe Ausfallkosten |
| Vorbeugend (periodisch) | Zeit/Laufstunden | planbar, weniger Ausfälle | Teile werden zu früh getauscht |
| Zustandsorientiert | Messwert/Zustand | Abnutzungsvorrat gut genutzt | Messtechnik, Know-how nötig |
| Vorausschauend (Predictive) | Prognose aus Sensordaten | höchste Verfügbarkeit, optimaler Zeitpunkt | hohe Investition, IT, Datensicherheit |

Die Auswahl hängt ab von: Bedeutung der Anlage (Engpass?), Sicherheitsrelevanz, Ausfallkosten, Vorhersagbarkeit des Verschleißes, Kosten der Messtechnik.

TPM (Total Productive Maintenance): Ziel null Ausfälle, null Fehler, null Unfälle. Säule „autonome Instandhaltung“: Bediener übernehmen Reinigen, Inspizieren, Schmieren und kleine Wartungen; Instandhaltung konzentriert sich auf Fachaufgaben.

### Kennzahlen der Instandhaltung
- Mittlere Betriebszeit zwischen Ausfällen (MTBF): $\text{MTBF} = \frac{t_\text{B}}{n_\text{A}}$ (mit \text{MTBF} = Mean Time Between Failures in h; t_\text{B} = Betriebszeit (Laufzeit) im Betrachtungszeitraum in h; n_\text{A} = Anzahl der Ausfälle) – Maß für die Zuverlässigkeit: je größer, desto besser.

- Mittlere Reparaturdauer (MTTR): $\text{MTTR} = \frac{\sum t_\text{R}}{n_\text{A}}$ (mit \text{MTTR} = Mean Time To Repair in h; \sum t_\text{R} = Summe aller Reparatur- bzw. Ausfallzeiten in h; n_\text{A} = Anzahl der Ausfälle) – Maß für die Instandhaltbarkeit: je kleiner, desto besser.

- Technische Verfügbarkeit: $V = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}} \cdot 100\,\%$ (mit V = Verfügbarkeit in %; \text{MTBF} = mittlere Betriebszeit zwischen Ausfällen in h; \text{MTTR} = mittlere Reparaturdauer in h)

- Gesamtanlageneffektivität (OEE): $\text{OEE} = V \cdot L \cdot Q$ (mit \text{OEE} = Overall Equipment Effectiveness in %; V = Verfügbarkeitsfaktor (tatsächliche Laufzeit ÷ geplante Belegungszeit); L = Leistungsfaktor (Ist-Ausbringung ÷ Soll-Ausbringung in der Laufzeit); Q = Qualitätsfaktor (Gutteile ÷ produzierte Teile)) – Faktoren als Dezimalzahl multiplizieren, z. B. 0,9 · 0,95 · 0,99 ≈ 0,85 = 85 % (Weltklasse).

### Schwachstellenanalyse
Störungen und Ausfälle erfassen (Maschinentagebuch, BDE/MDE, Instandhaltungsaufträge) Auswerten: Häufigkeit, Dauer, Kosten (Pareto: 20 % der Ursachen = 80 % der Ausfälle) Ursachen ermitteln (Ishikawa, 5-Why, Schadensbild) Maßnahmen festlegen (konstruktiv, Werkstoff, Schmierung, Bedienung, Intervall) Wirtschaftlichkeit prüfen, umsetzen, Wirksamkeit kontrollieren

Schwachstelle = Bauteil/Baugruppe, die häufiger als erwartet ausfällt und deren Beseitigung technisch möglich und wirtschaftlich vertretbar ist.

### Lasten- und Pflichtenheft
|  | Lastenheft | Pflichtenheft |
| Ersteller | Auftraggeber (Kunde) | Auftragnehmer (Lieferant) |
| Frage | WAS und WOFÜR? | WIE und WOMIT? |
| Inhalt | Anforderungen, Rahmenbedingungen, Schnittstellen, Termine, Budget | technische Umsetzung, Komponenten, Abnahmekriterien, Dokumentation |
| Bedeutung | Grundlage für Angebote | Vertragsgrundlage, Basis der Abnahme |

### Energieversorgung und Druckluft
Druckluft ist die teuerste Energieform im Betrieb (nur ca. 5–10 % der eingesetzten elektrischen Energie kommen als Nutzarbeit an).

- Leckagen orten (Ultraschall) und beseitigen – oft 20–30 % Verlust
- Netzdruck senken: 1 bar weniger spart ca. 6–8 % Energie
- Wärmerückgewinnung (bis ca. 90 % der Antriebsenergie wird zu Wärme)
- Drehzahlgeregelte Kompressoren, übergeordnete Steuerung
- Abschalten außerhalb der Produktionszeit
- Ansaugung kühler Außenluft

- Elektrische Leistung bei Gleichstrom: $P = U \cdot I$ (mit P = Leistung in W; U = Spannung in V; I = Stromstärke in A)

- Elektrische Wirkleistung bei Drehstrom: $P = \sqrt{3} \cdot U \cdot I \cdot \cos\varphi$ (mit P = Wirkleistung in W; U = Außenleiterspannung in V (meist 400 V); I = Außenleiterstrom in A; \cos\varphi = Leistungsfaktor (ohne Einheit))

- Wirkungsgrad: $\eta = \frac{P_\text{ab}}{P_\text{zu}}$ (mit \eta = Wirkungsgrad (ohne Einheit, < 1); P_\text{ab} = abgegebene (Nutz-)Leistung in W; P_\text{zu} = zugeführte Leistung in W)

- Gesamtwirkungsgrad (Wirkungsgradkette): $\eta_\text{ges} = \eta_1 \cdot \eta_2 \cdot \eta_3 \cdot \ldots$ (mit \eta_\text{ges} = Gesamtwirkungsgrad; \eta_1, \eta_2, \eta_3 = Einzelwirkungsgrade der hintereinandergeschalteten Glieder (z. B. Motor, Getriebe, Pumpe)) – Einzelwirkungsgrade werden multipliziert, nicht addiert. Der Gesamtwirkungsgrad ist immer kleiner als der schlechteste Einzelwirkungsgrad.

### Hebe- und Fördermittel, Anschlagen
- Kraft im Anschlagstrang: $F_\text{S} = \frac{F_\text{G}}{n \cdot \cos\beta}$ (mit F_\text{S} = Kraft je Strang in N; F_\text{G} = Gewichtskraft der Last in N (F_G = m · g); n = Anzahl der tragenden Stränge; \beta = Neigungswinkel des Strangs zur Senkrechten in °) – 3- und 4-Strang: rechnerisch höchstens 3 tragende Stränge (Tabellenwerte); bei unsymmetrischer Last oder ungleichen Stranglängen nur 2 tragende Stränge ansetzen.

- Neigungswinkel max. 60°
- Tragfähigkeitsanhänger, Prüfplakette prüfen (jährliche Prüfung durch befähigte Person)
- Kantenschutz, keine Knoten, nicht über Kanten ziehen
- Probehub, Last unter dem Schwerpunkt anschlagen
- Niemals unter schwebenden Lasten aufhalten
- Kranführer: mind. 18 Jahre, geeignet, unterwiesen, schriftlich beauftragt

Winkel zur Waagerechten gegeben? Dann sin statt cos verwenden!

### Kühlschmierstoffe und Schmierung
Aufgaben des KSS: Kühlen, Schmieren, Späne abführen, Korrosionsschutz.

| Verfahren | Merkmal | Einsatz |
| Nassbearbeitung (Emulsion) | große Menge im Kreislauf, gute Kühlung | Schleifen, Bohren, hohe Wärme |
| Minimalmengenschmierung | Aerosol, 5–50 ml/h, verbraucht sich | Aluminium, Sägen, trockene Späne |
| Trockenbearbeitung | kein KSS | Gusseisen, beschichtete HM-Werkzeuge |

KSS-Überwachung (DGUV-R 109-003): Konzentration (Refraktometer), pH-Wert, Nitrit, Keimzahl, Fremdöl; Hautschutzplan, Absaugung, Betriebsanweisung.

## Fertigungstechnik

### Fertigungsverfahren nach DIN 8580
| Hauptgruppe | Prinzip | Beispiele |
| 1 Urformen | Zusammenhalt schaffen | Gießen, Sintern, additiv |
| 2 Umformen | Zusammenhalt beibehalten | Biegen, Tiefziehen, Schmieden |
| 3 Trennen | Zusammenhalt vermindern | Drehen, Fräsen, Schneiden, Sägen |
| 4 Fügen | Zusammenhalt vermehren (Teile) | Schweißen, Schrauben, Kleben |
| 5 Beschichten | Zusammenhalt vermehren (Schicht) | Lackieren, Verzinken, PVD |
| 6 Stoffeigenschaft ändern | Werkstoffeigenschaften | Härten, Glühen, Nitrieren |

### Zerspanung: Formeln
- Drehzahl: $n = \frac{v_\text{c} \cdot 1000}{\pi \cdot d}$ (mit n = Drehzahl in 1/min; v_\text{c} = Schnittgeschwindigkeit in m/min; d = Werkstück- bzw. Werkzeugdurchmesser in mm; 1000 = Umrechnung m in mm)

- Vorschubgeschwindigkeit beim Drehen und Bohren: $v_\text{f} = f \cdot n$ (mit v_\text{f} = Vorschubgeschwindigkeit in mm/min; f = Vorschub je Umdrehung in mm; n = Drehzahl in 1/min)

- Vorschubgeschwindigkeit beim Fräsen: $v_\text{f} = f_\text{z} \cdot z \cdot n$ (mit v_\text{f} = Vorschubgeschwindigkeit in mm/min; f_\text{z} = Vorschub je Zahn in mm; z = Anzahl der Schneiden (Zähne); n = Drehzahl in 1/min)

- Vorschubweg: $L = l + l_\text{a} + l_\text{ü}$ (mit L = Vorschubweg in mm; l = Werkstücklänge (Bearbeitungslänge) in mm; l_\text{a} = Anlaufweg in mm; l_\text{ü} = Überlaufweg in mm)

- Hauptnutzungszeit beim Längs-Runddrehen: $t_\text{h} = \frac{L \cdot i}{n \cdot f}$ (mit t_\text{h} = Hauptnutzungszeit in min; L = Vorschubweg in mm; i = Anzahl der Schnitte; n = Drehzahl in 1/min; f = Vorschub in mm) – Anzahl der Schnitte immer aufrunden.

- Hauptnutzungszeit beim Fräsen: $t_\text{h} = \frac{L \cdot i}{v_\text{f}}$ (mit t_\text{h} = Hauptnutzungszeit in min; L = Vorschubweg in mm; i = Anzahl der Schnitte; v_\text{f} = Vorschubgeschwindigkeit in mm/min)

- Spanungsquerschnitt: $A = a_\text{p} \cdot f = b \cdot h$ (mit A = Spanungsquerschnitt in mm²; a_\text{p} = Schnitttiefe in mm; f = Vorschub in mm; b = Spanungsbreite in mm; h = Spanungsdicke in mm)

- Spezifische Schnittkraft: $k_\text{c} = \frac{k_\text{c1.1}}{h^{m_\text{c}}}$ (mit k_\text{c} = spezifische Schnittkraft in N/mm²; k_\text{c1.1} = Hauptwert der spezifischen Schnittkraft (für h = 1 mm, b = 1 mm) in N/mm² (Tabelle); h = Spanungsdicke in mm; m_\text{c} = Werkstoffkonstante (Anstiegswert, Tabelle))

- Schnittkraft: $F_\text{c} = A \cdot k_\text{c} \cdot C$ (mit F_\text{c} = Schnittkraft in N; A = Spanungsquerschnitt in mm²; k_\text{c} = spezifische Schnittkraft in N/mm²; C = Korrekturfaktor(en), z. B. für Schneidstoff, Verschleiß, Schnittgeschwindigkeit) – Ohne Korrekturfaktoren gilt C = 1.

- Schnittleistung: $P_\text{c} = F_\text{c} \cdot v_\text{c}$ (mit P_\text{c} = Schnittleistung in W; F_\text{c} = Schnittkraft in N; v_\text{c} = Schnittgeschwindigkeit in m/s) – v_c von m/min in m/s umrechnen: durch 60 teilen.

- Antriebsleistung der Maschine: $P_1 = \frac{P_\text{c}}{\eta}$ (mit P_1 = aufgenommene Antriebsleistung in W; P_\text{c} = Schnittleistung in W; \eta = Wirkungsgrad der Maschine)

- Theoretische Rautiefe beim Drehen: $R_\text{th} = \frac{f^{2}}{8 \cdot r_\varepsilon}$ (mit R_\text{th} = theoretische Rautiefe in mm; f = Vorschub in mm; r_\varepsilon = Eckenradius der Schneide in mm) – Ergebnis in mm; für µm mit 1000 multiplizieren.

vc in m/min für die Drehzahl, aber in m/s für die Leistung. Anzahl der Schnitte immer aufrunden.

### Schneidstoffe
| Schneidstoff | Eigenschaften | Einsatz |
| HSS | zäh, bis ca. 600 °C, nachschleifbar | Bohrer, Gewindebohrer, Formwerkzeuge |
| Hartmetall (HM) | hart, warmfest bis ca. 1000 °C, vc 3–5× HSS | Standard für Drehen/Fräsen, Wendeplatten |
| Cermet | hohe Verschleißfestigkeit, gute Oberflächen | Schlichten von Stahl |
| Schneidkeramik | sehr warmfest, spröde | Guss, gehärtete Stähle, hohe vc |
| CBN / PKD | extrem hart | CBN: gehärteter Stahl; PKD: Aluminium, NE-Metalle |

### Schweißverfahren (Kennzahlen nach ISO 4063)
| Nr. | Verfahren | Schutz | Merkmal |
| 111 | Lichtbogenhandschweißen (E-Hand) | Umhüllung/Schlacke | baustellentauglich, alle Lagen |
| 121 | Unterpulverschweißen (UP) | Pulver + Schlacke | verdeckter Lichtbogen, hohe Abschmelzleistung, nur Wanne/Horizontal |
| 131/135 | MIG/MAG (Massivdraht) | inertes/aktives Schutzgas | wirtschaftlich, mechanisierbar |
| 136 | MAG mit Fülldraht | aktives Gas + Füllung | hohe Leistung, Zwangslagen |
| 141 | WIG | Argon | hohe Qualität, dünne Bleche, Edelstahl, Alu |
| 21/22 | Punkt-/Rollennahtschweißen | – | Widerstandsschweißen von Blechen |

Schweißnahtsinnbilder nach ISO 2553: Pfeillinie, Bezugslinie, Kehlnaht als Dreieck mit Nahtdicke a, Stumpfnähte als I/V/Y-Symbol; Angaben links Maß der Naht, rechts Länge.

### Wärmebehandlung und Oberflächen
| Verfahren | Ziel |
| Normalglühen | gleichmäßiges, feines Gefüge |
| Weichglühen | bessere Zerspanbarkeit/Umformbarkeit |
| Spannungsarmglühen | Eigenspannungen abbauen (nach Schweißen) |
| Härten + Anlassen (Vergüten) | hohe Festigkeit bei guter Zähigkeit |
| Einsatzhärten | harte Randschicht, zäher Kern |
| Nitrieren | harte, verschleißfeste Randschicht, verzugsarm |

Korrosionsschutz: Phosphatieren (Haftgrund), Lackieren, Pulverbeschichten, Feuerverzinken, galvanisch Verzinken/Verchromen, Brünieren, Eloxieren (Aluminium).

### CNC-Technik
- Achsen nach Rechte-Hand-Regel: Z = Spindelachse, X, Y; Drehachsen A, B, C um X, Y, Z
- Bezugspunkte: Maschinennullpunkt M, Werkstücknullpunkt W, Referenzpunkt R, Werkzeugträgerbezugspunkt
- Wegbedingungen: G0 Eilgang, G1 Gerade, G2/G3 Kreis im/gegen Uhrzeigersinn, G90 absolut, G91 inkremental
- CAD/CAM: Programm aus 3D-Modell, Simulation, Kollisionsprüfung, DNC-Übertragung

### Additive Fertigung
| Merkmal | additiv | subtraktiv |
| Prinzip | schichtweiser Aufbau | Abtrag vom Rohteil |
| Geometrie | nahezu frei, innere Kanäle | begrenzt durch Werkzeugzugang |
| Material | kaum Abfall | viel Span |
| Stückzahl | Einzelteile, Prototypen | Serie |
| Nacharbeit | Stützen entfernen, Oberfläche bearbeiten | oft fertig |

### Industrieroboter
| Bauart | Achsen | Einsatz |
| Portal (kartesisch) | 3 Linearachsen | großer Arbeitsraum, Palettieren, schwere Lasten |
| Knickarm (Vertikal) | 6 Drehachsen | universell: Schweißen, Handling, Lackieren |
| SCARA | 4 Achsen: 2 Schwenkachsen (horizontal) + 1 Linearachse (vertikal) + Handdrehachse | schnelle Montage, Pick & Place |
| Delta/Parallel | parallele Arme | sehr schnelles Sortieren leichter Teile |

Sicherheit: Schutzzaun mit verriegelten Türen, Lichtvorhang/Laserscanner, Not-Halt, reduzierte Geschwindigkeit im Einrichtbetrieb mit Zustimmtaster; Cobots ohne Zaun durch Kraft- und Leistungsbegrenzung (biomechanische Grenzwerte, früher ISO/TS 15066, jetzt in DIN EN ISO 10218-2:2025 integriert).

## Montagetechnik

### Montageorganisation
| Form | Merkmal | geeignet für |
| Baustellenmontage | Produkt steht, Personal kommt | Einzelfertigung, Großanlagen |
| Gruppen-/Inselmontage | Team montiert Baugruppen komplett | mittlere Stückzahlen, Varianten |
| Reihenmontage | Stationen nach Ablauf, ohne festen Takt | Serien |
| Fließmontage | getaktet, Fördertechnik | Großserie, Massenfertigung |

Montageprinzipien: Stationär oder fließend; manuell, teilautomatisiert, vollautomatisch. Vormontage von Baugruppen entlastet die Endmontage.

### Montageplan und Montageplanung
Erzeugnisgliederung analysieren (Stückliste, Baugruppen) Montagereihenfolge festlegen (Montagevorranggraph) Arbeitsschritte beschreiben: Teile, Menge, Werkzeuge, Hilfsstoffe, Anzugsmomente Prüfschritte und Prüfmittel festlegen Vorgabezeiten ermitteln Arbeitsplatz und Materialbereitstellung gestalten

Ein Montageplan enthält je Schritt: Nr., Tätigkeit, Bauteile/Pos.-Nr., Werkzeug/Hilfsmittel, Prüfung, Zeit, Sicherheitshinweise.

### Fügeverfahren in der Montage
- Kraftschlüssig: Schrauben, Klemmen, Pressverbände (Reibung)
- Formschlüssig: Passfedern, Stifte, Profilwellen
- Stoffschlüssig: Schweißen, Löten, Kleben
- Schraubenanzug: drehmomentgesteuert, drehwinkelgesteuert, streckgrenzgesteuert

### Ergonomie und Bewegungsgestaltung
- Bewegungsvereinfachung: Greifen und Fügen erleichtern (Fasen, Greifschalen)
- Bewegungsverdichtung: beidhändig arbeiten, Teile im Greifraum, Fallschächte
- Teilmechanisierung: Hebehilfen, Schrauber, Vorrichtungen
- Greifraum, Arbeitshöhe, Sehabstand, Beleuchtung nach anthropometrischen Daten

### FMEA
Planung und Vorbereitung Strukturanalyse Funktionsanalyse Fehleranalyse (Folge – Art – Ursache) Risikoanalyse: B, A, E bewerten Optimierung: Maßnahmen, Verantwortliche, Termine Ergebnisdokumentation

- Risikoprioritätszahl (klassische FMEA): $\text{RPZ} = B \cdot A \cdot E$ (mit \text{RPZ} = Risikoprioritätszahl (1 bis 1000); B = Bedeutung der Fehlerfolge (1 bis 10); A = Auftretenswahrscheinlichkeit der Ursache (1 bis 10); E = Entdeckungswahrscheinlichkeit (1 bis 10; 10 = kaum entdeckbar)) – Heute nach AIAG/VDA statt RPZ die Aufgabenpriorität AP (hoch/mittel/niedrig).

B (Bedeutung) lässt sich nur durch Konstruktionsänderung senken. A durch Vermeidungsmaßnahmen, E durch bessere Prüfung.

### Inbetriebnahme und Abnahme
- Vorabnahme beim Hersteller (FAT), Endabnahme beim Kunden (SAT)
- Prüfung von Funktion, Leistung (Taktzeit, Ausbringung), Qualität (Maschinenfähigkeit Cmk)
- Sicherheit: CE-Kennzeichnung, Konformitätserklärung, Betriebsanleitung, Gefährdungsbeurteilung
- Abnahmeprotokoll mit Mängelliste und Fristen; mit Abnahme beginnt die Gewährleistung, Gefahrübergang

## Betriebliches Kostenwesen

### Kostenbegriffe
| Begriff | Bedeutung |
| Einzelkosten | direkt einem Produkt zurechenbar (Fertigungsmaterial, Fertigungslohn, Sondereinzelkosten) |
| Gemeinkosten | nur über Schlüssel zurechenbar (Miete, Strom, Gehälter) |
| Fixkosten | unabhängig von der Beschäftigung |
| variable Kosten | ändern sich mit der Beschäftigung |
| Kalkulatorische Kosten | Abschreibung, Zinsen, Wagnisse, Unternehmerlohn, Miete |

Kostenrechnung: Kostenartenrechnung (welche Kosten?) → Kostenstellenrechnung (wo?) mit dem BAB → Kostenträgerrechnung (wofür?).

### Zuschlagskalkulation
| Schema |  |
| Fertigungsmaterial | Einzelkosten |
| + Materialgemeinkosten | % vom Fertigungsmaterial |
| = Materialkosten |  |
| Fertigungslöhne |  |
| + Fertigungsgemeinkosten / Restgemeinkosten | % von den Löhnen |
| + Maschinenkosten | Stunden · Maschinenstundensatz |
| + Sondereinzelkosten der Fertigung |  |
| = Fertigungskosten |  |
| Herstellkosten = MK + FK |  |
| + Verwaltungs- und Vertriebsgemeinkosten | % von den Herstellkosten |
| + Sondereinzelkosten des Vertriebs | z. B. Spezialverpackung, Fracht, Provision |
| = Selbstkosten |  |
| + Gewinn | % von den Selbstkosten |
| = Barverkaufspreis |  |
| + Skonto (im Hundert) | BVP / (1 − s) |
| = Zielverkaufspreis |  |
| + Rabatt (im Hundert) | ZVP / (1 − r) |
| = Listenverkaufspreis |  |

- Herstellkosten: $\text{HK} = \text{MK} + \text{FK}$ (mit \text{HK} = Herstellkosten in €; \text{MK} = Materialkosten (Fertigungsmaterial + MGK) in €; \text{FK} = Fertigungskosten (Fertigungslöhne + FGK + Maschinenkosten + SEKF) in €)

- Selbstkosten: $\text{SK} = \text{HK} + \text{VwGK} + \text{VtGK} + \text{SEKV}$ (mit \text{SK} = Selbstkosten in €; \text{HK} = Herstellkosten in €; \text{VwGK} = Verwaltungsgemeinkosten in €; \text{VtGK} = Vertriebsgemeinkosten in €; \text{SEKV} = Sondereinzelkosten des Vertriebs in €)

- Zielverkaufspreis (Skonto im Hundert): $\text{ZVP} = \frac{\text{BVP}}{1 - \frac{s}{100\,\%}}$ (mit \text{ZVP} = Zielverkaufspreis in €; \text{BVP} = Barverkaufspreis in €; s = Skontosatz in %) – Beispiel: 2 % Skonto → BVP durch 0,98 teilen.

- Listenverkaufspreis (Rabatt im Hundert): $\text{LVP} = \frac{\text{ZVP}}{1 - \frac{r}{100\,\%}}$ (mit \text{LVP} = Listenverkaufspreis (netto) in €; \text{ZVP} = Zielverkaufspreis in €; r = Rabattsatz in %)

Skonto und Rabatt werden auf den Zielpreis bzw. Listenpreis bezogen – also durch (1 − Satz) teilen!

### Betriebsabrechnungsbogen (BAB)
Gemeinkosten auf Kostenstellen verteilen (Schlüssel: m², kWh, Köpfe) Allgemeine Kostenstellen und Hilfskostenstellen umlegen (innerbetriebliche Leistungsverrechnung) Zuschlagssätze bilden: Ist-Gemeinkosten / Zuschlagsgrundlage · 100 Normalgemeinkosten = Normalzuschlagssatz · Ist-Grundlage Über-/Unterdeckung = Normal − Ist

| Kostenstelle | Zuschlagsgrundlage |
| Material | Fertigungsmaterial |
| Fertigung | Fertigungslöhne (oder Maschinenstunden) |
| Verwaltung, Vertrieb | Herstellkosten des Umsatzes |

- Ist-Zuschlagssatz: $\text{Zuschlagssatz} = \frac{\text{Ist-Gemeinkosten}}{\text{Zuschlagsgrundlage}} \cdot 100\,\%$ – Zuschlagsgrundlage je Kostenstelle siehe Tabelle unten (z. B. Fertigungsmaterial für den MGK-Zuschlag).

- Normalgemeinkosten: $\text{GK}_\text{N} = \frac{\text{Normalzuschlagssatz}}{100\,\%} \cdot \text{Ist-Grundlage}$ (mit \text{GK}_\text{N} = Normalgemeinkosten (verrechnete Gemeinkosten) in €)

- Kostenüber- bzw. -unterdeckung: $\text{Deckung} = \text{GK}_\text{N} - \text{GK}_\text{Ist}$ (mit \text{GK}_\text{N} = Normalgemeinkosten in €; \text{GK}_\text{Ist} = Ist-Gemeinkosten in €) – Positives Ergebnis = Überdeckung (zu viel verrechnet), negatives Ergebnis = Unterdeckung.

- Herstellkosten des Umsatzes: $\text{HKU} = \text{HKE} + \text{BMind} - \text{BMehr}$ (mit \text{HKU} = Herstellkosten des Umsatzes in €; \text{HKE} = Herstellkosten der Erzeugung in €; \text{BMind} = Bestandsminderung an fertigen und unfertigen Erzeugnissen in €; \text{BMehr} = Bestandsmehrung an fertigen und unfertigen Erzeugnissen in €)

- Umsatzergebnis: $\text{Umsatzergebnis} = \text{Umsatzerlöse} - \text{Normal-Selbstkosten}$

- Betriebsergebnis: $\text{Betriebsergebnis} = \text{Umsatzerlöse} - \text{Ist-Selbstkosten}$ – Gleichwertig: Betriebsergebnis = Umsatzergebnis + Überdeckung − Unterdeckung (Umsatzergebnis + Verrechnungsergebnis).

### Maschinenstundensatz
- kalk. Abschreibung = Wiederbeschaffungswert / Nutzungsdauer
- kalk. Zinsen = (AW / 2) · Zinssatz
- Raumkosten = m² · Miete/m² · 12
- Energiekosten = kW · Laufzeit · Preis/kWh
- Instandhaltung = % vom AW

- Kalkulatorische Abschreibung (Maschine): $A_\text{kalk} = \frac{\text{WBW}}{n}$ (mit A_\text{kalk} = kalkulatorische Abschreibung in €/Jahr; \text{WBW} = Wiederbeschaffungswert in €; n = Nutzungsdauer in Jahren)

- Kalkulatorische Zinsen (Maschine): $Z_\text{kalk} = \frac{\text{AW}}{2} \cdot \frac{p}{100\,\%}$ (mit Z_\text{kalk} = kalkulatorische Zinsen in €/Jahr; \text{AW} = Anschaffungswert in €; p = kalkulatorischer Zinssatz in %) – Halber Anschaffungswert = durchschnittlich gebundenes Kapital.

- Raumkosten (Maschine): $K_\text{Raum} = A_\text{M} \cdot k_\text{m²} \cdot 12$ (mit K_\text{Raum} = Raumkosten in €/Jahr; A_\text{M} = Platzbedarf der Maschine in m²; k_\text{m²} = Miete (Verrechnungssatz) in € je m² und Monat; 12 = Monate je Jahr)

- Energiekosten (Maschine): $K_\text{E} = P \cdot t_\text{L} \cdot k_\text{kWh}$ (mit K_\text{E} = Energiekosten in €/Jahr; P = Anschlussleistung (ggf. mit Auslastungsfaktor) in kW; t_\text{L} = Laufzeit in h/Jahr; k_\text{kWh} = Strompreis in €/kWh)

- Maschinenstundensatz: $\text{MSS} = \frac{K_\text{M}}{t_\text{L}}$ (mit \text{MSS} = Maschinenstundensatz in €/h; K_\text{M} = maschinenabhängige Kosten in €/Jahr (Abschreibung + Zinsen + Raum + Energie + Instandhaltung); t_\text{L} = Maschinenlaufzeit in h/Jahr) – Instandhaltungskosten meist als % vom Anschaffungswert. Restgemeinkosten werden weiterhin über einen Zuschlag auf die Löhne verrechnet.

### Deckungsbeitragsrechnung
- Stückdeckungsbeitrag: $db = p - k_\text{v}$ (mit db = Deckungsbeitrag je Stück in €/Stk.; p = Verkaufspreis (Nettoerlös) je Stück in €/Stk.; k_\text{v} = variable Stückkosten in €/Stk.)

- Gesamtdeckungsbeitrag: $DB = db \cdot x$ (mit DB = Gesamtdeckungsbeitrag in €; db = Stückdeckungsbeitrag in €/Stk.; x = abgesetzte Menge in Stk.)

- Betriebsergebnis (Deckungsbeitragsrechnung): $G = DB - K_\text{f}$ (mit G = Betriebsergebnis (Gewinn bzw. Verlust) in €; DB = Gesamtdeckungsbeitrag in €; K_\text{f} = Fixkosten in €)

- Gewinnschwelle (Break-even-Menge): $x_\text{BE} = \frac{K_\text{f}}{db}$ (mit x_\text{BE} = Break-even-Menge in Stk.; K_\text{f} = Fixkosten in €; db = Stückdeckungsbeitrag in €/Stk.) – Immer aufrunden: erst ab dieser Stückzahl wird Gewinn erzielt.

- Relativer Deckungsbeitrag (Engpass): $db_\text{rel} = \frac{db}{t_\text{Engpass}}$ (mit db_\text{rel} = relativer Deckungsbeitrag in €/min bzw. €/h; db = Stückdeckungsbeitrag in €/Stk.; t_\text{Engpass} = Beanspruchung der Engpassmaschine je Stück in min bzw. h) – Produkte in der Reihenfolge des höchsten relativen DB einplanen.

- Kurzfristige Preisuntergrenze = kv (bei freier Kapazität)
- Langfristige Preisuntergrenze = Selbstkosten
- Engpass: Reihenfolge nach relativem DB = db / Engpasszeit
- Eigenfertigung oder Fremdbezug: variable Kosten vs. Bezugspreis

### Plankostenrechnung
- Sollkosten (flexible Plankostenrechnung): $K_\text{soll} = K_\text{f} + k_\text{v} \cdot B_\text{ist}$ (mit K_\text{soll} = Sollkosten in €; K_\text{f} = fixe Plankosten in €; k_\text{v} = variable Plankosten je Beschäftigungseinheit (variable Plankosten ÷ Planbeschäftigung) in €/h bzw. €/Stk.; B_\text{ist} = Ist-Beschäftigung in h bzw. Stk.)

- Plankostenverrechnungssatz: $k_\text{PV} = \frac{K_\text{plan}}{B_\text{plan}}$ (mit k_\text{PV} = Plankostenverrechnungssatz in €/h bzw. €/Stk.; K_\text{plan} = Plankosten (fix + variabel) bei Planbeschäftigung in €; B_\text{plan} = Planbeschäftigung in h bzw. Stk.)

- Verrechnete Plankosten: $K_\text{verr} = k_\text{PV} \cdot B_\text{ist}$ (mit K_\text{verr} = verrechnete Plankosten in €; k_\text{PV} = Plankostenverrechnungssatz in €/h bzw. €/Stk.; B_\text{ist} = Ist-Beschäftigung in h bzw. Stk.)

- Verbrauchsabweichung: $\Delta K_\text{V} = K_\text{ist} - K_\text{soll}$ (mit \Delta K_\text{V} = Verbrauchsabweichung in €; K_\text{ist} = Istkosten (zu Planpreisen) in €; K_\text{soll} = Sollkosten in €) – Verantwortet der Kostenstellenleiter (Meister).

- Beschäftigungsabweichung: $\Delta K_\text{B} = K_\text{soll} - K_\text{verr}$ (mit \Delta K_\text{B} = Beschäftigungsabweichung in €; K_\text{soll} = Sollkosten in €; K_\text{verr} = verrechnete Plankosten in €) – Folge der Auslastung (Leerkosten bei Unterbeschäftigung); vom Meister kaum beeinflussbar.

### Prozesskostenrechnung
Gemeinkosten indirekter Bereiche (Einkauf, Logistik, AV) werden über Prozesse und Kostentreiber verursachungsgerecht verrechnet.

- lmi-Prozesse: abhängig von der Menge des Kostentreibers (Bestellungen, Rüstvorgänge)
- lmn-Prozesse: mengenunabhängig (Abteilung leiten) → Umlage auf lmi
- Prozesskostensatz = Prozesskosten / Prozessmenge
- Gesamtprozesskostensatz = lmi-Satz + Umlagesatz lmn

- Prozesskostensatz (lmi): $k_\text{P} = \frac{K_\text{P}}{M_\text{P}}$ (mit k_\text{P} = Prozesskostensatz in € je Prozessdurchführung; K_\text{P} = Prozesskosten in €; M_\text{P} = Prozessmenge (Anzahl Kostentreiber, z. B. Bestellungen))

- Umlagesatz lmn: $k_\text{U} = k_\text{P} \cdot \frac{K_\text{lmn}}{K_\text{lmi,ges}}$ (mit k_\text{U} = Umlagesatz je Prozessdurchführung in €; k_\text{P} = lmi-Prozesskostensatz in €; K_\text{lmn} = Kosten der lmn-Prozesse in €; K_\text{lmi,ges} = Summe der Kosten aller lmi-Prozesse in €)

- Gesamtprozesskostensatz: $k_\text{ges} = k_\text{P} + k_\text{U}$ (mit k_\text{ges} = Gesamtprozesskostensatz in €; k_\text{P} = lmi-Prozesskostensatz in €; k_\text{U} = Umlagesatz lmn in €)

Effekte: Allokationseffekt (Kleinaufträge werden teurer), Degressionseffekt (Großaufträge günstiger), Komplexitätseffekt (Varianten werden teurer).

### Investitionsrechnung (statisch)
- Kalkulatorische Abschreibung (linear): $A = \frac{\text{AK} - \text{RW}}{n}$ (mit A = Abschreibung in €/Jahr; \text{AK} = Anschaffungskosten in €; \text{RW} = Restwert (Liquidationserlös) in €; n = Nutzungsdauer in Jahren)

- Kalkulatorische Zinsen: $Z = \frac{\text{AK} + \text{RW}}{2} \cdot \frac{i}{100\,\%}$ (mit Z = kalkulatorische Zinsen in €/Jahr; \text{AK} = Anschaffungskosten in €; \text{RW} = Restwert in €; i = kalkulatorischer Zinssatz in %) – (AK + RW) ÷ 2 ist das durchschnittlich gebundene Kapital.

- Kritische Menge (Kostenvergleich): $x_\text{krit} = \frac{K_\text{f1} - K_\text{f2}}{k_\text{v2} - k_\text{v1}}$ (mit x_\text{krit} = kritische Menge in Stk./Jahr; K_\text{f1}, K_\text{f2} = fixe Kosten der Anlagen 1 und 2 in €/Jahr; k_\text{v1}, k_\text{v2} = variable Stückkosten der Anlagen 1 und 2 in €/Stk.) – Oberhalb der kritischen Menge ist die Anlage mit den niedrigeren variablen Kosten günstiger.

- Rentabilität (Rendite): $R = \frac{G + Z}{\varnothing\,\text{Kapital}} \cdot 100\,\%$ (mit R = Rentabilität in %; G = Gewinn (bzw. Kostenersparnis) in €/Jahr; Z = kalkulatorische Zinsen in €/Jahr; \varnothing\,\text{Kapital} = durchschnittlich gebundenes Kapital (AK + RW) ÷ 2 in €)

- Amortisationsdauer (Durchschnittsmethode): $t_\text{A} = \frac{\text{AK}}{G + A}$ (mit t_\text{A} = Amortisationsdauer in Jahren; \text{AK} = Kapitaleinsatz (Anschaffungskosten) in €; G = durchschnittlicher Gewinn (bzw. Kostenersparnis) in €/Jahr; A = Abschreibung in €/Jahr) – Bei Restwert wird häufig (AK − RW) in den Zähler gesetzt. Investition ist vorteilhaft, wenn t_A kleiner als die geforderte Soll-Amortisationszeit ist.

Nichtmonetäre Kriterien (Ergonomie, Sicherheit, Flexibilität) werden mit der Nutzwertanalyse bewertet: Kriterien gewichten, Erfüllungsgrad bewerten, Nutzwerte summieren.

- Nutzwert (Nutzwertanalyse): $\text{NW} = \sum_{j} g_j \cdot e_j$ (mit \text{NW} = Nutzwert einer Alternative (Punkte); g_j = Gewichtung des Kriteriums j (Summe aller Gewichte = 100 % bzw. 1); e_j = Erfüllungsgrad (Punkte) der Alternative beim Kriterium j) – Die Alternative mit dem höchsten Nutzwert wird gewählt.

## Planungs-, Steuerungs- & Kommunikationssysteme

### Zeitwirtschaft nach REFA
- Auftragszeit: $T = t_\text{r} + t_\text{a}$ (mit T = Auftragszeit in min; t_\text{r} = Rüstzeit in min; t_\text{a} = Ausführungszeit in min)

- Ausführungszeit: $t_\text{a} = m \cdot t_\text{e}$ (mit t_\text{a} = Ausführungszeit in min; m = Auftragsmenge (Anzahl Einheiten); t_\text{e} = Zeit je Einheit in min)

- Zeit je Einheit: $t_\text{e} = t_\text{g} + t_\text{er} + t_\text{v}$ (mit t_\text{e} = Zeit je Einheit in min; t_\text{g} = Grundzeit in min; t_\text{er} = Erholungszeit in min; t_\text{v} = Verteilzeit in min) – Erholungs- und Verteilzeit werden meist als Prozentzuschlag auf die Grundzeit angegeben.

- Leistungsgrad: $L = \frac{\text{Istleistung}}{\text{Bezugsleistung}} \cdot 100\,\%$ (mit L = Leistungsgrad in %) – Wird bei der Zeitaufnahme beurteilt; Normalzeit (Sollzeit) = Istzeit · L ÷ 100 %.

- Zeitgrad: $Z_\text{g} = \frac{\text{Vorgabezeit}}{\text{Istzeit}} \cdot 100\,\%$ (mit Z_\text{g} = Zeitgrad in %) – Zeitgrad über 100 %: Mitarbeiter ist schneller als vorgegeben.

Zeitermittlung: Zeitaufnahme (Stoppuhr), MTM (Systeme vorbestimmter Zeiten), Multimomentaufnahme, Schätzen/Vergleichen, Planzeiten.

### Durchlaufzeit und Terminplanung
- Durchlaufzeit: $\text{DLZ} = t_\text{Rüst} + t_\text{Bearb} + t_\text{Trans} + t_\text{Lieg}$ (mit \text{DLZ} = Durchlaufzeit in h bzw. Tagen; t_\text{Rüst} = Rüstzeit; t_\text{Bearb} = Bearbeitungszeit; t_\text{Trans} = Transportzeit; t_\text{Lieg} = Liegezeit (Warten vor und nach der Bearbeitung)) – Übergangszeiten (Transport, Liegen) machen oft mehr als 80 % der DLZ aus.

- Netzplan: frühestes Ende: $\text{FEZ} = \text{FAZ} + D$ (mit \text{FEZ} = frühester Endzeitpunkt; \text{FAZ} = frühester Anfangszeitpunkt (= größter FEZ der Vorgänger); D = Dauer des Vorgangs)

- Netzplan: spätester Anfang: $\text{SAZ} = \text{SEZ} - D$ (mit \text{SAZ} = spätester Anfangszeitpunkt; \text{SEZ} = spätester Endzeitpunkt (= kleinster SAZ der Nachfolger); D = Dauer des Vorgangs)

- Netzplan: Gesamtpuffer: $\text{GP} = \text{SAZ} - \text{FAZ} = \text{SEZ} - \text{FEZ}$ (mit \text{GP} = Gesamtpuffer (Zeitreserve eines Vorgangs)) – Vorgänge mit GP = 0 liegen auf dem kritischen Weg.

- Vorwärtsterminierung: ab Starttermin, ergibt frühesten Endtermin
- Rückwärtsterminierung: ab Liefertermin, ergibt spätesten Starttermin
- Netzplan (Vorgangsknoten): FAZ, FEZ, SAZ, SEZ; Puffer = SAZ − FAZ; kritischer Weg = Puffer 0
- Belegungsplan/Gantt: Maschinenbelegung, Liegezeiten sichtbar
- Verkürzen: überlappende Fertigung, Splitten, Losgrößen senken, Rüstzeit senken (SMED)

### Materialwirtschaft
- Meldebestand: $\text{MB} = V_\text{T} \cdot t_\text{WB} + \text{SB}$ (mit \text{MB} = Meldebestand in Stk.; V_\text{T} = Tagesverbrauch in Stk./Tag; t_\text{WB} = Wiederbeschaffungszeit in Tagen; \text{SB} = Sicherheitsbestand (eiserner Bestand) in Stk.)

- Durchschnittlicher Lagerbestand (Monatswerte): $\varnothing B = \frac{\text{AB} + \sum_{k=1}^{12} \text{EB}_k}{13}$ (mit \varnothing B = durchschnittlicher Lagerbestand in Stk. bzw. €; \text{AB} = Jahresanfangsbestand; \text{EB}_k = Endbestand des Monats k)

- Durchschnittlicher Lagerbestand (vereinfacht): $\varnothing B = \frac{\text{AB} + \text{EB}}{2}$ (mit \varnothing B = durchschnittlicher Lagerbestand; \text{AB} = Anfangsbestand; \text{EB} = Endbestand)

- Umschlagshäufigkeit: $\text{UH} = \frac{\text{Verbrauch pro Jahr}}{\varnothing B}$ (mit \text{UH} = Umschlagshäufigkeit (1/Jahr); \varnothing B = durchschnittlicher Lagerbestand (gleiche Einheit wie Verbrauch))

- Durchschnittliche Lagerdauer: $\varnothing t_\text{L} = \frac{360}{\text{UH}}$ (mit \varnothing t_\text{L} = durchschnittliche Lagerdauer in Tagen; 360 = Tage je Jahr (kaufmännisch); \text{UH} = Umschlagshäufigkeit)

- Optimale Bestellmenge (Andler): $x_\text{opt} = \sqrt{\frac{200 \cdot M \cdot K_\text{B}}{E \cdot L}}$ (mit x_\text{opt} = optimale Bestellmenge in Stk.; M = Jahresbedarf in Stk./Jahr; K_\text{B} = bestellfixe Kosten je Bestellung in €; E = Einstandspreis je Stück in €/Stk.; L = Lagerhaltungskostensatz in % (als Zahl, z. B. 20)) – Die 200 entsteht aus 2 · 100 (Prozentsatz). Mit L als Dezimalzahl (z. B. 0,2) gilt die Wurzel aus 2 · M · K_B ÷ (E · L).

- ABC-Analyse: Wertanteil (A: wenige Teile, hoher Wert)
- XYZ-Analyse: Verbrauchsschwankung
- Kanban, Just-in-time, Just-in-sequence, Konsignationslager

### Lean Production
- 7 Verschwendungen: Überproduktion, Bestände, Transport, Warten, Überbearbeitung, Bewegung, Fehler (+ ungenutzte Potenziale)
- 5S: Sortieren, Systematisieren, Sauberkeit, Standardisieren, Selbstdisziplin
- Wertstromanalyse, Pull-Prinzip, One-Piece-Flow, Kaizen, Poka-Yoke, Shopfloor-Management
- SMED: internes Rüsten in externes umwandeln

### Informations- und Kommunikationssysteme
| Ebene der Automatisierungspyramide | System |
| Unternehmensebene | ERP (Aufträge, Material, Finanzen) |
| Betriebsleitebene | MES (Feinplanung, BDE/MDE, Kennzahlen) |
| Prozessleitebene | SCADA, Leitstand |
| Steuerungsebene | SPS, CNC |
| Feldebene | Sensoren, Aktoren |

PPS-Aufgaben: Produktionsprogrammplanung, Mengenplanung (Stücklistenauflösung), Termin- und Kapazitätsplanung, Auftragsfreigabe, Fertigungssteuerung, Rückmeldung.

Industrie 4.0: vernetzte Maschinen (IoT), digitaler Zwilling, Condition Monitoring, papierlose Fertigung. Risiken: Datensicherheit, Abhängigkeit von IT, Qualifizierungsbedarf.

### Personalbedarfsrechnung
- Personalbedarf: $\text{PB} = \frac{t_\text{Bedarf}}{t_\text{MA} \cdot a}$ (mit \text{PB} = Personalbedarf (Anzahl Mitarbeiter); t_\text{Bedarf} = Arbeitszeitbedarf (Summe der Vorgabezeiten) in h je Periode; t_\text{MA} = Soll-Arbeitszeit je Mitarbeiter in h je Periode; a = Anwesenheitsfaktor (Dezimalzahl)) – Wird ein Zeitgrad erwartet (z. B. 1,1), zusätzlich im Nenner multiplizieren.

- Anwesenheitsfaktor: $a = 1 - \frac{q_\text{U} + q_\text{K}}{100\,\%}$ (mit a = Anwesenheitsfaktor (Dezimalzahl); q_\text{U} = Ausfallquote durch Urlaub in %; q_\text{K} = Ausfallquote durch Krankheit und sonstige Fehlzeiten in %) – Beispiel: 10 % Urlaub + 5 % Krankheit → a = 0,85.

Personalbedarf immer aufrunden. Bei fehlenden Mitarbeitern: Mehrarbeit, Leiharbeit, Umsetzung, Fremdvergabe, Zeitgrad erhöhen.

## Arbeits-, Umwelt- & Gesundheitsschutz

### Rechtsgrundlagen und Verantwortung
- Arbeitsschutzgesetz (ArbSchG): Gefährdungsbeurteilung (§ 5), Unterweisung (§ 12), Pflichten des Arbeitgebers
- Arbeitssicherheitsgesetz (ASiG): Betriebsarzt und Fachkraft für Arbeitssicherheit (beratend)
- Betriebssicherheitsverordnung (BetrSichV): Arbeitsmittel, Prüfungen
- Gefahrstoffverordnung (GefStoffV): Gefahrstoffe, Betriebsanweisung (§ 14)
- Arbeitsstättenverordnung (ArbStättV), Jugendarbeitsschutzgesetz (JArbSchG), Mutterschutzgesetz
- DGUV-Vorschriften der Berufsgenossenschaft

Der Unternehmer kann Pflichten schriftlich auf den Meister übertragen (§ 13 ArbSchG, DGUV V1 § 13). Der Meister ist dann verantwortlich für Organisation, Auswahl, Anweisung und Kontrolle in seinem Bereich. Sicherheitsbeauftragte unterstützen ehrenamtlich, haben aber keine Verantwortung.

### Gefährdungsbeurteilung
Arbeitsbereiche und Tätigkeiten festlegen Gefährdungen ermitteln (mechanisch, elektrisch, Gefahrstoffe, Lärm, Ergonomie, psychisch …) Gefährdungen beurteilen (Risiko = Wahrscheinlichkeit × Schwere, z. B. Nohl-Matrix) Maßnahmen festlegen nach STOP Maßnahmen umsetzen Wirksamkeit überprüfen Dokumentieren und fortschreiben

STOP-Prinzip (verbindliche Rangfolge): Substitution → Technische Maßnahmen → Organisatorische Maßnahmen → Persönliche Schutzausrüstung.

### Unterweisung
- vor Aufnahme der Tätigkeit, bei Veränderungen, mindestens jährlich; Jugendliche halbjährlich
- arbeitsplatz- und tätigkeitsbezogen, verständlich (Sprache!)
- Inhalt aus Gefährdungsbeurteilung und Betriebsanweisungen
- Dokumentation mit Unterschrift, Verständniskontrolle
- digitale Unterweisung möglich, wenn Rückfragen möglich sind und Verständnis geprüft wird

### Arbeitsunfall
Erste Hilfe, Rettungskette, Unfallstelle sichern Durchgangsarzt bei Arbeitsunfähigkeit über den Unfalltag hinaus Eintrag ins Verbandbuch (Aufbewahrung 5 Jahre) Unfallanzeige an die BG, wenn mehr als 3 Kalendertage arbeitsunfähig – innerhalb von 3 Tagen; Betriebsrat unterschreibt mit Ursachen analysieren, Gefährdungsbeurteilung anpassen, erneut unterweisen

### Gefahrstoffe
- Kennzeichnung nach CLP/GHS: Piktogramme, Signalwort, H-Sätze (Gefahren), P-Sätze (Sicherheitshinweise)
- Sicherheitsdatenblatt: 16 Abschnitte, vom Hersteller
- Betriebsanweisung: vom Arbeitgeber, arbeitsplatzbezogen; Aufbau: Anwendungsbereich, Gefahren, Schutzmaßnahmen, Verhalten im Gefahrfall, Erste Hilfe, Entsorgung
- Gefahrstoffverzeichnis führen, Substitutionsprüfung

### Umweltschutz und Abfall
- Kreislaufwirtschaftsgesetz: Vermeiden → Wiederverwenden → Recycling → sonstige Verwertung → Beseitigen
- Abfallschlüssel (AVV) mit * = gefährlicher Abfall → Nachweisverfahren (eANV, Begleitschein)
- Wasserhaushaltsgesetz: Auffangwannen für wassergefährdende Stoffe
- Immissionsschutz: Lärm, Staub, Emissionen
- Umweltmanagement ISO 14001, EMAS

### Jugendarbeitsschutz
- max. 8 h/Tag, 40 h/Woche, 5-Tage-Woche
- keine gefährlichen Arbeiten (§ 22), außer zur Ausbildung unter Aufsicht
- Erstuntersuchung vor Beginn, Nachuntersuchung nach 1 Jahr
- Unterweisung vor Beschäftigung und mindestens halbjährlich
- Pausen: 30 min bei 4,5–6 h, 60 min über 6 h

## Personalführung

### Führungsstile und Führungsmodelle
| Modell | Kern |
| Autoritär – kooperativ – Laissez-faire | Grad der Mitarbeiterbeteiligung |
| Situatives Führen (Hersey/Blanchard) | Stil nach Reifegrad: unterweisen, verkaufen, partizipieren, delegieren |
| Management by Objectives | Führen durch Zielvereinbarung |
| Management by Delegation | Aufgaben mit Kompetenz und Verantwortung übertragen |
| Agiles Führen | Selbstorganisation, Coach-Rolle, kurze Feedbackzyklen |

### Motivation
- Maslow: Bedürfnispyramide – physiologische, Sicherheit, soziale, Wertschätzung, Selbstverwirklichung
- Herzberg: Hygienefaktoren (Lohn, Arbeitsbedingungen – verhindern Unzufriedenheit) und Motivatoren (Anerkennung, Verantwortung, Aufgabe – erzeugen Zufriedenheit)
- Leistung = Können (Fähigkeit) × Wollen (Bereitschaft) × Dürfen (Möglichkeit)
- Arbeitsstrukturierung: Job Rotation, Job Enlargement, Job Enrichment, teilautonome Gruppen

### Delegation
Aufgabe und Ziel erklären Kompetenzen und Verantwortung festlegen (Handlungsverantwortung geht über, Führungsverantwortung bleibt) Termine und Zwischenziele vereinbaren Mittel und Informationen klären Kontrolle und Rückmeldung vereinbaren

Nicht delegierbar: Führungsaufgaben wie Mitarbeiterbeurteilung, Personalgespräche, disziplinarische Maßnahmen, Zielsetzung, Gesamtverantwortung.

### Mitarbeitergespräche
- Phasen: Vorbereitung – Eröffnung – Sachverhalt – Stellungnahme – Lösung/Vereinbarung – Abschluss – Nachbereitung
- Kritikgespräch: zeitnah, unter vier Augen, Verhalten statt Person, Ich-Botschaften, Vereinbarung dokumentieren
- Anerkennungsgespräch: konkret, zeitnah, ehrlich
- Kommunikation: aktives Zuhören, Vier-Seiten-Modell (Schulz von Thun): Sachinhalt, Selbstoffenbarung, Beziehung, Appell

### Gruppen und Konflikte
- Gruppenphasen (Tuckman): Forming, Storming, Norming, Performing, Adjourning
- Formelle und informelle Gruppen, Rollen, Gruppennormen
- Konfliktarten: Sach-, Beziehungs-, Verteilungs-, Ziel-, Rollenkonflikt
- Konfliktlösung: Ursachen klären, Einzel- und gemeinsame Gespräche, Moderation, Win-win-Lösung, Vereinbarung, Kontrolle; Eskalationsstufen nach Glasl

### KVP und Vorschlagswesen
- KVP: kleine, ständige Verbesserungen durch alle Mitarbeiter (Kaizen), PDCA-Zyklus
- BVW: freiwillige Verbesserungsvorschläge außerhalb der Arbeitsaufgabe, Prämie nach Betriebsvereinbarung
- Ablehnung von Vorschlägen: Dank, Würdigung, sachliche Begründung, Ermutigung
- Mitbestimmung des Betriebsrats (§ 87 BetrVG)

### Arbeits- und Betriebsverfassungsrecht für Meister
- Abmahnung: Rüge, konkrete Pflichtverletzung, Androhung von Konsequenzen; Voraussetzung für verhaltensbedingte Kündigung
- Betriebsrat: Mitbestimmung bei Arbeitszeit, Überstunden, Urlaubsplan, Entlohnung, technischer Überwachung, Arbeitsschutz (§ 87); Anhörung bei Kündigung (§ 102)
- Mehrarbeit nur im Rahmen des ArbZG (§ 3: 8 h werktäglich, bis 10 h nur, wenn im Durchschnitt von 6 Monaten/24 Wochen 8 h nicht überschritten werden; 11 h Ruhezeit) und der Mitbestimmung (§ 87 Abs. 1 Nr. 3 BetrVG)

## Personalentwicklung

### Personalentwicklung – Ablauf
Bedarf ermitteln: Soll-Anforderungsprofil vs. Ist-Qualifikation (Qualifikationsmatrix) Ziele festlegen Maßnahmen planen und auswählen Durchführen Transfer sichern (Transfergespräch) Erfolg kontrollieren (Zufriedenheit, Lernerfolg, Verhalten am Arbeitsplatz, Unternehmenserfolg)

### Methoden der Personalentwicklung
| Form | Beispiele |
| into the job | Ausbildung, Einarbeitung, Traineeprogramm |
| on the job | Unterweisung am Arbeitsplatz, Job Rotation, Job Enrichment, Projektarbeit, Stellvertretung |
| near the job | Qualitätszirkel, Lernstatt, KVP-Gruppen |
| off the job | Seminare, Lehrgänge, E-Learning |
| along the job | Laufbahnplanung, Mentoring, Coaching |

### Potenzialeinschätzung und Beurteilung
- Quellen: Leistungsbeurteilung, Mitarbeitergespräch, Selbsteinschätzung, Assessment-Center, Projekt-/Vertretungsaufgaben, 360°-Feedback
- Beurteilungsfehler: Halo-Effekt, Mildefehler, Strengefehler, Tendenz zur Mitte, Nikolaus-Effekt (nur letzte Zeit), Sympathie, Vorurteile
- Beurteilungskriterien: Arbeitsqualität, -menge, Zusammenarbeit, Führung, Selbstständigkeit

### Unterweisen nach der Vier-Stufen-Methode
Vorbereiten: Lernziel, Arbeitsplatz, Mitarbeiter einstimmen Vormachen und erklären (was, wie, warum) Nachmachen lassen und erklären lassen Üben und Erfolg kontrollieren

### Wissensmanagement
- Explizites Wissen: dokumentierbar (Arbeitsanweisungen, Datenbanken)
- Implizites Wissen: Erfahrung, „Fingerspitzengefühl“ – sichern durch Tandem, Paten, Interviews, Videos, Lessons Learned
- Wissensdatenbank: Wiederholfehler vermeiden, Einarbeitung beschleunigen, Wissen bleibt erhalten

## Qualitätsmanagement

### Qualitätsmanagementsysteme
- ISO 9001: prozessorientiert, risikobasiertes Denken, PDCA, kontinuierliche Verbesserung
- Grundsätze: Kundenorientierung, Führung, Einbeziehung der Personen, Prozessorientierung, Verbesserung, faktengestützte Entscheidungen, Beziehungsmanagement
- Dokumentation: Prozessbeschreibungen, Arbeits- und Prüfanweisungen, Aufzeichnungen
- Audits: intern, Lieferanten-, Zertifizierungsaudit; System-, Prozess-, Produktaudit
- TQM: umfassende Qualitätsorientierung des gesamten Unternehmens

### Die 7 Qualitätswerkzeuge (Q7)
| Werkzeug | Zweck |
| Fehlersammelliste | Fehler nach Art und Häufigkeit erfassen |
| Histogramm | Verteilung von Messwerten darstellen |
| Qualitätsregelkarte | Prozess über die Zeit überwachen, Eingriffsgrenzen |
| Pareto-Diagramm | wichtigste Fehler finden (80/20) |
| Korrelationsdiagramm | Zusammenhang zweier Merkmale |
| Ishikawa-Diagramm | Ursachen nach 6M sammeln |
| Brainstorming / Flussdiagramm | Ideen sammeln / Ablauf darstellen |

### Problemlösung
- PDCA: Plan – Do – Check – Act
- 8D-Report: Team, Problembeschreibung, Sofortmaßnahmen, Ursachen, Abstellmaßnahmen wählen, einführen, Wiederholung verhindern, Team würdigen
- 5-Why-Methode: fünfmal „warum?“ bis zur Grundursache
- 6M: Mensch, Maschine, Material, Methode, Mitwelt, Messung

### Statistische Prozesslenkung
- Prozessfähigkeit (Streuung): $C_\text{p} = \frac{\text{OGW} - \text{UGW}}{6\,\sigma}$ (mit C_\text{p} = Prozessfähigkeitsindex (ohne Einheit); \text{OGW} = oberer Grenzwert (Toleranzgrenze); \text{UGW} = unterer Grenzwert; \sigma = Standardabweichung des Prozesses (Langzeit, geschätzt)) – Berücksichtigt nur die Streuung, nicht die Lage. Fähig meist ab 1,33.

- Prozessfähigkeit (Streuung und Lage): $C_\text{pk} = \frac{\min\left(\text{OGW} - \bar{x};\; \bar{x} - \text{UGW}\right)}{3\,\sigma}$ (mit C_\text{pk} = kritischer Prozessfähigkeitsindex; \bar{x} = Mittelwert des Prozesses; \text{OGW}, \text{UGW} = oberer und unterer Grenzwert; \sigma = Standardabweichung des Prozesses) – Abstand des Mittelwerts zur näheren Grenze zählt. Fähig ab 1,33; C_pk ist immer ≤ C_p.

- Maschinenfähigkeit (Streuung): $C_\text{m} = \frac{\text{OGW} - \text{UGW}}{6\,s}$ (mit C_\text{m} = Maschinenfähigkeitsindex; s = Standardabweichung der Kurzzeituntersuchung (meist 50 Teile))

- Maschinenfähigkeit (Streuung und Lage): $C_\text{mk} = \frac{\min\left(\text{OGW} - \bar{x};\; \bar{x} - \text{UGW}\right)}{3\,s}$ (mit C_\text{mk} = kritischer Maschinenfähigkeitsindex; \bar{x} = Mittelwert der Stichprobe; s = Standardabweichung der Stichprobe) – Kurzzeitfähigkeit; gefordert meist C_m und C_mk ≥ 1,67.

- Eingriffssignale: Wert außerhalb der Eingriffsgrenze, Run (7 Werte einer Seite), Trend (7 steigend/fallend), Middle Third verletzt
- Prüfmittelfähigkeit (MSA), Prüfmittelüberwachung und Kalibrierung

### Qualitätskennzahlen und Kosten
- Fehleranteil in ppm: $\text{ppm} = \frac{n_\text{fehler}}{n_\text{ges}} \cdot 10^{6}$ (mit \text{ppm} = parts per million (fehlerhafte Teile je Million); n_\text{fehler} = Anzahl fehlerhafter Teile; n_\text{ges} = Anzahl geprüfter bzw. gelieferter Teile)

- Ausschussquote: $q_\text{A} = \frac{n_\text{Ausschuss}}{n_\text{ges}} \cdot 100\,\%$ (mit q_\text{A} = Ausschussquote in %; n_\text{Ausschuss} = Anzahl Ausschussteile; n_\text{ges} = Anzahl gefertigter Teile)

- First Pass Yield: $\text{FPY} = \frac{n_\text{i.O.,1}}{n_\text{ges}} \cdot 100\,\%$ (mit \text{FPY} = Durchlaufausbeute im ersten Durchgang in %; n_\text{i.O.,1} = Teile, die ohne Nacharbeit beim ersten Mal in Ordnung sind; n_\text{ges} = Anzahl gefertigter Teile)

- Ausschussquote, ppm (Fehler je Million), First Pass Yield, Reklamationsquote, Nacharbeitsquote
- Qualitätskosten: Fehlerverhütungskosten, Prüfkosten, interne und externe Fehlerkosten
- Zehnerregel: Fehlerkosten steigen von Phase zu Phase um den Faktor 10

### Rückverfolgbarkeit und Lenkung
- Rückverfolgbarkeit: Seriennummer, Material-Charge, Lieferant, Maschine, Werkzeug, Datum/Schicht, Mitarbeiter, Prüfergebnisse
- Produktionslenkungsplan (Control Plan): Prozessschritt, Merkmal, Spezifikation, Prüfmethode, Stichprobe, Häufigkeit, Reaktionsplan
- Poka-Yoke: Fehlhandlungen technisch unmöglich machen

