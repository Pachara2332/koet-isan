globalThis.KI = globalThis.KI || {};
(function () {
  function make(seed) {
    let a = seed >>> 0;
    function next() {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    function int(n) {
      return Math.floor(next() * n);
    }
    function pick(arr) {
      return arr[int(arr.length)];
    }
    function weighted(items, weightFn) {
      let total = 0;
      for (const it of items) total += Math.max(0, weightFn(it) || 0);
      if (total <= 0) return null;
      let r = next() * total;
      for (const it of items) {
        r -= Math.max(0, weightFn(it) || 0);
        if (r < 0) return it;
      }
      return items[items.length - 1];
    }
    function chance(p) {
      return next() < p;
    }
    function state() {
      return a;
    }
    return { next, int, pick, weighted, chance, state };
  }
  KI.rng = { make };
})();
