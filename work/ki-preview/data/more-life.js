globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const gate = {
    "care":{"flag":{"parentsAlive":true}},
    "parent-sick":{"flag":{"parentsAlive":true}},
    "fam-care-parents":{"flag":{"parentsAlive":true}},
    "fam-parent-pension":{"flag":{"motherAlive":true}},
    "money-parents-loan":{"flag":{"motherAlive":true}},
    "money-repay-parents":{"flag":{"parentsAlive":true}},
    "money-send-home":{"flag":{"motherAlive":true}},
    "sea-city-merit":{"flag":{"motherAlive":true}},
    "wr-30baht-2002":{"flag":{"motherAlive":true}},
    "fam-ordain-repay":{"flag":{"motherAlive":true}},
    "fam-ordained-blessing":{"flag":{"motherAlive":true}},
    "wr-saudi-visa-1990":{"flag":{"fatherAlive":true}},
    "remit-home":{"flag":{"parentsAlive":true}},
    "money-house-build":{"flag":{"parentsAlive":true}},
    "money-buy-gold":{"flag":{"motherAlive":true}},
    "fam-parents-to-bangkok":{"flag":{"parentsAlive":true}},
    "fam-parent-returns":{"flag":{"parentsAlive":true}},
    "fam-call-from-mom":{"flag":{"motherAlive":true,"grandparentsAlive":true}},
    "fam-money-order":{"flag":{"parentsAlive":true,"grandparentsAlive":true}},
    "fam-grand-morning":{"flag":{"grandparentsAlive":true}},
    "fam-grand-frail":{"flag":{"grandparentsAlive":true}},
    "sea-khao-chi-kid":{"flag":{"grandparentsAlive":true}},
    "bhv-grandma-sent":{"flag":{"grandparentsAlive":true}},
    "bhv-kid-trust":{"flag":{"grandparentsAlive":true}}
  };
  for (const list of [KI.data.decisions, KI.data.personalEvents, KI.data.focus]) for (const item of list) {
    const extra = gate[item.id];
    if (!extra) continue;
    const when = item.when || {};
    item.when = { ...when, ...extra, flag: { ...(when.flag || {}), ...(extra.flag || {}) } };
    if (!Object.keys(item.when.flag).length) delete item.when.flag;
  }
})();
Object.assign(KI.data.conditions, {
  "life2-premSelf": {"name":"เบี้ยประกันตัวเอง","icon":"🛡️","perTurn":[{"money":-3,"unit":"wageDay"}]},
  "life2-premParent": {"name":"เบี้ยประกันพ่อแม่","icon":"🛡️","perTurn":[{"money":-4,"unit":"wageDay"}]},
  "life2-premKids": {"name":"เบี้ยประกันลูก","icon":"🛡️","perTurn":[{"money":-2,"unit":"wageDay"}]},
  "life2-premSib": {"name":"เบี้ยประกันพี่น้อง","icon":"🛡️","perTurn":[{"money":-2,"unit":"wageDay"}]},
  "life2-mortgage": {"name":"ผ่อนบ้าน","icon":"🏠","perTurn":[{"money":-6,"unit":"wageDay"},{"stat":"happy","d":-1}]},
  "life2-rent": {"name":"ค่าเช่าบ้าน","icon":"🔑","perTurn":[{"money":-3,"unit":"wageDay"}]}
});
KI.data.decisions.push(...[
  {"id":"life2-monk-vassa","title":"เข้าพรรษา","body":"วันเข้าพรรษามาถึง พระทุกรูปอธิษฐานอยู่ประจำวัดสามเดือน ญาติโยมนำเทียนพรรษามาถวาย","when":{"role":"monk","season":1},"cooldown":2,
   "choices":[
    {"id":"strict","label":"อธิษฐานถือธุดงควัตรเคร่งตลอดพรรษา","text":"ฉันมื้อเดียว นั่งสมาธิทุกคืน ร่างกายเหนื่อยแต่ใจนิ่งขึ้น","effects":[{"inc":"life2-vassa"},{"stat":"health","d":-3},{"stat":"happy","d":4},{"trait":"grit","d":2}]},
    {"id":"study","label":"ใช้พรรษานี้ท่องหนังสือนักธรรม","text":"ตั้งใจเรียนกับพระอาจารย์ทุกบ่าย ความรู้เพิ่มขึ้น แต่ไม่ค่อยได้ไปช่วยงานญาติโยม","effects":[{"inc":"life2-vassa"},{"stat":"know","d":6},{"stat":"bond","d":-2}]},
    {"id":"village","label":"ช่วยงานวัดและรับนิมนต์ตามปกติ","text":"ชาวบ้านคุ้นหน้า ปัจจัยที่ได้รับนำไปช่วยค่าไฟวัด","effects":[{"inc":"life2-vassa"},{"stat":"bond","d":4},{"money":3,"unit":"wageDay"}]}]},
  {"id":"life2-monk-naktham-tri","title":"สอบนักธรรมชั้นตรี","body":"สำนักเรียนประจำอำเภอเปิดสอบนักธรรมชั้นตรีปลายปี พระบวชใหม่หลายรูปสมัครสอบ","when":{"role":"monk","season":2,"noFlag":["life2-nakthamTri"]},"cooldown":3,
   "choices":[
    {"id":"exam","label":"เข้าสอบ","text":"นั่งเขียนกระทู้ธรรมจนมือล้า","effects":[{"stat":"know","d":3}],"roll":[{"p":0.65,"text":"สอบได้นักธรรมชั้นตรี พระอาจารย์ยิ้มชม","effects":[{"flag":"life2-nakthamTri"},{"cond":"proud","turns":2}]},{"p":0.35,"text":"สอบตก ต้องลองใหม่ปีหน้า","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"skip","label":"ปีนี้ยังไม่สอบ ขอปฏิบัติก่อน","text":"ใช้เวลานั่งสมาธิและช่วยงานวัดแทน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":1}]}]},
  {"id":"life2-monk-naktham-tho","title":"สอบนักธรรมชั้นโท","body":"ได้ชั้นตรีแล้ว พระอาจารย์ถามว่าปีนี้จะสอบชั้นโทต่อไหม","when":{"role":"monk","season":2,"flag":{"life2-nakthamTri":true},"noFlag":["life2-nakthamTho"]},"cooldown":3,
   "choices":[
    {"id":"exam","label":"สอบชั้นโท","text":"ท่องพุทธประวัติและวินัยดึกทุกคืน","effects":[{"stat":"know","d":4},{"stat":"health","d":-1}],"roll":[{"p":0.55,"text":"สอบได้นักธรรมชั้นโท","effects":[{"flag":"life2-nakthamTho"},{"cond":"proud","turns":2}]},{"p":0.45,"text":"ยังไม่ผ่าน ข้อสอบวินัยยากกว่าที่คิด","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"skip","label":"พักการเรียน ไปช่วยงานก่อสร้างวัด","text":"ได้ใกล้ชิดชาวบ้าน แต่ตำราก็ห่างมือ","effects":[{"stat":"bond","d":3},{"stat":"know","d":-1}]}]},
  {"id":"life2-monk-naktham-ek","title":"สอบนักธรรมชั้นเอก","body":"ชั้นเอกเป็นชั้นสูงสุดของนักธรรม ต้องเดินทางไปสอบที่สนามสอบในเมือง","when":{"role":"monk","season":2,"flag":{"life2-nakthamTho":true},"noFlag":["life2-nakthamEk"]},"cooldown":3,
   "choices":[
    {"id":"exam","label":"ไปสอบชั้นเอก","text":"ญาติโยมช่วยค่ารถไปสนามสอบ","effects":[{"stat":"know","d":5},{"money":-2,"unit":"wageDay"}],"roll":[{"p":0.45,"text":"สอบได้นักธรรมชั้นเอก ข่าวดีไปถึงหมู่บ้าน","effects":[{"flag":"life2-nakthamEk"},{"cond":"proud","turns":3},{"pin":"สอบได้นักธรรมชั้นเอก"}]},{"p":0.55,"text":"ยังไม่ผ่าน ต้องกลับมาท่องใหม่","effects":[{"stat":"happy","d":-4}]}]},
    {"id":"skip","label":"พอแค่ชั้นโท หันมาสอนพระเณร","text":"ความรู้ที่มีได้ส่งต่อให้รุ่นน้อง","effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]}]},
  {"id":"life2-monk-pali","title":"เรียนบาลี","body":"วัดในเมืองมีสำนักเรียนบาลี เปิดรับพระที่จบนักธรรมเอก ต้องย้ายไปจำพรรษาที่นั่นหลายปี","when":{"role":"monk","season":0,"flag":{"life2-nakthamEk":true},"noFlag":["life2-pali","life2-paliDeclined"]},
   "choices":[
    {"id":"go","label":"ไปเรียนบาลีในเมือง","text":"ห่างวัดบ้านเกิด ต้องท่องไวยากรณ์บาลีทุกวัน","effects":[{"stat":"know","d":8},{"stat":"bond","d":-4},{"cond":"homesick","turns":2}],"roll":[{"p":0.5,"text":"หลายปีต่อมาสอบได้เปรียญธรรม 3 ประโยค","effects":[{"flag":"life2-pali"},{"cond":"proud","turns":4},{"pin":"สอบได้เปรียญธรรม 3 ประโยค"}]},{"p":0.5,"text":"สอบไม่ผ่านหลายครั้ง สุดท้ายกลับวัดบ้านเกิด","effects":[{"flag":"life2-paliDeclined"},{"stat":"happy","d":-4}]}]},
    {"id":"stay","label":"อยู่วัดบ้านเกิดต่อ","text":"วัดบ้านเกิดขาดพระ ชาวบ้านดีใจที่ยังอยู่","effects":[{"flag":"life2-paliDeclined"},{"stat":"bond","d":4}]}]},
  {"id":"life2-monk-abbot","title":"ได้รับเลือกเป็นเจ้าอาวาส","body":"เจ้าอาวาสรูปเก่ามรณภาพ ชาวบ้านและคณะสงฆ์อำเภอเห็นว่าคุณบวชมานานพอจะดูแลวัด","when":{"role":"monk","counter":{"life2-vassa":[10,99]},"noFlag":["life2-abbot","life2-abbotDeclined"],"chance":0.4},
   "choices":[
    {"id":"accept","label":"รับตำแหน่งเจ้าอาวาส","text":"ภาระงานวัด บัญชีเงินบริจาค และพระเณรทุกรูปอยู่ในความดูแล","effects":[{"flag":"life2-abbot"},{"stat":"happy","d":3},{"stat":"health","d":-3},{"pin":"เป็นเจ้าอาวาสวัดประจำหมู่บ้าน"}]},
    {"id":"decline","label":"ขอปฏิเสธ ขอปฏิบัติอย่างเดียว","text":"ยกตำแหน่งให้รูปอื่น ได้ความสงบแต่บางคนผิดหวัง","effects":[{"flag":"life2-abbotDeclined"},{"stat":"happy","d":2},{"stat":"bond","d":-2}]}]},
  {"id":"life2-monk-dark-fallout","title":"เรื่องในวัดรั่วออกไป","body":"มีคนถ่ายรูปและเอาเรื่องที่คุณทำไปโพสต์ ชาวบ้านเริ่มซุบซิบ เจ้าคณะอำเภอเรียกไปสอบถาม","when":{"role":"monk","flag":{"life2-monkDark":true},"chance":0.35},"heavy":true,
   "choices":[
    {"id":"confess","label":"ยอมรับผิดและลาสิกขา","text":"ยอมรับต่อหน้าคณะสงฆ์ คืนเงินที่เอาไป แล้วสึกออกมาเงียบๆ","effects":[{"flag":"life2-monkDark","v":false},{"role":"jobless"},{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-8},{"stat":"bond","d":-6},{"pin":"ลาสิกขาหลังเรื่องฉาวในวัด"}]},
    {"id":"deny","label":"ปฏิเสธทุกข้อกล่าวหา","text":"บอกว่าเป็นข่าวปลอม","roll":[{"p":0.5,"text":"หลักฐานชัด ถูกให้สึกจากความเป็นพระ ตำรวจเรียกไปสอบปากคำและข่าวขึ้นเพจท้องถิ่น","effects":[{"flag":"life2-monkDark","v":false},{"role":"jobless"},{"money":-30,"unit":"wageDay"},{"stat":"happy","d":-12},{"stat":"bond","d":-10},{"cond":"indebted","turns":6},{"pin":"ถูกให้สึกจากความเป็นพระ"}]},{"p":0.5,"text":"เรื่องเงียบไปเอง แต่ชาวบ้านไม่ใส่บาตรกับคุณเหมือนเดิม","effects":[{"flag":"life2-monkDark","v":false},{"stat":"bond","d":-6},{"stat":"happy","d":-4}]}]}]},
  {"id":"life2-monk-disrobe","title":"คิดเรื่องลาสิกขา","body":"บวชมาได้ระยะหนึ่ง ทางบ้านถามข่าวว่าจะสึกเมื่อไหร่ ใจหนึ่งก็อยากอยู่ต่อในผ้าเหลือง","when":{"role":"monk","counter":{"life2-vassa":[1,99]}},"cooldown":7,
   "choices":[
    {"id":"stay","label":"อยู่ในผ้าเหลืองต่อ","text":"ตั้งใจปฏิบัติต่อไป ทางบ้านอนุโมทนา","effects":[{"stat":"happy","d":2},{"trait":"grit","d":1}]},
    {"id":"farm","label":"ลาสิกขา กลับไปทำนาที่บ้าน","text":"ทำพิธีลาสิกขาต่อหน้าพระอุปัชฌาย์ แล้วกลับไปจับจอบเสียม ร่างกายต้องปรับตัวใหม่","when":{"loc":"isan"},"effects":[{"role":"farmer"},{"stat":"bond","d":5},{"stat":"health","d":-2},{"stat":"happy","d":-1},{"pin":"ลาสิกขากลับมาทำนา"}]},
    {"id":"work","label":"ลาสิกขา ออกไปหางานทำ","text":"สึกออกมาด้วยมือเปล่า ต้องเริ่มหางานใหม่ แต่ได้ความรู้และวินัยติดตัวไป","effects":[{"role":"jobless"},{"stat":"know","d":2},{"stat":"happy","d":1},{"money":-3,"unit":"wageDay"},{"pin":"ลาสิกขาออกมาใช้ชีวิตฆราวาส"}]}]}
]);
KI.data.personalEvents.push(...[
  {"id":"life2-monk-alms","title":"บิณฑบาตยามเช้า","body":"ตีห้าเดินเท้าเปล่าออกจากวัด ยายๆ คุกเข่ารอใส่ข้าวเหนียวหน้าบ้าน","when":{"role":"monk"},"w":14,"cooldown":4,
   "choices":[
    {"id":"long","label":"เดินสายยาวไปถึงหมู่บ้านท้ายทุ่ง","text":"ได้โปรดคนแก่ที่เดินมาวัดไม่ไหว แต่กลับวัดสายและเท้าพอง","effects":[{"stat":"bond","d":4},{"stat":"health","d":-1}]},
    {"id":"short","label":"เดินสายสั้นแล้วกลับมาเตรียมสอน","text":"มีเวลาเตรียมบทเรียนให้สามเณร","effects":[{"stat":"know","d":2},{"stat":"bond","d":1}]}]},
  {"id":"life2-monk-chant","title":"ทำวัตรเช้าเย็น","body":"เสียงระฆังดังตอนตีสี่ พระเณรมานั่งเรียงในศาลาเพื่อทำวัตรสวดมนต์","when":{"role":"monk"},"w":10,"cooldown":5,
   "choices":[
    {"id":"lead","label":"รับหน้าที่นำสวด","text":"ต้องจำบทสวดยาวให้แม่น เสียงแหบไปหลายวัน","effects":[{"stat":"know","d":3},{"stat":"health","d":-1},{"cond":"proud","turns":1}]},
    {"id":"sit","label":"สวดตามและนั่งสมาธิต่อ","text":"ใจสงบลงในความเงียบหลังสวดมนต์","effects":[{"stat":"happy","d":3}]}]},
  {"id":"life2-monk-sermon","title":"นิมนต์ไปเทศน์","body":"หมู่บ้านข้างเคียงนิมนต์ไปแสดงธรรมในงานบุญประจำปี","when":{"role":"monk"},"w":8,"cooldown":6,
   "choices":[
    {"id":"simple","label":"เทศน์ภาษาอีสานง่ายๆ ยกนิทานชาวบ้าน","text":"ญาติโยมหัวเราะและพยักหน้า หลายคนเข้ามาขอบคุณ","effects":[{"stat":"bond","d":4},{"money":2,"unit":"wageDay"}]},
    {"id":"text","label":"เทศน์ตามคัมภีร์อย่างเคร่งครัด","text":"ผู้เฒ่าชมว่าถูกต้อง แต่เด็กๆ หลับกลางศาลา","effects":[{"stat":"know","d":3},{"stat":"bond","d":1}]},
    {"id":"decline","label":"ขอให้รูปอื่นไปแทน","text":"ได้พักและอยู่ปฏิบัติที่วัด","effects":[{"stat":"health","d":2},{"stat":"bond","d":-2}]}]},
  {"id":"life2-monk-funeral","title":"สวดอภิธรรมงานศพ","body":"ผู้เฒ่าในหมู่บ้านเสียชีวิต ญาตินิมนต์ไปสวดอภิธรรมสามคืน","when":{"role":"monk"},"w":9,"cooldown":5,
   "choices":[
    {"id":"all","label":"ไปสวดครบทุกคืนและช่วยปลอบญาติ","text":"ลูกหลานผู้ตายเข้ามากราบขอบคุณ แต่นอนน้อยหลายคืน","effects":[{"stat":"bond","d":5},{"stat":"health","d":-2},{"money":2,"unit":"wageDay"}]},
    {"id":"one","label":"ไปเฉพาะคืนสุดท้ายกับวันเผา","text":"ได้รักษาเวลาปฏิบัติ ญาติบางคนน้อยใจเล็กน้อย","effects":[{"stat":"bond","d":1},{"stat":"happy","d":1}]}]},
  {"id":"life2-monk-newhouse","title":"ทำบุญขึ้นบ้านใหม่","body":"ครอบครัวหนึ่งเพิ่งสร้างบ้านเสร็จ นิมนต์ไปสวดเจริญพุทธมนต์และผูกแขน","when":{"role":"monk"},"w":7,"cooldown":6,
   "choices":[
    {"id":"go","label":"รับนิมนต์","text":"ได้ร่วมยินดีกับเจ้าของบ้าน ได้ปัจจัยมาช่วยค่าน้ำค่าไฟวัด","effects":[{"stat":"bond","d":3},{"money":3,"unit":"wageDay"}]},
    {"id":"novice","label":"ส่งสามเณรไปฝึกสวดแทน","text":"สามเณรตื่นเต้นได้ออกงาน แต่เจ้าภาพอยากได้พระผู้ใหญ่","effects":[{"stat":"know","d":1},{"stat":"bond","d":-1}]}]},
  {"id":"life2-monk-novices","title":"บวชเณรภาคฤดูร้อน","body":"ปิดเทอมหน้าแล้ง เด็กในหมู่บ้านยี่สิบกว่าคนมาบวชเณรที่วัด ต้องมีพระคอยสอน","when":{"role":"monk","season":0},"w":10,"cooldown":3,
   "choices":[
    {"id":"teach","label":"รับเป็นพระพี่เลี้ยง","text":"สอนสวดมนต์ พาเก็บกวาดลานวัด เด็กซนแต่น่ารัก","effects":[{"stat":"bond","d":5},{"stat":"happy","d":2},{"stat":"health","d":-2}]},
    {"id":"strict","label":"สอนเข้มงวด ให้ท่องบทสวดให้ได้","text":"เณรบางรูปท่องได้จริง บางรูปร้องไห้อยากกลับบ้าน","effects":[{"stat":"know","d":2},{"stat":"bond","d":1}]},
    {"id":"pass","label":"ให้รูปอื่นดูแล","text":"มีเวลาอ่านตำรา แต่ไม่ได้ใกล้ชิดเด็กรุ่นใหม่","effects":[{"stat":"know","d":2},{"stat":"bond","d":-1}]}]},
  {"id":"life2-monk-build","title":"ซ่อมศาลาการเปรียญ","body":"หลังคาศาลาไม้รั่วทุกหน้าฝน กรรมการวัดอยากทอดผ้าป่าหาเงินซ่อม","when":{"role":"monk"},"w":7,"cooldown":9,
   "choices":[
    {"id":"labor","label":"ลงมือซ่อมเองกับชาวบ้าน","text":"ประหยัดค่าช่าง แต่ปีนขึ้นหลังคาทั้งวัน","effects":[{"stat":"bond","d":4},{"stat":"health","d":-3},{"die":"accident","p":0.003}]},
    {"id":"phapa","label":"จัดทอดผ้าป่าสามัคคี","text":"ลูกหลานจากกรุงเทพฯ โอนเงินมาร่วม ได้ศาลาใหม่ทั้งหลัง","effects":[{"stat":"bond","d":3},{"stat":"happy","d":3}]},
    {"id":"wait","label":"ยังไม่ซ่อม ชาวบ้านกำลังลำบาก","text":"ไม่เป็นภาระชาวบ้าน แต่ศาลาทรุดลงอีก","effects":[{"stat":"happy","d":-2},{"stat":"bond","d":1}]}]},
  {"id":"life2-monk-dhutanga","title":"ออกธุดงค์","body":"หน้าแล้งพระอาจารย์ชวนออกธุดงค์เข้าป่าบนภู ปักกลดนอนกลางป่าหลายสัปดาห์","when":{"role":"monk","season":0},"w":6,"cooldown":6,
   "choices":[
    {"id":"go","label":"ออกธุดงค์","text":"กลางคืนเงียบจนได้ยินเสียงหัวใจ กลับมาผอมลงแต่ใจมั่นคง","effects":[{"stat":"happy","d":5},{"stat":"health","d":-3},{"trait":"grit","d":2},{"cond":"lonely","turns":1}]},
    {"id":"stay","label":"อยู่เฝ้าวัด","text":"วัดมีพระน้อย ชาวบ้านอุ่นใจที่ยังมีพระอยู่","effects":[{"stat":"bond","d":3}]}]},
  {"id":"life2-monk-phawet","title":"บุญผะเหวดฝั่งพระ","body":"งานบุญเดือนสี่ ต้องเทศน์มหาชาติสิบสามกัณฑ์ให้จบในวันเดียว","when":{"role":"monk","season":0},"w":8,"cooldown":3,
   "choices":[
    {"id":"kan","label":"รับเทศน์กัณฑ์ยาว","text":"เทศน์ทำนองอีสานจนเสียงแหบ ญาติโยมแห่กัณฑ์หลอนมาถวาย","effects":[{"stat":"bond","d":5},{"stat":"health","d":-2},{"money":3,"unit":"wageDay"}]},
    {"id":"organize","label":"ช่วยจัดงานหลังบ้าน","text":"ดูแลโรงทานและพระอาคันตุกะ งานราบรื่นแต่เหนื่อย","effects":[{"stat":"bond","d":3},{"stat":"happy","d":1}]}]},
  {"id":"life2-monk-kathin","title":"งานกฐิน","body":"ออกพรรษาแล้ว คณะกฐินจากกรุงเทพฯ จองกฐินวัดบ้านเกิด","when":{"role":"monk","season":2},"w":9,"cooldown":3,
   "choices":[
    {"id":"receive","label":"รับผ้ากฐินแทนสงฆ์","text":"เป็นเกียรติ ได้ทักทายลูกหลานที่จากบ้านไปทำงาน","effects":[{"stat":"bond","d":4},{"cond":"proud","turns":1}]},
    {"id":"account","label":"ช่วยกรรมการทำบัญชีเงินกฐิน","text":"ทุกบาทมีที่ไปชัดเจน ชาวบ้านเชื่อใจวัดมากขึ้น","effects":[{"stat":"bond","d":3},{"inc":"responsible"}]}]},
  {"id":"life2-monk-lotto","title":"ชาวบ้านขอเลข","body":"ใกล้วันหวยออก ชาวบ้านมานั่งหน้ากุฏิ ขอให้บอกเลขเด็ด","when":{"role":"monk"},"w":7,"cooldown":6,
   "choices":[
    {"id":"teach","label":"ปฏิเสธนุ่มนวล ชวนคุยเรื่องเก็บออม","text":"บางคนผิดหวังกลับไป บางคนเลิกซื้อหวยเกินตัว","effects":[{"stat":"bond","d":-1},{"stat":"happy","d":1},{"inc":"responsible"}]},
    {"id":"vague","label":"พูดกว้างๆ ให้ไปตีความเอง","text":"บังเอิญเลขออกตรง ชาวบ้านมาเต็มวัด จนไม่มีเวลาปฏิบัติ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-2}]}]},
  {"id":"life2-monk-health","title":"ตรวจสุขภาพพระ","body":"โรงพยาบาลอำเภอจัดตรวจสุขภาพพระสงฆ์ หมอบอกว่าน้ำตาลและไขมันเริ่มสูงจากอาหารหวานมัน","when":{"role":"monk","age":[35,99]},"w":6,"cooldown":9,
   "choices":[
    {"id":"diet","label":"เลือกฉันแต่พอดี งดน้ำหวาน","text":"ปฏิเสธของหวานที่ญาติโยมถวาย บางคนเกรงใจ แต่ผลเลือดดีขึ้น","effects":[{"stat":"health","d":5},{"stat":"bond","d":-1}]},
    {"id":"ignore","label":"ฉันตามที่ญาติโยมถวาย","text":"ไม่อยากให้ใครเสียศรัทธา แต่ความดันสูงขึ้นเรื่อยๆ","effects":[{"stat":"health","d":-4},{"stat":"bond","d":2}],"roll":[{"p":0.2,"text":"หลายปีต่อมาหมอยืนยันว่าเป็นเบาหวาน","effects":[{"cond":"sick","turns":6}]}]}]},
  {"id":"life2-monk-bangfai","title":"บุญบั้งไฟ","body":"หมู่บ้านจะจุดบั้งไฟขอฝน วัดเป็นที่ตั้งขบวนและเก็บบั้งไฟ","when":{"role":"monk","season":1},"w":6,"cooldown":3,
   "choices":[
    {"id":"bless","label":"ให้พรและช่วยดูความปลอดภัย","text":"ขอให้ชาวบ้านตั้งฐานจุดห่างบ้านเรือน งานผ่านไปไม่มีใครเจ็บ","effects":[{"stat":"bond","d":3},{"inc":"responsible"}]},
    {"id":"away","label":"อยู่ในกุฏิ ไม่ยุ่งงานรื่นเริง","text":"สงบดี แต่ชาวบ้านบางคนว่าพระไม่สนใจงานบ้าน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":-1}]}]},
  {"id":"life2-monk-counsel","title":"ญาติโยมมาปรึกษา","body":"แม่ลูกอ่อนคนหนึ่งมานั่งร้องไห้ เล่าว่าสามีไปทำงานต่างแดนแล้วติดต่อไม่ได้","when":{"role":"monk"},"w":7,"cooldown":6,
   "choices":[
    {"id":"listen","label":"นั่งฟังและให้ธรรมะปลอบใจ","text":"เธอกลับไปด้วยสีหน้าเบาลง","effects":[{"stat":"bond","d":3},{"stat":"happy","d":1}]},
    {"id":"connect","label":"ช่วยประสานผู้ใหญ่บ้านและหน่วยงาน","text":"ใช้เวลาหลายวัน แต่ได้ข่าวสามีกลับมาจริง","effects":[{"stat":"bond","d":5},{"stat":"health","d":-1},{"inc":"responsible"}]}]},
  {"id":"life2-monk-abbot-duty","title":"เงินบำรุงวัด","body":"ในฐานะเจ้าอาวาส กรรมการวัดถกกันว่าจะเอาเงินบริจาคไปสร้างซุ้มประตูใหญ่ หรือทำทุนการศึกษาให้เด็ก","when":{"role":"monk","flag":{"life2-abbot":true}},"w":8,"cooldown":9,
   "choices":[
    {"id":"gate","label":"สร้างซุ้มประตูให้สมเกียรติวัด","text":"ซุ้มสวยงาม คนผ่านไปมาถ่ายรูป แต่เงินหมดคลัง","effects":[{"stat":"happy","d":3},{"stat":"bond","d":1}]},
    {"id":"scholar","label":"ตั้งทุนการศึกษาให้เด็กยากจน","text":"เด็กหลายคนได้เรียนต่อ บางคนในกรรมการไม่พอใจ","effects":[{"stat":"bond","d":3},{"inc":"responsible"},{"cond":"proud","turns":2}]},
    {"id":"vote","label":"ให้ชาวบ้านลงมติเอง","text":"ใช้เวลานาน แต่ไม่มีใครกล่าวหาว่าวัดใช้เงินตามใจ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]}]},
  {"id":"life2-monk-amulet","title":"ข้อเสนอทำเหรียญขาย","body":"นายหน้าพระเครื่องจากในเมืองมาชวนปลุกเสกเหรียญรุ่นแรกออกขาย บอกว่าแบ่งกำไรให้ส่วนตัวได้ก้อนใหญ่","when":{"role":"monk","any":[{"counter":{"vice":[3,99]}},{"counter":{"naughty":[4,99]}}],"noFlag":["life2-monkDark"],"chance":0.12},"w":6,"cooldown":12,
   "choices":[
    {"id":"refuse","label":"ปฏิเสธ ไล่นายหน้ากลับไป","text":"ใจหนึ่งเสียดายเงิน แต่รักษาผ้าเหลืองไว้ได้","effects":[{"stat":"happy","d":2},{"inc":"vice","d":-1},{"trait":"grit","d":1}]},
    {"id":"temple","label":"ทำเหรียญ แต่เงินทั้งหมดเข้าวัด","text":"ได้เงินสร้างกุฏิ แต่คนเริ่มมองว่าวัดเป็นตลาด","effects":[{"stat":"bond","d":-1},{"stat":"happy","d":1}]},
    {"id":"profit","label":"รับข้อเสนอ แอบเก็บส่วนแบ่งไว้เอง","text":"เงินก้อนเข้ามาในบัญชีที่ไม่มีใครรู้","effects":[{"money":40,"unit":"wageDay"},{"flag":"life2-monkDark"},{"inc":"vice"},{"stat":"happy","d":-2}],"roll":[{"p":0.2,"text":"ลูกศิษย์คนหนึ่งเห็นและร้องเรียนทันที ถูกเจ้าคณะให้สึก","effects":[{"flag":"life2-monkDark","v":false},{"role":"jobless"},{"money":-40,"unit":"wageDay"},{"stat":"bond","d":-8},{"pin":"ถูกให้สึกเพราะหากำไรจากวัตถุมงคล"}]}]}]},
  {"id":"life2-monk-pocket","title":"เงินในตู้บริจาค","body":"หลังงานบุญ เงินในตู้บริจาคล้นมือ ไม่มีใครนับก่อนคุณ","when":{"role":"monk","any":[{"counter":{"vice":[3,99]}},{"counter":{"naughty":[4,99]}}],"noFlag":["life2-monkDark"],"chance":0.1},"w":6,"cooldown":12,
   "choices":[
    {"id":"honest","label":"เรียกกรรมการมานับต่อหน้า","text":"ทุกอย่างโปร่งใส ใจเบาสบาย","effects":[{"stat":"happy","d":2},{"inc":"responsible"},{"inc":"vice","d":-1}]},
    {"id":"take","label":"หยิบไว้บางส่วน คิดว่าไม่มีใครรู้","text":"เงินก้อนเล็กเข้ากระเป๋า แต่คืนนั้นนอนไม่หลับ","effects":[{"money":15,"unit":"wageDay"},{"flag":"life2-monkDark"},{"inc":"vice"},{"stat":"happy","d":-3}]}]},
  {"id":"life2-monk-drink","title":"เพื่อนเก่าชวนดื่ม","body":"เพื่อนกลุ่มเดิมสมัยเกเรมาหาที่วัดตอนค่ำ แอบถือขวดเหล้ามาด้วย ชวนให้จิบเป็นเพื่อน","when":{"role":"monk","any":[{"counter":{"vice":[3,99]}},{"counter":{"naughty":[4,99]}}],"noFlag":["life2-monkDark"],"chance":0.1},"w":6,"cooldown":12,
   "choices":[
    {"id":"refuse","label":"ปฏิเสธ และขอให้เพื่อนกลับไป","text":"เพื่อนหัวเราะเยาะ แต่ไม่นานก็เลิกมาหา","effects":[{"stat":"happy","d":1},{"inc":"vice","d":-1},{"trait":"grit","d":1}]},
    {"id":"talk","label":"ไม่ดื่ม แต่นั่งคุยเตือนสติเพื่อน","text":"เพื่อนคนหนึ่งเริ่มลดเหล้า อีกคนหาว่าสอนเกินหน้าที่","effects":[{"stat":"bond","d":2}]},
    {"id":"drink","label":"ดื่มด้วยแก้วสองแก้ว","text":"ผิดศีลข้อใหญ่ของพระ เช้าวันรุ่งขึ้นละอายจนไม่กล้าออกบิณฑบาต","effects":[{"flag":"life2-monkDark"},{"inc":"vice"},{"stat":"happy","d":-5},{"stat":"health","d":-2}],"roll":[{"p":0.25,"text":"มีคนถ่ายคลิปไว้ เจ้าอาวาสสั่งให้สึกทันที","effects":[{"flag":"life2-monkDark","v":false},{"role":"jobless"},{"stat":"bond","d":-8},{"pin":"ถูกให้สึกเพราะผิดศีล"}]}]}]},
  {"id":"life2-monk-meditate","title":"คืนนั่งสมาธิ","body":"คืนเดือนหงาย ลมพัดผ่านต้นโพธิ์หลังโบสถ์ ใจคิดถึงชีวิตก่อนบวช","when":{"role":"monk"},"w":8,"cooldown":5,
   "choices":[
    {"id":"sit","label":"นั่งสมาธิจนรุ่งเช้า","text":"ความคิดเก่าๆ ค่อยๆ วางลง","effects":[{"stat":"happy","d":4},{"stat":"health","d":-1}]},
    {"id":"letter","label":"เขียนจดหมายถึงคนที่เคยทำร้ายใจ","text":"เขียนแล้วไม่ได้ส่ง แต่ใจเบาลง","effects":[{"stat":"happy","d":2},{"trait":"attach","d":-2}]}]},
  {"id":"life2-house-crowded","title":"บ้านเริ่มแคบ","body":"อยู่บ้านพ่อแม่หลังแต่ง ลูกโตขึ้น ห้องนอนไม่พอ ข้าวของวางเต็มชาน","when":{"flag":{"life2-liveParents":true,"child":true},"noFlag":["movedOut"]},"w":8,"cooldown":12,
   "choices":[
    {"id":"extend","label":"ต่อเติมห้องข้างบ้าน","text":"ได้ห้องเพิ่ม เงินเก็บหายไปก้อนหนึ่ง","effects":[{"money":-40,"unit":"wageDay"},{"stat":"happy","d":3}]},
    {"id":"move","label":"แยกไปปลูกบ้านหลังเล็กในที่ดินของครอบครัว","text":"ยังเดินไปหาพ่อแม่ได้ทุกเย็น แต่ค่าวัสดุสูง","effects":[{"money":-90,"unit":"wageDay"},{"flag":"movedOut"},{"flag":"life2-liveParents","v":false},{"flag":"life2-ownHouse"},{"stat":"happy","d":4}]},
    {"id":"bear","label":"อยู่กันแบบนี้ไปก่อน","text":"ประหยัดเงิน แต่ทะเลาะกันเรื่องเล็กน้อยบ่อยขึ้น","effects":[{"stat":"happy","d":-3},{"stat":"bond","d":1}]}]},
  {"id":"life2-house-inlaws","title":"อยู่บ้านพ่อตาแม่ยาย","body":"ย้ายมาอยู่กับครอบครัวคู่ครอง พ่อตาแม่ยายคาดหวังให้ช่วยงานนาเต็มที่","when":{"flag":{"life2-liveInlaws":true}},"w":7,"cooldown":12,
   "choices":[
    {"id":"work","label":"ก้มหน้าช่วยงานทุกอย่าง","text":"ผู้ใหญ่เริ่มยอมรับ แต่เหนื่อยและคิดถึงบ้านตัวเอง","effects":[{"stat":"bond","d":4},{"stat":"health","d":-2},{"cond":"homesick","turns":1}]},
    {"id":"talk","label":"คุยกับคู่ครองขอแบ่งเวลาให้ครอบครัวตัวเอง","text":"เข้าใจกันมากขึ้น แต่แม่ยายแอบน้อยใจ","effects":[{"stat":"happy","d":2},{"stat":"bond","d":-1}]},
    {"id":"leave","label":"ชวนคู่ครองแยกไปเช่าบ้านในเมือง","text":"ได้ความเป็นส่วนตัว แต่มีค่าเช่าทุกเดือน","effects":[{"flag":"life2-liveInlaws","v":false},{"cond":"life2-rent","turns":24},{"stat":"happy","d":3},{"stat":"bond","d":-3}]}]},
  {"id":"life2-house-callback","title":"พ่อแม่ขอให้กลับมาอยู่ด้วย","body":"พ่อแม่อายุมากขึ้น โทรมาบอกว่าบ้านเงียบ อยากให้ลูกหลานกลับมาอยู่บ้านหลังเดิม","when":{"flag":{"movedOut":true,"parentsAlive":true},"age":[35,65]},"w":6,"cooldown":15,
   "choices":[
    {"id":"back","label":"ย้ายกลับไปอยู่บ้านพ่อแม่","text":"ได้ดูแลพ่อแม่ใกล้ชิด แต่ต้องปรับตัวกับกติกาบ้านเดิม","effects":[{"flag":"movedOut","v":false},{"flag":"life2-liveParents"},{"stat":"bond","d":6},{"stat":"happy","d":-1}]},
    {"id":"visit","label":"อยู่บ้านตัวเอง แต่กลับไปเยี่ยมทุกสัปดาห์","text":"เหนื่อยเดินทาง แต่พ่อแม่ก็พอใจ","effects":[{"stat":"bond","d":3},{"money":-3,"unit":"wageDay"}]},
    {"id":"no","label":"บอกว่ายังย้ายไม่ได้","text":"พ่อแม่เข้าใจ แต่เสียงฟังดูเหงา","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":-1,"by":"attach"}]}]},
  {"id":"life2-house-sell","title":"ขายบ้าน","body":"เงินขาดมือหลายเดือน มีคนมาถามซื้อบ้านที่คุณเป็นเจ้าของ","when":{"flag":{"life2-ownHouse":true},"money":[-999999999,2000]},"w":10,"cooldown":8,
   "choices":[
    {"id":"sell","label":"ขายบ้าน ปลดหนี้","text":"ได้เงินก้อนมาปลดหนี้ แต่ต้องกลับไปอยู่บ้านพ่อแม่หรือเช่าห้อง","effects":[{"money":200,"unit":"wageDay"},{"flag":"life2-ownHouse","v":false},{"uncond":"life2-mortgage"},{"uncond":"indebted"},{"stat":"happy","d":-6,"by":"attach"},{"pin":"ขายบ้านของตัวเอง"}]},
    {"id":"keep","label":"กัดฟันเก็บบ้านไว้","text":"บ้านยังอยู่ แต่ต้องกู้เงินมาประคองไปก่อน","effects":[{"cond":"indebted","turns":6},{"stat":"happy","d":-2}]}]},
  {"id":"life2-house-buy-later","title":"บ้านจัดสรรเปิดใหม่","body":"โครงการทาวน์เฮาส์ในเมืองเปิดจอง ดาวน์ต่ำ ผ่อนนาน เพื่อนร่วมงานหลายคนจองแล้ว","when":{"flag":{"married":true},"noFlag":["life2-ownHouse"],"year":[1990,2026],"age":[25,55]},"w":5,"cooldown":15,
   "choices":[
    {"id":"cash","label":"ซื้อเงินสด","text":"ได้บ้านเป็นของตัวเองทันที ไม่มีหนี้","when":{"money":[200000,999999999]},"effects":[{"money":-500,"unit":"wageDay"},{"flag":"life2-ownHouse"},{"flag":"movedOut"},{"flag":"life2-liveParents","v":false},{"flag":"life2-liveInlaws","v":false},{"stat":"happy","d":6},{"pin":"ซื้อบ้านในเมือง"}]},
    {"id":"loan","label":"วางดาวน์ แล้วกู้ธนาคาร","text":"ได้บ้านแต่ผ่อนยาวหลายปี","when":{"money":[30000,999999999]},"effects":[{"money":-80,"unit":"wageDay"},{"cond":"life2-mortgage","turns":45},{"flag":"life2-ownHouse"},{"flag":"movedOut"},{"flag":"life2-liveParents","v":false},{"flag":"life2-liveInlaws","v":false},{"stat":"happy","d":4},{"pin":"กู้ซื้อบ้านในเมือง"}]},
    {"id":"no","label":"อยู่แบบเดิมไปก่อน","text":"ไม่มีภาระผ่อน แต่ยังไม่มีบ้านของตัวเอง","effects":[{"stat":"happy","d":-1}]}]},
  {"id":"life2-status-rich-town","title":"ย้ายเข้าเมืองดีไหม","body":"ช่วงนี้ฐานะดีขึ้นมาก ญาติชวนให้ซื้อบ้านในตัวจังหวัด ลูกจะได้เรียนโรงเรียนดีๆ","when":{"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"setting":"rural","age":[25,65],"noFlag":["life2-ownHouse"]},"w":8,"cooldown":15,
   "choices":[
    {"id":"move","label":"ซื้อบ้านในเมือง","text":"สะดวกสบายขึ้น แต่ห่างเพื่อนบ้านและทุ่งนาที่คุ้นเคย","effects":[{"money":-400,"unit":"wageDay"},{"flag":"life2-ownHouse"},{"flag":"movedOut"},{"stat":"happy","d":3},{"stat":"bond","d":-2},{"cond":"homesick","turns":2}]},
    {"id":"stay","label":"อยู่บ้านนาต่อ ปรับปรุงบ้านเดิม","text":"ใช้เงินน้อยกว่า ชีวิตเรียบง่ายเหมือนเดิม","effects":[{"money":-60,"unit":"wageDay"},{"stat":"happy","d":2},{"stat":"bond","d":2}]}]},
  {"id":"life2-status-rich-land","title":"มีคนมาเสนอขายที่นา","body":"เพื่อนบ้านติดหนี้ จะขายที่นาติดกัน มาถามคุณก่อนเพราะรู้ว่าช่วงนี้มีเงิน","when":{"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"loc":"isan","age":[25,70]},"w":7,"cooldown":12,
   "choices":[
    {"id":"buy","label":"ซื้อในราคาที่เขาขอ","text":"ได้ที่ดินเพิ่ม เพื่อนบ้านได้ปลดหนี้","effects":[{"money":-150,"unit":"wageDay"},{"flag":"life2-land"},{"stat":"bond","d":2}]},
    {"id":"cheap","label":"ต่อราคาลงเพราะเขาร้อนเงิน","text":"ได้ที่ราคาถูก แต่ชาวบ้านมองว่าซ้ำเติมคนลำบาก","effects":[{"money":-100,"unit":"wageDay"},{"flag":"life2-land"},{"stat":"bond","d":-4}]},
    {"id":"no","label":"ไม่ซื้อ","text":"เก็บเงินไว้ เพื่อนบ้านไปขายนายทุนจากในเมืองแทน","effects":[{"stat":"bond","d":-1}]}]},
  {"id":"life2-status-rich-lend","title":"ญาติมาขอยืมเงิน","body":"ข่าวว่าคุณมีฐานะไปถึงญาติห่างๆ หลายคนมาขอยืมเงินไปลงทุนและใช้หนี้","when":{"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"age":[25,75]},"w":8,"cooldown":9,
   "choices":[
    {"id":"lend","label":"ให้ยืมทุกคน","text":"ญาติรักใคร่ แต่เงินที่ให้ยืมไม่รู้จะได้คืนเมื่อไหร่","effects":[{"money":-60,"unit":"wageDay"},{"stat":"bond","d":4}],"roll":[{"p":0.4,"text":"ได้คืนครบพร้อมของฝาก","effects":[{"money":50,"unit":"wageDay"}]}]},
    {"id":"some","label":"ให้เฉพาะคนที่จำเป็นจริง","text":"บางคนน้อยใจที่ไม่ได้","effects":[{"money":-20,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"none","label":"ปฏิเสธทั้งหมด","text":"เงินอยู่ครบ แต่ได้ยินคนนินทาว่ารวยแล้วลืมญาติ","effects":[{"stat":"bond","d":-4}]}]},
  {"id":"life2-status-rich-donate","title":"ขอเป็นเจ้าภาพงานบุญ","body":"กรรมการวัดมาขอให้เป็นเจ้าภาพสร้างโบสถ์หลังใหม่ ชื่อจะสลักไว้บนแผ่นป้าย","when":{"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"age":[30,80],"noFlag":["life2-bigDonor"]},"w":6,
   "choices":[
    {"id":"full","label":"รับเป็นเจ้าภาพใหญ่","text":"ชาวบ้านนับถือ ใจอิ่มบุญ แต่เงินเก็บลดลงมาก","effects":[{"money":-120,"unit":"wageDay"},{"flag":"life2-bigDonor"},{"stat":"happy","d":5},{"stat":"bond","d":4},{"pin":"เป็นเจ้าภาพสร้างโบสถ์"}]},
    {"id":"part","label":"ร่วมทำบุญตามกำลัง","text":"ทำบุญพอดีตัว ไม่เดือดร้อน","effects":[{"money":-20,"unit":"wageDay"},{"stat":"happy","d":2}]}]},
  {"id":"life2-status-poor-sell","title":"ขายของเก่าประทังชีวิต","body":"ฐานะตกลงจนต้องเลือกว่าจะขายอะไรออกไปก่อน","when":{"flag":{"status":"poor"},"age":[20,80]},"w":8,"cooldown":9,
   "choices":[
    {"id":"bike","label":"ขายมอเตอร์ไซค์","text":"ได้เงินมาใช้หนี้ แต่ต้องเดินหรือโบกรถไปทำงาน","effects":[{"money":20,"unit":"wageDay"},{"stat":"happy","d":-3}]},
    {"id":"gold","label":"เอาทองไปจำนำ","text":"ได้เงินด่วน หวังว่าจะไถ่คืนทัน","effects":[{"money":15,"unit":"wageDay"},{"cond":"indebted","turns":4}]},
    {"id":"none","label":"ไม่ขาย ประหยัดทุกทาง","text":"กินข้าวกับน้ำพริกหลายเดือน ร่างกายโทรมลง","effects":[{"stat":"health","d":-3},{"stat":"happy","d":-2},{"trait":"grit","d":1}]}]},
  {"id":"life2-status-poor-help","title":"ญาติยื่นมือช่วย","body":"พี่น้องรู้ว่าช่วงนี้ลำบาก นัดกันลงขันช่วยค่ากินอยู่","when":{"flag":{"status":"poor","hasSiblings":true},"age":[20,80]},"w":7,"cooldown":12,
   "choices":[
    {"id":"accept","label":"รับไว้ด้วยความขอบคุณ","text":"ผ่านช่วงยากไปได้ แต่รู้สึกติดค้างน้ำใจ","effects":[{"money":15,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"happy","d":-1}]},
    {"id":"work","label":"ขอให้ช่วยหางานแทนเงิน","text":"ได้งานรับจ้างเพิ่ม เหนื่อยแต่ภูมิใจ","effects":[{"money":8,"unit":"wageDay"},{"stat":"health","d":-2},{"cond":"proud","turns":1}]}]},
  {"id":"life2-status-poor-kids","title":"ค่าเทอมลูก","body":"ฐานะตกลงจนค่าเทอมและค่ารถโรงเรียนของลูกเริ่มจ่ายไม่ไหว","when":{"flag":{"status":"poor","child":true},"childAge":[7,18]},"w":7,"cooldown":12,
   "choices":[
    {"id":"loan","label":"กู้นอกระบบมาจ่าย","text":"ลูกได้เรียนต่อ แต่ดอกเบี้ยท่วมหัว","effects":[{"cond":"indebted","turns":8},{"stat":"happy","d":-2}]},
    {"id":"cheap","label":"ย้ายลูกไปโรงเรียนใกล้บ้าน","text":"ประหยัดค่ารถ ลูกเสียใจที่ต้องจากเพื่อน","effects":[{"money":5,"unit":"wageDay"},{"stat":"bond","d":-2}]},
    {"id":"extra","label":"รับงานกลางคืนเพิ่ม","text":"พอจ่ายได้ แต่แทบไม่ได้เจอหน้าลูก","effects":[{"money":10,"unit":"wageDay"},{"stat":"health","d":-3},{"stat":"bond","d":-1}]}]},
  {"id":"life2-ins-self","title":"ตัวแทนประกันชีวิตมาหา","body":"ตัวแทนประกันชีวิตเป็นคนในหมู่บ้าน มาอธิบายแผนประกันชีวิตและสุขภาพ จ่ายเบี้ยทุกปี","when":{"age":[22,60],"year":[1990,2026],"noFlag":["life2-insSelf"],"any":[{"year":[2000,2026]},{"chance":0.3}]},"w":5,"cooldown":12,
   "choices":[
    {"id":"buy","label":"ทำประกันชีวิตและสุขภาพให้ตัวเอง","text":"เบี้ยกินเงินทุกปี แต่ถ้าป่วยหนักจะมีคนช่วยจ่าย","effects":[{"flag":"life2-insSelf"},{"cond":"life2-premSelf","turns":60},{"stat":"happy","d":1}]},
    {"id":"no","label":"ไม่ทำ เก็บเงินเองดีกว่า","text":"ไม่มีภาระเบี้ย แต่ถ้าเจ็บป่วยต้องจ่ายเองทั้งหมด","effects":[{"stat":"happy","d":1}]}]},
  {"id":"life2-ins-parents","title":"ทำประกันให้พ่อแม่","body":"พ่อแม่อายุมากขึ้น ตัวแทนประกันเสนอแผนประกันชีวิตผู้สูงอายุ เบี้ยแพงกว่าคนหนุ่มสาว","when":{"age":[25,60],"year":[1990,2026],"flag":{"parentsAlive":true},"noFlag":["life2-insFather","life2-insMother"],"any":[{"year":[2000,2026]},{"chance":0.3}]},"w":5,"cooldown":12,
   "choices":[
    {"id":"father","label":"ทำให้พ่อ","text":"พ่อบ่นว่าเปลืองเงิน แต่แอบดีใจ","when":{"flag":{"fatherAlive":true}},"effects":[{"flag":"life2-insFather"},{"cond":"life2-premParent","turns":60},{"stat":"bond","d":2}]},
    {"id":"mother","label":"ทำให้แม่","text":"แม่เก็บกรมธรรม์ไว้ในตู้อย่างดี","when":{"flag":{"motherAlive":true}},"effects":[{"flag":"life2-insMother"},{"cond":"life2-premParent","turns":60},{"stat":"bond","d":2}]},
    {"id":"both","label":"ทำให้ทั้งพ่อและแม่","text":"เบี้ยหนักขึ้นเกือบเท่าตัว","when":{"flag":{"fatherAlive":true,"motherAlive":true}},"effects":[{"flag":"life2-insFather"},{"flag":"life2-insMother"},{"cond":"life2-premParent","turns":60},{"money":-10,"unit":"wageDay"},{"stat":"bond","d":4}]},
    {"id":"no","label":"ไม่ทำ","text":"เก็บเงินไว้ใช้ยามพ่อแม่ป่วยจริงดีกว่า","effects":[{"stat":"happy","d":1}]}]},
  {"id":"life2-ins-kids","title":"ประกันให้ลูก","body":"โรงเรียนลูกแจกใบสมัครประกันอุบัติเหตุและสุขภาพเด็ก","when":{"flag":{"child":true},"childAge":[0,18],"year":[1990,2026],"noFlag":["life2-insKids"],"any":[{"year":[2000,2026]},{"chance":0.3}]},"w":5,"cooldown":12,
   "choices":[
    {"id":"buy","label":"ทำให้ลูกทุกคน","text":"ลูกซนแค่ไหนก็อุ่นใจขึ้น","effects":[{"flag":"life2-insKids"},{"cond":"life2-premKids","turns":45}]},
    {"id":"no","label":"ไม่ทำ มีบัตรทองอยู่แล้ว","text":"ประหยัดเบี้ย แต่ค่ารักษานอกสิทธิ์ต้องจ่ายเอง","effects":[{"stat":"happy","d":1}]}]},
  {"id":"life2-ins-sib","title":"ประกันให้พี่น้อง","body":"พี่น้องทำงานก่อสร้างเสี่ยงอุบัติเหตุ ไม่มีประกันอะไรเลย","when":{"flag":{"hasSiblings":true},"age":[22,60],"year":[1995,2026],"noFlag":["life2-insSib"],"chance":0.5},"w":4,"cooldown":15,
   "choices":[
    {"id":"buy","label":"ช่วยจ่ายเบี้ยประกันอุบัติเหตุให้","text":"พี่น้องซึ้งใจ เงินออกทุกปี","effects":[{"flag":"life2-insSib"},{"cond":"life2-premSib","turns":45},{"stat":"bond","d":3}]},
    {"id":"no","label":"แนะนำให้เขาทำเอง","text":"เขาพยักหน้า แต่คงไม่ได้ทำ","effects":[{"stat":"bond","d":-1}]}]},
  {"id":"life2-claim-self","title":"ประกันจ่ายค่ารักษา","body":"เข้าโรงพยาบาลหลายวัน บริษัทประกันจ่ายค่าห้องและค่ายาให้","when":{"cond":["sick"],"flag":{"life2-insSelf":true}},"w":14,"cooldown":9,"effects":[{"money":30,"unit":"wageDay"},{"stat":"health","d":4},{"stat":"happy","d":3}]},
  {"id":"life2-claim-father","title":"เคลมประกันชีวิตของพ่อ","body":"หลังงานศพพ่อ ตัวแทนประกันนำเงินสินไหมมามอบให้ครอบครัว","when":{"flag":{"parentPassed":"พ่อ","life2-insFather":true}},"w":40,"cooldown":"once",
   "choices":[
    {"id":"debt","label":"ใช้หนี้ที่ค้างของบ้าน","text":"หนี้หมดไป เหมือนพ่อยังดูแลอยู่","effects":[{"money":120,"unit":"wageDay"},{"uncond":"indebted"},{"flag":"life2-insFather","v":false},{"stat":"happy","d":3}]},
    {"id":"share","label":"แบ่งให้พี่น้องเท่าๆ กัน","text":"ทุกคนได้ส่วน ไม่มีใครค้างใจ","effects":[{"money":60,"unit":"wageDay"},{"flag":"life2-insFather","v":false},{"stat":"bond","d":4}]}]},
  {"id":"life2-claim-mother","title":"เคลมประกันชีวิตของแม่","body":"หลังงานศพแม่ ตัวแทนประกันนำเงินสินไหมมามอบให้ตามกรมธรรม์","when":{"flag":{"parentPassed":"แม่","life2-insMother":true}},"w":40,"cooldown":"once",
   "choices":[
    {"id":"save","label":"เก็บไว้เป็นทุนให้หลาน","text":"เงินก้อนนี้จะส่งหลานเรียนตามที่แม่เคยหวัง","effects":[{"money":120,"unit":"wageDay"},{"flag":"life2-insMother","v":false},{"stat":"happy","d":2}]},
    {"id":"merit","label":"ทำบุญอุทิศให้แม่ส่วนหนึ่ง","text":"ใจสงบขึ้น เงินเหลือน้อยลง","effects":[{"money":80,"unit":"wageDay"},{"flag":"life2-insMother","v":false},{"stat":"happy","d":4}]}]},
  {"id":"life2-claim-parent-hosp","title":"ประกันช่วยค่ารักษาพ่อแม่","body":"พ่อหรือแม่เข้าโรงพยาบาลจังหวัด ประกันที่ทำไว้ช่วยจ่ายค่าห้องพิเศษ","when":{"flag":{"parentsAlive":true},"any":[{"flag":{"life2-insFather":true,"fatherAlive":true}},{"flag":{"life2-insMother":true,"motherAlive":true}}],"chance":0.3},"w":6,"cooldown":12,"effects":[{"money":15,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"happy","d":2}]},
  {"id":"life2-claim-kids","title":"ลูกเข้าโรงพยาบาล","body":"ลูกเป็นไข้เลือดออกต้องนอนโรงพยาบาล ประกันที่ทำไว้จ่ายค่ารักษาให้","when":{"flag":{"life2-insKids":true},"childAge":[0,22],"chance":0.4},"w":6,"cooldown":12,"effects":[{"money":12,"unit":"wageDay"},{"stat":"happy","d":2}]},
  {"id":"life2-claim-sib","title":"พี่น้องได้เงินประกันอุบัติเหตุ","body":"พี่น้องตกนั่งร้านขาหัก ประกันที่คุณช่วยจ่ายไว้ครอบคลุมค่ารักษาและชดเชยรายได้","when":{"flag":{"life2-insSib":true},"chance":0.3},"w":5,"cooldown":15,"effects":[{"stat":"bond","d":5},{"cond":"proud","turns":1}]},
  {"id":"life2-ins-lapse","title":"ขาดส่งเบี้ยประกัน","body":"เงินติดลบ จดหมายจากบริษัทประกันแจ้งว่าค้างชำระเบี้ย กรมธรรม์จะขาดอายุ","when":{"money":[-999999999,-1],"any":[{"cond":["life2-premSelf"]},{"cond":["life2-premParent"]},{"cond":["life2-premKids"]},{"cond":["life2-premSib"]}]},"w":30,"cooldown":6,
   "choices":[
    {"id":"lapse","label":"ปล่อยให้กรมธรรม์ขาด","text":"ไม่มีเบี้ยรายปีแล้ว แต่ความคุ้มครองทั้งหมดหายไป","effects":[{"uncond":"life2-premSelf"},{"uncond":"life2-premParent"},{"uncond":"life2-premKids"},{"uncond":"life2-premSib"},{"flag":"life2-insSelf","v":false},{"flag":"life2-insFather","v":false},{"flag":"life2-insMother","v":false},{"flag":"life2-insKids","v":false},{"flag":"life2-insSib","v":false},{"stat":"happy","d":-3}]},
    {"id":"borrow","label":"ยืมเงินมาจ่ายเบี้ยต่อ","text":"ความคุ้มครองยังอยู่ แต่หนี้เพิ่มขึ้น","effects":[{"cond":"indebted","turns":6},{"stat":"happy","d":-2}]}]}
]);
KI.data.decisions.push(...[
  {"id":"life2-house-wedding","title":"แต่งแล้วจะอยู่ที่ไหน","body":"หลังงานแต่ง ทั้งสองครอบครัวถามว่าคู่บ่าวสาวจะไปอยู่บ้านไหน","when":{"flag":{"married":true},"marriedYears":[0,2],"noFlag":["life2-housed"]},"major":true,
   "choices":[
    {"id":"own","label":"อยู่บ้านพ่อแม่ของตัวเอง","text":"ประหยัดค่าใช้จ่าย ได้ช่วยดูแลพ่อแม่ แต่คู่ครองต้องปรับตัวกับบ้านเรา","when":{"flag":{"parentsAlive":true}},"effects":[{"flag":"life2-housed"},{"flag":"life2-liveParents"},{"flag":"movedOut","v":false},{"stat":"bond","d":3},{"stat":"happy","d":-1}]},
    {"id":"inlaws","label":"ย้ายไปอยู่บ้านครอบครัวคู่ครอง","text":"ตามธรรมเนียมอีสานที่ฝ่ายชายมาอยู่บ้านฝ่ายหญิง ได้ที่นาของบ้านนั้นช่วยทำกิน แต่ต้องเกรงใจผู้ใหญ่","effects":[{"flag":"life2-housed"},{"flag":"life2-liveInlaws"},{"flag":"movedOut"},{"stat":"bond","d":1},{"cond":"homesick","turns":1}]},
    {"id":"build","label":"ปลูกบ้านหลังเล็กในที่ดินของครอบครัว","text":"ได้บ้านของตัวเองใกล้พ่อแม่ เงินเก็บหมดไปกับค่าวัสดุ","when":{"money":[20000,999999999]},"effects":[{"flag":"life2-housed"},{"flag":"life2-ownHouse"},{"flag":"movedOut"},{"money":-100,"unit":"wageDay"},{"stat":"happy","d":4}]},
    {"id":"rent","label":"เช่าบ้านในเมืองใกล้ที่ทำงาน","text":"เป็นส่วนตัว ใกล้งาน แต่จ่ายค่าเช่าทุกเดือน","effects":[{"flag":"life2-housed"},{"flag":"movedOut"},{"cond":"life2-rent","turns":30},{"stat":"happy","d":2}]},
    {"id":"buy","label":"ซื้อทาวน์เฮาส์ในเมืองด้วยเงินสด","text":"มีบ้านเป็นของตัวเองตั้งแต่เริ่มชีวิตคู่ เงินเก็บแทบหมด","when":{"money":[200000,999999999]},"effects":[{"flag":"life2-housed"},{"flag":"life2-ownHouse"},{"flag":"movedOut"},{"money":-500,"unit":"wageDay"},{"stat":"happy","d":6},{"pin":"ซื้อบ้านหลังแรก"}]},
    {"id":"loan","label":"กู้ธนาคารซื้อบ้าน","text":"วางเงินดาวน์ แล้วผ่อนยาวหลายสิบปี","when":{"money":[30000,999999999],"year":[1988,2026]},"effects":[{"flag":"life2-housed"},{"flag":"life2-ownHouse"},{"flag":"movedOut"},{"money":-80,"unit":"wageDay"},{"cond":"life2-mortgage","turns":45},{"stat":"happy","d":4},{"pin":"กู้ซื้อบ้านหลังแรก"}]}]}
]);
(function () {
  const choiceGate = { "fam-land-dispute/carer": { "flag": { "parentsAlive": true } }, "career-kyorsor/land": { "flag": { "parentsAlive": true } }, "after-m6/gap": { "flag": { "parentsAlive": true } } };
  for (const list of [KI.data.decisions, KI.data.personalEvents]) for (const item of list) for (const c of item.choices || []) {
    const extra = choiceGate[item.id + "/" + c.id];
    if (extra) c.when = { ...(c.when || {}), ...extra, flag: { ...((c.when || {}).flag || {}), ...extra.flag } };
  }
})();
