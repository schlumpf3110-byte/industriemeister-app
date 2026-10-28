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

### Elektrische Antriebe: Frequenzumrichter, Geber, Motorwahl
Moderne Maschinenantriebe sind drehzahlveränderbar. Der Frequenzumrichter (FU) erzeugt aus dem festen Netz (50 Hz) eine Spannung mit veränderlicher Frequenz und Amplitude. Er besteht aus drei Stufen: Gleichrichter, Zwischenkreis und Wechselrichter.



Beim Abbremsen oder Absenken wirkt der Motor als Generator. Seine Energie lädt den Zwischenkreis; die Spannung steigt. Der Bremswiderstand (Brems-Chopper) wandelt sie in Wärme um. Alternativen: Netzrückspeisung oder ein gemeinsamer Zwischenkreis mehrerer Antriebe, bei dem ein bremsender Antrieb einen beschleunigenden speist.

#### Geber: inkremental oder absolut?



| Motor / Bauteil | Eigenschaft | Einsatz |
| Schrittmotor | feste Schritte (1,8° = 200 je Umdrehung), offener Regelkreis ohne Geber; bei Überlast verlorene Schritte | einfache Positionierung, 3D-Drucker, kleine Achsen |
| Servomotor | geregelt mit Geberrückführung; hohe Dynamik, Genauigkeit, Drehmoment über den ganzen Drehzahlbereich; teurer | Werkzeugmaschinenachsen, Roboter, Spindeln |
| Asynchronmotor am FU | robust, wartungsarm; Drehzahl über Frequenz einstellbar | Pumpen, Lüfter, Förderer, Hauptspindeln |
| Gleichrichter | AC → DC, Glättung durch Kondensator; Restwelligkeit sinkt | Netzteile, Zwischenkreis des FU |

Isolationsklasse: Sie nennt die höchste zulässige Dauertemperatur der Wicklung: B 130 °C, F 155 °C, H 180 °C. Faustregel: 10 K mehr halbieren die Lebensdauer der Isolation. Übliche Motoren haben Klasse F, werden aber nur nach B ausgenutzt (Reserve).

Inkremental = zählen (Referenzfahrt nötig). Absolut = Code (sofort bekannt). Schrittmotor = Steuerung ohne Rückführung, Servo = Regelung mit Geber.

### Elektrische Sicherheit, Blindleistung und Schutzorgane
#### Netzformen im Überblick

| Netzform | Aufbau | Merkmal / Einsatz |
| TN-S | Betriebserde am Trafo; N und PE getrennt geführt | Standard in Neuanlagen; Schutz über Abschaltung |
| TN-C | gemeinsamer PEN-Leiter für N und PE | Altanlagen; empfindlich bei Unterbrechung des PEN |
| TT | Anlage mit eigener Erdung, getrennt von der Trafo-Erde | FI-Schutzschalter erforderlich |
| IT | Sternpunkt isoliert oder hochohmig geerdet | erster Fehler führt nicht zur Abschaltung → Isolationsüberwachung (Krankenhaus, Prozessanlagen) |

Potentialausgleich: Alle leitfähigen Teile (Rohre, Maschinengestelle, Metallkonstruktionen) werden untereinander und mit dem Schutzleiter verbunden. Dadurch entstehen zwischen gleichzeitig berührbaren Teilen keine gefährlichen Spannungen; zugleich sinken elektromagnetische Störungen.

Oberschwingungen entstehen durch nichtlineare Verbraucher (Frequenzumrichter, Netzteile, Gleichrichter), die nicht-sinusförmigen Strom aufnehmen. Es treten ganzzahlige Vielfache der Netzfrequenz auf. Folgen: Erwärmung von Kabeln, Trafos und Kondensatoren, Fehlauslösungen, überlasteter Neutralleiter. Abhilfe: Netzdrosseln, Filter, Trennen empfindlicher Verbraucher.

#### Blindleistung und Kompensation



Induktive Verbraucher (Motoren, Transformatoren) pendeln Blindleistung hin und her. Sie leistet keine Nutzarbeit, erhöht aber Strom und Leitungsverluste. Kompensation mit Kondensatoren (einzeln am Verbraucher, in Gruppen oder zentral) hebt cos φ auf etwa 0,9 bis 0,95 und vermeidet Blindleistungsentgelte.

#### Wer schützt wen?

| Schutzorgan | schützt | vor | Merkmal |
| Leitungsschutzschalter (LS) | Leitungen | Überlast, Kurzschluss | Charakteristik B, C, D je nach Einschaltstrom |
| Motorschutzschalter | Motor und Leitung | Überlast, Kurzschluss | auf den Motorstrom einstellbar |
| Thermorelais (Bimetall) | Motor | Überlast | löst bei Erwärmung aus; im Schütz-Aufbau |
| Sanftanlasser | Netz und Mechanik | hohen Anlaufstrom und -moment | Spannungsrampe beim Anlauf |
| FI-Schutzschalter (RCD) | Personen | Fehlerstrom gegen Erde | Pflicht im TT-Netz |

### Energie sparen: Lastspitzen, Druckluft, ISO 50001
#### Lastspitzenmanagement

Der Netzbetreiber berechnet den Leistungspreis nach der höchsten gemittelten Leistung im Abrechnungszeitraum (meist Viertelstundenmittel). Eine einzige Spitze bestimmt also die Kosten des ganzen Jahres. Man glättet Spitzen durch Verschieben von Verbrauchern, gestaffelte Anläufe oder Lastabwurf. Grundlage ist die Lastgangmessung.



#### Druckluft: Leckagen kosten Geld

Leckagen an Schläuchen, Kupplungen, Verschraubungen und Ventilen können 20 bis 30 % der erzeugten Druckluft verschlucken. Der Verlust wächst etwa quadratisch mit dem Lochdurchmesser: doppelter Durchmesser = vierfacher Verlust.



#### ISO 50001, Wärmepumpe und KWK

ISO 50001 beschreibt ein Energiemanagementsystem nach dem PDCA-Zyklus: Energiepolitik, energetische Bewertung, Kennzahlen und Zielwerte, Maßnahmenplan, Messung und Überwachung, interne Audits und Managementbewertung. Ziel ist die ständige Verbesserung der Energieeffizienz.



Leistungspreis = höchste Viertelstunde. Leckage: Ø verdoppeln = Verlust vervierfachen. COP = Nutzwärme / eingesetzter Strom.

### Getriebe, Kupplungen und Bremsen
#### Planetengetriebe



Je nachdem, welches Element festgehalten wird, ergeben sich verschiedene Übersetzungen. Beispiel: Sonne treibt an, Hohlrad steht fest, der Träger gibt ab: i = 1 + z_Hohlrad / z_Sonne (ins Langsame). Vorteile: kompakt, koaxial (An- und Abtrieb auf einer Achse), hohe Übersetzung und hohes Drehmoment, gute Lastverteilung auf mehrere Planeten.

| Bauteil | Eigenschaft | Hinweis |
| Kugelgewindetrieb | Kugeln rollen zwischen Spindel und Mutter; Wirkungsgrad > 90 %; hohe Genauigkeit, Steifigkeit; wenig Verschleiß | nicht selbsthemmend → bei senkrechter Achse Bremse; teurer; Schmutzschutz |
| Trapezgewinde | Gleitreibung, Wirkungsgrad deutlich niedriger | kann selbsthemmend sein, billig, robust |
| Profilschienenführung | Wagen mit umlaufenden Kugeln/Rollen auf gehärteter Schiene; hohe Tragfähigkeit in alle Richtungen; geringe Reibung | ebene, steife Anschlussfläche; Spanschutz |

#### Kupplungen: schaltbar, starr, schützend

| Kupplung | Wirkprinzip | Schalten | Typische Aufgabe |
| Lamellenkupplung | reibschlüssig | auch unter Last schaltbar | definiertes Moment übertragen, sanftes Einkuppeln |
| Klauenkupplung | formschlüssig | nur im Stillstand oder bei Gleichlauf | drehstarre Verbindung, einfach |
| Rutschkupplung | reibschlüssig, Moment begrenzt | rutscht bei Überlast durch | Überlastschutz |
| Freilaufkupplung | Klemmkörper / Sperrklinken | überträgt nur in einer Drehrichtung | Rücklaufsperre, Überholen |

#### Betriebsbremse oder Haltebremse



Federspeicherbremse: Sie bremst im stromlosen Zustand und wird mit Strom gelüftet. Bei Stromausfall fällt also die Bremse ein – das ist gewollt (fail-safe), nicht Fehlfunktion.

### Hydraulik im Bild: Zylinder, Drosseln, Druckübersetzer
#### Druck, Kraft, Fläche

- Kolbenkraft: $p=\frac{F}{A}\quad F=p\cdot A$ (mit p = Druck in N/mm² (1 bar = 0,1 N/mm²); F = Kraft in N; A = wirksame Kolbenfläche in mm²) – Beispiel: 100 bar = 10 N/mm² auf Ø 50 mm (A ≈ 1.963 mm²) → F ≈ 19,6 kN. Pascal = N/m²; 1 bar = 10⁵ Pa.

- Hebelgesetz: $F_1\cdot l_1=F_2\cdot l_2$ (mit F = Kraft in N; l = Hebelarm in m) – Beispiel: 200 N am Arm 0,6 m halten am Arm 0,2 m eine Last von 600 N im Gleichgewicht. Kraftgewinn wird mit längerem Weg bezahlt.

#### Differentialzylinder und Eilgang



#### Druckübersetzer



#### Drosselungsarten



| Drosselung | Eignung | Hinweis |
| Zulaufdrosselung | nicht für ziehende Last | Last kann dem Zylinder vorauseilen |
| Ablaufdrosselung | hält ziehende Lasten | erzeugt Gegendruck |
| Nebenstromdrosselung | geringerer Verlust | Geschwindigkeit hängt von der Last ab |

Drosseln erzeugen immer Verlustwärme. Hydrauliköl wird nach Viskositätsklasse gewählt: ISO VG 46 bedeutet 46 mm²/s bei 40 °C. Zu dünnes Öl führt zu Leckage und Verschleiß, zu dickes zu Verlusten und Kavitation. Die Filterfeinheit (β-Wert, Reinheitsklasse nach ISO 4406) legt fest, welche Partikel abgeschieden werden; Verschmutzung ist die häufigste Ursache von Hydraulikausfällen.

### Verfügbarkeit, Weibull-Verteilung und RCM
- Verfügbarkeit: $V=\frac{MTBF}{MTBF+MTTR}$ (mit MTBF = mittlere Betriebsdauer zwischen Ausfällen; MTTR = mittlere Reparaturzeit) – Beispiel: MTBF 400 h, MTTR 4 h → V = 400/404 ≈ 99,0 %. Steigern: längere MTBF (Wartung, Verbesserung) oder kürzere MTTR (Ersatzteile, Schulung).

#### Ausfallverhalten: Die Badewannenkurve



| Formparameter β | Ausfallart | Strategie |
| < 1 | Frühausfälle (Montage- und Materialfehler) | Einlauftest, Qualität sichern |
| ≈ 1 | Zufallsausfälle | vorbeugender Austausch lohnt nicht → Zustandsüberwachung oder Ausfall akzeptieren |
| > 1 | Verschleiß-/Alterungsausfälle | vorbeugender Austausch vor dem Ausfall lohnt |

#### RCM – zuverlässigkeitsorientierte Instandhaltung

RCM analysiert für jede Funktion einer Anlage mögliche Funktionsausfälle, Ursachen und Folgen (ähnlich der FMEA) und wählt danach die wirtschaftlich sinnvollste Strategie. Sicherheits- und Umweltfolgen haben Vorrang.



#### Schwingungsanalyse: Muster im Spektrum



Sensoren messen Schwingschnelle oder -beschleunigung an den Lagerstellen. Trends zeigen die Verschlechterung früh an. Das Anlagenbuch (Maschinenakte) dokumentiert je Anlage Stammdaten, Wartungs- und Prüfpläne, durchgeführte Arbeiten, Ersatzteile, Störungen und Prüfnachweise (auch für Betriebssicherheit und Haftung). Ein CMMS (Computerized Maintenance Management System) verwaltet das digital: Aufträge, Intervalle, Ersatzteilbestand, Kosten, Kennzahlen.

### Lagerung, Schmierung, Verschleiß und Korrosion
#### Reibungszustände und Stribeck-Kurve



| Thema | Kernaussage |
| Festlager / Loslager | Festlager führt axial und nimmt Axialkräfte auf; Loslager lässt Wärmedehnung zu |
| Lagerluft | zu klein → Erwärmung und Verspannen; zu groß → Geräusche, Verschleiß; CN normal, C3 größer |
| O-Anordnung | Druckkegel nach außen: breite Stützbasis, starr gegen Kippen |
| X-Anordnung | Druckkegel nach innen: kurze Basis, tolerant gegen Fluchtungsfehler |
| Vorspannen | entfernt Spiel, erhöht Steifigkeit und Laufgenauigkeit (Spindel), aber mehr Reibung und Wärme |
| NLGI-Klasse | Konsistenz von 000 (halbflüssig) bis 6 (sehr fest); Wälzlager üblich NLGI 2, Zentralschmierung weicher (0–1) |

#### Schmierverfahren

| Verfahren | Einsatz |
| Fettschmierung | Wälzlager, wartungsarm |
| Tauch-/Spritzschmierung | Getriebe |
| Umlaufschmierung (Pumpe, Filter) | hohe Last, Kühlung |
| Ölnebelschmierung | hohe Drehzahlen |
| Zentralschmierung | viele Schmierstellen automatisch |
| Verlustschmierung | Öl/Fett wird nicht zurückgeführt |

#### Verschleißarten



#### Korrosion



| Korrosionsform | Merkmal |
| Lochfraß | örtliche tiefe Löcher an passivierten Metallen, meist durch Chloride (Edelstahl) |
| Spaltkorrosion | enge Spalten mit Sauerstoffmangel, z. B. unter Dichtungen, Schrauben |
| Reibkorrosion | Passungsrost: Mikrobewegungen zwischen Passflächen; Ausgangspunkt für Dauerbrüche |

Dauerbruch (Schwingbruch): Bruch durch wechselnde Belastung weit unter der Zugfestigkeit. Von einer Kerbe geht ein Anriss aus, der langsam wächst (glatte Fläche mit Rastlinien), bis der Restquerschnitt gewaltsam bricht. Vermeiden: Kerben vermeiden (Radien, glatte Oberflächen), Dauerfestigkeit beachten, Überlasten und Schwingungen mindern, Randschichten verfestigen.

### Pumpen, Sensoren, Steuerung und Feldbus
#### Kavitation und NPSH



Kavitation: Fällt der Druck lokal unter den Dampfdruck, bilden sich Dampfblasen, die bei höherem Druck schlagartig implodieren. Merkmale: Geräusche wie Kies, Vibration, Förderstromabfall, Materialabtrag (Pitting) am Laufrad. Abhilfe: Saughöhe verringern, Saugleitung kurz und weit, Filter sauber, Flüssigkeit kühler, Drehzahl senken.

#### Sensoren für Temperatur und Kraft

| Sensor | Prinzip | Merkmale |
| Thermoelement | Thermospannung zweier verbundener Metalle (Seebeck-Effekt) | robust, hohe Temperaturen, braucht Vergleichsstelle |
| Pt100 | Platin-Widerstand, 100 Ω bei 0 °C | genau und stabil bis ca. 600 °C; braucht Strom, 3- oder 4-Leiter-Technik zur Leitungskompensation |
| Dehnungsmessstreifen (DMS) | Widerstand ändert sich bei Dehnung/Stauchung; Wheatstone-Brücke misst kleine Änderung | Kraft-, Drehmoment-, Druck-, Wägezellen |

#### SPS-Programmiersprachen (IEC 61131-3)



#### Feldbus und Schnittstellen

