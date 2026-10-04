// Weitere Rechenaufgaben: Passungen, Schrumpfen, Biegung (mit Tabellenbuch), QM, Arbeitsschutz, Personal
// ISO 286: Grundtoleranzen und Grundabmaße in µm für die Nennmaßbereiche über 10 bis 180 mm
const ISO_R=[[10,18],[18,30],[30,50],[50,80],[80,120],[120,180]];
const ISO_IT={6:[11,13,16,19,22,25],7:[18,21,25,30,35,40],8:[27,33,39,46,54,63]};
// Wellen: obere Abmaße (f, g, h) bzw. untere Abmaße (k, m, n, p)
const ISO_W={f:[-16,-20,-25,-30,-36,-43],g:[-6,-7,-9,-10,-12,-14],h:[0,0,0,0,0,0],k:[1,2,2,2,3,3],m:[7,8,9,11,13,15],n:[12,15,17,20,23,27],p:[18,22,26,32,37,43]};
const isoIdx=d=>ISO_R.findIndex(([a,b])=>d>a&&d<=b);
function isoShaft(d,ch,it){const i=isoIdx(d),T=ISO_IT[it][i],v=ISO_W[ch][i];return 'fgh'.includes(ch)?{es:v,ei:v-T}:{ei:v,es:v+T}}
function isoHole(d,it){return {EI:0,ES:ISO_IT[it][isoIdx(d)]}}
const um=x=>(x>0?'+':x<0?'−':'')+Math.abs(x)+' µm';
const mm3=x=>f(x,3)+' mm';

