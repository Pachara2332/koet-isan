globalThis.KI = globalThis.KI || {};
(function () {
  const PROVINCES = ['kalasin', 'khon-kaen', 'chaiyaphum', 'nakhon-phanom', 'nakhon-ratchasima', 'bueng-kan', 'buriram',
    'maha-sarakham', 'mukdahan', 'yasothon', 'roi-et', 'loei', 'sisaket', 'sakon-nakhon', 'surin', 'nong-khai',
    'nong-bua-lamphu', 'udon-thani', 'ubon-ratchathani', 'amnat-charoen'];
  const NAMES = {
    m: ['สมศักดิ์', 'ประเสริฐ', 'อนุชา', 'ธนากร', 'วีระพงษ์', 'กิตติพงษ์', 'บุญมี', 'วิชัย', 'สุรชัย', 'สมชาย', 'อำนาจ', 'ไพศาล', 'วสันต์', 'ชัยวัฒน์', 'นพดล', 'ศุภชัย', 'ธวัชชัย', 'ภูวดล', 'พงศกร', 'ณัฐวุฒิ', 'ภาคิน', 'ก้องภพ', 'ชาญชัย', 'สิทธิชัย'],
    f: ['สุภาพร', 'วันเพ็ญ', 'กาญจนา', 'อรอุมา', 'จันทร์เพ็ญ', 'พรทิพย์', 'สมพร', 'บุญเรือน', 'อำพร', 'สายใจ', 'วาสนา', 'รัตนา', 'ดวงใจ', 'มาลี', 'สุชาดา', 'พิมพ์ใจ', 'นภา', 'ศิริพร', 'อรทัย', 'ชลธิชา', 'ธัญญา', 'นิตยา', 'กมลชนก', 'ปาริชาติ']
  };
  const START_HEALTH = { poor: 65, mid: 70, rich: 75 };
  const RURAL_CHANCE = 0.75;
  const DEFAULT_POVERTY = 40;
  const RICH_SHARE = 0.2;
  const PADDY_TONS = 2;
  const SICK_MORTALITY = 1.5;
  const MAX_AGE = 100;
  const SKIP_LIMIT = 400;
  const SCHOOL_AGE = 6;
  const INCOME_AGE = 15;
  const TALENTS = ['music', 'sport', 'art', 'math', 'computer', 'gaming', 'chess', 'language', 'cooking', 'craft', 'speech', 'mechanic', 'muaythai', 'farming'];
  const BIZ_INCOME = [0, 25, 70, 180, 450, 1100, 2500];

  const LEVELS = { school: 12, novice: 12, voc: 3, hvoc: 2, uni: 4, med: 6 };
  const MARKS = {
    school: { 6: 'p6', 9: 'm3', 12: 'm6' }, novice: { 6: 'p6', 9: 'm3', 12: 'm6' },
    voc: { 3: 'pvc' }, hvoc: { 2: 'pvs' }, uni: { 4: 'ba' }, med: { 6: 'ba' }
  };
  const TOP_RANK = { none: 0, p6: 1, m3: 2, m6: 3, pvc: 3, pvs: 4, ba: 5 };
  const TOP_LABELS = {
    none: 'ไม่ได้เรียนในระบบ', p6: 'ประถมศึกษาปีที่ 6', m3: 'มัธยมศึกษาปีที่ 3', m6: 'มัธยมศึกษาปีที่ 6',
    pvc: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', pvs: 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)', ba: 'ปริญญาตรี'
  };
  const PIN_LABELS = { p6: 'จบ ป.6', m3: 'จบ ม.3', m6: 'จบ ม.6', pvc: 'จบ ปวช.', pvs: 'จบ ปวส.', ba: 'จบปริญญาตรี' };
  const CAUSES = {
    'old-age': 'ชราภาพ', illness: 'เจ็บป่วย', road: 'อุบัติเหตุทางถนน', drown: 'จมน้ำ', accident: 'อุบัติเหตุ',
    work: 'อุบัติเหตุจากการทำงาน', liver: 'โรคตับและท่อน้ำดี', cancer: 'มะเร็ง', stroke: 'หลอดเลือดสมอง',
    heart: 'โรคหัวใจ', kidney: 'ไตวาย', diabetes: 'เบาหวานและโรคแทรกซ้อน', dengue: 'ไข้เลือดออก', snake: 'งูกัด',
    lightning: 'ฟ้าผ่า', electric: 'ไฟฟ้าดูด', fight: 'ถูกทำร้ายจากการทะเลาะวิวาท', alcohol: 'พิษสุราเรื้อรัง',
    hiv: 'โรคเอดส์', abroad: 'เสียชีวิตขณะทำงานต่างประเทศ', fire: 'ไฟไหม้', fall: 'พลัดตกจากที่สูง',
    'prison-fight': 'ถูกทำร้ายในเรือนจำ', 'prison-illness': 'ป่วยหนักระหว่างต้องโทษในเรือนจำ', 'debt-fight': 'ถูกลูกหนี้ทำร้ายขณะทวงหนี้'
  };
  const ILLNESS = [['cancer', 3], ['stroke', 3], ['heart', 3], ['kidney', 1], ['illness', 2]];
  const OTHER_CAUSE = 'เหตุไม่คาดฝัน';
  const COHORT = {
    ba: { label: 'เรียนจบปริญญาตรี', you: (s) => (s.edu.top === 'ba' ? 'จบ' : 'ไม่จบ'), unit: '%' },
    m6: { label: 'เรียนจบ ม.6 หรือเทียบเท่าขึ้นไป', you: (s) => (TOP_RANK[s.edu.top] >= 3 ? 'จบ' : 'ไม่จบ'), unit: '%' },
    lifeExpectancy: { label: 'อายุคาดเฉลี่ยแรกเกิดของประเทศไทย ณ ปีเกิด', you: (s, age) => age + ' ปี', unit: ' ปี' }
  };

  function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function ageOf(s) {
    return s.year - s.birthYear;
  }

  function mergeDeltas(a, b) {
    const out = a.map((x) => ({ k: x.k, d: x.d }));
    for (const x of b) {
      const hit = out.find((y) => y.k === x.k);
      if (hit) hit.d += x.d;
      else out.push({ k: x.k, d: x.d });
    }
    return out.filter((x) => x.d !== 0);
  }

  function newGame(cfg, data) {
    cfg = { ...(cfg || {}) };
    const preset = cfg.preset && data.presets && data.presets[cfg.preset];
    if (preset) Object.assign(cfg, preset.cfg);
    const rng = KI.rng.make(typeof cfg.seed === 'number' ? cfg.seed : Date.now());
    const sex = cfg.sex || rng.pick(['m', 'f']);
    const birthYear = typeof cfg.birthYear === 'number' ? cfg.birthYear : 1970 + rng.int(39);
    const ids = data.places && data.places.provinces ? Object.keys(data.places.provinces) : PROVINCES;
    const province = cfg.province || rng.pick(ids);
    const setting = cfg.setting || (rng.chance(RURAL_CHANCE) ? 'rural' : 'urban');
    let wealth = cfg.wealth;
    if (!wealth) {
      const rows = data.stats && data.stats.poverty;
      const poor = (rows && rows.length ? KI.tables.at(rows, birthYear) : DEFAULT_POVERTY) / 100;
      const r = rng.next();
      wealth = r < poor ? 'poor' : r < poor + (1 - poor) * (1 - RICH_SHARE) ? 'mid' : 'rich';
    }
    const given = cfg.traits || {};
    const traits = {};
    for (const k of ['attach', 'grit', 'social']) traits[k] = typeof given[k] === 'number' ? given[k] : rng.int(101);
    const name = cfg.name || rng.pick(NAMES[sex] || NAMES.m);
    const learn = Math.round((0.55 + (rng.next() + rng.next() + rng.next()) / 3 * 0.9) * 100) / 100;
    const gifts = {};
    const giftCount = rng.weighted([[0, 25], [1, 50], [2, 20], [3, 5]], (x) => x[1])[0];
    const pool = TALENTS.slice();
    for (let i = 0; i < giftCount; i++) gifts[pool.splice(rng.int(pool.length), 1)[0]] = rng.weighted([[1, 55], [2, 33], [3, 12]], (x) => x[1])[0];
    return {
      v: 1, rng: rng.state(), t: 0,
      name, sex, birthYear, year: birthYear, season: null,
      home: { province, setting },
      loc: { kind: 'isan', province, setting, country: null },
      wealth,
      birthWealth: wealth,
      traits,
      talents: { learn, gifts },
      stats: { health: START_HEALTH[wealth] || 70, happy: 60, know: 0, bond: 60 },
      money: 0,
      role: 'child',
      edu: { in: null, grade: 0, top: 'none', place: null },
      flags: {}, conds: [],
      focus: null, preset: preset ? cfg.preset : null, seen: {},
      turn: null,
      log: [],
      death: null
    };
  }

  function sourceOf(data, card) {
    if (card.kind === 'decision') return (data.decisions || []).find((d) => d.id === card.id);
    if (card.kind === 'personal') return (data.personalEvents || []).find((p) => p.id === card.id);
    if (card.kind === 'focus') return { choices: data.focus || [] };
    return null;
  }

  function autoEffects(data, card, s, rng) {
    if (card.kind === 'world') {
      for (const w of (data.worldEffects && data.worldEffects[card.id]) || []) {
        if (KI.cond.test(w.when, s, rng)) return { effects: w.effects || [], text: w.text || '' };
      }
    }
    if (card.kind === 'personal') {
      const src = sourceOf(data, card);
      return { effects: (src && src.effects) || [], text: '' };
    }
    return { effects: [], text: '' };
  }

  function begin(state, data, settings) {
    if (state.death) return state;
    let s = state;
    const rng = KI.rng.make(state.rng);
    let changed = false;
    if (!s.turn) {
      s = clone(s);
      const built = KI.turn.build(s, data, settings || {}, rng);
      s.turn = { head: built.head, cards: built.cards, pin: null };
      for (const c of built.cards) if (c.kind === 'personal' || c.kind === 'decision') s.seen[c.id] = s.t;
      changed = true;
    }
    for (let i = 0; i < s.turn.cards.length; i++) {
      const c = s.turn.cards[i];
      if (c.choices || c.result) continue;
      const fx = s.death ? { effects: [], text: '' } : autoEffects(data, c, s, rng);
      const r = KI.effects.apply(s, fx.effects, data, rng);
      s = r.state;
      if(c.kind==='personal')s=KI.friends.react(s,c.id);
      s.turn.cards[i].result = { text: fx.text, deltas: r.deltas };
      changed = true;
    }
    if (!changed) return state;
    s.rng = rng.state();
    return s;
  }

  function choose(state, data, cardIndex, choiceId) {
    const card = state.turn && state.turn.cards[cardIndex];
    if (state.death || !card || !card.choices || card.picked !== null) return state;
    const shown = card.choices.find((c) => c.id === choiceId);
    const src = sourceOf(data, card);
    const choice = src && (src.choices || []).find((c) => c.id === choiceId);
    if (!shown || !choice) return state;
    const rng = KI.rng.make(state.rng);
    let s = state;
    let text;
    let deltas = [];
    if (card.kind === 'focus') {
      s = clone(s);
      s.focus = choiceId;
      text = 'ปีนี้ตั้งใจทุ่มเทให้: ' + shown.label;
    } else {
      const r = KI.effects.apply(s, choice.effects || [], data, rng);
      s = r.state;
      deltas = r.deltas;
      text = choice.text || '';
      if (choice.roll && !s.death) {
        const x = rng.next();
        let acc = 0;
        for (const o of choice.roll) {
          acc += o.p;
          if (x < acc) {
            const rr = KI.effects.apply(s, o.effects || [], data, rng);
            s = rr.state;
            deltas = mergeDeltas(deltas, rr.deltas);
            text = text ? text + ' ' + (o.text || '') : o.text || '';
            break;
          }
        }
      }
    }
    s.turn.cards[cardIndex].picked = choiceId;
    s.turn.cards[cardIndex].result = { text, deltas };
    s.rng = rng.state();
    return s;
  }

  function canEnd(state) {
    if (!state.turn) return false;
    if (state.death) return true;
    return state.turn.cards.every((c) => !c.choices || c.picked !== null);
  }

  function seasonMoney(s, data) {
    const r = data.stats && data.stats.roles && data.stats.roles[s.role];
    const age=ageOf(s), months=s.season===null?0:[4,5,3][s.season];
    const hours=s.hobbies && [4,16,40,80].includes(s.hobbies.gameCafeHours)?s.hobbies.gameCafeHours:4;
    const gaming=s.hobbies && s.hobbies.gameCafe && age>=7 && s.year>=2000 ? KI.tables.gameCafePrice(s)*hours*months : 0;
    if (age < INCOME_AGE) {
      const wage=KI.tables.wageDay(data,s.year);
      const factor={poor:0.75,mid:1,rich:1.5}[s.wealth] || 1;
      return {income:0,expense:0,familyExpense:Math.round(wage*(s.season===null?30:10)*factor)+gaming,familySupport:0,hobbyExpense:0,familyHobbyExpense:gaming};
    }
    if (!r || s.season === null) return {income:0,expense:0,familyExpense:0,familySupport:0,hobbyExpense:0,familyHobbyExpense:0};
    const wage=KI.tables.wageDay(data,s.year);
    let income=r.incomeDays[s.season]*wage;
    const biz=Math.min(BIZ_INCOME.length-1,(s.counters && s.counters.biz) || 0);
    if(biz && s.role!=='monk')income+=BIZ_INCOME[biz]*wage;
    let expense=r.costDays[s.season]*wage;
    if (!['student','monk','prisoner'].includes(s.role)) {
      const kids=((s.family && s.family.children) || []).filter((c)=>s.year-c.birthYear>=0 && s.year-c.birthYear<22).length;
      expense=expense*({frugal:0.85,comfort:1.3}[s.flags.spendLevel] || 1)+kids*8*wage;
    }
    if (s.role === 'farmer' && s.season === 2 && data.stats.paddy && data.stats.paddy.length) income+=KI.tables.paddyPrice(data,s.year)*PADDY_TONS;
    const supportRate={poor:0.25,mid:0.75,rich:1}[s.wealth] || 0;
    const familySupport=s.role==='student' && age<=22 ? Math.round(expense*supportRate) : 0;
    const hobbyExpense=gaming && s.money+income+familySupport-expense>=gaming?gaming:0;
    expense+=hobbyExpense;
    return {income:Math.round(income),expense:Math.round(expense),familyExpense:0,familySupport,hobbyExpense,familyHobbyExpense:0};
  }

  function promote(s) {
    const e = s.edu;
    if (!e.in) {
      if (ageOf(s) === SCHOOL_AGE && e.top === 'none' && !e.grade) {
        s.edu = { ...e, in: 'school', grade: 1, at: s.t };
        if (s.role === 'child') s.role = 'student';
        return 'เข้าเรียน ป.1';
      }
      return null;
    }
    if (!LEVELS[e.in]) return null;
    if (typeof e.at === 'number' && s.t - e.at < 1) return null;
    let pin = null;
    const done = MARKS[e.in][e.grade];
    if (done && TOP_RANK[done] > (TOP_RANK[e.top] || 0)) {
      e.top = done;
      pin = PIN_LABELS[done];
    }
    if (e.grade >= LEVELS[e.in]) {
      e.in = null;
      e.grade = 0;
      if (s.role === 'student') s.role = s.loc.kind === 'isan' && s.loc.setting === 'rural' ? 'farmer' : 'jobless';
    } else {
      e.grade += 1;
    }
    return pin;
  }

  function deathCheck(s, data, rng) {
    const age = ageOf(s);
    if (age >= MAX_AGE) {
      s.death = { year: s.year, age, cause: 'old-age' };
      return;
    }
    const sick = s.conds.some((c) => c.id === 'sick') ? SICK_MORTALITY : 1;
    const p = KI.tables.mortality(data, age, s.year, s.sex) * clamp(1 + (70 - s.stats.health) / 100, 0.7, 1.7) * sick;
    if (!rng.chance(p)) return;
    let cause = 'illness';
    if (age >= 80 && rng.chance(0.5)) cause = 'old-age';
    else if (age >= 35) cause = rng.weighted(ILLNESS, (x) => x[1])[0];
    if (cause !== 'old-age' && s.flags.drinker && rng.chance(0.3)) cause = 'alcohol';
    if (cause !== 'old-age' && s.flags['hl-diabetes'] && rng.chance(0.4)) cause = 'diabetes';
    s.death = { year: s.year, age, cause };
  }

  function advance(s) {
    s.t += 1;
    if (s.season === null || s.season === 2) {
      s.year += 1;
      s.season = ageOf(s) >= SCHOOL_AGE ? 0 : null;
    } else {
      s.season += 1;
    }
  }

  function end(state, data) {
    if (!canEnd(state)) return state;
    let s = clone(state);
    const rng = KI.rng.make(s.rng);
    const entry = {
      t: s.t, year: s.year, season: s.season, age: ageOf(s), province: s.loc.province, kind: s.loc.kind, role: s.role,
      pin: null, stats: null, money: 0, economy: {income:0,expense:0,familyExpense:0,familySupport:0},
      cards: s.turn.cards.map((c) => ({ kind: c.kind, id: c.id, title: c.title, picked: c.picked, deltas: c.result ? c.result.deltas : [] }))
    };
    let autoPin = null, retirementPin = null;
    if (!s.death) {
      const f = s.focus && s.season !== null && (data.focus || []).find((x) => x.id === s.focus);
      const knowBeforeFocus = s.stats.know;
      if (f) s = KI.effects.apply(s, f.perSeason || [], data, rng).state;
      const hobby = s.hobby && s.season !== null && s.role !== 'monk' && s.role !== 'prisoner' && (data.hobbies || []).find((x) => x.id === s.hobby);
      if (hobby) {
        const cost = ageOf(s) >= INCOME_AGE ? Math.round(hobby.costDays * KI.tables.wageDay(data, s.year)) : 0;
        if (s.money >= cost) s = KI.effects.apply(s, [...hobby.effects, ...(cost ? [{ money: -cost }] : [])], data, rng).state;
      }
      entry.economy = seasonMoney(s, data);
      s.money += entry.economy.income + entry.economy.familySupport - entry.economy.expense;
      if (entry.economy.hobbyExpense || entry.economy.familyHobbyExpense) {
        s.stats.happy = Math.min(100, s.stats.happy + 1);
        if (s.hobbies && s.hobbies.gameCafeHours >= 40) {
          s.stats.health = Math.max(0, s.stats.health - 1);
          if (s.role === 'student' && s.focus === 'study' && s.stats.know > knowBeforeFocus) s.stats.know -= 1;
        }
      }
      s = KI.effects.tick(s, data, rng).state;
      if (s.season === 0) autoPin = promote(s);
      if (s.season === 1 && ageOf(s) >= 60 && (s.role === 'civil' || (s.role === 'teacher' && s.flags.governmentTeacher))) {
        s.flags.retiredFrom = s.role;
        s.role = 'retired';
        retirementPin = 'เกษียณจากราชการ';
      }
      if (s.season === 2 && ageOf(s) >= 45) s.stats.health = Math.max(0, s.stats.health - (ageOf(s) >= 70 ? 2 : 1));
      if (!s.death && (s.season === null || s.season === 2)) deathCheck(s, data, rng);
    }
    entry.pin = s.turn.pin || retirementPin || autoPin;
    entry.stats = { ...s.stats };
    entry.money = s.money;
    s.log.push(entry);
    if (!s.death) advance(s);
    s.turn = null;
    s.rng = rng.state();
    return s;
  }

  function pending(s) {
    return s.turn.cards.some((c) => (c.choices && c.picked === null) || c.major);
  }

  function skip(state, data, settings) {
    let s = state;
    if (s.turn && canEnd(s)) s = end(s, data);
    for (let i = 0; i < SKIP_LIMIT && !s.death; i++) {
      s = begin(s, data, settings);
      if (s.death || pending(s)) return s;
      s = end(s, data);
    }
    return s;
  }

  function auto(state, data, settings) {
    let s = begin(state, data, settings);
    if (!s.turn) return s;
    for (let i = 0; i < s.turn.cards.length; i++) {
      const c = s.turn.cards[i];
      if (s.death || !c.choices || c.picked !== null) continue;
      const rng = KI.rng.make(s.rng);
      const pick = rng.pick(c.choices);
      s = choose({ ...s, rng: rng.state() }, data, i, pick.id);
    }
    return end(s, data);
  }

  function peakOf(log, key) {
    let best = null;
    for (const e of log) {
      const v = key === 'money' ? e.money : e.stats && e.stats[key];
      if (typeof v === 'number' && (!best || v > best.value)) best = { value: v, year: e.year, age: e.age };
    }
    return best;
  }

  function dedupe(list) {
    return list.filter((x, i) => x !== list[i - 1]);
  }

  function summary(state, data) {
    const age = state.death ? state.death.age : ageOf(state);
    const log = state.log || [];
    const places = dedupe(log.map((e) => KI.turn.placeLabel(data, { kind: e.kind, province: e.province, country: null }, e.year, false)));
    const jobs = dedupe(log.map((e) => e.role).filter((r) => r && r !== 'child' && r !== 'student'))
      .map((r) => KI.turn.ROLE_LABELS[r] || r);
    const cohort = (data.stats && data.stats.cohort) || {};
    const compare = [];
    for (const key of Object.keys(COHORT)) {
      const rows = cohort[key];
      if (!Array.isArray(rows) || !rows.length) continue;
      const row = KI.tables.at(rows.map((r) => ({ year: r.year, value: r })), state.birthYear);
      const def = COHORT[key];
      compare.push({ label: def.label, you: def.you(state, age), cohort: row.value + def.unit, source: row.source || '' });
    }
    return {
      name: state.name,
      years: [state.birthYear, state.death ? state.death.year : state.year],
      age,
      cause: state.death ? CAUSES[state.death.cause] || OTHER_CAUSE : null,
      places,
      edu: TOP_LABELS[state.edu.top] || TOP_LABELS.none,
      jobs,
      pins: log.filter((e) => e.pin).map((e) => ({ year: e.year, age: e.age, text: e.pin })),
      peak: { happy: peakOf(log, 'happy'), health: peakOf(log, 'health'), know: peakOf(log, 'know'), money: peakOf(log, 'money') },
      compare
    };
  }

  KI.game = { newGame, begin, choose, canEnd, end, skip, auto, summary };
})();
