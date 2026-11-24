globalThis.KI = globalThis.KI || {};
(function () {
  const root = document.getElementById('app');
  const data = KI.data;
  let state = null;
  let autoMode = false;
  let sceneView = null;
  let storage;
  try { storage = window.localStorage; } catch (e) { storage = null; }
  let settings = KI.save.settings(storage);
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) settings.motion = false;
  KI.music.setVolume(typeof settings.musicVolume==='number' ? settings.musicVolume : 0.5);
  let warned = false;
  const clock = KI.clock.create({setTimeout:window.setTimeout.bind(window),clearTimeout:window.clearTimeout.bind(window),advance});
  const element = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function button(text, action, cls) {
    const b = element('button', cls || 'btn', text);
    b.type = 'button';
    b.addEventListener('click', action);
    return b;
  }
  function gameDialog({title, message, confirmLabel='ตกลง', cancelLabel, onConfirm}) {
    const previous=document.activeElement;
    const dialog=element('dialog','game-dialog');
    dialog.setAttribute('aria-labelledby','game-dialog-title');
    dialog.setAttribute('aria-describedby','game-dialog-message');
    const ornament=element('div','game-dialog-ornament','✦');ornament.setAttribute('aria-hidden','true');
    const content=element('div','game-dialog-content');
    const titleNode=element('h2','',title);titleNode.id='game-dialog-title';
    const messageNode=element('p','game-dialog-message',message);messageNode.id='game-dialog-message';
    const actions=element('div','game-dialog-actions');
    function dismiss() {if(typeof dialog.close==='function')dialog.close();dialog.remove();if(previous && previous.isConnected && typeof previous.focus==='function')previous.focus();}
    dialog.addEventListener('cancel',event=>{event.preventDefault();dismiss();});
    if(cancelLabel)actions.append(button(cancelLabel,dismiss,'btn game-dialog-cancel'));
    actions.append(button(confirmLabel,()=>{dismiss();if(onConfirm)onConfirm();},'btn btn-primary game-dialog-confirm'));
    content.append(element('p','game-dialog-kicker','เกิดอีสาน · เรื่องราวชีวิต'),titleNode,messageNode,actions);
    dialog.append(ornament,content);(document.body || root).append(dialog);
    if(typeof dialog.showModal==='function')dialog.showModal();else {dialog.setAttribute('open','');dialog.setAttribute('aria-modal','true');}
  }
  function notice(message) {gameDialog({title:'แจ้งให้ทราบ',message});}
  function supportBox() {
    return button('♥  เป็นกำลังใจให้ผู้สร้าง',()=>{
      const previous=document.activeElement, dialog=element('dialog','game-dialog support-dialog');
      dialog.setAttribute('aria-labelledby','support-dialog-title');
      const content=element('div','game-dialog-content'),title=element('h2','','เป็นกำลังใจให้ผู้สร้าง');title.id='support-dialog-title';
      const qr=document.createElement('img');qr.src='assets/support-qr.jpg';qr.alt='คิวอาร์พร้อมเพย์สำหรับสนับสนุนผู้สร้างเกิดอีสาน';qr.className='support-qr';
      const save=element('a','btn support-save','บันทึกภาพคิวอาร์');save.href=qr.src;save.download='koet-isan-support.jpg';
      function dismiss(){if(typeof dialog.close==='function')dialog.close();dialog.remove();if(previous && previous.isConnected)previous.focus();}
      dialog.addEventListener('cancel',event=>{event.preventDefault();dismiss();});
      dialog.addEventListener('click',event=>{if(event.target===dialog)dismiss();});
      const actions=element('div','support-actions');actions.append(save,button('โอนแล้ว',()=>{dismiss();notice('ขอบคุณมากครับ กำลังใจของคุณช่วยให้เกิดอีสานได้เดินทางต่อ');},'btn btn-primary support-thanks'),button('ปิด',dismiss,'btn'));
      content.append(title,element('p','support-copy','ถ้าเรื่องราวนี้ทำให้คุณยิ้มหรือนึกถึงบ้าน สามารถสนับสนุนการพัฒนาเกมได้ตามกำลัง ขอบคุณจากใจครับ'),qr,element('p','support-hint','สแกนด้วยแอปธนาคาร หรือบันทึกภาพแล้วเปิดจากแอปธนาคารบนเครื่องนี้'),actions);
      dialog.append(content);(document.body || root).append(dialog);
      if(typeof dialog.showModal==='function')dialog.showModal();else {dialog.setAttribute('open','');dialog.setAttribute('aria-modal','true');}
    },'btn support-box');
  }
  function musicButton() {
    const control=button(KI.music.playing()?'ปิดเสียงเพลง':'เปิดเสียงเพลง',async()=>{
      if(KI.music.playing()) KI.music.stop();
      else if(!await KI.music.start()) {notice('เปิดเพลงจาก YouTube ไม่ได้ ตรวจอินเทอร์เน็ต หรือเปิดเกมผ่าน localhost แทนการเปิดไฟล์ตรงๆ');return;}
      control.textContent=KI.music.playing()?'ปิดเสียงเพลง':'เปิดเสียงเพลง';
    },'btn');
    document.addEventListener('ki-music-stop',()=>{control.textContent='เปิดเสียงเพลง';});
    const wrapper=element('div','music-controls');
    const volume=document.createElement('input');volume.type='range';volume.min='0';volume.max='100';volume.value=String(Math.round(KI.music.volume()*100));
    volume.addEventListener('input',()=>{KI.music.setVolume(Number(volume.value)/100);settings=KI.save.setSettings(storage,{musicVolume:KI.music.volume()});});
    wrapper.append(control,field('ระดับเสียง',volume));
    return wrapper;
  }
  function field(label, control) {
    const wrap = element('label', 'form-field');
    wrap.append(element('span', '', label), control);
    return wrap;
  }
  function select(options) {
    const el = document.createElement('select');
    options.forEach(([value, label]) => { const opt = element('option', '', label); opt.value = value; el.append(opt); });
    return el;
  }
  function parentLine(label, key) {
    const name=state.family.parents[key], info=state.family.parentInfo && state.family.parentInfo[key];
    if(!name)return `${label} · ไม่ได้อยู่ด้วย`;
    if(!info)return `${label} · ${name}`;
    return state.year>=info.deathYear?`${label} · ${name} · จากไปแล้ว`:`${label} · ${name} · อายุ ${state.year-info.birthYear} ปี · ${info.job}`;
  }
  function sexLabel(person) {return person.sex==='m'?'ชาย':person.sex==='f'?'หญิง':'ไม่ระบุ';}
  function childRelation(person) {return 'ลูก'+(person.sex==='m'?'ชาย':person.sex==='f'?'สาว':'')+(person.adopted?'บุญธรรม':'');}
  function grandchildRelation(person) {return 'หลาน'+(person.sex==='m'?'ชาย':person.sex==='f'?'สาว':'');}
  function familyFigures() {
    const f=state.family||{}, y=state.year, out=[];
    const add=(label,name,birthYear,sex,extra)=>{if(Number.isFinite(birthYear) && birthYear<=y)out.push({label,name,birthYear,year:y,sex,role:y-birthYear<18&&y-birthYear>=6?'student':'',conds:[],...(extra||{})});};
    const pi=f.parentInfo||{};
    if(f.parents && f.parents.father && pi.father && y<pi.father.deathYear)add('พ่อ',f.parents.father,pi.father.birthYear,'m',{role:/ครู|ข้าราชการ/.test(pi.father.job)?'teacher':/นา|ไร่|อ้อย/.test(pi.father.job)?'farmer':''});
    if(f.parents && f.parents.mother && pi.mother && y<pi.mother.deathYear)add('แม่',f.parents.mother,pi.mother.birthYear,'f',{role:/นา|ไร่|อ้อย/.test(pi.mother.job)?'farmer':''});
    (f.grandparents||[]).filter(p=>y<p.deathYear).forEach(p=>add(p.relation,p.name,p.birthYear,p.relation==='ย่า'||p.relation==='ยาย'?'f':'m'));
    if(f.partner && KI.family.together(state,f.partner))add(f.partner.married?'คู่สมรส':'คนรัก',f.partner.name,f.partner.birthYear||state.birthYear,f.partner.sex);
    (f.siblings||[]).filter(p=>!(p.deathYear<=y)).forEach(p=>add(p.birthYear<state.birthYear?'พี่':'น้อง',p.name,p.birthYear,p.sex));
    (f.children||[]).forEach(p=>add(childRelation(p).replace('บุญธรรม',''),p.name,p.birthYear,p.sex));
    (f.grandchildren||[]).forEach(p=>add(grandchildRelation(p),p.name,p.birthYear,p.sex));
    return out.slice(0,10);
  }
  function persist() {
    if (!KI.save.write(storage, state) && !warned) {
      warned = true;
      notice('เครื่องนี้บันทึกไม่ได้ ปิดหน้าแล้วชีวิตนี้จะหาย');
    }
  }
  function start() {
    clock.stop();
    sceneView = null;
    root.replaceChildren();
    const page = element('main', 'start-page');
    const scene = element('div', 'start-scene');
    KI.scene.mount(scene);
    KI.scene.set({season: 2, place: 'rural', year: 1997});
    KI.scene.motion(settings.motion);
    const hero = element('section', 'start-hero');
    const brand=element('div','start-brand');const logo=document.createElement('img');logo.src='assets/logo.svg';logo.alt='';logo.className='brand-logo';brand.append(logo,element('h1','','เกิดอีสาน'));
    hero.append(element('div', 'eyebrow', 'เรื่องราวชีวิต · จากผืนดินอีสาน'),brand, element('p', '', 'ทุกชีวิตมีฤดูกาลของตัวเอง เลือกทางเดินของคุณผ่านเรื่องราว ความทรงจำ และเหตุการณ์แห่งยุคสมัย'));
    const form = element('form', 'start-form panel');
    form.append(element('h2', '', 'เริ่มต้นชีวิตใหม่'), element('p', 'muted', 'ทุกอย่างสุ่มทั้งหมด ทั้งปีเกิด จังหวัด ฐานะที่บ้าน ครอบครัว และนิสัย ส่วนเส้นทางหลังจากนั้นคุณเลือกเอง'));
    const name = document.createElement('input'); name.type = 'text'; name.maxLength = 40; name.placeholder = 'เว้นว่างเพื่อสุ่มชื่อ';
    const sex = select([['','สุ่ม'],['m','ชาย'],['f','หญิง']]);
    const birth = document.createElement('input'); birth.type = 'number'; birth.min = '1970'; birth.max = '2008'; birth.placeholder = 'สุ่ม 1970–2008';
    const quick = element('div','quick-years');
    [1970,1997,2004].forEach(year=>quick.append(button(`พ.ศ. ${year+543}`,()=>{birth.value=String(year);fillProvinces();},'btn btn-quiet')));
    const province = document.createElement('select');
    function fillProvinces() {
      const year=birth.value?Number(birth.value):9999, keep=province.value;
      const options=[['','สุ่ม'],...Object.entries(data.places.provinces).filter(([,p])=>!(typeof p.founded==='number' && year<p.founded)).map(([id,p])=>[id,p.th]).sort((a,b)=>a[1].localeCompare(b[1],'th'))];
      province.replaceChildren(...options.map(([value,label])=>{const opt=element('option','',label);opt.value=value;return opt;}));
      province.value=options.some(([value])=>value===keep)?keep:'';
    }
    birth.addEventListener('input',fillProvinces); fillProvinces();
    const setting = select([['','สุ่ม'],['rural','ชนบท'],['urban','ในเมือง']]);
    const wealth = select([['','สุ่ม (ตามสถิติความยากจนของปีเกิด)'],['poor','ยากจน'],['mid','พอมีพอกิน'],['rich','มีฐานะ']]);
    const randomTraits = document.createElement('input'); randomTraits.type = 'checkbox'; randomTraits.checked = true;
    const sliders = {};
    const traitBox = element('div','trait-sliders');
    [['attach','ปล่อยวาง','ยึดติด'],['grit','ท้อง่าย','ใจสู้'],['social','เก็บตัว','ชอบเข้าสังคม']].forEach(([key,low,high])=>{
      const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value='50';range.disabled=true;range.setAttribute('aria-label',`${low} ถึง ${high}`);sliders[key]=range;
      const row=element('div','trait-row');row.append(element('span','',low),range,element('span','',high));traitBox.append(row);
    });
    randomTraits.addEventListener('change',()=>Object.values(sliders).forEach(range=>{range.disabled=randomTraits.checked;}));
    function traitValues() {return randomTraits.checked?undefined:{attach:Number(sliders.attach.value),grit:Number(sliders.grit.value),social:Number(sliders.social.value)};}
    const submit = element('button','btn btn-primary','เกิด'); submit.type = 'submit'; form.append(submit);
    const custom = element('details','custom-start'); custom.append(element('summary','','กำหนดเองบางอย่าง (ไม่บังคับ)'));
    const fields = element('div', 'form-grid');
    fields.append(field('ชื่อ',name),field('เพศ',sex),field('เกิดตั้งแต่ปี (ค.ศ.) สุ่มปีนี้หรือหลังจากนี้',birth),quick,field('จังหวัดเกิด',province),field('ถิ่น',setting),field('ฐานะที่บ้าน',wealth),field('สุ่มนิสัย',randomTraits),traitBox); custom.append(fields); form.append(custom);
    form.addEventListener('submit', e => {e.preventDefault(); createLife({name:name.value.trim()||undefined,sex:sex.value||undefined,birthYear:birth.value?Math.min(2008,Number(birth.value))+Math.floor(Math.random()*(2008-Math.min(2008,Number(birth.value))+1)):undefined,province:province.value||undefined,setting:setting.value||undefined,wealth:wealth.value||undefined,traits:traitValues()});});
    const saved = KI.save.read(storage);
    if (saved) form.append(button('เล่นต่อจากที่บันทึก', () => {state = {...saved}; delete state.peers; play();}));
    form.append(musicButton(),button('ชีวิตที่ผ่านมา', lives, 'btn btn-quiet'),button('แหล่งข้อมูล', sources, 'btn btn-quiet'),button('ตั้งค่า', settingsPage, 'btn btn-quiet'),supportBox());
    page.append(scene,hero,form); root.append(page);
  }
  function recentNames() {
    try { const list=JSON.parse(storage.getItem('ki-names') || '[]'); return Array.isArray(list)?list.slice(-10):[]; } catch (e) { return []; }
  }
  function rememberName(name) {
    try { storage.setItem('ki-names',JSON.stringify([...recentNames().filter(n=>n!==name),name].slice(-10))); } catch (e) {}
  }
  function createLife(cfg) {
    const born=KI.game.newGame({...cfg,avoidNames:recentNames()},data);
    if(!cfg.name)rememberName(born.name);
    if(cfg.heir){born.family=JSON.parse(JSON.stringify(cfg.heir.family));born.heir={parent:cfg.heir.parent,estate:cfg.heir.estate,from:cfg.heir.from};born.generation=cfg.heir.generation;}
    state=KI.family.sync(born);
    state.startCfg=cfg;
    birthScreen();
  }
  function heirCfg(child) {
    const f=state.family, kids=f.children, sexOf=p=>p.sex;
    const mate=f.partner || f.formerPartners[f.formerPartners.length-1] || null;
    const worth=KI.finance.portfolioValue(state,data);
    const will=state.flags.legacyWill;
    const weights=kids.map((k,i)=>will==='youngest' && i===kids.length-1?2:1);
    const total=Math.max(0,state.money+worth.stocks+worth.property)*(will==='temple'?0.5:1);
    const estate=Math.round(total*weights[kids.indexOf(child)]/weights.reduce((a,b)=>a+b,0));
    const at=state.log.find(e=>e.year>=child.birthYear) || state.log[state.log.length-1];
    const ratio=(at?at.money:0)/KI.tables.wageDay(data,child.birthYear);
    const me={birthYear:state.birthYear,deathYear:state.death?state.death.year:state.year,job:(at && KI.turn.ROLE_LABELS[at.role]) || 'ทำงานหาเลี้ยงครอบครัว'};
    const other=mate?{birthYear:mate.birthYear || state.birthYear,deathYear:null,job:'ทำงานหาเลี้ยงครอบครัว'}:null;
    const dad=state.sex==='m';
    const pi=f.parentInfo || {};
    const grandparents=[[dad?'ปู่':'ตา',f.parents && f.parents.father,pi.father],[dad?'ย่า':'ยาย',f.parents && f.parents.mother,pi.mother]]
      .filter(([,name,info])=>name && info && info.deathYear>=child.birthYear).map(([relation,name,info])=>({relation,name,birthYear:info.birthYear,deathYear:info.deathYear}));
    return {name:child.name,sex:sexOf(child),birthYear:child.birthYear,province:state.home.province,setting:state.home.setting,wealth:ratio<400?'poor':ratio<4000?'mid':'rich',
      heir:{parent:dad?'father':'mother',from:state.name,estate,generation:(state.generation || 1)+1,family:{
        parents:{father:dad?state.name:mate && mate.name || null,mother:dad?mate && mate.name || null:state.name},
        parentInfo:{father:dad?me:other,mother:dad?other:me},
        grandparents,
        siblings:kids.filter(k=>k!==child).map(k=>({name:k.name,birthYear:k.birthYear,sex:sexOf(k)}))}}};
  }
  function birthScreen() {
    clock.stop();
    root.replaceChildren();
    const main=element('main','simple-page birth-page panel');
    main.append(element('div','eyebrow','เรื่องราวชีวิตจำลอง'),element('h1','','จุดเริ่มต้นของชีวิต'),element('p','muted','ส่วนที่ตั้งเป็น "สุ่ม" ถูกสุ่มให้แล้ว เริ่มชีวิตนี้ หรือสุ่มส่วนนั้นใหม่ก็ได้'));
    const province=KI.tables.provinceName(data,state.home.province,state.birthYear);
    const wrap=element('div','birth-reveal');
    const card=KI.share.birth(state,province); card.className=settings.motion?'birth-card':'birth-card without-motion'; card.setAttribute('aria-label',`การ์ดเกิดของ ${state.name}`); wrap.append(card);
    if(settings.motion && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      const animation=element('div','birth-randomizing'); animation.setAttribute('aria-hidden','true');
      animation.append(element('span','random-ring'),element('strong','','กำลังสุ่มชีวิต...'));wrap.append(animation);
    }
    const actions=element('div','birth-primary-actions');
    actions.append(button('เริ่มต้นชีวิตนี้',()=>{
      const beginLife=()=>{persist();play();};
      if(KI.save.read(storage))gameDialog({title:'เริ่มชีวิตใหม่ไหม?',message:'ชีวิตที่กำลังเล่นอยู่จะถูกแทนที่ด้วยชีวิตใหม่นี้',cancelLabel:'เก็บชีวิตเดิม',confirmLabel:'เริ่มชีวิตใหม่',onConfirm:beginLife});
      else beginLife();
    },'btn btn-primary'),button('สุ่มใหม่',()=>createLife(state.startCfg||{}),'btn'));
    main.append(actions);
    const visual=element('div','birth-visual');
    const figure=element('div',settings.motion?'birth-character':'birth-character without-motion'); figure.append(KI.avatar.create(state));visual.append(wrap,figure);main.append(visual);
    const wealth={poor:'ขัดสน',mid:'ปานกลาง',rich:'มั่งคั่ง'};
    main.append(element('p','birth-facts',`เพศ${state.sex==='f'?'หญิง':'ชาย'} · ${state.home.setting==='rural'?'ชนบท':'ในเมือง'} · ครอบครัวฐานะ${wealth[state.wealth]}${state.disability==='birth'?' · มีความพิการทางร่างกายแต่กำเนิด':''}`));
    main.append(element('p','muted birth-facts',[parentLine('พ่อ','father'),parentLine('แม่','mother')].join(' · ')+(state.family.siblings.length?` · พี่น้อง ${state.family.siblings.length} คน`:' · ลูกคนเดียว')+' (บุคคลจำลอง)'));
    if(state.heir)main.append(element('p','birth-facts',`ลูกของ ${state.heir.from} จากชีวิตที่แล้ว · รุ่นที่ ${state.generation}`));
    main.append(button('ดาวน์โหลดการ์ดเกิด',()=>{
      card.toBlob(blob=>{if(!blob){notice('ไม่สามารถสร้างภาพได้');return;} const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='koet-isan-birth.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png');
    },'btn btn-quiet'),button('กลับไปตั้งค่า',start,'btn btn-quiet'));root.append(main);
  }
  function keepView() {
    if(!root.querySelector('.shell'))return null;
    const scrolls={};
    root.querySelectorAll('.shell [class*="slot-"], .shell .finance-panel').forEach(node=>{const key=Array.from(node.classList).find(c=>c.startsWith('slot-')||c==='finance-panel');if(key && node.scrollTop)scrolls[key]=node.scrollTop;});
    const open=Array.from(root.querySelectorAll('.shell details[open] > summary')).map(node=>node.textContent);
    return {x:window.scrollX,y:window.scrollY,scrolls,open,t:state && state.t};
  }
  function restoreView(kept) {
    if(!kept)return;
    root.querySelectorAll('.shell details > summary').forEach(node=>{if(kept.open.includes(node.textContent))node.parentElement.open=true;});
    const sameTurn=state && kept.t===state.t;
    Object.entries(kept.scrolls).forEach(([key,top])=>{if(key==='slot-cards' && !sameTurn)return;const node=root.querySelector('.shell .'+key);if(node)node.scrollTop=top;});
    window.scrollTo(kept.x,kept.y);
  }
  function play() {
    const kept=keepView();
    renderPlay();
    restoreView(kept);
  }
  function renderPlay() {
    if (state.death) { finish(); return; }
    state = KI.game.restorePersonality(KI.friends.sync(KI.family.sync(state)),data);
    const before=state.lastStatus, now=KI.finance.status(state,data), rank=['poor','mid','rich','wealthy'];
    const moved=!state.turn && !!before && before!==now;
    state = {...state,flags:{...state.flags,status:now},lastStatus:state.turn?state.lastStatus:now};
    state = KI.game.begin(state, data, settings);
    if(moved && state.turn && !state.turn.pin)state.turn.pin=(rank.indexOf(now)>rank.indexOf(before)?'ฐานะขยับขึ้นเป็น':'ฐานะตกลงเป็น')+KI.finance.STATUS_LABEL[now];
    root.replaceChildren();
    const shell = element('main','shell');
    const fresh = !sceneView;
    if (fresh) sceneView = element('div','slot-window');
    const view = sceneView;
    view.querySelectorAll('.character-avatar,.family-row').forEach(node=>node.remove());
    const head = element('header','slot-head panel');
    const stats = element('aside','slot-stats panel');
    const trail = element('aside','slot-trail panel');
    const cards = element('section','slot-cards'); cards.setAttribute('aria-live','polite');
    const actions = element('div','slot-actions');
    shell.append(head,cards,stats,trail,actions); root.append(shell);
    if (fresh) KI.scene.mount(view);
    const p = KI.scene.placeFor(state,data);
    KI.scene.set({season:state.season,place:p,country:KI.scene.countryFor(state),year:state.year,mood:state.conds.some(c => ['heartbroken','grieving'].includes(c.id)) ? 'sad' : 'normal'});
    KI.scene.motion(settings.motion);
    const avatar=element('div','character-avatar'); avatar.append(KI.avatar.create(state),element('span','character-name',state.name)); view.append(avatar);
    const kin=state.role==='prisoner'?[]:familyFigures();
    if(kin.length){const row=element('div','family-row');kin.forEach(person=>{const box=element('div','family-figure');box.append(KI.avatar.create(person),element('span','',person.label));row.append(box);});view.append(row);}
    const pendingIndex=state.turn.cards.findIndex(card=>card.choices && card.picked===null);
    const h = state.turn.head;
    const playback=element('div','playback');
    const waiting=pendingIndex>=0 && !autoMode;
    const status=element('p','clock-status');
    const showStatus=()=>{status.textContent=waiting?'เวลาหยุดรอคุณเลือก':clock.isPaused()?'เวลาหยุดอยู่':'เวลากำลังเดิน';};
    const pause=button(clock.isPaused()?'เล่นต่อ':'หยุดเวลา',()=>{if(clock.isPaused())clock.resume();else clock.pause();pause.textContent=clock.isPaused()?'เล่นต่อ':'หยุดเวลา';showStatus();drawProgress();},'btn');
    const speed=select([[0.5,'ช้า'],[1,'ปกติ'],[2,'เร็ว'],[4,'เร็วมาก']]); speed.value=String(clock.speed());
    speed.addEventListener('change',()=>{clock.setSpeed(Number(speed.value));drawProgress();});
    const note=button('จดบันทึก',()=>{
      clock.pause();pause.textContent='เล่นต่อ';showStatus();drawProgress();
      if (head.querySelector('.note-editor')) return;
      const editor=element('div','note-editor'); const input=document.createElement('textarea'); input.rows=3; input.maxLength=1000; input.setAttribute('aria-label','ความคิดของคุณ');
      editor.append(input,button('บันทึก',()=>{state.notes=[...(state.notes||[]),{year:state.year,age:state.year-state.birthYear,text:input.value.trim()}];persist();play();},'btn')); head.append(editor); input.focus();
    },'btn');
    const more=element('details','playback-more');more.append(element('summary','','ตัวเลือกเพิ่มเติม'),button(autoMode?'ให้ระบบเลือกแทน: เปิด':'ให้ระบบเลือกแทน: ปิด',()=>{autoMode=!autoMode;play();},'btn'),note,musicButton());
    playback.append(pause,field('ความเร็ว',speed),more);
    const progress=element('div','year-progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','เวลาของฤดูนี้');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');
    const fill=element('div','year-progress-fill');progress.append(fill);
    function drawProgress(){const m=clock.animation();progress.setAttribute('aria-valuenow',String(Math.round(m.from*100)));fill.style.animation='none';void fill.offsetWidth;fill.style.cssText=`width:${m.from*100}%;--year-end:100%;${m.duration>0?'animation:year-progress-grow '+m.duration+'ms linear forwards;':''}`;}
    const currentPlace=KI.turn.placeLabel(data,state.loc,state.year,true)+(state.loc.kind==='abroad'?' (กลับไทยที่ '+KI.tables.provinceName(data,state.home.province,state.year)+')':'');
    head.append(element('div','eyebrow','ชีวิตของ ' + state.name),element('h2','',`พ.ศ. ${h.yearBE} · อายุ ${h.age} ปี`),element('p','muted',`เพศ${state.sex==='f'?'หญิง':state.sex==='m'?'ชาย':'ไม่ระบุ'} · ${h.season === null ? 'ช่วงวัยเด็ก' : ['หน้าแล้ง', 'หน้านา', 'หน้าเกี่ยว'][h.season]} · ${currentPlace} · ${KI.turn.roleLabel(state)}`));
    if(state.loc.kind==='abroad')head.append(element('p','muted',state.flags['career-phinoi'] || state.flags['wr-illegalKorea']?'ทำงานโดยไม่มีใบอนุญาต · ต้องหลบการตรวจ':`การเดินทาง: ${state.loc.method || 'ดูรายละเอียดจากเหตุการณ์ที่เลือก'}`));
    if (h.future) head.append(element('span','future','อนาคต (สมมติ)'));
    const debt=KI.game.debtInfo(state,data);
    if(debt)head.append(element('p',`debt-banner debt-${debt.level}`,`${debt.label} · ติดลบ ${Math.abs(state.money).toLocaleString('th-TH')} บาท · ดอกเบี้ยฤดูนี้ราว ${debt.interest.toLocaleString('th-TH')} บาท (${Math.round(debt.rate*100)}%)${debt.level==='crushing'?' · เจ้าหนี้อาจมาทวงถึงบ้าน':debt.level==='heavy'?' · ความเครียดเริ่มกระทบสุขภาพและครอบครัว':''}`));
    head.append(progress,playback,status);
    stats.append(element('h3','','ชีวิตในตอนนี้'),view);
    const meters=element('div','stat-grid');
    for (const [key,label] of [['health','สุขภาพ'],['happy','ความสุข'],['know','ความรู้'],['bond','ความสัมพันธ์']]) {
      const box = element('div','stat-box'); const line = element('div','stat-line'); line.append(element('span','',label),element('strong','',String(state.stats[key]))); const meter = document.createElement('progress'); meter.max=100; meter.value=state.stats[key]; meter.setAttribute('aria-label',label); box.append(line,meter); meters.append(box);
    }
    stats.append(meters);
    stats.append(element('p','cash-meta',`แนวโน้มนิสัย: ${KI.game.personality(state).label}`));
    if(state.disability)stats.append(element('p','cash-meta',state.disability==='birth'?'ความพิการทางร่างกายแต่กำเนิด':'ความพิการทางร่างกายจากอุบัติเหตุ'));
    if(state.stats.health<30)stats.append(element('p','alert-danger','สุขภาพวิกฤต ร่างกายทรุดหนัก ควรพักหรือไปหาหมอก่อนจะสายเกินไป'));
    const legacyDebts=KI.finance.legacyDebt(state,data);
    state.conds.filter(c=>!legacyDebts.some(debt=>debt.id===c.id)).forEach(c=>stats.append(element('p','condition',`${data.conditions[c.id]?.name || c.id} · อีก ${c.left} ช่วง`)));
    const cash=element('div','cash-card');
    let personalShop=null;
    cash.append(element('p',state.money<0?'money money-negative':'money',state.money<0?`เงินคงเหลือติดลบ ${Math.abs(state.money).toLocaleString('th-TH')} บาท`:`เงินสด ${state.money.toLocaleString('th-TH')} บาท`));
    const partner=state.family.partner;
    if(partner || state.partnerLoan){
      const partnerBox=element('div','partner-finance');
      if(partner){
        const place=KI.turn.placeLabel(data,partner.location,state.year,true);
        partnerBox.append(element('strong','',`${partner.married?'คู่สมรส':'คนรัก'} · ${partner.name}`),element('p','cash-meta',`งาน: ${partner.job} · ทำงานที่ ${place}`),element('p','cash-meta',`เงินสดของคู่รัก ${partner.money.toLocaleString('th-TH')} บาท`));
        const partnerAssets=(state.personalAssets||[]).filter(asset=>asset.partnerName===partner.name && asset.partnerSince===partner.since);
        if(partnerAssets.length)partnerAssets.forEach(asset=>{const value=Math.round(KI.finance.personalSalePrice(state,data,asset)/2),owed=(state.loans||[]).filter(loan=>loan.assetId===asset.id).reduce((sum,loan)=>sum+loan.balance,0);partnerBox.append(element('p','cash-meta',`${asset.label} · ส่วนของคู่รักประมาณ ${value.toLocaleString('th-TH')} บาท${owed?' · หนี้ร่วมคงเหลือ '+owed.toLocaleString('th-TH')+' บาท':''}`));});
        else partnerBox.append(element('p','cash-meta','ยังไม่มีบ้านหรือรถที่ซื้อร่วมกัน'));
        if(Number.isFinite(partner.lastIncome))partnerBox.append(element('p','cash-meta',`ช่วงล่าสุด รายรับ ${partner.lastIncome.toLocaleString('th-TH')} · ค่าใช้จ่ายส่วนตัว ${partner.lastExpense.toLocaleString('th-TH')} บาท`));
        const split=document.createElement('input');split.type='checkbox';split.checked=!!partner.splitExpenses;split.disabled=!KI.family.together(state,partner);
        split.addEventListener('change',()=>{state={...state,family:{...state.family,partner:{...state.family.partner,splitExpenses:split.checked}}};persist();play();});
        const splitLabel=element('label','partner-split');splitLabel.append(split,document.createTextNode(' ให้คู่รักช่วยจ่ายค่าใช้จ่ายประจำของเราไม่เกินครึ่งหนึ่ง'));
        partnerBox.append(splitLabel,element('p','muted cash-meta',split.disabled?'ต้องทำงานในพื้นที่เดียวกันก่อนจึงจะแบ่งค่าใช้จ่ายได้':'หักจากเงินของคู่รักหลังจ่ายค่าใช้จ่ายส่วนตัว ตามยอดที่มี'));
      }
      if(state.partnerLoan)partnerBox.append(element('p','cash-meta',`หนี้ที่ยืมจาก ${state.partnerLoan.name} ${state.partnerLoan.amount.toLocaleString('th-TH')} บาท · ไม่มีดอกเบี้ย`));
      const transfers=element('details','asset-list');transfers.append(element('summary','','จัดการเงินระหว่างกัน'));
      const amount=document.createElement('input');amount.type='number';amount.min='1';amount.step='1';amount.inputMode='numeric';amount.className='trade-qty';
      transfers.append(field('จำนวนเงิน (บาท)',amount));
      const transfer=(kind)=>{const result=KI.finance.partnerTransfer(state,kind,Number(amount.value));if(!result.ok){notice(result.reason);return;}state=result.state;persist();play();notice('บันทึกรายการเรียบร้อย');};
      if(partner)transfers.append(button('ยืมเงินคู่รัก',()=>transfer('borrow'),'btn finance-action'),button('ให้เงินคู่รัก',()=>transfer('give'),'btn finance-action'));
      if(state.partnerLoan)transfers.append(button('คืนเงินที่ยืม',()=>transfer('repay'),'btn finance-action'));
      if(partner)transfers.append(element('p','muted cash-meta','ยืมได้ตามเงินที่คู่รักมี เมื่อความสัมพันธ์ตั้งแต่ 35/100'));
      partnerBox.append(transfers);cash.append(partnerBox);
    }
    legacyDebts.forEach(debt=>{const payoff=button(`ปิด${debt.label} · ประมาณ ${debt.balance.toLocaleString('th-TH')} บาท`,()=>{state=KI.finance.payLegacyDebt(state,data,debt.id);persist();play();},'btn finance-action');payoff.disabled=state.money<debt.balance;cash.append(payoff);});
    if(state.year-state.birthYear>=18 && state.money>=KI.tables.wageDay(data,state.year)*360)cash.append(button('ดูบ้านและรถที่ซื้อได้',()=>{if(personalShop){finance.open=true;personalShop.open=true;personalShop.scrollIntoView({block:'nearest'});}},'btn finance-action'));
    const runway=KI.finance.runway(state,data);
    if(runway!==null)cash.append(element('p','muted money-runway',runway<1?'เงินที่มีไม่พอใช้ถึงเดือนหน้า':`เงินที่มีพอใช้ราว ${runway.toLocaleString('th-TH')} เดือน`));
    const cashYear=state.log.some(entry=>entry.year===state.year)||(state.financeLog||[]).some(item=>item.year===state.year)?state.year:(state.log.length?state.log[state.log.length-1].year:state.year);
    const cashEntries=[];
    const addCash=(label,delta)=>{if(Number.isFinite(delta) && delta!==0)cashEntries.push({label,delta});};
    for(const entry of state.log.filter(item=>item.year===cashYear)) {
      for(const card of entry.cards||[])for(const delta of card.deltas||[])if(delta.k==='money')addCash(card.title,delta.d);
      if(Array.isArray(entry.cashFlow))for(const flow of entry.cashFlow)addCash(flow.label,flow.delta);
      else if(entry.economy){addCash('รายรับ',entry.economy.income);addCash('ครอบครัวช่วยค่าใช้จ่าย',entry.economy.familySupport);addCash('ค่าครองชีพและค่าใช้จ่ายประจำ',-entry.economy.expense);}
    }
    for(const item of (state.financeLog||[]).filter(item=>item.year===cashYear))addCash(item.label,item.delta);
    if(cashYear===state.year)for(const card of state.turn.cards)for(const delta of card.result?.deltas||[])if(delta.k==='money')addCash(card.title,delta.d);
    if(cashEntries.length) {
      const ledger=element('details','asset-list cash-ledger');ledger.open=state.money<0;
      ledger.append(element('summary','',`เงินเข้าออก พ.ศ. ${cashYear+543}`));
      cashEntries.forEach(item=>ledger.append(element('p','cash-meta',`${item.label} · ${item.delta>0?'+':''}${item.delta.toLocaleString('th-TH')} บาท`)));
      if(state.log.some(entry=>entry.year===cashYear && !Array.isArray(entry.cashFlow)))ledger.append(element('p','muted cash-meta','ข้อมูลเก่าแสดงได้เท่าที่เคยบันทึกไว้'));
      cash.append(ledger);
    }
    if(KI.finance.needsFamilyHelp(state,data)) {
      const relatives=KI.finance.familyHelpOptions(state);
      if(state.familyHelpYear===state.year)cash.append(element('p','muted cash-meta','ปีนี้ขอความช่วยเหลือจากครอบครัวแล้ว'));
      else if(relatives.length) {
        const help=element('details','asset-list family-help');help.append(element('summary','','ขอความช่วยเหลือจากครอบครัว'));
        const relative=select(relatives.map(person=>[person.id,person.label]));
        help.append(field('ขอความช่วยเหลือจาก',relative),element('p','muted finance-note','ขอได้ปีละครั้ง ผลขึ้นอยู่กับความสัมพันธ์และกำลังของครอบครัว'));
        help.append(button('ขอความช่วยเหลือ',()=>{const result=KI.finance.askFamilyHelp(state,data,relative.value);if(!result.ok){notice(result.reason);return;}state=result.state;persist();play();notice(result.helped?`${result.person} ช่วยเงิน ${result.amount.toLocaleString('th-TH')} บาท`:`${result.person} ยังช่วยเงินไม่ได้ในครั้งนี้`);},'btn finance-action'));
        cash.append(help);
      }
    }
    cash.append(element('p','muted cash-meta',`ค่าครองชีพปีนี้ ${KI.game.livingMonthly(state,data).toLocaleString('th-TH')} บาท/เดือน/คน (${{rural:'ชนบทอีสาน',town:'ในเมืองอีสาน',bangkok:'กรุงเทพฯ',abroad:'ต่างประเทศ'}[KI.tables.livingPlace(state.loc)]})`));
    cash.append(element('p','cash-meta',`ฐานะตอนนี้ ${KI.finance.STATUS_LABEL[state.flags.status]||'-'} · ตอนเกิด ${KI.finance.STATUS_LABEL[state.birthWealth||state.wealth]||'-'}`));
    const bizLevel=Math.min(6,(state.counters && state.counters.biz)||0);
    if(bizLevel)cash.append(element('p','cash-meta',`กิจการ: ${['','แผงลอย','ร้านเล็ก','ร้านขาประจำ','กิจการหลายสาขา','บริษัทในจังหวัด','เจ้าสัวท้องถิ่น'][bizLevel]} (ระดับ ${bizLevel})`));
    const lastFinance=(state.financeLog||[]).slice(-1)[0]; if(lastFinance && state.financeAt===state.t)cash.append(element('p','muted cash-meta',`${lastFinance.label} · ${lastFinance.familyExpense?'ครอบครัวจ่าย '+lastFinance.familyExpense.toLocaleString('th-TH')+' บาท':'เงินเปลี่ยน '+lastFinance.delta.toLocaleString('th-TH')+' บาท'}`));
    stats.append(cash);
    if(state.year-state.birthYear>=6) {
      const options=data.focus.filter(f=>KI.cond.test(f.when,state));
      const focus=select([['','ยังไม่ได้เลือก'],...options.map(f=>[f.id,f.label])]); focus.value=state.focus || '';
      focus.addEventListener('change',()=>{
        if(!focus.value)return;
        const index=state.turn.cards.findIndex(card=>card.kind==='focus' && card.picked===null && card.choices.some(choice=>choice.id===focus.value));
        if(index>=0) state=KI.game.choose(state,data,index,focus.value); else state={...state,focus:focus.value};
        persist(); play();
      });
      stats.append(field('สิ่งที่เน้นช่วงนี้',focus));
    }
    const fold=(title,cls)=>{const box=element('details','fold'+(cls?' '+cls:''));box.append(element('summary','fold-summary',title));return box;};
    const finance=fold('การเงิน กู้ยืม และลงทุน','finance-panel');
    const financeYear=(state.log.some(entry=>entry.year===state.year)||(state.financeLog||[]).some(item=>item.year===state.year))?state.year:(state.log.length?state.log[state.log.length-1].year:state.year);
    const yearTotals=KI.finance.annual(state,financeYear), fmt=value=>value.toLocaleString('th-TH');
    finance.append(element('p','finance-year',`รายการที่บันทึกแล้ว พ.ศ. ${financeYear+543}`));
    finance.append(element('p','finance-line',`รายรับ ${fmt(yearTotals.income)} บาท · รายจ่ายประจำ ${fmt(yearTotals.expense)} บาท`));
    if(yearTotals.familyExpense)finance.append(element('p','finance-line',`ครอบครัวจ่ายให้ ${fmt(yearTotals.familyExpense)} บาท`));
    if(yearTotals.familySupport)finance.append(element('p','finance-line',`ครอบครัวช่วยค่าใช้จ่าย ${fmt(yearTotals.familySupport)} บาท`));
    if(yearTotals.otherCash)finance.append(element('p','finance-line',`กิจกรรมและซื้อขายสินทรัพย์ ${yearTotals.otherCash>0?'+':''}${fmt(yearTotals.otherCash)} บาท`));
    if(yearTotals.hobbyExpense)finance.append(element('p','finance-line',`ในยอดข้างต้น ค่าเล่นร้านเกม ${fmt(yearTotals.hobbyExpense)} บาท`));
    if(yearTotals.allowance)finance.append(element('p','finance-line',`ในรายรับ มีเบี้ยยังชีพผู้สูงอายุ ${fmt(yearTotals.allowance)} บาท`));
    if(yearTotals.pension)finance.append(element('p','finance-line',`ในรายรับ มีบำนาญ ${fmt(yearTotals.pension)} บาท`));
    if(yearTotals.remit)finance.append(element('p','finance-line',`ในรายรับ มีเงินที่ลูกส่งมาให้ ${fmt(yearTotals.remit)} บาท`));
    if(yearTotals.interest)finance.append(element('p','finance-line money-negative',`ดอกเบี้ยหนี้ ${fmt(yearTotals.interest)} บาท`));
    if(state.role==='retired' && !state.flags.retiredFrom)finance.append(element('p','muted finance-note','รายได้หลังเกษียณไม่ได้รับประกัน แบบจำลองยังไม่รวมบำนาญ'));
    const age=state.year-state.birthYear;
    if(age>=6 && state.role!=='monk' && state.role!=='prisoner') {
      const wage=KI.tables.wageDay(data,state.year);
      const options=[['','ไม่มีงานอดิเรกประจำ'],...(data.hobbies||[]).filter(h=>age>=h.minAge && (!h.from || state.year>=h.from) && (!h.to || state.year<=h.to)).map(h=>[h.id,h.label+(h.costDays?` · ${fmt(Math.round(h.costDays*wage))} บาท/ฤดู`:'')])];
      if(age>=7 && state.year>=2000)options.push(['gameCafe',`เล่นร้านเกม · ${KI.tables.gameCafePrice(state)} บาท/ชั่วโมง`]);
      const pick=select(options); pick.value=state.hobbies && state.hobbies.gameCafe?'gameCafe':(state.hobby||'');
      pick.addEventListener('change',()=>{const v=pick.value;state=KI.finance.setHobby({...state,hobby:v && v!=='gameCafe'?v:null},'gameCafe',v==='gameCafe');persist();play();});
      finance.append(field('งานอดิเรก',pick));
      if(pick.value==='gameCafe') {
        const hours=select([['4','4 ชั่วโมงต่อเดือน'],['16','16 ชั่วโมงต่อเดือน'],['40','40 ชั่วโมงต่อเดือน'],['80','80 ชั่วโมงต่อเดือน']]);hours.value=String(state.hobbies.gameCafeHours || 4);
        hours.addEventListener('change',()=>{state=KI.finance.setHobby(state,'gameCafe',true,Number(hours.value));persist();play();});
        finance.append(field('เวลาเล่นต่อเดือน',hours),element('p','muted finance-note','เล่นตั้งแต่ 40 ชั่วโมงต่อเดือน สุขภาพและการเรียนจะลดลง'));
      }
    }
    const spend=['health','study','rest'].filter(id=>{const action=KI.finance.actions[id];return age>=action.minAge && (!action.fromYear || state.year>=action.fromYear);});
    if(spend.length) {
      finance.append(element('h4','finance-heading','การใช้เงิน'));
      const grid=element('div','finance-grid');
      spend.forEach(id=>{
        const action=KI.finance.actions[id], amount=KI.finance.cost(state,data,id), familyPays=id==='gameCafe' && age<15;
        const actionButton=button(`${action.label} · ${familyPays?'ครอบครัวจ่าย':'จ่าย'} ${fmt(amount)} บาท`,()=>{state=KI.finance.act(state,data,id);persist();play();},'btn finance-action');
        actionButton.disabled=!KI.finance.canAct(state,data,id);grid.append(actionButton);
      });
      finance.append(grid);
    }
    if(yearTotals.borrowed)finance.append(element('p','finance-line',`กู้เงินเข้ามา ${fmt(yearTotals.borrowed)} บาท`));
    if(yearTotals.loanPaid)finance.append(element('p','finance-line',`ผ่อนเงินกู้ ${fmt(yearTotals.loanPaid)} บาท`));
    if(age>=20 && state.role!=='prisoner') {
      const loanBox=element('details','asset-list loan-box');loanBox.append(element('summary','','เงินกู้'));
      if((state.loans||[]).length)loanBox.append(element('p','finance-line',`ค้างอยู่ ${state.loans.length} ก้อน`));
      (state.loans||[]).forEach(loan=>{
        const row=element('div','asset-row'+(loan.kind==='shark'?' loan-shark':''));
        row.append(element('strong','',loan.label),element('p','finance-line',`ค้างอยู่ ${fmt(loan.balance)} บาท · ผ่อนฤดูละ ${fmt(loan.payment)} บาท · เหลืออีก ${loan.left} ฤดู`));
        if(loan.kind==='shark' && state.flags.sharkLate)row.append(element('p','money-negative','ผิดนัดชำระ เจ้าหนี้กำลังตามทวง'));
        const close=button(`ปิดหนี้ก้อนนี้ · ${fmt(loan.balance)} บาท`,()=>{state=KI.finance.payOff(state,loan.kind);persist();play();},'btn finance-action');close.disabled=state.money<loan.balance;row.append(close);loanBox.append(row);
      });
      const kinds=Object.entries(KI.finance.LENDERS).filter(([,l])=>!l.fromYear || state.year>=l.fromYear);
      const lender=select(kinds.map(([k,l])=>[k,l.label]));
      const amount=document.createElement('input');amount.type='number';amount.min='0';amount.step='100';amount.inputMode='numeric';amount.className='trade-qty';amount.setAttribute('aria-label','จำนวนเงินที่ขอกู้');
      const info=element('p','muted finance-note','');
      const showInfo=()=>{const l=KI.finance.LENDERS[lender.value];const max=KI.finance.loanLimit(state,data,lender.value);info.textContent=`${l.note} · วงเงินสูงสุด ${fmt(max)} บาท`;if(!amount.value)amount.placeholder=String(max);};
      lender.addEventListener('change',showInfo);showInfo();
      const apply=button('ยื่นกู้',()=>{
        const result=KI.finance.borrow(state,data,lender.value,Math.floor(Number(amount.value)||0));
        state=result.state;persist();play();
        notice(result.review.ok?`อนุมัติแล้ว ได้เงิน ${fmt(Math.floor(Number(amount.value)||0))} บาท เริ่มผ่อนฤดูหน้า`:result.review.reason);
      },'btn finance-action');
      loanBox.append(field('แหล่งเงินกู้',lender),field('จำนวนเงิน (บาท)',amount),info,apply);
      finance.append(loanBox);
    }
    if(age>=18) {
      const worth=KI.finance.portfolioValue(state,data);
      const personal=KI.finance.personalValue(state,data);
      personalShop=element('details','asset-list personal-shop');personalShop.append(element('summary','','บ้านและรถ'));
      const owned=KI.finance.personalInventory(state,data);
      if(owned.length)owned.forEach(asset=>{const owed=(state.loans||[]).filter(l=>l.assetId===asset.id).reduce((sum,l)=>sum+l.balance,0);personalShop.append(element('p','finance-line',`${asset.label} · มูลค่าขายประมาณ ${fmt(KI.finance.personalSalePrice(state,data,asset))} บาท${asset.partnerName?' · ถือร่วมกับ '+asset.partnerName+' คนละครึ่ง':''}${owed?' · หนี้คงเหลือ '+fmt(owed)+' บาท':''}`));});
      else personalShop.append(element('p','muted finance-note','ยังไม่มีบ้านหรือรถที่ซื้อผ่านรายการนี้'));
      const choices=((data.assets||{}).personal||[]).filter(item=>!item.from || state.year>=item.from);
      const itemSelect=select(choices.map(item=>[item.id,item.label]));
      const methodSelect=select([['cash','จ่ายเงินสด'],['finance','ดาวน์ 20% แล้วผ่อน']]);
      const ownerSelect=select([['solo','ซื้อคนเดียว'],...(state.family.partner?[['shared','ซื้อร่วมกับคู่รัก ฝ่ายละครึ่ง']]:[])]);
      const oldSelect=select([['','เก็บทรัพย์สินเดิมทั้งหมด']]);
      const quoteText=element('p','finance-line','');
      const purchase=button('ซื้อ',()=>{const result=KI.finance.buyPersonal(state,data,itemSelect.value,methodSelect.value,oldSelect.value||null,ownerSelect.value==='shared');if(!result.ok){notice(result.reason);return;}state=result.state;persist();play();notice('ซื้อ'+result.asset.label+'เรียบร้อย');},'btn finance-action');
      const updateOld=()=>{const item=choices.find(x=>x.id===itemSelect.value),previous=oldSelect.value;oldSelect.replaceChildren(...[['','เก็บทรัพย์สินเดิมทั้งหมด'],...owned.filter(x=>item && x.kind===item.kind).map(x=>[x.id,'ขาย '+x.label+' เพื่อซื้อใหม่'])].map(([value,label])=>{const option=element('option','',label);option.value=value;return option;}));oldSelect.value=[...oldSelect.options].some(option=>option.value===previous)?previous:'';};
      const updateQuote=()=>{const q=KI.finance.personalQuote(state,data,itemSelect.value,methodSelect.value,oldSelect.value||null,ownerSelect.value==='shared'),net=q.down+q.oldBalance-q.sale-(q.partnerDown||0)+(q.partnerPayout||0);quoteText.textContent=q.price?`ราคา ${fmt(q.price)} บาท${q.sale?' · ขายของเดิมได้ '+fmt(q.sale)+' บาท':''}${q.oldBalance?' · ปิดหนี้เดิม '+fmt(q.oldBalance)+' บาท':''}${q.partnerPayout?' · แบ่งเงินขายให้เจ้าของร่วม '+fmt(q.partnerPayout)+' บาท':''} · ${net<0?'คุณรับเงินส่วนต่าง '+fmt(-net):'คุณจ่ายตอนนี้ '+fmt(net)} บาท${q.partnerDown?' · คู่รักจ่าย '+fmt(q.partnerDown)+' บาท':''}${q.payment?' · ผ่อนรวมฤดูละ '+fmt(q.payment)+' บาท '+q.seasons+' ฤดู (ดอกเบี้ย 2% ต่อฤดู)':''}${q.ok?'':' · '+q.reason}`:q.reason;purchase.disabled=!q.ok;};
      itemSelect.addEventListener('change',()=>{updateOld();updateQuote();});methodSelect.addEventListener('change',updateQuote);ownerSelect.addEventListener('change',updateQuote);oldSelect.addEventListener('change',updateQuote);updateOld();updateQuote();
      personalShop.append(field('เลือกรายการ',itemSelect),field('วิธีชำระ',methodSelect),field('ผู้ซื้อ',ownerSelect),field('ทรัพย์สินเดิม',oldSelect),quoteText,element('p','muted finance-note','ซื้อร่วมกันถือคนละครึ่ง คู่รักช่วยผ่อนสูงสุดครึ่งหนึ่งตามเงินที่มี ส่วนที่ขาดผู้เล่นรับผิดชอบ เมื่อขายจะแบ่งเงินหลังปิดหนี้คนละครึ่ง'),purchase);
      finance.append(personalShop);
      if(personal.homes||personal.cars)finance.append(element('p','finance-line',`บ้าน ${fmt(personal.homes)} บาท · รถ ${fmt(personal.cars)} บาท`));
      finance.append(element('p','finance-line',`พอร์ตหุ้น ${fmt(worth.stocks)} บาท · อสังหาฯ ${fmt(worth.property)} บาท`));
      const foreignIds=new Set(((data.assets||{}).stocks||[]).filter(d=>d.foreign).map(d=>'stock:'+d.id));
      const groupOf=key=>key.startsWith('prop:')?'prop':foreignIds.has(key)?'foreign':'stock';
      [['stock','หุ้นไทย (ตลาดหลักทรัพย์ฯ)'],['foreign','หุ้นต่างประเทศ (DR ซื้อขายในไทย)'],['prop','ที่ดินและอสังหาฯ']].forEach(([kind,heading])=>{
        const list=KI.finance.assets(state,data).filter(item=>groupOf(item.key)===kind);
        const owned=Object.keys(state.portfolio||{}).filter(key=>groupOf(key)===kind && KI.finance.held(state,key).units>0 && !list.some(item=>item.key===key));
        if(!list.length && !owned.length)return;
        const box=element('details','asset-list');box.append(element('summary','',heading));
        list.forEach(item=>{
          const units=KI.finance.held(state,item.key).units, unit=KI.finance.price(state,data,item.key), last=KI.finance.priceAt(data,item.key,state.year-1);
          const change=last?Math.round((unit-last)/last*100):0;
          const row=element('div','asset-row');
          row.append(element('strong','',item.label),element('p','muted',item.note),element('p','finance-line',`ราคา ${fmt(unit)} บาท/หน่วย · จากปีก่อน ${change>0?'+':''}${change}% · ถืออยู่ ${units} หน่วย`));
          const maxBuy=KI.finance.maxUnits(state,data,item.key,'buy'), maxSell=KI.finance.maxUnits(state,data,item.key,'sell');
          const qty=document.createElement('input');qty.type='number';qty.min='1';qty.step='1';qty.value='1';qty.inputMode='numeric';qty.className='trade-qty';qty.setAttribute('aria-label','จำนวนหน่วยของ '+item.label);
          const count=()=>{const n=Math.floor(Number(qty.value));return Number.isFinite(n) && n>0?n:1;};
          const buy=button('',()=>{state=KI.finance.trade(state,data,item.key,'buy',count());persist();play();},'btn finance-action');
          const sell=button('',()=>{state=KI.finance.trade(state,data,item.key,'sell',count());persist();play();},'btn finance-action');
          const refresh=()=>{const n=count();buy.textContent=`ซื้อ ${n} หน่วย · จ่าย ${fmt(unit*n)} บาท`;sell.textContent=`ขาย ${n} หน่วย · รับ ${fmt(KI.finance.saleValue(state,data,item.key)*n)} บาท`;buy.disabled=!KI.finance.canTrade(state,data,item.key,'buy',n);sell.disabled=!KI.finance.canTrade(state,data,item.key,'sell',n);};
          qty.addEventListener('input',refresh);refresh();
          const quick=element('div','trade-quick');[['ซื้อได้สูงสุด',maxBuy],['ขายทั้งหมด',maxSell]].forEach(([label,n])=>{const b=button(`${label} (${n})`,()=>{qty.value=String(Math.max(1,n));refresh();},'btn btn-quiet trade-max');b.disabled=n<1;quick.append(b);});
          const grid=element('div','finance-grid');grid.append(buy,sell);row.append(field('จำนวนหน่วย',qty),quick,grid);box.append(row);
        });
        finance.append(box);
      });
      finance.append(element('p','muted finance-note','ชื่อหุ้นเป็นบริษัทจริง แต่ราคาเป็นราคาจำลองของเกม ไม่ใช่ราคาตลาดจริง ปีวิกฤตอิงเหตุการณ์จริงโดยประมาณ ซื้อขายได้ประเภทละครั้งต่อฤดู'));
    }
    if(age<15)finance.append(element('p','muted finance-note','รายจ่ายเด็กเป็นค่าประมาณที่ครอบครัวรับผิดชอบ ไม่หักจากเงินส่วนตัว'));
    if(age>=7)finance.append(element('p','muted finance-note','ทำรายการได้หนึ่งครั้งต่อประเภทในแต่ละฤดู เมื่อเงินเพียงพอ'));
    stats.append(finance);

    const family=element('section','family-summary people-panel');
    family.append(element('h4','','ครอบครัว'));
    const household=element('div','family-household');
    household.append(element('h5','','คนรักและลูก'));
    if(state.family.partner){const person=state.family.partner;const row=element('p','family-close');const since=Number.isFinite(person.since)?person.since:state.flags.partnerSince;row.append(element('strong','family-relation',person.married?'คู่สมรส':'คนรัก'),element('span','family-name',person.name),element('span','family-age',`เพศ${sexLabel(person)}`),...(Number.isFinite(person.birthYear)?[element('span','family-age',`อายุ ${state.year-person.birthYear} ปี`)]:[]),element('span','family-age',`งาน ${person.job}`),...(Number.isFinite(since) && since<=state.year?[element('span','family-age',`คบกันรวม ${state.year-since} ปี` )]:[]),...(person.married && Number.isFinite(state.flags.marriedSince)?[element('span','family-age',`สมรสมา ${Math.max(0,state.year-state.flags.marriedSince)} ปี`)]:[]));household.append(row);}
    state.family.children.forEach(child=>{const row=element('p','family-close');row.append(element('strong','family-relation',childRelation(child)),element('span','family-name',child.name),element('span','family-age',`อายุ ${Math.max(0,state.year-child.birthYear)} ปี`));household.append(row);});
    if(!state.family.partner && !state.family.children.length)household.append(element('p','muted family-empty','ยังไม่มีคนรักหรือลูก'));
    state.family.grandchildren.forEach(child=>{const row=element('p','family-close');row.append(element('strong','family-relation',grandchildRelation(child)),element('span','family-name',child.name),element('span','family-age',`อายุ ${Math.max(0,state.year-child.birthYear)} ปี`));household.append(row);});
    family.append(household,element('h5','family-origin-title','พ่อแม่และญาติ'));
    const parents=state.family.parents;
    if(parents.father)family.append(element('p','person-row',parentLine('พ่อ','father')));
    if(parents.mother)family.append(element('p','person-row',parentLine('แม่','mother')));
    if(!parents.father && !parents.mother)family.append(element('p','muted','ไม่มีข้อมูลพ่อแม่'));
    state.family.grandparents.forEach(person=>family.append(element('p','person-row',`${person.relation} · ${person.name}${state.year>person.deathYear?' · จากไปแล้ว':` · อายุ ${state.year-person.birthYear} ปี`}`)));
    (state.family.siblings||[]).filter(person=>person.birthYear<=state.year).forEach(person=>family.append(element('p','person-row',`${person.birthYear<state.birthYear?(person.sex==='m'?'พี่ชาย':'พี่สาว'):(person.sex==='m'?'น้องชาย':'น้องสาว')} · ${person.name}${person.deathYear<=state.year?' · จากไปแล้ว':state.year<person.birthYear?' · ยังไม่เกิด':` · อายุ ${state.year-person.birthYear} ปี`}`)));
    family.append(element('p','peer-note muted','สมาชิกครอบครัวเป็นบุคคลจำลอง'));
    trail.append(family);
    if(state.friends.length) {
      const friends=element('section','friends-panel people-panel');friends.append(element('h4','',`เพื่อน ${state.friends.length} คน`));
      state.friends.forEach(friend=>{
        const card=element('div','friend-card');card.append(element('strong','',friend.name),element('p','muted',`${friend.origin} · รู้จักกัน พ.ศ. ${friend.metYear+543}`),element('p','friend-status',`ความสนิท ${friend.closeness}/100${friend.conflict?' · กำลังมีเรื่องไม่ลงรอย':''}`));
        if(friend.owed)card.append(element('p','friend-debt',`ยืมเพื่อนไว้ ${friend.owed.toLocaleString('th-TH')} บาท · ไม่มีดอกเบี้ย`));
        const last=(friend.history||[]).slice(-1)[0];if(last)card.append(element('p','muted',`ล่าสุด: ${last.label} · พ.ศ. ${last.year+543}`));
        const details=element('details','friend-actions');details.append(element('summary','','ใช้เวลากับเพื่อน'));
        const grid=element('div','friend-action-grid');
        for(const [id,action] of Object.entries(KI.friends.actions)) {
          const actionButton=button(action.label,()=>{state=KI.friends.act(state,data,friend.id,id);persist();play();},'btn friend-action');
          actionButton.disabled=!KI.friends.canAct(state,data,friend.id,id);grid.append(actionButton);
        }
        details.append(grid,element('p','muted friend-note',`เที่ยวประมาณ ${(2*KI.tables.wageDay(data,state.year)).toLocaleString('th-TH')} บาท · ยืม ${(3*KI.tables.wageDay(data,state.year)).toLocaleString('th-TH')} บาท · เด็กให้ครอบครัวจ่ายค่าเที่ยว · ยืมได้เมื่อสนิทตั้งแต่ 35 และไม่มีหนี้หรือเรื่องทะเลาะ · ทำได้หนึ่งกิจกรรมต่อฤดู`));
        card.append(details);
        if((friend.history||[]).length){const history=element('details','friend-history');history.append(element('summary','','เรื่องราวที่ผ่านมา'));friend.history.slice().reverse().forEach(item=>history.append(element('p','muted',`พ.ศ. ${item.year+543} · ${item.label}`)));card.append(history);}
        friends.append(card);
      });trail.append(friends);
    }
    const TALENT_LABEL={music:'ดนตรี',sport:'กีฬา',art:'วาดรูป',math:'คณิตศาสตร์',computer:'คอมพิวเตอร์',gaming:'เล่นเกม',chess:'หมากรุก',language:'ภาษา',cooking:'ทำอาหาร',craft:'งานช่าง/งานฝีมือ',speech:'พูดเก่ง/ผู้นำ',mechanic:'ซ่อมเครื่องยนต์',muaythai:'มวยไทย',farming:'เกษตร'};
    const traitsBox=fold('นิสัยและความถนัด');
    traitsBox.append(element('p','fold-line',`แนวโน้มจากการเลือก: ${KI.game.personality(state).label}`),element('p','fold-line muted','พิจารณาจากการช่วยเหลือหรือทำร้ายผู้อื่นไม่เกิน 8 ครั้งล่าสุด และเปลี่ยนได้ตามสิ่งที่เลือกต่อไป'));
    const personalityHistory=state.personalityHistory||[];
    if(personalityHistory.length)traitsBox.append(element('p','fold-line',`การตัดสินใจล่าสุด: ${personalityHistory.slice(-3).reverse().map(item=>`${item.year+543} · ${item.choice}`).join(' / ')}`));
    traitsBox.append(element('p','fold-line',`ยึดติด ${state.traits.attach} · มุ่งมั่น ${state.traits.grit} · เข้าสังคม ${state.traits.social}`));
    if(state.year-state.birthYear>=6 && state.talents) {
      const learn=state.talents.learn||1, gifts=Object.entries(state.talents.gifts||{});
      traitsBox.append(element('p','fold-line',`หัวการเรียน: ${learn>=1.2?'เรียนรู้เร็ว':learn>=0.9?'ปานกลาง':'เรียนรู้ช้า'}`),element('p','fold-line',`ถนัด: ${gifts.length?gifts.map(([k,v])=>TALENT_LABEL[k]+' '+'★'.repeat(v)).join(', '):'ยังไม่พบความถนัดพิเศษ'}`));
      const skills=Object.entries(state.counters||{}).filter(([k,v])=>k.startsWith('skill-') && v>0);
      if(skills.length)traitsBox.append(element('p','fold-line muted','ทักษะที่ฝึกมา: '+skills.map(([k,v])=>(TALENT_LABEL[k.slice(6)]||k.slice(6))+' '+v).join(' · ')));
    }
    trail.append(traitsBox);
    const journey=fold('เส้นทางที่ผ่านมาและแผนที่');
    journey.append(element('h4','','ปีที่ผ่านมา'));
    const track=element('div','life-track'); track.setAttribute('aria-label','ปีที่ผ่านมา');
    const detail=element('div','life-detail');
    const years=KI.timeline.group(state.log);
    years.forEach(item=>{
      const cell=button(String(item.year+543),()=>{
        detail.replaceChildren(element('strong','',`พ.ศ. ${item.year+543}`));
        const annual=KI.finance.annual(state,item.year);
        detail.append(element('p','',`รายรับ ${annual.income.toLocaleString('th-TH')} · รายจ่ายประจำ ${annual.expense.toLocaleString('th-TH')} บาท`));
        if(annual.familyExpense)detail.append(element('p','',`ครอบครัวจ่ายให้ ${annual.familyExpense.toLocaleString('th-TH')} บาท`));
        if(annual.familySupport)detail.append(element('p','',`ครอบครัวช่วยค่าใช้จ่าย ${annual.familySupport.toLocaleString('th-TH')} บาท`));
        if(annual.otherCash)detail.append(element('p','',`กิจกรรมและซื้อขายสินทรัพย์ ${annual.otherCash.toLocaleString('th-TH')} บาท`));
        if(annual.hobbyExpense)detail.append(element('p','',`ในยอดข้างต้น ค่าเล่นร้านเกม ${annual.hobbyExpense.toLocaleString('th-TH')} บาท`));
        item.entries.forEach(entry=>{
          if(entry.pin)detail.append(element('p','',entry.pin));
          (entry.cards||[]).forEach(card=>{
            const marked=()=> (state.bookmarks||[]).some(mark=>mark.t===entry.t && mark.id===card.id);
            const star=button(`${marked()?'★':'☆'} ${card.title}`,()=>{
              const marks=state.bookmarks || [];
              state.bookmarks=marked()?marks.filter(mark=>!(mark.t===entry.t && mark.id===card.id)):[...marks,{t:entry.t,id:card.id,year:entry.year,title:card.title}];
              star.textContent=`${marked()?'★':'☆'} ${card.title}`;persist();
            },'bookmark'); detail.append(star);
          });
        });
      },'year-cell');
      if(item.entries.some(entry=>entry.pin))cell.classList.add('milestone');
      track.append(cell);
    });
    track.append(element('span','year-cell current',String(state.year+543)));
    journey.append(track,detail);
    const pins=state.log.filter(x=>x.pin).slice(-8);
    if (!pins.length) journey.append(element('p','muted','เรื่องราวของคุณเพิ่งเริ่มต้น'));
    pins.forEach(x=>journey.append(element('p','trail-item',`${x.year+543} · ${x.pin}`)));
    const map=element('div','map-card');
    const mapHeading=element('div','map-card-heading');
    mapHeading.append(element('span','map-card-kicker','แผนที่อีสาน'),element('strong','map-current',state.loc.kind==='isan'?KI.tables.provinceName(data,state.loc.province,state.year):'อยู่นอกภาคอีสาน'));
    map.append(mapHeading,KI.map.create(data,state));
    map.append(element('p','map-note','พื้นที่สีเขียวคือจังหวัดที่อยู่ · ใช้เส้นเขตปี 2565 ปรับรูปเพื่อแสดงในเกม'));
    const credit=element('a','map-credit','ข้อมูลแผนที่: GeoThai / OCHA / กรมแผนที่ทหาร');credit.href='https://github.com/GeoThai/boundaries';credit.target='_blank';credit.rel='noopener noreferrer';map.append(credit);
    const license=element('a','map-credit',' · CC BY 3.0 IGO');license.href='https://creativecommons.org/licenses/by/3.0/igo/';license.target='_blank';license.rel='noopener noreferrer';map.append(license);
    journey.append(element('h4','','ที่อยู่ในอีสาน'),map);
    if (state.loc.kind!=='isan') journey.append(element('p','muted',state.loc.kind==='bangkok'?'ขณะนี้อยู่กรุงเทพฯ':'ขณะนี้อยู่ต่างประเทศ'));
    trail.append(journey);


    cards.append(element('h3','year-events-heading',`เรื่องราว พ.ศ. ${state.year+543}`));
    const renderEvent=(card,previous)=>{
      const article=element('article','event-card panel');
      const label = {world:'เหตุการณ์อ้างอิง', 'home-news':'ข่าวจากบ้านเกิด',personal:'เรื่องราวชีวิต',decision:'จุดเปลี่ยน',focus:'ตั้งใจในปีนี้',quiet:'วันธรรมดา'}[card.kind] || 'เรื่องราว';
      article.append(element('div','eyebrow',label),element('h3','',card.title),element('p','',card.body));
      if(previous && card.choice)article.append(element('p','muted',`คุณเลือก: ${card.choice}`));
      if (card.sources && card.sources.length) {
        const links=element('div','source-links'); card.sources.forEach((url,i)=>{const a=element('a','',`ที่มา ${i+1}`); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; links.append(a);}); article.append(links);
      }
      if (card.choices && card.picked === null) article.append(element('p','muted','รอการตัดสินใจ'));      if (card.result && card.result.text) article.append(element('p','result',card.result.text));
      if (card.result && card.result.deltas.length) {
        const names={health:'สุขภาพ',happy:'ความสุข',know:'ความรู้',bond:'ความสัมพันธ์',money:'เงิน',attach:'ยึดติด',grit:'มุ่งมั่น',social:'เข้าสังคม'};
        const text=card.result.deltas.filter(d=>names[d.k]).map(d=>`${names[d.k]} ${d.d>0?'+':''}${d.d}`).join(' · ');
        if (text) article.append(element('p','result',text));
      }
      cards.append(article);
    };
    state.turn.cards.forEach(card=>renderEvent(card,false));
    state.log.filter(entry=>entry.year===state.year).slice().reverse().forEach(entry=>{
      (entry.cards||[]).slice().reverse().forEach(card=>{
        const source=[...(data.decisions||[]),...(data.personalEvents||[]),...(data.worldEvents||[])].find(item=>item.id===card.id);
        renderEvent({...card,body:card.body || source?.body || '',result:{text:card.resultText || '',deltas:card.deltas || []}},true);
      });
    });
    const next=button('ไปต่อ',advance,'btn btn-primary'); next.disabled=!KI.game.canEnd(state)&&!autoMode;
    const jump=button('ข้ามไปเรื่องสำคัญ',()=>{if(!KI.game.canEnd(state))return;state=KI.game.skip(state,data,settings);persist();play();},'btn'); jump.disabled=!KI.game.canEnd(state);
    actions.append(button('หน้าแรก',start,'btn'),jump,next);
    persist();
    if(pendingIndex>=0 && !autoMode) {
      const dialog=element('dialog','situation-dialog');
      dialog.setAttribute('aria-labelledby','situation-title');
      dialog.addEventListener('cancel',event=>event.preventDefault());
      const dialogHead=element('div','situation-heading');
      const portrait=element('div','situation-portrait');portrait.append(KI.avatar.create(state));
      const titleBlock=element('div','situation-title-block');
      titleBlock.append(element('div','situation-kicker','สถานการณ์ในชีวิต'));
      titleBlock.append(element('div','situation-meta',`พ.ศ. ${state.year+543} · อายุ ${state.year-state.birthYear} ปี`));
      const title=element('h2','',state.turn.cards[pendingIndex].title);title.id='situation-title';titleBlock.append(title);
      dialogHead.append(portrait,titleBlock);dialog.append(dialogHead);
      const card=state.turn.cards[pendingIndex];
      dialog.append(element('p','situation-body',card.body),element('p','situation-prompt',card.kind==='focus'?'ปีนี้คุณอยากให้ความสำคัญกับอะไร':'คุณจะรับมือกับเรื่องนี้อย่างไร')); 
      const choices=element('div','choices');
      card.choices.forEach((choice,index)=>{
        const option=button('',()=>{state=KI.game.choose(state,data,pendingIndex,choice.id);persist();play();},'btn choice');
        option.setAttribute('aria-label',choice.label);
        const source=card.kind==='decision'?(data.decisions||[]).find(item=>item.id===card.id):card.kind==='personal'?(data.personalEvents||[]).find(item=>item.id===card.id):card.kind==='focus'?{choices:data.focus}:null;
        const selected=source && source.choices.find(item=>item.id===String(choice.id).split('@')[0]);
        const effects=(selected && (card.kind==='focus'?selected.perSeason:selected.effects) || []).filter(effect=>!choice.kid || typeof effect.money!=='number');
        const preview=KI.effects.apply(state,effects.filter(effect=>'stat' in effect || 'trait' in effect || 'money' in effect || 'inherit' in effect),data,KI.rng.make(state.rng));
        const names={health:'สุขภาพ',happy:'ความสุข',know:'ความรู้',bond:'ความสัมพันธ์',money:'เงิน',attach:'ยึดติด',grit:'มุ่งมั่น',social:'เข้าสังคม'};
        const impacts=preview.deltas.filter(delta=>names[delta.k]).map(delta=>names[delta.k]+' '+(delta.d>0?'+':'')+delta.d.toLocaleString('th-TH')+(delta.k==='money'?' บาท':''));
        if(selected && selected.roll)impacts.push('มีผลสุ่มเพิ่มเติม');
        option.setAttribute('aria-label',choice.label+(choice.borrow?' · ต้องกู้มาจ่าย':'')+(impacts.length?' · '+impacts.join(' · ')+(card.kind==='focus'?' ต่อฤดู':''):''));
        const detail=element('span','choice-text');if(choice.borrow)option.classList.add('choice-borrow');detail.append(element('span','choice-label',choice.label),...(choice.borrow?[element('span','borrow-tag','ต้องกู้มาจ่าย')]:[]),element('span','choice-impact',impacts.length?impacts.join(' · ')+(card.kind==='focus'?' / ฤดู':''):'เลือกเพื่อดำเนินเรื่อง'));
        option.append(element('span','choice-number',String(index+1).padStart(2,'0')),detail,element('span','choice-arrow','→'));
        choices.append(option);
      });
      dialog.append(choices);
      dialog.append(button('ให้ระบบเลือกแทนจากนี้',()=>{autoMode=true;play();},'btn btn-quiet'));
      root.append(dialog);
      const pageY=window.scrollY, pageX=window.scrollX;
      if(typeof dialog.showModal==='function')dialog.showModal();else {dialog.setAttribute('open','');dialog.setAttribute('aria-modal','true');}
      const firstChoice=dialog.querySelector('.choice');if(firstChoice)firstChoice.focus({preventScroll:true});
      window.scrollTo(pageX,pageY);
    }
    clock.schedule({key:state.t,ready:!waiting && (KI.game.canEnd(state)||autoMode)});
    showStatus();drawProgress();
  }
  function advance() {
    if (!state || (!KI.game.canEnd(state) && !autoMode)) return;
    state=KI.game.canEnd(state)?KI.game.end(state,data):KI.game.auto(state,data,settings); persist(); play();
  }
  function economyHistory(years) {
    const details=element('details','economy-history');
    details.append(element('summary','','สมุดรายรับและรายจ่ายรายปี'));
    years.forEach(item=>{
      const fmt=value=>value.toLocaleString('th-TH');
      const row=element('p','trail-item',`พ.ศ. ${item.year+543} · รายรับ ${fmt(item.income)} · รายจ่ายประจำ ${fmt(item.expense)} บาท`);
      if(item.familyExpense)row.append(element('span','',` · ครอบครัวจ่ายให้ ${fmt(item.familyExpense)} บาท`));
      if(item.familySupport)row.append(element('span','',` · ครอบครัวช่วยค่าใช้จ่าย ${fmt(item.familySupport)} บาท`));
      if(item.otherCash)row.append(element('span','',` · กิจกรรมและซื้อขาย ${item.otherCash>0?'+':''}${fmt(item.otherCash)} บาท`));
      if(item.hobbyExpense)row.append(element('span','',` · รวมค่าเล่นร้านเกม ${fmt(item.hobbyExpense)} บาท`));
      details.append(row);
    });
    return details;
  }
  function collectionView(have) {
    const box=element('details','title-book');
    box.append(element('summary','',`สมุดสะสมฉายา ${have.length} / ${KI.titles.LIST.length}`));
    KI.titles.LIST.forEach(t=>box.append(element('p',have.includes(t.id)?'title-row got':'title-row',have.includes(t.id)?`★ ${t.label}`:`☆ ??? · ${t.hint}`)));
    return box;
  }
  function finish() {
    clock.stop();
    const summary=KI.game.summary(state,data);
    summary.reflections=state.reflections || {}; summary.notes=state.notes || []; summary.financeLog=state.financeLog || []; summary.bookmarks=state.bookmarks || []; summary.family=state.family || null; summary.friends=state.friends || []; summary.economyYears=KI.finance.history(state);
    const worth=KI.finance.portfolioValue(state,data),personal=KI.finance.personalValue(state,data);
    summary.financeFinal={cash:state.money,stocks:{value:worth.stocks},property:{value:worth.property+personal.homes},cars:{value:personal.cars},loans:KI.finance.loanBalance(state,data)};
    if (!KI.save.finish(storage,summary) && !warned) {warned=true; notice('เครื่องนี้บันทึกสรุปชีวิตไม่ได้');}
    const titles=KI.titles.earned(state), have=KI.titles.record(titles);
    root.replaceChildren(); const main=element('main','simple-page panel');
    main.append(element('div','eyebrow',state.generation>1?`บันทึกหนึ่งชีวิต · รุ่นที่ ${state.generation}`:'บันทึกหนึ่งชีวิต'),element('h1','',summary.name),element('p','',`เพศ${summary.sex==='f'?'หญิง':summary.sex==='m'?'ชาย':'ไม่ระบุ'} · เดินทางมาถึงอายุ ${summary.age} ปี · ${summary.edu}${summary.disability?' · ความพิการทางร่างกาย'+(summary.disability==='birth'?'แต่กำเนิด':'จากอุบัติเหตุ'):''}`),...(summary.cause?[element('p','',`สาเหตุที่จากไป: ${summary.cause}`)]:[]),element('p','title-earned',titles.length?`ฉายา: ${titles.map(t=>t.label).join(' · ')}`:'ชีวิตนี้ยังไม่ได้ฉายา'),collectionView(have));
    const copyText=`${summary.name} · อายุ ${summary.age} ปี · ${summary.edu}\n`+summary.pins.map(p=>`${p.year+543} · ${p.text}`).join('\n');
    const gameUrl=location.protocol.startsWith('http')?location.origin+location.pathname:'https://pachara2332.github.io/koet-isan/';
    const shareBox=element('section','share-box');shareBox.append(element('h2','','แชร์ชีวิตนี้'));
    const shareImg=document.createElement('img');shareImg.className='share-image';shareImg.alt='ภาพสรุปชีวิตสำหรับแชร์';
    const shareCanvas=async()=>{
      try{if(document.fonts && document.fonts.ready)await document.fonts.ready;}catch(e){}
      const kin=familyFigures().filter(p=>p.label!==undefined);
      const fam=state.family||{};const familyLine=[fam.partner?`${fam.partner.married?'คู่ชีวิต':'คนรัก'} ${fam.partner.name}`:'',(fam.children||[]).length?`ลูก ${(fam.children||[]).length} คน`:'',(fam.grandchildren||[]).length?`หลาน ${(fam.grandchildren||[]).length} คน`:''].filter(Boolean).join(' · ');
      const canvas=await KI.share.life({...summary,stats:state.stats,worth:summary.financeFinal.cash+summary.financeFinal.stocks.value+summary.financeFinal.property.value+summary.financeFinal.cars.value-summary.financeFinal.loans,familyLine},titles,gameUrl,[{svg:KI.avatar.create(state),label:'',name:state.name},...kin.map(p=>({svg:KI.avatar.create(p),label:p.label,name:p.name}))]);
      return canvas;
    };
    const canvasReady=shareCanvas();
    canvasReady.then(canvas=>{shareImg.src=canvas.toDataURL('image/png');}).catch(()=>{shareImg.remove();});
    const shareActions=element('div','share-actions');
    shareActions.append(button('แชร์ภาพชีวิตนี้',async()=>{
      const canvas=await canvasReady;
      canvas.toBlob(async blob=>{
        if(!blob){notice('ไม่สามารถสร้างภาพได้');return;}
        const text=`${summary.name} ใช้ชีวิตในเกมเกิดอีสานจนอายุ ${summary.age} ปี ลองใช้ชีวิตของคุณเองที่ ${gameUrl}`;
        const file=typeof File==='function'?new File([blob],'koet-isan-life.png',{type:'image/png'}):null;
        if(file && navigator.canShare && navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:'เกิดอีสาน',text});return;}catch(e){if(e && e.name==='AbortError')return;}}
        const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='koet-isan-life.png';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);
        let copied=false;try{await navigator.clipboard.writeText(text);copied=true;}catch(e){}
        notice(copied?'บันทึกภาพแล้ว และคัดลอกข้อความพร้อมลิงก์เกมไว้ให้ วางคู่กับภาพตอนแชร์ได้เลย':'บันทึกภาพแล้ว ลิงก์เกม: '+gameUrl);
      },'image/png');
    },'btn btn-primary'));
    shareActions.append(button('คัดลอกเรื่องราว',async()=>{try{await navigator.clipboard.writeText(copyText);}catch(e){const box=document.createElement('textarea');box.value=copyText;box.rows=8;shareBox.append(box);box.select();}},'btn'));
    shareBox.append(shareImg,shareActions);main.append(shareBox,supportBox());
    const statBox=element('section','final-stats');statBox.append(element('h2','','ค่าชีวิตตอนจากไป'));
    [['health','สุขภาพ'],['happy','ความสุข'],['know','ความรู้'],['bond','ความสัมพันธ์']].forEach(([key,label])=>{const peak=summary.peak[key];const row=element('div','final-stat');const meter=document.createElement('progress');meter.max=100;meter.value=state.stats[key];row.append(element('span','',label),meter,element('strong','',String(state.stats[key])),element('small','muted',peak?`สูงสุด ${peak.value} ตอนอายุ ${peak.age}`:''));statBox.append(row);});
    const worthAll=summary.financeFinal.cash+summary.financeFinal.stocks.value+summary.financeFinal.property.value+summary.financeFinal.cars.value-summary.financeFinal.loans;
    statBox.append(element('p',worthAll<0?'money money-negative':'money',`ทรัพย์สินสุทธิ ${worthAll.toLocaleString('th-TH')} บาท · ฐานะ ${KI.finance.STATUS_LABEL[state.flags.status]||'-'}`));
    main.append(statBox);
    if(summary.pins.length){const pinBox=element('details','end-details');pinBox.append(element('summary','',`หมุดหมายในชีวิต (${summary.pins.length})`));summary.pins.forEach(p=>pinBox.append(element('p','trail-item',`${p.year+543} · ${p.text}`)));main.append(pinBox);}
    if (summary.places.length) main.append(element('p','',`ที่อยู่: ${summary.places.join(' → ')}`));
    if (summary.jobs.length) main.append(element('p','',`งาน: ${summary.jobs.join(' → ')}`));
    main.append(element('p','',`เงินคงเหลือ ${summary.financeFinal.cash.toLocaleString('th-TH')} บาท · หุ้น ${summary.financeFinal.stocks.value.toLocaleString('th-TH')} บาท · บ้านและอสังหาฯ ${summary.financeFinal.property.value.toLocaleString('th-TH')} บาท · รถ ${summary.financeFinal.cars.value.toLocaleString('th-TH')} บาท${summary.financeFinal.loans?' · เงินกู้ค้าง '+summary.financeFinal.loans.toLocaleString('th-TH')+' บาท':''}`));
    if (summary.compare.length) {
      const comparison=element('section','comparison-panel'); comparison.append(element('h2','','เปรียบเทียบกับข้อมูลที่มี'));
      summary.compare.forEach(row=>{
        const item=element('div','comparison-row');item.append(element('strong','',row.label),element('p','',`ชีวิตนี้: ${row.you} · ค่าอ้างอิง: ${row.cohort}`));
        if(row.source){const link=element('a','','ดูที่มา');link.href=row.source;link.target='_blank';link.rel='noopener noreferrer';item.append(link);}comparison.append(item);
      });
      comparison.append(element('p','muted','ค่าอายุคาดเฉลี่ยเป็นข้อมูลประชากรระดับประเทศในปีเกิด ไม่ใช่คำทำนายอายุของบุคคลหรือสถิติเฉพาะอีสาน'));main.append(comparison);
    }

    if(summary.friends.length)main.append(element('p','',`เพื่อนในชีวิต: ${summary.friends.map(friend=>friend.name).join(' · ')}`));
    if(summary.family) {const names=[...summary.family.children,...(summary.family.grandchildren||[])].map(child=>child.name);if(summary.family.partner)names.unshift(summary.family.partner.name);if(names.length)main.append(element('p','',`คนสำคัญในชีวิต: ${names.join(' · ')}`));}
    const kids=(state.family && state.family.children) || [];
    if(kids.length){
      const heirs=element('section','comparison-panel');
      heirs.append(element('h2','','เล่นต่อเป็นลูก'),element('p','muted','เริ่มตั้งแต่วันที่ลูกเกิด มีคุณเป็นพ่อหรือแม่ ทรัพย์สินที่ทิ้งไว้จะตกถึงลูกในปีที่คุณจากไป'));
      kids.forEach(child=>heirs.append(button(`${child.name} · เกิด พ.ศ. ${child.birthYear+543}`,()=>createLife(heirCfg(child)),'btn')));
      main.append(heirs);
    }
    const yearBox=element('details','end-details');yearBox.append(element('summary','','บันทึกรายปีและการเงินย้อนหลัง'));
    Object.entries(summary.reflections).forEach(([age,text])=>{if(text)yearBox.append(element('p','trail-item',`อายุ ${age} ปี · ${text}`));});
    summary.notes.forEach(note=>yearBox.append(element('p','trail-item',`อายุ ${note.age} ปี · ${note.text}`)));
    summary.financeLog.forEach(item=>yearBox.append(element('p','trail-item',`อายุ ${item.age} ปี · ${item.label} · ${item.familyExpense?'ครอบครัวจ่าย '+item.familyExpense.toLocaleString('th-TH'):item.delta.toLocaleString('th-TH')} บาท`)));
    summary.bookmarks.forEach(item=>yearBox.append(element('p','trail-item',`★ ${item.year+543} · ${item.title}`)));
    if(summary.economyYears.length)yearBox.append(economyHistory(summary.economyYears));
    if(yearBox.children.length>1)main.append(yearBox);
    main.append(button('เกิดใหม่',start,'btn btn-primary'));root.append(main);
  }
  function lives() {
    root.replaceChildren(); const main=element('main','simple-page panel');
    main.append(button('กลับ',start),element('h1','','ชีวิตที่ผ่านมา'),collectionView(KI.titles.collected()));
    const list=KI.save.lives(storage);
    main.append(button('ส่งออกบันทึกชีวิต',()=>{
      const blob=new Blob([JSON.stringify({version:1,lives:list},null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=url; link.download='koet-isan-lives.json'; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    },'btn'));
    const file=document.createElement('input'); file.type='file'; file.accept='.json,application/json'; file.setAttribute('aria-label','เลือกไฟล์บันทึกชีวิต');
    file.addEventListener('change',async()=>{
      const selected=file.files && file.files[0]; if(!selected)return;
      if(selected.size>1000000){notice('ไฟล์มีขนาดใหญ่เกินไป');return;}
      let imported; try {imported=KI.archive.parse(await selected.text());} catch(e) {imported=null;}
      if(!imported){notice('ไฟล์บันทึกไม่ถูกต้อง');return;}
      gameDialog({title:'นำเข้าบันทึกชีวิต?',message:'บันทึกชีวิตที่ผ่านมาในเครื่องนี้จะถูกแทนที่ด้วยข้อมูลจากไฟล์',cancelLabel:'ยกเลิก',confirmLabel:'นำเข้าและแทนที่',onConfirm:()=>{
        if(!KI.save.replaceLives(storage,imported)){notice('ไม่สามารถบันทึกข้อมูลได้');return;}
        lives();
      }});
    });
    main.append(field('นำเข้าบันทึกชีวิต',file));
    if (!list.length) main.append(element('p','muted','ยังไม่มีชีวิตที่บันทึกไว้'));
    list.forEach((life,index)=>{
      const details=element('details','life-record'); const heading=element('summary','',`${life.name} · อายุ ${life.age} ปี · ${life.edu}`); details.append(heading);
      (life.pins||[]).forEach(pin=>details.append(element('p','trail-item',`${pin.year+543} · ${pin.text}`)));
      Object.entries(life.reflections||{}).forEach(([age,text])=>{if(text)details.append(element('p','trail-item',`อายุ ${age} ปี · ${text}`));});
      (life.notes||[]).forEach(note=>details.append(element('p','trail-item',`อายุ ${note.age} ปี · ${note.text}`)));
      if(life.friends && life.friends.length)details.append(element('p','trail-item',`เพื่อนในชีวิต: ${life.friends.map(friend=>friend.name).join(' · ')}`));
      if(life.family){const names=[...(life.family.children||[]),...(life.family.grandchildren||[])].map(child=>child.name);if(life.family.partner)names.unshift(life.family.partner.name);if(names.length)details.append(element('p','trail-item',`คนสำคัญในชีวิต: ${names.join(' · ')}`));}
      if(life.financeFinal)details.append(element('p','trail-item',`เงินคงเหลือ ${life.financeFinal.cash.toLocaleString('th-TH')} บาท · หุ้น ${life.financeFinal.stocks.value.toLocaleString('th-TH')} บาท · บ้านและอสังหาฯ ${life.financeFinal.property.value.toLocaleString('th-TH')} บาท${life.financeFinal.cars?' · รถ '+life.financeFinal.cars.value.toLocaleString('th-TH')+' บาท':''}${life.financeFinal.loans?' · เงินกู้ค้าง '+life.financeFinal.loans.toLocaleString('th-TH')+' บาท':''}`));
      if(Array.isArray(life.economyYears) && life.economyYears.length)details.append(economyHistory(life.economyYears));
      (life.bookmarks||[]).forEach(item=>details.append(element('p','trail-item',`★ ${item.year+543} · ${item.title}`)));
      details.append(button('ลบชีวิตนี้',()=>gameDialog({title:'ลบชีวิตนี้ไหม?',message:'บันทึกชีวิตนี้จะถูกลบออกจากเครื่อง',cancelLabel:'เก็บไว้',confirmLabel:'ลบชีวิตนี้',onConfirm:()=>{KI.save.removeLife(storage,index);lives();}}),'btn')); main.append(details);
    });
    root.append(main);
  }
  function settingsPage() {
    root.replaceChildren(); const main=element('main','simple-page panel');
    main.append(button('กลับ',start),element('h1','','ตั้งค่า'));
    for (const [key,label] of [['hideHeavy','ซ่อนเนื้อหาหนัก'],['motion','เปิดภาพเคลื่อนไหว']]) {
      const input=document.createElement('input'); input.type='checkbox'; input.checked=!!settings[key];
      input.addEventListener('change',()=>{settings=KI.save.setSettings(storage,{[key]:input.checked});}); main.append(field(label,input));
    }
    main.append(button('ลบชีวิตที่กำลังเล่น',()=>gameDialog({title:'ลบชีวิตที่กำลังเล่นไหม?',message:'ความคืบหน้าของชีวิตนี้จะถูกลบออกจากเครื่อง',cancelLabel:'เก็บไว้',confirmLabel:'ลบชีวิตนี้',onConfirm:()=>KI.save.clear(storage)}),'btn'));
    root.append(main);
  }
  function sources() {
    root.replaceChildren(); const main=element('main','simple-page panel');
    main.append(element('h1','','แหล่งข้อมูล'),element('p','muted','เหตุการณ์อิงเอกสารค้นคว้า ข้อมูลบางช่วงมีข้อจำกัดและยังต้องตรวจสอบเพิ่มเติม อัตราตายทารกก่อนปี 2543 ใช้ข้อมูลรวมทั้งสองเพศระดับประเทศจากธนาคารโลก ส่วนช่วงอื่นอ้างอิงตารางชีพระดับประเทศของ WHO ปี 2543–2564 แปลงจากช่วงอายุเป็นรายปีโดยสมมติความเสี่ยงคงที่ อายุ 85 ปีขึ้นไปใช้ค่าประมาณของเกม ปีที่ไม่มีข้อมูลใช้ปีใกล้ที่สุด เกมปรับความเสี่ยงตามค่าสุขภาพจำลองและไม่ใช่สถิติเฉพาะอีสาน ค่าสุขภาพลดตามวัยเป็นกติกาของเกม รายรับตามอาชีพเป็นค่าประมาณของเกม ค่าแรงใช้ข้อมูลอ้างอิงภาคอีสานตั้งแต่ปี 2517 และจังหวัดอำนาจเจริญตั้งแต่ปี 2537 ปีอื่นใช้ค่าของปีที่ใกล้ที่สุด (ก่อนปี 2517 เป็นเพียงค่าแทน) ราคาข้าวปี 2550–2562 ใช้ราคาเฉลี่ยเดือนพฤศจิกายนทั้งประเทศ ปี 2563 เป็นต้นไปใช้ข้อมูลจังหวัดมหาสารคาม ก่อนปี 2550 ประมาณตามสัดส่วนค่าแรงจึงไม่ใช่ราคาจริงหรือสถิติของทุกจังหวัด'));
    const statistics=element('details','source-statistics'); statistics.append(element('summary','','สถิติอายุคาดเฉลี่ยระดับประเทศในแต่ละปี'));
    statistics.append(element('p','muted','ข้อมูลธนาคารโลก ระดับประเทศไทย ไม่ใช่ตัวเลขเฉพาะอีสาน'));
    const link=element('a','','ดูแหล่งข้อมูลธนาคารโลก');link.href='https://data.worldbank.org/indicator/SP.DYN.LE00.IN?locations=TH';link.target='_blank';link.rel='noopener noreferrer';statistics.append(link);
    (data.stats.cohort.lifeExpectancy || []).forEach(row=>statistics.append(element('p','source-row',`พ.ศ. ${row.year+543} · ${row.value} ปี`)));
    const mortality=element('details','source-statistics'); mortality.append(element('summary','','วิธีใช้อัตราตายในเกม'));
    mortality.append(element('p','muted','ก่อน พ.ศ. 2543 ใช้อัตราตายทารกรวมทั้งสองเพศระดับประเทศไทยจากธนาคารโลก และใช้ตารางชีพประเทศไทยของ WHO ปีที่ใกล้ที่สุดสำหรับวัยอื่น ตั้งแต่ พ.ศ. 2543 ใช้ตารางชีพ WHO แยกเพศ แปลงช่วงอายุเป็นรายปีโดยสมมติความเสี่ยงคงที่ อายุ 85 ปีขึ้นไปเป็นค่าประมาณ ปีที่ขาดใช้ปีใกล้ที่สุด และเกมปรับความเสี่ยงตามค่าสุขภาพจำลอง จึงไม่ใช่ตัวเลขเฉพาะอีสานหรือคำทำนายรายบุคคล'));
    const mortalityLink=element('a','','ดูข้อมูลตารางชีพ WHO');mortalityLink.href='https://apps.who.int/gho/data/node.imr.LIFE_0000000030?lang=en';mortalityLink.target='_blank';mortalityLink.rel='noopener noreferrer';mortality.append(mortalityLink);
    const infantLink=element('a','','ดูอัตราตายทารกจากธนาคารโลก');infantLink.href='https://data.worldbank.org/indicator/SP.DYN.IMRT.IN?locations=TH';infantLink.target='_blank';infantLink.rel='noopener noreferrer';mortality.append(element('p','', ''),infantLink);
    const economyInfo=element('details','source-statistics');economyInfo.append(element('summary','','รายจ่าย การเกษียณ และการลงทุนในเกม'));
    economyInfo.append(element('p','muted','รายรับ ค่าครองชีพ ค่าดูแลเด็ก เงินสนับสนุนนักเรียนจากครอบครัว ราคาหุ้น อสังหาฯ และค่าร้านเกมเป็นค่าจำลอง ไม่ใช่สถิติจริงทุกรายการ เกมจำลองข้าราชการและข้าราชการครูเกษียณหลังสิ้นเดือนกันยายนของปีที่อายุครบ 60 ปี โดยไม่ได้จำลองวันเกิดหรือข้อยกเว้น และยังไม่ได้จำลองบำเหน็จบำนาญ อาชีพอื่นเลือกเกษียณหรือทำงานต่อได้'));
    const retirementLink=element('a','','ข้อมูลเกษียณจากสำนักงาน ก.พ.');retirementLink.href='https://www.ocsc.go.th/wp-content/uploads/2023/12/วารสารข้าราชการ-ปีที่-23-ฉบับที่-9-พ.ศ.-2521.pdf';retirementLink.target='_blank';retirementLink.rel='noopener noreferrer';economyInfo.append(retirementLink);
    const wageLink=element('a','','ข้อมูลค่าแรงในอดีตจากธนาคารโลก');wageLink.href='https://documents1.worldbank.org/curated/en/415351468334300207/pdf/multi-page.pdf';wageLink.target='_blank';wageLink.rel='noopener noreferrer';economyInfo.append(element('p','',''),wageLink);
    const riceLink=element('a','','ราคาข้าวจากสำนักงานเศรษฐกิจการเกษตร');riceLink.href='https://oae.go.th/uploads/files/2025/05/02/32417ff84d8cc970.pdf';riceLink.target='_blank';riceLink.rel='noopener noreferrer';economyInfo.append(element('p','',''),riceLink);
    const stockLink=element('a','','ข้อมูลประวัติตลาดหลักทรัพย์');stockLink.href='https://www.set.or.th/th/services/connectivity-and-data/data/historical';stockLink.target='_blank';stockLink.rel='noopener noreferrer';economyInfo.append(element('p','',''),stockLink);
    main.append(statistics,mortality,economyInfo,element('h2','','เหตุการณ์อ้างอิง'));
    data.worldEvents.forEach(e=>{const row=element('p','source-row',`${e.year+543} · ${e.title} `);e.sources.forEach((url,i)=>{const a=element('a','',`[${i+1}]`);a.href=url;a.target='_blank';a.rel='noopener noreferrer';row.append(a);});main.append(row);});
    main.prepend(button('กลับ',start));root.append(main);
  }
  document.addEventListener('keydown', event => {
    if (!state || !state.turn || event.altKey || event.ctrlKey || event.metaKey || /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName)) return;
    if (event.target.tagName==='BUTTON' && (event.key==='Enter' || event.key===' ')) return;
    if (/^[1-4]$/.test(event.key)) { const choices=root.querySelectorAll('.choice'); const choice=choices[Number(event.key)-1]; if (choice) choice.click(); }
    if (event.key==='Enter' || event.key===' ') { const next=root.querySelector('.slot-actions .btn-primary'); if (next && !next.disabled) { event.preventDefault(); next.click(); } }
  });
  start();
})();
