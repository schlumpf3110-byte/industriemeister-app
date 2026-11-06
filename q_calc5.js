// Prüfungsnahe Rechenaufgaben, Teil 3 (Produktion/Organisation): Struktur und Teilaufgaben wie in den IHK-Prüfungen, eigene Zahlen und Firmen
// Hilfsfunktionen R, pick, f, e, r2, Q, sum_ stammen aus q_calc.js / q_calc4.js
const num_=(x,d=2)=>f(x,d);
CALC.push(
/* ───── Lagerbestände im Jahresverlauf, Ø-Bestand aus 7 Werten, Umschlag (F2024 O2) ───── */
{id:'c_lager_ext',qs:'PS',title:'Lagerbestand im Jahresverlauf, durchschnittlicher Bestand und Umschlagshäufigkeit',gen(){
  let t;for(let k=0;k<300;k++){const AB=R(100,250,10),z1=R(200,400,50),z2=R(200,400,50),a=[R(60,140,10),R(150,300,10),R(150,300,10),R(60,140,10)];
    const e1=AB-a[0],n1=e1+z1,e2=n1-a[1],n2=e2+z2,e3=n2-a[2],e4=e3-a[3];if(Math.min(e1,e2,e3,e4)>=20&&e4<=AB+60){t={AB,z1,z2,a,e1,n1,e2,n2,e3,e4};break}}
  const {AB,z1,z2,a,e1,n1,e2,n2,e3,e4}=t,vals=[AB,e1,n1,e2,n2,e3,e4],avg=sum_(vals)/7,verb=AB+z1+z2-e4,U=verb/avg,LD=360/U,pr=R(3000,9000,100);
  const ans=[{l:'Lagerbestand Ende Quartal 1',v:e1,u:'Stück',tol:0.0001},{l:'Lagerbestand Ende Quartal 2',v:e2,u:'Stück',tol:0.0001},{l:'Lagerbestand Ende Quartal 3',v:e3,u:'Stück',tol:0.0001},{l:'Lagerbestand Ende Quartal 4',v:e4,u:'Stück',tol:0.0001},{l:'durchschnittlicher Lagerbestand',v:avg,u:'Stück',tol:0.005},{l:'Jahresverbrauch',v:verb,u:'Stück',tol:0.0001},{l:'Lagerumschlagshäufigkeit',v:U,u:'',tol:0.006},{l:'durchschnittliche Lagerdauer (360 Tage)',v:LD,u:'Tage',tol:0.008}];
  return {text:`Die Hallbauer Hydraulik GmbH bevorratet eine Zahnradpumpe (Listenpreis ${e(pr)}). Der Lagerbestand am 1. Januar beträgt ${AB} Stück. Es wird je einmal am 1. April (${z1} Stück) und am 1. Juli (${z2} Stück) geliefert. Die Lagerabgänge je Quartal stehen in der Tabelle. a) Bestimmen Sie die Lagerbestände am Ende jedes Quartals. b) Ermitteln Sie den durchschnittlichen Lagerbestand im Jahr (alle Bestände zu Jahresbeginn, nach Wareneingang und zu den Quartalsenden). c) Ermitteln Sie die Lagerumschlagshäufigkeit sowie die durchschnittliche Lagerdauer. d) Beurteilen Sie das Ergebnis und geben Sie eine Handlungsempfehlung.`,
  given:[['Lagerbestand 1. Januar',AB+' Stück'],['Lieferung 1. April / 1. Juli',`${z1} Stück / ${z2} Stück`]],gtab:{head:['Quartal','1','2','3','4'],rows:[['Lagerabgang (Stück)',...a]]},ans,
  steps:[{h:'a) Bestände'},{tab:[['Zeitpunkt','Bestand'],['01.01.',AB],['Ende Q1',`${AB} − ${a[0]} = ${e1}`],['01.04. nach Zugang',`${e1} + ${z1} = ${n1}`],['Ende Q2',`${n1} − ${a[1]} = ${e2}`],['01.07. nach Zugang',`${e2} + ${z2} = ${n2}`],['Ende Q3',`${n2} − ${a[2]} = ${e3}`],['Ende Q4',`${e3} − ${a[3]} = ${e4}`]]},
    {h:'b) Durchschnittlicher Bestand'},{l:'Ø Bestand',f:[Q('Summe der 7 Bestände','7'),Q(vals.join(' + '),'7'),f(avg)+' Stück']},
    {h:'c) Umschlag'},{l:'Jahresverbrauch',f:['Anfangsbestand + Zugänge − Endbestand',`${AB} + ${z1+z2} − ${e4}`,verb+' Stück']},{l:'Umschlagshäufigkeit',f:[Q('Jahresverbrauch','Ø Bestand'),Q(verb,f(avg)),f(U)]},{l:'Lagerdauer',f:[Q('360 Tage','Umschlagshäufigkeit'),Q('360',f(U)),f(LD)+' Tage']},
    {h:'d) Beurteilung'},{t:U<4?`Mit ${f(U)} Umschlägen pro Jahr ist die Umschlagshäufigkeit niedrig: hohe Kapitalbindung und Lagerkosten, nur zwei Lieferungen im Jahr. Empfehlung: Rahmenvertrag mit kleineren, häufigeren Abrufen (z. B. monatlich), Sicherheitsbestand prüfen.`:`Die Umschlagshäufigkeit von ${f(U)} ist günstig. Prüfen, ob der Sicherheitsbestand bei Lieferverzug ausreicht.`}],
  tip:'Die Quartalsbestände allein reichen für den Durchschnitt nicht: Die Bestände direkt nach dem Wareneingang gehören als zusätzliche Stützstellen dazu.'};}},

/* ───── Netzplan mit begrenzten Betriebsmitteln aus zwei Aufträgen (H2024 O4) ───── */
{id:'c_netzplan_res',qs:'PS',title:'Netzplan aus zwei Aufträgen mit begrenzten Betriebsmitteln: Durchlaufzeit und kritischer Weg',gen(){
  const nmS=['Eingangskontrolle','Wärmebehandlung (gemeinsam)','Entgraten','Sägen','Fräsen','Endbearbeitung'],cap=[2,1,1,2,2,1];
  let t;for(let k=0;k<400;k++){
    const wD=pick([36,40,48,54]),d={A:[2,wD,R(8,14,1)*1,R(10,18,2),R(8,14,2),R(4,9,1)],B:[2,wD,R(5,10,1),R(8,14,2),R(6,10,2),R(5,10,1)]};
    if(d.A[2]!==d.B[2]){t=d;break}}
  const D=t,nrA=pick([238,321,415,512]),nrB=nrA+2,nm={A:nrA,B:nrB};
  const first=D.A[2]<D.B[2]?'A':'B',second=first==='A'?'B':'A';
  const nodes={},dur={};const N=(k,d)=>{nodes[k]={d,faz:0,fez:0,saz:0,sez:0};dur[k]=d};
  N('K_A',D.A[0]);N('K_B',D.B[0]);N('G',D.A[1]);for(const o of ['A','B']){N('E_'+o,D[o][2]);N('S_'+o,D[o][3]);N('F_'+o,D[o][4]);N('Z_'+o,D[o][5])}
  const pre={K_A:[],K_B:[],G:['K_A','K_B']};pre['E_'+first]=['G'];pre['E_'+second]=['G','E_'+first];
  for(const o of ['A','B']){pre['S_'+o]=['E_'+o];pre['F_'+o]=['S_'+o]}
  // Endbearbeitung: wer zuerst fertig wird, geht zuerst (bei Gleichstand Reihenfolge Entgraten)
  const f5={};let order=['K_A','K_B','G','E_'+first,'E_'+second,'S_'+first,'S_'+second,'F_'+first,'F_'+second];
  const fz=(k)=>{const n=nodes[k];n.faz=Math.max(0,...(pre[k]||[]).map(p=>nodes[p].fez));n.fez=n.faz+n.d};
  for(const k of order)fz(k);
  const zf=nodes['F_'+first].fez<=nodes['F_'+second].fez?first:second,zs=zf===first?second:first;
  pre['Z_'+zf]=['F_'+zf];pre['Z_'+zs]=['F_'+zs,'Z_'+zf];fz('Z_'+zf);fz('Z_'+zs);order=[...order,'Z_'+zf,'Z_'+zs];
  const DLZ=Math.max(...order.map(k=>nodes[k].fez));
  const succ={};for(const k of order)succ[k]=[];for(const k of order)for(const p of pre[k]||[])succ[p].push(k);
  for(const k of [...order].reverse()){const n=nodes[k];n.sez=succ[k].length?Math.min(...succ[k].map(s=>nodes[s].saz)):DLZ;n.saz=n.sez-n.d}
  const lab={K_A:`Eingangskontrolle ${nrA}`,K_B:`Eingangskontrolle ${nrB}`,G:'Wärmebehandlung (beide gemeinsam)',E_A:`Entgraten ${nrA}`,E_B:`Entgraten ${nrB}`,S_A:`Sägen ${nrA}`,S_B:`Sägen ${nrB}`,F_A:`Fräsen ${nrA}`,F_B:`Fräsen ${nrB}`,Z_A:`Endbearbeitung ${nrA}`,Z_B:`Endbearbeitung ${nrB}`};
  const show=['K_A','K_B','G','E_'+first,'E_'+second,'S_'+first,'S_'+second,'F_'+first,'F_'+second,'Z_'+zf,'Z_'+zs];
  const ans=[];const P=(l,v)=>{ans.push({l,v,u:'h',tol:0.0001,abs:0.01});return {a:ans.length-1}};
  const rows=show.map(k=>{const n=nodes[k];return [lab[k],f(n.d,0)+' h',P('FAZ '+lab[k],n.faz),P('FEZ '+lab[k],n.fez),P('SAZ '+lab[k],n.saz),P('SEZ '+lab[k],n.sez)]});
  P('minimale Durchlaufzeit',DLZ);const crit=show.filter(k=>Math.abs(nodes[k].saz-nodes[k].faz)<1e-9);ans.push({l:'Anzahl der Vorgänge auf dem kritischen Weg',v:crit.length,u:'',tol:0.0001});
  const gt=['Nr.','Vorgang',`Auftrag ${nrA}`,`Auftrag ${nrB}`,'Betriebsmittel'];
  return {text:`In der Möller Leichtmetall GmbH werden die Aufträge ${nrA} und ${nrB} gleichzeitig erteilt. Die Ablaufreihenfolge, die Ausführungszeiten und die verfügbaren Betriebsmittel stehen in der Tabelle. Ein Betriebsmittel kann immer nur einen Auftrag zur Zeit bearbeiten; die Wärmebehandlung erfolgt für beide Aufträge gemeinsam. Beginnen Sie mit dem Auftrag, der an der Engpassstation Entgraten die kürzere Zeit hat. Ermitteln Sie die minimale Durchlaufzeit anhand eines Vorgangsknotennetzplans (Anlage 1: FAZ, FEZ, SAZ, SEZ jedes Vorgangs) und kennzeichnen Sie den kritischen Weg. Die Endbearbeitung erfolgt in der Reihenfolge, in der die Aufträge fertig gefräst sind.`,
  given:[],gtab:{head:gt,rows:nmS.map((s,i)=>[i+1,s,i===1?f(D.A[1],0)+' h (gemeinsam)':f(D.A[i],0)+' h',i===1?f(D.B[1],0)+' h (gemeinsam)':f(D.B[i],0)+' h',cap[i]])},
  anlage:{nr:'Anlage 1',title:'Vorgangsknoten (Zeiten in h)',note:'FAZ/FEZ: frühester Anfang/Ende (Vorwärtsrechnung), SAZ/SEZ: spätester Anfang/Ende (Rückwärtsrechnung). Zusätzlich: minimale Durchlaufzeit und Anzahl der kritischen Vorgänge unten eintragen.',head:['Vorgang','Dauer','FAZ','FEZ','SAZ','SEZ'],rows},ans,
  steps:[{h:'Reihenfolge an den Engpässen'},{t:`Entgraten (1 Betriebsmittel): Auftrag ${nm[first]} zuerst (kürzere Zeit ${f(D[first][2],0)} h), dann Auftrag ${nm[second]}. Endbearbeitung (1 Betriebsmittel): Auftrag ${nm[zf]} zuerst. Sägen und Fräsen haben zwei Betriebsmittel – beide Aufträge laufen parallel.`},
    {tab:[['Vorgang','Dauer','FAZ','FEZ','SAZ','SEZ','GP'],...show.map(k=>{const n=nodes[k];return [lab[k],f(n.d,0),f(n.faz,0),f(n.fez,0),f(n.saz,0),f(n.sez,0),f(n.saz-n.faz,0)]})]},
    {t:`Minimale Durchlaufzeit: ${f(DLZ,0)} h. Kritischer Weg (Gesamtpuffer 0): ${crit.map(k=>lab[k]).join(' → ')}.`}],
  tip:'Bei begrenzten Betriebsmitteln wird der Netzplan um Reihenfolge-Pfeile ergänzt: Der zweite Auftrag kann erst beginnen, wenn das Betriebsmittel vom ersten frei ist. Eine andere Reihenfolge ändert oft den kritischen Weg.'};}},

/* ───── Belegungsplan Fließfertigung (F2023 O5) ───── */
{id:'c_belegung',qs:'PS',title:'Belegungsplan: kürzeste Gesamtbearbeitungsdauer, Durchlaufzeit und Liegezeiten',gen(){
  let t;for(let k=0;k<500;k++){const nr0=R(2300,2700,1),nrs=[0,1,2,3,4].map(i=>nr0+i);
    const m=nrs.map(()=>[pick([1,1.5,2,2.5]),pick([2.5,3,3.5]),pick([2,2.5,3,3.5]),pick([1,1.5])]),T=m.map(sum_);if(new Set(T).size===5){t={nrs,m,T};break}}
  const {nrs,m,T}=t,idx=[0,1,2,3,4].sort((a,b)=>T[a]-T[b]),st=[],en=[];
  idx.forEach((o,pos)=>{st[o]=[];en[o]=[];for(let ap=0;ap<4;ap++){const prevAp=ap?en[o][ap-1]:0,prevO=pos?en[idx[pos-1]][ap]:0;st[o][ap]=Math.max(prevAp,prevO);en[o][ap]=st[o][ap]+m[o][ap]}});
  const DLZ=Math.max(...nrs.map((n,o)=>en[o][3])),lz=nrs.map((n,o)=>en[o][3]-st[o][0]-T[o]);
  const ans=[];const P=(l,v,u,tol)=>ans.push({l,v,u,tol:tol??0.0001,abs:0.01});
  nrs.forEach((n,o)=>P('Gesamtbearbeitungsdauer Auftrag '+n,T[o],'h'));idx.forEach((o,p)=>P(`Reihenfolge: Position ${p+1} (Auftragsnummer)`,nrs[o],''));nrs.forEach((n,o)=>P('Fertigstellung Endkontrolle Auftrag '+n,en[o][3],'h'));P('Gesamtdurchlaufzeit',DLZ,'h');nrs.forEach((n,o)=>P('Liegezeit Auftrag '+n,lz[o],'h'));
  const fm=x=>f(x,1);
  return {text:`In der Montage der Oberlin Fördertechnik GmbH durchlaufen alle Aufträge die Arbeitsplätze in der Folge: Teile bereitstellen (AP 1) → Baugruppenvormontage (AP 2) → Baugruppenendmontage (AP 3) → Endkontrolle (AP 4). Die Bearbeitungszeiten stehen in der Tabelle. Ein Arbeitsplatz bearbeitet jeweils einen Auftrag; alle Aufträge sind zum Zeitpunkt 0 verfügbar. a) Erstellen Sie den Belegungsplan nach der Prioritätsregel „kürzeste Gesamtbearbeitungsdauer“ (Gantt, 0,5-h-Raster) und ermitteln Sie die Gesamtdurchlaufzeit. b) Ermitteln Sie die Liegezeiten der Aufträge (Zeit zwischen Beginn an AP 1 und Ende an AP 4 abzüglich der Bearbeitungszeiten).`,
  given:[],gtab:{head:['Auftrag','AP 1 (h)','AP 2 (h)','AP 3 (h)','AP 4 (h)'],rows:nrs.map((n,o)=>[n,...m[o].map(x=>f(x,1))])},ans,
  steps:[{h:'Reihenfolge'},{tab:[['Auftrag','Σ Bearbeitung','Rang'],...nrs.map((n,o)=>[n,f(T[o],1)+' h',idx.indexOf(o)+1])]},{t:'Reihenfolge: '+idx.map(o=>nrs[o]).join(' → ')},
    {h:'Belegung (Beginn – Ende in h)'},{tab:[['Auftrag','AP 1','AP 2','AP 3','AP 4'],...idx.map(o=>[nrs[o],...[0,1,2,3].map(ap=>`${fm(st[o][ap])} – ${fm(en[o][ap])}`)])]},
    {t:'Ein Auftrag beginnt an einem AP, sobald er den Vorgänger-AP verlassen hat und der AP vom vorherigen Auftrag frei ist.'},{l:'Gesamtdurchlaufzeit',f:['Ende des letzten Auftrags an AP 4',fm(DLZ)+' h']},
    {h:'b) Liegezeiten'},{tab:[['Auftrag','Ende AP 4 − Beginn AP 1','− Σ Bearbeitung','= Liegezeit'],...nrs.map((n,o)=>[n,`${fm(en[o][3])} − ${fm(st[o][0])}`,fm(T[o]),fm(lz[o])+' h'])]}],
  tip:'Liegezeit = Zeit, in der ein Auftrag zwischen Beginn und Ende im System liegt, ohne bearbeitet zu werden.'};}},

/* ───── Kanban-Kreislauf Tag 1–5 (H2022 O3) ───── */
{id:'c_kanban_ext',qs:'PS',title:'Kanban: Anzahl der Behälter und Kreislauf über fünf Tage',gen(){
  const c=pick([10,12,15,20]),d=pick([20,24,25,30]),L=pick([2,3,4]),AT=20,N=Math.ceil(d*L/c);
  const rows=[],ans=[];const P=(l,v,u)=>{ans.push({l,v,u,tol:0.0001,abs:0.01});return {a:ans.length-1}};
  P('Tagesverbrauch',d,'Stück/Tag');P('Anzahl der Kanban-Behälter',N,'Behälter');
  const seen={};const rowsS=[];
  for(let day=1;day<=5;day++){const lo=(day-1)*d,hi=day*d;for(let k=Math.floor(lo/c);k*c<hi;k++){const a=Math.max(lo,k*c),b=Math.min(hi,(k+1)*c),n=b-a;if(n<=0)continue;const bd=Math.floor(k*c/d)+1,ld=bd+L;const id=(k%N)+1;
    const first=!seen[k];seen[k]=1;rowsS.push({day,id,n,bd,ld,first,k});}}
  rowsS.forEach(r=>rows.push([r.day,'Behälter '+r.id,P(`Tag ${r.day}, Behälter ${r.id}: verbrauchte Teile`,r.n,'Stück'),r.first?P(`Tag ${r.day}, Behälter ${r.id}: Tag der Nachbestellung`,r.bd,''):'↑ wie oben',r.first?P(`Tag ${r.day}, Behälter ${r.id}: Tag der Lieferung`,r.ld,''):'↑ wie oben']));
  return {text:`Die Brückner Gehäusebau GmbH steuert das Bauteil „Gehäuse“ per Kanban. Der durchschnittliche Verbrauch beträgt ${d*AT} Teile pro Monat bei ${AT} Arbeitstagen. Die Wiederbeschaffungszeit beträgt ${L} Tage; es gibt keinen Sicherheitsbestand. Die Nachbestellung wird ausgelöst, sobald das erste Teil eines Behälters entnommen wird. Ein Behälter fasst ${c} Teile. a) Berechnen Sie die Anzahl der benötigten Kanban-Behälter. b) Stellen Sie den Kanban-Kreislauf von Tag 1 bis Tag 5 in Anlage 1 dar: je Tag und Behälter die verbrauchten Teile sowie Tag der Nachbestellung und Tag der Lieferung (die Behälter werden der Reihe nach nummeriert; geleerte Behälter kehren nach der Lieferung wieder in den Kreislauf zurück). Der Verbrauch beginnt an Tag 1 mit dem ersten Teil des Behälters 1. c) Nennen Sie zwei Vorteile des Kanban-Systems.`,
  given:[['Verbrauch',f(d*AT,0)+' Teile/Monat bei '+AT+' Arbeitstagen'],['Wiederbeschaffungszeit',L+' Tage'],['Behälterinhalt',c+' Teile'],['Sicherheitsbestand','keiner']],
  anlage:{nr:'Anlage 1',title:'Kanban-Kreislauf Tag 1 bis 5',note:'Bestellung bei Entnahme des ersten Teils; Lieferung nach der Wiederbeschaffungszeit. „↑“: Behälter wurde schon in einer Zeile darüber bestellt.',head:['Tag','Behälter','verbrauchte Teile','Tag der Nachbestellung','Tag der Lieferung'],rows},ans,
  steps:[{h:'a) Anzahl der Behälter'},{l:'Tagesverbrauch',f:[Q('Monatsverbrauch','Arbeitstage'),Q(f(d*AT,0),AT),d+' Teile/Tag']},{l:'Anzahl Kanban',f:[Q('Tagesverbrauch · Wiederbeschaffungszeit','Behälterinhalt'),Q(`${d} · ${L}`,c),f(d*L/c)+' → '+N+' Behälter']},
    {h:'b) Kreislauf'},{tab:[['Tag','Behälter','Teile','bestellt','geliefert'],...rowsS.map(r=>[r.day,r.id,r.n,r.first?r.bd:'(s. o.)',r.first?r.ld:'(s. o.)'])]},{t:'Der Behälter wird am Tag des ersten entnommenen Teils bestellt und kommt nach der Wiederbeschaffungszeit zurück.'},
    {h:'c) Vorteile'},{t:'z. B. geringe Bestände und Kapitalbindung, einfache, selbststeuernde Nachschubregelung (Holprinzip), kurze Durchlaufzeiten, hohe Transparenz am Behälter.'}],
  tip:'Anzahl Kanban = (Tagesverbrauch · Wiederbeschaffungszeit) : Behälterinhalt – bei Dezimalzahlen immer aufrunden.'};}},

/* ───── Montagewirkungsgrad PMV/SMV (H2022 O4) ───── */
{id:'c_montagewg',qs:'MT',title:'Taktzeit und Montagewirkungsgrad: primäre und sekundäre Montagevorgänge',gen(){
  const sz=pick([[3,4,1],[2,4,2],[3,3,2]]),AP=['A','B','C'],steps=[];let nr=1;sz.forEach((n,i)=>{for(let j=0;j<n;j++){steps.push({ap:i,nr:nr++,p:R(6,32,1),s:R(2,5,1)})}});steps.find(x=>x.ap===2).p=R(40,62,1);
  const P=AP.map((x,i)=>sum_(steps.filter(s=>s.ap===i).map(s=>s.p))),S=AP.map((x,i)=>sum_(steps.filter(s=>s.ap===i).map(s=>s.s))),T=P.map((p,i)=>p+S[i]);
  const eta=P.map((p,i)=>p/T[i]*100),etaG=sum_(P)/sum_(T)*100,takt=Math.max(...T);
  // Variante: A+B zusammenlegen, Handhabung der letzten Schritte von A und ersten von B um d s kürzer
  const d=pick([2,3,4]),lastA=steps.filter(s=>s.ap===0).slice(-1)[0],firstB=steps.find(s=>s.ap===1);
  const PAB=P[0]+P[1],SAB=S[0]+S[1]-2*d,TAB=PAB+SAB,etaAB=PAB/TAB*100,etaG2=(PAB+P[2])/(TAB+T[2])*100,takt2=Math.max(TAB,T[2]);
  const ans=[];const A=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.004});return {a:ans.length-1}};
  const rowsA=[['Σ primäre Vorgänge PMV (s)',...P.map(x=>f(x,0)),null],['Σ sekundäre Vorgänge SMV (s)',...S.map(x=>f(x,0)),null],['Zeit je Arbeitsplatz (s)',...AP.map((a,i)=>A('Zeit AP '+a,T[i],'s',0.0001)),null],['Montagewirkungsgrad (%)',...AP.map((a,i)=>A('Wirkungsgrad AP '+a,eta[i],'%')),A('Gesamtwirkungsgrad',etaG,'%')]];
  const aB=[A('Taktzeit der Linie (größte Arbeitsplatzzeit)',takt,'s',0.0001),A('b) Zeit AP (A+B)',TAB,'s',0.0001),A('b) Wirkungsgrad AP (A+B)',etaAB,'%'),A('b) Wirkungsgrad AP C',eta[2],'%'),A('b) Gesamtwirkungsgrad',etaG2,'%'),A('b) Taktzeit',takt2,'s',0.0001)];
  return {text:`In der Endmontage der Haverkamp Pumpenbau GmbH werden acht Arbeitsschritte auf drei Arbeitsplätzen (A, B, C) ausgeführt. Je Schritt sind die primäre Montagezeit (PMV, wertschöpfend) und die Handhabungszeit (SMV, sekundär) angegeben. a) Ermitteln Sie die Zeit je Arbeitsplatz, die Taktzeit der Linie, den Montagewirkungsgrad je Arbeitsplatz und den Gesamtwirkungsgrad (Wirkungsgrad = PMV : (PMV + SMV); Gesamt = ΣPMV : Σ Arbeitsplatzzeiten). b) Die Arbeitsplätze A und B können zusammengelegt werden; dadurch verkürzen sich die Handhabungszeiten der Schritte ${lastA.nr} und ${firstB.nr} um je ${d} s. Ermitteln Sie Taktzeit und Wirkungsgrade für die Arbeitsplätze (A+B) und C sowie den Gesamtwirkungsgrad.`,
  given:[],gtab:{head:['AP','Arbeitsschritt','Montagezeit PMV (s)','Handhabungszeit SMV (s)'],rows:steps.map(s=>[AP[s.ap],'AS '+s.nr,s.p,s.s])},
  anlage:{nr:'Anlage 1',title:'Wirkungsgrade je Arbeitsplatz',note:'Zeit je AP = Σ PMV + Σ SMV.',head:['','AP A','AP B','AP C','Gesamt'],rows:rowsA},ans,
  steps:[{h:'a) Arbeitsplatzzeiten und Wirkungsgrade'},{tab:[['','PMV','SMV','Zeit','η'],...AP.map((a,i)=>['AP '+a,f(P[i],0),f(S[i],0),f(T[i],0),f(eta[i])+' %']),['Gesamt',f(sum_(P),0),f(sum_(S),0),f(sum_(T),0),f(etaG)+' %','s']]},{l:'Taktzeit',f:['größte Arbeitsplatzzeit',f(takt,0)+' s']},
    {h:'b) A und B zusammengelegt'},{tab:[['','PMV','SMV','Zeit','η'],['AP (A+B)',f(PAB,0),f(SAB,0),f(TAB,0),f(etaAB)+' %'],['AP C',f(P[2],0),f(S[2],0),f(T[2],0),f(eta[2])+' %'],['Gesamt',f(PAB+P[2],0),'',f(TAB+T[2],0),f(etaG2)+' %','s']]},{t:`Taktzeit neu: ${f(takt2,0)} s. ${etaG2>etaG?'Der Gesamtwirkungsgrad steigt':'Der Gesamtwirkungsgrad sinkt'}, weil ${2*d} s Handhabungszeit entfallen. Eine Linie ist umso besser abgestimmt, je kleiner die Unterschiede der Arbeitsplatzzeiten sind.`}],
  tip:'Primäre Montagevorgänge (Fügen) schaffen Wert; Handhaben, Prüfen und Justieren sind sekundär und sollen minimiert werden.'};}},

