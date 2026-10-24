'use strict';
/* ───────── Frag die App-KI: Antworten aus Theorie, Textband-Zusammenfassungen, Karteikarten und Prüfungsaufgaben (offline) ─────────
   Suche mit Gewichtung seltener Fachbegriffe; ist die App-KI geladen, ordnet sie die Treffer nach dem Sinn der Frage neu. */
const ASK=(()=>{
  let P=null,PP=null;
  const STOP=new Set(('nennen sie und der die das den dem des ein eine einer einen eines sind wird werden ist mit von fur auf bei als aus nach oder wie was welche welcher welches welchen warum wann wo wer wieso weshalb erklaren erklare erlautern beschreiben definieren unterscheiden begrunden dazu zwei drei vier funf nicht auch kann konnen man dass sich ihre ihr ihrem zur zum im in an es er so ob zu ich mir mich mein meine meinem bitte mal eigentlich genau gibt gibts gilt muss musst soll sollte sollen darf durch fur uber unter bis vom beim ins ans noch nur sehr mehr alle alles als dann denn doch wenn dabei damit dafur davon hier dort diese dieser dieses diesem unterschied bedeutet bedeutung heisst heist ermittle ermitteln berechnen berechne bestimmen rechnet rechne').split(' '));
  const stem=t=>t.length>5?t.replace(/(en|er|es|em|e|n|s)$/,''):t;
  const toks=q=>[...new Set(sNorm(q).split(/[^a-z0-9]+/).filter(x=>x.length>=2&&!STOP.has(x)).map(stem))];
  async function build(){
    if(P)return P;if(PP)return PP;
    return PP=(async()=>{const out=[];
      for(const[k,chs]of Object.entries(THEORY)){const q=QS[k]||{name:k};PASS.ofChapters('Theorie',q.name,k,chs).forEach(p=>out.push({...p,go:()=>go('chapter',{k,i:p.j}),fachName:q.name}))}
      const keys=Object.keys(window.TB_META||{});await Promise.all(keys.map(k=>loadTB(k).catch(()=>null)));
      for(const k of keys){const T=window.TEXTBAND&&TEXTBAND[k];if(!T)continue;PASS.ofChapters('Textband',T.title,k,T.ch).forEach(p=>out.push({...p,go:()=>go('tband',{k,open:p.j}),fachName:T.title}))}
      try{await loadFC();PASS.ofCards(window.FC).forEach(p=>out.push({...p,go:()=>go('fc',{k:p.k}),fachName:(QS[p.k]||{}).name||p.k}))}catch(e){}
      PASS.ofOpen(window.OPEN).forEach(p=>out.push({...p,go:()=>go('task',{id:p.id.slice(1),queue:[p.id.slice(1)]}),fachName:(QS[p.k]||{}).name||p.k}));
      for(const p of out){p.nt=sNorm(p.txt);p.ntt=sNorm((p.ch||'')+' '+(p.sec||'')+' '+(p.fachName||'')+(p.q?' '+p.q:''))}
      P=out;return out})().catch(e=>{PP=null;throw e})}
  /* Suche: seltene Begriffe zählen mehr, Treffer im Kapitel-/Fragentitel zählen extra, alle Begriffe zu treffen lohnt sich */
  /* Was will die Frage? – Rechenweg, Unterschied, Aufzählung, Begriff */
  function intent(q){const x=sNorm(q);return {calc:/berechn|ausrechn|formel|gebildet|bilden|ermittel|rechne/.test(x),diff:/unterschied|abgrenz|gegenuber|vergleich/.test(x),list:/nennen|welche|aufzahl|was gehort|bestandteil|schritte|ablauf/.test(x),def:/was ist|was bedeutet|was versteht|definition|definier|bedeutung/.test(x)}}
  function search(q,{n=6,pool=null,skipId=null}={}){const ps=pool||P;if(!ps)return[];const w=toks(q);if(!w.length)return[];const it=intent(q);
    const N=ps.length,df=w.map(t=>{let c=0;for(const p of ps)if(p.nt.includes(t)||p.ntt.includes(t))c++;return c});
    const out=[];
    for(const p of ps){if(skipId&&p.id===skipId)continue;let sc=0,m=0;
      w.forEach((t,i)=>{if(!df[i])return;const wt=Math.log(1+N/df[i]);let hit=false;
        if(p.ntt.includes(t)){sc+=wt*2.2;hit=true}
        let pos=-1,tf=0;while((pos=p.nt.indexOf(t,pos+1))>=0&&tf<4)tf++;if(tf){sc+=wt*(1+0.45*Math.min(tf,3));hit=true}
        if(hit)m++});
      if(!m)continue;const cov=m/w.length;
      if(w.length>1&&cov<0.5)continue;
      sc*=Math.pow(cov,1.4)/Math.pow(1+p.txt.length/1500,0.25);
      if(p.kind==='card')sc*=1.2;else if(p.kind==='merke')sc*=1.1;else if(p.kind==='task')sc*=0.8;
      if(it.calc){if(p.kind==='fx')sc*=1.7;else if(p.kind==='bsp')sc*=1.25;else if(/=/.test(p.txt))sc*=1.2;if(p.kind==='card'&&!/=|·|\*|geteilt|durch|mal/.test(p.a))sc*=0.8}
      if(it.diff){if(p.kind==='tab')sc*=1.5;else if(/unterschied|gegenuber|im gegensatz|wahrend/.test(p.nt))sc*=1.2}
      if(it.list&&(p.kind==='ul'||p.kind==='ol'||p.kind==='tab'||(p.pts&&p.pts.length>=3)))sc*=1.2;
      if(it.def&&(p.kind==='card'||p.kind==='p'||p.kind==='merke'))sc*=1.1;
      if(p.q){const nq=sNorm(p.q);if(it.def&&/versteht|was ist|definier|bedeutet/.test(nq))sc*=1.35;if(it.list&&/nennen|welche/.test(nq))sc*=1.2;if(it.calc&&/berechn|ermittel/.test(nq))sc*=1.3;if(it.diff&&/unterschied/.test(nq))sc*=1.35}
      out.push({p,sc,cov})}
    out.sort((a,b)=>b.sc-a.sc);return out.slice(0,n)}
  /* Sinn-Suche mit der App-KI: Vektoren aller Textstellen kommen vom Build-Server (appki-pass.json); fehlen sie, werden nur die Wort-Treffer neu geordnet */
  let PV=null;
  async function loadPV(){if(PV!==null)return PV;PV=false;try{const r=await fetch('appki-pass.json');if(!r.ok)return PV;const j=await r.json();if(j.model!==AppKI.modelId)return PV;const m=new Map();for(const[k,b]of Object.entries(j.items))m.set(k,AppKI.decode(b));PV=m}catch(e){}return PV}
  async function semantic(q,hits){if(!AppKI.installed()||!(await AppKI.ensure()))return null;
    const pv=await loadPV();
    if(pv&&pv.size){const [qv]=await AppKI.embedTexts([q]);const lex=search(q,{n:20});const lmx=Math.max(...lex.map(x=>x.sc),1);
      const by=new Map(lex.map(x=>[x.p.id,{...x,lx:x.sc/lmx,s:0}]));const sims=[];
      for(const p of P){const v=pv.get(p.h);if(!v)continue;sims.push([p,AppKI.cos(qv,v)])}
      sims.sort((a,b)=>b[1]-a[1]);
      for(const[p,s]of sims.slice(0,20)){const e=by.get(p.id);if(e)e.s=s;else by.set(p.id,{p,sc:0,cov:0,lx:0,s})}
      for(const e of by.values()){if(!e.s){const v=pv.get(e.p.h);e.s=v?AppKI.cos(qv,v):0}}
      const out=[...by.values()].map(e=>({...e,sem:e.s,mix:0.45*e.lx+0.55*Math.max(0,Math.min(1,(e.s-0.78)/0.14))})).filter(e=>e.cov>=0.5||e.s>=0.84).sort((a,b)=>b.mix-a.mix);
      return out.slice(0,8)}
    if(!hits.length)return null;
    const sims=await AppKI.rank(q,hits.map(h=>(h.p.q?h.p.q+' ':'')+h.p.txt.slice(0,360)));if(!sims)return null;
    const mx=Math.max(...hits.map(h=>h.sc))||1,sm=Math.max(...sims),mn=Math.min(...sims),rg=(sm-mn)||1;
    return hits.map((h,i)=>({...h,sem:sims[i],mix:0.5*h.sc/mx+0.5*((sims[i]-mn)/rg)})).sort((a,b)=>b.mix-a.mix)}
  const ctxText=p=>`${p.fachName||''} · ${p.ch||''}${p.sec?' · '+p.sec:''}`;
  return {ready:build,search,semantic,ctxText,toks}})();

