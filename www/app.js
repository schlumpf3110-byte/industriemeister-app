'use strict';
/* ───────── Speicher ───────── */
const LS='imm_state_v1';
const S=(()=>{let s={};try{s=JSON.parse(localStorage.getItem(LS)||'{}')}catch(e){}
  return Object.assign({box:{},examDate:'',theme:'',calc:{},exams:[],ai:{key:'',model:'claude-sonnet-5-5'},days:{}},s)})();
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
function markDay(){const d=today();S.days[d]=(S.days[d]||0)+1;save()}
const today=()=>new Date().toISOString().slice(0,10);
const DAY=864e5;

// IndexedDB für Antworten (Handschrift/Fotos sind groß)
const IDB=(()=>{let dbp=null;
  function open(){if(dbp)return dbp;dbp=new Promise((res,rej)=>{try{const r=indexedDB.open('imm_answers',1);r.onupgradeneeded=()=>r.result.createObjectStore('a');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}});return dbp}
  async function get(k){try{const db=await open();return await new Promise(r=>{const q=db.transaction('a').objectStore('a').get(k);q.onsuccess=()=>r(q.result||null);q.onerror=()=>r(null)})}catch(e){return null}}
  async function set(k,v){try{const db=await open();await new Promise(r=>{const t=db.transaction('a','readwrite');t.objectStore('a').put(v,k);t.oncomplete=r;t.onerror=r})}catch(e){}}
  async function del(k){try{const db=await open();await new Promise(r=>{const t=db.transaction('a','readwrite');t.objectStore('a').delete(k);t.oncomplete=r;t.onerror=r})}catch(e){}}
  return {get,set,del}})();

/* ───────── Hilfen ───────── */
const $=(s,r=document)=>r.querySelector(s);
const h=(tag,attrs={},...kids)=>{const el=document.createElement(tag);for(const[k,v]of Object.entries(attrs||{})){if(v==null||v===false)continue;if(k.startsWith('on'))el.addEventListener(k.slice(2),v);else if(k==='html')el.innerHTML=v;else if(k==='class')el.className=v;else el.setAttribute(k,v===true?'':v)}for(const k of kids.flat()){if(k==null||k===false)continue;el.append(k.nodeType?k:document.createTextNode(k))}return el};
function toast(t){const el=h('div',{class:'toast',role:'status'},t);document.body.append(el);setTimeout(()=>el.remove(),2200)}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function parseNum(s){s=String(s).trim().replace(/\s|€|%/g,'');if(!s)return NaN;if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');return parseFloat(s)}
function applyTheme(){if(S.theme)document.documentElement.setAttribute('data-theme',S.theme);else document.documentElement.removeAttribute('data-theme')}

/* ───────── Wiederholsystem (Lernkartei) ───────── */
const INTERVAL=[0,1,2,4,8,16];
function boxOf(id){return S.box[id]||{b:0,due:0}}
function rate(id,r){const c=boxOf(id);let b=c.b;if(r===2)b=Math.min(5,b+1);else if(r===1)b=Math.max(1,Math.min(b,2));else b=1;
  S.box[id]={b,due:Date.now()+INTERVAL[b]*DAY-36e5,last:Date.now(),n:(c.n||0)+1};markDay();save()}
const isDue=id=>{const c=S.box[id];return c&&c.due<=Date.now()&&c.b<5};
function dots(b){return h('span',{class:'box-dots',title:`Fach ${b} von 5`},...[1,2,3,4,5].map(i=>h('i',{class:i<=b?'on':''})))}

/* ───────── Countdown ───────── */
function countdownText(){if(!S.examDate)return 'Prüfungstermin setzen';const d=Math.ceil((new Date(S.examDate+'T08:00')-Date.now())/DAY);return d>0?`noch ${d} Tage`:(d===0?'heute Prüfung':'Prüfung vorbei')}

/* ───────── Navigation ───────── */
const ICON={
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
 tasks:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h4"/></svg>',
 calc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16v2"/></svg>',
 exam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></svg>',
 more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'};
const TABS=[['home','Start'],['tasks','Aufgaben'],['calc','Rechnen'],['exam','Prüfung'],['more','Mehr']];
let view='home',viewArg=null,cleanup=[];
function go(v,arg){cleanup.forEach(f=>{try{f()}catch(e){}});cleanup=[];view=v;viewArg=arg;render();window.scrollTo(0,0)}
function renderNav(){const n=$('nav.tabs');n.innerHTML='';for(const[k,l]of TABS){const b=h('button',{'aria-current':String(view===k||(view.startsWith(k))),onclick:()=>go(k)});b.innerHTML=ICON[k];b.append(l);n.append(b)}
  const cd=$('#cd');cd.textContent=countdownText()}
function render(){renderNav();const m=$('main');m.innerHTML='';({home:vHome,tasks:vTasks,task:vTask,calc:vCalc,calcrun:vCalcRun,exam:vExam,examrun:vExamRun,examres:vExamRes,more:vMore})[view](m,viewArg)}

/* ───────── START ───────── */
function vHome(m){
  const due=OPEN.filter(q=>isDue(q.id)),neu=OPEN.filter(q=>!S.box[q.id]),known=OPEN.filter(q=>(S.box[q.id]?.b||0)>=3);
  const days=S.examDate?Math.ceil((new Date(S.examDate+'T08:00')-Date.now())/DAY):null;
  const streak=(()=>{let n=0;for(let i=0;i<400;i++){const d=new Date(Date.now()-i*DAY).toISOString().slice(0,10);if(S.days[d])n++;else if(i>0)break}return n})();
  const calcTot=Object.values(S.calc).reduce((a,c)=>a+c.tot,0),calcOk=Object.values(S.calc).reduce((a,c)=>a+c.ok,0);
  m.append(h('section',{class:'hero'},
    h('div',{class:'eyebrow'},'Industriemeister Metall · Handlungsspezifische Qualifikationen'),
    h('h1',{},days!=null&&days>0?`Noch ${days} Tage bis zur HQ-Prüfung`:'Lernstand HQ Metall'),
    !S.examDate?h('p',{class:'lead'},'Trag unter „Mehr“ deinen Prüfungstermin ein, dann zählt die App die Tage runter.'):null));
  m.append(h('div',{class:'stats'},
    stat(due.length,'heute zu wiederholen'),stat(neu.length,'Aufgaben noch nie bearbeitet'),stat(`${known.length}/${OPEN.length}`,'sicher (ab Fach 3)'),
    stat(calcTot?Math.round(calcOk/calcTot*100)+' %':'–','Rechenaufgaben richtig'),stat(streak,'Lerntage in Folge')));
  const next=due[0]||neu[0];
  m.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Weiterlernen'),
    h('div',{class:'row'},
      next?h('button',{class:'btn primary',onclick:()=>go('task',{id:next.id,queue:(due.length?due:neu).map(q=>q.id)})},due.length?`${due.length} fällige Aufgaben wiederholen`:'Mit neuen Aufgaben starten'):h('span',{class:'muted'},'Alles wiederholt – stark.'),
      h('button',{class:'btn',onclick:()=>go('calcrun',{id:pick(CALC).id,rand:true})},'Zufällige Rechenaufgabe'),
      h('button',{class:'btn',onclick:()=>go('exam')},'Prüfung simulieren'))));
  // Fortschritt nach Qualifikationsschwerpunkt
  const bars=h('div',{class:'bars'});
  for(const[k,qs]of Object.entries(QS)){const qq=OPEN.filter(q=>q.qs===k),n=qq.length;const g=qq.filter(q=>(S.box[q.id]?.b||0)>=3).length,w=qq.filter(q=>{const b=S.box[q.id]?.b||0;return b>0&&b<3}).length;
    bars.append(h('div',{class:'bar hb-'+qs.hb},h('span',{},qs.name),h('span',{class:'k'},`${g}/${n}`),h('div',{class:'track'},h('i',{style:`width:${g/n*100}%;background:var(--hb)`}),h('i',{style:`width:${w/n*100}%;background:var(--hb);opacity:.35`}))))}
  m.append(h('section',{class:'sheet'},h('h2',{},'Fortschritt je Qualifikationsschwerpunkt'),
    h('div',{class:'legend'},h('span',{},h('i',{style:'background:var(--blue)'}),'Technik'),h('span',{},h('i',{style:'background:var(--accent)'}),'Organisation'),h('span',{},h('i',{style:'background:var(--ok)'}),'Führung & Personal'),h('span',{},'kräftig = sicher, blass = in Arbeit')),bars));
  if(S.exams.length){const l=h('div',{class:'list'});for(const x of S.exams.slice(-5).reverse())l.append(h('div',{class:'li',style:'cursor:default'},h('span',{class:'t'},`${x.sit==='T'?'Situationsaufgabe 1 · Technik':'Situationsaufgabe 2 · Organisation'}`),h('span',{class:'num'},`${x.pct} Punkte · ${x.note}`),h('span',{class:'s'},new Date(x.date).toLocaleDateString('de-DE'))));
    m.append(h('section',{class:'sheet'},h('h2',{},'Letzte Prüfungssimulationen'),l))}
}
function stat(v,l){return h('div',{class:'stat'},h('b',{},String(v)),h('span',{},l))}

