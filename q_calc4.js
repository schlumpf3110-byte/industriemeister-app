// Prüfungsnahe Rechenaufgaben (Struktur, Umfang und Teilaufgaben wie in den IHK-Prüfungen; Zahlen, Firmen und Texte sind eigene)
// Hilfsfunktionen R, pick, f, e, r2, Q und das Feld CALC stammen aus q_calc.js
const sum_ = a => a.reduce((s, x) => s + x, 0);
const teile_ = (total, w, step) => { const S = sum_(w); const out = w.map(x => Math.round(total * x / S / step) * step); out[out.length - 1] = total - sum_(out.slice(0, -1)); return out };
const p2_ = x => f(x, 2) + ' %';

CALC.push(
/* ─────────────  Erweiterter BAB (Orga, Kostenwesen)  ───────────── */
{id:'c_bab_ext',qs:'KW',title:'Erweiterter BAB: Ist-/Normal-Zuschläge, Bestandsveränderungen, Betriebsergebnis',gen(){
  const FM=R(1800000,2400000,5000),FL1=R(250000,400000,5000),FL2=R(280000,420000,1000),SEF=R(5000,15000,10),SEV=R(8000,20000,10);
  const iM=R(14,20,1),i1=R(120,160,2),i2=R(150,230,2);
  const nM=r2(iM+pick([-1.2,-0.8,-0.4,0.4,0.8,1.2])),n1=r2(i1+pick([-6,-4,-2,2,4,6])),n2=r2(i2+pick([-10,-7.5,-5,-2.5,2.5,5,7.5]));
  const SM=Math.round(FM*iM/100),S1=Math.round(FL1*i1/100),S2=Math.round(FL2*i2/100);
  // Umlagen der allgemeinen Kostenstellen (Reihenfolge der Empfänger: s. Spalten)
  const G0=R(60000,100000,1000),K0=R(30000,70000,100),P0=R(35000,70000,100);
  const gA=teile_(G0,[R(3,8),R(3,6),R(8,14),R(1,4),R(20,30),R(22,32),R(10,18),R(5,10)],100); // K,F,M,AV,F1,F2,Vw,Vt
  const KT=K0+gA[0], kA=teile_(KT,[R(4,8),R(8,14),R(2,5),R(24,34),R(26,36),R(10,18),R(5,10)],10); // F,M,AV,F1,F2,Vw,Vt
  const FT=P0+gA[1]+kA[0], fA=teile_(FT,[R(8,16),R(1,3),R(6,14),R(5,12),R(22,34),R(34,50)],10); // M,AV,F1,F2,Vw,Vt
  const rest1=gA[3]+kA[2]+fA[1];
  const AV0=R(20000,30000,100),AVT=AV0+rest1,aA=teile_(AVT,[R(40,60),R(60,90)].map(x=>x),10); // F1,F2
  const recv={M:gA[2]+kA[1]+fA[0],F1:gA[4]+kA[3]+fA[2]+aA[0],F2:gA[5]+kA[4]+fA[3]+aA[1]};
  const M0=SM-recv.M,F10=S1-recv.F1,F20=S2-recv.F2;
  // Bestandsveränderungen
  const HFa=R(250000,320000,100),HFe=HFa+pick([-1,1])*R(10000,50000,100),FEa=R(280000,360000,100),FEe=FEa+pick([-1,1])*R(10000,60000,100);
  const bvHF=HFa-HFe,bvFE=FEa-FEe;
  const MKi=FM+SM,FKi=FL1+S1+FL2+S2,HKUi=MKi+FKi+SEF+bvHF+bvFE;
  const rV=R(11,14,0.1),rT=R(6,9,0.1);
  const SV=Math.round(HKUi*rV/100),ST=Math.round(HKUi*rT/100);
  const recvV=gA[6]+kA[5]+fA[4],recvT=gA[7]+kA[6]+fA[5];
  const V0=SV-recvV,T0=ST-recvT;
  const nV=r2(rV+pick([-0.6,-0.4,-0.2,0.2,0.4,0.6])),nT=r2(rT+pick([-0.5,-0.3,-0.1,0.1,0.3,0.5]));
  const NM=FM*nM/100,N1=FL1*n1/100,N2=FL2*n2/100,HKUn=FM+NM+FL1+N1+FL2+N2+SEF+bvHF+bvFE;
  const NV=HKUn*nV/100,NT=HKUn*nT/100;
  const ist=[SM,S1,S2,SV,ST],nor=[NM,N1,N2,NV,NT],base_i=[FM,FL1,FL2,HKUi,HKUi],base_n=[FM,FL1,FL2,HKUn,HKUn],nr=[nM,n1,n2,nV,nT];
  const irate=ist.map((x,i)=>x/base_i[i]*100),uu=nor.map((x,i)=>x-ist[i]),UU=sum_(uu);
  const ISK=HKUi+SV+ST+SEV,NSK=HKUn+NV+NT+SEV;
  const Ums=Math.round(ISK*R(1.08,1.16,0.01)/5000)*5000,BE=Ums-ISK,UE=BE-UU;
  const km=R(25000,45000,1000),vp=FT/km;
  const names=['Material','Fertigung I','Fertigung II','Verwaltung','Vertrieb'];
  const bvt=(a,b,n)=>a-b>=0?`${n}: Minderbestand ${e(a-b)}`:`${n}: Mehrbestand ${e(b-a)}`;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol});return ans.length-1};
  const A={ib:[],iz:[],nb:[],ng:[],uu:[]};
  names.forEach((n,i)=>{A.ib.push({a:push('Ist-Bezugsgröße '+n,base_i[i],'€',0.002)})});
  names.forEach((n,i)=>{A.iz.push({a:push('Ist-Zuschlagssatz '+n,irate[i],'%',0.003)})});
  names.forEach((n,i)=>{A.nb.push({a:push('Normal-Bezugsgröße '+n,base_n[i],'€',0.002)})});
  names.forEach((n,i)=>{A.ng.push({a:push('Normal-Gemeinkosten '+n,nor[i],'€',0.002)})});
  names.forEach((n,i)=>{A.uu.push({a:push('Über-/Unterdeckung '+n+' (+ Über / − Unter)',uu[i],'€',0.005)})});
  const iUU=push('Verrechnungsergebnis gesamt (+ Über / − Unter)',UU,'€',0.005),iBE=push('Betriebsergebnis',BE,'€',0.003),iUE=push('Umsatzergebnis',UE,'€',0.003),iVP=push('Verrechnungspreis Fuhrpark',vp,'€/km',0.003);
  const ud=x=>(x>=0?'+ ':'− ')+f(Math.abs(x),0);
  const hd=['','Gebäude','Kantine','Fuhrpark','Material','Fert.-Hilfs-stelle','Fertigung I','Fertigung II','Verwaltung','Vertrieb'];
  const rows=[
    ['Ist-Gemeinkosten (primär)',f(G0,0),f(K0,0),f(P0,0),f(M0,0),f(AV0,0),f(F10,0),f(F20,0),f(V0,0),f(T0,0)],
    ['Umlage Gebäude','⟹',f(gA[0],0),f(gA[1],0),f(gA[2],0),f(gA[3],0),f(gA[4],0),f(gA[5],0),f(gA[6],0),f(gA[7],0)],
    ['Umlage Kantine',null,'⟹',f(kA[0],0),f(kA[1],0),f(kA[2],0),f(kA[3],0),f(kA[4],0),f(kA[5],0),f(kA[6],0)],
    ['Umlage Fuhrpark',null,null,'⟹',f(fA[0],0),f(fA[1],0),f(fA[2],0),f(fA[3],0),f(fA[4],0),f(fA[5],0)],
    ['Umlage Fertigungshilfsstelle',null,null,null,null,'⟹',f(aA[0],0),f(aA[1],0),null,null],
    {s:1,c:['Summe Ist-Gemeinkosten','0','0','0',f(SM,0),'0',f(S1,0),f(S2,0),f(SV,0),f(ST,0)]},
    ['Ist-Bezugsgröße (€)',null,null,null,A.ib[0],null,A.ib[1],A.ib[2],A.ib[3],A.ib[4]],
    ['Ist-Zuschlagssatz (%)',null,null,null,A.iz[0],null,A.iz[1],A.iz[2],A.iz[3],A.iz[4]],
    ['Normal-Bezugsgröße (€)',null,null,null,A.nb[0],null,A.nb[1],A.nb[2],A.nb[3],A.nb[4]],
    ['Normal-Zuschlagssatz (%)',null,null,null,f(nM)+' %',null,f(n1)+' %',f(n2)+' %',f(nV)+' %',f(nT)+' %'],
    ['Normal-Gemeinkosten (€)',null,null,null,A.ng[0],null,A.ng[1],A.ng[2],A.ng[3],A.ng[4]],
    ['Über-/Unterdeckung (€)',null,null,null,A.uu[0],null,A.uu[1],A.uu[2],A.uu[3],A.uu[4]],
    {c:['Verrechnungsergebnis gesamt (€)',null,null,null,null,null,null,null,null,{a:iUU}]}
  ];
  return {text:`Die Brunner Leichtmetall GmbH stellt Aluminiumplatten her. Für den Abrechnungsmonat liegen die Einzelkosten, die Bestandsveränderungen und der Betriebsabrechnungsbogen (Anlage 1, bis zu den Summen der Ist-Gemeinkosten und den Normal-Zuschlagssätzen) vor. Die Bezugsgröße der Verwaltungs- und Vertriebsgemeinkosten sind die Herstellkosten des Umsatzes (HKU). a) Ermitteln Sie in Anlage 1 die Ist-Bezugsgrößen und Ist-Zuschlagssätze, die Normal-Bezugsgrößen, die verrechneten Normal-Gemeinkosten sowie die Unter- bzw. Überdeckungen. b) Die Umsatzerlöse des Monats betragen ${e(Ums)}. Ermitteln Sie das Betriebsergebnis und das Umsatzergebnis. c) Ermitteln Sie den internen Verrechnungspreis je km für die Kostenstelle Fuhrpark, wenn im Monat insgesamt ${f(km,0)} km gefahren wurden.`,
  given:[['Fertigungsmaterial',e(FM)],['Fertigungslöhne Fertigung I',e(FL1)],['Fertigungslöhne Fertigung II',e(FL2)],['Sondereinzelkosten der Fertigung',e(SEF)],['Sondereinzelkosten des Vertriebs',e(SEV)],['Halbfabrikate Anfangs-/Endbestand',`${e(HFa)} / ${e(HFe)}`],['Fertigerzeugnisse Anfangs-/Endbestand',`${e(FEa)} / ${e(FEe)}`],['Umsatzerlöse (für b)',e(Ums)],['Fahrleistung Fuhrpark (für c)',f(km,0)+' km']],
  anlage:{nr:'Anlage 1',title:'Betriebsabrechnungsbogen (Monat)',note:'Alle Beträge in €. Zuschlagssätze in Prozent. Über-/Unterdeckung = Normal-Gemeinkosten − Ist-Gemeinkosten (Überdeckung positiv, Unterdeckung negativ).',head:hd,rows},
  ans,
  steps:[{h:'a) Ist-Herstellkosten des Umsatzes (Bezugsgröße für Verwaltung und Vertrieb)'},
    {tab:[['','Betrag'],['Fertigungsmaterial',e(FM)],['+ Ist-Materialgemeinkosten',e(SM)],['= Materialkosten',e(MKi),'s'],['Fertigungslöhne I + II',e(FL1+FL2)],['+ Ist-Fertigungsgemeinkosten I + II',e(S1+S2)],['= Fertigungskosten',e(FKi),'s'],['+ Sondereinzelkosten der Fertigung',e(SEF)],['Bestandsveränderung Halbfabrikate',(bvHF>=0?'+ ':'− ')+e(Math.abs(bvHF))],['Bestandsveränderung Fertigerzeugnisse',(bvFE>=0?'+ ':'− ')+e(Math.abs(bvFE))],['= Ist-HKU',e(HKUi),'s']]},
    {t:`${bvt(HFa,HFe,'Halbfabrikate')} → ${bvHF>=0?'zu den Herstellkosten addieren':'von den Herstellkosten abziehen'}. ${bvt(FEa,FEe,'Fertigerzeugnisse')} → ${bvFE>=0?'addieren (Minderbestand: aus dem Lager verkauft)':'abziehen (Mehrbestand: auf Lager produziert, nicht verkauft)'}.`},
    {h:'Normal-Herstellkosten des Umsatzes'},
    {tab:[['','Betrag'],['Fertigungsmaterial + Normal-MGK',`${e(FM)} + ${e(NM)} = ${e(FM+NM)}`],['Fertigungslöhne + Normal-FGK',`${e(FL1+FL2)} + ${e(N1+N2)} = ${e(FL1+FL2+N1+N2)}`],['+ SEF',e(SEF)],['± Bestandsveränderungen',(bvHF+bvFE>=0?'+ ':'− ')+e(Math.abs(bvHF+bvFE))],['= Normal-HKU',e(HKUn),'s']]},
    {h:'Zuschlagssätze und Überdeckung / Unterdeckung'},
    {tab:[['','Ist-GK','Ist-Bezugsgr.','Ist-%','Normal-%','Normal-Bezugsgr.','Normal-GK','Über/Unter'],...names.map((n,i)=>[n,f(ist[i],0),f(base_i[i],0),p2_(irate[i]),p2_(nr[i]),f(base_n[i],0),f(nor[i],0),ud(uu[i])]),['Summe',f(sum_(ist),0),'','','','',f(sum_(nor),0),ud(UU),'s']]},
    {t:UU>=0?`Insgesamt Überdeckung von ${e(UU)}: Es wurden mehr Gemeinkosten verrechnet als angefallen sind.`:`Insgesamt Unterdeckung von ${e(-UU)}: Es wurden zu wenige Gemeinkosten verrechnet.`},
    {h:'b) Betriebs- und Umsatzergebnis'},
    {tab:[['','Ist','Normal'],['Herstellkosten des Umsatzes',e(HKUi),e(HKUn)],['+ Verwaltungsgemeinkosten',e(SV),e(NV)],['+ Vertriebsgemeinkosten',e(ST),e(NT)],['+ Sondereinzelkosten des Vertriebs',e(SEV),e(SEV)],['= Selbstkosten',e(ISK),e(NSK),'s'],['Umsatzerlöse',e(Ums),e(Ums)],['= Ergebnis',e(BE),e(Ums-NSK),'s']]},
    {l:'Betriebsergebnis',f:['Umsatz − Ist-Selbstkosten',`${e(Ums)} − ${e(ISK)}`,e(BE)]},
    {l:'Umsatzergebnis',f:['Betriebsergebnis − Verrechnungsergebnis',`${e(BE)} − (${ud(UU).replace('+ ','')} €)`.replace('(−','(−'),e(UE)]},
    {t:'Das Umsatzergebnis ist das Ergebnis, das sich mit den Normalkosten ergibt (Umsatz − Normal-Selbstkosten). Es ist frei von Über-/Unterdeckungen.'},
    {h:'c) Verrechnungspreis Fuhrpark'},
    {l:'Gesamtkosten',f:['primäre Kosten + Umlage Gebäude + Umlage Kantine',`${e(P0)} + ${e(gA[1])} + ${e(kA[0])}`,e(FT)]},
    {l:'Verrechnungspreis',f:[Q('Kosten Fuhrpark','Fahrleistung'),Q(e(FT),f(km,0)+' km'),f(vp)+' €/km']}],
  tip:'Verwaltung und Vertrieb werden auf die Herstellkosten des Umsatzes bezogen – nicht auf die Herstellkosten der Erzeugung. Deshalb Bestandsveränderungen erst in der HKU berücksichtigen (Minderbestand +, Mehrbestand −).'};}},

