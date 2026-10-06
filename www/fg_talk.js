'use strict';
/* ───────── Sprechender Prüfer im situationsbezogenen Fachgespräch ─────────
   Spricht die Fragen vor (Sprachausgabe), hört die Antwort (Spracherkennung),
   hakt nach wie ein IHK-Prüfer und bewertet am Ende.
   Mit KI-Schlüssel: freies Gespräch mit Claude als Prüfer.
   Ohne Schlüssel: Übungsprüfer auf dem Gerät (Leitfragen, gezieltes Nachfragen zu fehlenden Punkten). */

const Voice=(()=>{
  const C=window.Capacitor,nat=()=>{try{return !!(C&&C.isNativePlatform&&C.isNativePlatform())}catch(e){return false}};
  const plug=n=>{try{if(!nat())return null;if(C.isPluginAvailable&&!C.isPluginAvailable(n))return null;const reg=C.registerPlugin||(window.capacitorExports&&window.capacitorExports.registerPlugin);return reg?reg(n):null}catch(e){return null}};
  const TTS=plug('TextToSpeech'),SR=plug('SpeechRecognition');
  const WebSR=window.SpeechRecognition||window.webkitSpeechRecognition;
  let speaking=false;
  /* Deutsche Stimmen des Geräts, beste zuerst (Premium/Erweitert/Natural/Neural/Netz) */
  const qual=n=>(/premium/i.test(n)?40:0)+(/enhanced|erweitert|verbessert/i.test(n)?30:0)+(/natural|neural|wavenet|online/i.test(n)?35:0)+(/network|netz/i.test(n)?25:0)+(/google/i.test(n)?8:0)+(/compact|kompakt|eloquence/i.test(n)?-20:0);
  async function voices(){
    if(TTS){try{const r=await TTS.getSupportedVoices();return (r.voices||[]).map((v,i)=>({id:i,name:v.name||v.voiceURI,lang:v.lang})).filter(v=>/^de/i.test(v.lang)).sort((a,b)=>qual(b.name)-qual(a.name))}catch(e){return []}}
    if(!('speechSynthesis' in window))return [];
    let vs=speechSynthesis.getVoices();if(!vs.length){await new Promise(r=>{speechSynthesis.onvoiceschanged=r;setTimeout(r,1500)});vs=speechSynthesis.getVoices()}
    return vs.filter(v=>/^de/i.test(v.lang)).map(v=>({id:v.voiceURI||v.name,name:v.name,lang:v.lang,v})).sort((a,b)=>qual(b.name)-qual(a.name))}
  let vcache=null;async function pickVoice(){if(!vcache)vcache=await voices();if(!vcache.length)return null;return vcache.find(v=>String(v.id)===String(S.devVoice))||vcache[0]}
  async function say(text){if(!text)return;speaking=true;
    try{if(OAIVoice.ok()){try{await OAIVoice.say(text);return}catch(e){}}
      const pv=await pickVoice();
      if(TTS){await TTS.speak({text,lang:'de-DE',rate:S.voiceRate||0.95,pitch:1.0,volume:1.0,category:'playback',...(pv?{voice:pv.id}:{})});return}
      if('speechSynthesis' in window){await new Promise(res=>{const u=new SpeechSynthesisUtterance(text);u.lang='de-DE';u.rate=S.voiceRate||0.95;
        if(pv&&pv.v)u.voice=pv.v;u.onend=res;u.onerror=res;speechSynthesis.cancel();speechSynthesis.speak(u);setTimeout(res,Math.max(4000,text.length*95))})}}
    catch(e){}finally{speaking=false}}
  function stopSay(){try{OAIVoice.stop();if(TTS)TTS.stop();else if('speechSynthesis' in window)speechSynthesis.cancel()}catch(e){}}
  const canSpeak=()=>!!TTS||('speechSynthesis' in window);
  const canListen=()=>OAIVoice.ok()||!!SR||!!WebSR;
  /* Zuhören: onText(gesamterText) wird laufend aufgerufen; Rückgabe: stop() */
  async function listen(onText,onEnd,onState){
    if(OAIVoice.ok())return OAIVoice.listen(onText,onEnd,onState);
    let want=true,done='',cur='';const emit=()=>{const c=cur.trim();onText(((c&&done.endsWith(c))?done:done+' '+c).replace(/\s+/g,' ').trim())};
    if(SR){
      try{const p=await SR.checkPermissions();if(p.speechRecognition!=='granted'){const r=await SR.requestPermissions();if(r.speechRecognition!=='granted')throw new Error('Mikrofon nicht erlaubt')}}catch(e){onEnd&&onEnd(e.message);return ()=>{}}
      const h1=await SR.addListener('partialResults',d=>{cur=(d.matches&&d.matches[0])||'';emit()});
      const h2=await SR.addListener('listeningState',async d=>{if(d.status==='stopped'){done=(done+' '+cur).trim();cur='';emit();if(want){try{await SR.start({language:'de-DE',maxResults:1,partialResults:true,popup:false})}catch(e){}}else finish()}});
      const finish=()=>{try{h1.remove();h2.remove()}catch(e){}onEnd&&onEnd()};
      try{await SR.start({language:'de-DE',maxResults:1,partialResults:true,popup:false})}catch(e){want=false;try{h1.remove();h2.remove()}catch(_){}onEnd&&onEnd('Spracherkennung nicht verfügbar');}
      return ()=>{want=false;try{SR.stop()}catch(e){}setTimeout(()=>{done=(done+' '+cur).trim();cur='';emit()},300)}}
    if(WebSR){
      const r=new WebSR();r.lang='de-DE';r.continuous=true;r.interimResults=true;
      r.onresult=ev=>{let fin='',tmp='';for(let i=0;i<ev.results.length;i++){const t=ev.results[i][0].transcript;if(ev.results[i].isFinal)fin+=t+' ';else tmp+=t}cur=fin+tmp;emit()};
      const add=()=>{const c=cur.trim();if(c&&!done.endsWith(c))done=(done+' '+c).trim();cur=''};
      r.onend=()=>{if(want){add();try{r.start()}catch(e){}}else{add();emit();onEnd&&onEnd()}};
      r.onerror=e=>{if(e.error==='not-allowed'){want=false;onEnd&&onEnd('Mikrofon nicht erlaubt')}};
      try{r.start()}catch(e){onEnd&&onEnd('Spracherkennung nicht verfügbar')}
      return ()=>{want=false;try{r.stop()}catch(e){}}}
    onEnd&&onEnd('Spracherkennung auf diesem Gerät nicht verfügbar – bitte tippen oder mit dem Stift ins Feld schreiben.');return ()=>{}}
  return {say,stopSay,listen,canSpeak,canListen,voices,resetVoices:()=>{vcache=null},isSpeaking:()=>speaking}})();

