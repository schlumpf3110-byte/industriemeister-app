// Übersicht der HQ-Metall-Prüfungen 2020–2025 – Aufgaben mit eigenen Kurztiteln (keine Originaltexte)
// t = Thema, q = Qualifikationsschwerpunkt, c = passender Rechenaufgaben-Typ, o = passende Situationsaufgabe
const EXAMS=[
{id:'2025F',j:2025,s:'Frühjahr',firma:'Spritzgussmaschinenbau',T:[
 {t:'Lasten- und Pflichtenheft',q:'BT',o:'bt1'},{t:'Oberfläche einer Förderschnecke',q:'FT',o:'ft6'},{t:'Kühlwasserstrom und Förderhöhe der Pumpe',q:'BT',c:'c_pumpe'},{t:'Virtuelles Maschinentagebuch',q:'BT',o:'bt3'},
 {t:'Hydraulische Hubzylinder für schwerere Maschine',q:'BT',c:'c_hydr'},{t:'Hubarbeitsbühne: Arbeitsschutz und Bediener',q:'AUG',o:'bt6'},{t:'Regelpumpe vs. Servopumpe: Energiekosten',q:'BT',c:'c_energiekosten'},{t:'Additiv vs. subtraktiv fertigen',q:'FT',o:'ft3'},
 {t:'Digitaler Montageplan mit Prüfschritten',q:'MT',o:'mt1'},{t:'KVP und PDCA-Zyklus',q:'QM',o:'qm3'},{t:'Materialbereitstellung in der Montage',q:'MT',o:'mt2'},{t:'Probleme einer Projektgruppe',q:'PF',o:'pf6'}],
 O:[{t:'Bewegungsgestaltung am Montageplatz',q:'MT',o:'mt6'},{t:'Listenverkaufspreis kalkulieren, Beschäftigungsgrad',q:'KW',c:'c_zuschlag',o:'kw1'},{t:'Netzdiagramm Antriebsarten',q:'QM'},{t:'Kostenvergleich zweier Krananlagen',q:'KW',c:'c_kostenvgl'},
 {t:'Kranfahrt: Transporthöhe prüfen',q:'MT',c:'c_kran'},{t:'Kollaborierende Roboter, Schutzeinrichtungen',q:'MT',o:'mt5'},{t:'Sofortmaßnahmen nach Schadstoffaustritt',q:'AUG',o:'aug1'},{t:'Unterweisung von Auszubildenden',q:'AUG',o:'aug3'},
 {t:'Rückverfolgbarkeit bei Reklamationen',q:'QM',o:'qm2'},{t:'Leistungsfähigkeit und Leistungsbereitschaft',q:'PF',o:'pf5'},{t:'Gruppengespräche und Protokoll',q:'PF'},{t:'Projektgruppe konfliktfrei auflösen',q:'PF',o:'pf4'}]},
{id:'2024H',j:2024,s:'Herbst',firma:'Aluminium-Plattenhersteller',T:[
 {t:'Minimalmengenschmierung vs. Nassbearbeitung',q:'FT',o:'ft1'},{t:'Glühofen: Gas vs. Photovoltaik – Energiekosten',q:'BT',c:'c_energiekosten'},{t:'Klemmkraft eines Scherengreifers',q:'MT',c:'c_reibung'},{t:'Condition Monitoring einer Säge',q:'BT',o:'bt4'},
 {t:'Sicherer Umgang mit Sägebändern',q:'AUG'},{t:'Vakuum-Hebeanlage: Anzahl der Sauger',q:'MT',c:'c_vakuum'},{t:'Nettobedarf mit Materialverlusten',q:'PS',c:'c_nettobedarf'},{t:'FMEA für die Kommissionierung',q:'MT',o:'mt3'},
 {t:'Industrieroboter auswählen, Sicherheit',q:'FT',o:'ft5'},{t:'Zeitmanagement und Delegationsgespräch',q:'PF',o:'pf1'},{t:'Transfergespräch nach Weiterbildung',q:'PE',o:'pe1'}],
 O:[{t:'Personalbedarf und Zeitgrad',q:'PS',c:'c_personal'},{t:'BAB: Zuschlagssätze, Über-/Unterdeckung, Betriebsergebnis',q:'KW',c:'c_bab',o:'kw6'},{t:'Herstellkosten über mehrere Fertigungsstufen',q:'KW'},{t:'Netzplan und kritischer Weg',q:'PS',c:'c_netzplan'},
 {t:'MES und Automatisierungspyramide',q:'PS',o:'ps1'},{t:'Verwaltungsabläufe optimieren',q:'PS',o:'ps4'},{t:'Antriebsleistung und Hauptnutzungszeit Planfräsen',q:'FT',c:'c_fraesleistung'},{t:'Gefährdungsbeurteilung am Ladetor (Nohl)',q:'AUG',o:'aug2'},
 {t:'Qualitäts-KPI und Lessons Learned',q:'QM',o:'qm4'},{t:'Verbesserungsvorschlag ablehnen',q:'PF',o:'pf8'}]},
{id:'2024F',j:2024,s:'Frühjahr',firma:'Hersteller von Asphaltfräsen',T:[
 {t:'Schweißverfahren MAG und UP',q:'FT',o:'ft2'},{t:'Zahnrad als Schweißkonstruktion, Arbeitsplan',q:'FT',o:'ft8'},{t:'Wirkungsgrad des Dieselantriebs',q:'BT',c:'c_antrieb'},{t:'Brennschneidzeit eines Auftrags',q:'FT',c:'c_schneiden'},
 {t:'Kapitalrentabilität einer Laserschneidanlage',q:'KW',c:'c_amort'},{t:'Filtration im Hydrauliksystem',q:'BT'},{t:'Seilkräfte beim Synchronhub',q:'MT',c:'c_seil',o:'bt7'},{t:'Lean Management mit Mitarbeitern',q:'PS',o:'ps3'},
 {t:'Agiles Führen im Alltag',q:'PF',o:'pf3'},{t:'Potenzialeinschätzung für Vorarbeiter',q:'PE',o:'pe2'}],
 O:[{t:'Digitale Montagepläne im Mitarbeiterinformationssystem',q:'MT',o:'mt1'},{t:'Lagerbestand und Umschlagshäufigkeit',q:'PS',c:'c_lager'},{t:'Äquivalenzziffernkalkulation',q:'KW',c:'c_aequivalenz'},{t:'Entsorgung ölhaltiger Putzlappen',q:'AUG',o:'aug4'},
 {t:'Stapler und Regale in der Montage',q:'AUG'},{t:'Tragfähigkeit einer Schweißnaht',q:'MT',c:'c_schweiss'},{t:'Digitale Unterweisungen',q:'AUG',o:'ps6'},{t:'Produktionslenkungsplan für Schraubfälle',q:'QM',o:'qm6'},
 {t:'Wissensweitergabe im MIS',q:'PE',o:'pe3'},{t:'Interkulturelle Kompetenz im Team',q:'PE',o:'pe5'}]},
{id:'2023H',j:2023,s:'Herbst',firma:'Verkehrsbetrieb (Stadtbahn-Instandhaltung)',T:[
 {t:'Instandhaltung hydraulischer Bremsen',q:'BT',o:'bt2'},{t:'Ersatzteillager organisieren',q:'PS',o:'ps2'},{t:'Pneumatikzylinder im Versuchsaufbau',q:'BT',c:'c_pneu'},{t:'Zustands- und Störungsüberwachung der Flotte',q:'BT',o:'bt4'},
 {t:'Lastenhandhabungsverordnung',q:'AUG'},{t:'Hebeanlage: Antriebsleistung',q:'BT',c:'c_flaschenzug'},{t:'Maschinenstundensatz Profildrehmaschine',q:'KW',c:'c_msh'},{t:'Kommunikationsfähige Werkzeuge',q:'PS'},
 {t:'Personalbedarfsplanung (Forecast)',q:'PF'},{t:'Nachwuchskräfte gewinnen',q:'PE'}],
 O:[{t:'Einarbeitung an neuer CNC-Maschine',q:'PE',o:'pe4'},{t:'Auftrag fremdvergeben – Kostenvergleich',q:'KW',c:'c_makebuy',o:'kw4'},{t:'Ausgebaute Ersatzteile einlagern (ABC)',q:'PS',c:'c_abc'},{t:'Rollenflaschenzug: Zugkraft',q:'BT',c:'c_flaschenzug'},
 {t:'Kapazität für Zusatzauftrag',q:'PS',c:'c_kapazitaet'},{t:'Auftragszeit nach REFA',q:'PS',c:'c_auftragszeit'},{t:'Budget mit Variator',q:'KW',c:'c_variator'},{t:'Pneumatik: Energie sparen',q:'BT',o:'bt5'},
 {t:'Laufbahnplan für Auszubildende',q:'PE'},{t:'Schulungserfolg auswerten',q:'QM'}]},
{id:'2023F',j:2023,s:'Frühjahr',firma:'Hersteller von Bootsantrieben',T:[
 {t:'One-Piece-Flow / Supply Chain',q:'PS',o:'ps5'},{t:'E-Antrieb: Geschwindigkeit und Strom',q:'BT',c:'c_eantrieb'},{t:'Schwachstelle Welle, Schnittdaten, Eckenradius',q:'FT',c:'c_rautiefe',o:'ft7'},{t:'Unternehmensprozesse digitalisieren',q:'PS'},
 {t:'7 Qualitätswerkzeuge auswählen',q:'QM',o:'qm1'},{t:'Akku vs. Benzin: Laufzeit, Gewicht, Ladezeit',q:'BT',c:'c_eantrieb'},{t:'Unfallanzeige analysieren',q:'AUG',o:'aug5'},{t:'Pneumatik: Stanzkraft und Steuerung',q:'BT',c:'c_pneu_feder'},
 {t:'Implizites Wissen sichern',q:'PE',o:'pe3'},{t:'Neues Führungsverhalten, Unruhe im Team',q:'PF',o:'pf7'}],
 O:[{t:'STOP-Prinzip nach Pflichtenübertragung',q:'AUG',o:'aug1'},{t:'Anforderungen an eine CNC-Maschine',q:'FT'},{t:'Kostenvergleich, Amortisation, kritische Auslastung',q:'KW',c:'c_kostenvgl',o:'kw5'},{t:'Break-even-Menge und Kundenrabatt',q:'KW',c:'c_breakeven'},
 {t:'Belegungsplan und Liegezeiten',q:'PS',c:'c_prio'},{t:'Abnahmeprotokoll einer Prüfanlage',q:'MT',o:'mt4'},{t:'TPM und autonome Instandhaltung',q:'BT',o:'bt2'},{t:'Explosionsschutz unterweisen',q:'AUG'},
 {t:'Führungsstil nach Mitarbeiterumfrage',q:'PF',o:'pf7'},{t:'Führungserfolg messen',q:'PF'}]},
{id:'2022H',j:2022,s:'Herbst',firma:'Pumpenhersteller (neue Produktionshalle)',T:[
 {t:'Energieeffizienz der neuen Halle',q:'BT',o:'bt5'},{t:'Reinraum-Monitoring',q:'BT'},{t:'Betriebsheizwert von Erdgas',q:'BT',c:'c_heizwert'},{t:'Hydraulikzylinder: Durchmesser und Hubzeit',q:'BT',c:'c_hydr'},
 {t:'Antriebsleistung beim Planfräsen',q:'FT',c:'c_fraesleistung'},{t:'Unterweisungen per Software/App',q:'AUG',o:'ps6'},{t:'Durchlaufzeit verkürzen',q:'PS',o:'ps5'},{t:'Personalbedarfsarten',q:'PF'},
 {t:'Wissen über alte Steuerungen erhalten',q:'PE',o:'pe3'}],
 O:[{t:'ABC-Analyse der Zukaufteile',q:'PS',c:'c_abc'},{t:'Dynamische Lagerhaltung',q:'PS'},{t:'Anzahl der Kanban-Behälter',q:'PS',c:'c_kanban'},{t:'Leistungsabstimmung in der Montage',q:'MT',c:'c_takt'},
 {t:'Gefährdungsbeurteilung und Erstunterweisung',q:'AUG',o:'ps6'},{t:'Plankostenverrechnungssatz',q:'KW',c:'c_plankosten'},{t:'Arbeitsplan Dreh-Fräszentrum',q:'FT',o:'ft8'},{t:'Lasermarkierung vs. RFID',q:'QM',o:'qm2'},
 {t:'Bewerbungsunterlagen auswerten',q:'PF'},{t:'Beurteilungsfehler vermeiden',q:'PE'}]},
{id:'2022F',j:2022,s:'Frühjahr',firma:'Sondermaschinenbau (Fügeanlage)',T:[
 {t:'Roboterbauarten vergleichen',q:'FT',o:'ft5'},{t:'Unterlagen und Schnittstellen zur Inbetriebnahme',q:'MT'},{t:'App für das Inbetriebnahmeprotokoll',q:'MT',o:'mt4'},{t:'Kamera-Koordinaten und Achsangaben',q:'FT',o:'ft4'},
 {t:'Betriebsbereitschaft und Abnahme',q:'MT',o:'mt4'},{t:'Gefährdungen beim Kunden',q:'AUG'},{t:'Arbeitsplan Zahnriemenwechsel',q:'BT'},{t:'Schadensanalyse Zahnriemen',q:'BT'},
 {t:'Kleine Instandhaltung durch den Kunden',q:'BT'},{t:'Wirtschaftlichkeit von Weiterbildung',q:'PE'}],
 O:[{t:'Schutzmaßnahmen Delta-Roboter',q:'AUG',o:'ft5'},{t:'Logistikkosten senken',q:'PS'},{t:'BAB und Betriebsergebnis',q:'KW',c:'c_bab'},{t:'Prozesskostenrechnung lmi/lmn',q:'KW',o:'kw2'},
 {t:'Wandel der Instandhaltung (Predictive)',q:'BT',o:'bt2'},{t:'Betriebsdaten zur Analyse',q:'PS'},{t:'Einarbeitung übernommener Azubis',q:'PE'},{t:'Kritikgespräch mit Teamleiter',q:'PF',o:'pf2'}]},
{id:'2021H',j:2021,s:'Herbst',firma:'Additive Fertigung (Fahrradteile)',T:[
 {t:'Additive Fertigung: Chancen',q:'FT',o:'ft3'},{t:'FMEA für die Serienfertigung',q:'MT',o:'mt3'},{t:'Umstellung auf Maschinenstundensatz',q:'KW',c:'c_msh'},{t:'Glasperlenstrahlen',q:'FT'},
 {t:'Scherung und Flächenpressung am Stift',q:'MT',c:'c_scher'},{t:'Inspektion nach DIN 31051',q:'BT',o:'bt2'},{t:'Nachbearbeitung: BAZ oder Fertigungszelle',q:'FT'},{t:'IT-Qualifizierung on/off the job',q:'PE',o:'pe4'},
 {t:'Transfererfolg messen',q:'PE',o:'pe1'}],
 O:[{t:'Gefährdungen durch Metallpulver',q:'AUG'},{t:'Betriebsanweisung Gefahrstoff',q:'AUG',o:'aug6'},{t:'Kalkulation eines Druckvorgangs',q:'KW',c:'c_msh'},{t:'Kapazitätsplanung Laseranlagen',q:'PS',c:'c_kapazitaet'},
 {t:'Kräfte am Hebel',q:'MT',c:'c_hebel'},{t:'Eigenspannungen nach dem Laserschmelzen',q:'FT'},{t:'CNC-Simulation: Zwecke',q:'FT'},{t:'Lastenheft für eine Cloud-Lösung',q:'PS',o:'bt1'},
 {t:'Personalentwicklungskonzept',q:'PE',o:'pe4'},{t:'Mitarbeiter ausleihen – Konflikt',q:'PF',o:'pf6'},{t:'Zertifizierungsaudit planen',q:'QM'}]},
{id:'2021F',j:2021,s:'Frühjahr',firma:'Hersteller von Schrankenanlagen',T:[
 {t:'Gesenkschmieden und Plasmanitrieren',q:'FT'},{t:'Getriebeübersetzung, Drehmoment, Motor',q:'BT',c:'c_antrieb'},{t:'Öffnungsgeschwindigkeit am Schrankenbaum',q:'BT',c:'c_umfang'},{t:'Antriebsleistung beim Bohren',q:'FT',c:'c_bohren'},
 {t:'Pufferlager und Bestandsveränderung',q:'PS'},{t:'MMS und Trockenbearbeitung',q:'FT',o:'ft1'},{t:'Lagerung von Gefahrstoffen',q:'AUG',o:'bt8'},{t:'Ishikawa-Diagramm',q:'QM',o:'qm1'},
 {t:'VR-Brillen: Unruhe im Team',q:'PF'}],
 O:[{t:'Personalbedarf, Mehrarbeit, Zeitgrad',q:'PS',c:'c_mehrarbeit'},{t:'Kostenvergleich Nass- vs. Minimalmengenschmierung',q:'KW',c:'c_kostenvgl'},{t:'Eigenfertigung oder Fremdbezug bei Engpass',q:'KW',c:'c_makebuy'},{t:'Serviceverträge mit Fernwartung',q:'BT'},
 {t:'Netzplan Digitalisierungsprojekt',q:'PS',c:'c_netzplan'},{t:'Selektives Lasersintern',q:'FT',o:'ft3'},{t:'Online-Bewerbertests',q:'PE'},{t:'Projektgruppe zusammenstellen',q:'PF'}]},
{id:'2020H',j:2020,s:'Herbst',firma:'Hersteller von Scherenhubgehängen',T:[
 {t:'Energie sparen: Pneumatik, Hydraulik, Elektro',q:'BT',o:'bt5'},{t:'Bewegungsablauf und v-t-Diagramm',q:'MT',c:'c_bewegung'},{t:'SPS statt verbindungsprogrammierter Steuerung',q:'BT'},{t:'Laserschneiden: Hauptnutzungszeit',q:'FT',c:'c_schneiden'},
 {t:'Sensoren für Condition Monitoring',q:'BT',o:'bt4'},{t:'Optimale Bestellmenge, Einsparpotenzial',q:'PS',c:'c_bestell'},{t:'Rückkehrgespräch nach Unfall',q:'PF',o:'aug5'},{t:'Mehrarbeit verteilen',q:'PS',c:'c_mehrarbeit'},
 {t:'Virtuelle Funktionsprüfung, Schulung',q:'PE'}],
 O:[{t:'Spartenorganisation umbauen',q:'PS'},{t:'Angebotskalkulation aus Vergleichsaufträgen',q:'KW',c:'c_zuschlag'},{t:'Investitionsvergleich Laserschneidanlagen',q:'KW',c:'c_kostenvgl'},{t:'CE-Konformität, Gefährdungen, FMEA',q:'QM',o:'mt3'},
 {t:'Zeitlohn, Akkord- und Prämienlohn',q:'PF',c:'c_akkord'},{t:'Schneidkraft und Schneidarbeit',q:'FT',c:'c_schneidkraft'},{t:'Ängste vor Digitalisierung',q:'PF'},{t:'Juniorfirma für Azubis',q:'PE'},
 {t:'After-Sales-Service, Kundenbeziehung',q:'QM'}]},
{id:'2020F',j:2020,s:'Frühjahr',firma:'Hersteller von Windenergieanlagen',T:[
 {t:'Matrixwerkstoff für Faserverbund',q:'FT'},{t:'Blattspitzengeschwindigkeit',q:'BT',c:'c_umfang'},{t:'Dehnschrauben: Wirkung und Vorspannkraft',q:'MT',c:'c_schraube'},{t:'Randschichthärten',q:'FT'},
 {t:'Hauptnutzungszeit Rundschleifen',q:'FT',c:'c_schleifen'},{t:'Prioritätsregeln LOZ und Liefertermin',q:'PS',c:'c_prio'},{t:'Gefahrstoffe bei der Montage',q:'AUG',o:'aug6'},{t:'Ferndiagnose, IT-Spezialist integrieren',q:'PF'},
 {t:'Einsatz von Fremdfirmen organisieren',q:'AUG'}],
 O:[{t:'Flexible Plankostenrechnung',q:'KW',c:'c_plankosten'},{t:'Bestellpunkt und optimale Bestellmenge',q:'PS',c:'c_bestell'},{t:'Hybridlager und Sintern',q:'FT'},{t:'5S-Methode einführen',q:'PS',o:'ps3'},
 {t:'Unfälle und Beinaheunfälle auswerten',q:'AUG'},{t:'Break-even-Umsatz',q:'KW',c:'c_beumsatz'},{t:'Mitarbeiter für das Versuchslabor einplanen',q:'PS'},{t:'Qualifizierung für mobile Endgeräte',q:'PE'},
 {t:'Fehler bei statistischer Auswertung',q:'QM',o:'qm7'},{t:'Sicherheitsfachkraft weiterqualifizieren',q:'PE'}]}
];
