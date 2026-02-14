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
    window.location.href = 'final.html';
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

// Apply accent color
document.documentElement.style.setProperty('--accent', '#FFB86B');
createRoseBorder();
smallHearts(6);
updateLanguage();
