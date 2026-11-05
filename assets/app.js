'use strict';
const baseCatalog = (window.RL_CATALOG || []).map(item => {
  const m = `${item.description || ''} ${item.body || ''}`.match(/\b(202[0-9]-\d{2}-\d{2})\b/);
  return Object.assign({publishedAt: m ? m[1] : ''}, item);
});
let catalog = baseCatalog.slice();
const $ = id => document.getElementById(id);
const normTitle = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const curatedArxivIds = new Set();
const curatedTitles = new Set();
baseCatalog.forEach(item => {
  curatedTitles.add(normTitle(item.title));
  const text = `${item.title || ''} ${item.description || ''} ${item.body || ''} ${item.url || ''}`;
  for (const m of text.matchAll(/\b(\d{4}\.\d{4,5})\b/g)) curatedArxivIds.add(m[1]);
});
let saved;
try {
  const stored = JSON.parse(localStorage.getItem('rl-atlas-saved') || '[]');
  saved = new Set(Array.isArray(stored) ? stored.filter(id => typeof id === 'string' && (id.startsWith('live-') || baseCatalog.some(item => item.id === id))) : []);
} catch { saved = new Set(); }
let active = 'All resources', limit = 12, savedOnly = false;
const baseFeatured = ['2026','PolicyIK','ARPG','CRONOS','RLiD','RAVEL','VLA-Stem','Physical-AI-RSI','AtomicRL','WoVR-Plus','ANTE','DRIVE','MEND','eRLT','FIND','VLaRL','FMAPPO','HaWMPO','VLA-Precision','WorldSample','Object-Centric-Residual-RL','RL-Token','RISE','TwinRL','EnvACE','PPO','DQN'];
let featured = baseFeatured.slice();
const icons = ['◎','⌘','◇','⌁','⊞','△'];
let groups = [...new Set(catalog.map(item => item.category))].sort();
$('resource-count').textContent = catalog.length;
$('topic-count').textContent = groups.length;
function toast(message) { $('toast').textContent = message; $('toast').classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('toast').classList.remove('show'),2200); }
function categories() {
  groups = [...new Set(catalog.map(item => item.category))].sort();
  $('resource-count').textContent = catalog.length;
  $('topic-count').textContent = groups.length;
  $('categories').replaceChildren();
  ['All resources',...groups].forEach(category => {
    const button = document.createElement('button'); button.className = 'category';
    button.classList.toggle('active', active === category && !savedOnly); button.setAttribute('aria-pressed',active === category && !savedOnly);
    button.append(document.createTextNode(category)); const count = document.createElement('span'); count.textContent = category === 'All resources' ? catalog.length : catalog.filter(i => i.category === category).length; button.append(count);
    button.onclick = () => {active = category; savedOnly = false; limit = 12; render();}; $('categories').append(button);
  });
}
function save(item) {
  saved.has(item.id) ? saved.delete(item.id) : saved.add(item.id);
  try {localStorage.setItem('rl-atlas-saved',JSON.stringify([...saved]));} catch {toast('Reading list is available for this session.');}
  render();
}
function render() {
  const query = $('search').value.trim().toLowerCase();
  let items = catalog.filter(i => (active === 'All resources' || i.category === active) && (!savedOnly || saved.has(i.id)) && `${i.title} ${i.id} ${i.category} ${i.description} ${i.body}`.toLowerCase().includes(query));
  const sort = $('sort').value;
  items.sort((a,b) => {
    if (sort === 'az') return a.title.localeCompare(b.title);
    if (sort === 'za') return b.title.localeCompare(a.title);
    if (sort === 'latest') {
      const da = a.publishedAt || '', db = b.publishedAt || '';
      if (da !== db) return db.localeCompare(da);
      if (Boolean(a.live) !== Boolean(b.live)) return a.live ? -1 : 1;
    }
    return (featured.includes(a.id) ? featured.indexOf(a.id) : 999) - (featured.includes(b.id) ? featured.indexOf(b.id) : 999);
  });
  $('result-count').textContent = `${items.length} ${savedOnly ? 'saved ' : ''}resources${active !== 'All resources' ? ' · '+active : ' in the collection'}`;
  $('saved-count').textContent = saved.size; $('saved-top').setAttribute('aria-pressed',savedOnly);
  $('cards').replaceChildren();
  items.slice(0,limit).forEach((item,index) => {
    const hasNote = Boolean(item.file || item.body);
    const card = document.createElement('article'); card.className = item.live ? 'resource is-live' : 'resource';
    const top = document.createElement('div'); top.className = 'card-top';
    const icon = document.createElement('span'); icon.className = 'resource-icon'; icon.textContent = icons[index%icons.length]; icon.setAttribute('aria-hidden','true');
    const bookmark = document.createElement('button'); bookmark.className = 'save'; bookmark.textContent = saved.has(item.id) ? '▰' : '▱'; bookmark.setAttribute('aria-label', `${saved.has(item.id) ? 'Remove' : 'Save'} ${item.title}`); bookmark.setAttribute('aria-pressed',saved.has(item.id)); bookmark.onclick = () => save(item); top.append(icon,bookmark);
    const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = item.category;
    const title = document.createElement('h3'); title.textContent = item.title;
    const description = document.createElement('p'); description.className = 'description'; description.textContent = item.description;
    const bottom = document.createElement('div'); bottom.className = 'card-bottom'; const kind = document.createElement('span');
    kind.textContent = item.live ? `LIVE ARXIV · ${item.publishedAt || '2026'}` : (item.file ? 'RESEARCH NOTE' : 'EXTERNAL RESOURCE');
    if (item.live) kind.className = 'live-badge';
    const open = document.createElement(hasNote ? 'button' : 'a'); open.className = 'open-resource';
    open.textContent = item.live ? 'Explore live note ↗' : (hasNote ? 'Explore note ↗' : 'View resource ↗');
    if(hasNote) open.onclick = () => openNote(item); else {open.href = safeURL(item.url); open.target = '_blank'; open.rel = 'noopener noreferrer';}
    bottom.append(kind,open); card.append(top,tag,title,description,bottom);
    card.onpointermove = event => {if (reduced.matches || event.pointerType !== 'mouse') return; const r = card.getBoundingClientRect(); card.style.transform = `perspective(900px) rotateX(${-(event.clientY-r.top-r.height/2)/60}deg) rotateY(${(event.clientX-r.left-r.width/2)/50}deg) translateY(-3px)`;};
    card.onpointerleave = () => card.style.transform = ''; $('cards').append(card);
  });
  $('empty').hidden = items.length > 0; $('load-more').hidden = items.length <= limit; categories();
}
function safeURL(url) {try {const parsed = new URL(url,location.href); return ['http:','https:','file:'].includes(parsed.protocol) ? parsed.href : '#';} catch {return '#';}}
function inline(container,text) {
  const regex = /!?\[([^\]]*)\]\(([^)]+)\)/g; let match, cursor = 0;
  while ((match = regex.exec(text))) {
    container.append(document.createTextNode(text.slice(cursor,match.index)));
    const link = document.createElement('a'); link.textContent = match[1] || 'View illustration'; link.href = safeURL(match[2]);
    const local = catalog.find(item => item.file && item.file === match[2]);
    if(local) link.onclick = event => {event.preventDefault(); openNote(local);};
    else {link.target = '_blank'; link.rel = 'noopener noreferrer';}
    container.append(link); cursor = regex.lastIndex;
  }
  container.append(document.createTextNode(text.slice(cursor)));
}
function openNote(item) {
  const content = $('reader-content'); content.replaceChildren();
  const title = document.createElement('h1'); title.textContent = item.title; content.append(title);
  const source = document.createElement('a'); source.href = safeURL(item.file || item.url);
  source.textContent = item.file ? 'View original Markdown ↗' : `View arXiv source (${item.arxivId || 'online'}) ↗`;
  source.target = '_blank'; source.rel = 'noopener noreferrer'; content.append(source);
  item.body.split(/\n\s*\n/).forEach(block => {const heading = block.match(/^(#{1,6})\s+([^\n]+)/); if(heading) {const element = document.createElement('h2'); inline(element,heading[2]); content.append(element); block = block.slice(heading[0].length).trim();} if(block) {const paragraph = document.createElement('p'); inline(paragraph,block); content.append(paragraph);}});
  if(!$('reader').open) $('reader').showModal(); $('reader').scrollTop = 0;
}
const RL_RE = /\b(reinforcement learning|policy gradient|actor-critic|ppo|grpo|rlhf|rlaif|q-learning|td-learning|markov decision|reward model|reward shaping|offline rl|online rl|residual rl|policy optimization|advantage estimation|preference optimization|post-training|trial-and-error)\b/i;
const EMBODIED_RE = /\b(robot|robotic|robotics|embodied|manipulation|locomotion|humanoid|dexterous|quadruped|bimanual|gripper|visuomotor|sim-to-real|vision-language-action|vla|teleoperation|end-effector|autonomous driving|aerial vehicle|uav|legged|physical ai|3d environments)\b/i;
const AGENT_RE = /\b(agentic|llm agent|language agent|multi-agent|tool use|tool-use|web agent|webrl|web task|gui agent|coding agent|software agent|search agent|multi-turn reinforcement learning|reasoning agent|agent workflow|computer use)\b/i;
const WEB_ONLY_RE = /\b(web agent|webrl|web task|browser|gui agent)\b/i;
const VLA_WM_RE = /\b(vision-language-action|vla|world model|world simulation|embodied benchmark|robotic manipulation|physical ai|embodied navigation|sim-to-real)\b/i;
function classifyLivePaper(title, summary, keywords) {
  const blob = `${title} ${summary} ${(keywords || []).join(' ')}`;
  const hasRL = RL_RE.test(blob), hasEmbodied = EMBODIED_RE.test(blob), hasAgent = AGENT_RE.test(blob), hasWeb = WEB_ONLY_RE.test(blob), hasVlaWm = VLA_WM_RE.test(blob);
  if (hasRL && hasWeb && !/\b(robot|robotic|humanoid|manipulation|locomotion)\b/i.test(blob)) return '2026 · Agent RL';
  if (hasRL && hasEmbodied) return '2026 · Embodied RL';
  if (hasRL && hasAgent) return '2026 · Agent RL';
  if (hasVlaWm && hasEmbodied) return '2026 · Embodied context';
  return null;
}
function buildLiveItem(raw) {
  if (raw && raw.id && raw.body && raw.category && raw.arxivId) return Object.assign({live: true}, raw);
  const p = raw && raw.paper && typeof raw.paper === 'object' ? raw.paper : raw;
  if (!p || typeof p !== 'object') return null;
  const pid = String(p.arxivId || p.id || '').trim();
  if (!/^\d{4}\.\d{4,5}$/.test(pid)) return null;
  const title = String(p.title || '').replace(/\s+/g, ' ').trim();
  const summary = String(p.summary || '').replace(/\s+/g, ' ').trim();
  const aiSummary = String(p.ai_summary || p.aiSummary || '').replace(/\s+/g, ' ').trim();
  const keywords = Array.isArray(p.ai_keywords || p.keywords) ? (p.ai_keywords || p.keywords).map(String) : [];
  const pub = String(p.publishedAt || raw.publishedAt || '').slice(0, 10);
  if (!pub.startsWith('202')) return null;
  const category = p.category || classifyLivePaper(title, summary, keywords);
  if (!category) return null;
  const rawAuthors = Array.isArray(p.authors) ? p.authors.map(a => typeof a === 'string' ? a : (a && a.name ? a.name : '')).filter(Boolean) : [];
  const authorsStr = rawAuthors.length ? rawAuthors.slice(0, 8).join(', ') + (rawAuthors.length > 8 ? ' et al' : '') : 'arXiv authors';
  const absUrl = `https://arxiv.org/abs/${pid}`, pdfUrl = `https://arxiv.org/pdf/${pid}`;
  const links = [`* Paper: [arXiv:${pid}](${absUrl})`, `* PDF: [arXiv PDF](${pdfUrl})`];
  if (p.githubRepo) links.push(`* Code: [${p.githubRepo}](${p.githubRepo})`);
  if (p.projectPage) links.push(`* Project page: [${p.projectPage}](${p.projectPage})`);
  const kwLine = keywords.length ? `\n\nKeywords: ${keywords.slice(0, 8).join(', ')}.` : '';
  const body = `# ${title}\n\nFirst public date: ${pub}.\n\nAuthors: ${authorsStr}.\n\nClassification: ${category} (live auto-indexed preprint).\n\n## Abstract & key idea\n\n${summary}${kwLine}\n\n## Evidence boundary\n\nThis entry was automatically indexed from live public research feeds on ${pub} and reflects the authors' public preprint abstract (\`arXiv:${pid}\`). Separate reinforcement-learning training claims from purely supervised or world-model components when comparing against manually curated notes.\n\n## Sources and artifacts\n\n${links.join('\n')}`;
  return {
    id: `live-${pid}`,
    arxivId: pid,
    title,
    category,
    description: `(${pub}) — ${aiSummary || summary}`.slice(0, 230),
    publishedAt: pub,
    url: absUrl,
    file: '',
    body,
    live: true,
    githubRepo: p.githubRepo || '',
    projectPage: p.projectPage || ''
  };
}
function applyLiveCatalog(candidates, latestHint) {
  const seenIds = new Set(curatedArxivIds);
  const seenTitles = new Set(curatedTitles);
  const accepted = [];
  for (const raw of candidates) {
    const item = buildLiveItem(raw);
    if (!item) continue;
    const nt = normTitle(item.title);
    if (seenIds.has(item.arxivId) || seenTitles.has(nt)) continue;
    seenIds.add(item.arxivId);
    seenTitles.add(nt);
    accepted.push(item);
  }
  accepted.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '') || (b.arxivId || '').localeCompare(a.arxivId || ''));
  const liveItems = accepted.slice(0, 24);
  catalog = [...baseCatalog, ...liveItems];
  const liveIds = liveItems.map(i => i.id);
  featured = ['2026', 'PolicyIK', 'ARPG', 'CRONOS', ...liveIds.slice(0, 6), ...baseFeatured.slice(4), ...liveIds.slice(6)];
  let latestDate = latestHint || '2026-11-06';
  for (const item of liveItems) if (item.publishedAt && item.publishedAt > latestDate) latestDate = item.publishedAt;
  if ($('live-status')) {
    $('live-status').textContent = liveItems.length
      ? `RESEARCH UPDATE · LIVE ONLINE SYNC THROUGH ${latestDate} · +${liveItems.length} AUTO-INDEXED PREPRINTS`
      : `RESEARCH UPDATE · SYNCED THROUGH ${latestDate}`;
  }
  if ($('frontier-update-summary') && liveItems.length) {
    const embCount = catalog.filter(i => i.category === '2026 · Embodied RL').length;
    const agCount = catalog.filter(i => i.category === '2026 · Agent RL').length;
    $('frontier-update-summary').textContent = `Explore ${embCount} embodied RL studies, ${agCount} agent RL notes, and clearly labeled world-model benchmarks and VLA releases—including ${liveItems.length} live preprints synced automatically from online feeds.`;
  }
  render();
  return liveItems;
}
async function syncLiveOnline(manual = false) {
  if ($('sync-live')) {
    $('sync-live').disabled = true;
    $('sync-live').textContent = '↻ Syncing online…';
  }
  if (!manual) {
    try {
      const cached = JSON.parse(localStorage.getItem('rl-atlas-live-v1') || 'null');
      if (cached && Array.isArray(cached.items) && cached.items.length) applyLiveCatalog(cached.items, cached.latestDate);
    } catch {}
  }
  const endpoints = [
    fetch('assets/live-feed.json', {cache: 'no-store'}).then(r => r.ok ? r.json() : null).catch(() => null),
    fetch('https://huggingface.co/api/daily_papers?limit=100').then(r => r.ok ? r.json() : null).catch(() => null),
    fetch('https://huggingface.co/api/papers/search?q=embodied+reinforcement+learning').then(r => r.ok ? r.json() : null).catch(() => null),
    fetch('https://huggingface.co/api/papers/search?q=VLA+reinforcement+learning').then(r => r.ok ? r.json() : null).catch(() => null),
    fetch('https://huggingface.co/api/papers/search?q=agentic+reinforcement+learning').then(r => r.ok ? r.json() : null).catch(() => null)
  ];
  const results = await Promise.all(endpoints);
  const pooled = [];
  let latestHint = '2026-11-06';
  for (const res of results) {
    if (!res) continue;
    if (Array.isArray(res)) pooled.push(...res);
    else if (Array.isArray(res.items)) {
      if (res.latestDate && res.latestDate > latestHint) latestHint = res.latestDate;
      pooled.push(...res.items);
    }
  }
  if (pooled.length) {
    const merged = applyLiveCatalog(pooled, latestHint);
    try { localStorage.setItem('rl-atlas-live-v1', JSON.stringify({latestDate: latestHint, items: merged})); } catch {}
    if (manual) toast(`Synced ${merged.length} live online preprints.`);
  } else if (manual) {
    toast('Already up to date with latest available feed.');
  }
  if ($('sync-live')) {
    $('sync-live').disabled = false;
    $('sync-live').textContent = '↻ Sync latest online';
  }
}
$('close-reader').onclick = () => $('reader').close();
$('reader').onclick = event => {if(event.target === $('reader')) {const r = $('reader').getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) $('reader').close();}};
$('search').oninput = () => {limit=12;render();}; $('sort').onchange = render;
$('load-more').onclick = () => {limit+=12;render();};
$('reset').onclick = () => {active='All resources';savedOnly=false;$('search').value='';render();};
$('saved-top').onclick = () => {savedOnly=!savedOnly;active='All resources';$('search').value='';limit=12;render();$('library').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});};
$('view-toggle').onclick = () => {const list = $('cards').classList.toggle('list'); $('view-toggle').textContent=list?'⊞':'☷'; $('view-toggle').setAttribute('aria-label',list?'Switch to grid view':'Switch to list view');};
$('random').onclick = () => {const notes=catalog.filter(i=>(i.file||i.body) && i.id!=='README');openNote(notes[Math.floor(Math.random()*notes.length)]);};
$('latest-embodied').onclick = () => {active='2026 · Embodied RL';savedOnly=false;limit=16;$('search').value='';render();$('library').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});};
if ($('sync-live')) $('sync-live').onclick = () => syncLiveOnline(true);
for(const id of ['guide','frontier-link','read-frontier']) $(id).onclick = event => {event.preventDefault();const guide=catalog.find(i=>i.id==='2026');if(guide)openNote(guide);};
document.addEventListener('keydown',event => {if(event.key==='/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !$('reader').open) {event.preventDefault();$('search').focus();$('library').scrollIntoView();}});
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const canvas = $('network'), ctx = canvas.getContext('2d');
let width=0,height=0,angle=.35,pointerX=0,pointerY=0,paused=reduced.matches;
const points = Array.from({length:110},(_,i) => {const y = 1-(i/109)*2, r = Math.sqrt(1-y*y), theta=i*Math.PI*(3-Math.sqrt(5));return [Math.cos(theta)*r,y,Math.sin(theta)*r];});
function draw() {
  if(!ctx) return;
  ctx.clearRect(0,0,width,height);
  const scale=Math.min(width*.35,height*.37), cy=Math.cos(angle+pointerX),sy=Math.sin(angle+pointerX),tilt=.22+pointerY;
  const projected=points.map(([x,y,z])=>{const xx=x*cy-z*sy, zz=x*sy+z*cy, yy=y*Math.cos(tilt)-zz*Math.sin(tilt), depth=y*Math.sin(tilt)+zz*Math.cos(tilt);const perspective=3.8/(3.8-depth);return {x:width/2+xx*scale*perspective,y:height/2+yy*scale*perspective,z:depth};});
  ctx.strokeStyle='#dce1d2';ctx.lineWidth=.6;
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const distance=points[i].reduce((sum,v,k)=>sum+(v-points[j][k])**2,0);if(distance<.31){const a=projected[i],b=projected[j];ctx.strokeStyle=`rgba(120,139,90,${.09+(a.z+b.z+2)*.065})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
  projected.forEach((p,i)=>{ctx.beginPath();ctx.fillStyle=i%13===0?'#d97543':`rgba(116,139,82,${.35+(p.z+1)*.28})`;ctx.arc(p.x,p.y,(i%13===0?3.4:2)*(p.z+3)/3,0,Math.PI*2);ctx.fill();});
  ctx.strokeStyle='#b5c49b55';ctx.lineWidth=.7;ctx.beginPath();ctx.ellipse(width/2,height/2,scale*1.42,scale*.29,-.32,0,Math.PI*2);ctx.stroke();
}
function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
new ResizeObserver(resize).observe(canvas);
canvas.onpointermove=e=>{if(reduced.matches)return;const r=canvas.getBoundingClientRect();pointerX=(e.clientX-r.left-r.width/2)/r.width*.65;pointerY=(e.clientY-r.top-r.height/2)/r.height*.4;draw();};
function motionLabel(){$('motion').textContent=paused?'▷ Resume motion':'Ⅱ Pause motion';$('motion').setAttribute('aria-pressed',paused);}
$('motion').onclick=()=>{paused=!paused;motionLabel();};reduced.onchange=()=>{paused=reduced.matches;motionLabel();draw();};
let previous=0;function animate(time){if(!paused && !document.hidden){angle+=Math.min(time-previous,40)*.00009;draw();}previous=time;requestAnimationFrame(animate);}requestAnimationFrame(animate);motionLabel();render();syncLiveOnline(false);