| System | Merkmal |
| Profibus / Profinet | Siemens, weit verbreitet; Profinet läuft auf Ethernet |
| AS-Interface | zweiadrig für Sensoren und Aktoren (Energie + Daten) |
| IO-Link | Punkt-zu-Punkt zu intelligenten Sensoren/Aktoren |
| EtherCAT, Modbus | echtzeitfähiges Ethernet bzw. einfaches serielles Protokoll |
| OPC UA | herstellerunabhängiger Standard zum Datenaustausch bis in die IT-Ebene (Industrie 4.0) |

### Maschinensicherheit: Kategorie, PL, Sicherheitsabstand, Not-Halt
Sicherheitsfunktionen werden nach DIN EN ISO 13849 durch Kategorie (B, 1, 2, 3, 4: Struktur, Fehlertoleranz, Prüfung) und Performance Level PL (a bis e: Wahrscheinlichkeit gefährlicher Ausfälle) eingestuft. Das erforderliche PL ergibt sich aus der Risikobeurteilung: Schwere der Verletzung, Häufigkeit der Gefährdung, Möglichkeit der Vermeidung. Kategorie 3 heißt: einfehlersicher, zweikanalig mit Fehlererkennung; PL d ist für viele Maschinen üblich.

#### Sicherheitsabstand nach ISO 13855



- Sicherheitsabstand: $S=K\cdot T+C$ (mit K = Annäherungsgeschwindigkeit, meist 2000 mm/s (bei größerem Abstand 1600 mm/s); T = Gesamtnachlaufzeit = Reaktionszeit Schutzeinrichtung + Steuerung + Stillsetzzeit der Maschine; C = Zuschlag je nach Eindringtiefe in mm) – Längere Nachlaufzeit ⇒ größerer Abstand. Beispiel: T = 0,3 s, K = 2000 mm/s, C = 100 mm → S = 700 mm.

#### Not-Halt oder Not-Aus?

| Stopp-Kategorie | Wirkung |
| 0 | sofortiges Abschalten der Energie (ungesteuert) |
| 1 | gesteuertes Stillsetzen, danach Abschalten der Energie |
| 2 | gesteuertes Stillsetzen, Energie bleibt |

Der Not-Halt stoppt gefährliche Bewegungen schnell. Not-Aus trennt zusätzlich die Energiezufuhr, um elektrischen Gefahren zu begegnen. Der Taster ist rot auf gelbem Grund, rastend und jederzeit erreichbar. Rücksetzen darf die Maschine nicht automatisch anlaufen lassen.

S = K · T + C: Nachlaufzeit steigt ⇒ Abstand steigt. Not-Halt nicht automatisch zurücksetzen – erst Quittieren, dann Neustart.

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

### CNC-Programmierung, thermische Verformung und Messmittel
#### Wichtige G- und M-Befehle

| Befehl | Bedeutung | Befehl | Bedeutung |
| G00 | Eilgang | M03 | Spindel rechts |
| G01 | Linearinterpolation mit Vorschub | M05 | Spindel halt |
| G02 / G03 | Kreisinterpolation im / gegen den Uhrzeigersinn | M06 | Werkzeugwechsel |
| G90 / G91 | Absolutmaß / Inkrementalmaß (Kettenmaß) | M08 | Kühlmittel ein |
| G54 … G59 | Nullpunktverschiebungen | M30 | Programmende |
| G41 / G42 | Fräserradiuskorrektur links / rechts |  |  |

G-Befehle sind Wegbedingungen (wie gefahren wird), M-Befehle Schalt- und Zusatzfunktionen der Maschine. Ein Beispielsatz: N30 G01 X50 Z-20 F0.2 – linear auf X50, Z-20 mit Vorschub 0,2 mm je Umdrehung.

#### Thermische Verformung

Wärme aus Antrieben, Lagern, Zerspanung und Umgebung dehnt Spindel, Bett und Werkstück ungleich aus und verschiebt den Werkzeugpunkt – bei hoher Genauigkeit um mehrere Mikrometer.



#### Welches Messmittel – wie genau?

| Messmittel | Ablesung / Eigenschaft | Einsatz |
| Messschieber | 0,1 bis 0,01 mm | Werkstatt, Außen-/Innen-/Tiefenmaß |
| Bügelmessschraube | 0,01 bis 0,001 mm | genaue Außenmaße |
| Messuhr | Differenzmessung, Rundlauf | Rund-/Planlauf, Vergleich |
| Endmaße | höchste Genauigkeit | Kalibrierung, Einstellen |
| Grenzlehrdorn | Gut-/Ausschussseite | schnelle Serienprüfung von Bohrungen |
| KMG | Koordinatenmessmaschine | Form und Lage, komplexe Teile |
| optisch / Laser | berührungslos | empfindliche Teile, schnelle Messung |

Die Wahl des Messmittels richtet sich nach Toleranz, Messunsicherheit und Stückzahl – als Faustregel soll die Messunsicherheit höchstens ein Zehntel der Toleranz betragen.

### Toleranzen, Passungen und Oberflächen im Bild
#### Aufbau eines Passungsmaßes: Ø40 H7/g6



Großbuchstaben bezeichnen Bohrungen, Kleinbuchstaben Wellen. H7/g6 gehört zum System Einheitsbohrung: Das untere Abmaß der Bohrung ist 0, die Wellen werden gegen sie gestaffelt. Je kleiner die Ziffer, desto enger die Toleranz.

#### Rauheit: Ra und Rz



Ra ist unempfindlich gegen einzelne Ausreißer, Rz erfasst Spitzen und Riefen besser – deshalb wird bei Dichtflächen und Laufbahnen oft Rz verlangt. Radialwellendichtringe brauchen glatte, gehärtete Laufflächen.

#### Form- und Lagetoleranzen (ISO 1101)

| Gruppe | Toleranzen | Frage |
| Form | Geradheit, Ebenheit, Rundheit, Zylinderform | Wie gut ist das Element für sich? |
| Richtung | Parallelität, Rechtwinkligkeit, Neigung | Wie liegt es zu einem Bezug? |
| Ort | Position, Koaxialität, Symmetrie | Sitzt es am richtigen Ort? |
| Lauf | Rundlauf, Planlauf | Wie läuft es beim Drehen um die Bezugsachse? |

Sie begrenzen Abweichungen von der idealen Geometrie unabhängig von den Maßtoleranzen. Das Toleranzrahmen-Symbol enthält Symbol, Toleranzwert und Bezug.

### Zerspanung: Winkel am Schneidkeil, Kühlung, Bohrer
#### Die Winkel am Schneidkeil



| Winkel | Wirkung | Wahl |
| Spanwinkel γ groß | leichter Schnitt, kleinere Schnittkraft, aber schwächere Schneide | weiche Werkstoffe |
| Spanwinkel γ klein / negativ | stabile Schneide | harte Werkstoffe, unterbrochener Schnitt |
| Freiwinkel α | verhindert Reibung der Freifläche am Werkstück | immer > 0 |

#### Spitzenwinkel von Spiralbohrern

| Werkstoff | Spitzenwinkel |
| Stahl (Normalbohrer) | ca. 118° |
| harte und zähe Werkstoffe | ca. 130° bis 140° |
| weiche Werkstoffe, Kunststoffe | ca. 80° bis 100° |
| Aluminium | 130° bis 140° mit größerem Spanwinkel |

Der richtige Winkel und Anschliff bestimmen Zentrierung, Schneidenbelastung und Maßhaltigkeit.

#### Hochdruckkühlung und Minimalmengenschmierung

|  | Hochdruckkühlung | Minimalmengenschmierung (MMS) |
| Prinzip | KSS mit 70 bis über 100 bar gezielt an die Schneide | nur wenige ml Öl je Stunde als Aerosol an die Wirkstelle |
| Wirkung | bessere Kühlung, Spanbruch, Spanabfuhr, höhere Standzeit | kaum Kühlung, aber Schmierung |
| Vorteil | Titan, Nickelbasis, Tieflochbohren | spart Entsorgung und Reinigung |

#### Drehzahl und Leistung

- Schnittgeschwindigkeit / Drehzahl: $v_c=\pi\cdot d\cdot n\quad n=\frac{v_c}{\pi\cdot d}$ (mit vc = Schnittgeschwindigkeit in m/min; d = Durchmesser in m; n = Drehzahl in 1/min) – Beispiel: vc = 100 m/min, d = 0,1 m → n = 100 / (π · 0,1) ≈ 318 1/min. Mit d in mm: vc = π · d · n / 1000.

- Schnitt- und Antriebsleistung: $P_c=F_c\cdot v_c\quad F_c=k_c\cdot a_p\cdot f\quad P_a=\frac{P_c}{\eta}$ (mit Fc = Schnittkraft in N; kc = spezifische Schnittkraft in N/mm²; ap · f = Spanungsquerschnitt in mm²; η = Maschinenwirkungsgrad, meist 0,7 bis 0,9) – Die Antriebsleistung ist größer als die Schnittleistung – wichtig für die Auslegung des Hauptantriebs.

### Schneidstoffe und Schleifen: Wahl nach Werkstoff
| Schneidstoff | zerspant | nicht geeignet für |
| CBN (kubisches Bornitrid) | gehärtete Stähle, Guss; hohe Temperaturen (Hartdrehen, Hartfräsen) | – |
| PKD (polykristalliner Diamant) | Aluminium, NE-Metalle, Kunststoffe, Verbundwerkstoffe | Eisenwerkstoffe: Diamant reagiert mit Eisen |

#### Schleifscheibe: Körnung und Härte



Harter Werkstoff – weiche Scheibe: abgestumpfte Körner sollen ausbrechen, damit sich die Scheibe selbst schärft. Weicher Werkstoff – harte Scheibe.

### Schweißen im Detail: Verzug, Verfahren, Gase, Löten und Kleben
#### Verzug und Eigenspannungen vermeiden



- Wenig Wärme einbringen (kleine Nähte, passendes Verfahren).
- Symmetrisch und in Pilgerschritt- oder Wechselfolge schweißen; Nähte abwechselnd setzen.
- Teile spannen oder heften; Vorverformen oder Vorwärmen.
- Nachträglich spannungsarm glühen oder richten.

#### Verfahren im Vergleich

| Verfahren | Merkmal |
| Laserstrahlschweißen | hohe Energiedichte, schmale tiefe Naht, geringer Verzug, schnell, gut automatisierbar; braucht genaue Fugenvorbereitung |
| Reibschweißen | Fügen im plastischen Zustand durch Reibungswärme und Stauchen; ohne Zusatzwerkstoff; auch ungleiche Werkstoffe; rotationssymmetrische Teile |
| Löten | Lot schmilzt, Grundwerkstoff nicht (Weichlöten < 450 °C, Hartlöten darüber); dicht, ungleiche Werkstoffe, geringer Verzug |
| Kleben | ohne Wärme, flächig, verteilt Spannungen, auch ungleiche und wärmeempfindliche Werkstoffe; braucht saubere Flächen, Aushärtezeit, Temperaturgrenzen |
| Schweißen | höchste Festigkeit bei gleichen Werkstoffen |

#### Vorwärmen, Zusatzwerkstoff, Schutzgas

Stähle mit hohem Kohlenstoffäquivalent (CEV) neigen zu Aufhärtung und Kaltrissen. Vorwärmen verlangsamt die Abkühlung und senkt Härte und Spannungen; die Temperatur richtet sich nach CEV, Blechdicke und Verfahren. Der Schweißzusatz muss zum Grundwerkstoff passen (Festigkeit, Zähigkeit, Korrosionsverhalten) und wird nach der Schweißanweisung (WPS) gewählt.

| Gasart | Gase | Verfahren | Wirkung |
| Inertgas | Argon, Helium | MIG, WIG | reagiert nicht |
| Aktivgas | CO₂, Mischgase Argon + CO₂/O₂ | MAG | wirkt oxidierend; Mischgase mindern Spritzer und verbessern die Naht |

### Umformen im Bild: Tiefziehen, Verfestigung, Innenhochdruck
#### Tiefziehen und Ziehverhältnis



Ist β größer als das Grenzverhältnis, sind weitere Züge nötig (Weiterzug). Faltenhalterkraft, Schmierung und Ziehspalt beeinflussen das Ergebnis.

#### Kaltumformung und Verfestigung

Umformen unterhalb der Rekristallisationstemperatur erhöht die Versetzungsdichte: Festigkeit und Härte steigen, die Dehnung sinkt (Verfestigung). Vorteile: gute Oberfläche, hohe Maßgenauigkeit, Festigkeitssteigerung. Grenzen: begrenzter Umformgrad, höhere Kräfte. Zwischenglühen (Rekristallisationsglühen) stellt die Umformbarkeit wieder her.

Innenhochdruckumformen (IHU): Ein Rohr wird im geschlossenen Werkzeug mit Flüssigkeitsdruck von innen ausgeformt. So entstehen komplexe, leichte Hohlprofile ohne Schweißnähte (Rahmenteile, Abgaskrümmer) mit gleichmäßiger Wanddicke. Nachteile: hoher Druck, Werkzeugaufwand, Taktzeit.

### Gefüge, ZTU, Zugversuch, Härteprüfung und Wöhlerkurve
#### Gefügebestandteile des Stahls

| Gefüge | Eigenschaft |
| Ferrit | weiches kubisch-raumzentriertes Eisen mit wenig Kohlenstoff |
| Perlit | lamellare Mischung aus Ferrit und Zementit |
| Austenit | kubisch-flächenzentriert, oberhalb ca. 727 °C; löst viel Kohlenstoff; unmagnetisch |
| Martensit | hartes, verspanntes Gefüge durch schnelles Abschrecken von Austenit (Härten) |

#### ZTU-Schaubild: Abkühlgeschwindigkeit bestimmt das Gefüge



Das ZTU-Schaubild (Zeit-Temperatur-Umwandlung) dient der Wahl von Abschreckmedium und Härteverfahren: Wer Martensit will, muss schneller als die kritische Abkühlgeschwindigkeit abkühlen.

#### Zugversuch: Kennwerte



| Kennwert | Bedeutung |
| Re bzw. Rp0,2 | Streck- bzw. 0,2-%-Dehngrenze: Beginn der plastischen Verformung |
| Rm | Zugfestigkeit: höchste Spannung |
| A | Bruchdehnung: bleibende Verlängerung in % |
| Z | Brucheinschnürung |
| E | Elastizitätsmodul aus der Hookeschen Geraden |
| σ = F / A₀ | Spannung bezogen auf den Anfangsquerschnitt |

#### Härteprüfung

| Verfahren | Eindringkörper / Messgröße | Geeignet für |
| Brinell (HBW) | Hartmetallkugel; Eindruckdurchmesser | weiche bis mittelharte Werkstoffe |
| Vickers (HV) | Diamantpyramide; Eindruckdiagonale | alle Härten, dünne Schichten |
| Rockwell (HRC) | Diamantkegel; Eindringtiefe | gehärtete Stähle; schnell, einfach |

Die Prüfung ist zerstörungsarm; Härtewerte lassen sich nur näherungsweise umrechnen.

#### Wöhlerkurve: Ermüdung



Kerben, Oberflächenrauheit und Eigenspannungen senken die Dauerfestigkeit. Deshalb gilt: Radien statt scharfer Ecken, glatte Oberflächen, Randschichten verfestigen.

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

### Montagestrukturen und Organisationsformen
Die Montagestruktur gliedert das gesamte Montagesystem in Teilbereiche, ausgehend von der Zusammenbaufolge. Sie richtet sich nach dem Produktspektrum, der Stückzahl (Produktionsvolumen) und der Produktstruktur. Für jedes Teilsystem wird danach die wirtschaftlichste Organisationsform gewählt.

| Gliederung | Prinzip | Typisches Beispiel / Folge |
| produktbezogen | verschiedene Produkte in großer Stückzahl in voneinander unabhängigen Bereichen | Bereiche und Mitarbeiter spezialisiert, völlig unabhängig – kaum Abstimmungsprobleme |
| baustufenbezogen | folgt der Produktstruktur: Baugruppen- und Endmontage getrennt | parallele Abläufe verkürzen die Durchlaufzeit; Teilsysteme voneinander abhängig |
| verfahrensbezogen | Prozesse, die sich stören, werden getrennt | Lärm und Staub (Schleifen, Nieten) nicht neben sauberer Feinmontage |
| qualifikationsbezogen | Aufgaben nach Können der Mitarbeiter gebündelt | anspruchsvolle Justage bei Fachkräften, einfache Fügearbeit bei Angelernten |

