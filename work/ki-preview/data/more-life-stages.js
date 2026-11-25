globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"kid-leave-home","title":"ลูกโตแล้ว","body":"ลูกเรียนจบมีงานทำ วันหนึ่งนั่งลงข้างๆ แล้วบอกว่าอยากออกไปสร้างชีวิตของตัวเอง","when":{"childAge":[21,30],"noFlag":["kidLeaveDone"],"chance":0.5},"cooldown":"once","major":true,
   "choices":[
    {"id":"bless","label":"อวยพรแล้วปล่อยให้ไป","text":"ช่วยขนของขึ้นรถ บ้านเงียบลงทันที แต่ภูมิใจที่ลูกยืนได้ด้วยตัวเอง","effects":[{"flag":"kidLeaveDone"},{"stat":"happy","d":-1},{"stat":"bond","d":2},{"pin":"ลูกแยกออกไปสร้างครอบครัวของตัวเอง"}]},
    {"id":"help","label":"ช่วยเงินดาวน์บ้านหลังแรกให้ลูก","text":"เงินเก็บหายไปก้อนหนึ่ง แต่ลูกได้บ้านของตัวเองเร็วกว่าที่คิด","effects":[{"flag":"kidLeaveDone"},{"money":-300,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"happy","d":2},{"pin":"ช่วยลูกซื้อบ้านหลังแรก"}]},
    {"id":"stay","label":"ขอให้ลูกอยู่บ้านช่วยดูแลครอบครัว","text":"ลูกยอมอยู่ต่อ แต่บางคืนเห็นนั่งดูประกาศงานในเมืองอยู่คนเดียว","effects":[{"flag":"kidLeaveDone"},{"flag":"kidStays"},{"stat":"bond","d":-1},{"stat":"happy","d":2}]}
   ]},
  {"id":"grandkid-care","title":"ลูกฝากหลานให้เลี้ยง","body":"ลูกต้องไปทำงานไกล ถามว่าพอจะช่วยเลี้ยงหลานให้สักพักได้ไหม","when":{"age":[45,85],"flag":{"grandchild":true},"noFlag":["grandkidsWithUs"],"chance":0.35},"cooldown":12,
   "choices":[
    {"id":"raise","label":"รับหลานมาเลี้ยงที่บ้าน","text":"บ้านมีเสียงเด็กอีกครั้ง เหนื่อยกว่าเดิมแต่ยิ้มทั้งวัน","effects":[{"flag":"grandkidsWithUs"},{"money":-40,"unit":"wageDay"},{"stat":"happy","d":4},{"stat":"health","d":-1},{"stat":"bond","d":3}]},
    {"id":"money","label":"ช่วยค่าเลี้ยงดูแทน","text":"ส่งเงินให้ลูกจ้างพี่เลี้ยง ได้แต่วิดีโอคอลคุยกับหลาน","effects":[{"money":-30,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"no","label":"บอกว่าแก่แล้ว เลี้ยงไม่ไหว","text":"ลูกเข้าใจ แต่น้ำเสียงผิดหวัง","effects":[{"stat":"bond","d":-2}]}
   ]},
  {"id":"veh-breakdown","title":"รถเสียกลางทาง","body":"รถดับกลางถนน สตาร์ทไม่ติด ต้องเรียกรถลากไปซ่อม","when":{"flag":{"ownsPersonalCar":true},"chance":0.2},"cooldown":9,
   "choices":[
    {"id":"dealer","label":"ซ่อมศูนย์ เปลี่ยนอะไหล่แท้","text":"แพงแต่ได้รถกลับมาเหมือนใหม่","effects":[{"money":-60,"unit":"wageDay"},{"stat":"happy","d":-1}]},
    {"id":"garage","label":"ซ่อมอู่ข้างบ้าน (ถูกกว่า แต่มีโอกาสเสียซ้ำ 30%)","text":"ช่างซ่อมให้ภายในวันเดียว","effects":[{"money":-25,"unit":"wageDay"}],"roll":[{"p":0.7,"text":"รถกลับมาวิ่งได้ปกติ","effects":[{"stat":"happy","d":1}]},{"p":0.3,"text":"ไม่ถึงเดือนรถเสียอีก ต้องจ่ายซ้ำ","effects":[{"money":-25,"unit":"wageDay"},{"stat":"happy","d":-3}]}]},
    {"id":"bus","label":"จอดทิ้งไว้ก่อน นั่งรถโดยสารไปพลางๆ","text":"ประหยัดเงิน แต่เสียเวลาเดินทางทุกวัน","effects":[{"stat":"happy","d":-2},{"stat":"health","d":-1}]}
   ]},
  {"id":"veh-accident","title":"อุบัติเหตุบนถนน","body":"ฝนตกถนนลื่น รถเสียหลักชนท้ายรถคันหน้า โชคดีที่ไม่มีใครเจ็บหนัก","when":{"flag":{"ownsPersonalCar":true},"chance":0.06},"cooldown":15,"heavy":true,
   "choices":[
    {"id":"insurance","label":"เคลมประกันชั้นหนึ่ง","text":"เสียค่าเบี้ยเพิ่มปีหน้า แต่ไม่ต้องควักก้อนใหญ่","effects":[{"money":-20,"unit":"wageDay"},{"stat":"health","d":-3},{"stat":"happy","d":-2}]},
    {"id":"pay","label":"จ่ายเงินสดเคลียร์กันเอง","text":"จบเร็ว แต่เงินเก็บหายไปมาก","effects":[{"money":-90,"unit":"wageDay"},{"stat":"health","d":-3},{"stat":"happy","d":-3}]}
   ]},
  {"id":"home-repair","title":"บ้านต้องซ่อม","body":"พายุหน้าฝนทำหลังคารั่ว น้ำซึมลงฝ้า ผนังขึ้นราหลายจุด","when":{"flag":{"ownsPersonalHome":true},"chance":0.15},"cooldown":12,
   "choices":[
    {"id":"fix","label":"จ้างช่างซ่อมทั้งหลัง","text":"บ้านกลับมาน่าอยู่เหมือนเดิม","effects":[{"money":-100,"unit":"wageDay"},{"stat":"happy","d":1}]},
    {"id":"patch","label":"ปะเองเฉพาะจุด (มีโอกาสรั่วซ้ำ 50%)","text":"ปีนหลังคาซ่อมเองทั้งวัน","effects":[{"money":-20,"unit":"wageDay"},{"stat":"health","d":-1}],"roll":[{"p":0.5,"text":"ฝนตกหนักอีกรอบก็ไม่รั่ว","effects":[{"stat":"happy","d":2}]},{"p":0.5,"text":"ฝนรอบหน้ารั่วหนักกว่าเดิม","effects":[{"money":-40,"unit":"wageDay"},{"stat":"happy","d":-3}]}]},
    {"id":"leave","label":"เอากะละมังรองไปก่อน","text":"ทุกครั้งที่ฝนตกต้องวิ่งเก็บของ","effects":[{"stat":"happy","d":-3}]}
   ]},
  {"id":"partner-sick","title":"คู่ชีวิตล้มป่วย","body":"คู่ชีวิตเหนื่อยง่ายผิดปกติ ไปตรวจแล้วหมอบอกว่าต้องรักษาต่อเนื่องอีกนาน","when":{"age":[45,85],"partnerYears":[8,99],"chance":0.12},"cooldown":15,"heavy":true,
   "choices":[
    {"id":"private","label":"พาไปรักษาโรงพยาบาลเอกชน","text":"ค่ารักษาสูงมาก แต่ได้หมอเก่งและไม่ต้องรอคิว","effects":[{"money":-200,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"happy","d":-2}]},
    {"id":"public","label":"ใช้สิทธิ์รักษาโรงพยาบาลรัฐ","text":"รอคิวนาน ลางานไปเฝ้าหลายวัน","effects":[{"money":-30,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"health","d":-1}]},
    {"id":"work","label":"ทำงานต่อ ให้ญาติช่วยดูแลแทน","text":"รายได้ไม่ขาด แต่คู่ชีวิตน้อยใจที่ไม่ค่อยเห็นหน้า","effects":[{"stat":"bond","d":-4}]}
   ]},
  {"id":"partner-dies","title":"สูญเสียคู่ชีวิต","body":"คู่ชีวิตที่อยู่ด้วยกันมาหลายสิบปีจากไปอย่างสงบ บ้านที่เคยมีเสียงคุยกันทุกเช้าเงียบลง","when":{"age":[60,95],"partnerYears":[10,99],"chance":0.05},"cooldown":"once","heavy":true,"major":true,
   "choices":[
    {"id":"grand","label":"จัดงานศพอย่างสมเกียรติ","text":"ญาติมิตรมาร่วมงานแน่นศาลา ส่งคนรักไปอย่างอบอุ่น","effects":[{"money":-80,"unit":"wageDay"},{"flag":"partnerDied"},{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"grieving","turns":4},{"stat":"happy","d":-8},{"pin":"สูญเสียคู่ชีวิต"}]},
    {"id":"simple","label":"จัดงานเรียบง่ายตามที่คนรักเคยขอ","text":"มีแค่ครอบครัวและเพื่อนสนิท เงียบแต่ลึกซึ้ง","effects":[{"money":-20,"unit":"wageDay"},{"flag":"partnerDied"},{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"grieving","turns":4},{"stat":"happy","d":-8},{"pin":"สูญเสียคู่ชีวิต"}]}
   ]},
  {"id":"widow-new-start","title":"ชีวิตหลังจากนั้น","body":"เวลาผ่านไป ความเศร้าเบาบางลง เพื่อนชวนออกไปทำกิจกรรมบ่อยขึ้น","when":{"age":[50,90],"flag":{"widowed":true},"noFlag":["partner"],"noCond":["grieving"],"chance":0.2},"cooldown":12,
   "choices":[
    {"id":"club","label":"เข้าชมรมผู้สูงอายุ รำวงทุกเย็น","text":"ได้เพื่อนใหม่เยอะ หัวเราะได้อีกครั้ง","effects":[{"stat":"happy","d":5},{"stat":"health","d":2},{"inc":"clout","d":1}]},
    {"id":"love","label":"เปิดใจให้คนใหม่","text":"คนในชมรมคนหนึ่งชวนไปทำบุญด้วยกันบ่อยๆ จนกลายเป็นคู่ชีวิตอีกครั้ง","effects":[{"flag":"partner"},{"flag":"widowed","v":false},{"stat":"happy","d":6},{"pin":"เริ่มต้นความรักอีกครั้ง"}]},
    {"id":"alone","label":"อยู่กับความทรงจำเงียบๆ","text":"เก็บรูปเก่าไว้หัวนอน คุยกับรูปทุกคืน","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"partner-promoted","title":"คู่ชีวิตได้ดีในงาน","body":"คู่ชีวิตกลับบ้านมาพร้อมข่าวดี ได้ขึ้นเงินเดือนและโบนัสก้อนโต","when":{"age":[25,60],"flag":{"partner":true},"chance":0.08},"cooldown":15,
   "choices":[
    {"id":"party","label":"ฉลองกันทั้งบ้าน","text":"ออกไปกินข้าวร้านดีๆ คนในบ้านตื่นเต้นกว่าเจ้าตัว","effects":[{"money":20,"unit":"wageDay"},{"stat":"happy","d":4},{"stat":"bond","d":3}]},
    {"id":"save","label":"เก็บโบนัสไว้เป็นเงินออมครอบครัว","text":"เงินเก็บเพิ่มขึ้นอีกก้อน","effects":[{"money":40,"unit":"wageDay"},{"stat":"bond","d":1}]}
   ]},
  {"id":"inherit-home","title":"บ้านหลังเก่าของพ่อแม่","body":"พ่อแม่จากไปหมดแล้ว บ้านหลังเก่าที่เติบโตมายังตั้งอยู่ ญาติถามว่าจะจัดการอย่างไร","when":{"age":[30,85],"flag":{"parentsAlive":false},"noFlag":["inheritHomeDone","noParents"],"chance":0.5},"cooldown":"once","major":true,
   "choices":[
    {"id":"keep","label":"รับบ้านพ่อแม่ไว้เป็นของตัวเอง","text":"ซ่อมบ้านเก่าให้กลับมาน่าอยู่ ทุกมุมยังมีความทรงจำ","when":{"noFlag":["ownsPersonalHome"]},"effects":[{"flag":"inheritHomeDone"},{"personal":"home-medium","free":true},{"stat":"happy","d":3},{"pin":"รับมรดกบ้านพ่อแม่"}]},
    {"id":"sell","label":"ขายแล้วแบ่งเงินกับพี่น้อง","when":{"flag":{"hasSiblings":true}},"text":"ได้เงินก้อนหนึ่ง แต่ใจหายตอนเซ็นโอนให้คนอื่น","effects":[{"flag":"inheritHomeDone"},{"money":600,"unit":"wageDay"},{"stat":"happy","d":-1},{"pin":"ขายบ้านมรดกของพ่อแม่"}]},
    {"id":"give","label":"ยกให้พี่น้องที่ยังลำบาก","when":{"flag":{"hasSiblings":true}},"text":"พี่น้องน้ำตาซึม ครอบครัวรักกันมากขึ้น","character":"kind","effects":[{"flag":"inheritHomeDone"},{"stat":"bond","d":5},{"inc":"good"}]}
   ]},
  {"id":"old-hospital","title":"สุขภาพทรุดลงตามวัย","body":"ความดันขึ้น เข่าเสื่อม ต้องพบหมอบ่อยขึ้นทุกปี","when":{"age":[70,110],"stat":{"health":[0,45]},"chance":0.4},"cooldown":6,
   "choices":[
    {"id":"private","label":"รักษาโรงพยาบาลเอกชน","text":"ห้องพักสบาย หมอดูแลใกล้ชิด แต่บิลค่ารักษาสูงลิ่ว","effects":[{"money":-150,"unit":"wageDay"},{"stat":"health","d":6}]},
    {"id":"public","label":"ใช้สิทธิ์บัตรทอง รอคิวโรงพยาบาลรัฐ","text":"ตื่นตีห้าไปรอคิว ได้ยาครบแต่เหนื่อย","when":{"year":[2002,2200]},"effects":[{"money":-5,"unit":"wageDay"},{"stat":"health","d":3},{"stat":"happy","d":-1}]},
    {"id":"herb","label":"กินยาสมุนไพรตามที่เพื่อนบอก","text":"ประหยัดเงิน แต่อาการไม่ดีขึ้นเท่าไร","effects":[{"stat":"health","d":-1}]}
   ]},
  {"id":"old-ordain","title":"อยากปฏิบัติธรรมในวัยชรา","body":"อายุมากขึ้น อยากหาความสงบให้ใจ วัดในหมู่บ้านเปิดรับคนมาปฏิบัติธรรม","when":{"age":[60,90],"noFlag":["oldOrdained"],"chance":0.07},"cooldown":"once",
   "choices":[
    {"id":"monk","label":"บวชพระช่วงเข้าพรรษา","text":"ลูกหลานมาแห่นาคเต็มหมู่บ้าน สามเดือนในวัดใจสงบกว่าที่เคย","when":{"sex":"m"},"character":"kind","effects":[{"flag":"oldOrdained"},{"stat":"happy","d":6},{"stat":"bond","d":3},{"inc":"good"},{"pin":"บวชพระในวัยชรา"}]},
    {"id":"nun","label":"บวชชีพราหมณ์ถือศีลแปด","text":"นุ่งขาวห่มขาวอยู่วัดหลายสัปดาห์ ใจเบาลงมาก","when":{"sex":"f"},"character":"kind","effects":[{"flag":"oldOrdained"},{"stat":"happy","d":6},{"stat":"bond","d":2},{"inc":"good"},{"pin":"บวชชีพราหมณ์ในวัยชรา"}]},
    {"id":"visit","label":"ไปวัดทุกวันพระแทน","text":"ทำบุญตักบาตร ฟังธรรมเป็นประจำ","effects":[{"stat":"happy","d":2}]}
   ]},
  {"id":"old-will","title":"ทำพินัยกรรม","body":"ลูกหลานเริ่มถามถึงทรัพย์สิน ทนายความในอำเภอแนะนำให้ทำพินัยกรรมไว้ก่อน","when":{"age":[68,110],"flag":{"child":true},"noFlag":["madeWill"],"chance":0.3},"cooldown":"once",
   "choices":[
    {"id":"equal","label":"แบ่งให้ลูกทุกคนเท่ากัน","text":"เขียนชัดเจนทุกอย่าง ลูกๆ สบายใจ","effects":[{"flag":"madeWill","v":"equal"},{"money":-10,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"carer","label":"ยกให้ลูกที่ดูแลมากกว่า","text":"ลูกที่อยู่ไกลไม่พอใจ แต่ลูกที่อยู่ด้วยซึ้งใจ","effects":[{"flag":"madeWill","v":"carer"},{"money":-10,"unit":"wageDay"},{"stat":"bond","d":-1}]},
    {"id":"temple","label":"ยกส่วนหนึ่งให้วัดและโรงเรียน","text":"ลูกบางคนบ่น แต่ชื่อคุณจะอยู่ในหมู่บ้านไปอีกนาน","character":"kind","effects":[{"flag":"madeWill","v":"temple"},{"inc":"good"},{"inc":"clout","d":2}]}
   ]},
  {"id":"old-alone","title":"ใครจะดูแลยามแก่","body":"เดินเหินลำบากขึ้น ลูกๆ ต่างมีงานอยู่ไกลบ้าน ต้องตัดสินใจว่าจะอยู่อย่างไรต่อ","when":{"age":[75,110],"flag":{"child":true},"noFlag":["kidStays","oldCareSet"],"chance":0.25},"cooldown":12,
   "choices":[
    {"id":"rotate","label":"ให้ลูกๆ ผลัดกันกลับมาดูแล","text":"ลูกแต่ละคนกลับมาอยู่ด้วยคนละเดือน หลานได้ใกล้ชิดย่ายาย","effects":[{"flag":"oldCareSet"},{"stat":"bond","d":4},{"money":-20,"unit":"wageDay"}]},
    {"id":"home","label":"ย้ายไปอยู่บ้านพักผู้สูงอายุ","text":"มีพยาบาลดูแลตลอด มีเพื่อนวัยเดียวกัน แต่คิดถึงบ้าน","effects":[{"flag":"oldCareSet"},{"money":-250,"unit":"wageDay"},{"stat":"health","d":3},{"stat":"happy","d":-2}]},
    {"id":"alone","label":"อยู่บ้านคนเดียว ไม่อยากเป็นภาระใคร","text":"เพื่อนบ้านแวะมาดูบ้างเป็นครั้งคราว","effects":[{"stat":"happy","d":-3},{"stat":"health","d":-1}]}
   ]}
]);