/* ───────── AUFGABENLISTE ───────── */
let filt={hb:'',qs:'',only:''};
function vTasks(m){
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},`${OPEN.length} Situationsaufgaben`),h('h1',{},'Offene Prüfungsaufgaben'),
    h('p',{class:'lead'},'Im Stil der IHK-Situationsaufgaben. Antworte per Tastatur, mit dem Stift oder fotografiere deine Antwort auf Papier – dann mit den Lösungshinweisen vergleichen.')));
  const chips=h('div',{class:'row'});
  const mk=(label,on,fn)=>h('button',{class:'chip','aria-pressed':String(on),onclick:fn},label);
  chips.append(mk('Alle',!filt.hb&&!filt.only,()=>{filt={hb:'',qs:'',only:''};go('tasks')}));
  for(const[k,l]of Object.entries(HB))chips.append(mk(l,filt.hb===k&&!filt.qs,()=>{filt.hb=k;filt.qs='';go('tasks')}));
  chips.append(mk('Heute fällig',filt.only==='due',()=>{filt.only=filt.only==='due'?'':'due';go('tasks')}));
  chips.append(mk('Neu',filt.only==='new',()=>{filt.only=filt.only==='new'?'':'new';go('tasks')}));
  m.append(chips);
  if(filt.hb){const c2=h('div',{class:'row'});for(const[k,q]of Object.entries(QS))if(q.hb===filt.hb)c2.append(mk(q.name,filt.qs===k,()=>{filt.qs=filt.qs===k?'':k;go('tasks')}));m.append(c2)}
  let list=OPEN.filter(q=>(!filt.hb||QS[q.qs].hb===filt.hb)&&(!filt.qs||q.qs===filt.qs)&&(filt.only!=='due'||isDue(q.id))&&(filt.only!=='new'||!S.box[q.id]));
  const L=h('div',{class:'list'});
  if(!list.length)L.append(h('div',{class:'empty'},filt.only==='due'?'Heute ist nichts fällig.':'Keine Aufgaben für diesen Filter.'));
  for(const q of list){const b=boxOf(q.id).b;L.append(h('button',{class:'li',onclick:()=>go('task',{id:q.id,queue:list.map(x=>x.id)})},
    h('span',{class:'t'},q.q.length>110?q.q.slice(0,108)+'…':q.q),h('span',{},dots(b)),
    h('span',{class:'s'},`${QS[q.qs].name} · ${q.p} Punkte`,isDue(q.id)?h('span',{class:'due'},'  · fällig'):null)))}
  m.append(L);
}

