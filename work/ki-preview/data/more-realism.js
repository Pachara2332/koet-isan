globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const NEAR = {
    "loei": ["nong-bua-lamphu", "udon-thani", "khon-kaen", "chaiyaphum", "nong-khai"],
    "nong-khai": ["udon-thani", "bueng-kan", "loei", "sakon-nakhon"],
    "bueng-kan": ["nong-khai", "sakon-nakhon", "nakhon-phanom"],
    "nong-bua-lamphu": ["loei", "udon-thani", "khon-kaen"],
    "udon-thani": ["nong-khai", "sakon-nakhon", "kalasin", "khon-kaen", "nong-bua-lamphu", "loei"],
    "sakon-nakhon": ["udon-thani", "nong-khai", "bueng-kan", "nakhon-phanom", "mukdahan", "kalasin"],
    "nakhon-phanom": ["bueng-kan", "sakon-nakhon", "mukdahan"],
    "mukdahan": ["nakhon-phanom", "sakon-nakhon", "kalasin", "yasothon", "amnat-charoen"],
    "kalasin": ["udon-thani", "sakon-nakhon", "mukdahan", "yasothon", "roi-et", "maha-sarakham", "khon-kaen"],
    "khon-kaen": ["udon-thani", "nong-bua-lamphu", "loei", "chaiyaphum", "nakhon-ratchasima", "maha-sarakham", "kalasin"],
    "maha-sarakham": ["khon-kaen", "kalasin", "roi-et", "surin", "buriram"],
    "roi-et": ["kalasin", "yasothon", "sisaket", "surin", "maha-sarakham"],
    "yasothon": ["mukdahan", "amnat-charoen", "ubon-ratchathani", "sisaket", "roi-et", "kalasin"],
    "amnat-charoen": ["mukdahan", "ubon-ratchathani", "yasothon"],
    "ubon-ratchathani": ["amnat-charoen", "yasothon", "sisaket"],
    "sisaket": ["ubon-ratchathani", "yasothon", "roi-et", "surin"],
    "surin": ["sisaket", "roi-et", "maha-sarakham", "buriram"],
    "buriram": ["surin", "maha-sarakham", "khon-kaen", "nakhon-ratchasima"],
    "nakhon-ratchasima": ["chaiyaphum", "khon-kaen", "buriram"],
    "chaiyaphum": ["loei", "khon-kaen", "nakhon-ratchasima"]
  };
  const move = KI.data.decisions.find((d) => d.id === "school-move");
  if (!move) return;
  const provinces = KI.data.places.provinces;
  const away = (id) => {
    const homes = Object.keys(NEAR).filter((h) => NEAR[h].includes(id));
    const p = provinces[id];
    return {
      id: "near-" + id, label: "ไปเรียนที่" + p.th + " อยู่กับญาติ", text: "ย้ายไปเรียนโรงเรียนในตัวเมือง" + p.th + " พักอยู่บ้านญาติ",
      when: Object.assign({ homeProvince: homes }, p.founded ? { year: [p.founded, 9999] } : {}),
      effects: [{ move: { kind: "isan", province: id, setting: "urban" } }, { flag: "awayForSchool", v: true }, { money: -6, unit: "wageDay" }, { stat: "know", d: 3 }, { cond: "homesick", turns: 2, by: "attach" }, { pin: "ย้ายไปเรียนที่" + p.th }]
    };
  };
  move.title = "เลือกโรงเรียนช่วงขึ้นมัธยม";
  move.body = "ถึงช่วงขึ้นชั้นใหม่ ครอบครัวคุยกันว่าจะให้เรียนที่ไหนต่อ";
  move.when = { age: [11, 16], edu: { in: ["school"], grade: [7, 7] }, noFlag: ["awayForSchool", "schoolReturned"] };
  move.cooldown = "once";
  move.choices = [
    { id: "stay", label: "เรียนต่อโรงเรียนใกล้บ้าน", text: "เรียนที่เดิมกับเพื่อนกลุ่มเดิม", effects: [{ stat: "bond", d: 2 }] },
    { id: "town", label: "ไปเรียนโรงเรียนประจำจังหวัดในตัวเมือง เดินทางไปกลับ", text: "ตื่นเช้าขึ้นรถสองแถวเข้าเมืองทุกวัน", effects: [{ money: -3, unit: "wageDay" }, { stat: "know", d: 3 }, { stat: "health", d: -1 }, { pin: "เข้าเรียนโรงเรียนในตัวเมือง" }] },
    ...Object.keys(provinces).map(away),
    { id: "bkk", label: "ตามพ่อแม่ไปเรียนที่กรุงเทพฯ", text: "ย้ายไปอยู่ห้องเช่ากับพ่อแม่ที่ทำงานอยู่กรุงเทพฯ", when: { flag: { parentsAlive: true } }, effects: [{ move: { kind: "bangkok" } }, { flag: "awayForSchool", v: true }, { stat: "know", d: 2 }, { cond: "homesick", turns: 2, by: "attach" }, { pin: "ย้ายไปเรียนกรุงเทพฯ" }] },
    { id: "novice", label: "บวชเณรเรียนที่วัด ไม่ต้องเสียค่าเรียน", text: "บวชเป็นสามเณร เรียนทั้งทางโลกและทางธรรม", when: { sex: "m", wealth: "poor" }, effects: [{ edu: { in: "novice" } }, { stat: "know", d: 2 }, { pin: "บวชเณรเรียนที่วัด" }] }
  ];
  const upper = JSON.parse(JSON.stringify(move));
  upper.id = "school-move-m4";
  upper.title = "เลือกที่เรียนช่วง ม.ปลาย";
  upper.when = { age: [14, 17], edu: { in: ["school"], grade: [10, 10] }, noFlag: ["awayForSchool", "schoolReturned"] };
  upper.choices = upper.choices.filter((c) => c.id !== "novice");
  KI.data.decisions.splice(KI.data.decisions.indexOf(move) + 1, 0, upper);
})();
(function () {
  const list = KI.data.decisions;
  const faculty = list.find((d) => d.id === "job2-faculty");
  const admission = list.find((d) => d.id === "uni-admission");
  if (!faculty || !admission) return;
  list.splice(list.indexOf(faculty), 1);
  list.splice(list.indexOf(admission) + 1, 0, faculty);
  faculty.title = "เลือกคณะที่จะเรียน";
  faculty.when = { ...faculty.when, edu: { in: ["uni"], grade: [1, 1] } };
})();
(function () {
  const back = KI.data.decisions.find((d) => d.id === "school-return");
  if (back) back.when = Object.assign({}, back.when, { chance: 0.12 });
})();