/* ─────────────  Stufenkalkulation mit Materialverlust (Orga, Kostenwesen)  ───────────── */
{id:'c_stufen',qs:'KW',title:'Herstellkosten über mehrere Fertigungsstufen mit Materialverlust und Recycling',gen(){
  const W0=R(14000,22000,500),p=R(3.5,5.5,0.5),C0=W0*p;
  const st=['Glühen','Säumen','Sägen','Fräsen','Zuschnitt'];
  const lossPct=[0,R(9,14,1),R(7,11,1),R(5,9,1),R(2,5,1)];
  const cost=[R(400,900,10),R(700,1200,10),R(2000,3200,100),R(1000,1800,100),R(250,500,10)];
  const rec=R(2,4,0.5);
  let w=W0;const wv=[],wn=[],ls=[];
  for(let i=0;i<5;i++){wv.push(w);const l=Math.round(w*lossPct[i]/100/10)*10;ls.push(l);w-=l;wn.push(w)}
  const kg=[],kgl=[],gl=[],gs=[],rate=[],verr=[];let cum=r2(C0/W0);
  for(let i=0;i<5;i++){kgl.push(cum);gl.push(ls[i]*cum);gs.push(cost[i]+gl[i]);rate.push(r2(gs[i]/wn[i]));verr.push(rate[i]*wn[i]);cum=r2(cum+rate[i])}
  const LS=sum_(ls),VG=-rec*LS,TOT=C0+sum_(verr)+VG;
  const L=R(4,10,1)*100,B=R(3,8,1)*100,D=R(8,25,1),rho=2.7,m=L/100*B/100*D/100*rho; // dm·dm·dm
  const dm=x=>x/100; const mP=(L/100)*(B/100)*(D/100)*rho;
  const HK=TOT/wn[4]*mP;
  const gi=pick([1,2,3,4]); // vorgegebene Stufe
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol});return ans.length-1};
  const cell=(l,v,u,tol,given)=>given?f(v,u==='kg'?0:2)+(u==='kg'?' kg':''):{a:push(l,v,u,tol)};
  const rowOf=(lab,fn)=>[lab,...fn()];
  const hd=['','Bramme',...st,'Vergütung','Gesamt'];
  const aB1=push('Bramme: Kosten je kg',C0/W0,'€/kg',0.003),aB2=push('Bramme: verr. Gesamtkosten',C0,'€',0.003);
  const cols=(fnStage)=>st.map((n,i)=>fnStage(i,i===gi));
  const rows=[
    ['Kosten (Stufe)',f(C0,2),...cost.map(x=>f(x,2)),'− '+f(rec,2)+' €/kg',null],
    ['Materialverlust (kg)',null,...cols((i,g)=>g?f(ls[i],0)+' kg':cell(st[i]+': Materialverlust',ls[i],'kg',0.005)),{a:push('Summe Materialverlust',LS,'kg',0.005)},null],
    ['Kosten je kg Materialverlust (€/kg)',null,...cols((i,g)=>g?f(kgl[i],2):cell(st[i]+': Kosten je kg Verlust',kgl[i],'€/kg',0.01)),null,null],
    ['Gesamtkosten Materialverlust (€)',null,...cols((i,g)=>g?f(gl[i],2):cell(st[i]+': Gesamtkosten Materialverlust',gl[i],'€',0.01)),null,null],
    ['Gesamtkosten je Stufe (€)',f(C0,2),...cols((i,g)=>g?f(gs[i],2):cell(st[i]+': Gesamtkosten je Stufe',gs[i],'€',0.005)),null,null],
    ['bearbeitete Menge (kg)',f(W0,0),...cols((i,g)=>g?f(wn[i],0):cell(st[i]+': bearbeitete Menge',wn[i],'kg',0.001)),null,null],
    ['Kosten je kg je Stufe (€/kg)',{a:aB1},...cols((i,g)=>g?f(rate[i],2):cell(st[i]+': Kosten je kg',rate[i],'€/kg',0.01)),null,null],
    {s:1,c:['verrechnete Gesamtkosten (€)',{a:aB2},...cols((i,g)=>g?f(verr[i],2):cell(st[i]+': verr. Gesamtkosten',verr[i],'€',0.005)),{a:push('Vergütung Recycling (negativ)',VG,'€',0.005)},{a:push('Gesamt verrechnete Kosten',TOT,'€',0.003)}]}
  ];
  const iM=push('Gewicht der Platte',mP,'kg',0.005),iH=push('Herstellkosten je Platte',HK,'€',0.005);
  const stab=[['Stufe','Gewicht vor','Gewicht nach','Kosten'],...st.map((n,i)=>[n,f(wv[i],0)+' kg',f(wn[i],0)+' kg',e(cost[i])])];
  return {text:`Die Brunner Leichtmetall GmbH fertigt Aluminiumplatten aus Rohblöcken (Brammen). Ein Block hat ein Gewicht von ${f(W0,0)} kg und kostet ${e(C0)}. Auf dem Weg zur fertigen Platte entsteht in mehreren Fertigungsstufen Materialverlust (Späne, Verschnitt), der als Schrott zu ${f(rec,2)} €/kg vergütet wird. Die Kosten des Verlusts werden mit den bis zur jeweiligen Stufe angefallenen Kosten je kg bewertet und auf die gutes Material der Stufe umgelegt. Ermitteln Sie die Herstellkosten einer Aluminiumplatte mit den Maßen ${f(L,0)} mm × ${f(B,0)} mm × ${f(D,0)} mm (Dichte Aluminium ${f(rho,1)} kg/dm³). Nutzen Sie zur Kalkulation der gesamten Fertigungskosten Anlage 1 (die Stufe ${st[gi]} ist bereits ausgefüllt). Rechnen Sie mit zwei Nachkommastellen bei den Kosten je kg.`,
  given:[['Rohblock: Gewicht / Materialkosten',`${f(W0,0)} kg / ${e(C0)}`],['Recycling-Vergütung',f(rec,2)+' €/kg'],['Platte (L × B × D)',`${f(L,0)} × ${f(B,0)} × ${f(D,0)} mm`],['Dichte Aluminium',f(rho,1)+' kg/dm³']],
  gtab:{head:stab[0],rows:stab.slice(1)},
  anlage:{nr:'Anlage 1',title:'Kalkulation der Fertigungskosten',note:`Die Stufe ${st[gi]} ist vorgegeben. Kosten je kg auf 2 Nachkommastellen runden; verrechnete Gesamtkosten = gerundete Kosten je kg × bearbeitete Menge.`,head:hd,rows},
  ans,
  steps:[{h:'Logik der Anlage'},
    {t:'1) Kosten je kg Materialverlust = Summe der Kosten je kg aller Vorstufen (Block + bisherige Stufen). 2) Gesamtkosten Stufe = Stufenkosten + Materialverlust · Kosten je kg Verlust. 3) Kosten je kg der Stufe = Gesamtkosten Stufe ÷ bearbeitete Menge (gutes Material, 2 Nachkommastellen). 4) verrechnete Gesamtkosten = gerundete Kosten je kg × bearbeitete Menge.'},
    {tab:[['Stufe','Verlust','€/kg Verlust','Ges.-Kosten Verlust','Ges.-Kosten Stufe','Menge','€/kg Stufe','verr. Kosten'],['Bramme','','','',f(C0,2),f(W0,0),f(C0/W0,2),f(C0,2)],...st.map((n,i)=>[n,f(ls[i],0)+' kg',f(kgl[i],2),f(gl[i],2),f(gs[i],2),f(wn[i],0),f(rate[i],2),f(verr[i],2)])]},
    {l:'Vergütung',f:['− Recyclingpreis · Gesamtverlust',`− ${f(rec,2)} €/kg · ${f(LS,0)} kg`,e(VG)]},
    {l:'Gesamtkosten',f:['Σ verrechnete Kosten + Vergütung',`${e(C0)} + ${e(sum_(verr))} − ${e(-VG)}`,e(TOT)]},
    {h:'Herstellkosten der Platte'},
    {l:'Gewicht Platte',f:['L · B · D · ρ',`${f(L/100,1)} dm · ${f(B/100,1)} dm · ${f(D/100,2)} dm · ${f(rho,1)} kg/dm³`,f(mP,2)+' kg']},
    {l:'HK Platte',f:[Q('Gesamtkosten','Endgewicht')+' · m',Q(e(TOT),f(wn[4],0)+' kg')+' · '+f(mP,2)+' kg',e(HK)]}],
  tip:'Der Materialverlust einer Stufe ist teurer als der der Vorstufe, weil das verlorene Material bereits die Kosten aller vorherigen Stufen enthält – deshalb steigen die Kosten je kg Verlust von Stufe zu Stufe.'};}}
);

