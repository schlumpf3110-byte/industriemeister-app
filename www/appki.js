'use strict';
/* ───────── App-KI: eigenes Sprachmodell auf dem Gerät (ohne Schlüssel, offline) ─────────
   Ein kleines mehrsprachiges Satz-Modell erkennt, ob eine Antwort einen Lösungspunkt
   SINNGEMÄSS trifft – auch mit anderen Worten. Einmal laden (WLAN), danach offline. */
const AppKI=(()=>{
  // Kalibriert auf dem Build-Server: EmbeddingGemma erkennt Umformulierungen am zuverlässigsten
  let CFG={model:'onnx-community/embeddinggemma-300m-ONNX',dtype:'q4',opts:{model_file_name:'model_no_gather',use_external_data_format:true},pre:'task: sentence similarity | query: ',hit:0.715,part:0.66};
  const MODEL=()=>CFG.model+'@'+CFG.dtype+(CFG.opts&&CFG.opts.model_file_name?'/'+CFG.opts.model_file_name:'');
  const ORT='1.31.0-dev.20260914-8d85527a0',WASM='ort-wasm-simd-threaded.asyncify.wasm';
  const WASM_URL=`https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT}/dist/${WASM}`;
  let ext=null,loading=null,T=null;const cache=new Map();
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
      T=await import('./lib/transformers.min.js');
      T.env.allowLocalModels=false;T.env.useBrowserCache=true;
      const w=T.env.backends.onnx.wasm;w.numThreads=1;w.proxy=false;w.wasmPaths={wasm:await wasmBlobUrl(onProg)};
      ext=await T.pipeline('feature-extraction',CFG.model,{dtype:CFG.dtype,device:'wasm',...(CFG.opts||{}),progress_callback:onProg});
      S.appki={m:MODEL(),at:Date.now()};save();return ext})();
    try{return await loading}catch(e){loading=null;throw e}}
  async function embed(texts){
    const need=[...new Set(texts.filter(t=>!cache.has(t)))];
    for(let i=0;i<need.length;i+=16){const chunk=need.slice(i,i+16);const out=await ext(chunk.map(t=>CFG.pre+t),{pooling:'mean',normalize:true});const arr=out.tolist();chunk.forEach((t,k)=>cache.set(t,arr[k]))}
    return texts.map(t=>cache.get(t))}
  const cos=(a,b)=>{let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];return s};
  // Antwort in Sinnabschnitte zerlegen (Sätze, Aufzählungen) + Paare benachbarter Abschnitte
  function chunksOf(text){
    const parts=String(text).split(/[\n.;!?•·]+|\s[–-]\s|,\s+(?=(?:und|oder|sowie|außerdem|dann|danach|zudem)\s)/i).map(x=>x.trim()).filter(x=>x.split(/\s+/).length>=2);
    const out=[...parts];for(let i=0;i+1<parts.length;i++)out.push(parts[i]+', '+parts[i+1]);
    const words=String(text).trim().split(/\s+/);if(words.length<=60)out.push(String(text).trim());
    return [...new Set(out)].slice(0,40)}
  function fragsOf(point){const body=String(point).replace(/^[^:]{0,45}:/,'');return body.split(/[,;]|\bz\. ?b\.|\bbzw\./i).map(x=>x.trim()).filter(x=>x.length>3)}
  /* Trefferwerte 0..1 je Lösungspunkt */
  async function gradePoints(points,answer){
    if(!ext||!answer||answer.trim().length<6)return points.map(()=>0);
    const ch=chunksOf(answer);if(!ch.length)return points.map(()=>0);
    const che=await embed(ch);
    const res=[];
    for(const p of points){const fr=fragsOf(p);
      if(fr.length>=3){const fe=await embed(fr);let m=0;for(const f of fe){const best=Math.max(...che.map(c=>cos(f,c)));m+=best>=CFG.hit?1:best>=CFG.part?0.5:0}res.push(Math.min(1,m/3))}
      else{const [pe]=await embed([String(p).replace(/\(.*?\)/g,'').trim()||p]);const best=Math.max(...che.map(c=>cos(pe,c)));res.push(best>=CFG.hit?1:best>=CFG.part?0.5:0)}}
    return res}
  /* Wenn installiert: still im Hintergrund laden (aus dem Speicher, offline) */
  async function ensure(){if(ext)return true;if(!installed())return false;try{await load();return true}catch(e){return false}}
  function configure(c){CFG={...CFG,...c};ext=null;loading=null;cache.clear()}
  async function sim(a,b){const [x,y]=await embed([a,b]);return cos(x,y)}
  return {installed,ready,load,ensure,gradePoints,configure,sim,get MODEL(){return MODEL()},get cfg(){return CFG}}})();