In der Praxis kommen meist Mischformen vor. Außer bei rein produktbezogener Gliederung hängen die Teilsysteme voneinander ab; das führt oft zu Problemen im Material- und Informationsfluss.

#### Organisationsformen der Montage

Die Merkmale einer Organisationsform sind die Arbeitsteilung und das Bewegungsverhalten von Mitarbeitern und Montageobjekt. Die Wahl hängt ab von Masse, Abmessungen und Komplexität des Objekts, Schwierigkeitsgrad, Montagezeit, Losgröße und Jahresstückzahl.



| Form | Kennzeichen | Vorteile | Nachteile |
| Einzelplatzmontage | alle Vorgänge an einem Arbeitsplatz, keine Arbeitsteilung; Teile am Platz bereitgestellt | flexibel bei Stückzahl und Typenvielfalt; Störung wirkt nicht auf andere Plätze; großer Handlungsspielraum | begrenzte Kapazität; viele Plätze = hohe Kosten; viel Sekundäraufwand; kaum Wiederholung, daher schwer automatisierbar |
| Baustellenmontage | Sonderform für große Objekte: Objekt bleibt stationär, wird an einer Stelle komplett montiert (Maschinenbau) | Zugänglichkeit von allen Seiten | sehr hoher Platzbedarf; Materialbereitstellung getrennt von der Montage |
| Gruppenmontage | Objekte stehen, spezialisierte Mitarbeiter wandern von Objekt zu Objekt (meist große Objekte) | Spezialisierung, kein Transport des Objekts | Wege der Mitarbeiter, Koordination |
| Reihenmontage | Objekt wandert zwischen Stationen; einfachste Form der Fließfertigung; keine Taktzeit, kein exakt festgelegter Transport | kurze Durchlaufzeiten; für mittlere bis große Maschinen geeignet | grobe Arbeitsteilung führt zu Warte- und Transportzeiten |
| Fließmontage (Bandmontage) | mehrere verkettete Arbeitsplätze im Takt | hohe Stückzahl, hohe Produktivität | unflexibel bei Stückzahl- und Variantenänderung |



Reihenmontage: Objekt wandert, aber ohne festen Takt. Gruppenmontage: Objekt steht, Mitarbeiter wandern. Fließmontage: verkettet und getaktet.

#### Stückweise oder verrichtungsweise montieren?

|  | Stückweise Montage | Verrichtungsweise (satzweise) Montage |
| Ablauf | ein Objekt wird am Arbeitsplatz komplett fertig, dann das nächste | mehrere Objekte liegen am Platz, Schritt 1 an allen, dann Schritt 2 usw. |
| Wirkung | keine Bewegungswiederholung | Bewegungswiederholung, weniger Werkzeugwechsel, Kleinteile in Mengen gegriffen |
| Sekundäraufwand | hoch (Hinlangen/Bringen je Teil) | sinkt, damit steigt die Produktivität |
| Eignung | Einzelstücke, kleine Serien, große Teile | nur bei gleichen Objekten in höherer Stückzahl |

Vor-, Teil- und Endmontage: Die Vormontage fertigt Baugruppen unabhängig vom Hauptprodukt, die Teilmontage setzt sie zu größeren Einheiten zusammen, die Endmontage vereint alles zum Erzeugnis. Eine Montageinsel ist ein abgegrenzter Arbeitsbereich, in dem ein Team ein Produkt weitgehend selbstständig montiert.

Optimierte Gestaltung: Arbeitsinhalte möglichst gleichmäßig auf die Plätze verteilen, personengebundene Arbeitsteilung vermeiden (jeder kann alles in der Gruppe), statt einer langen Linie mehrere kurze Linien einsetzen – das senkt Abtaktungsverluste und erhöht die Flexibilität bei Stückzahlschwankungen, braucht aber mehr Betriebsmittel.

### Materialbereitstellung in der Montage
Für eine reibungslose Montage müssen alle Bauelemente in der geforderten Qualität, in ausreichender Menge und termingerecht vorliegen (Disposition von Eigen- und Fremdteilen). Die Bereitstellungsform bestimmt Lager- und Kapitalbindung auf der einen und den Logistikaufwand auf der anderen Seite.



| Form | Prinzip | Passt zu |
| geschlossen, auftragsabhängig | alles Material wird zu Beginn der Montage bereitgestellt | wenig komplexe Produkte mit kurzer Montagezeit (Stunden) und hoher Varianz, z. B. Fahrräder; ungeeignet bei langen Montagezeiten wegen Lager- und Kapitalbindung |
| montagesynchron | Material kommt zum Bedarfstermin ohne Zwischenlager direkt in die Montage | geringste Lagerkosten, in der Praxis wegen des extremen Logistikaufwands meist nicht wirtschaftlich |
| gemischt | C-Teile, Normteile und Teile, die in mehreren Produkten vorkommen, liegen im Lager; große, wertvolle Teile kommen montagesynchron | häufigster Kompromiss: Preisvorteile durch große Mengen, geringe Kapitalbindung bei teuren Teilen |
| Just-in-time | bedarfssynchron: Material genau zum Zeitpunkt und in der Menge, wie es gebraucht wird; enge Abstimmung mit Lieferanten | Automobilindustrie; senkt Durchlaufzeit, Kapitalbindung und Lagerrisiko |
| Kanban | dezentrale Steuerung im Regelkreis: Verbraucher meldet Bedarf, Produzent liefert nach („Supermarktprinzip“) | Teilsystem von JIT; einfache Nachschubsteuerung |
| Kitting | alle Teile eines Auftrags in einem Behälter (Kit) zusammengestellt | spart Suchzeit, hilft bei Variantenvielfalt und kleinen Losen; Aufwand in der Kommissionierung |

Gemischte Bereitstellung ist der Normalfall: C-Teile ins Lager, A-Teile montagesynchron.

### Arbeitsplatzgestaltung im Bild: Greifraum, Blickwinkel, Licht
Ergonomie (griech. ergon = Arbeit, nomos = Gesetz) passt Arbeitsumgebung und Arbeitsgeräte an den Menschen an. Das erhält die Leistung dauerhaft, beugt Gesundheitsschäden vor, senkt die Ermüdung, den Ausschuss und den Sekundäraufwand.



| Grundsatz | Richtwert / Begründung |
| Blickwinkel | Greifbereich bis ±35°, Montagevorrichtung und häufigste Teile im optimalen Bereich ±15°; darüber Kopf- und Körperdrehungen = Sekundäraufwand |
| Handhabungswege | Einzelteile im Bereich von etwa 30 cm |
| Höhe | Greif- und Fügevorgänge nicht über Herzhöhe (Durchblutung); Arbeitshöhe, Sitzhöhe und Greifraum verstellbar; Wechsel Sitzen/Stehen ermöglichen |
| Beleuchtung | schatten- und blendfrei; meist 500 lx, bei sehr kleinen oder komplizierten Teilen 1000–1500 lx |
| Schwere Teile | nicht aus der untersten Regalebene greifen, sondern Hubgeräte oder Materialwagen einsetzen |
| Takt | Fließmontage mit manueller Förderung bringt Leistungsdruck; mit Puffern (Entkopplungszeit) ist individuelles Leistungsverhalten möglich |



Hauptursachen für Leistungsminderung: Armbewegungen außerhalb von Greif- und Blickwinkel, Taktbindung in der Fließmontage und bei Großgeräten Gehen, Bücken und Drehen unter Last.

### Schraubverbindungen: Festigkeit, Anziehen, Sichern
Schrauben erzeugen durch das Anziehen eine Vorspannkraft, die die Bauteile aufeinanderpresst. Betriebskräfte werden dann über Reibung zwischen den Teilen (Kraftschluss) übertragen. Das Anzugsmoment ist nur der Weg dorthin.



| Festigkeitsklasse | Zugfestigkeit Rm | Streckgrenze Re | Rechenweg |
| 8.8 | 800 N/mm² | 640 N/mm² | 8 · 100 = 800;  8 · 8 · 10 = 640 |
| 10.9 | 1000 N/mm² | 900 N/mm² | 10 · 100 = 1000;  10 · 9 · 10 = 900 |
| 12.9 | 1200 N/mm² | 1080 N/mm² | 12 · 100 = 1200;  12 · 9 · 10 = 1080 |

Erste Zahl mal 100 = Mindestzugfestigkeit in N/mm². Erste mal zweite Zahl mal 10 = Streckgrenze.

- Anzugsmoment aus Vorspannkraft (vereinfacht): $M_\text{A}=\frac{F_\text{V}\cdot P}{2\pi\cdot\eta}$ (mit M_\text{A} = erforderliches Anzugsmoment in Nm; F_\text{V} = Vorspannkraft in N; P = Gewindesteigung in m (M5: 0,8 mm = 0,0008 m); \eta = Wirkungsgrad der Schraubverbindung (Reibung berücksichtigt, hier klein, z. B. 0,11)) – Beispiel: F_V = 12.000 N, P = 0,0008 m, η = 0,11 → M = 12.000 · 0,0008 / (2π · 0,11) ≈ 13,9 Nm. Ein Drehmomentschlüssel mit nur 10 Nm Endwert reicht dafür nicht.

| Anziehverfahren | Prinzip | Vorspannkraft |
| drehmomentgesteuert | Moment wird gemessen, Reibung streut | streut stark (Schmierung, Oberfläche) |
| drehwinkelgesteuert | nach Fügemoment um festen Winkel weiterdrehen | genauer |
| streckgrenzgesteuert | bis zur Streckgrenze anziehen | höchste und gleichmäßigste Vorspannung, Schraube meist nur einmal verwendbar |

- Setzen: Rauheiten ebnen sich ein, die Vorspannkraft sinkt. Lange, elastische Schrauben und Nachziehen begrenzen den Verlust.
- Sicherung gegen Lockern: mikroverkapselter Klebstoff, Klemmmuttern, Sicherungsscheiben, formschlüssig mit Splint oder Draht. Gewindeeinsätze (Heli-Coil) reparieren Gewinde in weichen Werkstoffen.
- Kritische Verschraubungen mit Schraubsystemen (Drehmoment- und Winkelüberwachung), Werte je Schraube der Seriennummer zuordnen (Rückverfolgbarkeit); Station sperren, wenn nicht i. O.
- Drehmomentschlüssel nach Prüfmittelplan kalibrieren, nach Sturz oder Überlastung sofort prüfen, nach Gebrauch auf Skalenanfang entspannen und nicht zum Lösen verwenden.

Anzugsmomente aus Tabellen gelten nur für den angegebenen Schmierzustand. Geschmiert erzeugt dasselbe Moment viel mehr Vorspannkraft – im Extremfall wird die Schraube überlastet.

### Lager-, Press- und Maschinenmontage
#### Wälzlager montieren

- Sauber arbeiten, Lager erst kurz vor der Montage auspacken, Sitze und Passmaße prüfen.
- Fügekraft nur über den Ring mit dem Festsitz leiten – nie über die Wälzkörper.
- Mit Montagehülse oder Presse fügen oder erwärmen (induktiv oder Heizplatte, höchstens etwa 120 °C); nach induktivem Anwärmen entmagnetisieren.
- Festlager führt axial, Loslager lässt Wärmedehnung zu. Lagerluft CN ist normal, C3 größer; zu kleine Luft erwärmt und verspannt, zu große macht Geräusche und Verschleiß.



Vorspannen entfernt das Lagerspiel, erhöht Steifigkeit und Laufgenauigkeit (z. B. Spindel), erzeugt aber mehr Reibung und Wärme. Die Vorspannung muss genau eingestellt werden.

Dichtungen: Radialwellendichtring – Lauffläche glatt und gehärtet, Schutzlippe zur Schmutzseite, mit Einführhülse montieren. Flachdichtung – ebene Flansche, gleichmäßig über Kreuz anziehen. Werkstoff passend zu Medium und Temperatur.

#### Pressverbände

| Verbindung | Fügen | Merkmal |
| Längspressverband | axial mit Presse, Fügekraft | Rauheit wird geglättet, geringere Übertragung |
| Querpressverband (Schrumpfen / Dehnen) | Erwärmen oder Abkühlen, dann ohne Kraft fügen | keine Rauheitsverluste, hohe Übertragungsfähigkeit |
| Spannsatz, Konusverbindung | Pressung durch Spannelemente oder kegelige Flächen | lösbar und spielfrei |

- Erforderliche Erwärmung beim Schrumpfen: $\Delta T=\frac{U+s}{\alpha\cdot d}$ (mit \Delta T = Temperaturerhöhung in K; U = Übermaß in mm; s = Fügespiel in mm; \alpha = Längenausdehnungskoeffizient (Stahl ca. 12 · 10⁻⁶ je K); d = Fügedurchmesser in mm) – Beispiel: Welle 40 mm, U = 0,03 mm, s = 0,04 mm → ΔT = 0,07 / (12·10⁻⁶ · 40) ≈ 146 K. Zieltemperatur = Raumtemperatur + ΔT; Werkstoffgrenzen beachten.

#### Maschinen aufstellen, ausrichten, auswuchten

- Fundament mit ausreichender Tragfähigkeit, Maschine nivellieren (Wasserwaage, Nivellierschrauben), Schwingungsdämpfer bei Bedarf.
- Wellen mit Kupplung auf Winkel- und Parallelversatz ausrichten (Messuhr oder Laser): erst nivellieren, Fußauflage prüfen (weicher Fuß), Versatz messen, mit Passblechen korrigieren, erneut messen. Sonst Schwingungen, Lagerschäden, Dichtungsverschleiß.
- Rotierende Teile auswuchten (Unwucht beseitigen), Auswuchtgüte nach ISO 21940. Schwingungsmessung bei der Inbetriebnahme zeigt, ob Aufstellung und Wuchtung stimmen.
- Rohrleitungen entgraten, innen reinigen, spannungsfrei verlegen; Hydraulik mit Filter spülen, Druckprobe, Dichtheit prüfen, mit niedrigem Druck in Betrieb nehmen.
- Schaltschrank: Aderendhülsen crimpen, Klemmen mit vorgegebenem Moment anziehen, Schutzleiter und Potentialausgleich anschließen, kennzeichnen; danach Schutzleiterdurchgang, Isolationswiderstand (z. B. 500 V DC) und Funktion durch eine Elektrofachkraft prüfen.

### Takt, Bandwirkungsgrad und montagegerechtes Konstruieren
- Bandwirkungsgrad (Liniengütegrad): $\eta_\text{Band}=\frac{\sum t_\text{Station}}{n\cdot t_\text{Takt}}$ (mit \sum t_\text{Station} = Summe der Arbeitsinhalte aller Stationen in s; n = Anzahl der Stationen; t_\text{Takt} = Taktzeit in s (längster Arbeitsinhalt oder Vorgabe)) – Verlustzeit je Station = Takt − Arbeitsinhalt der Station.



#### Montagegerecht konstruieren (DFA)

- wenige und gleiche Teile, Normteile bevorzugen
- Fügerichtung von oben, Teile selbstzentrierend und selbsthaltend, Einführschrägen
- Justierarbeiten vermeiden, Zugänglichkeit für Werkzeuge
- Fehlmontage ausschließen (Asymmetrie, Poka-Yoke)

Toleranzen ausgleichen: Passscheiben und Distanzringe, Langlöcher und Exzenter, selektive Montage (Teile in Gruppen sortiert), Justieren oder – als letzte Wahl – Nacharbeit.

Unterlagen: Der Montageplan legt Reihenfolge, Verfahren, Betriebsmittel, Prüfschritte und Vorgabezeiten fest. Die Arbeitsunterweisung zeigt dem Werker an der Station den Ablauf (Bilder, Stückliste, Drehmomente). Die Explosionszeichnung zeigt alle Teile in Montagereihenfolge auseinandergezogen, der Kontrollplan die Prüfschritte, die Einstellvorschrift die Sollwerte für das Justieren.

