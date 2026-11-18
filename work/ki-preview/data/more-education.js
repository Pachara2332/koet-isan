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
  {"id":"edu-fees-old","title":"ค่าเทอมปีนี้","body":"ถึงเวลาจ่ายค่าเทอมกับค่าหอ ยุคนี้ยังไม่มีกองทุนให้กู้ยืมเรียน ที่บ้านต้องหาเงินเอง","major":true,"when":{"year":[1970,1995],"season":0,"edu":{"in":["uni"]},"wealth":["poor","mid"]},"cooldown":3,"choices":[
    {"id":"cattle","label":"พ่อแม่ขายวัวควายส่งเรียน","text":"วัวในคอกหายไปสองตัว พ่อบอกว่าไม่เป็นไร","when":{"flag":{"parentsAlive":true}},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":-2,"by":"attach"},{"stat":"know","d":1}]},
    {"id":"borrow","label":"ยืมเงินญาติมาจ่ายก่อน","text":"เป็นหนี้ญาติไว้ สัญญาว่าเรียนจบจะใช้คืน","effects":[{"cond":"indebted","turns":6},{"stat":"know","d":1}]},
    {"id":"job","label":"ทำงานพิเศษหาเงินเอง","text":"รับจ้างล้างจานตอนกลางคืน ตื่นเช้าไปเรียนแทบไม่ไหว","effects":[{"stat":"health","d":-3},{"stat":"know","d":-1},{"trait":"grit","d":2}]},
    {"id":"scholar","label":"สมัครทุนเรียนดี","text":"อาจารย์เซ็นรับรองให้ เพราะเกรดดีทุกเทอม","when":{"stat":{"know":[70,100]}},"effects":[{"stat":"happy","d":4},{"stat":"know","d":1},{"pin":"ได้ทุนเรียนดี"}]},
    {"id":"quit","label":"ลาออกกลางคัน ไม่อยากเป็นภาระ","text":"เก็บของออกจากหอ ขึ้นรถกลับบ้าน","effects":[{"edu":{"in":null,"grade":0}},{"role":"jobless"},{"stat":"happy","d":-8,"by":"attach"},{"pin":"ออกจากมหาวิทยาลัยเพราะไม่มีค่าเทอม"}]}]},
  {"id":"edu-fees-new","title":"ค่าเทอมปีนี้","body":"ค่าเทอม ค่าหอ ค่าหนังสือ รวมกันแล้วหนักกว่าที่บ้านจะส่งไหว","major":true,"when":{"year":[1996,9999],"season":0,"edu":{"in":["uni"],"grade":[2,4]},"wealth":["poor","mid"],"chance":0.5},"cooldown":3,"choices":[
    {"id":"loan","label":"กู้ กยศ.","text":"ได้เรียนต่อ แต่เรียนจบต้องผ่อนคืน","effects":[{"flag":"career-kyorsor"},{"stat":"happy","d":1}]},
    {"id":"job","label":"ทำงานพิเศษ","text":"ขับไรเดอร์หรือเป็นพนักงานร้านสะดวกซื้อหลังเลิกเรียน","effects":[{"money":6,"unit":"wageDay"},{"stat":"health","d":-2},{"stat":"know","d":-1}]},
    {"id":"family","label":"ให้ที่บ้านช่วย","text":"แม่โอนเงินมาให้ทั้งที่ตัวเองก็ไม่ค่อยมี","when":{"flag":{"parentsAlive":true}},"effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]},
    {"id":"quit","label":"ดรอปเรียนออกมาทำงาน","text":"ลาออกกลางคัน ตั้งใจหาเงินก่อน","effects":[{"edu":{"in":null,"grade":0}},{"role":"jobless"},{"stat":"happy","d":-6},{"pin":"ออกจากมหาวิทยาลัยกลางคัน"}]}]},
  {"id":"edu-dropout-mid","title":"เพื่อนชวนออกไปทำงาน","body":"เพื่อนร่วมห้องหลายคนออกไปทำงานโรงงาน มีเงินเดือนเป็นของตัวเอง ส่วนที่บ้านก็ขัดสน","major":true,"when":{"year":[2003,9999],"age":[14,17],"edu":{"in":["school"],"grade":[8,11]},"any":[{"flag":{"status":"poor"}},{"counter":{"naughty":[3,99]}}],"chance":0.12},"cooldown":"once","choices":[
    {"id":"quit","label":"ออกไปทำงานโรงงาน","text":"ได้เงินเดือนแรกในชีวิต ส่งให้แม่ครึ่งหนึ่ง","effects":[{"edu":{"in":null,"grade":0}},{"role":"factory"},{"money":5,"unit":"wageDay"},{"stat":"happy","d":2},{"pin":"ออกกลางคันไปทำงาน"}]},
    {"id":"gsn","label":"ทำงานไปด้วย เรียน กศน. วันอาทิตย์","text":"เหนื่อยแต่ยังได้เรียนต่อ","effects":[{"edu":{"in":null,"grade":0}},{"role":"factory"},{"flag":"edu-gsn"},{"stat":"health","d":-1},{"trait":"grit","d":2}]},
    {"id":"stay","label":"อดทนเรียนต่อให้จบ","text":"ครูประจำชั้นช่วยหาทุนเล็กๆ ให้","effects":[{"stat":"know","d":2},{"stat":"happy","d":-1},{"inc":"good"}]}]},
  {"id":"edu-gsn-finish","title":"สอบ กศน.","body":"เรียน กศน. วันอาทิตย์มาหลายปี ถึงเวลาสอบวัดผลแล้ว","major":true,"when":{"age":[16,45],"flag":{"edu-gsn":true}},"cooldown":"once","choices":[
    {"id":"exam","label":"ตั้งใจอ่านหนังสือสอบ","text":"อ่านหนังสือทุกคืนหลังเลิกงาน","effects":[{"flag":"edu-gsn","v":false}],"roll":[
      {"p":0.7,"text":"สอบผ่าน ได้วุฒิ ม.6 เทียบเท่า","effects":[{"edu":{"top":"m6"}},{"stat":"happy","d":6},{"cond":"proud","turns":2},{"pin":"จบ ม.6 จาก กศน."}]},
      {"p":0.3,"text":"สอบไม่ผ่าน ต้องรอรอบหน้า","effects":[{"flag":"edu-gsn"},{"stat":"happy","d":-3}]}]},
    {"id":"skip","label":"งานยุ่งเกินไป พักไว้ก่อน","text":"ไม่ได้ไปสอบรอบนี้","effects":[{"flag":"edu-gsn","v":false}]}]},
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
