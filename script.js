const levels = {
  L1: document.getElementById('level-1'),
  L2: document.getElementById('level-2'),
  L3: document.getElementById('level-3'),
  FINAL: document.getElementById('final')
};

const toast = document.getElementById('toast');
const heartsRoot = document.getElementById('hearts');

function showToast(msg, t=1200){
  toast.textContent = msg; toast.style.opacity = 1; toast.removeAttribute('aria-hidden');
  setTimeout(()=>{ toast.style.opacity = 0; toast.setAttribute('aria-hidden','true') }, t);
}

function showLevel(target){
  Object.values(levels).forEach(s=>s.classList.remove('active'));
  target.classList.add('active');
  // apply accent color per level for visual variety
  let color = '#FF6B9A';
  if(target.id==='level-1') color = '#FF6B9A';
  if(target.id==='level-2') color = '#9B7CFF';
  if(target.id==='level-3') color = '#FFB86B';
  if(target.id==='final') color = '#FF6B9A';
  document.documentElement.style.setProperty('--accent', color);
  // randomize button positions slightly for playfulness (desktop only)
  if(window.innerWidth > 520){
    const btns = target.querySelectorAll('.btn');
      // ensure buttons have no accumulated transforms so layout stays centered
      btns.forEach(b=>{ b.style.transform = ''; });
  }
  // small floating hearts on level change
  smallHearts(6);
}

// Level 1: evasive No
const l1No = document.getElementById('l1-no');
const l1Yes = document.getElementById('l1-yes');
const card = document.getElementById('card');

function randomOffset(el){
  const rect = card.getBoundingClientRect();
  const x = Math.random()*(rect.width-120);
  const y = Math.random()*(rect.height-60);
  return {x,y};
}

// Level 1 evasive No: pick a new position within the card bounds so it never leaves the view.
l1No.addEventListener('mouseenter', (ev)=>{
  const container = card.getBoundingClientRect();
  const btnRect = l1No.getBoundingClientRect();
  const margin = 12;
  const maxX = Math.max(0, container.width - btnRect.width - margin);
  const maxY = Math.max(0, container.height - btnRect.height - margin);
  const relX = Math.random() * maxX;
  const relY = Math.random() * maxY;
  const offsetX = relX - (btnRect.left - container.left);
  const offsetY = relY - (btnRect.top - container.top);
  l1No.style.transition = 'transform .32s cubic-bezier(.2,.9,.2,1)';
  l1No.style.transform = `translate(${Math.round(offsetX)}px, ${Math.round(offsetY)}px)`;
});

l1Yes.addEventListener('click', ()=>{
  enterLevel2();
});

function resetL1(){
  l1No.style.transform = '';
}

// Level 2: duplicating No buttons
const l2Yes = document.getElementById('l2-yes');
const l2NoArea = document.getElementById('l2-no-area');
const l2No = document.getElementById('l2-no');
let l2Clones = [];

function enterLevel2(){
  showLevel(levels.L2);
  document.getElementById('level-1').setAttribute('aria-hidden','true');
}

function resetLevel2(){
  l2Clones.forEach(c=>c.remove()); l2Clones = [];
}

function spawnNoClone(){
  if(l2Clones.length>14) return;
  const clone = l2No.cloneNode(true);
  clone.classList.add('no-dup');
  clone.removeAttribute('id');
  // place clone inside card to allow more space
  const container = card.getBoundingClientRect();
  const x = Math.random()*(container.width-80);
  const y = Math.random()*(container.height-80);
  clone.style.position = 'absolute';
  clone.style.left = `${x}px`;
  clone.style.top = `${y}px`;
  clone.style.transform = '';
  clone.addEventListener('click', ()=>{
    showToast('That seems unlikely.');
    resetLevel2();
    showLevel(levels.L2);
  });
  // append to card so clones can float around
  card.appendChild(clone);
  l2Clones.push(clone);
}

