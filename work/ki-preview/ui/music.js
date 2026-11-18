globalThis.KI = globalThis.KI || {};
(function () {
  const TRACKS = ['EWGxtqC8eMw', '-7RNIks6uQM'];
  const LOCAL = [{ src: 'music/track1.mp3', title: 'เพลงที่ 1' }, { src: 'music/track2.mp3', title: 'เพลงที่ 2' }];
  let player = null, ready = null, active = false, index = 0, volume = 0.5, failures = 0, box = null;
  let audio = null, bar = null, timer = null;
  const fmt = (t) => (Number.isFinite(t) && t > 0 ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00');
  function showBar() {
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'music-bar';
      bar.innerHTML = '<span class="music-note" aria-hidden="true">♪</span><div class="music-info"><strong class="music-title"></strong><div class="music-track"><div class="music-fill"></div></div></div><span class="music-time"></span><button type="button" class="music-stop" aria-label="หยุดเพลง">■</button>';
      bar.querySelector('.music-stop').addEventListener('click', stop);
      document.body.append(bar);
    }
    bar.hidden = false;
    clearInterval(timer);
    timer = setInterval(tickBar, 500);
    tickBar();
  }
  function tickBar() {
    if (!bar) return;
    let title = '', now = 0, total = 0;
    if (audio) { title = LOCAL[index].title; now = audio.currentTime; total = audio.duration; }
    else if (player && player.getCurrentTime) { title = (player.getVideoData && player.getVideoData().title) || ''; now = player.getCurrentTime(); total = player.getDuration(); }
    bar.querySelector('.music-title').textContent = title || 'กำลังโหลดเพลง';
    bar.querySelector('.music-time').textContent = fmt(now) + ' / ' + fmt(total);
    bar.querySelector('.music-fill').style.width = (total ? Math.min(100, now / total * 100) : 0) + '%';
  }
  function playLocal() {
    if (!audio) {
      audio = new Audio();
      audio.addEventListener('ended', () => { index = (index + 1) % LOCAL.length; audio.src = LOCAL[index].src; audio.play().catch(() => {}); });
    }
    audio.src = LOCAL[index].src;
    audio.volume = volume;
    return audio.play();
  }
  function loadApi() {
    if (window.YT && window.YT.Player) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (typeof previous === 'function') previous(); resolve(); };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = reject;
      document.head.append(script);
    });
  }
  function next() {
    index = (index + 1) % TRACKS.length;
    if (player && active) player.loadVideoById(TRACKS[index]);
  }
  function mount() {
    if (ready) return ready;
    box = document.createElement('div');
    box.className = 'music-player';
    const holder = document.createElement('div');
    box.append(holder);
    document.body.append(box);
    ready = loadApi().then(() => new Promise((resolve, reject) => {
      player = new window.YT.Player(holder, {
        width: 240, height: 135, videoId: TRACKS[index],
        playerVars: { playsinline: 1, rel: 0 },
        events: {
          onReady: () => { player.setVolume(Math.round(volume * 100)); resolve(); },
          onStateChange: (event) => { if (event.data === window.YT.PlayerState.ENDED) next(); if (event.data === window.YT.PlayerState.PLAYING) failures = 0; },
          onError: () => { failures++; if (failures < TRACKS.length) next(); else { active = false; box.hidden = true; } }
        }
      });
      setTimeout(() => reject(new Error('timeout')), 15000);
    }));
    ready.catch(() => { ready = null; if (box) box.remove(); box = null; player = null; });
    return ready;
  }
  async function start() {
    if (active) return true;
    try {
      await playLocal();
      active = true;
      showBar();
      return true;
    } catch (e) {
      audio = null;
    }
    try {
      await mount();
      active = true;
      failures = 0;
      box.hidden = false;
      player.setVolume(Math.round(volume * 100));
      player.playVideo();
      showBar();
      return true;
    } catch (e) {
      active = false;
      return false;
    }
  }
  function stop() {
    active = false;
    if (audio) audio.pause();
    if (player) player.pauseVideo();
    if (box) box.hidden = true;
    clearInterval(timer);
    if (bar) bar.hidden = true;
    document.dispatchEvent(new CustomEvent('ki-music-stop'));
  }
  function setVolume(value) {
    if (!Number.isFinite(value)) return;
    volume = Math.max(0, Math.min(1, value));
    if (player && player.setVolume) player.setVolume(Math.round(volume * 100));
    if (audio) audio.volume = volume;
  }
  KI.music = { start, stop, setVolume, volume: () => volume, playing: () => active };
})();
