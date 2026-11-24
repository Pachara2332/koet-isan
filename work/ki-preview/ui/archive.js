globalThis.KI = globalThis.KI || {};
(function () {
  function parse(text) {
    if(typeof text!=='string' || text.length>1000000)return null;
    let data;
    try {data=JSON.parse(text);} catch(e) {return null;}
    if(!data || data.version!==1 || !Array.isArray(data.lives) || data.lives.length>30)return null;
    const lives=[];
    for(const life of data.lives) {
      if(!life || typeof life.name!=='string' || life.name.length>40 || !Number.isFinite(life.age) || life.age<0 || life.age>120)return null;
      const clean={name:life.name,age:life.age,edu:typeof life.edu==='string'?life.edu:'ไม่ระบุ',pins:[],notes:[],reflections:{}};
      if(Array.isArray(life.years) && life.years.length===2 && life.years.every(Number.isFinite))clean.years=life.years.slice();
      if(typeof life.cause==='string')clean.cause=life.cause.slice(0,200);
      for(const key of ['places','jobs'])if(Array.isArray(life[key]))clean[key]=life[key].filter(x=>typeof x==='string').slice(0,100).map(x=>x.slice(0,200));
      if(life.peak && typeof life.peak==='object' && !Array.isArray(life.peak)) {
        clean.peak={};
        for(const key of ['happy','health','know','money']) {
          const item=life.peak[key];
          clean.peak[key]=item && Number.isFinite(item.value) && Number.isFinite(item.year) && Number.isFinite(item.age)?{value:item.value,year:item.year,age:item.age}:null;
        }
      }
      if(Array.isArray(life.compare))clean.compare=life.compare.filter(x=>x && typeof x.label==='string' && (typeof x.you==='string'||typeof x.you==='number') && (typeof x.cohort==='string'||typeof x.cohort==='number')).slice(0,100).map(x=>({label:x.label.slice(0,200),you:x.you,cohort:x.cohort,source:typeof x.source==='string' && /^https?:/.test(x.source)?x.source:''}));
      if(life.family && typeof life.family==='object' && life.family.parents && (life.family.parents.father===null || typeof life.family.parents.father==='string') && (life.family.parents.mother===null || typeof life.family.parents.mother==='string')) {
        const family=life.family;
        const person=item=>item && typeof item.name==='string' && Number.isFinite(item.since)?{name:item.name.slice(0,100),since:item.since,married:!!item.married,...(['m','f'].includes(item.sex)?{sex:item.sex}:{}),...(Number.isFinite(item.birthYear)?{birthYear:item.birthYear}:{}),...(Number.isFinite(item.until)?{until:item.until}:{})}:null;
        clean.family={parents:{father:family.parents.father===null?null:family.parents.father.slice(0,100),mother:family.parents.mother===null?null:family.parents.mother.slice(0,100)},grandparents:Array.isArray(family.grandparents)?family.grandparents.filter(item=>item && typeof item.relation==='string' && typeof item.name==='string' && Number.isFinite(item.birthYear) && Number.isFinite(item.deathYear)).slice(0,4).map(item=>({relation:item.relation.slice(0,20),name:item.name.slice(0,100),birthYear:item.birthYear,deathYear:item.deathYear})):[],partner:person(family.partner),formerPartners:Array.isArray(family.formerPartners)?family.formerPartners.map(person).filter(Boolean).slice(0,100):[],children:Array.isArray(family.children)?family.children.filter(item=>item && typeof item.name==='string' && Number.isFinite(item.birthYear)).slice(0,100).map(item=>({name:item.name.slice(0,100),birthYear:item.birthYear,...(['m','f'].includes(item.sex)?{sex:item.sex}:{}),...(item.adopted?{adopted:true}:{})})):[],grandchildren:Array.isArray(family.grandchildren)?family.grandchildren.filter(item=>item && typeof item.name==='string' && Number.isFinite(item.birthYear)).slice(0,100).map(item=>({name:item.name.slice(0,100),birthYear:item.birthYear,...(['m','f'].includes(item.sex)?{sex:item.sex}:{})})):[]};
      }
      if(Array.isArray(life.friends))clean.friends=life.friends.filter(item=>item && typeof item.id==='string' && typeof item.name==='string' && Number.isFinite(item.metYear) && Number.isFinite(item.closeness)).slice(0,20).map(item=>({id:item.id.slice(0,30),name:item.name.slice(0,100),origin:typeof item.origin==='string'?item.origin.slice(0,100):'',metYear:item.metYear,closeness:Math.max(0,Math.min(100,item.closeness)),conflict:!!item.conflict,owed:Number.isFinite(item.owed)&&item.owed>=0?item.owed:0,history:Array.isArray(item.history)?item.history.filter(entry=>entry && Number.isFinite(entry.year) && typeof entry.action==='string' && typeof entry.label==='string').slice(-100).map(entry=>({year:entry.year,action:entry.action.slice(0,30),label:entry.label.slice(0,100)})):[]}));
      if(Array.isArray(life.bookmarks))clean.bookmarks=life.bookmarks.filter(x=>x && Number.isFinite(x.t) && Number.isFinite(x.year) && typeof x.id==='string' && typeof x.title==='string').slice(0,500).map(x=>({t:x.t,year:x.year,id:x.id.slice(0,200),title:x.title.slice(0,500)}));
      if(Array.isArray(life.financeLog))clean.financeLog=life.financeLog.filter(x=>x && Number.isFinite(x.age) && Number.isFinite(x.delta) && typeof x.label==='string').slice(0,500).map(x=>({year:Number.isFinite(x.year)?x.year:0,age:x.age,label:x.label.slice(0,200),delta:x.delta,familyExpense:Number.isFinite(x.familyExpense) && x.familyExpense>=0?x.familyExpense:0,category:typeof x.category==='string'?x.category.slice(0,40):''}));
      if(Array.isArray(life.economyYears))clean.economyYears=life.economyYears.filter(item=>item && Number.isFinite(item.year)).slice(0,150).map(item=>({year:item.year,...Object.fromEntries(['income','expense','familyExpense','familySupport','otherCash','hobbyExpense'].map(key=>[key,Number.isFinite(item[key])?item[key]:0]))}));
      if(life.financeFinal && Number.isFinite(life.financeFinal.cash)) {
        const asset=item=>item && Number.isFinite(item.value) && item.value>=0?{units:Number.isInteger(item.units) && item.units>=0?item.units:0,value:item.value}:{units:0,value:0};
        clean.financeFinal={cash:life.financeFinal.cash,stocks:asset(life.financeFinal.stocks),property:asset(life.financeFinal.property),cars:asset(life.financeFinal.cars),loans:Number.isFinite(life.financeFinal.loans)?life.financeFinal.loans:0};
      }
      if(Array.isArray(life.pins))clean.pins=life.pins.filter(x=>x && Number.isFinite(x.year) && typeof x.text==='string').slice(0,500).map(x=>({year:x.year,age:Number.isFinite(x.age)?x.age:0,text:x.text.slice(0,1000)}));
      if(Array.isArray(life.notes))clean.notes=life.notes.filter(x=>x && Number.isFinite(x.age) && typeof x.text==='string').slice(0,500).map(x=>({year:Number.isFinite(x.year)?x.year:0,age:x.age,text:x.text.slice(0,1000)}));
      if(life.reflections && typeof life.reflections==='object' && !Array.isArray(life.reflections))for(const [age,value] of Object.entries(life.reflections))if(/^\d{1,3}$/.test(age) && typeof value==='string')clean.reflections[age]=value.slice(0,1000);
      lives.push(clean);
    }
    return lives;
  }
  KI.archive={parse};
})();