CALC.push(
{id:'c_passung',qs:'FT',title:'ISO-Passung: Grenzmaße und Grenzpassungen',src:'Tabellenbuch-Aufgabe',gen(o={}){
  const combos=[['H7','f7'],['H7','g6'],['H7','h6'],['H7','k6'],['H7','m6'],['H7','n6'],['H7','p6'],['H8','f7']];
  const d=o.d||pick([12,16,20,25,28,35,40,45,55,60,70,75,90,100,110,130,150,160]),[ht,st]=o.fit||pick(combos);
  const hole=isoHole(d,+ht[1]),sh=isoShaft(d,st[0],+st[1]);
  const P=Object.assign({d,fit:[ht,st],ES:hole.ES,es:sh.es,ei:sh.ei},o);
  const {ES,es,ei}=P,EI=0,GoB=d+ES/1000,GuB=d+EI/1000,GoW=d+es/1000,GuW=d+ei/1000,Pmax=ES-ei,Pmin=EI-es;
  const art=Pmin>=0?'Spielpassung':Pmax<=0?'Übermaßpassung':'Übergangspassung';
  return {P,tb:[{k:'ES',l:`oberes Abmaß Bohrung ES (Ø ${d} ${ht})`,u:'µm',tol:0,abs:0.5},{k:'es',l:`oberes Abmaß Welle es (Ø ${d} ${st})`,u:'µm',tol:0,abs:0.5},{k:'ei',l:`unteres Abmaß Welle ei (Ø ${d} ${st})`,u:'µm',tol:0,abs:0.5}],
  text:`Eine Lagerstelle wird mit der Passung Ø ${d} ${ht}/${st} gefertigt. a) Entnehmen Sie die Abmaße von Bohrung und Welle dem Tabellenbuch. b) Berechnen Sie Höchst- und Mindestmaß der Welle. c) Berechnen Sie die Grenzpassungen (Höchstpassung P_max = GoB − GuW, Mindestpassung P_min = GuB − GoW; positiv = Spiel, negativ = Übermaß). d) Bestimmen Sie die Passungsart.`,
  given:[['Nennmaß',`Ø ${d} mm`],['Passung',`${ht}/${st}`],['ES (Bohrung)',um(ES),'tb'],['EI (Bohrung)','0 µm (H-Bohrung)'],['es (Welle)',um(es),'tb'],['ei (Welle)',um(ei),'tb']],
  ans:[{l:'b) Höchstmaß Welle GoW',v:GoW,u:'mm',tol:0,abs:0.0005},{l:'b) Mindestmaß Welle GuW',v:GuW,u:'mm',tol:0,abs:0.0005},{l:'c) Höchstpassung P_max',v:Pmax,u:'µm',tol:0,abs:0.5},{l:'c) Mindestpassung P_min',v:Pmin,u:'µm',tol:0,abs:0.5}],
  steps:[{h:'a) Tabellenbuch (ISO 286)'},{t:`Nennmaßbereich über ${ISO_R[isoIdx(d)][0]} bis ${ISO_R[isoIdx(d)][1]} mm: Bohrung ${ht}: ES = ${um(ES)}, EI = 0 µm · Welle ${st}: es = ${um(es)}, ei = ${um(ei)}`},
    {h:'b) Grenzmaße'},{l:'GoB',f:['N + ES',`${d} mm + ${f(ES/1000,3)} mm`,mm3(GoB)]},{l:'GuB',f:['N + EI',`${d} mm + 0`,mm3(GuB)]},
    {l:'GoW',f:['N + es',`${d} mm ${es<0?'−':'+'} ${f(Math.abs(es)/1000,3)} mm`,mm3(GoW)]},{l:'GuW',f:['N + ei',`${d} mm ${ei<0?'−':'+'} ${f(Math.abs(ei)/1000,3)} mm`,mm3(GuW)]},
    {h:'c) Grenzpassungen'},{l:'P_max',f:['GoB − GuW  (= ES − ei)',`${ES} µm − (${ei} µm)`,Pmax+' µm']},{l:'P_min',f:['GuB − GoW  (= EI − es)',`0 µm − (${es} µm)`,Pmin+' µm']},
    {h:'d) Passungsart'},{t:`${art}: ${art==='Spielpassung'?`immer Spiel zwischen ${Pmin} µm und ${Pmax} µm.`:art==='Übermaßpassung'?`immer Übermaß zwischen ${-Pmax} µm und ${-Pmin} µm.`:`je nach Istmaßen Spiel bis ${Pmax} µm oder Übermaß bis ${-Pmin} µm.`}`}],
  tip:'Bei H-Bohrungen ist EI immer 0. Wellen a–h: das obere Abmaß es ist das Grundabmaß; Wellen k–zc: das untere Abmaß ei. Das andere Abmaß ergibt sich mit der Grundtoleranz IT.'};}},

{id:'c_schrumpf',qs:'MT',title:'Schrumpfverbindung: Fügetemperatur',src:'Tabellenbuch-Aufgabe',gen(o={}){
  const mats={'Stahl (unlegiert)':11.5,'Aluminiumlegierung':23.5,'Messing CuZn37':18.5};
  const mat=o.mat||pick(Object.keys(mats)),d=o.d||pick([25,28,35,40,45,55,60,70,75,90,100]),fit=o.fit||pick(['n6','p6']);
  const sh=isoShaft(d,fit[0],6),sp0=pick([0.001,0.0015]);
  const P=Object.assign({mat,d,fit,es:sh.es,alpha:mats[mat],sp:sp0,t0:20},o);
  const {es,alpha,t0,sp}=P,Uh=es,S=sp*d*1000,dT=(Uh+S)/1000/(alpha*1e-6*d),T=t0+dT;
  return {P,tb:[{k:'es',l:`oberes Abmaß Welle es (Ø ${d} ${fit})`,u:'µm',tol:0,abs:0.5},{k:'alpha',l:`Längenausdehnungskoeffizient α (${mat})`,u:'10⁻⁶/K',tol:0.1}],
  text:`Eine Nabe aus ${mat} wird auf eine Stahlwelle Ø ${d} H7/${fit} aufgeschrumpft. Damit sich die Nabe leicht aufschieben lässt, ist ein Fügespiel von ${f(sp,4)} · d vorgesehen. Die Raumtemperatur beträgt ${t0} °C. a) Entnehmen Sie dem Tabellenbuch das obere Abmaß der Welle und den Längenausdehnungskoeffizienten der Nabe. b) Berechnen Sie das Höchstübermaß. c) Berechnen Sie die nötige Temperaturerhöhung und die Fügetemperatur der Nabe.`,
  given:[['Nabe',mat],['Passung',`Ø ${d} H7/${fit}`],['EI Bohrung H7','0 µm'],['es Welle',um(es),'tb'],['α Nabe',f(alpha,1)+' · 10⁻⁶ 1/K','tb'],['Fügespiel',`${f(sp,4)} · d`],['Raumtemperatur',t0+' °C']],
  ans:[{l:'b) Höchstübermaß',v:Uh,u:'µm',tol:0,abs:0.5},{l:'c) Temperaturerhöhung Δϑ',v:dT,u:'K'},{l:'c) Fügetemperatur',v:T,u:'°C'}],
  steps:[{h:'a) Tabellenbuch'},{t:`Welle Ø ${d} ${fit}: es = ${um(es)} · α (${mat}) ≈ ${f(alpha,1)} · 10⁻⁶ 1/K`},
    {h:'b) Höchstübermaß'},{l:'Ü_H',f:['es − EI',`${es} µm − 0 µm`,Uh+' µm']},
    {h:'c) Erwärmung'},{l:'Fügespiel',f:[`${f(sp,4)} · d`,`${f(sp,4)} · ${d} mm`,f(S/1000,3)+' mm']},
    {l:'Δl',f:['Ü_H + Fügespiel',`${f(Uh/1000,3)} mm + ${f(S/1000,3)} mm`,f((Uh+S)/1000,3)+' mm']},
    {l:'Δϑ',f:[Q('Δl','α · d'),Q(f((Uh+S)/1000,3)+' mm',`${f(alpha,1)} · 10⁻⁶ 1/K · ${d} mm`),f(dT,0)+' K']},
    {l:'ϑ',f:['ϑ₀ + Δϑ',`${t0} °C + ${f(dT,0)} K`,f(T,0)+' °C']}],
  tip:'Gerechnet wird mit dem Höchstübermaß, damit auch die ungünstigste Paarung fügbar ist. Die Längenänderung Δl = α · l · Δϑ gilt auch für den Durchmesser.'};}},

{id:'c_biegung',qs:'MT',title:'Biegebeanspruchung Träger (IPE-Profil)',src:'Tabellenbuch-Aufgabe',gen(o={}){
  const IPE={100:34.2,120:53.0,140:77.3,160:109,180:146,200:194,220:252,240:324};
  const l=o.l||R(2,6,0.5),F=o.F||R(5,40,1),sz=o.sz||pick([120,140,160]),Wn=F*l/4*1000/sz*R(0.75,1.6,0.05);
  const prof=o.prof||Object.keys(IPE).map(Number).reduce((a,b)=>Math.abs(IPE[b]-Wn)<Math.abs(IPE[a]-Wn)?b:a);
  const P=Object.assign({prof,W:IPE[prof],l,F,sz},o);
  const {W}=P,Mb=F*1000*l*1000/4,sb=Mb/(W*1000),Werf=Mb/sz/1000,ok=sb<=sz;
  return {P,tb:[{k:'W',l:`axiales Widerstandsmoment Wx (IPE ${prof})`,u:'cm³',tol:0.03}],
  text:`Ein Montageträger IPE ${prof} liegt auf zwei Stützen im Abstand l = ${f(l,1)} m. In der Mitte hängt ein Kettenzug mit einer Last von F = ${F} kN (Eigengewicht des Trägers vernachlässigt). a) Entnehmen Sie das Widerstandsmoment Wx dem Tabellenbuch. b) Berechnen Sie das größte Biegemoment und die Biegespannung. c) Berechnen Sie das erforderliche Widerstandsmoment bei σb,zul = ${sz} N/mm² und beurteilen Sie, ob der Träger ausreicht.`,
  given:[['Profil',`IPE ${prof}`],['Stützweite l',f(l,1)+' m'],['Last F (Mitte)',F+' kN'],['σb,zul',sz+' N/mm²'],['Wx',f(W,1)+' cm³','tb']],
  ans:[{l:'b) Biegemoment Mb',v:Mb/1e6,u:'kNm'},{l:'b) Biegespannung σb',v:sb,u:'N/mm²'},{l:'c) erforderliches W',v:Werf,u:'cm³'}],
  steps:[{h:'a) Tabellenbuch'},{t:`IPE ${prof}: Wx = ${f(W,1)} cm³ = ${f(W*1000,0)} mm³`},
    {h:'b) Biegemoment und Spannung'},{l:'Mb',f:[Q('F · l','4'),Q(`${F} kN · ${f(l,1)} m`,'4'),f(Mb/1e6,2)+' kNm = '+f(Mb,0)+' Nmm']},
    {l:'σb',f:[Q('Mb','Wx'),Q(f(Mb,0)+' Nmm',f(W*1000,0)+' mm³'),f(sb,1)+' N/mm²']},
    {h:'c) Nachweis'},{l:'W_erf',f:[Q('Mb','σb,zul'),Q(f(Mb,0)+' Nmm',sz+' N/mm²'),f(Werf*1000,0)+' mm³ = '+f(Werf,1)+' cm³']},
    {t:ok?`σb = ${f(sb,1)} N/mm² ≤ ${sz} N/mm² bzw. Wx = ${f(W,1)} cm³ ≥ W_erf: Der Träger reicht aus.`:`σb = ${f(sb,1)} N/mm² > ${sz} N/mm²: Der Träger reicht NICHT aus – ein Profil mit Wx ≥ ${f(Werf,1)} cm³ wählen.`}],
  tip:'Einzellast in der Mitte: Mb,max = F · l / 4. Einheiten vorher auf N und mm umrechnen, dann kommt σb direkt in N/mm² heraus (1 cm³ = 1000 mm³).'};}},

{id:'c_cpk',qs:'QM',title:'Prozess- und Maschinenfähigkeit (cp/cpk, cm/cmk)',gen(){
  const mach=Math.random()<0.4,N=pick([20,25,30,40,50,60]),T=pick([0.05,0.1,0.2]),tol=T/2;
  const s=+(T/(mach?R(8,14,0.5):R(5,10,0.5))).toFixed(4),off=R(-0.35,0.35,0.05)*tol,x=+(N+off).toFixed(4);
  const OSG=N+tol,USG=N-tol,cp=(OSG-USG)/(6*s),cpk=Math.min(OSG-x,x-USG)/(3*s),lim=mach?1.67:1.33,nm=mach?['cm','cmk']:['cp','cpk'];
  return {text:`${mach?'Für die Abnahme einer neuen Drehmaschine wurden 50 Teile direkt nacheinander gefertigt (Maschinenfähigkeitsuntersuchung).':'Aus der laufenden Serie wurden über mehrere Schichten 125 Teile gemessen (Prozessfähigkeitsuntersuchung).'} Das Maß Ø ${f(N,1)} ± ${f(tol,3)} mm ergab einen Mittelwert x̄ = ${f(x,4)} mm und eine Standardabweichung s = ${f(s,4)} mm. a) Berechnen Sie ${nm[0]} und ${nm[1]}. b) Beurteilen Sie das Ergebnis (Forderung: ${nm[1]} ≥ ${f(lim,2)}).`,
  given:[['Nennmaß / Toleranz',`Ø ${f(N,1)} ± ${f(tol,3)} mm`],['OSG / USG',`${f(OSG,3)} / ${f(USG,3)} mm`],['Mittelwert x̄',f(x,4)+' mm'],['Standardabweichung s',f(s,4)+' mm'],['Forderung',`${nm[1]} ≥ ${f(lim,2)}`]],
  ans:[{l:`a) ${nm[0]}`,v:cp,u:''},{l:`a) ${nm[1]}`,v:cpk,u:''}],
  steps:[{h:`a) ${nm[0]}: Streuung im Verhältnis zur Toleranz`},{l:nm[0],f:[Q('OSG − USG','6 · s'),Q(`${f(OSG,3)} − ${f(USG,3)}`,`6 · ${f(s,4)}`),f(cp,2)]},
    {h:`a) ${nm[1]}: berücksichtigt die Lage des Mittelwerts`},{l:'Δkrit',f:['min(OSG − x̄ ; x̄ − USG)',`min(${f(OSG-x,4)} ; ${f(x-USG,4)})`,f(Math.min(OSG-x,x-USG),4)+' mm']},
    {l:nm[1],f:[Q('Δkrit','3 · s'),Q(f(Math.min(OSG-x,x-USG),4),`3 · ${f(s,4)}`),f(cpk,2)]},
    {h:'b) Beurteilung'},{t:cpk>=lim?`${nm[1]} = ${f(cpk,2)} ≥ ${f(lim,2)}: ${mach?'Die Maschine ist fähig.':'Der Prozess ist fähig (beherrscht und fähig, wenn auch stabil).'}`:cp>=lim?`${nm[1]} = ${f(cpk,2)} < ${f(lim,2)}, aber ${nm[0]} = ${f(cp,2)} ≥ ${f(lim,2)}: Die Streuung ist klein genug – der Mittelwert liegt zu weit außermittig. Maßnahme: ${mach?'Maschine':'Prozess'} auf Toleranzmitte einstellen (Werkzeugkorrektur).`:`${nm[0]} = ${f(cp,2)} und ${nm[1]} = ${f(cpk,2)} < ${f(lim,2)}: Die Streuung ist zu groß – nicht fähig. Ursachen suchen (Maschine, Werkzeug, Spannmittel, Temperatur), ggf. 100-%-Prüfung bis zur Abstellung.`}],
  tip:`Maschinenfähigkeit (kurzzeitig, 50 Teile): cm, cmk ≥ 1,67. Prozessfähigkeit (langfristig): cp, cpk ≥ 1,33. Ist cpk deutlich kleiner als cp, liegt der Mittelwert nicht in der Mitte.`};}},

{id:'c_laerm',qs:'AUG',title:'Lärm: Gesamtpegel und Tages-Lärmexposition',gen(){
  const n=pick([2,3,3,4]),L=Array.from({length:n},()=>R(76,92,1)),T=pick([2,4,6,8]);
  const sum=L.reduce((a,b)=>a+Math.pow(10,b/10),0),Lg=10*Math.log10(sum),Lex=Lg+10*Math.log10(T/8);
  const stufe=Lex>=85?'oberer':Lex>=80?'unterer':null;
  return {text:`In einer Fertigungshalle laufen ${n} Maschinen gleichzeitig. Am Arbeitsplatz wurden für die einzelnen Maschinen folgende Schalldruckpegel gemessen: ${L.map(x=>x+' dB(A)').join(', ')}. Ein Mitarbeiter hält sich täglich ${T} Stunden an diesem Arbeitsplatz auf, die restliche Zeit in ruhiger Umgebung. a) Berechnen Sie den Gesamtschalldruckpegel. b) Berechnen Sie den Tages-Lärmexpositionspegel L_EX,8h. c) Nennen Sie die nötigen Maßnahmen nach der Lärm- und Vibrations-Arbeitsschutzverordnung.`,
  given:[...L.map((x,i)=>['Maschine '+(i+1),x+' dB(A)']),['Aufenthaltsdauer',T+' h je Schicht (Bezugszeit 8 h)'],['Auslösewerte','80 dB(A) unten, 85 dB(A) oben']],
  ans:[{l:'a) Gesamtpegel',v:Lg,u:'dB(A)',tol:0.003},{l:'b) L_EX,8h',v:Lex,u:'dB(A)',tol:0.003}],
  steps:[{h:'a) Pegeladdition (energetisch)'},{l:'L_ges',f:['10 · lg(Σ 10^(Li/10))','10 · lg('+L.map(x=>'10^'+f(x/10,1)).join(' + ')+')','10 · lg('+f(sum,0)+')',f(Lg,1)+' dB(A)']},
    {h:'b) Bezug auf 8 Stunden'},{l:'L_EX,8h',f:['L_ges + 10 · lg(T / 8 h)',`${f(Lg,1)} + 10 · lg(${T} / 8)`,f(Lex,1)+' dB(A)']},
    {h:'c) Maßnahmen'},{t:stufe==='oberer'?'Oberer Auslösewert (85 dB(A)) erreicht: Lärmminderungsprogramm aufstellen, Lärmbereich kennzeichnen und abgrenzen, Gehörschutz muss getragen werden, Pflichtvorsorge (arbeitsmedizinisch), Unterweisung.':stufe==='unterer'?'Unterer Auslösewert (80 dB(A)) erreicht: Gehörschutz zur Verfügung stellen, arbeitsmedizinische Vorsorge anbieten, Unterweisung der Beschäftigten.':'Beide Auslösewerte unterschritten: keine Pflichtmaßnahmen, trotzdem Lärm nach Stand der Technik mindern.'}],
  tip:'Pegel nie einfach addieren: zwei gleich laute Quellen ergeben nur +3 dB. Halbe Einwirkzeit senkt die Tagesexposition um 3 dB.'};}},

{id:'c_unfall',qs:'AUG',title:'Unfallkennzahlen (1000-Mann-Quote)',gen(){
  const N=R(120,900,10),U=Math.max(2,Math.round(N*R(0.012,0.06,0.002))),T=U*R(6,30,1),h=pick([1600,1650,1700,1720]);
  const q=U*1000/N,hf=U*1e6/(N*h),at=T/U;
  return {text:`Ein Betrieb mit durchschnittlich ${N} Beschäftigten hatte im letzten Jahr ${U} meldepflichtige Arbeitsunfälle mit zusammen ${T} Ausfalltagen. Die Soll-Arbeitszeit beträgt ${h} Stunden je Beschäftigtem und Jahr. a) Berechnen Sie die 1000-Mann-Quote. b) Berechnen Sie die Unfallhäufigkeit je 1 Million Arbeitsstunden. c) Berechnen Sie die durchschnittlichen Ausfalltage je Unfall.`,
  given:[['Beschäftigte',N],['meldepflichtige Unfälle',U],['Ausfalltage',T],['Arbeitsstunden je Person',h+' h/Jahr']],
  ans:[{l:'a) 1000-Mann-Quote',v:q,u:'Unfälle je 1000 Beschäftigte'},{l:'b) Unfallhäufigkeit',v:hf,u:'Unfälle je 1 Mio. h'},{l:'c) Ausfalltage je Unfall',v:at,u:'Tage'}],
  steps:[{h:'a) 1000-Mann-Quote'},{l:'TMQ',f:[Q('Unfälle · 1000','Beschäftigte'),Q(`${U} · 1000`,N),f(q,1)]},
    {h:'b) Unfallhäufigkeit'},{l:'UH',f:[Q('Unfälle · 1 000 000','Beschäftigte · Arbeitsstunden'),Q(`${U} · 1 000 000`,`${N} · ${h} h`),f(hf,1)]},
    {h:'c) Schwere'},{l:'Tage/Unfall',f:[Q('Ausfalltage','Unfälle'),Q(T,U),f(at,1)+' Tage']},
    {t:'Meldepflichtig ist ein Arbeitsunfall, wenn er zu mehr als drei Kalendertagen Arbeitsunfähigkeit oder zum Tod führt (Unfallanzeige an die Berufsgenossenschaft).'}],
  tip:'Die 1000-Mann-Quote macht Betriebe unterschiedlicher Größe vergleichbar; die Unfallhäufigkeit je Million Stunden berücksichtigt zusätzlich die Arbeitszeit.'};}},

{id:'c_fluktuation',qs:'PF',title:'Personalkennzahlen: Fluktuation und Krankenquote',gen(){
  const A=R(80,400,5),zu=R(5,40,1),abF=R(3,25,1),abS=R(1,10,1),E=A+zu-abF-abS,AT=pick([220,225,230]),KT=Math.round((E+A)/2*AT*R(3,8,0.5)/100);
  const D=(A+E)/2,fq=abF/D*100,kq=KT/(D*AT)*100;
  return {text:`Zu Jahresbeginn hatte Ihre Abteilung ${A} Beschäftigte. Im Laufe des Jahres gab es ${zu} Einstellungen, ${abF} Eigenkündigungen von Mitarbeitern und ${abS} sonstige Abgänge (Rente, Vertragsende). Es fielen insgesamt ${KT} Krankheitstage an, die Soll-Arbeitstage betragen ${AT} je Mitarbeiter. a) Berechnen Sie den Personalbestand am Jahresende und den durchschnittlichen Personalbestand. b) Berechnen Sie die Fluktuationsquote nach der BDA-Formel (nur arbeitnehmerseitige Kündigungen). c) Berechnen Sie die Krankenquote.`,
  given:[['Bestand Jahresbeginn',A],['Einstellungen',zu],['Eigenkündigungen',abF],['sonstige Abgänge',abS],['Krankheitstage',KT],['Soll-Arbeitstage je MA',AT]],
  ans:[{l:'a) Bestand Jahresende',v:E,u:'MA'},{l:'a) Ø Personalbestand',v:D,u:'MA'},{l:'b) Fluktuationsquote',v:fq,u:'%'},{l:'c) Krankenquote',v:kq,u:'%'}],
  steps:[{h:'a) Personalbestand'},{l:'Endbestand',f:['Anfang + Zugänge − Abgänge',`${A} + ${zu} − ${abF} − ${abS}`,E+' MA']},{l:'Ø Bestand',f:[Q('Anfang + Ende','2'),Q(`${A} + ${E}`,'2'),f(D,1)+' MA']},
    {h:'b) Fluktuationsquote (BDA)'},{l:'FQ',f:[Q('Eigenkündigungen · 100','Ø Personalbestand'),Q(`${abF} · 100`,f(D,1)),f(fq,2)+' %']},
    {h:'c) Krankenquote'},{l:'KQ',f:[Q('Krankheitstage · 100','Ø Bestand · Soll-Arbeitstage'),Q(`${KT} · 100`,`${f(D,1)} · ${AT}`),f(kq,2)+' %']},
    {t:'Eine hohe Fluktuation verursacht Kosten für Suche, Einarbeitung und Know-how-Verlust. Ursachen klären: Austrittsgespräche, Mitarbeiterbefragung, Führungsverhalten, Entlohnung, Arbeitsbedingungen.'}],
  tip:'Bei der BDA-Fluktuationsformel zählen nur die vom Arbeitnehmer ausgehenden Abgänge – Rente, Tod oder Vertragsende gehören nicht dazu.'};}}
);
