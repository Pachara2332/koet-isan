globalThis.KI = globalThis.KI || {};
(function () {
  const LAST_REAL_YEAR = 2026;
  const MAX_WORLD = 2;
  const PERSONAL_CHANCE = 0.8;
  const PRESET_TAG = 'ทางของต้นเรื่อง';
  const FOCUS_TITLE = 'ช่วงนี้เอาจังได๋';
  const FOCUS_BODY = 'เลือกสิ่งที่จะทุ่มเทในช่วงชีวิตนี้ ผลจะค่อยๆ สะสมไปทุกฤดู และเปลี่ยนเองได้ตลอด';

  const ROLE_LABELS = {
    child: 'เด็ก', student: 'นักเรียน', farmer: 'ชาวนา', factory: 'คนงานโรงงาน', construction: 'คนงานก่อสร้าง',
    driver: 'คนขับรถ', civil: 'ข้าราชการ', teacher: 'ครู', office: 'พนักงานออฟฟิศ', trader: 'ค้าขาย',
    abroad: 'แรงงานต่างประเทศ', politician: 'นักการเมือง', monk: 'พระสงฆ์', soldier: 'ทหาร', jobless: 'ว่างงาน', prisoner: 'ผู้ต้องขัง', retired: 'เกษียณ',
    doctor: 'แพทย์', nurse: 'พยาบาล', engineer: 'วิศวกร', developer: 'นักพัฒนาซอฟต์แวร์', police: 'ตำรวจ', lawyer: 'ทนายความ', pharmacist: 'เภสัชกร', accountant: 'นักบัญชี', banker: 'พนักงานธนาคาร', chef: 'เชฟ/พ่อครัวแม่ครัว', mechanic: 'ช่างซ่อมรถ', artist: 'ศิลปิน/นักแสดง', creator: 'ครีเอเตอร์ออนไลน์', rider: 'ไรเดอร์ส่งของ', security: 'พนักงานรักษาความปลอดภัย', housekeeper: 'แม่บ้าน/พนักงานทำความสะอาด', athlete: 'นักกีฬาอาชีพ', designer: 'นักออกแบบ', business: 'เจ้าของกิจการ'
  };

  const QUIET_TITLES = { 0: 'หน้าแล้งที่ผ่านไปอย่างสงบ', 1: 'หน้านาที่ผ่านไปอย่างสงบ', 2: 'หน้าเกี่ยวที่ผ่านไปอย่างสงบ', null: 'ปีที่ผ่านไปอย่างสงบ' };

  const QUIET = {
    rural: {
      0: [
        'ลมแล้งพัดฝุ่นแดงข้ามทุ่ง ตอซังยังเรียงเป็นแถว วันเวลาผ่านไปตามปกติ',
        'ช่วงสงกรานต์ ญาติที่ไปทำงานไกลกลับมาเยี่ยมบ้าน แล้วก็แยกย้ายกันไปอีกครั้ง',
        'บ่ายร้อนจัด คนในบ้านพักใต้ถุนเรือน รอให้แดดอ่อนลงก่อนออกไปทำงาน',
        'บ่อน้ำหน้าบ้านลดระดับลงทุกวัน ทุกคนช่วยกันใช้น้ำอย่างประหยัด',
        'เด็กๆ ชักว่าวกลางทุ่งที่ว่างหลังหน้าเกี่ยว'
      ],
      1: [
        'ฝนแรกมาถึง กลิ่นดินเปียกลอยทั่วหมู่บ้าน ทุกบ้านเตรียมไถนา',
        'แปลงกล้าเขียวขึ้นทีละแปลง วันส่วนใหญ่หมดไปกับงานในนา',
        'ฝนตกทั้งบ่าย กบร้องระงมจนค่ำ ชีวิตเดินไปตามจังหวะของมัน',
        'ช่วงเข้าพรรษา ผู้สูงอายุไปวัดบ่อยขึ้น หมู่บ้านดูเงียบลง'
      ],
      2: [
        'รวงข้าวเหลืองเต็มทุ่ง ทุกคนในบ้านออกไปช่วยกันเกี่ยว',
        'ลมหนาวแรกมาถึง ตอนเช้ามีหมอกบางๆ คลุมทุ่งนา',
        'ข้าวขึ้นยุ้งเรียบร้อย ครอบครัวนั่งล้อมวงกินข้าวด้วยกันนานกว่าปกติ',
        'ช่วงออกพรรษา วัดจัดงานบุญ คนจากหลายหมู่บ้านมาร่วมกัน'
      ],
      null: [
        'ปีนี้ผ่านไปกับการกิน การนอน และการเล่นอยู่ใกล้ผู้ใหญ่ในบ้าน',
        'ผู้ใหญ่ในบ้านทำนาตามฤดู ส่วนเด็กเล็กเล่นอยู่ใต้ถุนเรือน',
        'ตัวโตขึ้นอีกนิด รู้จักคนรอบบ้านมากขึ้นทีละน้อย',
        'ผู้ใหญ่ในบ้านเล่านิทานให้ฟังก่อนนอนหลายคืน'
      ]
    },
    city: {
      0: [
        'อากาศร้อนอบอ้าว วันทำงานและวันพักผ่อนวนไปตามปกติ',
        'ช่วงสงกรานต์ ถนนคึกคักกว่าทุกวัน หลายคนเดินทางกลับบ้านเกิด',
        'ช่วงนี้ไม่มีเรื่องใหญ่ ชีวิตเดินไปตามจังหวะของมัน',
        'แดดแรงทั้งวัน ตกเย็นผู้คนออกมาเดินเล่นและหาของกินริมทาง'
      ],
      1: [
        'ฝนตกแทบทุกบ่าย ถนนเปียกและรถติดกว่าปกติ',
        'ฟ้าครึ้มทั้งวัน ชีวิตประจำวันเดินไปตามปกติ',
        'ฝนหยุดตอนเย็น อากาศเย็นลงจนนอนหลับสบาย',
        'ช่วงนี้ไม่มีอะไรตื่นเต้น วันธรรมดาผ่านไปทีละวัน'
      ],
      2: [
        'ลมหนาวเริ่มมา ตอนเช้าอากาศเย็นสบาย',
        'ใกล้สิ้นปี ร้านรวงเริ่มประดับไฟ ผู้คนวางแผนกลับบ้านช่วงปีใหม่',
        'ท้องฟ้าใสเกือบทุกวัน อากาศดีกว่าช่วงอื่นของปี',
        'เดือนสุดท้ายของปีผ่านไปเร็ว เหมือนทุกปี'
      ],
      null: [
        'ปีนี้ผ่านไปกับการกิน การนอน และการเล่นอยู่ใกล้ผู้ใหญ่ในบ้าน',
        'ตัวโตขึ้นอีกนิด รู้จักคนรอบบ้านมากขึ้นทีละน้อย',
        'ผู้ใหญ่ในบ้านเล่านิทานให้ฟังก่อนนอนหลายคืน',
        'ได้ไปตลาดกับผู้ใหญ่บ่อยๆ มองทุกอย่างด้วยความสงสัย'
      ]
    }
  };

  const POL_TITLES = ['', 'ผู้ใหญ่บ้าน', 'นายก อบต.', 'ส.ส.'];
  function roleLabel(s) {
    const title = POL_TITLES[s.flags && s.flags.polRank];
    if (s.role === 'politician') return title || ROLE_LABELS.politician;
    return baseRole(s);
  }
  function baseRole(s) {
    if (s.role === 'student' || (s.role === 'child' && s.edu.in)) {
      const g = s.edu.grade;
      if (s.edu.in === 'school') return g <= 6 ? 'นักเรียน ป.' + g : 'นักเรียน ม.' + (g - 6);
      if (s.edu.in === 'novice') return 'สามเณร';
      if (s.edu.in === 'voc') return 'นักเรียน ปวช. ปี ' + g;
      if (s.edu.in === 'hvoc') return 'นักศึกษา ปวส. ปี ' + g;
      if (s.edu.in === 'uni') return 'นักศึกษามหาวิทยาลัย ปี ' + g;
      if (s.edu.in === 'med') return 'นักศึกษาแพทย์ ปี ' + g;
    }
    return ROLE_LABELS[s.role] || ROLE_LABELS.child;
  }

  function placeLabel(data, loc, year, withSetting) {
    if (loc.kind === 'bangkok') return 'กรุงเทพฯ';
    if (loc.kind === 'abroad') return loc.country || 'ต่างประเทศ (ไม่ระบุประเทศ)';
    const name = KI.tables.provinceName(data, loc.province, year);
    return withSetting ? name + ' (' + (loc.setting === 'urban' ? 'ในเมือง' : 'ชนบท') + ')' : name;
  }

  function cooled(s, id, cooldown) {
    if (!(id in s.seen)) return true;
    if (typeof cooldown !== 'number') return false;
    return s.t - s.seen[id] >= cooldown;
  }

  const CHEAP = /รถทัวร์|รถเมล์|โอที|ล่วงเวลา|ไม่มีเงิน/;
  function choicesOf(src, s, rng, data) {
    if (!src.choices || !src.choices.length) return null;
    const out = [];
    for (const c of src.choices) {
      if (!KI.cond.test(c.when, s, rng)) continue;
      const directCost = data && KI.game ? KI.game.moneyCost(c.effects, s, data) : 0;
      if (c.requiresFunds && s.money < directCost || c.requiresShortfall && s.money >= directCost) continue;
      const p = c.preset && s.preset && c.preset[s.preset];
      let label = (p && p.label) || c.label;
      const moves = [...(c.effects || []), ...(c.roll || []).flatMap((r) => r.effects || [])].filter((e) => e.move && e.move.kind === 'abroad').map((e) => e.move);
      const countries = [...new Set(moves.map((m) => m.country).filter(Boolean))];
      if (countries.length && !countries.every((country) => label.includes(country))) label += ' · ปลายทาง ' + countries.join(' / ');
      const description = [label, c.text || '', src.body || ''].join(' ');
      const method = moves.length && (moves[0].method || (/ผีน้อย|ไม่มีใบอนุญาต|นักท่องเที่ยวแล้วอยู่/.test(description) ? 'เข้าแบบนักท่องเที่ยวแล้วอยู่ทำงาน' : /EPS|ระบบรัฐ|โครงการส่งแรงงาน/.test(description) ? 'สมัครผ่านโครงการของรัฐ' : /นายหน้า|บริษัทจัดหางาน|เอเจนซี/.test(description) ? 'ผ่านบริษัทจัดหางานหรือนายหน้า' : /สอบ|คัดเลือก|สมัคร/.test(description) ? 'สมัครและผ่านการคัดเลือก' : 'ไม่ได้ระบุวิธีเดินทาง'));
      if (method && !label.includes(method)) label += ' · ' + method;
      const kidCost = data && KI.game && s.year - s.birthYear >= 6 && s.year - s.birthYear < 15 ? KI.game.moneyCost(c.effects, s, data) : 0;
      if (kidCost > 0) {
        if(s.flags.parentsAlive)out.push({ id: c.id + '@parents', label: label + ' · ขอเงินพ่อแม่', tag: null, cost: kidCost, kid: 'parents' });
        out.push({ id: c.id + '@earn', label: label + ' · ช่วยงานรับจ้างเก็บเงินเอง', tag: null, cost: kidCost, kid: 'earn' });
        continue;
      }
      const cost = data && KI.game && s.year - s.birthYear >= 15 ? KI.game.moneyCost(c.effects, s, data) : 0;
      out.push({ id: c.id, label, tag: p && p.tag ? PRESET_TAG : null, cost, borrow: cost > 0 && cost > Math.max(0, s.money), travelMethod: method || null, cheap: CHEAP.test(c.label) });
    }
    const wealthy = s.flags && (s.flags.status === 'rich' || s.flags.status === 'wealthy');
    const kept = wealthy ? out.filter((c) => !c.cheap) : out;
    const list = kept.length >= 2 ? kept : out;
    list.forEach((c) => delete c.cheap);
    return list.length ? list : null;
  }

  function card(kind, src, o) {
    return {
      kind, id: src.id, title: src.title, body: src.body || '',
      sources: src.sources || [], heavy: !!src.heavy, major: !!src.major, fx: src.fx || null,
      choices: null, picked: null, result: null, ...o
    };
  }

  function worldCards(s, data, settings) {
    if (s.year > LAST_REAL_YEAR) return [];
    const rank = [];
    for (const e of data.worldEvents || []) {
      if (e.year !== s.year) continue;
      if (s.season !== null && e.season !== s.season) continue;
      if (settings.hideHeavy && e.heavy) continue;
      const here = e.scope === 'province' && (e.provinces || []);
      const matches = (id) => here && here.some(province => KI.tables.provinceName(data, province, s.year) === KI.tables.provinceName(data, id, s.year));
      if (s.loc.kind === 'isan') {
        if (matches(s.loc.province)) rank.push([0, 'world', e]);
        else if (e.scope === 'isan') rank.push([1, 'world', e]);
        else if (e.scope === 'national') rank.push([2, 'world', e]);
      } else if (matches(s.home.province)) rank.push([0, 'home-news', e]);
      else if (e.scope === 'national') rank.push([1, 'world', e]);
    }
    return rank
      .map((r, i) => [r, i])
      .sort((a, b) => a[0][0] - b[0][0] || a[1] - b[1])
      .slice(0, MAX_WORLD)
      .map(([r]) => card(r[1], r[2]));
  }

  function forRole(when, r) {
    if (!when) return false;
    const role = when.role;
    if (role === r || (Array.isArray(role) && role.includes(r))) return true;
    return Array.isArray(when.any) && when.any.some((w) => forRole(w, r));
  }

  const REPEAT_CHANCE = 0.35;
  const STORY_THEMES = [
    ['debt', /debt|loan|credit|collector|shark/],
    ['overseas', /abroad|phinoi|illegalKorea|undocumented|returnee/],
    ['parent', /parent|father|mother|dad|mom/],
    ['romance', /partner|marriage|marry|wedding|divorce|breakup/],
    ['children', /child|kids|parenthood|grandchild/],
    ['injury', /injury|accident|disability/],
    ['health', /health|illness|hospital|sick/],
    ['housing', /house|mortgage|housing/],
    ['career', /career|job|work|retire|burnout/]
  ];
  function storyTheme(id) {
    const match=STORY_THEMES.find(([,pattern])=>pattern.test(id));
    return match ? match[0] : null;
  }

  const PARENT_TEXT = new Map();
  function awayOnly(when) {
    const loc = when && when.loc;
    return !!loc && [].concat(loc).every((l) => l === 'bangkok' || l === 'abroad');
  }
  function parentText(x) {
    if (!PARENT_TEXT.has(x)) {
      const t = [x.title, x.body, ...(x.choices || []).flatMap((c) => [c.label, c.text, ...(c.roll || []).map((r) => r.text)])].filter(Boolean).join(' ')
        .replace(/พ่อแม่(ของ)?(แฟน|คนรัก|สามี|ภรรยา|เขา|เธอ|เด็ก|นักเรียน|ลูกศิษย์|เพื่อน)|แม่(น้ำ|ค้า|ยาย|บ้าน|ครัว|ทัพ|ไก่|ชี|ม่าย|ของลูก|ลูกอ่อน|เลี้ยงเดี่ยว|หมา|แมว)|พ่อ(ค้า|ตา|บ้าน|ครัว|ของลูก|เลี้ยงเดี่ยว|หมอ)|เป็น(พ่อแม่|พ่อ|แม่)/g, '');
      PARENT_TEXT.set(x, { sib: /พี่น้อง|น้องชาย|น้องสาว|พี่ชาย|พี่สาว/.test(t.replace(/พี่น้อง(ใน|ชาว|ร่วม|คนอีสาน|แรงงาน)|เหมือนพี่น้อง/g, '')), rent: /ห้องเช่า|เจ้าของห้อง|คนที่พักด้วย|ค่าเช่าห้อง|หอพัก/.test(t), home: /คนที่บ้าน|ทางบ้าน|ที่บ้านถาม|โทรกลับบ้าน|ติดต่อกลับบ้าน/.test(t) || (awayOnly(x.when) && /กลับบ้าน|ที่บ้าน/.test(t)), both: /พ่อแม่/.test(t), mom: /แม่/.test(t.replace(/พ่อแม่/g, '')), dad: /พ่อ/.test(t.replace(/พ่อแม่/g, '')) });
    }
    return PARENT_TEXT.get(x);
  }
  function misfit(x, s) {
    const p = parentText(x), f = s.flags || {}, own = s.year - s.birthYear < 25 || !f.child;
    if (f.noParents && own && (p.both || p.mom || p.dad)) return true;
    if ((f.status === 'rich' || f.status === 'wealthy') && /^away-\d+$/.test(x.id)) return true;
    if (f.homeHere && p.rent) return true;
    if (p.sib && !f.hasSiblings && !/hasSiblings|youngSibling|elderSibling|siblingInBkk/.test(JSON.stringify(x.when || {}))) return true;
    if (/parentsAlive|fatherAlive|motherAlive|parentPassed|elderParent/.test(JSON.stringify(x.when || {}))) return false;
    if (p.home && !f.parentsAlive && !f.grandparentsAlive && !f.hasSiblings) return true;
    return own && ((p.both && !f.parentsAlive) || (p.mom && !f.motherAlive) || (p.dad && !f.fatherAlive));
  }

  function storyCard(s, data, settings, rng, excluded) {
    const hidden = (x) => (settings.hideHeavy && x.heavy) || ((s.role === 'monk' || s.role === 'prisoner') && !forRole(x.when, s.role));
    const eligible = (x) => x.id !== excluded && x.id !== 'have-child' && !x.reflectionOnly && !hidden(x) && !misfit(x, s) && cooled(s, x.id, x.cooldown) && KI.cond.test(x.when, s, rng);
    const decisions = (data.decisions || []).filter(eligible);
    const choose = (pool) => rng.weighted(pool, (x) => typeof x.w === 'number' ? x.w : 10);
    let selected = choose(decisions.filter((x) => x.urgent));
    if (selected) return card('decision', selected, { major: selected.major !== false, choices: choicesOf(selected, s, rng, data) });
    const personal = rng.chance(PERSONAL_CHANCE) ? (data.personalEvents || []).filter(eligible) : [];
    const recent=new Set(Object.entries(s.seen).filter(([,turn])=>s.t-turn<6).map(([id])=>storyTheme(id)).filter(Boolean));
    if(excluded && storyTheme(excluded))recent.add(storyTheme(excluded));
    const entries=[...decisions.map(item=>({item,kind:'decision'})),...personal.map(item=>({item,kind:'personal'}))];
    const pick=(pool)=>{const varied=pool.filter(({item})=>!recent.has(storyTheme(item.id)));return rng.weighted(varied.length?varied:pool,({item})=>typeof item.w==='number'?item.w:10);};
    let chosen=pick(entries.filter(({item})=>!(item.id in s.seen)));
    if(!chosen && rng.chance(REPEAT_CHANCE))chosen=pick(entries);
    return chosen ? card(chosen.kind,chosen.item,{major:chosen.kind==='decision' && chosen.item.major!==false,choices:choicesOf(chosen.item,s,rng,data)}) : null;
  }

  function quietCard(s, rng) {
    const set = s.loc.kind === 'isan' && s.loc.setting === 'rural' ? QUIET.rural : QUIET.city;
    const list = set[s.season];
    const i = rng.int(list.length);
    return card('quiet', { id: 'quiet-' + s.season + '-' + i, title: QUIET_TITLES[s.season], body: list[i] });
  }

  function words(state, text) {
    if (typeof text === 'string' && state.loc && state.loc.kind !== 'isan') text = text.replace(/ในหมู่บ้าน(?!จัดสรร)/g, 'ในละแวกบ้าน');
    if (typeof text !== 'string' || text.indexOf('{') < 0) return text;
    const female = state.sex === 'f';
    const partner = state.family && state.family.partner;
    const partnerFemale = partner && partner.sex ? partner.sex === 'f' : !female;
    const map = {
      '{ผม}': female ? 'ฉัน' : 'ผม', '{ครับ}': female ? 'ค่ะ' : 'ครับ', '{คะ}': female ? 'คะ' : 'ครับ',
      '{แฟน}': partnerFemale ? 'แฟนสาว' : 'แฟนหนุ่ม', '{คู่}': partnerFemale ? 'ภรรยา' : 'สามี', '{เขา}': partnerFemale ? 'เธอ' : 'เขา',
      '{ลูกผู้}': female ? 'ลูกสาว' : 'ลูกชาย', '{พี่}': female ? 'พี่สาว' : 'พี่ชาย', '{น้อง}': female ? 'น้องสาว' : 'น้องชาย',
      '{หนุ่มสาว}': female ? 'สาว' : 'หนุ่ม', '{นาย}': female ? 'นาง' : 'นาย'
    };
    return text.replace(/\{[^{}]{1,10}\}/g, (m) => (m in map ? map[m] : m));
  }

  function localize(state, cards) {
    return cards.map((c) => ({ ...c, title: words(state, c.title), body: words(state, c.body), choices: c.choices ? c.choices.map((x) => ({ ...x, label: words(state, x.label) })) : c.choices }));
  }

  function build(state, data, settings, rng) {
    settings = settings || {};
    const age = state.year - state.birthYear;
    const head = {
      yearBE: state.year + 543, yearCE: state.year, age, season: state.season,
      place: placeLabel(data, state.loc, state.year, true) + (state.loc.kind === 'abroad' ? ' (กลับไทยที่ ' + KI.tables.provinceName(data, state.home.province, state.year) + ')' : ''), roleLabel: roleLabel(state),
      future: state.year > LAST_REAL_YEAR
    };
    const cards = worldCards(state, data, settings);
    let nextReflectionYear = null, reflectionId = null;
    if (state.season === 0 && age >= 6 && (!Number.isFinite(state.nextReflectionYear) || state.year >= state.nextReflectionYear)) {
      const candidates = ['have-child','reflect-parenthood','reflect-retirement','child-with-grandparents','career-abroad-return','career-returnee-next','career-burnout','after-p6','after-m3'];
      const entries = [...(data.decisions || []).map((item) => ({item,kind:'decision'})),...(data.personalEvents || []).map((item) => ({item,kind:'personal'}))];
      const available = entries.filter(({item}) => candidates.includes(item.id) && !(settings.hideHeavy && item.heavy) && !misfit(item,state) && cooled(state,item.id,item.cooldown) && KI.cond.test(item.when,state,rng));
      const priorities = available.filter(({item}) => item.id === 'have-child' || item.id === 'reflect-parenthood' || item.id === 'reflect-retirement');
      const reflection = rng.weighted(priorities.length ? priorities : available, ({item}) => typeof item.w === 'number' ? item.w : 10);
      const opts = (data.focus || []).filter((f) => KI.cond.test(f.when, state, rng) && (state.role !== 'monk' || ['merit', 'study', 'health'].includes(f.id)) && (state.role !== 'prisoner' || ['study', 'health', 'merit'].includes(f.id)));
      if (reflection) {
        reflectionId = reflection.item.id;
        cards.push(card(reflection.kind, reflection.item, {title:FOCUS_TITLE+' · '+reflection.item.title,major:true,reflection:true,choices:choicesOf(reflection.item,state,rng,data)}));
      } else if (opts.length) {
        cards.push(card('focus', { id: 'focus', title: FOCUS_TITLE, body: FOCUS_BODY }, {
          reflection:true,choices: opts.map((f) => ({ id: f.id, label: f.label, tag: null }))
        }));
      }
      if (reflection || opts.length) nextReflectionYear = state.year + 5 + rng.int(6);
    }
    const story = storyCard(state, data, settings, rng, reflectionId);
    if (story) cards.push(story);
    if (!cards.some((c) => c.kind !== 'world' && c.kind !== 'home-news')) cards.push(quietCard(state, rng));
    return { head, cards: localize(state, cards), nextReflectionYear };
  }

  KI.turn = { words, build, choicesOf, roleLabel, placeLabel, ROLE_LABELS };
})();
