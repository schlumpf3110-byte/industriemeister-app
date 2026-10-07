'use strict';
/* ───────── Speicher ───────── */
const LS='imm_state_v1';
const S=(()=>{let s={};try{s=JSON.parse(localStorage.getItem(LS)||'{}')}catch(e){}
  s=Object.assign({box:{},examDate:'',theme:'',calc:{},exams:[],ai:{key:'',prov:'',model:''},days:{},log:{}},s);if(!s.examDate)s.examDate='2026-11-19';s.log=s.log||{};return s})();
function logDay(k){const d=today();const o=S.log[d]=S.log[d]||{};o[k]=(o[k]||0)+1}
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
function markDay(){const d=today();S.days[d]=(S.days[d]||0)+1;save()}
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
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

const getQ=id=>OPEN.find(x=>x.id===id)||NACHBAU.find(x=>x.id===id);
const nbFor=(ex,s,n)=>NACHBAU.find(x=>x.ex===ex&&x.s===s&&x.n===n);
/* ───────── Wiederholsystem (Lernkartei) ───────── */
const INTERVAL=[0,1,2,4,8,16];
function boxOf(id){return S.box[id]||{b:0,due:0}}
function rate(id,r){const c=boxOf(id);logDay(S.box[id]?'r':'n');const qq=getQ(id);if(qq)logDay('q_'+qq.qs);let b=c.b;if(r===2)b=Math.min(5,b+1);else if(r===1)b=Math.max(1,Math.min(b,2));else b=1;
  S.box[id]={b,r,due:Date.now()+INTERVAL[b]*DAY-36e5,last:Date.now(),n:(c.n||0)+1};markDay();save()}
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
 theory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/></svg>',
 more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'};
const TABS=[['home','Start'],['theory','Theorie'],['tasks','Aufgaben'],['calc','Rechnen'],['exam','Prüfung'],['more','Mehr']];
let view='home',viewArg=null,cleanup=[];
function go(v,arg){cleanup.forEach(f=>{try{f()}catch(e){}});cleanup=[];view=v;viewArg=arg;render();window.scrollTo(0,0)}
function renderNav(){const n=$('nav.tabs');n.innerHTML='';for(const[k,l]of TABS){const b=h('button',{'aria-current':String(view===k||(view.startsWith(k))||(k==='theory'&&(view==='chapter'||view==='tband'))),onclick:()=>go(k)});b.innerHTML=ICON[k];b.append(l);n.append(b)}
  const cd=$('#cd');cd.textContent=countdownText()}
function render(){renderNav();setTimeout(renderUpdate,0);const m=$('main');m.innerHTML='';({nachbau:vNachbau,fg:vFG,fgrun:vFGRun,fgtalk:vFGTalk,pdf:vPdf,examidx:vExamIdx,theory:vTheory,chapter:vChapter,tband:vTBand,home:vHome,tasks:vTasks,task:vTask,calc:vCalc,calcrun:vCalcRun,exam:vExam,examrun:vExamRun,examres:vExamRes,more:vMore})[view](m,viewArg)}

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
  m.append(noticeCard()||'');
  m.append(planSection());
  m.append(h('div',{class:'stats'},
    stat(due.length,'heute zu wiederholen'),stat(neu.length,'Aufgaben noch nie bearbeitet'),stat(`${known.length}/${OPEN.length}`,'sicher (ab Fach 3)'),
    stat(calcTot?Math.round(calcOk/calcTot*100)+' %':'–','Rechenaufgaben richtig'),stat(streak,'Lerntage in Folge')));
  const next=due[0]||neu[0];
  m.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Frei lernen'),
    h('div',{class:'row'},
      next?h('button',{class:'btn primary',onclick:()=>go('task',{id:next.id,queue:(due.length?due:neu).map(q=>q.id)})},due.length?`${due.length} fällige Aufgaben wiederholen`:'Mit neuen Aufgaben starten'):h('span',{class:'muted'},'Alles wiederholt – stark.'),
      h('button',{class:'btn',onclick:()=>go('calcrun',{id:pick(CALC).id,rand:true})},'Zufällige Rechenaufgabe'),
      h('button',{class:'btn',onclick:()=>go('exam')},'Prüfung simulieren'))));
  m.append(weakSection());
  if(S.exams.length){const l=h('div',{class:'list'});for(const x of S.exams.slice(-5).reverse())l.append(h('div',{class:'li',style:'cursor:default'},h('span',{class:'t'},`${x.sit==='T'?'Situationsaufgabe 1 · Technik':'Situationsaufgabe 2 · Organisation'}`),h('span',{class:'num'},`${x.pct} Punkte · ${x.note}`),h('span',{class:'s'},new Date(x.date).toLocaleDateString('de-DE'))));
    m.append(h('section',{class:'sheet'},h('h2',{},'Letzte Prüfungssimulationen'),l))}
}
/* ───────── Schwachstellen ───────── */
function taskMastery(id){const c=S.box[id];if(!c)return null;const bb=Math.min(c.b||0,3)/3;return c.r!=null?(c.r/2)*0.7+bb*0.3:bb}
function qsStats(){
  const ALL=[...OPEN,...NACHBAU],out={};for(const k in QS)out[k]={k,n:0,seen:0,m:0,weak:[],unseen:[],cOk:0,cTot:0,calcs:[],eP:0,eM:0};
  for(const q of ALL){const o=out[q.qs];if(!o)continue;o.n++;const m=taskMastery(q.id);if(m==null)o.unseen.push(q);else{o.seen++;o.m+=m;if(m<0.6)o.weak.push(q)}}
  for(const c of CALC){const o=out[c.qs];if(!o)continue;const st=S.calc[c.id];o.calcs.push(c);if(st){o.cOk+=st.ok;o.cTot+=st.tot}}
  for(const x of S.exams||[])if(x.qs)for(const k in x.qs)if(out[k]){out[k].eP+=x.qs[k][0];out[k].eM+=x.qs[k][1]}
  for(const k in out){const o=out[k],parts=[];
    if(o.seen)parts.push([o.m/o.seen*100,Math.min(o.seen,12)]);if(o.cTot)parts.push([o.cOk/o.cTot*100,Math.min(o.cTot,10)]);if(o.eM)parts.push([o.eP/o.eM*100,Math.min(o.eM/4,10)]);
    const w=parts.reduce((a,p)=>a+p[1],0);o.score=w?parts.reduce((a,p)=>a+p[0]*p[1],0)/w:null;o.cover=o.n?o.seen/o.n:0;o.data=w}
  return out}
function weakAreas(st){st=st||qsStats();return Object.values(st).filter(o=>o.n||o.calcs.length).filter(o=>o.score!=null&&o.data>=3).sort((a,b)=>a.score-b.score).filter(o=>o.score<75)}
function focusQueue(k){const o=qsStats()[k];const w=[...o.weak].sort((a,b)=>(taskMastery(a.id)??0)-(taskMastery(b.id)??0));return [...w,...o.unseen].slice(0,12)}
function weakCalc(){const sc=c=>{const st=S.calc[c.id];return st?(st.ok+1)/(st.tot+2):0.45};const l=[...CALC].sort((a,b)=>sc(a)-sc(b)).slice(0,8);return pick(l)}
function weakSection(){
  const st=qsStats(),rows=Object.values(st).filter(o=>o.n||o.calcs.length);
  const any=rows.some(o=>o.score!=null);
  const sec=h('section',{class:'sheet weak'},h('h2',{},'Wo du stehst'),
    h('p',{class:'muted',style:'margin:0'},any?'Je Prüfungsgebiet: wie sicher du bist (Selbstbewertung der offenen Aufgaben, Rechenaufgaben und Prüfungssimulationen). Rot = Schwachstelle, dort zuerst üben.':'Sobald du Aufgaben bewertest und Rechenaufgaben prüfst, siehst du hier deine Schwachstellen je Prüfungsgebiet.'));
  const sorted=[...rows].sort((a,b)=>(a.score??101)-(b.score??101));
  const l=h('div',{class:'weak-list'});
  for(const o of sorted){const sc=o.score,few=sc!=null&&(o.data<8||o.cover<0.3);let lvl=sc==null?'none':sc<50?'bad':sc<75?'mid':'good';if(few&&lvl==='good')lvl='mid';
    const det=[`${o.seen}/${o.n} Aufgaben bearbeitet`];if(o.weak.length)det.push(`${o.weak.length} wackelig`);if(o.cTot)det.push(`Rechnen ${o.cOk}/${o.cTot} richtig`);if(o.eM)det.push(`Prüfung ${Math.round(o.eP/o.eM*100)} %`);if(few)det.push('noch wenig Daten');
    const row=h('div',{class:'wrow lvl-'+lvl+' hb-'+QS[o.k].hb},
      h('div',{class:'wtop'},h('span',{class:'wname'},QS[o.k].name),h('span',{class:'wscore num'},sc==null?'noch nicht geübt':Math.round(sc)+' %')),
      h('div',{class:'track'},h('i',{style:`width:${sc==null?0:Math.max(3,sc)}%`})),
      h('div',{class:'wdet'},det.join(' · ')));
    if(lvl==='bad'||lvl==='mid'||(lvl==='none'&&any)){const fq=focusQueue(o.k);const wc=o.calcs.length?[...o.calcs].sort((a,b)=>{const x=S.calc[a.id],y=S.calc[b.id];return (x?(x.ok+1)/(x.tot+2):0.45)-(y?(y.ok+1)/(y.tot+2):0.45)})[0]:null;
      row.append(h('div',{class:'row wbtn'},fq.length?h('button',{class:'btn small'+(lvl==='bad'?' primary':''),onclick:()=>go('task',{id:fq[0].id,queue:fq.map(q=>q.id)})},`Gezielt üben (${fq.length})`):null,wc?h('button',{class:'btn small ghost',onclick:()=>go('calcrun',{id:wc.id})},'Rechnen: '+wc.title.split(/[:&(]/)[0].trim()):null))}
    l.append(row)}
  sec.append(l);
  const badCalc=CALC.map(c=>({c,st:S.calc[c.id]})).filter(x=>x.st&&x.st.tot>=2&&x.st.ok/x.st.tot<0.5).sort((a,b)=>a.st.ok/a.st.tot-b.st.ok/b.st.tot).slice(0,4);
  if(badCalc.length)sec.append(h('div',{class:'eyebrow',style:'margin-top:6px'},'Rechenaufgaben, die noch nicht sitzen'),h('div',{class:'list'},...badCalc.map(x=>h('button',{class:'li',onclick:()=>go('calcrun',{id:x.c.id})},h('span',{class:'t'},x.c.title),h('span',{class:'num muted'},`${x.st.ok}/${x.st.tot}`)))));
  return sec}

/* ───────── Lernplan ───────── */
const dayStr=t=>new Date(t).toISOString().slice(0,10);
const dayNum=d=>Math.floor(new Date(d+'T12:00Z')/DAY);
const fmtD=n=>new Date(n*DAY+432e5).toLocaleDateString('de-DE',{timeZone:'UTC',weekday:'short',day:'numeric',month:'numeric'});
function planData(){
  const ex=dayNum(S.examDate),t=dayNum(today()),bStart=ex-14,cStart=ex-2,L=S.log[today()]||{};
  const phase=t>=ex?'X':t>=cStart?'C':t>=bStart?'B':'A';
  const ALL=[...OPEN,...NACHBAU];
  const unseen=ALL.filter(q=>!S.box[q.id]);
  // neue Aufgaben: Technik und Organisation abwechselnd
  const QST=qsStats(),wsc=k=>QST[k].score==null?55:QST[k].score;
  const grp={};for(const q of [...unseen].sort((a,b)=>wsc(a.qs)-wsc(b.qs))){const k=QS[q.qs].hb==='T'?'T':'O';(grp[k]=grp[k]||[]).push(q)}
  const newQ=[];for(let i=0;newQ.length<unseen.length;i++){for(const k of ['T','O'])if(grp[k]&&grp[k][i])newQ.push(grp[k][i])}
  const due=ALL.filter(q=>isDue(q.id));
  const weak=ALL.filter(q=>{const c=S.box[q.id];return c&&c.b<=2});
  const lastOf=k=>{let best=-1e9;for(const[d,o]of Object.entries(S.log))if(o[k])best=Math.max(best,dayNum(d));return best};
  const lastEx=S.exams.length?S.exams[S.exams.length-1]:null;
  const tasks=[];
  if(phase==='A'||phase==='B'){
    const left=Math.max(1,cStart-t),nNew=Math.ceil((unseen.length+(L.n||0))/left);
    if(nNew>0&&(unseen.length||L.n))tasks.push({k:'n',l:'Neue Situationsaufgaben',goal:nNew,did:L.n||0,run:()=>go('task',{id:newQ[0].id,queue:newQ.slice(0,Math.max(1,nNew-(L.n||0))).map(q=>q.id)}),can:!!newQ.length});
  }
  if(phase!=='X'){
    const rg=due.length+(L.r||0);if(rg)tasks.push({k:'r',l:'Fällige Wiederholungen',goal:rg,did:L.r||0,run:()=>go('task',{id:due[0].id,queue:due.map(q=>q.id)}),can:!!due.length});
    const cg=phase==='A'?5:phase==='B'?4:3;tasks.push({k:'c',l:'Rechenaufgaben (Schwerpunkt: deine schwächsten Typen)',goal:cg,did:L.c||0,run:()=>go('calcrun',{id:weakCalc().id,rand:true}),can:true});
  }
  {const seenN=ALL.filter(q=>S.box[q.id]).length,ws=weakAreas(QST)[0];
   if(ws&&(phase!=='A'||seenN>=15)&&phase!=='X'){const qq=focusQueue(ws.k);const g=Math.min(5,qq.length);if(g)tasks.push({k:'q',l:`Schwachstelle: ${QS[ws.k].name}`,goal:g,did:L['q_'+ws.k]||0,run:()=>go('task',{id:qq[0].id,queue:qq.map(q=>q.id)}),can:true})}}
  if(phase==='C'&&weak.length)tasks.push({k:'w',l:'Wackelkandidaten (Fach 1–2) wiederholen',goal:Math.min(weak.length,15),did:0,run:()=>go('task',{id:weak[0].id,queue:weak.map(q=>q.id)}),can:true,soft:true});
  const fgGap=phase==='A'?4:phase==='B'?3:2;
  if(phase!=='X'&&(t-lastOf('f')>=fgGap||L.f)){const g=[...FG].sort((a,b)=>((S.fg||{})[a.id]||0)-((S.fg||{})[b.id]||0))[0];tasks.push({k:'f',l:'Fachgespräch üben (laut antworten)',goal:1,did:L.f?1:0,run:()=>go('fg',{id:g.id}),can:true})}
  const exGap=phase==='A'?7:2;
  if((phase==='A'||phase==='B')&&(t-lastOf('e')>=exGap||L.e)){const sit=lastEx&&lastEx.sit==='T'?'O':'T';tasks.push({k:'e',l:`Prüfungssimulation ${sit==='T'?'Situationsaufgabe 1 · Technik':'Situationsaufgabe 2 · Organisation'} (240 min)`,goal:1,did:L.e?1:0,run:()=>go('exam'),can:true})}
  return {phase,ex,t,bStart,cStart,tasks,unseen:unseen.length,total:ALL.length}}
function planSection(){
  if(!S.examDate)return null;
  const P=planData(),sec=h('section',{class:'sheet plan'});
  if(P.phase==='X'){sec.append(h('h2',{},'Prüfung geschafft?'),h('p',{class:'muted'},'Trag unter „Mehr“ einen neuen Termin ein, falls du nachschreibst.'));return sec}
  const PH={A:['Erarbeiten','Jeden Tag neue Aufgaben, bis alle einmal bearbeitet sind. Einmal pro Woche eine ganze Situationsaufgabe.'],B:['Prüfungstraining','Alle zwei Tage eine ganze Situationsaufgabe unter Zeitdruck, abwechselnd Technik und Organisation.'],C:['Endspurt','Keine neuen Themen mehr. Nur Schwachstellen, ein paar Rechnungen, früh schlafen.']};
  const done=P.tasks.filter(x=>!x.soft&&x.did>=x.goal).length,all=P.tasks.filter(x=>!x.soft).length;
  sec.append(h('div',{class:'eyebrow'},`Heute · Phase ${PH[P.phase][0]}`),h('h2',{},all&&done===all?'Tagesplan erledigt ✓':`Tagesplan: ${done} von ${all} erledigt`));
  const l=h('div',{class:'list'});
  for(const x of P.tasks){const ok=x.did>=x.goal;
    l.append(h('button',{class:'li plan-i'+(ok?' ok':''),disabled:!x.can&&!ok,onclick:()=>x.can&&x.run()},h('span',{class:'t'},(ok?'✓ ':'')+x.l),h('span',{class:'num'},`${Math.min(x.did,x.goal)}/${x.goal}`),
      h('div',{class:'track'},h('i',{style:`width:${Math.min(100,x.did/x.goal*100)}%`}))))}
  sec.append(l);
  const ph=[['A',P.t<P.bStart?P.t:null,P.bStart-1],['B',P.bStart,P.cStart-1],['C',P.cStart,P.ex-1]];
  sec.append(h('div',{class:'phases'},...ph.map(([k,a,b])=>h('div',{class:'ph'+(k===P.phase?' cur':'')+(b<P.t?' past':'')},h('b',{},PH[k][0]),h('span',{},a!=null&&a<=b?(a===b?fmtD(a):`${fmtD(a)} – ${fmtD(b)}`):'–'))),
    h('div',{class:'ph exam'},h('b',{},'Prüfung'),h('span',{},`${fmtD(P.ex)} + ${fmtD(P.ex+1)}`))));
  sec.append(h('p',{class:'muted',style:'margin:0'},PH[P.phase][1]+` Noch ${P.unseen} von ${P.total} Aufgaben nie bearbeitet.`));
  return sec}
/* ───────── Fehler melden ───────── */
function reportBox(what,detail){
  const wrap=h('div',{class:'report'});
  const open=()=>{wrap.innerHTML='';const ta=h('textarea',{placeholder:'Was stimmt nicht? z. B. „Lösung b) rechnet mit falschem Wert“ oder „Begriff veraltet“'});
    wrap.append(h('div',{class:'eyebrow'},'Fehler melden'),ta,h('div',{class:'row'},
      h('button',{class:'btn primary',onclick:async()=>{if(!ta.value.trim()){toast('Bitte kurz beschreiben, was nicht stimmt');return}
        const text=`HQ-Meistertrainer – Fehlermeldung\n${what}\nVersion 1.${typeof APP_BUILD!=='undefined'?APP_BUILD:'?'}\n\nProblem: ${ta.value.trim()}${detail?'\n\n'+detail:''}`;
        try{if(navigator.share){await navigator.share({title:'Fehler in der HQ-App',text});toast('Danke für die Meldung!');closeR()}else{await navigator.clipboard.writeText(text);toast('Text kopiert – in WhatsApp oder Mail einfügen');closeR()}}catch(e){if(e&&e.name==='AbortError')return;try{await navigator.clipboard.writeText(text);toast('Text kopiert – in WhatsApp oder Mail einfügen')}catch(_){ta.value=text;ta.select();toast('Text markiert – kopieren und senden')}}}},'Senden …'),
      h('button',{class:'btn ghost',onclick:closeR},'Abbrechen')));ta.focus()};
  const closeR=()=>{wrap.innerHTML='';wrap.append(h('button',{class:'btn small ghost report-btn',onclick:open},'⚑ Fehler in dieser Aufgabe melden'))};
  closeR();return wrap}
function noticeCard(){
  if(S.noticeOK)return null;
  const c=h('section',{class:'sheet notice'},h('h2',{},'Bevor du loslegst'),
    h('ul',{style:'margin:0;padding-left:1.2rem;display:grid;gap:4px'},
      h('li',{},'Alle Aufgaben und Lösungen sind selbst erstellt – nach den Themen der HQ-Prüfungen 2020–2025, aber keine Original-IHK-Aufgaben.'),
      h('li',{},'Die Lösungen sind sorgfältig geprüft, aber ohne Gewähr. Im Zweifel gilt dein Lehrgang und das Tabellenbuch.'),
      h('li',{},'Die App ersetzt keinen Unterricht – sie ist zum Üben.'),
      h('li',{},'Fehler gefunden? Bei jeder Aufgabe gibt es „Fehler melden“.'),
      h('li',{},'Dein Lernstand bleibt nur auf diesem Gerät. Vor einem Gerätewechsel unter „Mehr“ sichern.')),
    h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{S.noticeOK=1;save();c.remove()}},'Verstanden')));
  return c}
