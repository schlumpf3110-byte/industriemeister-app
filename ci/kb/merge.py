import json,re,sys,os
WAVE=sys.argv[1] if len(sys.argv)>1 else ''
W='/home/claude/app/www/';S=os.path.dirname(os.path.abspath(__file__))+'/'
ex=json.load(open(S+'existing.json'))
norm=lambda s:re.sub(r'[^a-zäöüß0-9 ]','',s.lower())
def js(s):return "'"+s.replace('\\','\\\\').replace("'","\\'")+"'"
DROP=set(json.load(open(S+'drop.json')))
meta={}
for k in ['BT','FT','MT','KW','PS','AUG','PF','PE','QM']:
    p=S+k+WAVE+'.json'
    src=W+'fc_'+k+'.js'
    t=open(src,encoding='utf8').read()
    cur=len(re.findall(r"\{id:'"+k+r"\d+'",t))
    meta[k]=cur
    if not os.path.exists(p): continue
    t=open(src,encoding='utf8').read()
    cards=json.load(open(p))
    seen={norm(c['q']) for c in ex[k]}
    cards=[c for c in cards if c['q'] not in DROP]
    # Sicherheitsnetz: nicht erneut anhängen, wenn schon eingefügt
    if any(norm(c['q'])in seen for c in cards[:1]) and cards[0]['q'] in t: print(k,'schon eingefügt');continue
    out=[];n=cur
    for c in cards:
        if norm(c['q']) in seen: print('Duplikat',k,c['q']);continue
        n+=1;seen.add(norm(c['q']))
        out.append(" {id:%s,ch:%s,q:%s,a:%s,pts:[%s]}"%(js("%s%03d"%(k,n)),js(c['ch']),js(c['q']),js(c['a']),','.join(js(x) for x in c.get('pts',[]))))
    idx=t.rstrip().rfind('];')
    body=t[:idx].rstrip()
    t2=body+',\n'+',\n'.join(out)+'\n];\n'
    open(src,'w',encoding='utf8').write(t2);meta[k]=n;print(k,cur,'->',n)
open(W+'fc_meta.js','w').write('// Anzahl Karteikarten je Fach (automatisch erzeugt)\nwindow.FC_META='+json.dumps(meta,separators=(',',':'))+';\n')
