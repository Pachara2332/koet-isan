globalThis.KI = globalThis.KI || {};
(function () {
  const actions = {
    health:{label:'ดูแลสุขภาพ',days:20,category:'care',minAge:15,effects:[{stat:'health',d:6}]},
    study:{label:'เรียนรู้ทักษะใหม่',days:15,category:'care',minAge:15,effects:[{stat:'know',d:6}]},
    rest:{label:'พักผ่อน',days:8,category:'care',minAge:15,effects:[{stat:'happy',d:5}]},
    gameCafe:{label:'เล่นร้านเกม 1 ชั่วโมง',category:'hobby',minAge:7,fromYear:2000,effects:[{stat:'happy',d:4}]}
  };
  const MIN_ASSET_AGE=18, cache={};
  function noise(id,year) {
    let h=2166136261;
    for(const ch of id+':'+year)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;
    const r=KI.rng.make(h);
    return (r.next()+r.next()+r.next()-1.5)*1.15;
  }
  function defOf(data,key) {
    const [kind,id]=key.split(':'), a=data.assets||{};
    const def=(kind==='stock'?a.stocks:a.property||[]).find(x=>x.id===id);
    return def?{kind,def}:null;
  }
  function priceAt(data,key,year) {
    const found=defOf(data,key);if(!found)return 0;
    const {kind,def}=found, a=data.assets, start=Math.max(1970,def.from||1970);
    const memo=key+'@'+year;if(cache[memo])return cache[memo];
    let p=def.base*KI.tables.wageDay(data,start)*(kind==='stock'?1:1);
    const shocks=(kind==='stock'?a.stockShocks:a.propertyShocks)||{};
    for(let y=start+1;y<=year;y++){
      const drift=def.boost && y>=def.boost.from?def.boost.growth:(def.drift!==undefined?def.drift:def.growth);
      p*=Math.max(0.2,1+drift+def.vol*noise(def.id,y)+(shocks[y]||0));
    }
    return cache[memo]=Math.max(1,Math.round(p));
  }
  function assets(state,data) {
    const a=data.assets||{}, home=state.home.province, provinceName=KI.tables.provinceName(data,home,state.year), out=[];
    for(const d of a.stocks||[])if(state.year>=d.from)out.push({key:'stock:'+d.id,kind:'stock',label:`${d.id} · ${d.name}`,note:`${d.sector} · 1 หน่วย = ${a.stockUnit||100} หุ้น`});
    for(const d of a.property||[]){
      if(d.from && state.year<d.from)continue;
      if(d.where==='border' && !(a.borderProvinces||[]).includes(home))continue;
      const place=d.where==='home'?' · '+provinceName:d.where==='town'?' · '+provinceName:d.where==='border'?' · '+provinceName:'';
      out.push({key:'prop:'+d.id,kind:'prop',label:d.name+place,note:`${d.grade} · ${d.info}`});
    }
    return out;
  }
  function price(state,data,key) { return priceAt(data,key,state.year); }
  function saleValue(state,data,key) { return Math.round(price(state,data,key)*(key.startsWith('prop:')?0.95:0.995)); }
  function held(state,key) { const v=state.portfolio && state.portfolio[key]; return v && Number.isInteger(v.units) && v.units>0?v:{units:0,basis:0}; }
  function portfolioValue(state,data) {
    const out={stocks:0,property:0};
    for(const [key,v] of Object.entries(state.portfolio||{})){if(!v || !Number.isInteger(v.units) || !defOf(data,key))continue;out[key.startsWith('stock:')?'stocks':'property']+=v.units*price(state,data,key);}
    return out;
  }
  const PARENT_HOME={poor:150,mid:1200,rich:6000};
  const STATUS=[['poor',400],['mid',4000],['rich',20000],['wealthy',Infinity]];
  const STATUS_LABEL={poor:'ยากจน',mid:'พอมีพอกิน',rich:'มีฐานะ',wealthy:'ร่ำรวย'};
  function householdWorth(state,data) {
    const wage=KI.tables.wageDay(data,state.year), assets=portfolioValue(state,data);
    const flags=state.flags||{};
    const parents=flags.parentsAlive!==false && !flags.movedOut?(PARENT_HOME[state.wealth]||PARENT_HOME.mid)*wage:0;
    return Math.max(0,state.money+assets.stocks+assets.property+parents);
  }
  function status(state,data) {
    const ratio=householdWorth(state,data)/KI.tables.wageDay(data,state.year);
    return STATUS.find(([,limit])=>ratio<limit)[0];
  }
  function canTrade(state,data,key,side) {
    const age=state.year-state.birthYear, category=key.startsWith('stock:')?'stock':'property';
    if(state.death || age<MIN_ASSET_AGE || used(state,category) || !assets(state,data).some(a=>a.key===key) && side==='buy')return false;
    return side==='sell'?held(state,key).units>0:state.money>=price(state,data,key);
  }
  function trade(state,data,key,side) {
    if(!canTrade(state,data,key,side))return state;
    const next=JSON.parse(JSON.stringify(state)), unit=price(state,data,key), h=held(state,key), category=key.startsWith('stock:')?'stock':'property';
    const label=(assets(state,data).find(a=>a.key===key)||{label:key}).label;
    let units=h.units, basis=h.basis||0, delta;
    if(side==='buy'){units++;basis+=unit;delta=-unit;}else{delta=saleValue(state,data,key);basis=Math.max(0,Math.round(basis*(units-1)/units));units--;}
    next.money+=delta;
    next.portfolio={...(state.portfolio||{}),[key]:{units,basis}};
    const categories=state.financeUsed && state.financeUsed.turn===state.t?state.financeUsed.categories:{};
    next.financeUsed={turn:state.t,categories:{...categories,[category]:true}};
    next.financeAt=state.t;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label:(side==='buy'?'ซื้อ ':'ขาย ')+label,delta,familyExpense:0,category}];
    return next;
  }
  function annual(state,year) {
    const result={income:0,expense:0,familyExpense:0,familySupport:0,otherCash:0,hobbyExpense:0};
    for(const item of state.log || []) {
      if(item.year!==year || !item.economy)continue;
      for(const key of ['income','expense','familyExpense','familySupport'])if(Number.isFinite(item.economy[key]))result[key]+=item.economy[key];
      for(const key of ['hobbyExpense','familyHobbyExpense'])if(Number.isFinite(item.economy[key]))result.hobbyExpense+=item.economy[key];
    }
    for(const item of state.financeLog || []) {
      if(item.year!==year)continue;
      if(Number.isFinite(item.delta))result.otherCash+=item.delta;
      if(Number.isFinite(item.familyExpense))result.familyExpense+=item.familyExpense;
      if(item.category==='hobby')result.hobbyExpense+=Math.max(0,-(item.delta||0))+(item.familyExpense||0);
    }
    return result;
  }
  function history(state) {
    const years=new Set([...(state.log || []),...(state.financeLog || [])].map(item=>item.year).filter(Number.isFinite));
    return [...years].sort((a,b)=>a-b).map(year=>({year,...annual(state,year)}));
  }
  function cost(state,data,id) {
    const action=actions[id];
    if(!action)return 0;
    if(id==='gameCafe')return KI.tables.gameCafePrice(state);
    return action.days*KI.tables.wageDay(data,state.year);
  }
  function used(state,category) {
    if(state.financeUsed && state.financeUsed.turn===state.t)return !!(state.financeUsed.categories && state.financeUsed.categories[category]);
    return state.financeAt===state.t && !state.financeUsed;
  }
  function canAct(state,data,id) {
    const action=actions[id], age=state.year-state.birthYear;
    if(!action || state.death || age<action.minAge || (action.fromYear && state.year<action.fromYear) || used(state,action.category))return false;
    if(id==='gameCafe' && age<15)return true;
    return state.money>=cost(state,data,id);
  }
  function setHobby(state,id,enabled,hours) {
    if(id!=='gameCafe' || state.year-state.birthYear<7 || state.year<2000 || state.death)return state;
    const previous=state.hobbies && [4,16,40,80].includes(state.hobbies.gameCafeHours)?state.hobbies.gameCafeHours:4;
    return {...state,hobbies:{...(state.hobbies || {}),gameCafe:!!enabled,gameCafeHours:[4,16,40,80].includes(hours)?hours:previous}};
  }
  function act(state,data,id) {
    if(!canAct(state,data,id))return state;
    const action=actions[id], age=state.year-state.birthYear, amount=cost(state,data,id);
    const familyExpense=id==='gameCafe' && age<15?amount:0;
    let next=KI.effects.apply(state,[...(familyExpense?[]:[{money:-amount}]),...(action.effects||[])],data,KI.rng.make(state.rng)).state;
    const categories=state.financeUsed && state.financeUsed.turn===state.t?state.financeUsed.categories:{};
    next.financeUsed={turn:state.t,categories:{...categories,[action.category]:true}};
    next.financeAt=state.t;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age,label:action.label,delta:next.money-state.money,familyExpense,category:action.category}];
    return next;
  }
  KI.finance={householdWorth,status,STATUS_LABEL,actions,price,saleValue,cost,annual,history,canAct,setHobby,act,assets,held,portfolioValue,canTrade,trade,priceAt};
})();