Planungsarten: Neuplanung (neues Produkt, neue Montage), Anpassungsplanung (bestehende Montage an Änderungen anpassen), Umplanung (grundlegende Neuordnung, z. B. anderer Montageort oder Verfahren). Muss-Kriterien müssen erfüllt sein, Soll-Kriterien sind wünschenswert.

Qualität in der Montage: Werkerselbstprüfung, Poka-Yoke (Teilepräsenzkontrolle), Prüfschritte nach kritischen Operationen, Messen und Protokollieren, Endprüfung; bei Abweichung sperren und rückverfolgen. Zehnerregel: Ein Fehler kostet mit jedem Prozessschritt etwa das Zehnfache.

### Automatisierte Montagesysteme
Automatisierung soll Qualität sichern, Montagezeiten verkürzen, Produktivität erhöhen, Kosten senken und zu anspruchslose Tätigkeiten vermeiden.



|  | Teilautomatisiert (Hybrid) | Vollautomatisiert |
| Prinzip | manuelle Plätze und Automatikstationen kombiniert | alle Vorgänge inkl. Steuern und Regeln laufen selbstständig |
| Mensch | führt aus, was sich nicht wirtschaftlich automatisieren lässt | überwacht, beseitigt Störungen, versorgt mit Material |
| Einsatz | wenn Vollautomatisierung unwirtschaftlich ist | Sondermaschinen: teuer, wenig flexibel |
| Voraussetzungen | – | hohe Stückzahlen und Laufzeiten; automatisierungsgerecht konstruiertes Produkt; termingerechte Materialversorgung in Qualität; qualifiziertes Personal für Überwachung und Instandhaltung |

Montageroboter (SCARA, Knickarm, Delta) arbeiten schnell und präzise bei hoher Stückzahl, meist hinter Schutzeinrichtungen. Cobots arbeiten ohne Schutzzaun mit dem Menschen, mit Kraft- und Geschwindigkeitsbegrenzung nach ISO/TS 15066 – geeignet für kleine Serien und ergonomische Entlastung. Eine Risikobeurteilung bleibt Pflicht.

Elementare Montagevorgänge (Verrichtungsgruppen) sind Fügen, Handhaben, Kontrollieren, Justieren und Sonderoperationen wie Reinigen, Entgraten, Auspacken, Ölen. Fügeverbindungen unterscheidet man nach Wirkung: formschlüssig (Passfeder), kraftschlüssig (Pressverbindung), stoffschlüssig (Schweißen, Kleben); außerdem lösbar, bedingt lösbar, unlösbar, starr oder beweglich, mittelbar (mit Hilfsfügeteil wie Schraube, Stift, Lot) oder unmittelbar.

### Inbetriebnahme, Abnahme und rechtliche Grundlagen im Bild


| Abnahmeart | Inhalt | Hinweis |
| direkte messtechnische Prüfung | Geradheit, Ebenheit, Parallelität, Rechtwinkligkeit, Rundlauf, Positioniergenauigkeit und Umkehrspiel | sehr aufwendig, normalerweise nur beim Hersteller |
| indirekte messtechnische Prüfung | Probewerkstücke bearbeiten und messen | Abweichungen am Werkstück zeigen die Maschinengenauigkeit |
| Fähigkeitsuntersuchung | Maschinenfähigkeit (50 Teile in Folge, Kurzzeit) beim Hersteller, Prozessfähigkeit (Langzeit) beim Anwender | Cmk und Cpk |

Eine Anlage verbindet Apparate (Wärmetauscher, Behälter), Rohrleitungen, Prozessleittechnik und Maschinen (Rührwerke, Verdichter). Ihre Gesamtfunktion hängt von allen Komponenten ab. Vor der Inbetriebnahme werden Anlage und Komponenten gereinigt (z. B. Öl und Fett in Sauerstoffanwendungen) und die Montage kontrolliert (Armaturen, Sicherheitsventile, Einbauten). Die Erstinbetriebnahme endet mit dem Garantieversuch: Er weist nach, dass die Anlage alle vertraglichen Anforderungen erfüllt, und ist juristisch die Abnahmeprüfung.

Die Abnahme einer Anlage prüft drei Bereiche: (1) Anlagenkonzept gegen das Pflichtenheft mit Nachweisen (statische Berechnungen, Prüfprotokolle von TÜV oder BG, Werkstoffnachweise, Druckprüf-, Röntgen- und Schweißnachweise), (2) Anlagenverfügbarkeit – der Garantieversuch, (3) Anlagendokumentation (Prüfdokumente, Genehmigungen, Konformitätserklärungen, Wartungsplan, Betriebshandbuch, Schalt- und Hydraulikpläne, Ersatzteilkatalog, Softwaredokumentation).



| Begriff | Bedeutung |
| EG-Konformitätserklärung | für Maschinen, die das Werk verwendungsfertig verlassen; bestätigt die Übereinstimmung mit den Richtlinien |
| EG-Einbauerklärung | für unvollständige Maschinen, die erst an Ort und Stelle in andere Maschinen eingebaut werden |
| CE-Kennzeichen | bestätigt, dass die grundlegenden Sicherheits- und Gesundheitsanforderungen aller relevanten Richtlinien erfüllt sind und das Konformitätsbewertungsverfahren durchgeführt wurde; angebracht vom Hersteller oder seinem Bevollmächtigten in der EU |
| TRBS | Technische Regeln zur Betriebssicherheit – Konkretisierung für den Betreiber |

Betriebsanleitung: unbedingter Bestandteil der technischen Dokumentation; ohne sie darf eine Maschine nicht in Betrieb genommen werden. Mindestinhalt: bestimmungsgemäße Verwendung und ihre Grenzen, Beschreibung von Inbetriebnahme, Instandhaltung und Entsorgung, Warnungen vor Fehlgebrauch samt Risiken, Hinweise zu Wartung, Inspektion und Instandsetzung. Keine unzulässigen Formulierungen, zielgruppengerechte Sprache, klare Gliederung.

Hinweis: Die Maschinenrichtlinie 2006/42/EG wird ab dem 20. Januar 2027 durch die EU-Maschinenverordnung 2023/1230 abgelöst. Für die Prüfung 2026 gelten die bisherigen Begriffe (EG-Konformitätserklärung, Einbauerklärung).

### FMEA und Fehlerkosten im Bild


| Bewertung | 1 | 10 |
| Bedeutung B (Folge für den Kunden) | keine Auswirkung, Kunde merkt nichts | Gefahr für Leib und Leben, Gesetzesverstoß |
| Auftreten A | Fehler sehr unwahrscheinlich | Fehler tritt nahezu sicher auf |
| Entdeckung E | Fehler wird sicher entdeckt | keine Entdeckungsmaßnahme |

Risikoprioritätszahl RPZ = B · A · E. Abgearbeitet wird nach dem Pareto-Prinzip (höchste RPZ zuerst) – zusätzlich immer dann, wenn B oder A gleich 9 oder 10 ist, auch bei kleiner RPZ. Zwei Fehler können dieselbe RPZ haben (z. B. 10·7·2 = 7·2·10 = 140), sind aber nicht gleich dringend: Die RPZ ist nur eine formale Größe. Bei der neueren AIAG/VDA-FMEA ersetzt die Aktionspriorität (hoch, mittel, niedrig) die RPZ; die Bedeutung hat dabei Vorrang. Nach Maßnahmen wird neu bewertet und die neue RPZ mit der alten verglichen.

| FMEA-Art | Untersucht | Zeitpunkt |
| System-FMEA | Produktentwurf, Systemfunktionen, Schnittstellen | früh im Entwurf |
| Konstruktions-FMEA (Design-FMEA) | Bauteilfunktion und -eigenschaften, Werkstoffe, Dimensionierung | nach der Produktentwicklung, vor der Detailkonstruktion |
| Prozess-FMEA | geplanter Montage- und Fertigungsprozess, Prozessfehler | vor Beginn von Fertigung und Montage |



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

### Break-even, Engpass und kritische Menge im Bild
#### Break-even-Analyse



- Break-even und Sicherheit: $x_{BE}=\frac{K_f}{p-k_v}\quad SK=\frac{x_{plan}-x_{BE}}{x_{plan}}\cdot 100$ (mit Kf = Fixkosten; p − kv = Stückdeckungsbeitrag; SK = Sicherheitskoeffizient in %) – Beispiel: Plan 5.000 Stück, Break-even 3.000 → SK = 40 %: Der Absatz kann um 40 % sinken, bevor Verluste entstehen.

#### Engpass: Deckungsbeitrag je Engpasseinheit



| Preisuntergrenze | Höhe | Wann? |
| kurzfristig | variable Stückkosten | freie Kapazität, vorübergehend – jeder Preis darüber deckt Fixkosten mit |
| langfristig | Selbstkosten (Vollkosten) | auf Dauer müssen alle Kosten gedeckt werden, sonst Verlust |

#### Eigenfertigung oder Fremdbezug: kritische Menge



Unter der kritischen Menge lohnt Fremdbezug, darüber Eigenfertigung. Zusätzlich Qualität, Liefersicherheit und Know-how bewerten.

#### Fixkostendegression, sprungfixe Kosten, Leerkosten



| Begriff | Bedeutung |
| sprungfixe Kosten | fix in einem Bereich, steigen stufenweise bei Erweiterung (z. B. zusätzliche Schicht) |
| Leerkosten | Fixkosten für ungenutzte Kapazität |
| mehrstufige DB-Rechnung | Erlös − variable Kosten = DB I; − Produktfixkosten = DB II; − Produktgruppenfixkosten = DB III; − Unternehmensfixkosten = Ergebnis |

### Kalkulation im Bild: Zuschläge, Rückwärtsrechnung, Spanne
#### Zuschlagskalkulation – das Schema



| Verfahren | Prinzip | Einsatz |
| Divisionskalkulation | Stückkosten = Gesamtkosten / Menge | Einproduktfertigung |
| Äquivalenzziffern | Sorten werden mit Gewichtungsfaktoren in Recheneinheiten umgerechnet | ähnliche Sortenprodukte |
| Zuschlagskalkulation | Gemeinkosten prozentual auf Einzelkosten | Mehrproduktfertigung, Einzelfertigung |
| Bezugsgrößenkalkulation | Kostensätze je Bezugsgröße (Maschinenstunde, Rüstvorgang) | hoher Gemeinkostenanteil, automatisierte Fertigung |

| Zeitpunkt | Basis | Zweck |
| Vorkalkulation | Plan-/Normalkosten | Angebotspreis |
| mitlaufend | laufende Istwerte | Abweichungen früh erkennen |
| Nachkalkulation | Istkosten | Preis und Wirtschaftlichkeit prüfen, Datenbasis für künftige Kalkulation |

#### Rückwärts- und Differenzkalkulation



Differenzkalkulation vergleicht den erreichbaren Preis mit den Selbstkosten und zeigt Gewinn oder Verlust.

#### Handelsspanne und Kalkulationszuschlag



#### Kostenstellen: Ist-, Normal-, Plan-Zuschlag

| Zuschlag | Basis | Folge |
| Ist | tatsächliche Gemeinkosten des Zeitraums | schwankt, erst nachträglich |
| Normal | Durchschnitt vergangener Perioden | stabile Zuschläge |
| Plan | Planwerte | Vorgabe für Steuerung |

Weichen verrechnete (Normal-)Gemeinkosten von den Ist-Gemeinkosten ab, entsteht Kostenüberdeckung (verrechnet mehr als angefallen) oder Kostenunterdeckung (weniger); sie wird im BAB ermittelt. Gegenseitige Leistungen von Hilfskostenstellen verrechnet das Gleichungsverfahren: Für jede Hilfsstelle wird ein Verrechnungspreis als Unbekannte angesetzt, das Gleichungssystem berücksichtigt die gegenseitige Belieferung – genauer als Anbau- und Treppenverfahren.

### Lohn, Finanzierung und Bilanzkennzahlen im Bild
#### Entgeltformen

| Form | Berechnung | Beispiel |
| Zeitlohn | Stunden · Stundenlohn | 160 h · 19,50 € = 3.120 € |
| Akkordlohn | Vorgabezeit je Einheit · Menge · Minutenfaktor (Akkordrichtsatz/60) | 4 min · 120 · 0,30 = 144 € |
| Prämienlohn | Grundlohn + Prämie für Mehrleistung, Qualität, Einsparung | – |

Mindestlohn und Garantielohn sind zu beachten. Personalkosten = Bruttolohn + Arbeitgeberanteile zur Sozialversicherung + weitere Lohnnebenkosten (Urlaubs-/Weihnachtsgeld, Betriebsrente). Der Stundensatz = Jahreskosten / produktive Stunden (Arbeitstage minus Urlaub, Feiertage, Krankheit, Schulung): z. B. 60.000 € / (1.704 h · 85 %) ≈ 41,43 €/h.

#### Finanzierung

| Form | Merkmal |
| Eigenfinanzierung | Einlagen, einbehaltene Gewinne; unabhängig von Gläubigern |
| Fremdfinanzierung | Kredite, Anleihen mit Zins und Rückzahlung |
| Leasing | Nutzung gegen Rate, Eigentum beim Leasinggeber; schont Liquidität, flexibel, meist teurer |
| Mietkauf | Mietraten mit Option auf Eigentumserwerb |

- Effektiver Jahreszins bei Verzicht auf Skonto: $i\approx\frac{s}{100-s}\cdot\frac{360}{Z-F}\cdot 100$ (mit s = Skonto in %; Z = Zahlungsziel in Tagen; F = Skontofrist in Tagen) – Beispiel: 2 % bei 10 Tagen, Ziel 30 Tage: 2/98 · 360/20 = 36,7 % p. a. → meist teurer als ein Bankkredit, Skonto in der Regel ausnutzen.

#### Bilanzkennzahlen



| Kennzahl | Formel |
| Liquidität 1. Grades | flüssige Mittel / kurzfristige Verbindlichkeiten |
| Liquidität 2. Grades | (flüssige Mittel + Forderungen) / kurzfr. Verbindlichkeiten |
| Liquidität 3. Grades | Umlaufvermögen / kurzfr. Verbindlichkeiten |
| Working Capital | Umlaufvermögen − kurzfristiges Fremdkapital |
| Eigenkapitalrentabilität | Gewinn / Eigenkapital · 100 |
| Gesamtkapitalrentabilität | (Gewinn + Fremdkapitalzinsen) / Gesamtkapital · 100 |
| Umsatzrentabilität | Gewinn / Umsatz · 100 |
| Cashflow | Jahresüberschuss + Abschreibungen + Rückstellungsbildung (Innenfinanzierungskraft) |
| EBIT / EBITDA | Ergebnis vor Zinsen und Steuern / zusätzlich vor Abschreibungen |

Goldene Bilanzregel: Langfristig gebundenes Vermögen langfristig finanzieren.



Incoterms (ICC) regeln, wer Transport, Versicherung, Zoll und Gefahrenübergang trägt (EXW ab Werk, FCA, DAP, DDP) – und damit, welche Kosten in den Einstandspreis eingehen.

### Investitionsrechnung im Bild: Barwert, Kapitalwert, Zinsfuß
- Auf- und Abzinsen: $K_n=K_0\cdot(1+i)^n\quad K_0=\frac{K_n}{(1+i)^n}$ (mit i = Zinssatz; n = Jahre) – 10.000 € bei 5 % nach 3 Jahren = 11.576,25 €; 10.000 € in 3 Jahren sind heute 8.638,38 € wert (Barwert).

#### Kapitalwertmethode – Zahlungsstrahl



#### Interner Zinsfuß



Liegt der interne Zinsfuß über dem geforderten Kalkulationszinssatz, ist die Investition vorteilhaft. Er wird iterativ oder durch Interpolation bestimmt.

