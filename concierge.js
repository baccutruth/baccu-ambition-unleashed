(() => {
  const search=document.querySelector('#source-search');
  const cards=[...document.querySelectorAll('.source-card')];
  const filters=[...document.querySelectorAll('.source-filter')];
  const empty=document.querySelector('#source-empty');
  const status=document.querySelector('#source-status');
  let active='all';
  function apply(){
    const term=(search?.value||'').trim().toLocaleLowerCase();
    let count=0;
    cards.forEach(card=>{
      const cats=(card.dataset.categories||'').split(/\s+/);
      const matchesCategory=active==='all'||cats.includes(active);
      const matchesText=card.textContent.toLocaleLowerCase().includes(term)||(card.dataset.provider||'').toLocaleLowerCase().includes(term)||(card.dataset.keywords||'').toLocaleLowerCase().includes(term);
      const visible=matchesCategory&&matchesText;
      card.hidden=!visible;if(visible)count++;
    });
    if(empty)empty.hidden=count!==0;
    if(status)status.textContent=count===0?'No sources match that search. Try another keyword.':'';
  }
  search?.addEventListener('input',apply);
  filters.forEach(button=>button.addEventListener('click',()=>{
    active=button.dataset.sourceFilter||'all';
    filters.forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
    apply();
  }));
})();