globalThis.KI = globalThis.KI || {};
(function () {
  const elderMen=['คำพูน','บุญมี','ทองดี','สมบัติ','คำมี','บุญเพ็ง','ทองใบ','สีทน','คำสิงห์','บุญถม','หนูพิน','คำผาย','ทองสุข','สุวรรณ','บุญช่วย','คำปั่น','บัวลอง','ทองคำ','สีดา','จันทา'];
  const elderWomen=['คำแพง','บุญเรือน','บัวจันทร์','ทองม้วน','คำปุน','สีนวล','บุญหลาย','จันทร์เพ็ญ','คำมูล','ทองพูน','บัวผัน','คำภา','หนูเวียง','สุดใจ','บุญยัง','คำใบ','ทองสา','มาลี','บัวพา','แพงศรี'];
  const midMen=['ประเสริฐ','สมชาย','วิชัย','สุรชัย','ไพโรจน์','อำนาจ','สมศักดิ์','บุญเลิศ','ชาตรี','สุวิทย์','ประยูร','ทองหล่อ','สมพงษ์','วีระ','คำเดื่อง','เสถียร','อุดม','ไพศาล','สำราญ','ณรงค์'];
  const midWomen=['วันเพ็ญ','สมพร','สุภาพ','บุญเรือง','อำพร','สายใจ','ทองเหรียญ','รัตนา','ดวงใจ','วาสนา','พิมพา','ลำดวน','สุนันทา','คำปิ่น','อรุณี','จำปา','นิตยา','ประนอม','ละเอียด','บุษบา'];
  const young=['ขวัญ','ต้น','แสง','นิด','ดาว','ภูมิ','เดือน','แก้ว','ฝน','ไหม','ปอ','เพชร','น้ำ','นุ่น','บีม','พลอย','ต่าย','เอ','บอล','จอย','กิ๊ฟ','ตูน','มด','อ้อม','หนิง','ป๊อป','ฟ้า','ข้าวหอม','ใบเตย','ภู','ตะวัน','มิ้นท์','เฟิร์น','ก้อง','ปาล์ม','ไอซ์','นนท์','แบม','ออม','เบนซ์'];
  const HOME={poor:150,mid:1200,rich:6000};
  const JOBS={
    poor:['ทำนา','รับจ้างทั่วไป','ทำนาและรับจ้างหน้าแล้ง','ไปรับจ้างในกรุงเทพฯ','ตัดอ้อยรับจ้าง','ทำไร่มันสำปะหลัง'],
    mid:['ทำนา','ค้าขายในตลาด','ขับรถรับจ้าง','ช่างก่อสร้าง','ทำนาและเลี้ยงวัว','พนักงานโรงงาน','ทำไร่อ้อย'],
    rich:['ข้าราชการครู','ข้าราชการ','เจ้าของร้านค้า','ผู้รับเหมาก่อสร้าง','เจ้าของโรงสีข้าว','เจ้าของที่นาหลายแปลง','พยาบาล']
  };
  function hash(text, base) {
    return Array.from(text || '').reduce((sum,char)=>(Math.imul(sum,31)+char.codePointAt(0))>>>0,base>>>0);
  }
  function rngFor(state, salt) {
    const seed=typeof state.familySeed==='number'?state.familySeed:hash(state.name,state.birthYear);
    return KI.rng.make((seed+Math.imul(salt,2654435761))>>>0);
  }
  function siblingCount(state, rng) {
    const range=state.birthYear<1980?[1,5]:state.birthYear<1995?[1,3]:[0,2];
    return range[0]+rng.int(range[1]-range[0]+1);
  }
  function sync(state) {
    if(typeof state.familySeed!=='number')state={...state,familySeed:(hash(state.name,state.birthYear)^(state.rng>>>0))>>>0};
    const old=state.family || {};
    const base=rngFor(state,1);
    const grandparents=Array.isArray(old.grandparents)?old.grandparents.slice():['ปู่','ย่า','ตา','ยาย'].filter(()=>base.chance(0.7)).map((relation,i)=>{
      const birthYear=state.birthYear-45-base.int(25);
      return {relation,name:(relation==='ย่า'||relation==='ยาย'?elderWomen:elderMen)[base.int(20)],birthYear,deathYear:birthYear+60+base.int(35)};
    }).filter(person=>person.deathYear>=state.birthYear);
    const orphan=!old.parentInfo && base.chance(0.04);
    if(orphan)grandparents.length=0;
    const parents=old.parents || (orphan?{father:midMen[base.int(midMen.length)],mother:midWomen[base.int(midWomen.length)]}:{father:base.chance(0.08)?null:midMen[base.int(midMen.length)],mother:base.chance(0.04)?null:midWomen[base.int(midWomen.length)]});
    const jobs=JOBS[state.wealth] || JOBS.mid;
    const parentInfo=old.parentInfo || {
      father:parents.father?{birthYear:state.birthYear-20-base.int(19),deathYear:null,job:jobs[base.int(jobs.length)]}:null,
      mother:parents.mother?{birthYear:state.birthYear-17-base.int(17),deathYear:null,job:jobs[base.int(jobs.length)]}:null
    };
    if(orphan)for(const p of [parentInfo.father,parentInfo.mother])p.deathYear=state.birthYear+1+base.int(11);
    for(const p of [parentInfo.father,parentInfo.mother])if(p && p.deathYear===null)p.deathYear=Math.max(state.birthYear+1,p.birthYear+52+base.int(42));
    const free=young.filter(n=>n!==state.name);
    const siblings=Array.isArray(old.siblings)?old.siblings.slice():Array.from({length:siblingCount(state,base)},()=>{
      const offset=base.chance(0.2)?(base.chance(0.5)?1:-1)*(8+base.int(8)):base.int(13)-6;
      return {name:free.splice(base.int(free.length),1)[0],birthYear:state.birthYear+(offset===0?1:offset),sex:base.chance(0.5)?'m':'f'};
    }).filter(x=>!parentInfo.mother || x.birthYear<=parentInfo.mother.deathYear);
    if(orphan && !siblings.some(x=>x.birthYear<=state.birthYear-10))siblings.push({name:free.splice(base.int(free.length),1)[0],birthYear:state.birthYear-10-base.int(9),sex:base.chance(0.5)?'m':'f'});
    const family={parents,parentInfo,grandparents,siblings,partner:old.partner || null,formerPartners:Array.isArray(old.formerPartners)?old.formerPartners.slice():[],children:Array.isArray(old.children)?old.children.slice():[],grandchildren:Array.isArray(old.grandchildren)?old.grandchildren.slice():[]};
    let flags=state.flags || {};
    const pick=(salt)=>young[rngFor(state,salt).int(young.length)];
    if(flags.partner && !family.partner && flags.reconcile && family.formerPartners.length){const back={...family.formerPartners.pop()};delete back.until;family.partner={...back,married:!!flags.married};flags={...flags,reconcile:false};}
    if(flags.partner && !family.partner){const r=rngFor(state,200+family.formerPartners.length*7+state.year);family.partner={name:young[r.int(young.length)],sex:state.sex==='m'?'f':'m',birthYear:state.birthYear+r.int(11)-5,since:state.year,married:!!flags.married};}
    else if(flags.partner && family.partner)family.partner={...family.partner,married:!!flags.married};
    else if(!flags.partner && family.partner){family.formerPartners.push({...family.partner,until:state.year});family.partner=null;}
    if(flags.child && family.children.length===0)family.children.push({name:pick(300),birthYear:Number.isFinite(flags.childSince)?flags.childSince:state.year});
    if(flags.newChild){family.children.push({name:pick(300+family.children.length*13+state.year),birthYear:state.year});flags={...flags,newChild:false,child:true};}
    if(flags.grandchild && family.children.length && family.grandchildren.length===0)family.grandchildren.push({name:pick(500),birthYear:Number.isFinite(flags.grandchildSince)?flags.grandchildSince:state.year});
    for(const [role,key,p] of [['พ่อ','father',parentInfo.father],['แม่','mother',parentInfo.mother]])if(p && !p.noted && state.year>=p.deathYear && !state.death){
      p.noted=true;
      const heirs=1+family.siblings.filter(x=>x.birthYear<=state.year).length;
      const estate=state.heir && state.heir.parent===key?state.heir.estate:Math.round((HOME[state.wealth]||HOME.mid)*KI.tables.wageDay(KI.data,state.year)/2/heirs);
      flags={...flags,parentPassed:role,estate:(flags.inheritDue?flags.estate||0:0)+estate,inheritDue:!!flags.inheritDue||estate>0};
    }
    const alive=(p)=>!!p && state.year<p.deathYear;
    const age=state.year-state.birthYear;
    const youngSibling=family.siblings.some(x=>x.birthYear>=state.birthYear+8 && state.year-x.birthYear>=6 && state.year-x.birthYear<=22);
    const elderSibling=family.siblings.some(x=>x.birthYear<=state.birthYear-8 && state.year-x.birthYear>=20);
    const fatherAlive=alive(parentInfo.father), motherAlive=alive(parentInfo.mother);
    flags={...flags,hasEx:family.formerPartners.length>0,hasSiblings:family.siblings.some(x=>x.birthYear<=state.year),kids:family.children.length,fatherAlive,motherAlive,parentsAlive:fatherAlive||motherAlive,grandparentsAlive:family.grandparents.some(p=>state.year<p.deathYear),youngSibling,elderSibling,orphan:!fatherAlive && !motherAlive && age<20 && !!(parentInfo.father || parentInfo.mother)};
    return {...state,flags,family,...(orphan?{wealth:'poor',birthWealth:'poor'}:{})};
  }
  KI.family={sync};
})();