/* ───────── EINZELAUFGABE ───────── */
function vTask(m,{id,queue}){
  const q=OPEN.find(x=>x.id===id),qs=QS[q.qs],idx=queue?queue.indexOf(id):-1;
  const card=h('article',{class:'task hb-'+qs.hb});
  card.append(h('header',{class:'task-head'},h('span',{class:'tag'},HB[qs.hb]),h('h2',{},qs.name),h('span',{class:'pts'},`Mögliche Punktzahl: ${q.p}`),h('span',{style:'margin-left:auto'},dots(boxOf(id).b))));
  const body=h('div',{class:'task-body'});card.append(body);
  body.append(h('p',{class:'situation'},q.sit),h('p',{class:'prompt'},q.q));
  const ed=answerEditor('p:'+id);body.append(ed.el);
  const solBox=h('div');body.append(solBox);
  const show=h('button',{class:'btn primary',onclick:async()=>{show.remove();await ed.flush();showSolution(solBox,q,ed,true)}},'Lösungshinweise zeigen');
  body.append(h('div',{class:'row'},show));
  m.append(card);
  if(queue&&queue.length>1)m.append(h('div',{class:'row'},
    h('button',{class:'btn ghost',disabled:idx<=0,onclick:()=>go('task',{id:queue[idx-1],queue})},'← Vorherige'),
    h('span',{class:'muted num'},`${idx+1} / ${queue.length}`),
    h('button',{class:'btn ghost',disabled:idx>=queue.length-1,onclick:()=>go('task',{id:queue[idx+1],queue})},'Nächste →')));
  m.append(h('button',{class:'btn ghost',onclick:()=>go('tasks')},'Zur Aufgabenliste'));
  function next(){if(queue&&idx<queue.length-1)go('task',{id:queue[idx+1],queue});else{toast('Durchgang fertig');go('home')}}
  showSolution.next=next;
}
function showSolution(box,q,ed,withRating,onScore){
  box.innerHTML='';const a=ed.value();
  const s=h('div',{class:'solution'},h('div',{class:'eyebrow'},'Lösungshinweise'),h('ul',{},...q.sol.map(x=>h('li',{},x))));
  if(a.text&&a.text.trim().length>10){const t=a.text.toLowerCase();const hits=q.kw.filter(k=>t.includes(k));
    s.append(h('div',{class:'kwline'},`Schlüsselbegriffe in deiner getippten Antwort: ${hits.length} von ${q.kw.length}`),h('div',{},...q.kw.map(k=>h('span',{class:'kw'+(hits.includes(k)?' hit':'')},k))))}
  else if(a.draw||a.photo)s.append(h('div',{class:'kwline'},'Vergleiche deine handschriftliche Antwort mit den Hinweisen. Nachvollziehbare andere Antworten zählen in der Prüfung auch.'));
  s.append(h('div',{class:'kwline'},`Herkunft des Themas: ${q.src==='Sammlung'?'Lösungsskripte / wiederkehrendes Prüfungsthema':'HQ-Prüfung '+q.src}`));
  box.append(s);
  if(a.text||a.draw||a.photo)box.append(aiPanel(q,ed,onScore));
  if(withRating){box.append(h('div',{class:'eyebrow',style:'margin-top:8px'},'Wie gut konntest du es?'),
    h('div',{class:'rate'},
      h('button',{class:'btn r0',onclick:()=>{rate(q.id,0);showSolution.next()}},'Nicht gekonnt · morgen'),
      h('button',{class:'btn r1',onclick:()=>{rate(q.id,1);showSolution.next()}},'Teilweise · bald wieder'),
      h('button',{class:'btn r2',onclick:()=>{rate(q.id,2);showSolution.next()}},(d=>`Gekonnt · ${d===1?'morgen':'in '+d+' Tagen'}`)(INTERVAL[Math.min(5,boxOf(q.id).b+1)]))))}
}

/* ───────── Antwort-Editor: Tippen · Stift · Foto ───────── */
function answerEditor(key){
  let data={text:'',strokes:[],draw:null,photo:null,mode:'text'};
  const el=h('div',{class:'grid',style:'display:grid;gap:10px'});
  const modes=h('div',{class:'answer-modes'});const area=h('div');el.append(h('div',{class:'eyebrow'},'Deine Antwort'),modes,area);
  let pad=null,saveT=null;
  const persist=()=>{clearTimeout(saveT);saveT=setTimeout(()=>IDB.set(key,{text:data.text,strokes:data.strokes,draw:data.draw,photo:data.photo,mode:data.mode,ts:Date.now()}),400)};
  function setMode(md){if(pad){data.strokes=pad.strokes();data.draw=pad.png()}pad=null;data.mode=md;drawModes();area.innerHTML='';
    if(md==='text'){const ta=h('textarea',{id:'ta-'+key,placeholder:'Antwort in Stichpunkten oder ganzen Sätzen …',oninput:e=>{data.text=e.target.value;persist()}});ta.value=data.text;area.append(ta)}
    else if(md==='draw'){pad=Pad(area,data.strokes,()=>{data.strokes=pad.strokes();data.draw=null;persist()})}
    else{area.append(photoBox(data.photo,p=>{data.photo=p;persist()}))}}
  function drawModes(){modes.innerHTML='';for(const[k,l]of[['text','Tippen'],['draw','Mit Stift schreiben'],['photo','Papier einscannen']])
    modes.append(h('button',{class:'chip','aria-pressed':String(data.mode===k),onclick:()=>setMode(k)},l+(k==='text'&&data.text?' ✓':k==='draw'&&data.strokes.length?' ✓':k==='photo'&&data.photo?' ✓':'')))}
  IDB.get(key).then(v=>{if(v)Object.assign(data,v,{strokes:v.strokes||[]});setMode(data.mode||'text')});
  setMode('text');
  return {el,async flush(){if(pad){data.strokes=pad.strokes();data.draw=data.strokes.length?pad.png():null}clearTimeout(saveT);await IDB.set(key,{...data,ts:Date.now()});drawModes()},
    value(){return {text:data.text,draw:data.strokes.length?(pad?pad.png():data.draw):null,photo:data.photo}}};
}