/* IHK-Notenstufen (Punkte in Prozent) */
function noteOf(pct){return pct>=92?['Sehr gut','1']:pct>=81?['Gut','2']:pct>=67?['Befriedigend','3']:pct>=50?['Ausreichend','4']:pct>=30?['Mangelhaft','5']:['Ungenügend','6']}
/* Bewertungskarte: Prozent, Note, Lösungspunkte, was fehlt – mit Fundstelle im Skript */
function gradeCard(c,r,opt={}){
  const pct=r.pct,[lab,nt]=noteOf(pct),cls=r.skipped||pct<50?'bad':pct<81?'mid':'ok',el=h('div');
  el.append(h('div',{class:'fc-score '+cls},h('div',{class:'fc-pct num'},r.skipped?'–':pct+' %'),
    h('div',{},h('b',{},r.skipped?'Nicht gewusst':`${lab} · Note ${nt}`),h('div',{class:'muted',style:'font-size:.82rem'},opt.pending?'Sofort-Schätzung – die App-KI prüft jetzt sinngemäß …':(r.via||''))),
    h('div',{class:'fc-bar'},h('i',{style:`width:${r.skipped?0:pct}%`}))));
  const hit=c.pts.filter((p,i)=>(r.hits[i]||0)>=.99).length,part=c.pts.filter((p,i)=>(r.hits[i]||0)>0&&(r.hits[i]||0)<.99).length;
  if(!r.skipped)el.append(h('p',{class:'muted',style:'margin:2px 0 6px;font-size:.88rem'},`${hit} von ${c.pts.length} Lösungspunkten getroffen${part?`, ${part} teilweise`:''}.`));
  el.append(h('div',{class:'og'},h('div',{class:'eyebrow'},'Lösungspunkte'),h('ul',{},...c.pts.map((p,i)=>{const x=r.hits[i]||0;return h('li',{class:x>=.99?'hit':x>0?'part':'miss'},(x>=.99?'✓ ':x>0?'◐ ':'✗ ')+p)}))));
  if(r.gut&&r.gut.length)el.append(h('div',{class:'tip'},h('b',{},'Gut: '),r.gut.join(' · ')));
  if(r.fehlt&&r.fehlt.length)el.append(h('div',{class:'tip falle'},h('b',{},'Fehlt: '),r.fehlt.join(' · ')));
  if(r.tipp)el.append(h('div',{class:'tip'},h('b',{},'Tipp: '),r.tipp));
  const miss=c.pts.map((p,i)=>[p,r.hits[i]||0]).filter(x=>x[1]<.5).map(x=>x[0]).slice(0,3);
  if(miss.length&&!opt.pending){const mr=h('div',{class:'og'});el.append(mr);
    ASK.ready().then(()=>{const rows=[];for(const p of miss){const body=String(p).replace(/^[^:]{0,45}:/,'');const hit1=ASK.search(body.length>=8?body:p,{n:4,skipId:opt.skipId||(c.id?('K'+c.id):null)}).find(x=>(x.p.src==='Textband'||x.p.src==='Theorie')&&x.cov>=0.6);if(hit1)rows.push([p,hit1.p])}
      if(!rows.length)return;mr.append(h('div',{class:'eyebrow'},'Das fehlt – so steht es im Skript'),
        ...rows.map(([p,ps])=>h('div',{class:'bsp'},h('div',{class:'bsp-t'},p.length>90?p.slice(0,88)+'…':p),h('p',{style:'font-size:.9rem'},ps.txt.length>260?ps.txt.slice(0,258)+' …':ps.txt),h('button',{class:'btn small ghost',onclick:ps.go},ASK.ctxText(ps)))))}).catch(()=>{})}
  return el}

