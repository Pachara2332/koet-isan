globalThis.KI = globalThis.KI || {};
(function () {
  const W = 1600, H = 900, VPX = 800, VPY = 520;
  const NS = 'http://www.w3.org/2000/svg';
  const PLACES = ['rural', 'town', 'mekong', 'bangkok', 'abroad', 'school', 'factory', 'market', 'garden', 'temple', 'desert', 'asiacity', 'nordic', 'prison', 'home-small', 'home-medium', 'home-large'];
  const HOMES = ['home-small', 'home-medium', 'home-large'], CARS = ['bike', 'car-small', 'car-electric', 'car-pickup', 'car-luxury'];
  const PARK = { 'car-luxury': [335, .72], 'car-small': [530, .72], bike: [965, 2.8], 'car-electric': [1115, .72], 'car-pickup': [1290, .72] };
  const MOODS = ['normal', 'sad', 'bright'];
  const FX = ['flood', 'drought', 'rocket', 'boats', 'fireworks'];
  const ERA = { electricity: 'electricity', tv: 'tv', motorcycle: 'motorcycle', mobile: 'mobile' };

  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const r = (a, b) => a + (b - a) * rnd();
  const n = (v) => Math.round(v * 10) / 10;
  const f = (c) => 'fill:' + c;
  const path = (d, style, extra) => '<path d="' + d + '" style="' + style + '"' + (extra ? ' ' + extra : '') + '/>';
  const g = (inner, attrs) => '<g' + (attrs ? ' ' + attrs : '') + '>' + inner + '</g>';
  const depth = (y) => Math.max(0.02, (y - VPY) / (H - VPY));

  function ridge(y0, amp, step, x0, x1) {
    let d = 'M' + x0 + ' ' + (y0 + 200) + ' L' + x0 + ' ' + n(y0 + r(-amp, amp) * 0.4);
    let px = x0, py = y0;
    for (let x = x0 + step; x <= x1 + step; x += step) {
      const ny = y0 + r(-amp, amp * 0.6);
      d += ' Q' + n(px + step * 0.5) + ' ' + n(Math.min(py, ny) - r(0, amp * 0.5)) + ' ' + n(x) + ' ' + n(ny);
      px = x; py = ny;
    }
    return d + ' L' + (x1 + step) + ' ' + (y0 + 200) + ' Z';
  }

  function canopy(y, x0, x1, rmin, rmax) {
    let d = 'M' + x0 + ' ' + (y + 40) + ' L' + x0 + ' ' + y;
    let x = x0;
    while (x < x1) {
      const rr = r(rmin, rmax), nx = x + rr * r(1.1, 1.7), ny = y + r(-rmin * 0.3, rmin * 0.3);
      d += ' A' + n(rr) + ' ' + n(rr * r(0.75, 1)) + ' 0 0 1 ' + n(nx) + ' ' + n(ny);
      x = nx;
    }
    return d + ' L' + n(x) + ' ' + (y + 40) + ' Z';
  }

  function palm(x, by, h, s, lean) {
    const tx = x + lean, ty = by - h;
    const trunk = 'M' + n(x - 5 * s) + ' ' + by + ' Q' + n(x + lean * 0.3 - 4 * s) + ' ' + n(by - h * 0.55) + ' ' + n(tx - 2.6 * s) + ' ' + n(ty) +
      ' L' + n(tx + 2.6 * s) + ' ' + n(ty) + ' Q' + n(x + lean * 0.3 + 4 * s) + ' ' + n(by - h * 0.55) + ' ' + n(x + 5 * s) + ' ' + by + ' Z';
    let rings = '';
    for (let i = 1; i < 9; i++) {
      const yy = by - h * i / 9, xx = x + lean * Math.pow(i / 9, 1.6);
      rings += 'M' + n(xx - 4 * s) + ' ' + n(yy) + ' l' + n(8 * s) + ' ' + n(-1.5 * s) + ' ';
    }
    let fronds = '', dead = '';
    const R = 38 * s;
    for (let i = 0; i < 15; i++) {
      const a = (-178 + i * 12.5 + r(-3, 3)) * Math.PI / 180, rr = R * r(0.82, 1.08), spread = 0.2;
      let d = 'M' + n(tx) + ' ' + n(ty);
      for (let k = 0; k <= 6; k++) {
        const aa = a - spread + (2 * spread) * k / 6, rk = rr * (k % 2 ? 0.8 : 1);
        d += ' L' + n(tx + Math.cos(aa) * rk) + ' ' + n(ty + Math.sin(aa) * rk);
      }
      fronds += d + ' Z ';
    }
    for (let i = 0; i < 6; i++) {
      const a = (25 + i * 26 + r(-5, 5)) * Math.PI / 180, rr = R * r(0.6, 0.85), spread = 0.13;
      let d = 'M' + n(tx) + ' ' + n(ty);
      for (let k = 0; k <= 4; k++) {
        const aa = a - spread + (2 * spread) * k / 4, rk = rr * (k % 2 ? 0.85 : 1);
        d += ' L' + n(tx + Math.cos(aa) * rk) + ' ' + n(ty + Math.sin(aa) * rk);
      }
      dead += d + ' Z ';
    }
    let fruit = '';
    for (let i = 0; i < 5; i++) fruit += '<circle cx="' + n(tx + r(-9, 9) * s) + '" cy="' + n(ty + r(4, 11) * s) + '" r="' + n(3.2 * s) + '"/>';
    return g(
      path(trunk, f('var(--trunk)')) +
      path(rings, 'fill:none;stroke:rgba(0,0,0,.22);stroke-width:' + n(1.2 * s)) +
      g(
        path(dead, f('color-mix(in srgb,var(--trunk) 60%,var(--soil))')) +
        g(fruit, 'style="fill:#2D261C"') +
        path(fronds, f('var(--palm)')) +
        path(fronds, 'fill:none;stroke:rgba(255,255,255,.12);stroke-width:' + n(0.8 * s)),
        'class="sway" style="transform-origin:' + n(tx) + 'px ' + n(ty) + 'px;animation-delay:' + n(-r(0, 6)) + 's"'
      )
    );
  }

  function tree(x, by, s, col1, col2) {
    const trunk = 'M' + n(x - 4 * s) + ' ' + by + ' L' + n(x - 2 * s) + ' ' + n(by - 40 * s) + ' L' + n(x + 2 * s) + ' ' + n(by - 40 * s) + ' L' + n(x + 4 * s) + ' ' + by + ' Z';
    let blobs = '';
    for (let i = 0; i < 6; i++) blobs += '<ellipse cx="' + n(x + r(-26, 26) * s) + '" cy="' + n(by - r(48, 78) * s) + '" rx="' + n(r(18, 28) * s) + '" ry="' + n(r(14, 22) * s) + '"/>';
    return path(trunk, f('var(--trunk)')) + g(blobs, 'style="fill:' + col1 + '"') +
      '<ellipse cx="' + n(x - 8 * s) + '" cy="' + n(by - 76 * s) + '" rx="' + n(18 * s) + '" ry="' + n(10 * s) + '" style="fill:' + col2 + ';opacity:.5"/>';
  }

  function cloud(x, y, s, cls) {
    let blobs = '';
    const parts = [[0, 0, 60, 26], [-46, 8, 40, 20], [48, 6, 46, 22], [-12, -18, 38, 24], [24, -14, 34, 22], [-80, 16, 26, 12], [86, 16, 28, 12]];
    parts.forEach((p) => { blobs += '<ellipse cx="' + n(x + p[0] * s) + '" cy="' + n(y + p[1] * s) + '" rx="' + n(p[2] * s) + '" ry="' + n(p[3] * s) + '"/>'; });
    const shade = '<ellipse cx="' + n(x + 4 * s) + '" cy="' + n(y + 20 * s) + '" rx="' + n(100 * s) + '" ry="' + n(9 * s) + '" style="fill:var(--cloud2);opacity:.7"/>';
    return g(g(blobs, 'style="fill:var(--cloud)"') + shade, 'class="drift ' + (cls || '') + '" style="--d:' + n(r(70, 140)) + 's;--dx:' + n(r(40, 110)) + 'px;animation-delay:' + n(-r(0, 60)) + 's"');
  }

  function defs() {
    let cracks = '';
    for (let i = 0; i < 9; i++) {
      let x = r(0, 160), y = r(0, 90), d = 'M' + n(x) + ' ' + n(y);
      for (let k = 0; k < 4; k++) { x += r(-26, 26); y += r(-14, 14); d += ' L' + n(x) + ' ' + n(y); }
      cracks += d + ' ';
    }
    let farRows = '';
    for (let x = 0; x < 24; x += 6) farRows += 'M' + x + ' 6 l1 -5 l1 5 ';
    return '<defs>' +
      '<linearGradient id="ki-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="620"><stop offset="0" style="stop-color:var(--sky1)"/><stop offset=".58" style="stop-color:var(--sky2)"/><stop offset="1" style="stop-color:var(--sky3)"/></linearGradient>' +
      '<linearGradient id="ki-reflect" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="900"><stop offset="0" style="stop-color:var(--sky3)"/><stop offset=".45" style="stop-color:var(--sky2)"/><stop offset="1" style="stop-color:var(--sky1)"/></linearGradient>' +
      '<linearGradient id="ki-river" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="760"><stop offset="0" style="stop-color:var(--river2)"/><stop offset="1" style="stop-color:var(--river)"/></linearGradient>' +
      '<radialGradient id="ki-glow"><stop offset="0" style="stop-color:var(--glow);stop-opacity:.95"/><stop offset=".35" style="stop-color:var(--glow);stop-opacity:.45"/><stop offset="1" style="stop-color:var(--glow);stop-opacity:0"/></radialGradient>' +
      '<linearGradient id="ki-haze" gradientUnits="userSpaceOnUse" x1="0" y1="380" x2="0" y2="620"><stop offset="0" style="stop-color:var(--haze);stop-opacity:0"/><stop offset=".75" style="stop-color:var(--haze);stop-opacity:.9"/><stop offset="1" style="stop-color:var(--haze);stop-opacity:.2"/></linearGradient>' +
      '<linearGradient id="ki-mist" gradientUnits="userSpaceOnUse" x1="0" y1="540" x2="0" y2="700"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="ki-storm" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="330"><stop offset="0" style="stop-color:var(--cloud2)"/><stop offset="1" style="stop-color:var(--cloud);stop-opacity:.0"/></linearGradient>' +
      '<linearGradient id="ki-dusk" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="900"><stop offset="0" stop-color="#1B1748" stop-opacity=".88"/><stop offset=".6" stop-color="#4B2F66" stop-opacity=".62"/><stop offset="1" stop-color="#1B1748" stop-opacity=".7"/></linearGradient>' +
      '<linearGradient id="ki-flood" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="900"><stop offset="0" stop-color="#A88D63"/><stop offset="1" stop-color="#7B6545"/></linearGradient>' +
      '<radialGradient id="ki-lamp"><stop offset="0" stop-color="#FFE7A0" stop-opacity=".9"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>' +
      '<pattern id="ki-cracks" patternUnits="userSpaceOnUse" width="160" height="90"><path d="' + cracks + '" style="fill:none;stroke:var(--soil2);stroke-width:1.6;stroke-linecap:round"/></pattern>' +
      '<pattern id="ki-cracks-far" patternUnits="userSpaceOnUse" width="160" height="90" patternTransform="scale(.45 .25)"><path d="' + cracks + '" style="fill:none;stroke:var(--soil2);stroke-width:2.4"/></pattern>' +
      '<pattern id="ki-farrows" patternUnits="userSpaceOnUse" width="24" height="7"><path d="' + farRows + '" style="fill:var(--rice)"/></pattern>' +
      '<pattern id="ki-ripple" patternUnits="userSpaceOnUse" width="220" height="26"><path d="M10 6 h46 M120 15 h60 M70 22 h30" style="stroke:#fff;stroke-opacity:.35;stroke-width:1.4"/></pattern>' +
      '<pattern id="ki-windows" patternUnits="userSpaceOnUse" width="14" height="16"><rect x="3" y="3" width="8" height="9" style="fill:rgba(40,46,70,.32)"/></pattern>' +
      '<pattern id="ki-shutter" patternUnits="userSpaceOnUse" width="10" height="5"><rect width="10" height="1.4" style="fill:rgba(0,0,0,.18)"/></pattern>' +
      '<pattern id="ki-weave" patternUnits="userSpaceOnUse" width="8" height="8"><path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" style="stroke:rgba(0,0,0,.18);stroke-width:1"/></pattern>' +
      '<clipPath id="ki-fieldclip"><rect x="-200" y="571" width="2000" height="400"/></clipPath>' +
      '<clipPath id="ki-bankclip"><rect x="-200" y="700" width="2000" height="44"/></clipPath>' +
      '</defs>';
  }

  function sky() {
    let rain = '';
    for (let i = 0; i < 70; i++) {
      const x = r(-50, 1650), y = r(170, 330);
      rain += 'M' + n(x) + ' ' + n(y) + ' l-' + n(r(14, 22)) + ' ' + n(r(130, 230)) + ' ';
    }
    const stormBank = canopy(250, -60, 1700, 50, 95);
    const bolt = 'M1352 268 L1336 330 L1352 334 L1324 420 L1342 424 L1310 506';
    let birds = '';
    for (let i = 0; i < 7; i++) {
      const bx = i * 26 + r(-6, 6), by = (i % 3) * 14 + r(-4, 4);
      birds += g('<path d="M' + n(bx - 8) + ' ' + n(by) + ' q4 -5 8 0 q4 -5 8 0" style="fill:none;stroke:#3C3A55;stroke-width:1.8;stroke-linecap:round"/>', 'class="flap" style="animation-delay:' + n(-r(0, 1)) + 's"');
    }
    return '<rect x="-200" y="-200" width="2000" height="1100" style="fill:url(#ki-sky)"/>' +
      g('<rect x="-200" y="-200" width="2000" height="1100" style="fill:#fff"/>', 'class="storm"><g class="flash"') + '</g>' +
      g('<circle cx="1150" cy="400" r="260" style="fill:url(#ki-glow)"/><circle cx="1150" cy="400" r="58" style="fill:var(--sun)"/><circle cx="1150" cy="400" r="70" style="fill:var(--sun);opacity:.25"/>', 'class="sun"') +
      g(cloud(260, 140, 1.1) + cloud(760, 92, 0.8) + cloud(1380, 170, 1.25) + cloud(1050, 250, 0.6) + cloud(520, 300, 0.5) + cloud(1560, 80, 0.7), 'class="clouds"') +
      g(
        '<rect x="-200" y="-200" width="2000" height="530" style="fill:url(#ki-storm)"/>' +
        path(stormBank, f('var(--cloud2)'), 'transform="translate(0 -30)"') +
        path(canopy(300, -60, 1700, 30, 60), f('var(--cloud)'), 'style="opacity:.55" class="drift" ') +
        path(rain, 'fill:none;stroke:var(--cloud2);stroke-width:1.4;stroke-opacity:.55') +
        g(path(bolt, 'fill:none;stroke:#FFFBEA;stroke-width:3.2;stroke-linejoin:round') + path(bolt, 'fill:none;stroke:#FFF6C8;stroke-width:9;stroke-opacity:.35;stroke-linejoin:round'), 'class="bolt"'),
        'class="storm"'
      ) +
      g(g(birds, 'class="flock" style="animation-delay:-14s"') + g(birds, 'class="flock" style="animation-delay:-31s;transform-origin:0 0" transform="translate(0 70) scale(.7)"'), 'class="birds" transform="translate(0 150)"');
  }

  function hills() {
    seed = 31;
    const far = ridge(450, 40, 120, -100, 1700);
    seed = 57;
    const mid = ridge(488, 30, 90, -100, 1700);
    seed = 91;
    const near = ridge(530, 18, 70, -100, 1700);
    return g(
      path(far, f('var(--hill1)')) +
      path(mid, f('var(--hill2)')) +
      g(path(near, f('var(--hill3)')), 'class="ridge-near"') +
      g(mast(312, 474, 0.9), 'class="era era-mobile"'),
      'class="hills"'
    ) + '<rect x="-200" y="360" width="2000" height="260" class="haze" style="fill:url(#ki-haze)"/>';
  }

  function mast(x, by, s) {
    const h = 86 * s;
    const lattice = 'M' + n(x - 8 * s) + ' ' + by + ' L' + x + ' ' + n(by - h) + ' L' + n(x + 8 * s) + ' ' + by +
      ' M' + n(x - 6 * s) + ' ' + n(by - h * 0.25) + ' L' + n(x + 6 * s) + ' ' + n(by - h * 0.25) +
      ' M' + n(x - 4 * s) + ' ' + n(by - h * 0.5) + ' L' + n(x + 4 * s) + ' ' + n(by - h * 0.5) +
      ' M' + n(x - 7 * s) + ' ' + by + ' L' + n(x + 5 * s) + ' ' + n(by - h * 0.25) + ' L' + n(x - 3 * s) + ' ' + n(by - h * 0.5);
    return path(lattice, 'fill:none;stroke:#6A6670;stroke-width:' + n(1.6 * s)) +
      '<rect x="' + n(x - 5 * s) + '" y="' + n(by - h * 0.78) + '" width="' + n(3 * s) + '" height="' + n(9 * s) + '" style="fill:#6A6670"/>' +
      '<rect x="' + n(x + 2 * s) + '" y="' + n(by - h * 0.72) + '" width="' + n(3 * s) + '" height="' + n(9 * s) + '" style="fill:#6A6670"/>' +
      '<circle class="blink" cx="' + x + '" cy="' + n(by - h - 2) + '" r="' + n(2.6 * s) + '" style="fill:#E0402A"/>';
  }

  function templeAndTrees(withTemple) {
    seed = 113;
    const back = canopy(552, -60, 1700, 12, 22);
    seed = 127;
    const front = canopy(566, -60, 1700, 10, 20);
    let farPalms = '';
    [[150, 0.42], [430, 0.5], [610, 0.36], [1240, 0.46], [1480, 0.4], [1560, 0.34]].forEach((p) => { seed = Math.round(p[0]); farPalms += palm(p[0], 572, 120 * p[1] + 40, p[1], r(-4, 4)); });
    const temple = withTemple ? g(
      path('M902 566 L902 528 L998 528 L998 566 Z', f('#EFE6D4')) +
      path('M890 532 L950 498 L1010 532 Z', f('#B5513A')) +
      path('M902 512 L950 478 L998 512 Z', f('#C76A3E')) +
      path('M918 494 L950 466 L982 494 Z', f('#B5513A')) +
      path('M948 466 L950 446 L952 466 Z M888 534 l-8 -12 l4 1 Z M1012 534 l8 -12 l-4 1 Z', f('#D9A93A')) +
      path('M890 532 L950 498 L1010 532', 'fill:none;stroke:#D9A93A;stroke-width:2') +
      path('M1040 566 L1040 540 L1036 540 L1036 532 L1032 532 L1032 524 L1068 524 L1068 532 L1064 532 L1064 540 L1060 540 L1060 566 Z', f('#F2EBDD')) +
      path('M1034 524 Q1050 496 1050 470 Q1050 496 1066 524 Z', f('#F2EBDD')) +
      path('M1048 474 L1050 452 L1052 474 Z', f('#D9A93A')) +
      g('<rect x="922" y="540" width="8" height="18"/><rect x="946" y="540" width="8" height="18"/><rect x="970" y="540" width="8" height="18"/>', 'style="fill:#7B4B34;opacity:.7"'),
      ''
    ) : '';
    return g(
      path(back, f('var(--tree2)')) + farPalms + temple + path(front, f('var(--tree)')) +
      '<rect x="-200" y="566" width="2000" height="10" style="fill:var(--tree2);opacity:.5"/>'
    );
  }

  function stiltHouse(x, by, s, roof) {
    const w = 60 * s, hh = 22 * s, st = 16 * s;
    return path('M' + n(x) + ' ' + by + ' v' + n(-st) + ' M' + n(x + w) + ' ' + by + ' v' + n(-st) + ' M' + n(x + w * 0.5) + ' ' + by + ' v' + n(-st), 'stroke:#5A4430;stroke-width:' + n(2.4 * s)) +
      '<rect x="' + n(x - 2 * s) + '" y="' + n(by - st - hh) + '" width="' + n(w + 4 * s) + '" height="' + n(hh) + '" style="fill:#9C7650"/>' +
      '<rect x="' + n(x + w * 0.35) + '" y="' + n(by - st - hh * 0.75) + '" width="' + n(9 * s) + '" height="' + n(10 * s) + '" style="fill:#4A3523"/>' +
      path('M' + n(x - 10 * s) + ' ' + n(by - st - hh + 2 * s) + ' L' + n(x + w * 0.5) + ' ' + n(by - st - hh - 22 * s) + ' L' + n(x + w + 10 * s) + ' ' + n(by - st - hh + 2 * s) + ' Z', f(roof)) +
      g(path('M' + n(x + w * 0.7) + ' ' + n(by - st - hh - 12 * s) + ' v' + n(-26 * s) + ' M' + n(x + w * 0.7 - 10 * s) + ' ' + n(by - st - hh - 34 * s) + ' h' + n(20 * s) + ' M' + n(x + w * 0.7 - 7 * s) + ' ' + n(by - st - hh - 28 * s) + ' h' + n(14 * s) + ' M' + n(x + w * 0.7 - 4 * s) + ' ' + n(by - st - hh - 22 * s) + ' h' + n(8 * s), 'fill:none;stroke:#4E4A50;stroke-width:' + n(1.5 * s)), 'class="era era-tv"');
  }

  function riceRows() {
    const rows = [600, 624, 652, 684, 720, 762, 808, 858, 912];
    let out = '';
    rows.forEach((y, ri) => {
      const d = depth(y), spacing = 7 + d * 40, h = 6 + d * 54;
      let blades = '', heads = '';
      seed = 300 + ri * 17;
      for (let x = -120 + r(0, spacing); x < W + 120; x += spacing * r(0.85, 1.15)) {
        const hh = h * r(0.85, 1.12), lean = r(-0.25, 0.25) * hh;
        for (let b = -2; b <= 2; b++) {
          const bx = x + b * d * 3.2, tip = bx + lean + b * hh * 0.18, top = y - hh * (1 - Math.abs(b) * 0.12);
          blades += 'M' + n(bx - d * 1.4) + ' ' + y + ' Q' + n(bx + (tip - bx) * 0.3) + ' ' + n(y - hh * 0.6) + ' ' + n(tip) + ' ' + n(top) + ' Q' + n(bx + (tip - bx) * 0.35 + d * 1.6) + ' ' + n(y - hh * 0.55) + ' ' + n(bx + d * 1.4) + ' ' + y + ' Z ';
        }
        const hx = x + lean, hy = y - hh * 0.95;
        heads += 'M' + n(hx) + ' ' + n(hy) + ' q' + n(hh * 0.22) + ' ' + n(-hh * 0.05) + ' ' + n(hh * 0.3) + ' ' + n(hh * 0.32) + ' q' + n(-hh * 0.14) + ' ' + n(-hh * 0.1) + ' ' + n(-hh * 0.3) + ' ' + n(-hh * 0.22) + ' Z ' +
          'M' + n(hx) + ' ' + n(hy) + ' q' + n(-hh * 0.2) + ' ' + n(-hh * 0.02) + ' ' + n(-hh * 0.26) + ' ' + n(hh * 0.28) + ' q' + n(hh * 0.12) + ' ' + n(-hh * 0.12) + ' ' + n(hh * 0.26) + ' ' + n(-hh * 0.18) + ' Z ';
      }
      const inner = path(blades, f(ri % 2 ? 'var(--rice2)' : 'var(--rice)')) +
        path(blades, 'fill:none;stroke:rgba(255,255,255,.14);stroke-width:' + n(0.4 + d * 0.6)) +
        g(path(heads, f('var(--grain)')), 'class="grain"');
      out += g(g(inner, 'class="wave" style="animation-delay:' + n(-ri * 0.38) + 's"'), 'class="rice-row" style="transform-origin:0 ' + y + 'px"');
    });
    return out;
  }

  function bunds() {
    const ys = [578, 590, 606, 628, 656, 692, 738, 796, 868];
    let d = '';
    ys.forEach((y) => {
      const t = 1 + depth(y) * 9;
      d += 'M-200 ' + n(y - t / 2) + ' L1800 ' + n(y - t / 2) + ' L1800 ' + n(y + t / 2) + ' L-200 ' + n(y + t / 2) + ' Z ';
    });
    [-1500, -700, -80, 520, 1080, 1700, 2500].forEach((bx) => {
      const w0 = 2, w1 = 18;
      d += 'M' + n(VPX + (bx - VPX) * 0.12 - w0) + ' 571 L' + n(VPX + (bx - VPX) * 0.12 + w0) + ' 571 L' + n(bx + w1) + ' 900 L' + n(bx - w1) + ' 900 Z ';
    });
    return path(d, f('var(--bund)'));
  }

  function hut(x, by) {
    const stilts = [8, 52, 98, 142].map((dx) => '<rect x="' + (x + dx) + '" y="' + (by - 64) + '" width="6" height="64"/>').join('');
    let lanterns = '';
    [18, 74, 132].forEach((dx, i) => {
      const lx = x + dx, ly = by - 92 + (i % 2) * 6;
      lanterns += '<line x1="' + lx + '" y1="' + (by - 104) + '" x2="' + lx + '" y2="' + (ly - 8) + '" style="stroke:#5A3A20;stroke-width:1"/>' +
        '<circle cx="' + lx + '" cy="' + ly + '" r="22" style="fill:url(#ki-lamp)" class="lamp-glow"/>' +
        '<rect x="' + (lx - 6) + '" y="' + (ly - 8) + '" width="12" height="16" rx="5" style="fill:#F1A93A;stroke:#B5512A;stroke-width:1.2"/>' +
        '<rect x="' + (lx - 3) + '" y="' + (ly + 8) + '" width="6" height="3" style="fill:#B5512A"/>';
    });
    return g(
      '<ellipse cx="' + (x + 76) + '" cy="' + (by + 4) + '" rx="110" ry="10" style="fill:rgba(40,25,10,.18)"/>' +
      g(stilts, 'style="fill:#6B4E33"') +
      '<ellipse cx="' + (x + 30) + '" cy="' + (by - 10) + '" rx="14" ry="12" style="fill:#7A4A2E"/><ellipse cx="' + (x + 30) + '" cy="' + (by - 21) + '" rx="8" ry="2.5" style="fill:#4A2C1A"/>' +
      '<rect x="' + (x - 8) + '" y="' + (by - 70) + '" width="166" height="9" style="fill:#8A6644"/>' +
      '<rect x="' + (x + 2) + '" y="' + (by - 108) + '" width="146" height="38" style="fill:color-mix(in srgb,var(--thatch) 70%,#fff)"/>' +
      '<rect x="' + (x + 2) + '" y="' + (by - 108) + '" width="146" height="38" style="fill:url(#ki-weave)"/>' +
      '<rect x="' + (x + 2) + '" y="' + (by - 84) + '" width="146" height="14" style="fill:rgba(60,40,20,.25)"/>' +
      path('M' + (x - 30) + ' ' + (by - 102) + ' L' + (x + 75) + ' ' + (by - 166) + ' L' + (x + 180) + ' ' + (by - 102) + ' L' + (x + 172) + ' ' + (by - 94) + ' L' + (x + 75) + ' ' + (by - 152) + ' L' + (x - 22) + ' ' + (by - 94) + ' Z', f('var(--thatch)')) +
      path('M' + (x - 22) + ' ' + (by - 94) + ' L' + (x + 75) + ' ' + (by - 152) + ' L' + (x + 172) + ' ' + (by - 94) + ' Z', f('color-mix(in srgb,var(--thatch) 75%,#000)')) +
      path('M' + (x - 30) + ' ' + (by - 102) + ' L' + (x + 75) + ' ' + (by - 166) + ' L' + (x + 180) + ' ' + (by - 102), 'fill:none;stroke:color-mix(in srgb,var(--thatch) 60%,#000);stroke-width:2') +
      path(Array.from({ length: 14 }, (_, i) => 'M' + (x - 20 + i * 14) + ' ' + (by - 100 - Math.max(0, 6 - Math.abs(i - 6.5)) * 8.6) + ' l-3 12').join(' '), 'fill:none;stroke:rgba(80,50,20,.35);stroke-width:1.4') +
      path('M' + (x + 160) + ' ' + by + ' L' + (x + 146) + ' ' + (by - 70) + ' M' + (x + 176) + ' ' + by + ' L' + (x + 162) + ' ' + (by - 70) +
        [14, 28, 42, 56].map((k) => ' M' + n(x + 160 - k * 0.2) + ' ' + (by - k) + ' h16').join(''), 'fill:none;stroke:#6B4E33;stroke-width:3;stroke-linecap:round') +
      g(lanterns, 'class="lantern"')
    );
  }

  function buffalo(x, by, s, flip) {
    const body = 'M-70 -62 C-72 -95 -20 -108 30 -102 C70 -98 94 -84 94 -60 C94 -44 86 -34 80 -30 L80 0 L67 0 L64 -24 C40 -20 0 -20 -30 -24 L-34 0 L-47 0 L-51 -32 C-62 -40 -68 -50 -70 -62 Z';
    const legsBack = 'M-26 -26 L-24 0 L-14 0 L-14 -24 Z M52 -26 L54 0 L64 0 L62 -26 Z';
    const head = 'M-60 -84 C-84 -80 -100 -62 -110 -38 C-116 -24 -112 -12 -101 -12 C-93 -12 -89 -20 -83 -30 C-75 -44 -66 -52 -56 -56 Z';
    const horn = 'M-84 -66 C-104 -78 -96 -100 -66 -100 C-84 -94 -88 -84 -76 -70 Z';
    const tail = 'M92 -78 C100 -60 98 -40 96 -24 L100 -14 L92 -16 L93 -26 C95 -44 96 -60 90 -74 Z';
    const egret = g('<ellipse cx="0" cy="-104" rx="9" ry="5.5" style="fill:#FBFBF7"/>' + path('M-6 -106 C-12 -112 -10 -120 -14 -122 L-16 -120', 'fill:none;stroke:#FBFBF7;stroke-width:3;stroke-linecap:round') + path('M-16 -121 l-7 2 l7 1 Z', f('#E8B630')), 'class="egret"');
    return g(
      '<ellipse cx="0" cy="2" rx="104" ry="9" style="fill:rgba(30,20,10,.2)"/>' +
      path(legsBack, f('#34333C')) +
      path(tail, f('#3C3B45'), 'class="tail-swish" style="transform-origin:92px -78px"') +
      path(body, f('#4A4954')) +
      path('M-40 -96 C0 -108 50 -102 84 -84', 'fill:none;stroke:rgba(255,255,255,.18);stroke-width:4;stroke-linecap:round') +
      path(head, f('#454450')) +
      path(horn, f('#8F8778')) +
      '<ellipse cx="-74" cy="-62" rx="9" ry="4.5" transform="rotate(-25 -74 -62)" style="fill:#3B3A44"/>' +
      '<circle cx="-92" cy="-42" r="2" style="fill:#16151B"/>' +
      egret,
      'transform="translate(' + x + ' ' + by + ') scale(' + (flip ? -s : s) + ' ' + s + ')"'
    );
  }

  function egretStand(x, y, s) {
    return g('<ellipse cx="0" cy="-14" rx="10" ry="6" style="fill:#FBFBF7"/>' + path('M-7 -16 C-12 -24 -8 -30 -13 -34', 'fill:none;stroke:#FBFBF7;stroke-width:3.2;stroke-linecap:round') + path('M-13 -34 l-8 2 l8 1 Z', f('#E8B630')) + path('M-2 -9 v10 M3 -9 v10', 'stroke:#3B3A30;stroke-width:1.4'), 'transform="translate(' + x + ' ' + y + ') scale(' + s + ')"');
  }

  function kite() {
    const kx = 660, ky = 196;
    const body = 'M' + kx + ' ' + (ky - 50) + ' L' + (kx + 30) + ' ' + (ky - 26) + ' L' + (kx + 26) + ' ' + (ky + 22) + ' L' + kx + ' ' + (ky + 44) + ' L' + (kx - 26) + ' ' + (ky + 22) + ' L' + (kx - 30) + ' ' + (ky - 26) + ' Z';
    return g(
      path('M' + kx + ' ' + (ky + 44) + ' C 640 420 590 560 560 700', 'fill:none;stroke:rgba(60,40,30,.55);stroke-width:1.2') +
      g(
        path(body, f('#F3EAD6')) +
        path('M' + kx + ' ' + (ky - 50) + ' L' + kx + ' ' + (ky + 44) + ' M' + (kx - 30) + ' ' + (ky - 26) + ' L' + (kx + 26) + ' ' + (ky + 22) + ' M' + (kx + 30) + ' ' + (ky - 26) + ' L' + (kx - 26) + ' ' + (ky + 22), 'fill:none;stroke:#8F3610;stroke-width:1.4') +
        path('M' + (kx - 15) + ' ' + (ky - 14) + ' L' + kx + ' ' + (ky - 30) + ' L' + (kx + 15) + ' ' + (ky - 14) + ' L' + kx + ' ' + (ky + 4) + ' Z', f('#C2521C')) +
        path('M' + (kx - 8) + ' ' + (ky + 16) + ' L' + kx + ' ' + (ky + 8) + ' L' + (kx + 8) + ' ' + (ky + 16) + ' L' + kx + ' ' + (ky + 26) + ' Z', f('#24205C')) +
        path('M' + (kx - 48) + ' ' + (ky - 40) + ' Q' + kx + ' ' + (ky - 96) + ' ' + (kx + 48) + ' ' + (ky - 40), 'fill:none;stroke:#5A3A20;stroke-width:3;stroke-linecap:round') +
        path('M' + (kx - 48) + ' ' + (ky - 40) + ' L' + (kx + 48) + ' ' + (ky - 40), 'fill:none;stroke:#5A3A20;stroke-width:1') +
        path('M' + (kx - 4) + ' ' + (ky + 44) + ' q-14 30 6 56 q16 24 -4 56 M' + (kx + 4) + ' ' + (ky + 44) + ' q16 26 0 52 q-12 26 10 50', 'fill:none;stroke:#C2521C;stroke-width:2.4;stroke-linecap:round'),
        'class="kite-fly" style="transform-origin:' + kx + 'px ' + (ky + 44) + 'px"'
      ) +
      g('<circle cx="560" cy="676" r="5"/>' + path('M556 682 L564 682 L566 700 L554 700 Z M562 684 L570 670', 'stroke:#3A2E4A;stroke-width:2.6;stroke-linecap:round') + path('M556 700 L555 712 M564 700 L566 712', 'stroke:#3A2E4A;stroke-width:2.6;stroke-linecap:round'), 'style="fill:#3A2E4A"'),
      'class="kite"'
    );
  }

  function sheaves() {
    let out = '';
    [[612, 744, 1], [690, 752, 0.8], [1240, 712, 0.7], [1310, 724, 0.85]].forEach((p) => {
      const x = p[0], y = p[1], s = p[2];
      out += '<ellipse cx="' + x + '" cy="' + (y + 2) + '" rx="' + n(34 * s) + '" ry="' + n(5 * s) + '" style="fill:rgba(60,40,10,.2)"/>' +
        path('M' + n(x - 30 * s) + ' ' + y + ' Q' + n(x - 30 * s) + ' ' + n(y - 46 * s) + ' ' + x + ' ' + n(y - 54 * s) + ' Q' + n(x + 30 * s) + ' ' + n(y - 46 * s) + ' ' + n(x + 30 * s) + ' ' + y + ' Z', f('var(--rice2)')) +
        path('M' + n(x - 22 * s) + ' ' + n(y - 4) + ' Q' + n(x - 18 * s) + ' ' + n(y - 38 * s) + ' ' + x + ' ' + n(y - 50 * s) + ' M' + n(x + 22 * s) + ' ' + n(y - 4) + ' Q' + n(x + 18 * s) + ' ' + n(y - 38 * s) + ' ' + x + ' ' + n(y - 50 * s) + ' M' + x + ' ' + y + ' L' + x + ' ' + n(y - 50 * s), 'fill:none;stroke:var(--grain);stroke-width:' + n(2 * s)) +
        path('M' + n(x - 31 * s) + ' ' + n(y - 16 * s) + ' Q' + x + ' ' + n(y - 24 * s) + ' ' + n(x + 31 * s) + ' ' + n(y - 16 * s), 'fill:none;stroke:#8A5D20;stroke-width:' + n(2 * s));
    });
    return g(out, 'class="sheaf"');
  }

  function poles(points, h0) {
    let out = '', wires = '';
    const tops = [];
    points.forEach((p) => {
      const d = depth(p[1]), h = h0 * d, w = Math.max(1.2, 6 * d);
      out += '<rect x="' + n(p[0] - w / 2) + '" y="' + n(p[1] - h) + '" width="' + n(w) + '" height="' + n(h) + '" style="fill:#C9C3B6"/>' +
        '<rect x="' + n(p[0] - 22 * d) + '" y="' + n(p[1] - h + 8 * d) + '" width="' + n(44 * d) + '" height="' + n(Math.max(1, 4 * d)) + '" style="fill:#9C968A"/>';
      tops.push([p[0], p[1] - h + 9 * d, d]);
    });
    for (let i = 0; i < tops.length - 1; i++) {
      const a = tops[i], b = tops[i + 1];
      [-18, 18].forEach((o) => {
        const ax = a[0] + o * a[2], bx = b[0] + o * b[2], sag = 14 * (a[2] + b[2]);
        wires += 'M' + n(ax) + ' ' + n(a[1]) + ' Q' + n((ax + bx) / 2) + ' ' + n((a[1] + b[1]) / 2 + sag) + ' ' + n(bx) + ' ' + n(b[1]) + ' ';
      });
    }
    return path(wires, 'fill:none;stroke:#3E3A40;stroke-width:1;stroke-opacity:.7') + out;
  }

  function motorbike(x, y, s, col) {
    return g(
      '<circle cx="-16" cy="-9" r="9" style="fill:none;stroke:#26232B;stroke-width:3.4"/><circle cx="18" cy="-9" r="9" style="fill:none;stroke:#26232B;stroke-width:3.4"/>' +
      path('M-16 -9 L-4 -22 L12 -22 L18 -9 M-4 -22 L-10 -30 L6 -30 Z', 'fill:' + col + ';stroke:' + col + ';stroke-width:3;stroke-linejoin:round') +
      path('M12 -22 L16 -34 L22 -34', 'fill:none;stroke:#26232B;stroke-width:2.4;stroke-linecap:round') +
      '<rect x="-14" y="-34" width="18" height="5" rx="2" style="fill:#26232B"/>',
      'transform="translate(' + x + ' ' + y + ') scale(' + s + ')"'
    );
  }

  function rural() {
    seed = 401;
    const road = 'M864 571 L874 571 L1560 920 L1330 920 Z';
    return g(
      templeAndTrees(true) +
      stiltHouse(700, 578, 0.5, '#8E8A86') + stiltHouse(800, 580, 0.55, 'var(--thatch)') +
      g(
        '<rect x="-200" y="571" width="2000" height="400" style="fill:var(--soil)"/>' +
        '<rect x="-200" y="571" width="2000" height="90" class="cracks" style="fill:url(#ki-cracks-far)"/>' +
        '<rect x="-200" y="650" width="2000" height="300" class="cracks" style="fill:url(#ki-cracks)"/>' +
        g('<rect x="-200" y="571" width="2000" height="400" style="fill:url(#ki-reflect)"/><rect x="-200" y="571" width="2000" height="400" style="fill:url(#ki-ripple)"/>', 'class="wet"') +
        '<rect x="-200" y="571" width="2000" height="40" class="far-rice" style="fill:url(#ki-farrows)"/>' +
        bunds() +
        path(road, f('var(--road)')) +
        path(road, f('url(#ki-reflect)'), 'class="wetroad"') +
        riceRows(),
        'clip-path="url(#ki-fieldclip)"'
      ) +
      g('<rect x="-200" y="556" width="2000" height="22" style="fill:url(#ki-mist)"/>', 'class="heat"><g class="shimmer"') + '</g>' +
      '<rect x="-200" y="540" width="2000" height="160" class="mist" style="fill:url(#ki-mist)"/>' +
      g(poles([[1500, 900], [1290, 792], [1130, 712], [1018, 656], [948, 620], [904, 598], [880, 586]], 300), 'class="era era-electricity"') +
      palm(250, 760, 400, 1.35, -14) +
      sheaves() +
      hut(430, 736) +
      g(motorbike(612, 740, 1.2, '#9E2B25'), 'class="era era-motorcycle"') +
      kite() +
      buffalo(1000, 812, 1, false) +
      buffalo(1150, 708, 0.5, true) +
      g(egretStand(760, 690, 0.9) + egretStand(820, 702, 1) + egretStand(1240, 650, 0.7) + egretStand(560, 640, 0.6), 'class="egret"') +
      palm(1360, 700, 330, 1.1, 10) + palm(1440, 690, 270, 0.95, -8) + palm(1210, 640, 210, 0.75, 6),
      'class="pl pl-rural"'
    );
  }

  function town() {
    seed = 501;
    const pal = ['#EBD9BF', '#E2C6A4', '#D6DBC9', '#EACFBE', '#CED6DC', '#EFE0C2', '#E6D2D6'];
    const signs = ['#C2521C', '#2F3C7E', '#E8A923', '#2E7D22', '#B23A1E', '#4A6FA5'];
    let bld = '', antennas = '', bikes = '';
    let x = -60, i = 0;
    while (x < 1680) {
      const w = r(96, 140), h = r(150, 236), by = 720, top = by - h, c = pal[i % pal.length];
      if (x + w > 730 && x < 870) { x = 870; continue; }
      bld += '<rect x="' + n(x) + '" y="' + n(top) + '" width="' + n(w) + '" height="' + n(h) + '" style="fill:' + c + '"/>' +
        '<rect x="' + n(x) + '" y="' + n(top) + '" width="' + n(w) + '" height="' + n(h) + '" style="fill:var(--tint);opacity:.22"/>' +
        '<rect x="' + n(x - 3) + '" y="' + n(top - 6) + '" width="' + n(w + 6) + '" height="8" style="fill:rgba(0,0,0,.12)"/>' +
        '<rect x="' + n(x + 8) + '" y="' + n(top + 14) + '" width="' + n(w - 16) + '" height="' + n(h - 96) + '" style="fill:url(#ki-windows)"/>' +
        '<rect x="' + n(x + 6) + '" y="' + n(by - 82) + '" width="' + n(w - 12) + '" height="16" style="fill:' + signs[i % signs.length] + '"/>' +
        '<rect x="' + n(x + 14) + '" y="' + n(by - 78) + '" width="' + n((w - 28) * r(0.4, 0.8)) + '" height="3" style="fill:rgba(255,255,255,.7)"/>' +
        (i % 3 === 1
          ? '<rect x="' + n(x + 6) + '" y="' + n(by - 62) + '" width="' + n(w - 12) + '" height="62" style="fill:#C9C1B0"/><rect x="' + n(x + 6) + '" y="' + n(by - 62) + '" width="' + n(w - 12) + '" height="62" style="fill:url(#ki-shutter)"/>'
          : '<rect x="' + n(x + 6) + '" y="' + n(by - 62) + '" width="' + n(w - 12) + '" height="62" style="fill:#4C3E36"/>' +
            path('M' + n(x + 2) + ' ' + n(by - 64) + ' h' + n(w - 4) + ' l10 18 h' + n(-w - 16) + ' Z', f(i % 2 ? '#2F6F8F' : '#B5513A')) +
            '<rect x="' + n(x + 14) + '" y="' + n(by - 30) + '" width="' + n(w - 28) + '" height="22" style="fill:#E6C08A;opacity:.8"/>') +
        '<rect x="' + n(x) + '" y="' + n(top) + '" width="2" height="' + n(h) + '" style="fill:rgba(0,0,0,.1)"/>';
      antennas += path('M' + n(x + w * 0.6) + ' ' + n(top - 6) + ' v-30 M' + n(x + w * 0.6 - 14) + ' ' + n(top - 30) + ' h28 M' + n(x + w * 0.6 - 10) + ' ' + n(top - 23) + ' h20 M' + n(x + w * 0.6 - 6) + ' ' + n(top - 16) + ' h12', 'fill:none;stroke:#4E4A50;stroke-width:1.8');
      if (i % 2 === 0) bikes += motorbike(x + w * 0.5, 742, 1, ['#9E2B25', '#2F3C7E', '#3A3A3A', '#B9862A'][i % 4]);
      x += w; i++;
    }
    const tower = g(
      '<ellipse cx="800" cy="808" rx="150" ry="22" style="fill:#7FA560"/><ellipse cx="800" cy="802" rx="150" ry="18" style="fill:#94BB72"/>' +
      g([-110, -70, -30, 30, 70, 110].map((dx) => '<circle cx="' + (800 + dx) + '" cy="' + (796 + Math.abs(dx) * 0.04) + '" r="6"/>').join(''), 'style="fill:#E8A923"') +
      '<rect x="770" y="752" width="60" height="44" style="fill:#E9E0CF"/><rect x="764" y="746" width="72" height="10" style="fill:#D9A93A"/>' +
      '<rect x="780" y="520" width="40" height="232" style="fill:#F3ECDF"/><rect x="780" y="520" width="8" height="232" style="fill:rgba(0,0,0,.08)"/>' +
      '<rect x="776" y="600" width="48" height="6" style="fill:#D9A93A"/><rect x="776" y="680" width="48" height="6" style="fill:#D9A93A"/>' +
      '<circle cx="800" cy="552" r="18" style="fill:#fff;stroke:#24205C;stroke-width:3"/>' +
      path('M800 552 L800 540 M800 552 L809 556', 'stroke:#24205C;stroke-width:2.4;stroke-linecap:round') +
      path('M772 524 L800 494 L828 524 Z', f('#B5513A')) + path('M782 500 L800 474 L818 500 Z', f('#C76A3E')) + path('M798 474 L800 450 L802 474 Z', f('#D9A93A'))
    );
    return g(
      templeAndTrees(true) +
      bld +
      g(antennas, 'class="era era-tv"') +
      '<rect x="-200" y="718" width="2000" height="20" style="fill:#D8CFBF"/><rect x="-200" y="736" width="2000" height="4" style="fill:#B8AE9C"/>' +
      path('M-200 740 L1800 740 L1800 920 L-200 920 Z', f('var(--asphalt)')) +
      path('M-200 740 L1800 740 L1800 920 L-200 920 Z', f('url(#ki-reflect)'), 'class="wetroad"') +
      path('M0 860 h120 M300 860 h120 M1180 860 h120 M1480 860 h120 M100 790 h80 M380 790 h80 M1140 790 h80 M1420 790 h80', 'stroke:#F2EEE4;stroke-width:5;stroke-opacity:.8') +
      g(bikes, 'class="era era-motorcycle"') +
      tower +
      g(poles([[90, 760], [430, 760], [1170, 760], [1510, 760]], 330), 'class="era era-electricity"') +
      tree(260, 760, 1.4, 'var(--tree)', 'var(--tree2)') + tree(1340, 760, 1.5, 'var(--tree)', 'var(--tree2)') +
      '<rect x="-200" y="540" width="2000" height="160" class="mist" style="fill:url(#ki-mist);opacity:calc(var(--mist) * .5)"/>',
      'class="pl pl-town"'
    );
  }

  function mekong() {
    seed = 601;
    seed = 641;
    const lao1 = ridge(470, 46, 110, -100, 1700);
    seed = 661;
    const lao2 = ridge(516, 26, 80, -100, 1700);
    seed = 677;
    const bankTrees = canopy(556, -60, 1700, 6, 12);
    let glints = '';
    for (let i = 0; i < 18; i++) {
      const gx = 1150 + r(-90, 90) * (1 + i / 10), gy = 580 + i * 7 + r(-2, 2);
      glints += '<rect class="glint" x="' + n(gx) + '" y="' + n(gy) + '" width="' + n(r(10, 34)) + '" height="1.6" style="fill:#fff;animation-delay:' + n(-r(0, 3)) + 's"/>';
    }
    let rail = '';
    for (let x = -40; x < 1660; x += 36) rail += '<rect x="' + x + '" y="726" width="9" height="28" rx="2"/>';
    const boat = g(
      path('M-60 0 L60 0 L74 -8 L-64 -8 Z', f('#5B3B24')) + path('M-40 -8 L-34 -20 L10 -20 L16 -8 Z', f('#2F6F8F')) +
      path('M60 -4 L96 6', 'stroke:#333;stroke-width:2') + '<ellipse cx="0" cy="4" rx="70" ry="3" style="fill:rgba(255,255,255,.35)"/>',
      'class="bob"'
    );
    return g(
      path(lao1, f('color-mix(in srgb,var(--hill2) 70%,var(--tree))')) +
      path(lao2, f('color-mix(in srgb,var(--hill3) 65%,var(--tree2))')) +
      '<rect x="-200" y="430" width="2000" height="170" class="haze" style="fill:url(#ki-haze);opacity:calc(var(--haze-o) * .7)"/>' +
      path(bankTrees, f('var(--tree2)')) +
      '<rect x="-200" y="562" width="2000" height="200" style="fill:url(#ki-river)"/>' +
      '<rect x="-200" y="562" width="2000" height="200" style="fill:url(#ki-reflect);opacity:.25"/>' +
      '<rect x="-200" y="562" width="2000" height="200" style="fill:url(#ki-ripple);opacity:.8"/>' +
      g(path('M200 612 Q420 598 760 604 Q1040 610 1220 618 Q960 626 640 624 Q360 622 200 612 Z', f('#E2CFA3')) + path('M260 612 Q600 604 980 612', 'fill:none;stroke:#C9B183;stroke-width:2'), 'class="sandbar"') +
      glints +
      g(g(boat, 'transform="translate(0 652)"'), 'class="boat-cross"') +
      path('M-200 708 L1800 708 L1800 744 L-200 744 Z', f('#CFC4AE')) +
      path('M-200 708 L1800 708', 'stroke:#B4A88F;stroke-width:3') +
      g('<rect class="river-edge" x="-200" y="700" width="2000" height="60" style="fill:var(--river);opacity:.92"/>', 'clip-path="url(#ki-bankclip)"') +
      '<rect x="-200" y="744" width="2000" height="190" style="fill:#E6DCC6"/>' +
      path('M-200 760 L1800 760', 'stroke:rgba(0,0,0,.08);stroke-width:2') +
      path(Array.from({ length: 30 }, (_, k) => 'M' + (k * 60 - 100) + ' 760 L' + (k * 60 - 100 - (k * 60 - 900) * 0.25) + ' 920').join(' '), 'stroke:rgba(0,0,0,.06);stroke-width:2') +
      '<rect x="-200" y="722" width="2000" height="7" rx="3" style="fill:#E3C766"/>' +
      g(rail, 'style="fill:#EADFC7"') +
      '<rect x="-200" y="750" width="2000" height="6" style="fill:#C4B496"/>' +
      g(
        path('M420 756 C410 720 398 690 412 660 C424 636 450 632 460 650 C466 662 456 676 444 672 L452 690 C446 700 436 712 440 756 Z', f('#D7B04A')) +
        path('M412 660 C418 640 436 626 458 640 M444 654 l10 -20 l6 18 M432 650 l4 -22 l8 18', 'fill:none;stroke:#9B7A24;stroke-width:2') +
        '<circle cx="450" cy="654" r="2.6" style="fill:#24205C"/>',
        ''
      ) +
      tree(220, 790, 1.7, 'var(--tree)', 'var(--tree2)') + tree(1360, 800, 1.9, 'var(--tree)', 'var(--tree2)') +
      g([600, 1000].map((lx) => '<rect x="' + (lx - 2) + '" y="640" width="4" height="116" style="fill:#4A4A55"/><path d="M' + lx + ' 640 q14 -6 22 4" style="fill:none;stroke:#4A4A55;stroke-width:3"/><circle cx="' + (lx + 22) + '" cy="647" r="5" style="fill:#FFF3C8"/>').join('')) +
      g(motorbike(1120, 812, 1.25, '#2F3C7E'), 'class="era era-motorcycle"') +
      '<rect x="-200" y="540" width="2000" height="120" class="mist" style="fill:url(#ki-mist)"/>',
      'class="pl pl-mekong"'
    );
  }

  function bangkok() {
    seed = 701;
    let far = '', mid = '', near = '';
    for (let x = -80; x < 1700; x += r(40, 80)) {
      const w = r(36, 70), h = r(90, 260);
      far += '<rect x="' + n(x) + '" y="' + n(600 - h) + '" width="' + n(w) + '" height="' + n(h) + '"/>';
    }
    for (let x = -60; x < 1700; x += r(90, 150)) {
      const w = r(60, 110), h = r(180, 400), top = 640 - h;
      mid += '<rect x="' + n(x) + '" y="' + n(top) + '" width="' + n(w) + '" height="' + n(h) + '" style="fill:color-mix(in srgb,var(--hill2) 55%,#8C93A3)"/>' +
        '<rect x="' + n(x + 6) + '" y="' + n(top + 10) + '" width="' + n(w - 12) + '" height="' + n(h - 20) + '" style="fill:url(#ki-windows);opacity:.8"/>' +
        '<rect x="' + n(x) + '" y="' + n(top) + '" width="' + n(w * 0.3) + '" height="' + n(h) + '" style="fill:rgba(255,255,255,.12)"/>' +
        (rnd() > 0.6 ? path('M' + n(x + w / 2) + ' ' + n(top) + ' v-30', 'stroke:#6C7280;stroke-width:2') : '');
    }
    [[-40, 160, 520], [1420, 200, 560], [140, 110, 380], [1280, 120, 420]].forEach((b) => {
      near += '<rect x="' + b[0] + '' + '" y="' + (720 - b[2]) + '" width="' + b[1] + '" height="' + b[2] + '" style="fill:color-mix(in srgb,var(--hill3) 40%,#6E7484)"/>' +
        '<rect x="' + (b[0] + 10) + '" y="' + (730 - b[2]) + '" width="' + (b[1] - 20) + '" height="' + (b[2] - 30) + '" style="fill:url(#ki-windows)"/>' +
        '<rect x="' + b[0] + '" y="' + (720 - b[2]) + '" width="' + b[1] + '" height="' + b[2] + '" style="fill:var(--tint);opacity:.15"/>';
    });
    const train = g(
      [0, 1, 2, 3].map((k) => '<rect x="' + (k * 96) + '" y="582" width="92" height="30" rx="8" style="fill:#F2F2EE"/><rect x="' + (k * 96 + 8) + '" y="588" width="76" height="10" rx="3" style="fill:#3B4660"/><rect x="' + (k * 96) + '" y="604" width="92" height="5" style="fill:#2E7D22"/>').join(''),
      'class="train"'
    );
    let pillars = '';
    for (let x = 60; x < 1600; x += 260) pillars += '<rect x="' + x + '" y="622" width="26" height="110" style="fill:#BDB6AA"/>';
    return g(
      g(far, 'style="fill:color-mix(in srgb,var(--hill1) 70%,#B7BCC8);opacity:.9"') +
      '<rect x="-200" y="300" width="2000" height="320" style="fill:url(#ki-haze);opacity:calc(var(--haze-o) * .9)"/>' +
      mid + near +
      pillars +
      train +
      '<rect x="-200" y="612" width="2000" height="16" style="fill:#D6D0C4"/><rect x="-200" y="626" width="2000" height="4" style="fill:#A7A092"/>' +
      '<rect x="-200" y="730" width="2000" height="200" style="fill:var(--asphalt)"/>' +
      path('M-200 730 L1800 730 L1800 920 L-200 920 Z', f('url(#ki-reflect)'), 'class="wetroad"') +
      '<rect x="-200" y="726" width="2000" height="10" style="fill:#CFC7B8"/>' +
      path('M40 830 h140 M360 830 h140 M700 830 h140 M1040 830 h140 M1380 830 h140', 'stroke:#F2EEE4;stroke-width:5;stroke-opacity:.75') +
      tree(330, 760, 1.3, 'var(--tree)', 'var(--tree2)') + tree(980, 760, 1.2, 'var(--tree)', 'var(--tree2)') + tree(1520, 770, 1.4, 'var(--tree)', 'var(--tree2)'),
      'class="pl pl-bangkok"'
    );
  }

  function abroad() {
    seed = 801;
    let houses = '';
    [[520, 600, 1], [580, 604, 0.8], [1010, 596, 0.9], [1070, 600, 1.1]].forEach((h) => {
      const x = h[0], y = h[1], s = h[2];
      houses += '<rect x="' + x + '" y="' + n(y - 18 * s) + '" width="' + n(30 * s) + '" height="' + n(18 * s) + '" style="fill:#EDE6DA"/>' +
        path('M' + n(x - 3 * s) + ' ' + n(y - 17 * s) + ' L' + n(x + 15 * s) + ' ' + n(y - 32 * s) + ' L' + n(x + 33 * s) + ' ' + n(y - 17 * s) + ' Z', f('#8C5A4A')) +
        '<rect x="' + n(x + 6 * s) + '" y="' + n(y - 12 * s) + '" width="' + n(6 * s) + '" height="' + n(6 * s) + '" style="fill:#5A6070"/>';
    });
    let fence = '';
    for (let x = -20; x < 1640; x += 30) fence += '<rect x="' + x + '" y="772" width="4" height="34"/>';
    return g(
      path('M-200 590 C200 560 500 600 800 586 C1100 572 1400 596 1800 580 L1800 920 L-200 920 Z', f('color-mix(in srgb,var(--hill3) 60%,var(--bund))')) +
      houses +
      path('M-200 640 C300 610 700 660 1000 640 C1300 620 1500 650 1800 640 L1800 920 L-200 920 Z', f('color-mix(in srgb,var(--bund) 70%,var(--rice))')) +
      path('M-200 720 C300 700 600 740 1000 716 C1300 700 1500 730 1800 716 L1800 920 L-200 920 Z', f('var(--rice2)')) +
      path('M-200 720 C300 700 600 740 1000 716 C1300 700 1500 730 1800 716 L1800 920 L-200 920 Z', f('url(#ki-farrows)'), 'style="opacity:.5"') +
      g(fence + '<rect x="-200" y="780" width="2000" height="4"/><rect x="-200" y="794" width="2000" height="4"/>', 'style="fill:#8A6F55"') +
      tree(300, 640, 0.9, 'var(--tree)', 'var(--tree2)') + tree(1280, 650, 1.1, 'var(--tree)', 'var(--tree2)') + tree(1450, 790, 2, 'var(--tree)', 'var(--tree2)') +
      '<rect x="-200" y="540" width="2000" height="160" class="mist" style="fill:url(#ki-mist)"/>',
      'class="pl pl-abroad"'
    );
  }

  function temple() {
    const roof = (x, y, w, h, c) => path('M' + (x - w / 2) + ' ' + y + ' L' + x + ' ' + (y - h) + ' L' + (x + w / 2) + ' ' + y + ' Z', f(c));
    const hall = g(
      '<rect x="560" y="520" width="480" height="150" style="fill:#F4EBDA"/>' +
      roof(800, 530, 560, 90, '#B5513A') + roof(800, 470, 440, 70, '#C76A3E') + roof(800, 420, 320, 60, '#B5513A') +
      path('M520 530 l-26 -40 l12 4 Z M1080 530 l26 -40 l-12 4 Z M580 470 l-22 -34 l10 3 Z M1020 470 l22 -34 l-10 3 Z', f('#D9A93A')) +
      path('M520 530 L800 440 L1080 530', 'fill:none;stroke:#D9A93A;stroke-width:5') +
      '<rect x="760" y="580" width="80" height="90" style="fill:#7B4B34"/>' +
      '<rect x="620" y="580" width="40" height="60" style="fill:#7B4B34;opacity:.8"/><rect x="940" y="580" width="40" height="60" style="fill:#7B4B34;opacity:.8"/>' +
      '<rect x="540" y="664" width="520" height="22" style="fill:#E6DAC2"/>'
    );
    const stupa = g(
      path('M1260 690 L1260 620 L1240 620 L1240 600 L1380 600 L1380 620 L1360 620 L1360 690 Z', f('#F2EBDD')) +
      path('M1250 600 Q1310 520 1310 430 Q1310 520 1370 600 Z', f('#F2EBDD')) +
      path('M1304 440 L1310 380 L1316 440 Z', f('#D9A93A'))
    );
    const bodhi = canopy(560, 120, 420, 40, 70);
    return g(
      '<rect x="-200" y="660" width="2000" height="260" style="fill:#E8DFC9"/>' +
      path('M-200 700 L1800 700 L1800 920 L-200 920 Z', f('#D9CDB2')) +
      g(path(bodhi, f('var(--tree)')) + '<rect x="262" y="560" width="26" height="140" style="fill:#6B4A33"/>') +
      hall + stupa +
      path('M700 760 h200 M650 800 h300', 'stroke:#C9BC9F;stroke-width:6') +
      tree(1500, 720, 1.1, 'var(--tree)', 'var(--tree2)'),
      'class="pl pl-temple"'
    );
  }

  function prison() {
    let bars = '';
    for (let x = 140; x <= 1460; x += 34) bars += '<rect x="' + x + '" y="586" width="7" height="50" style="fill:#5E6166"/>';
    let wire = '';
    for (let x = -200; x < 1800; x += 40) wire += '<circle cx="' + x + '" cy="548" r="13" style="fill:none;stroke:#7D8086;stroke-width:3"/>';
    const tower = (x) => g(
      '<rect x="' + (x - 30) + '" y="500" width="60" height="200" style="fill:#B9B2A4"/>' +
      '<rect x="' + (x - 48) + '" y="470" width="96" height="46" style="fill:#A39B8C"/>' +
      '<rect x="' + (x - 32) + '" y="482" width="64" height="20" style="fill:#3F444A"/>' +
      path('M' + (x - 58) + ' 472 L' + x + ' 440 L' + (x + 58) + ' 472 Z', f('#6E6558'))
    );
    return g(
      '<rect x="-200" y="560" width="2000" height="140" style="fill:#D8D1C2"/>' +
      '<rect x="-200" y="560" width="2000" height="12" style="fill:#BDB5A5"/>' +
      wire +
      '<rect x="120" y="580" width="1360" height="62" style="fill:#4A4E54;opacity:.22"/>' + bars +
      '<rect x="680" y="596" width="240" height="104" style="fill:#6B6F75"/>' +
      '<rect x="690" y="606" width="106" height="94" style="fill:#5A5E64"/><rect x="804" y="606" width="106" height="94" style="fill:#5A5E64"/>' +
      tower(260) + tower(560) + tower(1040) + tower(1340) +
      '<rect x="-200" y="700" width="2000" height="300" style="fill:#C9C2B3"/>' +
      path('M-200 770 h2000 M-200 830 h2000', 'stroke:#B4AC9B;stroke-width:5'),
      'class="pl pl-prison" transform="translate(0 120)"'
    );
  }

  function desert() {
    seed = 901;
    let blocks = '';
    for (let x = 200; x < 1500; x += r(90, 160)) {
      const w = r(60, 120), h = r(40, 110);
      blocks += '<rect x="' + n(x) + '" y="' + n(640 - h) + '" width="' + n(w) + '" height="' + n(h) + '" style="fill:#E7D3AE"/><rect x="' + n(x + 10) + '" y="' + n(650 - h) + '" width="12" height="12" style="fill:#8B7356"/>';
    }
    const palmTree = (x, s) => g('<rect x="' + (x - 5 * s) + '" y="' + (700 - 160 * s) + '" width="' + (10 * s) + '" height="' + (160 * s) + '" style="fill:#8A6B4A"/>' + path('M' + x + ' ' + (700 - 160 * s) + ' q-70 10 -90 50 M' + x + ' ' + (700 - 160 * s) + ' q70 10 90 50 M' + x + ' ' + (700 - 160 * s) + ' q-40 -40 -80 -30 M' + x + ' ' + (700 - 160 * s) + ' q40 -40 80 -30', 'fill:none;stroke:#6F8F3E;stroke-width:' + 14 * s + ';stroke-linecap:round'));
    return g(
      '<rect x="-200" y="560" width="2000" height="360" style="fill:#E9C98E"/>' +
      path('M-200 640 C200 590 500 650 800 610 C1100 570 1400 640 1800 600 L1800 920 L-200 920 Z', f('#E2B978')) +
      blocks +
      path('M-200 720 C300 680 700 740 1100 700 C1400 670 1600 720 1800 700 L1800 920 L-200 920 Z', f('#D9A862')) +
      '<rect x="1000" y="610" width="220" height="70" style="fill:#C9C2B4"/><rect x="1060" y="560" width="14" height="50" style="fill:#9D9688"/><path d="M1010 610 L1110 560 L1210 610 Z" style="fill:#B0A898"/>' +
      palmTree(260, 1) + palmTree(380, 0.8) + palmTree(1460, 1.1),
      'class="pl pl-desert"'
    );
  }

  function asiacity() {
    seed = 911;
    let towers = '', signs = '';
    for (let x = -60; x < 1700; x += r(70, 120)) {
      const w = r(60, 100), h = r(200, 420), top = 660 - h;
      towers += '<rect x="' + n(x) + '" y="' + n(top) + '" width="' + n(w) + '" height="' + n(h) + '" style="fill:color-mix(in srgb,#7E8AA0 70%,var(--hill2))"/><rect x="' + n(x + 6) + '" y="' + n(top + 12) + '" width="' + n(w - 12) + '" height="' + n(h - 24) + '" style="fill:url(#ki-windows);opacity:.9"/>';
      if (rnd() > 0.5) signs += '<rect x="' + n(x + w - 16) + '" y="' + n(top + 40) + '" width="14" height="' + n(r(60, 120)) + '" rx="3" style="fill:' + ['#E2483D', '#F2B63C', '#3BA7C9', '#E06AA8'][Math.floor(rnd() * 4)] + '"/>';
    }
    let lanterns = '';
    for (let x = 80; x < 1600; x += 140) lanterns += '<circle cx="' + x + '" cy="700" r="12" style="fill:#D9443A"/>';
    return g(
      towers + signs +
      '<rect x="-200" y="650" width="2000" height="30" style="fill:#8F8A84"/>' +
      path('M-200 700 h2000', 'stroke:#5A5550;stroke-width:3') + lanterns +
      '<rect x="-200" y="730" width="2000" height="200" style="fill:var(--asphalt)"/>' +
      path('M40 830 h140 M360 830 h140 M700 830 h140 M1040 830 h140 M1380 830 h140', 'stroke:#F2EEE4;stroke-width:5;stroke-opacity:.75'),
      'class="pl pl-asiacity"'
    );
  }

  function nordic() {
    seed = 921;
    let pines = '';
    for (let x = -60; x < 1700; x += r(40, 80)) {
      const s = r(0.6, 1.2), by = r(600, 660);
      pines += path('M' + n(x) + ' ' + n(by - 200 * s) + ' L' + n(x - 40 * s) + ' ' + n(by) + ' L' + n(x + 40 * s) + ' ' + n(by) + ' Z', f(rnd() > 0.5 ? '#2F5A3B' : '#3E6B47'));
    }
    let berries = '';
    for (let i = 0; i < 60; i++) berries += '<circle cx="' + n(r(-100, 1700)) + '" cy="' + n(r(760, 900)) + '" r="' + n(r(4, 7)) + '" style="fill:' + (rnd() > 0.5 ? '#3B3F8F' : '#B8263A') + '"/>';
    return g(
      pines +
      '<rect x="-200" y="640" width="2000" height="70" style="fill:#7FA8C2"/>' +
      '<rect x="1120" y="600" width="160" height="80" style="fill:#A8322B"/><path d="M1105 604 L1200 548 L1295 604 Z" style="fill:#3B3B3B"/><rect x="1150" y="625" width="26" height="26" style="fill:#F2F2EE"/><rect x="1220" y="635" width="24" height="45" style="fill:#F2F2EE"/>' +
      path('M-200 700 C300 680 700 720 1100 700 C1400 690 1600 710 1800 700 L1800 920 L-200 920 Z', f('#6E8F4E')) +
      berries,
      'class="pl pl-nordic"'
    );
  }

  function fx() {
    const rocket = g(
      path('M560 760 L560 690 M548 760 L560 700 L572 760', 'fill:none;stroke:#6B4E33;stroke-width:4') +
      path('M564 690 C580 520 640 300 820 -380', 'fill:none;stroke:#F4EFE6;stroke-width:16;stroke-linecap:round;stroke-dasharray:1200;stroke-dashoffset:1200;opacity:.85', 'class="rocket-trail"') +
      g(
        '<rect x="556" y="640" width="14" height="60" rx="3" style="fill:#C2521C"/><rect x="556" y="652" width="14" height="5" style="fill:#E8A923"/><rect x="556" y="672" width="14" height="5" style="fill:#E8A923"/>' +
        path('M556 640 L563 620 L570 640 Z', f('#E8A923')) + path('M563 700 L560 760', 'stroke:#8A6644;stroke-width:3') +
        path('M556 700 L563 728 L570 700 Z', f('#FFC54A')),
        'class="rocket" style="transform-origin:563px 680px"'
      ),
      'class="fx fx-rocket"'
    );
    const fireboat = (x, y, s, cls) => {
      let lights = '';
      const pts = [];
      for (let i = 0; i <= 16; i++) {
        const t = i / 16, px = -90 + t * 180, py = -18 - Math.sin(t * Math.PI) * 60 - Math.sin(t * Math.PI * 3) * 8;
        pts.push([px, py]);
      }
      pts.forEach((p) => { lights += '<circle cx="' + n(p[0]) + '" cy="' + n(p[1]) + '" r="3.4"/>'; });
      for (let i = 0; i < 9; i++) lights += '<circle cx="' + (-80 + i * 20) + '" cy="-10" r="3"/>';
      return g(
        '<ellipse cx="0" cy="40" rx="120" ry="44" style="fill:#FFB547;opacity:.18"/>' +
        path('M-100 0 L100 0 L88 10 L-88 10 Z', f('#2A1E18')) +
        g(lights, 'style="fill:#FFD27A"') +
        g(lights, 'style="fill:#FFB547;opacity:.5" transform="scale(1 -.6) translate(0 -36)"'),
        'class="' + cls + '" transform="translate(' + x + ' ' + y + ') scale(' + s + ')"'
      );
    };
    return '<rect x="-200" y="-200" width="2000" height="1200" class="fx fx-dusk" style="fill:url(#ki-dusk)"/>' +
      g(
        '<rect x="-200" y="600" width="2000" height="330" style="fill:#1E2346;opacity:.55"/>' +
        g(fireboat(560, 700, 1, ''), 'class="boat-a"') + g(fireboat(1020, 650, 0.7, ''), 'class="boat-b"'),
        'class="fx fx-boats"'
      ) +
      g(
        g('<rect x="-200" y="560" width="2000" height="420" style="fill:url(#ki-flood);opacity:.92"/><rect x="-200" y="560" width="2000" height="420" style="fill:url(#ki-ripple)"/><rect x="-200" y="560" width="2000" height="420" style="fill:url(#ki-reflect);opacity:.25"/>', 'class="flood-water"'),
        'class="fx fx-flood"'
      ) +
      g(
        '<rect x="-200" y="-200" width="2000" height="1200" class="scorch" style="fill:#F4A04E;opacity:.4;mix-blend-mode:multiply"/>' +
        '<circle cx="1150" cy="420" r="340" style="fill:url(#ki-glow)"/>' +
        '<rect x="-200" y="571" width="2000" height="400" style="fill:url(#ki-cracks);opacity:.9"/>' +
        g('<rect x="-200" y="552" width="2000" height="30" style="fill:#FFE9C4;opacity:.5"/>', 'class="shimmer"'),
        'class="fx fx-drought"'
      ) +
      rocket;
  }

  function school() {
    const windows=[420,510,600,690,820,910,1000,1090].map(x=>'<rect x="'+x+'" y="465" width="58" height="80" rx="3" fill="#8db1b2" stroke="#f6eddd" stroke-width="8"/>').join('');
    return g('<rect x="-200" y="570" width="2000" height="360" fill="#c9b889"/>'+
      '<rect x="360" y="375" width="880" height="240" rx="8" fill="#f2dfbd" stroke="#c4ae87" stroke-width="8"/>'+
      '<path d="M325 390 L800 255 L1275 390 Z" fill="#a45e49"/><path d="M325 390 H1275" stroke="#f6eddd" stroke-width="10"/>'+
      windows+'<rect x="745" y="485" width="110" height="130" fill="#8e6650"/><rect x="715" y="345" width="170" height="48" rx="8" fill="#fff8e9"/>'+
      '<path d="M100 720 H1500" stroke="#f2e5be" stroke-width="8"/>'+tree(180,650,1.1,'var(--tree)','var(--tree2)')+tree(1410,650,1.1,'var(--tree)','var(--tree2)'), 'class="pl pl-school"');
  }

  function factory() {
    const windows=[390,510,630,750,870,990,1110].map(x=>'<rect x="'+x+'" y="470" width="70" height="65" fill="#9ab4b8" stroke="#e4e4dc" stroke-width="7"/>').join('');
    return g('<rect x="-200" y="600" width="2000" height="330" fill="#a9a59a"/>'+
      '<rect x="290" y="410" width="1020" height="220" fill="#d2d2c5" stroke="#a7a89f" stroke-width="8"/>'+
      '<path d="M290 410 L440 330 L440 410 L590 330 L590 410 L740 330 L740 410 L890 330 L890 410 L1040 330 L1040 410 L1310 410" fill="#8b9899" stroke="#7b888a" stroke-width="8"/>'+
      windows+'<rect x="720" y="535" width="160" height="95" fill="#798789"/><path d="M0 800 H1600" stroke="#e8e2cf" stroke-width="7" stroke-dasharray="75 75"/>'+
      tree(180,680,.8,'var(--tree)','var(--tree2)')+tree(1420,680,.8,'var(--tree)','var(--tree2)'), 'class="pl pl-factory"');
  }

  function market() {
    const stalls=[260,600,940].map((x,i)=>'<g transform="translate('+x+' 0)"><rect x="0" y="475" width="280" height="160" fill="#d2aa78" stroke="#92785e" stroke-width="7"/><path d="M-20 475 L15 405 H265 L300 475 Z" fill="'+['#b8614c','#d8a247','#739271'][i]+'"/><rect x="20" y="525" width="240" height="24" fill="#f3dfb2"/><circle cx="70" cy="514" r="16" fill="#e9bd55"/><circle cx="110" cy="514" r="16" fill="#79a75b"/><circle cx="150" cy="514" r="16" fill="#d87559"/></g>').join('');
    return g('<rect x="-200" y="635" width="2000" height="300" fill="#d9c8a8"/>'+stalls+tree(100,660,.7,'var(--tree)','var(--tree2)')+tree(1450,660,.7,'var(--tree)','var(--tree2)'), 'class="pl pl-market"');
  }

  function garden() {
    const plants=[320,470,620,980,1130,1280].map(x=>'<g transform="translate('+x+' 0)"><path d="M0 760 V685 M0 716 Q-35 675 -52 698 Q-40 724 0 730 M0 706 Q35 670 52 691 Q40 717 0 724" fill="#78a65a" stroke="#557a42" stroke-width="7"/><circle cx="0" cy="680" r="13" fill="#e7bc59"/></g>').join('');
    return g('<rect x="-200" y="600" width="2000" height="330" fill="#b6ca8e"/><path d="M-200 740 Q800 670 1800 740 V930 H-200 Z" fill="#d0b98c"/>'+stiltHouse(800,580,.7,'var(--thatch)')+tree(220,650,1.2,'var(--tree)','var(--tree2)')+tree(1380,650,1.1,'var(--tree)','var(--tree2)')+plants, 'class="pl pl-garden"');
  }

  function countryFor(state) {
    if (state.loc.kind !== 'abroad') return '';
    return ({'ไต้หวัน':'taiwan','ญี่ปุ่น':'japan','เกาหลีใต้':'korea','สิงคโปร์':'singapore','ซาอุดีอาระเบีย':'saudi','อิสราเอล':'israel','กาตาร์':'qatar','ออสเตรเลีย':'australia'})[state.loc.country] || '';
  }

  function landmarks() {
    const shapes = {
      taiwan: '<path d="M740 680 V470 H725 L750 430 H745 L770 390 H765 L790 350 H785 L800 310 L815 350 H810 L835 390 H830 L855 430 H850 L875 470 H860 V680 Z" fill="#729392" stroke="#587978" stroke-width="8"/><path d="M800 310 V275 M750 470 H850 M745 510 H855 M740 550 H860 M740 590 H860" fill="none" stroke="#c7d9c9" stroke-width="7"/>',
      japan: '<path d="M560 625 L720 400 L800 290 L880 400 L1040 625 Z" fill="#9caeb5"/><path d="M720 400 L800 290 L880 400 L850 390 L830 405 L800 385 L775 405 L750 390 Z" fill="#fff9ed"/><path d="M630 650 V475 H970 V650 M600 475 H1000 M650 545 H950" fill="none" stroke="#b64c36" stroke-width="18"/>',
      korea: '<path d="M785 620 L793 390 H807 L815 620 Z M790 390 L800 270 L810 390 Z" fill="#d8dad2"/><rect x="760" y="350" width="80" height="35" rx="8" fill="#748b91"/><path d="M610 625 L800 570 L990 625 Z" fill="#6c8972"/>',
      singapore: '<path d="M600 640 L625 470 H690 L700 640 M735 640 L745 470 H805 L815 640 M850 640 L860 470 H925 L950 640" fill="#b9cbd0" stroke="#6e9095" stroke-width="8"/><path d="M590 465 Q770 405 965 465 Q950 485 610 485 Z" fill="#d5d9ce"/>',
      saudi: '<path d="M720 650 L735 375 Q800 320 865 375 L880 650 Z" fill="#cfbfaa"/><path d="M760 395 Q800 440 840 395 L830 470 H770 Z" fill="#7e9aa4"/><path d="M800 350 V280" stroke="#9a8c7d" stroke-width="8"/>',
      israel: '<rect x="660" y="520" width="280" height="130" fill="#d4bc94"/><path d="M690 520 Q800 340 910 520 Z" fill="#d5ab53"/><path d="M800 388 V350" stroke="#b79146" stroke-width="8"/>',
      qatar: '<path d="M715 650 Q700 430 800 320 Q900 430 885 650 Z" fill="#c8d0c7" stroke="#91a5a1" stroke-width="8"/><path d="M735 600 L865 410 M725 550 L850 375 M760 650 L880 475 M720 450 L870 620 M740 390 L875 550 M780 350 L880 485" fill="none" stroke="#9eaea9" stroke-width="7"/>',
      australia: '<path d="M610 640 Q610 450 735 500 Q750 390 800 370 Q850 390 865 500 Q990 450 990 640 Z" fill="#f1e8d5" stroke="#a9b6b0" stroke-width="8"/><path d="M620 640 H980" stroke="#8da8aa" stroke-width="20"/>'
    };
    return Object.entries(shapes).map(([key,shape])=>g(shape,'class="landmark landmark-'+key+'"')).join('');
  }

  function car(id) {
    if (id === 'bike') return g('<ellipse cx="2" cy="1" rx="30" ry="3" fill="rgba(40,25,10,.18)"/>' + motorbike(0, 0, 1, '#c8463c'), 'class="car bike" transform="translate(' + PARK.bike[0] + ' 790) scale(' + PARK.bike[1] + ')"');
    const wheels = (a, b) => '<circle cx="' + a + '" cy="-14" r="17" fill="#26232B"/><circle cx="' + a + '" cy="-14" r="7" fill="#9aa1a8"/><circle cx="' + b + '" cy="-14" r="17" fill="#26232B"/><circle cx="' + b + '" cy="-14" r="7" fill="#9aa1a8"/>';
    const glass = '#bfd6de';
    const body = {
      'car-small': '<path d="M-95 -18 L-95 -48 Q-90 -60 -70 -62 L-40 -98 Q-30 -104 10 -104 L40 -104 Q62 -102 74 -80 L90 -60 Q100 -56 100 -40 L100 -18 Z" fill="#d6604d" stroke="#8f3a2c" stroke-width="4"/><path d="M-34 -64 L-14 -92 L18 -92 L18 -64 Z M28 -64 L28 -92 L42 -92 Q56 -90 66 -64 Z" fill="' + glass + '"/>' + wheels(-55, 60),
      'car-pickup': '<path d="M-120 -18 L-120 -64 L10 -64 L10 -18 Z" fill="#e8e3d6" stroke="#8d8676" stroke-width="4"/><path d="M10 -18 L10 -64 L28 -108 L88 -108 Q104 -106 112 -84 L122 -64 Q130 -60 130 -44 L130 -18 Z" fill="#f2efe6" stroke="#8d8676" stroke-width="4"/><path d="M34 -70 L46 -98 L82 -98 Q94 -96 102 -70 Z" fill="' + glass + '"/><path d="M-116 -60 H6" stroke="#8d8676" stroke-width="4"/>' + wheels(-75, 85),
      'car-electric': '<path d="M-110 -18 L-110 -46 Q-108 -62 -84 -66 L-46 -100 Q-30 -110 20 -110 Q60 -108 82 -80 L104 -64 Q116 -58 116 -40 L116 -18 Z" fill="#e9f1f3" stroke="#6f8c96" stroke-width="4"/><path d="M-40 -70 L-24 -96 Q-12 -100 16 -100 L16 -70 Z M26 -70 L26 -100 Q56 -98 72 -70 Z" fill="' + glass + '"/><path d="M-12 -46 L-22 -30 L-10 -30 L-18 -14 L2 -36 L-10 -36 L-2 -46 Z" fill="#3aa0c9"/>' + wheels(-66, 72),
      'car-luxury': '<path d="M-135 -18 L-135 -44 Q-132 -58 -104 -62 L-60 -96 Q-46 -104 10 -104 Q56 -102 80 -76 L118 -62 Q138 -58 138 -40 L138 -18 Z" fill="#2c3442" stroke="#151a22" stroke-width="4"/><path d="M-54 -66 L-36 -92 Q-24 -96 10 -96 L10 -66 Z M20 -66 L20 -96 Q50 -94 70 -66 Z" fill="#8fa7b3"/><path d="M-130 -40 H134" stroke="#c9ccd1" stroke-width="3"/>' + wheels(-82, 88)
    }[id];
    return g('<ellipse cx="0" cy="2" rx="150" ry="12" fill="rgba(40,25,10,.18)"/>' + body, 'class="car ' + id + '" transform="translate(' + PARK[id][0] + ' 790) scale(' + PARK[id][1] + ')"');
  }

  function ownHome(kind) {
    const lawn = '<rect x="-200" y="600" width="2000" height="330" fill="#b6ca8e"/><rect x="-200" y="700" width="2000" height="110" fill="#cfc3a6"/>';
    let house;
    if (kind === 'home-small') {
      const unit = (x, mine) => '<rect x="' + x + '" y="420" width="240" height="210" fill="' + (mine ? '#f2dfbd' : '#e4d6c1') + '" stroke="#b9a586" stroke-width="6"/><rect x="' + (x - 6) + '" y="404" width="252" height="22" fill="' + (mine ? '#b8614c' : '#9c8b78') + '"/><rect x="' + (x + 24) + '" y="452" width="80" height="60" fill="#8db1b2" stroke="#f6eddd" stroke-width="6"/><rect x="' + (x + 136) + '" y="452" width="80" height="60" fill="#8db1b2" stroke="#f6eddd" stroke-width="6"/><rect x="' + (x + 24) + '" y="532" width="192" height="98" fill="' + (mine ? '#8e6650' : '#9a9184') + '"/>' + (mine ? '<path d="M' + (x + 24) + ' 556 H' + (x + 216) + ' M' + (x + 24) + ' 580 H' + (x + 216) + ' M' + (x + 24) + ' 604 H' + (x + 216) + '" stroke="#6f4c3a" stroke-width="3"/>' : '');
      house = unit(320, false) + unit(560, true) + unit(800, false);
    } else if (kind === 'home-medium') {
      house = '<rect x="470" y="440" width="520" height="190" fill="#f2dfbd" stroke="#c4ae87" stroke-width="7"/><path d="M430 452 L730 310 L1030 452 Z" fill="#a45e49"/><path d="M430 452 H1030" stroke="#f6eddd" stroke-width="9"/>' +
        '<rect x="510" y="480" width="110" height="80" fill="#8db1b2" stroke="#f6eddd" stroke-width="8"/><rect x="840" y="480" width="110" height="80" fill="#8db1b2" stroke="#f6eddd" stroke-width="8"/><rect x="680" y="500" width="100" height="130" fill="#8e6650"/><circle cx="764" cy="566" r="5" fill="#e2b84a"/><rect x="664" y="626" width="132" height="12" fill="#c4ae87"/>' +
        tree(330, 640, 1, 'var(--tree)', 'var(--tree2)');
    } else {
      house = '<rect x="380" y="340" width="700" height="290" fill="#f5ead6" stroke="#c4ae87" stroke-width="7"/><path d="M340 352 L470 270 L990 270 L1120 352 Z" fill="#6f4a3d"/><path d="M340 352 H1120" stroke="#f6eddd" stroke-width="9"/><path d="M380 482 H1080" stroke="#d9c6a6" stroke-width="10"/>' +
        [430, 590, 790, 950].map((x) => '<rect x="' + x + '" y="370" width="90" height="80" fill="#8db1b2" stroke="#fffaf0" stroke-width="7"/>').join('') +
        [430, 950].map((x) => '<rect x="' + x + '" y="510" width="90" height="80" fill="#8db1b2" stroke="#fffaf0" stroke-width="7"/>').join('') +
        '<rect x="600" y="496" width="260" height="134" fill="#e8dcc4"/><rect x="680" y="510" width="100" height="120" fill="#7a5442"/><rect x="606" y="496" width="16" height="134" fill="#fffaf0"/><rect x="838" y="496" width="16" height="134" fill="#fffaf0"/><path d="M590 496 H870" stroke="#fffaf0" stroke-width="12"/>' +
        tree(250, 640, 1.2, 'var(--tree)', 'var(--tree2)') + tree(1200, 600, .8, 'var(--tree)', 'var(--tree2)');
    }
    return g(lawn + g(house, 'transform="translate(-100 294) scale(.85) translate(0 -270)"') + CARS.map(car).join(''), 'class="pl pl-' + kind + '"');
  }

  function homeFor(state) {
    const owned = (state.personalAssets || []).map((a) => a.key);
    return HOMES.filter((k) => owned.includes(k)).pop() || null;
  }

  function carFor(state) {
    const owned = (state.personalAssets || []).map((a) => a.key);
    return CARS.filter((k) => owned.includes(k)).join(' ');
  }

  function placeFor(state, data) {
    if(state.role==='prisoner')return 'prison';
    if(state.role==='monk' || (state.edu && state.edu.in==='novice'))return 'temple';
    if(state.loc.kind==='abroad'){
      const c=state.loc.country||'';
      if(/ซาอุ|อิสราเอล|ตะวันออกกลาง|คูเวต|ลิเบีย|กาตาร์|ดูไบ/.test(c))return 'desert';
      if(/สวีเดน|ฟินแลนด์|นอร์เวย์/.test(c))return 'nordic';
      if(/ไต้หวัน|เกาหลี|สิงคโปร์|ญี่ปุ่น|ฮ่องกง|บรูไน|มาเลเซีย/.test(c))return 'asiacity';
      return 'abroad';
    }
    if(state.loc.kind==='bangkok')return 'bangkok';
    const home=homeFor(state);
    if(home && !['student','factory'].includes(state.role))return home;
    const rich=state.flags && (state.flags.status==='wealthy' || (state.flags.status==='rich' && state.flags.movedOut));
    if(rich && state.role!=='student')return 'town';
    if(state.role==='student')return 'school';
    if(state.role==='factory')return 'factory';
    if(state.role==='trader')return 'market';
    if(state.role==='retired')return 'garden';
    const province=data.places.provinces[state.loc.province];
    if(state.loc.setting==='rural' && province && province.mekong)return 'mekong';
    return state.loc.setting==='rural'?'rural':'town';
  }

  let listening = false;
  let root = null, svg = null, current = { season: 2, place: 'rural', year: null, mood: 'normal', fx: null }, motionOn = true, fxTimer = 0, fxTimers = [];
  const reduceQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;

  function eraYear(kind) {
    const hh = KI.data && KI.data.stats && KI.data.stats.household;
    const series = hh && hh[kind];
    if (!Array.isArray(series) || !series.length) return null;
    const rows = series.filter((row) => row && typeof row.year === 'number' && typeof row.value === 'number').sort((a, b) => a.year - b.year);
    if (!rows.length) return null;
    const frac = rows.every((row) => row.value <= 1);
    const hit = rows.find((row) => (frac ? row.value * 100 : row.value) > 50);
    return hit ? hit.year : null;
  }

  function applyEra(year) {
    Object.keys(ERA).forEach((k) => {
      const y = eraYear(k);
      root.classList.toggle('era-' + ERA[k], y !== null && typeof year === 'number' && year >= y);
    });
  }

  function defaultParticles(s) {
    if (s.mood === 'sad') return 'rain';
    if (s.season === 0) return s.place === 'rural' || s.place === 'abroad' ? 'leaves' : 'dust';
    if (s.season === 1) return 'rain';
    return 'mist';
  }

  function mount(container) {
    if (!container) return null;
    root = container;
    root.classList.add('ki-scene');
    root.setAttribute('aria-hidden', 'true');
    seed = 7;
    const markup = '<svg class="scene-svg" xmlns="' + NS + '" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax slice" focusable="false">' +
      defs() + sky() + hills() + rural() + town() + mekong() + bangkok() + abroad() + school() + factory() + market() + garden() + HOMES.map(ownHome).join('') + temple() + prison() + desert() + asiacity() + nordic() + landmarks() + fx() + '</svg>' +
      '<div class="scene-ground"></div><canvas class="scene-particles"></canvas>' +
      '<div class="scene-mood scene-mood-sad"></div><div class="scene-mood scene-mood-sad2"></div><div class="scene-mood scene-mood-bright"></div><div class="scene-veil"></div>';
    root.innerHTML = markup;
    svg = root.querySelector('svg');
    if (KI.particles && KI.particles.mount) KI.particles.mount(root.querySelector('canvas'));
    if (!listening) {
      listening = true;
      document.addEventListener('visibilitychange', () => root && root.classList.toggle('paused', document.hidden));
      if (reduceQuery && reduceQuery.addEventListener) reduceQuery.addEventListener('change', (e) => { if (e.matches) motion(false); });
    }
    if (reduceQuery && reduceQuery.matches) motion(false);
    paint(current, true);
    return root;
  }

  function clearFx() {
    clearTimeout(fxTimer);
    fxTimers.forEach(clearTimeout);
    fxTimers = [];
    if (root) root.removeAttribute('data-fx');
  }

  function playFx(name) {
    clearFx();
    if (!motionOn || FX.indexOf(name) < 0) return;
    void root.offsetWidth;
    root.setAttribute('data-fx', name);
    const P = KI.particles;
    if (P && P.burst) {
      if (name === 'fireworks') [[0.3, 0.22, 300], [0.62, 0.16, 900], [0.45, 0.3, 1500], [0.75, 0.26, 2100], [0.22, 0.14, 2700], [0.55, 0.12, 3200]].forEach((b) => fxTimers.push(setTimeout(() => P.burst('firework', b[0], b[1]), b[2])));
      if (name === 'drought') fxTimers.push(setTimeout(() => P.burst('dust', 0.5, 0.55), 200));
      if (name === 'rocket') [600, 1100, 1600].forEach((t, i) => fxTimers.push(setTimeout(() => P.burst('smoke', 0.36 + i * 0.03, 0.62 - i * 0.12), t)));
    }
    fxTimer = setTimeout(clearFx, 4300);
  }

  function paint(s, first) {
    const seasonAttr = s.season === null || s.season === undefined ? 'soft' : String(s.season);
    root.setAttribute('data-season', seasonAttr);
    root.setAttribute('data-place', s.place);
    root.setAttribute('data-country', s.country);
    root.setAttribute('data-mood', s.mood);
    root.setAttribute('data-car', s.car || '');
    applyEra(s.year);
    if (KI.particles && KI.particles.set) KI.particles.set(defaultParticles(s));
    if (!first && s.fx) playFx(s.fx);
  }

  function set(opts) {
    const o = opts || {};
    const next = {
      season: o.season === null || o.season === 0 || o.season === 1 || o.season === 2 ? o.season : (o.season === undefined ? current.season : 2),
      place: PLACES.indexOf(o.place) >= 0 ? o.place : (o.place === undefined ? current.place : 'rural'),
      country: typeof o.country === 'string' ? o.country : '',
      car: typeof o.car === 'string' ? o.car : '',
      year: typeof o.year === 'number' ? o.year : (o.year === undefined ? current.year : null),
      mood: MOODS.indexOf(o.mood) >= 0 ? o.mood : (o.mood === undefined ? current.mood : 'normal'),
      fx: FX.indexOf(o.fx) >= 0 ? o.fx : null
    };
    const changed = next.season !== current.season || next.place !== current.place || next.mood !== current.mood;
    current = next;
    if (!root) return current;
    if (!motionOn && changed) {
      root.classList.remove('fading');
      void root.offsetWidth;
      root.classList.add('fading');
      setTimeout(() => { paint(current, false); }, 140);
      setTimeout(() => root.classList.remove('fading'), 320);
    } else {
      paint(current, false);
    }
    return current;
  }

  function motion(on) {
    motionOn = !!on && !(reduceQuery && reduceQuery.matches);
    if (!root) return motionOn;
    root.classList.toggle('still', !motionOn);
    if (!motionOn) clearFx();
    if (KI.particles) {
      if (motionOn && KI.particles.resume) { KI.particles.resume(); if (KI.particles.set) KI.particles.set(defaultParticles(current)); }
      if (!motionOn && KI.particles.pause) KI.particles.pause();
    }
    return motionOn;
  }

  KI.scene = { mount, set, motion, placeFor, countryFor, carFor, get: () => Object.assign({}, current), eraYear };
})();