/* Schreibfläche mit Stift (Druckstufen, Handballen-Erkennung, Radierer, Rückgängig) */
function Pad(container,initial,onchange){
  let strokes=JSON.parse(JSON.stringify(initial||[])),cur=null,color='ink',width=2.2,eraser=false,penSeen=false,H=Math.max(560,...strokes.flatMap(s=>s.p.map(p=>p[1]+200)));
  const COLORS={ink:getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()||'#18212B',blue:'#1C5A9E',red:'#C0362C'};
  const cv=h('canvas',{class:'padcanvas'});const ctx=cv.getContext('2d');
  const tools=h('div',{class:'padtools'});
  const mkDot=(k)=>{const b=h('button',{class:'dot','aria-label':'Farbe '+k,'aria-pressed':String(!eraser&&color===k),style:`background:${COLORS[k]}`,onclick:()=>{color=k;eraser=false;bar()}});return b};
  function bar(){tools.innerHTML='';tools.append(mkDot('ink'),mkDot('blue'),mkDot('red'),
    h('button',{class:'chip','aria-pressed':String(width<2),onclick:()=>{width=1.4;bar()}},'fein'),
    h('button',{class:'chip','aria-pressed':String(width>=2&&width<3),onclick:()=>{width=2.2;bar()}},'normal'),
    h('button',{class:'chip','aria-pressed':String(width>=3),onclick:()=>{width=3.6;bar()}},'dick'),
    h('button',{class:'chip','aria-pressed':String(eraser),onclick:()=>{eraser=!eraser;bar()}},'Radierer'),
    h('span',{class:'sep'}),
    h('button',{class:'btn small ghost',onclick:()=>{strokes.pop();redraw();onchange()}},'Rückgängig'),
    h('button',{class:'btn small ghost',onclick:()=>{H+=400;size()}},'+ Platz'),
    h('button',{class:'btn small ghost',onclick:e=>{const b=e.currentTarget;if(b.dataset.c){strokes=[];redraw();onchange();delete b.dataset.c;b.textContent='Leeren'}else{b.dataset.c=1;b.textContent='Wirklich leeren?';setTimeout(()=>{delete b.dataset.c;b.textContent='Leeren'},2500)}}},'Leeren'))}
  bar();
  const wrap=h('div',{class:'padwrap'},tools,cv,h('div',{class:'penhint'},'Sobald der Stift erkannt wird, ignoriert die Fläche Berührungen mit der Hand. Seitenknopf des S Pen gedrückt halten = radieren.'));
  container.append(wrap);
  let W=0;
  function size(){W=wrap.clientWidth;const dpr=window.devicePixelRatio||1;cv.width=W*dpr;cv.height=H*dpr;cv.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);redraw()}
  function bg(){ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()||'#fff';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--rule').trim()||'#D4E0EC';ctx.lineWidth=1;for(let y=40;y<H;y+=34){ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5);ctx.stroke()}
    ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--margin').trim()||'#F2B8A8';ctx.beginPath();ctx.moveTo(48.5,0);ctx.lineTo(48.5,H);ctx.stroke()}
  function drawStroke(s){if(s.p.length<1)return;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=COLORS[s.c]||COLORS.ink;
    for(let i=1;i<s.p.length;i++){const a=s.p[i-1],b=s.p[i];ctx.lineWidth=s.w*(0.55+(b[2]||0.5));ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
    if(s.p.length===1){ctx.fillStyle=COLORS[s.c];ctx.beginPath();ctx.arc(s.p[0][0],s.p[0][1],s.w/1.5,0,7);ctx.fill()}}
  function redraw(){bg();strokes.forEach(drawStroke)}
  const pos=e=>{const r=cv.getBoundingClientRect();return [Math.round((e.clientX-r.left)*10)/10,Math.round((e.clientY-r.top)*10)/10,e.pressure&&e.pointerType!=='mouse'?Math.round(e.pressure*100)/100:0.5]};
  function eraseAt(p){const before=strokes.length;strokes=strokes.filter(s=>!s.p.some(q=>Math.hypot(q[0]-p[0],q[1]-p[1])<14));if(strokes.length!==before){redraw();onchange()}}
  cv.addEventListener('pointerdown',e=>{if(e.pointerType==='pen')penSeen=true;if(penSeen&&e.pointerType==='touch')return;
    const er=eraser||e.button===5||e.buttons===32;
    try{cv.setPointerCapture(e.pointerId)}catch(_){}if(er){eraseAt(pos(e));cur={erase:true,id:e.pointerId};return}
    cur={c:color,w:width,p:[pos(e)],id:e.pointerId};e.preventDefault()});
  cv.addEventListener('pointermove',e=>{if(!cur||cur.id!==e.pointerId)return;const ce=e.getCoalescedEvents?e.getCoalescedEvents():[];const evs=ce.length?ce:[e];
    for(const ev of evs){const p=pos(ev);if(cur.erase){eraseAt(p);continue}const l=cur.p[cur.p.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])<0.8)continue;cur.p.push(p);
      ctx.lineCap='round';ctx.strokeStyle=COLORS[cur.c];ctx.lineWidth=cur.w*(0.55+p[2]);ctx.beginPath();ctx.moveTo(l[0],l[1]);ctx.lineTo(p[0],p[1]);ctx.stroke()}
    if(cur&&!cur.erase&&cur.p[cur.p.length-1][1]>H-80){H+=300;size()}e.preventDefault()});
  const end=e=>{if(!cur||cur.id!==e.pointerId)return;if(!cur.erase){strokes.push({c:cur.c,w:cur.w,p:cur.p});if(cur.p.length===1)drawStroke(strokes[strokes.length-1]);onchange()}cur=null};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  cv.addEventListener('touchstart',e=>{if(!penSeen||[...e.touches].every(t=>t.touchType==='stylus'))e.preventDefault()},{passive:false});
  const ro=new ResizeObserver(()=>{if(wrap.clientWidth!==W)size()});ro.observe(wrap);cleanup.push(()=>ro.disconnect());
  size();
  return {strokes:()=>strokes,png(){const maxY=Math.min(H,Math.max(200,...strokes.flatMap(s=>s.p.map(p=>p[1]+40))));const c=document.createElement('canvas');const sc=Math.min(1.5,1600/W);c.width=W*sc;c.height=maxY*sc;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.scale(sc,sc);
    x.lineCap='round';x.lineJoin='round';for(const s of strokes){x.strokeStyle=s.c==='blue'?'#1C5A9E':s.c==='red'?'#C0362C':'#111';for(let i=1;i<s.p.length;i++){const a=s.p[i-1],b=s.p[i];x.lineWidth=s.w*(0.55+(b[2]||.5));x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}}
    return c.toDataURL('image/png')}};
}

/* Foto / Scan einer Papierantwort */
function photoBox(initial,onset){
  let cur=initial;const box=h('div',{class:'photo'});
  const inp=h('input',{type:'file',accept:'image/*',capture:'environment',hidden:true,id:'cam-'+Math.random().toString(36).slice(2),onchange:async e=>{const f=e.target.files[0];if(!f)return;cur=await shrink(f,true);onset(cur);draw()}});
  const inp2=h('input',{type:'file',accept:'image/*',hidden:true,onchange:async e=>{const f=e.target.files[0];if(!f)return;cur=await shrink(f,true);onset(cur);draw()}});
  function draw(){box.innerHTML='';box.append(inp,inp2,h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>inp.click()},cur?'Neu fotografieren':'Antwort fotografieren'),h('button',{class:'btn',onclick:()=>inp2.click()},'Bild aus Galerie'),cur?h('button',{class:'btn ghost',onclick:()=>{cur=null;onset(null);draw()}},'Foto entfernen'):null));
    if(cur)box.append(h('img',{src:cur,alt:'Foto deiner Papierantwort'}));else box.append(h('p',{class:'muted',style:'margin:0'},'Schreib die Antwort auf Papier und fotografiere sie. Die App macht daraus einen gut lesbaren Scan (Graustufen, mehr Kontrast).'))}
  draw();return box;
}
function shrink(file,scan){return new Promise(res=>{const img=new Image();const url=URL.createObjectURL(file);img.onload=()=>{const max=1600,s=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=img.width*s;c.height=img.height*s;const x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);
  if(scan){const d=x.getImageData(0,0,c.width,c.height),p=d.data;let sum=0;for(let i=0;i<p.length;i+=4)sum+=.3*p[i]+.59*p[i+1]+.11*p[i+2];const avg=sum/(p.length/4);
    for(let i=0;i<p.length;i+=4){let g=.3*p[i]+.59*p[i+1]+.11*p[i+2];g=(g-avg*0.55)/(avg*0.45)*255;g=Math.max(0,Math.min(255,g));p[i]=p[i+1]=p[i+2]=g}x.putImageData(d,0,0)}
  URL.revokeObjectURL(url);res(c.toDataURL('image/jpeg',0.82))};img.onerror=()=>res(null);img.src=url})}

