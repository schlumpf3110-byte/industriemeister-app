// Fertigungstechnik wie in der Prüfung: Schnittwerte und Werkstoffkennwerte selbst im Tabellenbuch nachschlagen.
// Richtwerte orientiert am Europa Tabellenbuch Metall (Hartmetall beschichtet). Tabellenbücher nennen Bereiche –
// deshalb großzügige Toleranz; gerechnet wird immer mit den selbst nachgeschlagenen Werten.
const WST={
 'S235JR':      {dr:{s:[200,0.4],f:[280,0.15]},fr:[200,0.15],bo:[100,0.20],kc11:1780,mc:0.17,gr:'P (Baustahl)'},
 'C45E':        {dr:{s:[170,0.4],f:[240,0.15]},fr:[170,0.15],bo:[90,0.18], kc11:2220,mc:0.14,gr:'P (Vergütungsstahl, unlegiert)'},
 '16MnCr5':     {dr:{s:[160,0.35],f:[230,0.15]},fr:[160,0.15],bo:[85,0.18],kc11:2100,mc:0.26,gr:'P (Einsatzstahl)'},
 '42CrMo4':     {dr:{s:[130,0.3],f:[190,0.12]},fr:[130,0.12],bo:[70,0.15], kc11:2500,mc:0.26,gr:'P (Vergütungsstahl, legiert)'},
 'X5CrNi18-10': {dr:{s:[110,0.3],f:[160,0.12]},fr:[120,0.10],bo:[50,0.12], kc11:2350,mc:0.21,gr:'M (nichtrostender Stahl)'},
 'EN-GJL-250':  {dr:{s:[140,0.4],f:[200,0.2]},fr:[150,0.20],bo:[90,0.25], kc11:1120,mc:0.26,gr:'K (Gusseisen)'},
 'EN AW-2017A (AlCuMg1)':{dr:{s:[500,0.4],f:[800,0.15]},fr:[700,0.14],bo:[200,0.25],kc11:830,mc:0.23,gr:'N (Aluminium-Knetlegierung)'}};
const WSTN=Object.keys(WST);
const BLECH={'S235JR':510,'S355J2':680,'DC04':350,'X5CrNi18-10':700,'EN AW-5754 (AlMg3)':240};
const TBTOL=0.3; // Schnittwerte: Bereichsangaben im Tabellenbuch

