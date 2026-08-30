document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#site-nav');
  const links=document.querySelectorAll('.nav-links a');

  const setMenu=(open)=>{
    if(!header||!toggle)return;
    header.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.body.classList.toggle('menu-open',open);
  };

  if(toggle&&header){
    toggle.addEventListener('click',()=>setMenu(!header.classList.contains('open')));
    links.forEach(link=>link.addEventListener('click',()=>setMenu(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
    window.addEventListener('resize',()=>{if(window.innerWidth>809)setMenu(false)},{passive:true});
  }

  const revealTargets=document.querySelectorAll('.section,.work-card,.approach-grid article,.quotes article,.update-grid article');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
    revealTargets.forEach((el,i)=>{
      el.classList.add('reveal');
      el.style.transitionDelay=Math.min(i*25,240)+'ms';
      io.observe(el);
    });
  }else{
    revealTargets.forEach(el=>el.classList.add('is-visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(!id||id==='#')return;
    const target=document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }));
});