/* ───────── KI-Korrektur (optional) ───────── */
function aiPanel(q,ed,onScore){
  const p=h('div',{class:'ai'},h('div',{class:'head'},'KI-Korrektur (optional)'));
  if(!S.ai.key){p.append(h('p',{class:'muted',style:'margin:0'},'Lass deine Antwort – auch handschriftlich oder als Foto – wie von einem IHK-Prüfer bewerten. Dafür unter „Mehr“ einen Anthropic-API-Schlüssel eintragen (kostet pro Korrektur wenige Cent, braucht Internet).'));return p}
  const out=h('div');const b=h('button',{class:'btn',onclick:async()=>{b.disabled=true;b.textContent='Wird korrigiert …';out.innerHTML='';
    try{const r=await aiGrade(q,ed.value());out.append(h('div',{class:'num',style:'font-weight:600'},`${r.punkte} von ${q.p} Punkten`),
      r.transkript?h('details',{},h('summary',{},'So wurde deine Handschrift gelesen'),h('p',{},r.transkript)):null,
      r.gut?.length?h('div',{},h('b',{},'Gut: '),r.gut.join(' · ')):null,r.fehlt?.length?h('div',{},h('b',{},'Fehlt/ungenau: '),r.fehlt.join(' · ')):null,r.tipp?h('div',{class:'tip'},r.tipp):null);
      onScore&&onScore(r.punkte);b.textContent='Erneut korrigieren'}
    catch(e){out.append(h('p',{style:'color:var(--bad);margin:0'},e.message));b.textContent='Nochmal versuchen'}b.disabled=false}},'Antwort bewerten lassen');
  p.append(b,out);return p;
}
async function aiGrade(q,a){
  if(!navigator.onLine)throw new Error('Keine Internetverbindung. Die KI-Korrektur braucht Internet – alles andere geht offline.');
  const content=[];
  if(a.draw)content.push({type:'image',source:{type:'base64',media_type:'image/png',data:a.draw.split(',')[1]}});
  if(a.photo)content.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:a.photo.split(',')[1]}});
  content.push({type:'text',text:`Du bist erfahrener IHK-Prüfer für die Prüfung „Geprüfter Industriemeister Metall – Handlungsspezifische Qualifikationen“ und korrigierst fair nach den Lösungshinweisen. Nachvollziehbare alternative Antworten werden gewertet; bei Aufgaben mit einer festen Anzahl zählen nur die ersten n Nennungen.

Situation: ${q.sit}
Aufgabe: ${q.q}
Mögliche Punktzahl: ${q.p}
Lösungshinweise:
- ${q.sol.join('\n- ')}

Antwort des Prüflings:
${a.text?'Getippter Text:\n'+a.text:''}${(a.draw||a.photo)?'\n(Die handschriftliche Antwort befindet sich in den Bildern oben. Lies sie sorgfältig.)':''}

Antworte NUR mit JSON in genau diesem Format:
{"punkte": <ganze Zahl 0-${q.p}>, "transkript": "<Text der handschriftlichen Antwort, leer wenn keine>", "gut": ["..."], "fehlt": ["..."], "tipp": "<ein konkreter Satz, wie die Antwort volle Punkte bekommt>"}`});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':S.ai.key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
    body:JSON.stringify({model:S.ai.model||'claude-sonnet-5-5',max_tokens:1200,messages:[{role:'user',content}]})});
  if(!r.ok){let m='';try{m=(await r.json()).error?.message}catch(e){}throw new Error(r.status===401?'API-Schlüssel ungültig – unter „Mehr“ prüfen.':'Fehler '+r.status+': '+(m||'unbekannt'))}
  const j=await r.json();const t=j.content.map(c=>c.text||'').join('');const mm=t.match(/\{[\s\S]*\}/);if(!mm)throw new Error('Antwort der KI nicht lesbar.');
  const o=JSON.parse(mm[0]);o.punkte=Math.max(0,Math.min(q.p,Math.round(+o.punkte||0)));return o;
}

