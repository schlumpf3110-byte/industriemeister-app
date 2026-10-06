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
- MTBF = Betriebszeit / Anzahl Ausfälle
- mittlere Zeit zwischen Ausfällen – Maß für Zuverlässigkeit

- MTTR = Summe Reparaturzeiten / Anzahl Ausfälle
- mittlere Reparaturdauer – Maß für Instandhaltbarkeit

- Verfügbarkeit = MTBF / (MTBF + MTTR) · 100 %
- technische Verfügbarkeit

- OEE = Verfügbarkeit · Leistungsgrad · Qualitätsrate
- Gesamtanlageneffektivität, Weltklasse ≈ 85 %

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

- P = U · I (Gleichstrom),  P = √3 · U · I · cos φ (Drehstrom)
- elektrische Leistung

- η = P_ab / P_zu;  η_ges = η1 · η2 · η3 …
- Wirkungsgrad, Wirkungsgradkette

### Hebe- und Fördermittel, Anschlagen
- F_Strang = F_G / (n · cos β)
- β = Neigungswinkel zur Senkrechten; 3- und 4-Strang: rechnerisch höchstens 3 tragende Stränge (Tabellenwerte), bei unsymmetrischer Last oder ungleichen Stranglängen nur 2 tragende Stränge ansetzen

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
- n = vc · 1000 / (π · d)
- Drehzahl in 1/min (vc in m/min, d in mm)

- vf = f · n  bzw.  vf = fz · z · n
- Vorschubgeschwindigkeit in mm/min

- th = L · i / (n · f)  mit L = l + la + lu
- Hauptnutzungszeit Drehen; Fräsen: th = L · i / vf

- Fc = kc · A · C;  A = ap · f bzw. b · h
- Schnittkraft; kc = kc1.1 / h^mc

- Pc = Fc · vc;  P1 = Pc / η
- Schnittleistung (vc in m/s!) und Antriebsleistung

- Rth = f² / (8 · r)
- theoretische Rautiefe beim Drehen

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

- RPZ = B · A · E (1…1000)
- klassisch; heute Aufgabenpriorität AP hoch/mittel/niedrig nach AIAG/VDA

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

Skonto und Rabatt werden auf den Zielpreis bzw. Listenpreis bezogen – also durch (1 − Satz) teilen!

### Betriebsabrechnungsbogen (BAB)
Gemeinkosten auf Kostenstellen verteilen (Schlüssel: m², kWh, Köpfe) Allgemeine Kostenstellen und Hilfskostenstellen umlegen (innerbetriebliche Leistungsverrechnung) Zuschlagssätze bilden: Ist-Gemeinkosten / Zuschlagsgrundlage · 100 Normalgemeinkosten = Normalzuschlagssatz · Ist-Grundlage Über-/Unterdeckung = Normal − Ist

| Kostenstelle | Zuschlagsgrundlage |
| Material | Fertigungsmaterial |
| Fertigung | Fertigungslöhne (oder Maschinenstunden) |
| Verwaltung, Vertrieb | Herstellkosten des Umsatzes |

- HK d. U. = HK d. Erzeugung + Bestandsminderung − Bestandsmehrung
- Herstellkosten des Umsatzes

- Betriebsergebnis = Umsatzerlöse − Ist-Selbstkosten; Umsatzergebnis = Erlöse − Normal-Selbstkosten
- Betriebsergebnis = Umsatzergebnis + Überdeckung − Unterdeckung (Umsatzergebnis + Verrechnungsergebnis)

### Maschinenstundensatz
- kalk. Abschreibung = Wiederbeschaffungswert / Nutzungsdauer
- kalk. Zinsen = (AW / 2) · Zinssatz
- Raumkosten = m² · Miete/m² · 12
- Energiekosten = kW · Laufzeit · Preis/kWh
- Instandhaltung = % vom AW

- MSS = Maschinenkosten pro Jahr / Laufzeit pro Jahr
- Restgemeinkosten werden weiterhin über einen Zuschlag auf die Löhne verrechnet

### Deckungsbeitragsrechnung
- db = p − kv;  DB = db · x;  Ergebnis = DB − Kf
- Stück- und Gesamtdeckungsbeitrag

- Break-even x = Kf / db
- Gewinnschwelle (aufrunden)

- Kurzfristige Preisuntergrenze = kv (bei freier Kapazität)
- Langfristige Preisuntergrenze = Selbstkosten
- Engpass: Reihenfolge nach relativem DB = db / Engpasszeit
- Eigenfertigung oder Fremdbezug: variable Kosten vs. Bezugspreis

### Plankostenrechnung
- Sollkosten = Kf + kv · Ist-Beschäftigung
- flexible Plankostenrechnung

- verrechnete Plankosten = Plankostenverrechnungssatz · Ist-Beschäftigung
- 

- Verbrauchsabweichung = Istkosten − Sollkosten
- verantwortet der Kostenstellenleiter (Meister)

- Beschäftigungsabweichung = Sollkosten − verrechnete Plankosten
- Folge der Auslastung (Leerkosten)

