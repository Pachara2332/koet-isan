globalThis.KI = globalThis.KI || {};
(function () {
  const TURN_MS = 15000;
  const SPEEDS = [0.5, 1, 2, 4];
  function create(options) {
    const now = options.now || (() => Date.now());
    let timer = null, paused = false, speed = 1, key = null, ready = false, left = TURN_MS, started = 0;
    function elapsed() { return timer !== null ? (now() - started) * speed : 0; }
    function cancel(keep) {
      if (timer === null) return;
      if (keep) left = Math.max(0, left - elapsed());
      options.clearTimeout(timer);
      timer = null;
    }
    function arm() {
      if (paused || !ready || key === null || timer !== null) return;
      started = now();
      timer = options.setTimeout(() => { timer = null; left = 0; options.advance(); }, left / speed);
    }
    function schedule(turn) {
      const same = key !== null && turn.key === key;
      cancel(same);
      if (!same) left = TURN_MS;
      key = turn.key;
      ready = !!turn.ready;
      arm();
    }
    function pause() { if (!paused) { cancel(true); paused = true; } }
    function resume() { if (paused) { paused = false; arm(); } }
    function setSpeed(value) {
      if (!SPEEDS.includes(value)) return;
      cancel(true); speed = value; arm();
    }
    function stop() { cancel(false); key = null; ready = false; left = TURN_MS; }
    function progress() { return key === null ? 0 : Math.min(1, Math.max(0, 1 - (left - elapsed()) / TURN_MS)); }
    function animation() {
      const from = progress();
      return timer === null ? { from, duration: 0 } : { from, duration: Math.max(0, (1 - from) * TURN_MS / speed) };
    }
    return { schedule, pause, resume, setSpeed, stop, progress, animation, isPaused: () => paused, speed: () => speed, speeds: SPEEDS };
  }
  KI.clock = { create };
})();
