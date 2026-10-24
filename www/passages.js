'use strict';
/* Textstellen für „Frag die App-KI“ – rein berechnet, ohne Oberfläche (läuft auch auf dem Build-Server, damit die Vektoren dort zu den Stellen passen) */
const PASS=(()=>{
  const flat=b=>{if(b==null)return'';if(typeof b==='string'||typeof b==='number')return String(b).replace(/\\[a-zA-Z]+/g,' ').replace(/[{}_^]/g,'').replace(/\s+/g,' ').trim();
    if(Array.isArray(b))return b.map(flat).filter(Boolean).join(' ');if(typeof b==='object')return Object.entries(b).filter(([k])=>k!=='svg'&&k!=='tex'&&k!=='img').map(([,v])=>flat(v)).filter(Boolean).join(' ');return''};
  const hash=s=>{let a=2166136261,b=5381;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);a=Math.imul(a^c,16777619)>>>0;b=(Math.imul(b,33)^c)>>>0}return a.toString(36)+b.toString(36)};
  /* Ein Baustein (Absatz, Liste, Tabelle …) → eine Textstelle */
  function ofBlock(b){const r=ofBlock0(b);if(r&&!r.blk)r.blk=b;return r}
  function ofBlock0(b){
    if(b.p)return {kind:'p',txt:flat(b.p),blk:b};
    if(b.ul||b.ol){const it=(b.ul||b.ol).map(flat);return {kind:b.ul?'ul':'ol',items:it,txt:it.join('. ')}}
    if(b.tab){const hd=b.tab[0]||[],rows=b.tab.slice(1).map(r=>r.map(flat));return {kind:'tab',hd:hd.map(flat),rows,txt:rows.map(r=>r.map((x,i)=>(hd[i]?flat(hd[i])+': ':'')+x).join('; ')).join('. ')}}
    if(b.merke)return {kind:'merke',txt:flat(b.merke)};
    if(b.falle)return {kind:'falle',txt:flat(b.falle)};
    if(b.bsp)return {kind:'bsp',t:flat(b.bsp.t),txt:flat(b.bsp.b)};
    if(b.fx){const f=b.fx;if(Array.isArray(f))return {kind:'fx',t:flat(f[0]),txt:flat(f)};return {kind:'fx',t:flat(f.n),txt:flat([f.n,f.leg,f.e])}}
    return null}
  /* Kapitel mit Bausteinen → Textstellen; ctx = Kapitelüberschrift + letzte Zwischenüberschrift */
  function ofChapters(src,fach,k,chs){const out=[];
    chs.forEach((c,j)=>{let sec='';(c.b||[]).forEach((b,i)=>{if(b.h){sec=flat(b.h);return}const p=ofBlock(b);if(!p||p.txt.length<25)return;
      out.push({id:`${src.slice(0,2)}${k}:${j}:${i}`,src,fach,k,j,i,ch:c.t,sec,...p,h:hash(c.t+'|'+sec+'|'+p.txt)})})});
    return out}
  function ofCards(FC){const out=[];for(const k of Object.keys(FC||{}))for(const c of FC[k]||[]){if(!c.q||!c.a)continue;
    out.push({id:'K'+c.id,src:'Karte',fach:k,k,ch:c.ch||'',kind:'card',q:c.q,a:c.a,pts:c.pts||[],txt:c.q+' '+c.a,h:hash(c.q+'|'+c.a)})}return out}
  function ofOpen(OPEN){return (OPEN||[]).filter(q=>q.q&&q.sol).map(q=>({id:'A'+q.id,src:'Aufgabe',fach:q.qs,k:q.qs,ch:q.src||'',kind:'task',sit:q.sit||'',q:q.q,sol:q.sol,txt:q.q+' '+q.sol.join(' '),h:hash(q.q+'|'+q.sol.join('|'))}))}
  /* Text, der für die Sinn-Suche eingebettet wird (gleich auf dem Build-Server und auf dem Gerät) */
  const embText=p=>(p.kind==='card'?p.q+' '+p.a:p.kind==='task'?p.q+' '+p.sol.join(' '):((p.ch?p.ch+': ':'')+(p.sec?p.sec+': ':'')+p.txt)).slice(0,520);
  return {flat,hash,ofBlock,ofChapters,ofCards,ofOpen,embText}})();
if(typeof module!=='undefined')module.exports=PASS;
