(function(){
  var links=[].slice.call(document.querySelectorAll('.sect-btn'));
  function pick(b){links.forEach(function(x){var on=x===b;
    x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;
    var p=document.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!on;});}
  links.forEach(function(b,i){b.tabIndex=b.getAttribute('aria-selected')==='true'?0:-1;
    b.addEventListener('click',function(){pick(b)});
    b.addEventListener('keydown',function(e){
      var rtl=document.documentElement.dir==='rtl';
      var d=e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:
            e.key==='ArrowRight'?(rtl?-1:1):e.key==='ArrowLeft'?(rtl?1:-1):0;
      if(!d)return;e.preventDefault();var n=links[(i+d+links.length)%links.length];pick(n);n.focus();});});
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    var o=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}});},
      {rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){o.observe(el)});
  } else { rv.forEach(function(el){el.classList.add('in')}); }
  var v=document.querySelector('.bgfilm');
  if(v && matchMedia('(prefers-reduced-motion:reduce)').matches){
    v.removeAttribute('autoplay'); v.pause();
  }
})();

/* count-up numbers (display-style): .num[data-target] animates from 0 when scrolled into view */
(function(){
  var nums=[].slice.call(document.querySelectorAll('.num[data-target]'));
  if(!nums.length) return;
  var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function run(el){
    var target=parseFloat(el.getAttribute('data-target'))||0;
    var dec=parseInt(el.getAttribute('data-dec')||'0',10);
    if(reduced){ el.textContent=target.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec}); return; }
    var dur=1400, t0=null;
    function fmt(v){ return v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec}); }
    function step(ts){
      if(t0===null) t0=ts;
      var p=Math.min(1,(ts-t0)/dur);
      var e=1-Math.pow(1-p,3);   /* ease-out cubic */
      el.textContent=fmt(target*e);
      if(p<1) requestAnimationFrame(step);
      else el.textContent=fmt(target);
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && !reduced){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){ run(e.target); io.unobserve(e.target); }});},
      {threshold:0.4});
    nums.forEach(function(el){ el.textContent='0'; io.observe(el); });
  } else {
    nums.forEach(run);
  }
})();
