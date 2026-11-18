const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.join(__dirname, '..', 'ki-preview');
const lives = Number(process.argv[2] || 60);
const watch = process.argv[3] || '';

function load() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !s.startsWith('ui/'));
  const ctx = { console, Date, Math, JSON };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const s of srcs) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s });
  return ctx.KI;
}

const KI = load();
const d = KI.data;
const errors = [];
const ids = new Map();
const sample = KI.game.newGame({ seed: 1, birthYear: 1990, province: 'nakhon-phanom' }, d);

function checkWhen(owner, when) {
  try {
    KI.cond.test(when, sample, KI.rng.make(1));
  } catch (e) {
    errors.push(owner + ': ' + e.message);
  }
}

function checkEffects(owner, effects) {
  try {
    KI.effects.apply(sample, effects || [], d, KI.rng.make(1));
  } catch (e) {
    errors.push(owner + ': ' + e.message);
  }
}

function checkItem(kind, item) {
  const owner = kind + ' ' + (item.id || '(no id)');
  if (!item.id) errors.push(owner + ': missing id');
  if (ids.has(item.id)) errors.push(owner + ': duplicate id, also in ' + ids.get(item.id));
  ids.set(item.id, kind);
  if (!item.title) errors.push(owner + ': missing title');
  if (item.cooldown !== undefined && item.cooldown !== 'once' && typeof item.cooldown !== 'number') errors.push(owner + ': bad cooldown');
  checkWhen(owner, item.when);
  checkEffects(owner, item.effects);
  const seen = new Set();
  for (const c of item.choices || []) {
    const co = owner + '/' + c.id;
    if (!c.id || !c.label) errors.push(co + ': choice needs id and label');
    if (seen.has(c.id)) errors.push(co + ': duplicate choice id');
    seen.add(c.id);
    checkWhen(co, c.when);
    checkEffects(co, c.effects);
    if (c.roll) {
      const total = c.roll.reduce((sum, r) => sum + r.p, 0);
      if (total > 1.0001) errors.push(co + ': roll probabilities sum above 1');
      c.roll.forEach((r, i) => checkEffects(co + ' roll ' + i, r.effects));
    }
  }
  if (kind === 'decision' && !(item.choices || []).length) errors.push(owner + ': decision without choices');
}

d.decisions.forEach((x) => checkItem('decision', x));
d.personalEvents.forEach((x) => checkItem('personal', x));
for (const [id, def] of Object.entries(d.conditions)) {
  if (!def.name) errors.push('condition ' + id + ': missing name');
  checkEffects('condition ' + id, def.perTurn);
}

const seenIds = new Map();
let crashes = 0;
const ages = [];
for (let i = 0; i < lives; i++) {
  try {
    let s = KI.family.sync(KI.game.newGame({ seed: 7000 + i }, d));
    let n = 0;
    while (!s.death && n < 2000) {
      s = KI.family.sync(KI.game.auto(s, d, {}));
      n++;
      for (const c of s.log[s.log.length - 1].cards) seenIds.set(c.id, (seenIds.get(c.id) || 0) + 1);
      for (const [k, v] of Object.entries(s.stats)) if (!(v >= 0 && v <= 100)) throw new Error('stat ' + k + ' out of range: ' + v);
    }
    if (!s.death) throw new Error('life did not end');
    ages.push(s.death.age);
  } catch (e) {
    crashes++;
    if (crashes <= 3) errors.push('simulation life ' + i + ': ' + e.message);
  }
}

const pool = [...d.decisions, ...d.personalEvents].filter((x) => !watch || x.id.startsWith(watch));
const never = pool.filter((x) => !seenIds.has(x.id)).map((x) => x.id);
ages.sort((a, b) => a - b);
console.log('decisions', d.decisions.length, 'personal', d.personalEvents.length, 'conditions', Object.keys(d.conditions).length);
console.log('lives', lives, 'crashes', crashes, 'median death age', ages[ages.length >> 1]);
console.log((watch ? 'watched "' + watch + '" ' : '') + 'items never seen:', never.length + '/' + pool.length, never.slice(0, 40).join(', '));
if (errors.length) {
  console.log('ERRORS', errors.length);
  errors.slice(0, 60).forEach((e) => console.log(' - ' + e));
  process.exit(1);
}
console.log('OK');
