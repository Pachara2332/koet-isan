globalThis.KI = globalThis.KI || {};
(function () {
  let canvas = null, context = null, frame = null, mode = 'none', enabled = false, points = [], listening = false;
  function resize() {
    if (!canvas) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    points = [];
  }
  function point() {
    return {x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:1+Math.random()*2,speed:0.4+Math.random()*1.2};
  }
  function draw() {
    frame = null;
    if (!enabled || document.hidden || !canvas || !context) return;
    context.clearRect(0,0,canvas.width,canvas.height);
    if (mode !== 'none') {
      while (points.length < (mode === 'rain' ? 90 : 45)) points.push(point());
      context.fillStyle = mode === 'rain' ? 'rgba(218,239,248,.6)' : mode === 'leaves' ? 'rgba(133,118,52,.35)' : 'rgba(255,250,225,.42)';
      context.strokeStyle = context.fillStyle;
      for (const p of points) {
        if (mode === 'rain') {
          context.beginPath(); context.moveTo(p.x,p.y); context.lineTo(p.x-3,p.y+10); context.stroke(); p.y += p.speed*5; p.x -= 0.5;
        } else {
          context.beginPath(); context.arc(p.x,p.y,p.size,0,Math.PI*2); context.fill(); p.x += p.speed*0.5; p.y += mode === 'mist' ? -0.15 : p.speed*0.3;
        }
        if (p.y > canvas.height+10) p.y=-10;
        if (p.y < -10) p.y=canvas.height+10;
        if (p.x > canvas.width+10) p.x=-10;
        if (p.x < -10) p.x=canvas.width+10;
      }
    }
    frame = requestAnimationFrame(draw);
  }
  function pause() {
    enabled=false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame=null;
    if (context && canvas) context.clearRect(0,0,canvas.width,canvas.height);
  }
  function resume() {
    enabled=true;
    if (frame === null && !document.hidden && canvas && context) frame=requestAnimationFrame(draw);
  }
  function mount(next) {
    if (frame !== null) cancelAnimationFrame(frame);
    frame=null; canvas=next; context=canvas && canvas.getContext('2d'); resize();
    if (!listening) {
      listening=true;
      window.addEventListener('resize',resize);
      document.addEventListener('visibilitychange',()=>{if (document.hidden) {if(frame!==null)cancelAnimationFrame(frame);frame=null;} else if(enabled) resume();});
    }
    if (enabled) resume();
  }
  function set(next) { mode=['dust','leaves','rain','mist','none'].includes(next)?next:'none'; points=[]; }
  KI.particles={mount,set,pause,resume};
})();