replaceCalc('c_hnz_dreh',{id:'c_hnz_dreh',qs:'FT',title:'Hauptnutzungszeit Längsdrehen',src:'F2023 A3 (T)',gen(o={}){
  const mat=o.mat||pick(WSTN),art=o.art||pick(['s','f']),W=WST[mat];
  const P=Object.assign({mat,art,d:R(40,160,5),l:R(80,400,10),z:art==='s'?R(3,8,0.5):R(0.3,1,0.1),ap:art==='s'?R(1.5,3,0.5):0,vc:W.dr[art][0],f:W.dr[art][1]},o);
  const {d,l,z,vc}=P,fz=P.f,la=2,lu=2,ap=art==='s'?P.ap:z;
  const i=Math.ceil(z/ap-1e-9),n=vc*1000/(Math.PI*d),L=l+la+lu,th=L*i/(n*fz);
  const artT=art==='s'?'Schruppen':'Schlichten';
  return {P,tb:[{k:'vc',l:`Schnittgeschwindigkeit vc (${mat}, HM, ${artT})`,u:'m/min',tol:TBTOL},{k:'f',l:`Vorschub f (${artT})`,u:'mm',tol:TBTOL}],
  text:`Eine Welle aus ${mat}, Ø ${d} mm, wird auf ${l} mm Länge längsgedreht (${artT}, beschichtete HM-Wendeschneidplatte). Die Bearbeitungszugabe beträgt radial ${f(z,1)} mm${art==='s'?`, die maximale Schnitttiefe ${f(ap,1)} mm`:''}. a) Legen Sie Schnittgeschwindigkeit und Vorschub mit Hilfe des Tabellenbuchs fest. b) Ermitteln Sie die Drehzahl. c) Ermitteln Sie die Anzahl der Schnitte und die Hauptnutzungszeit (Drehzahl mit dem Ausgangsdurchmesser rechnen).`,
  given:[['Werkstoff',mat],['Schneidstoff','HM beschichtet'],['Bearbeitung',artT],['Durchmesser d',d+' mm'],['Drehlänge l',l+' mm'],['Bearbeitungszugabe (radial)',f(z,1)+' mm'],...(art==='s'?[['max. Schnitttiefe ap',f(ap,1)+' mm']]:[]),['Anlauf / Überlauf',`${la} / ${lu} mm`],['Schnittgeschwindigkeit vc',vc+' m/min','tb'],['Vorschub f',f(fz)+' mm','tb']],
  ans:[{l:'b) Drehzahl n',v:n,u:'1/min'},{l:'c) Anzahl Schnitte i',v:i,u:''},{l:'c) Hauptnutzungszeit th',v:th,u:'min'}],
  steps:[{h:'a) Schnittwerte aus dem Tabellenbuch'},{t:`${mat}, Gruppe ${W.gr}, ${artT} mit HM: vc ≈ ${vc} m/min, f ≈ ${f(fz)} mm`},
    {h:'b) Drehzahl'},{l:'n',f:[Q('vc · 1000','π · d'),Q(`${vc} m/min · 1000 mm/m`,`π · ${d} mm`),f(n,1)+' 1/min']},
    {h:'c) Schnitte und Hauptnutzungszeit'},{l:'i',f:[Q('Zugabe','ap'),Q(f(z,1)+' mm',f(ap,1)+' mm'),f(z/ap,2)+' → '+i+' Schnitt'+(i>1?'e':'')]},
    {l:'L',f:['l + la + lu',`${l} mm + ${la} mm + ${lu} mm`,L+' mm']},{l:'th',f:[Q('L · i','n · f'),Q(`${L} mm · ${i}`,`${f(n,1)} 1/min · ${f(fz)} mm`),f(th)+' min']}],
  tip:'Im Tabellenbuch: „Schnittdaten Drehen“ – Werkstoffgruppe (P, M, K, N), Schneidstoff und Bearbeitungsart wählen. Anzahl der Schnitte immer aufrunden.'};}});

