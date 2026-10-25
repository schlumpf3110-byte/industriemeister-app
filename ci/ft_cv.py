# Nachtrainieren des schnellen Modells (e5-small) mit eigenen Lehrdaten – 5-fach-Kreuzprüfung (Punkte nie in Training und Prüfung gemeinsam)
import json,random,sys,time,numpy as np,torch
from transformers import AutoTokenizer,AutoModel
import torch.nn.functional as F
random.seed(0);np.random.seed(0);torch.manual_seed(0)
D=json.load(open('pairs_all.json'));print(len(D),'Paare',sum(d['y'] for d in D),'richtig')
EPOCHS=int(sys.argv[1]) if len(sys.argv)>1 else 4;LR=float(sys.argv[2]) if len(sys.argv)>2 else 2e-5
pts=sorted({d['p'] for d in D});random.shuffle(pts);K=5;fold={p:i%K for i,p in enumerate(pts)}
def bal(s,y,t):
    s=np.array(s);y=np.array(y);return ((s[y==1]>=t).mean()+(s[y==0]<t).mean())/2
def best(s,y):
    vals=sorted(set(s));b=(0,0)
    for i,v in enumerate(vals):
        t=v if i==0 else (v+vals[i-1])/2;a=bal(s,y,t)
        if a>b[0]:b=(a,t)
    return b
TOK=AutoTokenizer.from_pretrained('intfloat/multilingual-e5-small')
def emb(m,texts):
    b=TOK(texts,padding=True,truncation=True,max_length=96,return_tensors='pt');o=m(**b).last_hidden_state;mk=b['attention_mask'].unsqueeze(-1).float()
    return F.normalize((o*mk).sum(1)/mk.sum(1),dim=-1)
def sims(m,rows):
    m.eval();out=[]
    with torch.no_grad():
        for i in range(0,len(rows),64):
            r=rows[i:i+64];out+=(emb(m,['query: '+x['p'] for x in r])*emb(m,['query: '+x['a'] for x in r])).sum(1).tolist()
    return np.array(out)
MARGIN=float(sys.argv[3]) if len(sys.argv)>3 else 0.55
def train(m,rows,epochs,lr):
    opt=torch.optim.AdamW(m.parameters(),lr=lr,weight_decay=0.01);steps=epochs*((len(rows)+15)//16);sch=torch.optim.lr_scheduler.LambdaLR(opt,lambda i:min(1,(i+1)/20)*max(0.0,1-i/steps));m.train()
    for ep in range(epochs):
        random.shuffle(rows)
        for i in range(0,len(rows),16):
            r=rows[i:i+16];c=(emb(m,['query: '+x['p'] for x in r])*emb(m,['query: '+x['a'] for x in r])).sum(1);y=torch.tensor([float(x['y']) for x in r])
            loss=(y*(1-c)**2+(1-y)*torch.clamp(c-MARGIN,min=0)**2).mean();opt.zero_grad();loss.backward();opt.step();sch.step()
res={'roh':[], 'nachtrainiert':[]};allS={'roh':[], 'nachtrainiert':[]};allY=[]
for k in range(K):
    tr=[d for d in D if fold[d['p']]!=k];te=[d for d in D if fold[d['p']]==k]
    m=AutoModel.from_pretrained('intfloat/multilingual-e5-small')
    s0=sims(m,te);ytr=[d['y'] for d in tr]
    # Schwelle für „roh“ auf Training bestimmen
    t0=best(sims(m,tr),ytr)[1]
    t1=time.time();train(m,[dict(d) for d in tr],EPOCHS,LR)
    s1=sims(m,te);t1b=best(sims(m,tr),ytr)[1]
    yte=[d['y'] for d in te]
    res['roh'].append(bal(s0,yte,t0));res['nachtrainiert'].append(bal(s1,yte,t1b))
    allS['roh']+=list(s0);allS['nachtrainiert']+=list(s1);allY+=yte
    print('Teil',k,'roh',round(res['roh'][-1],3),'nachtrainiert',round(res['nachtrainiert'][-1],3),'Trainingszeit',round(time.time()-t1),'s',flush=True)
for n in res:print(n,'Mittel',round(float(np.mean(res[n])),3),'gepoolt (beste Schwelle)',round(best(allS[n],allY)[0],3))
srcs=sorted({d['s'] for d in D})
# je Quelle
order=[d for k in range(K) for d in D if fold[d['p']]==k]
for sname in srcs:
    ix=[i for i,d in enumerate(order) if d['s']==sname]
    for n in allS:
        s=[allS[n][i] for i in ix];y=[allY[i] for i in ix]
        print(sname,n,'Prüfsatz-Trefferquote',round(best(s,y)[0],3),'(n=%d)'%len(ix))
json.dump({'roh':res['roh'],'nach':res['nachtrainiert']},open('ft_cv.json','w'))
