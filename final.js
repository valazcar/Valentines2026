// Final celebration page
function celebrate(){
  const heartsRoot = document.getElementById('hearts');
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

document.getElementById('restart').addEventListener('click', ()=>{
  window.location.href = 'index.html';
});

// Apply accent color
document.documentElement.style.setProperty('--accent', '#FF6B9A');
createRoseBorder();
celebrate();

// Fade in final message
const sub = document.getElementById('final-sub');
sub.style.opacity = 0;
setTimeout(()=>{ sub.style.opacity = 1 }, 400);