replaceCalc('c_fraesleistung',{id:'c_fraesleistung',qs:'FT',title:'Planfräsen: Leistung & Hauptnutzungszeit',src:'H2024 A7 (O), H2022 A5 (T)',gen(o={}){
  const mat=o.mat||pick(WSTN),W=WST[mat];
  const P=Object.assign({mat,D:pick([63,80,100,125,160,200]),z:0,vc:W.fr[0],fz:W.fr[1],kc11:W.kc11,mc:W.mc,ap:R(1,4,0.5),eta:R(0.75,0.9,0.05),l:R(200,800,10)},o);
  if(!P.z)P.z=Math.round(P.D/12);if(!P.ae)P.ae=Math.round(P.D/R(1.2,1.4,0.05));
  const {D,z,vc,fz,kc11,mc,ap,eta,l,ae}=P,C=1.3,la=2,lu=2;
  const phi=2*Math.asin(ae/D)/D2R,ze=z*phi/360,h=fz,kc=kc11/Math.pow(h,mc),A=ap*h,Fc=kc*A*C,Pc=ze*Fc*vc/60,P1=Pc/eta,n=vc*1000/(Math.PI*D),vf=fz*z*n,L=l+D+la+lu,th=L/vf;
  return {P,tb:[{k:'vc',l:`Schnittgeschwindigkeit vc (${mat}, HM)`,u:'m/min',tol:TBTOL},{k:'fz',l:'Vorschub je Zahn fz',u:'mm',tol:TBTOL},{k:'kc11',l:`kc1.1 für ${mat}`,u:'N/mm²',tol:0.1},{k:'mc',l:`mc für ${mat}`,u:'',tol:0.15}],
  text:`Eine Platte aus ${mat} (Breite ${ae} mm, Länge ${l} mm) wird mit einem Planfräser Ø ${D} mm (${z} Schneiden, HM beschichtet, mit Abstumpfung) in einem Schnitt mittig plangefräst. Schnitttiefe ap = ${f(ap,1)} mm, Wirkungsgrad der Maschine ${f(eta*100,0)} %. a) Legen Sie die Schnittwerte und die Schnittkraftwerte mit Hilfe des Tabellenbuchs fest. b) Ermitteln Sie die erforderliche Antriebsleistung. c) Ermitteln Sie die Hauptnutzungszeit (Anlauf und Überlauf je 2 mm).`,
  given:[['Werkstoff',mat],['Schneidstoff','HM beschichtet, mit Abstumpfung (C = 1,3)'],['Fräserdurchmesser D',D+' mm'],['Schneidenzahl z',z],['Fräsbreite ae',ae+' mm'],['Fräslänge l',l+' mm'],['Schnitttiefe ap',f(ap,1)+' mm'],['Wirkungsgrad η',f(eta)],['Schnittgeschwindigkeit vc',vc+' m/min','tb'],['Vorschub je Zahn fz',f(fz)+' mm','tb'],['kc1.1',kc11+' N/mm²','tb'],['mc',f(mc),'tb']],
  ans:[{l:'b) Schneiden im Eingriff ze',v:ze,u:''},{l:'b) Schnittkraft je Schneide Fc',v:Fc,u:'N'},{l:'b) Antriebsleistung P1',v:P1/1000,u:'kW'},{l:'c) Hauptnutzungszeit th',v:th,u:'min'}],
  steps:[{h:'a) Werte aus dem Tabellenbuch'},{t:`${mat}, Gruppe ${W.gr}: vc ≈ ${vc} m/min, fz ≈ ${f(fz)} mm, kc1.1 = ${kc11} N/mm², mc = ${f(mc)}`},
    {h:'b) Eingriff und Spanungsdicke'},{l:'φs',f:['2 · arcsin'+Q('ae','D'),'2 · arcsin'+Q(ae+' mm',D+' mm'),f(phi,1)+'°']},{l:'ze',f:[Q('z · φs','360°'),Q(`${z} · ${f(phi,1)}°`,'360°'),f(ze,2)]},
    {t:`D/ae = ${f(D/ae,2)} → näherungsweise gilt h = fz = ${f(fz)} mm`},
    {l:'kc',f:[Q('kc1.1','h^mc'),Q(kc11+' N/mm²',`${f(h)}^${f(mc)}`),f(kc,0)+' N/mm²']},
    {h:'b) Schnittkraft und Leistung'},{l:'A',f:['ap · h',`${f(ap,1)} mm · ${f(h)} mm`,f(A,3)+' mm²']},{l:'Fc',f:['A · kc · C',`${f(A,3)} mm² · ${f(kc,0)} N/mm² · 1,3`,f(Fc,1)+' N']},
    {l:'Pc',f:['ze · Fc · vc',`${f(ze,2)} · ${f(Fc,1)} N · ${f(vc/60,3)} m/s`,f(Pc,0)+' W']},{l:'P1',f:[Q('Pc','η'),Q(f(Pc,0)+' W',f(eta)),f(P1,0)+' W = '+f(P1/1000,2)+' kW']},
    {h:'c) Hauptnutzungszeit'},{l:'n',f:[Q('vc · 1000','π · D'),Q(`${vc} · 1000`,`π · ${D} mm`),f(n,1)+' 1/min']},{l:'vf',f:['fz · z · n',`${f(fz)} mm · ${z} · ${f(n,1)} 1/min`,f(vf,1)+' mm/min']},
    {l:'L',f:['l + D + la + lu',`${l} + ${D} + 2 + 2 mm`,L+' mm']},{l:'th',f:[Q('L','vf'),Q(L+' mm',f(vf,1)+' mm/min'),f(th)+' min']}],
  tip:'Tabellenbuch: „Schnittdaten Fräsen“ (vc, fz) und „Spezifische Schnittkraft“ (kc1.1, mc). Beim mittigen Planfräsen mit D ≈ 1,2…1,4 · ae ist h ≈ fz.'};}});