- Annuität: $A=K\cdot\frac{i\,(1+i)^n}{(1+i)^n-1}$ (mit K = Anschaffungsauszahlung; i = Kalkulationszins; n = Nutzungsjahre) – Beispiel: 100.000 € über 4 Jahre bei 8 % → ca. 30.192 € je Jahr. Ist der jährliche Überschuss größer, lohnt die Investition.

#### Statisch oder dynamisch?

|  | Statisch | Dynamisch |
| Verfahren | Kosten-, Gewinn-, Rentabilitätsvergleich, Amortisation | Kapitalwert, interner Zinsfuß, Annuität |
| Rechnet mit | Durchschnittswerten eines Jahres | Zahlungszeitpunkten (Abzinsen) |
| Zeitwert | ignoriert | berücksichtigt |
| Eignung | kurze Nutzung, Vorauswahl | längere Nutzung |

- Kalkulatorische Kosten und Amortisation: $\text{Abschr.}=\frac{AK-RW}{ND}\quad Z=\frac{AK+RW}{2}\cdot i\quad T=\frac{AK}{\bar R}$ (mit AK = Anschaffungskosten; RW = Restwert; ND = Nutzungsdauer; R̄ = durchschnittlicher jährlicher Rückfluss (Gewinn + Abschreibung)) – Zinsen: (100.000 + 20.000)/2 · 0,08 = 4.800 €/a. Amortisation: 100.000 / 25.000 = 4 Jahre (Nachteil: Erträge danach und Zinsen bleiben unberücksichtigt). Rentabilität: 9.000 / 50.000 = 18 % (durchschnittliches Kapital = halbe Anschaffung).

### Kostenarten und Kostenbeeinflussung im Bild
#### Abschreibungsarten im Vergleich



- Leistungsabschreibung: $A=AK\cdot\frac{\text{Ist-Leistung}}{\text{Gesamtleistung}}$ (mit AK = Anschaffungskosten) – Beispiel: 15.000 € · 60.000 / 200.000 = 4.500 €. Sinnvoll bei stark schwankender Auslastung oder verschleißabhängiger Nutzung. Steuerlich ist die degressive Abschreibung nur zeitweise und begrenzt zulässig; in der Kalkulation zählt der tatsächliche Wertverzehr.

#### Mischkosten auflösen



#### Abgrenzungsrechnung



#### Kosten steuern: Target Costing, LCC, Wertanalyse



Wertanalyse: Funktionen eines bestehenden Produkts bestimmen, Funktionskosten ermitteln, Alternativen entwickeln (Werkstoff, Fertigung, Normteile) und bewerten – gleicher oder höherer Nutzen bei geringeren Kosten. Value Engineering setzt schon in der Entwicklung an. Gemeinkostenwertanalyse: Leistungen indirekter Bereiche erfassen, nach Kundennutzen bewerten, Einsparpotenziale (weglassen, vereinfachen, automatisieren) umsetzen. Zero-Base-Budgeting: Budget jedes Jahr neu begründen statt fortschreiben.

#### Plan- und Istkosten: Abweichungen

| Abweichung | Berechnung | Ursache / Verantwortung |
| Preisabweichung | (Istpreis − Planpreis) · Istmenge | Einkaufspreise → Einkauf |
| Mengenabweichung | (Istmenge − Planmenge) · Planpreis | Mehr-/Minderverbrauch → Fertigung |

Istkostenrechnung rechnet nachträglich mit tatsächlichen Kosten (schwankend), Normalkostenrechnung mit Durchschnittswerten der Vergangenheit, Plankostenrechnung mit Vorgabewerten bei geplanter Beschäftigung – sie vergleicht Soll mit Ist. Standardkostenrechnung: feste Standardwerte für Mengen und Preise, geeignet bei stabiler Fertigung mit wiederkehrenden Produkten.

Kosten senken: Material – Lieferanten vergleichen, Mengen bündeln, Rahmenverträge, Standardteile, weniger Ausschuss und Verschnitt, weniger Bestand. Gemeinkosten – Prozesse vereinfachen, Energie sparen, Instandhaltung planen, Leerlauf und Rüstzeiten verringern.

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

### Zeitwirtschaft und Kennzahlen im Bild
#### Aufbau der Auftragszeit nach REFA



- Sollzeit aus Leistungsgrad: $t_{soll}=t_{ist}\cdot LG$ (mit LG = Leistungsgrad (Normalleistung = 100 %); t_ist = beobachtete Zeit) – Wer schneller arbeitet (LG > 100 %), erhält eine längere Sollzeit – bezogen auf die Normalleistung.

| Aufnahmeverfahren | Prinzip |
| Zeitaufnahme | Messen mit Zeitnehmer (Einzel- oder Mehrfachmessung) |
| Multimomentaufnahme | Stichprobe von Zuständen → Anteile (Verteilzeiten, Auslastung) |
| MTM | System vorbestimmter Zeiten aus Grundbewegungen |
| Selbstaufschreibung, Schätzen | einfach, aber ungenau |

#### Produktivität, Durchlaufgrad, Termintreue



#### Ergonomische Richtwerte am Arbeitsplatz

| Faktor | Richtwert |
| Arbeitshöhe | an Körpergröße und Tätigkeit anpassen; Häufiges im Greifraum / Nahbereich |
| Beleuchtung | ca. 500 lx bei Büro und Feinarbeit, bei Feinmontage mehr |
| Raumtemperatur | ca. 20 °C bei leichter Arbeit; Zugluft vermeiden |
| Lärm | unter 85 dB(A); bei geistiger Arbeit deutlich darunter |
| Blendung | vermeiden |

### Aufbauorganisation, Stellen und Prozessdarstellung
#### Linie, Stab-Linie, Matrix



Die Leitungsspanne ist die Zahl der Mitarbeiter, die einer Führungskraft direkt unterstellt sind. Sie wächst bei Routineaufgaben, hoher Qualifikation, räumlicher Nähe, guten Hilfsmitteln und Standardisierung – in der Produktion sind daher größere Spannen möglich als in der Entwicklung.

#### Kongruenzprinzip



Wer verantwortlich ist, braucht auch die Befugnisse und Mittel; wem Entscheidungen übertragen werden, trägt die Verantwortung dafür. Verstöße führen zu Frust, Konflikten und Fehlern. Die Stellenbeschreibung hält fest: Bezeichnung, Einordnung (Vorgesetzter, Vertretung), Ziele und Aufgaben, Kompetenzen, Verantwortung, Anforderungen, Zusammenarbeit. Das Funktionendiagramm ordnet Aufgaben den Stellen zu (durchführen, entscheiden, mitwirken, informiert werden).

#### Ablauf darstellen: Swimlane-Diagramm



Weitere Notationen: Flussdiagramm (Start, Schritt, Entscheidung, Ende), EPK (Ereignisse und Funktionen im Wechsel), BPMN (standardisierte Notation für Geschäftsprozesse). Prozessdokumentation dient Schulung, Audit und Verbesserung.

### Ablauf- und Terminplanung im Bild
#### Das Dilemma der Ablaufplanung



Ähnlich stehen Termintreue und niedrige Bestände im Konflikt: Puffer sichern den Termin, kosten aber Kapital.

#### Prioritätsregeln

| Regel | Bedeutung | Wirkung |
| FIFO | First In First Out | fair, einfach |
| KOZ | kürzeste Operationszeit zuerst | senkt die mittlere Durchlaufzeit |
| SZ | kleinste Schlupfzeit (Zeitreserve) zuerst | verbessert Termintreue |
| EDD | frühester Liefertermin zuerst | Termintreue |
| LOZ | längste Operationszeit zuerst | gleichmäßige Auslastung |

Johnson-Regel (zwei Maschinen, gleiche Reihenfolge): Kleinsten Zeitwert aller Operationen suchen. Gehört er zur ersten Maschine, kommt der Auftrag nach vorn, sonst nach hinten; dann mit den übrigen Aufträgen wiederholen. Ergebnis: minimale Gesamtdurchlaufzeit.

#### Netzplan und kritischer Pfad



Verzögerung auf dem kritischen Pfad verschiebt das Projektende; Vorgänge mit Puffer dürfen sich um diese Zeit verspäten.

#### Termine verfolgen: Fortschrittszahlen



Rückmeldungen aus der Betriebsdatenerfassung (BDE) zeigen Abweichungen früh. Der Meister kann dann umplanen, Kapazität verschieben oder Eilaufträge einschieben. Typische Ursachen für Terminverzug: fehlendes Material, Maschinenausfall, Rüstzeiten, Nacharbeit, Krankheit, ungenaue Vorgabezeiten, Eilaufträge, Überlast, späte Rückmeldungen, fehlende Werkzeuge, Konstruktionsänderungen. Abhilfe: Pufferzeiten, Engpassplanung, schnelle Störungsbehebung.

#### Kapazität

- Auslastungsgrad: $\text{Auslastung}=\frac{\text{Belastung}}{\text{Kapazitätsangebot}}$ (mit Angebot = Anzahl Maschinen/Personen · Arbeitszeit · Nutzungsgrad; Belastung = Mengen · Vorgabezeit der Aufträge) – Über- oder Unterlast ausgleichen durch Überstunden, Schichten, Fremdvergabe oder Umplanung.

### Prognose, Programmplanung und Arbeitszeit
#### Von der Prognose zum Fertigungsauftrag



#### Prognoseverfahren

| Verfahren | Prinzip |
| Gleitender Durchschnitt | Mittel der letzten n Perioden; glättet Zufall |
| Exponentielle Glättung | Prognose = α · Ist + (1 − α) · alte Prognose; neuere Werte zählen mehr |
| Trend (lineare Regression) | Gerade durch die Vergangenheitswerte, fortgeschrieben |
| Saisonbereinigung | saisonale Schwankungen berücksichtigen |

Prognosen enthalten immer Fehler; Sicherheitsbestände decken sie ab.

#### Arbeitszeitflexibilisierung

| Modell | Merkmal |
| Gleitzeit mit Kernzeit | Beginn und Ende variabel, Anwesenheit in der Kernzeit |
| Arbeitszeitkonten | Zeitguthaben und -schulden ausgleichen |
| Schichtmodelle, Teilzeit, Jobsharing | Besetzung und Auslastung steuern |
| Vertrauensarbeitszeit, mobiles Arbeiten | Ergebnis zählt, nicht Anwesenheit |
| Bereitschaft, Rufbereitschaft | Erreichbarkeit außerhalb der Arbeitszeit |

Der Betriebsrat hat bei der Lage der Arbeitszeit Mitbestimmungsrechte; das Arbeitszeitgesetz begrenzt die Dauer.

### Materialwirtschaft im Bild: Bestellung, Bestand, Kanban
#### Bedarfsrechnung (MRP)



#### Bestellpunktverfahren



- Meldebestand: $M=\text{Tagesverbrauch}\cdot WBZ+\text{Sicherheitsbestand}$ (mit WBZ = Wiederbeschaffungszeit in Tagen) – Bestellpunktverfahren: feste Menge, variabler Zeitpunkt. Bestellrhythmusverfahren: feste Abstände, schwankende Menge.

- Optimale Bestellmenge (Andler): $x_{opt}=\sqrt{\frac{200\cdot B\cdot K_B}{P\cdot q}}$ (mit B = Jahresbedarf in Stück; K_B = Bestellkosten je Bestellung in €; P = Einstandspreis je Stück in €; q = Lagerhaltungskostensatz in %) – Beispiel: 10.000 Stück, 40 €, 5 €, 20 % → √(200·10.000·40/(5·20)) ≈ 894 Stück. Mehr Bestellkosten → größere Menge; mehr Preis oder Lagerkostensatz → kleinere Menge.

- Kanban-Karten: $n=\frac{\text{Tagesverbrauch}\cdot WBZ\cdot(1+s)}{\text{Behälterinhalt}}$ (mit s = Sicherheitszuschlag) – Beispiel: 480 Stück/Tag, 2 Tage, 10 %, 50 je Behälter → 480·2·1,1/50 = 21,1 ⇒ 22 Karten (aufrunden). Verbrauch löst Nachschub aus (Pull).

#### Lagerkennzahlen

| Kennzahl | Formel |
| durchschnittlicher Bestand | (Anfangsbestand + Endbestand) / 2 |
| Umschlagshäufigkeit | Jahresverbrauch / durchschnittlicher Bestand |
| durchschnittliche Lagerdauer | 360 Tage / Umschlagshäufigkeit |
| Servicegrad | termingerecht belieferte Anforderungen / Gesamtanforderungen |
| Kapitalbindung | Bestand · Einstandspreis |

#### Stücklisten, Inventur und Lagerformen

| Begriff | Merkmal |
| Mengenstückliste | alle Teile mit Gesamtmenge, keine Struktur |
| Strukturstückliste | Baugruppenhierarchie mit Mengen je Ebene |
| Baukastenstückliste | nur eine Ebene; Baugruppen haben eigene Listen |
| Stichtagsinventur | alle Bestände zu einem Stichtag, oft mit Stillstand |
| permanente Inventur | über das Jahr verteilt, z. B. Zählzyklen, ohne Stillstand |
| Festplatzlagerung | fester Platz je Artikel; übersichtlich, schlechte Flächennutzung |
| chaotische Lagerung | Platz wird per System zugewiesen; hohe Raumnutzung, Lagerverwaltungssystem nötig |
| VMI | Lieferant überwacht den Bestand des Kunden und füllt auf |
| Konsignationslager | Ware beim Kunden, bis zur Entnahme Eigentum des Lieferanten |

### Lean-Werkzeuge im Bild
#### Sieben (plus eine) Verschwendungsarten



#### Theory of Constraints und Drum-Buffer-Rope



#### 5S, Heijunka, Standardisierung



| Begriff | Kernaussage |
| Heijunka | Produktionsglättung: Menge und Mix gleichmäßig über die Zeit statt große Chargen – stabiler Takt, weniger Bestände |
| Standardarbeitsblatt | Reihenfolge, Zeit, Takt, Qualitätsmerkmale, Sicherheitshinweise, Standardbestand; Basis für PDCA/Kaizen und Einarbeitung |
| Kaizen-Event | kurzer (3–5 Tage) Verbesserungsworkshop am Arbeitsplatz mit schneller Umsetzung |
| A3-Report | ein Blatt A3: Problem, Analyse, Ziele, Maßnahmen, Ergebnis nach PDCA |
| Shopfloor Management | Führung vor Ort: Kennzahlen an der Tafel (Q, Liefertreue, Produktivität, Sicherheit), tägliche Runden, Maßnahmen verfolgen |

### Industrie 4.0, Informationssicherheit und Projektmanagement
Industrie 4.0: Vernetzung von Maschinen, Produkten und Menschen über das Internet der Dinge, Datenanalyse und Automatisierung. Cyber-physische Systeme verbinden Sensorik und Aktorik mit Software und Netzwerk. Typische Bausteine: Digitaler Zwilling, MES, selbststeuernde Fertigung.



Maßnahmen der Informationssicherheit: Berechtigungskonzept (Rollen und Rechte), Passwortregeln, getestete Datensicherung (Backup), Updates, Virenschutz, Schulung, Trennung von Produktions- und Büronetz.

Projekt: Phasen Definition, Planung, Durchführung (mit Steuerung), Abschluss mit Lessons Learned. Der Projektstrukturplan gliedert hierarchisch in Teilaufgaben und Arbeitspakete (Verantwortliche, Termine, Kosten). Risikomanagement: identifizieren, bewerten (Eintrittswahrscheinlichkeit · Auswirkung), Gegenmaßnahmen planen, überwachen und dokumentieren.

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

### Sicherheitszeichen und Brandschutz im Bild
#### Farben und Formen der Sicherheitszeichen



#### Brandklassen und Löschmittel

| Klasse | Brennstoff | Löschmittel | Hinweis |
| A | feste, glutbildende Stoffe | Wasser, Schaum, ABC-Pulver |  |
| B | flüssige Stoffe | Schaum, Pulver, CO₂ |  |
| C | Gase | Pulver; Gaszufuhr stoppen |  |
| D | Metalle | Metallbrandpulver | kein Wasser! |
| F | Speiseöle und -fette | Fettbrandlöscher | kein Wasser! |