/* ───────── RECHNEN ───────── */
function vCalc(m){
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},`${CALC.length} Aufgabentypen · immer neue Zahlen`),h('h1',{},'Rechentrainer'),h('p',{class:'lead'},'Taschenrechner und Tabellenbuch daneben legen, Ergebnis eintragen, prüfen. Der Lösungsweg zeigt jede Zwischenrechnung.')));
  for(const hb of['T','O']){const l=h('div',{class:'list'});
    for(const c of CALC.filter(c=>QS[c.qs].hb===hb)){const st=S.calc[c.id];l.append(h('button',{class:'li',onclick:()=>go('calcrun',{id:c.id})},h('span',{class:'t'},c.title),h('span',{class:'num muted'},st?`${st.ok}/${st.tot}`:'neu'),h('span',{class:'s'},QS[c.qs].name)))}
    m.append(h('section',{class:'sheet hb-'+hb},h('h2',{},hb==='T'?'Technik':'Organisation & Kostenwesen'),l))}
}
function vCalcRun(m,{id,rand}){
  const c=CALC.find(x=>x.id===id),t=c.gen(),qs=QS[c.qs];
  const card=h('article',{class:'task hb-'+qs.hb});
  card.append(h('header',{class:'task-head'},h('span',{class:'tag'},HB[qs.hb]),h('h2',{},c.title),h('span',{class:'pts'},qs.name)));
  const body=h('div',{class:'task-body'});card.append(body);
  body.append(h('p',{class:'prompt',style:'font-weight:400'},t.text));
  body.append(h('div',{class:'tablewrap'},h('table',{class:'given'},h('tbody',{},...t.given.map(([a,b])=>h('tr',{},h('td',{},a),h('td',{},String(b))))))));
  const rows=t.ans.map((a,i)=>{const inp=h('input',{id:`ans-${id}-${i}`,inputmode:'decimal',autocomplete:'off',placeholder:'Ergebnis'});const r=h('div',{class:'ans'},h('label',{for:inp.id},a.l),inp,h('span',{class:'u'},a.u));return {a,inp,r}});
  body.append(h('div',{class:'eyebrow'},'Deine Ergebnisse'),h('div',{class:'ansgrid'},...rows.map(x=>x.r)));
  const scratch=h('div');let sp=null;
  body.append(h('details',{ontoggle:e=>{if(e.target.open&&!sp)sp=Pad(scratch,[],()=>{})}},h('summary',{style:'cursor:pointer;font-weight:600'},'Schmierblatt (Stift)'),scratch));
  const res=h('div',{style:'display:grid;gap:12px'});
  const chk=h('button',{class:'btn primary',onclick:()=>{let ok=0;for(const x of rows){const v=parseNum(x.inp.value),tol=x.a.tol??0.01;const good=isFinite(v)&&Math.abs(v-x.a.v)<=Math.max(Math.abs(x.a.v)*tol,0.015);if(good)ok++;
      x.r.classList.toggle('ok',good);x.r.classList.toggle('no',!good);x.r.querySelector('.exp')?.remove();x.r.append(h('span',{class:'exp'},`Richtig: ${f(x.a.v)} ${x.a.u}`))}
    const st=S.calc[id]||{ok:0,tot:0};st.tot++;if(ok===rows.length)st.ok++;S.calc[id]=st;markDay();save();
    res.innerHTML='';res.append(h('div',{class:'eyebrow'},ok===rows.length?'Alles richtig':`${ok} von ${rows.length} richtig`),h('div',{class:'solution'},h('div',{class:'eyebrow'},'Lösungsweg'),h('ol',{class:'steps'},...t.steps.map(s=>h('li',{},s)))),t.tip?h('div',{class:'tip'},h('b',{},'Merke: '),t.tip):null);chk.disabled=true}},'Prüfen');
  body.append(h('div',{class:'row'},chk,h('button',{class:'btn ghost',onclick:()=>{res.innerHTML='';res.append(h('div',{class:'solution'},h('div',{class:'eyebrow'},'Lösungsweg'),h('ol',{class:'steps'},...t.steps.map(s=>h('li',{},s)))))}},'Lösungsweg ohne Prüfen')),res);
  m.append(card,h('div',{class:'row'},h('button',{class:'btn',onclick:()=>go('calcrun',{id})},'Gleicher Typ, neue Zahlen'),h('button',{class:'btn',onclick:()=>go('calcrun',{id:pick(CALC).id,rand:true})},'Zufälliger Typ'),h('button',{class:'btn ghost',onclick:()=>go('calc')},'Übersicht')));
}

