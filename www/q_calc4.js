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