/* ───── Personalplanung: Brutto-/Nettopersonalbedarf (H2023 T9) ───── */
{id:'c_personal_netto',qs:'PS',title:'Brutto- und Nettopersonalbedarf mit Zu- und Abgängen',gen(){
  const St=R(40,70,1),Bs=St+R(2,6,1),rent=R(2,5,1),frei=R(1,4,1),elt=R(1,3,1),uebern=R(2,4,1),rueck=R(0,2,1),pr=pick([3,4,5]),neu=R(3,8,1);
  const aufst=Math.round(St*pr/100),brutto=St+aufst+neu,fort=Bs+uebern+rueck-rent-frei-elt,netto=brutto-fort;
  const ans=[{l:'Stellen aus Aufstockung ('+pr+' %)',v:aufst,u:'Stellen',tol:0.0001,abs:0.6},{l:'Bruttopersonalbedarf',v:brutto,u:'Stellen',tol:0.0001,abs:0.6},{l:'fortgeschriebener Personalbestand',v:fort,u:'MA',tol:0.0001,abs:0.6},{l:'Nettopersonalbedarf',v:netto,u:'MA',tol:0.0001,abs:0.6}];
  return {text:`Die Gebhardt Schienenfahrzeuge GmbH plant ihren Personalbedarf für das nächste Jahr in der Instandhaltung. a) Nennen Sie vier Fragen, die bei der Personalplanung zu klären sind. b) Berechnen Sie den Bruttopersonalbedarf, den fortgeschriebenen Personalbestand und den Nettopersonalbedarf unter Berücksichtigung aller Veränderungen. Die Stellenaufstockung von ${pr} % bezieht sich auf die vorhandenen Stellen (auf ganze Stellen runden).`,
  given:[['Personalbestand inkl. Auszubildende (Stichtag)',Bs+' MA'],['Stellenbestand',St+' Stellen'],['rentenbedingte Austritte im Planjahr',rent+' MA'],['unbezahlte Freistellung (Meisterausbildung)',frei+' MA'],['angekündigte Elternzeit',elt+' MA'],['unterschriebene Übernahmeverträge Auszubildende',uebern+' MA'],['Rückkehr aus Sabbatical',rueck+' MA'],['Aufstockung vorhandener Stellen',pr+' %'],['zusätzliche Stellen für neues Projekt',neu+' Stellen']],ans,
  steps:[{h:'Bruttopersonalbedarf'},{l:'Brutto',f:['Stellenbestand + Aufstockung + neue Stellen',`${St} + ${aufst} + ${neu}`,brutto+' Stellen']},{h:'Fortgeschriebener Personalbestand'},{l:'Bestand',f:['Bestand + Zugänge − Abgänge',`${Bs} + ${uebern} + ${rueck} − ${rent} − ${frei} − ${elt}`,fort+' MA']},{h:'Nettopersonalbedarf'},{l:'Netto',f:['Bruttobedarf − fortgeschriebener Bestand',`${brutto} − ${fort}`,netto+' MA']},{h:'a) Planungsfragen (Beispiele)'},{t:'Wie viele Mitarbeiter werden benötigt (quantitativ)? Mit welcher Qualifikation (qualitativ)? Wann werden sie benötigt (zeitlich)? Wo werden sie eingesetzt (örtlich)?'}],
  tip:'Nettopersonalbedarf = Bruttopersonalbedarf − fortgeschriebener Personalbestand. Freistellung, Elternzeit und Rente mindern den Bestand, Übernahmen und Rückkehrer erhöhen ihn.'};}},

