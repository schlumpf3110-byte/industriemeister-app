// Rendert alle Schaubilder der ergänzenden Theorie-Kapitel zur Sichtprüfung: node render.mjs MT [von bis]
import fs from 'fs';import vm from 'vm';import {createRequire} from 'module';
const require=createRequire('/opt/node-tools/node_modules/');const {chromium}=require('playwright');
const k=process.argv[2];const th=process.argv[3]?process.argv[3]:'/tmp/th_test.js';
const c={};vm.createContext(c);
const T=vm.runInContext(fs.readFileSync('/home/claude/app/www/theory.js','utf8')+';'+fs.readFileSync(th,'utf8')+';THEORY',c);
const base=JSON.parse(vm.runInContext(fs.readFileSync('/home/claude/app/www/theory.js','utf8')+';JSON.stringify(Object.fromEntries(Object.entries(THEORY).map(([k,v])=>[k,v.length])))',vm.createContext({})));
const figs=[];T[k].slice(base[k]).forEach((ch,ci)=>ch.b.forEach(b=>{if(b.svg)figs.push([ch.t,b.svg])}));
const dark=process.argv[4]==='dark';
const html=`<!doctype html><html><head><meta charset=utf-8><link rel=stylesheet href=style.css><style>body{padding:10px;max-width:560px;margin:auto}h3{font:600 14px sans-serif;margin:14px 0 2px}</style></head><body ${dark?'data-theme=dark':'data-theme=light'}>`+figs.map(([t,s])=>`<h3>${t}</h3><figure class="sketch tb-fig"><svg viewBox="0 0 ${s.w} ${s.h}"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fillacc"/></marker></defs>${s.body}</svg><figcaption class="sk-cap">${s.cap}</figcaption></figure>`).join('')+'</body></html>';
fs.writeFileSync('/home/claude/app/www/_figs.html',html);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:600,height:900}});await p.goto('file:///home/claude/app/www/_figs.html');
await p.screenshot({path:`/tmp/figs_${k}${dark?'_dark':''}.png`,fullPage:true});await b.close();fs.unlinkSync('/home/claude/app/www/_figs.html');console.log(figs.length,'Bilder');
