import { ARCHIVE, ISSUES, TASKS, TYPES, KIT, WAYS, FRAMES, GLOSSARY } from './content.js';

const LATEST = ARCHIVE[0];
const MONTHS = [...new Set(ARCHIVE.map(issue=>issue.date.slice(0,7)))];
const OCCURRENCES = { gif:[['creative','t-gif-1','最近的變化：讓圖片動起來']], storyboard:[['creative','t-sb-1','專家的做法']] };
const TERMS = GLOSSARY.map(entry => ({
  id:entry.id,term:entry.term,plain:entry.plain,alias:entry.searchTerms,
  use:entry.editorNote,first:entry.firstUse,ex:entry.example,
  src:{name:entry.source.title,url:entry.source.url,date:entry.checkedAt},
  extra:entry.extraSource?{name:entry.extraSource.title,url:entry.extraSource.url}:null,
  occ:OCCURRENCES[entry.id]||[],category:entry.category,feel:entry.promptExample?.from||'',
  design:entry.category==='design'?entry:null
}));

/* ───────── 共用小工具 ───────── */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ic=n=>`<svg class="ic" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const norm=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');
const H=(path,p={})=>{const u=new URLSearchParams();Object.entries(p).forEach(([k,v])=>{if(v)u.set(k,v)});const s=u.toString();return '#'+path+(s?'?'+s:'')};
const route=()=>{const raw=location.hash||'#/';const [p,q='']=raw.slice(1).split('?');return{raw,parts:p.split('/').filter(Boolean),q:new URLSearchParams(q)}};
const parseD=d=>{const [y,m,n]=d.split('-').map(Number);return new Date(y,m-1,n)};
const WD='日一二三四五六';
const returnRoute=value=>/^#\/(?:(?:issue|toolkit|archive|glossary)(?:\/[a-z0-9-]+)?)?(?:\?[^#\r\n]*)?$/i.test(value||'')?value:'';
const md=d=>{const o=parseD(d);return `${o.getMonth()+1}/${o.getDate()}`};
const longD=d=>{const o=parseD(d);return `${o.getFullYear()}/${o.getMonth()+1}/${o.getDate()}（週${WD[o.getDay()]}）`};
const taskName=id=>(TASKS.find(t=>t[0]===id)||[])[1]||'';
const ui={way:'card',open:new Set(),tpl:FRAMES.map(f=>({scene:f.scene,cap:f.cap}))};
const kitFilter=q=>{const task=q.get('task'),type=q.get('type'),s=norm(q.get('q'));return KIT.filter(k=>(!task||k.tasks.includes(task))&&(!type||k.type===type)&&(!s||norm([k.title,k.sum,k.kw,k.type,...k.tasks.map(taskName)].join(' ')).includes(s)))};
const arcFilter=q=>{const d=q.get('date'),kind=q.get('kind'),s=norm(q.get('q'));return ARCHIVE.filter(a=>(!d||a.date===d)&&(!kind||a.kind===kind)&&(!s||norm([a.title,a.kind,md(a.date),a.keywords].join(' ')).includes(s)))};
/* 短英文（PR、AI、UI）只比對完整單字，避免 PR 誤中 Preview；也能用讀者的原話（太擠）找 */
const termHit=(text,n,short)=>short?String(text||'').normalize('NFKC').toLowerCase().split(/[^a-z0-9]+/).includes(n):norm(text).includes(n);
const termMatch=s=>{const n=norm(s);if(!n)return TERMS.map(t=>({t}));const short=/^[a-z0-9]{1,3}$/.test(n),out=[];TERMS.forEach(t=>{if(termHit(t.term,n,short)||termHit(t.plain,n,short)){out.push({t});return}const a=[...t.alias,t.feel].find(x=>x&&termHit(x,n,short));if(a)out.push({t,via:a})});return out};
/* 把來源網址轉成返回按鈕文字，讓人知道會回到哪裡 */
function describe(h){
  if(!h)return '';const [p,q='']=h.slice(1).split('?');const a=p.split('/').filter(Boolean),u=new URLSearchParams(q);
  if(a[0]==='issue'&&ISSUES[a[1]])return `回到〈${ISSUES[a[1]].short}〉${u.get('at')?'剛才的段落':''}`;
  if(a[0]==='toolkit'&&!a[1]){const n=kitFilter(u).length,t=taskName(u.get('task'));return `回到查找結果（${t?t+'，':''}${n} 筆）`}
  if(a[0]==='toolkit')return '回到分鏡模板';
  if(a[0]==='archive')return u.get('date')?`回到往期（${md(u.get('date'))}）`:'回到往期';
  if(a[0]==='glossary')return '回到詞庫';
  return '回到上一頁';
}
const ret=f=>f?`<a class="retbar" data-return data-testid="return-bar" href="${esc(f)}">${ic('l')}${esc(describe(f))}</a>`:'';

/* ───────── 三格分鏡（HTML/CSS，不是圖片，不自動播放） ───────── */
function scr(i){
  if(i===0)return `<div class="scr" aria-hidden="true"><span class="bar"></span><span class="ok">${ic('ok')}</span><b>報名完成</b><span class="dim">接下來呢？</span><span class="cta">查看活動流程</span></div>`;
  if(i===1)return `<div class="scr" aria-hidden="true"><span class="bar"></span><b class="dim">報名完成</b><span class="dim">接下來呢？</span><span class="cta on">查看活動流程<svg class="ic tap"><use href="#i-tap"/></svg></span></div>`;
  return `<div class="scr" aria-hidden="true"><span class="bar"></span><b>活動流程</b><dl><div><dt>時間</dt><dd>週六 9:30</dd></div><div><dt>地點</dt><dd>活動中心</dd></div><div><dt>準備</dt><dd>確認信</dd></div></dl></div>`;
}
const board=(scene)=>`<ol class="board" data-testid="storyboard">${FRAMES.map((f,i)=>`<li>${scr(i)}<div class="fmeta"><span class="ftime">${f.t}</span><span class="tbar" style="--l:${f.l};--w:${f.w}"><i></i></span>${scene?`<p class="fscene">畫面：${esc(f.scene)}</p>`:`<span class="sr">畫面：${esc(f.scene)}。</span>`}<p class="fcap">${scene?'字幕：':''}${esc(f.cap)}</p></div></li>`).join('')}</ol>`;

/* ───────── 首頁 ───────── */
function vHome(){
  const c=LATEST;
  const quick=[['intro','我要介紹功能'],['anim','我要做動畫'],['video','我要拍教學短片']];
  return `<section class="hero wrap"><div class="${c.storyboard?'hero-grid':'hero-text'}"><div>
    <p class="kicker"><b>最新一期</b><span>${longD(c.date)}</span><span>${c.kind}篇</span>${c.label?`<span class="tag">${esc(c.label)}</span>`:''}<span>${c.read}</span></p>
    <h1 tabindex="-1">${esc(c.title).replace('15 秒的動畫，','<span class="hero-phrase">15 秒的動畫，</span>').replace('活動流程','<span class="hero-phrase">活動流程</span>')}</h1>
    <p class="deck">${c.deck}</p>
    <div class="btns"><a class="btn btn-p" data-testid="cta-latest" href="${H('/issue/'+c.id)}">讀最新一期${ic('r')}</a><a class="btn btn-s" href="#/toolkit/m-01">打開分鏡模板</a></div>
  </div>${c.storyboard?`<figure class="plate">${board()}<figcaption>這期的三格示意分鏡。活動報名頁為情境範例。</figcaption></figure>`:''}</div></section>
  <section class="sec sec-t wrap" aria-labelledby="h-idx" style="padding-top:clamp(32px,4vw,52px)">
    <div class="sec-h"><h2 id="h-idx">這期會讀到什麼</h2></div>
    <ol class="idx">${c.secs.slice(0,4).map((s,i)=>`<li><a href="${H('/issue/'+c.id,{at:s[0]})}"><span class="n">第 ${i+1} 段</span><h3>${s[1]}</h3><p>${s[2]}</p></a></li>`).join('')}</ol>
  </section>
  <section class="sec wrap two">
    <div><h2 id="h-find" style="margin-bottom:20px">下次要用時，從要做的事找</h2>
      <ul class="tasks" aria-labelledby="h-find">${quick.map(([id,l])=>`<li><a href="${H('/toolkit',{task:id})}">${l}<small>${KIT.filter(k=>k.tasks.includes(id)).length} 筆${ic('r')}</small></a></li>`).join('')}</ul>
      <p style="margin-top:14px"><a class="lnk" href="#/toolkit">看全部素材與做法</a></p></div>
    <div><h2 style="margin-bottom:20px">看到不懂的詞</h2>
      <form data-form="home-term"><label class="field"><span>輸入原詞或白話都可以</span><div class="formrow"><span class="search">${ic('s')}<input class="inp" name="q" type="search" placeholder="例如：動圖" autocomplete="off"></span><button class="btn btn-p" type="submit">查詞</button></div></label></form>
      <p style="margin-top:10px"><a class="lnk" data-testid="home-design-terms" href="${H('/glossary',{kind:'design'})}">畫面怪怪的，從看到的效果找</a></p>
      <h2 class="small muted" style="font:600 var(--fs-small)/1.6 var(--font-body);margin:28px 0 6px">往期</h2>
      <p style="margin-top:10px"><a class="lnk" href="#/archive">依日期找往期</a></p></div>
  </section>`;
}
/* ───────── 文章 ───────── */
const T=(id,text,key)=>`<a class="term" id="${key}" data-term="${id}" data-testid="term-${id}" href="#/glossary/${id}">${text}<span class="sr">（查詞）</span></a>`;
const N=s=>`<aside class="note" aria-label="來源"><span>來源</span><a data-testid="source-link" href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}${ic('ext')}<i class="sr">（開新分頁）</i></a><span>${esc(s.date)}</span></aside>`;
const P=(id,inner,note='')=>`<div class="para" ${id?`id="${id}" tabindex="-1"`:''}><div>${inner}</div>${note}</div>`;
const V=(tag,txt)=>`<p class="voice"><span class="tag">${tag}</span>${txt?`<span>${txt}</span>`:''}</p>`;
const S=(id,tag,txt,title,body)=>`<section id="${id}" aria-labelledby="${id}-h">${tag?V(tag,txt):''}<h2 id="${id}-h" tabindex="-1">${title}</h2>${body}</section>`;
const copyBox=(id,text)=>`<div class="copybox lim"><p class="copy-text" id="${id}">${esc(text)}</p><div class="btns"><button class="btn btn-s" data-copy="${id}" data-testid="copy-${id}">${ic('copy')}複製指令</button></div></div>`;
const srcTable=rows=>`<table class="srcs"><caption class="sr">來源與採用狀態</caption><thead><tr><th>出處</th><th>來源查核</th><th>採用審查</th></tr></thead><tbody>${rows.map(([s,c,a])=>`<tr><th scope="row"><a class="lnk" style="display:inline" href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a></th><td data-l="來源查核">${c}</td><td data-l="採用審查">${a}</td></tr>`).join('')}</tbody></table>`;
const compare=()=>`<fieldset><legend>你的讀者卡在哪裡？</legend><div class="opts">${WAYS.map(w=>`<label class="opt"><input type="radio" name="way" value="${w.id}" data-testid="compare-${w.id}" ${ui.way===w.id?'checked':''}><span>${w.opt}</span></label>`).join('')}</div></fieldset>
  <div class="ways">${WAYS.map(w=>`<article class="way ${ui.way===w.id?'on':''}" data-way="${w.id}"><span class="pick"><b>先試這個</b></span><h3>${w.name}</h3><dl><dt>適用情境</dt><dd>${w.when}</dd><dt>製作投入</dt><dd>${w.costT}<span class="cost" aria-hidden="true">${[1,2,3].map(n=>`<i class="${n<=w.cost?'f':''}"></i>`).join('')}</span></dd></dl></article>`).join('')}</div>`;
const endBlock=(t,b)=>`<div class="done"><h3>讀完了</h3><p>${t}</p><div class="btns">${b}</div></div>`;
function vIssue(id,r){
  const it=ISSUES[id],from=returnRoute(r.q.get('from'));
  if(!Object.hasOwn(ISSUES,id))return vMissing();
  const toc=it.secs.map(s=>`<a href="${H('/issue/'+id,{at:s[0],from})}" data-sec="${s[0]}">${s[1]}</a>`).join('');
  const hero=it.storyboard?`<figure class="plate" style="margin-top:26px">${board()}<figcaption>三格示意分鏡。活動報名頁為情境範例。</figcaption></figure>`:'';
  const body=it.body({ S, P, T, N, H, compare, board, srcTable, endBlock, copyBox });
  return `<div class="wrap ${from?'has-ret':''}">${ret(from)}
    <header class="ihead"><p class="kicker"><b>${longD(it.date)}</b><span>${it.kind}篇</span>${it.label?`<span class="tag">${esc(it.label)}</span>`:''}<span>${it.read}</span></p>
      <h1 tabindex="-1" data-testid="issue-title">${it.title}</h1><p class="deck">${it.deck}</p>
      <p class="one"><span>這期的一句話</span><strong>${it.one}</strong></p>${hero}
      <p class="imeta">${it.period?`<span>${esc(it.period)}</span>`:''}<span>編號 ${it.code}</span><span>版次 v${it.edition}</span><span>查核 ${it.checkedAt}</span>${it.glossaryLinks?'<span>文中有虛線的詞可以點開看解釋</span>':''}</p></header>
    <details class="more toc-m"><summary>本期目錄</summary><div class="rail" style="display:block;position:static">${toc}</div></details>
    <div class="art"><nav class="rail" aria-label="本期目錄"><p>本期目錄</p>${toc}</nav><article class="flow">${body}</article></div></div>`;
}
const vMissing=()=>`<div class="wrap"><div class="phead"><h1 tabindex="-1">找不到這個頁面</h1></div><div class="empty" style="margin-bottom:64px"><p class="muted">連結可能打錯了。</p><div class="btns"><a class="btn btn-p" href="#/">回首頁</a></div></div></div>`;

/* ───────── 往期 ───────── */
function calHTML(q){
  const requested=q.get('m')||q.get('date')?.slice(0,7);
  const ym=MONTHS.includes(requested)?requested:MONTHS[0];
  const [y,m]=ym.split('-').map(Number);
  const first=new Date(y,m-1,1).getDay(), days=new Date(y,m,0).getDate();
  const cells=Array(first).fill(''), pick=q.get('date');
  for(let day=1;day<=days;day++)cells.push(day);
  while(cells.length%7)cells.push('');
  const rows=[];
  for(let i=0;i<cells.length;i+=7)rows.push(cells.slice(i,i+7));
  const tab=pick?.startsWith(ym)?pick:ARCHIVE.find(a=>a.date.startsWith(ym)).date;
  const monthIndex=MONTHS.indexOf(ym);
  const arrows=(month,label,icon)=>`<button class="icon-b" data-month="${month||''}" ${month?'':'disabled'} aria-label="${label}">${ic(icon)}</button>`;
  return `<div class="cal-h">${arrows(MONTHS[monthIndex+1],'較早的出刊月份','l')}<b aria-live="polite">${y} 年 ${m} 月</b>${arrows(MONTHS[monthIndex-1],'較新的出刊月份','r')}</div>
  <table class="cal" aria-label="${y} 年 ${m} 月的出刊日期"><thead><tr>${[...WD].map(d=>`<th scope="col">${d}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(day=>{
    if(!day)return '<td></td>';
    const date=`${ym}-${String(day).padStart(2,'0')}`;
    const count=ARCHIVE.filter(issue=>issue.date===date).length;
    return `<td><button data-date="${date}" data-testid="date-${date}" tabindex="${date===tab?0:-1}" class="${count?'has':''}" aria-pressed="${pick===date}" aria-label="${m} 月 ${day} 日，${count?count+' 期':'沒有出刊'}">${day}</button></td>`;
  }).join('')}</tr>`).join('')}</tbody></table>`;
}
function arcResults(q){
  const list=arcFilter(q),d=q.get('date');
  if(!list.length){
    let near=null;if(d)near=ARCHIVE.filter(a=>a.date<=d)[0]||ARCHIVE[ARCHIVE.length-1];
    return `<div class="empty" data-testid="empty-state"><h3>${d&&!ARCHIVE.some(a=>a.date===d)?`${md(d)} 沒有出刊`:'找不到符合的文章'}</h3><p class="muted">${near?`離這天最近的是 ${md(near.date)}。`:'換個關鍵字，或清除條件再看一次。'}</p><div class="btns"><button class="btn btn-p" data-clear="archive" data-testid="filter-clear">清除條件</button>${near?`<button class="btn btn-s" data-date="${near.date}">看 ${md(near.date)}</button>`:''}</div></div>`}
  const by={};list.forEach(a=>{const k=a.date.slice(0,7);(by[k]=by[k]||[]).push(a)});
  const from=location.hash;
  return Object.keys(by).map(k=>`<h3 class="m">${k.slice(0,4)} 年 ${Number(k.slice(5))} 月</h3>${by[k].map(a=>{const o=parseD(a.date);return `<a class="row" id="arc-${a.id}" data-testid="arc-${a.id}" href="${H('/issue/'+a.id,{from})}"><span class="d">${o.getDate()}<small>週${WD[o.getDay()]}</small></span><span><span class="tags"><span class="tag tag-line">${a.kind}</span>${a.label?`<span class="tag">${esc(a.label)}</span>`:''}</span><span class="t">${esc(a.title)}</span></span>${ic('chev')}</a>`}).join('')}`).join('');
}
const arcCount=q=>{const n=arcFilter(q).length,on=q.get('date')||q.get('kind')||q.get('q');return `<span class="small muted" id="arc-count">${on?'符合條件':'全部'} ${n} 期</span>${on?`<button class="btn btn-t small" data-clear="archive">清除條件</button>`:''}`};
function vArchive(r){
  const q=r.q,kind=q.get('kind')||'';
  return `<div class="wrap"><header class="phead"><h1 tabindex="-1">往期</h1><p>記得大概哪一天，從日期找。記得內容，直接打關鍵字。</p></header>
  <div class="arc"><div class="side"><div id="arc-cal">${calHTML(q)}</div><p class="legend"><span><i></i>有出刊</span></p></div>
  <div><div class="kit-f"><label class="search"><span class="sr">搜尋往期</span>${ic('s')}<input class="inp" type="search" data-filter="archive" data-testid="arc-search" placeholder="輸入關鍵字，例如：動畫" value="${esc(q.get('q')||'')}" autocomplete="off"></label>
  <div class="chips" role="group" aria-label="類型">${[['','全部'],...Array.from(new Set(ARCHIVE.map(issue=>issue.kind)),kind=>[kind,kind])].map(([v,l])=>`<button class="chip" data-kind="${v}" aria-pressed="${kind===v}">${l}</button>`).join('')}</div></div>
  <div class="bar-r" id="arc-bar">${arcCount(q)}</div><div class="ml" id="arc-res">${arcResults(q)}</div></div></div></div>`;
}

/* ───────── 素材與做法 ───────── */
function kitCard(k,from){
  const src=H('/issue/'+k.issue,{at:k.at,from});
  const st=`<dl class="st"><div><dt>來源查核</dt><dd>${k.check}</dd></div><div><dt>採用審查</dt><dd>${k.adopt}</dd></div></dl>`;
  const head=`<div class="tags"><span class="tag ${k.type==='參考'?'tag-line':''}">${k.type}</span>${k.tasks.map(t=>`<span class="small muted">${taskName(t)}</span>`).join('<span class="small muted" aria-hidden="true">·</span>')}</div>`;
  if(k.prompt){
    const copyId=`kit-prompt-${k.id}`;
    return `<article class="kit lead-card" id="kit-${k.id}" data-testid="kit-${k.id}">${head}<h3>${esc(k.title)}</h3><p>${esc(k.sum)}</p><span id="${copyId}" hidden>${esc(k.prompt)}</span><div class="btns"><button type="button" class="btn btn-p" data-copy="${copyId}" data-testid="copy-${k.id}" data-copy-fallback="無法自動複製。請回原文選取指令">${ic('copy')}複製分鏡指令</button><a class="lnk" id="src-${k.id}" data-testid="src-${k.id}" href="${src}">回原文看怎麼用</a></div>${st}</article>`;
  }
  if(k.type==='素材')return `<article class="kit lead-card" id="kit-${k.id}" data-testid="kit-${k.id}">${head}<h3><a href="${H('/toolkit/'+k.id,{from})}">${k.title}</a></h3><p>${k.sum}</p><div class="btns"><a class="btn btn-p" id="open-${k.id}" data-testid="open-${k.id}" href="${H('/toolkit/'+k.id,{from})}">看模板並下載</a><a class="lnk" href="${src}">回到來源段落</a></div>${st}</article>`;
  if(k.type==='做法'){const h=k.how;return `<article class="kit" id="kit-${k.id}" data-testid="kit-${k.id}">${head}<h3>${k.title}</h3><p>${k.sum}</p><details class="how" data-how="${k.id}" ${ui.open.has(k.id)?'open':''}><summary data-testid="how-${k.id}">${ic('chev')}展開做法</summary><div class="how-b"><div><h4>適用情境</h4><p>${h.fit}</p></div><div><h4>步驟</h4><ol class="steps">${h.steps.map(s=>`<li><span>${s}</span></li>`).join('')}</ol></div><div><h4>怎樣算成功</h4><p>${h.done}</p></div><div><h4>已知限制</h4><p>${h.limit}</p></div><a class="lnk" data-testid="src-${k.id}" id="src-${k.id}" href="${src}">回到來源段落</a></div></details>${st}</article>`}
  return `<article class="kit" id="kit-${k.id}" data-testid="kit-${k.id}">${head}<h3>${k.title}</h3><p>${k.sum}</p><div class="btns"><a class="lnk" href="${k.src.url}" target="_blank" rel="noopener noreferrer">看原始出處${ic('ext')}<span class="sr">（開新分頁）</span></a><a class="lnk" id="src-${k.id}" href="${src}">回到提到它的段落</a></div>${st}</article>`;
}
function kitResults(q){
  const list=kitFilter(q),s=q.get('q');
  if(!list.length)return `<div class="empty" style="grid-column:1/-1" data-testid="empty-state"><h3>${s?`找不到「${esc(s)}」`:'這個組合沒有結果'}</h3><p class="muted">換個說法，或清除條件看全部。</p><div class="btns"><button class="btn btn-p" data-clear="toolkit" data-testid="filter-clear">清除條件</button></div></div>`;
  const from=location.hash;return list.map(k=>kitCard(k,from)).join('');
}
const kitCount=q=>{const n=kitFilter(q).length,t=taskName(q.get('task')),on=q.get('task')||q.get('type')||q.get('q');return `<span class="small muted" id="kit-count" data-testid="kit-count">${t?t+'：':''}${n} 筆</span>${on?`<button class="btn btn-t small" data-clear="toolkit">清除條件</button>`:''}`};
function vToolkit(r){
  const q=r.q,task=q.get('task')||'',type=q.get('type')||'';
  return `<div class="wrap"><header class="phead"><h1 tabindex="-1">素材與做法</h1><p>從你現在要做的事開始找。每一筆都能回到它出自哪一期。</p></header>
  <div class="kit-f"><div role="group" aria-labelledby="k-l"><p id="k-l" class="small" style="font-weight:600;margin-bottom:6px">我現在要</p><div class="chips">${[['','全部'],...TASKS].map(([v,l])=>`<button class="chip" data-task="${v}" data-testid="task-${v||'all'}" aria-pressed="${task===v}">${l}</button>`).join('')}</div></div>
  <div class="kit-s"><label class="search"><span class="sr">搜尋素材與做法</span>${ic('s')}<input class="inp" type="search" data-filter="toolkit" data-testid="kit-search" placeholder="搜尋，例如：分鏡" value="${esc(q.get('q')||'')}" autocomplete="off"></label>
  <label><span class="sr">類型</span><select class="inp" data-type-sel data-testid="kit-type"><option value="">全部類型</option>${TYPES.map(t=>`<option ${type===t?'selected':''}>${t}</option>`).join('')}</select></label></div></div>
  <div class="bar-r" id="kit-bar">${kitCount(q)}</div><div class="kits" id="kit-res">${kitResults(q)}</div></div>`;
}
function vTemplate(r){
  const k=KIT.find(item=>item.id==='m-01'),from=returnRoute(r.q.get('from'))||'#/toolkit';
  const label=describe(from);
  return `<div class="wrap" style="padding-bottom:64px"><div class="phead"><a class="back" data-return data-testid="tpl-back" href="${esc(from)}">${ic('l')}${esc(label)}</a><p class="kicker" style="margin-top:8px"><span class="tag">素材</span><span>原創模板</span></p><h1 tabindex="-1" style="margin-top:10px">${k.title}</h1><p>先用例句看懂怎麼填，再換成你的內容。下載的檔案可以列印，或放進投影片。</p></div>
  <div class="tpl">${ui.tpl.map((f,i)=>`<section aria-label="第 ${i+1} 格，${FRAMES[i].t}"><span class="ftime">${FRAMES[i].t}</span><span class="tbar" style="--l:${FRAMES[i].l};--w:${FRAMES[i].w}"><i></i></span><div class="sketch" id="sk-${i}">${esc(f.scene)||'在這裡畫畫面'}</div><label class="field"><span>畫面要出現什麼</span><input class="inp" data-tpl="${i}:scene" value="${esc(f.scene)}" maxlength="30"></label><label class="field"><span>字幕</span><input class="inp" data-tpl="${i}:cap" value="${esc(f.cap)}" maxlength="30"></label></section>`).join('')}</div>
  <div class="btns" style="margin-top:24px"><button class="btn btn-p" data-dl data-testid="tpl-download">${ic('dl')}下載模板（SVG）</button><button class="btn btn-s" data-tpl-reset="blank">清空成空白模板</button><button class="btn btn-t" data-tpl-reset="sample">還原例句</button></div>
  <dl class="st" style="margin-top:24px;max-width:560px"><div><dt>來源查核</dt><dd>${k.check}</dd></div><div><dt>採用審查</dt><dd>${k.adopt}</dd></div></dl>
  <p style="margin-top:12px"><a class="lnk" data-testid="tpl-source" href="${H('/issue/creative',{at:'sec-practice',from:location.hash})}">回到來源段落</a></p></div>`;
}

/* ───────── 詞庫 ───────── */
const GLOSSARY_CATEGORIES=[['','全部'],['tech','技術用語'],['design','設計效果']];
const gMatches=q=>termMatch(q.get('q')||'').filter(({t})=>!q.get('kind')||t.category===q.get('kind'));
const gPrompt=(e,location=e.location)=>[
  '請針對'+location+'做「'+e.term+'」的設計對照稿。',
  e.problem,e.change,e.preserve,e.verify
].join('\n\n');
/* 九個設計名詞的前後小畫面：同一塊內容只改一件事，文字說明在下方，所以示意圖本身對報讀隱藏 */
const dIcon=(n,size,stroke,left=0)=>`<span class="d-i" style="margin-left:${left}px"><svg class="ic" style="width:${size}px;height:${size}px;stroke-width:${stroke}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const dFrames=`<div class="d-fr"><span><b>0–4 秒</b>報名完成</span><span><b>4–9 秒</b>查看流程</span><span><b>9–15 秒</b>活動資訊</span></div>`;
const DESIGN_DEMO={
  spacing:()=>`<span><b>最新一期</b><span>用三格說清楚下一步</span></span><span><b>往期</b><span>另一篇文章</span></span>`,
  color:a=>a?`<span class="d-b p">讀最新一期</span><span class="d-b g">往期</span><span class="d-b g">白話詞庫</span>`:`<span class="d-b y">讀最新一期</span><span class="d-b y">往期</span><span class="d-b y">白話詞庫</span>`,
  iconography:a=>a?`${dIcon('s',18,1.9)}搜尋</span>${dIcon('l',18,1.9)}返回</span>${dIcon('dl',18,1.9)}下載</span>`:`${dIcon('s',13,1.1)}搜尋</span>${dIcon('l',26,3.4,16)}返回</span>${dIcon('dl',20,1.4,6)}下載</span>`,
  'ui-copy':a=>a?`<span class="d-b p">找素材與做法</span><span class="dim">沒有符合的結果</span><span class="d-b g">清除搜尋</span>`:`<span class="d-b p">探索更多！</span><span class="dim">按下去會到哪裡？</span>`,
  typography:a=>a?`<b class="d-t">一段 15 秒的動畫</b><span>用三格說清楚下一步</span><span class="dim">11/19</span>`:`<span class="d-flat">一段 15 秒的動畫</span><span class="d-flat">用三格說清楚下一步</span><span class="d-flat">11/19</span>`,
  layout:a=>a?`<div class="d-ph"><b>標題</b><span class="d-b p">讀最新一期</span>${dFrames.replace('d-fr','d-fr col')}</div>`:`<div class="d-ph"><div class="d-3"><span>標題</span><span>分鏡</span><span>按鈕</span></div></div>`,
  'component-details':a=>a?`<div class="d-card"><b>往期</b><div class="d-chips"><span class="d-c on">${ic('ok')}已選</span><span class="d-c fo">鍵盤在這</span><span class="d-c">科技</span></div></div>`:`<div class="d-card pill"><b>往期</b><div class="d-chips"><span class="d-c pill soft">已選</span><span class="d-c pill">鍵盤在這</span><span class="d-c pill">科技</span></div></div>`,
  visuals:a=>a?dFrames:`<span class="d-blob"></span><span class="dim">看不出這篇在講什麼</span>`,
  motion:a=>a?`<button class="btn btn-p d-press" type="button" data-demo-toggle aria-expanded="false">按一下展開</button><p class="d-reveal" hidden>內容從按鈕下方出現，開關狀態也看得出來。</p>`:`<div class="d-float" data-float aria-hidden="true"><span>卡片</span><span>卡片</span><span>卡片</span></div><button class="btn btn-s d-play" type="button" data-demo-play>播放一次</button>`
};
const designSamples=e=>{
  const sketch=after=>`<div class="dx ${e.id==='spacing'?'spacing-sample':''} ${after?'is-after':''}" data-demo="${e.id}" ${e.id==='motion'?'':'aria-hidden="true"'}>${(DESIGN_DEMO[e.id]||(()=>''))(after)}</div>`;
  return `<section class="gd-examples" data-testid="design-examples"><h3>看前後差別</h3><p>${esc(e.recognize)}</p><div class="gd-pair"><div class="gd-sample"><b>調整前</b>${sketch(false)}<p>${esc(e.before)}</p></div><div class="gd-sample"><b>調整後</b>${sketch(true)}<p>${esc(e.after)}</p></div></div></section>
    <section class="gd-examples" data-testid="design-prompt"><h3>寫給 AI</h3><p>原話可以是「${esc(e.promptExample.from)}」。先把下面的畫面位置改成你的情境。</p><label class="field"><span>要調整的位置</span><input class="inp" data-command-location="${e.id}" data-testid="command-location" value="${esc(e.promptExample.location)}" maxlength="80"></label><div class="copybox"><pre id="design-command">${esc(gPrompt({...e.promptExample,term:e.term}))}</pre><div class="btns" style="margin-top:10px"><button class="btn btn-s" data-copy="design-command" data-testid="copy-design-command">${ic('copy')}複製設計指令</button></div></div></section>`;
};
function termDetail(t,auto,q,from,picked,kind){
  const srcs=t.occ.map(([i,at,l])=>`<li><a class="lnk" href="${H('/issue/'+i,{at,from:location.hash})}">〈${ISSUES[i].short}〉${l}</a></li>`).join('');
  return `<article class="gd ${auto?'is-auto':''}" data-testid="gloss-detail" data-term-id="${t.id}">
    ${picked?`<a class="back m-only" href="${H('/glossary',{q,from,kind})}">${ic('l')}回到詞庫清單</a>`:''}
    <header><h2 ${picked?'tabindex="-1" id="gd-h"':''}>${t.term}</h2><p class="plain" style="margin-top:8px">${t.plain}</p></header>
    ${t.mix?`<div class="mix"><b>${esc(t.mix[0])}</b>${esc(t.mix[1])}</div>`:''}
    ${t.design?designSamples(t.design):''}
    <dl><div><dt>用法</dt><dd>${esc(t.use)}</dd></div>${t.design?'':`<div><dt>文章裡這樣寫</dt><dd>${esc(t.first)}</dd></div><div><dt>例句</dt><dd>${esc(t.ex)}</dd></div>`}<div><dt>可以這樣查</dt><dd>${t.alias.map(esc).join('、')}</dd></div>${srcs?`<div><dt>在哪裡出現</dt><dd><ul>${srcs}</ul></dd></div>`:''}
    <div><dt>來源</dt><dd>${[t.src,t.extra].filter(Boolean).map(s=>`<a class="lnk" href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}${ic('ext')}<span class="sr">（開新分頁）</span></a>`).join('<br>')}<br><span class="small muted">查核 ${esc(t.src.date)}</span></dd></div></dl></article>`;
}
function glossList(q,from,cur){
  const s=q.get('q')||'',m=gMatches(q);
  if(!m.length)return `<div class="empty" style="margin-top:12px" data-testid="empty-state"><h3>找不到「${esc(s)}」</h3><p class="muted">試試原詞、白話或看到的效果，例如 GIF、動圖、留白。</p><div class="btns"><button class="btn btn-p" data-clear="glossary" data-testid="filter-clear">清除搜尋</button></div></div>`;
  return `<ul class="glist">${m.map(({t,via})=>`<li><a id="g-${t.id}" data-testid="gloss-result-${t.id}" href="${H('/glossary/'+t.id,{q:s,from,kind:q.get('kind')})}" ${cur===t.id?'aria-current="true"':''}><b>${t.term}</b><span>${via?`符合「${esc(via)}」 · ${t.plain}`:t.feel?`「${esc(t.feel)}」`:t.plain}</span></a></li>`).join('')}</ul>`;
}
function glossRight(q,from,id){
  const m=gMatches(q);let t=id&&TERMS.find(x=>x.id===id);const auto=!t;if(!t&&q.get('q')&&m.length>1)return `<article class="gd is-auto"><h2>先選一個符合畫面的例子</h2><p>同一句話可能指不同問題。先看看哪一種最接近你看到的情況。</p></article>`;if(!t&&m.length)t=m[0].t;
  return t?termDetail(t,auto,q.get('q')||'',from,!auto,q.get('kind')||''):'';
}
function vGlossary(r,id){
  const q=r.q,from=returnRoute(q.get('from'));
  return `<div class="wrap ${from?'has-ret':''}">${ret(from)}<header class="phead"><h1 tabindex="-1">白話詞庫</h1><p>用原詞、白話或看到的效果查。例如「動圖」「留白」「太擠」。</p></header>
  <div class="glos"><div class="gl-side ${id?'has-pick':''}"><nav class="chips gd-tabs" aria-label="詞庫分類">${GLOSSARY_CATEGORIES.map(([kind,label])=>`<a class="chip" href="${H('/glossary',{kind,from})}" data-testid="gloss-kind-${kind||'all'}" aria-current="${(q.get('kind')||'')===kind?'page':'false'}">${label}</a>`).join('')}</nav><label class="search"><span class="sr">搜尋詞彙</span>${ic('s')}<input class="inp" type="search" data-filter="glossary" data-testid="gloss-search" placeholder="例如：動圖、留白、太擠" value="${esc(q.get('q')||'')}" autocomplete="off"></label><div id="gl-list">${glossList(q,from,id)}</div></div><div id="gl-detail">${glossRight(q,from,id)}</div></div></div>`;
}

