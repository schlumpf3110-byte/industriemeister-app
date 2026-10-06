'use strict';
/* ───────── KI-Anbieter: Claude, ChatGPT oder Gemini mit eigenem Schlüssel ───────── */
const AIP={
  anthropic:{name:'Claude (Anthropic)',ph:'sk-ant-…',url:'https://console.anthropic.com',def:'claude-sonnet-5-5',pref:[/^claude-sonnet/,/^claude-opus/,/^claude-haiku/]},
  openai:{name:'ChatGPT (OpenAI)',ph:'sk-…',url:'https://platform.openai.com/api-keys',def:'gpt-5-mini',pref:[/^gpt-[\d.]+-mini$/,/^gpt-[\d.]+$/,/^gpt-/]},
  gemini:{name:'Gemini (Google)',ph:'AIza…',url:'https://aistudio.google.com/apikey',def:'gemini-3.5-flash',pref:[/^gemini-[\d.]+-flash$/,/^gemini-[\d.]+-flash/,/flash/]}};
function aiProv(){const k=(S.ai&&S.ai.key)||'';if(S.ai&&S.ai.prov&&AIP[S.ai.prov])return S.ai.prov;return k.startsWith('AIza')?'gemini':k.startsWith('sk-ant-')?'anthropic':k.startsWith('sk-')?'openai':'anthropic'}
const aiName=()=>AIP[aiProv()].name.split(' ')[0];
const verNum=id=>(String(id).match(/\d+(?:[.-]\d+)*/g)||['0']).map(x=>x.replace(/-/g,'.')).join('.').split('.').map(Number);
function newer(a,b){const x=verNum(a),y=verNum(b);for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return d>0}return false}
/* Liste der Modelle holen und das passende neueste wählen */
async function aiPickModel(prov,key){
  let ids=[];
  if(prov==='anthropic'){const r=await fetch('https://api.anthropic.com/v1/models?limit=100',{headers:{'x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}});if(!r.ok)throw aiErr(r.status,await safeMsg(r));ids=(await r.json()).data.map(m=>m.id)}
  else if(prov==='openai'){const r=await fetch('https://api.openai.com/v1/models',{headers:{authorization:'Bearer '+key}});if(!r.ok)throw aiErr(r.status,await safeMsg(r));ids=(await r.json()).data.map(m=>m.id).filter(id=>!/audio|realtime|tts|transcribe|search|image|embedding|moderation|codex|nano|instruct|\d{4}-\d{2}-\d{2}/.test(id))}
  else{const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200&key='+encodeURIComponent(key));if(!r.ok)throw aiErr(r.status,await safeMsg(r));ids=(await r.json()).models.filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')).map(m=>m.name.replace('models/','')).filter(id=>!/preview|exp|lite|image|tts|live|embedding|thinking|8b/.test(id))}
  for(const re of AIP[prov].pref){const c=ids.filter(id=>re.test(id));if(c.length)return c.reduce((a,b)=>newer(b,a)?b:a)}
  return ids[0]||AIP[prov].def}
async function safeMsg(r){try{const j=await r.json();return (j.error&&(j.error.message||j.error.status))||''}catch(e){return ''}}
function aiErr(st,m){return new Error(st===401||st===403?'API-Schlüssel ungültig oder ohne Berechtigung – unter „Mehr“ prüfen.':st===429?'Limit erreicht (zu viele Anfragen oder kein Guthaben). Später erneut versuchen.':st===400&&/credit|billing|balance/i.test(m)?'Kein Guthaben auf dem KI-Konto.':'KI-Fehler '+st+(m?': '+m:''))}
/* Einheitlicher Aufruf. msgs: [{role:'user'|'assistant', text, imgs:[dataURL]}] → Antworttext */
async function aiCall({system,msgs,max=1200}){
  if(!navigator.onLine)throw new Error('Keine Internetverbindung – die KI braucht Internet. Alles andere geht offline.');
  const prov=aiProv(),key=S.ai.key,model=S.ai.model||AIP[prov].def;
  const mime=d=>d.startsWith('data:image/png')?'image/png':'image/jpeg',b64=d=>d.split(',')[1];
  if(prov==='anthropic'){
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({model,max_tokens:max,...(system?{system}:{}),messages:msgs.map(m=>({role:m.role,content:[...(m.imgs||[]).map(d=>({type:'image',source:{type:'base64',media_type:mime(d),data:b64(d)}})),{type:'text',text:m.text||' '}]}))})});
    if(!r.ok)throw aiErr(r.status,await safeMsg(r));const j=await r.json();return j.content.map(c=>c.text||'').join('')}
  if(prov==='openai'){
    const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+key},
      body:JSON.stringify({model,max_completion_tokens:Math.max(4000,max*3),messages:[...(system?[{role:'system',content:system}]:[]),...msgs.map(m=>({role:m.role,content:m.imgs&&m.imgs.length?[...m.imgs.map(d=>({type:'image_url',image_url:{url:d}})),{type:'text',text:m.text||' '}]:(m.text||' ')}))]})});
    if(!r.ok)throw aiErr(r.status,await safeMsg(r));const j=await r.json();return (j.choices&&j.choices[0]&&j.choices[0].message&&j.choices[0].message.content)||''}
  const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({...(system?{systemInstruction:{parts:[{text:system}]}}:{}),generationConfig:{maxOutputTokens:Math.max(4000,max*3)},
      contents:msgs.map(m=>({role:m.role==='assistant'?'model':'user',parts:[...(m.imgs||[]).map(d=>({inline_data:{mime_type:mime(d),data:b64(d)}})),{text:m.text||' '}]}))})});
  if(!r.ok)throw aiErr(r.status,await safeMsg(r));const j=await r.json();
  return ((j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts)||[]).map(p=>p.text||'').join('')}

