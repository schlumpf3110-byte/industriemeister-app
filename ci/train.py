# Schüler-Anpassung: kleine Matrix W, so dass der Kosinus der angepassten e5-Vektoren dem Kosinus des Lehrers (Gemma) folgt
import json,numpy as np,torch,time,sys
torch.manual_seed(0);np.random.seed(0)
J=json.load(open('texts.json'));T=J['texts'];n=len(T);nt=J['nTrain'];d1=J['d1'];d2=J['d2']
E=np.fromfile('e5.f32',dtype=np.float32).reshape(n,d1);G=np.fromfile('gem.f32',dtype=np.float32).reshape(n,d2)
tidx={t:i for i,t in enumerate(T)}
# Paare: nächste Nachbarn im e5-Raum (schwierig) + Zufall, nur unter Trainingstexten
Et=torch.tensor(E[:nt]);S=Et@Et.T;S.fill_diagonal_(-1)
K=24;nb=S.topk(K,dim=1).indices.numpy()
I=[];Jx=[]
for i in range(nt):
    for j in nb[i]:I.append(i);Jx.append(int(j))
    for j in np.random.randint(0,nt,8):
        if j!=i:I.append(i);Jx.append(int(j))
I=np.array(I);Jx=np.array(Jx)
Gt=torch.tensor(G[:nt]);ge=(Gt[I]*Gt[Jx]).sum(1).numpy();ee=(Et[I]*Et[Jx]).sum(1).numpy()
tgt=(ge-ge.mean())/ge.std()*ee.std()+ee.mean()
print('Paare',len(I),'Lehrer-Kosinus',ge.mean().round(3),ge.std().round(3),'Schüler-Kosinus',ee.mean().round(3),ee.std().round(3),'Korrelation Roh',np.corrcoef(ge,ee)[0,1].round(3))
# 10 % der Texte als Prüfung
rng=np.random.RandomState(1);val=set(rng.choice(nt,nt//10,replace=False).tolist())
isv=np.array([(a in val) and (b in val) for a,b in zip(I,Jx)]);trm=np.array([(a not in val) and (b not in val) for a,b in zip(I,Jx)])
print('Trainingspaare',trm.sum(),'Prüfpaare',isv.sum())
X=torch.tensor(E);Iv=torch.tensor(I);Jv=torch.tensor(Jx);Tg=torch.tensor(tgt,dtype=torch.float32)
def cosW(W,a,b):
    u=torch.nn.functional.normalize(X[a]@W.T,dim=1);v=torch.nn.functional.normalize(X[b]@W.T,dim=1);return (u*v).sum(1)
W=torch.nn.Parameter(torch.eye(d1));opt=torch.optim.Adam([W],lr=2e-3)
tr_idx=torch.tensor(np.where(trm)[0]);va_idx=torch.tensor(np.where(isv)[0])
LAM=float(sys.argv[1]) if len(sys.argv)>1 else 1e-3
for ep in range(40):
    perm=tr_idx[torch.randperm(len(tr_idx))];tot=0
    for s in range(0,len(perm),4096):
        b=perm[s:s+4096];p=cosW(W,Iv[b],Jv[b]);loss=((p-Tg[b])**2).mean()+LAM*((W-torch.eye(d1))**2).sum()
        opt.zero_grad();loss.backward();opt.step();tot+=loss.item()*len(b)
    if ep%5==4 or ep==39:
        with torch.no_grad():pv=cosW(W,Iv[va_idx],Jv[va_idx]).numpy();r=np.corrcoef(pv,tgt[va_idx.numpy()])[0,1]
        print('Runde',ep+1,'Training',round(tot/len(perm),5),'Prüf-Korrelation mit Lehrer',round(float(r),3),flush=True)
with torch.no_grad():pv=cosW(W,Iv[va_idx],Jv[va_idx]).numpy()
print('Prüf-Korrelation Roh',np.corrcoef(ee[va_idx.numpy()],tgt[va_idx.numpy()])[0,1].round(3),'angepasst',np.corrcoef(pv,tgt[va_idx.numpy()])[0,1].round(3))
# Bewertung der Prüfpaare
pairs=J['pairs'];Wn=W.detach().numpy()
def adapt(x):u=x@Wn.T;return u/np.linalg.norm(u,axis=-1,keepdims=True)
def cs(A,a,b):return float((A[a]*A[b]).sum())
raw=np.array([cs(E,tidx[p[0]],tidx[p[1]]) for p in pairs]);Ea=adapt(E);ada=np.array([cs(Ea,tidx[p[0]],tidx[p[1]]) for p in pairs])
gem=np.array([cs(G,tidx[p[0]],tidx[p[1]]) for p in pairs])
y=np.array([p[2] for p in pairs]);src=np.array([p[3] for p in pairs])
def best(s,m):
    pos=s[m&(y==1)];neg=s[m&(y==0)];b=(0,0)
    for t in np.linspace(s.min(),s.max(),400):
        a=((pos>=t).mean()+(neg<t).mean())/2
        if a>b[0]:b=(a,t)
    return b
def acc_at(s,m,t):return ((s[m&(y==1)]>=t).mean()+(s[m&(y==0)]<t).mean())/2
res={}
for name,s in [('roh',raw),('angepasst',ada),('lehrer',gem)]:
    a_all,t_all=best(s,np.ones(len(y),bool));a1,t1=best(s,src=='p1');a2,t2=best(s,src=='p2')
    res[name]={'alle':round(a_all,3),'p1':round(a1,3),'p2':round(a2,3),'p2→p1':round(acc_at(s,src=='p1',t2),3),'p1→p2':round(acc_at(s,src=='p2',t1),3),'schwelle_alle':round(float(t_all),4),'schwelle_p1':round(float(t1),4),'schwelle_p2':round(float(t2),4)}
    print(name,res[name])
# Export: W als Int16 (×2048)
sc=2048.0;W16=np.clip(np.round(Wn*sc),-32768,32767).astype('<i2')
import base64
json.dump({'d':d1,'scale':sc,'w':base64.b64encode(W16.tobytes()).decode(),'res':res,'lam':LAM},open('adapter.json','w'))
print('adapter.json',len(json.dumps(res)))
