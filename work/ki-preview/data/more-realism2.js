globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const D = KI.data;
  const lists = [D.decisions, D.personalEvents, D.focus || []];
  const find = (id) => { for (const l of lists) { const x = l.find((i) => i.id === id); if (x) return x; } return null; };
  const merge = (w, extra) => {
    const out = { ...(w || {}), ...extra };
    if ((w && w.flag) || extra.flag) out.flag = { ...((w && w.flag) || {}), ...(extra.flag || {}) };
    return out;
  };
  const gate = (id, extra) => { const x = find(id); if (x) x.when = merge(x.when, extra); return x; };
  const ch = (id, cid) => { const x = find(id); return x && (x.choices || []).find((c) => c.id === cid); };
  const gateCh = (id, cid, extra) => { const c = ch(id, cid); if (c) c.when = merge(c.when, extra); return c; };
  const addCh = (id, arr, after) => {
    const x = find(id); if (!x) return;
    x.choices = x.choices || [];
    const at = after ? x.choices.findIndex((c) => c.id === after) : -1;
    if (at >= 0) x.choices.splice(at + 1, 0, ...arr); else x.choices.push(...arr);
  };
  const clone = (o) => JSON.parse(JSON.stringify(o));

  for (const l of [D.decisions, D.personalEvents]) for (const it of l) for (const c of it.choices || []) {
    const effs = c.effects || [];
    if (!effs.some((e) => e.edu && e.edu.in === "novice")) continue;
    for (const e of effs) if (e.move && e.move.kind === "isan" && e.move.province === "khon-kaen") e.move = { kind: "isan", setting: "urban" };
  }
  const nov = ch("career-dropout-p6", "novice");
  if (nov) nov.text = "คุณบวชเป็นสามเณร ได้เรียนนักธรรมและสายสามัญที่วัดในตัวจังหวัดโดยไม่เสียเงิน";
  gate("career-dropout-p6", { year: [1980, 1995] });

  const mar = gate("marriage", { age: [18, 55], any: [{ year: [1970, 1999] }, { age: [20, 55] }] });
  gate("have-child", { age: [19, 45] });
  gateCh("have-child", "no", { year: [1990, 9999] });
  gateCh("have-child", "save", { year: [1990, 9999] });

  gateCh("first-job", "bangkok", { edu: { top: ["m6", "pvc", "pvs", "ba"] } });
  gateCh("first-job", "factory", { any: [{ year: [2000, 9999] }, { loc: ["bangkok", "abroad"] }] });
  addCh("first-job", [
    { id: "real-bkk-factory", label: "ตามเพื่อนไปทำโรงงานแถวกรุงเทพฯ", text: "ได้ห้องเช่าเล็กๆ กับเพื่อนจากหมู่บ้าน ทำโอทีเพื่อส่งเงินกลับบ้าน", effects: [{ move: { kind: "bangkok" } }, { role: "factory" }, { cond: "homesick", turns: 2, by: "attach" }, { pin: "เริ่มทำงานโรงงานที่กรุงเทพฯ" }] },
    { id: "real-bkk-build", label: "ไปเป็นกรรมกรก่อสร้างที่กรุงเทพฯ", text: "นอนแคมป์คนงาน งานหนักแดดร้อน แต่ได้ค่าแรงรายวันทันที", effects: [{ move: { kind: "bangkok" } }, { role: "construction" }, { stat: "health", d: -2 }, { pin: "เริ่มงานก่อสร้างที่กรุงเทพฯ" }] },
    { id: "real-bkk-home", label: "ไปเป็นแม่บ้านหรือลูกจ้างร้านอาหารที่กรุงเทพฯ", text: "มีที่พักกับข้าวให้ แต่วันหยุดน้อยและไม่ค่อยได้กลับบ้าน", effects: [{ move: { kind: "bangkok" } }, { role: "housekeeper" }, { cond: "lonely", turns: 2 }, { pin: "เริ่มทำงานที่กรุงเทพฯ" }] }
  ], "bangkok");

  gateCh("after-p6", "continue", { year: [1990, 9999] });
  const cont = ch("after-p6", "continue");
  if (cont) addCh("after-p6", [{ id: "real-continue-old", label: "เรียนต่อ ม.1 ที่โรงเรียนในอำเภอ", text: "ต้องเดินทางไกลไปเรียนทุกวัน ค่ารถค่าข้าวกลางวันเป็นภาระของบ้าน", when: { year: [1970, 1989] }, effects: [{ stat: "know", d: 2 }, { money: -4, unit: "wageDay" }, { stat: "health", d: -1 }], roll: [{ p: 0.25, text: "ปีถัดมาบ้านขัดสน พ่อแม่ต้องกู้ญาติมาจ่ายค่าเทอม", effects: [{ money: -3, unit: "wageDay" }, { stat: "happy", d: -2 }] }] }], "continue");

  const adm = find("uni-admission");
  if (adm) {
    addCh("uni-admission", [
      { id: "real-swu-msk", label: "เรียนที่ มศว มหาสารคาม", text: "ไปเรียนวิทยาเขตมหาสารคาม เพื่อนส่วนใหญ่มาจากจังหวัดใกล้เคียง", when: { year: [1970, 1993] }, effects: [{ move: { kind: "isan", province: "maha-sarakham", setting: "urban" } }, { edu: { in: "uni", grade: 1, place: "มศว มหาสารคาม" } }, { role: "student" }] },
      { id: "real-ram", label: "ลงทะเบียนเรียนรามคำแหงที่กรุงเทพฯ", text: "ไม่ต้องสอบเข้า ค่าหน่วยกิตถูก เช่าห้องอยู่กับเพื่อน บางวันทำงานพิเศษไปด้วย ต้องวินัยสูงถึงจะจบ", when: { year: [1971, 9999] }, effects: [{ move: { kind: "bangkok" } }, { edu: { in: "uni", grade: 1, place: "มหาวิทยาลัยรามคำแหง" } }, { role: "student" }, { money: -3, unit: "wageDay" }, { cond: "homesick", turns: 2, by: "attach" }] },
      { id: "real-rajabhat", label: "เรียนวิทยาลัยครูหรือราชภัฏในจังหวัด", text: "ค่าเทอมไม่แพง กลับบ้านได้บ่อย หลายคนเลือกเส้นทางเป็นครู", effects: [{ move: { kind: "isan", setting: "urban" } }, { edu: { in: "uni", grade: 1, place: "วิทยาลัยครู/ราชภัฏในจังหวัด" } }, { role: "student" }, { money: -2, unit: "wageDay" }, { stat: "bond", d: 1 }] },
      { id: "real-ubu", label: "เรียนที่มหาวิทยาลัยอุบลราชธานี", text: "ไปเรียนที่อุบลฯ มหาวิทยาลัยยังใหม่ อาจารย์กับนักศึกษาใกล้ชิดกัน", when: { year: [1990, 9999] }, effects: [{ move: { kind: "isan", province: "ubon-ratchathani", setting: "urban" } }, { edu: { in: "uni", grade: 1, place: "มหาวิทยาลัยอุบลราชธานี" } }, { role: "student" }] }
    ]);
  }

  gate("helmet", { year: [1985, 9999] });
  gate("road-crash", { year: [1985, 9999] });

  const fo = find("tmp-found-out");
  if (fo) fo.body = "คนที่บ้านจับได้ หรือมีคนรู้จักเอาไปเล่าต่อ ทุกอย่างพังลงในคืนเดียว";
  const pc = find("tmp-partner-cheats");
  if (pc) {
    pc.body = "เพื่อนที่บ้านส่งข่าวมาว่าแฟนของคุณไปมาหาสู่กับคนในหมู่บ้านบ่อยผิดปกติ ระหว่างที่คุณไม่อยู่";
    const sp = ch("tmp-partner-cheats", "split");
    if (sp) sp.label = "ส่งข่าวกลับไปบอกเลิก";
  }
  const pr = find("fam-parent-returns");
  if (pr) pr.body = "หลายปีผ่านไป พ่อแม่เก็บของจากกรุงเทพฯ กลับมาบ้าน คนที่เคยได้แต่ฟังข่าวมายืนอยู่ตรงหน้า";
  const phone = /(?<!ทรุด)โทร(?!ทัศน์)|มือถือ/;
  const reworded = ["tmp-found-out", "tmp-partner-cheats", "fam-parent-returns"];
  for (const l of [D.decisions, D.personalEvents]) for (const it of l) {
    if (reworded.includes(it.id) || (it.when && it.when.year)) continue;
    const { when, ...rest } = it;
    if (phone.test(JSON.stringify(rest))) it.when = merge(it.when, { year: [1993, 9999] });
  }

  const hk = find("job2-housekeeper");
  if (hk) hk.body = "โรงแรมและตึกสำนักงานในเมืองรับพนักงานทำความสะอาด มีบ้านคนมีฐานะรับแม่บ้านอยู่ประจำด้วย";
  gate("job2-grad-cs", { year: [1990, 9999] });
  gateCh("job2-grad-pharm", "chain", { year: [2005, 9999] });
  const bg = find("biz-grow-5");
  if (bg) bg.body = "กิจการหลายสาขาเริ่มซับซ้อน นักบัญชีแนะนำให้จดเป็นบริษัท รับงานส่งของให้ร้านค้าส่งและราชการ";
  gateCh("money-house-build", "big", { year: [1988, 9999] });
  gateCh("job2-athlete", "club", { year: [1996, 9999] });
  gateCh("job2-artist", "contest", { year: [1985, 9999] });
  gate("job2-rider", { any: [{ loc: "bangkok" }, { setting: "urban" }] });

  const hw = find("life2-house-wedding");
  if (hw) {
    const own = ch("life2-house-wedding", "own");
    const inl = ch("life2-house-wedding", "inlaws");
    if (own && inl) {
      const ownM = clone(own); const inlF = clone(inl);
      own.id = "own"; own.label = "อยู่บ้านพ่อแม่ตัวเอง ให้{คู่}ย้ายเข้ามาตามธรรมเนียม"; own.when = merge(own.when, { sex: "f" });
      inl.label = "ย้ายไปอยู่บ้านพ่อแม่{คู่}ตามธรรมเนียมเขย"; inl.text = "เป็นเขยในบ้าน{คู่} ช่วยพ่อตาทำนา ต้องปรับตัวกับบ้านใหม่"; inl.when = merge(inl.when, { sex: "m" });
      ownM.id = "real-own-m"; ownM.label = "พา{คู่}มาอยู่บ้านพ่อแม่ตัวเอง"; ownM.text = "ไม่ค่อยตรงธรรมเนียม ญาติฝ่าย{คู่}บางคนไม่สบายใจ"; ownM.when = merge(ownM.when, { sex: "m" }); ownM.effects.push({ stat: "bond", d: -2 });
      inlF.id = "real-inlaws-f"; inlF.label = "ย้ายไปอยู่บ้านพ่อแม่{คู่}"; inlF.text = "ไม่ค่อยตรงธรรมเนียม ต้องปรับตัวกับบ้าน{คู่}และคิดถึงแม่บ่อยๆ"; inlF.when = merge(inlF.when, { sex: "f" }); inlF.effects.push({ cond: "homesick", turns: 2, by: "attach" });
      hw.choices.splice(hw.choices.indexOf(inl) + 1, 0, ownM, inlF);
    }
  }
  addCh("money-bride-price", [{ id: "real-groom-moves", label: "ตกลงค่าสินสอดพอประมาณ แล้วย้ายไปอยู่บ้านฝ่าย{คู่}", text: "ผู้ใหญ่ฝ่าย{คู่}พอใจที่จะได้เขยมาช่วยทำนา สินสอดส่วนหนึ่งกลับมาเป็นทุนตั้งตัว", when: { sex: "m" }, effects: [{ money: -60, unit: "wageDay" }, { flag: "money-dowryDone" }, { flag: "movedOut" }, { stat: "bond", d: 3 }, { cond: "homesick", turns: 1 }] }]);
  addCh("inherit-land", [{ id: "real-daughter-home", label: "รับเรือนพ่อแม่ไว้ แลกกับดูแลพ่อแม่ยามแก่", text: "ตามธรรมเนียมลูกสาวที่อยู่ดูแลพ่อแม่ได้เรือนกับนาผืนหนึ่ง ภาระดูแลก็หนักตามมา", when: { sex: "f", flag: { parentsAlive: true } }, effects: [{ role: "farmer" }, { stat: "bond", d: 5 }, { stat: "happy", d: -1 }] }]);

  gate("ordain", { age: [24, 70] });
  const or = gate("fam-ordain-repay", { age: [20, 23], chance: 0.35 });
  addCh("conscription", [{ id: "real-defer", label: "ยื่นผ่อนผันเพราะยังเรียนอยู่ หรือเรียน รด. ครบแล้ว", text: "เอกสารครบ ไม่ต้องจับใบดำใบแดงปีนี้", when: { any: [{ edu: { in: ["uni", "voc", "hvoc"] } }, { edu: { top: ["ba", "pvs"] } }] }, effects: [{ stat: "happy", d: 2 }, { stat: "know", d: 1 }] }], "learn");
  const pb = gate("fam-parents-to-bangkok", { age: [1, 10] });
  gateCh("fam-parents-to-bangkok", "beg", { age: [5, 10] });
  gateCh("fam-parents-to-bangkok", "go-along", { age: [5, 10] });
  const me = gate("wr-middle-east-1982", { year: [1978, 1989], age: [6, 14], chance: 0.25 });
  if (me) me.cooldown = "once";
  gate("raw-fish", { age: [8, 80] });
  gateCh("school-friends-activity", "help", { year: [1970, 2000] });
  const help = ch("school-friends-activity", "help");
  if (help) addCh("school-friends-activity", [{ ...clone(help), id: "real-help-cow", label: "กลับบ้านช่วยเลี้ยงวัวเก็บผัก", when: { year: [2001, 9999] } }], "help");
  gate("money-village-fund", { year: [2001, 2026] });
  const ret = find("retirement");
  if (ret && ret.when.any) ret.when.any.forEach((a) => { if (Array.isArray(a.role)) a.role = a.role.filter((r) => r !== "farmer"); });
  if (ret) D.decisions.splice(D.decisions.indexOf(ret) + 1, 0, {
    id: "real-farm-handover", title: "ส่งต่อนาให้ลูกหลาน", body: "แรงเริ่มถอย ดำนาเกี่ยวข้าวเองไม่ไหวเหมือนก่อน ลูกหลานถามว่าจะให้ใครดูแลนาต่อ", when: { age: [60, 100], role: "farmer", chance: 0.3 }, major: true, cooldown: "once",
    choices: [
      { id: "hand", label: "ยกนาให้ลูกที่อยู่ดูแล แล้วช่วยเลี้ยงหลาน", text: "ได้พักและได้ใกล้หลาน แต่บางวันก็คิดถึงทุ่งนา", when: { flag: { child: true } }, effects: [{ role: "retired" }, { stat: "bond", d: 5 }, { stat: "health", d: 2 }, { pin: "ส่งต่อนาให้ลูก" }] },
      { id: "rent", label: "ให้เพื่อนบ้านเช่าทำ แบ่งข้าวกัน", text: "มีข้าวกินทุกปีโดยไม่ต้องลงแรง แต่รายได้น้อยลง", effects: [{ role: "retired" }, { stat: "health", d: 2 }, { stat: "happy", d: -1 }] },
      { id: "keep", label: "ทำต่อเท่าที่แรงไหว", text: "ยังได้ออกไปทุ่งทุกวัน แต่ร่างกายเหนื่อยง่ายขึ้น", effects: [{ stat: "health", d: -2 }, { stat: "happy", d: 2 }] }
    ]
  });

  const wageOf = (y) => D.stats.wageDay.reduce((b, r) => (Math.abs(r.year - y) < Math.abs(b.year - y) ? r : b)).value;
  const fixMoney = (w) => {
    if (!w || !Array.isArray(w.money) || w.money[0] < 1000 || w.money[1] < 1e7) return;
    const days = w.money[0] / 330;
    const bands = [];
    for (let y = 1970; y <= 2026; y += 4) {
      const b = { year: [y, y + 4 > 2026 ? 9999 : y + 3], money: [Math.round(days * wageOf(y)), 999999999] };
      if (w.any) b.any = w.any;
      bands.push(b);
    }
    delete w.money;
    w.any = bands;
  };
  for (const l of lists) for (const it of l) {
    fixMoney(it.when);
    for (const c of it.choices || []) fixMoney(c.when);
  }
  const fixEff = (o) => {
    if (Array.isArray(o)) return o.forEach(fixEff);
    if (!o || typeof o !== "object") return;
    if (typeof o.money === "number" && !o.unit && Math.abs(o.money) >= 100) { o.money = Math.round(o.money / 330) || Math.sign(o.money); o.unit = "wageDay"; }
    for (const k of Object.keys(o)) if (k !== "when") fixEff(o[k]);
  };
  for (const l of lists) for (const it of l) fixEff([it.effects, it.choices]);
})();
KI.data.personalEvents.push(...[
  {"id":"real-carry-water","title":"หาบน้ำเข้าบ้าน","body":"น้ำในโอ่งใกล้หมด ต้องไปตักน้ำจากบ่อกลางหมู่บ้านก่อนค่ำ","when":{"year":[1970,1988],"age":[7,14],"loc":"isan","setting":"rural"},"w":8,"cooldown":12,"choices":[
    {"id":"carry","label":"หาบน้ำจนเต็มโอ่ง","text":"บ่าระบมแต่แม่ยิ้มชม","effects":[{"stat":"health","d":2},{"stat":"bond","d":2},{"stat":"happy","d":-1},{"inc":"good"}]},
    {"id":"friends","label":"ชวนเพื่อนไปด้วย เล่นน้ำกันก่อน","text":"สนุกจนกลับบ้านมืด น้ำได้ครึ่งโอ่ง","effects":[{"stat":"happy","d":3},{"stat":"bond","d":-1}]},
    {"id":"rain","label":"หาบพอใช้ แล้วช่วยทำรางรองน้ำฝน","text":"ใช้เวลาหลายวันกว่าจะเสร็จ แต่หน้าฝนไม่ต้องเดินไปตักไกล","effects":[{"stat":"know","d":2},{"inc":"skill-craft"}]}]},
  {"id":"real-lamp-homework","title":"การบ้านใต้แสงตะเกียง","body":"บ้านยังไม่มีไฟฟ้า ตกค่ำต้องจุดตะเกียงน้ำมันก๊าดทำการบ้าน","when":{"year":[1970,1988],"age":[7,14],"loc":"isan","setting":"rural","edu":{"in":["school"]}},"w":8,"cooldown":12,"choices":[
    {"id":"read","label":"นั่งทำจนเสร็จแม้ตาจะล้า","text":"ครูชมว่าทำครบ แต่ตื่นเช้าไม่ค่อยไหว","effects":[{"stat":"know","d":3},{"stat":"health","d":-1}]},
    {"id":"early","label":"เข้านอนเร็ว ตื่นเช้ามาทำ","text":"ประหยัดน้ำมันก๊าด แม่พอใจ","effects":[{"stat":"know","d":1},{"stat":"bond","d":1}]},
    {"id":"skip","label":"ทิ้งไว้ ไปฟังผู้ใหญ่เล่านิทาน","text":"ได้ฟังเรื่องเก่าสนุกๆ แต่วันรุ่งขึ้นโดนครูตี","effects":[{"stat":"happy","d":2},{"stat":"know","d":-1},{"inc":"naughty"}]}]},
  {"id":"real-radio-molam","title":"หมอลำทางวิทยุ","body":"ตอนเย็นคนในบ้านล้อมวงฟังหมอลำจากวิทยุทรานซิสเตอร์เครื่องเดียวของบ้าน","when":{"year":[1970,1992],"age":[6,70],"loc":"isan"},"w":6,"cooldown":15,"choices":[
    {"id":"listen","label":"นั่งฟังจนจบกลอน","text":"ร้องตามได้หลายท่อน","effects":[{"stat":"happy","d":3},{"inc":"skill-music"}]},
    {"id":"news","label":"ขอเปลี่ยนไปฟังข่าว","text":"รู้เรื่องข้างนอกมากขึ้น แต่ยายบ่นเสียดายกลอนลำ","effects":[{"stat":"know","d":2},{"stat":"bond","d":-1}]},
    {"id":"battery","label":"ปิดเก็บถ่านไว้ฟังพรุ่งนี้","text":"ถ่านวิทยุแพง ได้ประหยัดแต่คืนนี้เงียบเหงา","effects":[{"money":1,"unit":"wageDay"},{"stat":"happy","d":-1}]}]},
  {"id":"real-long-khaek","title":"ลงแขกดำนา","body":"ถึงคิวนาของบ้านเรา เพื่อนบ้านมาช่วยดำนา เจ้าของนาต้องเลี้ยงข้าวทุกคน","when":{"year":[1970,1998],"age":[10,65],"season":1,"loc":"isan","setting":"rural"},"w":8,"cooldown":9,"choices":[
    {"id":"work","label":"ลงนาทั้งวันกับทุกคน","text":"หลังขดหลังแข็ง แต่ปีหน้าเพื่อนบ้านก็จะมาช่วยอีก","effects":[{"stat":"health","d":-1},{"stat":"bond","d":3},{"trait":"social","d":1}]},
    {"id":"cook","label":"อยู่ครัวทำกับข้าวเลี้ยงคนงาน","text":"ลาบกับแกงหน่อไม้หมดหม้อ ทุกคนชมฝีมือ","effects":[{"stat":"bond","d":2},{"inc":"skill-cooking"},{"money":-1,"unit":"wageDay"}]},
    {"id":"slack","label":"แอบไปนอนใต้ต้นไม้","text":"ได้พัก แต่มีคนเห็นและเล่าต่อกันไป","effects":[{"stat":"happy","d":2},{"stat":"bond","d":-3},{"inc":"naughty"}]}]},
  {"id":"real-rain-forage","title":"หาปลาจับกบหน้าฝน","body":"ฝนแรกลงหนัก น้ำเต็มทุ่ง กบเขียดร้องระงม แมงเม่าบินออกจากรัง","when":{"year":[1970,2026],"age":[7,16],"season":1,"loc":"isan","setting":"rural"},"w":8,"cooldown":9,"choices":[
    {"id":"frog","label":"ถือไฟฉายออกไปจับกบตอนกลางคืน","text":"ได้กบมาครึ่งถุง แม่เอาไปอ่อมกินทั้งบ้าน","effects":[{"stat":"happy","d":3},{"stat":"bond","d":2},{"money":1,"unit":"wageDay"}]},
    {"id":"fish","label":"วางลอบดักปลาในนา","text":"ตื่นเช้ามากู้ลอบ ได้ปลาพอทำปลาแดก","effects":[{"stat":"know","d":1},{"stat":"bond","d":2},{"inc":"skill-farming"}]},
    {"id":"stay","label":"อยู่บ้านไม่อยากเปียก","text":"ไม่เหนื่อย แต่พลาดความสนุกที่เพื่อนเล่าให้ฟังทั้งอาทิตย์","effects":[{"stat":"happy","d":-1},{"stat":"health","d":1}]}]},
  {"id":"real-ant-eggs","title":"แหย่ไข่มดแดง","body":"หน้าแล้งต้นไม้ผลัดใบ รังมดแดงเต็มกิ่ง ผักหวานป่าก็เริ่มแตกยอด","when":{"year":[1970,2026],"age":[8,65],"season":0,"loc":"isan","setting":"rural"},"w":7,"cooldown":12,"choices":[
    {"id":"go","label":"ถือไม้ไผ่ออกไปแหย่ไข่มด","text":"โดนมดกัดทั้งแขน แต่ได้ไข่มดแดงทำแกงผักหวาน","effects":[{"stat":"happy","d":3},{"stat":"health","d":-1},{"stat":"bond","d":1}]},
    {"id":"sell","label":"เก็บไปขายที่ตลาดนัด","text":"ได้เงินติดมือ แต่ที่บ้านแทบไม่ได้กิน","effects":[{"money":2,"unit":"wageDay"},{"stat":"bond","d":-1}]},
    {"id":"leave","label":"เหลือรังไว้ให้มดได้ขยายพันธุ์","text":"ปีหน้ารังยังอยู่ ผู้เฒ่าว่าคิดได้ดี","effects":[{"stat":"know","d":1},{"inc":"good"}]}]},
  {"id":"real-outdoor-film","title":"หนังกลางแปลงที่วัด","body":"งานบุญที่วัดมีหนังกลางแปลงฉายทั้งคืน คนจากหลายหมู่บ้านถือเสื่อมาจองที่","when":{"year":[1970,1995],"age":[6,30],"loc":"isan"},"w":7,"cooldown":12,"choices":[
    {"id":"watch","label":"ดูจนเรื่องสุดท้ายจบตอนเช้ามืด","text":"สนุกแต่ง่วงทั้งวันรุ่งขึ้น","effects":[{"stat":"happy","d":4},{"stat":"health","d":-1}]},
    {"id":"sell","label":"ช่วยขายขนมหน้าจอ","text":"ดูหนังได้ครึ่งเรื่อง แต่ขายดีมาก","effects":[{"money":2,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"home","label":"กลับบ้านตั้งแต่หัวค่ำ","text":"นอนเต็มอิ่ม แต่พลาดฉากสำคัญที่คนอื่นเล่ากันทั้งอาทิตย์","effects":[{"stat":"bond","d":1},{"stat":"happy","d":-1}]}]},
  {"id":"real-dad-dry-season","title":"พ่อไปรับจ้างหน้าแล้ง","body":"เกี่ยวข้าวเสร็จ พ่อเก็บกระเป๋าไปรับจ้างที่กรุงเทพฯ บอกว่าจะกลับมาก่อนฝนแรก","when":{"year":[1970,1992],"age":[6,13],"season":0,"loc":"isan","setting":"rural","flag":{"fatherAlive":true}},"w":7,"cooldown":12,"choices":[
    {"id":"help","label":"รับปากจะช่วยแม่ดูแลบ้าน","text":"งานบ้านหนักขึ้น แต่โตขึ้นอีกนิด","effects":[{"trait":"grit","d":2},{"stat":"happy","d":-1},{"inc":"good"}]},
    {"id":"cry","label":"ร้องไห้ไม่อยากให้พ่อไป","text":"พ่อกอดแน่น สัญญาว่าจะซื้อของฝากกลับมา","effects":[{"stat":"happy","d":-3,"by":"attach"},{"stat":"bond","d":2}]},
    {"id":"count","label":"ขีดปฏิทินนับวันรอพ่อ","text":"ทุกเย็นนั่งขีดเส้น จนพ่อกลับมาพร้อมเสื้อตัวใหม่","effects":[{"stat":"bond","d":3},{"cond":"lonely","turns":1}]}]},
  {"id":"real-folk-healer","title":"หมอน้ำมนต์หรือสถานีอนามัย","body":"คนในบ้านไข้ขึ้นหลายวัน ญาติว่าให้ไปหาหมอน้ำมนต์ อีกคนว่าให้ไปสถานีอนามัยที่ตำบล","when":{"year":[1970,1992],"age":[8,65],"loc":"isan","setting":"rural"},"w":6,"cooldown":15,"choices":[
    {"id":"clinic","label":"พาไปสถานีอนามัย","text":"เดินทางไกลเสียค่ารถ แต่ได้ยาลดไข้ อาการดีขึ้นเร็ว","effects":[{"money":-1,"unit":"wageDay"},{"stat":"know","d":2},{"stat":"bond","d":1}]},
    {"id":"healer","label":"ไปหาหมอน้ำมนต์ในหมู่บ้าน","text":"ญาติสบายใจ แต่ไข้ลากยาวกว่าจะหาย","effects":[{"stat":"bond","d":2},{"stat":"health","d":-2}]},
    {"id":"both","label":"ทำทั้งสองอย่าง","text":"ผูกแขนรับขวัญแล้วพาไปรับยา ทุกฝ่ายพอใจ","effects":[{"money":-1,"unit":"wageDay"},{"stat":"bond","d":3}]}]},
  {"id":"real-weaving","title":"ทอผ้าใต้ถุนเรือน","body":"ว่างจากนา แม่เฒ่าข้างบ้านตั้งกี่ทอผ้าใต้ถุนเรือน ชวนให้มาหัดทอ","when":{"year":[1970,2005],"age":[9,60],"loc":"isan","setting":"rural","season":0},"w":6,"cooldown":12,"choices":[
    {"id":"learn","label":"นั่งหัดทอทั้งบ่าย","text":"ผ้าผืนแรกลายเบี้ยว แต่แม่เฒ่าเก็บไว้อย่างดี","effects":[{"inc":"skill-craft"},{"stat":"bond","d":3},{"stat":"happy","d":-1}]},
    {"id":"help","label":"ช่วยปั่นด้ายอยู่ข้างๆ","text":"ได้ฟังเรื่องเก่าๆ ของแม่เฒ่าไปด้วย","effects":[{"stat":"bond","d":2},{"stat":"know","d":1}]},
    {"id":"play","label":"ขอตัวไปทำอย่างอื่นก่อน","text":"ได้ทำเรื่องของตัวเอง แม่เฒ่าบอกว่างเมื่อไหร่ค่อยมาหัด","effects":[{"stat":"happy","d":2}]}]},
  {"id":"real-cart-market","title":"นั่งเกวียนไปตลาดนัด","body":"พ่อเทียมวัวเข้าเกวียน ขนข้าวเปลือกกับผักไปขายที่ตลาดนัดอำเภอ","when":{"year":[1970,1985],"age":[6,14],"loc":"isan","setting":"rural"},"w":6,"cooldown":12,"choices":[
    {"id":"go","label":"ขอตามไปด้วย","text":"ทางขรุขระทั้งวัน แต่ได้กินขนมจากตลาด","effects":[{"stat":"happy","d":3},{"stat":"know","d":1},{"stat":"bond","d":1}]},
    {"id":"sell","label":"ช่วยพ่อต่อราคากับพ่อค้า","text":"ขายได้ราคาดีกว่าที่คิด พ่อหัวเราะชอบใจ","effects":[{"money":1,"unit":"wageDay"},{"trait":"social","d":1}]},
    {"id":"stay","label":"อยู่บ้านเฝ้าวัวควาย","text":"เหงาหน่อยแต่ได้ความไว้ใจจากพ่อ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]}]},
  {"id":"real-rice-short","title":"ข้าวในยุ้งไม่พอถึงฤดูหน้า","body":"ปีนี้ฝนน้อย ข้าวในยุ้งพร่องเร็ว แม่เริ่มคิดว่าจะทำอย่างไรให้พอถึงหน้าเกี่ยว","when":{"year":[1970,1992],"age":[8,65],"season":0,"loc":"isan","setting":"rural","wealth":["poor","mid"]},"w":6,"cooldown":15,"choices":[
    {"id":"swap","label":"เอาของไปแลกข้าวกับญาติต่างหมู่บ้าน","text":"เดินทางไกลแต่ได้ข้าวมาหลายถัง","effects":[{"stat":"bond","d":2},{"stat":"health","d":-1}]},
    {"id":"borrow","label":"ยืมข้าวเถ้าแก่ ใช้คืนตอนเกี่ยว","text":"อิ่มท้องตอนนี้ แต่หน้าเกี่ยวต้องคืนเกินที่ยืม","effects":[{"money":-2,"unit":"wageDay"},{"stat":"happy","d":-1}]},
    {"id":"forage","label":"หาของป่าหาปลามาเสริม","text":"กินข้าวน้อยลงแต่มีกับข้าวจากทุ่ง","effects":[{"stat":"health","d":-1},{"trait":"grit","d":2}]}]},
  {"id":"real-electricity","title":"ไฟฟ้าเข้าหมู่บ้าน","body":"เจ้าหน้าที่มาปักเสาไฟ คืนแรกที่หลอดไฟสว่างทั้งหมู่บ้านออกมายืนดูกัน","when":{"year":[1978,1992],"age":[4,70],"loc":"isan","setting":"rural","chance":0.5},"w":10,"cooldown":"once","choices":[
    {"id":"wire","label":"เดินสายไฟเข้าบ้านทันที","text":"เสียค่าเดินสายก้อนหนึ่ง แต่บ้านสว่างทุกคืน","effects":[{"money":-4,"unit":"wageDay"},{"stat":"happy","d":4},{"stat":"know","d":1},{"pin":"บ้านมีไฟฟ้าครั้งแรก"}]},
    {"id":"wait","label":"รอเก็บเงินอีกสักพัก","text":"ยังจุดตะเกียงต่อไป มองบ้านข้างๆ สว่างอยู่หลายเดือน","effects":[{"stat":"happy","d":-1},{"money":1,"unit":"wageDay"}]},
    {"id":"share","label":"ต่อพ่วงจากบ้านญาติไปก่อน","text":"ได้หลอดไฟดวงเดียว ต้องแบ่งค่าไฟกันวุ่นวาย","effects":[{"stat":"happy","d":2},{"stat":"bond","d":-1}]}]},
  {"id":"real-village-tv","title":"ทีวีเครื่องแรกของหมู่บ้าน","body":"บ้านผู้ใหญ่บ้านซื้อทีวีขาวดำ ทุกค่ำเด็กๆ ไปนั่งดูละครจนเต็มลานบ้าน","when":{"year":[1978,1992],"age":[6,16],"loc":"isan","setting":"rural","noFlag":["tech-tv"]},"w":7,"cooldown":"once","choices":[
    {"id":"watch","label":"ไปนั่งดูทุกคืน","text":"ดูจนจำบทละครได้ แต่การบ้านไม่ค่อยเสร็จ","effects":[{"stat":"happy","d":4},{"stat":"know","d":-1}]},
    {"id":"news","label":"ไปดูแค่ข่าวกับสารคดี","text":"รู้จักโลกกว้างขึ้น","effects":[{"stat":"know","d":2},{"stat":"happy","d":1}]},
    {"id":"help","label":"ช่วยเจ้าของบ้านกวาดลานก่อนดู","text":"ได้นั่งแถวหน้า ผู้ใหญ่บ้านเอ็นดู","effects":[{"stat":"bond","d":2},{"inc":"good"}]}]},
  {"id":"real-walking-tractor","title":"รถไถเดินตามหรือควาย","body":"เพื่อนบ้านหลายคนขายควายไปซื้อรถไถเดินตาม ที่บ้านเริ่มคุยกันว่าจะเอาอย่างไร","when":{"year":[1982,1998],"age":[10,65],"loc":"isan","setting":"rural"},"w":6,"cooldown":"once","choices":[
    {"id":"buy","label":"ขายควายแล้วผ่อนรถไถ","text":"ไถนาเร็วขึ้นมาก แต่มีค่าน้ำมันกับค่างวด","effects":[{"money":-6,"unit":"wageDay"},{"stat":"health","d":1},{"inc":"skill-mechanic"},{"pin":"บ้านมีรถไถเดินตาม"}]},
    {"id":"keep","label":"เลี้ยงควายต่อ","text":"ไม่มีหนี้ แต่ไถนาช้ากว่าบ้านอื่น","effects":[{"stat":"bond","d":1},{"stat":"health","d":-1}]},
    {"id":"hire","label":"จ้างรถไถเพื่อนบ้านเป็นครั้งๆ","text":"เสียค่าจ้างทุกปี แต่ไม่ต้องลงทุนก้อนใหญ่","effects":[{"money":-2,"unit":"wageDay"}]}]},
  {"id":"real-saudi-cassette","title":"เทปคาสเซ็ตจากพ่อ","body":"ไปรษณีย์ส่งพัสดุมาจากซาอุฯ ในนั้นมีเทปที่พ่ออัดเสียงพูดถึงทุกคนในบ้าน","when":{"year":[1978,1991],"age":[6,16],"flag":{"wr-fatherAbroad":true}},"w":12,"cooldown":9,"choices":[
    {"id":"listen","label":"เปิดฟังซ้ำจนเทปยาน","text":"ได้ยินเสียงพ่อแล้วนอนหลับง่ายขึ้น","effects":[{"stat":"happy","d":3,"by":"attach"},{"stat":"bond","d":3}]},
    {"id":"record","label":"อัดเสียงตอบกลับ ร้องเพลงให้พ่อฟัง","text":"ทั้งบ้านช่วยกันพูด แม่ร้องไห้ตอนท้ายเทป","effects":[{"stat":"bond","d":4},{"money":-1,"unit":"wageDay"}]},
    {"id":"letter","label":"เขียนจดหมายเล่าเรื่องโรงเรียน","text":"ฝึกเขียนหนังสือ พ่อตอบกลับมาว่าภูมิใจ","effects":[{"stat":"know","d":2},{"stat":"bond","d":2}]}]},
  {"id":"real-bike-school","title":"ปั่นจักรยานไปโรงเรียนอำเภอ","body":"โรงเรียนมัธยมอยู่ไกลหลายกิโล เด็กหมู่บ้านเดียวกันนัดปั่นจักรยานไปพร้อมกันทุกเช้า","when":{"year":[1978,2002],"age":[12,17],"loc":"isan","setting":"rural","edu":{"in":["school"]}},"w":7,"cooldown":12,"choices":[
    {"id":"ride","label":"ปั่นไปกลับทุกวัน","text":"ขาแข็งแรง แต่เหนื่อยจนหลับในห้องบางคาบ","effects":[{"stat":"health","d":2},{"stat":"know","d":1}]},
    {"id":"group","label":"รอเพื่อนไปเป็นกลุ่ม","text":"คุยกันตลอดทาง สนิทกันมากขึ้น","effects":[{"stat":"happy","d":2},{"trait":"social","d":1}]},
    {"id":"songthaew","label":"ขอเงินแม่ขึ้นรถสองแถว","text":"ไม่เหนื่อย แต่บ้านเสียเงินเพิ่มทุกเดือน","effects":[{"money":-1,"unit":"wageDay"},{"stat":"happy","d":1}]}]},
  {"id":"real-summer-novice","title":"บวชเณรภาคฤดูร้อน","body":"ปิดเทอมใหญ่ วัดในหมู่บ้านรับเด็กบวชเณรช่วงสั้นๆ แม่อยากให้ไป","when":{"year":[1980,2026],"age":[9,15],"sex":"m","season":0,"loc":"isan","noFlag":["real-summerNovice"]},"w":10,"cooldown":"once","choices":[
    {"id":"ordain","label":"บวชตามที่แม่ขอ","text":"ตื่นตีสี่ บิณฑบาต ท่องบทสวด กลับมาใจเย็นขึ้น","effects":[{"flag":"real-summerNovice"},{"stat":"bond","d":4},{"stat":"know","d":2},{"stat":"happy","d":-1},{"inc":"good"}]},
    {"id":"no","label":"ขอเล่นกับเพื่อนช่วงปิดเทอม","text":"สนุกเต็มที่ แต่แม่ผิดหวังเล็กน้อย","effects":[{"stat":"happy","d":3},{"stat":"bond","d":-2}]},
    {"id":"work","label":"ไปรับจ้างเก็บเงินช่วยบ้าน","text":"ได้เงินค่าเทอม แต่ปิดเทอมนี้เหนื่อย","when":{"age":[15,15]},"effects":[{"money":2,"unit":"wageDay"},{"stat":"health","d":-1}]}]},
  {"id":"real-letter-bkk","title":"จดหมายถึงคนที่กรุงเทพฯ","body":"ไม่ได้ข่าวญาติที่ไปทำงานกรุงเทพฯ มาหลายเดือน ที่บ้านอยากเขียนจดหมายไปถาม","when":{"year":[1975,1997],"age":[9,45],"loc":"isan"},"w":6,"cooldown":12,"choices":[
    {"id":"write","label":"รับเป็นคนเขียนให้ทั้งบ้าน","text":"เขียนเล่าทุกเรื่องในหมู่บ้าน อีกเดือนจดหมายตอบก็มาถึง","effects":[{"stat":"know","d":2},{"stat":"bond","d":3}]},
    {"id":"news","label":"ฝากข่าวกับคนที่จะขึ้นไปกรุงเทพฯ","text":"เร็วกว่าไปรษณีย์ แต่ข่าวเพี้ยนไประหว่างทาง","effects":[{"stat":"bond","d":1},{"stat":"happy","d":-1}]},
    {"id":"wait","label":"รอให้เขาเขียนมาเอง","text":"รอนานจนแม่เป็นห่วง","effects":[{"stat":"happy","d":-2},{"cond":"lonely","turns":1}]}]},
  {"id":"real-dengue","title":"ยุงลายในโอ่งน้ำ","body":"เด็กบ้านใกล้เป็นไข้เลือดออก อาสาสมัครสาธารณสุขมาเตือนให้คว่ำภาชนะ","when":{"year":[1980,2026],"age":[8,70],"season":1,"loc":"isan"},"w":6,"cooldown":15,"choices":[
    {"id":"clean","label":"ไล่คว่ำกะลา ใส่ทรายกำจัดลูกน้ำทั้งบ้าน","text":"เหนื่อยครึ่งวัน แต่ยุงในบ้านลดลง","effects":[{"stat":"health","d":2},{"inc":"good"}]},
    {"id":"net","label":"นอนกางมุ้งทุกคืน","text":"ร้อนอบอ้าว แต่ปลอดภัยกว่า","effects":[{"stat":"health","d":1},{"stat":"happy","d":-1}]},
    {"id":"ignore","label":"คิดว่าไม่เป็นไร","text":"ไม่เสียเวลา แต่บ้านยังมีลูกน้ำเต็มโอ่ง","effects":[{"stat":"health","d":-2}],"roll":[{"p":0.15,"text":"ไข้ขึ้นสูงหลายวัน ต้องไปนอนโรงพยาบาล","effects":[{"cond":"sick","turns":2},{"stat":"health","d":-6},{"money":-2,"unit":"wageDay"}]}]}]},
  {"id":"real-first-motorbike","title":"มอเตอร์ไซค์คันแรกของบ้าน","body":"บ้านมีเงินพอวางดาวน์มอเตอร์ไซค์คันแรก ทุกคนมีความเห็นว่าจะเอาแบบไหน","when":{"year":[1988,2004],"age":[10,50],"loc":"isan","setting":"rural","noFlag":["money-bike","homeBike"]},"w":7,"cooldown":"once","choices":[
    {"id":"down","label":"ผ่อนคันใหม่","text":"ไปตลาดไปนาสะดวกขึ้นมาก แต่มีค่างวดทุกเดือน","effects":[{"money":-5,"unit":"wageDay"},{"flag":"homeBike"},{"stat":"happy","d":4},{"pin":"บ้านมีมอเตอร์ไซค์คันแรก"}]},
    {"id":"used","label":"ซื้อมือสองเงินสด","text":"ราคาถูก ซ่อมบ่อยแต่ไม่มีหนี้","effects":[{"money":-3,"unit":"wageDay"},{"flag":"homeBike"},{"stat":"happy","d":2},{"inc":"skill-mechanic"}]},
    {"id":"no","label":"ยังใช้จักรยานต่อ","text":"ประหยัดเงิน แต่ไปไหนไกลลำบาก","effects":[{"money":1,"unit":"wageDay"},{"stat":"health","d":1}]}]},
  {"id":"real-payphone","title":"ตู้โทรศัพท์หน้าร้านค้า","body":"ร้านค้าในตำบลมีตู้โทรศัพท์สาธารณะ คนที่ทำงานไกลนัดโทรมาตอนสองทุ่ม","when":{"year":[1990,2004],"age":[12,60],"loc":"isan"},"w":6,"cooldown":12,"choices":[
    {"id":"wait","label":"ไปยืนรอสายตามนัด","text":"ยุงกัดทั้งตัว แต่ได้ยินเสียงคนที่คิดถึง","effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
    {"id":"card","label":"ซื้อบัตรโทรโทรไปเอง","text":"คุยได้นานขึ้น แต่บัตรหมดเร็ว","effects":[{"money":-1,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"skip","label":"ฝากร้านค้าจดข้อความไว้","text":"ไม่ต้องรอ แต่ข้อความสั้นจนไม่หายคิดถึง","effects":[{"stat":"happy","d":-1}]}]},
  {"id":"real-video-rental","title":"ร้านเช่าวิดีโอในอำเภอ","body":"ร้านเช่าม้วนวิดีโอเปิดใหม่ในอำเภอ เพื่อนชวนเช่าหนังมาดูกันที่บ้าน","when":{"year":[1988,2004],"age":[10,30],"loc":"isan"},"w":5,"cooldown":12,"choices":[
    {"id":"rent","label":"เช่ามาดูกันทั้งแก๊ง","text":"ดูกันจนดึก เสียงหัวเราะดังทั้งบ้าน","effects":[{"stat":"happy","d":3},{"money":-1,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"late","label":"เช่าหลายม้วนแล้วลืมคืน","text":"โดนค่าปรับจนเงินค่าขนมหมด","effects":[{"stat":"happy","d":2},{"money":-2,"unit":"wageDay"},{"inc":"naughty"}]},
    {"id":"no","label":"ไม่ไป เก็บเงินไว้","text":"เงินเก็บเพิ่ม แต่ฟังเพื่อนเล่าเรื่องไม่รู้เรื่อง","effects":[{"money":1,"unit":"wageDay"},{"stat":"happy","d":-1}]}]},
  {"id":"real-harvester","title":"รถเกี่ยวข้าวรับจ้าง","body":"รถเกี่ยวข้าวจากต่างถิ่นวิ่งรับจ้างเข้ามาในทุ่ง เกี่ยวเสร็จในวันเดียว","when":{"year":[1997,2026],"age":[18,75],"season":2,"loc":"isan","setting":"rural","role":"farmer"},"w":7,"cooldown":9,"choices":[
    {"id":"hire","label":"จ้างรถเกี่ยว","text":"เสร็จเร็ว ไม่ต้องหาแรงงาน แต่ต้องจ่ายค่าจ้างและข้าวหล่นบ้าง","effects":[{"money":-3,"unit":"wageDay"},{"stat":"health","d":2}]},
    {"id":"hand","label":"เกี่ยวมือกับญาติแบบเดิม","text":"ประหยัด ได้อยู่ด้วยกัน แต่เหนื่อยหลายวัน","effects":[{"stat":"bond","d":3},{"stat":"health","d":-2}]},
    {"id":"mix","label":"แปลงใหญ่ใช้รถ แปลงเล็กเกี่ยวมือ","text":"เหนื่อยพอดีๆ จ่ายพอดีๆ","effects":[{"money":-1,"unit":"wageDay"},{"stat":"bond","d":1}]}]},
  {"id":"real-gns","title":"สมัครเรียน กศน.","body":"ศูนย์การศึกษานอกโรงเรียนในอำเภอเปิดรับสมัครเรียนวันหยุด จบแล้วได้วุฒิไปสมัครงาน","when":{"year":[1993,2026],"age":[18,45],"edu":{"top":["none","p6","m3"]},"noFlag":["real-gns"]},"w":5,"cooldown":12,"choices":[
    {"id":"enroll","label":"สมัครเรียนวันอาทิตย์","text":"เหนื่อยเพราะต้องทำงานไปด้วย แต่ได้ความรู้กลับมา","effects":[{"flag":"real-gns"},{"stat":"know","d":4},{"stat":"happy","d":-1},{"money":-1,"unit":"wageDay"}]},
    {"id":"later","label":"ไว้ปีหน้าค่อยว่ากัน","text":"งานยุ่งเกินไปสำหรับตอนนี้","effects":[{"stat":"happy","d":1}]}]},
  {"id":"real-first-mobile","title":"มือถือเครื่องแรก","body":"ร้านในอำเภอขายมือถือเครื่องเล็กกับบัตรเติมเงิน ใครๆ ก็เริ่มมีเบอร์ของตัวเอง","when":{"year":[2002,2010],"age":[14,60],"noFlag":["money-phone"]},"w":7,"cooldown":"once","choices":[
    {"id":"buy","label":"ซื้อเครื่องใหม่กับบัตรเติมเงิน","text":"ติดต่อที่บ้านได้ทุกเมื่อ แต่ค่าโทรหมดไวกว่าที่คิด","effects":[{"money":-4,"unit":"wageDay"},{"flag":"money-phone"},{"stat":"bond","d":3},{"stat":"happy","d":3}]},
    {"id":"used","label":"รับเครื่องเก่าต่อจากญาติ","text":"ไม่เสียเงินมาก ปุ่มกดติดบ้างแต่ใช้ได้","effects":[{"money":-1,"unit":"wageDay"},{"flag":"money-phone"},{"stat":"bond","d":2}]},
    {"id":"no","label":"ยังไม่ซื้อ","text":"ประหยัด แต่ต้องยืมเครื่องเพื่อนบ่อย","effects":[{"money":1,"unit":"wageDay"},{"trait":"social","d":-1}]}]},
  {"id":"real-seven-eleven","title":"ร้านสะดวกซื้อสาขาแรกในอำเภอ","body":"ร้านสะดวกซื้อเปิดสาขาแรกในตัวอำเภอ เปิดทั้งวันทั้งคืน แอร์เย็นฉ่ำ","when":{"year":[2002,2015],"age":[8,60],"loc":"isan"},"w":5,"cooldown":"once","choices":[
    {"id":"visit","label":"ไปเดินดูตั้งแต่วันแรก","text":"ตื่นตากับของแปลกตา ได้ขนมกลับมาหนึ่งถุง","effects":[{"stat":"happy","d":3},{"money":-1,"unit":"wageDay"}]},
    {"id":"local","label":"ซื้อของร้านป้าข้างบ้านเหมือนเดิม","text":"ป้ายิ้มดีใจ ได้ของแถมเป็นประจำ","effects":[{"stat":"bond","d":2}]},
    {"id":"job","label":"ไปสมัครเป็นพนักงาน","text":"ได้เงินพิเศษ แต่ต้องเข้ากะดึก","when":{"age":[16,40]},"effects":[{"money":3,"unit":"wageDay"},{"stat":"health","d":-1}]}]},
  {"id":"real-motorbike-school","title":"ขี่มอเตอร์ไซค์ไปโรงเรียน","body":"เพื่อนหลายคนขี่มอเตอร์ไซค์ไปโรงเรียนมัธยม พ่อแม่ถามว่าอยากขี่เองไหม","when":{"year":[2000,2026],"age":[16,17],"loc":"isan","edu":{"in":["school"]}},"w":7,"cooldown":"once","choices":[
    {"id":"helmet","label":"ขี่เองแต่ใส่หมวกทุกวัน","text":"สะดวกขึ้น ผมยุ่งทุกเช้าแต่ปลอดภัยกว่า","effects":[{"stat":"happy","d":2},{"flag":"noHelmet","v":false}]},
    {"id":"nohelmet","label":"ขี่ไปแบบเพื่อน ไม่ใส่หมวก","text":"ดูเท่ในกลุ่มเพื่อน แต่ไม่มีอะไรป้องกันศีรษะ","effects":[{"stat":"happy","d":3},{"flag":"noHelmet","v":true},{"inc":"naughty"}]},
    {"id":"bus","label":"นั่งรถรับส่งนักเรียน","text":"ตื่นเช้ากว่าเดิม แต่บ้านไม่ต้องกังวล","effects":[{"money":-1,"unit":"wageDay"},{"stat":"bond","d":1}]}]},
  {"id":"real-otop-group","title":"กลุ่มแม่บ้านผ้าทอ","body":"กลุ่มแม่บ้านในหมู่บ้านรวมกันทอผ้าส่งขายงานสินค้าชุมชน ชวนให้เข้ากลุ่ม","when":{"year":[2002,2026],"age":[25,70],"loc":"isan","setting":"rural"},"w":5,"cooldown":"once","choices":[
    {"id":"join","label":"เข้ากลุ่ม ลงหุ้นซื้อด้าย","text":"มีรายได้เสริมหลังฤดูนา ได้เพื่อนใหม่","effects":[{"money":-2,"unit":"wageDay"},{"inc":"skill-craft"},{"trait":"social","d":2}],"roll":[{"p":0.5,"text":"ผ้าลายใหม่ขายหมดในงาน ทุกคนได้ปันผล","effects":[{"money":5,"unit":"wageDay"},{"stat":"happy","d":3}]}]},
    {"id":"help","label":"ช่วยงานกลุ่มบ้างตอนว่าง","text":"ไม่ได้ลงทุน แต่ได้ค่าแรงเล็กน้อย","effects":[{"money":1,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"no","label":"ไม่เข้า งานบ้านก็หนักแล้ว","text":"เวลาพักยังเหลือ","effects":[{"stat":"health","d":1}]}]},
  {"id":"real-elder-allowance","title":"เบี้ยยังชีพผู้สูงอายุ","body":"ต้นเดือนผู้สูงอายุในหมู่บ้านไปรับเบี้ยยังชีพที่ศาลากลางบ้าน","when":{"year":[2009,2100],"age":[60,100],"loc":"isan"},"w":5,"cooldown":12,"choices":[
    {"id":"save","label":"เก็บไว้เป็นค่ายา","text":"มีเงินติดตัวยามเจ็บป่วย","effects":[{"money":2,"unit":"wageDay"},{"stat":"health","d":1}]},
    {"id":"grandkids","label":"ให้หลานเป็นค่าขนม","text":"หลานกอดแน่น วิ่งไปบอกเพื่อน","when":{"flag":{"grandchild":true}},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
    {"id":"merit","label":"เอาไปทำบุญที่วัด","text":"ใจสงบ ได้พบเพื่อนวัยเดียวกัน","effects":[{"stat":"happy","d":3},{"trait":"social","d":1}]}]},
  {"id":"real-line-family","title":"กลุ่มไลน์ครอบครัว","body":"ญาติตั้งกลุ่มไลน์ครอบครัว รูปสวัสดีวันจันทร์กับข่าวจากทุกคนเด้งทั้งวัน","when":{"year":[2013,2026],"age":[15,90]},"w":6,"cooldown":15,"choices":[
    {"id":"active","label":"ส่งรูปทักทายทุกเช้า","text":"ญาติที่อยู่ไกลรู้สึกใกล้ขึ้น","effects":[{"stat":"bond","d":3},{"stat":"happy","d":1}]},
    {"id":"mute","label":"ปิดเสียงกลุ่ม อ่านเป็นบางครั้ง","text":"สมาธิกลับมา แต่พลาดข่าวสำคัญไปเรื่องหนึ่ง","effects":[{"stat":"happy","d":1},{"stat":"bond","d":-1}]},
    {"id":"check","label":"ช่วยเช็คข่าวปลอมที่ญาติแชร์","text":"บางคนขอบคุณ บางคนน้อยใจ","effects":[{"stat":"know","d":2},{"stat":"bond","d":-1}]}]},
  {"id":"real-video-call","title":"วิดีโอคอลหาลูกหลาน","body":"ลูกหลานที่ทำงานไกลโทรวิดีโอกลับมา อยากเห็นหน้าทุกคนในบ้าน","when":{"year":[2014,2026],"age":[40,90],"childAge":[18,90]},"w":6,"cooldown":12,"choices":[
    {"id":"talk","label":"คุยนานจนแบตหมด","text":"ได้เห็นหน้าคนที่รักและพูดคุยกัน","effects":[{"stat":"bond","d":3},{"stat":"happy","d":3,"by":"attach"}]},
    {"id":"show","label":"พาเดินดูนาดูบ้านผ่านกล้อง","text":"ลูกหัวเราะว่าบ้านเปลี่ยนไปเยอะ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":2}]},
    {"id":"short","label":"คุยสั้นๆ ไม่อยากให้เปลืองเน็ต","text":"ได้ยินเสียงก็พอใจ แต่ยังคิดถึง","effects":[{"stat":"happy","d":1},{"cond":"lonely","turns":1}]}]},
  {"id":"real-fluke-check","title":"ตรวจพยาธิใบไม้ตับ","body":"โรงพยาบาลส่งเสริมสุขภาพตำบลชวนตรวจอุจจาระและอัลตราซาวด์ตับฟรี","when":{"year":[2015,2026],"age":[30,80],"loc":"isan"},"w":5,"cooldown":"once","choices":[
    {"id":"check","label":"ไปตรวจ","text":"เสียเวลาครึ่งวัน แต่รู้ผลแน่ชัด","effects":[{"stat":"know","d":2},{"stat":"health","d":1}],"roll":[{"p":0.3,"text":"เจอไข่พยาธิ หมอให้ยาและแนะนำให้เลิกกินปลาดิบ","effects":[{"flag":"rawFish","v":false},{"stat":"health","d":2}]}]},
    {"id":"quit","label":"ไม่ไปตรวจ แต่เลิกกินก้อยปลาดิบ","text":"ปรับตัวยากหน่อย แต่ปลอดภัยขึ้น","effects":[{"flag":"rawFish","v":false},{"stat":"happy","d":-1}]},
    {"id":"skip","label":"ไม่ตรวจ ยังสบายดี","text":"ไม่เสียเวลา แต่ไม่รู้ว่าข้างในเป็นอย่างไร","effects":[{"stat":"happy","d":1}]}]},
  {"id":"real-mookata","title":"ร้านหมูกระทะเปิดใหม่","body":"ร้านหมูกระทะบุฟเฟต์เปิดใหม่ริมถนนใหญ่ในอำเภอ เพื่อนชวนไปฉลองวันเกิด","when":{"year":[2010,2026],"age":[15,45],"loc":"isan"},"w":5,"cooldown":12,"choices":[
    {"id":"go","label":"ไปกินกับเพื่อน","text":"อิ่มจนเดินไม่ไหว คุยกันจนร้านปิด","effects":[{"stat":"happy","d":3},{"stat":"bond","d":2},{"money":-1,"unit":"wageDay"}]},
    {"id":"home","label":"ชวนมาทำหมูกระทะที่บ้านแทน","text":"ถูกกว่า ทุกคนช่วยกันเตรียม","effects":[{"stat":"bond","d":3},{"inc":"skill-cooking"}]},
    {"id":"no","label":"ปฏิเสธ เก็บเงินไว้","text":"เงินอยู่ครบ แต่พลาดงานเพื่อน","effects":[{"money":1,"unit":"wageDay"},{"stat":"bond","d":-1}]}]},
  {"id":"real-grand-raised","title":"อยู่กับตายายสองคน","body":"พ่อแม่ทำงานไกล ในบ้านเหลือแค่ตายายกับเรา ตาเริ่มเดินช้าลง","when":{"year":[1985,2026],"age":[7,14],"loc":"isan","flag":{"fam-raisedByGrand":true,"grandparentsAlive":true}},"w":7,"cooldown":12,"choices":[
    {"id":"help","label":"ช่วยตายายทำงานบ้านก่อนไปโรงเรียน","text":"ตื่นเช้ากว่าเพื่อน แต่ยายบอกใครๆ ว่าหลานเก่ง","effects":[{"stat":"bond","d":3},{"trait":"grit","d":1},{"stat":"happy","d":-1}]},
    {"id":"teach","label":"สอนยายใช้โทรศัพท์คุยกับแม่","text":"ยายได้เห็นหน้าแม่ หัวเราะเหมือนเด็ก","when":{"year":[2013,2026]},"effects":[{"stat":"bond","d":4},{"stat":"know","d":1}]},
    {"id":"play","label":"ออกไปเล่นจนค่ำ","text":"สนุกกับเพื่อน แต่ยายนั่งรอหน้าบ้านจนมืด","effects":[{"stat":"happy","d":2},{"stat":"bond","d":-2},{"inc":"naughty"}]}]},
  {"id":"real-drone-spray","title":"โดรนพ่นยาในนา","body":"มีคนรับจ้างบินโดรนพ่นปุ๋ยพ่นยาในนา ไม่ต้องเดินแบกถังเอง","when":{"year":[2021,2026],"age":[20,75],"loc":"isan","role":"farmer"},"w":5,"cooldown":12,"choices":[
    {"id":"hire","label":"จ้างโดรน","text":"เสร็จในชั่วโมงเดียว ไม่ต้องสูดสารเคมี","effects":[{"money":-2,"unit":"wageDay"},{"stat":"health","d":2}]},
    {"id":"self","label":"แบกถังพ่นเองแบบเดิม","text":"ประหยัด แต่เหนื่อยและเสี่ยงสารเคมี","effects":[{"stat":"health","d":-2},{"money":1,"unit":"wageDay"}]},
    {"id":"learn","label":"ลงเรียนบินโดรนรับจ้างเอง","text":"ลงทุนสูง แต่มีงานรับจ้างทั้งตำบล","when":{"age":[20,45]},"effects":[{"money":-10,"unit":"wageDay"},{"inc":"skill-mechanic"},{"stat":"know","d":3}],"roll":[{"p":0.6,"text":"คิวรับจ้างแน่นทั้งหน้านา","effects":[{"money":12,"unit":"wageDay"}]}]}]},
  {"id":"real-tiktok-molam","title":"คลิปหมอลำในมือถือ","body":"คลิปหมอลำกับเพลงอีสานในแอปวิดีโอสั้นดังไปทั่วประเทศ เพื่อนชวนทำคลิปลงบ้าง","when":{"year":[2020,2026],"age":[13,40]},"w":5,"cooldown":12,"choices":[
    {"id":"make","label":"ทำคลิปฟ้อนกับเพื่อน","text":"สนุกและมีคนดูมากกว่าที่คิด","effects":[{"stat":"happy","d":3},{"inc":"skill-music"},{"trait":"social","d":1}]},
    {"id":"watch","label":"ดูอย่างเดียวจนดึก","text":"เพลินจนนอนดึกหลายคืน","effects":[{"stat":"happy","d":2},{"stat":"health","d":-1}]},
    {"id":"off","label":"วางมือถือไปช่วยงานบ้าน","text":"พ่อแม่ชม แต่พลาดเทรนด์ที่เพื่อนคุยกัน","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]}]},
  {"id":"real-app-remit","title":"ส่งเงินกลับบ้านผ่านแอป","body":"สิ้นเดือน เงินเดือนเข้าบัญชี โอนกลับบ้านได้ทันทีจากมือถือ","when":{"year":[2018,2026],"age":[20,60],"loc":["bangkok","abroad"],"flag":{"parentsAlive":true}},"w":5,"cooldown":12,"choices":[
    {"id":"send","label":"โอนให้แม่ตามปกติ","text":"แม่ส่งสติกเกอร์ขอบคุณกลับมา","effects":[{"money":-3,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"more","label":"โอนเพิ่มเป็นค่าซ่อมบ้าน","text":"เงินเก็บบางลง แต่บ้านได้หลังคาใหม่","effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":5}]},
    {"id":"skip","label":"เดือนนี้ขอเก็บไว้ก่อน","text":"เงินเก็บพอกพูน แต่รู้สึกผิดเล็กน้อย","effects":[{"stat":"bond","d":-2},{"money":2,"unit":"wageDay"}]}]},
  {"id":"real-teen-festival-drink","title":"วงเหล้าในงานบุญ","body":"งานบุญในหมู่บ้านคึกคัก รุ่นพี่ในหมู่บ้านยื่นแก้วเหล้าขาวให้ลองบ้าง","when":{"age":[15,17],"loc":"isan","noFlag":["real-teenDrank"]},"w":8,"cooldown":6,"choices":[
    {"id":"try","label":"ลองดื่มตามรุ่นพี่","text":"หัวหมุนจนต้องให้เพื่อนพยุงกลับบ้าน แม่โกรธมาก","effects":[{"flag":"real-teenDrank"},{"stat":"happy","d":2},{"stat":"health","d":-3},{"stat":"bond","d":-2},{"inc":"naughty"}],"roll":[{"p":0.15,"text":"วงเหล้ามีเรื่องวิวาท ถูกลูกหลงจนหน้าบวม","effects":[{"stat":"health","d":-4},{"cond":"sick","turns":1}]}]},
    {"id":"decline","label":"ปฏิเสธ ดื่มน้ำอัดลมแทน","text":"โดนแซวว่าเด็ก แต่ได้เต้นเซิ้งสนุกจนจบงาน","effects":[{"stat":"health","d":1},{"stat":"happy","d":1},{"trait":"grit","d":1}]},
    {"id":"help","label":"ไปช่วยผู้ใหญ่ยกของทำบุญ","text":"เลี่ยงวงเหล้าได้แนบเนียน ผู้ใหญ่ชมว่ามีน้ำใจ","effects":[{"stat":"bond","d":2},{"inc":"good"}]}]},
  {"id":"real-teen-drink-habit","title":"เพื่อนชวนตั้งวงอีก","body":"หลังงานบุญครั้งนั้น เพื่อนชวนตั้งวงทุกเย็นวันเสาร์ที่ห้างนา","when":{"age":[16,22],"flag":{"real-teenDrank":true},"noFlag":["drinker"]},"w":8,"cooldown":"once","choices":[
    {"id":"join","label":"ไปทุกเสาร์","text":"สนุกกับเพื่อน แต่เงินกับสุขภาพหมดไปเรื่อยๆ","effects":[{"flag":"drinker"},{"inc":"vice"},{"stat":"health","d":-3},{"stat":"bond","d":1}]},
    {"id":"sometimes","label":"ไปแค่นานๆ ครั้ง","text":"ยังอยู่ในกลุ่มเพื่อนได้ไม่ต้องดื่มหนัก","effects":[{"stat":"happy","d":1},{"stat":"health","d":-1}]},
    {"id":"stop","label":"เลิกยุ่งกับวงเหล้า","text":"เพื่อนบางคนห่างไป แต่ไม่เสียใจ","effects":[{"flag":"real-teenDrank","v":false},{"stat":"health","d":2},{"trait":"grit","d":2},{"stat":"bond","d":-1}]}]}
]);