function stat(v,l){return h('div',{class:'stat'},h('b',{},String(v)),h('span',{},l))}


/* ───────── Prüfungsnachbau ───────── */
function vNachbau(m){
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},'Eigener Bereich'),h('h1',{},'Prüfungsnachbau'),h('p',{class:'lead'},'Nachgebaute Aufgaben zu Prüfungsthemen 2020–2025, sortiert nach Prüfung. Mit Lösungshinweisen und Lernkartei wie im Hauptkatalog.')));
  for(const x of EXAMS){const items=NACHBAU.filter(n=>n.ex===x.id);if(!items.length)continue;
    const l=h('div',{class:'list'});const q=items.map(n=>n.id);
    for(const n of items)l.append(h('button',{class:'li',onclick:()=>go('task',{id:n.id,queue:q})},h('span',{class:'t'},n.q.length>110?n.q.slice(0,108)+'…':n.q),h('span',{},dots(boxOf(n.id).b)),h('span',{class:'s'},`${n.s==='T'?'Technik':'Organisation'}, Aufgabe ${n.n} · ${QS[n.qs].name} · ${n.p} Punkte`,isDue(n.id)?h('span',{class:'due'},'  · fällig'):null)));
    m.append(h('section',{class:'sheet'},h('h2',{},`${x.s} ${x.j}`),l))}
}

/* ───────── Situatives Fachgespräch ───────── */
function fgList(){
  const l=h('div',{class:'list'});
  for(const g of FG){const r=S.fg&&S.fg[g.id];l.append(h('button',{class:'li',onclick:()=>go('fg',{id:g.id})},h('span',{class:'t'},g.t),h('span',{class:'num muted'},r?`${r} %`:'neu'),h('span',{class:'s'},`${g.fragen.length} Prüferfragen · ${g.qs.map(k=>QS[k].name).join(', ')}`)))}
  return h('section',{class:'sheet hb-F'},h('h2',{},'Situatives Fachgespräch'),h('p',{class:'lead'},'Die mündliche Prüfung: Situation lesen, Notizen machen, dann die Prüferfragen laut beantworten – mit Zeitlimit, Antwortpunkten und Nachfragen.'),l)}
