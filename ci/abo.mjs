// Erzeugt die Wissensdateien für ein KI-Projekt (ChatGPT/Claude/Gemini) aus den App-Daten
import fs from 'fs';import vm from 'vm';
const W=new URL('../www/',import.meta.url).pathname;
const ctx={window:{},console};ctx.window=ctx;vm.createContext(ctx);
let code='';for(const f of ['q_open.js','q_open_more.js','q_nachbau.js','q_parts.js','fachgespraech.js','theory.js'])code+=fs.readFileSync(W+f,'utf8')+'\n';
code+='this.__=[OPEN,NACHBAU,FG,QS,THEORY];';vm.runInContext(code,ctx);
const [OPEN,NACHBAU,FG,QS,THEORY]=ctx.__;
const out=W+'abo/';fs.mkdirSync(out,{recursive:true});
// 1) Fachgespräche
let fg='# Situationsbezogene Fachgespräche – HQ Industriemeister Metall\n\nJede Situation hat Leitfragen mit Erwartungshorizont (was ein guter Prüfling nennen sollte) und mögliche Nachfragen. Nicht vorlesen, sondern als Prüfer nutzen.\n\n';
FG.forEach((g,i)=>{fg+=`## FG${i+1}: ${g.t}\n\n**Situation:** ${g.sit}\n\n`;g.fragen.forEach((f,k)=>{fg+=`### Leitfrage ${k+1}: ${f.f}\nErwartungshorizont:\n${f.a.map(x=>'- '+x).join('\n')}\n${f.n?`Mögliche Nachfrage: ${f.n}\n`:''}\n`})});
fs.writeFileSync(out+'2_Fachgespraeche.md',fg);
// 2) Situationsaufgaben
let ta='# Situationsaufgaben mit Lösungshinweisen – HQ Industriemeister Metall\n\nSelbst erstellte Übungsaufgaben nach den Themen der IHK-Prüfungen 2020–2025 (keine Original-Prüfungsaufgaben). Jede Aufgabe hat eine ID (z. B. bt1), Teilaufgaben a), b), c) mit Punkten und Lösungshinweisen. Nachvollziehbare andere Antworten zählen auch.\n\n';
const all=[...OPEN,...NACHBAU];const byQS={};for(const q of all)(byQS[q.qs]=byQS[q.qs]||[]).push(q);
for(const k of Object.keys(QS)){const L=byQS[k]||[];if(!L.length)continue;ta+=`## ${QS[k].name} (${{T:'Technik',O:'Organisation',F:'Führung & Personal'}[QS[k].hb]})\n\n`;
  for(const q of L){ta+=`### Aufgabe ${q.id} (${q.p} Punkte)\n**Situation:** ${q.sit}\n\n`;
    if(q.parts)q.parts.forEach(p=>{ta+=`**${p.l})** ${p.q} (${p.p} Punkte)\nLösungshinweise:\n${p.sol.map(x=>'- '+x).join('\n')}\n\n`});
    else ta+=`**Aufgabe:** ${q.q}\nLösungshinweise:\n${q.sol.map(x=>'- '+x).join('\n')}\n\n`}}
fs.writeFileSync(out+'3_Situationsaufgaben.md',ta);
// 3) Theorie
const txt=b=>{if(typeof b==='string')return b;if(b.p)return b.p;if(b.ul)return b.ul.map(x=>'- '+x).join('\n');if(b.fx)return b.fx.map(x=>'- '+x).join('\n');if(b.tab)return b.tab.map(r=>'| '+r.join(' | ')+' |').join('\n');if(b.h)return '#### '+b.h;return Object.values(b).flat().filter(x=>typeof x==='string').join(' ')};
let th='# Theorie – HQ Industriemeister Metall (Kurzfassung)\n\n';
for(const [k,chs] of Object.entries(THEORY)){th+=`## ${QS[k]?QS[k].name:k}\n\n`;for(const c of chs){th+=`### ${c.t}\n`;for(const b of (c.b||c.blocks||c.body||[]))th+=txt(b)+'\n\n'}}
fs.writeFileSync(out+'4_Theorie.md',th);
for(const f of fs.readdirSync(out))console.log(f,fs.statSync(out+f).size);