CALC.push(
/* ─────────────  BAB mit Stufenleiter und Plankosten (Orga, Kostenwesen)  ───────────── */
{id:'c_bab_plan',qs:'KW',title:'BAB mit Umlagen, Plan-Zuschlägen, Ist- und Plan-Betriebsergebnis',gen(){
  const FM=R(1200000,1700000,100),FL1=R(500000,700000,1000),FL2=R(380000,520000,1000),Ums0=0;
  const iM=R(11,14,0.5),i1=R(240,290,2),i2=R(280,330,2);
  const SM=Math.round(FM*iM/100),S1=Math.round(FL1*i1/100),S2=Math.round(FL2*i2/100);
  const nm=['Facility','Fuhrpark','Kantine','Material','Planung','Instandhaltung','Fertigung I','Fertigung II','Verwaltung','Vertrieb'];
  const prim=[R(30000,45000,100),R(20000,30000,100),R(15000,25000,100),0,R(50000,75000,100),R(100000,150000,100),0,0,0,0];
  const to={0:[1,2,3,4,5,6,7,8,9],1:[2,3,4,5,6,7,8,9],2:[3,4,5,6,7,8,9],4:[5,6,7],5:[6,7]};
  const W={0:[R(2,5),R(1,3),R(10,20),R(2,6),R(4,9),R(30,45),R(25,38),R(10,16),R(8,12)],1:[R(1,3),R(8,14),R(3,7),R(8,14),R(10,16),R(8,12),R(20,32),R(22,34)],2:[R(8,14),R(4,8),R(8,14),R(30,40),R(24,34),R(14,22),R(5,9)],4:[R(15,25),R(40,55),R(25,35)],5:[R(55,65),R(35,45)]};
  const um={},tot=prim.slice();
  for(const g of [0,1,2,4,5]){const a=teile_(tot[g],W[g],g>3?200:50);um[g]=a;to[g].forEach((c,i)=>{tot[c]+=a[i]})}
  // Zielsummen
  const base=[null,null,null,FM,null,null,FL1,FL2];
  const BVs=pick([-1,1]),BV=BVs*R(30000,80000,100);
  const MKi=FM+SM,FKi=FL1+S1+FL2+S2,HKUi=MKi+FKi+BV;
  const rV=R(7,10,0.1),rT=R(3,5.5,0.1);
  const SV=Math.round(HKUi*rV/100),ST=Math.round(HKUi*rT/100);
  const sums=[SM,S1,S2,SV,ST],ci=[3,6,7,8,9];
  const recvOnly=ci.map(c=>tot[c]);
  const primAll=prim.slice();ci.forEach((c,i)=>{primAll[c]=sums[i]-recvOnly[i]});
  const pM=r2(iM+pick([-0.8,-0.5,0.5,0.8])),p1=r2(i1+pick([-8,-4,4,8])),p2=r2(i2+pick([-10,-6,6,10])),pV=r2(rV+pick([-0.3,-0.2,0.2,0.3])),pT=r2(rT+pick([-0.2,-0.1,0.1,0.2])); 
  const PM=FM*pM/100,P1=FL1*p1/100,P2=FL2*p2/100,HKUp=FM+PM+FL1+P1+FL2+P2+BV,PV=HKUp*pV/100,PT=HKUp*pT/100;
  const pg=[PM,P1,P2,PV,PT],pr=[pM,p1,p2,pV,pT],bi=[FM,FL1,FL2,HKUi,HKUi],bp=[FM,FL1,FL2,HKUp,HKUp];
  const irate=sums.map((x,i)=>x/bi[i]*100),uu=pg.map((x,i)=>x-sums[i]),UU=sum_(uu);
  const ISK=HKUi+SV+ST,PSK=HKUp+PV+PT,Ums=Math.round(ISK*R(1.05,1.12,0.01)/5000)*5000,BEi=Ums-ISK,BEp=Ums-PSK;
  const names=['Material','Fertigung I','Fertigung II','Verwaltung','Vertrieb'];
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol});return ans.length-1};
  const A={s:[],ib:[],iz:[],pb:[],pg:[],uu:[]};
  names.forEach(n=>A.s.push({a:push('Summe Ist-Gemeinkosten '+n,sums[A.s.length],'€',0.002)}));
  names.forEach(n=>A.ib.push({a:push('Ist-Bezugsgröße '+n,bi[A.ib.length],'€',0.002)}));
  names.forEach(n=>A.iz.push({a:push('Ist-Zuschlagssatz '+n,irate[A.iz.length],'%',0.003)}));
  names.forEach(n=>A.pb.push({a:push('Plan-Bezugsgröße '+n,bp[A.pb.length],'€',0.002)}));
  names.forEach(n=>A.pg.push({a:push('Plan-Gemeinkosten '+n,pg[A.pg.length],'€',0.002)}));
  names.forEach(n=>A.uu.push({a:push('Über-/Unterdeckung '+n+' (+ Über / − Unter)',uu[A.uu.length],'€',0.005)}));
  const iU=push('Saldo Über-/Unterdeckung',UU,'€',0.005),iB1=push('Ist-Betriebsergebnis',BEi,'€',0.003),iB2=push('Plan-Betriebsergebnis',BEp,'€',0.003),iD=push('Differenz Ist − Plan',BEi-BEp,'€',0.005);
  const fm=x=>f(x,0);
  const mid=[null,null,null,null,null,null,null,null,null,null];
  const row0=['Ist-Gemeinkosten (primär)',...primAll.map(fm)];
  const urow=(g,lab)=>{const r=[lab];for(let c=0;c<10;c++){if(c<g)r.push(null);else if(c===g)r.push(fm(tot[g])+' ⟹');else{const k=to[g].indexOf(c);r.push(k>=0?fm(um[g][k]):null)}}return r};
  const sumRow=['Summe Ist-Gemeinkosten',null,null,null,A.s[0],null,null,A.s[1],A.s[2],A.s[3],A.s[4]].slice(0,11);
  // Spaltenlage: Material(3), F I(6), F II(7), Vw(8), Vt(9)
  const lay=(arr)=>{const r=[arr[0]];const m={3:arr[1],6:arr[2],7:arr[3],8:arr[4],9:arr[5]};for(let c=0;c<10;c++)r.push(m[c]!==undefined?m[c]:null);return r};
  const rows=[row0,urow(0,'Umlage Facility'),urow(1,'Umlage Fuhrpark'),urow(2,'Umlage Kantine'),urow(4,'Umlage Planung'),urow(5,'Umlage Instandhaltung'),
    lay(['Summe Ist-GK (€)',...A.s]),lay(['Ist-Bezugsgröße (€)',...A.ib]),lay(['Ist-Zuschlagssatz (%)',...A.iz]),
    lay(['Plan-Bezugsgröße (€)',...A.pb]),lay(['Plan-Zuschlagssatz (%)',...pr.map(x=>f(x)+' %')]),lay(['Plan-Gemeinkosten (€)',...A.pg]),lay(['Über-/Unterdeckung (€)',...A.uu]),
    {c:['Saldo Über-/Unterdeckung (€)',null,null,null,null,null,null,null,null,null,{a:iU}]}];
  const ud=x=>(x>=0?'+ ':'− ')+f(Math.abs(x),0);
  return {text:`Die Kleinhans Antriebstechnik AG plant und liefert Getriebe. Im Monat April wurde die innerbetriebliche Leistungsverrechnung (ILV) der allgemeinen Kostenstellen (Facility, Fuhrpark, Kantine) und der Fertigungshilfsstellen (Planung, Instandhaltung) bereits durchgeführt (Anlage 1). a) Ermitteln Sie in Anlage 1 die Summen der Ist-Gemeinkosten, die Ist-Bezugsgrößen und Ist-Zuschlagssätze, die Plan-Bezugsgrößen, die verrechneten Plan-Gemeinkosten und die Unter- bzw. Überdeckungen. Bezugsgröße von Verwaltung und Vertrieb sind die Herstellkosten des Umsatzes (HKU). b) Die Umsatzerlöse im April betrugen ${e(Ums)}. Ermitteln Sie das Ist- und das Plan-Betriebsergebnis. c) Interpretieren Sie die Differenz zwischen Plan- und Ist-Betriebsergebnis.`,
  given:[['Fertigungsmaterial',e(FM)],['Fertigungslöhne Fertigung I',e(FL1)],['Fertigungslöhne Fertigung II',e(FL2)],[BV<0?'Saldo Bestände HF/FE: Mehrbestand':'Saldo Bestände HF/FE: Minderbestand',e(Math.abs(BV))],['Umsatzerlöse April (für b)',e(Ums)]],
  anlage:{nr:'Anlage 1',title:'Betriebsabrechnungsbogen April',note:'Beträge in €, Zuschlagssätze in %. Über-/Unterdeckung = Plan-Gemeinkosten − Ist-Gemeinkosten (Überdeckung +, Unterdeckung −). Die Kosten der Kostenstellen Facility bis Instandhaltung sind bereits verteilt.',head:['',...nm],rows},
  ans,
  steps:[{h:'a) Ist-Herstellkosten des Umsatzes und Plan-HKU'},
    {tab:[['','Ist','Plan'],['Fertigungsmaterial',e(FM),e(FM)],['+ Material-GK',e(SM),e(PM)],['Fertigungslöhne I + II',e(FL1+FL2),e(FL1+FL2)],['+ Fertigungs-GK I + II',e(S1+S2),e(P1+P2)],[BV<0?'− Mehrbestand':'+ Minderbestand',e(Math.abs(BV)),e(Math.abs(BV))],['= HKU',e(HKUi),e(HKUp),'s']]},
    {h:'Zuschlagssätze, Plan-Gemeinkosten, Über-/Unterdeckung'},
    {tab:[['','Summe Ist-GK','Ist-Bezugsgr.','Ist-%','Plan-%','Plan-Bezugsgr.','Plan-GK','Über/Unter'],...names.map((n,i)=>[n,fm(sums[i]),fm(bi[i]),p2_(irate[i]),p2_(pr[i]),fm(bp[i]),fm(pg[i]),ud(uu[i])]),['Saldo',fm(sum_(sums)),'','','','',fm(sum_(pg)),ud(UU),'s']]},
    {h:'b) Betriebsergebnisse'},
    {tab:[['','Ist','Plan'],['HKU',e(HKUi),e(HKUp)],['+ Verwaltungs-GK',e(SV),e(PV)],['+ Vertriebs-GK',e(ST),e(PT)],['= Selbstkosten',e(ISK),e(PSK),'s'],['Umsatzerlöse',e(Ums),e(Ums)],['= Betriebsergebnis',e(BEi),e(BEp),'s']]},
    {h:'c) Interpretation'},
    {t:UU>=0?`Das Ist-Betriebsergebnis liegt um ${e(BEi-BEp)} über dem Plan. Das entspricht dem Saldo der Überdeckungen (${e(UU)}): Es wurde mehr Gemeinkosten verrechnet als tatsächlich angefallen, die Ist-Gemeinkosten waren also niedriger als geplant.`:`Das Ist-Betriebsergebnis liegt um ${e(BEp-BEi)} unter dem Plan. Das entspricht dem Saldo der Unterdeckungen (${e(-UU)}): Die tatsächlichen Gemeinkosten waren höher als die verrechneten Plan-Gemeinkosten.`}],
  tip:'Differenz Plan- und Ist-Betriebsergebnis = Saldo der Über-/Unterdeckungen. Verwaltung und Vertrieb werden auf die HKU bezogen – Bestandsveränderungen vorher berücksichtigen.'};}},