/* ── Anfragen nacheinander (kostenlose Tarife erlauben nur wenige Anfragen pro Minute) ── */
let aiChain=Promise.resolve();
function aiQueued(fn){const p=aiChain.then(fn,fn);aiChain=p.catch(()=>{});return p}

/* ── ChatGPT-Stimme (Sprachausgabe) und ChatGPT-Spracherkennung ── */
const OAIVoice=(()=>{
  let audio=null;
  const ok=()=>aiProv()==='openai'&&!!(S.ai&&S.ai.key)&&S.fgOAI!==false;
  function unlock(){try{if(!audio){audio=new Audio();audio.preload='auto'}audio.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';const p=audio.play();if(p)p.catch(()=>{})}catch(e){}}
  async function say(text){
    if(!audio)audio=new Audio();
    const body={model:'gpt-4o-mini-tts',voice:S.fgVoiceName||'cedar',input:text,response_format:'mp3',instructions:'Sprich Deutsch, ruhig, sachlich und freundlich wie ein erfahrener IHK-Prüfer im mündlichen Fachgespräch. Normales Sprechtempo, deutliche Aussprache.'};
    let r=await fetch('https://api.openai.com/v1/audio/speech',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+S.ai.key},body:JSON.stringify(body)});
    if(!r.ok){delete body.instructions;body.model='tts-1';if(!['alloy','ash','coral','echo','fable','nova','onyx','sage','shimmer'].includes(body.voice))body.voice='onyx';
      r=await fetch('https://api.openai.com/v1/audio/speech',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+S.ai.key},body:JSON.stringify(body)})}
    if(!r.ok)throw aiErr(r.status,await safeMsg(r));
    const url=URL.createObjectURL(await r.blob());
    await new Promise(res=>{audio.onended=res;audio.onerror=res;audio.src=url;const p=audio.play();if(p)p.catch(res)});URL.revokeObjectURL(url)}
  function stop(){try{if(audio){audio.pause();audio.currentTime=0}}catch(e){}}
  async function transcribe(blob,ext){
    const tries=[S.oaiSTT,'gpt-4o-mini-transcribe','gpt-4o-transcribe','whisper-1'].filter((x,i,a)=>x&&a.indexOf(x)===i);let last=null;
    for(const model of tries){const fd=new FormData();fd.append('file',blob,'antwort.'+ext);fd.append('model',model);fd.append('language','de');
      fd.append('prompt','Mündliche Prüfung Industriemeister Metall: Betriebsrat, Arbeitsschutz, Gefährdungsbeurteilung, Unterweisung, Mitarbeitergespräch, AGG, BetrVG, ArbSchG.');
      const r=await fetch('https://api.openai.com/v1/audio/transcriptions',{method:'POST',headers:{authorization:'Bearer '+S.ai.key},body:fd});
      if(r.ok){S.oaiSTT=model;save();const j=await r.json();return j.text||''}last=aiErr(r.status,await safeMsg(r));if(r.status===401||r.status===429)break}
    throw last||new Error('Spracherkennung fehlgeschlagen')}
  /* Aufnahme: liefert stop() – nach dem Stopp wird der Text an onText übergeben */
  async function listen(onText,onEnd,onState){
    let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:(typeof Mic!=='undefined'?Mic.constraint():true)})}catch(e){onEnd&&onEnd('Mikrofon nicht erlaubt oder nicht verfügbar');return ()=>{}}
    const mt=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/aac'].find(t=>window.MediaRecorder&&MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t))||'';
    const rec=new MediaRecorder(stream,mt?{mimeType:mt}:undefined),chunks=[];const t0=Date.now();
    rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
    const tick=setInterval(()=>{const s=Math.round((Date.now()-t0)/1000);onState&&onState(`Aufnahme läuft … ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`)},500);
    rec.onstop=async()=>{clearInterval(tick);stream.getTracks().forEach(t=>t.stop());const type=rec.mimeType||mt||'audio/webm';const ext=/mp4|aac/.test(type)?'mp4':'webm';
      onState&&onState('Antwort wird erkannt …');try{const txt=await transcribe(new Blob(chunks,{type}),ext);onText(txt);onEnd&&onEnd()}catch(e){onEnd&&onEnd(e.message)}};
    rec.start(1000);return ()=>{try{if(rec.state!=='inactive')rec.stop()}catch(e){}}}
  return {ok,say,stop,listen,unlock}})();
