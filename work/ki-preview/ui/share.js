globalThis.KI = globalThis.KI || {};
(function () {
  function birth(state, province) {
    const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;
    const ctx=canvas.getContext('2d');
    ctx.fillStyle='#fffcf6';ctx.fillRect(0,0,1200,630);
    ctx.fillStyle='#2e7d22';ctx.fillRect(0,0,25,630);
    ctx.fillStyle='#c2521c';ctx.font='bold 32px sans-serif';ctx.fillText('เกิดอีสาน · เรื่องราวชีวิตจำลอง',90,110,1020);
    ctx.fillStyle='#24205c';ctx.font='bold 82px sans-serif';ctx.fillText(state.name,90,250,1020);
    ctx.font='40px sans-serif';ctx.fillText(`เกิด พ.ศ. ${state.birthYear+543} · ${province}`,90,335,1020);
    ctx.fillStyle='#4a4680';ctx.font='30px sans-serif';ctx.fillText('หนึ่งชีวิต หลายทางเลือก',90,460,1020);
    return canvas;
  }
  KI.share={birth};
})();