/* ───── Kapazitätsprüfung im Kalendermonat mit Samstagsschichten (H2023 O5) ───── */
{id:'c_kapazitaet_ext',qs:'PS',title:'Kapazitätsprüfung im Monat: Arbeitstage, Planungsfaktor und Samstagsschichten',gen(){
  const wd0=pick([1,2,3,4,5]),U=pick([27,28,29]),shH=7,sch=2,pf=pick([0.9,0.91,0.92,0.93,0.95]),hol=[25,26];
  const dow=d=>((wd0-1+d-1)%7)+1; // 1=Mo ... 7=So
  const wdays=[];for(let d=1;d<U;d++){if(dow(d)<=5&&!hol.includes(d))wdays.push(d)}const sat=[];for(let d=1;d<U;d++)if(dow(d)===6)sat.push(d);
  const dn=['Mo','Di','Mi','Do','Fr','Sa','So'];
  let t;for(let k=0;k<300;k++){const aufs=[0,1,2].map(i=>({nr:23108+i,rt:R(90,125,5),lg:R(24,80,2),te:R(52,68,1)})),zus={nr:'Zusatzauftrag',rt:R(90,125,5),lg:R(40,60,2),te:R(62,72,1)};
    const cap=wdays.length*shH*sch*pf,B=aufs.map(a=>(a.rt+a.lg*a.te)/60),Z=(zus.rt+zus.lg*zus.te)/60,tot=sum_(B)+Z;if(tot>cap*1.03&&tot<cap*1.18){t={aufs,zus,cap,B,Z,tot};break}}
  const {aufs,zus,cap,B,Z,tot}=t,fehl=(tot-cap)/pf,sch2=fehl/shH,nS=Math.ceil(sch2);
  const ans=[];const P=(l,v,u,tol)=>ans.push({l,v,u,tol:tol??0.004,abs:0.02});
  aufs.forEach((a,i)=>P('Belegungszeit Auftrag '+a.nr,B[i],'h'));P('Belegungszeit Zusatzauftrag',Z,'h');P('gesamter Kapazitätsbedarf',tot,'h');P('Anzahl Arbeitstage bis zum Betriebsurlaub',wdays.length,'Tage',0.0001);P('Kapazitätsbestand (mit Planungsfaktor)',cap,'h');P('Fehlbestand (in Planstunden zurückgerechnet)',fehl,'h',0.006);P('benötigte Samstagsschichten (aufgerundet)',nS,'Schichten',0.0001);
  return {text:`Bei der Zeller Radsatzfertigung GmbH soll ein Zusatzauftrag (${zus.lg} Radreifen) noch im Dezember gefertigt werden. Die Aufträge 23108, 23109 und 23110 sind fest eingeplant. Betriebsurlaub ist ab dem ${U}.12.; Überstunden sind nur zweischichtig an Samstagen möglich (max. ${shH} h je Schicht). Der 25. und 26.12. sind Feiertage; der 1.12. ist ein ${['Montag','Dienstag','Mittwoch','Donnerstag','Freitag'][wd0-1]}. Es wird in ${sch} Schichten zu je ${shH} h gearbeitet, der Planungsfaktor beträgt ${f(pf)}. Prüfen Sie, ob der Zusatzauftrag fristgerecht im Dezember fertig wird (Belegungszeit = Rüstzeit + Losgröße · Zeit je Einheit), und legen Sie der Geschäftsleitung einen sinnvollen Lösungsvorschlag vor.`,
  given:[['Planungsfaktor',f(pf)],['Schichtmodell',`${sch} Schichten · ${shH} h`],['Betriebsurlaub ab',U+'.12.']],gtab:{head:['Auftrag','Rüstzeit (min)','Losgröße (Stück)','Zeit je Einheit (min)'],rows:[...aufs.map(a=>[a.nr,a.rt,a.lg,a.te]),[zus.nr,zus.rt,zus.lg,zus.te]]},ans,
  steps:[{h:'Belegungszeiten'},{tab:[['Auftrag','Rechnung','Zeit'],...aufs.map((a,i)=>[a.nr,`${a.rt} + ${a.lg} · ${a.te} = ${f(a.rt+a.lg*a.te,0)} min`,f(B[i])+' h']),['gebucht','',f(sum_(B))+' h','s'],['Zusatzauftrag',`${zus.rt} + ${zus.lg} · ${zus.te} = ${f(zus.rt+zus.lg*zus.te,0)} min`,f(Z)+' h'],['Gesamtbedarf','',f(tot)+' h','s']]},
    {h:'Kapazitätsbestand'},{t:`Arbeitstage 1.–${U-1}.12.: ${wdays.length} (Mo–Fr ohne 25./26.12.).`},{l:'Bestand',f:['Tage · Schichten · h · Planungsfaktor',`${wdays.length} · ${sch} · ${shH} h · ${f(pf)}`,f(cap)+' h']},
    {h:'Fehlbestand und Lösung'},{l:'Fehlbestand',f:[Q('Bedarf − Bestand','Planungsfaktor'),Q(`${f(tot)} − ${f(cap)}`,f(pf)),f(fehl)+' h']},{l:'Schichten',f:[Q('Fehlbestand','Schichtlänge'),Q(f(fehl),shH+' h'),f(sch2)+' → '+nS+' Samstagsschichten']},
    {t:`Vorschlag: ${nS} Samstagsschichten (z. B. an ${Math.ceil(nS/2)} Samstagen Früh- und Spätschicht; Samstage im Dezember vor dem Betriebsurlaub: ${sat.map(d=>d+'.12.').join(', ')||'keine'}). Alternativ Lieferfrist mit dem Kunden verschieben oder Fremdfertigung prüfen.`}],
  tip:'Der Planungsfaktor berücksichtigt Störungen und Ausfälle: Der Kapazitätsbestand wird damit multipliziert, der Fehlbestand wieder durch ihn geteilt.'};}},