/* ─────────────  Prozesskostenrechnung (Orga, Kostenwesen)  ───────────── */
{id:'c_prozess',qs:'KW',title:'Prozesskostenrechnung: lmi-/lmn-Sätze und Gesamtprozesskostensatz',gen(){
  const sets=[
   {d:'Instandhaltung',p:[['Prüfen und Beurteilen von Störmeldungen','Anzahl Störmeldungen','Stück',R(200,300,10),R(30,60,5)],['Disposition und Bestellung von Ersatzteilen','Anzahl Ersatzteile','Stück',R(2000,3000,100),R(130,200,10)],['Detailplanung der Instandhaltungsarbeiten','Anzahl Aufträge','Stück',R(150,250,10),R(130,200,10)],['Durchführung der Instandhaltungsarbeiten','Instandhaltungsstunden','h',null,R(600,900,50)]],L:'Leitung der Instandhaltung'},
   {d:'Arbeitsvorbereitung',p:[['Arbeitspläne erstellen','Anzahl Arbeitspläne','Stück',R(80,140,5),R(120,200,10)],['Fertigungsaufträge einplanen','Anzahl Fertigungsaufträge','Stück',R(300,500,20),R(100,180,10)],['Betriebsmittel und Vorrichtungen disponieren','Anzahl Rüstvorgänge','Stück',R(120,220,10),R(60,110,10)],['Termine überwachen und nachsteuern','Anzahl Terminabweichungen','Stück',R(60,120,5),R(50,90,10)]],L:'Leitung der Arbeitsvorbereitung'}];
  const S=pick(sets),Ls=R(10,30,5),rate=R(80,140,5);
  const hrs=S.p.map(x=>x[4]),T=sum_(hrs)+Ls,K=T*rate;
  const mng=S.p.map((x,i)=>x[3]===null?hrs[i]:x[3]);
  const pk=hrs.map(h=>h*rate),Kl=Ls*rate,lmi=pk.map((k,i)=>k/mng[i]),sumP=sum_(pk),lm=lmi.map(x=>r2(x)),lmn=lmi.map(x=>Kl/sumP*x),ln=lmn.map(x=>r2(x)),ges=lm.map((x,i)=>r2(x+ln[i]));
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol});return ans.length-1};
  const pkA=S.p.map((x,i)=>({a:push('Prozesskosten '+x[0],pk[i],'€',0.002)}));const klA={a:push('Prozesskosten '+S.L+' (lmn)',Kl,'€',0.002)};
  const lmiA=S.p.map((x,i)=>({a:push('lmi-Satz '+x[0],lm[i],'€/'+S.p[i][2],0.01)}));
  const lmnA=S.p.map((x,i)=>({a:push('lmn-Umlagesatz '+x[0],ln[i],'€/'+S.p[i][2],0.02)}));
  const gesA=S.p.map((x,i)=>({a:push('Gesamtprozesskostensatz '+x[0],ges[i],'€/'+S.p[i][2],0.01)}));
  const rows=S.p.map((x,i)=>[x[0],f(hrs[i],0)+' h',pkA[i],f(mng[i],0)+' '+x[2],lmiA[i],lmnA[i],gesA[i]]);
  rows.push([S.L+' (lmn)',f(Ls,0)+' h',klA,'–','–','–','–']);
  return {text:`In der Abteilung ${S.d} der Kolbe Maschinenbau GmbH fallen monatlich Gemeinkosten von ${e(K)} an. Die Abteilung soll auf Prozesskostenbasis abgerechnet werden. Der Zeitbedarf der Teilprozesse, die Kostentreiber und die Prozessmengen je Monat stehen in Anlage 1. a) Erläutern Sie die Begriffe leistungsmengeninduziert (lmi) und leistungsmengenneutral (lmn). b) Ermitteln Sie in Anlage 1 die Gesamtprozesskostensätze der einzelnen Teilprozesse. Die Kosten des lmn-Prozesses werden im Verhältnis der lmi-Prozesskosten umgelegt. Runden Sie die Sätze auf zwei Nachkommastellen. c) Erläutern Sie, warum die Prozesskostenrechnung verursachungsgerechter ist als die Zuschlagskalkulation.`,
  given:[['Gemeinkosten der Abteilung je Monat',e(K)],['Gesamter Zeitbedarf',f(T,0)+' h']],
  anlage:{nr:'Anlage 1',title:'Prozesskostenrechnung '+S.d,note:'Der Kostensatz je Stunde ergibt sich aus Gemeinkosten ÷ Gesamtzeitbedarf. Sätze auf 2 Nachkommastellen runden.',head:['Teilprozess','Zeitbedarf/Monat','Prozesskosten (€)','Prozessmenge','Prozesskostensatz lmi','Umlagesatz lmn','Gesamt-Prozesskostensatz'],rows},
  ans,
  steps:[{h:'Kostensatz je Stunde'},{l:'Stundensatz',f:[Q('Gemeinkosten','Gesamtzeitbedarf'),Q(e(K),f(T,0)+' h'),f(rate)+' €/h']},
    {h:'Prozesskosten und lmi-Sätze'},
    {tab:[['Teilprozess','Zeit','Prozesskosten','Menge','lmi-Satz'],...S.p.map((x,i)=>[x[0],f(hrs[i],0)+' h',e(pk[i]),f(mng[i],0)+' '+x[2],f(lm[i])+' €/'+x[2]]),[S.L+' (lmn)',f(Ls,0)+' h',e(Kl),'–','–']]},
    {h:'Umlage der lmn-Kosten'},
    {l:'Umlagesatz in %',f:[Q('lmn-Kosten','Σ lmi-Kosten')+' · 100 %',Q(e(Kl),e(sumP))+' · 100 %',f(Kl/sumP*100,3)+' %']},
    {tab:[['Teilprozess','lmi','+ lmn','= Gesamt'],...S.p.map((x,i)=>[x[0],f(lm[i]),f(ln[i]),f(ges[i])+' €/'+x[2]])]},
    {t:'Die Prozesskostenrechnung ordnet Gemeinkosten den Prozessen zu, die sie verursachen (Kostentreiber), statt sie pauschal als Prozentsatz auf Einzelkosten zu verteilen. Dadurch werden Produkte und Aufträge mit hohem Gemeinkostenbedarf nicht mehr von anderen mitfinanziert.'}],
  tip:'Zuerst den Kostensatz je Stunde aus Gesamtkosten und Gesamtzeit, dann Prozesskosten = Zeit × Satz. Der lmn-Prozess (Leitung) hat keinen Kostentreiber und wird proportional auf die lmi-Prozesse umgelegt.'};}}
);

CALC.push(
/* ─────────────  Zuschlagskalkulation mit mehreren Fertigungsbereichen (Orga, Kostenwesen)  ───────────── */
{id:'c_zuschlag_ext',qs:'KW',title:'Angebotskalkulation: mehrere Fertigungsbereiche bis Listenverkaufspreis',gen(){
  const FM=R(18000,38000,500),MG=R(6,10,1),h1=R(10,24,1),r1=R(100,140,5),h2=R(6,14,1),r2_=R(140,190,5),FL=R(1800,3200,100),RF=R(180,260,10),SW=R(100,300,10);
  const he=R(16,30,1),fx=R(190,250,2),vr=R(60,90,2),hv=R(20,40,1),fv=R(120,170,2),vv=R(20,40,2);
  const hm=R(16,28,1),ls=R(36,44,1),nw=pick([2,3,4]),fgm=R(60,100,5);
  const lb=R(300,700,50),fgb=pick([80,100,120]),vw=R(18,28,1),g=R(15,22,1),sk=pick([2,3]),rb=pick([0,0,5,8]);
  const MGKb=FM*MG/100,MK=FM+MGKb;
  const RFb=FL*RF/100,b1=h1*r1,b2=h2*r2_,mech=FL+RFb+b1+b2+SW;
  const el=he*(fx+vr),vm=hv*(fv+vv);
  const mlo=hm*nw*ls,mfg=mlo*fgm/100,em=mlo+mfg,ib=lb+lb*fgb/100;
  const FK=mech+el+vm+em+ib,HK=MK+FK,VV=HK*vw/100,SK=HK+VV,Gw=SK*g/100,BVP=SK+Gw,ZVP=BVP/(1-sk/100),SKb=ZVP-BVP,LVP=ZVP/(1-rb/100),RBb=LVP-ZVP;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.002});return {a:ans.length-1}};
  const rows=[
    ['Fertigungsmaterial','',f(FM)],['+ Materialgemeinkosten',MG+' %',push('Materialgemeinkosten',MGKb,'€')],['= Materialkosten','',push('Materialkosten',MK,'€')],
    ['Mechanische Fertigung: Fertigungslöhne','',f(FL)],['+ Restfertigungsgemeinkosten',RF+' % auf Lohn',push('Restfertigungsgemeinkosten',RFb,'€')],['+ BAZ 1',`${h1} h · ${r1} €/h`,push('BAZ 1',b1,'€')],['+ BAZ 2',`${h2} h · ${r2_} €/h`,push('BAZ 2',b2,'€')],['+ Spezialwerkzeug (SEF)','',f(SW)],['= Kosten mechanische Fertigung','',push('Kosten mechanische Fertigung',mech,'€')],
    ['Elektrische Fertigung',`${he} h · (${fx} + ${vr}) €/h`,push('Kosten elektrische Fertigung',el,'€')],
    ['Vormontage',`${hv} h · (${fv} + ${vv}) €/h`,push('Kosten Vormontage',vm,'€')],
    ['Endmontage: Fertigungslöhne',`${hm} h · ${nw} Werker · ${ls} €/h`,push('Fertigungslöhne Endmontage',mlo,'€')],['+ Fertigungsgemeinkosten Endmontage',fgm+' %',push('FGK Endmontage',mfg,'€')],['= Kosten Endmontage','',push('Kosten Endmontage',em,'€')],
    ['Interne Inbetriebnahme: Lohn + FGK',`${f(lb,0)} € + ${fgb} %`,push('Kosten Inbetriebnahme',ib,'€')],
    ['= Fertigungskosten gesamt','',push('Fertigungskosten gesamt',FK,'€')],['= Herstellkosten','',push('Herstellkosten',HK,'€')],['+ Verwaltungs- und Vertriebsgemeinkosten',vw+' %',push('Verwaltungs- und Vertriebsgemeinkosten',VV,'€')],['= Selbstkosten','',push('Selbstkosten',SK,'€')],['+ Gewinn',g+' %',push('Gewinn',Gw,'€')],['= Barverkaufspreis','',push('Barverkaufspreis',BVP,'€')],['+ Kundenskonto',sk+' % i. H.',push('Kundenskonto',SKb,'€')],['= Zielverkaufspreis','',push('Zielverkaufspreis',ZVP,'€')]];
  if(rb)rows.push(['+ Kundenrabatt',rb+' % i. H.',push('Kundenrabatt',RBb,'€')]);
  rows.push([rb?'= Listenverkaufspreis':'= Listenverkaufspreis (kein Rabatt)','',push('Listenverkaufspreis',LVP,'€')]);
  const T=(a,b,c)=>[a,b,c];
  return {text:`Die Nordmann Aggregatebau GmbH soll für einen Kunden ein Hydraulikaggregat HA 300 anbieten. Die Kosten der Fertigungsbereiche (mechanische Fertigung, elektrische Fertigung, Vormontage, Endmontage, interne Inbetriebnahme) sind im Kalkulationsschema (Anlage 1) angegeben. In den Bereichen Elektrik und Vormontage wird mit fixen und variablen Plankostenverrechnungssätzen je Stunde gerechnet. ${rb?'Der Kunde erhält '+rb+' % Rabatt.':'Es wird kein Kundenrabatt gewährt.'} a) Ermitteln Sie den Listenverkaufspreis des Aggregats. b) Beschreiben Sie, wie sich ein geringerer Beschäftigungsgrad auf die Kosten der mechanischen und der elektrischen Fertigung auswirkt.`,
  given:[['Fertigungsmaterial / MGK',`${e(FM)} / ${MG} %`],['Mechanik: Fertigungslohn / RFGK',`${e(FL)} / ${RF} % auf Lohn`],['BAZ 1',`${h1} h à ${r1} €/h`],['BAZ 2',`${h2} h à ${r2_} €/h`],['Spezialwerkzeug',e(SW)],['Elektrik',`${he} h · fix ${fx} €/h · variabel ${vr} €/h`],['Vormontage',`${hv} h · fix ${fv} €/h · variabel ${vv} €/h`],['Endmontage',`${hm} h je Werker · ${nw} Werker · Lohnsatz ${ls} €/h · FGK ${fgm} %`],['Inbetriebnahme',`Lohn ${e(lb)} · FGK ${fgb} %`],['VwVtGK / Gewinn / Skonto',`${vw} % / ${g} % / ${sk} % (im Hundert)`]],
  anlage:{nr:'Anlage 1',title:'Kalkulationsschema Hydraulikaggregat HA 300',note:'Skonto und Rabatt werden im Hundert gerechnet (Zielverkaufspreis = Barverkaufspreis ÷ (1 − Skonto)).',head:['Position','Angaben','Betrag (€)'],rows},
  ans,
  steps:[{h:'Material und Fertigung'},
    {tab:[['Position','Rechnung','Betrag'],['Material',`${e(FM)} + ${MG} %`,e(MK)],['Mechanik',`${e(FL)} + ${RF} % RFGK + BAZ 1 ${e(b1)} + BAZ 2 ${e(b2)} + SEF ${e(SW)}`,e(mech)],['Elektrik',`${he} h · ${fx+vr} €/h`,e(el)],['Vormontage',`${hv} h · ${fv+vv} €/h`,e(vm)],['Endmontage',`${f(mlo,0)} € + ${fgm} %`,e(em)],['Inbetriebnahme',`${e(lb)} + ${fgb} %`,e(ib)],['Herstellkosten',`${e(MK)} + ${e(FK)}`,e(HK),'s']]},
    {h:'Zuschläge bis zum Listenpreis'},
    {tab:[['','Betrag'],['Herstellkosten',e(HK)],[`+ VwVtGK ${vw} %`,e(VV)],['= Selbstkosten',e(SK),'s'],[`+ Gewinn ${g} %`,e(Gw)],['= Barverkaufspreis',e(BVP),'s'],[`+ Skonto ${sk} % i. H.`,e(SKb)],['= Zielverkaufspreis',e(ZVP),'s'],...(rb?[[`+ Rabatt ${rb} % i. H.`,e(RBb)],['= Listenverkaufspreis',e(LVP),'s']]:[['= Listenverkaufspreis (kein Rabatt)',e(LVP),'s']])]},
    {h:'b) Beschäftigungsgrad'},
    {t:'Bei geringerer Beschäftigung sinken in der mechanischen Fertigung (Maschinenstundensatz aus Fixkosten + variablen Kosten) die variablen Kosten mit der Menge, die fixen Kosten bleiben absolut gleich. Je Stunde steigen deshalb die Stückkosten (Fixkostenanteil verteilt sich auf weniger Stunden). In der elektrischen Fertigung gilt dasselbe: Der variable Satz je Stunde ändert sich nicht, der fixe Satz je Stunde steigt, die Unterdeckung der Fixkosten wächst.'}],
  tip:'Skonto und Rabatt werden „im Hundert“ gerechnet: ZVP = BVP ÷ (1 − Skonto), LVP = ZVP ÷ (1 − Rabatt).'};}},

