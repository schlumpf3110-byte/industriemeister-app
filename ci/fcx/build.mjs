// Baut www/fcx_<K>.js aus ci/fcx/<K>.txt und prüft: jeder Lösungspunkt genau einer Teilaufgabe zugeordnet
import fs from 'fs';
const ks=process.argv.slice(2).length?process.argv.slice(2):['AUG','BT','FT','KW','MT','PE','PF','PS','QM'];
for(const k of ks){const f=`/home/claude/app/ci/fcx/${k}.txt`;if(!fs.existsSync(f))continue;
  const body=fs.readFileSync(f,'utf8').trim();
  const X=new Function('return {'+body+'}')();
  global.window={};new Function('window',fs.readFileSync(`/home/claude/app/www/fc_${k}.js`,'utf8'))(global.window);
  const L=window.FC[k],byId=new Map(L.map(c=>[c.id,c]));let bad=[],miss=[];
  for(const [id,x] of Object.entries(X)){const c=byId.get(id);if(!c){bad.push(id+' unbekannt');continue}
    const seen=new Set();for(const p of x.slice(1)){for(const i of p.slice(1)){if(!Number.isInteger(i)||i<0||i>=c.pts.length)bad.push(id+' Index '+i);if(seen.has(i))bad.push(id+' doppelt '+i);seen.add(i)}}
    for(let i=0;i<c.pts.length;i++)if(!seen.has(i))bad.push(id+' fehlt '+i);
    if(x.length<3&&c.pts.length<1)bad.push(id+' leer')}
  for(const c of L)if(!X[c.id])miss.push(c.id);
  fs.writeFileSync(`/home/claude/app/www/fcx_${k}.js`,`// Prüfungsaufbau der Karteikarten ${k}: [Ausgangssituation, [Aufgabentext@Punkte, Lösungspunkt-Nummern …], …]\n(window.FCX=window.FCX||{}).${k}={\n${body}\n};\n`);
  console.log(k,'Einträge',Object.keys(X).length,'von',L.length,'| Fehler',bad.length,bad.slice(0,12).join('; '),'| offen',miss.length,miss.length&&miss.length<8?miss.join(','):'')}
