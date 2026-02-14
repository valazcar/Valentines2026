// Level 2: duplicating No buttons
const l2Yes = document.getElementById('l2-yes');
const l2NoArea = document.getElementById('l2-no-area');
const l2No = document.getElementById('l2-no');
const card = document.getElementById('card');
let l2Clones = [];

function randomOffset(el){
  const rect = card.getBoundingClientRect();
  const x = Math.random()*(rect.width-120);
  const y = Math.random()*(rect.height-60);
  return {x,y};
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
    l2Clones.forEach(c=>c.remove()); l2Clones = [];
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
  l2Clones.forEach(c=>c.remove()); l2Clones = [];
  window.location.href = 'level3.html';
});

// Apply accent color
document.documentElement.style.setProperty('--accent', '#9B7CFF');
createRoseBorder();
smallHearts(6);
