globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const list = KI.data.decisions;
  const adm = list.find((d) => d.id === "uni-admission");
  if (!adm) return;
  const SELECTIVE = ["msu", "kku", "real-swu-msk", "real-ubu"];
  const ERAS = [[1970, 1984, 0.3], [1985, 1999, 0.45], [2000, 9999, 0.7]];
  const KNOW = [[0, 39, 0.4], [40, 69, 1], [70, 100, 1.35]];
  const pass = { "flag": "edu-failed", "v": false };
  adm.choices = adm.choices.flatMap((c) => {
    if (!SELECTIVE.includes(c.id)) return [Object.assign({}, c, { effects: [...c.effects, pass] })];
    const span = (c.when && c.when.year) || [1970, 9999];
    const out = [];
    ERAS.forEach(([lo, hi, base], i) => {
      const a = Math.max(lo, span[0]), b = Math.min(hi, span[1]);
      if (a > b) return;
      KNOW.forEach(([k1, k2, mult], j) => {
        const p = Math.min(0.92, Math.round(base * mult * 100) / 100);
        const place = c.effects.find((e) => e.edu).edu.place;
        out.push({
          id: c.id + "-e" + i + "k" + j,
          label: c.label + " · สอบคัดเลือก โอกาสติดราว " + Math.round(p * 100) + "%",
          text: "ตั้งใจอ่านหนังสือแล้วเดินทางไปสอบ",
          when: Object.assign({}, c.when, { year: [a, b], stat: { know: [k1, k2] } }),
          effects: [{ "money": -3, "unit": "wageDay" }],
          roll: [
            { p, text: "ประกาศผลสอบ มีชื่อตัวเองติดที่" + place, effects: [...c.effects, pass, { "stat": "happy", "d": 6 }, { "pin": "สอบติด" + place }] },
            { p: Math.round((1 - p) * 100) / 100, text: "ไล่หาชื่อในประกาศหลายรอบ แต่ไม่มีชื่อตัวเอง", effects: [{ "flag": "edu-failed" }, { "stat": "happy", "d": -6, "by": "attach" }] }
          ]
        });
      });
    });
    return out;
  });
  const retry = JSON.parse(JSON.stringify(adm));
  retry.id = "edu-retry";
  retry.title = "สอบใหม่อีกปี";
  retry.body = "ปีที่แล้วสอบไม่ติด ปีนี้จะลองใหม่ เลือกทางอื่น หรือพอแค่นี้";
  retry.when = { "age": [18, 23], "season": 0, "flag": { "edu-failed": true } };
  retry.cooldown = "once";
  retry.choices.forEach((c) => (c.roll || []).forEach((r) => r.effects.forEach((e) => { if (e.flag === "edu-failed" && e.v === undefined) e.v = false; })));
  retry.choices.push({ "id": "work", "label": "พอแล้ว ออกไปทำงาน", "text": "เก็บหนังสือเตรียมสอบใส่กล่อง", "effects": [pass, { "role": "jobless" }, { "pin": "เลิกสอบเข้ามหาวิทยาลัย" }] });
  list.splice(list.indexOf(adm) + 1, 0, retry);
})();
KI.data.decisions.push(...[
  {"id":"edu-fees-old","title":"ค่าเทอมปีนี้","body":"ถึงเวลาจ่ายค่าเทอมกับค่าหอ ยุคนี้ยังไม่มีกองทุนให้กู้ยืมเรียน ที่บ้านต้องหาเงินเอง","major":true,"when":{"year":[1970,1995],"season":0,"edu":{"in":["uni"]},"wealth":["poor","mid"],"noFlag":["parentsCanPay"]},"cooldown":3,"choices":[
    {"id":"cattle","label":"พ่อแม่ขายวัวควายส่งเรียน","text":"วัวในคอกหายไปสองตัว พ่อบอกว่าไม่เป็นไร","when":{"flag":{"parentsAlive":true}},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":-2,"by":"attach"},{"stat":"know","d":1}]},
    {"id":"borrow","label":"ยืมเงินญาติมาจ่ายก่อน","text":"เป็นหนี้ญาติไว้ สัญญาว่าเรียนจบจะใช้คืน","effects":[{"cond":"indebted","turns":6},{"stat":"know","d":1}]},
    {"id":"job","label":"ทำงานพิเศษหาเงินเอง","text":"รับจ้างล้างจานตอนกลางคืน ตื่นเช้าไปเรียนแทบไม่ไหว","effects":[{"stat":"health","d":-3},{"stat":"know","d":-1},{"trait":"grit","d":2}]},
    {"id":"scholar","label":"สมัครทุนเรียนดี","text":"อาจารย์เซ็นรับรองให้ เพราะเกรดดีทุกเทอม","when":{"stat":{"know":[70,100]}},"effects":[{"stat":"happy","d":4},{"stat":"know","d":1},{"pin":"ได้ทุนเรียนดี"}]},
    {"id":"quit","label":"ลาออกกลางคัน ไม่อยากเป็นภาระ","text":"เก็บของออกจากหอ ขึ้นรถกลับบ้าน","effects":[{"edu":{"in":null,"grade":0}},{"role":"jobless"},{"stat":"happy","d":-8,"by":"attach"},{"pin":"ออกจากมหาวิทยาลัยเพราะไม่มีค่าเทอม"}]}]},
  {"id":"edu-fees-new","title":"ค่าเทอมปีนี้","body":"ค่าเทอม ค่าหอ ค่าหนังสือ รวมกันแล้วหนักกว่าที่บ้านจะส่งไหว","major":true,"when":{"year":[1996,9999],"season":0,"edu":{"in":["uni"],"grade":[2,4]},"wealth":["poor","mid"],"noFlag":["parentsCanPay"],"chance":0.5},"cooldown":3,"choices":[
    {"id":"loan","label":"กู้ กยศ.","text":"ได้เรียนต่อ แต่เรียนจบต้องผ่อนคืน","effects":[{"flag":"career-kyorsor"},{"stat":"happy","d":1}]},
    {"id":"job","label":"ทำงานพิเศษ","text":"รับจ้างเสิร์ฟอาหารหรือเป็นพนักงานร้านสะดวกซื้อหลังเลิกเรียน","effects":[{"money":6,"unit":"wageDay"},{"stat":"health","d":-2},{"stat":"know","d":-1}]},
    {"id":"family","label":"ให้ที่บ้านช่วย","text":"แม่โอนเงินมาให้ทั้งที่ตัวเองก็ไม่ค่อยมี","when":{"flag":{"parentsAlive":true}},"effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]},
    {"id":"quit","label":"ดรอปเรียนออกมาทำงาน","text":"ลาออกกลางคัน ตั้งใจหาเงินก่อน","effects":[{"edu":{"in":null,"grade":0}},{"role":"jobless"},{"stat":"happy","d":-6},{"pin":"ออกจากมหาวิทยาลัยกลางคัน"}]}]},
  {"id":"edu-dropout-mid","title":"เพื่อนชวนออกไปทำงาน","body":"เพื่อนร่วมห้องหลายคนออกไปทำงานโรงงาน มีเงินเดือนเป็นของตัวเอง ส่วนที่บ้านก็ขัดสน","major":true,"when":{"year":[2003,9999],"age":[14,17],"edu":{"in":["school"],"grade":[8,11]},"any":[{"flag":{"status":"poor"}},{"counter":{"naughty":[3,99]}}],"chance":0.12},"cooldown":"once","choices":[
    {"id":"quit","label":"ออกไปทำงานโรงงาน","text":"ได้เงินเดือนแรกในชีวิต ส่งให้แม่ครึ่งหนึ่ง","when":{"age":[15,17]},"effects":[{"edu":{"in":null,"grade":0}},{"role":"factory"},{"money":5,"unit":"wageDay"},{"stat":"happy","d":2},{"pin":"ออกกลางคันไปทำงาน"}]},
    {"id":"gsn","label":"ทำงานไปด้วย เรียน กศน. วันอาทิตย์","text":"เหนื่อยแต่ยังได้เรียนต่อ","when":{"age":[15,17]},"effects":[{"edu":{"in":null,"grade":0}},{"role":"factory"},{"flag":"edu-gsn"},{"stat":"health","d":-1},{"trait":"grit","d":2}]},
    {"id":"stay","label":"อดทนเรียนต่อให้จบ","text":"ครูประจำชั้นช่วยหาทุนเล็กๆ ให้","effects":[{"stat":"know","d":2},{"stat":"happy","d":-1},{"inc":"good"}]}]},
  {"id":"edu-gsn-finish","title":"สอบ กศน.","body":"เรียน กศน. วันอาทิตย์มาหลายปี ถึงเวลาสอบวัดผลแล้ว","major":true,"when":{"age":[16,45],"flag":{"edu-gsn":true}},"cooldown":"once","choices":[
    {"id":"exam","label":"ตั้งใจอ่านหนังสือสอบ","text":"อ่านหนังสือทุกคืนหลังเลิกงาน","effects":[{"flag":"edu-gsn","v":false}],"roll":[
      {"p":0.7,"text":"สอบผ่าน ได้วุฒิ ม.6 เทียบเท่า","effects":[{"edu":{"top":"m6"}},{"stat":"happy","d":6},{"cond":"proud","turns":2},{"pin":"จบ ม.6 จาก กศน."}]},
      {"p":0.3,"text":"สอบไม่ผ่าน ต้องรอรอบหน้า","effects":[{"flag":"edu-gsn"},{"stat":"happy","d":-3}]}]},
    {"id":"skip","label":"งานยุ่งเกินไป ขอเลิกเรียน กศน. ไว้ก่อน","text":"ไม่ได้ไปสอบ แล้วก็ค่อยๆ ห่างจาก กศน. ไป","effects":[{"flag":"edu-gsn","v":false}]}]},
  {"id":"edu-gap-tutor","title":"ปีว่างก่อนสอบใหม่","body":"สอบไม่ติดเมื่อปีที่แล้ว ระหว่างรอสอบรอบหน้าจะทำอะไรดี","major":false,"when":{"age":[18,23],"flag":{"edu-failed":true}},"cooldown":"once","choices":[
    {"id":"tutor","label":"ลงเรียนกวดวิชาในเมือง","text":"นั่งเรียนวันละหกชั่วโมงกับเด็กซิ่วคนอื่น","effects":[{"money":-12,"unit":"wageDay"},{"stat":"know","d":8}]},
    {"id":"self","label":"อ่านเองที่บ้าน ช่วยงานที่บ้านไปด้วย","text":"อ่านหนังสือใต้หลอดไฟตอนกลางคืน","effects":[{"stat":"know","d":4},{"stat":"bond","d":2}]},
    {"id":"work","label":"ทำงานเก็บเงินไว้เป็นค่าเทอม","text":"ได้เงินก้อน แต่ความรู้ที่อ่านไว้เริ่มลืม","effects":[{"money":15,"unit":"wageDay"},{"stat":"know","d":-2}]}]}
]);
(function () {
  const list = KI.data.decisions;
  const gap = list.find((d) => d.id === "edu-gap-tutor");
  const retry = list.find((d) => d.id === "edu-retry");
  if (!gap || !retry) return;
  list.splice(list.indexOf(gap), 1);
  list.splice(list.indexOf(retry), 0, gap);
})();
(function () {
  const D = KI.data, list = D.decisions;
  const find = (id) => list.find((d) => d.id === id) || D.personalEvents.find((d) => d.id === id);
  const ch = (id, cid) => { const d = find(id); return d && (d.choices || []).find((c) => c.id === cid); };
  const RICH = [{ "wealth": "rich" }, { "flag": { "status": "rich" } }, { "flag": { "status": "wealthy" } }];
  const PLAIN = [{ "flag": { "status": "poor" } }, { "flag": { "status": "mid" } }, { "noFlag": ["status"] }, { "cond": ["indebted"] }, { "flag": { "crime-record": true } }, { "flag": { "loanDefault": true } }, { "flag": { "sharkLate": true } }];
  const NOSTREAM = { "noFlag": ["edu-stream-sci", "edu-stream-math", "edu-stream-lang"] };
  const NOVOC = { "noFlag": ["edu-voc-tech", "edu-voc-biz", "edu-voc-comp"] };
  const andAny = (when, alts) => {
    const w = Object.assign({}, when || {}), prev = w.any;
    delete w.any;
    w.any = alts.map((a) => (prev ? Object.assign({}, a, { any: prev }) : a));
    return w;
  };
  const gate = (x, alts) => { if (x) x.when = andAny(x.when, alts); };
  const add = (id, choices, front) => { const d = find(id); if (d) d.choices = front ? [...choices, ...d.choices] : [...d.choices, ...choices]; };
  const fx = (id, cid, effects) => { const c = ch(id, cid); if (c) c.effects = [...c.effects, ...effects]; };
  const loanKys = (days) => ({ "loan": { "kind": "kyorsor", "label": "กยศ.", "amountDays": days, "rate": 0.0025, "seasons": 45, "grace": 6 } });
  const decline = { "id": "edu-decline", "label": "ยังไม่ตัดสินใจ ขอมองหางานอื่นก่อน", "text": "คุณขอเวลามองหางานที่ใช่กว่านี้ ชีวิตตอนนี้ยังเป็นแบบเดิมไปก่อน", "effects": [{ "flag": "edu-grad-declined" }, { "stat": "happy", "d": -1 }] };
  const famBiz = { "id": "edu-family-biz", "label": "เข้าไปช่วยกิจการของที่บ้าน", "text": "เริ่มจากคุมหน้าร้านและบัญชี พ่อแม่สอนงานให้ทีละขั้น ได้อยู่ใกล้บ้านแต่ต้องฟังผู้ใหญ่ทุกเรื่อง", "when": { "age": [18, 60], "any": RICH }, "effects": [{ "role": "business" }, { "move": "home" }, { "stat": "bond", "d": 3 }, { "stat": "happy", "d": -1 }, { "pin": "เข้าช่วยกิจการของครอบครัว" }] };
  const ownBiz = { "id": "edu-family-capital", "label": "ขอทุนจากที่บ้านเปิดกิจการของตัวเอง", "text": "พ่อแม่ให้เงินก้อนตั้งต้น ถ้ารุ่งก็เป็นหน้าเป็นตาของบ้าน ถ้าล้มทุกคนจะรู้", "when": { "age": [20, 60], "any": RICH }, "effects": [{ "role": "business" }, { "stat": "bond", "d": -1 }], "roll": [{ "p": 0.6, "text": "ลูกค้าเริ่มติด กิจการพอมีกำไร", "effects": [{ "inc": "biz" }, { "stat": "happy", "d": 4 }, { "pin": "เปิดกิจการด้วยทุนจากครอบครัว" }] }, { "p": 0.4, "text": "ปีแรกขาดทุน ต้องขอเงินที่บ้านเพิ่มอีกก้อน", "effects": [{ "stat": "happy", "d": -4 }, { "stat": "bond", "d": -2 }] }] };
  const fit = (id, why, label, text, when, effects) => ({ id: "fit-" + id, label: label + (why.includes("ทักษะ") ? " · ตามทักษะ" : " · ตรงสาย"), text, when, effects });
  const BA = (f) => ({ "edu": { "top": ["ba"] }, "flag": { [f]: true } });
  const VOC = (f) => ({ "edu": { "top": ["pvc", "pvs", "ba"] }, "flag": { [f]: true } });
  const placed = (role, pin) => [{ "role": role }, { "flag": "job2-placed" }, { "pin": pin }];
  const FITS = [
    fit("eng", "ตรงกับที่เรียนมา: วิศวกรรม", "สมัครเป็นวิศวกรกับผู้รับเหมาหรือโรงงาน", "งานคุมหน้างานและแก้ปัญหาเครื่องจักร ได้ใช้ที่เรียนมาเต็มที่", BA("job2-major-eng"), placed("engineer", "เป็นวิศวกร")),
    fit("cs", "ตรงกับที่เรียนมา: คอมพิวเตอร์", "สมัครเป็นโปรแกรมเมอร์", "เขียนระบบให้บริษัท งานไม่เคยหมด แต่ได้ฝึกฝีมือทุกวัน", Object.assign(BA("job2-major-cs"), { "year": [1995, 9999] }), [...placed("developer", "เป็นโปรแกรมเมอร์"), { "inc": "skill-computer" }]),
    fit("acc", "ตรงกับที่เรียนมา: บัญชี", "สมัครเป็นนักบัญชีบริษัทในจังหวัด", "ปิดงบทุกสิ้นเดือน งานละเอียดแต่มั่นคง", BA("job2-major-acc"), placed("accountant", "เป็นนักบัญชี")),
    fit("biz", "ตรงกับที่เรียนมา: บริหารธุรกิจ", "สมัครพนักงานธนาคารหรือฝ่ายขายบริษัท", "ได้เจอลูกค้าทุกวัน มีเป้ายอดให้ไล่ตาม", BA("job2-major-biz"), placed("banker", "เป็นพนักงานธนาคาร")),
    fit("law", "ตรงกับที่เรียนมา: นิติศาสตร์", "สมัครเป็นนิติกรในบริษัทหรือหน่วยงาน", "ร่างสัญญาและตอบคำถามกฎหมาย ระหว่างนั้นยังสอบเนติฯ ต่อได้", BA("job2-major-law"), placed("office", "เป็นนิติกร")),
    fit("nurse", "ตรงกับที่เรียนมา: พยาบาลศาสตร์", "สมัครพยาบาลโรงพยาบาลในจังหวัด", "เข้าเวรเช้าบ่ายดึก เหนื่อยแต่มีคนรอความช่วยเหลือ", BA("job2-major-nurse"), placed("nurse", "เป็นพยาบาล")),
    fit("pharm", "ตรงกับที่เรียนมา: เภสัชศาสตร์", "สมัครเภสัชกรโรงพยาบาลหรือร้านยา", "จ่ายยาและให้คำแนะนำคนไข้ทั้งวัน", BA("job2-major-pharm"), placed("pharmacist", "เป็นเภสัชกร")),
    fit("edu", "ตรงกับที่เรียนมา: ครุศาสตร์", "สมัครครูอัตราจ้างหรือครูโรงเรียนเอกชน", "ได้สอนตามที่เรียนมา ระหว่างรอสอบบรรจุ", BA("job2-major-edu"), [{ "role": "teacher" }, { "flag": "governmentTeacher", "v": false }, { "flag": "job2-placed" }, { "pin": "เริ่มทำงานสอน" }]),
    fit("arts", "ตรงกับที่เรียนมา: ศิลปะและการออกแบบ", "สมัครนักออกแบบในบริษัท", "ทำงานตามโจทย์ลูกค้า ได้ใช้ฝีมือที่ฝึกมา", Object.assign(BA("job2-major-arts"), { "year": [2000, 9999] }), [...placed("designer", "เป็นนักออกแบบ"), { "inc": "skill-art" }]),
    fit("voc-tech", "ตรงกับที่เรียนมา: สายช่าง", "สมัครช่างในอู่หรือศูนย์บริการ", "มือเปื้อนน้ำมันทุกวัน แต่ฝีมือติดตัวไปได้ทุกที่", VOC("edu-voc-tech"), [{ "role": "mechanic" }, { "inc": "skill-mechanic" }, { "pin": "เริ่มงานช่าง" }]),
    fit("voc-biz", "ตรงกับที่เรียนมา: พาณิชยกรรม", "สมัครพนักงานบัญชีหรือธุรการในจังหวัด", "ทำบัญชีร้านค้าและเอกสารสำนักงาน งานนั่งโต๊ะเงินเดือนแน่นอน", VOC("edu-voc-biz"), [{ "role": "office" }, { "pin": "เริ่มงานธุรการ" }]),
    fit("voc-comp", "ตรงกับที่เรียนมา: คอมพิวเตอร์ธุรกิจ", "สมัครเจ้าหน้าที่คอมพิวเตอร์ในจังหวัด", "ดูแลเครื่องและระบบของสำนักงาน ได้ฝึกเรื่องใหม่ตลอด", VOC("edu-voc-comp"), [{ "role": "office" }, { "inc": "skill-computer" }, { "pin": "เริ่มงานคอมพิวเตอร์" }]),
    fit("skill-computer", "ตรงกับทักษะที่ฝึกมา: คอมพิวเตอร์", "รับงานเขียนโปรแกรมและทำเว็บ", "ไม่มีปริญญาด้านนี้ แต่ผลงานที่ทำมาพอให้คนจ้าง", { "year": [2000, 9999], "counter": { "skill-computer": [5, 99] } }, [{ "role": "developer" }, { "inc": "skill-computer" }]),
    fit("skill-cooking", "ตรงกับทักษะที่ฝึกมา: ทำอาหาร", "สมัครเป็นพ่อครัวแม่ครัวร้านอาหาร", "ยืนหน้าเตาทั้งวัน แต่ได้ทำสิ่งที่ถนัด", { "counter": { "skill-cooking": [5, 99] } }, [{ "role": "chef" }, { "inc": "skill-cooking" }]),
    fit("skill-mechanic", "ตรงกับทักษะที่ฝึกมา: งานช่าง", "รับงานช่างซ่อมรถและเครื่องยนต์", "คนในละแวกเริ่มเอารถมาให้ซ่อม", { "counter": { "skill-mechanic": [5, 99] } }, [{ "role": "mechanic" }, { "inc": "skill-mechanic" }])
  ];

  ["job2-security", "job2-housekeeper", "job2-rider"].forEach((id) => gate(find(id), PLAIN));
  ["real-bkk-factory", "real-bkk-build", "real-bkk-home", "factory"].forEach((cid) => gate(ch("first-job", cid), PLAIN));
  gate(ch("job-change", "factory"), PLAIN);

  add("after-m6", [famBiz]);
  add("after-voc", [famBiz]);
  add("after-hvoc", [famBiz]);
  add("job-change", [famBiz, ownBiz]);
  [["after-m6", "work"], ["after-m6", "both"], ["after-voc", "work"], ["after-hvoc", "work"], ["edu-retry", "work"]].forEach(([id, cid]) => fx(id, cid, [{ "flag": "edu-seeking" }]));
  const m6 = find("after-m6");
  if (m6) m6.when = Object.assign({}, m6.when, { "noFlag": [...((m6.when && m6.when.noFlag) || []), "edu-novice-next"] });
  const m3w = ch("after-m3", "work");
  if (m3w) { m3w.label = "ออกมาช่วยงานไร่นาที่บ้าน"; m3w.text = "เก็บชุดนักเรียนไว้ แล้วออกไปช่วยพ่อแม่ทำนาทำไร่"; }
  const pol = ch("career-uniform", "police");
  if (pol) (pol.roll || []).forEach((r) => r.effects.forEach((e) => { if (e.role === "soldier") e.role = "police"; }));

  const fj = find("first-job");
  if (fj) {
    fj.when = andAny(fj.when, [
      { "edu": { "top": ["none", "p6", "m3"] } },
      { "edu": { "top": ["m6", "pvc", "pvs"] }, "flag": { "edu-seeking": true } },
      { "edu": { "top": ["m6", "pvc", "pvs"] }, "age": [21, 35] },
      { "edu": { "top": ["ba"] }, "noFlag": ["job2-major"] },
      { "edu": { "top": ["ba"] }, "flag": { "edu-grad-declined": true } },
      { "edu": { "top": ["ba"] }, "age": [25, 35] }
    ]);
    fj.choices = [...FITS, famBiz, ownBiz, ...fj.choices, Object.assign({}, decline, { "effects": [{ "stat": "happy", "d": -1 }] })];
  }
  ["career-nurse", "job2-athlete-retire", "job2-grad-nurse", "job2-grad-pharm", "job2-grad-eng", "job2-grad-cs", "job2-grad-law", "job2-grad-acc", "job2-grad-biz", "job2-grad-arts", "job2-grad-edu"].forEach((id) => add(id, [decline]));

  const adm = find("uni-admission"), retry = find("edu-retry");
  const free = (c) => Object.assign(c, { effects: [...c.effects, { "flag": "edu-failed", "v": false }] });
  const priv = (id, y, place) => free({ "id": id, "label": "สมัคร" + place + " · ไม่ต้องสอบแข่ง แต่ค่าเทอมสูง", "text": "ยื่นผลการเรียนแล้วจ่ายค่าแรกเข้าก้อนใหญ่ ย้ายไปอยู่หอในกรุงเทพฯ", "when": { "year": y, "any": [{ "wealth": ["rich", "mid"] }, ...RICH] }, "effects": [{ "move": { "kind": "bangkok" } }, { "edu": { "in": "uni", "grade": 1, "place": place } }, { "role": "student" }, { "money": -25, "unit": "wageDay" }, { "cond": "homesick", "turns": 2, "by": "attach" }] });
  const cont = (id, y, label, place, voc, major, pin) => free({ "id": id, "label": label, "text": "เทียบโอนวิชาจาก ปวส. แล้วเข้าเรียนปีสามต่อเนื่องจนจบปริญญาตรี", "when": { "year": y, "edu": { "top": ["pvs"] }, "any": [{ "flag": { [voc]: true } }, NOVOC] }, "effects": [{ "edu": { "in": "uni", "grade": 3, "place": place } }, { "role": "student" }, { "flag": "job2-major" }, { "flag": major }, { "pin": pin }] });
  const extra = [
    priv("edu-private-old", [1970, 1983], "วิทยาลัยเอกชนในกรุงเทพฯ"),
    priv("edu-private", [1984, 9999], "มหาวิทยาลัยเอกชนในกรุงเทพฯ"),
    cont("edu-cont-tech", [1988, 9999], "เรียนต่อเนื่องสายวิศวกรรมและเทคโนโลยี 2 ปี · ต่อยอดจาก ปวส.", "หลักสูตรต่อเนื่องสายเทคโนโลยีในภาคอีสาน", "edu-voc-tech", "job2-major-eng", "เรียนต่อเนื่องปริญญาตรีสายเทคโนโลยี"),
    cont("edu-cont-biz", [1988, 9999], "เรียนต่อเนื่องบริหารธุรกิจ 2 ปี · ต่อยอดจาก ปวส.", "หลักสูตรต่อเนื่องบริหารธุรกิจในจังหวัด", "edu-voc-biz", "job2-major-biz", "เรียนต่อเนื่องปริญญาตรีบริหารธุรกิจ"),
    cont("edu-cont-comp", [1995, 9999], "เรียนต่อเนื่องคอมพิวเตอร์ 2 ปี · ต่อยอดจาก ปวส.", "หลักสูตรต่อเนื่องคอมพิวเตอร์ในจังหวัด", "edu-voc-comp", "job2-major-cs", "เรียนต่อเนื่องปริญญาตรีคอมพิวเตอร์")
  ];
  if (adm) adm.choices = [...adm.choices, ...extra];
  if (retry) retry.choices = [...retry.choices.filter((c) => c.id !== "work"), ...JSON.parse(JSON.stringify(extra)), ...retry.choices.filter((c) => c.id === "work")];

  const fac = find("job2-faculty");
  if (fac) {
    fac.when = Object.assign({}, fac.when, { "role": "student" });
    const SCI = [{ "flag": { "edu-stream-sci": true } }, NOSTREAM];
    ["med", "rural", "nurse", "pharm", "eng"].forEach((cid) => gate(ch("job2-faculty", cid), SCI));
    gate(ch("job2-faculty", "cs"), [{ "flag": { "edu-stream-sci": true } }, { "flag": { "edu-stream-math": true } }, NOSTREAM]);
  }

  const kys = find("career-kyorsor");
  if (kys) {
    kys.body = "เปิดเทอมมหาวิทยาลัย ค่าเทอมกับค่าหอเกินกว่าที่บ้านจะส่งไหว ถ้าอยากเรียนต่อต้องหาทางเอง";
    kys.when = { "role": "student", "edu": { "in": ["uni"], "grade": [1, 3] }, "noFlag": ["parentsCanPay"], "any": [{ "wealth": "poor" }, { "flag": { "status": "poor" } }, { "wealth": "mid", "chance": 0.25 }] };
    const loan = ch("career-kyorsor", "loan");
    if (loan) Object.assign(loan, { "label": "กู้ กยศ.", "text": "กองทุนจ่ายค่าเทอมและค่าครองชีพให้ ดอกเบี้ยร้อยละ 1 ต่อปี เรียนจบแล้วปลอดหนี้ 2 ปีจึงเริ่มผ่อน", "when": { "year": [1996, 9999] }, "effects": [loanKys(30), { "flag": "edu-kyorsor" }, { "stat": "happy", "d": 2 }] });
    fx("career-kyorsor", "scholar", [{ "money": 20, "unit": "wageDay" }]);
    add("career-kyorsor", [
      { "id": "edu-bank", "label": "กู้ธนาคาร ให้พ่อแม่ค้ำประกัน", "text": "พ่อแม่เอาโฉนดไปค้ำ ได้เงินก้อนพอค่าเทอม ดอกเบี้ยราวร้อยละ 8 ต่อปี พักชำระระหว่างเรียน เรียนจบต้องผ่อนทันที", "when": { "flag": { "parentsAlive": true } }, "effects": [{ "loan": { "kind": "edu-bank", "label": "เงินกู้ธนาคารเพื่อการศึกษา", "amountDays": 40, "rate": 0.02, "seasons": 20, "grace": 0 } }, { "stat": "bond", "d": -1 }, { "stat": "happy", "d": 1 }] },
      { "id": "edu-shark", "label": "กู้เงินนอกระบบมาจ่ายค่าเทอม", "text": "ได้เงินทันทีไม่ต้องมีคนค้ำ แต่ดอกเบี้ยเดือนละร้อยละห้า เจ้าหนี้เริ่มเก็บตั้งแต่งวดแรก", "effects": [{ "loan": { "kind": "shark", "label": "เงินกู้นอกระบบ", "amountDays": 30, "rate": 0.15, "seasons": 6 } }, { "flag": "money-loanShark" }, { "stat": "happy", "d": -2 }] }
    ]);
  }
  const feeLoan = ch("edu-fees-new", "loan");
  if (feeLoan) Object.assign(feeLoan, { "text": "กู้ กยศ. ต่ออีกปี ยอดหนี้รวมเพิ่มขึ้น เรียนจบแล้วปลอดหนี้ 2 ปีจึงเริ่มผ่อน", "effects": [loanKys(25), { "flag": "edu-kyorsor" }, { "stat": "happy", "d": 1 }] });
  add("edu-fees-old", [{ "id": "edu-bank", "label": "กู้ธนาคาร ให้พ่อแม่ค้ำประกัน", "text": "พ่อแม่เอาโฉนดไปค้ำ ดอกเบี้ยไม่น้อย แต่ได้เรียนต่อ", "when": { "flag": { "parentsAlive": true } }, "effects": [{ "loan": { "kind": "edu-bank", "label": "เงินกู้ธนาคารเพื่อการศึกษา", "amountDays": 25, "rate": 0.02, "seasons": 20, "grace": 0 } }, { "stat": "bond", "d": -1 }] }]);

  const town = { "flag": "edu-town-school" };
  fx("school-move", "town", [town]);
  fx("school-move-m4", "town", [town]);
  const privSchool = { "id": "edu-private-school", "label": "เรียนโรงเรียนเอกชนหรือโรงเรียนคาทอลิกในตัวเมือง", "text": "ค่าเทอมแพงกว่าโรงเรียนรัฐ ห้องเรียนเล็ก ครูตามงานใกล้ชิด แต่ต้องเดินทางไกลทุกวัน", "when": { "any": [{ "wealth": ["rich", "mid"] }, ...RICH] }, "effects": [{ "money": -8, "unit": "wageDay" }, { "stat": "know", "d": 4 }, { "stat": "bond", "d": -1 }, { "flag": "edu-private-school" }, { "pin": "เข้าเรียนโรงเรียนเอกชนในตัวเมือง" }] };
  add("school-move", [privSchool]);
  add("school-move-m4", [JSON.parse(JSON.stringify(privSchool))]);

  ["after-m3", "after-m6", "after-voc", "after-hvoc", "uni-admission", "edu-retry", "job2-faculty", "career-kyorsor", "first-job", "job2-med-intern"].forEach((id) => { const d = find(id); if (d) d.urgent = true; });
  list.forEach((d) => { if (d.id.startsWith("job2-grad-")) d.urgent = true; });

  const at = (id) => { const d = find(id); return d ? list.indexOf(d) + 1 : list.length; };
  const OFFER = "รับงานประจำที่เคยฝึก · ";
  const off = { "flag": "edu-intern-offer", "v": false };
  list.splice(at("job2-faculty"), 0,
    {"id":"edu-stream","urgent":true,"title":"เลือกสายเรียน ม.4","body":"ขึ้นมัธยมปลายต้องเลือกแผนการเรียน สายที่เลือกจะกำหนดว่าเรียนต่อคณะไหนได้บ้าง","when":{"edu":{"in":["school"],"grade":[10,10]},"noFlag":["edu-stream-sci","edu-stream-math","edu-stream-lang"]},"major":true,"cooldown":"once","choices":[
      {"id":"sci","label":"สายวิทย์-คณิต","text":"เรียนฟิสิกส์ เคมี ชีวะ เข้มข้น เปิดทางสู่หมอ พยาบาล วิศวะ แต่การบ้านหนักและต้องกวดวิชา","when":{"any":[{"stat":{"know":[40,100]}},{"flag":{"edu-private-school":true}},{"flag":{"edu-town-school":true}},{"flag":{"awayForSchool":true}}]},"effects":[{"flag":"edu-stream-sci"},{"stat":"know","d":3},{"stat":"happy","d":-2},{"money":-2,"unit":"wageDay"}]},
      {"id":"math","label":"สายศิลป์-คำนวณ","text":"เรียนคณิตศาสตร์กับภาษาอังกฤษ เหมาะกับบัญชี บริหาร คอมพิวเตอร์ หนักน้อยกว่าสายวิทย์","effects":[{"flag":"edu-stream-math"},{"stat":"know","d":2}]},
      {"id":"lang","label":"สายศิลป์-ภาษา","text":"เรียนภาษาไทยและภาษาต่างประเทศ เหมาะกับนิติศาสตร์ ครู ศิลปะ งานบริการ แต่ปิดทางคณะสายวิทย์","effects":[{"flag":"edu-stream-lang"},{"stat":"happy","d":2},{"inc":"skill-language"}]}]},
    {"id":"edu-voc-field","urgent":true,"title":"เลือกสาขา ปวช.","body":"เข้าวิทยาลัยแล้วต้องเลือกสาขา ความรู้ที่ได้จะติดตัวไปถึงตอนหางานและเรียนต่อ","when":{"edu":{"in":["voc"],"grade":[1,1]},"noFlag":["edu-voc-tech","edu-voc-biz","edu-voc-comp"]},"major":true,"cooldown":"once","choices":[
      {"id":"tech","label":"ช่างยนต์ ช่างไฟฟ้า ช่างกล","text":"ฝึกกับเครื่องจักรจริง มือเปื้อนน้ำมันทุกวัน แต่จบไปหางานช่างได้ง่าย","effects":[{"flag":"edu-voc-tech"},{"inc":"skill-mechanic"},{"stat":"happy","d":-1}]},
      {"id":"biz","label":"พาณิชยกรรม บัญชี การขาย","text":"เรียนบัญชีและงานสำนักงาน ได้เพื่อนเยอะ งานหลังจบเป็นงานนั่งโต๊ะ","effects":[{"flag":"edu-voc-biz"},{"trait":"social","d":1},{"stat":"know","d":1}]},
      {"id":"comp","label":"คอมพิวเตอร์ธุรกิจ","text":"ได้จับคอมพิวเตอร์ทุกวัน ค่าอุปกรณ์แพงกว่าสาขาอื่น","when":{"year":[1995,9999]},"effects":[{"flag":"edu-voc-comp"},{"inc":"skill-computer"},{"money":-3,"unit":"wageDay"}]}]},
    {"id":"edu-intern","urgent":true,"title":"ปีสุดท้าย ฝึกงานหรือทำโปรเจกต์","body":"ปีสุดท้ายของปริญญาตรี บางสาขาบังคับฝึกปฏิบัติ บางสาขาให้เลือกระหว่างออกไปทำงานจริงกับทำโปรเจกต์จบ","when":{"role":"student","edu":{"in":["uni"],"grade":[4,4]},"noFlag":["edu-intern"]},"major":true,"cooldown":"once","choices":[
      {"id":"coop","label":"สหกิจศึกษา ทำงานเต็มเวลาหนึ่งภาคเรียน","text":"ไปทำงานจริงราวสี่เดือนในสถานประกอบการ บางแห่งให้เบี้ยเลี้ยง บางแห่งไม่ให้","when":{"year":[1993,9999],"noFlag":["job2-major-nurse","job2-major-pharm","job2-major-edu"]},"effects":[{"flag":"edu-intern"},{"stat":"know","d":3},{"trait":"social","d":1},{"stat":"health","d":-1},{"money":3,"unit":"wageDay"}],"roll":[{"p":0.4,"text":"หัวหน้างานชอบผลงาน บอกว่าเรียนจบเมื่อไหร่ให้กลับมาสมัคร","effects":[{"flag":"edu-intern-offer"},{"stat":"happy","d":3}]},{"p":0.6,"text":"ได้ประสบการณ์และหนังสือรับรอง แต่ยังไม่มีตำแหน่งว่าง","effects":[{"stat":"know","d":1}]}]},
      {"id":"intern","label":"ฝึกงานช่วงปิดภาคฤดูร้อน","text":"ฝึกงานสองเดือน ส่วนใหญ่ไม่มีค่าตอบแทน ได้เห็นงานจริงแต่ยังไม่ได้รับผิดชอบเต็มที่","when":{"noFlag":["job2-major-nurse","job2-major-pharm","job2-major-edu"]},"effects":[{"flag":"edu-intern"},{"stat":"know","d":2},{"money":-2,"unit":"wageDay"}],"roll":[{"p":0.15,"text":"ที่ทำงานติดต่อกลับมาว่ามีตำแหน่งรอหลังเรียนจบ","effects":[{"flag":"edu-intern-offer"}]}]},
      {"id":"project","label":"ทำโปรเจกต์จบหรือปริญญานิพนธ์","text":"อยู่ห้องแล็บกับอาจารย์ที่ปรึกษาทั้งปี ได้ผลงานติดตัว แต่ไม่ได้รู้จักคนในวงการ","when":{"noFlag":["job2-major-nurse","job2-major-pharm","job2-major-edu"]},"effects":[{"flag":"edu-intern"},{"stat":"know","d":6},{"stat":"happy","d":-2}],"roll":[{"p":0.25,"text":"ผลงานได้รับคัดเลือกไปนำเสนอ อาจารย์ชวนให้คิดเรื่องเรียนต่อ","effects":[{"cond":"proud","turns":2},{"stat":"know","d":2},{"pin":"โปรเจกต์จบได้รับคัดเลือก"}]}]},
      {"id":"ward-home","label":"ฝึกปฏิบัติบนหอผู้ป่วยโรงพยาบาลชุมชน","text":"ภาคปฏิบัติเป็นเงื่อนไขจบของพยาบาล อยู่เวรกับพี่พยาบาลในอำเภอ ได้รู้จักคนไข้ใกล้บ้าน","when":{"flag":{"job2-major-nurse":true}},"effects":[{"flag":"edu-intern"},{"stat":"know","d":4},{"stat":"health","d":-2},{"stat":"bond","d":2}]},
      {"id":"ward-city","label":"ฝึกปฏิบัติที่โรงพยาบาลศูนย์ในเมือง","text":"เคสหนักและหลากหลาย เรียนรู้เร็วแต่เหนื่อยกว่า","when":{"flag":{"job2-major-nurse":true}},"effects":[{"flag":"edu-intern"},{"stat":"know","d":6},{"stat":"health","d":-3}]},
      {"id":"pharm-hosp","label":"ฝึกงานห้องยาโรงพยาบาล","text":"การฝึกงานเป็นเงื่อนไขก่อนสอบใบประกอบวิชาชีพ ได้เห็นยาหลายตัวที่ร้านยาไม่มี","when":{"flag":{"job2-major-pharm":true}},"effects":[{"flag":"edu-intern"},{"stat":"know","d":5},{"stat":"health","d":-1}]},
      {"id":"pharm-shop","label":"ฝึกงานร้านยาชุมชน","text":"ได้คุยกับลูกค้าจริงและเห็นวิธีบริหารร้าน","when":{"flag":{"job2-major-pharm":true}},"effects":[{"flag":"edu-intern"},{"stat":"know","d":3},{"trait":"social","d":2}]},
      {"id":"teach-home","label":"ฝึกสอนโรงเรียนใกล้บ้าน","text":"การฝึกสอนในโรงเรียนจริงเป็นเงื่อนไขจบของครู ได้สอนเด็กในอำเภอบ้านเกิด","when":{"flag":{"job2-major-edu":true}},"effects":[{"flag":"edu-intern"},{"stat":"know","d":3},{"stat":"bond","d":3},{"move":"home"}]},
      {"id":"teach-town","label":"ฝึกสอนโรงเรียนใหญ่ในเมือง","text":"ห้องเรียนใหญ่ งานเอกสารเยอะ ได้เรียนรู้จากครูพี่เลี้ยงเก่งๆ","when":{"flag":{"job2-major-edu":true}},"effects":[{"flag":"edu-intern"},{"stat":"know","d":5},{"stat":"happy","d":-1}]}]},
    {"id":"edu-intern-offer","urgent":true,"title":"ข้อเสนองานจากที่ฝึกงาน","body":"ที่ทำงานที่คุณเคยไปฝึกติดต่อมา ถามว่าจะกลับไปทำงานประจำไหม","when":{"edu":{"top":["ba"]},"flag":{"edu-intern-offer":true},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
      {"id":"eng","label":OFFER+"วิศวกร","text":"กลับไปทำงานกับทีมเดิม ไม่ต้องเริ่มนับหนึ่งใหม่","when":{"flag":{"job2-major-eng":true}},"effects":[off,...placed("engineer","เป็นวิศวกรที่เดิมที่เคยฝึกงาน")]},
      {"id":"cs","label":OFFER+"โปรแกรมเมอร์","text":"ได้ดูแลระบบที่เคยช่วยทำตอนฝึกงาน","when":{"flag":{"job2-major-cs":true}},"effects":[off,...placed("developer","เป็นโปรแกรมเมอร์ที่เดิมที่เคยฝึกงาน")]},
      {"id":"acc","label":OFFER+"นักบัญชี","text":"กลับไปทำบัญชีให้บริษัทเดิม","when":{"flag":{"job2-major-acc":true}},"effects":[off,...placed("accountant","เป็นนักบัญชีที่เดิมที่เคยฝึกงาน")]},
      {"id":"office","label":OFFER+"พนักงานสำนักงาน","text":"งานไม่ตรงสาขาเป๊ะ แต่รู้จักทุกคนในที่ทำงานแล้ว","when":{"noFlag":["job2-major-eng","job2-major-cs","job2-major-acc"]},"effects":[off,...placed("office","ได้งานจากที่ฝึกงาน")]},
      Object.assign({}, decline, { "effects": [off, ...decline.effects] })]},
    {"id":"edu-extern","urgent":true,"title":"นักศึกษาแพทย์ปีหก","body":"ปีสุดท้ายของแพทย์เป็นภาคปฏิบัติเต็มเวลาในโรงพยาบาล ไม่มีใครข้ามได้ เหลือแค่เลือกว่าจะไปฝึกที่ไหน","when":{"edu":{"in":["med"],"grade":[6,6]},"noFlag":["edu-extern"]},"major":true,"cooldown":"once","choices":[
      {"id":"center","label":"ฝึกที่โรงพยาบาลศูนย์ในภาค","text":"เคสหนักทุกคืน ได้ทำหัตถการเยอะ","effects":[{"flag":"edu-extern"},{"stat":"know","d":5},{"stat":"health","d":-4}]},
      {"id":"community","label":"ขอไปฝึกที่โรงพยาบาลชุมชน","text":"เห็นงานหมอบ้านนอกของจริง คนไข้จำชื่อได้","effects":[{"flag":"edu-extern"},{"stat":"know","d":3},{"stat":"bond","d":3},{"stat":"health","d":-2}]}]},
    {"id":"edu-novice-next","urgent":true,"title":"สามเณรจบมัธยมปลาย","body":"เรียนจบ ม.6 จากโรงเรียนในวัดแล้ว หลวงพ่อถามว่าจะไปทางไหนต่อ","when":{"role":"monk","age":[17,22],"edu":{"in":[null],"top":["m6"]},"noFlag":["career-monk-life","edu-novice-next"]},"major":true,"cooldown":"once","choices":[
      {"id":"ordain","label":"อุปสมบทเป็นพระ เรียนต่อในทางธรรม","text":"บวชพระที่วัดเดิม ได้เรียนต่อแต่ห่างทางโลก","effects":[{"flag":"edu-novice-next"},{"flag":"career-monk-life"},{"stat":"know","d":2},{"pin":"อุปสมบท"}]},
      {"id":"uni","label":"ลาสิกขาไปเรียนต่อมหาวิทยาลัย","text":"วุฒิ ม.6 จากวัดใช้สมัครเรียนต่อได้เหมือนนักเรียนทั่วไป","effects":[{"flag":"edu-novice-next"},{"role":"jobless"},{"flag":"university"},{"stat":"happy","d":2},{"pin":"ลาสิกขาไปเรียนต่อ"}]},
      {"id":"work","label":"ลาสิกขาออกมาหางานทำ","text":"กลับบ้านไปช่วยครอบครัวและหางาน","effects":[{"flag":"edu-novice-next"},{"role":"jobless"},{"flag":"edu-seeking"},{"stat":"bond","d":2}]}]}
  );

  D.personalEvents.push(
    {"id":"edu-adult-study","title":"กลับไปเรียนอีกครั้ง","body":"เห็นประกาศรับสมัครเรียนสำหรับคนทำงาน วุฒิที่มีตอนนี้ยังต่อยอดได้","when":{"age":[19,50],"edu":{"in":[null],"top":["none","p6","m3","m6","pvc","pvs"]},"noFlag":["edu-gsn"]},"w":12,"cooldown":12,"choices":[
      {"id":"gsn","label":"สมัครเรียน กศน. วันอาทิตย์","text":"เรียนไปทำงานไป สอบผ่านจะได้วุฒิ ม.6","when":{"year":[1979,9999],"edu":{"top":["none","p6","m3"]}},"effects":[{"flag":"edu-gsn"},{"stat":"know","d":2},{"stat":"health","d":-1}]},
      {"id":"ram","label":"ลงทะเบียนเรียนรามคำแหงแบบอ่านเองสอบเอง","text":"ไม่ต้องสอบเข้า ทำงานไปด้วยได้ ต้องมีวินัยสูงถึงจะจบ","when":{"year":[1971,9999],"edu":{"top":["m6","pvc","pvs"]}},"effects":[{"edu":{"in":"uni","grade":1,"place":"มหาวิทยาลัยรามคำแหง"}},{"money":-3,"unit":"wageDay"},{"stat":"know","d":2},{"pin":"เริ่มเรียนรามคำแหงควบคู่การทำงาน"}]},
      {"id":"stou","label":"สมัครเรียนมหาวิทยาลัยสุโขทัยธรรมาธิราช","text":"เรียนทางไกลจากเอกสารและรายการวิทยุโทรทัศน์ สอบที่ศูนย์สอบในจังหวัด","when":{"year":[1980,9999],"edu":{"top":["m6","pvc","pvs"]}},"effects":[{"edu":{"in":"uni","grade":1,"place":"มหาวิทยาลัยสุโขทัยธรรมาธิราช"}},{"money":-3,"unit":"wageDay"},{"stat":"know","d":2},{"pin":"เริ่มเรียน มสธ. ควบคู่การทำงาน"}]},
      {"id":"full","label":"ลาออกไปสมัครเรียนมหาวิทยาลัยเต็มเวลา","text":"ทิ้งรายได้ไว้ก่อน เพื่อปริญญาที่อยากได้","when":{"age":[19,30],"edu":{"top":["m6","pvc","pvs"]},"noFlag":["university"]},"effects":[{"flag":"university"},{"role":"jobless"},{"stat":"happy","d":1}]},
      {"id":"later","label":"ยังไม่พร้อม","text":"เก็บใบประกาศไว้ก่อน","effects":[]}]},
    {"id":"edu-job-board","title":"มองหางานใหม่","body":"ช่วงนี้ยังไม่มีงานประจำ มีหลายที่เปิดรับสมัคร ลองดูว่างานไหนเข้ากับสิ่งที่เรียนและฝึกมา","when":{"age":[19,55],"role":"jobless","edu":{"in":[null]}},"w":20,"cooldown":6,"choices":[
      ...JSON.parse(JSON.stringify(FITS)), JSON.parse(JSON.stringify(famBiz)), JSON.parse(JSON.stringify(ownBiz)),
      {"id":"general","label":"รับจ้างทั่วไปหรือทำงานโรงงานใกล้บ้าน","text":"ได้ค่าแรงทันที งานหนักแต่ไม่ต้องใช้วุฒิ","when":{"any":PLAIN},"effects":[{"role":"factory"}]},
      {"id":"trade","label":"ค้าขายเล็กๆ ในตลาด","text":"ลงทุนไม่มาก รายได้ขึ้นลงตามวัน","effects":[{"role":"trader"},{"money":-5,"unit":"wageDay"}]},
      {"id":"edu-decline","label":"ยังไม่สมัคร ขอดูงานอื่นก่อน","text":"คุณยังไม่รีบรับงานไหน","effects":[{"stat":"happy","d":-1}]}]}
  );
})();