function vFG(m,{id}){
  const g=FG.find(x=>x.id===id);let prep=15;
  const chips=h('div',{class:'row'});const dc=()=>{chips.innerHTML='';for(const d of [5,15,30])chips.append(h('button',{class:'chip','aria-pressed':String(prep===d),onclick:()=>{prep=d;dc()}},d+' min'))};dc();
  m.append(h('section',{class:'hero hb-F'},h('div',{class:'eyebrow'},'Situatives Fachgespräch'),h('h1',{},g.t)),
    h('article',{class:'task hb-F'},h('header',{class:'task-head'},h('span',{class:'tag'},'Situation'),h('h2',{},'Ausgangslage')),h('div',{class:'task-body'},h('p',{style:'margin:0'},g.sit))),
    h('section',{class:'sheet'},h('h2',{},'So läuft es ab'),h('ol',{style:'margin:0;padding-left:1.2rem;display:grid;gap:4px'},h('li',{},'Vorbereitung: Situation durchdenken, Stichpunkte notieren (mit Stift oder Tastatur).'),h('li',{},`Gespräch: ${g.fragen.length} Prüferfragen, je ca. 3 Minuten laut antworten – am besten wirklich sprechen.`),h('li',{},'Nach jeder Antwort: Antwortpunkte ansehen, Nachfrage beantworten, selbst bewerten.')),
      h('div',{class:'eyebrow'},'Vorbereitungszeit'),chips,h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{TALK=null;go('fgtalk',{id})}},'🎤 Mit Prüfer sprechen'),h('button',{class:'btn',onclick:()=>{const g=FG.find(x=>x.id===id);toAbo(`Fachgespräch FG${FG.indexOf(g)+1}: ${g.t}`)}},'↗ In meinem KI-Abo (Sprachmodus)'),h('button',{class:'btn',onclick:()=>go('fgrun',{id,phase:'prep',prep,i:0,sc:[]})},'Vorbereitung starten'),h('button',{class:'btn',onclick:()=>go('fgrun',{id,phase:'q',i:0,sc:[]})},'Direkt zum Gespräch'))),reportBox(`Fachgespräch ${g.id} · ${g.t}`,null));
}
function timerEl(sec,onEnd){const el=h('div',{class:'timer'});const end=Date.now()+sec*1000;const t=()=>{const l=Math.max(0,end-Date.now());const mm=Math.floor(l/6e4),ss=Math.floor(l%6e4/1e3);el.textContent=`${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;el.classList.toggle('low',l<30000);if(l<=0){clearInterval(iv);onEnd&&onEnd()}};const iv=setInterval(t,500);t();cleanup.push(()=>clearInterval(iv));return el}
function vFGRun(m,a){
  const g=FG.find(x=>x.id===a.id);
  if(a.phase==='prep'){const ed=answerEditor('fgprep:'+g.id);
    m.append(h('section',{class:'sheet'},h('div',{class:'row',style:'justify-content:space-between'},h('h2',{},'Vorbereitung'),timerEl(a.prep*60,()=>toast('Vorbereitungszeit vorbei'))),h('p',{class:'situation'},g.sit),ed.el,
      h('div',{class:'row'},h('button',{class:'btn primary',onclick:async()=>{await ed.flush();go('fgrun',{...a,phase:'q',i:0})}},'Zum Gespräch'))));return}
  if(a.phase==='end'){const pct=Math.round(a.sc.reduce((x,y)=>x+y,0)/(a.sc.length*2)*100);S.fg=S.fg||{};S.fg[g.id]=pct;logDay('f');markDay();save();
    m.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Auswertung'),h('div',{class:'note'},`${pct} %`),h('p',{class:'lead'},pct>=80?'Sehr sicher – so kann das Fachgespräch kommen.':pct>=50?'Solide Basis. Wiederhole die Fragen mit „teilweise“.':'Hier lohnt sich noch Übung – lies die Theorie zu Führung & Personal.'),
      h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>go('fg',{id:g.id})},'Nochmal'),h('button',{class:'btn',onclick:()=>go('exam')},'Zur Übersicht'),h('button',{class:'btn ghost',onclick:()=>go('chapter',{k:g.qs[0]})},'Theorie'))));return}
  const fq=g.fragen[a.i];const box=h('div');
  m.append(h('section',{class:'sheet hb-F'},h('div',{class:'row',style:'justify-content:space-between'},h('div',{class:'eyebrow'},`Prüferfrage ${a.i+1} von ${g.fragen.length}`),timerEl(180)),
    h('p',{class:'prompt',style:'font-size:1.25rem'},'„'+fq.f+'“'),h('p',{class:'muted',style:'margin:0'},'Antworte laut, so wie im Prüfungsraum. Danach die Antwortpunkte aufdecken.'),box,
    h('div',{class:'row'},h('button',{class:'btn primary',onclick:e=>{e.currentTarget.remove();box.append(
      h('div',{class:'solution'},h('div',{class:'eyebrow'},'Das sollte vorkommen'),h('ul',{},...fq.a.map(x=>h('li',{},x)))),
      fq.n?h('div',{class:'tip'},h('b',{},'Mögliche Nachfrage: '),fq.n):null,
      h('div',{class:'eyebrow',style:'margin-top:8px'},'Wie gut war deine Antwort?'),
      h('div',{class:'rate'},...[['Kaum etwas','r0',0],['Teilweise','r1',1],['Fast alles','r2',2]].map(([l,c,v])=>h('button',{class:'btn '+c,onclick:()=>{const sc=[...a.sc,v];a.i+1<g.fragen.length?go('fgrun',{...a,i:a.i+1,sc}):go('fgrun',{...a,phase:'end',sc})}},l))))}},'Antwortpunkte zeigen'))));
}

/* ───────── THEORIE ───────── */
function vTheory(m){
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},'Textband'),h('h1',{},'Theorie zum Nachlesen'),h('p',{class:'lead'},'Das Wichtigste je Fach: Begriffe, Abläufe, Formeln und typische Fallen in der Prüfung.')));
  if(window.TB_META){const l=h('div',{class:'list'});
    for(const k of ['BT','KW','PS','PF','PE'].filter(k=>TB_META[k])){const T=TB_META[k],rd=T.ch.filter((c,j)=>S.read?.['tb'+k+j]).length;
      l.append(h('button',{class:'li',onclick:()=>go('tband',{k})},h('span',{class:'t'},'📘 '+T.title),h('span',{class:'num muted'},`${rd}/${T.ch.length}`),h('span',{class:'s'},T.ch.map(c=>c.t).slice(0,3).join(' · ')+' …')))}
    m.append(h('section',{class:'sheet'},h('h2',{},'Zusammenfassungen der Textbände'),h('p',{class:'muted',style:'margin:0 0 8px'},'Je Band die wichtigsten Punkte mit Schaubildern – in eigenen Worten.'),l))}
  for(const hb of ['T','O','F']){const l=h('div',{class:'list'});
    for(const[k,q]of Object.entries(QS))if(q.hb===hb){const ch=THEORY[k]||[];const read=ch.filter((c,i)=>S.read?.[k+i]).length;
      l.append(h('button',{class:'li',onclick:()=>go('chapter',{k})},h('span',{class:'t'},q.name),h('span',{class:'num muted'},`${read}/${ch.length}`),h('span',{class:'s'},ch.map(c=>c.t).join(' · '))))}
    m.append(h('section',{class:'sheet hb-'+hb},h('h2',{},HB[hb]),l))}
}
/* Formeln: LaTeX → MathML mit Temml (wird beim ersten Bedarf geladen, offline aus lib/) */
let temmlReady=null;
function loadTemml(){if(window.temml)return Promise.resolve(window.temml);return temmlReady||(temmlReady=new Promise((res,rej)=>{const sc=document.createElement('script');sc.src='lib/temml.min.js';sc.onload=()=>res(window.temml);sc.onerror=()=>{temmlReady=null;rej(new Error('Formeln nicht geladen'))};document.head.append(sc)}))}
function mathEl(tex,display){const el=h('span',{class:display?'fx-m':'fx-mi'});el.textContent=tex;
  loadTemml().then(t=>{try{el.textContent='';t.render(tex,el,{displayMode:!!display,throwOnError:false});if(display)requestAnimationFrame(()=>{let f=1.1;while(el.scrollWidth>el.clientWidth+1&&f>0.75){f-=0.05;el.style.fontSize=f+'rem'}})}catch(e){el.textContent=tex}}).catch(()=>{});return el}
/* Bausteine einer Theorieseite (auch für die Textband-Zusammenfassungen) */
function theoryBlocks(sec,bs){
  for(const b of bs){
    if(b.p)sec.append(h('p',{},b.p));
    if(b.ul)sec.append(h('ul',{},...b.ul.map(x=>h('li',{},x))));
    if(b.ol)sec.append(h('ol',{},...b.ol.map(x=>h('li',{},x))));
    if(b.tab)sec.append(h('div',{class:'tablewrap'},h('table',{class:'w-tab th-tab'},...b.tab.map((r,ri)=>h('tr',{},...r.map(x=>h(ri===0?'th':'td',{},x)))))));
    if(b.fx){if(Array.isArray(b.fx))sec.append(h('div',{class:'fx'},h('div',{class:'mono'},b.fx[0]),b.fx[1]?h('div',{class:'muted'},b.fx[1]):null));
      else{const f=b.fx;sec.append(h('div',{class:'fx fx2'},h('div',{class:'fx-n'},f.n||'Formel'),mathEl(f.tex,true),
        f.leg&&f.leg.length?h('table',{class:'fx-leg'},...f.leg.map(([sy,tx])=>h('tr',{},h('td',{},mathEl(sy,false)),h('td',{},tx)))):null,
        f.e?h('div',{class:'fx-e'},f.e):null))}}
    if(b.svg){const d=document.createElement('figure');d.className='sketch tb-fig';
      d.innerHTML=`<svg viewBox="0 0 ${b.svg.w||520} ${b.svg.h||260}" role="img" aria-label="${(b.svg.cap||'Schaubild').replace(/"/g,'&quot;')}"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fillacc"/></marker></defs>${b.svg.body}</svg>`;
      if(b.svg.cap)d.append(h('figcaption',{class:'sk-cap'},b.svg.cap));sec.append(d)}
    if(b.bsp)sec.append(h('div',{class:'bsp'},h('div',{class:'bsp-t'},b.bsp.t||'Beispiel'),...[].concat(b.bsp.b||[]).map(x=>h('p',{},x))));
    if(b.merke)sec.append(h('div',{class:'tip'},h('b',{},'Merke: '),b.merke));
    if(b.falle)sec.append(h('div',{class:'tip falle'},h('b',{},'Prüfungsfalle: '),b.falle));}}
function vChapter(m,{k,i}){
  const ch=THEORY[k],qs=QS[k];S.read=S.read||{};
  m.append(h('section',{class:'hero hb-'+qs.hb},h('div',{class:'eyebrow'},HB[qs.hb]),h('h1',{},qs.name)));
  const toc=h('div',{class:'row'},...ch.map((c,j)=>h('a',{class:'chip',href:'#k'+j,onclick:e=>{e.preventDefault();document.getElementById('k'+j).scrollIntoView({behavior:'smooth'})}},c.t)));
  m.append(toc);
  ch.forEach((c,j)=>{const sec=h('section',{class:'sheet theory',id:'k'+j},h('h2',{},c.t));
    theoryBlocks(sec,c.b);
    const done=!!S.read[k+j];const btn=h('button',{class:'btn small'+(done?'':' primary'),onclick:()=>{S.read[k+j]=!S.read[k+j];save();btn.textContent=S.read[k+j]?'Gelesen ✓':'Als gelesen markieren';btn.className='btn small'+(S.read[k+j]?'':' primary')}},done?'Gelesen ✓':'Als gelesen markieren');
    sec.append(h('div',{class:'row'},btn));m.append(sec)});
  const nT=OPEN.filter(q=>q.qs===k).length,nC=CALC.filter(c=>c.qs===k).length;
  m.append(h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{filt={hb:qs.hb,qs:k,only:''};go('tasks')}},`${nT} Aufgaben zu diesem Fach`),nC?h('button',{class:'btn',onclick:()=>go('calc')},`${nC} Rechenaufgaben`):null,window.TB_META&&TB_META[k]?h('button',{class:'btn',onclick:()=>go('tband',{k})},'Zusammenfassung Textband'):null,h('button',{class:'btn ghost',onclick:()=>go('theory')},'Alle Fächer')));
}

/* Zusammenfassungen der Lehrgangs-Textbände: je Band eigene Seite mit Kapiteln, Beispielen und Schaubildern.
 */
const TBLOAD={};
function loadTB(k){if(window.TEXTBAND&&TEXTBAND[k])return Promise.resolve(TEXTBAND[k]);
  return TBLOAD[k]||(TBLOAD[k]=new Promise((res,rej)=>{const sc=document.createElement('script');sc.src='tb_'+k+'.js';sc.onload=()=>window.TEXTBAND&&TEXTBAND[k]?res(TEXTBAND[k]):rej(new Error('leer'));sc.onerror=()=>{delete TBLOAD[k];rej(new Error('nicht geladen'))};document.head.append(sc)}))}
const tbNorm=x=>String(x).toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'ss').replace(/[^a-z]/g,'');
async function vTBand(m,arg){const {k}=arg;
  let T;try{T=await loadTB(k)}catch(e){m.append(h('section',{class:'sheet'},h('p',{},'Zusammenfassung konnte nicht geladen werden – bitte einmal mit Internet öffnen.')));return}
  const qs=QS[k]||{hb:'F'};S.read=S.read||{};const key=j=>'tb'+k+j;
  const all=T.ch.flatMap(c=>c.b);const read=T.ch.filter((c,j)=>S.read[key(j)]).length;
  m.append(h('section',{class:'hero hb-'+qs.hb},h('div',{class:'eyebrow'},'Zusammenfassung Textband'),h('h1',{},T.title),T.intro?h('p',{class:'lead'},T.intro):null,
    h('p',{class:'muted',style:'font-size:.85rem'},`${T.ch.length} Kapitel · ${all.filter(b=>b.bsp).length} Beispiele · ${all.filter(b=>b.svg).length} Schaubilder · ${read} gelesen · eigene Kurzfassung, ersetzt nicht den Textband`)));
  const toc=h('details',{class:'sheet'},h('summary',{},h('b',{},'Inhalt')),h('ol',{class:'tb-toc'+(T.ch.some(c=>/^\d/.test(c.t))?' own':'')},...T.ch.map((c,j)=>h('li',{},h('a',{href:'#tb'+j,onclick:e=>{e.preventDefault();const el=document.getElementById('tb'+j);el.open=true;el.scrollIntoView({behavior:'smooth'})}},c.t,c.pg?h('span',{class:'muted'},` · S. ${c.pg}`):null,S.read[key(j)]?' ✓':'')))));
  if(read===0&&arg.open==null)toc.open=true;m.append(toc);
  T.ch.forEach((c,j)=>{const done=!!S.read[key(j)];
    const sec=h('details',{class:'sheet theory tb-ch',id:'tb'+j},h('summary',{},h('h2',{style:'display:inline'},/^\d/.test(c.t)?c.t:`${j+1}. ${c.t}`),done?h('span',{class:'muted'},'  ✓'):null));
    sec.addEventListener('toggle',()=>{if(sec.open&&!sec.dataset.f){sec.dataset.f=1;const body=h('div');
      theoryBlocks(body,c.b);
      const btn=h('button',{class:'btn small'+(S.read[key(j)]?'':' primary'),onclick:()=>{S.read[key(j)]=!S.read[key(j)];save();btn.textContent=S.read[key(j)]?'Gelesen ✓':'Als gelesen markieren';btn.className='btn small'+(S.read[key(j)]?'':' primary')}},S.read[key(j)]?'Gelesen ✓':'Als gelesen markieren');
      body.append(h('div',{class:'row'},btn,j<T.ch.length-1?h('button',{class:'btn small ghost',onclick:()=>{sec.open=false;const nx=document.getElementById('tb'+(j+1));nx.open=true;nx.scrollIntoView({behavior:'smooth'})}},'Nächstes Kapitel →'):null));sec.append(body)}});
    m.append(sec)});
  m.append(h('div',{class:'row'},THEORY[k]?h('button',{class:'btn',onclick:()=>go('chapter',{k})},'Kurz-Theorie '+(qs.name||T.title)):null,
    typeof OPEN!=='undefined'&&OPEN.some(q=>q.qs===k)?h('button',{class:'btn primary',onclick:()=>{filt={hb:qs.hb,qs:k,only:''};go('tasks')}},'Aufgaben dazu'):null,
    h('button',{class:'btn ghost',onclick:()=>go('theory')},'Zur Theorie-Übersicht')),reportBox(`Textband-Zusammenfassung ${T.title}`,null));
  if(arg.open!=null){const el=document.getElementById('tb'+arg.open);if(el){el.open=true;setTimeout(()=>el.scrollIntoView(),60)}}
}
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
  const q=getQ(id),qs=QS[q.qs],idx=queue?queue.indexOf(id):-1;
  const card=h('article',{class:'task hb-'+qs.hb});
  card.append(h('header',{class:'task-head'},h('span',{class:'tag'},HB[qs.hb]),h('h2',{},qs.name),h('span',{class:'pts'},`Mögliche Punktzahl: ${q.p}`),h('span',{style:'margin-left:auto'},dots(boxOf(id).b))));
  const body=h('div',{class:'task-body'});card.append(body);
  body.append(h('p',{class:'situation'},q.sit));
  const ed=partsEditor(q,'p:'+id);body.append(ed.el);
  const solBox=h('div');body.append(solBox);
  const show=h('button',{class:'btn primary',onclick:async()=>{show.remove();await ed.flush();showSolution(solBox,q,ed,true)}},'Lösungshinweise zeigen');
  body.append(h('div',{class:'row'},show));
  m.append(card,reportBox(`Aufgabe ${id} · ${qs.name}`,null));
  if(queue&&queue.length>1)m.append(h('div',{class:'row'},
    h('button',{class:'btn ghost',disabled:idx<=0,onclick:()=>go('task',{id:queue[idx-1],queue})},'← Vorherige'),
    h('span',{class:'muted num'},`${idx+1} / ${queue.length}`),
    h('button',{class:'btn ghost',disabled:idx>=queue.length-1,onclick:()=>go('task',{id:queue[idx+1],queue})},'Nächste →')));
  m.append(h('button',{class:'btn ghost',onclick:()=>go('tasks')},'Zur Aufgabenliste'));
  function next(){if(queue&&idx<queue.length-1)go('task',{id:queue[idx+1],queue});else{toast('Durchgang fertig');go('home')}}
  showSolution.next=next;
}

/* Teilaufgaben a), b), c) im IHK-Aufbau */
function qPart(p,scale){const pts=Math.max(1,Math.round(p.p*(scale||1)));return h('div',{class:'qpart-head'},h('span',{class:'sub-l'},p.l),h('span',{class:'pts'},`Mögliche Punktzahl: ${pts}`))}
function partsEditor(q,key,scale){
  if(!q.parts){const ed=answerEditor(key);return {el:h('div',{style:'display:grid;gap:12px'},h('p',{class:'prompt'},q.q),ed.el),flush:()=>ed.flush(),value:()=>ed.value()}}
  const eds=q.parts.map(p=>({p,ed:answerEditor(key+':'+p.l,{title:`Deine Antwort zu ${p.l})`})}));
  const el=h('div',{class:'qparts'},...eds.map(({p,ed})=>h('section',{class:'qpart'},qPart(p,scale),h('p',{class:'prompt'},p.q),ed.el)));
  return {el,eds,flush:async()=>{for(const x of eds)await x.ed.flush()},
    value(){const vs=eds.map(x=>({l:x.p.l,v:x.ed.value()}));return {text:vs.filter(x=>x.v.text&&x.v.text.trim()).map(x=>`${x.l}) ${x.v.text.trim()}`).join('\n'),
      images:vs.flatMap(x=>[x.v.draw,x.v.photo].filter(Boolean)),draw:vs.map(x=>x.v.draw).find(Boolean)||null,photo:vs.map(x=>x.v.photo).find(Boolean)||null}}}}
async function loadParts(q,key){if(!q.parts)return await IDB.get(key);const vs=[];for(const p of q.parts){const v=await IDB.get(key+':'+p.l);if(v&&((v.text&&v.text.trim())||(v.strokes&&v.strokes.length)||v.draw||v.photo))vs.push({l:p.l,...v})}
  if(!vs.length)return null;return {parts:vs,text:vs.filter(x=>x.text&&x.text.trim()).map(x=>`${x.l}) ${x.text.trim()}`).join('\n'),images:vs.flatMap(x=>[x.draw,x.photo].filter(Boolean)),draw:vs.map(x=>x.draw).find(Boolean)||null,photo:vs.map(x=>x.photo).find(Boolean)||null}}
function solList(q){if(!q.parts)return [h('ul',{},...q.sol.map(x=>h('li',{},x)))];
  return q.parts.flatMap(p=>[h('div',{class:'sol-part'},`${p.l}) ${p.q}`,h('span',{class:'pts'},` · ${p.p} Punkte`)),h('ul',{},...p.sol.map(x=>h('li',{},x)))])}

function showSolution(box,q,ed,withRating,onScore){
  box.innerHTML='';const a=ed.value();
  const s=h('div',{class:'solution'},h('div',{class:'eyebrow'},'Lösungshinweise'),...solList(q));
  const og=smartGrade(q,ed,null,s,onScore);
  if(og){}
  else if(a.draw||a.photo){const slot=h('div',{class:'og'});s.append(slot);autoHand(q,ed,slot,onScore)}
  s.append(h('div',{class:'kwline'},`Herkunft des Themas: ${q.src==='Sammlung'?'Lösungsskripte / wiederkehrendes Prüfungsthema':'HQ-Prüfung '+q.src}`));
  box.append(s);
  if(a.text||a.draw||a.photo)box.append(aiPanel(q,ed,onScore));
  if(withRating)box.append(h('div',{class:'row'},h('button',{class:'btn small ghost',onclick:()=>{const v=ed.value();const txt=v.text&&v.text.trim()?v.text.trim():'(Meine Antwort ist handschriftlich – ich lade gleich ein Foto hoch.)';toAbo(`Bewerte Aufgabe ${q.id}: ${txt}`)}},'↗ Von meinem KI-Abo bewerten lassen')));
  if(withRating){box.append(h('div',{class:'eyebrow',style:'margin-top:8px'},'Wie gut konntest du es?'),
    h('div',{class:'rate'},
      h('button',{class:'btn r0',onclick:()=>{rate(q.id,0);showSolution.next()}},'Nicht gekonnt · morgen'),
      h('button',{class:'btn r1',onclick:()=>{rate(q.id,1);showSolution.next()}},'Teilweise · bald wieder'),
      h('button',{class:'btn r2',onclick:()=>{rate(q.id,2);showSolution.next()}},(d=>`Gekonnt · ${d===1?'morgen':'in '+d+' Tagen'}`)(INTERVAL[Math.min(5,boxOf(q.id).b+1)]))))}
}

/* ───────── Offline-Bewertung ohne KI ───────── */
const STOP=new Set('der die das den dem des ein eine einer eines einem einen und oder für mit von zu zum zur im in am an auf aus bei bis durch über unter nach vor ist sind wird werden wurde kann können muss müssen soll sollen nicht auch als wie was wer dass sich es er sie wir ihr man so z.b. bzw usw etc je pro bzw. ggf. ggf sowie mehr sehr alle alles jede jeder jedes oft hat haben sein ihre ihren seine seinen dieser diese dieses hier dort nur noch schon dabei damit davon dafür dazu wenn weil damit ob da um'.split(' '));
const stem=w=>{w=w.toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'ss');return w.length>6?w.slice(0,6):w.replace(/(en|er|es|e|n|s)$/,'')};
const terms=t=>String(t).toLowerCase().split(/[^a-zäöüß0-9]+/).filter(w=>w.length>2&&!STOP.has(w)).map(stem);
function termHit(w,have){return have.has(w)||[...have].some(x=>x.length>=5&&w.length>=5&&(x.startsWith(w)||w.startsWith(x)))}
function pointHit(sol,ans){const have=new Set(ans);
  const body=sol.replace(/^[^:]{0,45}:/,'');const frags=body.split(/[,;]|\bz\. ?b\.|\bbzw\./i).map(terms).filter(f=>f.length);
  if(frags.length>=3){const m=frags.filter(f=>f.some(w=>termHit(w,have))).length;return Math.min(1,m/3)}
  const want=[...new Set(terms(sol))];if(!want.length)return 0;
  const n=want.filter(w=>termHit(w,have)).length;return n>=Math.min(want.length,Math.max(1,Math.ceil(want.length*0.34)))?1:n/Math.max(2,want.length)}
function handVals(q,ed){ // je Teilaufgabe der Antwortwert (Text, Striche, Foto)
  if(!q.parts)return [{l:'',v:ed.value()}];
  if(ed.eds)return ed.eds.map(x=>({l:x.p.l,v:x.ed.value()}));
  return q.parts.map(p=>({l:p.l,v:(ed.parts||[]).find(v=>v.l===p.l)||{}}))}
function offlineGrade(q,ed,over,sem){over=over||{};
  const hv=handVals(q,ed),txt=l=>{const own=((hv.find(x=>x.l===l)||{}).v||{}).text||'';return own.trim()?own:(over[l]||'')};
  const parts=q.parts?q.parts.map(p=>({l:p.l,p:p.p,sol:p.sol,text:txt(p.l)})):[{l:'',p:q.p,sol:q.sol,text:txt('')}];
  if(!parts.some(x=>x.text.trim().length>10))return null;
  let tot=0;const el=h('div',{class:'og'},h('div',{class:'eyebrow'},sem?'Bewertung mit App-KI (offline, Schätzung)':'Bewertung ohne KI (Schätzung)'));
  for(const x of parts){const ans=terms(x.text),sh=sem&&sem[x.l],hits=x.sol.map((sl,i)=>x.text.trim()?Math.max(pointHit(sl,ans),sh?sh[i]||0:0):0),nh=hits.reduce((a,b)=>a+b,0);
    const need=Math.max(1,Math.ceil(x.sol.length*0.8)),pts=x.text.trim()?Math.round(x.p*Math.min(1,nh/need)):0;tot+=pts;
    el.append(h('div',{class:'og-part'},h('b',{},(x.l?x.l+') ':'')+`ca. ${pts} von ${x.p} Punkten`),h('ul',{},...x.sol.map((sl,i)=>h('li',{class:hits[i]>=.99?'hit':hits[i]>0?'part':'miss'},(hits[i]>=.99?'✓ ':hits[i]>0?'◐ ':'✗ ')+sl)))))}
  el.prepend(h('div',{class:'num',style:'font-weight:600;font-size:1.1rem'},`ca. ${tot} von ${q.p} Punkten`));
  el.append(h('p',{class:'muted',style:'margin:0;font-size:.85rem'},sem?'Die App-KI erkennt sinngemäß richtige Antworten auch mit eigenen Worten – offline auf dem Gerät. Es bleibt eine Schätzung, im Zweifel selbst ehrlich bewerten.':AppKI.installed()?'App-KI prüft die Antwort … (einige Sekunden)':'Die App vergleicht deine Fachbegriffe mit den Lösungspunkten. Mit anderen Worten richtig Erklärtes erkennt sie nicht immer – dafür unter „Mehr“ die App-KI laden (kostenlos, offline).'));
  return {el,pts:tot,parts}}
/* Bewertung anzeigen und mit der App-KI verfeinern, sobald sie bereit ist */
function smartGrade(q,ed,over,mount,onScore){
  const og=offlineGrade(q,ed,over);if(!og)return null;mount.append(og.el);onScore&&onScore(og.pts,'auto');
  if(AppKI.installed())(async()=>{if(!(await AppKI.ensure()))return;const sem={};
    for(const x of og.parts)sem[x.l]=x.text.trim()?await AppKI.gradePoints(x.sol,x.text):x.sol.map(()=>0);
    const og2=offlineGrade(q,ed,over,sem);if(og2&&og.el.isConnected){og.el.replaceWith(og2.el);onScore&&onScore(og2.pts,'auto')}})();
  return og}

/* Handschrift/Foto lesen und dann offline bewerten */
async function autoHand(q,ed,slot,onScore){
  const hv=handVals(q,ed).filter(x=>!(x.v.text&&x.v.text.trim())&&((x.v.strokes&&x.v.strokes.length)||x.v.photo));
  if(!canRead()){slot.append(h('div',{class:'kwline'},'Vergleiche deine handschriftliche Antwort mit den Hinweisen. '+handHint()));return}
  slot.append(h('div',{class:'muted'},'Handschrift wird gelesen …'));
  const over={},shown=[];let via='',err='';
  for(const x of hv){const r=await readHand(x.v,false);if(r&&r.text){over[x.l]=r.text;via=r.via;shown.push(x)}else if(r&&r.err)err=r.err}
  slot.innerHTML='';
  if(!shown.length){slot.append(h('div',{class:'kwline'},(err?'Handschrift konnte nicht gelesen werden: '+err+'. ':'Keine Schrift erkannt. ')+'Vergleiche selbst mit den Hinweisen.'));return}
  const res=h('div');
  const run=()=>{res.innerHTML='';smartGrade(q,ed,over,res,onScore)};
  slot.append(h('details',{},h('summary',{},`So hat die App deine Schrift gelesen (${via}) – antippen zum Korrigieren`),
    ...shown.map(x=>{const ta=h('textarea',{class:'readback',oninput:e=>{over[x.l]=e.target.value}});ta.value=over[x.l];return h('div',{},x.l?h('b',{},x.l+')'):null,ta)}),
    h('button',{class:'btn small',onclick:run},'Neu bewerten')),res);
  run()}

/* ───────── Antwort-Editor: Tippen · Stift · Foto ───────── */
function answerEditor(key,opts={}){
  let data={text:'',strokes:[],draw:null,photo:null,mode:opts.mode||'text'};
  const el=h('div',{class:'grid',style:'display:grid;gap:10px'});
  const modes=h('div',{class:'answer-modes'});const area=h('div');el.append(h('div',{class:'eyebrow'},opts.title||'Deine Antwort'),modes,area);
  let pad=null,saveT=null;
  const persist=()=>{clearTimeout(saveT);saveT=setTimeout(()=>IDB.set(key,{text:data.text,strokes:data.strokes,draw:data.draw,photo:data.photo,mode:data.mode,ts:Date.now()}),400)};
  function setMode(md){if(pad){data.strokes=pad.strokes();data.draw=pad.png()}pad=null;data.mode=md;drawModes();area.innerHTML='';
    if(md==='text'){const ta=h('textarea',{id:'ta-'+key,class:opts.grid?'mono':null,placeholder:opts.grid?'Rechenweg: Formel = Einsetzen = Ergebnis …':'Antwort in Stichpunkten oder ganzen Sätzen …',oninput:e=>{data.text=e.target.value;persist()}});ta.value=data.text;area.append(ta)}
    else if(md==='draw'){pad=Pad(area,data.strokes,()=>{data.strokes=pad.strokes();data.draw=null;persist()},{grid:opts.grid})}
    else{area.append(photoBox(data.photo,p=>{data.photo=p;persist()}))}}
  function drawModes(){modes.innerHTML='';for(const[k,l]of(opts.grid?[['draw','Mit Stift rechnen'],['text','Tippen'],['photo','Papier fotografieren']]:[['text','Tippen'],['draw','Mit Stift schreiben'],['photo','Papier einscannen']]))
    modes.append(h('button',{class:'chip','aria-pressed':String(data.mode===k),onclick:()=>setMode(k)},l+(k==='text'&&data.text?' ✓':k==='draw'&&data.strokes.length?' ✓':k==='photo'&&data.photo?' ✓':'')))}
  if(opts.fresh)IDB.del(key);else IDB.get(key).then(v=>{if(v)Object.assign(data,v,{strokes:v.strokes||[]});setMode(data.mode||opts.mode||'text')});
  setMode(opts.mode||'text');
  return {el,async flush(){if(pad){data.strokes=pad.strokes();data.draw=data.strokes.length?pad.png():null}clearTimeout(saveT);await IDB.set(key,{...data,ts:Date.now()});drawModes()},
    value(){const st=pad?pad.strokes():data.strokes;return {text:data.text,strokes:st,draw:st.length?(pad?pad.png():data.draw):null,photo:data.photo}}};
}

/* Schreibfläche mit Stift (Druckstufen, Handballen-Erkennung, Radierer, Rückgängig) */
function Pad(container,initial,onchange,opts={}){
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
    ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--rule').trim()||'#D4E0EC';ctx.lineWidth=1;
    if(opts.grid){for(let y=20;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5);ctx.stroke()}for(let x=20;x<W;x+=20){ctx.beginPath();ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,H);ctx.stroke()}return}
    for(let y=40;y<H;y+=34){ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(W,y+.5);ctx.stroke()}
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
  const p=h('div',{class:'ai'},h('div',{class:'head'},S.ai.key?`KI-Bewertung (${aiName()})`:'KI-Korrektur (optional)'));
  if(!S.ai.key){p.append(h('p',{class:'muted',style:'margin:0'},'Für eine echte Prüfer-Bewertung (auch Handschrift und Fotos, mit Begründung) unter „Mehr“ einen eigenen KI-Schlüssel verbinden – Claude, ChatGPT oder Gemini (Gemini auch kostenlos). Braucht Internet.'));return p}
  const out=h('div');const b=h('button',{class:'btn',onclick:async()=>{b.disabled=true;b.textContent='Wird korrigiert …';out.innerHTML='';
    try{const r=await aiQueued(()=>aiGrade(q,ed.value()));out.append(...[h('div',{class:'num',style:'font-weight:600'},`${r.punkte} von ${q.p} Punkten`),
      r.transkript?h('details',{},h('summary',{},'So wurde deine Handschrift gelesen'),h('p',{},r.transkript)):null,
      r.gut?.length?h('div',{},h('b',{},'Gut: '),r.gut.join(' · ')):null,r.fehlt?.length?h('div',{},h('b',{},'Fehlt/ungenau: '),r.fehlt.join(' · ')):null,r.tipp?h('div',{class:'tip'},r.tipp):null].filter(Boolean));
      onScore&&onScore(r.punkte);b.textContent='Erneut korrigieren'}
    catch(e){out.append(h('p',{style:'color:var(--bad);margin:0'},e.message));b.textContent='Nochmal versuchen'}b.disabled=false}},'Antwort bewerten lassen');
  p.append(b,out);if(S.aiAuto!==false)setTimeout(()=>{if(b.isConnected)b.click()},60);return p;
}
async function aiGrade(q,a){
  let prompt='';
  const imgs=(a.images&&a.images.length)?a.images:[a.draw,a.photo].filter(Boolean);
  prompt=`Du bist erfahrener IHK-Prüfer für die Prüfung „Geprüfter Industriemeister Metall – Handlungsspezifische Qualifikationen“ und korrigierst fair nach den Lösungshinweisen. Nachvollziehbare alternative Antworten werden gewertet; bei Aufgaben mit einer festen Anzahl zählen nur die ersten n Nennungen.