replaceCalc('c_bohren',{id:'c_bohren',qs:'FT',title:'Bohren: Antriebsleistung & Hauptnutzungszeit',src:'F2021 A4 (T)',gen(o={}){
  const mat=o.mat||pick(WSTN),W=WST[mat];
  const P=Object.assign({mat,d:pick([8,8.5,10,10.2,12,14]),vc:W.bo[0],f:W.bo[1],kc11:W.kc11,mc:W.mc,sig:140,verl:R(15,25,1),l:R(15,60,5)},o);
  const {d,vc,kc11,mc,sig,verl,l}=P,fz=P.f,C=1.2;
  const h=fz/2*Math.sin(sig/2*D2R),kc=kc11/Math.pow(h,mc),A=d*fz/4,Fc=A*kc*C,Pc=Fc*vc/60,P1=Pc/(1-verl/100),n=vc*1000/(Math.PI*d),la=0.3*d,L=l+la+1,th=L/(n*fz);
  return {P,tb:[{k:'vc',l:`Schnittgeschwindigkeit vc (${mat}, HM-Bohrer)`,u:'m/min',tol:TBTOL},{k:'f',l:`Vorschub f (d ≈ ${f(d,1)} mm)`,u:'mm',tol:TBTOL},{k:'kc11',l:`kc1.1 für ${mat}`,u:'N/mm²',tol:0.1},{k:'mc',l:`mc für ${mat}`,u:'',tol:0.15}],
  text:`In ein Bauteil aus ${mat} wird eine Durchgangsbohrung Ø ${f(d,1)} mm, Tiefe ${l} mm, mit einem HM-Bohrer (Spitzenwinkel ${sig}°) gebohrt. Der Leistungsverlust der Maschine beträgt ${verl} %. a) Legen Sie Schnittwerte und Schnittkraftwerte mit Hilfe des Tabellenbuchs fest. b) Ermitteln Sie die Antriebsleistung (Verschleißfaktor 1,2). c) Ermitteln Sie die Hauptnutzungszeit (Anschnitt 0,3 · d, Überlauf 1 mm).`,
  given:[['Werkstoff',mat],['Bohrerdurchmesser d',f(d,1)+' mm'],['Bohrtiefe l',l+' mm'],['Spitzenwinkel σ',sig+'°'],['Leistungsverlust',verl+' %'],['Schnittgeschwindigkeit vc',vc+' m/min','tb'],['Vorschub f',f(fz)+' mm','tb'],['kc1.1',kc11+' N/mm²','tb'],['mc',f(mc),'tb']],
  ans:[{l:'b) Schnittkraft je Schneide',v:Fc,u:'N'},{l:'b) Antriebsleistung',v:P1/1000,u:'kW'},{l:'c) Hauptnutzungszeit',v:th,u:'min'}],
  steps:[{h:'a) Werte aus dem Tabellenbuch'},{t:`${mat}: vc ≈ ${vc} m/min, f ≈ ${f(fz)} mm, kc1.1 = ${kc11} N/mm², mc = ${f(mc)}`},
    {h:'b) Spanungsdicke und spezifische Schnittkraft'},{l:'h',f:[Q('f','2')+' · sin(σ/2)',Q(f(fz)+' mm','2')+` · sin ${sig/2}°`,f(h,4)+' mm']},{l:'kc',f:[Q('kc1.1','h^mc'),Q(kc11+' N/mm²',`${f(h,4)}^${f(mc)}`),f(kc,0)+' N/mm²']},
    {h:'b) Schnittkraft und Leistung'},{l:'A',f:[Q('d · f','4'),Q(`${f(d,1)} mm · ${f(fz)} mm`,'4'),f(A,4)+' mm²']},{l:'Fc',f:['A · kc · C',`${f(A,4)} mm² · ${f(kc,0)} N/mm² · 1,2`,f(Fc,1)+' N']},
    {l:'Pc',f:['Fc · vc  (2 Schneiden, Kraft wirkt bei d/4)',`${f(Fc,1)} N · ${f(vc/60,3)} m/s`,f(Pc,1)+' W']},{l:'P1',f:[Q('Pc','1 − Verlust'),Q(f(Pc,1)+' W',f(1-verl/100)),f(P1,0)+' W = '+f(P1/1000,3)+' kW']},
    {h:'c) Hauptnutzungszeit'},{l:'n',f:[Q('vc · 1000','π · d'),Q(`${vc} · 1000`,`π · ${f(d,1)} mm`),f(n,0)+' 1/min']},{l:'L',f:['l + 0,3 · d + 1 mm',`${l} + ${f(la,2)} + 1 mm`,f(L,2)+' mm']},
    {l:'th',f:[Q('L','n · f'),Q(f(L,2)+' mm',`${f(n,0)} 1/min · ${f(fz)} mm`),f(th,3)+' min']}],
  tip:'Beim Bohren hat jede Schneide nur den halben Vorschub: Spanungsquerschnitt je Schneide A = d · f / 4.'};}});