CO₂ eignet sich für elektrische Anlagen, Wasser nicht. Der Arbeitgeber benennt Brandschutzhelfer (Richtwert rund 5 % der Beschäftigten), stellt geeignete Feuerlöscher bereit und lässt sie regelmäßig prüfen, erstellt Brandschutz- und Alarmordnung, unterweist die Beschäftigten und führt Räumungsübungen durch. Die Arbeitsstättenregel ASR A2.3 beschreibt Fluchtwege, Notausgänge, Flucht- und Rettungsplan (Mindestbreiten, maximale Fluchtweglängen, Kennzeichnung, Türen, Beleuchtung).

### Maschinen, Schutzeinrichtungen, Stapler und Leitern
#### Pflichten des Herstellers: Drei-Stufen-Methode



| Schutzeinrichtung | Beispiele | Prinzip |
| trennend | feste Verkleidung, bewegliche Schutztür mit Verriegelung | verhindert den Zugang |
| nicht trennend | Lichtvorhang, Laserscanner, Zweihandschaltung, Schaltmatte, Not-Halt | erkennt Personen oder sichert Handlungen |

Schutzeinrichtungen dürfen nicht umgangen oder manipuliert werden – auch nicht „nur kurz zum Einrichten“.

#### Gabelstapler und Flurförderzeuge

- Fahrer: Ausbildung, schriftliche Beauftragung, jährliche Unterweisung.
- Tägliche Sichtprüfung; Tragfähigkeit und Lastschwerpunkt beachten.
- Gabeln tief fahren; Last bergwärts; rückwärts bei Sichtbehinderung.
- Fahrwege kennzeichnen; Mitfahren verboten; Prüfung durch befähigte Person mindestens jährlich.

#### Leitern sicher benutzen



### Gefährdungsbeurteilung: Risikomatrix und STOP
#### Risikomatrix: Schwere × Wahrscheinlichkeit



#### STOP-Prinzip: Rangfolge der Schutzmaßnahmen



#### Psychische Belastung und Gesundheitsschutz

Psychische Belastung (Zeitdruck, Arbeitsmenge, Störungen, Monotonie, Konflikte, unklare Rollen) muss seit 2013 im Arbeitsschutzgesetz ausdrücklich beurteilt werden. Maßnahmen: Arbeitsgestaltung, Pausen, Information, Beteiligung der Beschäftigten. Betriebliches Eingliederungsmanagement (BEM): Wer innerhalb von zwölf Monaten länger als sechs Wochen ununterbrochen oder wiederholt arbeitsunfähig ist, dem muss der Arbeitgeber ein BEM anbieten; Teilnahme freiwillig, Betriebsrat (ggf. Betriebsarzt) beteiligt.

Mobbing und Konflikte: früh hinschauen und das Gespräch suchen, Vorfälle sachlich dokumentieren, beide Seiten anhören, Verhalten klar benennen, Betriebsrat, Personalabteilung oder Beratungsstellen einbinden, Betroffene schützen. Bildschirmarbeit: Pausen oder Mischarbeit, Bildschirm entspiegelt, Blickabstand ca. 50–70 cm, Oberkante etwa auf Augenhöhe, Sitz-/Tischhöhe einstellbar, Beleuchtung ohne Blendung, Angebot einer Augenuntersuchung.

### Gefahrstoffe: Kennzeichnung, Explosionsschutz, Lagerung
#### Etikett und Sicherheitsdatenblatt

| Angabe | Bedeutung |
| H-Sätze (Hazard) | beschreiben die Gefahr, z. B. „entzündbar“ |
| P-Sätze (Precaution) | Sicherheitshinweise zu Vorbeugung, Reaktion, Lagerung, Entsorgung |
| Betriebsanweisung | Stoffbezeichnung, Gefahren, Schutzmaßnahmen, Verhalten bei Gefahr, Erste Hilfe, Entsorgung – nach SDB, verständlich |
| Gefahrstoffverzeichnis | alle Gefahrstoffe: Bezeichnung, Einstufung, Mengenbereich, Arbeitsbereich, Verweis auf SDB; zugänglich halten |
| AGW | zeitlich gewichtete Konzentration in der Luft (meist 8 h), bei der keine Gesundheitsschäden zu erwarten sind; TRGS 900 |
| biologischer Grenzwert | Konzentration im Körper (Blut, Urin); TRGS 903 |

#### Explosionsschutz: drei Stufen



#### Atemschutz und Lagerung

| Thema | Merkmal |
| FFP1 – FFP3 | partikelfiltrierende Halbmasken; FFP2 ≥ 94 %, FFP3 ≥ 99 % Rückhaltevermögen; gegen Stäube und Aerosole, nicht gegen Gase (Gasfilter nötig); Tragezeitbegrenzung beachten |
| Zusammenlagerung | nach Lagerklassen getrennt (brennbare Flüssigkeiten nicht mit Oxidationsmitteln, Säuren nicht mit Laugen) |
| Behälter, Wanne | verschließbar, gekennzeichnet; Auffangwanne für wassergefährdende Flüssigkeiten |
| Arbeitsplatz | Tagesbedarf, Sicherheitsschrank, Lüftung, Zündquellen fernhalten, Zugang nur für Befugte |

Hautschutz bei Kühlschmierstoffen: Hautschutzplan (Schutz vor der Arbeit, milde Reinigung, Pflege danach), geeignete Handschuhe, Spritzschutz, Absaugung von Nebel, nasse Kleidung wechseln, arbeitsmedizinische Vorsorge anbieten.

### Lärm, Vibration, Heben und persönliche Schutzausrüstung
#### Lärm: Auslösewerte



| Belastung | Auslösewert | Grenzwert (A(8)) |
| Hand-Arm-Vibration | 2,5 m/s² | 5 m/s² |
| Ganzkörpervibration | 0,5 m/s² | 1,15 m/s² |

Maßnahmen: vibrationsarme Geräte, Wartung, kürzere Expositionszeiten und Pausen, Handschuhe, Sitzfederung, arbeitsmedizinische Vorsorge.

#### Manuelle Lastenhandhabung

Nach der Lastenhandhabungsverordnung sind schwere Lasten möglichst zu vermeiden (Hilfsmittel). Bleibt manuelle Handhabung nötig, wird das Risiko mit der Leitmerkmalmethode beurteilt: Lastgewicht, Haltung, Ausführungsbedingungen, Zeitdauer. Maßnahmen: Lasten verkleinern, Hebehilfen, Tätigkeitswechsel, Unterweisung in rückengerechtem Heben.

#### Persönliche Schutzausrüstung (PSA)



#### Arbeitszeit: Nachtarbeit

Nachtzeit: 23 bis 6 Uhr. Nachtarbeitnehmer arbeiten regelmäßig in Wechselschicht oder mindestens 48 Tage im Jahr nachts. Rechte: arbeitsmedizinische Untersuchung, Versetzung auf einen Tagesarbeitsplatz bei gesundheitlichen Bedenken, angemessener Ausgleich (Freizeit oder Zuschlag). Die Arbeitszeit darf im Schnitt acht Stunden nicht überschreiten.

### Arbeitsunfall, Anzeige und betriebliche Akteure
#### Wann ist ein Unfall anzuzeigen?



| Begriff | Merkmal |
| Wegeunfall | auf dem direkten Weg von/zur Arbeit versichert, private Umwege nicht |
| Leistungen der Unfallversicherung | Heilbehandlung, Reha, Verletztengeld, Renten, Hinterbliebenenleistung, Prävention; Haftungsprivileg: Arbeitgeber haftet nur bei Vorsatz |
| Berufskrankheit | in der BK-Verordnung gelistet (z. B. Lärmschwerhörigkeit, Hautkrankheiten, Asbestose); begründeter Verdacht muss gemeldet werden |
| 1000-Mann-Quote | meldepflichtige Unfälle je 1000 Beschäftigte |
| Schweregrad | Ausfalltage je Unfall |
| LTIR | Unfälle mit Ausfalltagen je 1 Mio. Arbeitsstunden |

#### Wer macht was im Arbeitsschutz?



#### Elektrische Betriebsmittel

| Größe | Bedeutung |
| IP54 | 1. Ziffer: Fremdkörper/Berührung (5 = staubgeschützt), 2. Ziffer: Wasser (4 = Spritzwasser aus allen Richtungen) |
| FI/RCD | vergleicht Hin- und Rückstrom, schaltet bei Fehlerstrom ab; Personenschutz höchstens 30 mA |
| Schutzklasse I | Basisisolierung + Gehäuse am Schutzleiter |
| Schutzklasse II | doppelte/verstärkte Isolierung, kein Schutzleiter |
| Schutzklasse III | Schutzkleinspannung (SELV) |

### Rechtsgrundlagen, Unterweisung, Umweltrecht und Managementsysteme
#### Rangfolge der Regeln



#### Unterweisung

Unterweisen: vor Aufnahme der Tätigkeit, bei Änderungen (neue Maschine, Verfahren, Gefahrstoff), nach Unfällen und danach regelmäßig, mindestens einmal jährlich (Jugendliche halbjährlich). Dokumentieren: Datum, Inhalt, Unterweisender, Teilnehmer mit Unterschrift. Sie muss verständlich und arbeitsplatzbezogen sein und in der Arbeitszeit stattfinden.

#### Umweltrecht und Umweltmanagement

| Thema | Kernaussage |
| Abfallschlüssel | sechsstellig nach Abfallverzeichnis-Verordnung; gefährliche Abfälle mit Stern (*) |
| Erzeugerpflicht | Erzeuger bleibt verantwortlich, wählt zugelassene Entsorger, führt Nachweise und Begleitscheine |
| BImSchG | Schutz vor Luftverunreinigung, Lärm, Erschütterungen, Licht, Strahlen; Genehmigung, Stand der Technik, Messungen, Betriebsbeauftragte |
| Ökobilanz | Ressourcenverbrauch und Emissionen über den Lebensweg; Ziele im Umweltprogramm |
| ISO 14001 | Umweltmanagementsystem (Umweltaspekte, Rechtskonformität, KVP) |
| ISO 45001 | Arbeitsschutzmanagement (Gefährdungen, Chancen/Risiken, Beteiligung) |

ISO 14001 und ISO 45001 folgen der High-Level-Structure und dem PDCA-Zyklus und sind zertifizierbar.

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

### Kündigung und Fristen im Bild
#### Kündigungsfristen für den Arbeitgeber (§ 622 BGB)



#### Kündigungsarten und Fristen im Überblick



#### Abmahnung und Zeugnis

| Thema | Kernaussage |
| Abmahnung | Bei verhaltensbedingten Pflichtverletzungen meist vor der Kündigung nötig: Verstoß konkret beschreiben (Datum, Ort, Hergang), vertragsgemäßes Verhalten fordern (Rüge), Konsequenzen androhen (Warnfunktion); zeitnah, in die Personalakte; Mitarbeiter kann Stellung nehmen |
| einfaches Zeugnis | Person, Dauer und Art der Tätigkeit |
| qualifiziertes Zeugnis | zusätzlich Leistung und Verhalten; wohlwollend, aber wahr und klar; keine Geheimcodes |
| Anspruch | bei Beendigung (§ 109 GewO); auf Wunsch auch Zwischenzeugnis |

### Arbeitsrecht kompakt: Verträge, Tarif, Urlaub, Mitbestimmung
| Thema | Regel |
| Weisungsrecht (§ 106 GewO) | Inhalt, Ort, Zeit der Arbeit nach billigem Ermessen im Rahmen von Gesetz, Tarifvertrag, Betriebsvereinbarung, Arbeitsvertrag; unzulässig bei Gesetzesverstoß oder Missachtung von Persönlichkeits- und Gesundheitsschutz |
| Befristung (TzBfG) | Schriftform; ohne Sachgrund bis 2 Jahre, höchstens dreimal verlängerbar, nur wenn zuvor kein Arbeitsverhältnis mit demselben Arbeitgeber bestand; mit Sachgrund (Vertretung, Projekt) länger; keine Schlechterbehandlung |
| Mindesturlaub | 24 Werktage bei 6-Tage-Woche = 20 Tage bei 5-Tage-Woche; Tarifverträge oft mehr |
| Krankheit | Entgeltfortzahlung bis 6 Wochen; unverzügliche Meldung; ärztlicher Nachweis ab dem 4. Tag (elektronisch) |
| AGG | verbietet Benachteiligung wegen ethnischer Herkunft, Geschlecht, Religion, Weltanschauung, Behinderung, Alter, sexueller Identität; Arbeitgeber: vorbeugen, Beschwerdestelle, einschreiten |
| DSGVO | Zweckbindung, Datenminimierung, Rechtsgrundlage (Vertrag, Gesetz, Einwilligung), Schutz, Löschung; Auskunfts-, Berichtigungs-, Löschrechte; der Meister gibt Personaldaten nicht unbefugt weiter |
| Kurzarbeit | vorübergehende Verkürzung bei erheblichem Arbeitsausfall; vertraglich/tariflich/betrieblich geregelt, Mitbestimmung; Kurzarbeitergeld rund 60 bzw. 67 % des Nettoentgeltausfalls; Anzeige beim Arbeitsamt |

#### Tarifvertrag und Betriebsvereinbarung



#### Mitbestimmung des Betriebsrats

| Norm | Gegenstand | Recht |
| § 87 BetrVG | soziale Angelegenheiten: Arbeitszeit, Pausen, Urlaubsgrundsätze, Verhaltensregeln, Überwachungstechnik, Entgeltgrundsätze | echte Mitbestimmung |
| § 99 BetrVG | Einstellung, Versetzung, Ein- und Umgruppierung | Zustimmung nötig; Verweigerung aus gesetzlichen Gründen |
| § 102 BetrVG | Kündigung | Anhörung vor jeder Kündigung; sonst unwirksam |

### Führungsmodelle im Bild
#### Kontinuum der Führungsstile (Tannenbaum/Schmidt)



#### 3-D-Modell nach Reddin



Kein Führungsstil ist an sich der beste: Der Integrator ist effektiv, der Kompromissler ineffektiv; der Verwalter wirkt im richtigen Umfeld, der Autokrat nicht.

| Modell | Aussage |
| Theorie X (McGregor) | Menschen arbeiten ungern und müssen kontrolliert und geführt werden → eher autoritär |
| Theorie Y (McGregor) | Menschen suchen Verantwortung, identifizieren sich mit Zielen und steuern sich selbst, wenn die Bedingungen stimmen → kooperativ |
| transaktional | Austausch: Leistung gegen Belohnung, klare Ziele, Kontrolle nach Abweichungen |
| transformational | Vision, Vorbild, individuelle Förderung, Sinn – über das Erwartete hinaus |
| Management by Exception | Eingriff nur bei Abweichung; entlastet, braucht klare Toleranzgrenzen; Gefahr: Gutes wird nicht gewürdigt |
| Management by Objectives | Zielvereinbarung: messbare (SMART) Ziele, Mitarbeiter wählt den Weg, Ergebnis wird besprochen; braucht Kompetenzen, Ressourcen, Rückmeldung, Vertrauen |
| Führen auf Distanz | Ergebnisse statt Anwesenheit, feste Kommunikationsrituale, Erreichbarkeitsregeln, Vertrauen; Arbeitszeit- und Datenschutz einhalten |
| Vielfalt / Generationen | Unterschiede anerkennen, Stärken nutzen (Mentoring), Vorurteile abbauen, einheitliche Regeln, AGG beachten |

#### Delegation: was ja, was nein



### Kommunikation und Gespräche im Bild
#### Vier-Seiten-Modell (Schulz von Thun)



Das einfache Sender-Empfänger-Modell beschreibt Codierung, Kanal und Decodierung mit möglichen Störungen. Watzlawick: „Man kann nicht nicht kommunizieren“ – jedes Verhalten, auch Schweigen, hat Mitteilungscharakter. Weitere Axiome: Inhalts- und Beziehungsaspekt, Interpunktion von Ereignisfolgen, digital und analog, symmetrisch und komplementär.