/* ───────── 路由與返回位置（hash 路由，file:// 也能用；狀態只在記憶體與網址） ───────── */
const main=$('#main'),sheet=$('#sheet'),toastEl=$('#toast');
const srl=document.createElement('div');srl.className='sr';srl.setAttribute('aria-live','polite');document.body.append(srl);
const NAV=[['','首頁','home','#/'],['archive','往期','cal','#/archive'],['toolkit','素材與做法','kit','#/toolkit'],['glossary','白話詞庫','book','#/glossary']];
$('#nav').innerHTML=NAV.map(n=>`<a href="${n[3]}" data-nav="${n[0]}">${n[1]}</a>`).join('');
$('#tabbar').innerHTML=NAV.map(n=>`<a href="${n[3]}" data-nav="${n[0]}">${ic(n[2])}<span>${n[1]}</span></a>`).join('');
history.scrollRestoration='manual';
const memo={};let intent=null,spy=null,sheetPushed=false,skipPop=false,opener=null,toastT=0,lastRaw='';
const say=(t,show)=>{srl.textContent=t;if(show){toastEl.textContent=t;toastEl.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.remove('on'),2600)}};
const save=id=>{memo[location.hash||'#/']={y:scrollY,f:id||''}};
const patch=p=>{const r=route(),u=new URLSearchParams(r.q);Object.entries(p).forEach(([k,v])=>v?u.set(k,v):u.delete(k));const s=u.toString();history.replaceState(history.state,'','#/'+r.parts.join('/')+(s?'?'+s:''));return route()};
const focusEl=el=>el&&el.focus({preventScroll:true});
function goTo(el){
  const isSec=el.tagName==='SECTION',isTerm=el.classList.contains('term');
  el.scrollIntoView({block:isSec?'start':'center'});
  focusEl(isSec?$('h2',el):el);
  const f=isTerm?el.closest('.para'):el.classList.contains('para')?el:null;
  if(f){f.classList.add('flash');setTimeout(()=>f.classList.remove('flash'),2200)}
}
function place(r){
  const m=memo[r.raw],at=r.q.get('at'),open=r.q.get('open');
  if(intent!=='push'&&m&&!(intent==='return'&&at)){scrollTo(0,m.y);focusEl((m.f&&document.getElementById(m.f))||$('h1',main));return}
  if(at){const el=document.getElementById(at);if(el){goTo(el);return}}
  if(open){const el=document.getElementById('kit-'+open);if(el){el.scrollIntoView({block:'start'});focusEl($('summary',el));return}}
  scrollTo(0,0);focusEl($('#gd-h',main)||$('h1',main));
}
function setupSpy(){
  const links=$$('.art .rail a[data-sec]');if(!links.length||!('IntersectionObserver' in window))return;
  spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.setAttribute('aria-current',a.dataset.sec===e.target.id))}),{rootMargin:'-25% 0px -65% 0px'});
  $$('.flow>section').forEach(s=>spy.observe(s));
}
function render(){
  if(sheet.open){sheetPushed=false;sheet.close()}
  if(spy){spy.disconnect();spy=null}
  const r=route(),[a,b]=r.parts;let html,title;lastRaw=r.raw;
  if(!a){html=vHome();title='首頁'}
  else if(a==='issue'){html=vIssue(b,r);title=(ISSUES[b]&&ISSUES[b].short)||'往期'}
  else if(a==='archive'){html=vArchive(r);title='往期'}
  else if(a==='toolkit'&&b==='m-01'){html=vTemplate(r);title='三格分鏡模板'}
  else if(a==='toolkit'){if(r.q.get('open'))ui.open.add(r.q.get('open'));html=vToolkit(r);title='素材與做法'}
  else if(a==='glossary'){html=vGlossary(r,b);title=b?'詞庫：'+((TERMS.find(t=>t.id===b)||{}).term||''):'詞庫'}
  else{html=vMissing();title='找不到頁面'}
  main.innerHTML=html;document.title=`${title}｜科技與創作日報`;
  $$('[data-nav]').forEach(link=>{
    if(link.dataset.nav===(a||''))link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(a==='issue')setupSpy();
  place(r);intent=null;
}
/* 換頁時保留查找條件和返回位置 */
const go=h=>{history.pushState(null,'',h);render()};
addEventListener('hashchange',()=>{if(route().raw!==lastRaw)render()});
addEventListener('popstate',()=>{if(skipPop){skipPop=false;return}if(sheet.open){sheetPushed=false;sheet.close();return}if(route().raw!==lastRaw)render()});

/* ───────── 詞條面板：桌機置中、手機由下滑出，關閉後焦點回原詞 ───────── */
function openTerm(a){
  const t=TERMS.find(x=>x.id===a.dataset.term),r=route(),back=H('/'+r.parts.join('/'),{at:a.id,from:returnRoute(r.q.get('from'))});opener=a;focusEl(a);
  sheet.innerHTML=`<button class="sh-grab" data-close tabindex="-1" aria-label="往下拉或點一下關閉"></button><div class="sh-b"><div class="sh-h"><div><span class="small muted">詞庫</span><h2 id="sh-title">${t.term}</h2></div><button class="icon-b" data-close aria-label="關閉">${ic('x')}</button></div><p class="lead">${t.plain}</p>${t.mix?`<div class="mix"><b>${t.mix[0]}</b>${t.mix[1]}</div>`:''}<p><span class="small muted">例句</span><br>${t.ex}</p><div class="btns"><button class="btn btn-p" data-close autofocus data-testid="sheet-back">回到文章</button><a class="btn btn-s" data-sheet-go data-testid="sheet-more" href="${H('/glossary/'+t.id,{from:back})}">看完整詞條</a></div></div>`;
  sheet.showModal();history.pushState({sheet:1},'',location.hash||'#/');sheetPushed=true;
}
sheet.addEventListener('close',()=>{focusEl(opener&&opener.isConnected?opener:null);if(sheetPushed){sheetPushed=false;skipPop=true;history.back()}});
sheet.addEventListener('click',e=>{if(e.target===sheet)sheet.close()});
let drag=null;
sheet.addEventListener('pointerdown',e=>{if(e.target.classList.contains('sh-grab')){drag={y:e.clientY,d:0};e.target.setPointerCapture(e.pointerId)}});
sheet.addEventListener('pointermove',e=>{if(drag){drag.d=Math.max(0,e.clientY-drag.y);sheet.style.transform=`translateY(${drag.d}px)`}});
sheet.addEventListener('pointerup',()=>{if(drag){const far=drag.d>70;drag=null;sheet.style.transform='';if(far)sheet.close()}});

/* ───────── 篩選更新：只換結果區，輸入焦點不跳走 ───────── */
function refreshKit(){const q=route().q;$('#kit-res').innerHTML=kitResults(q);$('#kit-bar').innerHTML=kitCount(q);$$('[data-task]').forEach(b=>b.setAttribute('aria-pressed',(q.get('task')||'')===b.dataset.task));const s=$('[data-type-sel]');if(s)s.value=q.get('type')||'';say($('#kit-count').textContent)}
function refreshArc(){const q=route().q;$('#arc-cal').innerHTML=calHTML(q);$('#arc-res').innerHTML=arcResults(q);$('#arc-bar').innerHTML=arcCount(q);$$('[data-kind]').forEach(b=>b.setAttribute('aria-pressed',(q.get('kind')||'')===b.dataset.kind));say($('#arc-count').textContent)}
function refreshGloss(){const r=route(),from=returnRoute(r.q.get('from'))||'';$('#gl-list').innerHTML=glossList(r.q,from,r.parts[1]);$('#gl-detail').innerHTML=glossRight(r.q,from,r.parts[1]);const n=gMatches(r.q).length;say(n?`找到 ${n} 個詞`:'沒有找到')}

/* ───────── 模板下載：檔案由瀏覽器當場產生，不需要網路 ───────── */
const chunk=(s,n)=>{const o=[];for(let i=0;i<s.length;i+=n)o.push(s.slice(i,i+n));return o};
function tplSVG(f){
  const lines=(arr,x,y,size,fill,w=700)=>arr.map((t,i)=>`<text x="${x}" y="${y+i*(size+10)}" font-size="${size}" font-weight="${w}" fill="${fill}">${esc(t)}</text>`).join('');
  const cols=f.map((c,i)=>{const x=65+i*510,F=FRAMES[i];return `<text x="${x}" y="190" font-size="30" font-weight="700" fill="#1f6f66">第 ${i+1} 格 · ${F.t}</text><rect x="${x}" y="215" width="460" height="345" rx="18" fill="#fff" stroke="#1f6f66" stroke-width="2.5" stroke-dasharray="10 8"/><text x="${x}" y="610" font-size="22" fill="#55696c">畫面要出現什麼</text>${lines(chunk(c.scene,18),x,646,26,'#12343b',400)}<line x1="${x}" y1="725" x2="${x+460}" y2="725" stroke="#d6e3e0" stroke-width="2"/><text x="${x}" y="765" font-size="22" fill="#55696c">字幕（只講一件事）</text>${lines(chunk(c.cap,18),x,801,26,'#12343b')}`}).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" font-family="'PingFang TC','Noto Sans TC','Microsoft JhengHei',sans-serif"><title>三格分鏡模板</title><desc>本站原創模板，可自由使用、修改與分享，不需標註來源。</desc><rect width="1600" height="1000" fill="#fcfdfc"/><text x="65" y="92" font-size="46" font-weight="700" fill="#12343b">三格分鏡模板</text><text x="65" y="136" font-size="24" fill="#55696c">我遇到什麼 → 我做了什麼 → 畫面有什麼改變</text>${cols}<rect x="65" y="890" width="1480" height="70" rx="14" fill="#fff3d6"/><text x="90" y="935" font-size="25" fill="#12343b">拿給不熟悉的人看，先不解說：下一步會點哪裡？點完會看到什麼？</text></svg>`;
}
function downloadTpl(){const url=URL.createObjectURL(new Blob([tplSVG(ui.tpl)],{type:'image/svg+xml;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='three-frame-storyboard-template.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);say('模板已下載',true)}
async function copyText(text,fallbackMessage='無法自動複製，請手動選取文字'){
  if(navigator.clipboard){
    try{
      await navigator.clipboard.writeText(text);
      say('已複製',true);
      return;
    }catch{
      // 瀏覽器可能限制剪貼簿權限，接著嘗試舊版複製方式。
    }
  }
  const field=document.createElement('textarea');
  field.value=text;
  document.body.append(field);
  field.select();
  let copied=false;
  try{copied=document.execCommand('copy')}catch{copied=false}finally{field.remove()}
  say(copied?'已複製':fallbackMessage,true);
}

/* ───────── 事件 ───────── */
document.addEventListener('click',e=>{
  const c=s=>e.target.closest(s);let x;
  if(c('[data-skip]')){e.preventDefault();main.focus();return}
  if((x=c('a.term'))){e.preventDefault();openTerm(x);return}
  if((x=c('a[data-sec]'))){e.preventDefault();const el=document.getElementById(x.dataset.sec);if(el)goTo(el);const d=x.closest('details');if(d)d.open=false;return}
  if((x=c('[data-sheet-go]'))){e.preventDefault();save(opener&&opener.id);sheetPushed=false;sheet.close();history.replaceState(null,'',x.getAttribute('href'));intent='push';render();return}
  if(c('[data-close]')){sheet.close();return}
  if((x=c('[data-task]'))){patch({task:x.dataset.task,open:''});refreshKit();return}
  if((x=c('[data-kind]'))){patch({kind:x.dataset.kind});refreshArc();return}
  if((x=c('[data-month]'))){patch({m:x.dataset.month});refreshArc();focusEl($('.icon-b:not(:disabled)',$('#arc-cal')));return}
  if((x=c('[data-date]'))){const d=x.dataset.date,cur=route().q.get('date');patch({date:cur===d?'':d,m:d.slice(0,7)});refreshArc();focusEl($(`#arc-cal [data-date="${d}"]`));return}
  if((x=c('[data-clear]'))){const k=x.dataset.clear,inp=$(`[data-filter=${k}]`);if(inp)inp.value='';
    if(k==='toolkit'){patch({task:'',type:'',q:'',open:''});refreshKit()}else if(k==='archive'){patch({date:'',kind:'',q:'',m:''});refreshArc()}else{patch({q:''});refreshGloss()}
    focusEl(inp);say('已清除條件，顯示全部',true);return}
  if((x=c('[data-demo-play]'))){const f=$('[data-float]',x.parentNode);f.classList.remove('is-on');void f.offsetWidth;f.classList.add('is-on');setTimeout(()=>f.classList.remove('is-on'),2800);return}
  if((x=c('[data-demo-toggle]'))){const open=x.getAttribute('aria-expanded')!=='true',p=x.nextElementSibling;x.setAttribute('aria-expanded',open);x.textContent=open?'按一下收合':'按一下展開';p.hidden=!open;return}
  if((x=c('[data-copy]'))){copyText(document.getElementById(x.dataset.copy).textContent,x.dataset.copyFallback);return}
  if(c('[data-dl]')){downloadTpl();return}
  if((x=c('[data-tpl-reset]'))){const blank=x.dataset.tplReset==='blank';ui.tpl=FRAMES.map(f=>({scene:blank?'':f.scene,cap:blank?'':f.cap}));ui.tpl.forEach((f,i)=>{$(`[data-tpl="${i}:scene"]`).value=f.scene;$(`[data-tpl="${i}:cap"]`).value=f.cap;$('#sk-'+i).textContent=f.scene||'在這裡畫畫面'});say(blank?'已清空，可以按「還原例句」復原':'已還原例句',true);return}
  if((x=c('a[href^="#/"]'))&&!(e.metaKey||e.ctrlKey||e.shiftKey)){e.preventDefault();const h=x.getAttribute('href');if(h===(location.hash||'#/')){intent='push';place(route());intent=null;return}save(x.id);intent=x.hasAttribute('data-return')?'return':'push';go(h)}
});
document.addEventListener('input',e=>{
  const t=e.target;
  if(t.dataset.filter){patch({q:t.value.trim()});({toolkit:refreshKit,archive:refreshArc,glossary:refreshGloss})[t.dataset.filter]();return}
  if(t.dataset.commandLocation){const entry=GLOSSARY.find(x=>x.id===t.dataset.commandLocation);const sample=entry.promptExample;$('#design-command').textContent=gPrompt({...sample,term:entry.term},t.value.trim()||sample.location);return}
  if(t.dataset.tpl){const [i,k]=t.dataset.tpl.split(':');ui.tpl[i][k]=t.value;if(k==='scene')$('#sk-'+i).textContent=t.value||'在這裡畫畫面'}
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.name==='way'){ui.way=t.value;$$('.way').forEach(w=>w.classList.toggle('on',w.dataset.way===t.value));return}
  if(t.hasAttribute('data-type-sel')){patch({type:t.value});refreshKit()}
});
document.addEventListener('toggle',e=>{
  const details=e.target;
  if(!details.matches?.('[data-how]'))return;
  if(details.open)ui.open.add(details.dataset.how);
  else ui.open.delete(details.dataset.how);
  $('summary',details).lastChild.textContent=details.open?'收合做法':'展開做法';
},true);
document.addEventListener('submit',e=>{if(e.target.dataset.form==='home-term'){e.preventDefault();save();intent='push';go(H('/glossary',{q:e.target.q.value.trim()}))}});
document.addEventListener('keydown',e=>{
  const b=e.target.closest&&e.target.closest('#arc-cal [data-date]');if(!b)return;
  const step={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];if(!step)return;
  e.preventDefault();const all=$$('#arc-cal [data-date]'),n=all[all.indexOf(b)+step];if(n){all.forEach(a=>a.tabIndex=-1);n.tabIndex=0;n.focus()}
});
render();