### Prozesskostenrechnung
Gemeinkosten indirekter Bereiche (Einkauf, Logistik, AV) werden über Prozesse und Kostentreiber verursachungsgerecht verrechnet.

- lmi-Prozesse: abhängig von der Menge des Kostentreibers (Bestellungen, Rüstvorgänge)
- lmn-Prozesse: mengenunabhängig (Abteilung leiten) → Umlage auf lmi
- Prozesskostensatz = Prozesskosten / Prozessmenge
- Gesamtprozesskostensatz = lmi-Satz + Umlagesatz lmn

Effekte: Allokationseffekt (Kleinaufträge werden teurer), Degressionseffekt (Großaufträge günstiger), Komplexitätseffekt (Varianten werden teurer).

### Investitionsrechnung (statisch)
- A = (AK − RW) / n;  Z = (AK + RW) / 2 · i
- kalk. Abschreibung und Zinsen

- x_krit = (Kf1 − Kf2) / (kv2 − kv1)
- kritische Menge beim Kostenvergleich

- R = (Gewinn + Zinsen) / Ø Kapital · 100 %
- Rentabilität

- t = AK / (Gewinn + Abschreibung)
- Amortisationsdauer (Durchschnittsmethode)

Nichtmonetäre Kriterien (Ergonomie, Sicherheit, Flexibilität) werden mit der Nutzwertanalyse bewertet: Kriterien gewichten, Erfüllungsgrad bewerten, Nutzwerte summieren.

## Planungs-, Steuerungs- & Kommunikationssysteme

### Zeitwirtschaft nach REFA
- T = tr + ta;  ta = m · te
- Auftragszeit

- te = tg + ter + tv
- Zeit je Einheit: Grundzeit, Erholungszeit, Verteilzeit

- Zeitgrad = Vorgabezeit / Istzeit · 100 %
- Leistungsgrad: beobachtete zu Bezugsleistung

Zeitermittlung: Zeitaufnahme (Stoppuhr), MTM (Systeme vorbestimmter Zeiten), Multimomentaufnahme, Schätzen/Vergleichen, Planzeiten.

### Durchlaufzeit und Terminplanung
- DLZ = Rüstzeit + Bearbeitungszeit + Transportzeit + Liegezeit
- Übergangszeiten machen oft > 80 % aus

- Vorwärtsterminierung: ab Starttermin, ergibt frühesten Endtermin
- Rückwärtsterminierung: ab Liefertermin, ergibt spätesten Starttermin
- Netzplan (Vorgangsknoten): FAZ, FEZ, SAZ, SEZ; Puffer = SAZ − FAZ; kritischer Weg = Puffer 0
- Belegungsplan/Gantt: Maschinenbelegung, Liegezeiten sichtbar
- Verkürzen: überlappende Fertigung, Splitten, Losgrößen senken, Rüstzeit senken (SMED)

### Materialwirtschaft
- Meldebestand = Tagesverbrauch · Wiederbeschaffungszeit + Sicherheitsbestand
- 

- Ø Bestand = (AB + 12 Monatsendbestände) / 13  bzw. (AB + EB) / 2
- 

- Umschlagshäufigkeit = Verbrauch / Ø Bestand;  Lagerdauer = 360 / UH
- 

- optimale Bestellmenge (Andler) = √(200 · Jahresbedarf · Bestellkosten / (Einstandspreis · Lagerhaltungskostensatz))
- 

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
- Personalbedarf = Arbeitszeitbedarf / (verfügbare Zeit je MA · Anwesenheitsfaktor)
- Anwesenheit = Gesundheitsquote − Urlaubsquote

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
- Cp = (OGW − UGW) / 6σ
- Prozessfähigkeit (nur Streuung)

- Cpk = min(OGW − x̄; x̄ − UGW) / 3σ
- berücksichtigt die Lage; fähig ab 1,33

- Cm, Cmk
- Maschinenfähigkeit (Kurzzeit), meist ≥ 1,67

- Eingriffssignale: Wert außerhalb der Eingriffsgrenze, Run (7 Werte einer Seite), Trend (7 steigend/fallend), Middle Third verletzt
- Prüfmittelfähigkeit (MSA), Prüfmittelüberwachung und Kalibrierung

### Qualitätskennzahlen und Kosten
- Ausschussquote, ppm (Fehler je Million), First Pass Yield, Reklamationsquote, Nacharbeitsquote
- Qualitätskosten: Fehlerverhütungskosten, Prüfkosten, interne und externe Fehlerkosten
- Zehnerregel: Fehlerkosten steigen von Phase zu Phase um den Faktor 10

### Rückverfolgbarkeit und Lenkung
- Rückverfolgbarkeit: Seriennummer, Material-Charge, Lieferant, Maschine, Werkzeug, Datum/Schicht, Mitarbeiter, Prüfergebnisse
- Produktionslenkungsplan (Control Plan): Prozessschritt, Merkmal, Spezifikation, Prüfmethode, Stichprobe, Häufigkeit, Reaktionsplan
- Poka-Yoke: Fehlhandlungen technisch unmöglich machen