Situation: ${q.sit}
${q.parts?q.parts.map(p=>`Teilaufgabe ${p.l}) ${p.q} (Mögliche Punktzahl: ${p.p})\nLösungshinweise ${p.l}):\n- ${p.sol.join('\n- ')}`).join('\n\n')+`\nMögliche Punktzahl gesamt: ${q.p}`:`Aufgabe: ${q.q}\nMögliche Punktzahl: ${q.p}\nLösungshinweise:\n- ${q.sol.join('\n- ')}`}

Antwort des Prüflings:
${a.text?'Getippter Text:\n'+a.text:''}${(a.draw||a.photo||(a.images&&a.images.length))?'\n(Die handschriftliche Antwort befindet sich in den Bildern oben. Lies sie sorgfältig.)':''}

Antworte NUR mit JSON in genau diesem Format:
{"punkte": <ganze Zahl 0-${q.p}>, "transkript": "<Text der handschriftlichen Antwort, leer wenn keine>", "gut": ["..."], "fehlt": ["..."], "tipp": "<ein konkreter Satz, wie die Antwort volle Punkte bekommt>"}`;
  const t=await aiCall({msgs:[{role:'user',text:prompt,imgs:imgs.slice(0,6)}],max:1200});const mm=t.match(/\{[\s\S]*\}/);if(!mm)throw new Error('Antwort der KI nicht lesbar.');
  const o=JSON.parse(mm[0]);o.punkte=Math.max(0,Math.min(q.p,Math.round(+o.punkte||0)));return o;
}

/* ───────── RECHNEN ───────── */
function vCalc(m){
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},`${CALC.length} Aufgabentypen · immer neue Zahlen`),h('h1',{},'Rechentrainer'),h('p',{class:'lead'},'Taschenrechner und Tabellenbuch daneben legen, Ergebnis eintragen, prüfen. Der Lösungsweg zeigt jede Zwischenrechnung.')));
  for(const hb of['T','O']){const l=h('div',{class:'list'});
    for(const c of CALC.filter(c=>QS[c.qs].hb===hb)){const st=S.calc[c.id];l.append(h('button',{class:'li',onclick:()=>go('calcrun',{id:c.id})},h('span',{class:'t'},c.title),h('span',{class:'num muted'},st?`${st.ok}/${st.tot}`:'neu'),h('span',{class:'s'},QS[c.qs].name+(c.src?' · Prüfung '+c.src:''))))}
    m.append(h('section',{class:'sheet hb-'+hb},h('h2',{},hb==='T'?'Technik':'Organisation & Kostenwesen'),l))}
}
function vCalcRun(m,{id,rand}){
  const c=CALC.find(x=>x.id===id);let t=c.gen();const qs=QS[c.qs];const tbm=!!(S.tbMode!==false&&t.tb);
  const card=h('article',{class:'task hb-'+qs.hb});
  card.append(h('header',{class:'task-head'},h('span',{class:'tag'},HB[qs.hb]),h('h2',{},c.title),h('span',{class:'pts'},qs.name)));
  const body=h('div',{class:'task-body'});card.append(body);
  if(t.tb)body.append(h('div',{class:'row'},h('button',{class:'chip','aria-pressed':String(S.tbMode!==false),onclick:()=>{S.tbMode=(S.tbMode===false);save();go('calcrun',{id})}},'Wie in der Prüfung: Werte selbst nachschlagen'+(S.tbMode!==false?' ✓':'')),h('span',{class:'muted',style:'font-size:.85rem'},S.tbMode!==false?'Schnittwerte und Kennwerte stehen nicht in der Aufgabe – Tabellenbuch nehmen':'Tabellenwerte sind vorgegeben')));
  body.append(taskText(t.text));
  body.append(givenEl(t,tbm));
  let tbRows=[];
  if(tbm){tbRows=t.tb.map((x,i)=>{const inp=h('input',{id:`tb-${id}-${i}`,inputmode:'decimal',autocomplete:'off',placeholder:'Tabellenwert'});return {x,inp,r:h('div',{class:'ans'},h('label',{for:inp.id},x.l),inp,h('span',{class:'u'},x.u))}});
    body.append(h('div',{class:'eyebrow'},'1. Werte im Tabellenbuch nachschlagen'),h('div',{class:'ansgrid'},...tbRows.map(x=>x.r)))}
  const inA=anlageIdx(t);
  const rows=t.ans.map((a,i)=>{const inp=h('input',{id:`ans-${id}-${i}`,inputmode:'decimal',autocomplete:'off',placeholder:inA.has(i)?'':'Ergebnis','aria-label':a.l});const r=inA.has(i)?h('div',{class:'acell'},inp):h('div',{class:'ans'},h('label',{for:inp.id},partLabel(id,i,a.l)),inp,h('span',{class:'u'},a.u));return {a,inp,r}});
  const sheet=answerEditor('calc:'+id,{grid:true,mode:'draw',title:'Rechenblatt',fresh:true});sheet.el.classList.add('rechenblatt');
  body.append(sheet.el);
  if(t.anlage)body.append(anlageEl(t,k=>rows[k].r));
  const rest=rows.filter((x,i)=>!inA.has(i));
  if(rest.length){body.append(h('div',{class:'eyebrow'},tbm?'2. Deine Ergebnisse (mit deinen Tabellenwerten)':t.anlage?'Weitere Ergebnisse':'Deine Ergebnisse'));
  body.append(h('div',{class:'ansgrid'},...rest.map(x=>x.r)))}
  const res=h('div',{style:'display:grid;gap:12px'});
  function solve(){ // im Tabellenbuch-Modus mit den eigenen Werten rechnen (Folgefehler werden nicht bestraft)
    if(!tbm)return {sol:t,note:null};
    const ov={};let all=true;const cmp=[];for(const x of tbRows){const v=parseNum(x.inp.value);if(isFinite(v)){ov[x.x.k]=v}else all=false;
      const ref=t.P[x.x.k];const okT=isFinite(v)&&Math.abs(v-ref)<=Math.abs(ref)*(x.x.tol??0.03);x.r.classList.toggle('ok',okT);x.r.classList.toggle('no',!okT);x.r.querySelector('.exp')?.remove();x.r.append(h('span',{class:'exp'},`Richtwert${x.x.tol>0.05?' ca.':''}: ${String(ref).replace('.',',')} ${x.x.u}`+(x.x.tol>0.05?' (Tabellenbücher nennen Bereiche)':'')));cmp.push(okT)}
    const sol=all?c.gen({...t.P,...ov}):t;
    return {sol,note:all?(cmp.every(Boolean)?'Tabellenwerte stimmen.':'Deine Tabellenwerte weichen ab – gerechnet wird trotzdem mit deinen Werten (wie in der Prüfung: Folgefehler zählen nicht doppelt).'):'Ohne Tabellenwerte wird mit den Richtwerten verglichen.'}}
  async function autoFill(){
    if(!rows.every(x=>!x.inp.value.trim())||!tbRows.every(x=>!x.inp.value.trim()))return null;
    const v=sheet.value();if(!(v.strokes&&v.strokes.length)&&!v.photo)return null;
    if(!canRead())return {hint:handHint()};
    chk.disabled=true;chk.textContent='Rechenblatt wird gelesen …';const r=await readHand(v,true);chk.textContent='Prüfen';chk.disabled=false;
    if(!r||!r.text)return {err:(r&&r.err)||'Keine Schrift erkannt'};
    const fill=calcFill(r.text,t,tbm);tbRows.forEach((x,i)=>{if(fill.tb[i]!=null)x.inp.value=fill.tb[i]});
    const sol=solve().sol,res2=calcFillRes(fill,sol);rows.forEach((x,i)=>{if(res2[i]!=null)x.inp.value=res2[i]});
    return {text:r.text,via:r.via,n:res2.filter(x=>x!=null).length}}
  const chk=h('button',{class:'btn primary',onclick:async()=>{const af=await autoFill();const {sol,note}=solve();let ok=0;rows.forEach((x,i)=>{const a=sol.ans[i];const v=parseNum(x.inp.value),tol=a.tol??0.01;const good=isFinite(v)&&Math.abs(v-a.v)<=Math.max(Math.abs(a.v)*tol,a.abs??0.015);if(good)ok++;
      x.r.classList.toggle('ok',good);x.r.classList.toggle('no',!good);x.r.querySelector('.exp')?.remove();x.r.append(h('span',{class:'exp'},`Richtig: ${f(a.v)} ${a.u}`))});
    const st=S.calc[id]||{ok:0,tot:0};st.tot++;if(ok===rows.length)st.ok++;S.calc[id]=st;logDay('c');markDay();save();
    res.innerHTML='';res.append(h('div',{class:'eyebrow'},ok===rows.length?'Alles richtig':`${ok} von ${rows.length} richtig`),note?h('div',{class:'tip'},note):null,h('div',{class:'solution'},h('div',{class:'eyebrow'},'Lösungsweg'),renderSteps(sol.steps)),sol.tip?h('div',{class:'tip'},h('b',{},'Merke: '),sol.tip):null);
    if(af)res.prepend(af.hint?h('div',{class:'tip'},'Rechenblatt nicht ausgewertet. '+af.hint):af.err?h('div',{class:'tip'},'Rechenblatt konnte nicht gelesen werden: '+af.err):
      h('details',{class:'readinfo'},h('summary',{},`Ergebnisse aus deinem Rechenblatt gelesen (${af.via}): ${af.n} von ${rows.length} gefunden – antippen für den gelesenen Text`),h('pre',{},af.text),h('p',{class:'muted',style:'margin:0'},'Nicht gefunden heißt: Ergebnis falsch, fehlt oder unleserlich. Du kannst es oben eintippen und die Aufgabe neu laden.')));
    chk.disabled=true}},'Prüfen');
  body.append(h('div',{class:'row'},chk,h('button',{class:'btn ghost',onclick:()=>{res.innerHTML='';res.append(h('div',{class:'solution'},h('div',{class:'eyebrow'},'Lösungsweg'),renderSteps(t.steps)))}},'Lösungsweg ohne Prüfen')),res);
  const sk=typeof sketchFor==='function'?sketchFor(id,t):null;if(sk)body.querySelector('.given-block').after(sk);
  m.append(card,reportBox(`Rechenaufgabe ${id} · ${c.title}`,'Zahlen der Aufgabe: '+t.given.map(g=>g[0]+' = '+g[1]).join('; ')+(t.gtab?'\nTabelle: '+t.gtab.rows.map(r=>r.join(' | ')).join('; '):'')+'\nRichtige Ergebnisse laut App: '+t.ans.map(a=>a.l+' = '+f(a.v)+' '+a.u).join('; ')),h('div',{class:'row'},h('button',{class:'btn',onclick:()=>go('calcrun',{id})},'Gleicher Typ, neue Zahlen'),h('button',{class:'btn',onclick:()=>go('calcrun',{id:pick(CALC).id,rand:true})},'Zufälliger Typ'),h('button',{class:'btn ghost',onclick:()=>go('calc')},'Übersicht')));
}

const ANSPART={c_umfang:'aab',c_personal:'ab',c_rautiefe:'abc',c_hydr:'abcd',c_eantrieb:'aabb',c_flaschenzug:'abc',c_mehrarbeit:'abc'};
/* Anlage zum Ausfüllen (Vordruck wie in der IHK-Prüfung): Zellen {a:k} sind Eingabefelder für t.ans[k] */
function anlageIdx(t){const s=new Set();if(t.anlage)for(const A of [].concat(t.anlage))for(const r of A.rows)for(const c of (r.c||r))if(c&&typeof c==='object'&&'a' in c)s.add(c.a);return s}
function anlageEl(t,cellFor){const L=[].concat(t.anlage);if(L.length>1)return h('div',{style:'display:grid;gap:12px'},...L.map(A=>anlageEl({anlage:A},cellFor)));const A=L[0];const tb=h('table',{class:'anlage'});
  if(A.head)tb.append(h('thead',{},h('tr',{},...A.head.map(x=>h('th',{},x)))));
  const body=h('tbody');for(const r0 of A.rows){const r=r0.c||r0,sum=r0.s||(typeof r[0]==='string'&&/^=/.test(r[0]));
    body.append(h('tr',{class:sum?'sum':''},...r.map((c,j)=>{if(c&&typeof c==='object'&&'a' in c)return h('td',{class:'in'},cellFor(c.a),c.u?h('span',{class:'cu'},c.u):null);
      if(c==null)return h('td',{class:'x'});return h(j===0?'th':'td',{scope:j===0?'row':null,class:j>0&&String(c).length>10?'wr':null,colspan:r0.span&&j===r.length-1?r0.span:null},String(c))})))}
  tb.append(body);
  return h('div',{class:'anlage-block'},h('div',{class:'anlage-title'},h('span',{class:'tag'},A.nr||'Anlage'),h('b',{},A.title)),A.note?h('p',{class:'muted',style:'margin:0;font-size:.85rem'},A.note):null,h('div',{class:'gtab-wrap'},tb))}
/* Gegebene Werte: beschriftete Liste + Tabelle für Varianten (bricht auf dem Handy sauber um) */
function givenEl(t,hideTb){
  const items=(t.given||[]).filter(g=>!(hideTb&&g[2]==='tb'));
  const w=h('div',{class:'given-block'},h('div',{class:'eyebrow'},'Gegeben'));
  if(t.gtab){const tb=h('table',{class:'gtab'});tb.append(h('thead',{},h('tr',{},...t.gtab.head.map(x=>h('th',{},x)))),h('tbody',{},...t.gtab.rows.map(r=>h('tr',{},...r.map((x,j)=>h(j===0?'th':'td',{scope:j===0?'row':null},String(x)))))));w.append(h('div',{class:'gtab-wrap'},tb))}
  if(items.length)w.append(h('dl',{class:'given-list'},...items.map(([a,b])=>h('div',{},h('dt',{},a),h('dd',{},String(b))))));
  return w}
function partLabel(id,k,l){const p=ANSPART[id];return p&&p[k]?p[k]+') '+l:l}
/* Aufgabentext: Teilaufgaben a), b), c) … untereinander */
function taskText(txt){
  const parts=String(txt).split(/\s(?=[a-h]\)\s)/);
  if(parts.length<2)return h('p',{class:'prompt',style:'font-weight:400'},txt);
  const w=h('div',{class:'subtasks'});if(parts[0].trim())w.append(h('p',{class:'prompt',style:'font-weight:400;margin:0'},parts[0].trim()));
  const ol=h('div',{class:'subs'});
  for(const p of parts.slice(1)){const m=p.match(/^([a-h])\)\s*([\s\S]*)$/);ol.append(h('div',{class:'sub'},h('span',{class:'sub-l'},m[1]+')'),h('span',{},m[2].trim())))}
  w.append(ol);return w}

/* Lösungsweg in Prüfungsbogen-Schreibweise */
function mathHTML(str){return esc(String(str)).replace(/⟦([^¦⟧]*)¦([^⟧]*)⟧/g,'<span class="frac"><span>$1</span><span>$2</span></span>')}
function renderSteps(steps){const w=h('div',{class:'work'});
  for(const s of steps){
    if(typeof s==='string'){w.append(h('p',{class:'w-t'},s));continue}
    if(s.h){w.append(h('div',{class:'w-h'},s.h));continue}
    if(s.t){w.append(h('p',{class:'w-t'},s.t));continue}
    if(s.f){const g=h('div',{class:'w-eq'});s.f.forEach((x,k)=>{g.append(h('span',{class:'w-l'},k===0?s.l:''),h('span',{class:'w-s'},'='),h('span',{class:'w-r'+(k===s.f.length-1?' res':''),html:mathHTML(x)}))});w.append(g);continue}
    if(s.tab){const rows=s.tab;const tb=h('table',{class:'w-tab'});rows.forEach((r,k)=>{const head=s.head&&k===0;const sum=r[r.length-1]==='s';const cells=sum?r.slice(0,-1):r;
      tb.append(h('tr',{class:sum?'sum':''},...cells.map((c,j)=>h(head?'th':'td',{class:j>0?'n':''},String(c)))))});w.append(h('div',{class:'tablewrap'},tb))}}
  return w}

/* ───────── PRÜFUNGSSIMULATION ───────── */
function noteFor(p){return p>=92?'sehr gut (1)':p>=81?'gut (2)':p>=67?'befriedigend (3)':p>=50?'ausreichend (4)':p>=30?'mangelhaft (5)':'ungenügend (6)'}
let EX=null;try{EX=JSON.parse(localStorage.getItem('imm_exam')||'null')}catch(e){}
const saveEx=()=>{try{localStorage.setItem('imm_exam',JSON.stringify(EX))}catch(e){}};
function vExam(m){
  if(EX&&!EX.done){m.append(h('section',{class:'sheet'},h('h2',{},'Laufende Prüfungssimulation'),h('p',{class:'lead'},`${EX.sit==='T'?'Situationsaufgabe 1 · Technik':'Situationsaufgabe 2 · Organisation'} – begonnen ${new Date(EX.start).toLocaleString('de-DE')}`),
    h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>go('examrun',{i:0})},'Fortsetzen'),h('button',{class:'btn ghost',onclick:()=>{EX=null;saveEx();go('exam')}},'Verwerfen'))));return}
  m.append(examList());
  m.append(fgList());
  m.append(h('section',{class:'sheet'},h('h2',{},'Prüfungsnachbau'),h('p',{class:'lead'},`${NACHBAU.length} zusätzliche Aufgaben zu Themen aus den Prüfungen 2020–2025, die im Hauptkatalog nicht vorkommen. Sie sind getrennt vom normalen Aufgabenkatalog.`),
    h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>go('nachbau')},'Prüfungsnachbau öffnen'))));
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
function examList(){
  const sec=h('section',{class:'sheet'},h('h2',{},'IHK-Prüfungen 2020–2025'),h('p',{class:'lead'},'Alle Aufgaben der letzten Prüfungen als Themenliste – mit passender Übungsaufgabe oder Rechenaufgabe zum Nachüben.'));
  const l=h('div',{class:'list'});
  for(const x of EXAMS){const n=x.T.length+x.O.length,mapped=n;
    l.append(h('button',{class:'li',onclick:()=>go('examidx',{id:x.id})},h('span',{class:'t'},`${x.s} ${x.j}`),h('span',{class:'num muted'},`${n} Aufg.`),h('span',{class:'s'},`${x.firma} · alle Aufgaben übbar`)))}
  sec.append(l);return sec}
function vExamIdx(m,{id}){
  const x=EXAMS.find(e=>e.id===id);const pm=PDFMAP[id];
  m.append(h('section',{class:'hero'},h('div',{class:'eyebrow'},'HQ-Prüfung Industriemeister Metall'),h('h1',{},`${x.s} ${x.j}`),h('p',{class:'lead'},`Ausgangssituation: ${x.firma}. Die Aufgaben sind hier mit eigenen Kurztiteln aufgeführt; geübt wird mit nachgebauten Aufgaben.`)));
  for(const sit of ['T','O']){const list=x[sit];const sec=h('section',{class:'sheet hb-'+(sit==='T'?'T':'O')},h('h2',{},sit==='T'?'1. Situationsaufgabe · Technik':'2. Situationsaufgabe · Organisation'));
    const tb=h('div',{class:'list'});
    list.forEach((t,i)=>{const qs=QS[t.q];const acts=h('span',{class:'row',style:'gap:6px;justify-content:flex-end'});
      if(t.c)acts.append(h('button',{class:'btn small primary',onclick:()=>go('calcrun',{id:t.c})},'Rechnen'));
      if(t.o)acts.append(h('button',{class:'btn small',onclick:()=>go('task',{id:t.o,queue:[t.o]})},'Üben'));
      const nb=(!t.o)?nbFor(id,sit,i+1):null;
      if(nb)acts.append(h('button',{class:'btn small',onclick:()=>go('task',{id:nb.id,queue:[nb.id]})},'Nachbau'));
      if(!t.c&&!t.o&&!nb)acts.append(h('button',{class:'btn small ghost',onclick:()=>go('chapter',{k:t.q})},'Theorie'));
      const pa=pm&&pm[sit].a[i+1],pl=pm&&pm[sit].l[i+1];
      if(pa)acts.append(pdfBtn(id,pa[0],pa[1],'Original','ghost'));
      for(const an of (pm?pm[sit].anl:[]))if((an[3]||[]).includes(i+1))acts.append(pdfBtn(id,an[1],an[2],an[0].split(' zu ')[0],'ghost'));if(pl)acts.append(pdfBtn(id,pl[0],pl[1],'Lösung','ghost'));
      tb.append(h('div',{class:'li',style:'cursor:default'},h('span',{class:'t'},`Aufgabe ${i+1}: ${t.t}`),acts,h('span',{class:'s'},qs.name)))});
    const playable=list.filter((t,i)=>t.c||t.o||nbFor(id,sit,i+1)).length;
    if(pm&&pm[sit].anl.length){let k=0;sec.append(h('div',{class:'eyebrow'},'Zeichnungen und Anlagen'),h('div',{class:'row'},...pm[sit].anl.map(a=>pdfBtn(id,a[1],a[2],a[0]==='Anlage'?`Anlage S. ${a[2]}`:a[0],'')) ))}
    sec.append(tb,h('div',{class:'row'},h('button',{class:'btn',onclick:()=>{startExamFrom(x,sit);go('examrun',{i:0})}},`Diese Situationsaufgabe nachspielen (${playable} Aufgaben, 240 min)`)));
    m.append(sec)}
  m.append(pdfPanel(id,()=>go('examidx',{id})));
  m.append(h('button',{class:'btn ghost',onclick:()=>go('exam')},'Alle Prüfungen'));
}
function startExamFrom(x,sit){
  const items=[];for(const t of x[sit]){if(t.c){const c=CALC.find(k=>k.id===t.c);const g=c.gen();items.push({k:'c',id:c.id,p:10,t:{text:g.text,given:g.given,gtab:g.gtab,anlage:g.anlage,ans:g.ans,steps:g.steps,P:g.P,tb:g.tb},inp:[]})}else if(t.o){const q=OPEN.find(k=>k.id===t.o);items.push({k:'o',id:q.id,p:q.p})}else{const nb=nbFor(x.id,sit,x[sit].indexOf(t)+1);if(nb)items.push({k:'o',id:nb.id,p:nb.p})}}
  const sum=items.reduce((a,b)=>a+b.p,0);items.forEach(i=>i.w=i.p*100/sum);
  EX={sit,dur:240,start:Date.now(),items,done:false,src:`${x.s} ${x.j}`};saveEx();
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function startExam(sit,dur){
  const n=dur===60?4:dur===120?7:11,nc=Math.round(n/3),no=n-nc;
  const core=sit==='T'?['BT','FT','MT']:['KW','PS','AUG'];
  const nF=Math.max(1,Math.round(no/3));
  const op=[...shuffle(OPEN.filter(q=>core.includes(q.qs))).slice(0,no-nF),...shuffle(OPEN.filter(q=>QS[q.qs].hb==='F')).slice(0,nF)];
  const cc=shuffle(CALC.filter(c=>sit==='T'?['BT','FT','MT'].includes(c.qs):['KW','PS','AUG'].includes(c.qs))).slice(0,nc);
  const items=shuffle([...op.map(q=>({k:'o',id:q.id,p:q.p})),...cc.map(c=>{const t=c.gen();return {k:'c',id:c.id,p:8,t:{text:t.text,given:t.given,gtab:t.gtab,anlage:t.anlage,ans:t.ans,steps:t.steps,P:t.P,tb:t.tb},inp:[]}})]);
  // auf 100 Punkte skalieren
  const sum=items.reduce((a,x)=>a+x.p,0);items.forEach(x=>x.w=x.p*100/sum);
  EX={sit,dur,start:Date.now(),items,done:false};saveEx();
}
function vExamRun(m,{i}){
  const it=EX.items[i];let tid=null;
  const tm=h('div',{class:'timer'});const tick=()=>{const left=EX.start+EX.dur*6e4-Date.now();if(left<=0){tm.textContent='Zeit abgelaufen';tm.classList.add('low');return}const mm=Math.floor(left/6e4),ss=Math.floor(left%6e4/1e3);tm.textContent=`${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;tm.classList.toggle('low',left<10*6e4)};tick();tid=setInterval(tick,1000);cleanup.push(()=>clearInterval(tid));
  let ed=null;const leave=async(fn)=>{if(ed)await ed.flush();if(it.k==='c'){{const arr=[];for(const x of m.querySelectorAll('input[id^="ex-'+i+'-"]')){const kk=+x.id.split('-').pop();arr[kk]=x.value}it.inp=Array.from({length:it.t.ans.length},(_,kk)=>arr[kk]||'')}saveEx()}fn()};
  const navb=h('div',{class:'examnav'},...EX.items.map((x,k)=>h('button',{class:k===i?'cur':'','aria-label':'Aufgabe '+(k+1),onclick:()=>leave(()=>go('examrun',{i:k}))},String(k+1))));
  m.append(h('section',{class:'sheet'},h('div',{class:'row',style:'justify-content:space-between'},h('div',{},h('div',{class:'eyebrow'},EX.sit==='T'?'1. Situationsaufgabe · Technik':'2. Situationsaufgabe · Organisation'),h('div',{class:'muted'},`Aufgabe ${i+1} von ${EX.items.length}`)),tm),navb));
  const card=h('article',{class:'task'});const body=h('div',{class:'task-body'});
  if(it.k==='o'){const q=getQ(it.id),qs=QS[q.qs];card.classList.add('hb-'+qs.hb);
    card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${i+1}`),h('span',{class:'pts'},`Mögliche Punktzahl: ${Math.round(it.w)}`),h('span',{class:'tag'},qs.name)),body);
    body.append(h('p',{class:'situation'},q.sit));ed=partsEditor(q,'x:'+EX.start+':'+q.id,it.w/q.p);body.append(ed.el)}
  else{const c=CALC.find(x=>x.id===it.id),qs=QS[c.qs];card.classList.add('hb-'+qs.hb);
    card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${i+1}`),h('span',{class:'pts'},`Mögliche Punktzahl: ${Math.round(it.w)}`),h('span',{class:'tag'},qs.name)),body);
    body.append(taskText(it.t.text),givenEl(it.t,!!it.t.tb));
    if(it.t.tb){it.tbv=it.tbv||{};body.append(h('div',{class:'eyebrow'},'Werte aus dem Tabellenbuch'),h('div',{class:'ansgrid'},...it.t.tb.map((x,k)=>{const inp=h('input',{id:`extb-${i}-${k}`,inputmode:'decimal',placeholder:'Tabellenwert'});inp.value=it.tbv[x.k]??'';inp.oninput=()=>{it.tbv[x.k]=inp.value;saveEx()};return h('div',{class:'ans'},h('label',{for:inp.id},x.l),inp,h('span',{class:'u'},x.u))})),h('div',{class:'eyebrow'},'Ergebnisse'))}
    {const inA=anlageIdx(it.t);const cells=it.t.ans.map((a,k)=>{const inp=h('input',{id:`ex-${i}-${k}`,inputmode:'decimal',placeholder:inA.has(k)?'':'Ergebnis','aria-label':a.l});inp.value=it.inp[k]||'';inp.oninput=()=>{it.inp[k]=inp.value;saveEx()};return inA.has(k)?h('div',{class:'acell'},inp):h('div',{class:'ans'},h('label',{for:inp.id},partLabel(it.id,k,a.l)),inp,h('span',{class:'u'},a.u))});
    if(it.t.anlage)body.append(anlageEl(it.t,k=>cells[k]));const rest=cells.filter((c,k)=>!inA.has(k));if(rest.length)body.append(h('div',{class:'ansgrid'},...rest))}
    const sh=answerEditor('xs:'+EX.start+':'+i,{grid:true,mode:'draw',title:'Rechenblatt'});ed=sh;body.append(sh.el)}
  m.append(card);
  m.append(h('div',{class:'row'},h('button',{class:'btn ghost',disabled:i===0,onclick:()=>leave(()=>go('examrun',{i:i-1}))},'← Zurück'),
    i<EX.items.length-1?h('button',{class:'btn',onclick:()=>leave(()=>go('examrun',{i:i+1}))},'Weiter →'):null,
    h('button',{class:'btn primary',onclick:e=>{const b=e.currentTarget;leave(async()=>{EX.end=Date.now();b.disabled=true;b.textContent='Rechenblätter werden gelesen …';await examAutoRead();EX.done=true;EX.scores=EX.items.map(()=>null);saveEx();go('examres')})}},'Abgeben & auswerten')));
}
function vExamRes(m){
  if(!EX){go('exam');return}
  const total=h('div',{class:'note'});const sub=h('div',{class:'muted'});
  function upd(){let pts=0,open=0;EX.items.forEach((it,k)=>{if(EX.scores[k]==null)open++;else pts+=EX.scores[k]});const p=Math.round(pts);total.textContent=`${p} / 100 Punkte`;sub.textContent=open?`Noch ${open} Aufgabe(n) selbst bewerten.`:`Note: ${noteFor(p)} · ${p>=50?'bestanden':'nicht bestanden'} (ab 50 Punkten)`;return {p,open}}
  m.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},'Auswertung'),total,sub,h('p',{class:'muted',style:'margin:0'},`Bearbeitungszeit: ${Math.round((EX.end-EX.start)/6e4)} min von ${EX.dur} min`)));
  EX.items.forEach((it,k)=>{const card=h('article',{class:'task'}),body=h('div',{class:'task-body'});
    if(it.k==='c'){let ok=0;const c=CALC.find(x=>x.id===it.id);if(it.t.tb&&it.tbv){const ov={};let all=true;for(const x of it.t.tb){const v=parseNum(it.tbv[x.k]);if(isFinite(v))ov[x.k]=v;else all=false}if(all){const g2=c.gen({...it.t.P,...ov});it.t={...it.t,ans:g2.ans,steps:g2.steps}}}const lines=it.t.ans.map((a,j)=>{const v=parseNum(it.inp[j]);const g=isFinite(v)&&Math.abs(v-a.v)<=Math.max(Math.abs(a.v)*(a.tol??0.01),a.abs??0.015);if(g)ok++;return h('li',{},`${a.l}: deine Eingabe ${it.inp[j]||'–'} · richtig ${f(a.v)} ${a.u} ${g?'✓':'✗'}`)});
      EX.scores[k]=it.w*ok/it.t.ans.length;
      card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${k+1} · ${c.title}`),h('span',{class:'pts num'},`${f(EX.scores[k],1)} / ${Math.round(it.w)} Punkte`)),body);
      body.append(h('ul',{},...lines),it.read?h('details',{},h('summary',{},'Aus deinem Rechenblatt gelesen'),h('pre',{},it.read)):null,h('details',{},h('summary',{},'Lösungsweg'),renderSteps(it.t.steps)))}
    else{const q=getQ(it.id);const max=Math.round(it.w);const lab=h('span',{class:'num'},EX.scores[k]==null?'– bewerten':`${f(EX.scores[k],0)} / ${max}`);
      card.append(h('header',{class:'task-head'},h('h2',{},`Aufgabe ${k+1} · ${QS[q.qs].name}`),lab),body);
      if(!q.parts)body.append(h('p',{class:'prompt'},q.q));
      const shown=h('div',{style:'display:grid;gap:8px'});loadParts(q,'x:'+EX.start+':'+q.id).then(v=>{if(!v){shown.append(h('p',{class:'muted'},'Keine Antwort abgegeben.'));return}
        const blocks=v.parts||[{l:'',...v}];for(const b of blocks){if(b.l)shown.append(h('div',{class:'eyebrow'},`Deine Antwort zu ${b.l})`));
          if(b.text)shown.append(h('div',{class:'tip',style:'white-space:pre-wrap'},b.text));if(b.draw)shown.append(h('img',{class:'answer-thumb',src:b.draw,alt:'Handschriftliche Antwort'}));if(b.photo)shown.append(h('img',{class:'answer-thumb',src:b.photo,alt:'Foto der Antwort'}))}
        const fake={parts:v.parts,value:()=>({text:v.text,strokes:v.strokes,draw:v.draw,photo:v.photo,images:v.images})};const sb=h('div');shown.append(sb);showSolution(sb,q,fake,false,(pts,src)=>{if(src==='auto'&&EX.scores[k]!=null)return;setScore(Math.round(pts/q.p*max))})});
      const rng=h('input',{type:'range',min:0,max,step:1,value:EX.scores[k]??0,id:'sc-'+k,'aria-label':'Punkte für Aufgabe '+(k+1),oninput:e=>setScore(+e.target.value)});
      function setScore(v){EX.scores[k]=v;rng.value=v;lab.textContent=`${v} / ${max}`;saveEx();upd()}
      body.append(shown,h('div',{class:'eyebrow'},'Deine Punkte nach Lösungshinweisen'),h('div',{class:'score'},rng,h('button',{class:'btn small',onclick:()=>setScore(+rng.value)},'Übernehmen')))}
    m.append(card)});
  saveEx();upd();
  m.append(h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{const r=upd();if(r.open){toast('Bitte erst alle Aufgaben bewerten');return}const qsm={};EX.items.forEach((it,k)=>{const q=it.k==='c'?CALC.find(x=>x.id===it.id):getQ(it.id);if(!q)return;const o=qsm[q.qs]=qsm[q.qs]||[0,0];o[0]+=EX.scores[k]||0;o[1]+=it.w});S.exams.push({date:Date.now(),sit:EX.sit,pct:r.p,note:noteFor(r.p),qs:qsm});logDay('e');markDay();save();
    EX.items.forEach((it,k)=>{if(it.k==='o'){const sc=EX.scores[k]/it.w;rate(it.id,sc>=.75?2:sc>=.4?1:0)}});EX=null;saveEx();toast('Ergebnis gespeichert');go('home')}},'Ergebnis speichern'),
    h('button',{class:'btn ghost',onclick:()=>{EX=null;saveEx();go('exam')}},'Verwerfen')));
}

/* ───────── App weitergeben ───────── */
const WEB_URL='https://schlumpf3110-byte.github.io/industriemeister-app/';
const APK_URL='https://github.com/schlumpf3110-byte/industriemeister-app/releases/latest/download/HQ-Meistertrainer.apk';
let installEvt=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e});
const isNative=()=>!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
function qrEl(url){const box=h('div',{class:'qrbox share-qr'});try{const q=window.qrcode(0,'M');q.addData(url,'Byte');q.make();box.innerHTML=q.createSvgTag({cellSize:4,margin:4,scalable:true})}catch(e){}return box}
function shareBtn(url,label){return h('button',{class:'btn',onclick:async()=>{try{if(navigator.share)await navigator.share({title:'HQ-Meistertrainer',text:'Lern-App für die HQ-Prüfung Industriemeister Metall',url});else{await navigator.clipboard.writeText(url);toast('Link kopiert')}}catch(e){}}},label)}
function shareSection(){
  return h('section',{class:'sheet'},h('h2',{},'App an den Kurs weitergeben'),
    h('p',{class:'muted',style:'margin:0'},'Jeder hat seinen eigenen Lernstand, nichts wird geteilt. Die Original-Prüfungs-PDFs bindet jeder selbst aus seinen Kursunterlagen ein.'),
    h('div',{class:'share-grid'},
      h('div',{},h('b',{},'Android (Handy, Tablet)'),qrEl(APK_URL),h('p',{class:'muted'},'Code scannen, APK installieren.'),shareBtn(APK_URL,'Android-Link teilen')),
      h('div',{},h('b',{},'iPhone, iPad, Windows, Mac'),qrEl(WEB_URL),h('p',{class:'muted'},'Code scannen oder Link öffnen, dann als App installieren (siehe unten).'),shareBtn(WEB_URL,'Web-Link teilen'))))}
function installSection(){
  if(isNative())return null;
  const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const sec=h('section',{class:'sheet'},h('h2',{},'Als App installieren'));
  if(standalone){sec.append(h('p',{class:'muted',style:'margin:0'},'Läuft bereits als installierte App – funktioniert auch offline. Updates kommen automatisch beim nächsten Start mit Internet.'));return sec}
  if(installEvt)sec.append(h('div',{class:'row'},h('button',{class:'btn primary',onclick:async()=>{installEvt.prompt();await installEvt.userChoice;installEvt=null;go('more')}},'Jetzt installieren')));
  sec.append(h('ul',{class:'muted',style:'margin:0;padding-left:18px'},
    h('li',{},h('b',{},'iPhone/iPad: '),'In Safari öffnen → Teilen-Symbol (□↑) → „Zum Home-Bildschirm“.'),
    h('li',{},h('b',{},'Windows: '),'In Edge oder Chrome öffnen → Symbol „App installieren“ rechts in der Adressleiste (oder Menü ⋯ → Apps → „Diese Website als App installieren“).'),
    h('li',{},h('b',{},'Android: '),'Besser die richtige App (APK) nehmen – siehe oben.')),
    h('p',{class:'muted',style:'margin:0'},'Nach dem Installieren läuft alles offline. Wichtig auf iPhone/iPad: immer über das Symbol auf dem Home-Bildschirm öffnen, nicht in Safari, sonst ist es ein anderer Speicher.'));
  return sec}

/* ───────── Handschrift lesen (offline auf Android, sonst KI) ───────── */
const Ink=(()=>{try{const C=window.Capacitor;if(!isNative())return null;if(C.isPluginAvailable&&!C.isPluginAvailable('HqInk'))return null;
  const reg=C.registerPlugin||(window.capacitorExports&&window.capacitorExports.registerPlugin);return reg?reg('HqInk'):null}catch(e){return null}})();
const canRead=()=>!!Ink||!!(S.ai.key&&navigator.onLine);
let inkOK=null;
async function inkReady(){if(inkOK)return inkOK;
  for(const lang of [S.inkLang,'de-DE','de'].filter(Boolean)){let st;try{st=await Ink.inkStatus({lang})}catch(e){continue}
    if(!st.downloaded){if(!navigator.onLine)throw new Error('Einmalig Internet nötig: Das Schriftmodell (ca. 20 MB) wird beim ersten Mal geladen.');
      toast('Schriftmodell wird einmalig geladen …');await Ink.inkDownload({lang})}
    S.inkLang=lang;save();return inkOK=lang}
  throw new Error('Deutsches Schriftmodell nicht verfügbar')}
function inkLines(strokes){
  const ss=strokes.filter(s=>s.p&&s.p.length).map((s,i)=>{let y0=1e9,y1=-1e9;for(const p of s.p){if(p[1]<y0)y0=p[1];if(p[1]>y1)y1=p[1]}return {s,i,y0,y1,cy:(y0+y1)/2}});
  if(!ss.length)return [];
  const hs=ss.map(o=>o.y1-o.y0).filter(x=>x>4).sort((a,b)=>a-b);const mh=Math.max(14,hs[Math.floor(hs.length/2)]||20);
  const lines=[];for(const o of [...ss].sort((a,b)=>a.cy-b.cy)){const L=lines[lines.length-1];
    if(L&&o.cy-L.cy<mh*0.9){L.items.push(o);L.cy=L.items.reduce((a,b)=>a+b.cy,0)/L.items.length}else lines.push({cy:o.cy,items:[o]})}
  return lines.map(L=>L.items.sort((a,b)=>a.i-b.i).map(o=>o.s.p.map(p=>[p[0],p[1]])))}
async function aiTranscribe(img,calc){
  return (await aiCall({msgs:[{role:'user',imgs:[img],text:calc?'Transkribiere diese handschriftliche Rechnung Zeile für Zeile genau so, wie sie dasteht (Zahlen mit Komma, Einheiten, Gleichheitszeichen). Gib nur die Transkription aus.':'Transkribiere diesen handschriftlichen deutschen Text genau. Gib nur die Transkription aus.'}],max:1500})).trim()}
/* liest Stiftstriche oder Foto; Rückgabe {text,via} oder null */
async function readHand(v,calc){
  if(!v)return null;const hasInk=v.strokes&&v.strokes.length,img=v.photo||(hasInk?v.draw:null);
  if(!hasInk&&!v.photo)return null;
  let err=null;
  if(Ink){try{
    if(hasInk&&!v.photo){const lang=await inkReady();const r=await Ink.recognizeInk({lang,lines:inkLines(v.strokes)});return {text:(r.lines||[]).filter(Boolean).join('\n'),via:'Stifterkennung auf dem Gerät'}}
    const r=await Ink.recognizeImage({image:v.photo});return {text:r.text||'',via:'Texterkennung auf dem Gerät'}}catch(e){err=e.message}}
  if(S.ai.key&&navigator.onLine&&img){try{return {text:await aiTranscribe(img,calc),via:'KI (online)'}}catch(e){err=e.message}}
  return err?{err}:null}
function handHint(){return Ink?'':isNative()?'Für die Erkennung ohne Internet die neue App-Version einmal installieren (siehe „Mehr“ → „Handschrift automatisch auswerten“).':
  'Auf iPhone, iPad und Windows kann die App Handschrift nur mit KI-Schlüssel lesen. Ohne Schlüssel: mit dem Stift direkt ins Feld „Tippen“ schreiben (Apple Pencil/Windows-Stift wandeln in Text um).'}
/* Zahlen aus erkanntem Text */
function numsIn(text){const t=String(text).replace(/(\d)[oO](?=\d|\b)/g,'$10').replace(/[lI|](?=\d)/g,'1').replace(/(\d) (?=\d{3}\b)/g,'$1');
  const out=[];const re=/-?\d+(?:[.,]\d+)*/g;let m;while((m=re.exec(t))){const v=parseNum(m[0]);if(isFinite(v))out.push({v,raw:m[0],at:m.index,eq:/=\s*$/.test(t.slice(Math.max(0,m.index-3),m.index))})}return out}
function findNum(nums,ref,tol,skip,abs){let best=null;for(const n of nums){if(skip&&skip.has(n.at))continue;const d=Math.abs(n.v-ref);if(d<=Math.max(Math.abs(ref)*tol,abs??0.015)&&(!best||d<best.d||(d===best.d&&n.eq)))best={...n,d}}return best}

function handSection(){
  const sec=h('section',{class:'sheet'},h('h2',{},'Handschrift automatisch auswerten'),
    h('p',{class:'muted',style:'margin:0'},'Was du mit dem Stift in die App schreibst oder auf Papier fotografierst, liest die App beim Prüfen selbst: Ergebnisse und Tabellenwerte aus dem Rechenblatt werden eingetragen und kontrolliert, offene Antworten nach den Lösungspunkten geschätzt. Tipp: Ergebnisse deutlich mit „=“ und Einheit hinschreiben.'));
  const st=h('div',{class:'muted'});
  if(Ink){sec.append(st,h('div',{class:'row'},h('button',{class:'btn',onclick:async e=>{const b=e.currentTarget;b.disabled=true;st.textContent='Schriftmodell wird geladen …';try{await inkReady();st.textContent='Bereit – funktioniert jetzt ohne Internet.'}catch(err){st.textContent=err.message}b.disabled=false}},'Schriftmodell jetzt laden (einmalig, ca. 20 MB)')));
    (async()=>{try{const r=await Ink.inkStatus({lang:S.inkLang||'de-DE'});st.textContent=r.downloaded?'Bereit – funktioniert ohne Internet (Erkennung auf dem Gerät).':'Schriftmodell noch nicht geladen. Am besten jetzt im WLAN laden.'}catch(e){st.textContent=''}})()}
  else if(isNative())sec.append(h('p',{style:'margin:0'},'Dafür braucht es die neue App-Version (einmalig neu installieren, dein Lernstand bleibt).'),h('div',{class:'row'},h('a',{class:'btn primary',href:APK_URL,target:'_blank',rel:'noopener'},'Neue App-Version laden')));
  else sec.append(h('p',{class:'muted',style:'margin:0'},S.ai.key?'Hier im Browser liest die KI deine Schrift (braucht Internet, kostet ca. 1 Cent).':'Im Browser (iPhone, iPad, Windows) geht das nur mit KI-Schlüssel (siehe „KI-Korrektur“). Ohne Schlüssel: mit dem Stift direkt ins Feld „Tippen“ schreiben – Apple Pencil und Windows-Stift wandeln die Schrift selbst in Text um, dann bewertet die App offline.'));
  return sec}

/* Rechenblatt-Text → Tabellenwerte und Ergebnisse */
function calcFill(text,t,tbm){
  const giv=new Set();for(const g of t.given)if(g[2]!=='tb')for(const n of numsIn(g[1]))giv.add(n.v);if(t.gtab)for(const r of t.gtab.rows)for(const c of r)for(const n of numsIn(c))giv.add(n.v);if(t.anlage)for(const A of [].concat(t.anlage))for(const r of A.rows)for(const c of (r.c||r))if(typeof c==='string'||typeof c==='number')for(const n of numsIn(c))giv.add(n.v);
  const nums=numsIn(text).filter(n=>!giv.has(n.v));const used=new Set();
  const tb=(tbm&&t.tb?t.tb:[]).map(x=>{const m=findNum(nums,t.P[x.k],Math.max(x.tol??0.03,0.03),used);if(m){used.add(m.at);return m.raw}return null});
  return {nums,used,tb}}
function calcFillRes(fill,sol){return sol.ans.map(a=>{const m=findNum(fill.nums,a.v,a.tol??0.01,fill.used,a.abs);if(m){fill.used.add(m.at);return m.raw}return null})}
async function examAutoRead(){
  if(!canRead())return;
  for(let i=0;i<EX.items.length;i++){const it=EX.items[i];if(it.k!=='c')continue;
    if((it.inp||[]).some(x=>x&&String(x).trim())||Object.values(it.tbv||{}).some(x=>x&&String(x).trim()))continue;
    const v=await IDB.get('xs:'+EX.start+':'+i);if(!v||!((v.strokes&&v.strokes.length)||v.photo))continue;
    const r=await readHand(v,true);if(!r||!r.text)continue;
    const c=CALC.find(x=>x.id===it.id);const fill=calcFill(r.text,it.t,!!it.t.tb);it.tbv=it.tbv||{};
    const ov={};(it.t.tb||[]).forEach((x,k)=>{if(fill.tb[k]!=null){it.tbv[x.k]=fill.tb[k];ov[x.k]=parseNum(fill.tb[k])}});
    const sol=it.t.tb&&Object.keys(ov).length===it.t.tb.length?c.gen({...it.t.P,...ov}):it.t;
    it.inp=calcFillRes(fill,sol).map(x=>x||'');it.read=r.text;saveEx()}}

/* Eigenes KI-Abo nutzen (ChatGPT-Projekt, Claude-Projekt, Gemini) */
const ABO_FILES=[['1_Pruefer-Anweisungen.md','Prüfer-Anweisungen'],['2_Fachgespraeche.md','Fachgespräche'],['3_Situationsaufgaben.md','Situationsaufgaben mit Lösungen'],['4_Theorie.md','Theorie']];
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){try{const ta=h('textarea',{style:'position:fixed;opacity:0'});ta.value=t;document.body.append(ta);ta.select();document.execCommand('copy');ta.remove();return true}catch(_){return false}}}
function openUrl(u){const a=h('a',{href:u,target:'_blank',rel:'noopener'});document.body.append(a);a.click();a.remove()}
/* Befehl kopieren und das eigene KI-Projekt öffnen */
async function toAbo(cmd){const ok=await copyText(cmd);toast(ok?'Befehl kopiert – im Chat einfügen und senden':'Bitte den Befehl abschreiben: '+cmd);setTimeout(()=>openUrl(S.aboUrl||'https://chatgpt.com/'),400)}
function aboSection(){
  const sec=h('section',{class:'sheet'},h('h2',{},'Mit meinem KI-Abo üben (ChatGPT, Claude, Gemini)'),
    h('p',{class:'muted',style:'margin:0'},'Ihr Abo lässt sich nicht in fremde Apps holen – aber die App-Inhalte lassen sich in Ihr Abo bringen. Sie legen einmal ein Projekt an und laden diese Dateien hoch. Dann prüft Sie die KI dort mit Ihrem Abo – auch im Sprachmodus mit natürlicher Stimme, unterbrechbar wie ein echtes Gespräch. Das Projekt lässt sich mit dem Kurs teilen; jeder nutzt sein eigenes Konto.'));
  const files=h('div',{class:'list'},...ABO_FILES.map(([f,l])=>h('a',{class:'li',href:(isNative()?WEB_URL:'')+'abo/'+f,target:'_blank',rel:'noopener',download:f},h('span',{class:'t'},'⬇ '+l),h('span',{class:'s'},f))));
  const steps=h('div',{class:'tip'},h('b',{},'ChatGPT (auch kostenlos):'),h('ol',{style:'margin:4px 0 0;padding-left:1.2rem'},
    h('li',{},'In ChatGPT links „Projekte“ → „Neues Projekt“, Name z. B. „HQ-Prüfer“.'),
    h('li',{},'Projekt-Einstellungen → „Anweisungen“: den Text unten einfügen („Anweisungen kopieren“).'),
    h('li',{},'„Dateien hinzufügen“: die drei Dateien Fachgespräche, Situationsaufgaben und Theorie hochladen.'),
    h('li',{},'Fertig. Im Projekt „Fachgespräch FG1“ schreiben oder den Sprachmodus starten und „Fachgespräch“ sagen.'),
    h('li',{},'Für den Kurs: Projekt „Teilen“ und Kollegen einladen – jeder nutzt sein eigenes Abo.')),
    h('b',{},'Claude:'),' Projekt anlegen, Text unten als „Projektanweisungen“, die Dateien als „Projektwissen“. ',
    h('b',{},'Gemini:'),' Einen Gem bzw. Skill anlegen, Anweisungen einfügen, Dateien hinzufügen.');
  const url=h('input',{type:'url',id:'abourl',placeholder:'https://chatgpt.com/… (Link Ihres Projekts, optional)',value:S.aboUrl||''});
  sec.append(files,h('div',{class:'row'},h('button',{class:'btn primary',onclick:async()=>{const r=await fetch('abo/1_Pruefer-Anweisungen.md').catch(()=>null);const t=r&&r.ok?await r.text():'';toast(t&&await copyText(t)?'Anweisungen kopiert':'Bitte die Datei „Prüfer-Anweisungen“ öffnen und kopieren')}},'Anweisungen kopieren')),steps,
    h('div',{class:'field'},h('label',{for:'abourl'},'Link zu Ihrem Projekt (dann öffnen die Knöpfe „Mit meinem KI-Abo“ direkt dort)'),url),
    h('div',{class:'row'},h('button',{class:'btn',onclick:()=>{S.aboUrl=url.value.trim();save();toast(S.aboUrl?'Projekt-Link gespeichert':'Link entfernt')}},'Link speichern')));
  return sec}

/* App-KI (offline) */
function appkiSection(){
  const sec=h('section',{class:'sheet'},h('h2',{},'App-KI (kostenlos, ohne Schlüssel, offline)'),
    h('p',{class:'muted',style:'margin:0'},'Ein eigenes kleines Sprachmodell direkt auf dem Gerät. Es erkennt, ob Ihre Antwort einen Lösungspunkt sinngemäß trifft – auch mit ganz anderen Worten. Es verbessert die Bewertung der offenen Aufgaben, der Handschrift und den Übungsprüfer im Fachgespräch. Kein Konto, kein Schlüssel, nichts verlässt das Gerät.'));
  const st=h('div',{class:'muted',style:'font-size:.9rem'}),bar=h('div',{class:'track',style:'height:8px;background:var(--soft);border-radius:4px;overflow:hidden;display:none'},h('i',{style:'display:block;height:100%;width:0;background:var(--accent)'}));
  const btn=h('button',{class:'btn primary'},AppKI.installed()?'App-KI prüfen':'App-KI laden (einmalig ca. 230 MB, am besten im WLAN)');
  const show=()=>{st.textContent=AppKI.ready()?'Bereit – läuft offline auf diesem Gerät.':AppKI.installed()?'Geladen. Startet automatisch, wenn sie gebraucht wird.':'Noch nicht geladen.'};show();
  btn.onclick=async()=>{btn.disabled=true;bar.style.display='';const files={};
    try{await AppKI.load(p=>{if(p.status==='progress'&&p.file){files[p.file]=p.progress||0;const v=Object.values(files),avg=v.reduce((a,b)=>a+b,0)/Math.max(2,v.length);bar.firstChild.style.width=Math.min(100,avg)+'%';st.textContent=`Lade ${String(p.file).split('/').pop()} … ${Math.round(p.progress||0)} %`}});
      st.textContent='Teste …';const t=await AppKI.gradePoints(['Betriebsrat beteiligen'],'Ich hole den Betriebsrat mit ins Boot.');
      st.textContent=t[0]>0?'Bereit ✓ – die App-KI läuft jetzt offline auf diesem Gerät.':'Geladen, aber der Test war unsicher – bitte melden.';toast('App-KI bereit');btn.textContent='App-KI prüfen'}
    catch(e){st.textContent='Laden fehlgeschlagen: '+(e.message||e)+' – Internet prüfen und erneut versuchen.'}btn.disabled=false;bar.style.display='none'};
  sec.append(h('div',{class:'row'},btn),bar,st);return sec}

/* KI-Anbieter einrichten */
function aiSection(){
  const sec=h('section',{class:'sheet'},h('h2',{},'KI-Prüfer und KI-Korrektur (optional)'));
  const prov=h('select',{id:'aiprov'},...Object.entries(AIP).map(([k,v])=>{const o=h('option',{value:k},v.name+(k==='gemini'?' – kostenloser Schlüssel möglich':''));if(aiProv()===k&&S.ai.key)o.selected=true;else if(!S.ai.key&&k==='gemini')o.selected=true;return o}));
  const key=h('input',{type:'password',id:'aikey',value:S.ai.key||'',autocomplete:'off'});
  const model=h('input',{type:'text',id:'aimodel',value:S.ai.model||''});
  const st=h('div',{class:'muted',style:'font-size:.88rem'});
  const help=h('div',{class:'tip'});
  const HELP={gemini:['Kostenlos mit Google-Konto (Tageslimit, keine Kreditkarte nötig):','aistudio.google.com/apikey öffnen, anmelden, „API-Schlüssel erstellen“, Schlüssel (beginnt mit AIza…) kopieren und hier einfügen.','Hinweis: Im kostenlosen Tarif darf Google die Eingaben zur Verbesserung seiner Dienste verwenden – keine persönlichen Daten eingeben.'],
    openai:['ChatGPT Plus enthält keinen Schlüssel – die API wird bei OpenAI getrennt mit Guthaben bezahlt:','platform.openai.com öffnen, unter „Billing“ Guthaben aufladen (z. B. 5 $), unter „API keys“ einen Schlüssel erstellen (beginnt mit sk-…) und hier einfügen.'],
    anthropic:['Das Claude-Abo enthält keinen Schlüssel – die API wird bei Anthropic getrennt mit Guthaben bezahlt:','console.anthropic.com öffnen, unter „Settings → Billing“ Guthaben kaufen (z. B. 5 $, Auto-Reload aus), unter „API Keys“ einen Schlüssel erstellen (beginnt mit sk-ant-…) und hier einfügen.']};
  const drawHelp=()=>{const k=prov.value;key.placeholder=AIP[k].ph;help.innerHTML='';const H=HELP[k];help.append(h('b',{},H[0]),h('ol',{style:'margin:4px 0 0;padding-left:1.2rem'},...H.slice(1).map(x=>h('li',{},x))),h('a',{href:AIP[k].url,target:'_blank',rel:'noopener'},'→ Seite öffnen'))};
  prov.onchange=drawHelp;key.oninput=()=>{const v=key.value.trim();const g=v.startsWith('AIza')?'gemini':v.startsWith('sk-ant-')?'anthropic':v.startsWith('sk-')?'openai':null;if(g&&g!==prov.value){prov.value=g;drawHelp()}};drawHelp();
  const status=()=>{st.textContent=S.ai.key?`Verbunden: ${AIP[aiProv()].name}, Modell ${S.ai.model||AIP[aiProv()].def}`:'Noch keine KI verbunden. Ohne KI funktioniert alles andere weiter (Übungsprüfer, Offline-Bewertung).'};status();
  const conn=h('button',{class:'btn primary',onclick:async()=>{const k=key.value.trim();if(!k){toast('Bitte zuerst den Schlüssel einfügen');return}
    conn.disabled=true;st.textContent='Verbinde und prüfe den Schlüssel …';const old={...S.ai};
    try{const p=prov.value;const mdl=model.value.trim()&&old.prov===p?model.value.trim():await aiPickModel(p,k);S.ai={key:k,prov:p,model:mdl};
      const t=await aiCall({msgs:[{role:'user',text:'Antworte nur mit dem Wort OK.'}],max:20});save();model.value=mdl;status();toast('KI verbunden ✓');st.textContent+=` – Test: „${String(t).trim().slice(0,20)}“`}
    catch(e){S.ai=old;save();st.textContent='Verbindung fehlgeschlagen: '+e.message}conn.disabled=false}},'Verbinden & testen');
  sec.append(h('p',{class:'muted',style:'margin:0'},'Mit einem eigenen KI-Schlüssel führt die KI das Fachgespräch frei wie ein Prüfer, bewertet Ihre Antworten mit Begründung und liest auf iPhone/Windows Ihre Handschrift. Jeder im Kurs nutzt seinen eigenen Schlüssel – er bleibt nur auf diesem Gerät.'),
    h('div',{class:'field'},h('label',{for:'aiprov'},'Anbieter'),prov),help,h('div',{class:'field'},h('label',{for:'aikey'},'API-Schlüssel'),key),
    h('label',{class:'row',style:'gap:8px;align-items:center'},(()=>{const c=h('input',{type:'checkbox',onchange:e=>{S.aiAuto=e.target.checked;save()}});c.checked=S.aiAuto!==false;return c})(),'Antworten automatisch von der KI bewerten lassen (sobald die Lösung aufgedeckt wird)'),
    h('details',{},h('summary',{},'Modell (wird automatisch gewählt)'),h('div',{class:'field'},h('label',{for:'aimodel'},'Modell-ID'),model)),
    h('div',{class:'row'},conn,h('button',{class:'btn ghost',onclick:()=>{S.ai={key:'',prov:'',model:''};key.value='';model.value='';save();status();toast('Schlüssel gelöscht')}},'Schlüssel löschen')),st);
  return sec}

/* ───────── MEHR / EINSTELLUNGEN ───────── */
function vMore(m){
  const date=h('input',{type:'date',id:'examdate',value:S.examDate,onchange:e=>{S.examDate=e.target.value;save();renderNav();toast('Prüfungstermin gespeichert')}});
  const theme=h('select',{id:'theme',onchange:e=>{S.theme=e.target.value;save();applyTheme()}},...[['','wie System'],['light','hell'],['dark','dunkel']].map(([v,l])=>{const o=h('option',{value:v},l);if(S.theme===v)o.selected=true;return o}));
  m.append(h('section',{class:'hero'},h('h1',{},'Einstellungen')),
    h('section',{class:'sheet'},h('h2',{},'Prüfung'),h('div',{class:'field'},h('label',{for:'examdate'},'Datum deiner HQ-Prüfung (1. Situationsaufgabe) – danach richtet sich der Lernplan'),date),
      h('div',{class:'field'},h('label',{for:'theme'},'Darstellung'),theme)),
    aboSection(),
    appkiSection(),
    aiSection(),
    installSection(),
    handSection(),
    shareSection(),
    pdfAll(),
    (()=>{const sec=h('section',{class:'sheet'},h('h2',{},'Lernstand übertragen'),h('p',{class:'muted',style:'margin:0'},'Tablet und Handy abgleichen: Auf dem einen Gerät den QR-Code anzeigen, mit dem anderen fotografieren. Der Fortschritt wird zusammengeführt (der neuere Stand gewinnt), nichts geht verloren.'));qrSection().then(x=>sec.append(x));return sec})(),
    h('section',{class:'sheet'},h('h2',{},'Lernstand'),
      h('p',{class:'muted',style:'margin:0'},'Dein Fortschritt wird nur auf diesem Gerät gespeichert. Zum Übertragen auf ein anderes Gerät den Sicherungscode kopieren und dort einfügen.'),
      bk()),
    h('section',{class:'sheet'},h('h2',{},'Über die App'),h('p',{class:'muted',style:'margin:0'},`${OPEN.length} Situationsaufgaben und ${CALC.length} Rechenaufgabentypen, selbst formuliert nach den Themen der HQ-Metall-Prüfungen 2020–2025 und der Lösungsskripte. Keine Original-Prüfungsaufgaben.`),h('div',{class:'row'},h('span',{class:'num muted'},'Version 1.'+APP_BUILD),h('button',{class:'btn small',onclick:()=>checkUpdate(true)},'Nach Updates suchen')),(()=>{const ph=h('span');updInfo().then(x=>ph.replaceWith(x));return ph})()));
  function bk(){const ta=h('textarea',{id:'backup',style:'min-height:90px;font-family:var(--f-mono);font-size:.75rem',placeholder:'Sicherungscode hier einfügen …'});
    return h('div',{style:'display:grid;gap:8px'},ta,h('div',{class:'row'},
      h('button',{class:'btn',onclick:async()=>{const code=btoa(unescape(encodeURIComponent(JSON.stringify({box:S.box,calc:S.calc,exams:S.exams,days:S.days,examDate:S.examDate}))));ta.value=code;try{await navigator.clipboard.writeText(code);toast('Sicherungscode kopiert')}catch(e){ta.select();toast('Code markiert – kopieren')}}},'Sicherungscode erzeugen'),
      h('button',{class:'btn',onclick:()=>{try{const o=JSON.parse(decodeURIComponent(escape(atob(ta.value.trim()))));Object.assign(S,o);save();toast('Lernstand übernommen');go('home')}catch(e){toast('Code ungültig')}}},'Code einfügen & übernehmen'),
      h('button',{class:'btn ghost',onclick:e=>{const b=e.target;if(b.dataset.c){S.box={};S.calc={};S.exams=[];S.days={};save();toast('Lernstand zurückgesetzt');go('home')}else{b.dataset.c=1;b.textContent='Wirklich alles löschen?';setTimeout(()=>{delete b.dataset.c;b.textContent='Zurücksetzen'},3000)}}},'Zurücksetzen')))}
}


/* ───────── Original-PDFs (nur lokal auf dem Gerät) ───────── */
const normFn=n=>String(n).toLowerCase().replace(/\.pdf$/,'').replace(/\s*\(\d+\)\s*$/,'').replace(/[^a-z0-9äöüß]+/g,'');
const ALLPDF=Object.values(PDFMAP).flatMap(e=>e.files.map(f=>f.fn));
let pdfHave=new Set();
async function refreshPdfHave(){const ks=await Promise.all(ALLPDF.map(async fn=>(await IDB.get('pdfmeta:'+fn))?fn:null));pdfHave=new Set(ks.filter(Boolean))}
function pdfImportInput(onDone){
  const inp=h('input',{type:'file',accept:'application/pdf,.pdf',multiple:true,hidden:true,onchange:async e=>{
    const files=[...e.target.files];let ok=0,miss=[];
    for(const f of files){const fn=ALLPDF.find(x=>normFn(x)===normFn(f.name));if(!fn){miss.push(f.name);continue}
      await IDB.set('pdf:'+fn,f);await IDB.set('pdfmeta:'+fn,{size:f.size,ts:Date.now()});ok++}
    await refreshPdfHave();toast(`${ok} PDF(s) verknüpft`+(miss.length?` · ${miss.length} nicht erkannt`:''));onDone&&onDone(miss)}});
  return inp}
function pdfBtn(ex,fi,page,label,cls){const fn=PDFMAP[ex].files[fi].fn;const have=pdfHave.has(fn);
  return h('button',{class:'btn small '+(cls||''),disabled:!have,title:have?fn:'PDF noch nicht verknüpft',onclick:()=>go('pdf',{fn,page,back:{v:'examidx',a:{id:ex}}})},label)}
function pdfPanel(ex,rerender){
  const m=PDFMAP[ex];const files=m.files;const n=files.filter(f=>pdfHave.has(f.fn)).length;
  const inp=pdfImportInput(()=>rerender());
  return h('section',{class:'sheet'},h('h2',{},'Original-PDFs mit Zeichnungen und Anlagen'),
    h('p',{class:'muted',style:'margin:0'},'Verknüpfe deine eigenen Prüfungs-PDFs. Sie bleiben nur auf diesem Gerät gespeichert. Danach springen die Knöpfe direkt zur Aufgabe, zur Anlage oder zum Lösungshinweis.'),
    h('div',{class:'list'},...files.map(f=>h('div',{class:'li',style:'cursor:default'},h('span',{class:'t',style:'overflow-wrap:anywhere'},f.fn),h('span',{class:pdfHave.has(f.fn)?'pill ok':'pill'},pdfHave.has(f.fn)?'verknüpft':'fehlt'),h('span',{class:'s'},f.anlFile?'Anlagen-Datei':(f.sit==='T'?'1. Situationsaufgabe':f.sit==='O'?'2. Situationsaufgabe':'beide Situationsaufgaben'))))),
    inp,h('div',{class:'row'},h('button',{class:'btn'+(n<files.length?' primary':''),onclick:()=>inp.click()},n<files.length?'PDFs auswählen':'PDFs neu verknüpfen'),h('span',{class:'muted'},`${n} von ${files.length} verknüpft`)))}
let pdfjsReady=null;
function loadPdfJs(){if(pdfjsReady)return pdfjsReady;pdfjsReady=new Promise((res,rej)=>{const sc=document.createElement('script');sc.src='lib/pdf.min.js';sc.onload=()=>{window.pdfjsLib.GlobalWorkerOptions.workerSrc='lib/pdf.worker.min.js';res(window.pdfjsLib)};sc.onerror=rej;document.head.append(sc)});return pdfjsReady}
const pdfCache={};
async function vPdf(m,{fn,page,back,key}){
  const head=h('div',{class:'row pdfbar'});const wrap=h('div',{class:'pdfwrap'});const cv=h('canvas',{class:'pdfcanvas'});wrap.append(cv);
  const info=h('span',{class:'num'});let doc=null,p=page||1,zoom=1;
  m.append(h('section',{class:'sheet'},h('div',{class:'eyebrow'},fn),head,wrap));
  head.append(h('button',{class:'btn small ghost',onclick:()=>back?go(back.v,back.a):go('exam')},'← Zurück'),h('button',{class:'btn small',onclick:()=>show(p-1)},'‹'),info,h('button',{class:'btn small',onclick:()=>show(p+1)},'›'),
    h('button',{class:'btn small',onclick:()=>{zoom=Math.max(0.6,zoom/1.25);show(p)}},'−'),h('button',{class:'btn small',onclick:()=>{zoom=Math.min(4,zoom*1.25);show(p)}},'+'));
  const blob=await IDB.get(key||('pdf:'+fn));if(!blob){wrap.append(h('p',{class:'muted'},'Diese PDF ist auf diesem Gerät nicht verknüpft.'));return}
  try{const lib=await loadPdfJs();doc=pdfCache[fn]||(pdfCache[fn]=await lib.getDocument({data:new Uint8Array(await blob.arrayBuffer())}).promise)}catch(e){wrap.append(h('p',{style:'color:var(--bad)'},'PDF konnte nicht geöffnet werden.'));return}
  let rendering=null;
  async function show(np){p=Math.max(1,Math.min(doc.numPages,np));info.textContent=`Seite ${p} / ${doc.numPages}`;const pg=await doc.getPage(p);const w=wrap.clientWidth||600;const vp0=pg.getViewport({scale:1});const sc=w/vp0.width*zoom;const dpr=Math.min(2.5,window.devicePixelRatio||1);const vp=pg.getViewport({scale:sc*dpr});
    cv.width=vp.width;cv.height=vp.height;cv.style.width=(vp.width/dpr)+'px';if(rendering)try{rendering.cancel()}catch(e){};rendering=pg.render({canvasContext:cv.getContext('2d'),viewport:vp});try{await rendering.promise}catch(e){}}
  show(p);
  let sx=null;wrap.addEventListener('touchstart',e=>{if(e.touches.length===1&&zoom<=1)sx=e.touches[0].clientX},{passive:true});
  wrap.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>70)show(p+(dx<0?1:-1))});
}

function pdfAll(){const inp=pdfImportInput(miss=>go('more'));const n=ALLPDF.filter(f=>pdfHave.has(f)).length;
  return h('section',{class:'sheet'},h('h2',{},'Original-Prüfungs-PDFs'),h('p',{class:'muted',style:'margin:0'},`Kopiere die PDF-Dateien der Prüfungen 2020–2025 aus deinem Ordner „HQ PRÜFUNG“ auf das Tablet und wähle sie hier alle auf einmal aus. Die App erkennt sie am Dateinamen. Sie bleiben nur auf diesem Gerät.`),
    inp,h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>inp.click()},'PDFs auswählen'),h('span',{class:'muted'},`${n} von ${ALLPDF.length} Dateien verknüpft`)),
    h('details',{},h('summary',{},'Benötigte Dateinamen'),h('ul',{},...ALLPDF.map(f=>h('li',{},f+(pdfHave.has(f)?' ✓':''))))))}

/* ───────── Lernstand per QR-Code übertragen ───────── */
function loadScript(src){return new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`))return res();const sc=document.createElement('script');sc.src=src;sc.onload=res;sc.onerror=rej;document.head.append(sc)})}
const D0=Date.UTC(2026,0,1)/DAY;
function packState(){const box=Object.entries(S.box).map(([k,v])=>`${k}:${v.b}:${Math.round(v.due/DAY-D0)}:${Math.round((v.last||0)/DAY-D0)}:${v.n||0}`).join(',');
  const calc=Object.entries(S.calc).map(([k,v])=>`${k}:${v.ok}:${v.tot}`).join(',');
  const ex=(S.exams||[]).map(x=>`${Math.round(x.date/DAY-D0)}:${x.sit}:${x.pct}`).join(',');
  const days=Object.keys(S.days||{}).map(d=>Math.round(Date.parse(d)/DAY-D0)).join(',');
  return ['HQ2',box,calc,ex,days,S.examDate||'',Object.entries(S.fg||{}).map(([k,v])=>k+':'+v).join(','),Object.keys(S.read||{}).filter(k=>S.read[k]).join(',')].join('|')}