/* ── Prüfer-Logik ohne KI: Leitfragen, Nachhaken bei fehlenden Punkten ── */
const PRUEFER={
  start:['Guten Tag. Ich bin heute einer Ihrer Prüfer. Wir sprechen über die Situation, die Sie vorbereitet haben.','Guten Tag, nehmen Sie bitte Platz. Wir steigen direkt in Ihre Situation ein.'],
  next:['Danke. Kommen wir zum nächsten Punkt.','Gut. Dann eine weitere Frage.','In Ordnung. Ich möchte noch auf etwas anderes eingehen.','Danke, das reicht mir dazu. Nächster Punkt.'],
  good:['Gut, das ist schlüssig.','Ja, das passt.','Das ist nachvollziehbar.'],
  probe:['Können Sie das konkretisieren? Was genau würden Sie als Meister tun?','Begründen Sie das bitte etwas genauer.','Wie würden Sie dabei konkret vorgehen?','Was fällt Ihnen dazu noch ein?'],
  short:'Das war mir etwas zu knapp. Erzählen Sie mir bitte mehr dazu.',
  end:'Vielen Dank. Damit ist das Fachgespräch beendet. Wir beraten uns kurz.'};
const pickR=a=>a[Math.floor(Math.random()*a.length)];
function hintFor(point){ // lenkt in die Richtung des fehlenden Punkts, ohne ihn zu verraten
  const p=String(point).toLowerCase();
  const R=[[/betriebsrat|betrvg|mitbestimm|personalabteilung|fachkraft für arbeitssicherheit|betriebsarzt/,'Wen müssen Sie im Betrieb noch beteiligen?'],
    [/agg|arbschg|arbzg|jarbschg|gesetz|§|recht|vorschrift|dguv|verordnung|kündig|abmahn/,'Welche rechtlichen Vorgaben spielen hier eine Rolle?'],
    [/dokument|schriftlich|protokoll|nachweis|festhalten/,'Wie sichern Sie das ab, falls es später Rückfragen gibt?'],
    [/kontroll|nachhalt|wirksam|überprüf|kennzahl|ziel|termin|verantwortlich/,'Wie stellen Sie sicher, dass Ihre Maßnahmen auch wirken?'],
    [/schul|unterweis|qualifiz|einarbeit|weiterbild|coaching|seminar/,'Wie bereiten Sie die Beteiligten darauf vor?'],
    [/gespräch|vier augen|feedback|wertschätz|motiv|team|beteilig|einbezieh|information|informier/,'Wie gehen Sie dabei mit den Mitarbeitern um?'],
    [/kosten|wirtschaft|budget|invest|preis/,'Wie bewerten Sie das wirtschaftlich?'],
    [/sicherheit|unfall|gefährd|schutz|psa/,'Was ist dabei aus Sicht des Arbeitsschutzes wichtig?'],
    [/ursache|analyse|daten|auswert|pareto|ishikawa/,'Wie finden Sie heraus, woran es liegt?'],
    [/anforderung|profil|kriteri|eignung|auswahl/,'Nach welchen Kriterien entscheiden Sie?']];
  for(const [re,q] of R)if(re.test(p))return q;return pickR(PRUEFER.probe)}
