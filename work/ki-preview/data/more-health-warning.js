globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const rich = {"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]};
  const notRich = {"any":[{"flag":{"status":"poor"}},{"flag":{"status":"mid"}},{"noFlag":["status"]}]};
  const groups = [
    {"id":"cancer","title":"ผลตรวจที่ต้องติดตาม","body":"ไอเรื้อรังมาหลายเดือน น้ำหนักลดโดยไม่ได้ตั้งใจ หมอสั่งเอกซเรย์และตรวจชิ้นเนื้อ ผลออกมาว่าเจอก้อนผิดปกติ ต้องรีบวางแผนรักษา","best":700,"std":40},
    {"id":"kidney","title":"ค่าไตผิดปกติ","body":"เท้าบวม ปัสสาวะเป็นฟอง ตรวจเลือดแล้วหมอบอกว่าไตเริ่มทำงานลดลง ถ้าไม่ดูแลตอนนี้อาจต้องฟอกไตในอนาคต","best":350,"std":25},
    {"id":"illness","title":"ไข้ไม่ยอมลด","body":"ไข้ขึ้นๆ ลงๆ มาสองสัปดาห์ หายใจเหนื่อยง่ายกว่าเดิม คนในบ้านเริ่มเป็นห่วง","best":120,"std":10},
    {"id":"liver","title":"ตัวเหลืองตาเหลือง","body":"แน่นท้องด้านขวา ตาเริ่มเหลือง หมอที่โรงพยาบาลอำเภอสงสัยว่าเป็นผลจากพยาธิใบไม้ตับที่สะสมมานาน ส่งตรวจอัลตราซาวด์","best":500,"std":30},
    {"id":"diabetes","title":"น้ำตาลในเลือดสูง","body":"แผลที่เท้าหายช้า ปัสสาวะบ่อย ตรวจน้ำตาลแล้วสูงเกินเกณฑ์มาก หมอบอกว่าเบาหวานเริ่มมีโรคแทรก","best":200,"std":15},
    {"id":"alcohol","title":"หมอเตือนเรื่องตับ","body":"อาเจียนเป็นเลือดจนต้องส่งโรงพยาบาลกลางดึก หมอบอกตรงๆ ว่าตับเสียหายจากเหล้า ถ้ายังดื่มต่อจะอยู่ได้อีกไม่นาน","best":300,"std":20},
    {"id":"stroke","title":"ปากเบี้ยวชั่วขณะ","body":"เช้านี้แขนข้างหนึ่งชาไปพักหนึ่งแล้วหายเอง คนในบ้านสังเกตว่าพูดไม่ชัด หมอบอกว่าเป็นสัญญาณเตือนของโรคหลอดเลือดสมอง","best":250,"std":15},
    {"id":"heart","title":"เจ็บแน่นหน้าอก","body":"เดินขึ้นบันไดแล้วเจ็บแน่นกลางอก เหงื่อแตก ต้องนั่งพักนาน หมอตรวจคลื่นหัวใจแล้วบอกว่าเส้นเลือดหัวใจเริ่มตีบ","best":400,"std":25}
  ];
  KI.data.decisions.push(...groups.map((g) => ({
    "id":"ill-warn-" + g.id,"title":g.title,"body":g.body,"urgent":true,"major":true,"cooldown":3,
    "when":{"flag":{"illWarn":g.id},"noFlag":["illCare"]},
    "choices":[
      {"id":"best","label":"รักษากับโรงพยาบาลเอกชนชั้นนำทันที","text":"หมอเฉพาะทางวางแผนรักษาครบทุกขั้นตอน ตรวจติดตามใกล้ชิด ค่าใช้จ่ายสูงแต่โอกาสหายดีที่สุด","when":rich,"effects":[{"money":-g.best,"unit":"wageDay"},{"flag":"illCare","v":"best"},{"stat":"health","d":-4},{"cond":"sick","turns":2},{"pin":"เข้ารับการรักษาอย่างเต็มที่"}]},
      {"id":"standard","label":"รักษาตามสิทธิ์ที่โรงพยาบาลรัฐ","text":"ต้องรอคิวนานหน่อย แต่ได้รักษาตามมาตรฐาน หมอนัดติดตามอาการต่อเนื่อง","effects":[{"money":-g.std,"unit":"wageDay"},{"flag":"illCare","v":"standard"},{"stat":"health","d":-6},{"cond":"sick","turns":4},{"pin":"เข้ารับการรักษาตามสิทธิ์"}]},
      {"id":"borrow","label":"กู้เงินไปรักษาโรงพยาบาลเอกชน","text":"ได้รักษาเร็ว แต่ต้องแบกหนี้ก้อนใหญ่ไปอีกหลายปี","when":notRich,"effects":[{"loan":{"kind":"medical","label":"ค่ารักษาพยาบาล","amountDays":g.best,"rate":0.02,"seasons":30}},{"money":-g.best,"unit":"wageDay"},{"flag":"illCare","v":"best"},{"stat":"health","d":-4},{"cond":"sick","turns":2},{"cond":"indebted","turns":8}]},
      {"id":"none","label":"ยังไม่อยากรักษา กินยาสมุนไพรไปก่อน","text":"อาการทรงตัวไปพักหนึ่ง แต่คนในบ้านกังวลทุกครั้งที่ได้ยินเสียงไอ","effects":[{"flag":"illCare","v":"none"},{"stat":"happy","d":-2}]}
    ]
  })));
  KI.data.personalEvents.push(
    {"id":"ill-recovered","title":"หมอบอกว่าหายดีแล้ว","body":"ผลตรวจติดตามครั้งล่าสุดไม่พบความผิดปกติแล้ว หมอให้มาตรวจปีละครั้งพอ ทั้งบ้านโล่งใจ","w":40,"cooldown":4,"when":{"any":[{"flag":{"illCare":"best"}},{"flag":{"illCare":"standard"}}],"chance":0.35},"effects":[{"flag":"illWarn","v":false},{"flag":"illCare","v":false},{"flag":"illSurvived"},{"uncond":"sick"},{"stat":"health","d":8},{"stat":"happy","d":5},{"pin":"หายจากโรคร้าย"}]},
    {"id":"ill-worse","title":"อาการแย่ลง","body":"อาการที่เคยเตือนไว้กลับมาหนักกว่าเดิม ต้องนอนโรงพยาบาลหลายวัน หมอถามอีกครั้งว่าจะรักษาจริงจังไหม","w":30,"cooldown":3,"when":{"flag":{"illCare":"none"},"chance":0.5},"effects":[{"flag":"illCare","v":false},{"stat":"health","d":-10},{"cond":"sick","turns":3}]}
  );
  KI.data.decisions.push(
    {"id":"rich-checkup","title":"ตรวจสุขภาพประจำปี","body":"อายุมากขึ้น ลูกหลานชวนไปตรวจสุขภาพแบบละเอียดที่โรงพยาบาลเอกชน ตรวจทั้งเลือด หัวใจ และสแกนร่างกาย","when":{"age":[45,90],"noFlag":["illWarn"],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"chance":0.25},"cooldown":4,
     "choices":[
      {"id":"full","label":"ตรวจละเอียดทุกอย่าง","text":"หมออธิบายผลทีละข้อ แนะนำเรื่องอาหารและการออกกำลังกาย รู้สึกมั่นใจในสุขภาพขึ้น","effects":[{"money":-25,"unit":"wageDay"},{"stat":"health","d":5},{"stat":"happy","d":1}]},
      {"id":"basic","label":"ตรวจพื้นฐานพอ","text":"ค่าใช้จ่ายไม่มาก ได้รู้ค่าความดันและน้ำตาลของตัวเอง","effects":[{"money":-5,"unit":"wageDay"},{"stat":"health","d":2}]},
      {"id":"skip","label":"ยังแข็งแรงดี ไม่ต้องตรวจ","text":"ลูกหลานบ่นเล็กน้อย แต่คุณยืนยันว่าร่างกายยังไหว","effects":[{"stat":"happy","d":1}]}
     ]}
  );
})();
