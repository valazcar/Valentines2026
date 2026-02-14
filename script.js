// Shared utilities
const toast = document.getElementById('toast');
const heartsRoot = document.getElementById('hearts');

function showToast(msg, t=1200){
  toast.textContent = msg; toast.style.opacity = 1; toast.removeAttribute('aria-hidden');
  setTimeout(()=>{ toast.style.opacity = 0; toast.setAttribute('aria-hidden','true') }, t);
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
