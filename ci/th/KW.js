{const {t,ls,box,ln,ar,fa,rect,circ,path,fig}=TH2;
const sm='font-size:12px',xs='font-size:11px';
const pl=(pts)=>'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L');
const stk='stroke-width:2.6';
addTheory('KW',[
{t:'Break-even, Engpass und kritische Menge im Bild',b:[
 {h:'Break-even-Analyse'},
 fig(520,230,
  ar(50,195,500,195)+ar(50,195,50,14)+
  path('M50,155 L470,56','sk-l',`stroke:var(--bad);${stk}`)+
  path('M50,195 L470,30','sk-l',`stroke:var(--ok);${stk}`)+
  ln(50,155,500,155,'sk-dim')+t(410,170,'Fixkosten 60.000 €',{s:xs})+
  circ(302,96,5,'a')+ln(302,96,302,195,'sk-c')+ln(50,96,302,96,'sk-c')+
  t(302,210,'3.000 Stück',{s:xs})+t(44,100,'150.000 €',{a:'end',s:xs})+
  t(500,70,'Gesamtkosten',{a:'end',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--bad)"').replace('y="70"','y="76"')+
  t(480,24,'Erlös',{a:'end',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--ok)"')+
  t(410,50,'Gewinnzone',{s:xs,c:'acc'}).replace('y="50"','y="64"')+t(140,148,'Verlustzone',{s:xs,c:'acc'}).replace('x="140" y="148"','x="150" y="150"')+
  t(275,226,'Menge  →',{s:xs}),
  'Break-even bei 60.000 € Fixkosten, Preis 50 €, variablen Kosten 30 €: x = 60.000 / (50 − 30) = 3.000 Stück'),
 {fx:{n:'Break-even und Sicherheit',tex:'x_{BE}=\\frac{K_f}{p-k_v}\\quad SK=\\frac{x_{plan}-x_{BE}}{x_{plan}}\\cdot 100',leg:[['Kf','Fixkosten'],['p − kv','Stückdeckungsbeitrag'],['SK','Sicherheitskoeffizient in %']],e:'Beispiel: Plan 5.000 Stück, Break-even 3.000 → SK = 40 %: Der Absatz kann um 40 % sinken, bevor Verluste entstehen.'}},
 {h:'Engpass: Deckungsbeitrag je Engpasseinheit'},
 fig(520,125,
  box(4,14,248,60,['Produkt A: DB 20 €, 2 h','→ 10 € je Maschinenstunde'],{k:'b',s:sm})+
  box(268,14,248,60,['Produkt B: DB 12 €, 1 h','→ 12 € je Maschinenstunde'],{k:'g',s:sm})+
  t(260,98,'B hat Vorrang – obwohl der absolute DB kleiner ist',{s:xs,c:'acc'})+
  t(260,114,'Produziert wird in dieser Rangfolge, bis die Kapazität verbraucht ist',{s:xs}),
  'Bei Engpass zählt der Deckungsbeitrag je Engpasseinheit'),
 {tab:[['Preisuntergrenze','Höhe','Wann?'],
  ['kurzfristig','variable Stückkosten','freie Kapazität, vorübergehend – jeder Preis darüber deckt Fixkosten mit'],
  ['langfristig','Selbstkosten (Vollkosten)','auf Dauer müssen alle Kosten gedeckt werden, sonst Verlust']]},
 {h:'Eigenfertigung oder Fremdbezug: kritische Menge'},
 fig(520,205,
  ar(50,175,500,175)+ar(50,175,50,14)+
  path('M50,143 L450,66','sk-l',`stroke:var(--accent);${stk}`)+
  path('M50,175 L450,47','sk-l',`stroke:var(--blue);${stk}`)+
  circ(300,95,5,'a')+ln(300,95,300,175,'sk-c')+t(300,190,'5.000 Stück',{s:xs})+
  t(60,26,'Eigenfertigung: 20.000 € + 6 €/Stück',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--accent)"')+t(60,42,'Fremdbezug: 10 €/Stück',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--blue)"')+
  t(130,166,'Fremdbezug günstiger',{s:xs})+t(400,110,'Eigenfertigung',{s:xs})+t(400,123,'günstiger',{s:xs}),
  'Kritische Menge: x = 20.000 / (10 − 6) = 5.000 Stück'),
 {p:'Unter der kritischen Menge lohnt Fremdbezug, darüber Eigenfertigung. Zusätzlich Qualität, Liefersicherheit und Know-how bewerten.'},
 {h:'Fixkostendegression, sprungfixe Kosten, Leerkosten'},
 fig(520,190,
  ar(50,160,500,160)+ar(50,160,50,14)+
  path(pl([.1,.15,.2,.3,.4,.5,.6,.7,.8,.9,1].map(u=>[50+u*430,160-(30+6/u-20)*1.5])),'sk-l',`stroke:var(--bad);${stk}`)+
  ln(50,145,500,145,'sk-dim')+t(496,140,'variable Stückkosten',{a:'end',s:xs})+
  t(150,40,'Fixkosten je Stück sinken',{a:'start',s:xs})+t(150,54,'mit steigender Auslastung',{a:'start',s:xs})+
  t(275,180,'Auslastung / Menge  →',{s:xs})+
  ls(380,30,['Leerkosten =','Fixkosten · (1 − Beschäftigungsgrad)','120.000 € bei 75 % → 30.000 €'],{s:xs,lh:14}),
  'Stückkosten = variable Stückkosten + Fixkosten je Stück (Hyperbel)'),
 {tab:[['Begriff','Bedeutung'],
  ['sprungfixe Kosten','fix in einem Bereich, steigen stufenweise bei Erweiterung (z. B. zusätzliche Schicht)'],
  ['Leerkosten','Fixkosten für ungenutzte Kapazität'],
  ['mehrstufige DB-Rechnung','Erlös − variable Kosten = DB I; − Produktfixkosten = DB II; − Produktgruppenfixkosten = DB III; − Unternehmensfixkosten = Ergebnis']]}]},

{t:'Kalkulation im Bild: Zuschläge, Rückwärtsrechnung, Spanne',b:[
 {h:'Zuschlagskalkulation – das Schema'},
 fig(520,205,
  box(6,8,158,26,['Fertigungsmaterial (Einzelk.)'],{k:'b',s:xs})+t(176,25,'+',{s:sm})+box(188,8,160,26,['Materialgemeinkosten'],{k:'y',s:xs})+t(360,25,'=',{s:sm})+box(372,8,108,26,['Materialkosten'],{k:'g',s:xs})+
  box(6,44,158,26,['Fertigungslöhne (Einzelk.)'],{k:'b',s:xs})+t(176,61,'+',{s:sm})+box(188,44,160,26,['Fertigungsgemeinkosten'],{k:'y',s:xs})+t(360,61,'=',{s:sm})+box(372,44,108,26,['Fertigungskosten'],{k:'g',s:xs})+
  t(260,84,'(+ Sondereinzelkosten der Fertigung)',{s:xs})+
  box(6,94,158,26,['Materialkosten'],{k:'g',s:xs})+t(176,111,'+',{s:sm})+box(188,94,160,26,['Fertigungskosten'],{k:'g',s:xs})+t(360,111,'=',{s:sm})+box(372,94,108,26,['Herstellkosten'],{k:'a',s:xs})+
  box(6,130,110,26,['Herstellkosten'],{k:'a',s:xs})+t(126,147,'+',{s:sm})+box(136,130,116,26,['Verwaltungsgemk.'],{k:'y',s:xs})+t(262,147,'+',{s:sm})+box(272,130,106,26,['Vertriebsgemk.'],{k:'y',s:xs})+t(390,147,'=',{s:sm})+box(402,130,112,26,['Selbstkosten'],{k:'a',s:xs})+
  t(260,184,'Zuschlagssatz = Gemeinkosten / Zuschlagsgrundlage · 100  (z. B. 12.000 / 40.000 = 30 %)',{s:xs,c:'acc'}),
  'Selbstkosten = Herstellkosten + Verwaltungs- und Vertriebsgemeinkosten'),
 {tab:[['Verfahren','Prinzip','Einsatz'],
  ['Divisionskalkulation','Stückkosten = Gesamtkosten / Menge','Einproduktfertigung'],
  ['Äquivalenzziffern','Sorten werden mit Gewichtungsfaktoren in Recheneinheiten umgerechnet','ähnliche Sortenprodukte'],
  ['Zuschlagskalkulation','Gemeinkosten prozentual auf Einzelkosten','Mehrproduktfertigung, Einzelfertigung'],
  ['Bezugsgrößenkalkulation','Kostensätze je Bezugsgröße (Maschinenstunde, Rüstvorgang)','hoher Gemeinkostenanteil, automatisierte Fertigung']]},
 {tab:[['Zeitpunkt','Basis','Zweck'],['Vorkalkulation','Plan-/Normalkosten','Angebotspreis'],['mitlaufend','laufende Istwerte','Abweichungen früh erkennen'],['Nachkalkulation','Istkosten','Preis und Wirtschaftlichkeit prüfen, Datenbasis für künftige Kalkulation']]},
 {h:'Rückwärts- und Differenzkalkulation'},
 fig(520,175,
  `<rect x="30" y="20" width="110" height="110" class="sk-body" style="fill:color-mix(in srgb,var(--blue) 20%,var(--paper));stroke:var(--blue)"/>`+t(85,80,'1.000 €',{s:sm})+t(85,96,'Listenpreis',{s:xs})+
  `<rect x="170" y="38" width="110" height="92" class="sk-body" style="fill:color-mix(in srgb,var(--ok) 20%,var(--paper));stroke:var(--ok)"/>`+t(225,86,'900 €',{s:sm})+t(225,102,'Zielverkaufspreis',{s:xs})+
  `<rect x="310" y="42" width="110" height="88" class="sk-body" style="fill:color-mix(in srgb,var(--accent) 20%,var(--paper));stroke:var(--accent)"/>`+t(365,88,'882 €',{s:sm})+t(365,104,'bar (Skonto)',{s:xs})+
  fa(140,70,170,70)+fa(280,80,310,80)+t(155,62,'−10 %',{s:xs})+t(295,72,'−2 %',{s:xs})+
  ls(260,155,['danach Vertriebskosten, Verwaltungskosten und Gewinn abziehen','→ höchstzulässige Selbstkosten'],{s:xs,lh:14}),
  'Rückwärtskalkulation: vom Marktpreis zu den erlaubten Kosten'),
 {p:'Differenzkalkulation vergleicht den erreichbaren Preis mit den Selbstkosten und zeigt Gewinn oder Verlust.'},
 {h:'Handelsspanne und Kalkulationszuschlag'},
 fig(520,120,
  `<rect x="60" y="30" width="200" height="34" class="sk-body" style="fill:var(--soft);stroke:var(--ink)"/>`+t(160,52,'Einstandspreis 100 €',{s:xs})+
  `<rect x="260" y="30" width="100" height="34" class="sk-body" style="fill:color-mix(in srgb,var(--ok) 25%,var(--paper));stroke:var(--ok)"/>`+t(310,52,'Rohgewinn 50 €',{s:xs})+
  t(160,92,'Kalkulationszuschlag: 50 / 100 = 50 %',{s:xs,c:'acc'})+
  ln(60,26,360,26,'sk-c')+t(210,20,'Verkaufspreis 150 €',{s:xs})+
  t(310,108,'Handelsspanne: 50 / 150 = 33,3 %',{s:xs,c:'acc'}),
  'Gleicher Rohgewinn, andere Bezugsgröße'),
 {h:'Kostenstellen: Ist-, Normal-, Plan-Zuschlag'},
 {tab:[['Zuschlag','Basis','Folge'],
  ['Ist','tatsächliche Gemeinkosten des Zeitraums','schwankt, erst nachträglich'],
  ['Normal','Durchschnitt vergangener Perioden','stabile Zuschläge'],
  ['Plan','Planwerte','Vorgabe für Steuerung']]},
 {p:'Weichen verrechnete (Normal-)Gemeinkosten von den Ist-Gemeinkosten ab, entsteht Kostenüberdeckung (verrechnet mehr als angefallen) oder Kostenunterdeckung (weniger); sie wird im BAB ermittelt. Gegenseitige Leistungen von Hilfskostenstellen verrechnet das Gleichungsverfahren: Für jede Hilfsstelle wird ein Verrechnungspreis als Unbekannte angesetzt, das Gleichungssystem berücksichtigt die gegenseitige Belieferung – genauer als Anbau- und Treppenverfahren.'}]},

{t:'Lohn, Finanzierung und Bilanzkennzahlen im Bild',b:[
 {h:'Entgeltformen'},
 {tab:[['Form','Berechnung','Beispiel'],
  ['Zeitlohn','Stunden · Stundenlohn','160 h · 19,50 € = 3.120 €'],
  ['Akkordlohn','Vorgabezeit je Einheit · Menge · Minutenfaktor (Akkordrichtsatz/60)','4 min · 120 · 0,30 = 144 €'],
  ['Prämienlohn','Grundlohn + Prämie für Mehrleistung, Qualität, Einsparung','–']]},
 {p:'Mindestlohn und Garantielohn sind zu beachten. Personalkosten = Bruttolohn + Arbeitgeberanteile zur Sozialversicherung + weitere Lohnnebenkosten (Urlaubs-/Weihnachtsgeld, Betriebsrente). Der Stundensatz = Jahreskosten / produktive Stunden (Arbeitstage minus Urlaub, Feiertage, Krankheit, Schulung): z. B. 60.000 € / (1.704 h · 85 %) ≈ 41,43 €/h.'},
 {h:'Finanzierung'},
 {tab:[['Form','Merkmal'],
  ['Eigenfinanzierung','Einlagen, einbehaltene Gewinne; unabhängig von Gläubigern'],
  ['Fremdfinanzierung','Kredite, Anleihen mit Zins und Rückzahlung'],
  ['Leasing','Nutzung gegen Rate, Eigentum beim Leasinggeber; schont Liquidität, flexibel, meist teurer'],
  ['Mietkauf','Mietraten mit Option auf Eigentumserwerb']]},
 {fx:{n:'Effektiver Jahreszins bei Verzicht auf Skonto',tex:'i\\approx\\frac{s}{100-s}\\cdot\\frac{360}{Z-F}\\cdot 100',leg:[['s','Skonto in %'],['Z','Zahlungsziel in Tagen'],['F','Skontofrist in Tagen']],e:'Beispiel: 2 % bei 10 Tagen, Ziel 30 Tage: 2/98 · 360/20 = 36,7 % p. a. → meist teurer als ein Bankkredit, Skonto in der Regel ausnutzen.'}},
 {h:'Bilanzkennzahlen'},
 fig(520,225,
  `<rect x="30" y="20" width="190" height="100" class="sk-body" style="fill:color-mix(in srgb,var(--blue) 18%,var(--paper));stroke:var(--blue)"/>`+t(125,64,'Anlagevermögen',{s:xs})+t(125,80,'500',{s:sm})+
  `<rect x="30" y="120" width="190" height="100" class="sk-body" style="fill:color-mix(in srgb,var(--ok) 18%,var(--paper));stroke:var(--ok)"/>`+t(125,164,'Umlaufvermögen',{s:xs})+t(125,180,'500',{s:sm})+
  `<rect x="240" y="20" width="190" height="80" class="sk-body" style="fill:color-mix(in srgb,var(--accent) 18%,var(--paper));stroke:var(--accent)"/>`+t(335,54,'Eigenkapital',{s:xs})+t(335,70,'400',{s:sm})+
  `<rect x="240" y="100" width="190" height="120" class="sk-body" style="fill:color-mix(in srgb,var(--warn) 18%,var(--paper));stroke:var(--warn)"/>`+t(335,154,'Fremdkapital',{s:xs})+t(335,170,'600',{s:sm})+
  t(125,14,'Aktiva = 1.000',{s:xs,c:'acc'})+t(335,14,'Passiva = 1.000',{s:xs,c:'acc'})+
  ls(470,52,['EK-Quote','40 %'],{s:xs,lh:14})+ls(470,128,['Verschuldungs-','grad 150 %'],{s:xs,lh:14})+ls(470,196,['Anlagen-','deckung 80 %'],{s:xs,lh:14}),
  'Bilanz-Beispiel: Eigenkapitalquote = 400/1.000, Verschuldungsgrad = 600/400, Anlagendeckung = EK / Anlagevermögen = 400/500'),
 {tab:[['Kennzahl','Formel'],
  ['Liquidität 1. Grades','flüssige Mittel / kurzfristige Verbindlichkeiten'],
  ['Liquidität 2. Grades','(flüssige Mittel + Forderungen) / kurzfr. Verbindlichkeiten'],
  ['Liquidität 3. Grades','Umlaufvermögen / kurzfr. Verbindlichkeiten'],
  ['Working Capital','Umlaufvermögen − kurzfristiges Fremdkapital'],
  ['Eigenkapitalrentabilität','Gewinn / Eigenkapital · 100'],
  ['Gesamtkapitalrentabilität','(Gewinn + Fremdkapitalzinsen) / Gesamtkapital · 100'],
  ['Umsatzrentabilität','Gewinn / Umsatz · 100'],
  ['Cashflow','Jahresüberschuss + Abschreibungen + Rückstellungsbildung (Innenfinanzierungskraft)'],
  ['EBIT / EBITDA','Ergebnis vor Zinsen und Steuern / zusätzlich vor Abschreibungen']]},
 {p:'Goldene Bilanzregel: Langfristig gebundenes Vermögen langfristig finanzieren.'},
 fig(520,110,
  box(10,32,120,44,['ROI','10 %'],{k:'a',s:sm})+t(150,60,'=',{s:sm})+box(165,32,150,44,['Umsatzrendite','Gewinn / Umsatz = 5 %'],{k:'g',s:xs})+t(335,60,'·',{s:sm})+box(350,32,160,44,['Kapitalumschlag','Umsatz / Kapital = 2'],{k:'b',s:xs})+
  t(260,100,'DuPont-Schema: ROI = Umsatzrendite · Kapitalumschlag',{s:xs,c:'acc'}),
  'ROI nach DuPont'),
 {p:'Incoterms (ICC) regeln, wer Transport, Versicherung, Zoll und Gefahrenübergang trägt (EXW ab Werk, FCA, DAP, DDP) – und damit, welche Kosten in den Einstandspreis eingehen.'}]},

{t:'Investitionsrechnung im Bild: Barwert, Kapitalwert, Zinsfuß',b:[
 {fx:{n:'Auf- und Abzinsen',tex:'K_n=K_0\\cdot(1+i)^n\\quad K_0=\\frac{K_n}{(1+i)^n}',leg:[['i','Zinssatz'],['n','Jahre']],e:'10.000 € bei 5 % nach 3 Jahren = 11.576,25 €; 10.000 € in 3 Jahren sind heute 8.638,38 € wert (Barwert).'}},
 {h:'Kapitalwertmethode – Zahlungsstrahl'},
 fig(520,225,
  ar(30,100,505,100)+
  [0,1,2,3,4].map(i=>ln(70+i*100,94,70+i*100,106)+t(70+i*100,i===0?88:120,i===0?'heute':i+' Jahr'+(i>1?'e':''),{s:xs})).join('')+
  `<rect x="58" y="100" width="24" height="60" style="fill:color-mix(in srgb,var(--bad) 30%,var(--paper));stroke:var(--bad)"/>`+t(70,176,'−100.000',{s:xs,c:'acc'}).replace('x="70"','x="70"')+
  [1,2,3,4].map(i=>`<rect x="${58+i*100}" y="40" width="24" height="60" style="fill:color-mix(in srgb,var(--ok) 30%,var(--paper));stroke:var(--ok)"/>`+t(70+i*100,34,'+30.000',{s:xs})+t(70+i*100,140,'Barwert',{s:xs})+t(70+i*100,154,['27.778','25.720','23.815','22.051'][i-1],{s:xs,c:'acc'})).join('')+
  t(300,196,'Σ Barwerte = 99.364 € → Kapitalwert = 99.364 − 100.000 = − 636 €  (bei 8 %)',{s:xs})+
  t(260,214,'Kapitalwert > 0 vorteilhaft  ·  = 0 gleichwertig  ·  < 0 nicht vorteilhaft',{s:xs,c:'acc'}),
  'Kapitalwert: alle Zahlungen auf heute abzinsen'),
 {h:'Interner Zinsfuß'},
 fig(520,205,
  ar(40,100,500,100)+ar(40,185,40,12)+
  path(pl([[60,50],[160,77.8],[260,101.6],[360,122],[460,140]]),'sk-l',`stroke:var(--accent);${stk}`)+
  [[60,'0 %'],[160,'4 %'],[260,'8 %'],[360,'12 %'],[460,'16 %']].map(([x,l])=>t(x,116,l,{s:xs})).join('')+
  circ(252,100,5,'a')+t(300,84,'interner Zinsfuß ≈ 7,7 %',{s:xs,c:'acc'})+
  t(62,38,'+20.000 €',{s:xs,a:'start'})+t(400,164,'Kapitalwert negativ',{s:xs})+
  t(270,196,'Kalkulationszinssatz  →',{s:xs})+t(14,100,'Kapitalwert',{s:xs}).replace('x="14" y="100"','x="14" y="100" transform="rotate(-90 14 100)"'),
  'Kapitalwertkurve des Beispiels: Der Zinssatz, bei dem sie die Nulllinie schneidet, ist der interne Zinsfuß'),
 {p:'Liegt der interne Zinsfuß über dem geforderten Kalkulationszinssatz, ist die Investition vorteilhaft. Er wird iterativ oder durch Interpolation bestimmt.'},
 {fx:{n:'Annuität',tex:'A=K\\cdot\\frac{i\\,(1+i)^n}{(1+i)^n-1}',leg:[['K','Anschaffungsauszahlung'],['i','Kalkulationszins'],['n','Nutzungsjahre']],e:'Beispiel: 100.000 € über 4 Jahre bei 8 % → ca. 30.192 € je Jahr. Ist der jährliche Überschuss größer, lohnt die Investition.'}},
 {h:'Statisch oder dynamisch?'},
 {tab:[['','Statisch','Dynamisch'],
  ['Verfahren','Kosten-, Gewinn-, Rentabilitätsvergleich, Amortisation','Kapitalwert, interner Zinsfuß, Annuität'],
  ['Rechnet mit','Durchschnittswerten eines Jahres','Zahlungszeitpunkten (Abzinsen)'],
  ['Zeitwert','ignoriert','berücksichtigt'],
  ['Eignung','kurze Nutzung, Vorauswahl','längere Nutzung']]},
 {fx:{n:'Kalkulatorische Kosten und Amortisation',tex:'\\text{Abschr.}=\\frac{AK-RW}{ND}\\quad Z=\\frac{AK+RW}{2}\\cdot i\\quad T=\\frac{AK}{\\bar R}',leg:[['AK','Anschaffungskosten'],['RW','Restwert'],['ND','Nutzungsdauer'],['R̄','durchschnittlicher jährlicher Rückfluss (Gewinn + Abschreibung)']],e:'Zinsen: (100.000 + 20.000)/2 · 0,08 = 4.800 €/a. Amortisation: 100.000 / 25.000 = 4 Jahre (Nachteil: Erträge danach und Zinsen bleiben unberücksichtigt). Rentabilität: 9.000 / 50.000 = 18 % (durchschnittliches Kapital = halbe Anschaffung).'}}]},

{t:'Kostenarten und Kostenbeeinflussung im Bild',b:[
 {h:'Abschreibungsarten im Vergleich'},
 fig(520,205,
  ar(50,170,500,170)+ar(50,170,50,14)+
  [0,1,2,3].map(i=>`<rect x="${90+i*55}" y="${170-60}" width="22" height="60" style="fill:color-mix(in srgb,var(--blue) 30%,var(--paper));stroke:var(--blue)"/>`).join('')+
  [2000,1600,1280,1024].map((v,i)=>`<rect x="${112+i*55}" y="${170-v*0.024}" width="22" height="${v*0.024}" style="fill:color-mix(in srgb,var(--accent) 30%,var(--paper));stroke:var(--accent)"/>`).join('')+
  [0,1,2,3].map(i=>t(112+i*55,186,'Jahr '+(i+1),{s:xs})).join('')+
  t(380,60,'■ linear: 2.500 € je Jahr',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--blue)"')+t(380,76,'■ degressiv: fallende Beträge',{a:'start',s:xs}).replace('class="sk-t"','class="sk-t" style="font-size:11px;fill:var(--accent)"')+
  ls(380,104,['degressiv, 20 % vom','Restbuchwert (10.000 €):','2.000 → 1.600 → 1.280 …'],{s:xs,a:'start',lh:14}),
  'Lineare und degressive Abschreibung (Schemabild)'),
 {fx:{n:'Leistungsabschreibung',tex:'A=AK\\cdot\\frac{\\text{Ist-Leistung}}{\\text{Gesamtleistung}}',leg:[['AK','Anschaffungskosten']],e:'Beispiel: 15.000 € · 60.000 / 200.000 = 4.500 €. Sinnvoll bei stark schwankender Auslastung oder verschleißabhängiger Nutzung. Steuerlich ist die degressive Abschreibung nur zeitweise und begrenzt zulässig; in der Kalkulation zählt der tatsächliche Wertverzehr.'}},
 {h:'Mischkosten auflösen'},
 fig(520,205,
  ar(50,170,500,170)+ar(50,170,50,14)+
  path('M50,110 L440,48','sk-l',`stroke:var(--accent);${stk}`)+
  circ(160,93,5,'a')+circ(350,63,5,'a')+
  t(160,84,'40.000 € bei 1.000',{s:xs})+t(350,54,'52.000 € bei 1.800',{s:xs}).replace('x="350"','x="385"').replace('y="54"','y="58"')+
  ln(50,110,500,110,'sk-dim')+t(50,126,'Kf = 25.000 €',{a:'start',s:xs})+
  t(275,190,'Menge  →',{s:xs}),
  'Zwei Beobachtungen genügen: kv = (52.000 − 40.000) / (1.800 − 1.000) = 15 €; Kf = 40.000 − 15 · 1.000 = 25.000 €'),
 {h:'Abgrenzungsrechnung'},
 fig(520,150,
  box(4,20,100,50,['Aufwand','(Buchhaltung)'],{k:'b',s:xs})+fa(104,45,150,45)+
  box(152,6,140,26,['neutraler Aufwand/Ertrag'],{k:'r',s:xs})+box(152,38,140,26,['+ Zusatzkosten'],{k:'g',s:xs})+box(152,70,140,26,['≈ Anderskosten'],{k:'y',s:xs})+
  fa(292,45,330,45)+box(332,20,90,50,['Kosten','(Betrieb)'],{k:'a',s:xs})+fa(422,45,440,45)+box(442,20,74,50,['Betriebs-','ergebnis'],{k:'g',s:xs})+
  ls(260,120,['neutral: betriebsfremd, außerordentlich, periodenfremd → ausgrenzen','Zusatzkosten (kalkulatorischer Unternehmerlohn) kommen hinzu','Anderskosten: kalkulatorische Abschreibung/Zinsen ersetzen buchhalterische Werte'],{s:xs,lh:14}),
  'Von Aufwand zu Kosten'),
 {h:'Kosten steuern: Target Costing, LCC, Wertanalyse'},
 fig(520,170,
  box(4,14,250,60,['Target Costing (marktorientiert)','Zielkosten = Zielpreis − Zielgewinn','→ auf Funktionen/Komponenten verteilen'],{k:'b',s:xs})+
  box(266,14,250,60,['klassisch (kostenorientiert)','Kosten + Gewinn = Preis'],{s:xs})+
  ar(30,150,490,150)+
  `<rect x="30" y="100" width="70" height="42" style="fill:color-mix(in srgb,var(--blue) 25%,var(--paper));stroke:var(--blue)"/>`+t(65,126,'Anschaffung',{s:xs})+
  `<rect x="100" y="100" width="140" height="42" style="fill:color-mix(in srgb,var(--warn) 25%,var(--paper));stroke:var(--warn)"/>`+t(170,126,'Betrieb, Energie',{s:xs})+
  `<rect x="240" y="100" width="130" height="42" style="fill:color-mix(in srgb,var(--bad) 25%,var(--paper));stroke:var(--bad)"/>`+t(305,126,'Wartung, Stillstand',{s:xs})+
  `<rect x="370" y="100" width="60" height="42" style="fill:var(--soft);stroke:var(--ink)"/>`+t(400,126,'Entsorgung',{s:xs})+
  t(260,92,'Lebenszykluskosten (LCC/TCO): Der Anschaffungspreis ist oft nur ein kleiner Teil',{s:xs,c:'acc'}),
  'Zielkosten und Lebenszykluskosten'),
 {p:'Wertanalyse: Funktionen eines bestehenden Produkts bestimmen, Funktionskosten ermitteln, Alternativen entwickeln (Werkstoff, Fertigung, Normteile) und bewerten – gleicher oder höherer Nutzen bei geringeren Kosten. Value Engineering setzt schon in der Entwicklung an. Gemeinkostenwertanalyse: Leistungen indirekter Bereiche erfassen, nach Kundennutzen bewerten, Einsparpotenziale (weglassen, vereinfachen, automatisieren) umsetzen. Zero-Base-Budgeting: Budget jedes Jahr neu begründen statt fortschreiben.'},
 {h:'Plan- und Istkosten: Abweichungen'},
 {tab:[['Abweichung','Berechnung','Ursache / Verantwortung'],
  ['Preisabweichung','(Istpreis − Planpreis) · Istmenge','Einkaufspreise → Einkauf'],
  ['Mengenabweichung','(Istmenge − Planmenge) · Planpreis','Mehr-/Minderverbrauch → Fertigung']]},
 {p:'Istkostenrechnung rechnet nachträglich mit tatsächlichen Kosten (schwankend), Normalkostenrechnung mit Durchschnittswerten der Vergangenheit, Plankostenrechnung mit Vorgabewerten bei geplanter Beschäftigung – sie vergleicht Soll mit Ist. Standardkostenrechnung: feste Standardwerte für Mengen und Preise, geeignet bei stabiler Fertigung mit wiederkehrenden Produkten.'},
 {p:'Kosten senken: Material – Lieferanten vergleichen, Mengen bündeln, Rahmenverträge, Standardteile, weniger Ausschuss und Verschnitt, weniger Bestand. Gemeinkosten – Prozesse vereinfachen, Energie sparen, Instandhaltung planen, Leerlauf und Rüstzeiten verringern.'}]}
]);}
