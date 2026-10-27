import fs from 'fs';import vm from 'vm';
const W='../www/';const ctx={window:{},S:{},console};ctx.window=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(W+'passages.js','utf8')+'\nthis.__=PASS',ctx);const PASS=ctx.__;
const dec=b=>{const buf=Buffer.from(b,'base64');const sc=buf.readFloatLE(0);const v=new Float32Array(buf.length-4);for(let i=0;i<v.length;i++)v[i]=buf.readInt8(4+i)*sc;return v};
const items=JSON.parse(fs.readFileSync(W+'appki-pass.json','utf8')).items;
const old=JSON.parse(fs.readFileSync('/tmp/claude-0/-home-claude/ac90597c-e004-54c8-8e6b-e415f6ce35d7/scratchpad/kb/existing.json','utf8'));
const oldQ=new Set(Object.values(old).flat().map(c=>c.q));
const cards=[];for(const k of ['BT','FT','MT','KW','PS','AUG','PF','PE','QM']){const c2={window:{}};vm.createContext(c2);vm.runInContext(fs.readFileSync(W+'fc_'+k+'.js','utf8'),c2);for(const c of c2.window.FC[k])cards.push({...c,k,old:oldQ.has(c.q)})}
const P=PASS.ofCards(Object.fromEntries(['BT','FT','MT','KW','PS','AUG','PF','PE','QM'].map(k=>[k,cards.filter(c=>c.k===k)])));
const V=P.map(p=>({p,v:items[p.h]?dec(items[p.h]):null,old:oldQ.has(p.q)})).filter(x=>x.v);
const cos=(a,b)=>{let s=0,na=0,nb=0;for(let i=0;i<a.length;i++){s+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i]}return s/Math.sqrt(na*nb)};

const STOP=new Set('nennen sie die der das und oder wie was welche welcher wird werden ist sind man bei für mit von den dem des ein eine einer einen eines nach auf aus als im in zu zur zum es sich nicht noch auch gibt gelten gilt wann wofür warum unterscheiden unterscheidet erklären beschreiben'.split(' '));
const tk=q=>new Set(q.toLowerCase().replace(/[^a-zäöüß0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>=4&&!STOP.has(w)).map(w=>w.slice(0,6)));
const out=[],drop=[];
for(const n of V.filter(x=>!x.old)){let best=null,bs=0;for(const o of V){if(o===n||!o.old)continue;const s=cos(n.v,o.v);if(s>bs){bs=s;best=o}}
  if(bs>0.95){const a=tk(n.p.q),b=tk(best.p.q);let ov=0;for(const w of a)if(b.has(w))ov++;const dup=ov>=2||(ov>=1&&bs>0.975);out.push([bs,ov,dup,n.p.q,best.p.q]);if(dup)drop.push(n.p.q)}}
out.sort((a,b)=>b[0]-a[0]);
console.log('Kandidaten',out.length,'davon gestrichen',drop.length);
for(const o of out)console.log(o[2]?'DROP':'keep',o[0].toFixed(3),o[1],'|',o[3].slice(0,75),'|',o[4].slice(0,75));
fs.writeFileSync('/tmp/claude-0/-home-claude/ac90597c-e004-54c8-8e6b-e415f6ce35d7/scratchpad/kb/drop.json',JSON.stringify(drop));
