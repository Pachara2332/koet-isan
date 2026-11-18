globalThis.KI = globalThis.KI || {};
(function () {
  const KEY = 'ki-titles';
  const roles = (s) => (s.log || []).map((e) => e.role);
  const pins = (s) => (s.log || []).map((e) => e.pin || '').join('|');
  const c = (s, k) => (s.counters && s.counters[k]) || 0;
  const f = (s) => s.flags || {};
  const fam = (s) => s.family || {};
  const age = (s) => (s.death ? s.death.age : s.year - s.birthYear);
  const orphaned = (s) => { const p = fam(s).parentInfo || {}; return !!(p.father && p.mother && p.father.deathYear <= s.birthYear + 12 && p.mother.deathYear <= s.birthYear + 12); };
  const LIST = [
    { id: 'orphan-grad', label: 'เด็กกำพร้าที่จบปริญญา', hint: 'โตมาโดยไม่มีพ่อแม่ แล้วเรียนจนจบปริญญา', test: (s) => orphaned(s) && s.edu.top === 'ba' },
    { id: 'orphan', label: 'โตมากับพี่', hint: 'เสียพ่อแม่ตั้งแต่เด็ก', test: orphaned },
    { id: 'first-grad', label: 'บัณฑิตคนแรกของบ้าน', hint: 'เกิดในบ้านยากจน แล้วเรียนจบปริญญา', test: (s) => s.birthWealth === 'poor' && s.edu.top === 'ba' },
    { id: 'tycoon', label: 'เจ้าสัวจากลูกชาวนา', hint: 'เกิดยากจน แล้วสร้างกิจการจนใหญ่โต', test: (s) => s.birthWealth === 'poor' && c(s, 'biz') >= 5 },
    { id: 'wealthy', label: 'เศรษฐีอีสาน', hint: 'มีฐานะร่ำรวยในบั้นปลาย', test: (s) => f(s).status === 'wealthy' },
    { id: 'doctor', label: 'หมอบ้านนอก', hint: 'ได้เป็นหมอ', test: (s) => roles(s).includes('doctor') },
    { id: 'teacher', label: 'แม่พิมพ์ของชาติ', hint: 'ได้เป็นครู', test: (s) => roles(s).includes('teacher') },
    { id: 'abroad', label: 'แรงงานไกลบ้าน', hint: 'ไปทำงานต่างประเทศ', test: (s) => (s.log || []).some((e) => e.kind === 'abroad') },
    { id: 'farmer-life', label: 'ชาวนาตลอดชีวิต', hint: 'ทำนาอย่างเดียวมาทั้งชีวิต', test: (s) => { const r = roles(s).filter((x) => !['child', 'student', 'retired'].includes(x)); return r.length > 20 && r.every((x) => x === 'farmer'); } },
    { id: 'abbot', label: 'หลวงพ่อประจำหมู่บ้าน', hint: 'ครองผ้าเหลืองจนวันสุดท้าย', test: (s) => s.role === 'monk' && age(s) >= 50 },
    { id: 'ex-con', label: 'อดีตผู้ต้องขัง', hint: 'เคยติดคุก', test: (s) => roles(s).includes('prisoner') },
    { id: 'reformed', label: 'กลับตัวหลังพ้นคุก', hint: 'พ้นโทษแล้วทำความดีจนเป็นที่ยอมรับ', test: (s) => roles(s).includes('prisoner') && c(s, 'good') >= 4 },
    { id: 'fugitive', label: 'หนีคดีจนวันตาย', hint: 'หลบหนีคดีไปตลอดชีวิต', test: (s) => !!f(s)['crime-fugitive'] },
    { id: 'sib-raiser', label: 'พี่ผู้เลี้ยงน้อง', hint: 'รับน้องมาเลี้ยงดูส่งเรียน', test: (s) => !!f(s)['exp-sibDone'] },
    { id: 'gsn', label: 'จบ กศน. ด้วยใจสู้', hint: 'ออกกลางคันแล้วกลับมาเรียนจนได้วุฒิ', test: (s) => pins(s).includes('กศน') },
    { id: 'land', label: 'ผู้รักษาที่นามรดก', hint: 'เก็บที่นาของพ่อแม่ไว้ไม่ขาย', test: (s) => !!f(s)['legacy-land'] },
    { id: 'feud', label: 'มรดกแตกพี่น้อง', hint: 'ทะเลาะกับพี่น้องเรื่องมรดกจนไม่คืนดี', test: (s) => !!f(s)['legacy-feud'] },
    { id: 'big-family', label: 'ลูกหลานเต็มบ้าน', hint: 'มีลูกตั้งแต่ 4 คน', test: (s) => (fam(s).children || []).length >= 4 },
    { id: 'grandparent', label: 'ได้อุ้มหลาน', hint: 'มีหลาน', test: (s) => (fam(s).grandchildren || []).length > 0 },
    { id: 'alone', label: 'คนเดียวจนวันสุดท้าย', hint: 'ไม่เคยมีคู่เลยทั้งชีวิต', test: (s) => !fam(s).partner && !(fam(s).formerPartners || []).length && age(s) >= 50 },
    { id: 'long-life', label: 'อายุยืนเกือบร้อยปี', hint: 'อยู่ถึงอายุ 95', test: (s) => age(s) >= 95 },
    { id: 'early', label: 'จากไปก่อนวัย', hint: 'จากไปก่อนอายุ 30', test: (s) => age(s) < 30 },
    { id: 'dynasty', label: 'สืบสกุลรุ่นที่สาม', hint: 'เล่นต่อเป็นลูกจนถึงรุ่นที่ 3', test: (s) => (s.generation || 1) >= 3 }
  ];
  function earned(state) {
    return LIST.filter((t) => { try { return t.test(state); } catch (e) { return false; } });
  }
  function collected() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function record(list) {
    const all = Array.from(new Set([...collected(), ...list.map((t) => t.id)]));
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) {}
    return all;
  }
  KI.titles = { LIST, earned, collected, record };
})();
