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
  function personalInventory(state,data) {
    const list=(state.personalAssets||[]).slice();
    if(state.flags && state.flags['life2-ownHouse'] && !state.legacyHomeDisposed)list.push({id:'legacy-home',kind:'home',label:'บ้านจากเหตุการณ์ก่อนหน้า (ราคาประเมิน)',year:state.year,price:6000*KI.tables.wageDay(data,state.year),legacy:true});
    return list;
  }
  function personalValue(state,data) {
    const totals={homes:0,cars:0};
    for(const asset of personalInventory(state,data))totals[asset.kind==='home'?'homes':'cars']+=Math.round(personalSalePrice(state,data,asset)*(asset.partnerName?0.5:1));
    return totals;
  }
  function personalSalePrice(state,data,asset) {
    if(!asset || !Number.isFinite(asset.price) || !Number.isFinite(asset.year))return 0;
    const years=Math.max(0,state.year-asset.year);
    if(asset.kind==='car')return Math.round(asset.price*Math.max(0.3,Math.pow(0.9,years)));
    return Math.round(asset.price*0.95*KI.tables.wageDay(data,state.year)/KI.tables.wageDay(data,asset.year));
  }
  function personalQuote(state,data,id,method,sellId,shared) {
    const item=((data.assets||{}).personal||[]).find(x=>x.id===id),old=sellId && personalInventory(state,data).find(x=>x.id===sellId);
    if(!item || state.death || state.role==='prisoner' || state.year-state.birthYear<18 || item.from && state.year<item.from || !['cash','finance'].includes(method))return {ok:false,reason:'ยังซื้อรายการนี้ไม่ได้'};
    if(sellId && (!old || old.kind!==item.kind))return {ok:false,reason:'ไม่พบทรัพย์สินที่ต้องการขาย'};
    const partner=state.family && state.family.partner;
    if(shared && (!partner || state.year-partner.birthYear<18 || state.stats.bond<35))return {ok:false,reason:'ซื้อร่วมกันได้เมื่อคู่รักบรรลุนิติภาวะและความสัมพันธ์ตั้งแต่ 35/100'};
    const price=Math.round(item.days*KI.tables.wageDay(data,state.year)), sale=old?personalSalePrice(state,data,old):0;
    const oldBalance=old?(state.loans||[]).filter(l=>l.assetId===old.id).reduce((n,l)=>n+l.balance,0)+(old.legacy?legacyDebt(state,data).filter(l=>l.id==='life2-mortgage').reduce((n,l)=>n+l.balance,0):0):0;
    const oldOwner=old && old.partnerName?(partner && partner.name===old.partnerName && partner.since===old.partnerSince?partner:(state.family?.formerPartners||[]).find(person=>person.name===old.partnerName && person.since===old.partnerSince)):null;
    if(old && old.partnerName && !oldOwner)return {ok:false,reason:'ไม่พบเจ้าของร่วมสำหรับแบ่งเงินขาย'};
    if(old && old.partnerName && sale<oldBalance)return {ok:false,reason:'ราคาขายไม่พอปิดหนี้ทรัพย์สินร่วม'};
    const partnerPayout=oldOwner?Math.floor((sale-oldBalance)/2):0;
    const down=method==='cash'?price:Math.ceil(price*0.2), principal=price-down;
    const rate=0.02,seasons=item.kind==='home'?45:15;
    const payment=principal?Math.ceil(principal*rate/(1-Math.pow(1+rate,-seasons))):0;
    const partnerDown=shared?Math.floor(down/2):0,required=down+oldBalance-sale-partnerDown+partnerPayout;
    if(shared && partner.money+(oldOwner===partner?partnerPayout:0)<partnerDown)return {ok:false,reason:'เงินสดของคู่รักไม่พอจ่ายส่วนของตน',price,sale,oldBalance,down,payment,partnerDown,partnerPayout};
    if(state.money<required)return {ok:false,reason:'เงินสดไม่พอจ่ายหลังหักราคาขายและหนี้เดิม',price,sale,oldBalance,down,payment,partnerDown,partnerPayout};
    return {ok:true,item,price,sale,oldBalance,down,principal,rate,seasons,payment,partnerDown,partnerPayout};
  }
  function buyPersonal(state,data,id,method,sellId,shared) {
    const quote=personalQuote(state,data,id,method,sellId,shared);
    if(!quote.ok)return {ok:false,state,reason:quote.reason};
    const next=JSON.parse(JSON.stringify(state)),previous=sellId && personalInventory(state,data).find(a=>a.id===sellId);
    next.personalAssets=(next.personalAssets||[]).filter(a=>a.id!==sellId);
    next.loans=sellId?(next.loans||[]).filter(l=>l.assetId!==sellId):(next.loans||[]);
    if(previous && previous.legacy){next.legacyHomeDisposed=true;next.conds=(next.conds||[]).filter(c=>c.id!=='life2-mortgage');next.flags['life2-ownHouse']=false;}
    next.money+=quote.sale-quote.oldBalance-quote.down+quote.partnerDown-quote.partnerPayout;
    if(quote.partnerPayout){const current=next.family.partner, owner=current && current.name===previous.partnerName && current.since===previous.partnerSince?current:(next.family.formerPartners||[]).find(person=>person.name===previous.partnerName && person.since===previous.partnerSince);owner.money=(owner.money||0)+quote.partnerPayout;}
    if(quote.partnerDown)next.family.partner.money-=quote.partnerDown;
    let serial=(state.personalAssetSerial||0)+1;
    while(next.personalAssets.some(a=>a.id==='asset-'+serial))serial++;
    const asset={id:'asset-'+serial,key:id,kind:quote.item.kind,label:quote.item.label,year:state.year,price:quote.price,...(shared?{partnerName:next.family.partner.name,partnerSince:next.family.partner.since}: {})};
    next.personalAssetSerial=serial;next.personalAssets.push(asset);
    next.financeLog=[...(state.financeLog||[])];
    if(previous)next.financeLog.push({year:state.year,age:state.year-state.birthYear,label:'ขาย'+previous.label,delta:quote.sale,familyExpense:0,category:'personal'});
    if(quote.oldBalance)next.financeLog.push({year:state.year,age:state.year-state.birthYear,label:'ปิดเงินผ่อน'+previous.label,delta:-quote.oldBalance,familyExpense:0,category:'loan'});
    if(quote.partnerPayout)next.financeLog.push({year:state.year,age:state.year-state.birthYear,label:'แบ่งเงินขายให้ '+previous.partnerName,delta:-quote.partnerPayout,familyExpense:0,category:'personal'});
    if(quote.principal){next.loans.push({kind:'asset-'+asset.id,assetId:asset.id,label:'ผ่อน'+asset.label,principal:quote.principal,balance:quote.principal,rate:quote.rate,payment:quote.payment,left:quote.seasons,since:state.year});next.financeLog.push({year:state.year,age:state.year-state.birthYear,label:'กู้ซื้อ'+asset.label,delta:quote.principal,familyExpense:0,category:'loan'});}
    if(quote.partnerDown)next.financeLog.push({year:state.year,age:state.year-state.birthYear,label:'คู่รักช่วยซื้อ'+asset.label,delta:quote.partnerDown,familyExpense:0,category:'personal'});
    next.financeLog.push({year:state.year,age:state.year-state.birthYear,label:'ซื้อ'+asset.label,delta:-quote.price,familyExpense:0,category:'personal'});
    next.financeAt=state.t;
    return {ok:true,state:next,asset,quote};
  }
  const PARENT_HOME={poor:150,mid:1200,rich:6000};
  const STATUS=[['poor',400],['mid',4000],['rich',20000],['wealthy',Infinity]];
  const STATUS_LABEL={poor:'ยากจน',mid:'พอมีพอกิน',rich:'มีฐานะ',wealthy:'ร่ำรวย'};
  function legacyDebt(state,data) {
    const ids=['indebted','money-loanBaac','money-loanFund','money-loanCoop','money-loanShark','money-installment','life2-mortgage'];
    return (state.conds||[]).filter(c=>ids.includes(c.id) && c.left>0 && data.conditions[c.id]).map(c=>({id:c.id,label:data.conditions[c.id].name,balance:KI.game.moneyCost(data.conditions[c.id].perTurn,state,data)*c.left})).filter(c=>c.balance>0);
  }
  function payLegacyDebt(state,data,id) {
    const debt=legacyDebt(state,data).find(c=>c.id===id);
    if(!debt || state.money<debt.balance)return state;
    const next=JSON.parse(JSON.stringify(state));next.money-=debt.balance;next.conds=next.conds.filter(c=>c.id!==id);
    if(id==='money-loanShark')next.flags['money-loanShark']=false;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label:'ปิด'+debt.label,delta:-debt.balance,familyExpense:0,category:'loan'}];
    return next;
  }
  function loanBalance(state,data) { return (state.loans||[]).reduce((sum,loan)=>sum+(loan.balance||0),0)+(state.partnerLoan?.amount||0)+(data?legacyDebt(state,data).reduce((sum,debt)=>sum+debt.balance,0):0); }
  function partnerTransfer(state,kind,amount) {
    const partner=state.family?.partner, loan=state.partnerLoan, n=Math.floor(amount);
    if(state.death || !Number.isSafeInteger(n) || n<=0)return {ok:false,state,reason:'กรุณาระบุจำนวนเงินให้ถูกต้อง'};
    if(kind==='borrow' && (!partner || state.stats.bond<35 || partner.money<n || loan && loan.amount>0 && loan.name!==partner.name))return {ok:false,state,reason:'ยังยืมจำนวนนี้ไม่ได้ ตรวจความสัมพันธ์ เงินของคู่รัก และหนี้เดิม'};
    if(kind==='give' && (!partner || state.money<n))return {ok:false,state,reason:'เงินสดไม่พอให้คู่รัก'};
    if(kind==='repay' && (!loan || n>loan.amount || state.money<n))return {ok:false,state,reason:'เงินสดไม่พอหรือจำนวนเกินยอดหนี้'};
    if(!['borrow','give','repay'].includes(kind))return {ok:false,state,reason:'ไม่พบรายการ'};
    const next=JSON.parse(JSON.stringify(state)), other=next.family.partner;
    let label;
    if(kind==='borrow'){other.money-=n;next.money+=n;next.partnerLoan={name:other.name,amount:(loan?.amount||0)+n};label='ยืมเงินจาก '+other.name;}
    else if(kind==='give'){other.money+=n;next.money-=n;label='ให้เงิน '+other.name;}
    else {next.money-=n;next.partnerLoan.amount-=n;const recipient=other && other.name===loan.name?other:(next.family.formerPartners||[]).find(p=>p.name===loan.name);if(recipient)recipient.money=(recipient.money||0)+n;label='คืนเงิน '+loan.name;if(!next.partnerLoan.amount)next.partnerLoan=null;}
    next.financeAt=state.t;next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label,delta:kind==='borrow'?n:-n,familyExpense:0,category:kind==='give'?'partner':'loan'}];
    return {ok:true,state:next};
  }
  function needsFamilyHelp(state,data) {
    const months=runway(state,data), debt=loanBalance(state,data);
    return !state.death && state.year-state.birthYear>=15 && (state.money<0 || debt>state.money || months!==null && months<=1);
  }
  function familyHelpOptions(state) {
    const family=state.family||{}, options=[];
    for(const [key,label] of [['father','พ่อ'],['mother','แม่']]) {
      const person=family.parentInfo && family.parentInfo[key], name=family.parents && family.parents[key];
      if(name && person && (!Number.isFinite(person.deathYear) || state.year<person.deathYear))options.push({id:key,label:label+' · '+name});
    }
    const add=(person,id,label)=>{if(person && person.name && Number.isFinite(person.birthYear) && state.year-person.birthYear>=20 && (!Number.isFinite(person.deathYear) || state.year<person.deathYear))options.push({id,label:label+' · '+person.name});};
    (family.siblings||[]).forEach((person,i)=>add(person,'sibling:'+i,'พี่น้อง'));
    (family.children||[]).forEach((person,i)=>add(person,'child:'+i,'ลูก'));
    return options;
  }
  function askFamilyHelp(state,data,id) {
    const person=familyHelpOptions(state).find(option=>option.id===id);
    if(!person || !needsFamilyHelp(state,data) || state.familyHelpYear===state.year)return {ok:false,state,reason:'ยังขอความช่วยเหลือไม่ได้'};
    const next=JSON.parse(JSON.stringify(state)), rng=KI.rng.make(state.rng);
    const chance=Math.max(0.25,Math.min(0.9,(state.stats.bond||0)/100));
    const helped=rng.chance(chance), wage=KI.tables.wageDay(data,state.year);
    const days=id==='father' || id==='mother' || id.startsWith('sibling:')?({poor:8,mid:16,rich:30}[state.wealth]||16):16;
    const amount=helped?Math.round(wage*days):0;
    next.familyHelpYear=state.year;next.rng=rng.state();next.money+=amount;
    next.financeAt=state.t;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label:helped?'ได้รับความช่วยเหลือจาก'+person.label:person.label+' ยังช่วยเงินไม่ได้',delta:amount,familyExpense:0,category:'family-help'}];
    return {ok:true,state:next,helped,amount,person:person.label};
  }
  function householdWorth(state,data) {
    const wage=KI.tables.wageDay(data,state.year), assets=portfolioValue(state,data);
    const flags=state.flags||{};
    const parents=flags.parentsAlive!==false && !flags.movedOut?(PARENT_HOME[state.wealth]||PARENT_HOME.mid)*wage:0;
    const personal=personalValue(state,data);
    return Math.max(0,state.money+assets.stocks+assets.property+personal.homes+personal.cars+parents-loanBalance(state,data));
  }
  function status(state,data) {
    const ratio=householdWorth(state,data)/KI.tables.wageDay(data,state.year);
    return STATUS.find(([,limit])=>ratio<limit)[0];
  }
  function maxUnits(state,data,key,side) {
    if(side==='sell')return held(state,key).units;
    const unit=price(state,data,key);
    return unit>0?Math.max(0,Math.floor(state.money/unit)):0;
  }
  function canTrade(state,data,key,side,qty) {
    const n=Number.isInteger(qty) && qty>0?qty:1;
    const age=state.year-state.birthYear, category=key.startsWith('stock:')?'stock':'property';
    if(state.death || age<MIN_ASSET_AGE || used(state,category) || !assets(state,data).some(a=>a.key===key) && side==='buy')return false;
    return side==='sell'?held(state,key).units>=n:state.money>=price(state,data,key)*n;
  }
  function trade(state,data,key,side,qty) {
    const n=Number.isInteger(qty) && qty>0?qty:1;
    if(!canTrade(state,data,key,side,n))return state;
    const next=JSON.parse(JSON.stringify(state)), unit=price(state,data,key), h=held(state,key), category=key.startsWith('stock:')?'stock':'property';
    const label=(assets(state,data).find(a=>a.key===key)||{label:key}).label;
    let units=h.units, basis=h.basis||0, delta;
    if(side==='buy'){units+=n;basis+=unit*n;delta=-unit*n;}else{delta=saleValue(state,data,key)*n;basis=Math.max(0,Math.round(basis*(units-n)/units));units-=n;}
    next.money+=delta;
    next.portfolio={...(state.portfolio||{}),[key]:{units,basis}};
    const categories=state.financeUsed && state.financeUsed.turn===state.t?state.financeUsed.categories:{};
    next.financeUsed={turn:state.t,categories:{...categories,[category]:true}};
    next.financeAt=state.t;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label:(side==='buy'?'ซื้อ ':'ขาย ')+label+(n>1?` ${n} หน่วย`:''),delta,familyExpense:0,category}];
    return next;
  }
  function annual(state,year) {
    const result={income:0,expense:0,familyExpense:0,familySupport:0,otherCash:0,hobbyExpense:0,allowance:0,pension:0,remit:0,interest:0,borrowed:0,loanPaid:0};
    for(const item of state.log || []) {
      if(item.year!==year || !item.economy)continue;
      for(const key of ['income','expense','familyExpense','familySupport','allowance','pension','remit'])if(Number.isFinite(item.economy[key]))result[key]+=item.economy[key];
      for(const key of ['hobbyExpense','familyHobbyExpense'])if(Number.isFinite(item.economy[key]))result.hobbyExpense+=item.economy[key];
    }
    for(const item of state.financeLog || []) {
      if(item.year!==year)continue;
      if(item.category==='interest'){result.interest+=Math.max(0,-(item.delta||0));continue;}
      if(item.category==='loan'){if(item.delta>0)result.borrowed+=item.delta;else result.loanPaid+=-item.delta;continue;}
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
  function runway(state,data) {
    const age=state.year-state.birthYear, role=data.stats && data.stats.roles && data.stats.roles[state.role];
    if(age<15 || !role || state.money<0)return null;
    const monthly=KI.game.monthlyCost(state,data);
    return monthly>0?Math.floor(state.money/monthly):null;
  }
  const STABLE=['civil','teacher','office','factory','nurse','doctor','engineer','developer','police','lawyer','pharmacist','accountant','banker','soldier','security','designer','mechanic','chef','driver','business'];
  const LENDERS={
    bank:{label:'สินเชื่อธนาคาร',rate:0.025,seasons:15,note:'ดอกเบี้ยราว 7–8% ต่อปี ผ่อน 5 ปี ต้องผ่านการพิจารณา'},
    fund:{label:'กองทุนหมู่บ้าน',rate:0.02,seasons:3,fromYear:2001,maxBaht:20000,note:'ดอกเบี้ยต่ำ วงเงินไม่เกิน 20,000 บาท ต้องคืนภายในปีเดียว'},
    shark:{label:'เงินกู้นอกระบบ',rate:0.15,seasons:6,note:'ได้เงินทันทีไม่ต้องมีหลักฐาน ดอกเบี้ยราว 5% ต่อเดือน ผิดนัดแล้วเจ้าหนี้ตามทวง'}
  };
  function loanLimit(state,data,kind) {
    const wage=KI.tables.wageDay(data,state.year), role=data.stats.roles[state.role], lender=LENDERS[kind];
    const income=role?(role.incomeDays[0]+role.incomeDays[1]+role.incomeDays[2])/3:0;
    if(kind==='shark')return Math.round(60*wage);
    if(kind==='fund')return Math.min(lender.maxBaht,Math.round(80*wage));
    return Math.round(Math.max(income,20)*wage*8);
  }
  function loanReview(state,data,kind,amount) {
    const lender=LENDERS[kind], age=state.year-state.birthYear;
    if(!lender || state.death)return {ok:false,reason:'ยื่นกู้ไม่ได้'};
    if(age<20)return {ok:false,reason:'ต้องอายุ 20 ปีขึ้นไปจึงจะยื่นกู้ได้'};
    if(lender.fromYear && state.year<lender.fromYear)return {ok:false,reason:'ยุคนี้ยังไม่มี'+lender.label};
    if(kind==='fund' && state.loc.kind!=='isan')return {ok:false,reason:'กองทุนหมู่บ้านให้กู้เฉพาะคนที่อยู่ในหมู่บ้าน'};
    if(!(amount>0))return {ok:false,reason:'ใส่จำนวนเงินที่ต้องการกู้'};
    if(amount>loanLimit(state,data,kind))return {ok:false,reason:'เกินวงเงินที่ขอได้ ('+loanLimit(state,data,kind).toLocaleString('th-TH')+' บาท)'};
    if((state.loans||[]).some(l=>l.kind===kind))return {ok:false,reason:'ยังมี'+lender.label+'ค้างอยู่ ต้องปิดก้อนเดิมก่อน'};
    if(kind==='shark')return {ok:true};
    if(state.loanTried && state.loanTried[kind]===state.year)return {ok:false,reason:'ปีนี้ยื่นกู้ไปแล้ว รอปีหน้าค่อยยื่นใหม่'};
    if(kind==='bank'){
      if(age>60)return {ok:false,reason:'อายุเกินเกณฑ์ที่ธนาคารปล่อยกู้',tried:true};
      if(!STABLE.includes(state.role))return {ok:false,reason:'ธนาคารไม่อนุมัติ เพราะไม่มีรายได้ประจำที่ตรวจสอบได้',tried:true};
      if(state.flags.debtHeavy || state.flags.sharkLate)return {ok:false,reason:'ธนาคารไม่อนุมัติ เพราะมีหนี้ค้างชำระมาก',tried:true};
    }
    const steady=['civil','teacher','nurse','doctor','police','soldier'].includes(state.role)?0.2:0;
    const chance=Math.min(0.95,(kind==='fund'?0.7:0.55)+steady+(state.money>0?0.1:-0.15)+(state.flags.loanDefault?-0.3:0));
    let h=2166136261;for(const ch of kind+':'+state.t+':'+state.name)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;
    return KI.rng.make(h).next()<chance?{ok:true,tried:true}:{ok:false,reason:kind==='bank'?'ธนาคารไม่อนุมัติ ประวัติรายได้และหลักประกันยังไม่พอ':'คณะกรรมการกองทุนไม่อนุมัติรอบนี้',tried:true};
  }
  function borrow(state,data,kind,amount) {
    const review=loanReview(state,data,kind,amount), lender=LENDERS[kind];
    const next=JSON.parse(JSON.stringify(state));
    if(review.tried)next.loanTried={...(state.loanTried||{}),[kind]:state.year};
    if(!review.ok)return {state:next,review};
    const payment=Math.ceil(amount*(lender.rate/(1-Math.pow(1+lender.rate,-lender.seasons))));
    next.money+=amount;
    next.loans=[...(state.loans||[]),{kind,label:lender.label,principal:amount,balance:amount,rate:lender.rate,payment,left:lender.seasons,since:state.year}];
    next.financeAt=state.t;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label:'กู้'+lender.label,delta:amount,familyExpense:0,category:'loan'}];
    return {state:next,review};
  }
  function payOff(state,kind) {
    const loan=(state.loans||[]).find(l=>l.kind===kind);
    if(!loan || state.money<loan.balance)return state;
    const next=JSON.parse(JSON.stringify(state));
    next.money-=loan.balance;
    next.loans=next.loans.filter(l=>l.kind!==kind);
    if(kind==='shark')next.flags.sharkLate=false;
    next.financeLog=[...(state.financeLog||[]),{year:state.year,age:state.year-state.birthYear,label:'ปิด'+loan.label,delta:-loan.balance,familyExpense:0,category:'loan'}];
    return next;
  }
  KI.finance={householdWorth,loanBalance,legacyDebt,payLegacyDebt,partnerTransfer,needsFamilyHelp,familyHelpOptions,askFamilyHelp,personalInventory,personalValue,personalSalePrice,personalQuote,buyPersonal,runway,LENDERS,loanLimit,loanReview,borrow,payOff,maxUnits,status,STATUS_LABEL,actions,price,saleValue,cost,annual,history,canAct,setHobby,act,assets,held,portfolioValue,canTrade,trade,priceAt};
})();