#### Johari-Fenster



#### Feedback und aktives Zuhören

| Thema | Regeln |
| Feedback | zeitnah und konkret; beschreibend statt wertend (Beobachtung – Wirkung – Wunsch); Ich-Botschaften; ausgewogen; nur zu änderbarem Verhalten; Kritik unter vier Augen; Empfänger darf nachfragen und entscheidet, was er annimmt |
| aktives Zuhören | volle Aufmerksamkeit, Blickkontakt, nicken, offene Fragen, Paraphrasieren, Gefühle verbalisieren, zusammenfassen, Pausen aushalten |

#### Kritikgespräch in Phasen



#### Zielvereinbarung: SMART



Rückkehr- oder Fehlzeitengespräch: persönlich Interesse zeigen, Hilfe anbieten, Arbeitsplatzbedingungen besprechen, keine Diagnosen verlangen (Datenschutz); bei häufigen Fehlzeiten Muster ansprechen, Unterstützung (BEM), klare Erwartungen und Folgen; vertraulich dokumentieren.

### Team, Besprechung und Zeitmanagement
#### Teamrollen nach Belbin



#### Eisenhower-Matrix



ALPEN-Methode: Aufgaben notieren, Länge schätzen, Pufferzeiten einplanen, Entscheidungen über Prioritäten treffen, Nachkontrolle. Dazu Pareto (80/20) und Zeitfresser-Analyse.

#### Besprechung und Entscheidung

| Thema | Merkmale |
| Besprechung wirksam leiten | Ziel und Agenda vorher klären, Teilnehmer auswählen, pünktlich beginnen und enden, Regeln und Redezeit, Ergebnisse visualisieren, Protokoll mit Maßnahme · Verantwortlicher · Termin, Nachverfolgung – nur treffen, wenn nötig |
| Entscheidungsmethoden | Konsens, Mehrheitsentscheid, Entscheid der Führungskraft nach Beratung, Nutzwertanalyse (Kriterien gewichten), Paarvergleich, Punktabfrage, Entscheidungsmatrix |
| Auswahl | nach Zeit, Tragweite, Akzeptanz: je wichtiger die Akzeptanz, desto mehr Beteiligung |

### Konflikte und Verhandeln im Bild
#### Eskalationsstufen nach Glasl



#### Konfliktstrategien nach Thomas-Kilmann



#### Mediation und Harvard-Konzept



### Motivation und Veränderung im Bild
#### Erwartungstheorie (Vroom)



#### Equity-Theorie (Adams)



Stress und Burnout früh erkennen: Warnzeichen sind Leistungsabfall, Rückzug, Gereiztheit, häufige Fehlzeiten. Maßnahmen: Gespräch suchen, Arbeitslast und Prioritäten klären, Pausen sichern, Unterstützung anbieten, Beratung und Betriebsarzt einbinden, Ursachen in der Arbeitsorganisation beseitigen. Eine Diagnose stellt der Meister nicht.

#### Veränderung nach Lewin und Kotter



Widerstände ernst nehmen: Ursachen verstehen (Angst um den Arbeitsplatz, Gewohnheit, fehlende Information), frühzeitig und ehrlich informieren, Betroffene beteiligen, Nutzen verdeutlichen, Qualifizierung anbieten, kleine Erfolge sichtbar machen.

- Personalkennzahlen: $FQ=\frac{\text{Abgänge (ohne Altersabgänge)}}{\text{Ø Personalbestand}}\cdot100\quad KQ=\frac{\text{Krankheits-Fehltage}}{\text{Soll-Arbeitstage}}\cdot100$ (mit FQ = Fluktuationsquote; KQ = Krankenquote (Soll-Arbeitstage = Tage · Mitarbeiter)) – Beide sind Frühindikatoren für Betriebsklima und Führungsqualität; hohe Werte erfordern eine Ursachenanalyse.

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

### Duale Ausbildung: Vertrag, Ausbilder, AEVO
#### Wer macht was in der dualen Ausbildung?



| Thema | Inhalt |
| Ausbildungsvertrag (BBiG) | schriftlich; Art, Ziel, sachliche und zeitliche Gliederung, Beginn und Dauer, Ausbildungsstätte, tägliche Arbeitszeit, Probezeit (1 bis 4 Monate), Vergütung, Urlaub, Kündigungsvoraussetzungen, Hinweise auf Tarifverträge/Betriebsvereinbarungen; Eintragung bei der IHK |
| Ausbilder | Eignung nach AEVO; plant nach Ausbildungsrahmenplan der Ausbildungsordnung, erstellt den betrieblichen Ausbildungsplan, vermittelt Fertigkeiten, kontrolliert das Berichtsheft, bereitet auf Prüfungen vor |
| Prüfungen | Zwischen-/Teil-1-Prüfung und Abschlussprüfung vor dem IHK-Prüfungsausschuss (Arbeitgeber-, Arbeitnehmer-, Berufsschulvertreter) |
| Pflichten Ausbildende | Ziel vermitteln, Ausbilder bestellen, Ausbildungsmittel kostenlos stellen, zu Berichtsheft und Berufsschulbesuch anhalten, nur ausbildungsgemäße Aufgaben, Zeugnis |
| Pflichten Auszubildende | lernen, Weisungen befolgen, Betriebsordnung beachten, Berufsschule besuchen, Berichtsheft führen, Stillschweigen wahren |

#### AEVO: vier Handlungsfelder



### Lernen und Unterweisen im Bild
#### Vier-Stufen-Methode



#### Lernkurve und Plateaus



Der Meister plant Wiederholungen und Übungsphasen ein, gibt Rückmeldung und ermutigt über Plateaus hinweg. Lerntypen (sehen, hören, lesen, handeln) gelten als wissenschaftlich schwach; praktisch sinnvoll: mehrere Sinne ansprechen (zeigen, erklären, selbst machen lassen) und Wiederholung einbauen.

| Lernhindernis | Gegenmaßnahme |
| mangelnde Motivation | klare Ziele und Nutzen |
| Über-/Unterforderung | passende Schrittgröße |
| Lärm, schlechte Umgebung | ruhige Umgebung |
| fehlendes Vorwissen | Hilfen, Wiederholung |
| Angst vor Fehlern | Fehlerkultur |
| Sprachbarrieren | einfache Sprache, Beteiligung der Lernenden |

#### Lernziele: von grob nach fein



| Lernzielbereich | Inhalt | Verben (Beispiele) |
| kognitiv | Wissen, Denken: kennen, verstehen, anwenden, analysieren, beurteilen | nennen, erklären, anwenden, bewerten |
| affektiv | Einstellungen und Werte | akzeptieren, vertreten |
| psychomotorisch | Fertigkeiten, Bewegungsabläufe | bedienen, montieren, einstellen |

#### Methoden und Unterweisungsplan

| Methode | Merkmal |
| Lehrvortrag | viel Stoff in kurzer Zeit, aber einseitig und wenig aktivierend |
| Lehrgespräch | Fragen beziehen Lernende ein; Verständnis und Beteiligung; mehr Zeit nötig |
| Leittextmethode | selbstständig mit Leitfragen: Informieren, Planen, Entscheiden, Ausführen, Kontrollieren, Bewerten |
| Lernzirkel | Stationenlernen in Gruppen |
| Planspiel | Simulation betrieblicher Entscheidungen |
| Fallstudie | Analyse eines Falls, übt Problemlösung und Entscheidung |
| Unterweisungsplan | Thema und Zielgruppe, Lernziele, Vorkenntnisse, Ablauf nach vier Stufen mit Zeiten, Methoden und Medien, Kontrollfragen, Dokumentation |

### Kompetenz, Beurteilung und Potenzial im Bild
#### Handlungskompetenz



E-Learning: zeit- und ortsunabhängig, wiederholbar, skalierbar – aber Selbstdisziplin nötig, ersetzt praktische Übung nicht. Blended Learning kombiniert Online-Phasen mit Präsenz, Übung am Arbeitsplatz und Betreuung.

#### Neun-Felder-Portfolio: Leistung und Potenzial



#### Beurteilungsfehler und Beurteilungsgespräch

| Fehler | Wirkung |
| Halo-/Hofeffekt | ein Merkmal überstrahlt alles |
| Tendenz zur Mitte | alle landen im Mittelfeld |
| Milde-/Strengefehler | zu gut oder zu schlecht |
| Recency-Effekt | letzte Ereignisse zählen mehr |
| Sympathie-/Ähnlichkeitsfehler | Ähnliche werden besser bewertet |

Gegenmaßnahmen: klare Kriterien, Beobachtungsprotokolle, Schulung der Beurteiler, mehrere Beurteiler. Beurteilungsgespräch: vorbereiten (Beobachtungen, Kriterien), Rahmen schaffen, Selbsteinschätzung erfragen, Beurteilung mit Beispielen begründen, Stärken und Entwicklungsfelder besprechen, Ziele und Maßnahmen vereinbaren (Förderplan), schriftlich festhalten, nachverfolgen.

#### Laufbahnen und Nachfolge



### Weiterbildung, Controlling und Entwicklungsplan
#### Wirkung messen: Kirkpatrick



Bildungscontrolling vergleicht Kosten und Nutzen und steuert die Auswahl der Maßnahmen. Lerntransfer sichern: Vorgesetzten einbinden, Anwendungsaufgaben direkt nach der Maßnahme, Zeit und Ressourcen für die Umsetzung, Nachgespräche, Mentoren, Erfolge sichtbar machen – ohne Transfer bleibt Weiterbildung wirkungslos.

#### Entwicklungsplan aufbauen



#### Förderung und Freistellung

| Instrument | Inhalt |
| Aufstiegs-BAföG | für Meister- und Fachwirtlehrgänge: Zuschuss und Darlehen |
| Bildungsgutschein | Arbeitsagentur |
| Qualifizierungschancengesetz | Förderung für Beschäftigte |
| Bildungsurlaub | nach Landesrecht, meist 5 Tage im Jahr |
| betriebliche Freistellung | Kostenübernahme, oft mit Rückzahlungsklauseln |

### Personalplanung, Recruiting und Wissen im Bild
#### Personalbedarf



| Planung | Frage |
| quantitativ | Wie viele Mitarbeiter? |
| qualitativ | Welche Qualifikation? |
| zeitlich | Wann und wie lange (Schichten, Arbeitszeit)? |
| örtlich | Wo werden sie eingesetzt? |

Die Einzelpläne ergeben die Personaleinsatzplanung; sie ist mit Produktions- und Kapazitätsplanung abzustimmen.

#### Einstellung und Einarbeitung



#### Wissensmanagement



#### Lernende Organisation nach Senge



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

### Qualität verstehen: Begriff, Kunde, Entwicklung der QM-Systeme
Qualität ist der Grad, in dem ein Satz inhärenter Merkmale eines Objekts Anforderungen erfüllt (DIN EN ISO 9000:2015). Inhärent heißt: dem Objekt innewohnend, ständig. Anforderungen sind ausdrücklich festgelegte oder üblicherweise vorausgesetzte Erwartungen, etwa aus Gesetzen, Normen, Verträgen, Lasten- und Pflichtenheften.

| Merkmalsart | Beispiele |
| physisch | mechanisch, elektrisch, chemisch, biologisch |
| sensorisch | Geruch, Berührung, Geschmack, Optik, Akustik |
| verhaltensbezogen | Höflichkeit, Ehrlichkeit, Entgegenkommen |
| zeitbezogen | Pünktlichkeit, Zuverlässigkeit, Verfügbarkeit |
| funktional | Geschwindigkeit, Belastbarkeit |



- Basis: selbstverständlich, nicht genannt, aber erwartet – Nichterfüllung führt zu großer Unzufriedenheit.
- Leistung: konkret genannt – je mehr erfüllt, desto zufriedener.
- Begeisterung: unerwartet – ihr Fehlen schadet nicht, ihr Vorhandensein begeistert.

#### Von der Kontrolle zum integrierten Managementsystem



#### Qualität und Wirtschaftlichkeit

| Kostenart | Inhalt | Wirkung |
| Fehlerverhütungskosten | Planung, Schulung, Wartung, FMEA | vorbeugend |
| Prüfkosten | Wareneingangs-, Zwischen-, Endprüfung, Prüfmittel | Fehler wird nicht vermieden, aber entdeckt |
| Fehlerkosten intern | Ausschuss, Nacharbeit, Selektion | vor Auslieferung |
| Fehlerkosten extern | Reklamation, Garantie, Rückruf, Schadensersatz, Imageverlust | nach Auslieferung – am teuersten |

Heute werden teils nur zwei Arten unterschieden: Konformitätskosten (Verhütung und Prüfung) und Nichtkonformitätskosten (Fehlerkosten). Merksatz: Qualität kostet Geld, fehlende Qualität kostet mehr. Das Zieldreieck lautet Qualität, Zeit, Kosten.

### ISO 9001, Prozessorientierung und Risiken
Die Normenfamilie DIN EN ISO 9000 ff. wird von der ISO erarbeitet, vom Europäischen Komitee für Normung als EN übernommen und vom DIN in das deutsche Normenwerk überführt. ISO 9000 erklärt Grundlagen und Begriffe, ISO 9001 enthält die Anforderungen und ist als einzige zertifizierbar, ISO 9004 ist ein Leitfaden zur Weiterentwicklung mit Empfehlungscharakter (z. B. Selbstbewertung des Reifegrads).

Kundenorientierung Führung Engagement von Personen prozessorientierter Ansatz Verbesserung faktengestützte Entscheidungsfindung Beziehungsmanagement (Lieferanten, Partner, Kunden, Investoren, Mitarbeiter, Gesellschaft)



- Ein QM-Handbuch ist nicht mehr gefordert; verlangt werden dokumentierte Informationen (Anwendungsbereich, Qualitätspolitik, Qualitätsziele, Nachweise).
- Kontext: interne und externe Themen sowie die Anforderungen interessierter Parteien (Kunden, Mitarbeiter, Lieferanten, Behörden) bestimmen den Anwendungsbereich.
- Die frühere Vorbeugemaßnahme ist im risikobasierten Denken aufgegangen: Risiken und Chancen werden schon in der Planung berücksichtigt. Bei Nichtkonformitäten: reagieren, Ursache bewerten, Korrekturmaßnahme, Wirksamkeit prüfen.

#### Prozess und Prozesslandkarte



Prozessorientierung heißt: Geschäftsprozesse kennen, gestalten und verbessern, Unterprozesse mit Rechten und Pflichten der Verantwortlichen abbilden, Abläufe dokumentieren, prozessorientiert kalkulieren und klare Schnittstellen festlegen. Die Prozesslandkarte zeigt Haupt- bzw. Kernprozesse (vom Kundenwunsch zur Lieferung), Führungs- und Unterstützungsprozesse mit ihren Wechselwirkungen und Verantwortlichen. Vorteile: Konzentration auf Wertschöpfung, Orientierung an Kennzahlen, höhere Effektivität, Einbeziehung der Mitarbeiter.

Risikomanagement: Risiko = Auswirkung von Ungewissheit, negativ (Risiko) oder positiv (Chance). Risiken werden identifiziert, bewertet (Bedeutung · Eintrittswahrscheinlichkeit, je 1–10, ähnlich der FMEA), priorisiert und mit Maßnahmen abgemildert.

### Audits: Arten, Ablauf und Lieferantenbewertung
Audit (lat. audire = hören): geplante, eigenständige Überprüfung, bei der der Sollzustand mit dem Istzustand verglichen wird. Es klärt, ob das QM-System wirksam ist und Normforderungen (z. B. ISO 9001) und eigene Regelungen umgesetzt sind. Abweichungen sind Nichtkonformitäten; es werden Maßnahmen mit Terminen vereinbart und nachverfolgt. Positive Feststellungen werden ebenfalls dokumentiert. Ziele: Genauigkeit und Zuverlässigkeit von Daten, Einhaltung von Vorschriften, Schwachstellen und Risiken erkennen, Effizienz steigern, Vertrauen bilden. Ein Audit ist eine Chance zur Verbesserung.

