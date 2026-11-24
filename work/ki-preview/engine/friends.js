globalThis.KI = globalThis.KI || {};
(function () {
  const names=['ต้น','ขวัญ','แสง','ดาว','ภูมิ','แก้ว','นิด','เดือน','ฝน','ไหม','ปอ','เพชร','น้ำ','นุ่น','บีม','พลอย'];
  const jobs=['farmer','factory','construction','driver','civil','teacher','office','trader','abroad','soldier'];
  const actions={
    talk:{label:'พูดคุย',change:4,minAge:7},
    call:{label:'โทรหา',change:3,minAge:15},
    trip:{label:'ไปเที่ยวด้วยกัน',change:6,minAge:7,cost:2},
    disagree:{label:'คุยเรื่องที่ไม่ลงรอย',change:-12,minAge:7},
    help:{label:'ขอความช่วยเหลือ',change:2,minAge:7},
    reconcile:{label:'ขอโทษและคืนดี',change:8,minAge:7},
    borrow:{label:'ยืมเงินเพื่อน',change:-2,minAge:18},
    repay:{label:'คืนเงินเพื่อน',change:5,minAge:18}
  };
  function sync(state) {
    const age=state.year-state.birthYear,seed=Array.from(state.name||'').reduce((n,c)=>n+c.codePointAt(0),state.birthYear);
    const friends=Array.isArray(state.friends)?state.friends.slice():[];
    const taken=new Set([state.name,...(KI.family?KI.family.namesOf(state.family):[]),...friends.map(f=>f.name)]);
    const pool=(KI.family && KI.family.NICKNAMES) || names;
    const nameAt=(offset)=>{const open=pool.filter(n=>!taken.has(n));const list=open.length?open:pool;const name=list[(seed+offset)%list.length];taken.add(name);return name;};
    if(age>=7 && (age<20 || (state.role==='student' && age<30)) && !friends.some(f=>f.id==='school'))friends.push({id:'school',name:nameAt(0),metYear:state.year,origin:'เพื่อนวัยเรียน',closeness:55,conflict:false,owed:0,history:[]});
    if(age>=20 && jobs.includes(state.role) && !friends.some(f=>f.id==='work'))friends.push({id:'work',name:nameAt(5),metYear:state.year,origin:'เพื่อนจากการทำงาน',closeness:45,conflict:false,owed:0,history:[]});
    return {...state,friends};
  }
  function react(state,eventId) {
    const events={
      'life-7-1':{friend:'school',change:3,label:'ได้รู้จักกันมากขึ้น'},
      'life-7-11':{friend:'school',change:-10,label:'ทะเลาะกัน',conflict:true},
      'life-13-1':{friend:'school',change:-3,label:'ห่างกันเพราะเวลาไม่ตรงกัน'},
      'life-19-3':{friend:'school',change:3,label:'เพื่อนเก่าติดต่อมา'},
      'life-19-7':{friend:'work',change:3,label:'กินข้าวกับเพื่อนร่วมงาน'}
    };
    const event=events[eventId],index=event && (state.friends||[]).findIndex(friend=>friend.id===event.friend);
    if(!event || index===undefined || index<0)return state;
    const friends=state.friends.slice(),friend={...friends[index]};
    friend.closeness=Math.max(0,Math.min(100,friend.closeness+event.change));
    if(event.conflict)friend.conflict=true;
    friend.history=[...(friend.history||[]),{year:state.year,action:event.conflict?'event-conflict':'event',label:event.label}].slice(-100);
    friends[index]=friend;return {...state,friends};
  }
  function canAct(state,data,id,actionId) {
    const friend=(state.friends||[]).find(item=>item.id===id),action=actions[actionId];
    if(!friend || !action || state.death || state.year-state.birthYear<action.minAge || friend.lastTurn===state.t)return false;
    if(actionId==='reconcile' && !friend.conflict)return false;
    if(actionId==='borrow' && (friend.owed>0 || friend.conflict || friend.closeness<35))return false;
    if(actionId==='repay' && (!(friend.owed>0) || state.money<friend.owed))return false;
    if(action.cost && state.year-state.birthYear>=15 && state.money<action.cost*KI.tables.wageDay(data,state.year))return false;
    return true;
  }
  function act(state,data,id,actionId) {
    if(!canAct(state,data,id,actionId))return state;
    const next=JSON.parse(JSON.stringify(state)),friend=next.friends.find(item=>item.id===id),action=actions[actionId],age=state.year-state.birthYear;
    const amount=actionId==='borrow'?3*KI.tables.wageDay(data,state.year):actionId==='repay'?-friend.owed:action.cost && age>=15?-action.cost*KI.tables.wageDay(data,state.year):0;
    const familyExpense=action.cost && age<15?action.cost*KI.tables.wageDay(data,state.year):0;
    next.money+=amount;
    if(actionId==='borrow')friend.owed=amount;
    if(actionId==='repay')friend.owed=0;
    if(actionId==='disagree')friend.conflict=true;
    if(actionId==='reconcile')friend.conflict=false;
    friend.closeness=Math.max(0,Math.min(100,friend.closeness+action.change));
    friend.lastTurn=state.t;
    friend.history=[...(friend.history||[]),{year:state.year,action:actionId,label:action.label}].slice(-100);
    if(amount || familyExpense)next.financeLog=[...(next.financeLog||[]),{year:state.year,age,label:action.label+' · '+friend.name,delta:amount,familyExpense,category:'friend'}];
    if(actionId==='trip' || actionId==='help')next.stats.happy=Math.min(100,next.stats.happy+2);
    return next;
  }
  KI.friends={sync,react,canAct,act,actions};
})();
