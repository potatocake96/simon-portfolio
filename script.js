
// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Accordion
document.addEventListener('click',(e)=>{
  const head=e.target.closest('.accordion-header'); if(!head) return;
  head.parentElement.classList.toggle('open');
});

// Modals with animation + autoplay videos
function openModal(id){
  const back = document.getElementById(id);
  if(!back) return;
  back.style.display='flex';
  requestAnimationFrame(()=>back.classList.add('show'));
  const modal = back.querySelector('.modal');
  requestAnimationFrame(()=> modal.classList.add('show'));
  back.querySelectorAll('video').forEach(v=>{ try{ v.play(); }catch{} });
}
function closeModal(id){
  const back = document.getElementById(id);
  if(!back) return;
  const modal = back.querySelector('.modal');
  modal.classList.remove('show');
  back.classList.remove('show');
  back.querySelectorAll('video').forEach(v=>{ try{ v.pause(); }catch{} });
  setTimeout(()=>{ back.style.display='none'; },180);
}
document.addEventListener('click',(e)=>{
  const close=e.target.closest('[data-close]'); if(close){ closeModal(close.dataset.close); }
  const back=e.target.closest('.modal-backdrop'); if(back && e.target===back){ closeModal(back.id); }
});
window.openModal=openModal;

// Make clickable highlight cards open their detail modals
document.addEventListener('click',(e)=>{
  const card = e.target.closest('.card.clickable[data-modal]');
  if(card){ openModal(card.dataset.modal); }
});
document.addEventListener('keydown',(e)=>{
  const card = e.target.closest('.card.clickable[data-modal]');
  if(card && (e.key==='Enter' || e.key===' ')){
    e.preventDefault();
    openModal(card.dataset.modal);
  }
});

// Copy email helper
function copyEmail(id){
  const el = document.getElementById(id);
  if(!el) return;
  const text = el.textContent.trim();
  navigator.clipboard.writeText(text).then(()=>{
    const btn = document.querySelector('.copy-btn');
    if(btn){ const old = btn.textContent; btn.textContent='Copied!'; setTimeout(()=>btn.textContent=old,1200); }
  });
}