/* ───────── Ansicht „Frag die App-KI“ ───────── */
function askPoints(p){
  if(p.kind==='card')return p.pts&&p.pts.length?p.pts:[p.a];
  if(p.kind==='task')return p.sol.slice(0,8);
  if(p.items)return p.items.slice(0,8);
  if(p.rows&&p.rows.length)return p.rows.slice(0,8).map(r=>r.slice(0,3).join(' – '));
  return p.txt.split(/(?<=[.!?])\s+/).filter(x=>x.split(/\s+/).length>=3).slice(0,6)}
function uniq(hs,top){const seen=new Set([top.src+'|'+top.k+'|'+top.j+'|'+(top.j==null?top.id:'')]);return hs.filter(x=>{const p=x.p,k=p.src+'|'+p.k+'|'+p.j+'|'+(p.j==null?p.id:'');if(seen.has(k))return false;seen.add(k);return true})}
function vAsk(m,arg){
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},'App-KI · offline'),h('h1',{},'Frag die App-KI'),
    h('p',{class:'lead'},'Stell deine Frage in eigenen Worten. Die App sucht die Antwort in Theorie, Textband-Zusammenfassungen, Karteikarten und Prüfungsaufgaben und zeigt dir die Fundstelle. Danach kannst du deine eigene Antwort bewerten lassen.')));
  const ta=h('textarea',{class:'fc-ans',rows:2,placeholder:'z. B. „Wie berechne ich den Montagewirkungsgrad?“'});
  const out=h('div',{class:'grid',style:'display:grid;gap:10px'});let cur=0;
  const ex=['Unterschied Lastenheft und Pflichtenheft','Wie wird die Risikoprioritätszahl berechnet?','Wann ist ein Prozess fähig?','Was gehört zur Inbetriebnahme einer Anlage?'];
  const run=async q=>{q=(q||ta.value).trim();if(q.length<3)return;ta.value=q;const id=++cur;out.innerHTML='';out.append(h('p',{class:'muted'},'Suche …'));
    try{await ASK.ready()}catch(e){out.innerHTML='';out.append(h('p',{},'Die Inhalte konnten nicht geladen werden – bitte einmal mit Internet öffnen.'));return}
    let hits=ASK.search(q,{n:6});if(id!==cur)return;if(hits.length||!AppKI.installed())show(q,hits,false);else{out.innerHTML='';out.append(h('p',{class:'muted'},'Suche nach dem Sinn der Frage …'))}
    if(AppKI.installed()){const sh=await ASK.semantic(q,hits).catch(()=>null);if(id!==cur)return;if(sh)show(q,sh,true);else if(!hits.length)show(q,hits,true)}}
  function show(q,hits,sem){out.innerHTML='';
    if(!hits.length){out.append(h('section',{class:'sheet'},h('p',{},'Dazu habe ich nichts Passendes gefunden. Versuch es mit einem Fachbegriff (z. B. „Kanban“, „Cpk“, „Gefährdungsbeurteilung“) oder kürzer formuliert.')));return}
    const top=hits[0].p;
    const main=h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Antwort aus dem Skript'));
    if(top.kind==='card')main.append(h('div',{class:'bsp'},h('div',{class:'bsp-t'},top.q),h('p',{},top.a)),top.pts.length?h('ul',{},...top.pts.map(x=>h('li',{},x))):null);
    else if(top.kind==='task')main.append(h('div',{class:'bsp'},h('div',{class:'bsp-t'},'Aus einer Prüfungsaufgabe'),h('p',{},top.q)),h('div',{class:'eyebrow'},'Lösungspunkte'),h('ul',{},...top.sol.map(x=>h('li',{},x))));
    else{const box=h('div',{class:'tb-ch',style:'display:grid;gap:10px'});theoryBlocks(box,[top.blk]);main.append(h('div',{class:'muted',style:'font-size:.85rem'},ASK.ctxText(top)),box)}
    main.append(h('div',{class:'row'},h('button',{class:'btn small',onclick:top.go},top.src==='Karte'?'Karteikarten üben':top.src==='Aufgabe'?'Aufgabe öffnen':'Kapitel öffnen')),
      h('p',{class:'muted',style:'margin:0;font-size:.82rem'},sem?'Treffer nach Sinn der Frage geordnet (App-KI).':AppKI.installed()?'Die App-KI ordnet die Treffer gleich nach dem Sinn der Frage …':'Gefunden über Fachbegriffe. Mit der App-KI (unter „Mehr“) werden auch Fragen in ganz anderen Worten verstanden.'));
    out.append(main);
    if(hits.length>1)out.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Weitere Fundstellen'),
      ...uniq(hits.slice(1),top).slice(0,4).map(x=>{const p=x.p,d=h('details',{style:'margin:4px 0'}),b=h('div',{style:'display:grid;gap:8px;padding-top:6px'});
        d.append(h('summary',{},h('b',{},p.src==='Karte'?p.q:p.src==='Aufgabe'?(p.q.length>110?p.q.slice(0,108)+'…':p.q):(p.ch||'')),h('span',{class:'muted'},'  '+p.src+' · '+(p.fachName||''))),b);
        d.addEventListener('toggle',()=>{if(d.open&&!b.firstChild){if(p.kind==='card')b.append(h('p',{},p.a));else if(p.kind==='task')b.append(h('ul',{},...p.sol.map(y=>h('li',{},y))));else theoryBlocks(b,[p.blk]);b.append(h('div',{class:'row'},h('button',{class:'btn small ghost',onclick:p.go},'Öffnen')))}});return d})));
    /* eigene Antwort bewerten */
    const own=h('textarea',{class:'fc-ans',rows:4,placeholder:'Schreibe hier, wie du die Frage beantworten würdest – die App-KI bewertet sie gegen die Fundstelle.'}),res=h('div');
    const pts=askPoints(top);const c={id:'ask',q,a:top.kind==='card'?top.a:top.txt.slice(0,700),pts,ch:top.ch||''};
    const go1=h('button',{class:'btn primary',onclick:async()=>{const t=own.value.trim();if(t.length<6){toast('Bitte zuerst antworten');return}
      const lex=fcGradeLex(c,t);res.replaceChildren(gradeCard(c,lex,{pending:AppKI.installed()||!!(S.ai&&S.ai.key),skipId:top.id}));
      if(AppKI.installed()||(S.ai&&S.ai.key)){const r=await fcGrade(c,t);res.replaceChildren(gradeCard(c,r,{skipId:top.id}))}}},'Meine Antwort bewerten');
    out.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Wie gut ist deine Antwort?'),h('p',{class:'muted',style:'margin:0;font-size:.85rem'},`Bewertet wird gegen ${pts.length} Punkte der obersten Fundstelle – eine Schätzung, die dir zeigt, was noch fehlt.`),own,h('div',{class:'row'},go1),res))}
  ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();run()}});
  m.append(h('section',{class:'sheet'},ta,h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>run()},'Fragen'),h('button',{class:'btn ghost',onclick:()=>go('theory')},'Zur Theorie')),
    h('div',{class:'row'},...ex.map(x=>h('button',{class:'chip',onclick:()=>run(x)},x)))),out);
  if(arg&&arg.q)run(arg.q)}