/* ───── Auftragszeit REFA mit Wartezeitreduzierung (H2023 O6) ───── */
{id:'c_auftragszeit_ext',qs:'PS',title:'Auftragszeit nach REFA mit Rüstverteilzeit und reduzierter Wartezeit',gen(){
  const m=R(40,120,5),tb=R(6,12,0.25),tu=R(3,7,0.25),tw=R(3,7,0.25),trg=R(15,35,1),zv=R(8,15,1),zr=R(8,15,1),red=pick([20,25,30,40,50]);
  const rr=x=>Math.round(x*100)/100;const g=tb+tu+tw,te=rr(g*(1+zv/100)),tr=rr(trg*(1+zr/100)),T=tr+m*te,tw2=rr(tw*(1-red/100)),g2=tb+tu+tw2,te2=rr(g2*(1+zv/100)),T2=tr+m*te2,dT=T-T2,dp=dT/T*100;
  const ans=[{l:'Grundzeit tg',v:g,u:'min',tol:0.004},{l:'Ausführungszeit je Einheit te',v:te,u:'min',tol:0.004},{l:'Rüstzeit tr',v:tr,u:'min',tol:0.004},{l:'Auftragszeit T',v:T,u:'min',tol:0.004},{l:'reduzierte Wartezeit',v:tw2,u:'min',tol:0.004},{l:'Auftragszeit T bei reduzierter Wartezeit',v:T2,u:'min',tol:0.004},{l:'absolute Ersparnis',v:dT,u:'min',tol:0.006},{l:'prozentuale Ersparnis',v:dp,u:'%',tol:0.008,abs:0.02}];
  return {text:`In der Fertigung der Lindner Radsatztechnik GmbH wird ein Auftrag über ${m} Schienenräder bearbeitet. a) Ermitteln Sie die Auftragszeit in Minuten (Grundzeit = tb + tu + tw; te = tg · (1 + zv); tr = trg · (1 + zrv); T = tr + m · te). b) Ermitteln Sie die Auftragszeit, wenn die Wartezeit um ${red} % reduziert wird. c) Ermitteln Sie die absolute und die prozentuale Auftragszeitersparnis. Rechnen Sie mit zwei Nachkommastellen.`,
  given:[['Menge m',m+' Stück'],['beeinflussbare Tätigkeitszeit tb',f(tb)+' min'],['unbeeinflussbare Tätigkeitszeit tu',f(tu)+' min'],['Wartezeit tw',f(tw)+' min'],['Rüstgrundzeit trg',f(trg)+' min'],['Verteilzeitzuschlag zv',zv+' %'],['Rüstverteilzeitzuschlag zrv',zr+' %']],ans,
  steps:[{h:'a) Auftragszeit'},{l:'tg',f:['tb + tu + tw',`${f(tb)} + ${f(tu)} + ${f(tw)}`,f(g)+' min']},{l:'te',f:['tg · (1 + zv)',`${f(g)} · ${f(1+zv/100,2)}`,f(te)+' min']},{l:'tr',f:['trg · (1 + zrv)',`${f(trg)} · ${f(1+zr/100,2)}`,f(tr)+' min']},{l:'T',f:['tr + m · te',`${f(tr)} + ${m} · ${f(te)}`,f(T)+' min']},
    {h:'b) Wartezeit −'+red+' %'},{l:'tw neu',f:[`${f(tw)} · ${f(1-red/100,2)}`,f(tw2)+' min']},{l:'tg neu',f:[`${f(tb)} + ${f(tu)} + ${f(tw2)}`,f(g2)+' min']},{l:'te neu',f:[`${f(g2)} · ${f(1+zv/100,2)}`,f(te2)+' min']},{l:'T neu',f:[`${f(tr)} + ${m} · ${f(te2)}`,f(T2)+' min']},
    {h:'c) Ersparnis'},{l:'absolut',f:[`${f(T)} − ${f(T2)}`,f(dT)+' min']},{l:'prozentual',f:[Q('Ersparnis','alte Auftragszeit')+' · 100 %',Q(f(dT),f(T))+' · 100 %',f(dp)+' %']}],
  tip:'Die Rüstzeit fällt einmal je Auftrag an (tr), die Ausführungszeit je Stück (te) – deshalb wirkt eine Verkürzung von te mit der Menge.'};}},

