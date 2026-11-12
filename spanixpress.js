(() => {
  const form=document.querySelector('#spanix-form');
  if(!form)return;
  const fields={
    title:document.querySelector('#job-title'),
    employer:document.querySelector('#employer'),
    location:document.querySelector('#job-location'),
    type:document.querySelector('#job-type'),
    summary:document.querySelector('#job-summary'),
    eligibility:document.querySelector('#job-eligibility'),
    deadline:document.querySelector('#job-deadline'),
    pay:document.querySelector('#job-pay'),
    applicationUrl:document.querySelector('#application-url'),
    sourceUrl:document.querySelector('#source-url'),
    verifiedDate:document.querySelector('#verified-date')
  };
  const confirmCheck=document.querySelector('#verification-confirm');
  const caption=document.querySelector('#facebook-caption');
  const status=document.querySelector('#verification-status');
  const shareStatus=document.querySelector('#share-status');
  const buttons=['copy-caption','copy-application','download-image','mark-shared'].map(id=>document.getElementById(id));
  let current=null;
  const groupUrl='https://www.facebook.com/share/g/1Q8yaPsWVt/';
  const toast=message=>{
    const el=document.querySelector('#toast');
    if(!el)return;
    el.textContent=message;el.classList.add('show');
    window.clearTimeout(toast.timer);toast.timer=window.setTimeout(()=>el.classList.remove('show'),2600);
  };
  const safeHttps=value=>{
    try{const url=new URL(value);return url.protocol==='https:'&&Boolean(url.hostname)&&!url.username&&!url.password;}
    catch{return false;}
  };
  const dateText=value=>{
    if(!value)return 'Not stated by the provider';
    const date=new Date(value+'T00:00:00');
    return Number.isNaN(date.getTime())?value:new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'long',year:'numeric'}).format(date);
  };
  const setReady=ready=>{
    buttons.forEach(button=>{if(button)button.disabled=!ready;});
    status.classList.toggle('ready',ready);
  };
  const buildCaption=data=>{
    const lines=[
      '📢 OPPORTUNITY: '+data.title,
      '',
      '🏢 Employer / Provider: '+data.employer,
      '📍 Location: '+data.location,
      '📌 Type: '+data.type,
      '',
      'ABOUT THE OPPORTUNITY',
      data.summary,
      '',
      'REQUIREMENTS / ELIGIBILITY',
      data.eligibility,
      '',
      '🗓️ Closing date: '+dateText(data.deadline),
      data.pay?'💰 Salary / stipend: '+data.pay:null,
      '',
      '🔗 OFFICIAL APPLICATION LINK',
      data.applicationUrl,
      '',
      'Source checked: '+dateText(data.verifiedDate),
      'Please apply only through the official provider link. Never pay anyone to secure a job or interview.',
      '',
      'Shared by SpaniXpress · Kasi & Urban job plug',
      '#SpaniXpress #SouthAfricaJobs'
    ];
    return lines.filter(line=>line!==null).join('\n');
  };
  const readData=()=>{
    const data={};
    for(const [key,input] of Object.entries(fields))data[key]=input.value.trim();
    if(!safeHttps(data.applicationUrl)||!safeHttps(data.sourceUrl))throw new Error('Both URLs must be valid HTTPS links.');
    if(new Date(data.verifiedDate+'T00:00:00')>new Date(new Date().toDateString()))throw new Error('The source-check date cannot be in the future.');
    if(data.deadline&&new Date(data.deadline+'T00:00:00')<new Date(new Date().toDateString()))throw new Error('This closing date has passed. Do not prepare it as an open opportunity.');
    if(!confirmCheck.checked)throw new Error('Confirm that you checked the provider’s official source and the intake is open.');
    return data;
  };
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    try{
      current=readData();
      caption.value=buildCaption(current);
      status.textContent='Source check confirmed by the person preparing this post. BACCU has not independently verified the opportunity. Review every detail and link before sharing.';
      setReady(true);shareStatus.textContent='Draft ready. No Facebook post has been published.';
    }catch(error){current=null;caption.value='';setReady(false);status.textContent=error.message;shareStatus.textContent='';}
  });
  const copy=async value=>{
    try{
      if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
      else{
        const temp=document.createElement('textarea');temp.value=value;temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();
        const ok=document.execCommand('copy');temp.remove();if(!ok)throw new Error('Copy failed');
      }
      toast('Copied. You can now paste it into Facebook.');
    }catch{toast('Copy is unavailable. Select the text and copy it manually.');}
  };
  document.querySelector('#copy-caption').addEventListener('click',()=>current&&copy(caption.value));
  document.querySelector('#copy-application').addEventListener('click',()=>current&&copy(current.applicationUrl));
  document.querySelector('#mark-shared').addEventListener('click',()=>{
    if(!current)return;
    shareStatus.textContent='Marked as shared in this session on '+new Intl.DateTimeFormat('en-ZA',{dateStyle:'medium',timeStyle:'short'}).format(new Date())+'. This is not synced or saved to a server.';
  });
  document.querySelector('#download-image').addEventListener('click',()=>{
    if(!current)return;
    const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#0A0A0A';ctx.fillRect(0,0,1200,630);
    ctx.strokeStyle='#D4AF37';ctx.lineWidth=2;ctx.strokeRect(38,38,1124,554);
    ctx.fillStyle='#D4AF37';ctx.font='bold 24px Arial';ctx.fillText('SPANI XPRESS  /  VERIFIED SOURCE CHECKED',78,105);
    ctx.fillStyle='#F5F5F5';ctx.font='bold 54px Georgia';wrapText(ctx,current.title,78,205,1000,66,2);
    ctx.fillStyle='#D4AF37';ctx.font='28px Arial';ctx.fillText(current.employer,78,365);
    ctx.fillStyle='#F5F5F5';ctx.font='25px Arial';ctx.fillText(current.location,78,420);
    ctx.fillStyle='#BDB7A9';ctx.font='21px Arial';ctx.fillText('Closing date: '+dateText(current.deadline),78,485);
    ctx.fillStyle='#D4AF37';ctx.font='bold 19px Arial';ctx.fillText('APPLY THROUGH THE OFFICIAL PROVIDER LINK',78,545);
    ctx.fillStyle='#A9A39A';ctx.font='16px Arial';ctx.fillText('BACCU™ Ambition Unleashed  ·  Built in the Kasi.',78,575);
    canvas.toBlob(blob=>{
      if(!blob){toast('Image export failed in this browser.');return;}
      const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='SpaniXpress-'+current.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.png';link.click();URL.revokeObjectURL(url);
    },'image/png');
  });
  function wrapText(ctx,text,x,y,maxWidth,lineHeight,maxLines){
    const words=text.split(/\s+/);let line='',lineNumber=0;
    for(const word of words){
      const test=line?line+' '+word:word;
      if(ctx.measureText(test).width>maxWidth&&line){
        ctx.fillText(line,x,y+lineNumber*lineHeight);line=word;lineNumber++;
        if(lineNumber>=maxLines-1)break;
      }else line=test;
    }
    if(line)ctx.fillText(line,x,y+lineNumber*lineHeight);
  }
  document.querySelector('#clear-draft').addEventListener('click',()=>{
    form.reset();current=null;caption.value='';setReady(false);
    status.textContent='No post prepared. Complete the form and confirm your source check.';
    shareStatus.textContent='';toast('Draft cleared.');
  });
  document.querySelectorAll('input,textarea,select').forEach(input=>input.addEventListener('input',()=>{
    if(current){current=null;caption.value='';setReady(false);status.textContent='Details changed. Prepare the post again after checking the official source.';shareStatus.textContent='';}
  }));
  document.querySelector('.output-link')?.addEventListener('click',()=>{
    if(!navigator.onLine){shareStatus.textContent='You are offline. The Facebook group needs an internet connection.';}
  });
  const verifiedDate=fields.verifiedDate;
  if(verifiedDate&&!verifiedDate.value){
    const today=new Date();verifiedDate.value=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  }
  setReady(false);
})();