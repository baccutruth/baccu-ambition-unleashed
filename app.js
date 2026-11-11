const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu';});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='Menu';}));
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();

const search=document.querySelector('#opportunity-search');
const filterButtons=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.opportunity-card')];
const emptyState=document.querySelector('#no-results');
let activeFilter='all';
function filterOpportunities(){
  const term=(search?.value||'').trim().toLocaleLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const category=card.dataset.category||'';
    const matchesCategory=activeFilter==='all'||category===activeFilter;
    const matchesText=card.textContent.toLocaleLowerCase().includes(term);
    const show=matchesCategory&&matchesText;
    card.hidden=!show;
    if(show)visible++;
  });
  if(emptyState)emptyState.hidden=visible!==0;
}
search?.addEventListener('input',filterOpportunities);
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter||'all';
  filterButtons.forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
  filterOpportunities();
}));

let toastTimer;
function showToast(message){
  const toast=document.querySelector('#toast');if(!toast)return;
  toast.textContent=message;toast.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}
async function copyText(value){
  if(!value){showToast('There is no prompt to copy yet.');return;}
  try{
    if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);}
    else{
      const helper=document.createElement('textarea');helper.value=value;helper.setAttribute('readonly','');helper.style.position='absolute';helper.style.left='-9999px';document.body.appendChild(helper);helper.select();
      const copied=document.execCommand('copy');helper.remove();if(!copied)throw new Error('Copy unavailable');
    }
    showToast('Prompt copied. Paste it into your AI assistant.');
  }catch(error){showToast('Copy is unavailable here. Select the prompt and copy it manually.');}
}
document.querySelectorAll('.prompt-button').forEach(button=>button.addEventListener('click',()=>copyText(button.dataset.prompt||'')));

const roleInput=document.querySelector('#prompt-role');
const experienceInput=document.querySelector('#prompt-experience');
const generatedPrompt=document.querySelector('#generated-prompt');
document.querySelector('#build-prompt')?.addEventListener('click',()=>{
  const role=roleInput?.value.trim()||'the role I am exploring';
  const experience=experienceInput?.value.trim()||'I will provide my real skills and experience';
  generatedPrompt.value='Act as a practical South African career coach. Help me prepare an honest application for '+role+'. My actual skills and experience: '+experience+'. Ask follow-up questions where details are missing. Improve clarity and relevance without inventing qualifications, employers, dates, duties or achievements. Use concise professional language and flag anything I must verify.';
  showToast('Your prompt is ready to copy.');
});
document.querySelector('#copy-built-prompt')?.addEventListener('click',()=>copyText(generatedPrompt?.value||''));

let installPrompt=null;
const installButton=document.querySelector('#install-app');
window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();installPrompt=event;if(installButton)installButton.hidden=false;
});
installButton?.addEventListener('click',async()=>{
  if(!installPrompt)return;
  installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true;
});
window.addEventListener('appinstalled',()=>showToast('BACCU Ambition Unleashed installed.'));

if('serviceWorker'in navigator&&/^https?:$/.test(location.protocol)){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>showToast('Offline support could not be enabled in this browser.')));
}