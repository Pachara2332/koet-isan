globalThis.KI = globalThis.KI || {};
(function () {
  const LAST_REAL_YEAR = 2026;
  const MAX_WORLD = 2;
  const PERSONAL_CHANCE = 0.8;
  const PRESET_TAG = 'ทางของต้นเรื่อง';
  const FOCUS_TITLE = 'ปีนี้เอาจังได๋';
  const FOCUS_BODY = 'เลือกสิ่งที่จะทุ่มเทให้มากที่สุดตลอดปีนี้ ผลจะค่อยๆ สะสมไปทุกฤดู';

  const ROLE_LABELS = {
    child: 'เด็ก', student: 'นักเรียน', farmer: 'ชาวนา', factory: 'คนงานโรงงาน', construction: 'คนงานก่อสร้าง',
    driver: 'คนขับรถ', civil: 'ข้าราชการ', teacher: 'ครู', office: 'พนักงานออฟฟิศ', trader: 'ค้าขาย',
    abroad: 'แรงงานต่างประเทศ', monk: 'พระสงฆ์', soldier: 'ทหาร', jobless: 'ว่างงาน', prisoner: 'ผู้ต้องขัง', retired: 'เกษียณ',
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

  function roleLabel(s) {
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
    if (loc.kind === 'abroad') return loc.country ? 'ต่างประเทศ (' + loc.country + ')' : 'ต่างประเทศ';
    const name = KI.tables.provinceName(data, loc.province, year);
    return withSetting ? name + ' (' + (loc.setting === 'urban' ? 'ในเมือง' : 'ชนบท') + ')' : name;
  }

  function cooled(s, id, cooldown) {
    if (!(id in s.seen)) return true;
    if (typeof cooldown !== 'number') return false;
    return s.t - s.seen[id] >= cooldown;
  }

  function choicesOf(src, s, rng) {
    if (!src.choices || !src.choices.length) return null;
    const out = [];
    for (const c of src.choices) {
      if (!KI.cond.test(c.when, s, rng)) continue;
      const p = c.preset && s.preset && c.preset[s.preset];
      out.push({ id: c.id, label: (p && p.label) || c.label, tag: p && p.tag ? PRESET_TAG : null });
    }
    return out.length ? out : null;
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

  function storyCard(s, data, settings, rng) {
    const hidden = (x) => (settings.hideHeavy && x.heavy) || ((s.role === 'monk' || s.role === 'prisoner') && !forRole(x.when, s.role));
    for (const d of data.decisions || []) {
      if (hidden(d) || !cooled(s, d.id, d.cooldown)) continue;
      if (!KI.cond.test(d.when, s, rng)) continue;
      return card('decision', d, { major: d.major !== false, choices: choicesOf(d, s, rng) });
    }
    if (!rng.chance(PERSONAL_CHANCE)) return null;
    const pool = (data.personalEvents || []).filter((p) => !hidden(p) && cooled(s, p.id, p.cooldown) && KI.cond.test(p.when, s, rng));
    const p = rng.weighted(pool, (x) => (typeof x.w === 'number' ? x.w : 10));
    if (!p) return null;
    return card('personal', p, { major: false, choices: choicesOf(p, s, rng) });
  }

  function quietCard(s, rng) {
    const set = s.loc.kind === 'isan' && s.loc.setting === 'rural' ? QUIET.rural : QUIET.city;
    const list = set[s.season];
    const i = rng.int(list.length);
    return card('quiet', { id: 'quiet-' + s.season + '-' + i, title: QUIET_TITLES[s.season], body: list[i] });
  }

  function build(state, data, settings, rng) {
    settings = settings || {};
    const age = state.year - state.birthYear;
    const head = {
      yearBE: state.year + 543, yearCE: state.year, age, season: state.season,
      place: placeLabel(data, state.loc, state.year, true), roleLabel: roleLabel(state),
      future: state.year > LAST_REAL_YEAR
    };
    const cards = worldCards(state, data, settings);
    if (state.season === 0 && age >= 6) {
      const opts = (data.focus || []).filter((f) => KI.cond.test(f.when, state, rng) && (state.role !== 'monk' || ['merit', 'study', 'health'].includes(f.id)) && (state.role !== 'prisoner' || ['study', 'health', 'merit'].includes(f.id)));
      if (opts.length) {
        cards.push(card('focus', { id: 'focus', title: FOCUS_TITLE, body: FOCUS_BODY }, {
          choices: opts.map((f) => ({ id: f.id, label: f.label, tag: null }))
        }));
      }
    }
    const story = storyCard(state, data, settings, rng);
    if (story) cards.push(story);
    if (!cards.length) cards.push(quietCard(state, rng));
    return { head, cards };
  }

  KI.turn = { build, roleLabel, placeLabel, ROLE_LABELS };
})();
