// Ergänzende Theorie-Kapitel (aus Dozentenunterlagen, Prüfungsrecherche und neuen Karteikarten) mit Schaubildern.
// Zeichen-Helfer für SVG-Schaubilder: alle Farben über CSS-Variablen, damit Hell- und Dunkelmodus funktionieren.
const TH2=(()=>{
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const tint={b:'--blue',a:'--accent',g:'--ok',r:'--bad',y:'--warn'};
  const fillOf=k=>k&&tint[k]?`fill:color-mix(in srgb,var(${tint[k]}) 20%,var(--paper));stroke:var(${tint[k]})`:'';
  const t=(x,y,s,o={})=>`<text x="${x}" y="${y}" text-anchor="${o.a||'middle'}" class="sk-t${o.c?' '+o.c:''}"${o.s?` style="${o.s}"`:''}>${esc(s)}</text>`;
  const ls=(x,y,arr,o={})=>arr.map((s,i)=>t(x,y+i*(o.lh||15),s,o)).join('');
  const box=(x,y,w,h,arr,o={})=>{arr=[].concat(arr);const lh=o.lh||15;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx==null?6:o.rx}" class="sk-body${o.ghost?' ghost':''}"${fillOf(o.k)?` style="${fillOf(o.k)}"`:''}/>`+ls(x+w/2,y+h/2-(arr.length-1)*lh/2+5,arr,o)};
  const ln=(x1,y1,x2,y2,c='sk-l')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
  const ar=(x1,y1,x2,y2,c='sk-f')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" marker-end="url(#ar)"/>`;
  const fa=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="sk-dim" style="stroke-width:1.6;stroke:var(--accent)" marker-end="url(#ar)"/>`;
  const rect=(x,y,w,h,k,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"${extra} style="${fillOf(k)||'fill:var(--soft);stroke:var(--ink)'};stroke-width:1.5"/>`;
  const circ=(x,y,r,k)=>`<circle cx="${x}" cy="${y}" r="${r}" class="sk-body"${fillOf(k)?` style="${fillOf(k)}"`:''}/>`;
  const path=(d,c='sk-l',st='')=>`<path d="${d}" class="${c}"${st?` style="${st}"`:''}/>`;
  const fig=(w,h,body,cap)=>({svg:{w,h,body,cap}});
  return {esc,t,ls,box,ln,ar,fa,rect,circ,path,fig};
})();
function addTheory(k,chs){(THEORY[k]=THEORY[k]||[]).push(...chs)}
