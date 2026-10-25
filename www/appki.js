'use strict';
/* ───────── App-KI: eigenes Sprachmodell auf dem Gerät (ohne Schlüssel, offline) ─────────
   Ein kleines mehrsprachiges Satz-Modell erkennt, ob eine Antwort einen Lösungspunkt
   SINNGEMÄSS trifft – auch mit anderen Worten. Einmal laden (WLAN), danach offline. */
const AppKI=(()=>{
  // Kalibriert auf dem Build-Server: EmbeddingGemma erkennt Umformulierungen am zuverlässigsten
  /* Zwei Stufen: „schnell“ (kleines Modell, Antwort in unter einer Sekunde) und „genau“ (EmbeddingGemma, deutlich langsamer).
     Schnell: auf eigenen Lehrpaaren nachtrainiertes e5-small (liegt in der App, offline). Gemessen mit Kreuzprüfung auf Lösungspunkten, die nie im Training waren:
     ca. 85 % Trefferquote (Ausgangsmodell 65 %). Die Suche nutzt ein zweites, unverändertes e5-small. Genau: EmbeddingGemma (ca. 82 % auf dem harten Paar-Satz, langsam). */
  const LS={g:k=>{try{return localStorage.getItem(k)}catch(e){return null}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},d:k=>{try{localStorage.removeItem(k)}catch(e){}}};
  const PRESETS={
    fast:{model:'e5-ft',local:true,dtype:'fp16',opts:{},pre:'query: ',hit:0.8,part:0.72,mb:106,label:'Schnell',ret:{model:'e5-orig',local:true,dtype:'fp16',opts:{},pre:'query: ',prePass:'passage: '}},
    exact:{model:'onnx-community/embeddinggemma-300m-ONNX',dtype:'q4',opts:{model_file_name:'model_no_gather',use_external_data_format:true},pre:'task: sentence similarity | query: ',hit:0.72,part:0.665,mb:230,label:'Genau'}};
  let MODE=LS.g('hq_ki_mode')==='exact'?'exact':'fast';
  let CFG={...PRESETS[MODE]};
  const MODEL=()=>CFG.model+'@'+CFG.dtype+(CFG.opts&&CFG.opts.model_file_name?'/'+CFG.opts.model_file_name:'');
  const ORT='1.31.0-dev.20260914-8d85527a0',WASM='ort-wasm-simd-threaded.asyncify.wasm';
  const WASM_URL=`https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT}/dist/${WASM}`;
  let ext=null,extR=null,loading=null,T=null;const cache=new Map(),cacheR=new Map();
  const RC=()=>CFG.ret||CFG;const retId=()=>{const r=RC();return r.model+'@'+r.dtype+(r.opts&&r.opts.model_file_name?'/'+r.opts.model_file_name:'')};
  // Schwellen (kalibriert mit deutschen Umformulierungen): ab HIT gilt ein Punkt als getroffen, ab PART teilweise
  const installed=()=>!!(S.appki&&S.appki.m===MODEL());
  const ready=()=>!!ext;
  async function wasmBlobUrl(onProg){
    let c=null;try{c=await caches.open('appki-ort')}catch(e){}
    let r=c?await c.match(WASM_URL):null;
    if(!r){onProg&&onProg({status:'progress',file:'Rechenmodul',progress:0});
      const resp=await fetch(WASM_URL);if(!resp.ok)throw new Error('Rechenmodul nicht ladbar ('+resp.status+')');
      const total=+resp.headers.get('content-length')||27e6;const rd=resp.body&&resp.body.getReader?resp.body.getReader():null;
      let buf;if(rd){const parts=[];let got=0;for(;;){const {done,value}=await rd.read();if(done)break;parts.push(value);got+=value.length;onProg&&onProg({status:'progress',file:'Rechenmodul',progress:got/total*100})}buf=new Blob(parts)}else buf=await resp.blob();
      r=new Response(buf,{headers:{'content-type':'application/wasm'}});if(c)try{await c.put(WASM_URL,r.clone())}catch(e){}}
    return URL.createObjectURL(new Blob([await r.arrayBuffer()],{type:'application/wasm'}))}
  async function load(onProg){
    if(ext)return ext;if(loading)return loading;
    loading=(async()=>{
      T=await import('./lib/transformers.min.js').catch(()=>import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0/dist/transformers.min.js'));
      T.env.allowLocalModels=!!CFG.local;T.env.allowRemoteModels=!CFG.local;if(CFG.local)T.env.localModelPath='models/';T.env.useBrowserCache=true;
      const w=T.env.backends.onnx.wasm;w.numThreads=1;w.proxy=false;w.wasmPaths={wasm:await wasmBlobUrl(onProg)};
      ext=await T.pipeline('feature-extraction',CFG.model,{dtype:CFG.dtype,device:'wasm',...(CFG.opts||{}),progress_callback:onProg});
      if(CFG.ret){extR=await T.pipeline('feature-extraction',CFG.ret.model,{dtype:CFG.ret.dtype,device:'wasm',...(CFG.ret.opts||{}),progress_callback:onProg})}
      await loadVecs();S.appki={m:MODEL(),at:Date.now()};save();return ext})();
    try{return await loading}catch(e){loading=null;throw e}}
  async function embed(texts){
    const need=[...new Set(texts.filter(t=>!cache.has(t)))];
    for(let i=0;i<need.length;i+=16){const chunk=need.slice(i,i+16);const out=await ext(chunk.map(t=>CFG.pre+t),{pooling:'mean',normalize:true});const arr=out.tolist();chunk.forEach((t,k)=>cache.set(t,arr[k]))}
    return texts.map(t=>cache.get(t))}
  async function embedR(texts,pass){const e=extR||ext,c=RC();if(!extR)return embed(texts);const pre=pass?(c.prePass||c.pre):c.pre;
    const need=[...new Set(texts.filter(t=>!cacheR.has(pre+t)))];
    for(let i=0;i<need.length;i+=16){const chunk=need.slice(i,i+16);const out=await e(chunk.map(t=>pre+t),{pooling:'mean',normalize:true});const arr=out.tolist();chunk.forEach((t,k)=>cacheR.set(pre+t,arr[k]))}
    return texts.map(t=>cacheR.get(pre+t))}
  const cos=(a,b)=>{let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];return s};
  // Antwort in Sinnabschnitte zerlegen (Sätze, Aufzählungen) + Paare benachbarter Abschnitte
  function chunksOf(text){
    const parts=String(text).split(/[\n.;!?•·]+|\s[–-]\s|,\s+(?=(?:und|oder|sowie|außerdem|dann|danach|zudem)\s)/i).map(x=>x.trim()).filter(x=>x.split(/\s+/).length>=2);
    const out=parts.slice(0,14);if(parts.length<=4)for(let i=0;i+1<parts.length;i++)out.push(parts[i]+', '+parts[i+1]);
    const words=String(text).trim().split(/\s+/);if(words.length<=60)out.push(String(text).trim());
    return [...new Set(out)].slice(0,18)}
  function fragsOf(point){const body=String(point).replace(/^[^:]{0,45}:/,'');return body.split(/[,;]|\bz\. ?b\.|\bbzw\./i).map(x=>x.trim()).filter(x=>x.length>3)}
  const wholeOf=p=>String(p).replace(/\(.*?\)/g,'').trim()||String(p);
  /* Texte, die für einen Lösungspunkt eingebettet werden (gleich auf Build-Server und Gerät) */
  function pointTexts(p){const fr=fragsOf(p);return fr.length>=3?fr:[wholeOf(p)]}
  /* Vorberechnete Vektoren der Lösungspunkte (vom Build-Server) */
  let vecLoaded=false;
  async function loadVecs(){if(vecLoaded)return;vecLoaded=true;try{const r=await fetch('appki-vec.json');if(!r.ok)return;const j=await r.json();if(j.model!==MODEL())return;
    for(const [t,b64] of Object.entries(j.items)){const raw=atob(b64),n=raw.length-4;const dv=new DataView(new ArrayBuffer(4));for(let i=0;i<4;i++)dv.setUint8(i,raw.charCodeAt(i));const sc=dv.getFloat32(0,true);
      const v=new Float32Array(n);let nn=0;for(let i=0;i<n;i++){let x=raw.charCodeAt(4+i);if(x>127)x-=256;v[i]=x*sc;nn+=v[i]*v[i]}nn=Math.sqrt(nn)||1;for(let i=0;i<n;i++)v[i]/=nn;cache.set(t,v)}}catch(e){}}
  /* Trefferwerte 0..1 je Lösungspunkt */
  /* Persönliche Eichung: Rückmeldungen „zu streng / zu großzügig“ und Korrekturen einzelner Punkte (nur auf diesem Gerät) */
  const getOff=()=>{const v=parseFloat(LS.g('hq_ki_off')||'0');return isFinite(v)?Math.max(-0.04,Math.min(0.04,v)):0};
  const getPt=()=>{try{return JSON.parse(LS.g('hq_ki_pt')||'{}')}catch(e){return{}}};
  const ptKey=p=>{let a=5381;for(let i=0;i<p.length;i++)a=(Math.imul(a,33)^p.charCodeAt(i))>>>0;return a.toString(36)};
  function nudge(d){LS.s('hq_ki_off',String(Math.round((getOff()+d)*1000)/1000))}
  function teach(point,cosv,yes){const m=getPt();m[ptKey(String(point))]={y:yes?1:0,c:Math.round(cosv*1000)/1000};const k=Object.keys(m);if(k.length>400)delete m[k[0]];LS.s('hq_ki_pt',JSON.stringify(m))}
  const forget=()=>{LS.d('hq_ki_off');LS.d('hq_ki_pt')};
  const taught=()=>Object.keys(getPt()).length+(getOff()?1:0);
  async function gradePoints(points,answer,skip){
    const none=points.map(()=>0);none.cos=points.map(()=>null);
    if(!ext||!answer||answer.trim().length<6)return none;
    if(skip&&points.every((p,i)=>skip[i]>=.99))return none;
    const ch=chunksOf(answer);if(!ch.length)return none;
    const che=await embed(ch),off=getOff(),pm=getPt();
    const res=[];res.cos=[];
    for(let pi=0;pi<points.length;pi++){const p=points[pi];if(skip&&skip[pi]>=.99){res.push(0);res.cos.push(null);continue}const fr=pointTexts(p);
      let hit=CFG.hit+off,part=CFG.part+off;const o=pm[ptKey(String(p))];if(o){if(o.y){hit=Math.min(hit,o.c-0.004);part=Math.min(part,hit-0.02)}else{hit=Math.max(hit,o.c+0.004);part=Math.max(part,o.c+0.002)}}
      if(fr.length>=3){const fe=await embed(fr);let m=0,sb=0;for(const f of fe){const best=Math.max(...che.map(c=>cos(f,c)));sb+=best;m+=best>=hit?1:best>=part?0.5:0}res.push(Math.min(1,m/3));res.cos.push(sb/fe.length)}
      else{const [pe]=await embed(fr);const best=Math.max(...che.map(c=>cos(pe,c)));res.push(best>=hit?1:best>=part?0.5:0);res.cos.push(best)}}
    return res}
  /* Wenn installiert: still im Hintergrund laden (aus dem Speicher, offline) */
  /* Absturzschutz: Bleibt die Markierung stehen, ist die App beim letzten Laden des Modells abgestürzt → App-KI automatisch aus, Bewertung über Fachbegriffe */
  const bad=()=>!!LS.g('hq_ki_bad');
  async function ensure(){if(ext)return true;if(!installed())return false;
    if(LS.g('hq_ki_try')){LS.s('hq_ki_bad','1');LS.d('hq_ki_try')}
    if(bad())return false;
    LS.s('hq_ki_try','1');try{await load();LS.d('hq_ki_try');return true}catch(e){LS.d('hq_ki_try');return false}}
  async function loadManual(onProg){LS.d('hq_ki_bad');LS.s('hq_ki_try','1');try{const r=await load(onProg);LS.d('hq_ki_try');return r}catch(e){LS.d('hq_ki_try');throw e}}
  function configure(c){CFG={...CFG,...c};ext=null;extR=null;loading=null;cache.clear();cacheR.clear();vecLoaded=false}
  function setMode(m){if(!PRESETS[m])return;MODE=m;LS.s('hq_ki_mode',m);LS.d('hq_ki_bad');configure({...PRESETS[m]})}
  const decode=b64=>{const raw=atob(b64),n=raw.length-4;const dv=new DataView(new ArrayBuffer(4));for(let i=0;i<4;i++)dv.setUint8(i,raw.charCodeAt(i));const sc=dv.getFloat32(0,true);
    const v=new Float32Array(n);let nn=0;for(let i=0;i<n;i++){let x=raw.charCodeAt(4+i);if(x>127)x-=256;v[i]=x*sc;nn+=v[i]*v[i]}nn=Math.sqrt(nn)||1;for(let i=0;i<n;i++)v[i]/=nn;return v};
  async function sim(a,b){const [x,y]=await embed([a,b]);return cos(x,y)}
  async function warm(){if(ext||!installed()||bad())return;await ensure();if(ext)try{await embed(['Aufwärmen der Sprachprüfung.'])}catch(e){}}
  /* Semantische Nähe einer Frage zu mehreren Texten (für die Suche) */
  async function rank(query,texts){if(!ext)return null;const [q]=await embedR([query]);const te=await embedR(texts,true);return te.map(t=>cos(q,t))}
  return {installed,ready,load:loadManual,bad,ensure,warm,rank,decode,cos,setMode,PRESETS,get mode(){return MODE},get modelId(){return MODEL()},embedTexts:embed,embedR,get retId(){return retId()},gradePoints,nudge,teach,forget,taught,get offset(){return getOff()},configure,sim,pointTexts,get MODEL(){return MODEL()},get cfg(){return CFG}}})();