/* ─────────────  Kostenvergleich zweier Anlagen mit kritischer Auslastung  ───────────── */
{id:'c_kostenvgl_ext',qs:'KW',title:'Kostenvergleichsrechnung: Anschaffung, AfA, Zinsen, kritische Auslastung',gen(){
  let P;for(let k=0;k<200;k++){
    const mk=(lp,rb,fr,ins,lq,fx,vs)=>({lp,rb,fr,ins,lq,fx,vs});
    const a=mk(R(250000,320000,5000),R(10,20,5),0,R(12000,20000,500),R(15000,25000,500),R(13000,16000,100),R(24,30,0.5));
    const b=mk(a.lp-R(25000,45000,1000),R(5,12,1),R(5000,9000,100),R(10000,15000,500),R(10000,16000,500),R(11000,13500,50),a.vs+R(0.5,3,0.5));
    const nd=R(10,15,1),cap=pick([3000,3600,4000]),au=pick([0.75,0.8,0.85,0.9]),zi=pick([6,8,10]),lo=pick([38,40,42,45]);
    const ak=x=>x.lp*(1-x.rb/100)+x.fr+x.ins,calc=x=>{const K=ak(x),afa=(K-x.lq)/nd,zs=(K+x.lq)/2*zi/100,fix=afa+zs+x.fx;return {K,afa,zs,fix,var_:x.vs+lo}};
    const A=calc(a),B=calc(b);if(B.fix>=A.fix||B.var_<=A.var_)continue;
    const xk=(A.fix-B.fix)/(B.var_-A.var_);if(xk<cap*0.35||xk>cap*0.85)continue;
    P={a,b,nd,cap,au,zi,lo,A,B,xk};break}
  if(!P)return CALC.find(x=>x.id==='c_kostenvgl_ext').gen();
  const {a,b,nd,cap,au,zi,lo,A,B,xk}=P,h=cap*au,vA=A.var_*h,vB=B.var_*h,gA=A.fix+vA,gB=B.fix+vB,best=gA<=gB?1:2;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003});return {a:ans.length-1}};
  const rows=[['Anschaffungskosten (€)',push('Anschaffungskosten Anlage 1',A.K,'€'),push('Anschaffungskosten Anlage 2',B.K,'€')],
    ['kalkulatorische Abschreibung (€/Jahr)',push('Abschreibung Anlage 1',A.afa,'€'),push('Abschreibung Anlage 2',B.afa,'€')],
    ['kalkulatorische Zinsen (€/Jahr)',push('Zinsen Anlage 1',A.zs,'€'),push('Zinsen Anlage 2',B.zs,'€')],
    ['sonstige Fixkosten (€/Jahr)',f(a.fx),f(b.fx)],
    {s:1,c:['Fixkosten gesamt (€/Jahr)',push('Fixkosten Anlage 1',A.fix,'€'),push('Fixkosten Anlage 2',B.fix,'€')]},
    ['variable Kosten je Stunde (€/h)',push('variable Kosten je Stunde Anlage 1',A.var_,'€/h'),push('variable Kosten je Stunde Anlage 2',B.var_,'€/h')],
    ['Auslastung (h/Jahr)',push('Jahresstunden Anlage 1',h,'h'),push('Jahresstunden Anlage 2',h,'h')],
    ['variable Kosten (€/Jahr)',push('variable Kosten Anlage 1',vA,'€'),push('variable Kosten Anlage 2',vB,'€')],
    {s:1,c:['Gesamtkosten (€/Jahr)',push('Gesamtkosten Anlage 1',gA,'€'),push('Gesamtkosten Anlage 2',gB,'€')]}];
  push('Vorteilhafte Anlage (Nummer 1 oder 2)',best,'Nr.',0.001);push('Kritische Auslastung',xk,'h/Jahr',0.003);
  return {text:`Die Seeberg Fördertechnik GmbH will eine Krananlage für die Halle beschaffen. Zur Wahl stehen zwei Anlagen (Angaben siehe Tabelle). Die Anlagen werden linear abgeschrieben und bei einer Mindestverzinsung von ${zi} % p. a. auf das durchschnittlich gebundene Kapital verzinst. Der Lohnkostensatz des Kranführers beträgt ${lo} €/h. Die durchschnittliche Auslastung liegt bei ${f(au*100,0)} % der Maximalkapazität. a) Führen Sie eine Kostenvergleichsrechnung (Anlage 1) durch und entscheiden Sie sich für eine Anlage (Nummer eintragen). b) Ermitteln Sie die Auslastung in Stunden, bei der die Kosten beider Alternativen gleich hoch sind, und interpretieren Sie den Wert.`,
  given:[['Mindestverzinsung',zi+' % p. a.'],['Nutzungsdauer',nd+' Jahre'],['Lohnkostensatz Kranführer',lo+' €/h'],['Maximalkapazität',f(cap,0)+' h/Jahr'],['Durchschnittliche Auslastung',f(au*100,0)+' %']],
  gtab:{head:['','Anlage 1','Anlage 2'],rows:[['Listenpreis',e(a.lp),e(b.lp)],['Rabatt',a.rb+' %',b.rb+' %'],['Frachtkosten',a.fr?e(a.fr):'keine',e(b.fr)],['Installationskosten',e(a.ins),e(b.ins)],['Liquidationserlös (nach Demontage)',e(a.lq),e(b.lq)],['sonstige Fixkosten pro Jahr',e(a.fx),e(b.fx)],['variabler Stundensatz Anlage',f(a.vs)+' €/h',f(b.vs)+' €/h']]},
  anlage:{nr:'Anlage 1',title:'Kostenvergleichsrechnung',note:'Anschaffungskosten = Listenpreis − Rabatt + Fracht + Installation. AfA = (AK − Liquidationserlös) ÷ Nutzungsdauer. Zinsen = (AK + Liquidationserlös) ÷ 2 · Zinssatz.',head:['Position','Anlage 1','Anlage 2'],rows},
  ans,
  steps:[{h:'Anschaffungskosten'},{tab:[['','Anlage 1','Anlage 2'],['Listenpreis',e(a.lp),e(b.lp)],['− Rabatt',e(a.lp*a.rb/100),e(b.lp*b.rb/100)],['+ Fracht',e(a.fr),e(b.fr)],['+ Installation',e(a.ins),e(b.ins)],['= Anschaffungskosten',e(A.K),e(B.K),'s']]},
    {h:'Fixkosten'},{tab:[['','Anlage 1','Anlage 2'],['AfA = (AK − RW) ÷ n',e(A.afa),e(B.afa)],['Zinsen = (AK + RW) ÷ 2 · i',e(A.zs),e(B.zs)],['sonstige Fixkosten',e(a.fx),e(b.fx)],['= Fixkosten',e(A.fix),e(B.fix),'s']]},
    {h:'Variable Kosten und Gesamtkosten'},{l:'Jahresstunden',f:['Kapazität · Auslastung',`${f(cap,0)} h · ${f(au,2)}`,f(h,0)+' h']},
    {tab:[['','Anlage 1','Anlage 2'],['variabler Satz je h (Anlage + Lohn)',`${f(a.vs)} + ${lo} = ${f(A.var_)}`,`${f(b.vs)} + ${lo} = ${f(B.var_)}`],['variable Kosten',e(vA),e(vB)],['Gesamtkosten',e(gA),e(gB),'s']]},
    {t:`Entscheidung: Anlage ${best} hat die niedrigeren Gesamtkosten.`},
    {h:'b) Kritische Auslastung'},{l:'x krit',f:[Q('Fixkosten 1 − Fixkosten 2','var. Satz 2 − var. Satz 1'),Q(`${e(A.fix)} − ${e(B.fix)}`,`${f(B.var_)} − ${f(A.var_)}`),f(xk)+' h/Jahr']},
    {t:`Bis ${f(xk,0)} h/Jahr ist Anlage 2 (niedrigere Fixkosten) kostengünstiger, darüber bis ${f(cap,0)} h Anlage 1 (niedrigere variable Kosten je Stunde). Die geplante Auslastung von ${f(h,0)} h liegt ${h>xk?'über':'unter'} dem kritischen Wert.`}],
  tip:'Kritische Auslastung: Fixkostenunterschied ÷ Unterschied der variablen Kosten je Stunde. Unterhalb ist die Anlage mit den geringeren Fixkosten günstiger.'};}}
);

CALC.push(
/* ─────────────  Rentabilität und Amortisation einer Investition  ───────────── */
{id:'c_invest',qs:'KW',title:'Investition: Anschaffungskosten, Kapitalrentabilität und Amortisationsdauer',gen(){
  const LP=R(250000,450000,1000),rb=pick([10,12.5,15]),sk=pick([2,3]),fr=R(1500,3500,10),ins=R(5000,10000,100),fu=R(2000,5000,100),nd=pick([8,10,12]),rwp=pick([3,4,5,6]),zi=pick([6,8]),lim=pick([4,5,6]);
  const ZE=LP*(1-rb/100),BE=ZE*(1-sk/100),BZ=BE+fr,AK=BZ+ins+fu,RW=LP*rwp/100,afa=(AK-RW)/nd,Ks=Math.round((AK-RW)/lim/lim*R(0.85,1.25,0.01)/100)*100+afa*0+Math.round(afa/2/100)*100;
  const E=Math.round((AK-RW)/lim/1000*R(0.8,1.15,0.01)-afa/1000)*1000>0?Math.round(((AK-RW)/lim-afa)*R(0.88,1.12,0.01)/500)*500:R(20000,40000,500);
  const dk=(AK+RW)/2,zs=dk*zi/100,kr=(E+zs)/dk*100,rf=E+afa,ta=(AK-RW)/rf,ok=ta<=lim?1:0;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003})};
  push('Zieleinkaufspreis',ZE,'€');push('Bareinkaufspreis',BE,'€');push('Bezugspreis',BZ,'€');push('Anschaffungskosten',AK,'€');push('Restwert',RW,'€');push('Durchschnittlich gebundenes Kapital',dk,'€');push('Kalkulatorische Zinsen',zs,'€/Jahr');push('Kapitalrentabilität',kr,'%');
  push('Jährliche Abschreibung',afa,'€/Jahr');push('Durchschnittlicher jährlicher Rückfluss',rf,'€/Jahr');push('Amortisationsdauer',ta,'Jahre',0.004);push('Entscheidung (1 = durchführen, 0 = nicht durchführen)',ok,'',0.001);
  return {text:`Die Fischer Blechtechnik GmbH plant den Kauf einer neuen Laserschneidanlage. Das Angebot enthält die nebenstehenden Positionen. Die Anlage soll ${nd} Jahre genutzt werden; am Ende wird ein Restwert von ${f(rwp,0)} % des Listenpreises erwartet. Gegenüber der Altanlage werden durchschnittlich ${e(E)} Kosten pro Jahr eingespart. Kalkulatorischer Zinssatz: ${zi} % p. a. a) Berechnen Sie die Kapitalrentabilität der Investition (Anschaffungskosten aus dem Angebot ermitteln). b) Die Geschäftsführung fordert, dass sich die Investition spätestens nach ${lim} Jahren amortisiert hat. Ermitteln Sie die Amortisationsdauer und treffen Sie eine Investitionsentscheidung (Eingabe: 1 = durchführen, 0 = nicht durchführen).`,
  given:[['Listenpreis',e(LP)],['Rabatt / Skonto',`${f(rb,1)} % / ${sk} %`],['Frachtkosten',e(fr)],['Installationskosten',e(ins)],['Fundamente',e(fu)],['Nutzungsdauer / Restwert',`${nd} Jahre / ${rwp} % vom Listenpreis`],['Kosteneinsparung pro Jahr',e(E)],['Kalkulatorischer Zinssatz',zi+' % p. a.'],['Geforderte Amortisation',`höchstens ${lim} Jahre`]],
  ans,
  steps:[{h:'Anschaffungskosten'},{tab:[['','Betrag'],['Listenpreis',e(LP)],[`− Rabatt ${f(rb,1)} %`,e(LP*rb/100)],['= Zieleinkaufspreis',e(ZE),'s'],[`− Skonto ${sk} %`,e(ZE*sk/100)],['= Bareinkaufspreis',e(BE),'s'],['+ Fracht',e(fr)],['= Bezugspreis',e(BZ),'s'],['+ Installation + Fundamente',e(ins+fu)],['= Anschaffungskosten',e(AK),'s']]},
    {l:'Restwert',f:['Restwertanteil · Listenpreis',`${rwp} % · ${e(LP)}`,e(RW)]},
    {h:'a) Kapitalrentabilität'},{l:'Ø Kapital',f:['(AK + Restwert) ÷ 2',`(${e(AK)} + ${e(RW)}) ÷ 2`,e(dk)]},{l:'kalk. Zinsen',f:['Ø Kapital · i',`${e(dk)} · ${zi} %`,e(zs)]},
    {l:'Rentabilität',f:[Q('Einsparung + kalk. Zinsen','Ø Kapital')+' · 100 %',Q(`${e(E)} + ${e(zs)}`,e(dk))+' · 100 %',f(kr)+' %']},
    {h:'b) Amortisationsdauer'},{l:'Abschreibung',f:['(AK − RW) ÷ n',`(${e(AK)} − ${e(RW)}) ÷ ${nd}`,e(afa)]},{l:'Rückfluss',f:['Einsparung + Abschreibung',`${e(E)} + ${e(afa)}`,e(rf)]},
    {l:'Amortisation',f:[Q('AK − RW','Rückfluss'),Q(`${e(AK)} − ${e(RW)}`,e(rf)),f(ta)+' Jahre']},{t:ta<=lim?`${f(ta)} Jahre ≤ ${lim} Jahre → Investition durchführen.`:`${f(ta)} Jahre > ${lim} Jahre → Investition nicht durchführen.`}],
  tip:'Amortisationsdauer = (Anschaffungskosten − Restwert) ÷ durchschnittlicher Rückfluss (Gewinn bzw. Einsparung + Abschreibung).'};}},