/* ───────── PRÜFUNGSSIMULATION ───────── */
function noteFor(p){return p>=92?'sehr gut (1)':p>=81?'gut (2)':p>=67?'befriedigend (3)':p>=50?'ausreichend (4)':p>=30?'mangelhaft (5)':'ungenügend (6)'}
let EX=null;try{EX=JSON.parse(localStorage.getItem('imm_exam')||'null')}catch(e){}
const saveEx=()=>{try{localStorage.setItem('imm_exam',JSON.stringify(EX))}catch(e){}};
function vExam(m){
  if(EX&&!EX.done){m.append(h('section',{class:'sheet'},h('h2',{},'Laufende Prüfungssimulation'),h('p',{class:'lead'},`${EX.sit==='T'?'Situationsaufgabe 1 · Technik':'Situationsaufgabe 2 · Organisation'} – begonnen ${new Date(EX.start).toLocaleString('de-DE')}`),
    h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>go('examrun',{i:0})},'Fortsetzen'),h('button',{class:'btn ghost',onclick:()=>{EX=null;saveEx();go('exam')}},'Verwerfen'))));return}
  let sit='T',dur=120;
  const sitC=h('div',{class:'row'}),durC=h('div',{class:'row'});
  const drawC=()=>{sitC.innerHTML='';durC.innerHTML='';
    sitC.append(h('button',{class:'chip','aria-pressed':String(sit==='T'),onclick:()=>{sit='T';drawC()}},'1. Situationsaufgabe · Technik'),h('button',{class:'chip','aria-pressed':String(sit==='O'),onclick:()=>{sit='O';drawC()}},'2. Situationsaufgabe · Organisation'));
    for(const d of[60,120,240])durC.append(h('button',{class:'chip','aria-pressed':String(dur===d),onclick:()=>{dur=d;drawC()}},d===240?'240 min (Original)':d+' min'))};drawC();
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},'Wie in der IHK-Prüfung'),h('h1',{},'Prüfungssimulation'),
    h('p',{class:'lead'},'Gemischte Situationsaufgaben mit integrierter Führung & Personal plus Rechenaufgaben, gegen die Uhr. Danach bewertest du dich anhand der Lösungshinweise (oder per KI) und bekommst Punkte und Note nach IHK-Schlüssel.')),
    h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Prüfungsteil'),sitC,h('div',{class:'eyebrow'},'Bearbeitungszeit'),durC,
      h('p',{class:'muted',style:'margin:0'},'Umfang: bei 60 min 4 Aufgaben, bei 120 min 7, bei 240 min 11 – davon etwa ein Drittel Rechenaufgaben.'),
      h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{startExam(sit,dur);go('examrun',{i:0})}},'Prüfung starten'))));
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function startExam(sit,dur){
  const n=dur===60?4:dur===120?7:11,nc=Math.round(n/3),no=n-nc;
  const core=sit==='T'?['BT','FT','MT']:['KW','PS','AUG'];
  const nF=Math.max(1,Math.round(no/3));
  const op=[...shuffle(OPEN.filter(q=>core.includes(q.qs))).slice(0,no-nF),...shuffle(OPEN.filter(q=>QS[q.qs].hb==='F')).slice(0,nF)];
  const cc=shuffle(CALC.filter(c=>sit==='T'?['BT','FT','MT'].includes(c.qs):['KW','PS'].includes(c.qs))).slice(0,nc);
  const items=shuffle([...op.map(q=>({k:'o',id:q.id,p:q.p})),...cc.map(c=>{const t=c.gen();return {k:'c',id:c.id,p:8,t:{text:t.text,given:t.given,ans:t.ans,steps:t.steps},inp:[]}})]);
  // auf 100 Punkte skalieren
  const sum=items.reduce((a,x)=>a+x.p,0);items.forEach(x=>x.w=x.p*100/sum);
  EX={sit,dur,start:Date.now(),items,done:false};saveEx();
}
function vExamRun(m,{i}){
  const it=EX.items[i];let tid=null;
  const tm=h('div',{class:'timer'});const tick=()=>{const left=EX.start+EX.dur*6e4-Date.now();if(left<=0){tm.textContent='Zeit abgelaufen';tm.classList.add('low');return}const mm=Math.floor(left/6e4),ss=Math.floor(left%6e4/1e3);tm.textContent=`${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;tm.classList.toggle('low',left<10*6e4)};tick();tid=setInterval(tick,1000);cleanup.push(()=>clearInterval(tid));
  let ed=null;const leave=async(fn)=>{if(ed)await ed.flush();if(it.k==='c'){it.inp=[...m.querySelectorAll('.ans input')].map(x=>x.value);saveEx()}fn()};
  const navb=h('div',{class:'examnav'},...EX.items.map((x,k)=>h('button',{class:k===i?'cur':'','aria-label':'Aufgabe '+(k+1),onclick:()=>leave(()=>go('examrun',{i:k}))},String(k+1))));
  m.append(h('section',{class:'sheet'},h('div',{class:'row',style:'justify-content:space-between'},h('div',{},h('div',{class:'eyebrow'},EX.sit==='T'?'1. Situationsaufgabe · Technik':'2. Situationsaufgabe · Organisation'),h('div',{class:'muted'},`Aufgabe ${i+1} von ${EX.items.length}`)),tm),navb));
  const card=h('article',{class:'task'});const body=h('div',{class:'task-body'});
  if(it.k==='o'){const q=OPEN.find(x=>x.id===it.id),qs=QS[q.qs];card.classList.add('hb-'+qs.hb);
    card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${i+1}`),h('span',{class:'pts'},`Mögliche Punktzahl: ${Math.round(it.w)}`),h('span',{class:'tag'},qs.name)),body);
    body.append(h('p',{class:'situation'},q.sit),h('p',{class:'prompt'},q.q));ed=answerEditor('x:'+EX.start+':'+q.id);body.append(ed.el)}
  else{const c=CALC.find(x=>x.id===it.id),qs=QS[c.qs];card.classList.add('hb-'+qs.hb);
    card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${i+1}`),h('span',{class:'pts'},`Mögliche Punktzahl: ${Math.round(it.w)}`),h('span',{class:'tag'},qs.name)),body);
    body.append(h('p',{class:'prompt',style:'font-weight:400'},it.t.text),h('div',{class:'tablewrap'},h('table',{class:'given'},h('tbody',{},...it.t.given.map(([a,b])=>h('tr',{},h('td',{},a),h('td',{},String(b))))))));
    body.append(h('div',{class:'ansgrid'},...it.t.ans.map((a,k)=>{const inp=h('input',{id:`ex-${i}-${k}`,inputmode:'decimal',placeholder:'Ergebnis'});inp.value=it.inp[k]||'';inp.oninput=()=>{it.inp[k]=inp.value;saveEx()};return h('div',{class:'ans'},h('label',{for:inp.id},a.l),inp,h('span',{class:'u'},a.u))})));
    const scratch=h('div');body.append(h('div',{class:'eyebrow'},'Rechenweg / Schmierblatt'));const keyS='xs:'+EX.start+':'+i;IDB.get(keyS).then(v=>{const pad=Pad(scratch,v?.strokes||[],()=>IDB.set(keyS,{strokes:pad.strokes()}))});body.append(scratch)}
  m.append(card);
  m.append(h('div',{class:'row'},h('button',{class:'btn ghost',disabled:i===0,onclick:()=>leave(()=>go('examrun',{i:i-1}))},'← Zurück'),
    i<EX.items.length-1?h('button',{class:'btn',onclick:()=>leave(()=>go('examrun',{i:i+1}))},'Weiter →'):null,
    h('button',{class:'btn primary',onclick:()=>leave(()=>{EX.end=Date.now();EX.done=true;EX.scores=EX.items.map(()=>null);saveEx();go('examres')})},'Abgeben & auswerten')));
}
function vExamRes(m){
  if(!EX){go('exam');return}
  const total=h('div',{class:'note'});const sub=h('div',{class:'muted'});
  function upd(){let pts=0,open=0;EX.items.forEach((it,k)=>{if(EX.scores[k]==null)open++;else pts+=EX.scores[k]});const p=Math.round(pts);total.textContent=`${p} / 100 Punkte`;sub.textContent=open?`Noch ${open} Aufgabe(n) selbst bewerten.`:`Note: ${noteFor(p)} · ${p>=50?'bestanden':'nicht bestanden'} (ab 50 Punkten)`;return {p,open}}
  m.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Auswertung'),total,sub,h('p',{class:'muted',style:'margin:0'},`Bearbeitungszeit: ${Math.round((EX.end-EX.start)/6e4)} min von ${EX.dur} min`)));
  EX.items.forEach((it,k)=>{const card=h('article',{class:'task'}),body=h('div',{class:'task-body'});
    if(it.k==='c'){let ok=0;const c=CALC.find(x=>x.id===it.id);const lines=it.t.ans.map((a,j)=>{const v=parseNum(it.inp[j]);const g=isFinite(v)&&Math.abs(v-a.v)<=Math.max(Math.abs(a.v)*(a.tol??0.01),0.015);if(g)ok++;return h('li',{},`${a.l}: deine Eingabe ${it.inp[j]||'–'} · richtig ${f(a.v)} ${a.u} ${g?'✓':'✗'}`)});
      EX.scores[k]=it.w*ok/it.t.ans.length;
      card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${k+1} · ${c.title}`),h('span',{class:'pts num'},`${f(EX.scores[k],1)} / ${Math.round(it.w)} Punkte`)),body);
      body.append(h('ul',{},...lines),h('details',{},h('summary',{},'Lösungsweg'),h('ol',{class:'steps'},...it.t.steps.map(s=>h('li',{},s)))))}
    else{const q=OPEN.find(x=>x.id===it.id);const max=Math.round(it.w);const lab=h('span',{class:'num'},EX.scores[k]==null?'– bewerten':`${f(EX.scores[k],0)} / ${max}`);
      card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${k+1} · ${QS[q.qs].name}`),lab),body);
      body.append(h('p',{class:'prompt'},q.q));
      const shown=h('div',{style:'display:grid;gap:8px'});IDB.get('x:'+EX.start+':'+q.id).then(v=>{if(!v){shown.append(h('p',{class:'muted'},'Keine Antwort abgegeben.'));return}
        if(v.text)shown.append(h('div',{class:'tip',style:'white-space:pre-wrap'},v.text));if(v.draw)shown.append(h('img',{class:'answer-thumb',src:v.draw,alt:'Handschriftliche Antwort'}));if(v.photo)shown.append(h('img',{class:'answer-thumb',src:v.photo,alt:'Foto der Antwort'}));
        const fake={value:()=>({text:v.text,draw:v.draw,photo:v.photo})};const sb=h('div');shown.append(sb);showSolution(sb,q,fake,false,pts=>{setScore(Math.round(pts/q.p*max))})});
      const rng=h('input',{type:'range',min:0,max,step:1,value:EX.scores[k]??0,id:'sc-'+k,'aria-label':'Punkte für Aufgabe '+(k+1),oninput:e=>setScore(+e.target.value)});
      function setScore(v){EX.scores[k]=v;rng.value=v;lab.textContent=`${v} / ${max}`;saveEx();upd()}
      body.append(shown,h('div',{class:'eyebrow'},'Deine Punkte nach Lösungshinweisen'),h('div',{class:'score'},rng,h('button',{class:'btn small',onclick:()=>setScore(+rng.value)},'Übernehmen')))}
    m.append(card)});
  saveEx();upd();
  m.append(h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{const r=upd();if(r.open){toast('Bitte erst alle Aufgaben bewerten');return}S.exams.push({date:Date.now(),sit:EX.sit,pct:r.p,note:noteFor(r.p)});markDay();save();
    EX.items.forEach((it,k)=>{if(it.k==='o'){const sc=EX.scores[k]/it.w;rate(it.id,sc>=.75?2:sc>=.4?1:0)}});EX=null;saveEx();toast('Ergebnis gespeichert');go('home')}},'Ergebnis speichern'),
    h('button',{class:'btn ghost',onclick:()=>{EX=null;saveEx();go('exam')}},'Verwerfen')));
}

/* ───────── MEHR / EINSTELLUNGEN ───────── */
function vMore(m){
  const date=h('input',{type:'date',id:'examdate',value:S.examDate,onchange:e=>{S.examDate=e.target.value;save();renderNav();toast('Prüfungstermin gespeichert')}});
  const theme=h('select',{id:'theme',onchange:e=>{S.theme=e.target.value;save();applyTheme()}},...[['','wie System'],['light','hell'],['dark','dunkel']].map(([v,l])=>{const o=h('option',{value:v},l);if(S.theme===v)o.selected=true;return o}));
  const key=h('input',{type:'password',id:'aikey',placeholder:'sk-ant-…',value:S.ai.key,autocomplete:'off'});
  const model=h('input',{type:'text',id:'aimodel',value:S.ai.model});
  m.append(h('section',{class:'hero'},h('h1',{},'Einstellungen')),
    h('section',{class:'sheet'},h('h2',{},'Prüfung'),h('div',{class:'field'},h('label',{for:'examdate'},'Datum deiner HQ-Prüfung (1. Situationsaufgabe)'),date),
      h('div',{class:'field'},h('label',{for:'theme'},'Darstellung'),theme)),
    h('section',{class:'sheet'},h('h2',{},'KI-Korrektur'),
      h('p',{class:'muted',style:'margin:0'},'Optional: Mit einem eigenen Anthropic-API-Schlüssel bewertet Claude deine getippten, handgeschriebenen oder fotografierten Antworten nach den Lösungshinweisen und liest dabei deine Handschrift. Den Schlüssel bekommst du unter console.anthropic.com („API Keys“). Er bleibt nur auf diesem Gerät gespeichert. Jede Korrektur kostet wenige Cent und braucht Internet.'),
      h('div',{class:'field'},h('label',{for:'aikey'},'API-Schlüssel'),key),h('div',{class:'field'},h('label',{for:'aimodel'},'Modell'),model),
      h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{S.ai.key=key.value.trim();S.ai.model=model.value.trim()||'claude-sonnet-5-5';save();toast(S.ai.key?'KI-Korrektur aktiviert':'KI-Korrektur aus')}},'Speichern'),
        h('button',{class:'btn ghost',onclick:()=>{S.ai.key='';key.value='';save();toast('Schlüssel gelöscht')}},'Schlüssel löschen'))),
    h('section',{class:'sheet'},h('h2',{},'Lernstand'),
      h('p',{class:'muted',style:'margin:0'},'Dein Fortschritt wird nur auf diesem Gerät gespeichert. Zum Übertragen auf ein anderes Gerät den Sicherungscode kopieren und dort einfügen.'),
      bk()),
    h('section',{class:'sheet'},h('h2',{},'Über die App'),h('p',{class:'muted',style:'margin:0'},`${OPEN.length} Situationsaufgaben und ${CALC.length} Rechenaufgabentypen, selbst formuliert nach den Themen der HQ-Metall-Prüfungen 2020–2025 und der Lösungsskripte. Keine Original-Prüfungsaufgaben. Version 1.0`)));
  function bk(){const ta=h('textarea',{id:'backup',style:'min-height:90px;font-family:var(--f-mono);font-size:.75rem',placeholder:'Sicherungscode hier einfügen …'});
    return h('div',{style:'display:grid;gap:8px'},ta,h('div',{class:'row'},
      h('button',{class:'btn',onclick:async()=>{const code=btoa(unescape(encodeURIComponent(JSON.stringify({box:S.box,calc:S.calc,exams:S.exams,days:S.days,examDate:S.examDate}))));ta.value=code;try{await navigator.clipboard.writeText(code);toast('Sicherungscode kopiert')}catch(e){ta.select();toast('Code markiert – kopieren')}}},'Sicherungscode erzeugen'),
      h('button',{class:'btn',onclick:()=>{try{const o=JSON.parse(decodeURIComponent(escape(atob(ta.value.trim()))));Object.assign(S,o);save();toast('Lernstand übernommen');go('home')}catch(e){toast('Code ungültig')}}},'Code einfügen & übernehmen'),
      h('button',{class:'btn ghost',onclick:e=>{const b=e.target;if(b.dataset.c){S.box={};S.calc={};S.exams=[];S.days={};save();toast('Lernstand zurückgesetzt');go('home')}else{b.dataset.c=1;b.textContent='Wirklich alles löschen?';setTimeout(()=>{delete b.dataset.c;b.textContent='Zurücksetzen'},3000)}}},'Zurücksetzen')))}
}

/* ───────── Start ───────── */
applyTheme();
document.getElementById('cd').addEventListener('click',()=>go('more'));
render();
if('serviceWorker' in navigator&&location.protocol==='https:'&&!window.Capacitor)navigator.serviceWorker.register('sw.js').catch(()=>{});
