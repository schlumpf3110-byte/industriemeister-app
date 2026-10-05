// Zusätzliche Rechenaufgaben-Typen nach den HQ-Prüfungen 2020–2025
const D2R=Math.PI/180;
CALC.push(
// ── Technik ──
{id:'c_umfang',qs:'BT',title:'Umfangsgeschwindigkeit & Drehbewegung',src:'F2020 A2 (T), F2021 A3 (T)',gen(){
  const d=R(40,120,0.2),n=R(20,40,1),c=1234.8;
  const v=Math.PI*d*n/60,vk=v*3.6,rel=vk/c*100;
  const L=R(2,6,0.5),t=R(1.5,4,0.5),phi=90,s=Math.PI*2*L*phi/360,ve=s/t;
  return {text:`a) Ein Rotor mit d = ${f(d,1)} m dreht im Störfall mit n = ${n} 1/min. Ermitteln Sie die Blattspitzengeschwindigkeit in m/s und in km/h sowie ihr Verhältnis zur Schallgeschwindigkeit (1.234,8 km/h). b) Ein Schrankenbaum der Länge ${f(L,1)} m schwenkt in ${f(t,1)} s um 90°. Ermitteln Sie die Geschwindigkeit an der Baumspitze (Beschleunigung vernachlässigt).`,
  given:[['Rotordurchmesser d',f(d,1)+' m'],['Drehzahl n',n+' 1/min'],['Schallgeschwindigkeit',f(c,1)+' km/h'],['Baumlänge (Radius) r',f(L,1)+' m'],['Schwenkwinkel',90+'°'],['Schwenkzeit',f(t,1)+' s']],
  ans:[{l:'Blattspitzengeschwindigkeit',v,u:'m/s'},{l:'Anteil an Schallgeschwindigkeit',v:rel,u:'%'},{l:'Geschwindigkeit Baumspitze',v:ve,u:'m/s'}],
  steps:[{h:'a) Blattspitze'},{l:'v',f:[Q('π · d · n','60 s/min'),Q(`π · ${f(d,1)} m · ${n} 1/min`,'60 s/min'),f(v)+' m/s']},{l:'v',f:[`${f(v)} m/s · 3,6`,f(vk)+' km/h']},
    {l:'Anteil',f:[Q('v','c')+' · 100 %',Q(f(vk)+' km/h',f(c,1)+' km/h')+' · 100 %',f(rel)+' %']},
    {h:'b) Schrankenbaum'},{l:'s (Bogen)',f:[Q('2 · π · r · 90°','360°'),Q(`2 · π · ${f(L,1)} m · 90°`,'360°'),f(s,3)+' m']},
    {l:'v',f:[Q('s','t'),Q(f(s,3)+' m',f(t,1)+' s'),f(ve)+' m/s']}],
  tip:'Bei Drehbewegungen: v = π · d · n. Für eine Viertelumdrehung ist der Weg ein Viertelkreis-Bogen.'};}},
{id:'c_schraube',qs:'MT',title:'Schraubenverbindung: Festigkeit & Vorspannkraft',src:'F2020 A3 (T)',gen(){
  const kl=pick(['8.8','10.9','12.9']),M=pick([[12,84.3],[16,157],[20,245],[24,353],[30,561]]),S=R(1.5,3,0.5);
  const [a,b]=kl.split('.').map(Number),Rm=a*100,Re=a*b*10,sz=Re/S,As=M[1],F=sz*As;
  return {text:`Eine Schraube M${M[0]} der Festigkeitsklasse ${kl} soll mit einer Sicherheit von ${f(S,1)} gegen Fließen ausgelegt werden. Bestimmen Sie Zugfestigkeit, Streckgrenze, zulässige Spannung und die maximal zulässige Vorspannkraft.`,
  given:[['Gewinde',`M${M[0]}`],['Festigkeitsklasse',kl],['Spannungsquerschnitt As (Tabellenbuch)',f(As,1)+' mm²'],['Sicherheit S',f(S,1)]],
  ans:[{l:'Zugfestigkeit Rm',v:Rm,u:'N/mm²'},{l:'Streckgrenze Re',v:Re,u:'N/mm²'},{l:'zulässige Spannung',v:sz,u:'N/mm²'},{l:'zul. Vorspannkraft',v:F/1000,u:'kN'}],
  steps:[{h:'Werte aus der Festigkeitsklasse'},{l:'Rm',f:[`erste Zahl · 100`,`${a} · 100`,Rm+' N/mm²']},{l:'Re',f:['erste Zahl · zweite Zahl · 10',`${a} · ${b} · 10`,Re+' N/mm²']},
    {h:'Zulässige Spannung'},{l:'σ_zul',f:[Q('Re','S'),Q(Re+' N/mm²',f(S,1)),f(sz,1)+' N/mm²']},
    {h:'Vorspannkraft'},{l:'F_V',f:['σ_zul · As',`${f(sz,1)} N/mm² · ${f(As,1)} mm²`,f(F,0)+' N = '+f(F/1000)+' kN']}],
  tip:'Festigkeitsklasse 12.9: Rm = 12 · 100 = 1200 N/mm², Re = 12 · 9 · 10 = 1080 N/mm².'};}},
{id:'c_schleifen',qs:'FT',title:'Hauptnutzungszeit Außenrundschleifen',src:'F2020 A5 (T)',gen(){
  const d=R(40,160,10),l=R(30,120,5),bs=R(20,40,5),z=R(0.1,0.4,0.05),ae=pick([0.005,0.01,0.02]),vw=R(10,30,2),fq=pick([0.5,2/3,0.75]),ia=pick([2,3,4]);
  const n=vw*1000/(Math.PI*d),fz=fq*bs,lu=bs/3,L=l-lu,i=Math.ceil((z/2)/ae)+ia,th=L*i/(n*fz);
  return {text:`Eine Lagerstelle Ø ${d} mm, Länge ${l} mm wird im Längs-Rundschleifen (Pendelschleifen, mit Auslauf beidseitig) fertiggeschliffen. Schleifzugabe ${f(z,2)} mm auf den Durchmesser, ${ia} Ausfeuerhübe. Ermitteln Sie Werkstückdrehzahl, Anzahl der Hübe und Hauptnutzungszeit.`,
  given:[['Durchmesser d',d+' mm'],['Schleiflänge l',l+' mm'],['Schleifscheibenbreite bs',bs+' mm'],['Zustellung je Hub ae',f(ae,3)+' mm'],['Werkstückgeschwindigkeit vw',vw+' m/min'],['Längsvorschub f',`${f(fq,2)} × Scheibenbreite`],['Überlauf lu','ein Drittel der Scheibenbreite je Seite'],['Ausfeuerhübe',ia]],
  ans:[{l:'Werkstückdrehzahl',v:n,u:'1/min'},{l:'Anzahl Hübe i',v:i,u:''},{l:'Hauptnutzungszeit th',v:th,u:'min'}],
  steps:[{h:'Werkstückdrehzahl'},{l:'n',f:[Q('vw · 1000','π · d'),Q(`${vw} m/min · 1000`,`π · ${d} mm`),f(n,1)+' 1/min']},
    {h:'Längsvorschub und Vorschubweg'},{l:'f',f:[`${f(fq,2)} · bs`,`${f(fq,2)} · ${bs} mm`,f(fz,2)+' mm']},{l:'L',f:['l − bs/3 (Pendelschleifen mit Überlauf)',`${l} mm − ${f(lu,2)} mm`,f(L,2)+' mm']},
    {h:'Anzahl der Hübe'},{l:'i',f:[Q('Zugabe/2','ae')+' + Ausfeuerhübe',Q(f(z/2,3)+' mm',f(ae,3)+' mm')+` + ${ia}`,i+' Hübe']},
    {h:'Hauptnutzungszeit'},{l:'th',f:[Q('L · i','n · f'),Q(`${f(L,2)} mm · ${i}`,`${f(n,1)} 1/min · ${f(fz,2)} mm`),f(th)+' min']}],
  tip:'Die Zugabe wird auf den Durchmesser angegeben – zugestellt wird aber radial, also halbieren.'};}},
{id:'c_bohren',qs:'FT',title:'Antriebsleistung beim Bohren',src:'F2021 A4 (T)',gen(){
  const d=pick([4.2,6.8,8.5,10.2,14,17.5]),fz=R(0.08,0.25,0.01),sig=pick([118,130,140]),kc11=pick([1500,1700,1800,2100]),mc=pick([0.25,0.26]),vc=R(60,120,5),verl=R(15,25,1),C=1.2;
  const h=fz/2*Math.sin(sig/2*D2R),kc=kc11/Math.pow(h,mc),A=d*fz/4,Fc=A*kc*C,Pc=Fc*vc/60,P1=Pc/(1-verl/100);
  return {text:`Eine Bohrung Ø ${f(d,1)} mm wird mit einem zweischneidigen HM-Bohrer (Spitzenwinkel ${sig}°) gebohrt. Ermitteln Sie die Antriebsleistung, wenn der Leistungsverlust der Maschine ${verl} % beträgt (Verschleißfaktor C = ${f(C,1)}).`,
  given:[['Bohrerdurchmesser d',f(d,1)+' mm'],['Vorschub f',f(fz)+' mm'],['Spitzenwinkel σ',sig+'°'],['kc1.1',kc11+' N/mm²'],['mc',f(mc)],['Schnittgeschwindigkeit vc',vc+' m/min'],['Leistungsverlust',verl+' %']],
  ans:[{l:'Spanungsdicke h',v:h,u:'mm'},{l:'Schnittkraft je Schneide',v:Fc,u:'N'},{l:'Antriebsleistung',v:P1/1000,u:'kW'}],
  steps:[{h:'Spanungsdicke und spezifische Schnittkraft'},{l:'h',f:[Q('f','2')+' · sin(σ/2)',Q(f(fz)+' mm','2')+` · sin ${sig/2}°`,f(h,4)+' mm']},
    {l:'kc',f:[Q('kc1.1','h^mc'),Q(kc11+' N/mm²',`${f(h,4)}^${f(mc)}`),f(kc,0)+' N/mm²']},
    {h:'Schnittkraft je Schneide'},{l:'A',f:[Q('d · f','4'),Q(`${f(d,1)} mm · ${f(fz)} mm`,'4'),f(A,4)+' mm²']},
    {l:'Fc',f:['A · kc · C',`${f(A,4)} mm² · ${f(kc,0)} N/mm² · ${f(C,1)}`,f(Fc,1)+' N']},
    {h:'Leistung'},{l:'Pc',f:[Q('z · Fc · vc','2')+'  (z = 2, Kraft wirkt bei d/4)',`${f(Fc,1)} N · ${f(vc/60,3)} m/s`,f(Pc,1)+' W']},
    {l:'P1',f:[Q('Pc','1 − Verlust'),Q(f(Pc,1)+' W',f(1-verl/100)),f(P1,1)+' W = '+f(P1/1000,3)+' kW']}],
  tip:'Beim Bohren hat jede Schneide nur den halben Vorschub: Spanungsquerschnitt je Schneide A = d · f / 4.'};}},
{id:'c_antrieb',qs:'BT',title:'Antrieb: Übersetzung, Drehmoment, Leistung',src:'F2021 A2 (T), F2024 A3 (T)',gen(){
  const F=R(15,35,1),D=R(800,1400,100),i=pick([16,18,20,22]),nM=pick([1500,1800,2000,2200]),etaK=R(0.9,0.96,0.01),p=R(150,300,10),Qv=R(100,250,10),etaP=R(0.8,0.92,0.01),Hu=9.8;
  const nT=nM/i,vT=Math.PI*D/1000*nT/60,PT=F*1000*vT,PTm=PT/etaK,PH=p*1e5*Qv/60000,PHm=PH/etaP,Pab=PTm+PHm,B=Math.round(Pab/(R(0.33,0.42,0.01)*Hu*1000)),Pzu=B*Hu*1000,eta=Pab/Pzu*100,MT=F*1000*D/2000;
  return {text:`Ein Dieselmotor treibt über ein Getriebe eine Frästrommel und zusätzlich eine Hydraulikpumpe an. Ermitteln Sie Drehzahl, Umfangsgeschwindigkeit und Drehmoment der Trommel, die Leistungen und den Wirkungsgrad des Dieselmotors (Heizwert Diesel ≈ ${f(Hu,1)} kWh/l).`,
  given:[['Kraft an der Frästrommel',F+' kN'],['Trommeldurchmesser',D+' mm'],['Motordrehzahl',nM+' 1/min'],['Übersetzung Getriebe i',i],['Wirkungsgrad Getriebe',f(etaK)],['Druck Hydraulikpumpe',p+' bar'],['Volumenstrom Hydraulikpumpe',Qv+' l/min'],['Wirkungsgrad Pumpe',f(etaP)],['Dieselverbrauch',B+' l/h']],
  ans:[{l:'Trommeldrehzahl',v:nT,u:'1/min'},{l:'Umfangsgeschwindigkeit',v:vT,u:'m/s'},{l:'Drehmoment Trommel',v:MT/1000,u:'kNm'},{l:'Leistung an der Trommel',v:PT/1000,u:'kW'},{l:'Leistung Hydraulikpumpe',v:PH/1000,u:'kW'},{l:'Wirkungsgrad Diesel',v:eta,u:'%'}],
  steps:[{h:'Frästrommel'},{l:'n_T',f:[Q('n_Motor','i'),Q(nM+' 1/min',i),f(nT,1)+' 1/min']},{l:'v',f:[Q('π · d · n','60'),Q(`π · ${f(D/1000,2)} m · ${f(nT,1)} 1/min`,'60 s/min'),f(vT,3)+' m/s']},
    {l:'M',f:['F · r',`${F} kN · ${f(D/2000,2)} m`,f(MT/1000,2)+' kNm']},
    {l:'P_T',f:['F · v',`${F*1000} N · ${f(vT,3)} m/s`,f(PT/1000,2)+' kW']},{l:'P_T,Motor',f:[Q('P_T','η_Getriebe'),Q(f(PT/1000,2)+' kW',f(etaK)),f(PTm/1000,2)+' kW']},
    {h:'Hydraulikpumpe'},{l:'P_H',f:['p · Q',`${p*1e5} N/m² · ${f(Qv/60000,5)} m³/s`,f(PH/1000,2)+' kW']},{l:'P_H,Motor',f:[Q('P_H','η_Pumpe'),Q(f(PH/1000,2)+' kW',f(etaP)),f(PHm/1000,2)+' kW']},
    {h:'Wirkungsgrad Dieselmotor'},{l:'P_ab',f:[`${f(PTm/1000,2)} kW + ${f(PHm/1000,2)} kW`,f(Pab/1000,2)+' kW']},{l:'P_zu',f:['Verbrauch · Heizwert',`${B} l/h · ${f(Hu,1)} kWh/l`,f(Pzu/1000,1)+' kW']},
    {l:'η',f:[Q('P_ab','P_zu'),Q(f(Pab/1000,2)+' kW',f(Pzu/1000,1)+' kW'),f(eta)+' %']}],
  tip:'Hydraulische Leistung P = p · Q – Einheiten in N/m² und m³/s umrechnen (1 bar = 10⁵ N/m², 1 l/min = 1/60000 m³/s).'};}},
{id:'c_hydr',qs:'BT',title:'Hydraulikzylinder: Durchmesser, Zeit, Leistung',src:'H2022 A4 (T), F2025 A5 (T)',gen(){
  const Qv=R(10,60,2),v=R(2,8,0.5),s=R(50,400,10),m=R(1500,8000,100),p=R(100,250,10),n=pick([1,2]);
  const A=Qv/1000/60/(v/60),d=Math.sqrt(4*A/Math.PI)*1000,t=s/1000/(v/60),F=m*9.81,Areq=F/(p*1e5)/n,dreq=Math.sqrt(4*Areq/Math.PI)*1000,P=p*1e5*Qv/60000;
  return {text:`Eine Pumpe fördert ${Qv} l/min in einen Hydraulikzylinder; die Kolbengeschwindigkeit soll ${f(v,1)} m/min betragen. a) Welcher Kolbendurchmesser ist nötig? b) Wie lange dauert ein Hub von ${s} mm? c) Mit ${n} Zylinder(n) und ${p} bar soll eine Masse von ${f(m,0)} kg angehoben werden – welcher Kolbendurchmesser ist je Zylinder mindestens nötig? d) Welche hydraulische Leistung liefert die Pumpe bei ${p} bar?`,
  given:[['Volumenstrom Q',Qv+' l/min'],['Kolbengeschwindigkeit v',f(v,1)+' m/min'],['Hub s',s+' mm'],['Masse',f(m,0)+' kg'],['Druck p',p+' bar'],['Anzahl Zylinder',n]],
  ans:[{l:'Kolbendurchmesser (aus Q und v)',v:d,u:'mm'},{l:'Hubzeit',v:t,u:'s'},{l:'Mindestdurchmesser je Zylinder (Last)',v:dreq,u:'mm'},{l:'hydraulische Leistung',v:P/1000,u:'kW'}],
  steps:[{h:'a) Kolbendurchmesser'},{l:'A',f:[Q('Q','v'),Q(f(Qv/60000,6)+' m³/s',f(v/60,4)+' m/s'),f(A*1e4,2)+' cm²']},{l:'d',f:['√(4 · A / π)',`√(4 · ${f(A*1e4,2)} cm² / π)`,f(d,1)+' mm']},
    {h:'b) Hubzeit'},{l:'t',f:[Q('s','v'),Q(f(s/1000,3)+' m',f(v/60,4)+' m/s'),f(t,2)+' s']},
    {h:'c) Lastfall'},{l:'F',f:['m · g',`${f(m,0)} kg · 9,81 m/s²`,f(F,0)+' N']},{l:'A je Zylinder',f:[Q('F','p · n'),Q(f(F,0)+' N',`${p*1e5} N/m² · ${n}`),f(Areq*1e4,2)+' cm²']},{l:'d',f:['√(4 · A / π)',f(dreq,1)+' mm']},
    {h:'d) Leistung'},{l:'P',f:['p · Q',`${p*1e5} N/m² · ${f(Qv/60000,6)} m³/s`,f(P/1000,2)+' kW']}],
  tip:'Kontinuitätsgleichung: Q = A · v. Für die Kraft gilt F = p · A.'};}},
{id:'c_eantrieb',qs:'BT',title:'Elektroantrieb & Akku: Geschwindigkeit, Strom, Laufzeit',src:'F2023 A2 + A6 (T)',gen(){
  const Pin=R(10,60,5),eta=R(0.55,0.75,0.025),F=Math.round(Pin*1000*eta/(R(15,45,1)/3.6)/100)*100,U=Pin>20?400:96,Wkg=R(100,200,10),mAkku=R(150,500,10),eta2=R(0.88,0.95,0.01),Pm=R(50,120,10),Pl=R(7,22,1);
  const v=Pin*1000*eta/F,vk=v*3.6,I=Pin*1000/U,E=Wkg*mAkku/1000,tmin=E*eta2/Pm*60,tl=E/Pl;
  return {text:`a) Ein elektrischer Bootsantrieb nimmt ${Pin} kW auf (Gesamtwirkungsgrad ${f(eta*100,1)} %). Die erforderliche Vortriebskraft beträgt ${f(F,0)} N. Welche Geschwindigkeit wird erreicht und welcher Strom fließt bei ${U} V Gleichspannung? b) Ein Akku mit ${mAkku} kg Masse und ${Wkg} Wh/kg versorgt einen Motor mit ${Pm} kW Abgabeleistung (η = ${f(eta2)}). Wie viele Minuten kann unter Volllast gefahren werden und wie lange dauert das Laden mit ${Pl} kW?`,
  given:[['Eingangsleistung',Pin+' kW'],['Gesamtwirkungsgrad',f(eta*100,1)+' %'],['Vortriebskraft',f(F,0)+' N'],['Spannung',U+' V'],['Masse Akku',mAkku+' kg'],['Energiedichte Akku',Wkg+' Wh/kg'],['Abgabeleistung Motor (b)',Pm+' kW'],['Wirkungsgrad Motor (b)',f(eta2)],['Ladeleistung',Pl+' kW']],
  ans:[{l:'Geschwindigkeit',v:vk,u:'km/h'},{l:'Stromaufnahme',v:I,u:'A'},{l:'Laufzeit unter Volllast',v:tmin,u:'min'},{l:'Ladezeit',v:tl,u:'h'}],
  steps:[{h:'a) Geschwindigkeit und Strom'},{l:'P_ab',f:['P_zu · η',`${Pin} kW · ${f(eta,3)}`,f(Pin*eta,2)+' kW']},{l:'v',f:[Q('P_ab','F'),Q(f(Pin*eta*1000,0)+' W',f(F,0)+' N'),f(v,2)+' m/s = '+f(vk,1)+' km/h']},
    {l:'I',f:[Q('P','U'),Q(f(Pin*1000,0)+' W',U+' V'),f(I,1)+' A']},
    {h:'b) Akku'},{l:'E',f:['m · Energiedichte',`${mAkku} kg · ${Wkg} Wh/kg`,f(E,1)+' kWh']},
    {l:'t',f:[Q('E · η','P_Motor'),Q(`${f(E,1)} kWh · ${f(eta2)}`,Pm+' kW'),f(tmin/60,3)+' h = '+f(tmin,1)+' min']},
    {l:'t_Laden',f:[Q('E','P_Laden'),Q(f(E,1)+' kWh',Pl+' kW'),f(tl,2)+' h']}],
  tip:'P = F · v gilt auch für Fahrzeuge: die Antriebskraft mal Geschwindigkeit ergibt die Vortriebsleistung.'};}},
{id:'c_pneu_feder',qs:'BT',title:'Einfachwirkender Zylinder mit Rückstellfeder',src:'F2023 A8 (T)',gen(){
  const D=pick([25,32,40,50,63]),p=R(3,7,0.5),eta=R(0.8,0.95,0.05),s=R(20,100,10),c=R(1.5,6,0.5);
  const A=Math.PI*D*D/4,Fth=p*0.1*A,Fw=Fth*eta,Ff=c*s/10,F=Fw-Ff;
  return {text:`Ein einfachwirkender Pneumatikzylinder (D = ${D} mm) mit Rückstellfeder wird zum Stanzen eingesetzt (p = ${f(p,1)} bar, η = ${f(eta)}). Hub ${s} mm, Federrate ${f(c,1)} N/cm. Ermitteln Sie die maximal mögliche Stanzkraft am Hubende.`,
  given:[['Kolbendurchmesser',D+' mm'],['Druck',f(p,1)+' bar'],['Wirkungsgrad',f(eta)],['Hub',s+' mm'],['Federrate',f(c,1)+' N/cm']],
  ans:[{l:'wirksame Kolbenkraft',v:Fw,u:'N'},{l:'Federkraft am Hubende',v:Ff,u:'N'},{l:'Stanzkraft',v:F,u:'N'}],
  steps:[{l:'A',f:[Q('π · D²','4'),Q(`π · (${D} mm)²`,'4'),f(A,1)+' mm²']},{l:'F_eff',f:['p · A · η',`${f(p*0.1,2)} N/mm² · ${f(A,1)} mm² · ${f(eta)}`,f(Fw,1)+' N']},
    {l:'F_Feder',f:['c · s',`${f(c,1)} N/cm · ${f(s/10,1)} cm`,f(Ff,1)+' N']},{l:'F_Stanz',f:['F_eff − F_Feder',`${f(Fw,1)} N − ${f(Ff,1)} N`,f(F,1)+' N']}],
  tip:'Beim einfachwirkenden Zylinder arbeitet der Kolben gegen die Feder – deren Kraft ist am Hubende am größten.'};}},
{id:'c_energiekosten',qs:'BT',title:'Energiekostenvergleich (Pumpen, Öfen)',src:'F2025 A7 (T), H2024 A2 (T)',gen(){
  const p1=R(180,230,5),Q1=R(1.8,3,0.1),eP1=R(0.78,0.85,0.01),eM1=R(0.88,0.92,0.01),p2=p1+R(0,15,5),Q2=r2(Q1-R(0.1,0.4,0.1)),eP2=R(0.9,0.95,0.01),eM2=R(0.93,0.96,0.01),kwh=R(0.08,0.25,0.01),T=pick([1760,2000,3600,4000]);
  const P1=p1*1e5*Q1/1000/(eP1*eM1),P2=p2*1e5*Q2/1000/(eP2*eM2),K1=P1/1000*T*kwh,K2=P2/1000*T*kwh,d=K1-K2,pr=d/K1*100;
  return {text:'Für den Hydraulikantrieb einer Presse stehen eine Regelpumpe und eine servomotorisch angetriebene Pumpe zur Wahl. Die Daten beider Varianten finden Sie in Anlage 1. a) Ermitteln Sie die elektrischen Antriebsleistungen. b) Ermitteln Sie die jährlichen Energiekosten. c) Ermitteln Sie die Kostendifferenz pro Jahr. d) Ermitteln Sie den prozentualen Vorteil der Servopumpe. Tragen Sie die Ergebnisse in die Anlage 1 ein.',
  anlage:{nr:'Anlage 1',title:'Datenblatt und Variantenvergleich Hydraulikantrieb',head:['','Regelpumpe','Servopumpe'],rows:[['Systemdruck',p1+' bar',p2+' bar'],['Volumenstrom',f(Q1,1)+' l/s',f(Q2,1)+' l/s'],['Wirkungsgrad Pumpe',f(eP1),f(eP2)],['Wirkungsgrad Motor',f(eM1),f(eM2)],['a) Antriebsleistung (kW)',{a:0},{a:1}],['b) Energiekosten pro Jahr (€)',{a:4},{a:5}],['c) Kostendifferenz pro Jahr (€)',null,{a:2}],['d) Kostenvorteil (%)',null,{a:3}]]},
  given:[['Energiepreis',f(kwh)+' €/kWh'],['Betriebszeit',f(T,0)+' h pro Jahr']],
  ans:[{l:'Antriebsleistung Regelpumpe',v:P1/1000,u:'kW'},{l:'Antriebsleistung Servopumpe',v:P2/1000,u:'kW'},{l:'Kostendifferenz pro Jahr',v:d,u:'€'},{l:'Kostenvorteil',v:pr,u:'%'},{l:'Energiekosten Regelpumpe',v:K1,u:'€'},{l:'Energiekosten Servopumpe',v:K2,u:'€'}],
  steps:[{h:'Antriebsleistungen'},{l:'P₁',f:[Q('p · Q','η_P · η_M'),Q(`${p1*1e5} N/m² · ${f(Q1/1000,4)} m³/s`,`${f(eP1)} · ${f(eM1)}`),f(P1/1000,2)+' kW']},
    {l:'P₂',f:[Q(`${p2*1e5} N/m² · ${f(Q2/1000,4)} m³/s`,`${f(eP2)} · ${f(eM2)}`),f(P2/1000,2)+' kW']},
    {h:'Energiekosten pro Jahr'},{l:'K₁',f:['P · t · Preis',`${f(P1/1000,2)} kW · ${f(T,0)} h · ${f(kwh)} €/kWh`,e(K1)]},{l:'K₂',f:[`${f(P2/1000,2)} kW · ${f(T,0)} h · ${f(kwh)} €/kWh`,e(K2)]},
    {h:'Vergleich'},{l:'Differenz',f:['K₁ − K₂',`${e(K1)} − ${e(K2)}`,e(d)]},{l:'Vorteil',f:[Q('Differenz','K₁')+' · 100 %',Q(e(d),e(K1))+' · 100 %',f(pr)+' %']}],
  tip:'Antriebsleistung = hydraulische Leistung geteilt durch alle Wirkungsgrade der Kette.'};}},
{id:'c_scher',qs:'MT',title:'Scherung & Flächenpressung an Bolzen',src:'H2021 A5 (T)',gen(){
  const d=pick([6,8,10,12,16,20]),n=2,A=Math.PI*d*d/4,F=Math.max(1,Math.round(R(60,160,5)*n*A/1000)),s=Math.max(6,Math.ceil(F*1000/(d*R(50,140,5)))),tzul=pick([300,360,420,500]),pzul=pick([80,100,120]);
  const tau=F*1000/(n*A),p=F*1000/(d*s),Sf=tzul/tau;
  return {text:`Ein Zylinderstift Ø ${d} mm verbindet eine Gabel mit einem Hebel (zweischnittig) und wird mit F = ${F} kN belastet. Die Hebeldicke beträgt ${s} mm. Berechnen Sie Scherspannung und Flächenpressung im Hebel, die Sicherheit gegen Abscheren (Scherfestigkeit des Stiftes τaB = ${tzul} N/mm²) und prüfen Sie die Flächenpressung (p_zul = ${pzul} N/mm²).`,
  given:[['Kraft F',F+' kN'],['Stiftdurchmesser d',d+' mm'],['Schnittzahl','2'],['Hebeldicke s',s+' mm'],['Scherfestigkeit τaB',tzul+' N/mm²'],['p zulässig (Hebel)',pzul+' N/mm²']],
  ans:[{l:'Scherspannung τ',v:tau,u:'N/mm²'},{l:'Flächenpressung p',v:p,u:'N/mm²'},{l:'Sicherheit',v:Sf,u:''}],
  steps:[{h:'Abscheren'},{l:'A',f:[Q('π · d²','4'),Q(`π · (${d} mm)²`,'4'),f(A,2)+' mm²']},{l:'τ',f:[Q('F','n · A'),Q(F*1000+' N',`2 · ${f(A,2)} mm²`),f(tau,1)+' N/mm²']},
    {h:'Flächenpressung'},{l:'p',f:[Q('F','d · s'),Q(F*1000+' N',`${d} mm · ${s} mm`),f(p,1)+' N/mm²']},
    {h:'Sicherheit'},{l:'ν',f:[Q('τaB','τ_vorh'),Q(tzul+' N/mm²',f(tau,1)+' N/mm²'),f(Sf,2)]},{t:`Sicherheit gegen Abscheren ν = ${f(Sf,2)}${Sf>=2?' – ausreichend (üblich ≥ 2).':' – zu gering, größeren Stift wählen.'} Flächenpressung ${f(p,1)} N/mm² ${p<=pzul?'≤':'>'} p_zul = ${pzul} N/mm²${p<=pzul?' – zulässig.':' – zu hoch, Hebel dicker ausführen.'}`}],
  tip:'Zweischnittig: Der Stift wird an zwei Querschnitten abgeschert – die Kraft verteilt sich auf 2 · A.'};}},
{id:'c_schweiss',qs:'MT',title:'Tragfähigkeit Kehlnaht',src:'F2024 A6 (O)',gen(){
  const a=pick([3,4,5,6]),b=R(40,150,10),ant=pick([0.8,0.9,1]),nN=pick([1,2]),tz=pick([95,110,135]);
  const l=b*ant,A=a*l*nN,F=A*tz;
  return {text:`Ein Flachstahl (Breite ${b} mm) wird mit ${nN===2?'zwei Kehlnähten (beidseitig)':'einer Kehlnaht'} a = ${a} mm an einen Träger geschweißt. Als tragende Nahtlänge gelten ${f(ant*100,0)} % der Breite. Zulässige Schubspannung der Naht ${tz} N/mm² (Sicherheit bereits enthalten). Ermitteln Sie die maximal zulässige Gewichtskraft.`,
  given:[['Nahtdicke a',a+' mm'],['Flachstahlbreite',b+' mm'],['tragender Anteil',f(ant*100,0)+' %'],['Anzahl Nähte',nN],['zulässige Schubspannung der Naht',tz+' N/mm²']],
  ans:[{l:'tragende Nahtfläche',v:A,u:'mm²'},{l:'zulässige Kraft',v:F,u:'N'}],
  steps:[{l:'l',f:[`b · ${f(ant)}`,`${b} mm · ${f(ant)}`,f(l,1)+' mm']},{l:'A',f:['a · l · Nahtanzahl',`${a} mm · ${f(l,1)} mm · ${nN}`,f(A,1)+' mm²']},
    {l:'F_zul',f:['A · τ_zul',`${f(A,1)} mm² · ${tz} N/mm²`,f(F,0)+' N = '+f(F/1000,2)+' kN']}],
  tip:'Die rechnerische Nahtfläche einer Kehlnaht ist a · l (a = Nahtdicke).'};}},
{id:'c_hebel',qs:'MT',title:'Hebel und Lagerkräfte (Momentengleichgewicht)',src:'H2021 A5 (O)',gen(){
  const FB=R(800,4000,100),l1=R(40,120,5),l2=R(80,250,5),al=pick([0,30,45,60]);
  const FA=FB*Math.cos(al*D2R)*l1/l2,FC=Math.hypot(FB*Math.cos(al*D2R)+FA,FB*Math.sin(al*D2R));
  return {text:`Ein zweiarmiger Hebel ist im Punkt C drehbar gelagert. Im Abstand l₁ = ${l1} mm greift die Kraft F_B = ${FB} N an (Winkel ${al}° zur Senkrechten auf den Hebel), im Abstand l₂ = ${l2} mm auf der anderen Seite stützt sich der Hebel senkrecht im Punkt A ab. Ermitteln Sie F_A und die Lagerkraft F_C (Hebel waagerecht, Kräfte in der Ebene).`,
  given:[['Kraft F_B (Punkt B)',FB+' N'],['Abstand l₁ (B–C)',l1+' mm'],['Abstand l₂ (C–A)',l2+' mm'],['Winkel der Kraft F_B zur Senkrechten',al+'°']],
  ans:[{l:'Kraft F_A',v:FA,u:'N'},{l:'Lagerkraft F_C',v:FC,u:'N'}],
  steps:[{h:'Momentengleichgewicht um C'},{t:'Nur der senkrechte Anteil von F_B erzeugt ein Moment: F_B,y = F_B · cos α'},
    {l:'Σ M_C = 0',f:['F_B · cos α · l₁ = F_A · l₂']},{l:'F_A',f:[Q('F_B · cos α · l₁','l₂'),Q(`${FB} N · cos ${al}° · ${l1} mm`,l2+' mm'),f(FB*Math.cos(al*D2R)*l1/l2,1)+' N']},
    {h:'Lagerkraft in C'},{l:'F_Cy',f:['F_B · cos α + F_A',f(FB*Math.cos(al*D2R)+FB*Math.cos(al*D2R)*l1/l2,1)+' N']},{l:'F_Cx',f:['F_B · sin α',f(FB*Math.sin(al*D2R),1)+' N']},
    {l:'F_C',f:['√(F_Cx² + F_Cy²)',f(Math.hypot(FB*Math.sin(al*D2R),FB*Math.cos(al*D2R)*(1+l1/l2)),1)+' N']}],
  tip:'Momentensatz: Summe aller Momente um den Drehpunkt = 0. Nur Kraftanteile senkrecht zum Hebelarm erzeugen ein Moment.'};
  }},
{id:'c_vakuum',qs:'MT',title:'Vakuumheber: Anzahl der Sauger',src:'H2024 A6 (T)',gen(){
  const L=R(1000,3000,50),B=R(800,1600,50),t=R(20,80,5),rho=2.7,As=pick([200,250,340,400]),pu=R(0.3,0.6,0.05),S=pick([2,3]);
  const m=L*B*t/1e6*rho,F=m*9.81,Fs=(1-pu)*1e5*As/1e4,n=F*S/Fs,N=Math.ceil(n);
  return {text:`Eine Aluminiumplatte ${t} × ${B} × ${L} mm (ρ = 2,7 kg/dm³) soll mit einer Vakuum-Hebeanlage angehoben werden. Wirksame Fläche je Sauger ${As} cm², Umgebungsdruck 1 bar, absoluter Druck im Sauger ${f(pu,2)} bar, Sicherheitsfaktor ${S}. Wie viele Sauger sind nötig?`,
  given:[['Plattenmaß',`${t} × ${B} × ${L} mm`],['Dichte Aluminium','2,7 kg/dm³'],['Saugerfläche',As+' cm²'],['Druck im Sauger (absolut)',f(pu,2)+' bar'],['Sicherheit',S]],
  ans:[{l:'Gewichtskraft',v:F,u:'N'},{l:'Haltekraft je Sauger',v:Fs,u:'N'},{l:'Anzahl Sauger',v:N,u:'Stück'}],
  steps:[{l:'m',f:['V · ρ',`${f(t/100,1)} dm · ${f(B/100,1)} dm · ${f(L/100,1)} dm · 2,7 kg/dm³`,f(m,1)+' kg']},{l:'F_G',f:['m · g',`${f(m,1)} kg · 9,81 m/s²`,f(F,0)+' N']},
    {l:'Δp',f:['1 bar − '+f(pu,2)+' bar',f(1-pu,2)+' bar = '+f((1-pu)*10,1)+' N/cm²']},{l:'F_Sauger',f:['Δp · A',`${f((1-pu)*10,1)} N/cm² · ${As} cm²`,f(Fs,0)+' N']},
    {l:'n',f:[Q('F_G · S','F_Sauger'),Q(`${f(F,0)} N · ${S}`,f(Fs,0)+' N'),f(n,2)+' → '+N+' Sauger']}],
  tip:'Haltekraft = Druckdifferenz × Fläche. 1 bar = 10 N/cm².'};}},
{id:'c_bewegung',qs:'MT',title:'Bewegungsablauf: Beschleunigen, Fahren, Bremsen',src:'H2020 A2 (T)',gen(){
  const a1=R(0.5,1.5,0.1),v=R(0.1,0.4,0.01),a2=R(0.6,1.8,0.1),s=R(400,1200,50)/1000;
  const t1=v/a1,s1=v*v/(2*a1),t3=v/a2,s3=v*v/(2*a2),s2=s-s1-s3,t2=s2/v,T=t1+t2+t3;
  return {text:`Eine Hubeinheit beschleunigt mit a₁ = ${f(a1,1)} m/s² auf v = ${f(v)} m/s, fährt dann gleichförmig und bremst mit a₂ = ${f(a2,1)} m/s² bis zum Stillstand. Gesamtweg ${f(s*1000,0)} mm. Bestimmen Sie die Teilzeiten, die Teilwege und die Gesamtzeit.`,
  given:[['Beschleunigung a₁',f(a1,1)+' m/s²'],['Geschwindigkeit v',f(v)+' m/s'],['Verzögerung a₂',f(a2,1)+' m/s²'],['Gesamtweg',f(s*1000,0)+' mm']],
  ans:[{l:'Beschleunigungszeit t₁',v:t1,u:'s'},{l:'Weg gleichförmig s₂',v:s2*1000,u:'mm'},{l:'Gesamtzeit',v:T,u:'s'}],
  steps:[{h:'Beschleunigen'},{l:'t₁',f:[Q('v','a₁'),Q(f(v)+' m/s',f(a1,1)+' m/s²'),f(t1,3)+' s']},{l:'s₁',f:[Q('v²','2 · a₁'),Q(`(${f(v)} m/s)²`,`2 · ${f(a1,1)} m/s²`),f(s1*1000,2)+' mm']},
    {h:'Bremsen'},{l:'t₃',f:[Q('v','a₂'),f(t3,3)+' s']},{l:'s₃',f:[Q('v²','2 · a₂'),f(s3*1000,2)+' mm']},
    {h:'Gleichförmige Fahrt'},{l:'s₂',f:['s − s₁ − s₃',`${f(s*1000,0)} − ${f(s1*1000,2)} − ${f(s3*1000,2)} mm`,f(s2*1000,2)+' mm']},{l:'t₂',f:[Q('s₂','v'),f(t2,3)+' s']},
    {h:'Gesamtzeit'},{l:'t',f:['t₁ + t₂ + t₃',f(T,3)+' s']}],
  tip:'Bei gleichmäßig beschleunigter Bewegung aus dem Stand: s = v² / (2a) und t = v / a.'};}},
{id:'c_schneiden',qs:'FT',title:'Brenn- und Laserschneiden: Schneidzeit',src:'F2024 A4 (T), H2020 A4 (T)',gen(){
  const a=R(200,800,10),b=R(150,500,10),dL=R(30,120,10),nL=pick([1,2,4]),vs=R(250,700,10),n=R(20,250,10),zu=pick([10,15,20]),gas=R(10,20,1);
  const L=2*(a+b)+nL*Math.PI*dL,t1=L/vs,tA=t1*n,tG=tA*(1+zu/100),gv=gas*t1*n/60;
  return {text:`Aus Blech werden ${n} Platten ${a} × ${b} mm mit ${nL} Bohrung(en) Ø ${dL} mm brenngeschnitten (Schneidgeschwindigkeit ${vs} mm/min). Für Rüsten, Eilgang und Anschneiden wird ein Zuschlag von ${zu} % gerechnet. Ermitteln Sie Schnittlänge je Platte, Schneidzeit für den Auftrag und den Gasverbrauch (${gas} m³/h während des Schneidens).`,
  given:[['Plattenmaß',`${a} × ${b} mm`],['Bohrungen',`${nL} × Ø ${dL} mm`],['Stückzahl',n],['Schneidgeschwindigkeit',vs+' mm/min'],['Zuschlag',zu+' %'],['Gasverbrauch',gas+' m³/h']],
  ans:[{l:'Schnittlänge je Platte',v:L,u:'mm'},{l:'Schneidzeit Auftrag (mit Zuschlag)',v:tG,u:'min'},{l:'Gasverbrauch',v:gv,u:'m³'}],
  steps:[{l:'L',f:['2 · (a + b) + n · π · d',`2 · (${a} + ${b}) mm + ${nL} · π · ${dL} mm`,f(L,1)+' mm']},{l:'t je Platte',f:[Q('L','v'),Q(f(L,1)+' mm',vs+' mm/min'),f(t1,3)+' min']},
    {l:'t Auftrag',f:[`t · n · (1 + ${f(zu/100)})`,`${f(t1,3)} min · ${n} · ${f(1+zu/100)}`,f(tG,1)+' min = '+f(tG/60,2)+' h']},
    {l:'Gas',f:['Verbrauch · reine Schneidzeit',`${gas} m³/h · ${f(t1*n/60,3)} h`,f(gv,2)+' m³']}],
  tip:'Außenkontur und alle Innenkonturen addieren. Gas nur für die reine Schneidzeit rechnen.'};}},
{id:'c_schneidkraft',qs:'FT',title:'Schneidkraft und Schneidarbeit (Stanzen)',src:'H2020 A6 (O)',gen(){
  const a=R(40,200,5),b=R(30,150,5),s=pick([1,1.5,2,3,4,5]),Rm=pick([370,420,510,600]),k=pick([0.8,0.7]),x=2/3;
  const l=2*(a+b),tauB=k*Rm,F=l*s*tauB,W=F*s/1000*x;
  return {text:`Eine Rechteckplatte ${a} × ${b} mm wird aus Blech s = ${s} mm (Rm = ${Rm} N/mm²) ausgeschnitten. Scherfestigkeit τ_aB ≈ ${f(k,1)} · Rm. Ermitteln Sie Schneidkraft und Schneidarbeit (Korrekturfaktor x = 2/3).`,
  given:[['Teilemaß',`${a} × ${b} mm`],['Blechdicke s',s+' mm'],['Zugfestigkeit Rm',Rm+' N/mm²'],['τ_aB',`${f(k,1)} · Rm`],['Faktor x','2/3']],
  ans:[{l:'Schnittlänge',v:l,u:'mm'},{l:'Schneidkraft',v:F/1000,u:'kN'},{l:'Schneidarbeit',v:W,u:'J'}],
  steps:[{l:'l',f:['2 · (a + b)',`2 · (${a} + ${b}) mm`,f(l,0)+' mm']},{l:'τ_aB',f:[`${f(k,1)} · Rm`,`${f(k,1)} · ${Rm} N/mm²`,f(tauB,0)+' N/mm²']},
    {l:'F',f:['l · s · τ_aB',`${f(l,0)} mm · ${s} mm · ${f(tauB,0)} N/mm²`,f(F,0)+' N = '+f(F/1000,1)+' kN']},
    {l:'W',f:['F · s · x',`${f(F,0)} N · ${f(s/1000,4)} m · 2/3`,f(W,1)+' J']}],
  tip:'Schneidkraft = Schnittlänge × Blechdicke × Scherfestigkeit.'};}},
{id:'c_heizwert',qs:'BT',title:'Betriebsheizwert Erdgas',src:'H2022 A3 (T)',gen(){
  const Hn=R(9.5,11.5,0.02),p=R(960,1040,5),T=R(5,30,1),V=R(5000,30000,500),pr=R(0.06,0.14,0.01);
  const HB=Hn*(p/1013.25)*(273.15/(273.15+T)),E=V*HB,K=E*pr;
  return {text:`Erdgas hat im Normzustand (0 °C, 1013,25 mbar) einen Heizwert von ${f(Hn,2)} kWh/m³. Ermitteln Sie den Betriebsheizwert bei ${p} mbar (absolut) und ${T} °C sowie Energie und Kosten für ${f(V,0)} m³ Betriebsvolumen bei ${f(pr)} €/kWh.`,
  given:[['Heizwert Normzustand',f(Hn,2)+' kWh/m³'],['Betriebsdruck',p+' mbar'],['Betriebstemperatur',T+' °C'],['Gasvolumen',f(V,0)+' m³'],['Gaspreis',f(pr)+' €/kWh']],
  ans:[{l:'Betriebsheizwert',v:HB,u:'kWh/m³'},{l:'Energie',v:E,u:'kWh'},{l:'Kosten',v:K,u:'€'}],
  steps:[{l:'H_B',f:['H_n · '+Q('p_B','p_n')+' · '+Q('T_n','T_B'),`${f(Hn,2)} · `+Q(p+' mbar','1013,25 mbar')+' · '+Q('273,15 K',f(273.15+T,2)+' K'),f(HB,3)+' kWh/m³']},
    {l:'E',f:['V · H_B',`${f(V,0)} m³ · ${f(HB,3)} kWh/m³`,f(E,0)+' kWh']},{l:'K',f:['E · Preis',`${f(E,0)} kWh · ${f(pr)} €/kWh`,e(K)]}],
  tip:'Gasgesetz: Volumen ändert sich mit Druck und absoluter Temperatur (Kelvin!).'};}},
// ── Organisation ──
{id:'c_bestell',qs:'PS',title:'Bestellpunkt, Lagerkosten & optimale Bestellmenge',src:'F2020 A2 (O), H2020 A6 (T)',gen(){
  const J=R(1200,6000,100),LB=R(150,600,10),SB=R(30,120,10),p=R(5,40,0.5),Kb=R(30,120,5),Q0=R(200,800,50),wbz=R(5,15,1),lhs=R(10,20,0.5),T=360;
  const tv=J/T,avg=Q0/2+SB,KbJ=J/Q0*Kb,MB=tv*wbz+SB,tage=(LB-MB)/tv,Qopt=Math.sqrt(200*J*Kb/(p*lhs)),hopt=J/Qopt,KL=(Q0/2+SB)*p*lhs/100,KLopt=(Qopt/2+SB)*p*lhs/100,Kg=KbJ+KL,KgO=J/Qopt*Kb+KLopt;
  if(tage<2)return this.gen();
  return {text:`Für ein Normteil gilt das Bestellpunktverfahren (360 Tage/Jahr). Ermitteln Sie den durchschnittlichen Lagerbestand, die jährlichen Bestellkosten, den Meldebestand, nach wie vielen Tagen bestellt werden muss, die optimale Bestellmenge (Andler) und die optimale Bestellhäufigkeit.`,
  given:[['Jahresbedarf',f(J,0)+' Stück'],['aktueller Lagerbestand',LB+' Stück'],['Sicherheitsbestand',SB+' Stück'],['Einstandspreis',e(p)+'/Stück'],['bestellfixe Kosten',e(Kb)+'/Bestellung'],['aktuelle Bestellmenge',Q0+' Stück'],['Beschaffungszeit',wbz+' Tage'],['Lagerhaltungskostensatz',f(lhs,1)+' % p. a.']],
  ans:[{l:'Ø Lagerbestand',v:avg,u:'Stück'},{l:'Bestellkosten pro Jahr',v:KbJ,u:'€'},{l:'Meldebestand',v:MB,u:'Stück'},{l:'Tage bis zur Bestellung',v:tage,u:'Tage'},{l:'optimale Bestellmenge',v:Qopt,u:'Stück'},{l:'optimale Bestellhäufigkeit',v:hopt,u:'pro Jahr'}],
  steps:[{h:'Lagerbestand und Bestellkosten'},{l:'Ø Bestand',f:[Q('Bestellmenge','2')+' + Sicherheitsbestand',Q(Q0,'2')+` + ${SB}`,f(avg,0)+' Stück']},
    {l:'Bestellkosten',f:[Q('Jahresbedarf','Bestellmenge')+' · Kosten je Bestellung',Q(f(J,0),Q0)+' · '+e(Kb),e(KbJ)]},
    {h:'Zeitpunkt der nächsten Bestellung'},{l:'Tagesbedarf',f:[Q(f(J,0)+' Stück','360 Tage'),f(tv,2)+' Stück/Tag']},
    {l:'Meldebestand',f:['Tagesbedarf · Beschaffungszeit + SB',`${f(tv,2)} · ${wbz} + ${SB}`,f(MB,1)+' Stück']},
    {l:'Tage',f:[Q('Lagerbestand − Meldebestand','Tagesbedarf'),Q(`${LB} − ${f(MB,1)}`,f(tv,2)),f(tage,1)+' Tage']},
    {h:'Optimale Bestellmenge (Andler)'},{l:'x_opt',f:['√'+Q('200 · Jahresbedarf · Bestellkosten','Einstandspreis · Lagerhaltungskostensatz'),'√'+Q(`200 · ${f(J,0)} · ${f(Kb,2)}`,`${f(p,2)} · ${f(lhs,1)}`),f(Qopt,1)+' Stück']},
    {l:'Häufigkeit',f:[Q('Jahresbedarf','x_opt'),Q(f(J,0),f(Qopt,1)),f(hopt,2)+' Bestellungen/Jahr']},
    {t:`Gesamtkosten (Bestell- + Lagerkosten): bisher ${e(Kg)}, optimal ${e(KgO)} → Einsparpotenzial ${f((Kg-KgO)/Kg*100)} %. Ein höherer Lagerhaltungskostensatz verkleinert die optimale Bestellmenge.`}],
  tip:'Ø Lagerbestand beim Bestellpunktverfahren: halbe Bestellmenge plus Sicherheitsbestand.'};}},
{id:'c_beumsatz',qs:'KW',title:'Break-even-Umsatz & Betriebsergebnis',src:'F2020 A6 (O)',gen(){
  const h=R(4000,10000,100),p=R(120,220,5),lohn=R(28,45,1),pnk=R(60,90,5),GK=R(400000,1000000,1000),gv=R(30,50,1)/100;
  const U=h*p,LK=h*lohn*(1+pnk/100),GKv=GK*gv,GKf=GK-GKv,Kv=LK+GKv,dbq=(U-Kv)/U,BEU=GKf/dbq,BE=U-Kv-GKf;
  if(dbq<0.15||BEU>U*1.6)return this.gen();
  return {text:`Für ein Quartal sind ${f(h,0)} Servicestunden zu je ${e(p)} geplant. Der Stundenlohn beträgt ${e(lohn)} zuzüglich ${pnk} % Personalnebenkosten (variabel). Die Gemeinkosten betragen ${e(GK)}, davon ${f(gv*100,0)} % variabel. Ermitteln Sie Break-even-Umsatz und Betriebsergebnis.`,
  given:[['abrechenbare Stunden pro Jahr',f(h,0)+' h'],['Erlös je Stunde',e(p)],['Stundenlohn',e(lohn)],['Personalnebenkosten',pnk+' %'],['Gemeinkosten',e(GK)],['davon variabel',f(gv*100,0)+' %']],
  ans:[{l:'Umsatz',v:U,u:'€'},{l:'Deckungsbeitragsquote',v:dbq*100,u:'%'},{l:'Break-even-Umsatz',v:BEU,u:'€'},{l:'Betriebsergebnis',v:BE,u:'€'}],
  steps:[{h:'Umsatz und Kosten'},{l:'Umsatz',f:['Stunden · Erlös je Stunde',`${f(h,0)} h · ${e(p)}`,e(U)]},{l:'Lohnkosten',f:[`Stunden · Lohn · (1 + ${f(pnk/100)})`,`${f(h,0)} · ${e(lohn)} · ${f(1+pnk/100)}`,e(LK)]},
    {tab:[['','Betrag'],['variable Lohnkosten',e(LK)],['+ variable Gemeinkosten',e(GKv)],['= variable Kosten',e(Kv),'s'],['fixe Gemeinkosten',e(GKf)]],head:true},
    {h:'Deckungsbeitrag'},{l:'DB-Quote',f:[Q('Umsatz − variable Kosten','Umsatz'),Q(`${e(U)} − ${e(Kv)}`,e(U)),f(dbq*100)+' %']},
    {l:'BE-Umsatz',f:[Q('Fixkosten','DB-Quote'),Q(e(GKf),f(dbq,4)),e(BEU)]},
    {l:'Ergebnis',f:['Umsatz − variable Kosten − Fixkosten',`${e(U)} − ${e(Kv)} − ${e(GKf)}`,e(BE)]}],
  tip:'Break-even-Umsatz = Fixkosten / Deckungsbeitragsquote.'};}},
{id:'c_prio',qs:'PS',title:'Prioritätsregeln: Durchlaufzeit & Verspätung',src:'F2020 A6 (T), F2023 A5 (O)',gen(){
  const N='ABCDE'.split(''),jobs=N.map(n=>({n,t:R(2,12,1)}));let c=0;jobs.forEach(j=>{c+=j.t;j.d=Math.round(c*R(0.6,1.4,0.1))});
  const run=order=>{let t=0;return order.map(j=>{t+=j.t;return {...j,end:t,late:Math.max(0,t-j.d)}})};
  const loz=run([...jobs].sort((a,b)=>b.t-a.t)),koz=run([...jobs].sort((a,b)=>a.t-b.t)),lt=run([...jobs].sort((a,b)=>a.d-b.d||a.t-b.t));
  const avg=(r,k)=>r.reduce((s,x)=>s+x[k],0)/r.length;
  const tab=(name,r)=>[{h:name},{tab:[['Reihenfolge','Bearbeitung (h)','Fertig (h)','Termin (h)','Verspätung (h)'],...r.map(x=>[x.n,x.t,x.end,x.d,x.late]),['Mittelwert','',f(avg(r,'end')),'',f(avg(r,'late')),'s']],head:true}];
  return {text:'Fünf Aufträge sind zum Zeitpunkt 0 verfügbar und werden nacheinander auf einer Anlage bearbeitet. Bestimmen Sie die Reihenfolge nach der KOZ-Regel (kürzeste Operationszeit), der LOZ-Regel (längste Operationszeit) und der Liefertermin-Regel und jeweils die mittlere Durchlaufzeit und die mittlere Verspätung.',
  gtab:{head:['Auftrag','Bearbeitungszeit','Liefertermin (Stunden ab jetzt)'],rows:jobs.map(j=>[j.n,j.t+' h',j.d+' h'])},
  given:[],
  ans:[{l:'mittlere DLZ nach KOZ',v:avg(koz,'end'),u:'h'},{l:'mittlere DLZ nach LOZ',v:avg(loz,'end'),u:'h'},{l:'mittlere Verspätung nach Liefertermin',v:avg(lt,'late'),u:'h'}],
  steps:[...tab('KOZ-Regel',koz),...tab('LOZ-Regel',loz),...tab('Liefertermin-Regel',lt),{t:'KOZ minimiert die mittlere Durchlaufzeit, die Liefertermin-Regel meist die Verspätungen; LOZ ist hier am ungünstigsten.'}],
  tip:'Durchlaufzeit eines Auftrags = Fertigstellungszeitpunkt (alle starten bei 0).'};}},
{id:'c_makebuy',qs:'KW',title:'Eigenfertigung oder Fremdbezug bei Engpass',src:'F2021 A3 (O)',gen(){
  const vs=['Typ 06','Typ 09','Typ 12','Typ 18','Typ 24'].map(n=>{const kv=R(10,25,0.5);return {n,m:R(60,220,10),te:R(30,110,10),kv,fp:r2(kv+R(8,25,1))}});
  const cap=R(300,420,10)*60;vs.forEach(v=>{v.vor=(v.fp-v.kv)/v.te});const need=vs.reduce((s,v)=>s+v.m*v.te,0);if(need<=cap)return this.gen();
  const ord=[...vs].sort((a,b)=>b.vor-a.vor);let rest=cap,plan=[];for(const v of ord){const x=Math.min(v.m,Math.floor(rest/v.te));rest-=x*v.te;plan.push({...v,eig:x,fremd:v.m-x})}
  const K=plan.reduce((s,v)=>s+v.eig*v.kv+v.fremd*v.fp,0);
  const pl=v=>plan.find(x=>x.n===v.n);
  return {text:`Alle Varianten können selbst gefertigt oder fremdbezogen werden. Die Eigenfertigung ist Engpass (Kapazität ${f(cap/60,0)} h im Monat, Bedarf ${f(need/60,1)} h). a) Ermitteln Sie in Anlage 1 die Ersparnis der Eigenfertigung je Stück und je Engpassminute und legen Sie die Rangfolge fest. b) Legen Sie die Mengen für die Eigenfertigung fest (Fixkosten bleiben unverändert). c) Ermitteln Sie die variablen Gesamtkosten.`,
  anlage:{nr:'Anlage 1',title:'Entscheidung Eigenfertigung / Fremdbezug',note:'Ersparnis = Fremdbezugspreis − variable Kosten. Ersparnis je Engpassminute = Ersparnis / Fertigungszeit. Rang 1 = höchste Ersparnis je Minute.',head:['Typ','Menge (St.)','Fertigungs\u00ADzeit (min/St.)','var. Kosten (€/St.)','Fremd\u00ADbezugs\u00ADpreis (€/St.)','Ersparnis (€/St.)','Ersparnis je min (€)','Rang','Eigen\u00ADfertigung (St.)'],rows:vs.map((v,i)=>[v.n.replace('Typ ',''),v.m,v.te,f(v.kv),f(v.fp),{a:2+i},{a:7+i},{a:12+i},{a:17+i}])},
  given:[],
  ans:[{l:`Eigenfertigung ${ord[0].n} (Stück)`,v:plan[0].eig,u:'St.'},{l:'variable Gesamtkosten',v:K,u:'€'},...vs.map(v=>({l:'Ersparnis '+v.n,v:v.fp-v.kv,u:'€'})),...vs.map(v=>({l:'Ersparnis je min '+v.n,v:v.vor,u:'€',tol:0.01,abs:0.002})),...vs.map(v=>({l:'Rang '+v.n,v:ord.indexOf(v)+1,u:'',tol:0,abs:0.01})),...vs.map(v=>({l:'Eigenfertigung '+v.n,v:pl(v).eig,u:'St.',tol:0,abs:0.5}))],
  steps:[{h:'Vorteil der Eigenfertigung je Engpassminute'},{tab:[['Variante','Ersparnis/St.','te (min)','Ersparnis je min','Rang'],...ord.map((v,k)=>[v.n,e(v.fp-v.kv),v.te,f(v.vor,3)+' €',k+1])],head:true},
    {t:'Die Variante mit dem höchsten Vorteil je Engpassminute wird zuerst selbst gefertigt (relativer Deckungsbeitrag).'},
    {h:'Belegung der Engpasskapazität'},{tab:[['Variante','Eigen (St.)','Zeit (min)','Fremd (St.)','Kosten'],...plan.map(v=>[v.n,v.eig,v.eig*v.te,v.fremd,e(v.eig*v.kv+v.fremd*v.fp)]),['Summe','',f(cap-rest,0),'',e(K),'s']],head:true}],
  tip:'Bei einem Engpass entscheidet nicht die Ersparnis pro Stück, sondern die Ersparnis pro Engpasseinheit (Minute).'};}},
{id:'c_netzplan',qs:'PS',title:'Netzplan: Projektdauer & kritischer Weg',src:'F2021 A5 (O), H2024 A4 (O)',gen(){
  const names=['A Angebote einholen','B Hardware bestellen','C Software anpassen','D Verkabelung','E Montage Sensoren','F Test','G Schulung','H Abnahme'];
  const pre=[[],[0],[0],[1],[1],[2,3,4],[2],[5,6]];const du=names.map(()=>R(1,8,1));
  const FAZ=[],FEZ=[];names.forEach((_,i)=>{FAZ[i]=Math.max(0,...pre[i].map(p=>FEZ[p]));FEZ[i]=FAZ[i]+du[i]});
  const end=Math.max(...FEZ),SEZ=[],SAZ=[];for(let i=names.length-1;i>=0;i--){const succ=pre.map((p,k)=>p.includes(i)?k:-1).filter(k=>k>=0);SEZ[i]=succ.length?Math.min(...succ.map(k=>SAZ[k])):end;SAZ[i]=SEZ[i]-du[i]}
  const GP=names.map((_,i)=>SAZ[i]-FAZ[i]),crit=names.filter((_,i)=>GP[i]===0).map(n=>n[0]);
  return {text:'Für ein Digitalisierungsprojekt liegt die Vorgangsliste vor. a) Ermitteln Sie in Anlage 1 die früheste und späteste Lage aller Vorgänge und die Gesamtpuffer (Vorwärts- und Rückwärtsrechnung). b) Geben Sie die Projektdauer an und nennen Sie den kritischen Weg.',
  given:[],
  anlage:{nr:'Anlage 1',title:'Vorgangsliste mit Zeitberechnung (Tage)',note:'FAZ/FEZ = früheste Anfangs-/Endzeit, SAZ/SEZ = späteste Anfangs-/Endzeit, GP = Gesamtpuffer. Projektbeginn = 0.',head:['Vorgang','Dauer','Vorgänger','FAZ','FEZ','SAZ','SEZ','GP'],
    rows:names.map((n,i)=>[n,du[i],pre[i].length?pre[i].map(p=>names[p][0]).join(', '):'–',{a:3+i*5},{a:4+i*5},{a:5+i*5},{a:6+i*5},{a:7+i*5}])},
  ans:[{l:'Projektdauer',v:end,u:'Tage'},{l:'Gesamtpuffer Vorgang C',v:GP[2],u:'Tage'},{l:'Gesamtpuffer Vorgang G',v:GP[6],u:'Tage'},
    ...names.flatMap((n,i)=>[{l:`FAZ ${n[0]}`,v:FAZ[i],u:'',tol:0,abs:0.01},{l:`FEZ ${n[0]}`,v:FEZ[i],u:'',tol:0,abs:0.01},{l:`SAZ ${n[0]}`,v:SAZ[i],u:'',tol:0,abs:0.01},{l:`SEZ ${n[0]}`,v:SEZ[i],u:'',tol:0,abs:0.01},{l:`GP ${n[0]}`,v:GP[i],u:'',tol:0,abs:0.01}])],
  steps:[{h:'Vorwärtsrechnung (FAZ, FEZ) und Rückwärtsrechnung (SAZ, SEZ)'},{tab:[['Vorgang','Dauer','FAZ','FEZ','SAZ','SEZ','GP'],...names.map((n,i)=>[n,du[i],FAZ[i],FEZ[i],SAZ[i],SEZ[i],GP[i]])],head:true},
    {l:'FEZ',f:['FAZ + Dauer']},{l:'FAZ',f:['größter FEZ aller Vorgänger']},{l:'SAZ',f:['SEZ − Dauer']},{l:'SEZ',f:['kleinster SAZ aller Nachfolger']},{l:'GP',f:['SAZ − FAZ']},
    {t:`Projektdauer: ${end} Tage. Kritischer Weg (Puffer 0): ${crit.join(' → ')}.`}],
  tip:'Kritischer Weg = alle Vorgänge ohne Puffer. Jede Verzögerung dort verschiebt das Projektende.'};}},
{id:'c_kapazitaet',qs:'PS',title:'Kapazitätsbedarf und -bestand',src:'H2021 A4 (O)',gen(){
  const N=R(240,960,12),pro=pick([8,10,12,16]),tr=R(30,120,15),te=R(15,30,1),anl=pick([1,2,3]),wo=13,h=pick([24,16]),tg=pick([7,5]),verf=R(85,98,1);
  const dg=Math.ceil(N/pro),KB=dg*(tr/60+te),KBest=anl*wo*tg*h*verf/100,vor=Math.round(KBest*R(0.4,0.8,0.05)/10)*10,ausl=(KB+vor)/KBest*100;if(ausl>150)return this.gen();
  return {text:`Für einen Auftrag über ${N} Teile (${pro} Teile je Durchgang) ist die Kapazität zu planen. Rüstzeit ${tr} min, Bearbeitungszeit ${te} h je Durchgang. Es stehen ${anl} Anlage(n) für ein Quartal (13 Wochen, ${tg} Tage, ${h} h/Tag) mit ${verf} % Verfügbarkeit bereit; ${f(vor,0)} h sind bereits verplant.`,
  given:[['Teile',N],['Teile je Durchgang',pro],['Rüstzeit je Durchgang',tr+' min'],['Bearbeitungszeit je Durchgang',te+' h'],['Anlagen',anl],['Planungszeitraum','13 Wochen'],['Arbeitstage je Woche',tg],['Betriebsstunden je Tag',h+' h'],['Verfügbarkeit',verf+' %'],['bereits verplant',f(vor,0)+' h']],
  ans:[{l:'Kapazitätsbedarf Auftrag',v:KB,u:'h'},{l:'Kapazitätsbestand',v:KBest,u:'h'},{l:'Auslastung gesamt',v:ausl,u:'%'}],
  steps:[{l:'Durchgänge',f:[Q('Teile','Teile je Durchgang'),Q(N,pro),f(N/pro,2)+' → '+dg]},{l:'Bedarf',f:['Durchgänge · (tr + te)',`${dg} · (${f(tr/60,2)} h + ${te} h)`,f(KB,1)+' h']},
    {l:'Bestand',f:['Anlagen · Wochen · Tage · h · Verfügbarkeit',`${anl} · 13 · ${tg} · ${h} h · ${f(verf/100)}`,f(KBest,1)+' h']},
    {l:'Auslastung',f:[Q('Bedarf + bereits verplant','Bestand')+' · 100 %',Q(`${f(KB,1)} + ${f(vor,0)}`,f(KBest,1))+' · 100 %',f(ausl,1)+' %']},
    {t:ausl>100?'Überlast → Maßnahmen: Zusatzschichten, Fremdvergabe, Termine verschieben, Aufträge splitten.':'Der Auftrag kann eingeplant werden.'}],
  tip:'Anzahl der Durchgänge immer aufrunden.'};}},
{id:'c_kanban',qs:'PS',title:'Kanban: Anzahl der Behälter',src:'H2022 A3 (O)',gen(){
  const M=R(300,1500,50),AT=20,wbz=R(1,5,1),sb=pick([0,0,10,20]),fa=pick([10,15,20,25,50]);
  const tv=M/AT,n=(tv*wbz*(1+sb/100))/fa,N=Math.ceil(n)+1;
  return {text:`Für ein Bauteil werden im Monat (20 Arbeitstage) ${M} Stück verbraucht. Wiederbeschaffungszeit ${wbz} Tage, Sicherheitszuschlag ${sb} %, ein Behälter fasst ${fa} Teile. Die Bestellung wird mit der Entnahme des ersten Teils ausgelöst. Wie viele Kanban-Behälter werden benötigt?`,
  given:[['Monatsverbrauch',M+' Stück'],['Arbeitstage',AT],['Wiederbeschaffungszeit',wbz+' Tage'],['Sicherheitszuschlag',sb+' %'],['Behälterinhalt',fa+' Stück']],
  ans:[{l:'Tagesverbrauch',v:tv,u:'Stück'},{l:'Anzahl Behälter',v:N,u:'Stück'}],
  steps:[{l:'Tagesbedarf',f:[Q(M,AT),f(tv,2)+' Stück/Tag']},{l:'Behälter',f:[Q('Tagesbedarf · WBZ · (1 + Sicherheit)','Behälterinhalt'),Q(`${f(tv,2)} · ${wbz} · ${f(1+sb/100)}`,fa),f(n,2)+' → '+Math.ceil(n)]},
    {t:`+ 1 Behälter, der sich gerade in Entnahme befindet → ${N} Behälter.`}],
  tip:'Aufrunden und einen Behälter für die laufende Entnahme ergänzen.'};}},
{id:'c_abc',qs:'PS',title:'ABC-Analyse',src:'H2022 A1 (O)',gen(){
  const items=Array.from({length:10},(_,i)=>({n:2001+i,m:R(200,6000,100),p:pick([0.16,0.3,0.4,0.5,0.6,1.2,4,4.8,10.4,19,25,38])}));
  items.forEach(x=>x.w=x.m*x.p);const sum=items.reduce((s,x)=>s+x.w,0);const s=[...items].sort((a,b)=>b.w-a.w);let cum=0;s.forEach(x=>{cum+=x.w;x.c=cum/sum*100;x.k=x.c<=80.0001||x===s[0]?'A':x.c<=95?'B':'C'});
  const nA=s.filter(x=>x.k==='A').length,wA=s.filter(x=>x.k==='A').reduce((a,x)=>a+x.w,0)/sum*100;
  const rk=x=>s.indexOf(x)+1;
  return {text:'Für die Zukaufteile Ihrer Montage soll eine ABC-Analyse durchgeführt werden (A-Teile bis ca. 80 % kumulierter Wertanteil, B-Teile bis ca. 95 %, C-Teile Rest). a) Ermitteln Sie in Anlage 1 den monatlichen Verbrauchswert und den Rang je Teil. b) Ermitteln Sie in Anlage 2 die Wertanteile, die kumulierten Wertanteile und ordnen Sie die Teile den Klassen zu. c) Wie viele Teile sind A-Teile und welchen Wertanteil haben sie?',
  given:[],
  anlage:[{nr:'Anlage 1',title:'Verbrauchswerte',head:['Teil','Verbrauch pro Monat (Stück)','Preis pro Stück (€)','Verbrauchswert (€)','Rang'],
    rows:[...items.map((x,i)=>[String(x.n),x.m,f(x.p),{a:3+i},{a:13+i}]),['= Summe','','',{a:0},null]]},
   {nr:'Anlage 2',title:'ABC-Einteilung (nach Rang sortiert)',note:'Klasse hier nicht eintragen, sondern aus dem kumulierten Anteil ablesen: bis 80 % = A, bis 95 % = B, Rest = C.',head:['Rang','Wertanteil (%)','kumulierter Anteil (%)'],
    rows:s.map((x,i)=>[String(i+1),{a:23+i},{a:33+i}])}],
  ans:[{l:'Gesamtwert pro Monat',v:sum,u:'€'},{l:'Anzahl A-Teile',v:nA,u:'Teile'},{l:'Wertanteil A-Teile',v:wA,u:'%'},
    ...items.map(x=>({l:'Verbrauchswert Teil '+x.n,v:x.w,u:'€'})),...items.map(x=>({l:'Rang Teil '+x.n,v:rk(x),u:'',tol:0,abs:0.01})),
    ...s.map((x,i)=>({l:`Wertanteil Rang ${i+1}`,v:x.w/sum*100,u:'%',abs:0.02})),...s.map((x,i)=>({l:`kumuliert Rang ${i+1}`,v:x.c,u:'%',abs:0.02}))],
  steps:[{h:'Monatswert je Teil und Rangfolge'},{tab:[['Rang','Teil','Menge · Preis','Wert','Anteil','kumuliert','Klasse'],...s.map((x,i)=>[i+1,x.n,`${x.m} · ${f(x.p)}`,e(x.w),f(x.w/sum*100)+' %',f(x.c)+' %',x.k]),['Summe','','',e(sum),'100 %','','','s']],head:true},
    {t:`A-Teile: ${nA} Teile mit ${f(wA)} % des Wertes – hier lohnen genaue Disposition, Preisverhandlung und Just-in-time.`}],
  tip:'Wert = Menge × Preis, absteigend sortieren, Anteile kumulieren.'};}},
{id:'c_takt',qs:'MT',title:'Taktzeit & Leistungsabstimmung',src:'H2022 A4 (O)',gen(){
  const st=Array.from({length:6},()=>R(8,45,1)),nAP=3,T=pick([7.5,8]),M=R(400,900,10);
  const sum=st.reduce((a,b)=>a+b,0),takt=T*3600/M;const ap=[st[0]+st[1],st[2]+st[3],st[4]+st[5]],maxap=Math.max(...ap),tm=Math.max(takt,maxap),bw=sum/(nAP*tm)*100,minap=Math.ceil(sum/takt);
  return {text:`Eine Montage besteht aus 6 Arbeitsschritten auf ${nAP} Arbeitsplätzen (je 2 Schritte). Pro Schicht (${f(T,1)} h) sollen ${M} Einheiten gefertigt werden. Ermitteln Sie die Taktzeit, den Bandwirkungsgrad der jetzigen Aufteilung und die theoretisch minimale Anzahl Arbeitsplätze.`,
  given:st.map((s,i)=>[`Schritt ${i+1}`,s+' s']).concat([['Schichtzeit',f(T,1)+' h'],['Stückzahl je Schicht',M]]),
  ans:[{l:'erforderliche Taktzeit',v:takt,u:'s'},{l:'Bandwirkungsgrad',v:bw,u:'%'},{l:'minimale Anzahl Arbeitsplätze',v:minap,u:''}],
  steps:[{l:'Takt',f:[Q('verfügbare Zeit','Stückzahl'),Q(`${f(T,1)} h · 3600 s/h`,M),f(takt,2)+' s']},{tab:[['Arbeitsplatz','Schritte','Zeit (s)'],['A','1 + 2',ap[0]],['B','3 + 4',ap[1]],['C','5 + 6',ap[2]]],head:true},
    {l:'Wirkungsgrad',f:[Q('Summe Arbeitsinhalte','Arbeitsplätze · Taktzeit')+' · 100 %',Q(sum+' s',`${nAP} · ${f(tm,2)} s`)+' · 100 %',f(bw,1)+' %']},{t:maxap>takt?'Hinweis: Die längste Station ist länger als der Takt, sie bestimmt den tatsächlichen Takt – deshalb wird mit ihr gerechnet.':'Gerechnet wird mit der Taktzeit; die Differenz zur Stationszeit ist Wartezeit (Balance-Verlust).'},
    {l:'AP_min',f:[Q('Summe Arbeitsinhalte','Taktzeit'),Q(sum+' s',f(takt,2)+' s'),f(sum/takt,2)+' → '+minap]},
    {t:maxap>takt?`Die längste Station (${maxap} s) überschreitet den Takt – Schritte neu verteilen.`:'Die Stationen halten den Takt ein.'}],
  tip:'Die langsamste Station bestimmt die Ausbringung (Engpass).'};}},
{id:'c_akkord',qs:'PF',title:'Akkordlohn & Prämienlohn',src:'H2020 A5 (O)',gen(){
  const zl=R(14,22,0.5),norm=R(8,20,1),ist=norm+R(1,5,1),az=pick([10,15,20]),pr=R(0.2,0.8,0.05);
  const ak=zl*(1+az/100),vz=60/norm,mg=ak/60,lA=ist*vz*mg,lP=zl+(ist-norm)*pr*norm/norm*1;
  const lP2=zl+(ist-norm)*pr,lg=ist/norm*100;
  return {text:`Ein Monteur verdient ${e(zl)}/h im Zeitlohn bei einer Normalleistung von ${norm} Einheiten/h. Er schafft im Durchschnitt ${ist} Einheiten/h. Vergleichen Sie den Stundenverdienst bei Akkordlohn (Akkordzuschlag ${az} %) und bei Prämienlohn (Grundlohn = Zeitlohn, Prämie ${e(pr)} je Einheit über Normalleistung).`,
  given:[['Zeitlohn',e(zl)+'/h'],['Normalleistung',norm+' Einheiten/h'],['Istleistung',ist+' Einheiten/h'],['Akkordzuschlag',az+' %'],['Prämie',e(pr)+' je Mehreinheit']],
  ans:[{l:'Akkordrichtsatz',v:ak,u:'€/h'},{l:'Verdienst Akkord',v:lA,u:'€/h'},{l:'Verdienst Prämienlohn',v:lP2,u:'€/h'},{l:'Leistungsgrad',v:lg,u:'%'}],
  steps:[{h:'Akkordlohn'},{l:'Akkordrichtsatz',f:['Grundlohn · (1 + Akkordzuschlag)',`${e(zl)} · ${f(1+az/100)}`,e(ak)+'/h']},{l:'Vorgabezeit',f:[Q('60 min','Normalleistung'),Q('60 min',norm),f(vz,3)+' min/Einheit']},
    {l:'Minutenfaktor',f:[Q('Akkordrichtsatz','60'),f(mg,4)+' €/min']},{l:'Verdienst',f:['Istmenge · Vorgabezeit · Minutenfaktor',`${ist} · ${f(vz,3)} · ${f(mg,4)}`,e(lA)+'/h']},
    {h:'Prämienlohn'},{l:'Verdienst',f:['Grundlohn + Mehrleistung · Prämie',`${e(zl)} + ${ist-norm} · ${e(pr)}`,e(lP2)+'/h']},
    {l:'Leistungsgrad',f:[Q('Istleistung','Normalleistung')+' · 100 %',f(lg,1)+' %']}],
  tip:'Beim Akkord steigt der Lohn proportional zur Leistung; beim Prämienlohn nur um die vereinbarte Prämie.'};}},
{id:'c_mehrarbeit',qs:'PS',title:'Personaleinsatz: Mehrarbeit & Zeitgrad',src:'F2021 A1 (O), H2020 A8 (T)',gen(){
  const n=R(30,90,1),tz=R(240,480,15),az=pick([7.5,8]),gq=pick([94,95,96,97]),tage=pick([5,6]),ma=R(4,9,1);
  const h=n*tz/60,bed=h/(az*tage*gq/100),verf=ma*az*tage*gq/100,mehr=(h-verf)/(ma*tage*gq/100),zg=h/verf*100;
  if(mehr<0.2||mehr>2.5)return this.gen();
  return {text:`Für ${n} Montagen werden je ${tz} min (Normalleistung) kalkuliert. Arbeitszeit ${f(az,1)} h/Tag, Gesundheitsquote ${gq} %, Urlaubssperre. a) Wie viele Mitarbeiter sind für ${tage} Werktage nötig? b) Welche tägliche Mehrarbeit je Mitarbeiter ist nötig, wenn nur ${ma} Mitarbeiter zur Verfügung stehen? c) Welcher Zeitgrad wäre ohne Mehrarbeit erforderlich?`,
  given:[['Anzahl Montagen',n],['Zeit je Montage',tz+' min'],['Arbeitszeit',f(az,1)+' h/Tag'],['Gesundheitsquote',gq+' %'],['Werktage',tage],['verfügbare Mitarbeiter',ma]],
  ans:[{l:'Mitarbeiterbedarf',v:bed,u:'MA'},{l:'Mehrarbeit je MA und Tag',v:mehr,u:'h'},{l:'erforderlicher Zeitgrad',v:zg,u:'%'}],
  steps:[{h:'a) Mitarbeiterbedarf'},{l:'Arbeitsaufwand',f:[Q(`${n} · ${tz} min`,'60 min/h'),f(h,2)+' h']},{l:'MA-Bedarf',f:[Q('Aufwand','h/Tag · Tage · Gesundheitsquote'),Q(f(h,2)+' h',`${f(az,1)} · ${tage} · ${f(gq/100)}`),f(bed,2)+' → '+Math.ceil(bed)+' MA']},
    {h:'b) Mehrarbeit'},{l:'verfügbar',f:['MA · h/Tag · Tage · Quote',`${f(ma,1)} · ${f(az,1)} · ${tage} · ${f(gq/100)}`,f(verf,2)+' h']},{l:'Mehrarbeit',f:[Q('Aufwand − verfügbar','MA · Tage · Quote'),Q(`${f(h,2)} − ${f(verf,2)}`,`${f(ma,1)} · ${tage} · ${f(gq/100)}`),f(mehr,2)+' h/Tag']},
    {h:'c) Zeitgrad'},{l:'Zeitgrad',f:[Q('Aufwand','verfügbare Zeit')+' · 100 %',f(zg,1)+' %']}],
  tip:'Mehrarbeit ist mitbestimmungspflichtig (Betriebsrat) und durch das Arbeitszeitgesetz begrenzt (max. 10 h/Tag).'};}},
{id:'c_nettobedarf',qs:'PS',title:'Nettobedarf mit Materialverlusten',src:'H2024 A7 (T)',gen(){
  const net=R(150,400,1),v=[R(5,10,1),R(2,6,1),R(10,18,1)],LB=R(200,400,5),SB=R(50,150,10),BB=R(50,150,5),Res=R(40,120,5);
  const brutto=net/((1-v[0]/100)*(1-v[1]/100)*(1-v[2]/100)),verf=LB-SB+BB-Res,nb=brutto-verf;if(nb<20)return this.gen();
  return {text:`Ein Kunde bestellt Platten mit einem Netto-Volumen von ${net} m³. Beim Bearbeiten entstehen nacheinander Materialverluste von ${v[0]} %, ${v[1]} % und ${v[2]} %. Lagerbestand ${LB} m³, Sicherheitsbestand ${SB} m³, Bestellbestand ${BB} m³, Reservierungen ${Res} m³. Ermitteln Sie Bruttobedarf und zu bestellenden Nettobedarf.`,
  given:[['Netto-Volumen Auftrag',net+' m³'],['Verlust 1. Bearbeitungsschritt',v[0]+' %'],['Verlust 2. Bearbeitungsschritt',v[1]+' %'],['Verlust 3. Bearbeitungsschritt',v[2]+' %'],['Lagerbestand',LB+' m³'],['Sicherheitsbestand',SB+' m³'],['Bestellbestand',BB+' m³'],['Reservierungen',Res+' m³']],
  ans:[{l:'Bruttobedarf',v:brutto,u:'m³'},{l:'verfügbarer Bestand',v:verf,u:'m³'},{l:'Nettobedarf',v:nb,u:'m³'}],
  steps:[{l:'Brutto',f:[Q('Netto','(1 − v₁) · (1 − v₂) · (1 − v₃)'),Q(net+' m³',`${f(1-v[0]/100)} · ${f(1-v[1]/100)} · ${f(1-v[2]/100)}`),f(brutto,2)+' m³']},
    {tab:[['Disposition','m³'],['Bruttobedarf',f(brutto,2)],['− Lagerbestand',LB],['+ Sicherheitsbestand',SB],['− Bestellbestand',BB],['+ Reservierungen',Res],['= Nettobedarf',f(nb,2),'s']],head:true}],
  tip:'Verluste nacheinander: durch jeden Restanteil teilen – nicht die Prozente addieren!'};}},
{id:'c_aequivalenz',qs:'KW',title:'Äquivalenzziffernkalkulation',src:'F2024 A3 (O)',gen(){
  const t=['Typ 1','Typ 2','Typ 3','Typ 4'].map(n=>({n,m:R(2000,6000,100),z:R(0.6,1.6,0.1)}));t[0].z=1;const K=R(20000,90000,1000);
  t.forEach(x=>x.re=x.m*x.z);const sum=t.reduce((s,x)=>s+x.re,0),k1=K/sum;t.forEach(x=>{x.k=k1*x.z;x.g=x.k*x.m});
  return {text:`Für vier Sorten fallen Gesamtkosten von ${e(K)} an. Verteilen Sie die Kosten mit den Äquivalenzziffern (Typ 1 = Einheitssorte): a) Ermitteln Sie die Recheneinheiten und die Kosten je Recheneinheit. b) Ermitteln Sie in Anlage 1 die Stückkosten und die Gesamtkosten je Sorte.`,
  given:[['Gesamtkosten',e(K)]],
  anlage:{nr:'Anlage 1',title:'Äquivalenzziffernkalkulation',head:['Sorte','Menge (Stück)','Äquivalenzziffer','Recheneinheiten','Stückkosten (€)','Gesamtkosten (€)'],
    rows:[...t.map((x,i)=>[x.n,x.m,f(x.z,1),{a:5+i},{a:1+i},{a:9+i}]),['= Summe','','',{a:13},null,f(K)]]},
  ans:[{l:'Kosten je Recheneinheit',v:k1,u:'€',tol:0.002},...t.map(x=>({l:'Stückkosten '+x.n,v:x.k,u:'€'})),...t.map(x=>({l:'Recheneinheiten '+x.n,v:x.re,u:''})),...t.map(x=>({l:'Gesamtkosten '+x.n,v:x.g,u:'€'})),{l:'Summe Recheneinheiten',v:sum,u:''}],
  steps:[{tab:[['Sorte','Menge','ÄZ','Recheneinheiten','Stückkosten','Gesamtkosten'],...t.map(x=>[x.n,x.m,f(x.z,1),f(x.re,0),e(x.k),e(x.g)]),['Summe','','',f(sum,0),'',e(K),'s']],head:true},
    {l:'Kosten je RE',f:[Q('Gesamtkosten','Summe Recheneinheiten'),Q(e(K),f(sum,0)),f(k1,4)+' €']},{l:'Stückkosten',f:['Kosten je RE · Äquivalenzziffer']}],
  tip:'Recheneinheiten = Menge × Äquivalenzziffer.'};}},
{id:'c_flaschenzug',qs:'BT',title:'Flaschenzug & Hubantrieb',src:'H2023 A4 (O), H2023 A6 (T)',gen(){
  const m=R(500,4000,50),n=pick([4,6,8]),eta=R(0.85,0.95,0.01),v=R(4,20,1),etaG=R(0.8,0.95,0.01);
  const G=m*9.81,F=G/(n*eta),s=R(1,4,0.5),sz=s*n,P=G*v/60/etaG;
  return {text:`Eine Last von ${f(m,0)} kg wird mit einem Rollenflaschenzug mit ${n} tragenden Seilsträngen (${n/2} feste, ${n/2} lose Rollen) gehoben (Gesamtwirkungsgrad ${f(eta)}). a) Welche Zugkraft ist nötig? b) Wie viel Seil muss für ${f(s,1)} m Hubhöhe gezogen werden? c) Ein Elektromotor soll dieselbe Last direkt über eine Seiltrommel (ohne Flaschenzug) mit ${v} m/min heben (Getriebewirkungsgrad ${f(etaG)}). Welche Motorleistung ist erforderlich?`,
  given:[['Masse',f(m,0)+' kg'],['tragende Stränge n',n],['Wirkungsgrad Flaschenzug',f(eta)],['Hubhöhe',f(s,1)+' m'],['Hubgeschwindigkeit',v+' m/min'],['Wirkungsgrad Getriebe',f(etaG)]],
  ans:[{l:'Zugkraft',v:F,u:'N'},{l:'Seilweg',v:sz,u:'m'},{l:'Motorleistung',v:P/1000,u:'kW'}],
  steps:[{h:'a) Zugkraft'},{l:'F_G',f:['m · g',`${f(m,0)} kg · 9,81 m/s²`,f(G,0)+' N']},{l:'F_Zug',f:[Q('F_G','n · η'),Q(f(G,0)+' N',`${n} · ${f(eta)}`),f(F,1)+' N']},
    {h:'b) Seilweg'},{l:'Seilweg',f:['Hubhöhe · n',`${f(s,1)} m · ${n}`,f(sz,1)+' m']},{h:'c) Motorleistung'},{l:'P',f:[Q('F_G · v','η'),Q(`${f(G,0)} N · ${f(v/60,3)} m/s`,f(etaG)),f(P,0)+' W = '+f(P/1000,2)+' kW']}],
  tip:'Beim Flaschenzug verteilt sich die Last auf n Stränge – die Zugkraft sinkt, der Seilweg steigt um den Faktor n.'};}},
{id:'c_variator',qs:'KW',title:'Budget mit Variator (Sollkosten)',src:'H2023 A7 (O)',gen(){
  const arts=[['Fertigungslöhne',R(80000,150000,1000),10],['Materialkosten',R(30000,70000,1000),8],['Gehälter',R(8000,15000,500),0],['Hilfslöhne',R(20000,40000,500),4],['Abschreibungen',R(20000,40000,500),0],['sonstige Kosten',R(20000,40000,500),2]];
  const Bp=pick([2000,2500,3000]),BG=R(70,95,5),Ist=0;
  const rows=arts.map(([n,K,V])=>{const soll=K*(1-V/10)+K*V/10*BG/100;return [n,K,V,soll]});const Kp=rows.reduce((s,r)=>s+r[1],0),Ks=rows.reduce((s,r)=>s+r[3],0),Ki=Math.round(Ks*R(0.95,1.08,0.01)/100)*100;
  return {text:`Das Budget einer Kostenstelle ist für ${f(Bp,0)} Stunden geplant. Tatsächlich wurden nur ${f(Bp*BG/100,0)} Stunden (Beschäftigungsgrad ${BG} %) geleistet; die Istkosten betragen ${e(Ki)}. a) Ermitteln Sie in Anlage 1 mit den Variatoren die Sollkosten je Kostenart und gesamt. b) Ermitteln Sie die Verbrauchsabweichung.`,
  given:[['Ist-Beschäftigungsgrad',BG+' %'],['Istkosten',e(Ki)]],
  anlage:{nr:'Anlage 1',title:`Kostenstellenbudget – Sollkosten bei ${BG} % Beschäftigung`,note:'Variator = variabler Anteil in Zehnteln (Variator 8 → 80 % variabel).',head:['Kostenart','Plankosten (€)','Variator','fixe Kosten (€)','variable Plankosten (€)','Sollkosten (€)'],
    rows:[...rows.map((r,i)=>[r[0],f(r[1]),String(r[2]),{a:3+i*3},{a:4+i*3},{a:5+i*3}]),['= Summe',{a:0},'',null,null,{a:1}]]},
  ans:[{l:'Plankosten gesamt',v:Kp,u:'€'},{l:'Sollkosten',v:Ks,u:'€'},{l:'Verbrauchsabweichung',v:Ki-Ks,u:'€'},
    ...rows.flatMap(r=>[{l:'fix '+r[0],v:r[1]*(1-r[2]/10),u:'€'},{l:'variabel '+r[0],v:r[1]*r[2]/10,u:'€'},{l:'Sollkosten '+r[0],v:r[3],u:'€'}])],
  steps:[{t:'Variator = variabler Anteil in Zehnteln (Variator 8 = 80 % variabel).'},{l:'Sollkosten',f:['Kf + Kv · Beschäftigungsgrad']},
    {tab:[['Kostenart','Plankosten','Variator','fix','variabel','Sollkosten'],...rows.map(r=>[r[0],e(r[1]),r[2],e(r[1]*(1-r[2]/10)),e(r[1]*r[2]/10),e(r[3])]),['Summe',e(Kp),'','','',e(Ks),'s']],head:true},
    {l:'Verbrauchsabw.',f:['Istkosten − Sollkosten',`${e(Ki)} − ${e(Ks)}`,e(Ki-Ks)]}],
  tip:'Sollkosten je Kostenart = Plankosten · (1 − V/10) + Plankosten · V/10 · Beschäftigungsgrad.'};}}
);