/* ─────────────  Äquivalenzziffernkalkulation mit zwei Kostenblöcken  ───────────── */
{id:'c_aequiv2',qs:'KW',title:'Äquivalenzziffernkalkulation: zwei Kostenblöcke, Herstellkosten je Sorte',gen(){
  const nm=['RSM 1','RSM 2','RSM 3','RSM 4'],bi=pick([0,1,2,3]);
  const qty=nm.map(()=>R(2500,5500,100)),b1=pick([18,20,22,25]),b2=pick([80,100,120]);
  const mk=(base,lo,hi)=>nm.map((n,i)=>i===bi?base:Math.round(base*R(lo,hi,0.05)));
  const g=mk(b1,0.8,1.9),z=mk(b2,0.8,1.4);
  const ae1=g.map(x=>x/g[bi]),ae2=z.map(x=>x/z[bi]);
  const re1=qty.map((q,i)=>q*ae1[i]),re2=qty.map((q,i)=>q*ae2[i]);
  const K1=R(15000,28000,500),K2=R(45000,75000,500),s1=sum_(re1),s2=sum_(re2),k1=r2(K1/s1),k2=r2(K2/s2);
  const m1=ae1.map(a=>r2(a*k1)),f2=ae2.map(a=>r2(a*k2));
  const wz=R(60,110,5)/100,sh=R(50,70,5)/100,mgk=pick([12,15,18]),mo=pick([0.15,0.2,0.25]);
  const mek=m1.map(x=>r2(x+wz+sh)),mg=mek.map(x=>r2(x*mgk/100)),mkk=mek.map((x,i)=>r2(x+mg[i])),fk=f2.map(x=>r2(x+mo)),hk=mkk.map((x,i)=>r2(x+fk[i]));
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.006,abs:0.02});return {a:ans.length-1}};
  const rowA=(lab,vals,u)=>[lab,...vals.map((v,i)=>push(lab+' '+nm[i],v,u)),null];
  const rows=[
    rowA('ÄZ Hartmetallspitze',ae1,''),
    [ 'Rechnungseinheiten Hartmetall',...re1.map((v,i)=>push('RE Hartmetall '+nm[i],v,'RE',0.002)),push('Summe RE Hartmetall',s1,'RE',0.002)],
    ['Kosten je RE Hartmetall (€)',null,null,null,null,push('Kosten je RE Hartmetall',k1,'€',0.01)],
    rowA('Hartmetallspitze je Stück (€)',m1,'€'),
    rowA('ÄZ Werkzeugaufnahme',ae2,''),
    ['Rechnungseinheiten Werkzeugaufnahme',...re2.map((v,i)=>push('RE Werkzeugaufnahme '+nm[i],v,'RE',0.002)),push('Summe RE Werkzeugaufnahme',s2,'RE',0.002)],
    ['Kosten je RE Werkzeugaufnahme (€)',null,null,null,null,push('Kosten je RE Werkzeugaufnahme',k2,'€',0.01)],
    rowA('Fertigungskosten Werkzeugaufnahme je Stück (€)',f2,'€'),
    rowA('Materialeinzelkosten gesamt (€)',mek,'€'),
    rowA(`Materialgemeinkosten ${mgk} % (€)`,mg,'€'),
    rowA('Fertigungskosten inkl. Montage (€)',fk,'€'),
    rowA('Herstellkosten je Stück (€)',hk,'€')];
  const tb=[['Typ','Menge',`Gewicht Hartmetallspitze (g)`,'Fertigungszeit Werkzeugaufnahme (s)'],...nm.map((n,i)=>[n,f(qty[i],0),f(g[i],0),f(z[i],0)])];
  return {text:`Die Becker Zerspanungswerkzeuge GmbH fertigt vier Rundschaftmeißel (RSM 1–4). Verschleißscheibe und Spannhülse sind bei allen Typen gleich. Die Kosten der Hartmetallspitzen (gesamt ${e(K1)}) richten sich nach dem Gewicht der Spitze, die Fertigungskosten der Werkzeugaufnahmen (gesamt ${e(K2)}) nach der Fertigungszeit je Stück. Je Werkzeugaufnahme fallen ${e(wz)} Fertigungsmaterial an (alle Typen gleich), für Spannhülse und Verschleißscheibe ${e(sh)} je RSM. Materialgemeinkosten: ${mgk} %; Montage je RSM: ${e(mo)}. Kalkulieren Sie die Herstellkosten je Stück für die einzelnen Typen (Anlage 1). Wählen Sie als Basissorte ${nm[bi]} (ÄZ = 1) und runden Sie alle Beträge je Stück auf zwei Nachkommastellen.`,
  given:[['Basissorte (ÄZ = 1)',nm[bi]],['Kosten Hartmetallspitzen gesamt',e(K1)],['Fertigungskosten Werkzeugaufnahmen gesamt',e(K2)],['Fertigungsmaterial je Werkzeugaufnahme',e(wz)],['Spannhülse + Verschleißscheibe je RSM',e(sh)],['MGK-Zuschlag / Montage je RSM',`${mgk} % / ${e(mo)}`]],
  gtab:{head:tb[0],rows:tb.slice(1)},
  anlage:{nr:'Anlage 1',title:'Äquivalenzziffernkalkulation',note:'Rechnungseinheiten = Menge · Äquivalenzziffer. Kosten je RE auf 2 Nachkommastellen runden.',head:['','RSM 1','RSM 2','RSM 3','RSM 4','Summe / je RE'],rows},
  ans,
  steps:[{h:'Äquivalenzziffern und Rechnungseinheiten'},{tab:[['','ÄZ HM','RE HM','ÄZ WZA','RE WZA'],...nm.map((n,i)=>[n,f(ae1[i],2),f(re1[i],0),f(ae2[i],2),f(re2[i],0)]),['Summe','',f(s1,0),'',f(s2,0),'s']]},
    {l:'Kosten je RE Hartmetall',f:[Q('Gesamtkosten','Σ RE'),Q(e(K1),f(s1,0)),f(k1)+' €']},{l:'Kosten je RE Werkzeugaufnahme',f:[Q('Gesamtkosten','Σ RE'),Q(e(K2),f(s2,0)),f(k2)+' €']},
    {h:'Herstellkosten je Stück'},{tab:[['','Hartmetall','+ WZA-Mat. + SH/VS','= MEK','+ MGK','Fertigung','Hk'],...nm.map((n,i)=>[n,f(m1[i]),f(wz+sh),f(mek[i]),f(mg[i]),f(fk[i]),f(hk[i])])]},
    {t:`Fertigungskosten = ÄZ · Kosten je RE + Montage (${e(mo)}). Herstellkosten = Materialeinzelkosten + MGK + Fertigungskosten.`}],
  tip:'Zwei Kostenblöcke → zwei Äquivalenzziffern-Reihen mit je eigener Bezugsgröße (Gewicht bzw. Zeit). Die Basissorte hat immer ÄZ = 1.'};}},

/* ─────────────  Kostenvergleich + Amortisation + kritische Menge (zwei Maschinen)  ───────────── */
{id:'c_kvgl_amort',qs:'KW',title:'Zwei Maschinen: Kostenvergleich, Amortisationsdauer und kritische Auslastung',gen(){
  let P;for(let k=0;k<300;k++){
    const a={ak:R(280000,340000,5000),rw:R(10000,20000,500),fx:R(8000,10000,125),mss:R(22,26,0.5)};
    const b={ak:a.ak-R(25000,50000,5000),rw:R(8000,12000,500),fx:R(6500,8000,125),mss:a.mss+R(4,8,0.5)};
    const nd=pick([8,10]),lo=R(20,26,1),au=R(1400,1700,50),cap=pick([1800,2000]),er=R(85,110,5),zi=pick([5,6,7]);
    const c=x=>{const afa=(x.ak-x.rw)/nd,zs=(x.ak+x.rw)/2*zi/100,fix=afa+zs+x.fx,vk=x.mss+lo;return {afa,zs,fix,vk,var_:vk*au,ges:fix+vk*au}};
    const A=c(a),B=c(b);if(!(B.fix<A.fix&&B.vk>A.vk))continue;const xk=(A.fix-B.fix)/(B.vk-A.vk);if(xk<cap*0.45||xk>au*0.95)continue;
    const gA=er*au-A.ges,gB=er*au-B.ges;if(gA<=0||gB<=0)continue;P={a,b,nd,lo,au,cap,er,zi,A,B,xk,gA,gB};break}
  if(!P)return CALC.find(x=>x.id==='c_kvgl_amort').gen();
  const {a,b,nd,lo,au,cap,er,zi,A,B,xk,gA,gB}=P;const rA=gA+A.afa,rB=gB+B.afa,tA=(a.ak-a.rw)/rA,tB=(b.ak-b.rw)/rB,best=A.ges<=B.ges?1:2;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003});return {a:ans.length-1}};
  const rows=[['kalk. Abschreibung (€/Jahr)',push('Abschreibung Maschine 1',A.afa,'€'),push('Abschreibung Maschine 2',B.afa,'€')],['kalk. Zinsen (€/Jahr)',push('Zinsen Maschine 1',A.zs,'€'),push('Zinsen Maschine 2',B.zs,'€')],['sonstige Fixkosten (€/Jahr)',f(a.fx),f(b.fx)],
    {s:1,c:['Fixkosten gesamt (€/Jahr)',push('Fixkosten Maschine 1',A.fix,'€'),push('Fixkosten Maschine 2',B.fix,'€')]},
    ['variable Kosten (Maschine + Lohn) (€/Jahr)',push('variable Kosten Maschine 1',A.var_,'€'),push('variable Kosten Maschine 2',B.var_,'€')],
    {s:1,c:['Gesamtkosten (€/Jahr)',push('Gesamtkosten Maschine 1',A.ges,'€'),push('Gesamtkosten Maschine 2',B.ges,'€')]}];
  const rows2=[['Erlös (€/Jahr)',push('Erlös Maschine 1',er*au,'€'),push('Erlös Maschine 2',er*au,'€')],['Jahresergebnis (€)',push('Jahresergebnis Maschine 1',gA,'€'),push('Jahresergebnis Maschine 2',gB,'€')],['Rückfluss = Ergebnis + AfA (€/Jahr)',push('Rückfluss Maschine 1',rA,'€'),push('Rückfluss Maschine 2',rB,'€')],{s:1,c:['Amortisationsdauer (Jahre)',push('Amortisationsdauer Maschine 1',tA,'Jahre',0.004),push('Amortisationsdauer Maschine 2',tB,'Jahre',0.004)]}];
  push('Günstigere Maschine (Nummer 1 oder 2)',best,'Nr.',0.001);push('Kritische Auslastung',xk,'h/Jahr',0.003);
  return {text:`Die Westfalia Schienenräder GmbH will eine Drehmaschine ersetzen und vergleicht zwei Angebote. Kalkulationszinssatz: ${zi} % p. a.; die Maschinen werden linear über ${nd} Jahre abgeschrieben. a) Führen Sie eine Kostenvergleichsrechnung durch (Anlage 1) und entscheiden Sie sich für eine Maschine (Nummer eintragen). b) Ermitteln Sie die Amortisationsdauer beider Alternativen (Anlage 2). c) Ermitteln Sie die Auslastung in Stunden, bei der die Kosten beider Alternativen gleich hoch sind.`,
  given:[['Kalkulationszinssatz / Nutzungsdauer',`${zi} % / ${nd} Jahre`],['Fertigungslohnkostensatz',lo+' €/h'],['Ø Auslastung',f(au,0)+' h/Jahr'],['Maximale Kapazität (Einschicht)',f(cap,0)+' h/Jahr'],['Ø Nettoerlös je Stunde',er+' €']],
  gtab:{head:['','Maschine 1','Maschine 2'],rows:[['Anschaffungskosten',e(a.ak),e(b.ak)],['Restwert am Ende der ND',e(a.rw),e(b.rw)],['sonstige Fixkosten pro Jahr',e(a.fx),e(b.fx)],['variabler Maschinenstundensatz',f(a.mss)+' €/h',f(b.mss)+' €/h']]},
  anlage:[{nr:'Anlage 1',title:'Kostenvergleichsrechnung',note:'AfA = (AK − RW) ÷ ND; Zinsen = (AK + RW) ÷ 2 · i.',head:['Position','Maschine 1','Maschine 2'],rows},{nr:'Anlage 2',title:'Amortisationsrechnung (Durchschnittsmethode)',note:'Jahresergebnis = Erlös − Gesamtkosten; Amortisationsdauer = (AK − RW) ÷ Rückfluss.',head:['Position','Maschine 1','Maschine 2'],rows:rows2}],
  ans,
  steps:[{h:'a) Kostenvergleich'},{tab:[['','Maschine 1','Maschine 2'],['AfA',e(A.afa),e(B.afa)],['Zinsen',e(A.zs),e(B.zs)],['sonst. Fixkosten',e(a.fx),e(b.fx)],['Fixkosten',e(A.fix),e(B.fix),'s'],['var. Satz (MSS + Lohn)',`${f(A.vk)} €/h`,`${f(B.vk)} €/h`],['variable Kosten',e(A.var_),e(B.var_)],['Gesamtkosten',e(A.ges),e(B.ges),'s']]},{t:`Entscheidung: Maschine ${best} (niedrigere Gesamtkosten).`},
    {h:'b) Amortisation'},{tab:[['','Maschine 1','Maschine 2'],['Erlös',e(er*au),e(er*au)],['− Gesamtkosten',e(A.ges),e(B.ges)],['= Jahresergebnis',e(gA),e(gB),'s'],['+ AfA',e(A.afa),e(B.afa)],['= Rückfluss',e(rA),e(rB),'s'],['Amortisation (AK − RW) ÷ Rückfluss',f(tA)+' Jahre',f(tB)+' Jahre']]},
    {h:'c) Kritische Auslastung'},{l:'x krit',f:[Q('Fix 1 − Fix 2','var. Satz 2 − var. Satz 1'),Q(`${e(A.fix)} − ${e(B.fix)}`,`${f(B.vk)} − ${f(A.vk)}`),f(xk)+' h/Jahr']},{t:`Unter ${f(xk,0)} h/Jahr ist Maschine 2, darüber Maschine 1 günstiger.`}],
  tip:'Beim Variablen Satz zählen Maschinenstundensatz und Fertigungslohn zusammen. Kritische Menge = Fixkostendifferenz ÷ Differenz der variablen Sätze.'};}},

