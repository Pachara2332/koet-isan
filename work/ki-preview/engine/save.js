globalThis.KI = globalThis.KI || {};
(function () {
  const SAVE = 'ki.save.v1';
  const LIVES = 'ki.lives.v1';
  const SETTINGS = 'ki.settings.v1';
  const MAX_LIVES = 30;
  const DEFAULTS = { hideHeavy: false, motion: true };

  function get(storage, key) {
    try {
      const raw = storage.getItem(key);
      return raw === null || raw === undefined ? null : JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function put(storage, key, value) {
    try {
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function read(storage) {
    const s = get(storage, SAVE);
    if (!s || typeof s !== 'object' || s.v !== 1) return null;
    if (!s.home || !s.loc || !s.stats || !s.traits || !s.edu || !s.flags || !s.seen) return null;
    if (!Array.isArray(s.conds) || !Array.isArray(s.log) || !Number.isFinite(s.year) || !Number.isFinite(s.birthYear) || !Number.isFinite(s.money)) return null;
    if (!['health', 'happy', 'know', 'bond'].every((key) => Number.isFinite(s.stats[key]))) return null;
    if (!['attach', 'grit', 'social'].every((key) => Number.isFinite(s.traits[key]))) return null;
    return s;
  }

  function write(storage, state) {
    return put(storage, SAVE, state);
  }

  function clear(storage) {
    try {
      storage.removeItem(SAVE);
      return true;
    } catch (e) {
      return false;
    }
  }

  function lives(storage) {
    const list = get(storage, LIVES);
    return Array.isArray(list) ? list.filter(item => item && typeof item === 'object' && !Array.isArray(item)) : [];
  }

  function addLife(storage, summary) {
    return put(storage, LIVES, [summary].concat(lives(storage)).slice(0, MAX_LIVES));
  }

  function replaceLives(storage, list) {
    return Array.isArray(list) && put(storage, LIVES, list.slice(0, MAX_LIVES));
  }

  function finish(storage, summary) {
    if (!addLife(storage, summary)) return false;
    return clear(storage);
  }

  function removeLife(storage, index) {
    const list = lives(storage);
    list.splice(index, 1);
    return put(storage, LIVES, list);
  }

  function settings(storage) {
    const s = get(storage, SETTINGS);
    return { ...DEFAULTS, ...(s && typeof s === 'object' && !Array.isArray(s) ? s : {}) };
  }

  function setSettings(storage, obj) {
    const next = { ...settings(storage), ...obj };
    put(storage, SETTINGS, next);
    return next;
  }

  KI.save = { read, write, clear, lives, addLife, replaceLives, finish, removeLife, settings, setSettings };
})();