async function coverage(points,text){const ans=terms(text);let hits=points.map(p=>pointHit(p,ans));
  if(text&&AppKI.installed()&&await AppKI.ensure()){const sm=await AppKI.gradePoints(points,text);hits=hits.map((x,i)=>Math.max(x,sm[i]||0))}
  return {hits,cov:hits.reduce((a,b)=>a+b,0)/Math.max(1,Math.min(points.length,4))}}

/* ── Prüfer mit KI (Claude) ── */
async function aiExaminer(g,conv,final){
  const leit=g.fragen.map((q,i)=>`${i+1}. ${q.f}\n   Erwartete Punkte: ${q.a.join('; ')}${q.n?`\n   Mögliche Nachfrage: ${q.n}`:''}`).join('\n');
  const sys=`Du bist erfahrener IHK-Prüfer im situationsbezogenen Fachgespräch der Prüfung „Geprüfter Industriemeister Metall – Handlungsspezifische Qualifikationen“ (Dauer ca. 15 Minuten, Schwerpunkt Führung und Personal).
Situation des Prüflings:
${g.sit}

Deine Leitfragen mit Erwartungshorizont:
${leit}

So verhältst du dich:
- Du sprichst wie ein echter Prüfer im Prüfungsraum: höflich, sachlich, kurz. Höchstens 2 Sätze pro Beitrag, gut vorlesbar, keine Aufzählungen, keine Sternchen.
- Stelle immer nur eine Frage.
- Hake nach, wenn eine Antwort vage, allgemein oder unbegründet ist („Was heißt das konkret?“, „Warum?“, „Wer ist noch zu beteiligen?“). Lenke auf fehlende Erwartungspunkte, ohne die Lösung zu verraten.
- Prüfe Meister-Denken: Verantwortung, Rechtsgrundlagen (z. B. BetrVG, ArbSchG, AGG), Beteiligung von Betriebsrat/Personalabteilung, Dokumentation, Wirtschaftlichkeit, Mitarbeiterführung.
- Bleib bei einer Leitfrage höchstens 3 Wechsel, dann gehe zur nächsten. Nach allen Leitfragen beende das Gespräch.
- Lobe nicht übertrieben und bewerte während des Gesprächs nicht ausdrücklich.
Antworte NUR mit JSON: {"say":"<dein gesprochener Beitrag>","leitfrage":<Nummer der aktuellen Leitfrage>,"ende":<true|false>}`;
  const msgs=conv.map(c=>({role:c.who==='p'?'assistant':'user',text:c.who==='p'?JSON.stringify({say:c.text,leitfrage:c.lf||1,ende:false}):c.text}));
  if(!msgs.length||msgs[0].role!=='user')msgs.unshift({role:'user',text:'(Der Prüfling betritt den Raum und hat die Situation vorbereitet. Beginne das Gespräch.)'});
  if(final)msgs.push({role:'user',text:`(Gespräch beendet. Bewerte jetzt als Prüfungsausschuss. Antworte NUR mit JSON: {"punkte":<0-100>,"staerken":["..."],"luecken":["..."],"tipps":["..."],"je_frage":[{"nr":1,"punkte":<0-100>,"kommentar":"..."}]})`});
  const t=await aiCall({system:sys,msgs,max:final?1500:400});const mm=t.match(/\{[\s\S]*\}/);if(!mm)return final?{punkte:0,luecken:['Bewertung nicht lesbar']}:{say:t.trim(),leitfrage:1,ende:false};
  try{return JSON.parse(mm[0])}catch(e){return final?{punkte:0}:{say:t.replace(/[{}"]/g,''),ende:false}}}

/* Auswahl der Gerätestimme mit Probehören */
function voiceChooser(){
  const w=h('span',{class:'row',style:'gap:6px;align-items:center'});
  const sel=h('select',{class:'chip','aria-label':'Stimme des Prüfers'},h('option',{},'Stimme wird gesucht …'));
  const test=h('button',{class:'chip',onclick:()=>{Voice.stopSay();Voice.say('Guten Tag. Wie gehen Sie bei der Auswahl des neuen Schichtführers vor?')}},'▶ Probehören');
  w.append(sel,test);
  Voice.voices().then(vs=>{sel.innerHTML='';if(!vs.length){sel.append(h('option',{},'Standardstimme'));return}
    vs.slice(0,12).forEach((v,i)=>{const o=h('option',{value:String(v.id)},(i===0?'★ ':'')+v.name.replace(/^Microsoft |^Google /,'').slice(0,34));if(String(v.id)===String(S.devVoice??vs[0].id))o.selected=true;sel.append(o)})});
  sel.onchange=()=>{S.devVoice=sel.value;save();Voice.resetVoices();Voice.say('So klinge ich.')};
  return w}
function voiceHelp(){const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  return h('details',{class:'muted',style:'font-size:.85rem'},h('summary',{},'Natürlichere Stimme?'),
    h('p',{style:'margin:4px 0'},ios?'iPhone/iPad: Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Deutsch → eine Stimme mit „Premium“ oder „Erweitert“ laden. Danach hier auswählen (★ = beste gefundene Stimme).':
      'Android: Einstellungen → Allgemeine Verwaltung (bzw. System) → Sprache → Sprachausgabe → bevorzugtes Modul „Sprachausgabe von Google“ → Deutsch → hochwertige Stimme laden. Windows: in Microsoft Edge sind „Natural“-Stimmen eingebaut.'),
    h('p',{style:'margin:4px 0'},'Am natürlichsten klingt die ChatGPT-Stimme (mit OpenAI-Schlüssel unter „Mehr“).'))}

/* ── Ansicht ── */
let TALK=null;
function vFGTalk(m,{id}){
  const g=FG.find(x=>x.id===id);
  if(!TALK||TALK.id!==id)TALK={id,conv:[],qi:0,tries:0,acc:'',sc:[],cov:[],ai:!!(S.ai&&S.ai.key),voice:S.fgVoice!==false,ended:false,res:null,start:Date.now()};
  const T=TALK;
  const head=h('section',{class:'sheet hb-F'},
    h('div',{class:'row',style:'justify-content:space-between;align-items:center'},h('div',{class:'eyebrow'},T.ai?`KI-Prüfer (${aiName()}, online)`:AppKI.installed()?'Übungsprüfer mit App-KI (offline)':'Übungsprüfer (auf dem Gerät)'),timerEl(15*60,()=>toast('15 Minuten um – im echten Fachgespräch wäre jetzt Schluss'))),
    h('h2',{style:'margin:0'},g.t),
    h('details',{},h('summary',{},'Situation anzeigen'),h('p',{class:'situation'},g.sit)),
    h('div',{class:'row'},h('button',{class:'chip','aria-pressed':String(T.voice),onclick:e=>{T.voice=!T.voice;S.fgVoice=T.voice;save();if(!T.voice)Voice.stopSay();e.currentTarget.setAttribute('aria-pressed',String(T.voice));e.currentTarget.textContent=T.voice?'Prüfer spricht ✓':'Prüfer spricht'}},T.voice?'Prüfer spricht ✓':'Prüfer spricht'),
      aiProv()==='openai'&&S.ai?.key?h('button',{class:'chip','aria-pressed':String(S.fgOAI!==false),onclick:e=>{S.fgOAI=S.fgOAI===false;save();TALK=null;go('fgtalk',{id})}},S.fgOAI!==false?'ChatGPT-Stimme & -Spracherkennung ✓':'ChatGPT-Stimme & -Spracherkennung'):null,
      aiProv()==='openai'&&S.ai?.key&&S.fgOAI!==false?h('select',{class:'chip',onchange:e=>{S.fgVoiceName=e.target.value;save()}},...[['cedar','Stimme: Cedar'],['marin','Stimme: Marin'],['onyx','Stimme: Onyx'],['nova','Stimme: Nova'],['ash','Stimme: Ash']].map(([v,l])=>{const o=h('option',{value:v},l);if((S.fgVoiceName||'cedar')===v)o.selected=true;return o})):null,
      !(aiProv()==='openai'&&S.ai?.key&&S.fgOAI!==false)?voiceChooser():null,
      !S.ai?.key?h('span',{class:'muted',style:'font-size:.82rem'},'Mit KI-Schlüssel (Claude, ChatGPT oder Gemini – unter „Mehr“) führt die KI das Gespräch frei wie ein echter Prüfer.'):null));
  const log=h('div',{class:'talk-log'});
  const ta=h('textarea',{class:'talk-in',placeholder:'Antwort sprechen (Mikrofon), tippen oder mit dem Stift schreiben …'});
  const st=h('div',{class:'muted talk-st'});
  let listening=false,stopFn=null,pending=null,stopL=null;
  const idle=msg=>{listening=false;mic.classList.remove('on');mic.textContent='🎤 Sprechen';st.textContent=msg||''};
  async function stopListening(){if(!listening&&!stopFn&&!pending)return;const wasOAI=OAIVoice.ok();idle(wasOAI?'Antwort wird erkannt …':'');
    let f=stopFn;if(!f&&pending){try{f=await Promise.race([pending,new Promise(r=>setTimeout(()=>r(null),1500))])}catch(e){f=null}}
    try{f&&f()}catch(e){}stopFn=null;pending=null}
  stopL=null;
  const mic=h('button',{class:'btn talk-mic',onclick:async()=>{
    if(listening){await stopListening();return}
    Voice.stopSay();OAIVoice.unlock();const base=ta.value?ta.value.trim()+' ':'';listening=true;mic.classList.add('on');mic.textContent='■ Fertig gesprochen';st.textContent='Ich höre zu …';
    pending=Voice.listen(t=>{ta.value=(base+t).trim()},err=>{if(err)idle(err);else if(!listening&&st.textContent==='Antwort wird erkannt …')st.textContent=''},x=>{if(listening||/erkannt/.test(x))st.textContent=x});
    try{stopFn=await pending}catch(e){stopFn=null}pending=null;if(!listening&&stopFn){try{stopFn()}catch(e){}stopFn=null}}},'🎤 Sprechen');
  if(!Voice.canListen())mic.disabled=true;
  const send=h('button',{class:'btn primary',onclick:()=>{OAIVoice.unlock();answer()}},'Antwort abgeben');
  const rep=h('button',{class:'btn ghost',onclick:()=>{const l=[...T.conv].reverse().find(c=>c.who==='p');if(l)Voice.say(l.text)}},'Frage wiederholen');
  const endB=h('button',{class:'btn ghost',onclick:()=>finish()},'Gespräch beenden');
  const aboB=h('button',{class:'btn ghost',onclick:()=>toAbo(`Fachgespräch FG${FG.indexOf(g)+1}: ${g.t}`)},'↗ In meinem KI-Abo üben');
  const ctl=h('div',{class:'talk-ctl'},ta,st,h('div',{class:'row'},mic,send,rep,endB,aboB),voiceHelp());
  m.append(head,h('section',{class:'sheet talk'},log,ctl));
  cleanup.push(()=>{try{stopFn&&stopFn()}catch(e){}Voice.stopSay()});
  const bubble=c=>h('div',{class:'bub '+(c.who==='p'?'pr':'me')},h('div',{class:'who'},c.who==='p'?'Prüfer':'Sie'),h('div',{},c.text));
  function draw(){log.innerHTML='';for(const c of T.conv)log.append(bubble(c));log.scrollTop=log.scrollHeight;ctl.style.display=T.ended?'none':''}
  async function examinerSays(text,lf){T.conv.push({who:'p',text,lf});draw();if(T.voice)await Voice.say(text)}
  async function busy(fn){send.disabled=true;mic.disabled=true;st.textContent='Der Prüfer überlegt …';try{await fn()}catch(e){st.textContent=e.message;return}send.disabled=false;mic.disabled=!Voice.canListen();st.textContent=''}

  // lokaler Prüfer
  async function localTurn(txt){
    const q=g.fragen[T.qi];T.acc=(T.acc+' '+txt).trim();const {hits,cov}=await coverage(q.a,T.acc);
    const words=txt.trim().split(/\s+/).length;
    if(T.tries===0&&words<12){T.tries++;return examinerSays(PRUEFER.short)}
    if(cov<0.75&&T.tries<2){T.tries++;
      if(T.tries===1&&q.n)return examinerSays(q.n);
      const miss=q.a.filter((p,i)=>hits[i]<0.5);return examinerSays(miss.length?hintFor(miss[Math.min(T.tries-1,miss.length-1)]):pickR(PRUEFER.probe))}
    T.cov[T.qi]={hits,q:T.qi};T.sc[T.qi]=cov>=0.75?2:cov>=0.35?1:0;T.qi++;T.tries=0;T.acc='';
    if(T.qi>=g.fragen.length)return finish();
    return examinerSays((cov>=0.75?pickR(PRUEFER.good)+' ':'')+pickR(PRUEFER.next)+' '+g.fragen[T.qi].f)}
  async function answer(){
    if(listening||stopFn||pending){const wasOAI=OAIVoice.ok();await stopListening();if(wasOAI){for(let k=0;k<60&&st.textContent==='Antwort wird erkannt …';k++)await new Promise(r=>setTimeout(r,250))}else await new Promise(r=>setTimeout(r,500))}
    const txt=ta.value.trim();if(!txt){toast('Bitte zuerst antworten');return}
    ta.value='';T.conv.push({who:'me',text:txt});draw();
    await busy(async()=>{
      if(T.ai){const r=await aiExaminer(g,T.conv);if(r.ende){await examinerSays(r.say||PRUEFER.end,r.leitfrage);return finish(true)}await examinerSays(r.say,r.leitfrage)}
      else await localTurn(txt)})}
  async function finish(saidEnd){
    if(T.ended)return;T.ended=true;Voice.stopSay();stopListening();
    if(!saidEnd&&!T.ai)T.conv.push({who:'p',text:PRUEFER.end});
    draw();const out=h('section',{class:'sheet'});m.append(out);
    if(T.ai&&T.conv.some(c=>c.who==='me')){out.append(h('p',{class:'muted'},'Der Prüfungsausschuss berät …'));
      try{const r=await aiExaminer(g,T.conv,true);T.res=r;out.innerHTML='';out.append(h('div',{class:'eyebrow'},`Bewertung durch den KI-Prüfer (${aiName()})`),h('div',{class:'note'},`${Math.round(+r.punkte||0)} von 100 Punkten`),
        r.staerken?.length?h('div',{},h('b',{},'Stärken: '),r.staerken.join(' · ')):null,r.luecken?.length?h('div',{},h('b',{},'Lücken: '),r.luecken.join(' · ')):null,
        r.tipps?.length?h('div',{class:'tip'},h('b',{},'Tipps: '),r.tipps.join(' · ')):null,
        r.je_frage?.length?h('details',{},h('summary',{},'Bewertung je Leitfrage'),h('ul',{},...r.je_frage.map(x=>h('li',{},`Frage ${x.nr}: ${x.punkte} – ${x.kommentar||''}`)))):null);
        saveFG(Math.round(+r.punkte||0))}catch(e){out.innerHTML='';out.append(h('p',{style:'color:var(--bad)'},e.message))}}
    else{for(let i=T.qi;i<g.fragen.length;i++){if(T.sc[i]==null){const {hits,cov}=await coverage(g.fragen[i].a,i===T.qi?T.acc:'');T.cov[i]={hits,q:i};T.sc[i]=cov>=0.75?2:cov>=0.35?1:0}}
      const pct=Math.round(T.sc.reduce((a,b)=>a+(b||0),0)/(g.fragen.length*2)*100);
      out.append(h('div',{class:'eyebrow'},'Auswertung (Übungsprüfer)'),h('div',{class:'note'},`${pct} %`),
        h('p',{class:'muted',style:'margin:0'},'Grün = in Ihren Antworten erkannt. Die App vergleicht Fachbegriffe – mit eigenen Worten richtig Gesagtes erkennt sie nicht immer.'),
        ...g.fragen.map((q,i)=>h('div',{class:'og-part'},h('b',{},`Frage ${i+1}: ${q.f}`),h('ul',{},...q.a.map((p,j)=>{const v=T.cov[i]?.hits[j]||0;return h('li',{class:v>=.99?'hit':v>0?'part':'miss'},(v>=.99?'✓ ':v>0?'◐ ':'✗ ')+p)})))));
      saveFG(pct)}
    out.append(h('div',{class:'row'},h('button',{class:'btn primary',onclick:()=>{TALK=null;go('fgtalk',{id})}},'Nochmal'),h('button',{class:'btn',onclick:()=>{TALK=null;go('fg',{id})}},'Zur Situation')));
    out.scrollIntoView({behavior:'smooth'})}
  function saveFG(p){S.fg=S.fg||{};S.fg[g.id]=Math.max(p,0);logDay('f');markDay();save()}

  draw();
  if(!T.conv.length){busy(async()=>{
    if(T.ai){const r=await aiExaminer(g,[]);await examinerSays(r.say,r.leitfrage)}
    else await examinerSays(pickR(PRUEFER.start)+' '+g.fragen[0].f)})}
}