// Make the No button more reactive: when the cursor approaches within a threshold, spawn clones and nudge the button away.
let l2LastSpawn = 0;
l2NoArea.addEventListener('mousemove', (e)=>{
  const now = Date.now();
  const btnRect = l2No.getBoundingClientRect();
  const dx = e.clientX - (btnRect.left + btnRect.width/2);
  const dy = e.clientY - (btnRect.top + btnRect.height/2);
  const dist = Math.hypot(dx, dy);
  if(dist < 140 && now - l2LastSpawn > 300){
    spawnNoClone();
    l2LastSpawn = now;
    // nudge original to a new spot within card bounds
    const container = card.getBoundingClientRect();
    const margin = 12;
    const maxX = Math.max(0, container.width - btnRect.width - margin);
    const maxY = Math.max(0, container.height - btnRect.height - margin);
    const relX = Math.random() * maxX;
    const relY = Math.random() * maxY;
    const offsetX = relX - (btnRect.left - container.left);
    const offsetY = relY - (btnRect.top - container.top);
    l2No.style.transition = 'transform .28s cubic-bezier(.2,.9,.2,1)';
    l2No.style.transform = `translate(${Math.round(offsetX)}px, ${Math.round(offsetY)}px)`;
  }
});


l2Yes.addEventListener('click', ()=>{
  resetLevel2();
  enterLevel3();
});

// Level 3: multi-language flow
const languages = [
  {title:'One final confirmation.', q:'Do you love me?', yes:'Yes', no:'No'},
  {title:'Una última confirmación.', q:'¿Me amas?', yes:'Sí', no:'No'},
  {title:'Una conferma finale.', q:'Mi ami?', yes:'Sì', no:'No'},
  {title:'Une dernière confirmation.', q:"Tu m'aimes?", yes:'Oui', no:'Non'},
  {title:'Uma confirmação final.', q:'Você me ama?', yes:'Sim', no:'Não'},
  {title:'최종 확인입니다.', q:'나를 사랑해?', yes:'네', no:'아니요'},
  {title:'Ultima confirmatio.', q:'Me amas?', yes:'Ita', no:'Non'}
];

let langIndex = 0;
const l3Question = document.getElementById('l3-question');
const l3Yes = document.getElementById('l3-yes');
const l3No = document.getElementById('l3-no');
const l3Hint = document.getElementById('l3-hint');

function enterLevel3(){
  langIndex = 0;
  showLevel(levels.L3);
  updateLanguage();
}

function updateLanguage(){
  const item = languages[langIndex];
  const l3Title = document.getElementById('l3-title');
  l3Title.textContent = item.title;
  l3Question.textContent = item.q;
  l3Yes.textContent = item.yes;
  l3No.textContent = item.no;
}

l3Yes.addEventListener('click', ()=>{
  langIndex++;
  if(langIndex >= languages.length){
    finish();
  } else updateLanguage();
});

function playfulNoBehavior(){
  // subtle rotate, swap, brief fade
  l3No.style.transition = 'transform .25s ease, opacity .25s';
  l3No.style.transform = `rotate(${ (Math.random()*80)-40 }deg) translateX(${ (Math.random()*30)-15 }px)`;
  l3No.style.opacity = '0.4';
  setTimeout(()=>{ l3No.style.transform=''; l3No.style.opacity='1' }, 420);
  showToast('Let us reconsider that answer.', 1300);
}

l3No.addEventListener('click', ()=>{
  playfulNoBehavior();
});

// (hover jitter removed to keep controls exactly centered)

function finish(){
  showLevel(levels.FINAL);
  // fade-in final-sub
  const sub = document.getElementById('final-sub');
  sub.style.opacity = 0;
  setTimeout(()=>{ sub.style.opacity = 1 }, 400);
  celebrate();
}

// Restart
document.getElementById('restart').addEventListener('click', ()=>{
  resetAll();
});

function resetAll(){
  resetLevel2(); resetL1(); langIndex = 0; updateLanguage();
  // clear transforms
  document.querySelectorAll('.btn').forEach(b=>{ b.style.transform=''; });
  heartsRoot.innerHTML = '';
  showLevel(levels.L1);
}

// initial
showLevel(levels.L1);

// clear any leftover transforms on load (defensive) and ensure L1 button reset
window.addEventListener('load', ()=>{
  document.querySelectorAll('.btn').forEach(b=>{ b.style.transform=''; });
  resetL1();
});

// Defensive: also clear transforms on visibility change and before showing a level
document.addEventListener('visibilitychange', ()=>{
  document.querySelectorAll('.btn').forEach(b=>{ b.style.transform=''; });
});

function clearAllTransforms(){
  document.querySelectorAll('.btn, .no-dup').forEach(el=>{ el.style.transform=''; });
}