/* ───── Druckluftverbrauch und -kosten (H2023 O8) ───── */
{id:'c_druckluft',qs:'BT',title:'Druckluftverbrauch doppeltwirkender Zylinder: Ersparnis in % und Jahreskosten',gen(){
  const D1=pick([80,100,125]),D2=D1-pick([20,25]),s1=pick([200,250,300]),s2=s1-pick([10,20,25]),pe=pick([5,6,7]),n=pick([1,2,3]),zyl=pick([2,3,4]),tueren=pick([2,3,4]),wag=pick([2,3,4]),fl=R(60,150,2),h=pick([16,18,20]),tage=365,k=pick([0.02,0.025,0.03]);
  const Q1=2*Math.PI*(D1/10)**2/4*(s1/10)*n*(pe+1),Q2=2*Math.PI*(D2/10)**2/4*(s2/10)*n*(pe+1),sp=(Q1-Q2)/Q1*100,Nz=fl*wag*tueren*zyl,Kj=Nz*Q1/1000*60*h*tage/1000*k;
  const ans=[{l:'Luftverbrauch alt je Zylinder',v:Q1/1000,u:'l/min',tol:0.004},{l:'Luftverbrauch neu je Zylinder',v:Q2/1000,u:'l/min',tol:0.004},{l:'prozentuale Ersparnis',v:sp,u:'%',tol:0.006},{l:'Anzahl der Zylinder in der Flotte',v:Nz,u:'Stück',tol:0.0001},{l:'jährliche Druckluftkosten (alter Zustand)',v:Kj,u:'€',tol:0.008}];
  return {text:`Bei der Fahrzeugflotte der Stadtwerke Brandt AG sollen die doppeltwirkenden Pneumatikzylinder der Türverriegelung verkleinert werden: Kolbendurchmesser von ${D1} mm auf ${D2} mm, Hub von ${s1} mm auf ${s2} mm. Betriebsüberdruck pe = ${pe} bar (Umgebungsdruck ${1} bar), ${n} Doppelhub${n>1?'e':''} je Minute. a) Berechnen Sie die prozentuale Ersparnis beim Druckluftverbrauch (Luftverbrauch Q = 2 · A · s · n · (pe + pamb) : pamb). b) Ermitteln Sie die jährlichen Druckluftkosten des ursprünglichen Systems für die gesamte Flotte.`,
  given:[['Flotte',`${fl} Fahrzeuge · ${wag} Wagen · ${tueren} Türen je Wagen · ${zyl} Zylinder je Tür`],['Einsatz',`${tage} Tage/Jahr · ${h} h/Tag`],['Druckluftkosten',f(k,3)+' €/m³']],ans,
  steps:[{h:'a) Verbrauch je Zylinder'},{l:'Q alt',f:['2 · A · s · n · (pe + pamb) : pamb',`2 · ${f(Math.PI*(D1/10)**2/4,2)} cm² · ${s1/10} cm · ${n}/min · ${pe+1}`,f(Q1/1000)+' l/min']},{l:'Q neu',f:[`2 · ${f(Math.PI*(D2/10)**2/4,2)} cm² · ${s2/10} cm · ${n}/min · ${pe+1}`,f(Q2/1000)+' l/min']},{l:'Ersparnis',f:[Q('Q alt − Q neu','Q alt')+' · 100 %',Q(`${f(Q1/1000)} − ${f(Q2/1000)}`,f(Q1/1000))+' · 100 %',f(sp)+' %']},
    {h:'b) Jahreskosten'},{l:'Zylinder',f:['Fahrzeuge · Wagen · Türen · Zylinder',`${fl} · ${wag} · ${tueren} · ${zyl}`,f(Nz,0)]},{l:'Kosten',f:['Zylinder · Q · 60 min · h/Tag · Tage · €/m³',`${f(Nz,0)} · ${f(Q1/1e6,4)} m³/min · 60 · ${h} · ${tage} · ${f(k,3)}`,e(Kj)]}],
  tip:'Die Druckluft wird auf Atmosphärendruck bezogen: Ein Zylinder verbraucht das (pe + pamb) : pamb-fache seines Hubvolumens. Beim doppeltwirkenden Zylinder ist das Hubvolumen zweimal je Doppelhub zu füllen (Faktor 2; Kolbenstangenvolumen vernachlässigt).'};}},

