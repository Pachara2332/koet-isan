globalThis.KI = globalThis.KI || {};
(function () {
  function birth(state, province) {
    const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;
    const ctx=canvas.getContext('2d');
    ctx.fillStyle='#fffcf6';ctx.fillRect(0,0,1200,630);
    ctx.fillStyle='#2e7d22';ctx.fillRect(0,0,25,630);
    ctx.fillStyle='#c2521c';ctx.font='bold 32px sans-serif';ctx.fillText('เกิดอีสาน · เรื่องราวชีวิตจำลอง',90,110,1020);
    ctx.fillStyle='#24205c';ctx.font='bold 82px sans-serif';ctx.fillText(state.name,90,250,1020);
    ctx.font='40px sans-serif';ctx.fillText(`เพศ${state.sex==='f'?'หญิง':'ชาย'} · เกิด พ.ศ. ${state.birthYear+543} · ${province}`,90,335,1020);
    ctx.fillStyle='#4a4680';ctx.font='30px sans-serif';ctx.fillText('หนึ่งชีวิต หลายทางเลือก',90,460,1020);
    return canvas;
  }
  function wrap(ctx,text,maxWidth) {
    const words=typeof Intl!=='undefined' && Intl.Segmenter?Array.from(new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text),part=>part.segment):Array.from(text), lines=[];
    let line='';
    for(const ch of words){const test=line+ch;if(ctx.measureText(test).width>maxWidth && line){lines.push(line);line=ch.trimStart();}else line=test;}
    if(line)lines.push(line);
    return lines;
  }
  function svgImage(node,size) {
    return new Promise(resolve=>{
      if(!node || typeof XMLSerializer!=='function'){resolve(null);return;}
      const copy=node.cloneNode(true);copy.setAttribute('xmlns','http://www.w3.org/2000/svg');copy.setAttribute('width',String(size));copy.setAttribute('height',String(size));
      const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);
      img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(copy));
    });
  }
  async function life(summary,titles,url,figures) {
    const W=1080,H=1500,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext('2d'), font=(w,size)=>w+' '+size+'px "Anuphan","Noto Sans Thai",sans-serif';
    const list=figures || [];
    const images=await Promise.all(list.map((f,i)=>svgImage(f.svg,i===0?320:140)));
    ctx.fillStyle='#fffcf6';ctx.fillRect(0,0,W,H);
    ['#c2521c','#2e7d22','#e8a923'].forEach((c,i)=>{ctx.fillStyle=c;ctx.fillRect(0,i*H/3,24,H/3);});
    ctx.fillStyle='#fbf3e4';ctx.beginPath();ctx.arc(860,250,190,0,Math.PI*2);ctx.fill();
    if(images[0])ctx.drawImage(images[0],700,90,320,320);
    let y=100;
    const text=(t,w,size,color,x,maxW,maxLines)=>{ctx.font=font(w,size);ctx.fillStyle=color;ctx.textBaseline='top';const lines=wrap(ctx,t,maxW).slice(0,maxLines||2);lines.forEach(line=>{ctx.fillText(line,x,y);y+=size*1.32;});ctx.textBaseline='alphabetic';};
    text('เกิดอีสาน · บันทึกหนึ่งชีวิต','bold',30,'#c2521c',80,560,1);y+=16;
    text(summary.name,'bold',88,'#24205c',80,600,1);y+=4;
    text(`พ.ศ. ${summary.years[0]+543}–${summary.years[1]+543}`,'normal',36,'#24205c',80,580,1);
    text(`เพศ${summary.sex==='f'?'หญิง':summary.sex==='m'?'ชาย':'ไม่ระบุ'} · อายุ ${summary.age} ปี`,'bold',44,'#2e7d22',80,580,1);y+=8;
    text('การศึกษา: '+summary.edu,'normal',30,'#4a4680',80,580,2);
    if(summary.jobs.length)text('งาน: '+summary.jobs.slice(-3).join(' → '),'normal',30,'#4a4680',80,580,2);
    y=Math.max(y,450)+10;
    if(summary.cause){ctx.fillStyle='#fbe3dc';ctx.fillRect(60,y-10,W-120,92);text('จากไปด้วย','bold',24,'#b23a1e',84,W-180,1);y-=6;text(summary.cause,'bold',30,'#b23a1e',84,W-180,1);y+=42;}
    if(summary.stats){
      const bars=[['สุขภาพ','health','#2e7d22'],['ความสุข','happy','#e8a923'],['ความรู้','know','#2f3c7e'],['ความสัมพันธ์','bond','#c2521c']];
      bars.forEach(([label,key,color],i)=>{const x=80+(i%2)*470,by=y+Math.floor(i/2)*66;ctx.font=font('bold',26);ctx.fillStyle='#24205c';ctx.fillText(label,x,by);ctx.textAlign='right';ctx.fillText(String(summary.stats[key]),x+410,by);ctx.textAlign='left';ctx.fillStyle='#e4dccb';ctx.fillRect(x,by+12,410,14);ctx.fillStyle=color;ctx.fillRect(x,by+12,4.1*summary.stats[key],14);});
      y+=148;
    }
    if(typeof summary.worth==='number')text('ทรัพย์สินสุทธิ '+summary.worth.toLocaleString('th-TH')+' บาท','bold',30,summary.worth<0?'#b23a1e':'#24205c',80,W-160,1);
    if(summary.places.length)text('ที่อยู่: '+summary.places.slice(-4).join(' → '),'normal',26,'#4a4680',80,W-160,2);
    y+=10;
    const kin=list.slice(1);
    if(kin.length){
      text('ครอบครัว','bold',30,'#2e7d22',80,W-160,1);
      const per=Math.min(7,kin.length),gap=(W-160)/per;
      kin.slice(0,7).forEach((f,i)=>{const x=80+i*gap;if(images[i+1])ctx.drawImage(images[i+1],x+(gap-130)/2,y-10,130,130);ctx.font=font('normal',22);ctx.fillStyle='#24205c';ctx.textAlign='center';ctx.fillText(f.label,x+gap/2,y+140,gap-8);ctx.font=font('normal',20);ctx.fillStyle='#77739f';ctx.fillText(f.name||'',x+gap/2,y+166,gap-8);ctx.textAlign='left';});
      y+=200;
    }
    if(summary.familyLine)text(summary.familyLine,'normal',24,'#4a4680',80,W-160,2);
    const pins=summary.pins.slice(-5);
    if(pins.length){y+=6;text('เส้นทางชีวิต','bold',28,'#2e7d22',80,W-160,1);pins.forEach(p=>text(`${p.year+543} · ${p.text}`,'normal',24,'#4a4680',80,W-160,1));}
    if(titles.length&&y<H-200){y+=8;text('ฉายา: '+titles.map(t=>t.label).join(' · '),'bold',28,'#c2521c',80,W-160,2);}
    ctx.fillStyle='#24205c';ctx.fillRect(0,H-120,W,120);
    ctx.fillStyle='#f7d77f';ctx.font=font('bold',30);ctx.fillText('ลองใช้ชีวิตของคุณเองที่',80,H-70);
    ctx.fillStyle='#ffffff';ctx.font=font('normal',28);ctx.fillText(url.replace(/^https?:\/\//,''),80,H-30,W-160);
    return canvas;
  }
  KI.share={birth,life};
})();
