// Generatoren mit Tabellenbuch-Werten: P = Parameter, tb = Werte zum Nachschlagen
// gen(o) übernimmt Werte aus o, damit mit selbst nachgeschlagenen Werten gerechnet werden kann
const MAT=[ // Richtwerte (Europa Tabellenbuch Metall, Werte je nach Auflage leicht abweichend)
 {n:'S235JR',kc11:1780,mc:0.17},{n:'E295',kc11:1990,mc:0.26},{n:'C45E',kc11:2220,mc:0.14},{n:'16MnCr5',kc11:2100,mc:0.26},
 {n:'42CrMo4',kc11:2500,mc:0.26},{n:'X5CrNi18-10',kc11:2350,mc:0.21},{n:'EN-GJL-250',kc11:1120,mc:0.26},{n:'AlCuMg1 (EN AW-2017)',kc11:830,mc:0.23}];
const THREAD=[{n:'M8',As:36.6},{n:'M10',As:58},{n:'M12',As:84.3},{n:'M16',As:157},{n:'M20',As:245},{n:'M24',As:353},{n:'M30',As:561}];
function replaceCalc(id,obj){const i=CALC.findIndex(c=>c.id===id);if(i>=0)CALC[i]=Object.assign({},CALC[i],obj);else CALC.push(obj)}

replaceCalc('c_bohren',{id:'c_bohren',qs:'FT',title:'Antriebsleistung beim Bohren',src:'F2021 A4 (T)',gen(o={}){
  const m=o.mat?MAT.find(x=>x.n===o.mat):pick(MAT);
  const P=Object.assign({mat:m.n,d:pick([4.2,6.8,8.5,10.2,14,17.5]),fz:R(0.08,0.25,0.01),sig:pick([118,130,140]),vc:R(40,120,5),verl:R(15,25,1),kc11:m.kc11,mc:m.mc},o);const C=1.2;
  const {d,fz,sig,kc11,mc,vc,verl}=P;
  const h=fz/2*Math.sin(sig/2*D2R),kc=kc11/Math.pow(h,mc),A=d*fz/4,Fc=A*kc*C,Pc=Fc*vc/60,P1=Pc/(1-verl/100);
  return {P,tb:[{k:'kc11',l:`kc1.1 für ${P.mat}`,u:'N/mm²'},{k:'mc',l:`mc für ${P.mat}`,u:''}],
  text:`In ${P.mat} wird eine Bohrung Ø ${f(d,1)} mm mit einem zweischneidigen HM-Bohrer (Spitzenwinkel ${sig}°) gebohrt. Ermitteln Sie die Antriebsleistung, wenn der Leistungsverlust der Maschine ${verl} % beträgt (Verschleißfaktor C = ${f(C,1)}).`,
  given:[['Werkstoff',P.mat],['Bohrerdurchmesser d',f(d,1)+' mm'],['Vorschub f',f(fz)+' mm'],['Spitzenwinkel σ',sig+'°'],['kc1.1',kc11+' N/mm²','tb'],['mc',f(mc),'tb'],['Schnittgeschwindigkeit vc',vc+' m/min'],['Leistungsverlust',verl+' %']],
  ans:[{l:'Spanungsdicke h',v:h,u:'mm'},{l:'Schnittkraft je Schneide',v:Fc,u:'N'},{l:'Antriebsleistung',v:P1/1000,u:'kW'}],
  steps:[{h:'Spanungsdicke und spezifische Schnittkraft'},{l:'h',f:[Q('f','2')+' · sin(σ/2)',Q(f(fz)+' mm','2')+` · sin ${sig/2}°`,f(h,4)+' mm']},
    {l:'kc',f:[Q('kc1.1','h^mc'),Q(kc11+' N/mm²',`${f(h,4)}^${f(mc)}`),f(kc,0)+' N/mm²']},
    {h:'Schnittkraft je Schneide'},{l:'A',f:[Q('d · f','4'),Q(`${f(d,1)} mm · ${f(fz)} mm`,'4'),f(A,4)+' mm²']},
    {l:'Fc',f:['A · kc · C',`${f(A,4)} mm² · ${f(kc,0)} N/mm² · ${f(C,1)}`,f(Fc,1)+' N']},
    {h:'Leistung'},{l:'Pc',f:[Q('z · Fc · vc','2')+'  (z = 2, Kraft wirkt bei d/4)',`${f(Fc,1)} N · ${f(vc/60,3)} m/s`,f(Pc,1)+' W']},
    {l:'P1',f:[Q('Pc','1 − Verlust'),Q(f(Pc,1)+' W',f(1-verl/100)),f(P1,1)+' W = '+f(P1/1000,3)+' kW']}],
  tip:'Beim Bohren hat jede Schneide nur den halben Vorschub: Spanungsquerschnitt je Schneide A = d · f / 4.'};}});