function unpackMerge(str){const p=str.split('|');if(p[0]!=='HQ2')throw new Error('kein Lernstand');
  const [,box,calc,ex,days,date,fg,read]=p;
  for(const e of (box?box.split(','):[])){const [k,b,due,last,n]=e.split(':');const v={b:+b,due:(+due+D0)*DAY,last:(+last+D0)*DAY,n:+n};const c=S.box[k];if(!c||(c.last||0)<v.last||(c.n||0)<v.n)S.box[k]=v}
  for(const e of (calc?calc.split(','):[])){const [k,ok,tot]=e.split(':');const c=S.calc[k];if(!c||c.tot<+tot)S.calc[k]={ok:+ok,tot:+tot}}
  S.exams=S.exams||[];for(const e of (ex?ex.split(','):[])){const [d,sit,pct]=e.split(':');const date=(+d+D0)*DAY;if(!S.exams.some(x=>Math.abs(x.date-date)<DAY&&x.sit===sit&&x.pct===+pct))S.exams.push({date,sit,pct:+pct,note:noteFor(+pct)})}
  for(const d of (days?days.split(','):[]))S.days[new Date((+d+D0)*DAY).toISOString().slice(0,10)]=1;
  if(date&&!S.examDate)S.examDate=date;S.fg=S.fg||{};for(const e of (fg?fg.split(','):[])){const [k,v]=e.split(':');S.fg[k]=Math.max(S.fg[k]||0,+v)}
  S.read=S.read||{};for(const k of (read?read.split(','):[]))S.read[k]=true;save()}
