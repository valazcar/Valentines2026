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

l1No.addEventListener('mouseenter', ()=>{
  const {x,y} = randomOffset(card);
  l1No.style.transition = 'transform .35s ease';
  l1No.style.transform = `translate(${x}px, ${y}px)`;
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
  const areaRect = l2NoArea.getBoundingClientRect();
  const x = Math.random()*(areaRect.width-40);
  const y = Math.random()*(areaRect.height+120) - 40;
  clone.style.left = `${x}px`;
  clone.style.top = `${y}px`;
  clone.addEventListener('click', ()=>{
    showToast('That seems unlikely.');
    resetLevel2();
    showLevel(levels.L2);
  });
  l2NoArea.appendChild(clone);
  l2Clones.push(clone);
}

l2No.addEventListener('mouseenter', ()=>{
  // spawn several clones gradually
  spawnNoClone();
});

l2Yes.addEventListener('click', ()=>{
  resetLevel2();
  enterLevel3();
});

// Level 3: multi-language flow
const languages = [
  {q:'Do you love me?', yes:'Yes', no:'No'},
  {q:'¿Me amas?', yes:'Sí', no:'No'},
  {q:'Mi ami?', yes:'Sì', no:'No'},
  {q:"Tu m'aimes?", yes:'Oui', no:'Non'},
  {q:'Você me ama?', yes:'Sim', no:'Não'},
  {q:'나를 사랑해?', yes:'네', no:'아니요'},
  {q:'Me amas?', yes:'Ita', no:'Non'}
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
  showLevel(levels.L1);
}

// initial
showLevel(levels.L1);

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

// small accessibility: keyboard support for L1 yes
document.addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){
    const active = document.querySelector('.level.active');
    if(active && active.id==='level-1') l1Yes.click();
  }
});
