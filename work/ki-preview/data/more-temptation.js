globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"tmp-abroad-meet","title":"คนใหม่ที่ไซต์งานต่างแดน","body":"ทำงานเมืองนอกมานาน มีเพื่อนร่วมงานคนหนึ่งคอยดูแลชวนกินข้าวทุกเย็น ขณะที่คนที่บ้านโทรมาน้อยลงทุกที","when":{"age":[20,50],"loc":"abroad","flag":{"partner":true},"noFlag":["tmp-cheated","tmp-affair"],"chance":0.2},"cooldown":"once","heavy":true,
   "choices":[
    {"id":"faithful","label":"รักษาระยะ แล้วโทรหาที่บ้านให้บ่อยขึ้น","text":"ค่าโทรเพิ่มขึ้น แต่เสียงคนที่บ้านทำให้ใจนิ่ง","effects":[{"stat":"bond","d":5},{"stat":"happy","d":-2},{"money":-3,"unit":"wageDay"},{"cond":"homesick","turns":2},{"inc":"good"}]},
    {"id":"flirt","label":"คุยกันสนิทใจ แต่ไม่ไปไกลกว่านั้น","text":"มีคนให้ระบายทุกเย็น ใจเริ่มห่างจากบ้านโดยไม่รู้ตัว","effects":[{"stat":"happy","d":4},{"stat":"bond","d":-4},{"flag":"tmp-affair"}]},
    {"id":"night","label":"ค้างคืนด้วยกัน","text":"ความเหงาชนะ มีความสัมพันธ์กันลับๆ ต่อมาอีกหลายเดือน","effects":[{"stat":"happy","d":5},{"stat":"bond","d":-6},{"flag":"tmp-cheated"},{"flag":"tmp-affair"},{"inc":"vice"},{"inc":"risky"}]},
    {"id":"honest","label":"โทรบอกเลิกกับคนที่บ้านตรงๆ","text":"บอกความจริงทั้งที่เจ็บ ทั้งสองฝ่ายร้องไห้ แต่ไม่มีใครถูกหลอก","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"stat":"happy","d":-6},{"stat":"bond","d":-5},{"cond":"heartbroken","turns":3,"by":"attach"},{"pin":"เลิกรากับคนที่บ้านระหว่างทำงานเมืองนอก"}]},
    {"id":"bring","label":"เก็บเงินพาคนที่บ้านมาทำงานด้วยกัน","text":"ต้องจ่ายค่าเอเจนซี่ก้อนใหญ่ แต่ได้อยู่ใกล้กันอีกครั้ง","when":{"money":[40000,99999999]},"effects":[{"money":-60,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":4},{"uncond":"homesick"}]}
   ]},
  {"id":"tmp-bkk-meet","title":"คนข้างห้องเช่าในกรุงเทพฯ","body":"มาทำงานกรุงเทพฯ คนเดียว แฟนอยู่บ้าน คนข้างห้องชวนไปกินหมูกระทะกับร้องคาราโอเกะทุกวันศุกร์","when":{"age":[18,45],"loc":"bangkok","flag":{"partner":true},"noFlag":["tmp-cheated","tmp-affair"],"chance":0.15},"cooldown":"once","heavy":true,
   "choices":[
    {"id":"faithful","label":"ไปกับเพื่อนกลุ่มใหญ่ กลับห้องเร็ว","text":"สนุกพอประมาณ วันหยุดยาวรีบกลับบ้านไปหาแฟน","effects":[{"stat":"bond","d":4},{"money":-4,"unit":"wageDay"},{"inc":"good"}]},
    {"id":"flirt","label":"นั่งคุยกันหน้าห้องดึกๆ ทุกคืน","text":"มีคนเข้าใจชีวิตในเมือง แต่แฟนที่บ้านเริ่มรู้สึกว่าคุยกันน้อยลง","effects":[{"stat":"happy","d":3},{"stat":"bond","d":-3},{"flag":"tmp-affair"}]},
    {"id":"night","label":"ค้างคืนด้วยกัน","text":"เริ่มมีความสัมพันธ์ลับๆ ต้องคอยปิดบังทุกครั้งที่ติดต่อกับคนที่บ้าน","effects":[{"stat":"happy","d":4},{"stat":"bond","d":-5},{"flag":"tmp-cheated"},{"flag":"tmp-affair"},{"inc":"vice"},{"inc":"risky"}]},
    {"id":"home","label":"ลาออกกลับไปอยู่บ้านกับแฟน","text":"รายได้หายไปครึ่ง แต่ได้อยู่ด้วยกันทุกวัน","effects":[{"move":"home"},{"role":"farmer"},{"stat":"bond","d":6},{"money":-10,"unit":"wageDay"}]}
   ]},
  {"id":"tmp-online-meet","title":"ข้อความจากคนแปลกหน้า","body":"มีคนทักมาทางโซเชียล คุยถูกคอ ชมทุกวัน ทั้งที่มีแฟนอยู่แล้ว","when":{"age":[18,50],"year":[2009,2026],"flag":{"partner":true},"noFlag":["tmp-affair"],"chance":0.06},"cooldown":"once",
   "choices":[
    {"id":"block","label":"บอกตรงๆ ว่ามีแฟนแล้ว แล้วเลิกคุย","text":"เสียดายนิดหน่อย แต่ไม่มีอะไรต้องปิดบัง","effects":[{"stat":"happy","d":-1},{"stat":"bond","d":2},{"inc":"good"}]},
    {"id":"chat","label":"คุยต่อเงียบๆ","text":"ได้ความตื่นเต้นกลับมา แต่ต้องลบแชตทุกคืน","effects":[{"stat":"happy","d":3},{"flag":"tmp-affair"}],
     "roll":[{"p":0.25,"text":"สุดท้ายอีกฝ่ายขอยืมเงินด่วน พอโอนไปก็ติดต่อไม่ได้อีกเลย","effects":[{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-6}]}]},
    {"id":"meet","label":"นัดเจอตัวจริง","text":"เจอกันแล้วถูกใจ เรื่องเลยเกินคำว่าเพื่อน","effects":[{"flag":"tmp-affair"},{"flag":"tmp-cheated"},{"stat":"happy","d":4},{"stat":"bond","d":-4},{"inc":"vice"},{"inc":"risky"}]}
   ]},
  {"id":"tmp-found-out","title":"ความลับถูกเปิดเผย","body":"คนที่บ้านจับพิรุธได้ หรือมีคนรู้จักเอาไปเล่าต่อ ทุกอย่างพังลงในคืนเดียว","when":{"age":[18,60],"flag":{"partner":true,"tmp-affair":true},"noFlag":["tmp-exposed"],"chance":0.3},"cooldown":"once","major":true,
   "choices":[
    {"id":"beg","label":"ยอมรับผิด ขอโอกาส","text":"ใช้เวลาอีกนานกว่าความไว้ใจจะกลับมา","effects":[{"flag":"tmp-exposed"},{"flag":"tmp-affair","v":false},{"stat":"happy","d":-6},{"stat":"bond","d":-5}],
     "roll":[{"p":0.55,"text":"อีกฝ่ายยอมให้อภัย แต่ขอให้เลิกติดต่อคนนั้นเด็ดขาด","effects":[{"stat":"bond","d":3}]},{"p":0.45,"text":"อีกฝ่ายรับไม่ได้ ขอแยกทาง","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"heartbroken","turns":4,"by":"attach"},{"pin":"แยกทางเพราะนอกใจ"}]}]},
    {"id":"deny","label":"ปฏิเสธหัวชนฝา","text":"บ้านเงียบเป็นป่าช้า ความสงสัยไม่เคยหายไป","effects":[{"flag":"tmp-exposed"},{"stat":"bond","d":-8},{"stat":"happy","d":-4}],
     "roll":[{"p":0.4,"text":"หลักฐานชัดเกินไป อีกฝ่ายเก็บของกลับบ้านพ่อแม่","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"heartbroken","turns":4,"by":"attach"}]}]},
    {"id":"leave","label":"เลือกไปอยู่กับคนใหม่","text":"เริ่มต้นใหม่ แต่ญาติทั้งสองฝ่ายมองด้วยสายตาไม่ดี","effects":[{"flag":"tmp-exposed"},{"flag":"married","v":false},{"stat":"bond","d":-10},{"stat":"happy","d":2},{"money":-15,"unit":"wageDay"},{"pin":"ทิ้งคนเก่าไปอยู่กับคนใหม่"}]}
   ]},
  {"id":"tmp-outside-child","title":"ข่าวจากคนเก่า","body":"คนที่เคยค้างคืนด้วยกันส่งข่าวมาว่าตั้งครรภ์ และยืนยันว่าเป็นลูกของคุณ","when":{"age":[18,55],"sex":"m","flag":{"tmp-cheated":true},"noFlag":["tmp-outchild"],"chance":0.12},"cooldown":"once","major":true,"heavy":true,
   "choices":[
    {"id":"accept","label":"รับเป็นพ่อ ส่งเสียตามหน้าที่","text":"ต้องแบ่งเงินทุกเดือน และต้องเล่าความจริงให้ที่บ้านฟัง","effects":[{"flag":"tmp-outchild"},{"flag":"newChild"},{"money":-30,"unit":"wageDay"},{"stat":"bond","d":-6},{"stat":"happy","d":-3},{"pin":"มีลูกนอกสมรส"}]},
    {"id":"money","label":"แอบส่งเงินให้ แต่ไม่บอกใคร","text":"ความลับยังอยู่ แต่ต้องโกหกต่อไปเรื่อยๆ","effects":[{"flag":"tmp-outchild"},{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-5},{"flag":"tmp-affair"}]},
    {"id":"refuse","label":"ปฏิเสธไม่รับรู้","text":"ตัดขาดได้ แต่เรื่องนี้ค้างอยู่ในใจไม่หาย","effects":[{"flag":"tmp-outchild"},{"stat":"happy","d":-6},{"trait":"attach","d":-2},{"inc":"vice"}]}
   ]},
  {"id":"tmp-partner-cheats","title":"ข่าวลือจากบ้าน","body":"เพื่อนที่บ้านโทรมาเล่าว่าแฟนของคุณไปมาหาสู่กับคนในหมู่บ้านบ่อยผิดปกติ ระหว่างที่คุณไม่อยู่","when":{"age":[20,55],"loc":["abroad","bangkok"],"flag":{"partner":true},"noFlag":["tmp-betrayed"],"partnerYears":[2,60],"chance":0.08},"cooldown":"once","major":true,
   "choices":[
    {"id":"home","label":"ลางานกลับไปคุยกันต่อหน้า","text":"เสียค่าเดินทางก้อนใหญ่ แต่ได้รู้ความจริงจากปากอีกฝ่าย","effects":[{"flag":"tmp-betrayed"},{"money":-20,"unit":"wageDay"}],
     "roll":[{"p":0.5,"text":"แค่ข่าวลือ ทั้งคู่กอดกันแล้วตกลงจะไม่อยู่ห่างกันนานอีก","effects":[{"stat":"bond","d":6},{"stat":"happy","d":4}]},{"p":0.5,"text":"เป็นเรื่องจริง อีกฝ่ายบอกว่าเหงาเกินทน","effects":[{"stat":"happy","d":-8,"by":"attach"},{"cond":"heartbroken","turns":4,"by":"attach"}]}]},
    {"id":"forgive","label":"ไม่ซักถาม ส่งเงินกลับบ้านเหมือนเดิม","text":"ทำใจกว้าง แต่บางคืนก็นอนไม่หลับ","effects":[{"flag":"tmp-betrayed"},{"stat":"happy","d":-4},{"trait":"grit","d":2}]},
    {"id":"split","label":"บอกเลิกทางโทรศัพท์","text":"จบทุกอย่าง เงินที่ส่งไปสร้างบ้านก็ต้องมาแบ่งกันวุ่นวาย","effects":[{"flag":"tmp-betrayed"},{"flag":"partner","v":false},{"flag":"married","v":false},{"money":-25,"unit":"wageDay"},{"cond":"heartbroken","turns":4,"by":"attach"},{"pin":"เลิกกับแฟนที่บ้านระหว่างทำงานไกล"}]},
    {"id":"drink","label":"ไม่พูดอะไร ดื่มให้ลืม","text":"ความเจ็บไม่หายไปไหน แต่ขวดเหล้าเพิ่มขึ้นทุกอาทิตย์","effects":[{"flag":"tmp-betrayed"},{"flag":"drinker"},{"inc":"vice"},{"stat":"health","d":-4},{"stat":"happy","d":-5}]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"tmp-karaoke","title":"ร้านคาราโอเกะหลังเลิกงาน","body":"เพื่อนร่วมงานลากไปร้านคาราโอเกะที่มีพนักงานนั่งดริงก์ ขณะที่คนที่บ้านรออยู่ไกล","w":6,"when":{"age":[20,55],"loc":["abroad","bangkok"],"flag":{"partner":true},"chance":0.3},"cooldown":10,"heavy":true,
   "choices":[
    {"id":"sing","label":"ร้องเพลงสองสามเพลงแล้วกลับ","text":"เพื่อนว่าเป็นคนเรียบร้อย แต่ก็ได้หัวเราะบ้าง","effects":[{"money":-2,"unit":"wageDay"},{"stat":"happy","d":2}]},
    {"id":"stay","label":"อยู่ยาวจนร้านปิด แล้วไปต่อ","text":"เมาจนจำไม่ได้ว่าจบคืนนั้นที่ไหน","effects":[{"money":-8,"unit":"wageDay"},{"stat":"health","d":-2},{"inc":"vice"},{"inc":"risky"},{"flag":"tmp-cheated"}]},
    {"id":"no","label":"ปฏิเสธ ขอกลับไปโทรหาที่บ้าน","text":"เพื่อนบางคนแซวว่ากลัวแฟน แต่เงินอยู่ครบ","effects":[{"stat":"bond","d":3},{"trait":"social","d":-1},{"inc":"good"}]}
   ]},
  {"id":"tmp-std-worry","title":"อาการผิดปกติ","body":"หลังจากใช้ชีวิตหวือหวามาพักหนึ่ง เริ่มมีอาการที่ไม่กล้าบอกใคร","w":8,"when":{"age":[18,60],"counter":{"risky":[2,99]},"chance":0.25},"cooldown":12,"heavy":true,
   "choices":[
    {"id":"test","label":"ไปตรวจที่โรงพยาบาล","text":"อายหมอนิดหน่อย แต่ได้ยารักษาตรงจุด","effects":[{"money":-3,"unit":"wageDay"},{"stat":"health","d":3},{"inc":"risky","d":-1},{"inc":"responsible"}],
     "roll":[{"p":0.15,"text":"ผลเลือดพบเชื้อเอชไอวี หมอแนะนำให้กินยาต้านต่อเนื่องและนัดตรวจทุกระยะ","effects":[{"flag":"tmp-hiv"},{"stat":"happy","d":-10},{"pin":"รู้ผลเลือดติดเชื้อเอชไอวี"}]}]},
    {"id":"pharm","label":"ซื้อยาร้านขายยามากินเอง","text":"อาการทุเลาลง แต่ไม่รู้ว่าหายจริงหรือไม่","effects":[{"money":-1,"unit":"wageDay"},{"stat":"health","d":-2}]},
    {"id":"ignore","label":"ปล่อยไว้ เดี๋ยวก็หาย","text":"ไม่เสียเงิน แต่ร่างกายทรุดลงเรื่อยๆ","effects":[{"stat":"health","d":-6},{"inc":"risky"}]}
   ]},
  {"id":"tmp-hiv-old","title":"ป่วยเรื้อรังไม่หาย","body":"ป่วยกระเสาะกระแสะเป็นปีโดยไม่เคยไปตรวจเลือด ทั้งที่ช่วงหนึ่งใช้ชีวิตเสี่ยงหลายครั้ง","w":6,"when":{"age":[20,60],"counter":{"risky":[4,99]},"noFlag":["tmp-hiv"],"chance":0.2},"cooldown":12,"heavy":true,
   "choices":[
    {"id":"test","label":"ตัดสินใจไปตรวจเลือด","text":"ได้รู้ความจริงและเริ่มรักษา","effects":[{"inc":"risky","d":-2},{"money":-3,"unit":"wageDay"}],
     "roll":[{"p":0.4,"text":"พบเชื้อเอชไอวี หมอนัดรับยาต้านไวรัส","effects":[{"flag":"tmp-hiv"},{"stat":"happy","d":-10}]},{"p":0.6,"text":"ไม่พบเชื้อ เป็นแค่โรคทั่วไป โล่งอกไปทั้งตัว","effects":[{"stat":"happy","d":5}]}]},
    {"id":"hide","label":"กลัวผลตรวจ ไม่ยอมไป","text":"ร่างกายผอมลง ญาติเริ่มกังวล","effects":[{"stat":"health","d":-8},{"die":"hiv","p":0.03}]}
   ]},
  {"id":"tmp-arv","title":"ยาต้านไวรัส","body":"ต้องกินยาตรงเวลาทุกวัน และไปรับยาที่โรงพยาบาลชุมชนตามนัด","w":10,"when":{"flag":{"tmp-hiv":true},"chance":0.4},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"keep","label":"กินยาสม่ำเสมอ ไม่ขาดนัด","text":"ร่างกายแข็งแรงขึ้น ใช้ชีวิตทำงานได้เกือบปกติ","when":{"year":[2006,2026]},"effects":[{"stat":"health","d":5},{"stat":"happy","d":2},{"inc":"responsible"}]},
    {"id":"old","label":"หายาเท่าที่หาได้ ยาราคาแพงและหายาก","text":"ยุคนี้ยาต้านยังเข้าถึงยาก ต้องดิ้นรนหาเงินซื้อ","when":{"year":[1985,2005]},"effects":[{"money":-15,"unit":"wageDay"},{"stat":"health","d":-3},{"die":"hiv","p":0.02}]},
    {"id":"skip","label":"อายคนในหมู่บ้าน เลยไม่ไปรับยา","text":"ไม่มีใครรู้เรื่อง แต่อาการทรุดลง","effects":[{"stat":"health","d":-8},{"die":"hiv","p":0.04}]}
   ]},
  {"id":"tmp-drift","title":"ว่างงานเดินเล่นไปวันๆ","body":"ไม่มีงานทำ ตื่นสาย เย็นนั่งตั้งวงกับเพื่อนหน้าร้านค้าประจำหมู่บ้าน","w":8,"when":{"age":[16,40],"role":["jobless"],"loc":"isan","chance":0.35},"cooldown":6,
   "choices":[
    {"id":"drink","label":"ตั้งวงต่อทุกคืน","text":"เพื่อนเยอะ หัวเราะทุกคืน แต่เงินไม่เคยเหลือ","effects":[{"stat":"happy","d":3},{"stat":"health","d":-3},{"money":-4,"unit":"wageDay"},{"inc":"vice"},{"flag":"tmp-drifter"}]},
    {"id":"help","label":"ไปช่วยพ่อแม่ทำนาทำสวน","text":"เหนื่อยและไม่ได้ค่าจ้าง แต่ที่บ้านยิ้มได้","effects":[{"stat":"bond","d":5},{"stat":"happy","d":-1},{"role":"farmer"},{"inc":"responsible"}]},
    {"id":"bkk","label":"ขึ้นรถทัวร์ไปหางานกรุงเทพฯ","text":"เริ่มใหม่ในเมือง เหงาแต่มีรายได้","effects":[{"move":{"kind":"bangkok"}},{"role":"factory"},{"money":-5,"unit":"wageDay"},{"cond":"homesick","turns":2},{"flag":"tmp-drifter","v":false}]}
   ]},
  {"id":"tmp-debt-friends","title":"หนี้เพื่อนพอกพูน","body":"ยืมเพื่อนคนนั้นทีคนนี้ทีจนจำไม่ได้ว่าติดใครเท่าไร เพื่อนเริ่มทวง","w":8,"when":{"age":[17,45],"any":[{"flag":{"tmp-drifter":true}},{"counter":{"vice":[3,99]}}],"chance":0.3},"cooldown":9,
   "choices":[
    {"id":"pay","label":"ขายของมีค่าใช้หนี้ให้หมด","text":"เสียของรัก แต่เดินผ่านหน้าบ้านเพื่อนได้สบายใจ","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":2},{"uncond":"indebted"},{"inc":"responsible"}]},
    {"id":"loan","label":"กู้นอกระบบมาโปะ","text":"เพื่อนหายทวง แต่ดอกเบี้ยรายวันเริ่มเดิน","effects":[{"cond":"indebted","turns":8},{"stat":"happy","d":-3}],
     "roll":[{"p":0.25,"text":"คนทวงหนี้มาตะโกนหน้าบ้าน พ่อแม่อับอายไปทั้งซอย","effects":[{"stat":"bond","d":-6}]}]},
    {"id":"dodge","label":"หลบหน้าไปเรื่อยๆ","text":"ไม่ต้องจ่ายตอนนี้ แต่เพื่อนเก่าหายไปทีละคน","effects":[{"trait":"social","d":-3},{"stat":"happy","d":-2}],
     "roll":[{"p":0.2,"text":"เจอเจ้าหนี้กลางงานบุญ มีปากเสียงจนเกือบลงไม้ลงมือ","effects":[{"stat":"health","d":-3},{"inc":"naughty"}]}]}
   ]},
  {"id":"tmp-gamble-den","title":"วงไพ่ท้ายหมู่บ้าน","body":"มีวงไพ่ลับๆ ในกระท่อมท้ายนา เพื่อนบอกว่าคืนก่อนมีคนได้เป็นหมื่น","w":7,"when":{"age":[18,50],"loc":"isan","any":[{"flag":{"tmp-drifter":true}},{"counter":{"vice":[2,99]}},{"chance":0.3}],"chance":0.25},"cooldown":8,
   "choices":[
    {"id":"play","label":"ลงเล่นสักตา","text":"ใจเต้นแรงทุกครั้งที่เปิดไพ่","effects":[{"inc":"vice"}],
     "roll":[{"p":0.3,"text":"ได้มาก้อนหนึ่ง กลับบ้านยิ้มแก้มปริ","effects":[{"money":15,"unit":"wageDay"},{"stat":"happy","d":4}]},{"p":0.5,"text":"เสียเกลี้ยงกระเป๋า","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-4}]},{"p":0.2,"text":"ตำรวจบุกวง ต้องไปโรงพักเสียค่าปรับ","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":-5},{"flag":"tmp-police"}]}]},
    {"id":"watch","label":"นั่งดูอย่างเดียว","text":"ไม่เสียเงิน แต่ก็ไม่ได้อะไรกลับมา","effects":[{"stat":"happy","d":1}]},
    {"id":"no","label":"ไม่ไป นอนเอาแรงพรุ่งนี้","text":"เพื่อนว่าเชย แต่เงินยังอยู่","effects":[{"stat":"health","d":1},{"inc":"good"}]}
   ]},
  {"id":"tmp-race","title":"แข่งรถกลางคืน","body":"วัยรุ่นในอำเภอนัดแข่งมอเตอร์ไซค์บนถนนเส้นใหม่ตอนเที่ยงคืน มีเดิมพันกันด้วย","w":7,"when":{"age":[16,25],"sex":"m","year":[2000,2026],"loc":"isan","any":[{"counter":{"naughty":[2,99]}},{"counter":{"vice":[1,99]}},{"flag":{"tmp-drifter":true}}],"chance":0.3},"cooldown":6,"heavy":true,
   "choices":[
    {"id":"race","label":"ลงแข่ง","text":"ลมตีหน้า เสียงเชียร์ดังลั่น","effects":[{"inc":"vice"},{"inc":"naughty"},{"stat":"happy","d":4},{"die":"road","p":0.02}],
     "roll":[{"p":0.3,"text":"ชนะเดิมพัน ได้ชื่อเสียงในกลุ่ม","effects":[{"money":5,"unit":"wageDay"}]},{"p":0.2,"text":"ล้มไถลไปกับถนน แผลถลอกเต็มตัว","effects":[{"stat":"health","d":-10},{"money":-8,"unit":"wageDay"}]},{"p":0.15,"text":"ตำรวจตั้งด่านจับ ต้องให้พ่อแม่มารับที่โรงพัก","effects":[{"stat":"bond","d":-6},{"flag":"tmp-police"}]}]},
    {"id":"watch","label":"ไปยืนดูข้างทาง","text":"ตื่นเต้นแต่ปลอดภัยกว่า","effects":[{"stat":"happy","d":2}]},
    {"id":"no","label":"ไม่ไป","text":"เพื่อนแซวว่าใจไม่ถึง แต่เช้ามาตื่นมาครบ 32","effects":[{"inc":"good"},{"trait":"social","d":-1}]}
   ]},
  {"id":"tmp-pull-out","title":"ถึงเวลาเลิกเสเพล","body":"เช้าวันหนึ่งตื่นมาเห็นแม่นั่งนับเงินที่ไม่พอใช้ แล้วคิดได้ว่าชีวิตแบบนี้ไปต่อไม่ไหว","w":10,"when":{"age":[18,40],"any":[{"flag":{"tmp-drifter":true}},{"counter":{"vice":[4,99]}}],"chance":0.3},"cooldown":12,"major":true,
   "choices":[
    {"id":"ordain","label":"บวชเพื่อตั้งหลัก","when":{"sex":"m"},"text":"ห่มผ้าเหลือง เลิกเหล้าได้ แม่ร้องไห้ด้วยความดีใจ","effects":[{"role":"monk"},{"stat":"bond","d":8},{"stat":"health","d":4},{"inc":"vice","d":-3},{"flag":"tmp-drifter","v":false},{"pin":"บวชเพื่อเลิกเสเพล"}]},
    {"id":"farm","label":"กลับไปจับจอบเสียมทำนา","text":"เหนื่อยหนัก รายได้น้อย แต่ไม่มีเวลาไปตั้งวง","effects":[{"role":"farmer"},{"stat":"bond","d":5},{"stat":"health","d":2},{"inc":"vice","d":-2},{"flag":"tmp-drifter","v":false}]},
    {"id":"bkk","label":"ไปทำงานก่อสร้างในกรุงเทพฯ","text":"ห่างเพื่อนวงเหล้า ได้เงินส่งบ้าน","effects":[{"move":{"kind":"bangkok"}},{"role":"construction"},{"inc":"vice","d":-2},{"flag":"tmp-drifter","v":false},{"cond":"homesick","turns":2}]},
    {"id":"abroad","label":"กู้เงินไปทำงานเมืองนอก","when":{"year":[1980,2026]},"text":"ต้องเป็นหนี้ค่านายหน้า แต่ได้เริ่มชีวิตใหม่ไกลบ้าน","effects":[{"move":{"kind":"abroad","country":"ไต้หวัน"}},{"role":"abroad"},{"cond":"indebted","turns":6},{"inc":"vice","d":-2},{"flag":"tmp-drifter","v":false},{"pin":"ไปทำงานเมืองนอกเพื่อตั้งตัวใหม่"}]},
    {"id":"stay","label":"ยังไม่พร้อม ขออีกสักพัก","text":"ทุกอย่างวนเหมือนเดิม","effects":[{"stat":"happy","d":-3},{"stat":"bond","d":-3}]}
   ]},
  {"id":"tmp-vice-health","title":"ร่างกายเริ่มประท้วง","body":"ดื่มหนักนอนดึกมาหลายปี ตื่นมาเหนื่อยง่าย ท้องอืด ตาเหลือง","w":6,"when":{"age":[25,60],"counter":{"vice":[5,99]},"chance":0.2},"cooldown":12,"heavy":true,
   "choices":[
    {"id":"quit","label":"เลิกเหล้าเด็ดขาด","text":"ช่วงแรกทรมาน แต่ผ่านไปหลายเดือนร่างกายดีขึ้น","effects":[{"flag":"drinker","v":false},{"inc":"vice","d":-3},{"stat":"health","d":5},{"stat":"happy","d":-3}]},
    {"id":"less","label":"ลดลงเหลือแค่งานบุญ","text":"ประนีประนอมกับตัวเอง","effects":[{"inc":"vice","d":-1},{"stat":"health","d":1}]},
    {"id":"same","label":"ใช้ชีวิตเหมือนเดิม","text":"ยังสนุกกับเพื่อน แต่หมอเตือนแรงขึ้นทุกครั้ง","effects":[{"stat":"health","d":-8},{"die":"alcohol","p":0.04}]}
   ]},
  {"id":"tmp-tease","title":"โดนเพื่อนล้อในห้อง","body":"เพื่อนร่วมห้องตั้งฉายาล้อชื่อพ่อแม่ ทั้งห้องหัวเราะ","w":8,"when":{"age":[8,14],"role":"student","chance":0.3},"cooldown":6,
   "choices":[
    {"id":"punch","label":"ต่อยคืน","text":"ทั้งคู่ล้มกลิ้งกลางห้องจนครูต้องมาแยก","effects":[{"inc":"naughty"},{"stat":"happy","d":1}],
     "roll":[{"p":0.4,"text":"ครูเรียกผู้ปกครอง แม่ต้องลางานมาโรงเรียน","effects":[{"stat":"bond","d":-4}]},{"p":0.3,"text":"ปากแตก ตาช้ำไปหลายวัน","effects":[{"stat":"health","d":-4}]}]},
    {"id":"ignore","label":"ทำเป็นไม่ได้ยิน","text":"เจ็บใจ แต่สักพักเพื่อนก็เบื่อไปเอง","effects":[{"stat":"happy","d":-3},{"trait":"grit","d":1},{"inc":"good"}]},
    {"id":"teacher","label":"บอกครู","text":"ครูเรียกไปคุยและให้ขอโทษกัน บางคนว่าขี้ฟ้อง","effects":[{"stat":"happy","d":-1},{"trait":"social","d":-1},{"inc":"good"}]},
    {"id":"joke","label":"ล้อกลับแบบขำๆ","text":"ทั้งห้องหัวเราะไปอีกทาง กลายเป็นเพื่อนกันในที่สุด","when":{"trait":{"social":[55,100]}},"effects":[{"stat":"happy","d":3},{"trait":"social","d":1}]}
   ]},
  {"id":"tmp-behind-school","title":"นัดเคลียร์หลังโรงเรียน","body":"มีปากเสียงกับเพื่อนต่างห้อง อีกฝ่ายนัดเจอหลังโรงเรียนตอนเลิกเรียน","w":7,"when":{"age":[11,17],"role":"student","any":[{"counter":{"naughty":[1,99]}},{"chance":0.4}],"chance":0.25},"cooldown":6,
   "choices":[
    {"id":"go","label":"ไปตามนัด","text":"ชกกันสองสามหมัดจนเพื่อนห้ามไว้","effects":[{"inc":"naughty"}],
     "roll":[{"p":0.35,"text":"ฝ่ายปกครองรู้เรื่อง ถูกพักการเรียนสามวัน","effects":[{"stat":"know","d":-3},{"stat":"bond","d":-5}]},{"p":0.3,"text":"ได้แผลกลับบ้าน ต้องไปเย็บที่อนามัย","effects":[{"stat":"health","d":-6},{"money":-1,"unit":"wageDay"}]}]},
    {"id":"gang","label":"ชวนเพื่อนไปด้วยหลายคน","text":"ฝ่ายนั้นถอย แต่ความแค้นยังไม่จบ","effects":[{"inc":"naughty"},{"inc":"naughty"},{"flag":"tmp-gang"},{"trait":"social","d":1}],
     "roll":[{"p":0.3,"text":"ครูเรียกผู้ปกครองทั้งกลุ่ม ถูกตัดคะแนนความประพฤติ","effects":[{"stat":"bond","d":-5}]}]},
    {"id":"skip","label":"กลับบ้านอีกทาง","text":"ถูกหาว่าปอด แต่ไม่มีแผลสักรอย","effects":[{"stat":"happy","d":-2},{"inc":"good"}]},
    {"id":"talk","label":"ไปคุยกันดีๆ ต่อหน้าครู","text":"ยอมลดศักดิ์ศรีลงหน่อย ต่างคนต่างขอโทษ","effects":[{"trait":"grit","d":1},{"inc":"good"},{"stat":"happy","d":1}]}
   ]},
  {"id":"tmp-temple-fair","title":"เด็กต่างหมู่บ้านในงานวัด","body":"งานวัดคืนนี้มีกลุ่มเด็กโตจากหมู่บ้านอื่นมาหาเรื่อง จ้องหน้าแล้วเดินชน","w":7,"when":{"age":[12,17],"season":2,"loc":"isan","chance":0.25},"cooldown":6,"heavy":true,
   "choices":[
    {"id":"fight","label":"ไม่ยอม สู้กลับ","text":"กลางลานหมอลำวุ่นวาย ผู้ใหญ่ต้องเข้ามาแยก","effects":[{"inc":"naughty"},{"stat":"health","d":-4}],
     "roll":[{"p":0.25,"text":"ผู้ใหญ่บ้านทั้งสองฝั่งต้องมาเจรจา พ่อแม่ต้องไปขอโทษ","effects":[{"stat":"bond","d":-6}]}]},
    {"id":"leave","label":"ชวนเพื่อนเดินไปอีกทาง","text":"เสียฟอร์มนิดหน่อย แต่ได้ดูหมอลำต่อจนจบ","effects":[{"inc":"good"},{"stat":"happy","d":1}]},
    {"id":"adult","label":"ไปบอกผู้ใหญ่ที่คุมงาน","text":"ผู้ใหญ่เชิญกลุ่มนั้นออกจากงาน","effects":[{"inc":"good"},{"trait":"social","d":-1}]}
   ]},
  {"id":"tmp-gang-clash","title":"ปะทะกันกลางงานประจำปี","body":"ก๊วนของคุณกับอีกก๊วนมีเรื่องค้างใจกันมานาน คืนงานประจำปีอำเภอทั้งสองกลุ่มเจอกัน","w":8,"when":{"age":[14,19],"flag":{"tmp-gang":true},"chance":0.35},"cooldown":6,"heavy":true,
   "choices":[
    {"id":"join","label":"ลุยไปกับก๊วน","text":"เกิดเรื่องชุลมุนจนตำรวจเข้ามาระงับ","effects":[{"inc":"naughty"},{"inc":"vice"},{"die":"fight","p":0.01}],
     "roll":[{"p":0.35,"text":"ถูกคุมตัวไปโรงพัก พ่อต้องมาเซ็นรับ","effects":[{"stat":"bond","d":-8},{"flag":"tmp-police"}]},{"p":0.3,"text":"โดนไม้ฟาดแขน ต้องเข้าเฝือกเป็นเดือน","effects":[{"stat":"health","d":-10}]}]},
    {"id":"out","label":"ถอยออกจากก๊วน","text":"เพื่อนบางคนเลิกคบ แต่ไม่ต้องคอยระแวงอีก","effects":[{"flag":"tmp-gang","v":false},{"inc":"good"},{"trait":"social","d":-2},{"stat":"happy","d":-2}]},
    {"id":"stop","label":"พยายามห้ามเพื่อน","text":"ห้ามได้บ้างไม่ได้บ้าง แต่ไม่มีใครเจ็บหนัก","effects":[{"inc":"good"},{"trait":"grit","d":1},{"stat":"health","d":-2}]}
   ]},
  {"id":"tmp-drunk-brawl","title":"วงเหล้ามีเรื่องในงานบุญ","body":"งานบุญคืนนี้คนในวงเหล้าเริ่มพูดจากระทบกัน มีคนลุกขึ้นชี้หน้าคุณ","w":6,"when":{"age":[18,60],"loc":"isan","any":[{"flag":{"drinker":true}},{"counter":{"vice":[2,99]}}],"chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"fight","label":"ลุกขึ้นสู้","text":"โต๊ะล้ม ขวดแตก ผู้ใหญ่ต้องกรูเข้ามาแยก","effects":[{"inc":"vice"},{"stat":"health","d":-6},{"die":"fight","p":0.04}],
     "roll":[{"p":0.3,"text":"ถูกแจ้งความ ต้องจ่ายค่าทำขวัญคู่กรณี","effects":[{"money":-20,"unit":"wageDay"},{"flag":"tmp-police"}]}]},
    {"id":"leave","label":"กลืนเลือด เดินกลับบ้าน","text":"เจ็บใจทั้งคืน แต่ไม่มีใครต้องเจ็บตัว","effects":[{"stat":"happy","d":-3},{"inc":"good"}]},
    {"id":"sorry","label":"ยกมือไหว้ขอโทษก่อน","text":"วงเหล้าเย็นลง ผู้ใหญ่ชมว่าใจกว้าง","effects":[{"trait":"social","d":1},{"stat":"bond","d":2},{"inc":"good"}]}
   ]},
  {"id":"tmp-police-record","title":"ประวัติติดตัว","body":"เรื่องที่เคยโดนจับยังอยู่ในบันทึก ตอนสมัครงานบริษัทเขาขอใบตรวจประวัติ","w":5,"when":{"age":[18,45],"flag":{"tmp-police":true},"chance":0.25},"cooldown":"once",
   "choices":[
    {"id":"honest","label":"เล่าความจริงกับผู้สัมภาษณ์","text":"บางที่ปฏิเสธ แต่สุดท้ายมีที่หนึ่งให้โอกาส","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":2},{"flag":"tmp-police","v":false}]},
    {"id":"give","label":"ไม่สมัครแล้ว ไปรับจ้างก่อสร้างรายวัน","text":"ไม่ต้องอธิบายใคร แต่ทางเลือกในชีวิตแคบลง","effects":[{"stat":"happy","d":-4},{"role":"construction"}]}
   ]},
  {"id":"tmp-drown","title":"ไปหาปลาตอนน้ำหลาก","body":"ฝนตกหนักหลายวัน น้ำในห้วยไหลเชี่ยว เพื่อนชวนไปทอดแหตรงที่ปลาขึ้นเยอะ","w":6,"when":{"age":[10,65],"season":1,"loc":"isan","chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"deep","label":"ลงน้ำตรงที่เชี่ยว ปลาเยอะกว่า","text":"ได้ปลาเต็มข้อง แต่เกือบถูกน้ำพัด","effects":[{"money":3,"unit":"wageDay"},{"stat":"happy","d":3},{"die":"drown","p":0.03}]},
    {"id":"bank","label":"ทอดแหจากฝั่ง","text":"ได้ปลาน้อยกว่า แต่กลับบ้านปลอดภัย","effects":[{"money":1,"unit":"wageDay"},{"stat":"happy","d":1}]},
    {"id":"home","label":"ไม่ไป รอน้ำลด","text":"อดกินปลา แต่ไม่มีใครต้องเป็นห่วง","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"tmp-swim-kid","title":"เพื่อนชวนเล่นน้ำในหนอง","body":"หน้าฝนน้ำเต็มหนอง เพื่อนชวนแอบไปกระโดดน้ำตอนพ่อแม่ไม่อยู่","w":6,"when":{"age":[7,14],"season":1,"loc":"isan","chance":0.25},"cooldown":6,"heavy":true,
   "choices":[
    {"id":"jump","label":"ไปกระโดดน้ำกับเพื่อน","text":"สนุกสุดๆ แต่กลับบ้านโดนดุ","effects":[{"stat":"happy","d":4},{"inc":"naughty"},{"die":"drown","p":0.015}]},
    {"id":"edge","label":"เล่นแค่ริมตลิ่งตื้นๆ","text":"เพื่อนแซว แต่ยังได้เล่นน้ำ","effects":[{"stat":"happy","d":2}]},
    {"id":"no","label":"ไม่ไป บอกแม่ไว้ก่อน","text":"เบื่อนิดหน่อย แม่ชมว่ารู้ความ","effects":[{"stat":"bond","d":2},{"inc":"good"}]}
   ]},
  {"id":"tmp-lightning","title":"ฟ้าครึ้มกลางทุ่งนา","body":"กำลังดำนาอยู่กลางทุ่งโล่ง เมฆดำตั้งเค้า ฟ้าแลบแปลบปลาบ งานยังเหลืออีกหลายแปลง","w":6,"when":{"age":[12,70],"season":1,"role":["farmer","child","student"],"loc":"isan","chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"keep","label":"ทำต่อให้เสร็จ","text":"งานเสร็จทันฤดู แต่ตัวเปียกโชกกลางสายฟ้า","effects":[{"money":2,"unit":"wageDay"},{"die":"lightning","p":0.015}]},
    {"id":"hut","label":"วิ่งไปหลบในเถียงนา","text":"เสียงานไปครึ่งวัน","effects":[{"money":-1,"unit":"wageDay"}]},
    {"id":"home","label":"เก็บของกลับบ้านเลย","text":"ปลอดภัย แต่พรุ่งนี้งานหนักกว่าเดิม","effects":[{"stat":"health","d":-1}]}
   ]},
  {"id":"tmp-snake","title":"ส่องกบตอนกลางคืน","body":"คืนหลังฝน กบเขียดออกเต็มคันนา แต่ก็เป็นเวลาที่งูออกหากินเหมือนกัน","w":6,"when":{"age":[10,65],"season":1,"loc":"isan","chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"boots","label":"ใส่บู๊ต ถือไฟฉายส่องทาง","text":"เดินช้าลง ได้กบน้อยลงหน่อย","effects":[{"money":1,"unit":"wageDay"},{"stat":"happy","d":2}]},
    {"id":"bare","label":"เดินเท้าเปล่าให้คล่องตัว","text":"ได้กบเต็มถุง","effects":[{"money":3,"unit":"wageDay"},{"stat":"happy","d":2}],
     "roll":[{"p":0.08,"text":"ถูกงูกัดที่ข้อเท้า ต้องรีบส่งโรงพยาบาล","effects":[{"stat":"health","d":-15},{"money":-5,"unit":"wageDay"},{"die":"snake","p":0.15}]}]},
    {"id":"no","label":"ไม่ไป","text":"มื้อพรุ่งนี้กินปลาแดกกับผัก","effects":[]}
   ]},
  {"id":"tmp-electric","title":"ไฟในบ้านดับ","body":"สายไฟในบ้านช็อตจนเบรกเกอร์ตก ช่างในหมู่บ้านบอกว่าพรุ่งนี้ถึงจะว่าง","w":5,"when":{"age":[16,70],"chance":0.12},"cooldown":12,"heavy":true,
   "choices":[
    {"id":"self","label":"ปีนขึ้นไปต่อสายเอง","text":"ประหยัดค่าช่าง แต่มือสั่นตลอดเวลา","effects":[{"money":1,"unit":"wageDay"},{"die":"electric","p":0.02}],
     "roll":[{"p":0.15,"text":"โดนไฟดูดจนกระเด็น โชคดีที่มือหลุดออกมาได้","effects":[{"stat":"health","d":-10}]}]},
    {"id":"cut","label":"สับคัตเอาต์ลงก่อนแล้วค่อยซ่อม","text":"ช้ากว่าแต่ปลอดภัย","effects":[{"stat":"know","d":1}]},
    {"id":"wait","label":"รอช่าง","text":"มืดไปหนึ่งคืน เสียค่าช่าง","effects":[{"money":-2,"unit":"wageDay"},{"stat":"happy","d":-1}]}
   ]},
  {"id":"tmp-scaffold","title":"นั่งร้านโยกเยก","body":"หัวหน้าเร่งงานให้ทันกำหนด นั่งร้านชั้นบนยังไม่ได้ผูกให้แน่น และเข็มขัดนิรภัยมีไม่พอ","w":7,"when":{"age":[16,60],"role":["construction","abroad"],"chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"climb","label":"ขึ้นไปทำเลย ไม่อยากโดนหักค่าแรง","text":"งานเสร็จทันเวลา หัวหน้าพอใจ","effects":[{"money":3,"unit":"wageDay"},{"die":"fall","p":0.02}],
     "roll":[{"p":0.1,"text":"พลาดตกลงมาชั้นล่าง ขาหัก ต้องหยุดงานหลายเดือน","effects":[{"stat":"health","d":-15},{"money":-20,"unit":"wageDay"}]}]},
    {"id":"wait","label":"รอผูกนั่งร้านใหม่และเอาเข็มขัด","text":"โดนหัวหน้าบ่น เสียค่าแรงครึ่งวัน","effects":[{"money":-1,"unit":"wageDay"},{"inc":"responsible"}]},
    {"id":"refuse","label":"ไม่ขึ้น และขอย้ายไปงานพื้นล่าง","text":"ค่าแรงน้อยลง เพื่อนบางคนมองว่าขี้กลัว","effects":[{"money":-2,"unit":"wageDay"},{"trait":"grit","d":-1}]}
   ]},
  {"id":"tmp-abroad-shift","title":"กะดึกต่อกะดึก","body":"โรงงานเมืองนอกให้ทำโอทีติดกันหลายสัปดาห์ เครื่องจักรเสียงดังจนหูอื้อ","w":7,"when":{"age":[18,55],"loc":"abroad","chance":0.25},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"ot","label":"รับโอทีทุกวัน ส่งเงินกลับบ้านให้มาก","text":"เงินส่งบ้านเยอะขึ้น แต่ร่างกายล้าจนตาลาย","effects":[{"money":10,"unit":"wageDay"},{"stat":"health","d":-6},{"die":"abroad","p":0.01}],
     "roll":[{"p":0.08,"text":"เผลอหลับในตอนคุมเครื่อง มือติดเครื่องจักร ต้องผ่าตัด","effects":[{"stat":"health","d":-15},{"die":"work","p":0.1}]}]},
    {"id":"rest","label":"ทำแค่กะปกติ","text":"เงินน้อยลง แต่ได้นอนพอ","effects":[{"stat":"health","d":2}]}
   ]},
  {"id":"tmp-dengue","title":"ยุงชุมหน้าฝน","body":"โอ่งน้ำรอบบ้านมีลูกน้ำเต็ม ข่าวว่าคนในตำบลเป็นไข้เลือดออกหลายคน","w":6,"when":{"season":1,"loc":"isan","age":[10,80],"chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"clean","label":"คว่ำภาชนะ ปิดฝาโอ่ง ใส่ทราย","text":"เหนื่อยครึ่งวัน แต่ยุงลดลงชัดเจน","effects":[{"stat":"health","d":1},{"inc":"responsible"}]},
    {"id":"skip","label":"ช่างมัน ยุงมีทุกปี","text":"ไม่เสียเวลา แต่ต้องลุ้นเอา","effects":[],
     "roll":[{"p":0.15,"text":"ไข้ขึ้นสูง ปวดกระบอกตา ต้องนอนโรงพยาบาลหลายวัน","effects":[{"stat":"health","d":-12},{"money":-5,"unit":"wageDay"},{"cond":"sick","turns":2},{"die":"dengue","p":0.04}]}]}
   ]},
  {"id":"tmp-video-call","title":"วิดีโอคอลข้ามประเทศ","body":"อยู่ห่างกันมานาน คุยกันทีไรก็เรื่องเงินกับเรื่องหนี้ จนเริ่มไม่อยากรับสาย","w":6,"when":{"age":[18,55],"year":[2012,2026],"loc":"abroad","flag":{"partner":true},"chance":0.25},"cooldown":9,
   "choices":[
    {"id":"talk","label":"ตั้งเวลาคุยกันทุกคืน ไม่พูดเรื่องเงิน","text":"กลับมาหัวเราะด้วยกันได้อีกครั้ง","effects":[{"stat":"bond","d":5},{"stat":"happy","d":2},{"inc":"good"}]},
    {"id":"avoid","label":"ส่งเงินอย่างเดียว ไม่ค่อยรับสาย","text":"ไม่ต้องทะเลาะ แต่ความรู้สึกจืดจางลง","effects":[{"stat":"bond","d":-4},{"cond":"lonely","turns":2}]}
   ]},
  {"id":"tmp-home-lonely","title":"บ้านที่ว่างเปล่า","body":"แฟนไปทำงานไกลหลายปี คุณอยู่บ้านดูแลพ่อแม่และลูกคนเดียว มีคนในหมู่บ้านแวะมาช่วยงานบ่อยขึ้น","w":5,"when":{"age":[20,55],"loc":"isan","flag":{"partner":true},"partnerYears":[3,60],"noFlag":["tmp-affair"],"chance":0.12},"cooldown":"once","heavy":true,
   "choices":[
    {"id":"distance","label":"ขอบคุณ แต่ขอให้มาเฉพาะตอนมีคนอยู่","text":"คนในหมู่บ้านไม่มีอะไรให้นินทา","effects":[{"stat":"happy","d":-2},{"inc":"good"}]},
    {"id":"close","label":"ให้เขามาช่วยบ่อยๆ จนใจผูกพัน","text":"มีคนคอยดูแล แต่เริ่มมีเสียงซุบซิบ","effects":[{"stat":"happy","d":4},{"flag":"tmp-affair"},{"stat":"bond","d":-3}]},
    {"id":"ask","label":"ขอให้แฟนกลับมาอยู่บ้าน","text":"รายได้ลดลง แต่ครอบครัวได้อยู่พร้อมหน้า","effects":[{"stat":"bond","d":5},{"money":-10,"unit":"wageDay"}]}
   ]},
  {"id":"tmp-ex-return","title":"คนเก่ากลับมา","body":"แฟนเก่าสมัยเรียนกลับมาบ้านช่วงสงกรานต์ ทักทายเหมือนไม่เคยห่างกัน","w":5,"when":{"age":[22,50],"season":0,"flag":{"married":true},"noFlag":["tmp-affair"],"chance":0.12},"cooldown":"once",
   "choices":[
    {"id":"friend","label":"คุยกันแบบเพื่อนเก่าต่อหน้าคนอื่น","text":"หวนคิดถึงอดีตแวบหนึ่ง แล้วก็กลับบ้าน","effects":[{"stat":"happy","d":1}]},
    {"id":"secret","label":"แอบนัดเจอกันสองต่อสอง","text":"ความรู้สึกเก่าคืนมาไวกว่าที่คิด","effects":[{"flag":"tmp-affair"},{"stat":"happy","d":3},{"stat":"bond","d":-3}]},
    {"id":"avoid","label":"หลบหน้าไม่ไปงานที่เขาไป","text":"พลาดงานบุญไปหลายงาน","effects":[{"stat":"happy","d":-1},{"trait":"social","d":-1}]}
   ]},
  {"id":"tmp-moto-night","title":"ขี่รถกลับจากวงเหล้า","body":"ตีสองแล้ว เพิ่งเลิกวงเหล้าที่บ้านเพื่อน บ้านอยู่อีกฝั่งของทุ่ง","w":6,"when":{"age":[16,60],"loc":"isan","any":[{"flag":{"drinker":true}},{"flag":{"tmp-drifter":true}}],"chance":0.2},"cooldown":9,"heavy":true,
   "choices":[
    {"id":"ride","label":"ขี่กลับเลย ถนนโล่ง","text":"ถึงบ้านแบบจำทางไม่ได้","effects":[{"inc":"vice"},{"die":"road","p":0.02}],
     "roll":[{"p":0.12,"text":"ลงข้างทาง ถลอกทั้งตัว รถพัง","effects":[{"stat":"health","d":-8},{"money":-6,"unit":"wageDay"}]}]},
    {"id":"sleep","label":"นอนค้างบ้านเพื่อน","text":"คนที่บ้านบ่นแต่เช้า แต่ครบสามสิบสอง","effects":[{"stat":"bond","d":-1}]}
   ]},
  {"id":"tmp-fight-sibling","title":"เพื่อนรุ่นพี่รังแก","body":"รุ่นพี่ตัวโตที่โรงเรียนดักไถเงินค่าขนมทุกเช้า","w":6,"when":{"age":[10,15],"role":"student","chance":0.2},"cooldown":6,
   "choices":[
    {"id":"pay","label":"ยอมให้ไป","text":"หิวทั้งวัน แต่ไม่ต้องเจ็บตัว","effects":[{"stat":"happy","d":-3},{"stat":"health","d":-1}]},
    {"id":"fight","label":"สู้ไม่ยอม","text":"โดนหนักกว่าเดิม แต่รุ่นพี่ไม่มายุ่งอีก","effects":[{"inc":"naughty"},{"stat":"health","d":-5},{"trait":"grit","d":2}]},
    {"id":"tell","label":"บอกพ่อแม่กับครู","text":"ครูเรียกรุ่นพี่ไปคุย เรื่องจบ แต่ต้องคอยหลบตาอยู่พักใหญ่","effects":[{"inc":"good"},{"stat":"bond","d":2}]}
   ]},
  {"id":"tmp-fire","title":"เผาตอซังข้าว","body":"หลังเกี่ยวข้าว เพื่อนบ้านเผาตอซังกันทั้งทุ่ง ลมแรงพัดเข้าหาบ้านไม้ที่มีกองฟางอยู่","w":5,"when":{"season":[0,2],"loc":"isan","setting":"rural","age":[15,75],"chance":0.12},"cooldown":12,"heavy":true,
   "choices":[
    {"id":"burn","label":"เผาตามเขา ประหยัดแรง","text":"ทุ่งโล่งเร็ว แต่ไฟลามเข้าใกล้กองฟาง","effects":[{"money":1,"unit":"wageDay"},{"stat":"health","d":-2}],
     "roll":[{"p":0.12,"text":"ไฟลุกกองฟางลามถึงยุ้งข้าว ต้องช่วยกันดับทั้งหมู่บ้าน","effects":[{"money":-20,"unit":"wageDay"},{"stat":"health","d":-6},{"die":"fire","p":0.05}]}]},
    {"id":"plow","label":"ไถกลบตอซังแทน","text":"เสียค่ารถไถ แต่ดินดีขึ้นและไม่มีควัน","effects":[{"money":-4,"unit":"wageDay"},{"stat":"health","d":1}]},
    {"id":"guard","label":"ขุดแนวกันไฟรอบบ้าน","text":"เหนื่อยทั้งวัน แต่หลับได้สบายใจ","effects":[{"stat":"health","d":-1},{"inc":"responsible"}]}
   ]}
]);
