// Prinzipskizzen zu Rechenaufgaben (eigene Zeichnungen, Werte aus der Aufgabe)
function sketchFor(id,t){
  const g=(pre)=>{const r=t.given.find(x=>x[0].startsWith(pre));return r?String(r[1]):''};
  const S=(w,hh,body)=>{const d=document.createElement('div');d.className='sketch';d.innerHTML=`<svg viewBox="0 0 ${w} ${hh}" role="img" aria-label="Prinzipskizze"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fillacc"/></marker><marker id="dm" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fillink"/></marker></defs>${body}</svg><div class="sk-cap">Prinzipskizze, nicht maßstäblich</div>`;return d};
  const sub=v=>String(v).replace(/\b([A-Za-z])_([A-Za-z0-9]+)/g,'$1<tspan baseline-shift="sub" font-size="75%">$2</tspan>');
  const T=(x,y,s,a='middle',c='')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="sk-t ${c}">${sub(s)}</text>`;
  const dim=(x1,y1,x2,y2,lab,dx=0,dy=-6)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="sk-dim" marker-start="url(#dm)" marker-end="url(#dm)"/>`+T((x1+x2)/2+dx,(y1+y2)/2+dy,lab);
  const F=(x1,y1,x2,y2,lab,ax=0,ay=-6,anc='middle')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="sk-f" marker-end="url(#ar)"/>`+T(x2+ax,y2+ay,lab,anc,'acc');
  switch(id){
  case 'c_seil':{const b=parseFloat(g('Neigungswinkel'))||30,n=g('Strangzahl')||'2',r=b*Math.PI/180,L=110,cx=200,cy=40,dx=Math.sin(r)*L,dy=Math.cos(r)*L;
    return S(400,230,`<circle cx="${cx}" cy="${cy-12}" r="10" class="sk-l"/><line x1="${cx}" y1="${cy-2}" x2="${cx}" y2="${cy}" class="sk-l"/>
      <line x1="${cx}" y1="${cy}" x2="${cx-dx}" y2="${cy+dy}" class="sk-l thick"/><line x1="${cx}" y1="${cy}" x2="${cx+dx}" y2="${cy+dy}" class="sk-l thick"/>
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy+dy+10}" class="sk-c"/><path d="M${cx},${cy+40} A40,40 0 0 1 ${cx+40*Math.sin(r)},${cy+40*Math.cos(r)}" class="sk-l"/>${T(cx+22,cy+58,'β = '+b+'°','start')}
      <rect x="${cx-dx-30}" y="${cy+dy}" width="${2*dx+60}" height="40" class="sk-body"/>${T(cx,cy+dy+25,'Last  '+g('Masse'))}
      ${F(cx+dx+50,cy+dy+40,cx+dx+50,cy+dy+80,'F_G',8,-12,'start')}${T(cx-dx-10,cy+dy/2,n+'-Strang','end')}`)}
  case 'c_kran':{return S(400,200,`<line x1="20" y1="170" x2="380" y2="170" class="sk-l"/><rect x="40" y="130" width="60" height="40" class="sk-body"/>
      <path d="M70,130 Q170,120 250,40" class="sk-c"/><rect x="230" y="20" width="60" height="40" class="sk-body ghost"/>
      ${F(100,150,170,150,'v horizontal '+g('Fahrgeschwindigkeit'),0,-8)}${F(70,128,70,70,'v Hub '+g('Hubgeschwindigkeit'),6,10,'start')}
      ${dim(70,185,260,185,'Fahrweg '+g('Fahrweg'),0,-6)}${dim(330,170,330,40,'',0,0)}${T(338,105,'Mindesthöhe','start')}${T(338,120,g('Mindesthöhe'),'start')}`)}
  case 'c_hebel':{const l1=g('Abstand l₁'),l2=g('Abstand l₂'),al=parseFloat(g('Winkel'))||0,r=al*Math.PI/180;
    return S(400,200,`<line x1="40" y1="100" x2="360" y2="100" class="sk-l thick"/><path d="M160,100 l-12,22 h24 z" class="sk-body"/>${T(160,140,'C (Drehpunkt)')}
      ${F(60+40*Math.sin(r),100-60*Math.cos(r)-10,60,95,'F_B',0,-70)}<line x1="340" y1="100" x2="340" y2="140" class="sk-l"/>${F(340,150,340,104,'F_A',10,30,'start')}
      ${dim(60,170,160,170,'l₁ = '+l1)}${dim(160,170,340,170,'l₂ = '+l2)}${al?T(80,40,'α = '+al+'°','start'):''}`)}
  case 'c_pneu':case 'c_pneu_feder':case 'c_hydr':{const D=g('Kolbendurchmesser')||g('Kolbendurchmesser D'),d=g('Kolbenstange');
    return S(400,170,`<rect x="40" y="50" width="200" height="70" class="sk-body"/><rect x="150" y="55" width="16" height="60" class="sk-l fillink"/>
      <rect x="166" y="78" width="180" height="14" class="sk-body"/>${id==='c_pneu_feder'?`<path d="M170,62 l8,-8 l8,16 l8,-16 l8,16 l8,-16 l8,16 l8,-16 l8,16 l8,-16 l8,16 l8,-16 l8,16 l8,-16 l8,8" class="sk-c" transform="translate(-8,10) scale(1,0.6)"/>`:''}
      ${F(20,85,60,85,'p',0,-10)}${dim(260,50,260,120,'D '+(D||''),40,4)}${d?T(300,72,'d = '+d,'start'):''}${F(346,85,390,85,'F',0,-10)}`)}
  case 'c_flaschenzug':{const n=parseInt(g('tragende'))||4,k=n/2;let p='';for(let i=0;i<k;i++){p+=`<circle cx="${150+i*40}" cy="40" r="14" class="sk-l"/><circle cx="${150+i*40}" cy="130" r="14" class="sk-l"/>`}
    return S(400,220,`<line x1="120" y1="20" x2="${160+k*40}" y2="20" class="sk-l thick"/>${p}<line x1="130" y1="40" x2="130" y2="130" class="sk-l"/><rect x="120" y="155" width="${k*40+20}" height="35" class="sk-body"/>${T(130+k*20,178,'Last '+g('Masse'))}
      ${T(130+k*40,90,n+' tragende Stränge','start')}${F(130+k*40+120,40,130+k*40+120,100,'F_Zug',8,0,'start')}`)}
  case 'c_vakuum':{const p=g('Plattenmaß');return S(400,170,`<rect x="40" y="110" width="320" height="22" class="sk-body"/>${T(200,152,'Platte '+p)}
      ${[90,170,250,330].map(x=>`<path d="M${x-25},110 q25,-30 50,0" class="sk-l"/><line x1="${x}" y1="90" x2="${x}" y2="40" class="sk-l"/>`).join('')}<line x1="65" y1="40" x2="355" y2="40" class="sk-l thick"/>
      ${T(200,30,'Traverse mit Vakuumsaugern (Fläche je '+g('Saugerfläche')+')')}${F(370,121,370,165,'F_G',6,0,'start')}`)}
  case 'c_schweiss':{const a=g('a-Maß'),b=g('Flachstahlbreite');return S(400,190,`<rect x="40" y="40" width="40" height="130" class="sk-body"/><rect x="80" y="90" width="260" height="20" class="sk-body"/>
      <path d="M80,90 l-0,-14 l14,14 z" class="fillacc"/><path d="M80,110 l0,14 l14,-14 z" class="fillacc"/>${T(110,70,'Kehlnaht a = '+a,'start','acc')}${F(320,112,320,170,'F',8,0,'start')}${T(210,140,'Breite '+b)}`)}
  case 'c_scher':{return S(400,180,`<rect x="60" y="40" width="40" height="100" class="sk-body"/><rect x="200" y="40" width="40" height="100" class="sk-body"/><rect x="100" y="70" width="100" height="40" class="sk-body"/>
      <rect x="40" y="82" width="220" height="16" class="sk-l fillink"/>${T(150,62,'Hebel s = '+g('Hebeldicke'))}${T(150,160,'Stift d = '+g('Stiftdurchmesser')+' · zweischnittig')}${F(150,90,150,135,'',0,0)}${T(165,130,'F','start','acc')}<line x1="100" y1="30" x2="100" y2="150" class="sk-c"/><line x1="200" y1="30" x2="200" y2="150" class="sk-c"/>`)}
  case 'c_bewegung':{return S(400,200,`<line x1="40" y1="170" x2="380" y2="170" class="sk-l" marker-end="url(#dm)"/><line x1="40" y1="170" x2="40" y2="20" class="sk-l" marker-end="url(#dm)"/>${T(385,185,'t','end')}${T(30,25,'v','end')}
      <path d="M40,170 L110,60 L300,60 L350,170" class="sk-f fillnone"/>${T(75,120,'a₁','end')}${T(205,52,'v = '+g('Geschwindigkeit'))}${T(335,120,'a₂','start')}
      <line x1="110" y1="60" x2="110" y2="170" class="sk-c"/><line x1="300" y1="60" x2="300" y2="170" class="sk-c"/>${T(75,188,'t₁')}${T(205,188,'t₂')}${T(325,188,'t₃')}`)}
  case 'c_umfang':{return S(400,200,`<circle cx="130" cy="100" r="70" class="sk-l"/><circle cx="130" cy="100" r="4" class="fillink"/><line x1="130" y1="100" x2="200" y2="100" class="sk-l"/>${T(165,92,'d/2')}
      ${F(200,100,200,40,'v = π · d · n',8,0,'start')}<path d="M80,40 A70,70 0 0 1 130,30" class="sk-f fillnone"/>${T(130,190,'n = '+g('Drehzahl'))}
      <line x1="260" y1="160" x2="380" y2="160" class="sk-l thick"/><line x1="260" y1="160" x2="260" y2="40" class="sk-c"/><path d="M260,160 L370,160" class="sk-l"/><path d="M370,160 A110,110 0 0 0 260,50" class="sk-f fillnone"/>${T(320,185,'Schranke r = '+g('Baumlänge'))}`)}
  case 'c_hnz_dreh':{return S(400,170,`<rect x="40" y="55" width="60" height="70" class="sk-body"/><rect x="100" y="65" width="230" height="50" class="sk-body"/><line x1="30" y1="90" x2="360" y2="90" class="sk-c"/>
      <path d="M335,58 l18,-18 l14,14 l-18,18 z" class="fillacc"/>${F(330,40,250,40,'f',0,-6)}${dim(100,140,330,140,'l = '+g('Drehlänge'))}${dim(350,65,350,115,'',0,0)}${T(358,95,'Ø '+g('Durchmesser'),'start')}`)}
  case 'c_schneiden':{return S(400,190,`<rect x="60" y="30" width="280" height="130" class="sk-body"/><circle cx="130" cy="95" r="22" class="sk-l"/><circle cx="270" cy="95" r="22" class="sk-l"/>
      <path d="M60,30 h280 v130 h-280 z" class="sk-f fillnone"/>${T(200,20,'Schnittkontur: Außenkontur + Bohrungen')}${T(200,182,g('Plattenmaß')+' · Bohrungen '+g('Bohrungen'))}`)}
  case 'c_takt':{return S(400,150,`${['A','B','C'].map((k,i)=>`<rect x="${30+i*125}" y="40" width="95" height="60" class="sk-body"/>${T(77+i*125,75,'Platz '+k)}`).join('')}${F(125,70,155,70,'')}${F(250,70,280,70,'')}${T(200,130,'Takt = verfügbare Zeit / Stückzahl')}`)}
  default:return null}
}
