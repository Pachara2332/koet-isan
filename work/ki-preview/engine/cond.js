globalThis.KI = globalThis.KI || {};
(function () {
  const KEYS = ['age', 'year', 'season', 'sex', 'role', 'wealth', 'loc', 'setting', 'province', 'homeProvince',
    'edu', 'flag', 'noFlag', 'trait', 'stat', 'money', 'cond', 'noCond', 'preset', 'chance', 'any', 'partnerYears', 'marriedYears', 'childAge', 'counter', 'talent', 'learn', 'personality'];
  const EDU_KEYS = ['in', 'grade', 'top'];

  function check(cond, rng) {
    if ('chance' in cond && !rng) throw new Error('cond: chance needs rng');
    for (const k of Object.keys(cond)) {
      if (!KEYS.includes(k)) throw new Error('cond: unknown key "' + k + '"');
    }
    if (cond.edu) {
      for (const k of Object.keys(cond.edu)) {
        if (!EDU_KEYS.includes(k)) throw new Error('cond: unknown edu key "' + k + '"');
      }
    }
    if (cond.any) {
      if (!Array.isArray(cond.any)) throw new Error('cond: any must be an array');
      cond.any.forEach((sub) => check(sub, rng));
    }
  }

  function num(v, spec) {
    if (typeof v !== 'number') return false;
    if (Array.isArray(spec)) return v >= spec[0] && v <= spec[1];
    return v === spec;
  }

  function one(v, spec) {
    return Array.isArray(spec) ? spec.includes(v) : v === spec;
  }

  function list(spec) {
    return Array.isArray(spec) ? spec : [spec];
  }

  function range(obj, spec) {
    return Object.keys(spec).every((k) => num(obj[k], spec[k]));
  }

  function evaluate(c, s, rng) {
    const has = (id) => s.conds.some((x) => x.id === id);
    if ('age' in c && !num(s.year - s.birthYear, c.age)) return false;
    if ('year' in c && !num(s.year, c.year)) return false;
    if ('season' in c && s.season !== null && !num(s.season, c.season)) return false;
    if ('sex' in c && !one(s.sex, c.sex)) return false;
    if ('personality' in c && !one(KI.game.personality(s).id, c.personality)) return false;
    if ('role' in c && !one(s.role, c.role)) return false;
    if ('wealth' in c && !one(s.wealth, c.wealth)) return false;
    if ('loc' in c && !one(s.loc.kind, c.loc)) return false;
    if ('setting' in c && !one(s.loc.setting, c.setting)) return false;
    if ('province' in c && !one(s.loc.province, c.province)) return false;
    if ('homeProvince' in c && !one(s.home.province, c.homeProvince)) return false;
    if ('edu' in c) {
      const e = c.edu;
      if ('in' in e && !one(s.edu.in, e.in)) return false;
      if ('grade' in e && !num(s.edu.grade, e.grade)) return false;
      if ('top' in e && !one(s.edu.top, e.top)) return false;
    }
    if ('flag' in c) {
      for (const k of Object.keys(c.flag)) {
        const v = c.flag[k];
        if (typeof v === 'boolean' ? Boolean(s.flags[k]) !== v : s.flags[k] !== v) return false;
      }
    }
    if ('noFlag' in c && list(c.noFlag).some((k) => s.flags[k])) return false;
    if ('partnerYears' in c && (!s.flags.partner || (Number.isFinite(s.flags.partnerSince) && !num(s.year - s.flags.partnerSince, c.partnerYears)))) return false;
    if ('marriedYears' in c && (!s.flags.married || (Number.isFinite(s.flags.marriedSince) && !num(s.year - s.flags.marriedSince, c.marriedYears)))) return false;
    if ('childAge' in c) {
      const born = Number.isFinite(s.flags.childSince) ? s.flags.childSince : s.family && s.family.children && s.family.children[0] && s.family.children[0].birthYear;
      if (!s.flags.child || !Number.isFinite(born) || !num(s.year - born, c.childAge)) return false;
    }
    if ('talent' in c && !Object.keys(c.talent).every((k) => num(((s.talents || {}).gifts || {})[k] || 0, c.talent[k]))) return false;
    if ('learn' in c && !num((s.talents || {}).learn || 1, c.learn)) return false;
    if ('counter' in c && !Object.keys(c.counter).every((k) => num((s.counters || {})[k] || 0, c.counter[k]))) return false;
    if ('trait' in c && !range(s.traits, c.trait)) return false;
    if ('stat' in c && !range(s.stats, c.stat)) return false;
    if ('money' in c && !num(s.money, c.money)) return false;
    if ('cond' in c && !list(c.cond).some(has)) return false;
    if ('noCond' in c && list(c.noCond).some(has)) return false;
    if ('preset' in c && !one(s.preset, c.preset)) return false;
    if ('any' in c && !c.any.some((sub) => evaluate(sub, s, rng))) return false;
    if ('chance' in c && !rng.chance(c.chance)) return false;
    return true;
  }

  function test(cond, state, rng) {
    if (cond === undefined || cond === null) return true;
    check(cond, rng);
    return evaluate(cond, state, rng);
  }

  KI.cond = { test };
})();