// celebration: floating hearts
function celebrate(){
  heartsRoot.innerHTML = '';
  for(let i=0;i<18;i++){
    const h = document.createElement('div'); h.className='heart';
    h.style.left = (10 + Math.random()*80) + '%';
    h.style.bottom = (10 + Math.random()*10) + '%';
    h.style.width = (8 + Math.random()*18) + 'px';
    h.style.height = h.style.width;
    h.style.animation = `floatUp ${4+Math.random()*3}s ease forwards ${Math.random()*0.6}s`;
    heartsRoot.appendChild(h);
  }
}

// small hearts for transitions
function smallHearts(n=6){
  for(let i=0;i<n;i++){
    const h = document.createElement('div'); h.className='heart';
    h.style.left = (30 + Math.random()*40) + '%';
    h.style.bottom = (10 + Math.random()*30) + '%';
    h.style.width = (6 + Math.random()*12) + 'px';
    h.style.height = h.style.width;
    h.style.animation = `floatUp ${2+Math.random()*2}s ease forwards ${Math.random()*0.4}s`;
    heartsRoot.appendChild(h);
    setTimeout(()=>{ h.remove(); }, 4000);
  }
}

// rose border creation
function createRoseBorder(){
  const root = document.getElementById('rose-border');
  if(!root) return;
  root.innerHTML = '';
  // use small inline SVG shapes for a cleaner border (hearts and simple roses)
  function heartSVG(size, color){
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7-4.9-9-8.1C-0.5 8.3 4.2 3 7.6 6.1 9.3 7.6 12 9.8 12 9.8s2.7-2.2 4.4-3.7C19.8 3 24.5 8.3 21 12.9 19 16.1 12 21 12 21z" fill="${color}"/></svg>`;
  }
  function roseSVG(size, color){
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="${color}"/><path d="M8 12c1-3 7-3 8 0s-3 3-4 3-4-1-4-3z" fill="#fff" opacity="0.12"/></svg>`;
  }

  const topCount = 14;
  for(let i=0;i<topCount;i++){
    const isHeart = (i%3===0);
    const el = document.createElement('div');
    el.className = 'edge-item';
    const size = 18 + Math.round(Math.random()*12);
    el.style.position = 'absolute';
    el.style.left = (i/(topCount-1))*100 + '%';
    el.style.top = '2%';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.transform = `translateX(-50%)`;
    el.style.opacity = 0.95;
    el.style.animationDelay = (Math.random()*1.2)+'s';
    el.innerHTML = isHeart ? heartSVG(size, '#FF7AA7') : roseSVG(size, '#D9547A');
    root.appendChild(el);
  }

  const bottomCount = 12;
  for(let i=0;i<bottomCount;i++){
    const isHeart = (i%2===0);
    const el = document.createElement('div');
    el.className = 'edge-item';
    const size = 14 + Math.round(Math.random()*10);
    el.style.position = 'absolute';
    el.style.left = (i/(bottomCount-1))*100 + '%';
    el.style.top = '96%';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.transform = `translateX(-50%)`;
    el.style.opacity = 0.95;
    el.style.animationDelay = (Math.random()*1.4)+'s';
    el.innerHTML = isHeart ? heartSVG(size, '#FF9FBF') : roseSVG(size, '#C04A6B');
    root.appendChild(el);
  }

  const sideCount = 8;
  for(let i=0;i<sideCount;i++){
    const isHeart = (i%2===0);
    const size = 14 + Math.round(Math.random()*10);
    const elL = document.createElement('div');
    elL.className = 'edge-item';
    elL.style.position = 'absolute';
    elL.style.left = '1%';
    elL.style.top = (10 + i*(76/(sideCount-1))) + '%';
    elL.style.width = size + 'px';
    elL.style.height = size + 'px';
    elL.style.opacity = 0.95;
    elL.style.animationDelay = (Math.random()*1.6)+'s';
    elL.innerHTML = isHeart ? heartSVG(size, '#FF7AA7') : roseSVG(size, '#D9547A');
    root.appendChild(elL);

    const elR = elL.cloneNode(true);
    elR.style.left = '97%';
    root.appendChild(elR);
  }
}

createRoseBorder();

// small accessibility: keyboard support for L1 yes
document.addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){
    const active = document.querySelector('.level.active');
    if(active && active.id==='level-1') l1Yes.click();
  }
});
