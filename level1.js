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
  window.location.href = 'level2.html';
});

// Apply accent color
document.documentElement.style.setProperty('--accent', '#FF6B9A');
createRoseBorder();
smallHearts(6);

// Keyboard support: Enter key to click yes
document.addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){
    l1Yes.click();
  }
});
