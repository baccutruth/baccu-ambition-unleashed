const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu';});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='Menu';menuButton?.focus?.();}});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='Menu';}));
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();

const search=document.querySelector('#opportunity-search');
const filterButtons=[...document.querySelectorAll('.filter')];
const opportunityGrid=document.querySelector('#opportunity-grid');
const emptyState=document.querySelector('#no-results');
const loadingState=document.querySelector('#opportunity-loading');
let activeFilter='all';
let opportunityCards=[];

const categoryLabels={
  learnerships:'Learnerships',
  grants:'Grants',
  entrepreneurship:'Entrepreneurship',
  'ai-digital':'AI & Digital'
};
const categoryIconPaths={
  learnerships:'<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H20v17H5.5A2.5 2.5 0 0 1 3 17.5v-12Z"/><path d="M3 17.5A2.5 2.5 0 0 1 5.5 15H20M8 7h7"/>',
  grants:'<circle cx="8" cy="8" r="5"/><path d="M8 5.5v5M6 7h3.2M13 5h5.5a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 5 18v-5M14 13h7"/>',
  entrepreneurship:'<rect x="3" y="7" width="18" height="13" rx="1"/><path d="M8 7V4h8v3M3 12h18m-11 0v2h4v-2"/>',
  'ai-digital':'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>'
};
function createNode(tag,className,text){
  const node=document.createElement(tag);
  if(className)node.className=className;
  if(text!==undefined)node.textContent=text;
  return node;
}
function createCategoryIcon(category){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24');
  svg.setAttribute('aria-hidden','true');
  svg.innerHTML=categoryIconPaths[category]||categoryIconPaths.learnerships;
  return svg;
}
function addOpportunityField(list,label,value){
  const row=createNode('div');
  row.append(createNode('dt','',label),createNode('dd','',value||'Not stated by provider'));
  list.append(row);
}
function formatVerifiedDate(value){
  const date=new Date(value+'T00:00:00Z');
  return Number.isNaN(date.getTime())?value:new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(date);
}
function createOpportunityCard(item){
  const card=createNode('article','opportunity-card');
  card.dataset.category=item.category||'';
  const top=createNode('div','card-top');
  const category=createNode('span','category-marker');
  category.append(createCategoryIcon(item.category),createNode('span','',categoryLabels[item.category]||item.category));
  const status=createNode('span','status-badge',item.application_status||'Status not stated');
  status.setAttribute('aria-label','Application status: '+(item.application_status||'not stated'));
  status.classList.add((item.application_status||'').toLowerCase().includes('window open')?'is-open':'is-guidance');
  top.append(category,status);
  card.append(top,createNode('h3','',item.title),createNode('p','',item.summary));

  const details=createNode('dl');
  addOpportunityField(details,'Provider',item.provider);
  addOpportunityField(details,'Opportunity Type',item.opportunity_type);
  addOpportunityField(details,'Eligibility',item.eligibility);
  addOpportunityField(details,'Location',item.location);
  addOpportunityField(details,'Application Steps',item.application_steps);
  addOpportunityField(details,'Official Closing Date',item.closing_date);
  addOpportunityField(details,'Last Verified Date',formatVerifiedDate(item.last_verified_date||''));
  card.append(details);

  const actions=createNode('div','opportunity-actions');
  const sourceUrl=new URL(item.source_url,location.href);
  const source=createNode('a','card-source','Official source ↗');
  source.href=sourceUrl.href;
  source.target='_blank';
  source.rel='noopener noreferrer';
  const applyUrl=new URL(item.apply_url,location.href);
  const apply=createNode('a','button button-gold opportunity-apply','Apply on Official Site');
  apply.href=applyUrl.href;
  apply.target='_blank';
  apply.rel='noopener noreferrer';
  actions.append(source,apply);
  card.append(actions);
  return card;
}
function filterOpportunities(){
  const term=(search?.value||'').trim().toLocaleLowerCase();
  let visible=0;
  opportunityCards.forEach(card=>{
    const matchesCategory=activeFilter==='all'||card.dataset.category===activeFilter;
    const matchesText=card.textContent.toLocaleLowerCase().includes(term);
    card.hidden=!(matchesCategory&&matchesText);
    if(!card.hidden)visible++;
  });
  if(emptyState)emptyState.hidden=visible!==0;
}
search?.addEventListener('input',filterOpportunities);
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter||'all';
  filterButtons.forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
  filterOpportunities();
}));
async function loadOpportunities(){
  if(!opportunityGrid)return;
  try{
    const response=await fetch('./data/opportunities.json');
    if(!response.ok)throw new Error('Opportunity data could not be loaded');
    const data=await response.json();
    const opportunities=Array.isArray(data.opportunities)?data.opportunities:[];
    opportunityCards=opportunities.map(createOpportunityCard);
    opportunityGrid.replaceChildren(...opportunityCards);
    if(loadingState)loadingState.hidden=true;
    filterOpportunities();
  }catch(error){
    if(loadingState)loadingState.hidden=true;
    if(emptyState){emptyState.textContent='Opportunity information is unavailable right now. Try again when you are online.';emptyState.hidden=false;}
  }
}
loadOpportunities();

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

let deferredInstallPrompt=null;
const installBanner=document.querySelector('#install-banner');
const installMessage=document.querySelector('#install-message');
const installButton=document.querySelector('#install-app');
const dismissInstallButton=document.querySelector('#dismiss-install');
const installDismissKey='baccu-install-banner-dismissed';

function isInstalled(){
  return window.matchMedia?.('(display-mode: standalone)').matches||navigator.standalone===true;
}
function wasInstallBannerDismissed(){
  try{return localStorage.getItem(installDismissKey)==='yes';}catch(error){return false;}
}
function dismissInstallBanner(){
  if(installBanner)installBanner.hidden=true;
  try{localStorage.setItem(installDismissKey,'yes');}catch(error){}
}
function showInstallBanner(){
  if(installBanner&&!isInstalled()&&!wasInstallBannerDismissed())installBanner.hidden=false;
}
let manualInstallHelpShown=false;
function setManualInstallHelp(){
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(installMessage)installMessage.textContent=ios
    ?'In Safari, tap Share, then Add to Home Screen.'
    :'Open your browser menu and choose Install app or Add to Home Screen.';
  if(installButton)installButton.textContent='How to install';
}

window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  if(installMessage)installMessage.textContent='Install BACCU for quick access and offline use.';
  if(installButton)installButton.textContent='Install App';
  showInstallBanner();
});
installButton?.addEventListener('click',async()=>{
  if(!deferredInstallPrompt){
    if(manualInstallHelpShown){dismissInstallBanner();return;}
    setManualInstallHelp();
    manualInstallHelpShown=true;
    if(installButton)installButton.textContent='Got it';
    return;
  }
  deferredInstallPrompt.prompt();
  const choice=await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  if(choice?.outcome==='accepted'){
    dismissInstallBanner();
    showToast('BACCU installation started.');
  }else{
    showToast('Installation was not completed. You can try again from your browser menu.');
  }
});
dismissInstallButton?.addEventListener('click',dismissInstallBanner);
window.addEventListener('appinstalled',()=>{
  dismissInstallBanner();
  showToast('BACCU Ambition Unleashed installed.');
});

if(!isInstalled()){
  setManualInstallHelp();
  window.addEventListener('load',showInstallBanner,{once:true});
}

if('serviceWorker'in navigator&&window.isSecureContext){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register(new URL('./sw.js',document.baseURI),{scope:'./'})
      .catch(()=>showToast('Offline support could not be enabled in this browser.'));
  },{once:true});
}
