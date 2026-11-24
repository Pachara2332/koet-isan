globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"fort-crisis-1997","title":"วิกฤตต้มยำกุ้งถึงบ้านญาติ","body":"กิจการของลุงในเมืองที่พ่อแม่ร่วมหุ้นไว้ปิดตัวลงหลังค่าเงินบาทลอยตัว เงินที่ลงไปแทบไม่ได้คืน","when":{"year":[1997,1998],"age":[6,40],"flag":{"parentsAlive":true},"wealth":["mid","rich"],"chance":0.05},"cooldown":"once","major":true,
   "choices":[
    {"id":"tight","label":"ช่วยบ้านรัดเข็มขัด","text":"ทั้งบ้านเลิกซื้อของไม่จำเป็น กินข้าวกับปลาแดกเป็นหลัก","effects":[{"wealth":"poor"},{"stat":"happy","d":-5},{"stat":"bond","d":4},{"flag":"fort-bankrupt"}]},
    {"id":"help","label":"เอาเงินเก็บตัวเองช่วย","text":"เงินที่เก็บไว้ช่วยประคองหนี้ก้อนแรก","when":{"age":[18,40]},"effects":[{"money":-60,"unit":"wageDay"},{"stat":"bond","d":8},{"flag":"fort-rescued"}],
     "roll":[{"p":0.5,"text":"พ่อแม่ยังพอยืนได้ ไม่ต้องขายนา","effects":[{"wealth":"mid"}]},{"p":0.5,"text":"ช่วยได้แค่ชะลอ สุดท้ายต้องขายรถและทอง","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"happy","d":-4}]}]},
    {"id":"away","label":"ไม่ยุ่ง ปล่อยให้ผู้ใหญ่จัดการกันเอง","text":"ไม่ต้องแบกเรื่องหนักไว้กับตัว แต่เสียงพ่อแม่ฟังเหนื่อยลงทุกวัน","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":-6,"by":"attach"}]}
   ]},
  {"id":"fort-covid-shop","title":"ร้านของพ่อแม่ต้องปิด","body":"ช่วงโควิด ร้านเล็กหน้าบ้านพ่อแม่แทบไม่มีลูกค้า ค่าเช่าและหนี้ยังเดินทุกเดือน","when":{"year":[2020,2021],"age":[15,60],"flag":{"parentsAlive":true},"wealth":["mid","rich"],"chance":0.05},"cooldown":"once","major":true,
   "choices":[
    {"id":"online","label":"ช่วยพ่อแม่ขายออนไลน์","text":"สอนแม่ไลฟ์ขายของ ทำโพสต์ให้ทุกคืน","effects":[{"stat":"bond","d":5},{"stat":"happy","d":-2}],
     "roll":[{"p":0.45,"text":"ลูกค้าประจำตามมาสั่ง ร้านพอประคองตัวได้","effects":[{"stat":"happy","d":4}]},{"p":0.55,"text":"ยอดไม่พอค่าใช้จ่าย สุดท้ายต้องปิดร้าน","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]},
    {"id":"close","label":"แนะนำให้ปิดร้านตัดขาดทุน","text":"เจ็บแต่จบ ไม่มีหนี้งอกเพิ่ม","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"happy","d":-4}]},
    {"id":"pay","label":"จ่ายค่าเช่าให้หลายเดือน","text":"เงินเก็บหายไปก้อนใหญ่ แต่ร้านยังเปิดอยู่","when":{"age":[22,60],"money":[30000,999999999]},"effects":[{"money":-50,"unit":"wageDay"},{"stat":"bond","d":7},{"flag":"fort-rescued"}]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"fort-biz-bankrupt","title":"กิจการพ่อล้มละลาย","body":"ร้านวัสดุก่อสร้างของพ่อขาดทุนสะสม เจ้าหนี้มาทวงถึงบ้าน","w":8,"when":{"age":[18,50],"flag":{"parentsAlive":true},"wealth":"rich","chance":0.25},"cooldown":"once",
   "choices":[
    {"id":"savings","label":"เอาเงินเก็บไปช่วยปลดหนี้","text":"เงินที่เก็บมาหลายปีหายไปในวันเดียว","effects":[{"money":-80,"unit":"wageDay"},{"stat":"bond","d":8},{"wealth":"mid"},{"flag":"fort-rescued"}]},
    {"id":"let","label":"ให้พ่อยื่นล้มละลายแล้วเริ่มใหม่","text":"บ้านหลังใหญ่ถูกยึด ทั้งครอบครัวย้ายไปเช่าห้องเล็ก","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"happy","d":-6},{"stat":"bond","d":2}]},
    {"id":"bkk","label":"ไปทำงานกรุงเทพฯ ส่งเงินกลับ","text":"ทำงานสองกะ ส่งเงินทุกสิ้นเดือน","when":{"loc":"isan"},"effects":[{"move":{"kind":"bangkok"}},{"wealth":"mid"},{"flag":"fort-bankrupt"},{"cond":"homesick","turns":4},{"stat":"bond","d":5}]}
   ]},
  {"id":"fort-child-bankrupt","title":"บ้านต้องย้าย","body":"กิจการของพ่อเจ๊ง บ้านหลังเดิมต้องขาย เราต้องย้ายไปอยู่บ้านเช่าและเปลี่ยนโรงเรียน","w":8,"when":{"age":[7,17],"flag":{"parentsAlive":true},"wealth":"rich","chance":0.2},"cooldown":"once",
   "choices":[
    {"id":"brave","label":"บอกตัวเองว่าเริ่มใหม่ได้","text":"ที่โรงเรียนใหม่หาเพื่อนได้ช้าๆ แต่ก็หาได้","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt"},{"stat":"happy","d":-4},{"trait":"grit","d":2}]},
    {"id":"sulk","label":"โกรธพ่อที่ทำให้ลำบาก","text":"บ้านเงียบลง พ่อไม่กล้าสบตาลูก","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt"},{"stat":"bond","d":-8,"by":"attach"},{"stat":"happy","d":-3}]}
   ]},
  {"id":"fort-gamble-debt","title":"หนี้พนันของพ่อ","body":"มีคนมาทวงเงินที่พ่อเสียไพ่ไว้ แม่ร้องไห้ทั้งคืน","w":8,"when":{"age":[12,45],"flag":{"fatherAlive":true},"wealth":["mid","rich"],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"pay","label":"ช่วยจ่ายให้จบ","text":"หนี้จบ แต่ไม่แน่ใจว่าพ่อจะเลิกได้จริง","when":{"age":[18,45]},"effects":[{"money":-40,"unit":"wageDay"},{"stat":"bond","d":3}],
     "roll":[{"p":0.6,"text":"พ่อสัญญาและเลิกได้จริง","effects":[{"stat":"happy","d":3}]},{"p":0.4,"text":"ไม่กี่เดือนพ่อกลับไปเล่นอีก บ้านต้องขายนาแปลงหนึ่ง","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":-5}]}]},
    {"id":"talk","label":"ขอร้องพ่อให้เลิกเล่น แล้วแก้ปัญหาเอง","text":"พ่อเงียบ แล้วไปขายวัวจ่ายหนี้","effects":[{"wealth":"poor"},{"stat":"bond","d":-2},{"flag":"fort-bankrupt"}]},
    {"id":"kid","label":"เก็บเงินขนมไว้ให้แม่","text":"เงินไม่กี่บาทช่วยอะไรไม่ได้มาก แต่แม่กอดแน่น","when":{"age":[12,17]},"effects":[{"wealth":"poor"},{"stat":"bond","d":6},{"stat":"happy","d":-4},{"flag":"fort-bankrupt"}]}
   ]},
  {"id":"fort-chit-collapse","title":"แชร์แม่ล้ม","body":"เท้าแชร์ที่แม่ส่งมาทั้งปีหนีไป เงินหายหมด","w":10,"when":{"age":[8,45],"flag":{"motherAlive":true},"wealth":["mid","rich"],"year":[1975,2026],"chance":0.18},"cooldown":"once",
   "choices":[
    {"id":"comfort","label":"ปลอบแม่ ไม่ซ้ำเติม","text":"แม่ใจชื้นขึ้น แต่บ้านต้องประหยัดหนักไปหลายปี","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":5},{"stat":"happy","d":-3}]},
    {"id":"chase","label":"ไปกับแม่ ตามทวงพร้อมลูกแชร์คนอื่น","text":"แม่ไปแจ้งความรวมกับลูกแชร์อีกหลายบ้าน","effects":[{"stat":"happy","d":-2},{"money":-3,"unit":"wageDay"}],
     "roll":[{"p":0.3,"text":"ได้เงินคืนบางส่วน บ้านยังพอไปได้","effects":[{"stat":"happy","d":4}]},{"p":0.7,"text":"เรื่องเงียบหาย เงินไม่กลับมา","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]}
   ]},
  {"id":"fort-drought","title":"ปีแล้งหนัก","body":"ฝนทิ้งช่วงทั้งหน้านา ข้าวในนาพ่อแม่ยืนต้นตาย","w":12,"when":{"age":[6,45],"season":1,"flag":{"parentsAlive":true},"wealth":"mid","chance":0.15},"cooldown":24,
   "choices":[
    {"id":"work","label":"ไปรับจ้างช่วยบ้าน","text":"ได้ค่าแรงมาช่วยซื้อข้าวกิน แต่เหนื่อยเกินวัย","when":{"age":[15,45]},"effects":[{"money":5,"unit":"wageDay"},{"stat":"health","d":-3},{"stat":"bond","d":4}],
     "roll":[{"p":0.6,"text":"บ้านผ่านปีนี้ไปได้","effects":[]},{"p":0.4,"text":"หนี้ ธ.ก.ส. พอกขึ้นจนฐานะบ้านตก","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]},
    {"id":"wait","label":"รอปีหน้า","text":"กินข้าวเก่าในยุ้ง ภาวนาให้ฝนมา","effects":[{"stat":"happy","d":-3}],
     "roll":[{"p":0.5,"text":"ปีถัดมาฝนดี","effects":[{"stat":"happy","d":3}]},{"p":0.5,"text":"ต้องกู้มาซื้อพันธุ์ข้าว ฐานะบ้านตกลง","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]}
   ]},
  {"id":"fort-crop-crash","title":"ราคาพืชผลดิ่ง","body":"ราคายาง มันสำปะหลัง และข้าวตกพร้อมกัน พ่อแม่ขายผลผลิตแทบไม่คุ้มทุน","w":10,"when":{"age":[6,50],"season":2,"flag":{"parentsAlive":true},"wealth":["mid","rich"],"chance":0.13},"cooldown":30,
   "choices":[
    {"id":"hold","label":"ให้เก็บผลผลิตไว้รอราคา","text":"เสี่ยงว่าราคาจะขึ้น","when":{"age":[15,50]},"effects":[{"stat":"happy","d":-1}],
     "roll":[{"p":0.4,"text":"ราคากลับมา บ้านรอดตัว","effects":[{"stat":"happy","d":4}]},{"p":0.6,"text":"ราคายิ่งตก ต้องขายขาดทุนและกู้เพิ่ม","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]},
    {"id":"switch","label":"ชวนพ่อแม่ปลูกผักขายตลาดแทน","text":"เงินเข้าวันละนิด เหนื่อยกว่าเดิม แต่ไม่ต้องพึ่งราคาพืชตัวเดียว","when":{"age":[15,50]},"effects":[{"stat":"health","d":-2},{"stat":"bond","d":3},{"flag":"fort-diversified"}]},
    {"id":"kid-help","label":"ช่วยพ่อแม่ขนผลผลิตเข้าเก็บ","text":"พ่อแม่ตัดสินใจเก็บไว้รอราคา ได้แต่ช่วยลุ้นอยู่ข้างๆ","when":{"age":[6,14]},"effects":[{"stat":"bond","d":2},{"stat":"health","d":-1}],"roll":[{"p":0.4,"text":"ราคากลับมา บ้านรอดตัว","effects":[{"stat":"happy","d":4}]},{"p":0.6,"text":"ราคายิ่งตก ต้องขายขาดทุนและกู้เพิ่ม","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]},
    {"id":"kid-save","label":"ขอค่าขนมน้อยลงเพื่อช่วยบ้าน","text":"แม่ลูบหัว แล้วพ่อแม่หันมาปลูกผักขายตลาด ไม่ต้องพึ่งพืชตัวเดียว","when":{"age":[6,14]},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":-1},{"flag":"fort-diversified"}]}
   ]},
  {"id":"fort-land-seized","title":"ธนาคารยึดนา","body":"หนี้ที่พ่อแม่ค้างมาหลายปีครบกำหนด ธนาคารส่งหนังสือจะยึดที่นา","w":10,"when":{"age":[16,55],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor","chance":0.2},"cooldown":"once",
   "choices":[
    {"id":"redeem","label":"ไถ่ถอนด้วยเงินตัวเอง","text":"นาของพ่อแม่ยังอยู่ในมือครอบครัว","when":{"money":[20000,999999999]},"effects":[{"money":-70,"unit":"wageDay"},{"stat":"bond","d":10},{"stat":"happy","d":3},{"flag":"fort-rescued"}]},
    {"id":"loan","label":"กู้นอกระบบมาโปะ","text":"รักษานาไว้ได้ แต่ดอกเบี้ยรายวันตามมา","effects":[{"cond":"indebted","turns":9},{"stat":"bond","d":4}]},
    {"id":"lose","label":"ยอมเสียนา","text":"พ่อเดินไปดูนาครั้งสุดท้าย แล้วไปรับจ้างแทน","effects":[{"stat":"happy","d":-6,"by":"attach"},{"stat":"bond","d":-1},{"flag":"fort-landless"}]}
   ]},
  {"id":"fort-old-illness","title":"พ่อป่วยเรื้อรัง","body":"พ่อต้องรักษาในเมืองนานหลายเดือน ก่อนมีบัตรทองค่ารักษาจ่ายเองทั้งหมด","w":10,"when":{"year":[1975,2001],"age":[8,40],"flag":{"fatherAlive":true},"wealth":["mid","rich"],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"sell","label":"ขายวัวขายนารักษาพ่อ","text":"พ่ออาการดีขึ้น แต่บ้านไม่เหลืออะไรมาก","when":{"age":[15,40]},"effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":6}]},
    {"id":"dropout","label":"ออกจากโรงเรียนไปทำงาน","text":"เลิกเรียนกลางคัน ไปเป็นลูกจ้างโรงงานส่งเงินค่ายา","when":{"age":[15,22],"edu":{"in":["school","voc","hvoc","uni"]}},"effects":[{"edu":{"in":null}},{"role":"factory"},{"stat":"bond","d":8},{"stat":"happy","d":-6},{"flag":"fort-dropout"},{"pin":"ออกจากโรงเรียนมาช่วยค่ารักษาพ่อ"}]},
    {"id":"herb","label":"รักษาแบบสมุนไพรประหยัดเงิน","text":"เงินยังอยู่ แต่อาการของพ่อไม่แน่นอน","when":{"age":[15,40]},"effects":[{"stat":"happy","d":-3}],
     "roll":[{"p":0.5,"text":"พ่อค่อยๆ ดีขึ้นเอง","effects":[{"stat":"happy","d":3}]},{"p":0.5,"text":"อาการทรุดจนต้องเข้าโรงพยาบาลอยู่ดี ค่าใช้จ่ายสูงกว่าเดิม","effects":[{"wealth":"poor"},{"stat":"health","d":-2}]}]},
    {"id":"kid-care","label":"ช่วยแม่ดูแลพ่อหลังเลิกเรียน","text":"พ่อแม่ตัดสินใจขายวัวขายนารักษาพ่อ พ่ออาการดีขึ้น แต่บ้านไม่เหลืออะไรมาก","when":{"age":[8,14]},"effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":6}]},
    {"id":"kid-herb","label":"ช่วยต้มยาสมุนไพรให้พ่อทุกวัน","text":"พ่อแม่เลือกรักษาด้วยสมุนไพรเพื่อประหยัดเงิน อาการของพ่อยังไม่แน่นอน","when":{"age":[8,14]},"effects":[{"stat":"happy","d":-3}],"roll":[{"p":0.5,"text":"พ่อค่อยๆ ดีขึ้นเอง","effects":[{"stat":"happy","d":3}]},{"p":0.5,"text":"อาการทรุดจนต้องเข้าโรงพยาบาลอยู่ดี ค่าใช้จ่ายสูงกว่าเดิม","effects":[{"wealth":"poor"},{"stat":"health","d":-2}]}]}
   ]},
  {"id":"fort-scammed","title":"พ่อแม่โดนหลอก","body":"มีคนมาชวนพ่อแม่ลงเงินกับบริษัทที่บอกว่าปันผลทุกเดือน ได้ทุนคืนเร็ว","w":10,"when":{"age":[10,55],"flag":{"parentsAlive":true},"wealth":["mid","rich"],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"warn","label":"เตือนให้ตรวจสอบก่อน","text":"พ่อแม่ลังเล","when":{"age":[15,55]},"effects":[],
     "roll":[{"p":0.6,"text":"พ่อแม่ฟังและไม่ลงเงิน ไม่นานก็มีข่าวคนโดนหลอก","effects":[{"stat":"bond","d":4}]},{"p":0.4,"text":"พ่อแม่ลงเงินแอบไปแล้ว เงินเก็บหายหมด","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"happy","d":-4}]}]},
    {"id":"trust","label":"ปล่อยให้พ่อแม่ตัดสินใจเอง","text":"ไม่อยากขัดผู้ใหญ่","effects":[],
     "roll":[{"p":0.25,"text":"ได้กำไรมาจริงช่วงสั้นๆ แล้วถอนทัน","effects":[{"money":5,"unit":"wageDay"}]},{"p":0.75,"text":"บริษัทหายไป เงินก้อนสุดท้ายของบ้านไปด้วย","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":-2}]}]},
    {"id":"kid-ask","label":"ถามพ่อแม่ว่าเงินจะได้คืนจริงไหม","text":"พ่อแม่หยุดคิดไปครู่หนึ่ง","when":{"age":[10,14]},"effects":[],"roll":[{"p":0.6,"text":"พ่อแม่ฟังและไม่ลงเงิน ไม่นานก็มีข่าวคนโดนหลอก","effects":[{"stat":"bond","d":4}]},{"p":0.4,"text":"พ่อแม่ลงเงินแอบไปแล้ว เงินเก็บหายหมด","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"happy","d":-4}]}]}
   ]},
  {"id":"fort-house-fire","title":"ไฟไหม้บ้าน","body":"ไฟฟ้าลัดวงจรตอนกลางคืน บ้านไม้ของพ่อแม่ไหม้เกือบหมด ทุกคนรอดออกมาได้","w":6,"when":{"age":[6,50],"flag":{"parentsAlive":true},"wealth":["mid","rich"],"chance":0.1},"cooldown":"once",
   "choices":[
    {"id":"rebuild","label":"ช่วยกันสร้างใหม่แบบเล็กลง","text":"ญาติพี่น้องมาช่วยลงแรง บ้านหลังใหม่เล็กแต่อบอุ่น","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"},{"stat":"bond","d":6},{"stat":"happy","d":-4}]},
    {"id":"fund","label":"ออกเงินสร้างใหม่ทั้งหลัง","text":"เงินเก็บหมด แต่พ่อแม่มีบ้านเหมือนเดิม","when":{"age":[20,50],"money":[40000,999999999]},"effects":[{"money":-90,"unit":"wageDay"},{"stat":"bond","d":10},{"flag":"fort-rescued"}]}
   ]},
  {"id":"fort-child-allowance","title":"เงินขนมหายไป","body":"ช่วงนี้บ้านเงินขาดมือ แม่บอกว่าเงินไปโรงเรียนต้องลดลงครึ่งหนึ่ง","w":12,"when":{"age":[7,15],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor"},"cooldown":"once",
   "choices":[
    {"id":"pack","label":"ห่อข้าวเหนียวไปกินเอง","text":"เพื่อนบางคนแซว แต่ก็อิ่มทุกวัน","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":2},{"stat":"bond","d":3}]},
    {"id":"cry","label":"งอแงขอเท่าเดิม","text":"แม่แอบไปยืมเงินข้างบ้านมาให้","effects":[{"money":-1,"unit":"wageDay"},{"stat":"bond","d":-3},{"stat":"happy","d":1}]}
   ]},
  {"id":"fort-child-fights","title":"พ่อแม่ทะเลาะเรื่องเงิน","body":"กลางดึกได้ยินพ่อแม่เถียงกันเรื่องหนี้","w":12,"when":{"age":[6,17],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor","chance":0.3},"cooldown":12,
   "choices":[
    {"id":"cover","label":"ดึงผ้าห่มคลุมหัว","text":"หลับไปพร้อมความกังวล","effects":[{"stat":"happy","d":-4,"by":"attach"}]},
    {"id":"go","label":"ออกไปกอดแม่","text":"ทั้งคู่เงียบ แล้วพ่อลูบหัวลูก","effects":[{"stat":"bond","d":5},{"stat":"happy","d":-2}]}
   ]},
  {"id":"fort-child-switch","title":"ย้ายโรงเรียนเพราะค่าเทอม","body":"พ่อแม่ส่งโรงเรียนเอกชนในเมืองต่อไม่ไหว ต้องกลับไปเรียนโรงเรียนใกล้บ้าน","w":10,"when":{"age":[8,16],"flag":{"parentsAlive":true,"fort-bankrupt":true},"edu":{"in":["school"]}},"cooldown":"once",
   "choices":[
    {"id":"ok","label":"ตั้งใจเรียนที่ใหม่","text":"ครูที่นี่ใจดี เพื่อนเก่าสมัยเด็กยังอยู่","effects":[{"stat":"know","d":2},{"stat":"happy","d":-1}]},
    {"id":"miss","label":"คิดถึงเพื่อนเก่าจนไม่อยากเรียน","text":"เกรดตกไปหนึ่งเทอม","effects":[{"stat":"know","d":-3},{"stat":"happy","d":-4,"by":"attach"}]}
   ]},
  {"id":"fort-teen-dropout","title":"พ่อแม่ขอให้ออกมาช่วยงาน","body":"ตั้งแต่บ้านเสียหลัก พ่อแม่ส่งเรียนต่อไม่ไหว ถามว่าจะออกมาช่วยทำงานก่อนไหม","w":10,"when":{"age":[15,17],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor","edu":{"in":["school","voc"]}},"cooldown":"once",
   "choices":[
    {"id":"quit","label":"ออกไปทำงานโรงงาน","text":"ได้เงินเดือนแรกส่งให้แม่ แต่ความฝันเรื่องเรียนต้องพักไว้","effects":[{"edu":{"in":null}},{"role":"factory"},{"stat":"bond","d":6},{"stat":"happy","d":-5},{"flag":"fort-dropout"},{"pin":"ออกจากโรงเรียนมาทำงานช่วยบ้าน"}]},
    {"id":"both","label":"เรียนไปด้วย รับจ้างไปด้วย","text":"เหนื่อยแทบขาดใจ แต่ยังได้ไปโรงเรียน","effects":[{"money":4,"unit":"wageDay"},{"stat":"health","d":-4},{"stat":"know","d":-1},{"trait":"grit","d":2}]},
    {"id":"loan","label":"ขอทุนหรือกู้ยืมเรียนต่อ","text":"ครูช่วยเขียนใบสมัครทุน","when":{"year":[1996,2026]},"effects":[{"stat":"know","d":1}],
     "roll":[{"p":0.55,"text":"ได้ทุน เรียนต่อได้โดยไม่เป็นภาระบ้าน","effects":[{"stat":"happy","d":5}]},{"p":0.45,"text":"ไม่ได้ทุน ต้องหาเงินเองต่อ","effects":[{"stat":"happy","d":-3},{"stat":"health","d":-2}]}]}
   ]},
  {"id":"fort-adult-send","title":"บ้านยังลำบาก","body":"หลังบ้านเสียหลัก พ่อแม่อายุมากขึ้นและยังมีหนี้อยู่ โทรมาถามข่าวคราวแต่ไม่กล้าขอเงิน","w":10,"when":{"age":[19,50],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor","noFlag":["fort-sending"]},"cooldown":"once",
   "choices":[
    {"id":"monthly","label":"ส่งเงินให้ทุกเดือน","text":"เงินเดือนเหลือน้อยลง แต่หนี้บ้านลดลงเรื่อยๆ","effects":[{"money":-20,"unit":"wageDay"},{"stat":"bond","d":6},{"flag":"fort-sending"}]},
    {"id":"some","label":"ส่งเป็นครั้งคราว","text":"ช่วยได้ตามกำลัง ไม่ฝืนตัวเอง","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"self","label":"ตั้งตัวให้ได้ก่อน","text":"เก็บเงินสร้างอนาคตตัวเอง แต่รู้สึกผิดทุกครั้งที่กลับบ้าน","effects":[{"stat":"happy","d":-2,"by":"attach"},{"stat":"bond","d":-3}]}
   ]},
  {"id":"fort-recover-slow","title":"บ้านค่อยๆ ฟื้น","body":"หลายปีที่พ่อแม่ทำงานไม่หยุด หนี้ก้อนใหญ่ใกล้หมดแล้ว","w":12,"when":{"age":[8,60],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor","chance":0.3},"cooldown":15,
   "choices":[
    {"id":"cheer","label":"ช่วยงานบ้านงานไร่ให้พ่อแม่ได้พัก","text":"ปีนั้นหนี้หมด บ้านกลับมาพอมีพอกิน","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-recovered"},{"stat":"bond","d":5},{"stat":"health","d":-1},{"pin":"บ้านลุกขึ้นได้อีกครั้ง"}]},
    {"id":"careful","label":"เตือนพ่อแม่อย่าเพิ่งใช้เงินเกินตัว","text":"พ่อแม่ไม่ค่อยพอใจ แต่ก็เก็บเงินต่ออีกปี","when":{"age":[15,60]},"effects":[{"stat":"bond","d":-1}],
     "roll":[{"p":0.6,"text":"ปีถัดมาหนี้หมดพร้อมเงินสำรอง","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-recovered"}]},{"p":0.4,"text":"ยังมีรายจ่ายฉุกเฉินเข้ามา ต้องอดทนต่อ","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"kid-save","label":"หยอดกระปุกช่วยบ้านอีกแรง","text":"พ่อแม่ยิ้ม แล้วตั้งใจเก็บเงินต่ออีกปี","when":{"age":[8,14]},"effects":[{"stat":"bond","d":2}],"roll":[{"p":0.6,"text":"ปีถัดมาหนี้หมดพร้อมเงินสำรอง","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-recovered"}]},{"p":0.4,"text":"ยังมีรายจ่ายฉุกเฉินเข้ามา ต้องอดทนต่อ","effects":[{"stat":"happy","d":-2}]}]}
   ]},
  {"id":"fort-recover-sending","title":"เงินที่ส่งกลับบ้านเห็นผล","body":"เงินที่ส่งทุกเดือนช่วยพ่อแม่ใช้หนี้ที่ค้างอยู่จนหมด","w":16,"when":{"flag":{"parentsAlive":true,"fort-sending":true},"wealth":"poor","chance":0.3},"cooldown":"once",
   "effects":[{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-recovered"},{"stat":"bond","d":6},{"stat":"happy","d":5},{"cond":"proud","turns":3}]},
  {"id":"fort-rescue-rich","title":"ถึงเวลากู้ฐานะบ้าน","body":"ตอนนี้มีกินมีใช้แล้ว แต่บ้านพ่อแม่ยังมีหนี้และหลังคารั่ว","w":16,"when":{"age":[25,65],"flag":{"parentsAlive":true},"wealth":"poor","any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"cooldown":12,
   "choices":[
    {"id":"all","label":"ปลดหนี้และซ่อมบ้านให้ทั้งหมด","text":"พ่อแม่ร้องไห้ บ้านกลับมามั่นคง","effects":[{"money":-120,"unit":"wageDay"},{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-rescued"},{"stat":"bond","d":10},{"stat":"happy","d":5},{"pin":"กู้ฐานะบ้านพ่อแม่"}]},
    {"id":"part","label":"ช่วยครึ่งหนึ่ง ให้พ่อแม่ผ่อนต่อเอง","text":"บ้านหายใจคล่องขึ้น พ่อแม่ยังรู้สึกว่าพึ่งตัวเองได้","effects":[{"money":-50,"unit":"wageDay"},{"stat":"bond","d":4}],
     "roll":[{"p":0.6,"text":"สองปีต่อมาหนี้หมด","effects":[{"wealth":"mid"},{"flag":"fort-recovered"}]},{"p":0.4,"text":"พ่อแม่ผ่อนไม่ไหว ยังติดหนี้ต่อ","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"no","label":"ยังไม่ช่วย กลัวเงินตัวเองไม่พอ","text":"เก็บเงินไว้ แต่ญาติเริ่มพูดถึง","effects":[{"stat":"bond","d":-5},{"stat":"happy","d":-2,"by":"attach"}]}
   ]},
  {"id":"fort-boom-shop","title":"ร้านพ่อขายดี","body":"ร้านซ่อมรถของพ่อมีลูกค้าเยอะขึ้นเรื่อยๆ หลังมีโรงงานมาเปิดใกล้หมู่บ้าน","w":10,"when":{"age":[6,45],"flag":{"fatherAlive":true},"wealth":["poor","mid"],"year":[1985,2026],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"expand","label":"ชวนพ่อขยายร้าน","text":"กู้เงินมาซื้อเครื่องมือ จ้างลูกน้องเพิ่ม","when":{"age":[15,45]},"effects":[{"stat":"bond","d":2}],
     "roll":[{"p":0.6,"text":"ร้านโต บ้านมีเงินเก็บเป็นกอบเป็นกำ","effects":[{"wealth":"rich"},{"flag":"fort-boomed"}]},{"p":0.4,"text":"โรงงานลดคน ลูกค้าหาย หนี้ที่กู้มายังค้าง","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]},
    {"id":"steady","label":"ทำเท่าเดิม เก็บกำไรไว้","text":"ไม่หวือหวาแต่มั่นคง","when":{"age":[15,45]},"effects":[{"flag":"fort-boomed"},{"stat":"happy","d":2}],
     "roll":[{"p":0.6,"text":"เงินเก็บพอกขึ้นจนฐานะบ้านขยับ","effects":[{"wealth":"mid"}]}]},
    {"id":"kid-help","label":"ช่วยพ่อส่งเครื่องมือที่ร้านหลังเลิกเรียน","text":"พ่อดีใจที่มีลูกช่วย แล้วตัดสินใจกู้เงินขยายร้าน","when":{"age":[6,14]},"effects":[{"stat":"bond","d":2}],"roll":[{"p":0.6,"text":"ร้านโต บ้านมีเงินเก็บเป็นกอบเป็นกำ","effects":[{"wealth":"rich"},{"flag":"fort-boomed"}]},{"p":0.4,"text":"โรงงานลดคน ลูกค้าหาย หนี้ที่กู้มายังค้าง","effects":[{"wealth":"poor"},{"flag":"fort-bankrupt"}]}]},
    {"id":"kid-play","label":"ดีใจที่ร้านพ่อมีงานเยอะ แล้วไปเล่นกับเพื่อน","text":"พ่อเลือกทำเท่าเดิม เก็บกำไรไว้ ไม่หวือหวาแต่มั่นคง","when":{"age":[6,14]},"effects":[{"flag":"fort-boomed"},{"stat":"happy","d":2}],"roll":[{"p":0.6,"text":"เงินเก็บพอกขึ้นจนฐานะบ้านขยับ","effects":[{"wealth":"mid"}]}]}
   ]},
  {"id":"fort-land-road","title":"ถนนใหม่ตัดผ่านนา","body":"ถนนเส้นใหม่ตัดผ่านใกล้นาของพ่อแม่ นายหน้ามาถามราคาทุกสัปดาห์","w":10,"when":{"age":[10,60],"flag":{"parentsAlive":true},"wealth":["poor","mid"],"year":[1988,2026],"noFlag":["fort-landless"],"chance":0.13},"cooldown":"once",
   "choices":[
    {"id":"sell","label":"แนะให้ขายแปลงติดถนน","text":"ได้เงินก้อนใหญ่ที่บ้านไม่เคยเห็น","when":{"age":[15,60]},"effects":[{"money":20,"unit":"wageDay"},{"flag":"fort-windfall"},{"stat":"happy","d":5},{"pin":"บ้านขายนาได้ราคาดี"}],
     "roll":[{"p":0.8,"text":"ฐานะบ้านขยับขึ้นทันที","effects":[{"wealth":"mid"}]},{"p":0.2,"text":"บ้านพ้นจากความจนจริงจัง","effects":[{"wealth":"rich"}]}]},
    {"id":"keep","label":"เก็บไว้ ราคาจะขึ้นอีก","text":"นาเดิมยังอยู่ ความหวังยังอยู่","when":{"age":[15,60]},"effects":[],
     "roll":[{"p":0.4,"text":"หลายปีต่อมามีคนมาขอซื้อแพงกว่าเดิมเท่าตัว","effects":[{"wealth":"mid"},{"flag":"fort-windfall"}]},{"p":0.6,"text":"ราคานิ่ง ไม่มีใครมาถามอีก","effects":[{"stat":"happy","d":-1}]}]},
    {"id":"farm","label":"ทำนาต่อ เป็นมรดกให้ลูกหลาน","text":"พ่อยิ้ม ที่ดินนี้ปู่ย่าบุกเบิกมา","when":{"age":[15,60]},"effects":[{"stat":"bond","d":4}]},
    {"id":"kid-field","label":"ขอให้พ่อพาไปดูนาแปลงติดถนน","text":"พ่อเล่าว่าปู่ย่าบุกเบิกที่ตรงนี้มา แล้วตัดสินใจเก็บนาไว้","when":{"age":[10,14]},"effects":[{"stat":"bond","d":4}]},
    {"id":"kid-quiet","label":"นั่งฟังผู้ใหญ่คุยกันเงียบๆ","text":"สุดท้ายพ่อแม่ตกลงขายแปลงติดถนน ได้เงินก้อนที่บ้านไม่เคยเห็น","when":{"age":[10,14]},"effects":[{"money":20,"unit":"wageDay"},{"flag":"fort-windfall"},{"stat":"happy","d":5},{"pin":"บ้านขายนาได้ราคาดี"}],"roll":[{"p":0.8,"text":"ฐานะบ้านขยับขึ้นทันที","effects":[{"wealth":"mid"}]},{"p":0.2,"text":"บ้านพ้นจากความจนจริงจัง","effects":[{"wealth":"rich"}]}]}
   ]},
  {"id":"fort-railway","title":"ทางรถไฟผ่านหมู่บ้าน","body":"โครงการรถไฟสายใหม่ต้องเวนคืนที่ของพ่อแม่บางส่วน ได้เงินชดเชยจากรัฐ","w":10,"when":{"age":[10,60],"year":[2021,2026],"flag":{"parentsAlive":true},"wealth":["poor","mid"],"noFlag":["fort-landless"],"chance":0.13},"cooldown":"once",
   "choices":[
    {"id":"debt","label":"เอาเงินไปปลดหนี้ก่อน","text":"บ้านหมดหนี้ นอนหลับสบาย","when":{"age":[15,60]},"effects":[{"wealth":"mid"},{"flag":"fort-windfall"},{"stat":"happy","d":4}]},
    {"id":"land","label":"ซื้อที่ดินแปลงใหม่ไกลออกไป","text":"ได้ที่มากกว่าเดิม แต่ต้องตั้งต้นใหม่","when":{"age":[15,60]},"effects":[{"stat":"happy","d":1}],
     "roll":[{"p":0.5,"text":"ดินดี น้ำถึง ฐานะบ้านดีขึ้น","effects":[{"wealth":"mid"}]},{"p":0.5,"text":"ดินเค็ม ทำนาไม่ได้ผล","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"kid-quiet","label":"นั่งฟังพ่อแม่ปรึกษากันเงียบๆ","text":"พ่อแม่เอาเงินชดเชยไปปลดหนี้ก่อน คืนนั้นทั้งบ้านนอนหลับสบาย","when":{"age":[10,14]},"effects":[{"wealth":"mid"},{"flag":"fort-windfall"},{"stat":"happy","d":4}]},
    {"id":"kid-help","label":"ช่วยพ่อแม่ขนของออกจากแปลงที่ถูกเวนคืน","text":"พ่อแม่เอาเงินไปซื้อที่แปลงใหม่ไกลออกไป ต้องตั้งต้นใหม่","when":{"age":[10,14]},"effects":[{"stat":"happy","d":1}],"roll":[{"p":0.5,"text":"ดินดี น้ำถึง ฐานะบ้านดีขึ้น","effects":[{"wealth":"mid"}]},{"p":0.5,"text":"ดินเค็ม ทำนาไม่ได้ผล","effects":[{"stat":"happy","d":-3}]}]}
   ]},
  {"id":"fort-lottery","title":"พ่อแม่ถูกหวย","body":"เลขที่แม่ซื้อทุกงวดออกตรงเป๊ะ ทั้งหมู่บ้านรู้ภายในเย็นนั้น","w":2,"when":{"age":[6,60],"flag":{"parentsAlive":true},"wealth":["poor","mid"],"chance":0.05},"cooldown":"once",
   "choices":[
    {"id":"house","label":"ขอให้พ่อแม่สร้างบ้านใหม่","text":"บ้านปูนสองชั้นหลังแรกในซอย","effects":[{"wealth":"rich"},{"flag":"fort-windfall"},{"flag":"fort-showoff"},{"stat":"happy","d":8},{"pin":"บ้านถูกหวย"}]},
    {"id":"save","label":"ขอให้ปลดหนี้แล้วเก็บเงินไว้เงียบๆ","text":"ภายนอกเหมือนเดิม แต่ไม่ต้องกังวลเรื่องเงินอีก","effects":[{"wealth":"mid"},{"flag":"fort-windfall"},{"stat":"happy","d":5}]},
    {"id":"party","label":"ขอให้เลี้ยงฉลองทั้งหมู่บ้าน","text":"สนุกสามวันสามคืน","effects":[{"stat":"happy","d":6},{"stat":"bond","d":3},{"flag":"fort-showoff"}],
     "roll":[{"p":0.5,"text":"ที่เหลือยังพอยกฐานะบ้าน","effects":[{"wealth":"mid"}]},{"p":0.5,"text":"เงินหมดเร็วกว่าที่คิด","effects":[]}]}
   ]},
  {"id":"fort-inherit","title":"มรดกจากญาติ","body":"ญาติผู้ใหญ่ที่ไม่มีลูกเสียชีวิต ทิ้งที่ดินและเงินไว้ให้พ่อแม่","w":6,"when":{"age":[8,55],"flag":{"parentsAlive":true},"wealth":["poor","mid"],"chance":0.1},"cooldown":"once",
   "choices":[
    {"id":"share","label":"แนะให้แบ่งญาติคนอื่นด้วย","text":"เงินน้อยลง แต่ไม่มีใครผิดใจกัน","when":{"age":[15,55]},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}],
     "roll":[{"p":0.5,"text":"ส่วนที่เหลือยังพอยกฐานะบ้าน","effects":[{"wealth":"mid"}]}]},
    {"id":"keep","label":"เก็บไว้ทั้งหมด","text":"ฐานะบ้านดีขึ้น แต่ญาติบางคนเลิกทักทาย","when":{"age":[15,55]},"effects":[{"wealth":"mid"},{"flag":"fort-windfall"},{"flag":"fort-showoff"},{"stat":"happy","d":2}]},
    {"id":"kid-help","label":"ไปช่วยงานศพญาติกับพ่อแม่","text":"พ่อแม่แบ่งมรดกให้ญาติคนอื่นด้วย ไม่มีใครผิดใจกัน","when":{"age":[8,14]},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}],"roll":[{"p":0.5,"text":"ส่วนที่เหลือยังพอยกฐานะบ้าน","effects":[{"wealth":"mid"}]}]},
    {"id":"kid-quiet","label":"ไม่ยุ่งเรื่องของผู้ใหญ่","text":"พ่อแม่เก็บมรดกไว้ทั้งหมด ฐานะบ้านดีขึ้น แต่ญาติบางคนเลิกทักทาย","when":{"age":[8,14]},"effects":[{"wealth":"mid"},{"flag":"fort-windfall"},{"flag":"fort-showoff"},{"stat":"happy","d":2}]}
   ]},
  {"id":"fort-sibling-abroad","title":"พี่น้องส่งเงินจากต่างประเทศ","body":"พี่น้องที่ไปทำงานเมืองนอกส่งเงินกลับบ้านทุกเดือน บ้านเริ่มมีเงินเก็บ","w":8,"when":{"age":[8,55],"flag":{"parentsAlive":true,"hasSiblings":true},"wealth":"poor","year":[1978,2026],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"thanks","label":"ขอบคุณพี่น้อง แล้วช่วยงานบ้านเต็มที่","text":"พ่อแม่ใช้หนี้หมด บ้านพอมีพอกิน","effects":[{"wealth":"mid"},{"stat":"bond","d":4}]},
    {"id":"envy","label":"แอบน้อยใจที่ตัวเองช่วยได้น้อยกว่า","text":"เงินช่วยบ้าน แต่ใจหนักอยู่ลึกๆ","effects":[{"wealth":"mid"},{"stat":"happy","d":-3,"by":"attach"}]}
   ]},
  {"id":"fort-developer","title":"บริษัทมาขอซื้อที่","body":"บริษัทพัฒนาที่ดินในเมืองอยากซื้อที่สวนของพ่อแม่ทำหมู่บ้านจัดสรร","w":8,"when":{"age":[18,60],"flag":{"parentsAlive":true},"wealth":"mid","setting":"urban","year":[1990,2026],"noFlag":["fort-landless"],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"sell","label":"ขายให้ราคาดี","text":"เงินก้อนโต แต่สวนที่โตมาหายไป","effects":[{"wealth":"rich"},{"flag":"fort-windfall"},{"stat":"happy","d":2},{"stat":"bond","d":-1}]},
    {"id":"no","label":"ไม่ขาย","text":"สวนยังอยู่ พ่อแม่ยังมีที่เดินเล่นตอนเช้า","effects":[{"stat":"bond","d":3}]}
   ]},
  {"id":"fort-compensation","title":"เงินชดเชยจากรัฐ","body":"หลังน้ำท่วมใหญ่ รัฐจ่ายเงินชดเชยนาเสียหายและมีโครงการพักหนี้เกษตรกร","w":8,"when":{"age":[8,60],"flag":{"parentsAlive":true,"fort-bankrupt":true},"wealth":"poor","year":[2001,2026],"chance":0.25},"cooldown":"once",
   "choices":[
    {"id":"debt","label":"ช่วยพ่อแม่ยื่นเอกสารครบ","text":"วิ่งเรื่องอยู่หลายวัน","when":{"age":[15,60]},"effects":[{"stat":"happy","d":-1}],
     "roll":[{"p":0.6,"text":"ได้พักหนี้ บ้านเริ่มตั้งหลักได้","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-recovered"},{"stat":"bond","d":4}]},{"p":0.4,"text":"ได้เงินชดเชยนิดหน่อย พอซื้อพันธุ์ข้าว","effects":[{"money":2,"unit":"wageDay"}]}]},
    {"id":"skip","label":"ปล่อยให้พ่อแม่จัดการเอง","text":"เอกสารขาดไปหนึ่งแผ่น เรื่องเลยค้าง","effects":[{"stat":"bond","d":-1}]},
    {"id":"kid-help","label":"ไปเป็นเพื่อนพ่อแม่ที่อำเภอ","text":"นั่งรอทั้งวันระหว่างพ่อแม่ยื่นเอกสาร","when":{"age":[8,14]},"effects":[{"stat":"happy","d":-1}],"roll":[{"p":0.6,"text":"ได้พักหนี้ บ้านเริ่มตั้งหลักได้","effects":[{"wealth":"mid"},{"flag":"fort-bankrupt","v":false},{"flag":"fort-recovered"},{"stat":"bond","d":4}]},{"p":0.4,"text":"ได้เงินชดเชยนิดหน่อย พอซื้อพันธุ์ข้าว","effects":[{"money":2,"unit":"wageDay"}]}]}
   ]},
  {"id":"fort-windfall-use","title":"เงินก้อนนี้จะเอาไปทำอะไร","body":"บ้านมีเงินก้อนแล้ว พ่อแม่ถามความเห็นว่าจะใช้ยังไงดี","w":14,"when":{"age":[15,60],"flag":{"parentsAlive":true,"fort-windfall":true},"noFlag":["fort-used"]},"cooldown":"once",
   "choices":[
    {"id":"land","label":"ซื้อนาเพิ่ม","text":"มีที่ทำกินมากขึ้น ลูกหลานมีมรดก","effects":[{"flag":"fort-used"},{"stat":"bond","d":3}],
     "roll":[{"p":0.5,"text":"ที่แปลงใหม่ให้ผลดี บ้านมั่นคงขึ้นอีก","effects":[{"wealth":"rich"}]}]},
    {"id":"school","label":"เก็บไว้เป็นทุนเรียนลูกหลาน","text":"ไม่ได้เห็นผลทันที แต่อุ่นใจ","effects":[{"flag":"fort-used"},{"stat":"know","d":2},{"stat":"happy","d":1}]},
    {"id":"car","label":"ดาวน์รถกระบะคันใหม่","text":"พ่อขับไปงานบุญอย่างภูมิใจ","effects":[{"flag":"fort-used"},{"flag":"fort-showoff"},{"stat":"happy","d":5}],
     "roll":[{"p":0.4,"text":"ค่างวดหนักกว่าที่คิด ฐานะบ้านถอยลง","effects":[{"wealth":"mid"}]}]}
   ]},
  {"id":"fort-relatives-borrow","title":"ญาติแห่มายืมเงิน","body":"พอรู้ว่าบ้านเรามีเงิน ญาติหลายคนมาขอยืม บางคนยังไม่เคยคืนของเก่า","w":12,"when":{"age":[12,60],"flag":{"parentsAlive":true,"fort-showoff":true},"wealth":["mid","rich"]},"cooldown":"once",
   "choices":[
    {"id":"lend","label":"ให้ยืมทุกคน","text":"ญาติชมไม่ขาดปาก","when":{"age":[15,60]},"effects":[{"stat":"bond","d":2}],
     "roll":[{"p":0.4,"text":"ได้คืนเกือบครบ","effects":[]},{"p":0.6,"text":"ไม่มีใครคืน เงินเก็บบ้านหายไปมาก","effects":[{"wealth":"mid"},{"stat":"happy","d":-4}]}]},
    {"id":"refuse","label":"ช่วยพ่อแม่ปฏิเสธอย่างสุภาพ","text":"เงินยังอยู่ แต่มีคนนินทา","when":{"age":[15,60]},"effects":[{"stat":"happy","d":-2},{"trait":"social","d":-1}]},
    {"id":"kid-quiet","label":"หลบไปเล่นหลังบ้าน ไม่ยุ่งเรื่องผู้ใหญ่","text":"พ่อแม่ใจอ่อน ให้ญาติยืมเกือบทุกคน","when":{"age":[12,14]},"effects":[{"stat":"bond","d":2}],"roll":[{"p":0.4,"text":"ได้คืนเกือบครบ","effects":[]},{"p":0.6,"text":"ไม่มีใครคืน เงินเก็บบ้านหายไปมาก","effects":[{"wealth":"mid"},{"stat":"happy","d":-4}]}]},
    {"id":"kid-help","label":"ช่วยแม่จดว่าใครยืมไปเท่าไร","text":"พ่อแม่ให้ยืมบางคน แล้วจดไว้ทุกบาท","when":{"age":[12,14]},"effects":[{"stat":"bond","d":2}],"roll":[{"p":0.6,"text":"ได้คืนเกือบครบ","effects":[]},{"p":0.4,"text":"บางคนไม่คืน เงินเก็บบ้านหายไปบ้าง","effects":[{"wealth":"mid"},{"stat":"happy","d":-2}]}]}
   ]},
  {"id":"fort-envy-scam","title":"มีคนมาชวนพ่อแม่ลงทุน","body":"คนแปลกหน้ารู้ข่าวว่าบ้านเรามีเงิน มาชวนลงทุนน้ำมันกำไรเดือนละสิบเปอร์เซ็นต์","w":10,"when":{"age":[12,60],"flag":{"parentsAlive":true,"fort-windfall":true},"wealth":"rich"},"cooldown":"once",
   "choices":[
    {"id":"stop","label":"ห้ามพ่อแม่เด็ดขาด","text":"พ่อไม่พอใจที่ลูกขัด","when":{"age":[15,60]},"effects":[{"stat":"bond","d":-2}],
     "roll":[{"p":0.7,"text":"ไม่นานข่าวออกว่าเป็นแชร์ลูกโซ่ พ่อขอบใจลูก","effects":[{"stat":"bond","d":5}]},{"p":0.3,"text":"พ่อแอบลงเงินไปบางส่วน","effects":[{"wealth":"mid"}]}]},
    {"id":"small","label":"ให้ลองลงเงินน้อยๆ","text":"เดือนแรกได้กำไรจริง พ่อแม่ลงเพิ่ม แล้วคนชวนก็หายไปพร้อมเงิน","when":{"age":[15,60]},"effects":[{"wealth":"mid"},{"stat":"happy","d":-4},{"flag":"fort-scam-hit"}]},
    {"id":"kid-ask","label":"เล่าให้พ่อแม่ฟังว่าครูเคยสอนเรื่องแชร์ลูกโซ่","text":"พ่อหัวเราะ แต่ก็เก็บไปคิด","when":{"age":[12,14]},"effects":[],"roll":[{"p":0.7,"text":"ไม่นานข่าวออกว่าเป็นแชร์ลูกโซ่ พ่อขอบใจลูก","effects":[{"stat":"bond","d":5}]},{"p":0.3,"text":"พ่อแอบลงเงินไปบางส่วน","effects":[{"wealth":"mid"}]}]},
    {"id":"kid-quiet","label":"ไม่กล้าพูดอะไร","text":"เดือนแรกได้กำไรจริง พ่อแม่ลงเพิ่ม แล้วคนชวนก็หายไปพร้อมเงิน","when":{"age":[12,14]},"effects":[{"wealth":"mid"},{"stat":"happy","d":-4},{"flag":"fort-scam-hit"}]}
   ]},
  {"id":"fort-child-newhouse","title":"บ้านใหม่","body":"ฐานะที่บ้านดีขึ้น พ่อแม่สร้างบ้านปูนหลังใหม่ ได้ห้องนอนของตัวเองครั้งแรก","w":12,"when":{"age":[6,17],"flag":{"parentsAlive":true},"any":[{"flag":{"fort-windfall":true}},{"flag":{"fort-boomed":true}},{"flag":{"fort-recovered":true}}],"wealth":["mid","rich"]},"cooldown":"once",
   "choices":[
    {"id":"proud","label":"ชวนเพื่อนมาดูบ้าน","text":"เพื่อนบางคนตื่นเต้น บางคนเงียบไป","effects":[{"stat":"happy","d":5},{"trait":"social","d":1}],
     "roll":[{"p":0.3,"text":"เพื่อนสนิทคนหนึ่งเริ่มห่างเหิน","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"humble","label":"ดีใจเงียบๆ กับพ่อแม่","text":"คืนแรกในห้องใหม่นอนหลับสบาย","effects":[{"stat":"happy","d":3},{"stat":"bond","d":3}]}
   ]},
  {"id":"fort-child-pocket-up","title":"เงินขนมเพิ่มขึ้น","body":"ช่วงนี้กิจการที่บ้านดี แม่ให้เงินไปโรงเรียนเพิ่ม","w":10,"when":{"age":[7,17],"flag":{"parentsAlive":true},"any":[{"flag":{"fort-windfall":true}},{"flag":{"fort-boomed":true}}],"wealth":["mid","rich"]},"cooldown":"once",
   "choices":[
    {"id":"save","label":"หยอดกระปุกครึ่งหนึ่ง","text":"สิ้นปีมีเงินเก็บของตัวเอง","effects":[{"money":3,"unit":"wageDay"},{"trait":"grit","d":1}]},
    {"id":"spend","label":"เลี้ยงเพื่อนทุกวัน","text":"เพื่อนเยอะขึ้น กระปุกว่างเปล่า","effects":[{"stat":"happy","d":4},{"trait":"social","d":1}]}
   ]},
  {"id":"fort-rich-slide","title":"รายได้บ้านหดลง","body":"ลูกค้าประจำของพ่อแม่ย้ายไปซื้อที่ห้างในเมือง ยอดขายตกลงทุกปี","w":8,"when":{"age":[6,55],"flag":{"parentsAlive":true},"wealth":"rich","year":[1995,2026],"chance":0.15},"cooldown":"once",
   "choices":[
    {"id":"adapt","label":"เสนอให้เปลี่ยนสินค้าตามยุค","text":"พ่อแม่ลองของใหม่","when":{"age":[15,55]},"effects":[{"stat":"bond","d":2}],
     "roll":[{"p":0.5,"text":"ลูกค้ากลุ่มใหม่ตามมา ร้านยังไปได้","effects":[]},{"p":0.5,"text":"ไม่ทันคู่แข่ง ฐานะบ้านถอยลงหนึ่งขั้น","effects":[{"wealth":"mid"}]}]},
    {"id":"shrink","label":"แนะให้ลดขนาดร้าน","text":"รายได้น้อยลง แต่ไม่มีหนี้","when":{"age":[15,55]},"effects":[{"wealth":"mid"},{"stat":"happy","d":-1}]},
    {"id":"kid-help","label":"ช่วยพ่อแม่เฝ้าร้านช่วงเย็น","text":"พ่อแม่ลองหาของใหม่มาขาย","when":{"age":[6,14]},"effects":[{"stat":"bond","d":2}],"roll":[{"p":0.5,"text":"ลูกค้ากลุ่มใหม่ตามมา ร้านยังไปได้","effects":[]},{"p":0.5,"text":"ไม่ทันคู่แข่ง ฐานะบ้านถอยลงหนึ่งขั้น","effects":[{"wealth":"mid"}]}]},
    {"id":"kid-save","label":"ขอค่าขนมน้อยลงเพื่อช่วยบ้าน","text":"แม่ยิ้ม แล้วตัดสินใจลดขนาดร้าน รายได้น้อยลงแต่ไม่มีหนี้","when":{"age":[6,14]},"effects":[{"wealth":"mid"},{"stat":"happy","d":-1}]}
   ]}
]);
