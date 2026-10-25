# Endgültiges Nachtrainieren auf allen eigenen Paaren, Wortschatz verkleinern, nach ONNX exportieren und quantisieren
import json,random,sys,time,glob,os,re,shutil,numpy as np,torch
from transformers import AutoTokenizer,AutoModel
from huggingface_hub import hf_hub_download
import torch.nn.functional as F
random.seed(0);np.random.seed(0);torch.manual_seed(0)
EPOCHS=int(sys.argv[1]) if len(sys.argv)>1 else 4;LR=float(sys.argv[2]) if len(sys.argv)>2 else 2e-5;MARGIN=0.55
ID='intfloat/multilingual-e5-small'
D=json.load(open('pairs_all.json'));print(len(D),'Paare',flush=True)
TOK=AutoTokenizer.from_pretrained(ID)
def emb(m,texts,tok=TOK):
    b=tok(texts,padding=True,truncation=True,max_length=96,return_tensors='pt');b.pop('token_type_ids',None);o=m(**b).last_hidden_state;mk=b['attention_mask'].unsqueeze(-1).float()
    return F.normalize((o*mk).sum(1)/mk.sum(1),dim=-1)
m=AutoModel.from_pretrained(ID,attn_implementation='eager')
opt=torch.optim.AdamW(m.parameters(),lr=LR,weight_decay=0.01);rows=[dict(d) for d in D];steps=EPOCHS*((len(rows)+15)//16)
sch=torch.optim.lr_scheduler.LambdaLR(opt,lambda i:min(1,(i+1)/20)*max(0.0,1-i/steps));m.train();t0=time.time()
for ep in range(EPOCHS):
    random.shuffle(rows);tot=0
    for i in range(0,len(rows),16):
        r=rows[i:i+16];c=(emb(m,['query: '+x['p'] for x in r])*emb(m,['query: '+x['a'] for x in r])).sum(1);y=torch.tensor([float(x['y']) for x in r])
        loss=(y*(1-c)**2+(1-y)*torch.clamp(c-MARGIN,min=0)**2).mean();opt.zero_grad();loss.backward();opt.step();sch.step();tot+=loss.item()
    print('Epoche',ep,'Verlust',round(tot/(len(rows)/16),4),round(time.time()-t0),'s',flush=True)
m.eval()
# ── Textkorpus der App für den Wortschatz ──
texts=[]
for f in glob.glob('../www/*.js')+glob.glob('../www/*.json'):
    b=os.path.basename(f)
    if b.startswith('appki-') or b=='ask-assoc.json':continue
    texts.append(open(f,encoding='utf8',errors='ignore').read())
for d in D:texts+=[d['p'],d['a']]
for f in glob.glob('qaset*.mjs'):texts.append(open(f,encoding='utf8').read())
chunks=[]
for t in texts:
    for i in range(0,len(t),1500):chunks.append(t[i:i+1500])
print('Korpus',len(chunks),'Stücke',sum(len(c) for c in chunks)//1000,'k Zeichen',flush=True)
used=set(range(4))
for i in range(0,len(chunks),256):
    for ids in TOK(chunks[i:i+256],add_special_tokens=False)['input_ids']:used.update(ids)
tj=json.load(open(hf_hub_download(ID,'tokenizer.json')))
vocab=tj['model']['vocab'];print('Wortschatz',len(vocab),'benutzt',len(used))
for i,(p,s) in enumerate(vocab):
    q=p.replace('▁','')
    if len(q)<=1 and (q=='' or re.match(r'^[A-Za-zÄÖÜäöüß0-9.,;:!?()\-–/%=+*<>"\'°²³µΩ€&§]$',q)):used.add(i)
mask_id=TOK.mask_token_id
keep=sorted(i for i in used if i<len(vocab));rowsel=list(keep);newid={o:n for n,o in enumerate(keep)}
tj['model']['vocab']=[vocab[i] for i in keep]
if mask_id not in newid:
    newid[mask_id]=len(keep);rowsel.append(mask_id);tj['model']['vocab'].append(['<mask>',0.0])
print('behalte',len(rowsel),'mask',mask_id,'Wortschatzlänge',len(vocab))
tj['added_tokens']=[dict(a,id=newid[a['id']]) for a in tj['added_tokens'] if a['id'] in newid]
OUT='out/e5-ft';os.makedirs(OUT+'/onnx',exist_ok=True)
json.dump(tj,open(OUT+'/tokenizer.json','w'),ensure_ascii=False)
for f in ['tokenizer_config.json','special_tokens_map.json','sentencepiece.bpe.model']:
    try:
        if f!='sentencepiece.bpe.model':shutil.copy(hf_hub_download(ID,f),OUT+'/'+f)
    except Exception as e:print('ohne',f,e)
cfg=json.load(open(hf_hub_download(ID,'config.json')));cfg['vocab_size']=len(tj['model']['vocab']);json.dump(cfg,open(OUT+'/config.json','w'))
# Einbettungen kürzen
old=m.embeddings.word_embeddings.weight.data;new=torch.nn.Embedding(len(tj['model']['vocab']),old.shape[1],padding_idx=1)
keep_t=torch.tensor(rowsel);new.weight.data=old[keep_t].clone();ref=None
from tokenizers import Tokenizer
NT=Tokenizer.from_file(OUT+'/tokenizer.json')
# Prüfung der Tokenisierung: gleiche Stücke wie vorher
bad=0;tot=0;sample=random.sample(chunks,min(300,len(chunks)))
for s in sample:
    a=TOK(s[:400],add_special_tokens=True)['input_ids'];b=NT.encode(s[:400]).ids;tot+=1
    if [newid.get(x,3) for x in a]!=b:bad+=1
print('Tokenisierung abweichend in',bad,'von',tot,flush=True)
pt=[d['p'] for d in D[:120]]+[d['a'] for d in D[:120]]
with torch.no_grad():
    ref=emb(m,['query: '+x for x in pt])
m.embeddings.word_embeddings=new;m.config.vocab_size=len(tj['model']['vocab'])
class W(torch.nn.Module):
    def __init__(s,m):super().__init__();s.m=m
    def forward(s,input_ids,attention_mask):return s.m(input_ids=input_ids,attention_mask=attention_mask).last_hidden_state
w=W(m).eval()
def emb2(texts):
    enc=[NT.encode('query: '+t) for t in texts];L=max(len(e.ids) for e in enc);ids=torch.ones(len(enc),L,dtype=torch.long);am=torch.zeros(len(enc),L,dtype=torch.long)
    for i,e in enumerate(enc):ids[i,:len(e.ids)]=torch.tensor(e.ids);am[i,:len(e.ids)]=1
    with torch.no_grad():o=w(ids,am)
    mk=am.unsqueeze(-1).float();return F.normalize((o*mk).sum(1)/mk.sum(1),dim=-1)
# NT.encode setzt <s>…</s> selbst (Nachbearbeitung); „query: “ steckt schon im Text
new_emb=emb2(pt);print('verkleinertes Modell gegen Original: Kosinus min',float((ref*new_emb).sum(1).min()),'mittel',float((ref*new_emb).sum(1).mean()),flush=True)
json.dump({'texts':pt,'vecs':[[round(float(x),5) for x in v] for v in new_emb]},open('ft_ref.json','w'))
ids=torch.ones(2,12,dtype=torch.long);am=torch.ones(2,12,dtype=torch.long)
torch.onnx.export(w,(ids,am),'out/model.onnx',input_names=['input_ids','attention_mask'],output_names=['last_hidden_state'],dynamic_axes={'input_ids':{0:'b',1:'s'},'attention_mask':{0:'b',1:'s'},'last_hidden_state':{0:'b',1:'s'}},opset_version=17,dynamo=False)
from onnxruntime.quantization import quantize_dynamic,QuantType
quantize_dynamic('out/model.onnx',OUT+'/onnx/model_quantized.onnx',weight_type=QuantType.QUInt8)
for f in ['out/model.onnx',OUT+'/onnx/model_quantized.onnx']:print(f,os.path.getsize(f)//1000,'kB')
os.remove('out/model.onnx')