replaceCalc('c_schneidkraft',{id:'c_schneidkraft',qs:'FT',title:'Schneidkraft und Schneidarbeit (Stanzen)',src:'H2020 A6 (O)',gen(o={}){
  const mat=o.mat||pick(Object.keys(BLECH));
  const P=Object.assign({mat,Rm:BLECH[mat],a:R(40,200,5),b:R(30,150,5),s:pick([1,1.5,2,3,4]),dl:pick([0,8,10,12])},o);
  const {Rm,a,b,s,dl}=P,nL=dl?2:0,l=2*(a+b)+nL*Math.PI*dl,tauB=0.8*Rm,F=l*s*tauB,W=F*s/1000*2/3;
  return {P,tb:[{k:'Rm',l:`Zugfestigkeit Rm,max für ${mat}`,u:'N/mm²',tol:0.15}],
  text:`Aus Blech ${mat}, s = ${s} mm, wird eine Platte ${a} × ${b} mm${dl?` mit zwei Löchern Ø ${dl} mm`:''} in einem Hub ausgeschnitten (Gesamtschneidwerkzeug). a) Entnehmen Sie die maximale Zugfestigkeit dem Tabellenbuch. b) Ermitteln Sie die Schneidkraft (τaB,max = 0,8 · Rm,max). c) Ermitteln Sie die Schneidarbeit (x = 2/3).`,
  given:[['Werkstoff',mat],['Teilemaß',`${a} × ${b} mm`],...(dl?[['Löcher','2 × Ø '+dl+' mm']]:[]),['Blechdicke s',s+' mm'],['Rm,max',Rm+' N/mm²','tb']],
  ans:[{l:'b) Schnittlänge',v:l,u:'mm'},{l:'b) Schneidkraft',v:F/1000,u:'kN'},{l:'c) Schneidarbeit',v:W,u:'J'}],
  steps:[{h:'a) Tabellenbuch'},{t:`${mat}: Rm,max ≈ ${Rm} N/mm²`},{h:'b) Schneidkraft'},{l:'l',f:['2 · (a + b)'+(dl?' + 2 · π · d':''),`2 · (${a} + ${b}) mm`+(dl?` + 2 · π · ${dl} mm`:''),f(l,1)+' mm']},
    {l:'τaB',f:['0,8 · Rm,max',`0,8 · ${Rm} N/mm²`,f(tauB,0)+' N/mm²']},{l:'F',f:['l · s · τaB',`${f(l,1)} mm · ${s} mm · ${f(tauB,0)} N/mm²`,f(F,0)+' N = '+f(F/1000,1)+' kN']},
    {h:'c) Schneidarbeit'},{l:'W',f:['F · s · x',`${f(F,0)} N · ${f(s/1000,4)} m · 2/3`,f(W,1)+' J']}],
  tip:'Für die Schneidkraft immer die maximale Zugfestigkeit aus dem Tabellenbuch verwenden – das Werkzeug muss für den ungünstigsten Fall ausgelegt sein.'};}});
