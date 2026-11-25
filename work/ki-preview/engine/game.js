globalThis.KI = globalThis.KI || {};
(function () {
  const PROVINCES = ['kalasin', 'khon-kaen', 'chaiyaphum', 'nakhon-phanom', 'nakhon-ratchasima', 'bueng-kan', 'buriram',
    'maha-sarakham', 'mukdahan', 'yasothon', 'roi-et', 'loei', 'sisaket', 'sakon-nakhon', 'surin', 'nong-khai',
    'nong-bua-lamphu', 'udon-thani', 'ubon-ratchathani', 'amnat-charoen'];
  const NAMES = {
    old: {
      m: ['สมศักดิ์', 'ประเสริฐ', 'บุญมี', 'วิชัย', 'สุรชัย', 'สมชาย', 'อำนาจ', 'ไพศาล', 'วสันต์', 'ชัยวัฒน์', 'สมพงษ์', 'ประยูร', 'บุญเลิศ', 'ชาตรี', 'สุวิทย์', 'ทองหล่อ', 'วีระ', 'เสถียร', 'อุดม', 'สำราญ', 'ณรงค์', 'ไพโรจน์', 'สมบัติ', 'บุญช่วย', 'คำพอง', 'ทองใบ', 'บุญส่ง', 'สมหมาย', 'สมบูรณ์', 'ประสิทธิ์', 'สุพจน์', 'บุญธรรม', 'ชูชาติ', 'สุรศักดิ์', 'เกรียงไกร', 'พิชัย', 'มานพ', 'สมเกียรติ', 'ธีระ', 'วิเชียร', 'ประจักษ์', 'บรรจง', 'ศักดิ์ชัย', 'สุนทร', 'อนันต์', 'ไพบูลย์', 'ชาญ', 'สายัณห์', 'บุญยืน', 'คำแสน', 'ทองสุข', 'สมยศ', 'ประสาน', 'วิโรจน์', 'สุเมธ', 'เฉลิม', 'สงวน', 'จำลอง', 'ปัญญา', 'เสน่ห์', 'พยุง', 'สนิท', 'ประเทือง', 'ยุทธนา', 'สมนึก', 'ทวี', 'กิตติ', 'บุญชู', 'สุชาติ', 'วรวุฒิ', 'ประพันธ์', 'อดุลย์', 'ชัยยา', 'สมาน', 'คำมี', 'สุขสันต์', 'อุทัย', 'ธนู', 'ไชยา', 'บัวลอง', 'ทองดี'],
      f: ['สุภาพร', 'วันเพ็ญ', 'กาญจนา', 'อรอุมา', 'จันทร์เพ็ญ', 'พรทิพย์', 'สมพร', 'บุญเรือน', 'อำพร', 'สายใจ', 'วาสนา', 'รัตนา', 'ดวงใจ', 'มาลี', 'สุชาดา', 'พิมพ์ใจ', 'นภา', 'ศิริพร', 'อรทัย', 'นิตยา', 'ประนอม', 'สุนันทา', 'บุษบา', 'ลำดวน', 'จำปา', 'พิมพา', 'อรุณี', 'ทองเหรียญ', 'ละเอียด', 'บัวผัน', 'คำแพง', 'สุพรรณี', 'สุดารัตน์', 'ยุพิน', 'วิไล', 'เพ็ญศรี', 'ศรีสุดา', 'สุพัตรา', 'บังอร', 'จันทร์ทิพย์', 'สมใจ', 'ประภา', 'อัมพร', 'มยุรี', 'ราตรี', 'สุนีย์', 'บุญหลาย', 'สร้อยทอง', 'เยาวลักษณ์', 'วิภา', 'กัลยา', 'เรณู', 'ดารุณี', 'ปราณี', 'สุมาลี', 'รำไพ', 'พัชรี', 'สุกัญญา', 'อุไร', 'จินตนา', 'นงลักษณ์', 'แสงเดือน', 'บัวเรียน', 'คำปุน', 'ทองม้วน', 'สมศรี', 'ชนิดา', 'ลัดดา', 'อุบล', 'วนิดา', 'พิกุล', 'อนงค์', 'บุญยัง', 'มณี', 'หนูเวียง', 'ทองพูน']
    },
    new: {
      m: ['อนุชา', 'ธนากร', 'วีระพงษ์', 'กิตติพงษ์', 'นพดล', 'ศุภชัย', 'ธวัชชัย', 'ภูวดล', 'พงศกร', 'ณัฐวุฒิ', 'ภาคิน', 'ก้องภพ', 'ชาญชัย', 'สิทธิชัย', 'ธนกร', 'ณัฐพล', 'ปิยะพงษ์', 'จิรายุ', 'ธีรภัทร', 'ศุภกร', 'ภานุวัฒน์', 'อภิสิทธิ์', 'ชยพล', 'กฤษดา', 'ณัฐพงศ์', 'วรากร', 'พีรพัฒน์', 'ธนวัฒน์', 'ปฏิภาณ', 'ศักดิ์สิทธิ์', 'เอกชัย', 'สุทธิพงษ์', 'อนุวัฒน์', 'ภัทรพล', 'ธีรวัฒน์', 'จักรพันธ์', 'ณัฐดนัย', 'กฤษณะ', 'ปัณณวัฒน์', 'วุฒิชัย', 'อิทธิพล', 'ธนพล', 'รัฐพล', 'ชนาธิป', 'วชิรวิทย์', 'พงษ์พันธ์', 'ภูริ', 'ปกรณ์', 'ศิวกร', 'กิตติศักดิ์', 'สหรัฐ', 'ธนดล', 'อัครพล', 'ทินกร', 'ธีรศักดิ์', 'ปริญญา', 'กิตติภูมิ', 'ณัฐกิตติ์', 'พชร', 'นันทวัฒน์', 'ภูมิพัฒน์', 'ธีรเดช', 'วรวิทย์', 'อดิศักดิ์', 'สุรเชษฐ์', 'พิทักษ์', 'ศรัณย์', 'ธันวา', 'ปวริศ', 'กันตพงศ์', 'ณัฐวัฒน์', 'จิรพัฒน์', 'ตะวัน', 'ภาณุพงศ์', 'อนันตชัย', 'วัชรพล', 'ทศพล', 'เจษฎา', 'พีรวิชญ์'],
      f: ['ชลธิชา', 'ธัญญา', 'กมลชนก', 'ปาริชาติ', 'พิมพ์ชนก', 'ณัฐธิดา', 'สุธิดา', 'ศศิธร', 'อรอนงค์', 'จิราพร', 'ปิยะนุช', 'กนกวรรณ', 'ณัฐริกา', 'พัชราภรณ์', 'วรรณิศา', 'ธนพร', 'ศิรินทร์', 'อภิญญา', 'ณัฐณิชา', 'เบญจมาศ', 'ชนัญชิดา', 'ปวีณา', 'สุนิสา', 'กัญญารัตน์', 'พรรณนิภา', 'ธิดารัตน์', 'จุฑามาศ', 'วิลาวัณย์', 'อรวรรณ', 'กาญจนาภา', 'มัลลิกา', 'ทิพวรรณ', 'นันทิดา', 'ปภาวดี', 'ภัทรา', 'ณิชา', 'พิชญา', 'ชุติมา', 'สิริกร', 'อัญชลี', 'รุ่งนภา', 'ขวัญใจ', 'ณัฐกานต์', 'ปณิตา', 'ภัทราภรณ์', 'ศุภาวรรณ', 'ธมลวรรณ', 'ปิยธิดา', 'กชกร', 'ญาณิศา', 'พิชชาพร', 'ชญานิศ', 'สุพิชชา', 'วรัญญา', 'อารีรัตน์', 'เกศินี', 'ณัฐนันท์', 'ภาวินี', 'ธนัชพร', 'ลลิตา', 'มนัสนันท์', 'นภัสสร', 'ปุณยวีร์', 'กุลธิดา', 'ธนาภรณ์', 'สุจิตรา', 'เพ็ญพิชชา', 'อริสา', 'ศิริลักษณ์', 'จารุวรรณ', 'กัลยรัตน์', 'ธัญชนก', 'พรนภา', 'รัชนีกร', 'วรรณวิสา', 'อมรรัตน์', 'สุพรรษา', 'จันทร์จิรา']
    }
  };
  const NAME_ERA = 1990;
  const START_HEALTH = { poor: 65, mid: 70, rich: 75 };
  const RURAL_CHANCE = 0.75;
  const DEFAULT_POVERTY = 40;
  const RICH_SHARE = 0.2;
  const PADDY_TONS = 2;
  const PADDY_TONS_MODERN = 3;
  const PADDY_MODERN_YEAR = 2000;
  const SICK_MORTALITY = 1.25;
  const CHILD_MORTALITY = 0.1;
  const ADULT_AGE = 18;
  const HEALTH_RISK = [0.6, 1.4];
  const ELDER_AGE = 60;
  const ALLOWANCE_START = 2009;
  const ALLOWANCE_FLAT = 500;
  const ALLOWANCE_TIERS = [[90, 1000], [80, 800], [70, 700], [60, 600]];
  const REMIT_DAYS = 5;
  const PENSION_DAYS = 40;
  const PARENT_START = { poor: 150, mid: 1200, rich: 6000 };
  const PARENT_PAY_DAYS = 600;
  const REMIT_AGE = 22;
  const MONTHS = [4, 5, 3];
  const INCOME_SCALE = 0.4;
  const COST_BASE = 30;
  const SALARY_ROLES = ['civil', 'teacher'];
  const DEBT_TIERS = [
    { level: 'crushing', below: -300, rate: 0.05, happy: -3, health: -1, bond: -1, label: 'หนี้ล้นตัว' },
    { level: 'heavy', below: -100, rate: 0.05, happy: -3, health: -1, bond: -1, label: 'หนี้หนัก' },
    { level: 'small', below: 0, rate: 0.03, happy: -2, health: 0, bond: 0, label: 'หนี้เล็ก' }
  ];
  const INTEREST_CAP = 2;
  const PARENT_YES = { poor: 0.5, mid: 0.8, rich: 0.95 };
  const PRIME_AGE_MORTALITY = 0.35;
  const OLDER_MORTALITY = 0.85;
  const MAX_AGE = 100;
  const SKIP_LIMIT = 400;
  const SCHOOL_AGE = 6;
  const INCOME_AGE = 15;
  const PET_COST = { dog: 4, cat: 3 };
  const ABROAD_MAX_YEARS = 20;
  const PARENT_CARE_DAYS = 18;
  const OFFICE_PAY_DAYS = [0, 85, 210, 900];
  const OFFICE_NAMES = ['', 'ผู้ใหญ่บ้าน', 'นายก อบต.', 'ส.ส.'];
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
    'prison-fight': 'ถูกทำร้ายในเรือนจำ', 'prison-illness': 'ป่วยหนักระหว่างต้องโทษในเรือนจำ', 'debt-fight': 'ถูกลูกหนี้ทำร้ายขณะทวงหนี้', 'debt-collector': 'ถูกเจ้าหนี้นอกระบบทำร้าย'
  };
  const CAUSE_DETAIL = {
    'old-age': ['หลับไปอย่างสงบที่บ้าน ท่ามกลางลูกหลาน', 'ร่างกายอ่อนแรงลงตามวัย และจากไปอย่างสงบในคืนหนึ่ง', 'ล้มป่วยเล็กน้อยตามวัย แล้วจากไปอย่างสงบในโรงพยาบาลอำเภอ'],
    illness: ['ปอดติดเชื้อรุนแรง รักษาไม่ทัน', 'ติดเชื้อในกระแสเลือด', 'ไข้สูงหลายวัน กว่าจะถึงโรงพยาบาลก็สายไป'],
    cancer: ['มะเร็งปอดระยะที่ 4 ตรวจพบเมื่อลุกลามแล้ว', 'มะเร็งตับระยะลุกลาม', 'มะเร็งลำไส้ใหญ่ระยะที่ 4', 'มะเร็งเต้านมระยะลุกลาม', 'มะเร็งปากมดลูกระยะที่ 4'],
    liver: ['มะเร็งท่อน้ำดีระยะที่ 4 จากพยาธิใบไม้ตับที่สะสมมานาน', 'ตับแข็งระยะสุดท้ายจากพยาธิใบไม้ตับ'],
    stroke: ['เส้นเลือดในสมองแตก หมดสติกะทันหัน', 'เส้นเลือดในสมองตีบ ล้มลงในห้องน้ำ', 'เส้นเลือดในสมองแตกจากความดันสูงที่ไม่ได้รักษา'],
    heart: ['หัวใจวายเฉียบพลันขณะนอนหลับ', 'กล้ามเนื้อหัวใจขาดเลือด เจ็บหน้าอกแล้วไปโรงพยาบาลไม่ทัน'],
    kidney: ['ไตวายเรื้อรังระยะสุดท้าย หลังฟอกไตมาหลายปี', 'ไตวายระยะสุดท้าย ไม่มีทุนฟอกไตต่อเนื่อง'],
    diabetes: ['แผลเบาหวานที่เท้าติดเชื้อลุกลาม', 'เบาหวานแทรกซ้อนจนไตวาย'],
    alcohol: ['ตับแข็งระยะสุดท้ายจากการดื่มสุราเรื้อรัง', 'เลือดออกในกระเพาะจากพิษสุราเรื้อรัง'],
    road: ['มอเตอร์ไซค์ชนกับรถกระบะ ไม่ได้สวมหมวกกันน็อก', 'รถตู้โดยสารเสียหลักตกข้างทางช่วงเทศกาล', 'ขี่มอเตอร์ไซค์กลับจากวงเหล้าแล้วชนท้ายรถบรรทุก'],
    fight: ['ถูกยิงเสียชีวิตหลังมีปากเสียงกับคนเมาในงานบุญ', 'ถูกแทงหลังทะเลาะวิวาทในวงเหล้า', 'ถูกยิงหลังกวนประสาทคู่อริในงานวัด'],
    drown: ['จมน้ำขณะหาปลาในหนองน้ำ', 'จมน้ำในแม่น้ำช่วงน้ำหลาก'],
    dengue: ['ไข้เลือดออกระยะช็อก'],
    snake: ['ถูกงูเห่ากัดกลางทุ่งนา ไปโรงพยาบาลไม่ทัน'],
    lightning: ['ถูกฟ้าผ่ากลางทุ่งนาช่วงฝนตก'],
    electric: ['ไฟฟ้าดูดขณะซ่อมสายไฟในบ้าน'],
    work: ['พลัดตกจากนั่งร้านในไซต์ก่อสร้าง', 'เครื่องจักรในโรงงานหนีบ'],
    hiv: ['ภาวะแทรกซ้อนจากโรคเอดส์ ในยุคที่ยาต้านไวรัสยังเข้าไม่ถึง'],
    'debt-collector': ['ถูกคนของเจ้าหนี้นอกระบบทำร้ายจนเสียชีวิต']
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

  function petText(s, t) {
    if (typeof t !== 'string' || t.indexOf('{') < 0) return t;
    const pets = s.pets || [], alive = pets.filter((p) => p.alive), lost = pets.filter((p) => !p.alive).slice(-1)[0];
    const name = (p) => (p && p.name) || 'เจ้าตัวเล็ก';
    return t.replace(/\{(pet|dog|cat)\}/g, (m, k) => name(k === 'pet' ? (s.flags['pet-grief'] && lost) || alive[0] : alive.find((p) => p.kind === k)));
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
    const namePool = NAMES[birthYear < NAME_ERA ? 'old' : 'new'][sex] || NAMES.new.m;
    const avoid = new Set(cfg.avoidNames || []);
    const fresh = namePool.filter((n) => !avoid.has(n));
    const name = cfg.name || rng.pick(fresh.length ? fresh : namePool);
    const learn = Math.round((0.55 + (rng.next() + rng.next() + rng.next()) / 3 * 0.9) * 100) / 100;
    const gifts = {};
    const giftCount = rng.weighted([[0, 25], [1, 50], [2, 20], [3, 5]], (x) => x[1])[0];
    const pool = TALENTS.slice();
    for (let i = 0; i < giftCount; i++) gifts[pool.splice(rng.int(pool.length), 1)[0]] = rng.weighted([[1, 55], [2, 33], [3, 12]], (x) => x[1])[0];
    const disabilityRoll=rng.int(300);
    const disability=disabilityRoll===0?'birth':null;
    const disabilityAccidentAge=disabilityRoll===1?8+rng.int(68):null;
    return {
      v: 1, rng: rng.state(), t: 0,
      name, sex, birthYear, year: birthYear, season: null, disability, disabilityAccidentAge, personalityHistory:[],
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

  function personality(state) {
    const history=Array.isArray(state.personalityHistory)?state.personalityHistory:[];
    const kind=history.filter(item=>item.kind==='kind').length, harmful=history.filter(item=>item.kind==='harmful').length;
    if(history.length<2)return {id:'forming',label:'กำลังก่อตัวจากการเลือก',kind,harmful};
    if(kind-harmful>=2)return {id:'kind',label:'มักเห็นใจและช่วยเหลือผู้อื่น',kind,harmful};
    if(harmful-kind>=2)return {id:'harmful',label:'มักเลือกเอาเปรียบหรือทำร้ายผู้อื่น',kind,harmful};
    return {id:'mixed',label:'มีทั้งการช่วยเหลือและการเอาเปรียบ',kind,harmful};
  }
  function characterChoice(choice) {
    const effects=choice.effects||[];
    return choice.character || (effects.some(effect=>effect.inc==='crime' && (effect.d===undefined || effect.d>0))?'harmful':null);
  }
  function restorePersonality(state,data) {
    if(Array.isArray(state.personalityHistory))return state;
    const history=[];
    for(const entry of state.log||[])for(const card of entry.cards||[]) {
      if(!card.picked || String(card.picked).endsWith('@parents'))continue;
      const src=sourceOf(data,card), id=String(card.picked).split('@')[0];
      const choice=src && (src.choices||[]).find(item=>item.id===id);
      const kind=choice && characterChoice(choice);
      if(kind==='kind' || kind==='harmful')history.push({kind,year:entry.year,title:card.title,choice:choice.label});
    }
    return {...state,personalityHistory:history.slice(-8)};
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
    if (s.turn) {
      const index = s.turn.cards.findIndex((c) => c.id === 'biz-grow-3' && c.picked === null);
      const src = index >= 0 && (data.decisions || []).find((d) => d.id === 'biz-grow-3');
      if (src) {
        const choices = KI.turn.choicesOf(src, s, rng, data);
        if (JSON.stringify(choices) !== JSON.stringify(s.turn.cards[index].choices)) {
          s = clone(s);
          s.turn.cards[index].choices = choices;
          changed = true;
        }
      }
    }
    if (!s.turn) {
      s = clone(s);
      if(!s.disability && Number.isFinite(s.disabilityAccidentAge) && s.year-s.birthYear>=s.disabilityAccidentAge) {
        s.disability='accident';s.flags.disabilityAccidentPending=true;s.disabilityAccidentAge=null;
      }
      const built = KI.turn.build(s, data, settings || {}, rng);
      s.turn = { head: built.head, cards: built.cards, pin: null };
      if (built.nextReflectionYear !== null) s.nextReflectionYear = built.nextReflectionYear;
      for (const c of built.cards) if (c.kind === 'personal' || c.kind === 'decision') s.seen[c.id] = s.t;
      if (s.pets) for (const c of s.turn.cards) { c.title = petText(s, c.title); c.body = petText(s, c.body); (c.choices || []).forEach((x) => { x.label = petText(s, x.label); }); }
      changed = true;
    }
    for (let i = 0; i < s.turn.cards.length; i++) {
      const c = s.turn.cards[i];
      if (c.choices || c.result) continue;
      const fx = s.death ? { effects: [], text: '' } : autoEffects(data, c, s, rng);
      const r = KI.effects.apply(s, fx.effects, data, rng);
      s = r.state;
      if(c.kind==='personal')s=KI.friends.react(s,c.id);
      s.turn.cards[i].result = { text: KI.turn.words(s, fx.text), deltas: r.deltas };
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
    const baseId = String(choiceId).split('@')[0];
    const kidMode = String(choiceId).split('@')[1] || null;
    const choice = src && (src.choices || []).find((c) => c.id === baseId);
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
      const noMoney = (list) => kidMode ? (list || []).filter((e) => typeof e.money !== 'number') : (list || []);
      const cost = kidMode ? moneyCost(choice.effects, s, data) : 0;
      const refused = kidMode === 'parents' && !s.flags.parentsCanPay && !rng.chance(PARENT_YES[s.wealth] || 0.75);
      const extra = kidMode === 'earn' ? [{ stat: 'health', d: -2 }, { stat: 'happy', d: -1 }, { trait: 'grit', d: 2 }] : kidMode === 'parents' && !refused ? [{ stat: 'bond', d: 1 }] : [];
      const r = KI.effects.apply(s, refused ? [{ stat: 'happy', d: -3 }] : [...noMoney(choice.effects), ...extra], data, rng);
      s = r.state;
      deltas = r.deltas;
      text = refused ? 'พ่อแม่บอกว่าช่วงนี้เงินไม่พอ เรื่องนี้ต้องรอไปก่อน' : (kidMode === 'earn' ? 'ช่วยงานรับจ้างและเก็บเงินอยู่หลายสัปดาห์จนพอ ' : kidMode === 'parents' ? 'พ่อแม่ควักเงินให้ ' : '') + (choice.text || '');
      if (kidMode === 'parents' && !refused && cost && Number.isFinite(s.parentsWealth)) s.parentsWealth = s.parentsWealth - cost;
      if (kidMode === 'parents' && !refused && cost) s.financeLog = [...(s.financeLog || []), { year: s.year, age: ageOf(s), label: 'พ่อแม่จ่ายให้ · ' + (src.title || ''), delta: 0, familyExpense: cost, category: 'family' }];
      if (choice.roll && !s.death && !refused) {
        const x = rng.next();
        let acc = 0;
        for (const o of choice.roll) {
          acc += o.p;
          if (x < acc) {
            const rr = KI.effects.apply(s, noMoney(o.effects), data, rng);
            s = rr.state;
            deltas = mergeDeltas(deltas, rr.deltas);
            text = text ? text + ' ' + (o.text || '') : o.text || '';
            break;
          }
        }
      }
      if (shown.travelMethod && s.loc.kind === 'abroad' && (state.loc.kind !== 'abroad' || state.loc.country !== s.loc.country)) s.loc.method = shown.travelMethod;
      if(!refused) {
        const kind=characterChoice(choice);
        if(kind==='kind' || kind==='harmful')s.personalityHistory=[...(s.personalityHistory||[]),{kind,year:s.year,title:card.title,choice:choice.label}].slice(-8);
      }
    }
    s.turn.cards[cardIndex].picked = choiceId;
    s.turn.cards[cardIndex].result = { text: KI.turn.words(s, petText(state, text)), deltas };
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
    const living=livingMonthly(s,data);
    if (age < INCOME_AGE) {
      const factor={poor:0.75,mid:1,rich:1.5}[s.wealth] || 1;
      return {income:0,expense:0,familyExpense:Math.round(living*KI.tables.childWeight(data,age)*(s.season===null?12:months)*factor)+gaming,familySupport:0,hobbyExpense:0,familyHobbyExpense:gaming};
    }
    if (!r || s.season === null) return {income:0,expense:0,familyExpense:0,familySupport:0,hobbyExpense:0,familyHobbyExpense:0};
    const wage=KI.tables.wageDay(data,s.year);
    let income=SALARY_ROLES.includes(s.role) ? KI.tables.salary(data,s.year)*months : r.incomeDays[s.season]*wage*months*INCOME_SCALE;
    const biz=Math.min(BIZ_INCOME.length-1,(s.counters && s.counters.biz) || 0);
    if(biz && s.role!=='monk')income+=BIZ_INCOME[biz]*wage;
    let expense=monthlyCost(s,data)*months;
    if (s.role === 'farmer' && s.season === 2 && data.stats.paddy && data.stats.paddy.length) income+=KI.tables.paddyPrice(data,s.year)*(s.year>=PADDY_MODERN_YEAR?PADDY_TONS_MODERN:PADDY_TONS);
    const allowance=elderAllowance(s);
    const remit=childRemittance(s,wage);
    const pension=s.role==='retired' && s.flags.retiredFrom ? PENSION_DAYS*wage : 0;
    income+=allowance+remit+pension;
    const supportRate=s.flags.parentsCanPay?1:({poor:0.6,mid:0.85,rich:1}[s.wealth] || 0);
    const familySupport=(s.role==='student' && age<=22) || (s.role==='jobless' && age<ADULT_AGE) ? Math.round(expense*supportRate) : 0;
    const hobbyExpense=gaming && s.money+income+familySupport-expense>=gaming?gaming:0;
    expense+=hobbyExpense;
    return {income:Math.round(income),expense:Math.round(expense),familyExpense:0,familySupport,hobbyExpense,familyHobbyExpense:0,allowance,remit,pension:Math.round(pension)};
  }

  function livingMonthly(s, data) {
    return KI.tables.livingCost(data,s.year,KI.tables.livingPlace(s.loc));
  }

  function monthlyCost(s, data) {
    const r=data.stats.roles[s.role], living=livingMonthly(s,data);
    const cost=living*r.costDays[s.season===null?0:s.season]/COST_BASE;
    if (['student','monk','prisoner'].includes(s.role)) return cost;
    const kids=((s.family && s.family.children) || []).reduce((sum,c)=>sum+KI.tables.childWeight(data,s.year-c.birthYear),0);
    return cost*({frugal:0.85,comfort:1.3}[s.flags.spendLevel] || 1)+kids*living;
  }

  function parentRetireAge(s, key) {
    const seed=Array.from((s.name||'')+key).reduce((h,c)=>(Math.imul(h,31)+c.codePointAt(0))>>>0,s.birthYear>>>0);
    return 60+seed%6;
  }

  function parentEarnDays(job) {
    if (!job) return 0;
    if (/ข้าราชการ|ครู|พยาบาล|เจ้าของ|ผู้รับเหมา|โรงสี|หลายแปลง/.test(job)) return 120;
    if (/ค้าขาย|โรงงาน|ช่าง|ขับรถ|อ้อย|เลี้ยงวัว/.test(job)) return 45;
    return 20;
  }

  function parentsIncome(s, data) {
    const wage=KI.tables.wageDay(data,s.year), info=(s.family && s.family.parentInfo) || {};
    let days=0, baht=0;
    const out={working:0,retired:0};
    for (const key of ['father','mother']) {
      const p=info[key];
      if (!p || !Number.isFinite(p.birthYear) || (Number.isFinite(p.deathYear) && s.year>=p.deathYear)) continue;
      const age=s.year-p.birthYear;
      if (age<parentRetireAge(s,key)) { days+=parentEarnDays(p.job); out.working++; }
      else {
        out.retired++;
        if (/ข้าราชการ|ครู/.test(p.job||'')) days+=40;
        else days-=15;
        if (s.year>=ALLOWANCE_START) baht+=12*(s.year>2011?(ALLOWANCE_TIERS.find(([from])=>age>=from)||[0,600])[1]:ALLOWANCE_FLAT);
      }
    }
    out.amount=Math.round(days*wage+baht);
    return out;
  }

  function updateParents(s, data) {
    const wage=KI.tables.wageDay(data,s.year);
    if (!Number.isFinite(s.parentsWealth)) s.parentsWealth=Math.round((PARENT_START[s.birthWealth||s.wealth]||PARENT_START.mid)*wage);
    const alive=s.flags.parentsAlive!==false;
    if (alive && (s.season===null || s.season===2)) {
      const rng=KI.rng.make((s.rng ^ 0x9e3779b9 ^ s.year)>>>0);
      const income=parentsIncome(s,data);
      const assetReturn=s.parentsWealth>=0?s.parentsWealth*(0.01+(rng.next()-0.5)*0.04):s.parentsWealth*0.06;
      s.parentsWealthPrev=s.parentsWealth;
      s.parentsWealth=Math.round(s.parentsWealth+income.amount*(0.8+rng.next()*0.4)+assetReturn);
      s.parentsWork=income;
    }
    s.flags.parentsCanPay=alive && s.parentsWealth>=PARENT_PAY_DAYS*wage;
    s.flags.parentsBroke=alive && s.parentsWealth<0;
  }

  function elderAllowance(s) {
    const age=ageOf(s);
    if (age < ELDER_AGE || s.year < ALLOWANCE_START || s.season === null || s.flags.retiredFrom) return 0;
    const months=s.year===ALLOWANCE_START && s.season===0 ? 1 : MONTHS[s.season];
    const tiered=s.year>2011 || (s.year===2011 && s.season===2);
    const monthly=tiered ? ALLOWANCE_TIERS.find(([from])=>age>=from)[1] : ALLOWANCE_FLAT;
    return monthly*months;
  }

  function childRemittance(s, wage) {
    const grown=((s.family && s.family.children) || []).filter((c)=>s.year-c.birthYear>=REMIT_AGE).length;
    if (!grown || ['monk','prisoner'].includes(s.role)) return 0;
    return Math.round(grown*REMIT_DAYS*wage*clamp(s.stats.bond/60,0.3,1.5));
  }

  function debtTier(s, data) {
    if (ageOf(s) < INCOME_AGE || s.money >= 0 || s.role === 'student') return null;
    const days=s.money/KI.tables.wageDay(data,s.year);
    return DEBT_TIERS.find((t)=>days<t.below) || null;
  }

  function applyDebt(s, data) {
    const tier=debtTier(s,data);
    s.flags.debtLevel=tier ? tier.level : null;
    s.flags.debtHeavy=!!tier && tier.level!=='small';
    s.flags.debtCrushing=!!tier && tier.level==='crushing';
    if (!tier) {
      s.debtInterest=0;
      s.debtPrincipal=0;
      return 0;
    }
    const owed=-s.money, paid=s.debtInterest || 0;
    s.debtPrincipal=Math.max(s.debtPrincipal || 0,owed-paid);
    const interest=Math.max(0,Math.min(Math.round(owed*tier.rate),Math.round(s.debtPrincipal*INTEREST_CAP-paid)));
    s.money-=interest;
    s.debtInterest=paid+interest;
    s.stats.happy=clamp(s.stats.happy+tier.happy,0,100);
    s.stats.health=clamp(s.stats.health+tier.health,0,100);
    s.stats.bond=clamp(s.stats.bond+tier.bond,0,100);
    if (interest) s.financeLog=[...(s.financeLog || []),{year:s.year,age:ageOf(s),label:'ดอกเบี้ย'+tier.label,delta:-interest,familyExpense:0,category:'interest'}];
    return interest;
  }

  function serviceLoans(s) {
    const loans=(s.loans || []).filter((l)=>l.balance>0);
    if (!loans.length) return 0;
    let paid=0;
    const studying=Boolean(s.edu && s.edu.in) || s.role==='student';
    s.loans=loans.map((l)=>{
      if (typeof l.grace==='number' && (studying || l.grace>0)) return studying ? l : { ...l, grace: l.grace-1 };
      const interest=Math.round(l.balance*l.rate);
      const pay=Math.min(l.balance+interest,l.payment);
      const asset=(s.personalAssets||[]).find(item=>item.id===l.assetId), partner=s.family && s.family.partner;
      const contribution=asset && asset.partnerName && partner && partner.name===asset.partnerName && partner.since===asset.partnerSince?Math.min(partner.money,Math.floor(pay/2)):0;
      if(contribution)partner.money-=contribution;
      const ownPay=pay-contribution,short=s.money<ownPay && l.kind==='shark';
      s.money-=ownPay;
      paid+=ownPay;
      if (short) s.flags.sharkLate=true;
      if (s.money<0 && l.kind!=='shark') s.flags.loanDefault=true;
      return { ...l, balance: Math.max(0, l.balance+interest-pay), left: Math.max(0, l.left-1) };
    }).filter((l)=>l.balance>0);
    if (!s.loans.some((l)=>l.kind==='shark')) s.flags.sharkLate=false;
    if (paid) s.financeLog=[...(s.financeLog || []),{year:s.year,age:ageOf(s),label:'ผ่อนเงินกู้',delta:-paid,familyExpense:0,category:'loan'}];
    return paid;
  }

  function debtInfo(state, data) {
    const tier=debtTier(state,data);
    if (!tier) return null;
    const owed=-state.money, paid=state.debtInterest || 0, principal=Math.max(state.debtPrincipal || 0,owed-paid);
    return { level: tier.level, label: tier.label, rate: tier.rate, interest: Math.max(0,Math.min(Math.round(owed*tier.rate),Math.round(principal*INTEREST_CAP-paid))) };
  }

  function moneyCost(effects, s, data) {
    let cost=0;
    for (const e of effects || []) if (typeof e.money === 'number' && e.money < 0) cost+=-(e.unit==='wageDay' ? e.money*KI.tables.wageDay(data,s.year) : e.money);
    return Math.round(cost);
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
      if (s.role === 'student') s.role = ageOf(s) < INCOME_AGE ? 'child' : 'jobless';
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
    const ageFactor = age < ADULT_AGE ? CHILD_MORTALITY : age < 50 ? PRIME_AGE_MORTALITY : OLDER_MORTALITY;
    const p = KI.tables.mortality(data, age, s.year, s.sex) * clamp(1 + (70 - s.stats.health) / 100, HEALTH_RISK[0], HEALTH_RISK[1]) * sick * ageFactor;
    if (!rng.chance(p)) return;
    let cause = 'illness';
    if (age >= 80 && rng.chance(0.5)) cause = 'old-age';
    else if (age >= 35) cause = rng.weighted(ILLNESS, (x) => x[1])[0];
    if (cause !== 'old-age' && s.flags.drinker && rng.chance(0.3)) cause = 'alcohol';
    if (cause !== 'old-age' && s.flags['hl-diabetes'] && rng.chance(0.4)) cause = 'diabetes';
    if (cause !== 'old-age' && age >= 40 && s.flags.rawFish && rng.chance(0.35)) cause = 'liver';
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
      cashFlow:[],
      cards: s.turn.cards.map((c) => ({ kind: c.kind, id: c.id, title: c.title, body:c.body, picked: c.picked, choice:(c.choices||[]).find(choice=>choice.id===c.picked)?.label || '', resultText:c.result?.text || '', deltas: c.result ? c.result.deltas : [] }))
    };
    let autoPin = null, retirementPin = null;
    if (!s.death) {
      const f = s.focus && s.season !== null && (data.focus || []).find((x) => x.id === s.focus);
      const knowBeforeFocus = s.stats.know;
      let moneyBefore=s.money;
      if (f && KI.cond.test(f.when,s,rng) && (s.role !== 'monk' || ['merit','study','health'].includes(f.id)) && (s.role !== 'prisoner' || ['study','health','merit'].includes(f.id))) s = KI.effects.apply(s, f.perSeason || [], data, rng).state;
      else if (f) s.focus = null;
      if(s.money!==moneyBefore)entry.cashFlow.push({label:'สิ่งที่เน้น: '+f.label,delta:s.money-moneyBefore});
      const hobby = s.hobby && s.season !== null && s.role !== 'monk' && s.role !== 'prisoner' && (data.hobbies || []).find((x) => x.id === s.hobby);
      moneyBefore=s.money;
      if (hobby) {
        const cost = ageOf(s) >= INCOME_AGE ? Math.round(hobby.costDays * KI.tables.wageDay(data, s.year)) : 0;
        if (s.money >= cost) s = KI.effects.apply(s, [...hobby.effects, ...(cost ? [{ money: -cost }] : [])], data, rng).state;
      }
      if(s.money!==moneyBefore)entry.cashFlow.push({label:'งานอดิเรก: '+hobby.label,delta:s.money-moneyBefore});
      updateParents(s, data);
      entry.economy = seasonMoney(s, data);
      s.parentsWealth = s.parentsWealth - (entry.economy.familySupport || 0) - (entry.economy.familyExpense || 0);
      s.flags.parentsBroke = s.flags.parentsAlive !== false && s.parentsWealth < 0;
      const partner=s.family && s.family.partner;
      if(partner && s.season!==null && s.flags.partner){
        const months=[4,5,3][s.season], age=s.year-partner.birthYear, wage=KI.tables.wageDay(data,s.year);
        if(age>=65)partner.job='เกษียณ';
        else if(age>=18 && partner.job==='ยังไม่ทำงาน')partner.job=partner.location.kind==='abroad'?'แรงงานต่างประเทศ':'รับจ้างทั่วไป';
        const income=age>=18 && age<65?Math.round(wage*(partner.location.kind==='abroad'?55:20)*months):0;
        const cost=Math.round(KI.tables.livingCost(data,s.year,KI.tables.livingPlace(partner.location))*months);
        partner.money+=income;
        const paid=Math.min(partner.money,cost);partner.money-=paid;partner.lastIncome=income;partner.lastExpense=paid;
        if(partner.splitExpenses && KI.family.together(s,partner)){
          const share=Math.min(partner.money,Math.round(entry.economy.expense/2));partner.money-=share;entry.economy.familySupport+=share;partner.lastContribution=share;
        }else partner.lastContribution=0;
      }
      s.money += entry.economy.income + entry.economy.familySupport - entry.economy.expense;
      if(entry.economy.income)entry.cashFlow.push({label:'รายรับ',delta:entry.economy.income});
      if(entry.economy.familySupport)entry.cashFlow.push({label:'ครอบครัวช่วยค่าใช้จ่าย',delta:entry.economy.familySupport});
      if(entry.economy.expense)entry.cashFlow.push({label:'ค่าครองชีพและค่าใช้จ่ายประจำ',delta:-entry.economy.expense});
      if (ageOf(s) < INCOME_AGE && s.money < 0) {entry.cashFlow.push({label:'ครอบครัวช่วยค่าใช้จ่ายเด็ก',delta:-s.money});s.money = 0;}
      if (s.season !== null) entry.economy.loanPaid = serviceLoans(s);
      if (s.season !== null) entry.economy.interest = applyDebt(s, data);
      if (entry.economy.hobbyExpense || entry.economy.familyHobbyExpense) {
        s.stats.happy = Math.min(100, s.stats.happy + 1);
        if (s.hobbies && s.hobbies.gameCafeHours >= 40) {
          s.stats.health = Math.max(0, s.stats.health - 1);
          if (s.role === 'student' && s.focus === 'study' && s.stats.know > knowBeforeFocus) s.stats.know -= 1;
        }
      }
      moneyBefore=s.money;
      const conditionNames=s.conds.filter(cond=>(data.conditions[cond.id]?.perTurn||[]).some(effect=>typeof effect.money==='number')).map(cond=>data.conditions[cond.id]?.name || cond.id);
      s = KI.effects.tick(s, data, rng).state;
      if(s.money!==moneyBefore)entry.cashFlow.push({label:'ค่าใช้จ่ายจากสถานะ: '+conditionNames.join(', '),delta:s.money-moneyBefore});
      const pets = (s.pets || []).filter((p) => p.alive);
      if (pets.length && s.season !== null) {
        const cost = Math.round(pets.reduce((sum, p) => sum + (PET_COST[p.kind] || 3), 0) * KI.tables.wageDay(data, s.year));
        s.stats.happy = clamp(s.stats.happy + Math.min(2, pets.length) * (s.stats.happy < 50 ? 2 : 1), 0, 100);
        if (s.season === 2) s.stats.bond = clamp(s.stats.bond + 1, 0, 100);
        if (ageOf(s) < INCOME_AGE) {
          if (Number.isFinite(s.parentsWealth)) s.parentsWealth -= cost;
          s.financeLog = [...(s.financeLog || []), { year: s.year, age: ageOf(s), label: 'พ่อแม่จ่ายค่าเลี้ยงสัตว์เลี้ยง', delta: 0, familyExpense: cost, category: 'pet' }];
        } else {
          s.money -= cost;
          s.financeLog = [...(s.financeLog || []), { year: s.year, age: ageOf(s), label: 'ค่าอาหารและดูแลสัตว์เลี้ยง', delta: -cost, familyExpense: 0, category: 'pet' }];
        }
        if (s.season === 2) {
          for (const p of pets) if (s.year - p.born >= (p.life || 14)) { p.alive = false; p.died = s.year; s.flags['pet-grief'] = true; }
          KI.effects.petFlags(s);
        }
      }
      if (s.flags.polRank && s.role !== 'politician' && s.role !== 'prisoner') { s.flags.prevRole = s.role; s.role = 'politician'; }
      if (!s.flags.polRank && s.role === 'politician') { s.role = s.flags.prevRole && s.flags.prevRole !== 'politician' ? s.flags.prevRole : 'jobless'; s.flags.prevRole = false; }
      if (OFFICE_PAY_DAYS[s.flags.polRank] && s.season !== null) {
        const pay = Math.round(OFFICE_PAY_DAYS[s.flags.polRank] * KI.tables.wageDay(data, s.year));
        s.money += pay;
        s.financeLog = [...(s.financeLog || []), { year: s.year, age: ageOf(s), label: 'เงินประจำตำแหน่ง' + OFFICE_NAMES[s.flags.polRank], delta: pay, familyExpense: 0, category: 'income' }];
      }
      if (s.flags.parentsWithUs && s.season !== null && s.family && s.family.parentInfo) {
        const living = ['father', 'mother'].filter((k) => s.family.parentInfo[k] && s.year < s.family.parentInfo[k].deathYear).length;
        if (living) {
          const cost = Math.round(living * PARENT_CARE_DAYS * KI.tables.wageDay(data, s.year));
          s.money -= cost;
          s.financeLog = [...(s.financeLog || []), { year: s.year, age: ageOf(s), label: 'ค่ากินอยู่และค่ายาของพ่อแม่ที่อยู่ด้วย', delta: -cost, familyExpense: 0, category: 'family' }];
        }
      }
      if (s.loc.kind === 'abroad') {
        if (!Number.isFinite(s.loc.since)) s.loc.since = s.year;
        if (s.year - s.loc.since >= ABROAD_MAX_YEARS) {
          const country = s.loc.country || 'ต่างประเทศ';
          const partner = s.family && s.family.partner, withPartner = partner && KI.family.together(s, partner);
          KI.effects.move(s, 'home');
          if (withPartner) partner.location = { ...s.loc };
          s.turn.pin = `อยู่${country}ครบ ${ABROAD_MAX_YEARS} ปี กลับบ้านเกิด`;
        }
      }
      if (s.season === 0) autoPin = promote(s);
      if (s.role === 'child' && !s.edu.in && ageOf(s) >= INCOME_AGE) s.role = 'jobless';
      if (s.season === 1 && ageOf(s) >= 60 && (s.role === 'civil' || (s.role === 'teacher' && s.flags.governmentTeacher))) {
        s.flags.retiredFrom = s.role;
        s.role = 'retired';
        retirementPin = 'เกษียณจากราชการ';
      }
      if (s.season !== null && s.stats.happy > 70) s.stats.happy -= 1;
      if (s.season === 2 && s.stats.bond > 75) s.stats.bond -= 1;
      if (s.season === 2 && ageOf(s) >= 75 && s.stats.know > 50) s.stats.know -= 1;
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
      let pick = rng.pick(c.choices);
      if (c.id === 'reflect-retirement' && s.money < monthlyCost(s, data) * 24 && !c.choices.some((choice) => choice.id === 'retire-civil' || choice.id === 'retire-teacher')) pick = c.choices.find((choice) => choice.id === 'continue') || pick;
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

  function causeText(state) {
    const base = CAUSES[state.death.cause] || OTHER_CAUSE;
    const list = (CAUSE_DETAIL[state.death.cause] || []).filter((x) => state.sex !== 'm' || !/เต้านม|ปากมดลูก/.test(x));
    if (!list.length) return base;
    const seed = Array.from(state.name + state.death.year).reduce((h, c) => (Math.imul(h, 31) + c.codePointAt(0)) >>> 0, 7);
    return base + ' · ' + list[seed % list.length];
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
      sex: state.sex,
      disability: state.disability || null,
      years: [state.birthYear, state.death ? state.death.year : state.year],
      age,
      cause: state.death ? causeText(state) : null,
      places,
      edu: TOP_LABELS[state.edu.top] || TOP_LABELS.none,
      jobs,
      pins: log.filter((e) => e.pin).map((e) => ({ year: e.year, age: e.age, text: e.pin })),
      peak: { happy: peakOf(log, 'happy'), health: peakOf(log, 'health'), know: peakOf(log, 'know'), money: peakOf(log, 'money') },
      compare
    };
  }

  KI.game = { updateParents, parentRetireAge, newGame, begin, choose, canEnd, end, skip, auto, summary, personality, restorePersonality, debtInfo, moneyCost, elderAllowance, livingMonthly, monthlyCost };
})();