| Einteilung | Art | Merkmal |
| nach Beteiligten | First-Party-Audit | internes Audit durch geschulten Betriebsangehörigen; Vorbereitung auf externe Audits, Teil des KVP |
|  | Second-Party-Audit | Kunde auditiert Lieferanten (externes Audit), z. B. Lieferantenaudit |
|  | Third-Party-Audit | unabhängige Dritte, Zertifizierungsaudit |
| nach Anlass | Zertifizierungsaudit | Erlangen des Zertifikats |
|  | Überwachungsaudit | jährlich durch die Zertifizierungsstelle |
|  | Rezertifizierungsaudit | vor Ablauf des Zertifikats (meist 3 Jahre), wieder vollständige Auditierung |
|  | Nachaudit | nötig bei Abweichungen aus Überwachung oder Zertifizierung |
|  | Folgeaudit | nach Auditprogramm in festgelegten Abständen |
| nach Gegenstand | Systemaudit | Wirksamkeit des Managementsystems |
|  | Prozessaudit | Qualitätsfähigkeit spezieller Prozesse, meist Produktentstehung (Automobil: VDA 6.3) |
|  | Produktaudit | Produkt gegen Kundenvorgaben, Erwartungen, rechtliche Vorgaben |



Feststellungen: Konformität, Abweichung (Haupt- oder Nebenabweichung), Hinweis, Verbesserungspotenzial. Erstmusterprüfung (EMPB/PPAP) weist nach, dass der Lieferant mit Serienmitteln Teile fertigt, die alle Anforderungen erfüllen – erforderlich bei Erstlieferung und nach Änderungen an Produkt, Werkzeug, Verfahren oder Lieferort sowie nach längerer Unterbrechung.

Lieferanten bewerten: Kriterien Qualität (Fehlerquote in ppm), Termintreue, Preis, Service, Flexibilität, Reklamationsverhalten, Zertifikate, Auditergebnisse. Gewichtete Punktbewertung (Nutzwertanalyse) und Einstufung A (bevorzugt), B (bedingt), C (nicht mehr) mit Entwicklungsgesprächen und Maßnahmenplan.

### Statistik und Stichprobenprüfung
Statistik erfasst, wertet aus, analysiert, interpretiert und präsentiert Daten. Beschreibende (deskriptive) Statistik ordnet und stellt Daten dar und berechnet Kennwerte – dazu gehören die sieben Qualitätswerkzeuge. Beurteilende (analytische) Statistik schließt von Stichproben auf die Grundgesamtheit, prüft Hypothesen und schätzt Parameter.

| Begriff | Bedeutung |
| Grundgesamtheit | alle möglichen Objekte, über die eine Aussage getroffen werden soll |
| Stichprobe, Umfang n | begrenzte Teilmenge der Grundgesamtheit, n = ihre Größe |
| Merkmal | untersuchte Eigenschaft; quantitativ (mess-/zählbar: Maß, Gewicht) oder qualitativ (Farbe, Fehlerart) |
| Merkmalsausprägung | Werte, die ein Merkmal annehmen kann |
| Urliste | ursprüngliche, ungeordnete Aufzeichnung der Messwerte |

- Vorteile der Stichprobenprüfung: schneller, günstiger, sorgfältigere Prüfung der Einzelteile, zerstörende Prüfungen nur so möglich.
- Grenzen: Aussagen gelten für das ganze Los, nicht für einzelne Teile, und nur mit einer Wahrscheinlichkeit – Fehlentscheidungen sind möglich (Lieferantenrisiko: gutes Los wird abgelehnt, Abnehmerrisiko: schlechtes Los wird angenommen).
- Beispiel: Los von 50 Teilen mit 2 fehlerhaften (4 %): Mit n = 1 greift man nur mit 2:50 ein schlechtes Teil. Größere Stichprobe erhöht die Chance, schafft aber nie Sicherheit.
- Mahnung aus dem Zweiten Weltkrieg: Man untersuchte nur zurückgekehrte Flugzeuge – die Stichprobe war verzerrt (Überlebensfehler).



AQL (Acceptable Quality Limit/Level) legt den Fehleranteil fest, den der Abnehmer laut Stichprobenplan noch akzeptiert; überschreitet die Zahl fehlerhafter Teile in der Stichprobe die Annahmezahl, wird das Prüflos zurückgewiesen. Aus Losgröße und Prüfniveau ergibt sich ein Kennbuchstabe (Code Letter) und daraus der Stichprobenumfang. Prüfniveau I = kleiner Umfang (zuverlässige Lieferanten), II = Standard, III = großer Umfang (höchste Sicherheit, höhere Kosten).

| Fehlerschwere | Beispiel für AQL |
| Fehler mit schweren Schäden | 0 |
| Sicherheit/Leistungsfähigkeit betroffen | 0,065 |
| Funktionalität betroffen, kein Schaden | 0,4 |
| Schönheitsfehler (Kratzer) | 1 |

### Prozessfähigkeit, Normalverteilung und Six Sigma


- Potenzieller Prozessfähigkeitsindex (Streuung gegen Toleranz): $C_p=\frac{\text{OTG}-\text{UTG}}{6\cdot\sigma}$ (mit \text{OTG},\text{UTG} = obere und untere Toleranzgrenze; \sigma = Standardabweichung (s)) – Cp ignoriert die Lage des Mittelwerts.

- Kritischer Prozessfähigkeitsindex (Streuung und Lage): $C_{pk}=\frac{\Delta_\text{krit}}{3\cdot\sigma},\quad \Delta_\text{krit}=\min(\text{OTG}-\bar{x},\ \bar{x}-\text{UTG})$ (mit \bar{x} = Mittelwert der Stichprobe; \Delta_\text{krit} = kleinster Abstand des Mittelwerts zur Toleranzgrenze) – Cpk ≤ Cp; gleich, wenn der Prozess genau mittig liegt. Maschinenfähigkeit heißt Cm/Cmk, Berechnung identisch.

| Sigma bis zur Grenze | Cpk | Ausschuss | ppm |
| 1 | 0,33 | 32 % | 320.000 |
| 2 | 0,67 | 4,6 % | 46.000 |
| 3 | 1,00 | 0,27 % | 2.700 |
| 4 | 1,33 | 0,0063 % | 63 |
| 5 | 1,67 | 0,000057 % | 0,57 |
| 6 | 2,00 | 0,0000002 % | 0,002 |

|  | Maschinenfähigkeit (Cm, Cmk) | Prozessfähigkeit (Cp, Cpk) |
| Untersuchung | Kurzzeit: alle Einflüsse konstant (gleicher Mitarbeiter, gleiche Charge, möglichst konstante Umgebung), 50 aufeinanderfolgende Teile | Langzeit: wechselnde Bedingungen, Stichproben verteilt über etwa 20 Tage |
| Forderung (üblich) | ≥ 1,67 | ≥ 1,33 (je nach Kunde 1,67) |
| Zeitpunkt | Vorabnahme beim Hersteller | nach Installation beim Anwender |

|  | nicht fähig | fähig |
| nicht beherrscht | Ergebnisse unvorhersehbar und oft außerhalb der Toleranz | vorhersehbar? nein – Lage oder Streuung driften |
| beherrscht | vorhersehbar, aber zu viel Ausschuss: Lage verschoben (Justage hilft) oder Streuung zu groß | Ziel: vorhersehbar und innerhalb der Toleranz |

Natürliche Prozessgrenzen (Mittelwert ± 3σ) zeigen, was der Prozess tatsächlich leistet; Toleranzgrenzen gibt der Kunde vor. Fähig ist ein Prozess, wenn die natürlichen Grenzen sicher innerhalb der Toleranz liegen.

Six Sigma ist Qualitätsziel, Managementsystem und Methode zur systematischen Prozessoptimierung. Rechnerisch liegt die Toleranzgrenze sechs Standardabweichungen vom Mittelwert; mit der üblichen Prozessverschiebung von 1,5σ entspricht das höchstens 3,4 Fehlern je eine Million Möglichkeiten (DPMO). Projektablauf DMAIC: Define, Measure, Analyze, Improve, Control. Lean Six Sigma verbindet Verschwendungsabbau mit Streuungsreduzierung.

### Die sieben Qualitätswerkzeuge im Bild
Qualität ist messbar. Die sieben Werkzeuge (auf Kaoru Ishikawa zurückgehend) dienen der Fehlererfassung und der Fehleranalyse und gehören zur beschreibenden Statistik. Keines allein klärt Ursachen vollständig.









| Werkzeug | Zweck | Vorteil | Nachteil |
| Strichliste / Datensammelliste | Fehler und Häufigkeit erfassen | einfach, keine Schulung | unübersichtlich bei vielen Fehlerarten, keine Ursachenanalyse |
| Histogramm | Häufigkeitsverteilung von Messwerten | große Datenmengen übersichtlich | keine Ursachenanalyse, viele Daten nötig |
| Qualitätsregelkarte | Prozess über die Zeit beobachten | frühes Erkennen des Weglaufens | Schulung nötig, keine kurzfristigen Ergebnisse |
| Pareto-Diagramm | wichtige von unwichtigen Fehlern trennen | Prioritäten sofort sichtbar | zeigt nur Häufigkeit oder Kosten |
| Ablaufdiagramm | Prozessschritte, Entscheidungen darstellen | deckt überflüssige Schritte und Mehrfachprüfungen auf | Aufwand bei komplexen Prozessen |
| Korrelationsdiagramm | Zusammenhang zweier Merkmale | Art der Beziehung schnell sichtbar | Fehlinterpretation möglich, weitere Werkzeuge nötig |
| Ishikawa-Diagramm | Ursachen systematisch sammeln | Brainstorming findet auch versteckte Ursachen | zeitaufwändig, gefundene Ursache muss nicht die tatsächliche sein |

Boxplot: Die Box zeigt das mittlere Datenviertel zwischen unterem und oberem Quartil, die Linie darin den Median; Whisker reichen zu den äußeren Werten, Ausreißer werden einzeln markiert – gut zum Vergleich von Schichten oder Maschinen.

### Methoden: Poka-Yoke, Jidoka, 5-Why, 8D, Fehlerbaum
Poka-Yoke (japanisch: unbeabsichtigte Fehler vermeiden) verhindert Fehler durch technische Vorkehrungen im Prozess selbst, statt sie nachträglich zu prüfen. Eingriffsmethode (Abschaltmethode): beim Fehler stoppt Maschine oder Prozess sofort. Alarmmethode: optisches und/oder akustisches Signal. Beispiele: asymmetrische Stecker (USB), Bändel am Tankdeckel, Abreißsicherung am Tankschlauch, Kettenbremse bei Rückschlag, Montagevorrichtung passend zur Werkstückgeometrie, Drehmomentschrauber mit Steuerung, einheitliche Schrauben, farbliche Markierung.

| Methode | Kern |
| Jidoka | Automation mit menschlichem Verstand: Maschine stoppt selbst bei Fehlern, damit keine Fehler weitergegeben werden |
| Andon | Signalsystem (Lampe, Zugleine): Mitarbeiter melden Fehler und halten die Linie an |
| 5-Why | wiederholtes Fragen nach dem Warum, bis die systemische Grundursache gefunden ist: Maschine steht – Lager defekt – nicht geschmiert – Schmierplan fehlt – Wartung nicht definiert |
| Wertstromanalyse | Material- und Informationsfluss aufnehmen (Bestände, Zykluszeiten, Durchlaufzeit), Verschwendung erkennen, Soll-Zustand entwerfen |
| Net Promoter Score | Promoter (9–10) minus Detraktoren (0–6) in Prozent, −100 bis +100 |
| First Pass Yield | gute Teile im ersten Durchgang ÷ eingesetzte Teile; mehrere Schritte multiplizieren sich (Rolled Throughput Yield) |





Reklamation = vom Kunden geäußerte Unzufriedenheit mit Produkten, Services oder Prozessen, bei der eine Rückmeldung erwartet wird. Sie ist zugleich ein vom Kunden eingebrachter Verbesserungsansatz; professioneller Umgang stärkt die Kunden-Lieferanten-Beziehung. Das 8D-Verfahren hat den Charakter eines kleinen Projekts: Sofortmaßnahme (Eindämmung) trennt sich von der dauerhaften Abstellmaßnahme.

### Gewährleistung, Garantie und Produkthaftung
|  | Garantie | Gewährleistung (Sachmängelhaftung) | Produkthaftung |
| Grundlage | freiwillige, einseitige Erklärung | Kaufvertrag, BGB | Produkthaftungsgesetz und BGB |
| Voraussetzung | Garantieerklärung; gilt oft nur für Teilbereiche | tatsächlicher Mangel an der Sache | fehlerhaftes Produkt verursacht Schaden an Personen, Sachen, Vermögen |
| Verpflichteter | Garantiegeber | Verkäufer | Inverkehrbringer/Hersteller – verschuldensunabhängig (ProdHaftG) |
| Zweck | Vertrauen stärken | Anspruch des Käufers auf mangelfreie Ware | Schutz vor Schäden durch Produktfehler |



- Mangel: ungeeignet für gewöhnliche oder vereinbarte Verwendung, fehlt übliche Beschaffenheit, falsches Produkt oder zu geringe Menge geliefert.
- Ansprüche des Käufers: Nacherfüllung (Reparatur oder Ersatz), Kaufpreisminderung, Rücktritt, Schadensersatz.
- Produkthaftung (ProdHaftG): verschuldensunabhängig für Schäden an Leben, Körper und privatem Eigentum durch Konstruktions-, Fabrikations- und Instruktionsfehler; Produzentenhaftung (BGB) setzt Verschulden voraus.
- Sorgfaltspflichten des Herstellers: Konstruktions- und Entwicklungsverantwortung (Stand der Technik, FMEA), Produktionsverantwortung (frühzeitige Qualitätskontrolle), Instruktionsverantwortung (Warnhinweise, Anleitung), Produktbeobachtungsverantwortung (Warnung bis Rückruf).

Ein funktionierendes QM, Rückverfolgbarkeit und Dokumentation sind der beste Schutz gegen Haftungsansprüche.

### Planung, Lenkung, Verbesserung und Mitarbeiter
Damit Prozesse dauerhaft und reproduzierbar laufen, müssen sie geplant (Qualitätsplanung), gelenkt (Qualitätslenkung) und geprüft (Qualitätsprüfung) werden. Qualitätsplanung ist Bestandteil jeder Phase des Produktlebenszyklus (Design, Realisierung, Nutzung): Sie legt fest, wann, wie und anhand welcher Kriterien die Erfüllung der messbaren Anforderungen geprüft wird.



- Lenkung fehlerhafter Produkte: eindeutig identifizieren, Bearbeitungsstand kennen, Nichtkonformität feststellen, sperren, Ursache analysieren, Wiederholung verhindern.
- PDCA, Plan: Kernproblem, benötigte und vorhandene Ressourcen, bestgeeignete Lösung, Erfolgsbedingungen und Ziel. Do: Versuch durchführen. Check: Ergebnis beurteilen. Act: anpassen und standardisieren.
- Mitarbeiter einbinden: an der Festlegung der Qualitätsziele beteiligen, Ziele nachvollziehbar machen, Stand regelmäßig kommunizieren, Qualitätszirkel und betriebliches Vorschlagswesen nutzen, Rollen und Verantwortlichkeiten klären. Veränderungen werden besser akzeptiert, wenn offen informiert wird.
- Null-Fehler-Strategie: Fehler dürfen nicht von vornherein eingeplant werden, jeder Fehler ist eine Chance zur Verbesserung. Führung gestaltet Arbeitsverfahren so, dass fehlerfreie Arbeit möglich ist – ohne personenbezogene Schuldzuweisung.
- Messunsicherheit: Bereich, in dem der wahre Wert mit festgelegter Wahrscheinlichkeit liegt; beim Prüfen nahe der Toleranzgrenze zu berücksichtigen. Prüfmittel nach Kalibrierintervallen überwachen, kennzeichnen (Prüfplakette), überfällige sperren.