/* ─────────────  Break-even aus der Zuschlagskalkulation  ───────────── */
{id:'c_bep_zuschlag',qs:'KW',title:'Break-even-Menge aus der Kalkulation (fix/variabel) und maximaler Rabatt',gen(){
  const FM=R(600,1200,10),FL=R(300,600,10),SEF=R(30,80,5),SEV=R(40,90,5),mg=pick([15,20,25]),mf=pick([50,60,75]),fg=pick([300,350,400]),ff=pick([50,60,70]),vv=pick([15,20,25]),sk=pick([2,3]),n=R(80,150,10);
  const MGK=FM*mg/100,MGKv=MGK*(100-mf)/100,MGKf=MGK-MGKv,MK=FM+MGK,MKv=FM+MGKv,FGK=FL*fg/100,FGKv=FGK*(100-ff)/100,FGKf=FGK-FGKv,FK=FL+FGK+SEF,FKv=FL+FGKv+SEF,FKf=FGKf,HK=MK+FK,HKv=MKv+FKv,HKf=MGKf+FKf,VV=HK*vv/100,SK=HK+VV+SEV,SKv=HKv+SEV,SKf=HKf+VV;
  const mr=R(8,12,1),LP=Math.round(SK/(1-sk/100)/(1-mr/100)/10)*10,rb=mr+R(3,6,1),ZV=LP*(1-rb/100),BV=ZV*(1-sk/100);
  const Kf=SKf*n,x=Kf/(BV-SKv),xr=Math.ceil(x-1e-9),ZVm=SK/(1-sk/100),Rm=LP-ZVm,Rp=Rm/LP*100;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003,abs:0.02});return {a:ans.length-1}};
  const tri=(lab,t,v,fx)=>[lab,push(lab+' gesamt',t,'€'),push(lab+' variabel',v,'€'),push(lab+' fix',fx,'€')];
  const rows=[['Fertigungsmaterial',f(FM),f(FM),'–'],tri('Materialgemeinkosten',MGK,MGKv,MGKf),tri('Materialkosten',MK,MKv,MGKf),['Fertigungslöhne',f(FL),f(FL),'–'],tri('Fertigungsgemeinkosten',FGK,FGKv,FGKf),['Sondereinzelkosten der Fertigung',f(SEF),f(SEF),'–'],tri('Fertigungskosten',FK,FKv,FKf),tri('Herstellkosten',HK,HKv,HKf),tri('Verwaltungs-/Vertriebsgemeinkosten',VV,0,VV),['Sondereinzelkosten des Vertriebs',f(SEV),f(SEV),'–'],tri('Selbstkosten',SK,SKv,SKf)];
  push('Zielverkaufspreis',ZV,'€');push('Barverkaufspreis',BV,'€');push('Fixkosten je Monat',Kf,'€');push('Break-even-Menge (aufgerundet)',xr,'Stück',0.001);push('Maximaler Kundenrabatt in €',Rm,'€');push('Maximaler Kundenrabatt in %',Rp,'%',0.004);
  return {text:`Die Hansen Marinetechnik GmbH fertigt einen elektrischen Außenbordantrieb. Für den Monat liegen die folgenden Kalkulationsdaten vor. Der Listenverkaufspreis beträgt ${e(LP)}, die Produktions- und Absatzmenge ${f(n,0)} Stück je Monat. a) Ermitteln Sie die Break-even-Menge: Spalten Sie dazu in Anlage 1 jede Position der Selbstkostenkalkulation in variable und fixe Bestandteile auf, rechnen Sie den Listenverkaufspreis auf den Barverkaufspreis herunter und bestimmen Sie die Fixkosten je Monat. b) Berechnen Sie, wie hoch der Kundenrabatt (in Prozent, zwei Nachkommastellen) bei ${f(n,0)} Stück und sonst gleichen Werten maximal sein darf, um volle Kostendeckung zu erreichen.`,
  given:[['Fertigungsmaterial',e(FM)],['Fertigungslöhne',e(FL)],['Sondereinzelkosten der Fertigung / des Vertriebs',`${e(SEF)} / ${e(SEV)}`],['MGK-Zuschlag (davon fix)',`${mg} % (${mf} % fix)`],['FGK-Zuschlag (davon fix)',`${fg} % (${ff} % fix)`],['VwVtGK-Zuschlag',vv+' % (vollständig fix)'],['Kundenrabatt / Kundenskonto',`${rb} % / ${sk} %`],['Listenverkaufspreis',e(LP)],['Menge je Monat',f(n,0)+' Stück']],
  anlage:{nr:'Anlage 1',title:'Selbstkostenkalkulation je Stück, aufgeteilt nach fix und variabel',note:'Beträge je Stück in €.',head:['Position','gesamt','variabel','fix'],rows},
  ans,
  steps:[{h:'Selbstkosten, variabel und fix'},{tab:[['Position','gesamt','variabel','fix'],['MGK',f(MGK),f(MGKv),f(MGKf)],['Materialkosten',f(MK),f(MKv),f(MGKf)],['FGK',f(FGK),f(FGKv),f(FGKf)],['Fertigungskosten',f(FK),f(FKv),f(FKf)],['Herstellkosten',f(HK),f(HKv),f(HKf)],['VwVtGK',f(VV),'–',f(VV)],['Selbstkosten',f(SK),f(SKv),f(SKf),'s']]},
    {h:'Verkaufskalkulation rückwärts'},{tab:[['','Betrag'],['Listenverkaufspreis',e(LP)],[`− Rabatt ${rb} %`,e(LP*rb/100)],['= Zielverkaufspreis',e(ZV),'s'],[`− Skonto ${sk} %`,e(ZV*sk/100)],['= Barverkaufspreis',e(BV),'s']]},
    {l:'Fixkosten',f:['fixe Selbstkosten je Stück · Menge',`${e(SKf)} · ${f(n,0)}`,e(Kf)]},{l:'xBEP',f:[Q('Kf','BVP − variable SK'),Q(e(Kf),`${e(BV)} − ${e(SKv)}`),f(x,2)+' → '+f(xr,0)+' Stück']},
    {h:'b) Maximaler Rabatt'},{l:'ZVP',f:['Selbstkosten ÷ (1 − Skonto)',`${e(SK)} ÷ ${f(1-sk/100,2)}`,e(ZVm)]},{l:'Rabatt',f:['LVP − ZVP',`${e(LP)} − ${e(ZVm)}`,e(Rm)]},{l:'in Prozent',f:[Q('Rabatt','LVP')+' · 100 %',Q(e(Rm),e(LP))+' · 100 %',f(Rp)+' %']}],
  tip:'Break-even-Menge immer aufrunden. Die variablen Selbstkosten enthalten nur den variablen Anteil der Zuschläge; VwVtGK sind hier vollständig fix.'};}},

/* ─────────────  Kostenfunktion und Plankostenverrechnungssatz  ───────────── */
{id:'c_kostenfkt',qs:'KW',title:'Gesamtkostenfunktion einer Fertigungslinie und Plankostenverrechnungssatz',gen(){
  const n=R(20,36,2),AK=R(700000,1000000,10000),WBW=Math.round(AK*R(1.1,1.3,0.05)/10000)*10000,RW=R(50000,100000,5000),ND=pick([8,10,12]),zi=pick([5,6,8]),ph=R(250,400,10),lo=R(24,32,1),hl=R(20,26,1),hs=R(40,80,5),kw=R(60,100,5),pk=pick([0.1,0.12,0.14]),gg=R(60,90,5),rm=R(10,14,1),fl=R(200,300,10),bs=R(6,10,1),wf=R(1200,1800,100),ws=R(60,90,5),rh=R(12,20,1),rb=pick([10,15,20]);
  const vlo=n*lo,vhl=hl*hs/ph,ven=kw*pk,vrep=rh*ws/ph,kv=vlo+vhl+ven+bs+vrep;
  const afa=(WBW-RW)/(ND*12),zs=(AK+RW)/2*zi/100/12,rk=rm*fl,Kf=afa+zs+gg+rk+wf;
  const Kp=Kf+kv*ph,pks=Kp/ph,leer=Kf*rb/100;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003})};
  push('Fertigungslöhne je h',vlo,'€/h');push('Hilfslöhne je h',vhl,'€/h');push('Energie je h',ven,'€/h');push('Betriebsstoffe je h',bs,'€/h');push('Reparatur je h',vrep,'€/h');push('Variable Kosten je Stunde',kv,'€/h');
  push('Abschreibung je Monat',afa,'€');push('Zinsen je Monat',zs,'€');push('Raumkosten je Monat',rk,'€');push('Fixkosten je Monat',Kf,'€');push('Plankosten je Monat',Kp,'€');push('Plankostenverrechnungssatz',pks,'€/h');push('Verschlechterung des Betriebsergebnisses (Leerkosten)',leer,'€/Monat');
  return {text:`Die Albrecht Getriebebau GmbH betreibt eine Montagelinie mit ${n} Montageplätzen im Zweischichtbetrieb (Schichtlänge 8 h). Für die Planung liegen die folgenden Angaben vor. a) Ermitteln Sie die Gesamtkostenfunktion der Montagelinie (Fixkosten je Monat und variable Kosten je Montagestunde). b) Ermitteln Sie den Plankostenverrechnungssatz je Montagestunde. c) Die Beschäftigung geht um ${rb} % zurück. Ermitteln Sie die Auswirkung auf das Betriebsergebnis je Monat.`,
  given:[['Planbeschäftigung',f(ph,0)+' Montagestunden/Monat'],['Anschaffungskosten / Wiederbeschaffungswert',`${e(AK)} / ${e(WBW)}`],['Nutzungsdauer / Liquidationserlös',`${ND} Jahre / ${e(RW)}`],['Kalkulatorischer Zinssatz',zi+' % p. a.'],['Fertigungslöhne',`${f(lo,2)} €/h je Montageplatz (${n} Plätze)`],['Hilfslöhne Logistik',`${f(hl,2)} €/h, ${hs} h/Monat bei Planbeschäftigung`],['Energie',`Anschlusswert ${kw} kW, ${f(pk,2)} €/kWh, Zählergrundgebühr ${e(gg)}/Monat`],['Raumkosten',`${rm} €/m² und Monat, ${fl} m²`],['Betriebsstoffe',`${f(bs,2)} €/h`],['Wartung',`${e(wf)}/Monat fix + ${ws} € je Reparaturstunde (${rh} Reparaturstunden bei Planbeschäftigung)`]],
  ans,
  steps:[{h:'a) Variable Kosten je Montagestunde'},{tab:[['Kostenart','Rechnung','€/h'],['Fertigungslöhne',`${n} · ${f(lo,2)}`,f(vlo)],['Hilfslöhne',`${f(hl,2)} · ${hs} h ÷ ${ph} h`,f(vhl)],['Energie',`${kw} kW · ${f(pk,2)} €/kWh`,f(ven)],['Betriebsstoffe','',f(bs)],['Reparatur',`${rh} h · ${ws} € ÷ ${ph} h`,f(vrep)],['Summe kv','',f(kv),'s']]},
    {h:'Fixkosten je Monat'},{tab:[['Kostenart','Rechnung','€/Monat'],['Abschreibung',`(${f(WBW,0)} − ${f(RW,0)}) ÷ (${ND} · 12)`,f(afa)],['Zinsen',`(${f(AK,0)} + ${f(RW,0)}) ÷ 2 · ${zi} % ÷ 12`,f(zs)],['Zählergrundgebühr','',f(gg)],['Raumkosten',`${rm} · ${fl}`,f(rk)],['Wartung fix','',f(wf)],['Summe Kf','',f(Kf),'s']]},
    {t:`K(x) = ${f(Kf)} €/Monat + ${f(kv)} €/h · x`},
    {h:'b) Plankostenverrechnungssatz'},{l:'Plankosten',f:['Kf + kv · Planstunden',`${f(Kf)} + ${f(kv)} · ${ph}`,e(Kp)]},{l:'PKVS',f:[Q('Plankosten','Planstunden'),Q(e(Kp),ph+' h'),f(pks)+' €/h']},
    {h:'c) Beschäftigungsrückgang'},{l:'Leerkosten',f:['Fixkosten · Rückgang',`${e(Kf)} · ${rb} %`,e(leer)]},{t:'Bei sinkender Beschäftigung sinken nur die variablen Kosten, die Fixkosten bleiben. Verrechnet werden aber weniger Stunden × Satz, deshalb verschlechtert sich das Ergebnis um den Fixkostenanteil des Rückgangs.'}],
  tip:'Mischkosten (z. B. Wartung, Energie) in Grundgebühr/fix und Verbrauch/variabel aufspalten. Abschreibung vom Wiederbeschaffungswert, Zinsen vom halben (AK + Restwert).'};}},