replaceCalc('c_fraesleistung',{id:'c_fraesleistung',qs:'FT',title:'Schnittkraft & Antriebsleistung Fräsen',gen(o={}){
  const m=o.mat?MAT.find(x=>x.n===o.mat):pick(MAT);
  const P=Object.assign({mat:m.n,kc11:m.kc11,mc:m.mc,b:R(2,6,0.5),h:R(0.08,0.25,0.01),ze:R(2,6,1),vc:R(80,250,10),eta:R(0.7,0.9,0.05),k:pick([1.0,1.1,1.2,1.3])},o);
  const {kc11,mc,b,h,ze,vc,eta,k}=P;const kc=kc11/Math.pow(h,mc),A=b*h,Fc=kc*A*k,Pc=ze*Fc*vc/60,P1=Pc/eta;
  return {P,tb:[{k:'kc11',l:`kc1.1 für ${P.mat}`,u:'N/mm²'},{k:'mc',l:`mc für ${P.mat}`,u:''}],
  text:`Ein Werkstück aus ${P.mat} wird plangefräst. Ermitteln Sie die spezifische Schnittkraft, die Schnittkraft je Schneide und die Antriebsleistung (Korrekturfaktor für Verschleiß ${f(k,1)}).`,
  given:[['Werkstoff',P.mat],['kc1.1',kc11+' N/mm²','tb'],['mc',f(mc),'tb'],['Spanungsbreite b (= ap)',f(b,1)+' mm'],['mittlere Spanungsdicke h',f(h)+' mm'],['Schneiden im Eingriff ze',ze],['Schnittgeschwindigkeit vc',vc+' m/min'],['Korrekturfaktor C',f(k,1)],['Wirkungsgrad η',f(eta)]],
  ans:[{l:'spezifische Schnittkraft kc',v:kc,u:'N/mm²'},{l:'Schnittkraft je Schneide Fc',v:Fc,u:'N'},{l:'Antriebsleistung P1',v:P1/1000,u:'kW'}],
  steps:[{h:'Spezifische Schnittkraft'},{l:'kc',f:[Q('kc1.1','h^mc'),Q(kc11+' N/mm²',`${f(h)}^${f(mc)}`),f(kc,0)+' N/mm²']},
    {h:'Schnittkraft je Schneide'},{l:'A',f:['b · h',`${f(b,1)} mm · ${f(h)} mm`,f(A,3)+' mm²']},{l:'Fc',f:['kc · A · C',`${f(kc,0)} N/mm² · ${f(A,3)} mm² · ${f(k,1)}`,f(Fc)+' N']},
    {h:'Leistung'},{l:'vc',f:[Q(vc+' m/min','60 s/min'),f(vc/60)+' m/s']},{l:'Pc',f:['ze · Fc · vc',`${ze} · ${f(Fc)} N · ${f(vc/60)} m/s`,f(Pc,0)+' W = '+f(Pc/1000,3)+' kW']},
    {l:'P1',f:[Q('Pc','η'),Q(f(Pc/1000,3)+' kW',f(eta)),f(P1/1000,3)+' kW']}],
  tip:'kc1.1 und mc stehen im Tabellenbuch bei den Schnittkraftwerten – Werkstoff genau suchen.'};}});

replaceCalc('c_schraube',{id:'c_schraube',qs:'MT',title:'Schraubenverbindung: Festigkeit & Vorspannkraft',src:'F2020 A3 (T)',gen(o={}){
  const t=o.th?THREAD.find(x=>x.n===o.th):pick(THREAD.slice(2));
  const P=Object.assign({th:t.n,As:t.As,kl:pick(['8.8','10.9','12.9']),S:R(1.5,3,0.5)},o);
  const [a,b]=P.kl.split('.').map(Number),Rm=a*100,Re=a*b*10,sz=Re/P.S,F=sz*P.As;
  return {P,tb:[{k:'As',l:`Spannungsquerschnitt As für ${P.th}`,u:'mm²'}],
  text:`Eine Schraube ${P.th} der Festigkeitsklasse ${P.kl} soll mit einer Sicherheit von ${f(P.S,1)} gegen Fließen ausgelegt werden. Bestimmen Sie Zugfestigkeit, Streckgrenze, zulässige Spannung und die maximal zulässige Vorspannkraft.`,
  given:[['Gewinde',P.th],['Festigkeitsklasse',P.kl],['Spannungsquerschnitt As',f(P.As,1)+' mm²','tb'],['Sicherheit S',f(P.S,1)]],
  ans:[{l:'Zugfestigkeit Rm',v:Rm,u:'N/mm²'},{l:'Streckgrenze Re',v:Re,u:'N/mm²'},{l:'zulässige Spannung',v:sz,u:'N/mm²'},{l:'zul. Vorspannkraft',v:F/1000,u:'kN'}],
  steps:[{h:'Werte aus der Festigkeitsklasse'},{l:'Rm',f:['erste Zahl · 100',`${a} · 100`,Rm+' N/mm²']},{l:'Re',f:['erste Zahl · zweite Zahl · 10',`${a} · ${b} · 10`,Re+' N/mm²']},
    {h:'Zulässige Spannung'},{l:'σ_zul',f:[Q('Re','S'),Q(Re+' N/mm²',f(P.S,1)),f(sz,1)+' N/mm²']},
    {h:'Vorspannkraft'},{l:'F_V',f:['σ_zul · As',`${f(sz,1)} N/mm² · ${f(P.As,1)} mm²`,f(F,0)+' N = '+f(F/1000)+' kN']}],
  tip:'Festigkeitsklasse 12.9: Rm = 12 · 100 = 1200 N/mm², Re = 12 · 9 · 10 = 1080 N/mm². As steht im Tabellenbuch bei den metrischen ISO-Gewinden.'};}});
