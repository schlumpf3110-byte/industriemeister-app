// Rechenaufgaben-Generatoren – jedes Mal neue Zahlen
// Lösungsweg-Bausteine (werden in app.js als Prüfungsbogen-Schreibweise dargestellt):
//   {h:'Überschrift'}                         Zwischenüberschrift
//   {l:'Größe', f:['Formel','Einsetzen','Ergebnis']}  Rechnung untereinander, letzte Zeile = Ergebnis
//   {tab:[['Position','Zuschlag','Betrag','s'?]]}     Rechenschema als Tabelle ('s' = Summenzeile)
//   {t:'Text'}                                Antwortsatz / Hinweis
//   Q(zähler, nenner) erzeugt einen Bruch
const R = (a,b,s=1)=>{const n=Math.floor((b-a)/s+1e-9);return +(a+Math.floor(Math.random()*(n+1))*s).toFixed(6)};
const pick = a => a[Math.floor(Math.random()*a.length)];
const f = (x,d=2)=> (x).toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d});
const e = (x)=> f(x,2)+' €';
const r2 = x=>Math.round(x*100)/100;
const Q = (n,d)=>`⟦${n}¦${d}⟧`;

const CALC = [
// ── Kostenwesen ──
{id:'c_zuschlag',qs:'KW',title:'Zuschlagskalkulation bis Listenverkaufspreis',gen(){
  const FM=R(8000,30000,500),MGK=R(6,15,1),FL=R(1200,4000,100),RFGK=R(120,260,10),
  h1=R(6,20,1),msh=R(80,180,5),SEF=R(100,600,50),VVGK=R(12,28,1),G=R(8,20,1),sk=pick([2,3]),rb=pick([0,5,10]);
  const MGKb=FM*MGK/100,MK=FM+MGKb,RF=FL*RFGK/100,MAK=h1*msh,FK=FL+RF+MAK+SEF,HK=MK+FK,VV=HK*VVGK/100,SK=HK+VV,Gw=SK*G/100,BVP=SK+Gw,ZVP=BVP/(1-sk/100),SKb=ZVP-BVP,LVP=ZVP/(1-rb/100),RBb=LVP-ZVP;
  const tab=[['Fertigungsmaterial','',e(FM)],['+ Materialgemeinkosten',MGK+' %',e(MGKb)],['= Materialkosten','',e(MK),'s'],
    ['Fertigungslöhne','',e(FL)],['+ Restfertigungsgemeinkosten',RFGK+' %',e(RF)],['+ Maschinenkosten',`${h1} h · ${msh} €/h`,e(MAK)],['+ Sondereinzelkosten der Fertigung','',e(SEF)],['= Fertigungskosten','',e(FK),'s'],
    ['Herstellkosten (MK + FK)','',e(HK),'s'],['+ Verwaltungs- und Vertriebsgemeinkosten',VVGK+' %',e(VV)],['= Selbstkosten','',e(SK),'s'],
    ['+ Gewinn',G+' %',e(Gw)],['= Barverkaufspreis','',e(BVP),'s'],['+ Kundenskonto',sk+' % i. H.',e(SKb)],['= Zielverkaufspreis','',e(ZVP),'s']];
  if(rb)tab.push(['+ Kundenrabatt',rb+' % i. H.',e(RBb)],['= Listenverkaufspreis','',e(LVP),'s']);else tab.push(['= Listenverkaufspreis (kein Rabatt)','',e(LVP),'s']);
  return {text:`Für einen Sonderwagen liegen folgende Kalkulationsdaten vor. Ermitteln Sie den Listenverkaufspreis${rb?'':' (es wird kein Rabatt gewährt)'}.`,
  given:[['Fertigungsmaterial',e(FM)],['Materialgemeinkostenzuschlag',MGK+' %'],['Fertigungslöhne',e(FL)],['Restfertigungsgemeinkostenzuschlag',RFGK+' %'],['Maschinenlaufzeit',h1+' h'],['Maschinenstundensatz',msh+' €/h'],['Sondereinzelkosten der Fertigung',e(SEF)],['Verwaltungs- und Vertriebsgemeinkosten',VVGK+' %'],['Gewinnzuschlag',G+' %'],['Kundenskonto',sk+' %'],['Kundenrabatt',rb+' %']],
  ans:[{l:'Herstellkosten',v:HK,u:'€'},{l:'Listenverkaufspreis',v:LVP,u:'€'}],
  steps:[{h:'Kalkulationsschema'},{tab},
    {h:'Nebenrechnung Skonto (im Hundert)'},{l:'ZVP',f:[Q('BVP','1 − Skontosatz'),Q(e(BVP),`1 − ${f(sk/100)}`),e(ZVP)]},
    ...(rb?[{h:'Nebenrechnung Rabatt (im Hundert)'},{l:'LVP',f:[Q('ZVP','1 − Rabattsatz'),Q(e(ZVP),`1 − ${f(rb/100)}`),e(LVP)]}]:[]),
    {t:`Der Listenverkaufspreis beträgt ${e(LVP)}.`}],
  tip:'Skonto und Rabatt werden „im Hundert“ gerechnet: Der Barverkaufspreis ist 98 % (bei 2 % Skonto) des Zielverkaufspreises – also teilen, nicht multiplizieren!'};}},
{id:'c_kostenvgl',qs:'KW',title:'Kostenvergleich & kritische Auslastung',gen(){
  const AK1=R(150000,300000,5000),AK2=AK1-R(10000,40000,1000),RW1=R(5000,25000,1000),RW2=R(3000,20000,1000),n=pick([8,10,12,15]),i=pick([6,8,10]),sf1=R(8000,16000,100),sf2=sf1-R(500,3000,100),kv1=R(20,30,0.5),kv2=r2(kv1+R(1,4,0.5)),lohn=R(38,48,1),h=R(1800,3200,100);
  const A1=(AK1-RW1)/n,A2=(AK2-RW2)/n,Z1=(AK1+RW1)/2*i/100,Z2=(AK2+RW2)/2*i/100,F1=A1+Z1+sf1,F2=A2+Z2+sf2,v1=kv1+lohn,v2=kv2+lohn,K1=F1+v1*h,K2=F2+v2*h,xk=(F1-F2)/(v2-v1);
  if(xk<500||xk>4500)return this.gen();
  return {text:`Für eine neue Anlage stehen zwei Alternativen zur Wahl. Die geplante Auslastung beträgt ${f(h,0)} h/Jahr. Führen Sie eine Kostenvergleichsrechnung durch und ermitteln Sie die kritische Auslastung.`,
  given:[['Anschaffungskosten',`A1: ${e(AK1)} · A2: ${e(AK2)}`],['Restwert',`A1: ${e(RW1)} · A2: ${e(RW2)}`],['Nutzungsdauer',n+' Jahre'],['kalk. Zinssatz',i+' %'],['sonstige Fixkosten/Jahr',`A1: ${e(sf1)} · A2: ${e(sf2)}`],['variabler Maschinenstundensatz',`A1: ${f(kv1)} €/h · A2: ${f(kv2)} €/h`],['Lohnkostensatz Bediener',lohn+' €/h']],
  ans:[{l:'Gesamtkosten A1 pro Jahr',v:K1,u:'€'},{l:'Gesamtkosten A2 pro Jahr',v:K2,u:'€'},{l:'kritische Auslastung',v:xk,u:'h'}],
  steps:[{h:'Nebenrechnung kalkulatorische Abschreibung'},
    {l:'A₁',f:[Q('AK − RW','n'),Q(`${e(AK1)} − ${e(RW1)}`,`${n} Jahre`),e(A1)+'/Jahr']},
    {l:'A₂',f:[Q(`${e(AK2)} − ${e(RW2)}`,`${n} Jahre`),e(A2)+'/Jahr']},
    {h:'Nebenrechnung kalkulatorische Zinsen'},
    {l:'Z₁',f:[Q('AK + RW','2')+' · i',Q(`${e(AK1)} + ${e(RW1)}`,'2')+` · ${f(i/100)}`,e(Z1)+'/Jahr']},
    {l:'Z₂',f:[Q(`${e(AK2)} + ${e(RW2)}`,'2')+` · ${f(i/100)}`,e(Z2)+'/Jahr']},
    {h:'Kostenvergleich'},
    {tab:[['','Anlage 1','Anlage 2'],['kalk. Abschreibung',e(A1),e(A2)],['kalk. Zinsen',e(Z1),e(Z2)],['sonstige Fixkosten',e(sf1),e(sf2)],['= Fixkosten/Jahr',e(F1),e(F2),'s'],
      ['variable Kosten/h (Maschine + Lohn)',`${f(v1)} €/h`,`${f(v2)} €/h`],[`variable Kosten/Jahr (· ${f(h,0)} h)`,e(v1*h),e(v2*h)],['= Gesamtkosten/Jahr',e(K1),e(K2),'s']],head:true},
    {t:`Bei ${f(h,0)} h/Jahr ist ${K1<K2?'Anlage 1':'Anlage 2'} um ${e(Math.abs(K1-K2))} günstiger.`},
    {h:'Kritische Auslastung'},
    {l:'x_krit',f:[Q('Kf₁ − Kf₂','kv₂ − kv₁'),Q(`${e(F1)} − ${e(F2)}`,`${f(v2)} €/h − ${f(v1)} €/h`),f(xk)+' h/Jahr']},
    {t:`Bis ${f(xk)} h/Jahr ist Anlage 2 (geringere Fixkosten) günstiger, darüber Anlage 1 (geringere variable Kosten).`}],
  tip:'Kalkulatorische Zinsen immer auf das durchschnittlich gebundene Kapital: (AK + Restwert) / 2.'};}},
{id:'c_breakeven',qs:'KW',title:'Break-even-Menge & Deckungsbeitrag',gen(){
  const Kf=R(60000,240000,1000),kv=R(40,180,1),p=kv+R(20,90,1),x=Math.round(Kf/(p-kv)*R(1.1,1.6,0.05));
  const db=p-kv,BE=Kf/db,G=db*x-Kf;
  return {text:'Für eine Baugruppe liegen die folgenden Daten vor. Ermitteln Sie Stückdeckungsbeitrag, Break-even-Menge und das Betriebsergebnis bei der geplanten Menge.',
  given:[['Fixkosten pro Jahr',e(Kf)],['variable Stückkosten',e(kv)],['Verkaufspreis netto',e(p)],['geplante Absatzmenge',f(x,0)+' Stück']],
  ans:[{l:'Stückdeckungsbeitrag',v:db,u:'€'},{l:'Break-even-Menge',v:BE,u:'Stück',tol:0.01},{l:'Betriebsergebnis',v:G,u:'€'}],
  steps:[{h:'Stückdeckungsbeitrag'},{l:'db',f:['p − kv',`${e(p)} − ${e(kv)}`,e(db)+'/Stück']},
    {h:'Break-even-Menge'},{l:'x_BE',f:[Q('Kf','db'),Q(e(Kf),e(db)+'/Stück'),f(BE)+' Stück ≈ '+Math.ceil(BE)+' Stück']},
    {h:'Betriebsergebnis'},{l:'BE',f:['db · x − Kf',`${e(db)} · ${f(x,0)} − ${e(Kf)}`,`${e(db*x)} − ${e(Kf)}`,e(G)]},
    {t:`Ab ${Math.ceil(BE)} Stück wird Gewinn erzielt; bei ${f(x,0)} Stück beträgt das Betriebsergebnis ${e(G)}.`}],
  tip:'Break-even-Menge immer auf ganze Stück aufrunden – erst ab dann wird Gewinn erzielt.'};}},
{id:'c_amort',qs:'KW',title:'Amortisation & Rentabilität',gen(){
  const AK=R(80000,400000,5000),RW=pick([0,R(5000,20000,1000)]),n=pick([5,6,8,10]),G=R(8000,40000,500),i=pick([6,8]);
  const A=(AK-RW)/n,t=AK/(G+A),Z=(AK+RW)/2*i/100,Kd=(AK+RW)/2,ROI=(G+Z)/Kd*100;
  return {text:`Eine Investition soll beurteilt werden. Der durchschnittliche Gewinn (nach Abzug kalkulatorischer Zinsen) beträgt ${e(G)} pro Jahr. Ermitteln Sie die Amortisationsdauer und die Kapitalrentabilität.`,
  given:[['Anschaffungskosten',e(AK)],['Restwert',e(RW)],['Nutzungsdauer',n+' Jahre'],['kalk. Zinssatz',i+' %'],['Gewinn pro Jahr',e(G)]],
  ans:[{l:'Amortisationsdauer',v:t,u:'Jahre'},{l:'Kapitalrentabilität',v:ROI,u:'%'}],
  steps:[{h:'Amortisationsdauer'},
    {l:'A',f:[Q('AK − RW','n'),Q(`${e(AK)} − ${e(RW)}`,`${n} Jahre`),e(A)+'/Jahr']},
    {l:'t_A',f:[Q('Anschaffungskosten','Gewinn + Abschreibung'),Q(e(AK),`${e(G)} + ${e(A)}`),Q(e(AK),e(G+A)+'/Jahr'),f(t)+' Jahre']},
    {h:'Kapitalrentabilität'},
    {l:'Ø Kapital',f:[Q('AK + RW','2'),Q(`${e(AK)} + ${e(RW)}`,'2'),e(Kd)]},
    {l:'Z',f:[`Ø Kapital · i`,`${e(Kd)} · ${f(i/100)}`,e(Z)]},
    {l:'R',f:[Q('Gewinn + Zinsen','Ø Kapital')+' · 100 %',Q(`${e(G)} + ${e(Z)}`,e(Kd))+' · 100 %',f(ROI)+' %']},
    {t:`Die Rentabilität liegt mit ${f(ROI)} % ${ROI>i?'über':'unter'} der Mindestverzinsung von ${i} %, die Amortisation (${f(t)} Jahre) ${t<n?'liegt innerhalb':'überschreitet'} die Nutzungsdauer von ${n} Jahren → Investition ${ROI>i&&t<n?'vorteilhaft':'nicht vorteilhaft'}.`}],
  tip:'Bei der Rentabilität werden die kalkulatorischen Zinsen wieder zum Gewinn addiert – sonst rechnet man die Verzinsung doppelt heraus.'};}},
{id:'c_msh',qs:'KW',title:'Maschinenstundensatz',gen(){
  const AW=R(120000,450000,5000),n=pick([8,10,12]),i=pick([6,8]),qm=R(15,40,1),mp=R(8,15,0.5),P=R(15,45,1),kwh=R(0.18,0.32,0.01),inst=R(3,7,0.5),T=R(1400,3200,100);
  const A=AW/n,Z=AW/2*i/100,Ra=qm*mp*12,E=P*kwh*T,I=AW*inst/100,K=A+Z+Ra+E+I,msh=K/T;
  return {text:'Für ein neues Bearbeitungszentrum soll der Maschinenstundensatz ermittelt werden (Abschreibung linear vom Wiederbeschaffungswert, Zinsen vom halben Wiederbeschaffungswert).',
  given:[['Wiederbeschaffungswert',e(AW)],['Nutzungsdauer',n+' Jahre'],['kalk. Zinssatz',i+' %'],['Raumbedarf',qm+' m² à '+f(mp)+' €/m² und Monat'],['Leistungsaufnahme (Ø)',P+' kW'],['Strompreis',f(kwh)+' €/kWh'],['Instandhaltung',f(inst,1)+' % vom WBW pro Jahr'],['Laufzeit pro Jahr',f(T,0)+' h']],
  ans:[{l:'Maschinenkosten pro Jahr',v:K,u:'€'},{l:'Maschinenstundensatz',v:msh,u:'€/h'}],
  steps:[{h:'Maschinenkosten pro Jahr'},
    {tab:[['Kostenart','Rechnung','€/Jahr'],['kalk. Abschreibung',`${e(AW)} : ${n} Jahre`,e(A)],['kalk. Zinsen',`${e(AW)} : 2 · ${i} %`,e(Z)],['Raumkosten',`${qm} m² · ${f(mp)} € · 12 Monate`,e(Ra)],['Energiekosten',`${P} kW · ${f(T,0)} h · ${f(kwh)} €/kWh`,e(E)],['Instandhaltung',`${e(AW)} · ${f(inst,1)} %`,e(I)],['= Maschinenkosten','',e(K),'s']],head:true},
    {h:'Maschinenstundensatz'},{l:'MSS',f:[Q('Maschinenkosten/Jahr','Laufzeit/Jahr'),Q(e(K),f(T,0)+' h'),f(msh)+' €/h']}],
  tip:'Achtung bei Raumkosten: Monatsmiete × 12. Energie mit der Laufzeit, nicht mit der Betriebszeit rechnen.'};}},
{id:'c_bab',qs:'KW',title:'BAB: Zuschlagssätze & Über-/Unterdeckung',gen(){
  const FM=R(400000,900000,10000),FL1=R(80000,200000,5000),FL2=R(90000,220000,5000),MGK=FM*R(0.08,0.2,0.01),FGK1=FL1*R(1.2,2.2,0.05),FGK2=FL2*R(1.4,2.6,0.05);
  const nM=pick([10,12,14,16]),n1=pick([140,150,160,170,180]),n2=pick([180,190,200,210,220]);
  const iM=MGK/FM*100,i1=FGK1/FL1*100,i2=FGK2/FL2*100,NM=FM*nM/100,N1=FL1*n1/100,N2=FL2*n2/100,N=NM+N1+N2,I=MGK+FGK1+FGK2,d=N-I;
  const ud=x=>(x>=0?'+ ':'− ')+e(Math.abs(x));
  return {text:'Aus dem BAB liegen die Summen der Ist-Gemeinkosten vor. Ermitteln Sie die Ist-Zuschlagssätze und die gesamte Über- bzw. Unterdeckung.',
  given:[['Fertigungsmaterial',e(FM)],['Fertigungslöhne I / II',`${e(FL1)} / ${e(FL2)}`],['Ist-Gemeinkosten Material',e(MGK)],['Ist-Gemeinkosten Fertigung I',e(FGK1)],['Ist-Gemeinkosten Fertigung II',e(FGK2)],['Normal-Zuschlagssätze',`Mat. ${nM} % · FI ${n1} % · FII ${n2} %`]],
  ans:[{l:'Ist-Zuschlag Material',v:iM,u:'%'},{l:'Ist-Zuschlag Fertigung I',v:i1,u:'%'},{l:'Ist-Zuschlag Fertigung II',v:i2,u:'%'},{l:'Über(+)/Unter(−)deckung gesamt',v:d,u:'€'}],
  steps:[{h:'Ist-Zuschlagssätze'},
    {l:'Zuschlag Material',f:[Q('Ist-MGK','Fertigungsmaterial')+' · 100 %',Q(e(MGK),e(FM))+' · 100 %',f(iM)+' %']},
    {l:'Zuschlag Fert. I',f:[Q('Ist-FGK I','Fertigungslöhne I')+' · 100 %',Q(e(FGK1),e(FL1))+' · 100 %',f(i1)+' %']},
    {l:'Zuschlag Fert. II',f:[Q(e(FGK2),e(FL2))+' · 100 %',f(i2)+' %']},
    {h:'Über-/Unterdeckung'},
    {tab:[['','Material','Fertigung I','Fertigung II'],['Zuschlagsgrundlage',e(FM),e(FL1),e(FL2)],['Normal-Zuschlagssatz',nM+' %',n1+' %',n2+' %'],['Normal-Gemeinkosten',e(NM),e(N1),e(N2)],['Ist-Gemeinkosten',e(MGK),e(FGK1),e(FGK2)],['Über-/Unterdeckung',ud(NM-MGK),ud(N1-FGK1),ud(N2-FGK2),'s']],head:true},
    {l:'gesamt',f:['Normal-GK − Ist-GK',`${e(N)} − ${e(I)}`,ud(d)]},
    {t:d>=0?`Überdeckung: Es wurden ${e(d)} mehr Gemeinkosten verrechnet als angefallen sind.`:`Unterdeckung: ${e(-d)} Gemeinkosten wurden nicht an die Produkte weiterverrechnet – das Ergebnis verschlechtert sich.`}],
  tip:'Überdeckung: Es wurden mehr Gemeinkosten verrechnet als tatsächlich angefallen sind (Normal > Ist).'};}},
{id:'c_plankosten',qs:'KW',title:'Flexible Plankostenrechnung',gen(){
  const Bp=R(1200,2400,100),Kp=R(120000,300000,5000),fix=R(30,60,5)/100,Bi=Math.round(Bp*R(0.7,0.95,0.05)/10)*10,Ki=Math.round(Kp*R(0.75,1.0,0.01)/100)*100;
  const Kf=Kp*fix,kv=(Kp-Kf)/Bp,ks=Kp/Bp,Ksoll=Kf+kv*Bi,Kverr=ks*Bi,VA=Ki-Ksoll,BA=Ksoll-Kverr;
  return {text:'Für eine Kostenstelle wurden die Plankosten festgelegt. Ermitteln Sie Sollkosten, verrechnete Plankosten, Verbrauchs- und Beschäftigungsabweichung.',
  given:[['Planbeschäftigung',f(Bp,0)+' h'],['Plankosten',e(Kp)],['davon fix',f(fix*100,0)+' %'],['Istbeschäftigung',f(Bi,0)+' h'],['Istkosten',e(Ki)]],
  ans:[{l:'Sollkosten',v:Ksoll,u:'€'},{l:'verrechnete Plankosten',v:Kverr,u:'€'},{l:'Verbrauchsabweichung',v:VA,u:'€'},{l:'Beschäftigungsabweichung',v:BA,u:'€'}],
  steps:[{h:'Verrechnungssätze'},
    {l:'Kf',f:[`Plankosten · Fixanteil`,`${e(Kp)} · ${f(fix)}`,e(Kf)]},
    {l:'kv',f:[Q('Plankosten − Kf','Planbeschäftigung'),Q(`${e(Kp)} − ${e(Kf)}`,f(Bp,0)+' h'),f(kv)+' €/h']},
    {l:'PKVS',f:[Q('Plankosten','Planbeschäftigung'),Q(e(Kp),f(Bp,0)+' h'),f(ks)+' €/h']},
    {h:'Sollkosten und verrechnete Plankosten'},
    {l:'Sollkosten',f:['Kf + kv · Istbeschäftigung',`${e(Kf)} + ${f(kv)} €/h · ${f(Bi,0)} h`,e(Ksoll)]},
    {l:'verr. Plankosten',f:['PKVS · Istbeschäftigung',`${f(ks)} €/h · ${f(Bi,0)} h`,e(Kverr)]},
    {h:'Abweichungen'},
    {l:'Verbrauchsabw.',f:['Istkosten − Sollkosten',`${e(Ki)} − ${e(Ksoll)}`,e(VA)]},
    {l:'Beschäftigungsabw.',f:['Sollkosten − verr. Plankosten',`${e(Ksoll)} − ${e(Kverr)}`,e(BA)]},
    {t:`Verbrauchsabweichung ${VA>0?'positiv → unwirtschaftlich gearbeitet':'negativ → wirtschaftlich gearbeitet'}. Die Beschäftigungsabweichung zeigt die wegen geringerer Auslastung nicht verrechneten Fixkosten.`}],
  tip:'Für die Verbrauchsabweichung ist der Meister verantwortlich – die Beschäftigungsabweichung entsteht durch die Auslastung.'};}},
// ── Planung & Steuerung ──
{id:'c_personal',qs:'PS',title:'Personalbedarf & Zeitgrad',gen(){
  const h=R(600,1400,25),tage=pick([5,6,8,10]),sch=pick([2,3]),sl=8,ges=pick([92,94,95,96]),url=pick([8,10,12]);
  const q=(ges-url)/100,bed=h/(tage*sl*sch*q),n=Math.ceil(bed)-1,zg=h/(n*sl*sch*q*tage)*100;
  return {text:`Für Umbauarbeiten wird ein Aufwand von ${f(h,0)} Stunden geschätzt. Gearbeitet wird im ${sch}-Schicht-Betrieb (${sl} h/Schicht). Gesundheitsquote ${ges} %, Urlaubsanteil ${url} %. a) Wie viele Mitarbeiter je Schicht werden benötigt, wenn die Arbeit in ${tage} Arbeitstagen fertig sein soll? b) Welcher Zeitgrad wäre nötig, wenn nur ${n} Mitarbeiter je Schicht verfügbar sind?`,
  given:[['Arbeitsaufwand',f(h,0)+' h'],['Arbeitstage',tage],['Schichten/Tag',sch],['Schichtlänge',sl+' h'],['Gesundheitsquote / Urlaub',`${ges} % / ${url} %`]],
  ans:[{l:'Mitarbeiter je Schicht (rechnerisch)',v:bed,u:'MA'},{l:'erforderlicher Zeitgrad',v:zg,u:'%'}],
  steps:[{h:'a) Personalbedarf'},
    {l:'Anwesenheit',f:['Gesundheitsquote − Urlaubsquote',`${ges} % − ${url} %`,f(q*100,0)+' % = '+f(q)]},
    {l:'MA/Schicht',f:[Q('Arbeitsaufwand','Tage · h/Schicht · Schichten · Anwesenheit'),Q(f(h,0)+' h',`${tage} · ${sl} h · ${sch} · ${f(q)}`),f(bed)+' MA']},
    {t:`Es werden ${Math.ceil(bed)} Mitarbeiter je Schicht benötigt (immer aufrunden).`},
    {h:'b) Erforderlicher Zeitgrad'},
    {l:'Zeitgrad',f:[Q('Arbeitsaufwand','MA · h/Schicht · Schichten · Anwesenheit · Tage')+' · 100 %',Q(f(h,0)+' h',`${n} · ${sl} h · ${sch} · ${f(q)} · ${tage}`)+' · 100 %',f(zg)+' %']},
    {t:`Mit ${n} Mitarbeitern je Schicht müsste ein Zeitgrad von rund ${Math.round(zg)} % erreicht werden.`}],
  tip:'Personalbedarf immer aufrunden. Gesundheitsquote minus Urlaubsquote = tatsächlich verfügbarer Anteil.'};}},
{id:'c_auftragszeit',qs:'PS',title:'Auftragszeit nach REFA',gen(){
  const m=R(50,400,10),tr=R(30,120,5),tg=R(2,12,0.5),zv=pick([8,10,12,15]),ter=R(0.5,2,0.25),zgr=pick([90,100,110,115,120]);
  const tv=tg*zv/100,te=tg+ter+tv,ta=m*te,T=tr+ta,Tist=T/(zgr/100);
  return {text:`Ein Auftrag über ${m} Stück soll terminiert werden. Ermitteln Sie die Zeit je Einheit, die Auftragszeit und die voraussichtliche Ist-Zeit bei einem Zeitgrad von ${zgr} %.`,
  given:[['Auftragsmenge m',m+' Stück'],['Rüstzeit tr',tr+' min'],['Grundzeit tg',f(tg)+' min/Stück'],['Erholungszeit ter',f(ter)+' min/Stück'],['Verteilzeitzuschlag zv',zv+' % (auf tg)'],['Zeitgrad',zgr+' %']],
  ans:[{l:'Zeit je Einheit te',v:te,u:'min'},{l:'Auftragszeit T',v:T,u:'min'},{l:'erwartete Ist-Zeit',v:Tist,u:'min'}],
  steps:[{h:'Zeit je Einheit'},
    {l:'tv',f:['tg · zv',`${f(tg)} min · ${f(zv/100)}`,f(tv)+' min']},
    {l:'te',f:['tg + ter + tv',`${f(tg)} min + ${f(ter)} min + ${f(tv)} min`,f(te)+' min/Stück']},
    {h:'Auftragszeit'},
    {l:'ta',f:['m · te',`${m} Stück · ${f(te)} min/Stück`,f(ta)+' min']},
    {l:'T',f:['tr + ta',`${tr} min + ${f(ta)} min`,f(T)+' min = '+f(T/60)+' h']},
    {h:'Erwartete Ist-Zeit'},
    {l:'T_ist',f:[Q('T','Zeitgrad'),Q(f(T)+' min',f(zgr/100)),f(Tist)+' min = '+f(Tist/60)+' h']}],
  tip:'Auftragszeit T = Rüstzeit tr + Ausführungszeit ta; ta = m · te.'};}},
{id:'c_lager',qs:'PS',title:'Lagerkennzahlen & Meldebestand',gen(){
  const AB=R(200,800,10),zu=[R(200,900,10),R(200,900,10),R(200,900,10),R(200,900,10)],ab=zu.map(z=>Math.round(z*R(0.8,1.15,0.05)/10)*10);
  let s=AB;const q=zu.map((z,k)=>s=s+z-ab[k]);if(Math.min(...q)<50)return this.gen();
  const avg=(AB+q.reduce((a,b)=>a+b,0))/5,ver=ab.reduce((a,b)=>a+b,0),uh=ver/avg,ld=360/uh,tv=R(8,30,1),wbz=R(4,15,1),sb=tv*R(3,6,1),mb=tv*wbz+sb;
  const prev=[AB,...q];
  return {text:'Für ein Lagerteil liegen die Bestandsbewegungen eines Jahres vor. Ermitteln Sie die Quartalsendbestände, den durchschnittlichen Lagerbestand (aus Jahresanfangs- und 4 Quartalsendbeständen), die Umschlagshäufigkeit und die Lagerdauer. Ermitteln Sie zusätzlich den Meldebestand.',
  given:[['Jahresanfangsbestand',AB+' Stück'],...zu.map((z,k)=>[`Q${k+1} Zugang / Abgang`,`${z} / ${ab[k]} Stück`]),['Tagesverbrauch (Meldebestand)',tv+' Stück'],['Wiederbeschaffungszeit',wbz+' Tage'],['Sicherheitsbestand',sb+' Stück']],
  ans:[{l:'Bestand Ende Q4',v:q[3],u:'Stück'},{l:'Ø Lagerbestand',v:avg,u:'Stück'},{l:'Umschlagshäufigkeit',v:uh,u:'x'},{l:'Ø Lagerdauer',v:ld,u:'Tage'},{l:'Meldebestand',v:mb,u:'Stück'}],
  steps:[{h:'Quartalsendbestände'},
    {tab:[['Quartal','Anfangsbestand','+ Zugang','− Abgang','= Endbestand'],...q.map((v,k)=>[`Q${k+1}`,prev[k],zu[k],ab[k],v,'s'])],head:true},
    {h:'Durchschnittlicher Lagerbestand'},
    {l:'Ø Bestand',f:[Q('AB + 4 Quartalsendbestände','5'),Q(`${AB} + ${q.join(' + ')}`,'5'),f(avg)+' Stück']},
    {h:'Umschlagshäufigkeit und Lagerdauer'},
    {l:'Verbrauch',f:[ab.join(' + '),ver+' Stück']},
    {l:'UH',f:[Q('Jahresverbrauch','Ø Lagerbestand'),Q(ver+' Stück',f(avg)+' Stück'),f(uh)]},
    {l:'Ø Lagerdauer',f:[Q('360 Tage','UH'),Q('360 Tage',f(uh)),f(ld)+' Tage']},
    {h:'Meldebestand'},
    {l:'MB',f:['Tagesverbrauch · WBZ + Sicherheitsbestand',`${tv} Stück · ${wbz} Tage + ${sb} Stück`,mb+' Stück']}],
  tip:'Lagerdauer im kaufmännischen Jahr mit 360 Tagen rechnen.'};}},
{id:'c_oee',qs:'PS',title:'Gesamtanlageneffektivität (OEE)',gen(){
  const sch=pick([2,3]),T=sch*8*60,pause=sch*30,still=R(30,120,5),tz=R(0.5,2,0.1);
  const lauf=T-pause-still,ideal=Math.floor(lauf/tz*R(0.82,0.96,0.01)),aus=Math.round(ideal*R(0.01,0.05,0.005));
  const V=lauf/(T-pause),L=ideal*tz/lauf,Qr=(ideal-aus)/ideal,OEE=V*L*Qr*100;
  return {text:`Eine Presse läuft im ${sch}-Schicht-Betrieb (8 h je Schicht, je 30 min Pause). Ermitteln Sie Verfügbarkeit, Leistungsgrad, Qualitätsrate und OEE eines Tages.`,
  given:[['Schichtzeit gesamt',T+' min'],['geplante Pausen',pause+' min'],['Störungs-/Rüststillstand',still+' min'],['Ideale Taktzeit',f(tz,1)+' min/Stück'],['produzierte Teile',ideal+' Stück'],['davon Ausschuss/Nacharbeit',aus+' Stück']],
  ans:[{l:'Verfügbarkeit',v:V*100,u:'%'},{l:'Leistungsgrad',v:L*100,u:'%'},{l:'Qualitätsrate',v:Qr*100,u:'%'},{l:'OEE',v:OEE,u:'%'}],
  steps:[{h:'Zeiten'},
    {l:'geplante Prod.-Zeit',f:['Schichtzeit − Pausen',`${T} min − ${pause} min`,(T-pause)+' min']},
    {l:'Laufzeit',f:['geplante Prod.-Zeit − Stillstand',`${T-pause} min − ${still} min`,lauf+' min']},
    {h:'Kennzahlen'},
    {l:'Verfügbarkeit',f:[Q('Laufzeit','geplante Produktionszeit'),Q(lauf+' min',(T-pause)+' min'),f(V*100)+' %']},
    {l:'Leistungsgrad',f:[Q('produzierte Teile · ideale Taktzeit','Laufzeit'),Q(`${ideal} · ${f(tz,1)} min`,lauf+' min'),f(L*100)+' %']},
    {l:'Qualitätsrate',f:[Q('Gutteile','produzierte Teile'),Q(`${ideal} − ${aus}`,ideal),f(Qr*100)+' %']},
    {l:'OEE',f:['V · L · Q',`${f(V,4)} · ${f(L,4)} · ${f(Qr,4)}`,f(OEE)+' %']}],
  tip:'Weltklasse-Niveau gilt ab ca. 85 % OEE.'};}},
// ── Fertigungstechnik ──
{id:'c_hnz_dreh',qs:'FT',title:'Hauptnutzungszeit Längsdrehen',gen(){
  const d=R(40,160,5),l=R(80,400,10),vc=R(120,280,10),fz=R(0.15,0.4,0.05),ap=R(1,3,0.5),z=R(4,10,1),la=2,lu=2;
  const i=Math.ceil(z/ap),n=vc*1000/(Math.PI*d),L=l+la+lu,th=L*i/(n*fz);
  return {text:`Eine Welle Ø ${d} mm soll auf einer Länge von ${l} mm längsgedreht werden. Die Bearbeitungszugabe (radial) beträgt ${z} mm. Ermitteln Sie Drehzahl, Anzahl der Schnitte und Hauptnutzungszeit (Drehzahl mit Anfangsdurchmesser rechnen).`,
  given:[['Durchmesser d',d+' mm'],['Drehlänge l',l+' mm'],['Schnittgeschwindigkeit vc',vc+' m/min'],['Vorschub f',f(fz)+' mm'],['max. Schnitttiefe ap',f(ap,1)+' mm'],['Anlauf / Überlauf',`${la} / ${lu} mm`]],
  ans:[{l:'Drehzahl n',v:n,u:'1/min'},{l:'Anzahl Schnitte i',v:i,u:''},{l:'Hauptnutzungszeit th',v:th,u:'min'}],
  steps:[{h:'Drehzahl'},{l:'n',f:[Q('vc · 1000','π · d'),Q(`${vc} m/min · 1000 mm/m`,`π · ${d} mm`),f(n,1)+' 1/min']},
    {h:'Anzahl der Schnitte'},{l:'i',f:[Q('Bearbeitungszugabe','ap'),Q(z+' mm',f(ap,1)+' mm'),f(z/ap)+' → '+i+' Schnitte']},
    {h:'Vorschubweg'},{l:'L',f:['l + la + lu',`${l} mm + ${la} mm + ${lu} mm`,L+' mm']},
    {h:'Hauptnutzungszeit'},{l:'th',f:[Q('L · i','n · f'),Q(`${L} mm · ${i}`,`${f(n,1)} 1/min · ${f(fz)} mm`),f(th)+' min']}],
  tip:'Anzahl der Schnitte immer aufrunden.'};}},
{id:'c_fraesleistung',qs:'FT',title:'Schnittkraft & Antriebsleistung Fräsen',gen(){
  const kc=R(1500,2600,50),b=R(2,6,0.5),h=R(0.08,0.25,0.01),ze=R(2,6,1),vc=R(80,250,10),eta=R(0.7,0.9,0.05),k=pick([1.0,1.1,1.2,1.3]);
  const A=b*h,Fc=kc*A*k,Pc=ze*Fc*vc/60,P1=Pc/eta;
  return {text:`Für einen Planfräsvorgang soll die erforderliche Antriebsleistung ermittelt werden. Die spezifische Schnittkraft kc ist bereits für die Spanungsdicke berechnet. Korrekturfaktor für Werkzeugverschleiß: ${f(k,1)}.`,
  given:[['spezifische Schnittkraft kc',kc+' N/mm²'],['Spanungsbreite b',f(b,1)+' mm'],['mittlere Spanungsdicke h',f(h)+' mm'],['Schneiden im Eingriff ze',ze],['Schnittgeschwindigkeit vc',vc+' m/min'],['Korrekturfaktor C',f(k,1)],['Wirkungsgrad η',f(eta)]],
  ans:[{l:'Schnittkraft je Schneide Fc',v:Fc,u:'N'},{l:'Schnittleistung Pc',v:Pc/1000,u:'kW'},{l:'Antriebsleistung P1',v:P1/1000,u:'kW'}],
  steps:[{h:'Spanungsquerschnitt'},{l:'A',f:['b · h',`${f(b,1)} mm · ${f(h)} mm`,f(A,3)+' mm²']},
    {h:'Schnittkraft je Schneide'},{l:'Fc',f:['kc · A · C',`${kc} N/mm² · ${f(A,3)} mm² · ${f(k,1)}`,f(Fc)+' N']},
    {h:'Schnittleistung'},{l:'vc',f:[Q(vc+' m/min','60 s/min'),f(vc/60)+' m/s']},
    {l:'Pc',f:['ze · Fc · vc',`${ze} · ${f(Fc)} N · ${f(vc/60)} m/s`,f(Pc,0)+' W = '+f(Pc/1000,3)+' kW']},
    {h:'Antriebsleistung'},{l:'P1',f:[Q('Pc','η'),Q(f(Pc/1000,3)+' kW',f(eta)),f(P1/1000,3)+' kW']}],
  tip:'vc von m/min in m/s umrechnen (÷ 60), damit Watt herauskommt.'};}},
{id:'c_rautiefe',qs:'FT',title:'Rautiefe & Eckenradius',gen(){
  const r=pick([0.4,0.8,1.2,1.6]),fz=R(0.1,0.4,0.02),Rz=R(4,16,1);
  const Rth=fz*fz/(8*r)*1000,fmax=Math.sqrt(Rz/1000*8*r),rmin=fz*fz/(8*Rz/1000);
  return {text:`Beim Schlichtdrehen wird eine Wendeschneidplatte mit Eckenradius r = ${r} mm und Vorschub f = ${f(fz)} mm eingesetzt. a) Ermitteln Sie die theoretische Rautiefe. b) Welcher Vorschub ist für Rz = ${Rz} µm maximal zulässig? c) Welcher Eckenradius ist beim gegebenen Vorschub mindestens nötig, um Rz = ${Rz} µm einzuhalten?`,
  given:[['Eckenradius r',r+' mm'],['Vorschub f',f(fz)+' mm'],['geforderte Rautiefe',Rz+' µm = '+f(Rz/1000,3)+' mm']],
  ans:[{l:'Rth',v:Rth,u:'µm'},{l:'max. Vorschub',v:fmax,u:'mm'},{l:'min. Eckenradius',v:rmin,u:'mm'}],
  steps:[{h:'a) Theoretische Rautiefe'},{l:'Rth',f:[Q('f²','8 · r'),Q(`(${f(fz)} mm)²`,`8 · ${r} mm`),f(Rth/1000,4)+' mm = '+f(Rth)+' µm']},
    {h:'b) Maximaler Vorschub'},{l:'f',f:['√(Rz · 8 · r)',`√(${f(Rz/1000,3)} mm · 8 · ${r} mm)`,f(fmax,3)+' mm']},
    {h:'c) Mindest-Eckenradius'},{l:'r',f:[Q('f²','8 · Rz'),Q(`(${f(fz)} mm)²`,`8 · ${f(Rz/1000,3)} mm`),f(rmin,3)+' mm']},
    {t:'Nächstgrößeren genormten Eckenradius wählen (0,4 · 0,8 · 1,2 · 1,6 mm).'}],
  tip:'Einheiten! Rz in mm einsetzen (µm ÷ 1000).'};}},
// ── Betriebstechnik ──
{id:'c_seil',qs:'BT',title:'Strangkräfte beim Anschlagen',gen(){
  const m=R(800,6000,100),n=pick([2,4]),beta=pick([15,20,30,40,45,50,60]),tr=n==4?3:2;
  const G=m*9.81,F=G/(tr*Math.cos(beta*Math.PI/180));
  return {text:`Eine Last mit m = ${f(m,0)} kg wird mit einem ${n}-Strang-Gehänge angeschlagen. Der Neigungswinkel zur Senkrechten beträgt β = ${beta}°. ${n==4?'Bei 4 Strängen dürfen wegen statischer Unbestimmtheit nur 3 Stränge als tragend angesetzt werden.':'Beide Stränge tragen gleichmäßig.'} Ermitteln Sie die Gewichtskraft und die Kraft je Strang.`,
  given:[['Masse m',f(m,0)+' kg'],['Fallbeschleunigung g','9,81 m/s²'],['Strangzahl',n],['Neigungswinkel β',beta+'°']],
  ans:[{l:'Gewichtskraft',v:G/1000,u:'kN'},{l:'Strangkraft',v:F/1000,u:'kN'}],
  steps:[{h:'Gewichtskraft'},{l:'FG',f:['m · g',`${f(m,0)} kg · 9,81 m/s²`,f(G,0)+' N = '+f(G/1000,3)+' kN']},
    {h:'Strangkraft'},{t:`Tragende Stränge: n = ${tr}${n==4?' (bei 4 Strängen nur 3 tragend)':''}`},
    {l:'F',f:[Q('FG','n · cos β'),Q(f(G/1000,3)+' kN',`${tr} · cos ${beta}°`),Q(f(G/1000,3)+' kN',`${tr} · ${f(Math.cos(beta*Math.PI/180),4)}`),f(F/1000,3)+' kN']},
    {t:beta>=60?'β = 60° ist der zulässige Grenzwert – größer nicht anschlagen!':'Je größer β (kürzere Stränge), desto größer die Strangkraft.'}],
  tip:'Winkel zur Senkrechten → Kosinus. Bei Winkel zur Waagerechten → Sinus.'};}},
{id:'c_pumpe',qs:'BT',title:'Kühlwasser-Volumenstrom (Wärmebilanz)',gen(){
  const V=R(0.5,3,0.1),rho=pick([1050,1100,1200,1380]),c=pick([1.3,1.8,2.0,2.1]),t1=R(180,280,10),t2=R(50,90,10),w1=R(12,18,1),w2=w1+R(5,12,1),ant=pick([70,80,90,100]);
  const m=V*rho,Qw0=m*c*(t1-t2),Qw=Qw0*ant/100,mw=Qw/(4.19*(w2-w1)),Vw=mw/1000;
  return {text:`In einer Spritzgießmaschine werden pro Stunde ${f(V,1)} m³ Kunststoff (ρ = ${rho} kg/m³, c = ${f(c,1)} kJ/(kg·K)) von ${t1} °C auf ${t2} °C abgekühlt. Das Kühlwasser nimmt ${ant} % der Wärme auf und erwärmt sich von ${w1} °C auf ${w2} °C (c_Wasser = 4,19 kJ/(kg·K), ρ = 1000 kg/m³). Ermitteln Sie den Kühlwasser-Volumenstrom.`,
  given:[['Kunststoffvolumen',f(V,1)+' m³/h'],['Dichte',rho+' kg/m³'],['spez. Wärme Kunststoff',f(c,1)+' kJ/(kg·K)'],['Temperatur Kunststoff',`${t1} → ${t2} °C`],['Kühlwasser',`${w1} → ${w2} °C`],['Anteil ans Wasser',ant+' %']],
  ans:[{l:'abzuführende Wärme',v:Qw0/1000,u:'MJ/h'},{l:'Kühlwasser-Volumenstrom',v:Vw,u:'m³/h'}],
  steps:[{h:'Massenstrom Kunststoff'},{l:'ṁ',f:['V · ρ',`${f(V,1)} m³/h · ${rho} kg/m³`,f(m,0)+' kg/h']},
    {h:'Abzuführende Wärme'},{l:'Q',f:['ṁ · c · Δt',`${f(m,0)} kg/h · ${f(c,1)} kJ/(kg·K) · (${t1} − ${t2}) K`,f(Qw0,0)+' kJ/h = '+f(Qw0/1000)+' MJ/h']},
    {l:'Q_Wasser',f:[`Q · ${ant} %`,`${f(Qw0,0)} kJ/h · ${f(ant/100)}`,f(Qw,0)+' kJ/h']},
    {h:'Kühlwasserstrom'},{l:'ṁ_W',f:[Q('Q_Wasser','c_W · Δt_W'),Q(f(Qw,0)+' kJ/h',`4,19 kJ/(kg·K) · (${w2} − ${w1}) K`),f(mw,1)+' kg/h']},
    {l:'V_W',f:[Q('ṁ_W','ρ_W'),Q(f(mw,1)+' kg/h','1000 kg/m³'),f(Vw,3)+' m³/h']}],
  tip:'Q = m · c · Δt – die Kerngleichung der Wärmelehre.'};}},
{id:'c_pneu',qs:'BT',title:'Zylinderkraft Pneumatik/Hydraulik',gen(){
  const D=pick([32,40,50,63,80,100,125]),d=pick([12,16,20,25]),p=R(4,8,0.5),eta=R(0.8,0.95,0.05);
  const A=Math.PI*D*D/4,Ar=Math.PI*(D*D-d*d)/4,Fa=p*0.1*A*eta,Fr=p*0.1*Ar*eta;
  return {text:`Ein doppeltwirkender Pneumatikzylinder (D = ${D} mm, Kolbenstange d = ${d} mm) wird mit p = ${f(p,1)} bar betrieben (Wirkungsgrad ${f(eta)}). Ermitteln Sie Vorhub- und Rückhubkraft.`,
  given:[['Kolbendurchmesser D',D+' mm'],['Kolbenstange d',d+' mm'],['Druck p',f(p,1)+' bar = '+f(p*0.1,2)+' N/mm²'],['Wirkungsgrad η',f(eta)]],
  ans:[{l:'Vorhubkraft',v:Fa,u:'N'},{l:'Rückhubkraft',v:Fr,u:'N'}],
  steps:[{h:'Vorhub'},{l:'A',f:[Q('π · D²','4'),Q(`π · (${D} mm)²`,'4'),f(A,1)+' mm²']},
    {l:'F_vor',f:['p · A · η',`${f(p*0.1,2)} N/mm² · ${f(A,1)} mm² · ${f(eta)}`,f(Fa,1)+' N']},
    {h:'Rückhub'},{l:'A_Ring',f:[Q('π · (D² − d²)','4'),Q(`π · ((${D} mm)² − (${d} mm)²)`,'4'),f(Ar,1)+' mm²']},
    {l:'F_rück',f:['p · A_Ring · η',`${f(p*0.1,2)} N/mm² · ${f(Ar,1)} mm² · ${f(eta)}`,f(Fr,1)+' N']}],
  tip:'1 bar = 10 N/cm² = 0,1 N/mm² = 100.000 Pa.'};}},
{id:'c_motor',qs:'BT',title:'Wirkungsgrad & Stromaufnahme',gen(){
  const U=pick([400,400,690]),P2=R(5,75,2.5),eta1=R(0.88,0.96,0.01),eta2=R(0.85,0.97,0.01),cos=R(0.8,0.9,0.01),Pab=P2*eta2;
  const P1=P2/eta1,I=P1*1000/(Math.sqrt(3)*U*cos),ges=eta1*eta2;
  return {text:`Ein Drehstrommotor (U = ${U} V, cos φ = ${f(cos)}, η_Motor = ${f(eta1)}) gibt ${f(P2,1)} kW an ein Getriebe (η_Getriebe = ${f(eta2)}) ab. Ermitteln Sie Gesamtwirkungsgrad, Leistung am Getriebeausgang, aufgenommene elektrische Leistung und Stromaufnahme.`,
  given:[['Netzspannung U',U+' V'],['Motorabgabe P2',f(P2,1)+' kW'],['η Motor',f(eta1)],['η Getriebe',f(eta2)],['cos φ',f(cos)]],
  ans:[{l:'Gesamtwirkungsgrad',v:ges*100,u:'%'},{l:'Leistung Getriebeausgang',v:Pab,u:'kW'},{l:'aufgenommene Leistung P1',v:P1,u:'kW'},{l:'Stromaufnahme',v:I,u:'A'}],
  steps:[{h:'Gesamtwirkungsgrad'},{l:'η_ges',f:['η_Motor · η_Getriebe',`${f(eta1)} · ${f(eta2)}`,f(ges,4)+' = '+f(ges*100)+' %']},
    {h:'Leistung am Getriebeausgang'},{l:'P_ab',f:['P2 · η_Getriebe',`${f(P2,1)} kW · ${f(eta2)}`,f(Pab)+' kW']},
    {h:'Aufgenommene Leistung'},{l:'P1',f:[Q('P2','η_Motor'),Q(f(P2,1)+' kW',f(eta1)),f(P1)+' kW']},
    {h:'Stromaufnahme'},{l:'I',f:[Q('P1','√3 · U · cos φ'),Q(f(P1*1000,0)+' W',`1,732 · ${U} V · ${f(cos)}`),f(I)+' A']}],
  tip:'Leistungsschild-Leistung eines Motors ist immer die abgegebene (mechanische) Leistung.'};}},
// ── Montagetechnik ──
{id:'c_kran',qs:'MT',title:'Kranfahrt: Hub und Fahrweg',gen(){
  const vh=R(1.8,5.4,0.6),vv=R(60,150,10),s=R(0.8,2.5,0.1),hmin=R(1.5,3,0.5);
  const v1=vh/3.6,v2=vv/60,t=s/v1,h=v2*t;
  return {text:`Ein Hallenkran fährt mit ${f(vh,1)} km/h horizontal und hebt gleichzeitig mit ${vv} m/min. Nach ${f(s,1)} m Fahrweg muss die Last eine Mindesthöhe von ${f(hmin,1)} m erreicht haben. Prüfen Sie rechnerisch.`,
  given:[['Fahrgeschwindigkeit',f(vh,1)+' km/h'],['Hubgeschwindigkeit',vv+' m/min'],['Fahrweg s',f(s,1)+' m'],['Mindesthöhe',f(hmin,1)+' m']],
  ans:[{l:'erreichte Hubhöhe',v:h,u:'m'}],
  steps:[{h:'Geschwindigkeiten umrechnen'},{l:'v_h',f:[Q(f(vh,1)+' km/h','3,6'),f(v1,3)+' m/s']},{l:'v_v',f:[Q(vv+' m/min','60 s/min'),f(v2,3)+' m/s']},
    {h:'Fahrzeit'},{l:'t',f:[Q('s','v_h'),Q(f(s,1)+' m',f(v1,3)+' m/s'),f(t,3)+' s']},
    {h:'Hubhöhe in dieser Zeit'},{l:'h',f:['v_v · t',`${f(v2,3)} m/s · ${f(t,3)} s`,f(h)+' m']},
    {t:`${f(h)} m ${h>=hmin?'≥':'<'} ${f(hmin,1)} m → Mindesthöhe ${h>=hmin?'wird eingehalten':'wird NICHT eingehalten'}.`}],
  tip:'Beide Bewegungen laufen gleich lange: t ist gleich, deshalb s1/v1 = s2/v2.'};}},
{id:'c_reibung',qs:'MT',title:'Klemmkraft Greifer (Reibung)',gen(){
  const m=R(200,2500,50),mu=pick([0.1,0.15,0.2,0.3,0.4,0.5]),S=pick([1.5,2,2.5]),a=pick([0,0.5,1,2]);
  const G=m*(9.81+a),FN=G*S/(2*mu);
  return {text:`Ein Scherengreifer hält eine Platte (m = ${f(m,0)} kg) mit zwei Klemmbacken nur durch Reibung (μ = ${f(mu)}). Beim Anheben tritt eine Beschleunigung von ${f(a,1)} m/s² auf. Sicherheitsfaktor S = ${f(S,1)}. Ermitteln Sie die erforderliche Klemmkraft je Backe.`,
  given:[['Masse m',f(m,0)+' kg'],['Haftreibungszahl μ',f(mu)],['Beschleunigung a',f(a,1)+' m/s²'],['Sicherheit S',f(S,1)],['Reibflächen','2']],
  ans:[{l:'zu haltende Kraft',v:G,u:'N'},{l:'Klemmkraft je Backe',v:FN,u:'N'}],
  steps:[{h:'Zu haltende Kraft'},{l:'F',f:['m · (g + a)',`${f(m,0)} kg · (9,81 m/s² + ${f(a,1)} m/s²)`,f(G,1)+' N']},
    {h:'Klemmkraft'},{t:'Bedingung: 2 · μ · FN ≥ S · F (zwei Reibflächen)'},
    {l:'FN',f:[Q('S · F','2 · μ'),Q(`${f(S,1)} · ${f(G,1)} N`,`2 · ${f(mu)}`),f(FN,1)+' N = '+f(FN/1000,2)+' kN']}],
  tip:'Reibkraft FR = μ · FN – bei zwei Backen zählt die Reibung doppelt.'};}}
];
