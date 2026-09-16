'use strict';
const catalog = window.RL_CATALOG || [];
const $ = id => document.getElementById(id);
let saved;
try { const stored = JSON.parse(localStorage.getItem('rl-atlas-saved') || '[]'); saved = new Set(Array.isArray(stored) ? stored.filter(id => catalog.some(item => item.id === id)) : []); } catch { saved = new Set(); }
let active = 'All resources', limit = 12, savedOnly = false;
const featured = ['PPO','DQN','HILP','TRPO','Rainbow','2026','DDPG','MADDPG','HIRO'];
const icons = ['◎','⌘','◇','⌁','⊞','△'];
const groups = [...new Set(catalog.map(item => item.category))].sort();
$('resource-count').textContent = catalog.length;
$('topic-count').textContent = groups.length;
function toast(message) { $('toast').textContent = message; $('toast').classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('toast').classList.remove('show'),2200); }
function categories() {
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
  items.sort((a,b) => sort === 'az' ? a.title.localeCompare(b.title) : sort === 'za' ? b.title.localeCompare(a.title) : (featured.includes(a.id) ? featured.indexOf(a.id) : 999) - (featured.includes(b.id) ? featured.indexOf(b.id) : 999));
  $('result-count').textContent = `${items.length} ${savedOnly ? 'saved ' : ''}resources${active !== 'All resources' ? ' · '+active : ' in the collection'}`;
  $('saved-count').textContent = saved.size; $('saved-top').setAttribute('aria-pressed',savedOnly);
  $('cards').replaceChildren();
  items.slice(0,limit).forEach((item,index) => {
    const card = document.createElement('article'); card.className = 'resource';
    const top = document.createElement('div'); top.className = 'card-top';
    const icon = document.createElement('span'); icon.className = 'resource-icon'; icon.textContent = icons[index%icons.length]; icon.setAttribute('aria-hidden','true');
    const bookmark = document.createElement('button'); bookmark.className = 'save'; bookmark.textContent = saved.has(item.id) ? '▰' : '▱'; bookmark.setAttribute('aria-label', `${saved.has(item.id) ? 'Remove' : 'Save'} ${item.title}`); bookmark.setAttribute('aria-pressed',saved.has(item.id)); bookmark.onclick = () => save(item); top.append(icon,bookmark);
    const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = item.category;
    const title = document.createElement('h3'); title.textContent = item.title;
    const description = document.createElement('p'); description.className = 'description'; description.textContent = item.description;
    const bottom = document.createElement('div'); bottom.className = 'card-bottom'; const kind = document.createElement('span'); kind.textContent = item.file ? 'RESEARCH NOTE' : 'EXTERNAL RESOURCE';
    const open = document.createElement(item.file ? 'button' : 'a'); open.className = 'open-resource'; open.textContent = item.file ? 'Explore note ↗' : 'View resource ↗';
    if(item.file) open.onclick = () => openNote(item); else {open.href = safeURL(item.url); open.target = '_blank'; open.rel = 'noopener noreferrer';}
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
    const local = catalog.find(item => item.file === match[2]);
    if(local) link.onclick = event => {event.preventDefault(); openNote(local);};
    else {link.target = '_blank'; link.rel = 'noopener noreferrer';}
    container.append(link); cursor = regex.lastIndex;
  }
  container.append(document.createTextNode(text.slice(cursor)));
}
function openNote(item) {
  const content = $('reader-content'); content.replaceChildren();
  const title = document.createElement('h1'); title.textContent = item.title; content.append(title);
  const source = document.createElement('a'); source.href = safeURL(item.file); source.textContent = 'View original Markdown ↗'; source.target = '_blank'; source.rel = 'noopener'; content.append(source);
  item.body.split(/\n\s*\n/).forEach(block => {const heading = block.match(/^(#{1,6})\s+([^\n]+)/); if(heading) {const element = document.createElement('h2'); inline(element,heading[2]); content.append(element); block = block.slice(heading[0].length).trim();} if(block) {const paragraph = document.createElement('p'); inline(paragraph,block); content.append(paragraph);}});
  if(!$('reader').open) $('reader').showModal(); $('reader').scrollTop = 0;
}
$('close-reader').onclick = () => $('reader').close();
$('reader').onclick = event => {if(event.target === $('reader')) {const r = $('reader').getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) $('reader').close();}};
$('search').oninput = () => {limit=12;render();}; $('sort').onchange = render;
$('load-more').onclick = () => {limit+=12;render();};
$('reset').onclick = () => {active='All resources';savedOnly=false;$('search').value='';render();};
$('saved-top').onclick = () => {savedOnly=!savedOnly;active='All resources';$('search').value='';limit=12;render();$('library').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});};
$('view-toggle').onclick = () => {const list = $('cards').classList.toggle('list'); $('view-toggle').textContent=list?'⊞':'☷'; $('view-toggle').setAttribute('aria-label',list?'Switch to grid view':'Switch to list view');};
$('random').onclick = () => {const notes=catalog.filter(i=>i.file && i.id!=='README');openNote(notes[Math.floor(Math.random()*notes.length)]);};
for(const id of ['guide','frontier-link']) $(id).onclick = event => {event.preventDefault();const guide=catalog.find(i=>i.id==='2026');if(guide)openNote(guide);};
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
let previous=0;function animate(time){if(!paused && !document.hidden){angle+=Math.min(time-previous,40)*.00009;draw();}previous=time;requestAnimationFrame(animate);}requestAnimationFrame(animate);motionLabel();render();
