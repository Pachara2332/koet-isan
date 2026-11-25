globalThis.KI = globalThis.KI || {};
(function () {
  const STATS = ['health', 'happy', 'know', 'bond'];
  const TRAITS = ['attach', 'grit', 'social'];
  const ROLES = ['child', 'student', 'farmer', 'factory', 'construction', 'driver', 'civil', 'teacher', 'office',
    'trader', 'abroad', 'monk', 'soldier', 'jobless', 'retired', 'doctor', 'nurse', 'engineer', 'developer', 'police', 'lawyer', 'pharmacist', 'accountant', 'banker', 'chef', 'mechanic', 'artist', 'creator', 'rider', 'security', 'housekeeper', 'athlete', 'designer', 'business', 'prisoner'];
  const LOCS = ['isan', 'bangkok', 'abroad'];

  function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function mult(state, by) {
    if (!by) return 1;
    const neg = by[0] === '-';
    const axis = neg ? by.slice(1) : by;
    if (!TRAITS.includes(axis)) throw new Error('effects: unknown trait axis "' + by + '"');
    const v = state.traits[axis];
    return 0.5 + (neg ? 100 - v : v) / 100;
  }

  function addDelta(deltas, k, d) {
    const hit = deltas.find((x) => x.k === k);
    if (hit) hit.d += d;
    else deltas.push({ k, d });
  }

  function move(s, m) {
    if (m === 'home') {
      if (s.role === 'abroad') s.role = 'jobless';
      s.flags['career-phinoi'] = false;
      s.flags['wr-illegalKorea'] = false;
      s.loc = { kind: 'isan', province: s.home.province, setting: s.home.setting, country: null };
      return;
    }
    if (!m || !LOCS.includes(m.kind)) throw new Error('effects: bad move');
    if (m.kind !== 'abroad' && s.role === 'abroad') s.role = 'jobless';
    if (m.kind !== 'abroad') { s.flags['career-phinoi'] = false; s.flags['wr-illegalKorea'] = false; }
    if (m.kind === 'isan') {
      const province = m.province || (s.loc.kind === 'isan' ? s.loc.province : s.home.province);
      s.loc = { kind: 'isan', province, setting: m.setting || s.loc.setting || s.home.setting, country: null };
    } else {
      s.loc = { kind: m.kind, province: null, setting: 'urban', country: m.kind === 'abroad' ? (m.country || null) : null, ...(m.kind === 'abroad' && m.method ? { method: m.method } : {}) };
    }
  }

  const SOFT_CAP = 60;
  const PET_LIFE = { dog: [10, 15], cat: [12, 18] };

  function petFlags(s) {
    const alive = (s.pets || []).filter((x) => x.alive);
    s.flags['pet-has'] = alive.length > 0;
    s.flags['pet-dog'] = alive.some((x) => x.kind === 'dog');
    s.flags['pet-cat'] = alive.some((x) => x.kind === 'cat');
  }

  function one(s, e, data, rng, deltas) {
    const m = mult(s, e.by);
    if ('stat' in e) {
      if (!STATS.includes(e.stat)) throw new Error('effects: unknown stat "' + e.stat + '"');
      const old = s.stats[e.stat];
      const learn = e.stat === 'know' && e.d > 0 && s.talents ? s.talents.learn || 1 : 1;
      const ease = e.d > 0 && old > SOFT_CAP ? clamp((100 - old) / (100 - SOFT_CAP), 0.1, 1) : 1;
      s.stats[e.stat] = clamp(old + Math.round(e.d * m * learn * ease), 0, 100);
      addDelta(deltas, e.stat, s.stats[e.stat] - old);
    } else if ('trait' in e) {
      if (!TRAITS.includes(e.trait)) throw new Error('effects: unknown trait "' + e.trait + '"');
      const old = s.traits[e.trait];
      s.traits[e.trait] = clamp(old + Math.round(e.d * m), 0, 100);
      addDelta(deltas, e.trait, s.traits[e.trait] - old);
    } else if ('parents' in e) {
      const amount = Math.round(e.parents * KI.tables.wageDay(data, s.year));
      s.parentsWealth = (Number.isFinite(s.parentsWealth) ? s.parentsWealth : 0) + amount;
      s.flags.parentsBroke = s.parentsWealth < 0;
      addDelta(deltas, 'parents', amount);
    } else if ('money' in e) {
      if (e.unit !== undefined && e.unit !== 'wageDay') throw new Error('effects: unknown money unit "' + e.unit + '"');
      const base = e.unit === 'wageDay' ? e.money * KI.tables.wageDay(data, s.year) : e.money;
      const d = Math.round(base * m);
      s.money += d;
      addDelta(deltas, 'money', d);
    } else if ('cond' in e) {
      if (data.conditions && !data.conditions[e.cond]) throw new Error('effects: unknown condition "' + e.cond + '"');
      const left = Math.max(1, Math.round((e.turns || 1) * m));
      const hit = s.conds.find((c) => c.id === e.cond);
      if (hit) hit.left = Math.max(hit.left, left);
      else s.conds.push({ id: e.cond, left });
      addDelta(deltas, '+cond:' + e.cond, hit ? hit.left : left);
    } else if ('uncond' in e) {
      const i = s.conds.findIndex((c) => c.id === e.uncond);
      if (i >= 0) {
        addDelta(deltas, '-cond:' + e.uncond, -s.conds[i].left);
        s.conds.splice(i, 1);
      }
    } else if ('flag' in e) {
      const value = 'v' in e ? e.v : true;
      if (e.flag === 'partner' || e.flag === 'married' || e.flag === 'child' || e.flag === 'grandchild') {
        const since = e.flag + 'Since';
        if (value && !s.flags[e.flag]) s.flags[since] = s.year;
        if (!value) delete s.flags[since];
      }
      s.flags[e.flag] = value;
      if (e.flag === 'life2-ownHouse' && value) s.legacyHomeDisposed = false;
    } else if ('role' in e) {
      if (!ROLES.includes(e.role)) throw new Error('effects: unknown role "' + e.role + '"');
      s.role = e.role;
    } else if ('move' in e) {
      move(s, e.move);
    } else if ('edu' in e) {
      Object.assign(s.edu, e.edu);
      if ('in' in e.edu || 'grade' in e.edu) s.edu.at = s.t;
    } else if ('die' in e) {
      if (!('p' in e) || rng.chance(e.p)) s.death = { year: s.year, age: s.year - s.birthYear, cause: e.die };
    } else if ('wealth' in e) {
      if (!['poor', 'mid', 'rich'].includes(e.wealth)) throw new Error('effects: bad wealth');
      s.wealth = e.wealth;
    } else if ('inc' in e) {
      s.counters = { ...(s.counters || {}) };
      const base = 'd' in e ? e.d : 1;
      const gift = e.inc.startsWith('skill-') && base > 0 && s.talents && s.talents.gifts ? s.talents.gifts[e.inc.slice(6)] || 0 : 0;
      s.counters[e.inc] = Math.max(0, (s.counters[e.inc] || 0) + (gift ? Math.round(base * (1 + gift * 0.5)) : base));
    } else if ('loan' in e) {
      const l = e.loan, amount = Math.round(l.amountDays * KI.tables.wageDay(data, s.year));
      const old = (s.loans || []).find((x) => x.kind === l.kind);
      const balance = amount + (old ? old.balance : 0);
      const payment = Math.ceil(balance * (l.rate / (1 - Math.pow(1 + l.rate, -l.seasons))));
      const loan = { ...(old || {}), kind: l.kind, label: l.label, principal: amount + (old ? old.principal : 0), balance, rate: l.rate, payment, left: l.seasons, since: old ? old.since : s.year, ...('grace' in l ? { grace: l.grace } : {}) };
      s.loans = [...(s.loans || []).filter((x) => x !== old), loan];
      s.money += amount;
      s.financeLog = [...(s.financeLog || []), { year: s.year, age: s.year - s.birthYear, label: 'กู้' + l.label, delta: amount, familyExpense: 0, category: 'loan' }];
      addDelta(deltas, 'money', amount);
    } else if ('inherit' in e) {
      const d = Math.round((s.flags.estate || 0) * e.inherit);
      s.money += d;
      addDelta(deltas, 'money', d);
    } else if ('pet' in e) {
      const p = e.pet, pets = (s.pets || []).slice();
      if (p.kind) {
        if (!PET_LIFE[p.kind]) throw new Error('effects: unknown pet kind "' + p.kind + '"');
        const span = PET_LIFE[p.kind];
        pets.push({ id: pets.reduce((n, x) => Math.max(n, x.id || 0), 0) + 1, kind: p.kind, name: null, born: s.year - (p.age || 0), since: s.year, alive: true, life: span[0] + (rng ? rng.int(span[1] - span[0] + 1) : 2) });
      }
      if (p.life) pets.forEach((x) => { if (x.alive) x.life = Math.max(s.year - x.born, (x.life || 14) + p.life); });
      s.pets = pets;
      petFlags(s);
    } else if ('pin' in e) {
      if (s.turn) s.turn.pin = e.pin;
    } else {
      throw new Error('effects: unknown effect ' + JSON.stringify(e));
    }
  }

  function apply(state, effects, data, rng) {
    const s = clone(state);
    const deltas = [];
    for (const e of effects || []) {
      if (s.death) break;
      one(s, e, data || {}, rng, deltas);
    }
    return { state: s, deltas: deltas.filter((x) => x.d !== 0) };
  }

  function tick(state, data, rng) {
    const ids = state.conds.map((c) => c.id);
    let s = state;
    const deltas = [];
    for (const id of ids) {
      const def = data.conditions && data.conditions[id];
      if (!def || !def.perTurn) continue;
      const r = apply(s, def.perTurn, data, rng);
      s = r.state;
      for (const d of r.deltas) addDelta(deltas, d.k, d.d);
    }
    s = clone(s);
    s.conds = s.conds
      .map((c) => (ids.includes(c.id) ? { id: c.id, left: c.left - 1 } : c))
      .filter((c) => c.left > 0);
    return { state: s, deltas };
  }

  KI.effects = { apply, tick, petFlags, roles: ROLES };
})();