/* ─────────────  Maschinenstundensatz (fix/variabel) und Laufzeitänderung  ───────────── */
{id:'c_msh_ext',qs:'KW',title:'Maschinenstundensatz fix/variabel und Satz bei geänderter Laufzeit',gen(){
  const AK=R(900000,1400000,10000),WBW=Math.round(AK*R(1.2,1.4,0.05)/10000)*10000,RW=R(100000,180000,5000),ND=pick([15,20]),hm=R(240,300,10),zi=pick([5,6,8]),ih=R(36000,56000,1000),ihf=pick([20,30,40]),wk=R(30000,50000,100),kw=R(40,70,5),gg=R(40,80,5),sp=pick([0.25,0.28,0.30,0.32]),bs=R(4,8,0.2),rm=R(8,12,0.5),fl=R(60,100,5),h2=pick([4080,4680,5040]);
  const L=hm*12,afa=(WBW-RW)/ND,zs=(AK+RW)/2*zi/100,rk=rm*12*fl,ihF=ih*ihf/100,ihV=ih-ihF,enF=gg*12,enV=kw*sp*L,bsK=bs*L;
  const sF=afa+zs+rk+ihF+enF,sV=ihV+wk+enV+bsK,mf=sF/L,mv=sV/L,ms=mf+mv,mf2=sF/h2,ms2=mf2+mv;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003})};
  push('Jahreslaufzeit',L,'h',0.001);push('Abschreibung (fix)',afa,'€/Jahr');push('Kalkulatorische Zinsen (fix)',zs,'€/Jahr');push('Raumkosten (fix)',rk,'€/Jahr');push('Instandhaltung fix',ihF,'€/Jahr');push('Instandhaltung variabel',ihV,'€/Jahr');push('Energie fix (Grundgebühr)',enF,'€/Jahr');push('Energie variabel',enV,'€/Jahr');push('Betriebsstoffe (variabel)',bsK,'€/Jahr');
  push('Summe fixe Kosten',sF,'€/Jahr');push('Summe variable Kosten',sV,'€/Jahr');push('Maschinenstundensatz fix',mf,'€/h');push('Maschinenstundensatz variabel',mv,'€/h');push('Maschinenstundensatz gesamt',ms,'€/h');push('Fixer Maschinenstundensatz bei geänderter Laufzeit',mf2,'€/h');push('Maschinenstundensatz bei geänderter Laufzeit',ms2,'€/h');
  return {text:`In der Fertigung der Rhein-Ruhr Schienenfahrzeuge GmbH soll für eine CNC-Profildrehmaschine der Maschinenstundensatz ermittelt werden. a) Ermitteln Sie den Maschinenstundensatz getrennt nach fixen und variablen Anteilen für die derzeitige Nutzung im Zweischichtbetrieb. b) Ermitteln Sie den Maschinenstundensatz, wenn die Maschine im Dreischichtbetrieb mit ${f(h2,0)} Betriebsstunden pro Jahr genutzt wird (übrige Angaben unverändert, laufzeitabhängige Kosten bleiben je Stunde gleich).`,
  given:[['Anschaffungskosten / Wiederbeschaffungswert',`${e(AK)} / ${e(WBW)}`],['Liquidationserlös / Nutzungsdauer',`${e(RW)} / ${ND} Jahre`],['Ø Beschäftigung',f(hm,0)+' h/Monat'],['Kalkulatorischer Zinssatz',zi+' % p. a.'],['Instandhaltung',`${e(ih)}/Jahr, davon ${ihf} % fix`],['Werkzeugkosten (laufzeitabhängig)',e(wk)+'/Jahr'],['Energie',`Anschlusswert ${kw} kW, Grundgebühr ${e(gg)}/Monat, Strom ${f(sp,2)} €/kWh`],['Betriebsstoffe',f(bs,2)+' €/h'],['Raumkosten',`${f(rm,2)} €/m² und Monat, ${fl} m²`]],
  ans,
  steps:[{h:'a) Kosten je Jahr'},{l:'Laufzeit',f:['h/Monat · 12',`${hm} · 12`,f(L,0)+' h']},{tab:[['Kostenart','fix','variabel'],['Abschreibung (WBW − RW) ÷ ND',e(afa),'–'],['Zinsen (AK + RW) ÷ 2 · i',e(zs),'–'],['Raum',e(rk),'–'],['Instandhaltung',e(ihF),e(ihV)],['Werkzeuge','–',e(wk)],['Energie',e(enF),e(enV)],['Betriebsstoffe','–',e(bsK)],['Summe',e(sF),e(sV),'s']]},
    {l:'MSS fix',f:[Q('fixe Kosten','Laufzeit'),Q(e(sF),f(L,0)+' h'),f(mf)+' €/h']},{l:'MSS variabel',f:[Q('variable Kosten','Laufzeit'),Q(e(sV),f(L,0)+' h'),f(mv)+' €/h']},{l:'MSS gesamt',f:['fix + variabel',`${f(mf)} + ${f(mv)}`,f(ms)+' €/h']},
    {h:'b) Dreischichtbetrieb'},{l:'MSS fix neu',f:[Q('fixe Kosten','neue Laufzeit'),Q(e(sF),f(h2,0)+' h'),f(mf2)+' €/h']},{l:'MSS neu',f:['fix neu + variabel',`${f(mf2)} + ${f(mv)}`,f(ms2)+' €/h']},{t:'Nur der fixe Anteil sinkt, weil sich die Fixkosten auf mehr Stunden verteilen. Der variable Satz je Stunde bleibt unverändert.'}],
  tip:'Abschreibung vom Wiederbeschaffungswert, Zinsen vom Durchschnitt aus Anschaffungskosten und Restwert. Die Grundgebühr der Energie ist fix, der Stromverbrauch variabel.'};}},

/* ─────────────  Eigenfertigung oder Fremdbezug bei zwei Aufträgen  ───────────── */
{id:'c_makebuy_ext',qs:'KW',title:'Fremdvergabe bei Engpass: Eigenfertigungskosten (variabel) gegen Angebot',gen(){
  const n=R(60,110,2),lo=R(30,36,0.5),rf=R(120,160,5),mk=R(42,55,1),te=R(20,34,1),fp=R(48,60,0.5),fr=R(20,60,5),Bz=R(25,45,1);
  const h=te/60*n,Lk=lo*h,Rk=Lk*rf/100,Mk=mk*h,eig=Lk+Rk+Mk,fre=fp*n+fr,sA=eig-fre;
  const sB=Math.round(sA*pick([0.4,0.7,1.5,2.5,4])/5)*5+pick([5,10,15]);if(Math.abs(sB-sA)<20)return CALC.find(x=>x.id==='c_makebuy_ext').gen();
  const sB2=Math.abs(sB);const best=sA>sB2?1:2;
  const ans=[];const push=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.003})};
  push('Kosten Fremdbezug Auftrag 1',fre,'€');push('Fertigungszeit Eigenfertigung Auftrag 1',h,'h');push('Fertigungslöhne',Lk,'€');push('variable Restfertigungsgemeinkosten',Rk,'€');push('variable Maschinenkosten',Mk,'€');push('Kosten Eigenfertigung Auftrag 1',eig,'€');push('Ersparnis bei Fremdvergabe Auftrag 1',sA,'€');push('Zu vergebender Auftrag (1 oder 2)',best,'Nr.',0.001);
  return {text:`Die Zerspanung der Lehmann Armaturen GmbH ist zu ${f(R(97,99.5,0.1),1)} % ausgelastet. Überstunden werden vom Betriebsrat abgelehnt, daher muss einer von zwei zusätzlichen Aufträgen fremdvergeben werden. Für Auftrag 1 (${n} Ventile) liegt ein Angebot der Firma Schnittal vor: ${f(fp,2)} € je Stück, Lieferung frei Haus gegen einmalig ${e(fr)}. Eigenfertigung: Fertigungslohnkosten ${f(lo,2)} €/h, variable Restfertigungsgemeinkosten ${rf} % auf den Fertigungslohn, variable Maschinenkosten ${f(mk,2)} €/h, Zeit je Ventil ${te} min. Bei Auftrag 2 ergäbe die Fremdvergabe eine Ersparnis von ${e(sB2)}${sB>0?'':' (zusätzliche Kosten)'} gegenüber der Eigenfertigung. Entscheiden Sie aus kostenrechnerischer Sicht, welcher Auftrag fremdvergeben werden soll (Eingabe: 1 oder 2).`,
  given:[['Auftrag 1',`${n} Ventile`],['Fertigungslohnkosten',f(lo,2)+' €/h'],['Variable RFGK',rf+' % auf Lohn'],['Variable Maschinenkosten',f(mk,2)+' €/h'],['Zeit je Ventil',te+' min'],['Angebot Fremdfirma',`${f(fp,2)} €/Stück + ${e(fr)} einmalig`],['Auftrag 2: Ersparnis bei Fremdvergabe',e(sB2)]],
  ans,
  steps:[{h:'Fremdbezug Auftrag 1'},{l:'Kosten',f:['Menge · Preis + Lieferung',`${n} · ${f(fp,2)} + ${e(fr)}`,e(fre)]},{h:'Eigenfertigung Auftrag 1'},{l:'Zeit',f:['Menge · te',`${n} · ${te} min ÷ 60`,f(h,2)+' h']},{tab:[['Kostenart','Rechnung','Betrag'],['Fertigungslohn',`${f(h,2)} h · ${f(lo,2)}`,e(Lk)],[`var. RFGK ${rf} %`,'',e(Rk)],['var. Maschinenkosten',`${f(h,2)} h · ${f(mk,2)}`,e(Mk)],['Eigenfertigung gesamt','',e(eig),'s']]},
    {l:'Ersparnis Auftrag 1',f:['Eigenfertigung − Fremdbezug',`${e(eig)} − ${e(fre)}`,e(sA)]},{t:`Auftrag 2 spart ${e(sB2)}, Auftrag 1 spart ${e(sA)} → Auftrag ${best} fremdvergeben.`}],
  tip:'Es zählen nur variable Kosten: bei Eigenfertigung variable Lohn-, Gemeinkosten- und Maschinenanteile, bei Fremdbezug Preis und Nebenkosten. Der Auftrag mit der größeren Ersparnis wird vergeben.'};}}
);