async function deflateB64(str){if(!window.CompressionStream)return 'R'+btoa(unescape(encodeURIComponent(str)));
  const cs=new Blob([str]).stream().pipeThrough(new CompressionStream('deflate'));const buf=new Uint8Array(await new Response(cs).arrayBuffer());let b='';for(const x of buf)b+=String.fromCharCode(x);return 'Z'+btoa(b)}
async function inflateB64(s){if(s[0]==='R')return decodeURIComponent(escape(atob(s.slice(1))));const bin=atob(s.slice(1));const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const ds=new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate'));return await new Response(ds).text()}
async function qrSection(){
  const out=h('div',{style:'display:grid;gap:10px;justify-items:center'});const inp=h('input',{type:'file',accept:'image/*',capture:'environment',hidden:true});
  let parts={};const status=h('p',{class:'muted',style:'margin:0'});
  inp.onchange=async e=>{const f0=e.target.files[0];if(!f0)return;await loadScript('lib/jsQR.js');const img=new Image();img.src=URL.createObjectURL(f0);await img.decode();
    const sc=Math.min(1,1400/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=img.width*sc;c.height=img.height*sc;const x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);
    const d=x.getImageData(0,0,c.width,c.height);const r=window.jsQR(d.data,c.width,c.height);inp.value='';
    if(!r){toast('Kein QR-Code erkannt – näher ran und scharf stellen');return}
    const m=r.data.match(/^HQ\|(\d+)\|(\d+)\|(.*)$/);if(!m){toast('Kein Lernstand-Code');return}
    parts[m[1]]=m[3];const n=+m[2];const got=Object.keys(parts).length;status.textContent=`Teil ${got} von ${n} gelesen`;
    if(got===n){try{const str=await inflateB64(Array.from({length:n},(_,i)=>parts[i+1]).join(''));unpackMerge(str);toast('Lernstand übernommen');parts={};go('home')}catch(err){toast('Code beschädigt – bitte neu scannen');parts={}}}
    else toast(`Teil ${m[1]} gelesen – jetzt den nächsten QR-Code fotografieren`)};
  const show=h('button',{class:'btn',onclick:async()=>{await loadScript('lib/qrcode.js');const data=await deflateB64(packState());const size=600;const n=Math.ceil(data.length/size);out.innerHTML='';
    for(let i=0;i<n;i++){const q=window.qrcode(0,'L');q.addData(`HQ|${i+1}|${n}|${data.slice(i*size,(i+1)*size)}`,'Byte');q.make();const w=h('div',{class:'qrbox'});w.innerHTML=q.createSvgTag({cellSize:4,margin:4,scalable:true});out.append(h('div',{class:'eyebrow'},`QR-Code ${i+1} von ${n}`),w)}
    out.append(h('p',{class:'muted',style:'margin:0;text-align:center'},'Auf dem anderen Gerät: Mehr → Lernstand übertragen → „QR-Code fotografieren“. Bei mehreren Codes nacheinander.'))}},'QR-Code anzeigen');
  return h('div',{style:'display:grid;gap:10px'},h('div',{class:'row'},show,h('button',{class:'btn',onclick:()=>inp.click()},'QR-Code fotografieren'),inp),status,out)}

/* ───────── Updates ───────── */
// In-App-Updates: neue Inhalte (www.zip) werden im Hintergrund geladen und beim nächsten Start aktiv.
const Updater=(()=>{try{const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return null;
  if(C.registerPlugin)return C.registerPlugin('CapacitorUpdater');
  if(window.capacitorExports&&window.capacitorExports.registerPlugin)return window.capacitorExports.registerPlugin('CapacitorUpdater');return null}catch(e){return null}})();
if(Updater){try{Updater.notifyAppReady()}catch(e){}}
let liveOK=null;const canLive=async()=>{if(liveOK!==null)return liveOK;if(!Updater)return liveOK=false;try{await Updater.current();liveOK=true}catch(e){liveOK=false}return liveOK};
let updState={phase:'',err:''};
async function checkUpdate(manual){
  if(!navigator.onLine){if(manual)toast('Keine Internetverbindung');return}
  try{const r=await fetch('https://api.github.com/repos/schlumpf3110-byte/industriemeister-app/releases/latest',{cache:'no-store'});if(!r.ok)throw 0;const j=await r.json();
    const nb=parseInt(String(j.tag_name).split('.').pop())||0;const apk=(j.assets||[]).find(a=>a.name.endsWith('.apk'));const zip=(j.assets||[]).find(a=>a.name==='www.zip');
    if(nb>APP_BUILD&&(apk||zip)){const sha=(String(j.body||'').match(/sha256:([0-9a-f]{64})/)||[])[1]||null;
      S.update={b:nb,url:apk&&apk.browser_download_url,zip:sha&&zip?zip.browser_download_url:null,sha};save();
      if(zip&&await canLive())await prepareLive(manual);else{renderUpdate();if(manual)toast('Update verfügbar')}}
    else{S.update=null;save();renderUpdate();if(manual)toast('Du hast die neueste Version')}}catch(e){if(manual)toast('Update-Prüfung fehlgeschlagen')}}
async function prepareLive(manual){
  const u=S.update,ver='1.'+u.b;if(updState.phase==='loading')return;
  try{let id=null;try{const l=await Updater.list();const f=(l.bundles||[]).find(x=>x.version===ver&&x.status!=='error');if(f)id=f.id}catch(e){}
    if(!id){updState={phase:'loading',err:''};renderUpdate();const bi=await Updater.download({url:u.zip,version:ver,checksum:u.sha});id=bi.id}
    await Updater.next({id});updState={phase:'ready',id,err:''};renderUpdate();if(manual)toast('Update geladen')}
  catch(e){const m=String(e&&e.message||e);updState={phase:'error',err:/Checksum/i.test(m)?'Prüfsumme stimmt nicht':/download/i.test(m)?'Download fehlgeschlagen – Internet prüfen':m.slice(0,80)};renderUpdate()}}
async function renderUpdate(){document.getElementById('upd')?.remove();if(!S.update||S.update.b<=APP_BUILD)return;
  try{if(!window.Capacitor||!window.Capacitor.isNativePlatform())return}catch(e){return}
  const live=S.update.zip&&await canLive();if(document.getElementById('upd'))return;
  let msg,btn=null;
  if(live){
    if(updState.phase==='loading'){msg=`Version 1.${S.update.b} wird im Hintergrund geladen …`}
    else if(updState.phase==='ready'){msg=`Version 1.${S.update.b} ist geladen und wird beim nächsten Start aktiv.`;
      btn=h('button',{class:'btn small primary',onclick:async e=>{e.currentTarget.disabled=true;try{await Updater.set({id:updState.id})}catch(err){toast('Neustart fehlgeschlagen')}}},'Jetzt neu starten')}
    else if(updState.phase==='error'){msg=`Update konnte nicht geladen werden (${updState.err}).`;btn=h('button',{class:'btn small primary',onclick:()=>prepareLive(true)},'Erneut versuchen')}
    else{msg=`Neue Version 1.${S.update.b} verfügbar`;btn=h('button',{class:'btn small primary',onclick:()=>prepareLive(true)},'Jetzt laden')}}
  else{ // alte App-Version ohne In-App-Updates: einmalig neu installieren
    if(S.updDismiss===S.update.b)return;
    msg='Diese App-Version kann sich noch nicht selbst aktualisieren. Einmal die neue App installieren – danach laufen Updates direkt in der App.';
    btn=h('span',{class:'row',style:'gap:6px'},h('a',{class:'btn small primary',href:S.update.url,target:'_blank',rel:'noopener'},'Neue App laden'),h('button',{class:'btn small ghost',onclick:()=>{S.updDismiss=S.update.b;save();renderUpdate()}},'Später'))}
  const bar=h('div',{id:'upd',class:'updbar'},h('span',{},msg),btn);document.querySelector('main').before(bar)}
async function updInfo(){const w=h('p',{class:'muted',style:'margin:0;font-size:.85rem'});
  if(!window.Capacitor||!window.Capacitor.isNativePlatform||!window.Capacitor.isNativePlatform()){w.textContent='Web-Version: Updates kommen automatisch beim Neuladen.';return w}
  const ok=await canLive();let extra='';if(ok){try{const c=await Updater.current();extra=c&&c.native?` · Grund-App ${c.native}`:''}catch(e){}}
  w.textContent=ok?`In-App-Updates aktiv${extra}. Neue Inhalte werden im Hintergrund geladen und beim nächsten Start aktiv.`:'In-App-Updates nicht verfügbar – bitte die aktuelle App einmal neu installieren.';return w}

/* ───────── Start ───────── */
applyTheme();
refreshPdfHave().then(()=>{if(view==='examidx'||view==='more')render()});
setTimeout(()=>checkUpdate(false),1500);
document.getElementById('cd').addEventListener('click',()=>go('more'));
render();
if('serviceWorker' in navigator&&location.protocol==='https:'&&!isNative())navigator.serviceWorker.register('sw.js').catch(()=>{});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
