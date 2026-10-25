# Kreuz-Kodierer (Frage-Antwort-Paar gemeinsam lesen) auf e5-small-Basis: 5-fach-Kreuzprüfung mit gleichen Faltungen wie ft_cv.py
import json,random,sys,time,numpy as np,torch
from transformers import AutoTokenizer,AutoModelForSequenceClassification
random.seed(0);np.random.seed(0);torch.manual_seed(0)
D=json.load(open('pairs_all.json'));print(len(D),'Paare',sum(d['y'] for d in D),'richtig',flush=True)
EPOCHS=int(sys.argv[1]) if len(sys.argv)>1 else 4;LR=float(sys.argv[2]) if len(sys.argv)>2 else 3e-5
pts=sorted({d['p'] for d in D});random.shuffle(pts);K=5;fold={p:i%K for i,p in enumerate(pts)}
def bal(s,y,t):
    s=np.array(s);y=np.array(y);return ((s[y==1]>=t).mean()+(s[y==0]<t).mean())/2
def best(s,y):
    vals=sorted(set(s));b=(0,0)
    for i,v in enumerate(vals):
        t=v if i==0 else (v+vals[i-1])/2;a=bal(s,y,t)
        if a>b[0]:b=(a,t)
    return b
ID='intfloat/multilingual-e5-small';TOK=AutoTokenizer.from_pretrained(ID)
def enc(rows):return TOK(['query: '+x['p'] for x in rows],['query: '+x['a'] for x in rows],padding=True,truncation=True,max_length=128,return_tensors='pt')
def probs(m,rows):
    m.eval();out=[]
    with torch.no_grad():
        for i in range(0,len(rows),64):out+=torch.softmax(m(**enc(rows[i:i+64])).logits,-1)[:,1].tolist()
    return np.array(out)
def train(m,rows,epochs,lr):
    opt=torch.optim.AdamW(m.parameters(),lr=lr,weight_decay=0.01);steps=max(1,epochs*((len(rows)+15)//16));sch=torch.optim.lr_scheduler.LambdaLR(opt,lambda i:min(1,(i+1)/20)*max(0.0,1-i/steps));m.train()
    for ep in range(epochs):
        random.shuffle(rows)
        for i in range(0,len(rows),16):
            r=rows[i:i+16];b=enc(r);y=torch.tensor([int(x['y']) for x in r]);loss=torch.nn.functional.cross_entropy(m(**b).logits,y);opt.zero_grad();loss.backward();opt.step();sch.step()
res=[];allS=[];allY=[];order=[]
for k in range(K):
    tr=[d for d in D if fold[d['p']]!=k];te=[d for d in D if fold[d['p']]==k]
    m=AutoModelForSequenceClassification.from_pretrained(ID,num_labels=2)
    t1=time.time();train(m,[dict(d) for d in tr],EPOCHS,LR)
    s=probs(m,te);yte=[d['y'] for d in te];ttr=best(probs(m,tr),[d['y'] for d in tr])[1]
    res.append(bal(s,yte,0.5));allS+=list(s);allY+=yte;order+=te
    print('Teil',k,'Kreuz-Kodierer (Schwelle 0.5)',round(res[-1],3),'beste Schwelle auf Prüfteil',round(best(s,yte)[0],3),'Zeit',round(time.time()-t1),'s',flush=True)
print('Mittel (0.5)',round(float(np.mean(res)),3),'gepoolt beste Schwelle',round(best(allS,allY)[0],3),'bei',round(best(allS,allY)[1],3))
for sname in sorted({d['s'] for d in D}):
    ix=[i for i,d in enumerate(order) if d['s']==sname];print(sname,'Trefferquote',round(best([allS[i] for i in ix],[allY[i] for i in ix])[0],3),'(n=%d)'%len(ix))
json.dump({'oof':[round(float(x),4) for x in allS],'y':allY,'src':[d['s'] for d in order]},open('ft_ce.json','w'))