/* ───── Statistik: beste, schlechteste, mittlere Bewertung (H2023 O10) ───── */
{id:'c_statistik',qs:'QM',title:'Auswertung von Schulungsbewertungen: beste, schlechteste und mittlere Note',gen(){
  const ma=10,sc=6,M=[];for(let i=0;i<ma;i++){M.push([]);for(let j=0;j<sc;j++)M[i].push(pick([2,3,3,3,3,4,4,5]))}
  const col=j=>M.map(r=>r[j]),best=[],worst=[],mean=[];for(let j=0;j<sc;j++){best.push(Math.min(...col(j)));worst.push(Math.max(...col(j)));mean.push(sum_(col(j))/ma)}
  const ans=[];const P=(l,v,u,tol)=>{ans.push({l,v,u,tol:tol??0.0001,abs:0.05});return {a:ans.length-1}};
  const rows=best.map((b,j)=>['Schulung '+(j+1),P('beste Note S'+(j+1),b,''),P('schlechteste Note S'+(j+1),worst[j],''),P('Mittelwert S'+(j+1),mean[j],'',0.004)]);
  const bm=mean.indexOf(Math.min(...mean)),wm=mean.indexOf(Math.max(...mean));
  return {text:`Zehn Mitarbeiter haben sechs Schulungen der Wolter Bildungsakademie mit Schulnoten von 1 (sehr gut) bis 6 (ungenügend) bewertet. a) Werten Sie die Daten aus: Ermitteln Sie für jede Schulung die beste, die schlechteste und die mittlere Bewertung (Mittelwert auf eine Nachkommastelle genau, Toleranz ±0,05) und stellen Sie die drei Kennwerte in einem Liniendiagramm mit Legende dar. b) Bewerten Sie das Ergebnis und leiten Sie Maßnahmen ab.`,
  given:[],gtab:{head:['MA',...[1,2,3,4,5,6].map(x=>'S'+x)],rows:M.map((r,i)=>[i+1,...r])},anlage:{nr:'Anlage 1',title:'Kennwerte je Schulung',note:'Tragen Sie die Werte in die Tabelle ein (Mittelwert mit einer Nachkommastelle) und zeichnen Sie danach im Rechenblatt das Liniendiagramm.',head:['','beste (Minimum)','schlechteste (Maximum)','Mittelwert'],rows},ans,
  steps:[{tab:[['','beste','schlechteste','Mittelwert'],...best.map((b,j)=>['S'+(j+1),b,worst[j],f(mean[j],2)])]},{t:`Am besten bewertet: Schulung ${bm+1} (Ø ${f(mean[bm],1)}), am schlechtesten Schulung ${wm+1} (Ø ${f(mean[wm],1)}). Maßnahmen: Ursachen der schlechten Einzelnoten erfragen (Feedbackgespräch), Inhalt/Methodik/Trainer der schwächsten Schulung überarbeiten, Schulungen mit guten Werten als Maßstab (Best Practice) nutzen, Wirkung bei der nächsten Befragung prüfen.`},{t:'Diagrammhinweis: x-Achse = Schulung 1–6, y-Achse = Note (1 oben = sehr gut); drei Linien (beste, schlechteste, Mittelwert) mit Legende, Achsenbeschriftung und Überschrift.'}],
  tip:'Ein Liniendiagramm verbindet die Werte je Schulung; Legende, Achsenbeschriftung und Titel gehören zur Bewertung.'};}}
);
