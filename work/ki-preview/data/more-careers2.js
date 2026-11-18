globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"job2-faculty","title":"เลือกคณะ","body":"ได้ที่เรียนแล้ว แต่ยังต้องเลือกว่าจะเรียนสายไหน คะแนนกับความถนัดของคุณจะเป็นตัวตัดสิน","when":{"edu":{"in":"uni","grade":[1,2]},"noFlag":["job2-major"]},"major":true,"cooldown":"once","choices":[
    {"id":"med","label":"สอบเข้าคณะแพทย์","text":"คุณยื่นคะแนนเข้าคณะแพทยศาสตร์ ซึ่งแข่งกันสูงที่สุด","when":{"stat":{"know":[75,100]}},"effects":[{"flag":"job2-major"},{"stat":"happy","d":-2}],"roll":[{"p":0.45,"text":"มีชื่อคุณในประกาศ คุณได้เป็นนักศึกษาแพทย์","effects":[{"edu":{"in":"med","grade":1,"place":"คณะแพทยศาสตร์ มหาวิทยาลัยในภาคอีสาน"}},{"flag":"job2-major-med"},{"stat":"happy","d":8},{"pin":"เข้าเรียนแพทย์"}]},{"p":0.55,"text":"คะแนนขาดไปนิดเดียว คุณได้อันดับสำรองคือเภสัชศาสตร์","effects":[{"flag":"job2-major-pharm"},{"stat":"happy","d":-4,"by":"attach"}]}]},
    {"id":"rural","label":"โควตาแพทย์ชนบท","text":"โครงการผลิตแพทย์เพื่อชาวชนบทรับเด็กในจังหวัด แลกกับการกลับมาทำงานใกล้บ้านหลังเรียนจบ","when":{"stat":{"know":[65,100]},"wealth":["poor","mid"]},"effects":[{"flag":"job2-major"}],"roll":[{"p":0.5,"text":"คุณได้ทุน เรียนแพทย์โดยมีสัญญาต้องกลับมาใช้ทุนที่บ้านเกิด","effects":[{"edu":{"in":"med","grade":1,"place":"คณะแพทยศาสตร์ มหาวิทยาลัยในภาคอีสาน"}},{"flag":"job2-major-med"},{"flag":"job2-rural-quota"},{"stat":"happy","d":8},{"stat":"bond","d":3},{"pin":"ได้ทุนแพทย์ชนบท"}]},{"p":0.5,"text":"ที่นั่งมีน้อย คุณไม่ติด แต่ได้เรียนพยาบาลแทน","effects":[{"flag":"job2-major-nurse"},{"stat":"happy","d":-3,"by":"attach"}]}]},
    {"id":"nurse","label":"พยาบาลศาสตร์","text":"เรียนหนัก ฝึกงานในวอร์ดตั้งแต่ปีสอง แต่จบแล้วมีงานรอ","when":{"stat":{"know":[45,100]}},"effects":[{"flag":"job2-major"}],"roll":[{"p":0.7,"text":"คุณได้เข้าพยาบาลศาสตร์","effects":[{"flag":"job2-major-nurse"},{"stat":"happy","d":3}]},{"p":0.3,"text":"ไม่ติด คุณไปเรียนบริหารธุรกิจแทน","effects":[{"flag":"job2-major-biz"},{"stat":"happy","d":-2}]}]},
    {"id":"pharm","label":"เภสัชศาสตร์","text":"เรียนเคมีหนักหกปี แต่เปิดร้านยาเองได้ในวันหน้า","when":{"stat":{"know":[60,100]}},"effects":[{"flag":"job2-major"}],"roll":[{"p":0.6,"text":"คุณได้เข้าเภสัชศาสตร์","effects":[{"flag":"job2-major-pharm"},{"stat":"happy","d":3}]},{"p":0.4,"text":"ไม่ติด คุณได้พยาบาลศาสตร์แทน","effects":[{"flag":"job2-major-nurse"}]}]},
    {"id":"eng","label":"วิศวกรรมศาสตร์","text":"คำนวณหนัก งานกลุ่มเยอะ ค่าตำราไม่น้อย","when":{"any":[{"stat":{"know":[55,100]}},{"talent":{"math":[1,3]}}]},"effects":[{"flag":"job2-major"},{"money":-5,"unit":"wageDay"}],"roll":[{"p":0.65,"text":"คุณได้เป็นนักศึกษาวิศวะ","effects":[{"flag":"job2-major-eng"},{"stat":"happy","d":3}]},{"p":0.35,"text":"ไม่ติด คุณไปเรียนบัญชีแทน","effects":[{"flag":"job2-major-acc"}]}]},
    {"id":"cs","label":"วิทยาการคอมพิวเตอร์","text":"คุณเลือกเรียนเขียนโปรแกรม เพื่อนบางคนบอกว่าจบไปไม่รู้จะทำอะไร","when":{"year":[1995,2026],"any":[{"stat":{"know":[50,100]}},{"talent":{"computer":[1,3]}},{"counter":{"skill-computer":[3,99]}}]},"effects":[{"flag":"job2-major"}],"roll":[{"p":0.7,"text":"คุณได้เข้าเรียนคอมพิวเตอร์","effects":[{"flag":"job2-major-cs"},{"inc":"skill-computer"}]},{"p":0.3,"text":"ไม่ติด คุณไปเรียนบริหารธุรกิจแทน","effects":[{"flag":"job2-major-biz"}]}]},
    {"id":"law","label":"นิติศาสตร์","text":"ท่องตัวบทกฎหมายจนหลับคาหนังสือ","when":{"stat":{"know":[45,100]}},"effects":[{"flag":"job2-major"}],"roll":[{"p":0.75,"text":"คุณได้เรียนนิติศาสตร์","effects":[{"flag":"job2-major-law"},{"stat":"know","d":2}]},{"p":0.25,"text":"ไม่ติด คุณไปเรียนบัญชีแทน","effects":[{"flag":"job2-major-acc"}]}]},
    {"id":"acc","label":"บัญชี","text":"งานมั่นคง ตัวเลขเยอะ ไม่หวือหวา","effects":[{"flag":"job2-major"},{"flag":"job2-major-acc"},{"stat":"happy","d":-1}]},
    {"id":"biz","label":"บริหารธุรกิจ","text":"เรียนกว้างๆ เพื่อนเยอะ จบไปทำได้หลายอย่าง","effects":[{"flag":"job2-major"},{"flag":"job2-major-biz"},{"stat":"happy","d":2},{"trait":"social","d":2}]},
    {"id":"arts","label":"ศิลปกรรม ดนตรี การออกแบบ","text":"คุณเลือกตามใจรัก ที่บ้านถามว่าจบไปจะกินอะไร","when":{"any":[{"talent":{"art":[1,3]}},{"talent":{"music":[1,3]}},{"counter":{"skill-art":[3,99]}},{"counter":{"skill-music":[3,99]}}]},"effects":[{"flag":"job2-major"},{"flag":"job2-major-arts"},{"stat":"happy","d":6},{"stat":"bond","d":-2},{"inc":"skill-art"}]},
    {"id":"edu","label":"ครุศาสตร์","text":"คุณอยากกลับไปสอนหนังสือที่บ้าน","effects":[{"flag":"job2-major"},{"flag":"job2-major-edu"},{"stat":"bond","d":2}]}
  ]},
  {"id":"job2-med-hard","title":"ปีที่หนักที่สุดของหมอ","body":"ขึ้นชั้นคลินิก อยู่เวรในโรงพยาบาลจนดึก สอบทุกสัปดาห์","when":{"edu":{"in":"med","grade":[3,5]},"chance":0.4},"major":true,"cooldown":"once","choices":[
    {"id":"grind","label":"อดหลับอดนอนสู้ต่อ","text":"คุณอ่านหนังสือทุกช่วงว่าง","effects":[{"stat":"know","d":6},{"stat":"health","d":-5},{"stat":"happy","d":-4}]},
    {"id":"balance","label":"แบ่งเวลาพักบ้าง","text":"คะแนนกลางๆ แต่ใจยังไหว","effects":[{"stat":"know","d":2},{"stat":"happy","d":2}],"roll":[{"p":0.15,"text":"คุณสอบตกวิชาหนึ่ง ต้องซ่อมช่วงปิดเทอม","effects":[{"stat":"happy","d":-4}]}]},
    {"id":"quit","label":"ลาออก","text":"คุณรู้ว่านี่ไม่ใช่ทางของตัวเอง พ่อแม่เสียใจมาก","effects":[{"edu":{"in":null,"grade":0}},{"role":"jobless"},{"flag":"job2-med-quit"},{"stat":"bond","d":-6,"by":"attach"},{"stat":"happy","d":4},{"pin":"ลาออกจากคณะแพทย์"}]}
  ]},
  {"id":"job2-med-intern","title":"ใช้ทุน","body":"เรียนจบแพทย์แล้ว ต้องไปใช้ทุนในโรงพยาบาลของรัฐ","when":{"flag":{"job2-major-med":true},"edu":{"top":"ba"},"noFlag":["job2-doctor"]},"major":true,"cooldown":"once","choices":[
    {"id":"home","label":"โรงพยาบาลชุมชนใกล้บ้าน","text":"คนไข้ล้นทุกวัน หมอมีไม่กี่คน แต่ได้อยู่ใกล้พ่อแม่","effects":[{"role":"doctor"},{"flag":"job2-doctor"},{"flag":"job2-placed"},{"move":"home"},{"stat":"bond","d":5},{"stat":"health","d":-3},{"pin":"เป็นหมอโรงพยาบาลชุมชน"}]},
    {"id":"city","label":"โรงพยาบาลศูนย์ในเมือง","text":"เคสหลากหลาย ได้ฝึกมือ แต่เวรหนักมาก","when":{"noFlag":["job2-rural-quota"]},"effects":[{"role":"doctor"},{"flag":"job2-doctor"},{"flag":"job2-placed"},{"move":{"kind":"isan","province":"khon-kaen","setting":"urban"}},{"stat":"know","d":4},{"stat":"health","d":-4},{"pin":"เป็นหมอ"}]},
    {"id":"buyout","label":"จ่ายเงินชดใช้ทุน ไปเอกชนในกรุงเทพฯ","text":"คุณยอมจ่ายเงินก้อนใหญ่เพื่อไปทำงานที่เงินดีกว่า","when":{"money":[300000,999999999]},"effects":[{"role":"doctor"},{"flag":"job2-doctor"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"money":-250,"unit":"wageDay"},{"stat":"bond","d":-4},{"pin":"เป็นหมอโรงพยาบาลเอกชน"}]}
  ]},
  {"id":"job2-doc-specialist","title":"เรียนต่อเฉพาะทาง","body":"ใช้ทุนครบแล้ว มีที่ว่างเรียนแพทย์เฉพาะทางสามถึงสี่ปี","when":{"role":"doctor","age":[27,36],"chance":0.35},"major":true,"cooldown":"once","choices":[
    {"id":"study","label":"เรียนต่อ","text":"เงินเดือนลดช่วงเรียน งานหนักขึ้นอีก","effects":[{"stat":"health","d":-4},{"stat":"know","d":6},{"money":-20,"unit":"wageDay"}],"roll":[{"p":0.8,"text":"คุณจบเป็นแพทย์เฉพาะทาง","effects":[{"flag":"job2-specialist"},{"stat":"happy","d":6},{"pin":"เป็นแพทย์เฉพาะทาง"}]},{"p":0.2,"text":"คุณหมดไฟกลางทาง กลับไปเป็นหมอทั่วไป","effects":[{"stat":"happy","d":-6,"by":"attach"}]}]},
    {"id":"stay","label":"เป็นหมอทั่วไปในชุมชนต่อ","text":"ชาวบ้านจำชื่อคุณได้ทุกคน","effects":[{"stat":"bond","d":4},{"stat":"happy","d":2}]},
    {"id":"leave","label":"ออกจากวงการไปทำธุรกิจ","text":"คุณเหนื่อยกับเวรจนพอแล้ว","effects":[{"role":"business"},{"inc":"biz"},{"money":-60,"unit":"wageDay"},{"stat":"health","d":4},{"stat":"bond","d":-2}]}
  ]},
  {"id":"job2-grad-nurse","title":"สอบใบประกอบวิชาชีพพยาบาล","body":"เรียนจบพยาบาลแล้ว ต้องสอบใบประกอบก่อนเริ่มงาน","when":{"flag":{"job2-major-nurse":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"home","label":"สมัครโรงพยาบาลชุมชนใกล้บ้าน","text":"เงินน้อยกว่าแต่ได้กลับบ้าน","effects":[{"move":"home"}],"roll":[{"p":0.8,"text":"สอบผ่าน คุณได้เป็นพยาบาลใกล้บ้าน","effects":[{"role":"nurse"},{"flag":"job2-placed"},{"stat":"bond","d":4},{"pin":"เป็นพยาบาล"}]},{"p":0.2,"text":"สอบไม่ผ่านบางวิชา ต้องสอบใหม่","effects":[{"flag":"job2-nurse-retake"},{"role":"jobless"},{"stat":"happy","d":-5,"by":"attach"}]}]},
    {"id":"bkk","label":"โรงพยาบาลเอกชนในกรุงเทพฯ","text":"เงินดี ค่าครองชีพสูง ห่างบ้าน","effects":[{"move":{"kind":"bangkok"}}],"roll":[{"p":0.8,"text":"สอบผ่าน คุณเริ่มงานในวอร์ดเอกชน","effects":[{"role":"nurse"},{"flag":"job2-placed"},{"cond":"homesick","turns":3},{"pin":"เป็นพยาบาลในกรุงเทพฯ"}]},{"p":0.2,"text":"สอบไม่ผ่านบางวิชา ต้องสอบใหม่","effects":[{"flag":"job2-nurse-retake"},{"role":"jobless"},{"stat":"happy","d":-5,"by":"attach"}]}]}
  ]},
  {"id":"job2-nurse-retake","title":"สอบใบประกอบอีกรอบ","body":"รอบที่แล้วพลาด รอบนี้ต้องผ่าน","when":{"flag":{"job2-nurse-retake":true},"noFlag":["job2-placed"]},"major":true,"cooldown":6,"choices":[
    {"id":"tutor","label":"ลงคอร์สติว","text":"เสียเงินแต่มีคนช่วยชี้","effects":[{"money":-6,"unit":"wageDay"}],"roll":[{"p":0.85,"text":"ผ่านแล้ว คุณได้เป็นพยาบาล","effects":[{"role":"nurse"},{"flag":"job2-placed"},{"stat":"happy","d":6}]}]},
    {"id":"self","label":"อ่านเอง","text":"ประหยัดเงิน แต่ต้องมีวินัย","effects":[{"stat":"know","d":2}],"roll":[{"p":0.6,"text":"ผ่านแล้ว คุณได้เป็นพยาบาล","effects":[{"role":"nurse"},{"flag":"job2-placed"},{"stat":"happy","d":6}]}]},
    {"id":"quit","label":"เลิกสอบ ไปทำงานอื่น","text":"คุณไปเป็นผู้ช่วยในคลินิกเอกชน","effects":[{"role":"office"},{"flag":"job2-placed"},{"stat":"happy","d":-3}]}
  ]},
  {"id":"job2-nurse-abroad","title":"พยาบาลไปต่างประเทศ","body":"เอเจนซีรับพยาบาลไทยไปทำงานต่างประเทศ ต้องสอบภาษาและใบอนุญาตของที่นั่น","when":{"role":"nurse","age":[25,42],"year":[2005,2026],"chance":0.2},"major":true,"cooldown":"once","choices":[
    {"id":"go","label":"สอบภาษาแล้วไป","text":"คุณเรียนภาษาตอนกลางคืนหลังเลิกเวร","effects":[{"money":-15,"unit":"wageDay"},{"stat":"health","d":-2}],"roll":[{"p":0.45,"text":"ผ่านทุกด่าน คุณบินไปทำงานพยาบาลต่างแดน","effects":[{"move":{"kind":"abroad","country":"ออสเตรเลีย"}},{"flag":"job2-abroad"},{"cond":"homesick","turns":4},{"money":30,"unit":"wageDay"},{"pin":"ไปเป็นพยาบาลต่างประเทศ"}]},{"p":0.55,"text":"คะแนนภาษาไม่ถึง คุณยังทำงานที่เดิม","effects":[{"stat":"happy","d":-4,"by":"attach"}]}]},
    {"id":"stay","label":"อยู่ดูแลคนบ้านเรา","text":"เงินน้อยกว่า แต่ได้อยู่ใกล้ครอบครัว","effects":[{"stat":"bond","d":4}]}
  ]},
  {"id":"job2-grad-pharm","title":"เภสัชกรจบใหม่","body":"สอบใบประกอบวิชาชีพเภสัชกรรมแล้ว ต้องเลือกที่ทำงาน","when":{"flag":{"job2-major-pharm":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"hosp","label":"ห้องยาโรงพยาบาลรัฐ","text":"มั่นคง จ่ายยาวันละหลายร้อยใบสั่ง","effects":[{"role":"pharmacist"},{"flag":"job2-placed"},{"stat":"happy","d":2},{"pin":"เป็นเภสัชกร"}]},
    {"id":"chain","label":"ร้านยาสาขาในห้าง","text":"เงินดี ยืนทั้งวัน มียอดขายต้องทำ","effects":[{"role":"pharmacist"},{"flag":"job2-placed"},{"money":5,"unit":"wageDay"},{"stat":"happy","d":-1},{"pin":"เป็นเภสัชกร"}]},
    {"id":"own","label":"เปิดร้านยาที่บ้าน","text":"ลงทุนตกแต่งและสต็อกยา ลูกค้าคือคนในอำเภอ","effects":[{"role":"pharmacist"},{"flag":"job2-placed"},{"move":"home"},{"money":-80,"unit":"wageDay"}],"roll":[{"p":0.6,"text":"ร้านติด คนในอำเภอมาปรึกษาคุณก่อนไปหาหมอ","effects":[{"inc":"biz"},{"stat":"happy","d":5}]},{"p":0.4,"text":"ร้านยาใหญ่เปิดใกล้ๆ ลูกค้าบางลง","effects":[{"stat":"happy","d":-4}]}]}
  ]},
  {"id":"job2-grad-eng","title":"วิศวกรจบใหม่","body":"มีใบประกอบวิชาชีพแล้ว งานมีหลายทาง","when":{"flag":{"job2-major-eng":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"factory","label":"วิศวกรโรงงานในนิคมอุตสาหกรรม","text":"เงินดี กะหมุน ไกลบ้าน","effects":[{"role":"engineer"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"money":5,"unit":"wageDay"},{"pin":"เป็นวิศวกร"}]},
    {"id":"site","label":"วิศวกรสนามกับผู้รับเหมาในอีสาน","text":"ตากแดดคุมงานถนนและอาคาร ได้อยู่ใกล้บ้าน","effects":[{"role":"engineer"},{"flag":"job2-placed"},{"move":"home"},{"stat":"health","d":-1},{"stat":"bond","d":3},{"pin":"เป็นวิศวกร"}]},
    {"id":"state","label":"สอบรัฐวิสาหกิจ","text":"สวัสดิการดี แต่คนสอบเยอะมาก","effects":[{"money":-3,"unit":"wageDay"}],"roll":[{"p":0.3,"text":"คุณสอบติด ได้เป็นวิศวกรรัฐวิสาหกิจ","effects":[{"role":"engineer"},{"flag":"job2-placed"},{"flag":"job2-state"},{"stat":"happy","d":6},{"pin":"เป็นวิศวกรรัฐวิสาหกิจ"}]},{"p":0.7,"text":"ไม่ติด คุณรับงานวิศวกรโรงงานไปก่อน","effects":[{"role":"engineer"},{"flag":"job2-placed"},{"stat":"happy","d":-2}]}]}
  ]},
  {"id":"job2-grad-cs","title":"เด็กคอมจบใหม่","body":"บริษัทซอฟต์แวร์หลายแห่งเปิดรับโปรแกรมเมอร์","when":{"flag":{"job2-major-cs":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"bkk","label":"บริษัทใหญ่ในกรุงเทพฯ","text":"เงินดี ทำงานเป็นระบบ แต่รถติดทุกวัน","effects":[{"role":"developer"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"inc":"skill-computer"},{"pin":"เป็นโปรแกรมเมอร์"}]},
    {"id":"local","label":"บริษัทซอฟต์แวร์เล็กในเมืองอีสาน","text":"เงินน้อยกว่า งานหลากหลาย ใกล้บ้าน","effects":[{"role":"developer"},{"flag":"job2-placed"},{"move":{"kind":"isan","province":"khon-kaen","setting":"urban"}},{"stat":"bond","d":2},{"pin":"เป็นโปรแกรมเมอร์"}]},
    {"id":"startup","label":"ร่วมก่อตั้งสตาร์ทอัพกับเพื่อน","text":"ไม่มีเงินเดือนแน่นอน แต่ถ้ารอดก็โตไว","when":{"year":[2010,2026]},"effects":[{"role":"developer"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"money":-20,"unit":"wageDay"}],"roll":[{"p":0.25,"text":"แอปของทีมมีคนใช้จริง นักลงทุนสนใจ","effects":[{"inc":"biz"},{"stat":"happy","d":8}]},{"p":0.75,"text":"เงินทุนหมดในปีครึ่ง คุณไปสมัครงานประจำ","effects":[{"stat":"happy","d":-5,"by":"attach"},{"stat":"know","d":3}]}]}
  ]},
  {"id":"job2-grad-law","title":"สอบเนติบัณฑิต","body":"จบนิติศาสตร์แล้ว ถ้าอยากว่าความเต็มตัวต้องสอบเนติบัณฑิตซึ่งคนสอบผ่านน้อยมาก","when":{"flag":{"job2-major-law":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"exam","label":"ทุ่มสอบเนติฯ","text":"คุณอ่านหนังสือทั้งปี","effects":[{"stat":"know","d":3},{"stat":"happy","d":-2}],"roll":[{"p":0.3,"text":"ผ่านในรอบแรก คุณเริ่มเป็นทนายความ","effects":[{"role":"lawyer"},{"flag":"job2-placed"},{"flag":"job2-barrister"},{"stat":"happy","d":8},{"pin":"เป็นทนายความ"}]},{"p":0.7,"text":"ไม่ผ่าน ต้องรอสอบรอบหน้า","effects":[{"flag":"job2-bar-tries"},{"stat":"happy","d":-4,"by":"attach"}]}]},
    {"id":"firm","label":"เป็นนิติกรในสำนักงานไปก่อน","text":"มีเงินเดือน แต่ยังว่าความเองไม่ได้","effects":[{"role":"office"},{"flag":"job2-bar-tries"}]}
  ]},
  {"id":"job2-bar-retake","title":"สอบเนติฯ อีกรอบ","body":"เพื่อนร่วมรุ่นบางคนสอบมาห้าครั้งแล้ว คุณจะลองอีกไหม","when":{"flag":{"job2-bar-tries":true},"noFlag":["job2-barrister"],"age":[22,40]},"major":true,"cooldown":6,"choices":[
    {"id":"again","label":"สอบอีกครั้ง","text":"คุณกลับมานั่งท่องตัวบทหลังเลิกงาน","effects":[{"stat":"happy","d":-2},{"stat":"know","d":2}],"roll":[{"p":0.4,"text":"ผ่านแล้ว คุณได้เป็นทนายความเต็มตัว","effects":[{"role":"lawyer"},{"flag":"job2-placed"},{"flag":"job2-barrister"},{"stat":"happy","d":8},{"pin":"สอบผ่านเนติบัณฑิต"}]}]},
    {"id":"stop","label":"พอแล้ว ทำงานสายอื่น","text":"ความรู้กฎหมายยังใช้ได้ในงานบริษัท","effects":[{"flag":"job2-barrister","v":false},{"flag":"job2-bar-tries","v":false},{"flag":"job2-placed"},{"role":"office"},{"stat":"happy","d":2}]}
  ]},
  {"id":"job2-grad-acc","title":"นักบัญชีจบใหม่","body":"สำนักงานบัญชีและบริษัทหลายแห่งรับสมัคร","when":{"flag":{"job2-major-acc":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"firm","label":"สำนักงานสอบบัญชีในกรุงเทพฯ","text":"งานหนักช่วงปิดงบ แต่ได้ประสบการณ์","effects":[{"role":"accountant"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"stat":"know","d":3},{"pin":"เป็นนักบัญชี"}]},
    {"id":"local","label":"บัญชีบริษัทในจังหวัด","text":"งานนิ่ง ใกล้บ้าน","effects":[{"role":"accountant"},{"flag":"job2-placed"},{"move":"home"},{"stat":"bond","d":2},{"pin":"เป็นนักบัญชี"}]},
    {"id":"bank","label":"สมัครพนักงานธนาคาร","text":"ชุดสวย เงินเดือนประจำ มีเป้าขาย","effects":[{"role":"banker"},{"flag":"job2-placed"},{"pin":"เป็นพนักงานธนาคาร"}]}
  ]},
  {"id":"job2-grad-biz","title":"จบบริหารแล้วไปไหน","body":"วุฒิบริหารเปิดได้หลายประตู","when":{"flag":{"job2-major-biz":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"bank","label":"พนักงานธนาคารสาขาในจังหวัด","text":"มั่นคง แต่ต้องขายประกันและบัตรเครดิต","effects":[{"role":"banker"},{"flag":"job2-placed"},{"pin":"เป็นพนักงานธนาคาร"}]},
    {"id":"office","label":"งานขายในบริษัทกรุงเทพฯ","text":"ค่าคอมดีถ้าขายเก่ง","effects":[{"role":"office"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"trait":"social","d":2}]},
    {"id":"own","label":"กลับมาต่อยอดกิจการที่บ้าน","text":"คุณเอาความรู้มาทำร้านของครอบครัวให้เป็นระบบ","effects":[{"role":"business"},{"flag":"job2-placed"},{"move":"home"},{"money":-30,"unit":"wageDay"}],"roll":[{"p":0.55,"text":"ยอดขายดีขึ้น กิจการโตอีกขั้น","effects":[{"inc":"biz"},{"stat":"bond","d":3}]},{"p":0.45,"text":"พ่อแม่ไม่ชอบวิธีใหม่ ทะเลาะกันบ่อย","effects":[{"stat":"bond","d":-4}]}]}
  ]},
  {"id":"job2-grad-arts","title":"จบศิลปะแล้ว","body":"ฝีมือมี แต่งานศิลปะเลี้ยงชีพยาก","when":{"flag":{"job2-major-arts":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"design","label":"นักออกแบบในเอเจนซี","text":"ออกแบบโฆษณา แก้งานตามลูกค้าจนดึก","when":{"year":[2000,2026]},"effects":[{"role":"designer"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"inc":"skill-art"},{"pin":"เป็นนักออกแบบ"}]},
    {"id":"stage","label":"เป็นนักร้องนักแสดง","text":"เดินสายประกวดและรับงานตามเวที","effects":[{"role":"artist"},{"flag":"job2-placed"},{"inc":"skill-music"}],"roll":[{"p":0.3,"text":"มีค่ายเพลงติดต่อมา","effects":[{"stat":"happy","d":8},{"money":20,"unit":"wageDay"}]},{"p":0.7,"text":"งานมีบ้างไม่มีบ้าง","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"teach","label":"เป็นครูศิลปะ","text":"รายได้แน่นอนกว่า ได้สอนเด็ก","effects":[{"role":"teacher"},{"flag":"job2-placed"},{"stat":"happy","d":2}]}
  ]},
  {"id":"job2-grad-edu","title":"ครูจบใหม่","body":"จบครุศาสตร์แล้ว ต้องสอบบรรจุครู","when":{"flag":{"job2-major-edu":true},"edu":{"top":"ba"},"noFlag":["job2-placed"]},"major":true,"cooldown":"once","choices":[
    {"id":"exam","label":"สอบบรรจุ","text":"คุณสอบแข่งกับคนหลายพัน","effects":[{"role":"teacher"},{"flag":"job2-placed"}],"roll":[{"p":0.4,"text":"ติด ได้บรรจุโรงเรียนใกล้บ้าน","effects":[{"flag":"governmentTeacher"},{"move":"home"},{"stat":"happy","d":8},{"pin":"บรรจุเป็นครู"}]},{"p":0.6,"text":"ไม่ติด เป็นครูอัตราจ้างไปก่อน","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"tutor","label":"เปิดสถาบันกวดวิชา","text":"เด็กในอำเภออยากสอบเข้าโรงเรียนดัง","effects":[{"role":"business"},{"flag":"job2-placed"},{"money":-25,"unit":"wageDay"}],"roll":[{"p":0.5,"text":"นักเรียนเต็มห้อง","effects":[{"inc":"biz"}]},{"p":0.5,"text":"นักเรียนน้อย ต้องสอนเองทุกวิชา","effects":[{"stat":"health","d":-2}]}]}
  ]},
  {"id":"job2-selftaught-dev","title":"เขียนโปรแกรมเป็นเอง","body":"คุณหัดเขียนโปรแกรมจากคลิปและเว็บมาหลายปี เพื่อนบอกว่าฝีมือพอสมัครงานได้แล้ว","when":{"year":[2005,2026],"age":[18,40],"any":[{"counter":{"skill-computer":[5,99]}},{"talent":{"computer":[2,3]}}],"noFlag":["job2-placed"],"chance":0.3},"major":true,"cooldown":"once","choices":[
    {"id":"apply","label":"สมัครงานโปรแกรมเมอร์","text":"ไม่มีวุฒิตรงสาย ต้องทำแบบทดสอบหนักกว่าคนอื่น","effects":[{"stat":"happy","d":-1}],"roll":[{"p":0.5,"text":"ผ่านสัมภาษณ์ คุณได้เป็นนักพัฒนาซอฟต์แวร์","effects":[{"role":"developer"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"stat":"happy","d":8},{"pin":"เป็นโปรแกรมเมอร์โดยไม่มีวุฒิสายตรง"}]},{"p":0.5,"text":"ยังไม่ได้ คุณกลับมาฝึกต่อ","effects":[{"inc":"skill-computer"}]}]},
    {"id":"free","label":"รับงานฟรีแลนซ์ทำเว็บ","text":"รายได้ไม่แน่นอน แต่ทำที่บ้านได้","effects":[{"role":"developer"},{"flag":"job2-placed"},{"stat":"bond","d":2}],"roll":[{"p":0.5,"text":"ลูกค้าบอกต่อกัน งานไม่ขาด","effects":[{"money":10,"unit":"wageDay"}]},{"p":0.5,"text":"ลูกค้าเบี้ยวค่าจ้าง","effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":-3}]}]},
    {"id":"no","label":"เก็บไว้เป็นงานอดิเรก","text":"งานเดิมมั่นคงกว่า","effects":[{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-police-exam","title":"สอบตำรวจ","body":"ประกาศรับสมัครนักเรียนนายสิบตำรวจ และนักเรียนนายร้อยตำรวจ","when":{"age":[18,27],"edu":{"top":["m6","pvc","pvs","ba"]},"noFlag":["job2-placed","job2-police-tried"],"chance":0.25},"major":true,"cooldown":"once","choices":[
    {"id":"nco","label":"สอบนายสิบตำรวจ","text":"ซ้อมวิ่ง ว่ายน้ำ และอ่านหนังสือ","effects":[{"flag":"job2-police-tried"},{"stat":"health","d":2}],"roll":[{"p":0.35,"text":"ติด คุณผ่านการฝึกและได้ติดยศ","effects":[{"role":"police"},{"flag":"job2-placed"},{"move":{"kind":"bangkok"}},{"stat":"bond","d":3},{"pin":"เป็นตำรวจ"}]},{"p":0.65,"text":"ไม่ติด","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"cadet","label":"สอบนายร้อยตำรวจ","text":"ที่นั่งน้อยมาก ต้องเก่งทั้งวิชาและร่างกาย","when":{"age":[18,20],"stat":{"know":[70,100]}},"effects":[{"flag":"job2-police-tried"},{"money":-5,"unit":"wageDay"}],"roll":[{"p":0.15,"text":"ติด คุณเรียนสี่ปีแล้วจบเป็นนายร้อย","effects":[{"role":"police"},{"flag":"job2-placed"},{"flag":"job2-police-officer"},{"stat":"happy","d":10},{"pin":"เป็นนายร้อยตำรวจ"}]},{"p":0.85,"text":"ไม่ติด","effects":[{"stat":"happy","d":-4,"by":"attach"}]}]},
    {"id":"no","label":"ไม่สมัคร","text":"คุณไม่อยากใส่เครื่องแบบ","effects":[{"flag":"job2-police-tried"}]}
  ]},
  {"id":"job2-police-home","title":"ขอย้ายกลับบ้าน","body":"ทำงานในกรุงเทพฯ มาหลายปี รอบโยกย้ายประจำปีเปิดให้ยื่นขอกลับภูมิลำเนา","when":{"role":"police","loc":"bangkok","age":[26,50],"chance":0.3},"major":true,"cooldown":12,"choices":[
    {"id":"apply","label":"ยื่นขอย้าย","text":"คนรอคิวเยอะ","roll":[{"p":0.45,"text":"ได้ย้ายกลับมาประจำโรงพักในจังหวัดบ้านเกิด","effects":[{"move":"home"},{"stat":"bond","d":6},{"stat":"happy","d":4},{"pin":"ย้ายกลับบ้าน"}]},{"p":0.55,"text":"ยังไม่ได้ ต้องรอรอบหน้า","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"stay","label":"อยู่กรุงเทพฯ ต่อ","text":"ทางก้าวหน้ามีมากกว่า","effects":[{"stat":"know","d":2},{"stat":"bond","d":-2}]},
    {"id":"quit","label":"ลาออกไปเป็น รปภ. หมู่บ้านใกล้บ้าน","text":"เงินน้อยลง แต่ได้กลับบ้านทันที","effects":[{"role":"security"},{"move":"home"},{"stat":"bond","d":5},{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-law-case","title":"คดีใหญ่คดีแรก","body":"ชาวบ้านหลายครอบครัวถูกฟ้องเรื่องที่ดิน ขณะเดียวกันบริษัทหนึ่งเสนอค่าจ้างสูงให้คุณว่าความอีกคดี","when":{"role":"lawyer","chance":0.35},"major":true,"cooldown":"once","choices":[
    {"id":"villagers","label":"ช่วยชาวบ้าน","text":"ค่าตอบแทนน้อย งานหนัก","effects":[{"stat":"happy","d":3},{"money":-5,"unit":"wageDay"}],"roll":[{"p":0.5,"text":"ศาลตัดสินให้ชาวบ้านชนะ ชื่อคุณเป็นที่รู้จักทั้งจังหวัด","effects":[{"stat":"happy","d":8},{"flag":"job2-law-famous"},{"pin":"ชนะคดีให้ชาวบ้าน"}]},{"p":0.5,"text":"แพ้คดี คุณเสียใจที่ช่วยเขาไม่ได้","effects":[{"stat":"happy","d":-6,"by":"attach"}]}]},
    {"id":"firm","label":"รับคดีบริษัท","text":"ค่าจ้างดี ลูกค้ารายใหญ่จะตามมา","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":-2}]}
  ]},
  {"id":"job2-law-judge","title":"สอบผู้พิพากษาหรืออัยการ","body":"เป็นทนายมาหลายปี มีสิทธิ์สอบผู้ช่วยผู้พิพากษาและอัยการผู้ช่วย","when":{"role":"lawyer","flag":{"job2-barrister":true},"age":[28,45],"chance":0.2},"major":true,"cooldown":"once","choices":[
    {"id":"exam","label":"ลองสอบ","text":"คุณลดงานว่าความลงเพื่ออ่านหนังสือ","effects":[{"money":-15,"unit":"wageDay"}],"roll":[{"p":0.15,"text":"สอบได้ คุณเข้ารับราชการตุลาการ","effects":[{"role":"civil"},{"stat":"happy","d":10},{"pin":"สอบได้ผู้พิพากษา"}]},{"p":0.85,"text":"ไม่ติด กลับไปว่าความต่อ","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"office","label":"เปิดสำนักงานกฎหมายของตัวเอง","text":"ต้องหาลูกความเอง","effects":[{"money":-30,"unit":"wageDay"}],"roll":[{"p":0.55,"text":"ลูกความบอกต่อกัน สำนักงานอยู่ได้","effects":[{"inc":"biz"}]},{"p":0.45,"text":"ลูกความน้อย ค่าเช่าสำนักงานกินเงินเก็บ","effects":[{"stat":"happy","d":-4}]}]}
  ]},
  {"id":"job2-voc-route","title":"เรียนสายอาชีพ","body":"จบ ม.3 แล้ว วิทยาลัยเทคนิคและอาชีวะประจำจังหวัดรับสมัคร มีสาขาช่างยนต์และอาหาร","when":{"age":[15,16],"edu":{"in":"school","grade":[10,10]},"chance":0.4},"major":true,"cooldown":"once","choices":[
    {"id":"mech","label":"ปวช. ช่างยนต์","text":"มือดำทุกวัน แต่ได้วิชาติดตัว","effects":[{"edu":{"in":"voc","grade":1,"place":"วิทยาลัยเทคนิคประจำจังหวัด"}},{"role":"student"},{"flag":"job2-voc-mech"},{"inc":"skill-mechanic","d":2}]},
    {"id":"cook","label":"ปวช. อาหารและโภชนาการ","text":"ฝึกครัวทุกเช้า","effects":[{"edu":{"in":"voc","grade":1,"place":"วิทยาลัยอาชีวศึกษาประจำจังหวัด"}},{"role":"student"},{"flag":"job2-voc-cook"},{"inc":"skill-cooking","d":2}]},
    {"id":"work","label":"ออกมาทำงานเลย","text":"บ้านต้องการเงินตอนนี้","effects":[{"role":"jobless"},{"money":3,"unit":"wageDay"},{"stat":"know","d":-1}]}
  ]},
  {"id":"job2-mechanic","title":"งานช่างซ่อมรถ","body":"ศูนย์บริการรถยนต์ในเมืองและร้านซ่อมมอเตอร์ไซค์กำลังหาช่าง","when":{"age":[17,45],"role":["jobless","farmer","factory","construction","trader","student"],"edu":{"in":null},"any":[{"flag":{"job2-voc-mech":true}},{"counter":{"skill-mechanic":[4,99]}},{"talent":{"mechanic":[1,3]}},{"edu":{"top":["pvc","pvs"]}}],"chance":0.35},"major":true,"cooldown":"once","choices":[
    {"id":"center","label":"ช่างในศูนย์บริการ","text":"มีเงินเดือนและประกันสังคม ต้องทำตามขั้นตอน","effects":[{"role":"mechanic"},{"move":{"kind":"isan","province":"khon-kaen","setting":"urban"}},{"inc":"skill-mechanic"},{"pin":"เป็นช่างซ่อมรถ"}]},
    {"id":"village","label":"ช่างร้านซ่อมในอำเภอ","text":"รายได้ตามงาน ได้อยู่บ้าน","effects":[{"role":"mechanic"},{"move":"home"},{"stat":"bond","d":2},{"inc":"skill-mechanic"},{"pin":"เป็นช่างซ่อมรถ"}]},
    {"id":"no","label":"ทำงานเดิมต่อ","text":"คุณยังไม่อยากเปลี่ยน","effects":[{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-chef","title":"เข้าครัวมืออาชีพ","body":"ร้านอาหารและโรงแรมในเมืองหาคนครัว คนที่ทำอาหารเก่งเริ่มจากผู้ช่วยได้","when":{"age":[17,45],"role":["jobless","farmer","factory","trader","office","student"],"edu":{"in":null},"any":[{"flag":{"job2-voc-cook":true}},{"counter":{"skill-cooking":[3,99]}},{"talent":{"cooking":[1,3]}}],"chance":0.35},"major":true,"cooldown":"once","choices":[
    {"id":"hotel","label":"ครัวโรงแรมในกรุงเทพฯ","text":"ยืนสิบชั่วโมง เชฟใหญ่ดุ แต่ได้เรียนอาหารหลายชาติ","effects":[{"role":"chef"},{"move":{"kind":"bangkok"}},{"inc":"skill-cooking"},{"stat":"health","d":-2},{"pin":"เป็นพ่อครัวแม่ครัว"}]},
    {"id":"local","label":"ครัวร้านอาหารอีสานในเมือง","text":"เมนูคุ้นมือ ลูกค้าเยอะ","effects":[{"role":"chef"},{"inc":"skill-cooking"},{"stat":"happy","d":2},{"pin":"เป็นพ่อครัวแม่ครัว"}]},
    {"id":"no","label":"ไม่เปลี่ยนงาน","text":"ทำอาหารที่บ้านก็พอ","effects":[{"stat":"bond","d":1}]}
  ]},
  {"id":"job2-chef-own","title":"เปิดร้านของตัวเอง","body":"ทำครัวให้คนอื่นมาหลายปี ฝีมือคุณมีลูกค้าตามกิน","when":{"role":"chef","age":[24,55],"chance":0.3},"major":true,"cooldown":"once","choices":[
    {"id":"open","label":"เปิดร้าน","text":"ลงเงินเก็บเกือบหมด","effects":[{"money":-60,"unit":"wageDay"},{"role":"business"}],"roll":[{"p":0.5,"text":"ร้านคนแน่นทุกเย็น","effects":[{"inc":"biz"},{"inc":"biz"},{"stat":"happy","d":8},{"pin":"เปิดร้านอาหารของตัวเอง"}]},{"p":0.3,"text":"ร้านพออยู่ได้","effects":[{"inc":"biz"}]},{"p":0.2,"text":"ทำเลไม่ดี ปิดร้านในปีเดียว กลับไปเป็นลูกจ้าง","effects":[{"role":"chef"},{"cond":"indebted","turns":6},{"stat":"happy","d":-8,"by":"attach"}]}]},
    {"id":"abroad","label":"ไปเป็นเชฟร้านไทยต่างประเทศ","text":"ร้านอาหารไทยในต่างแดนต้องการคนครัว","effects":[{"move":{"kind":"abroad","country":"ญี่ปุ่น"}},{"flag":"job2-abroad"},{"money":20,"unit":"wageDay"},{"cond":"homesick","turns":4}]},
    {"id":"stay","label":"เป็นลูกจ้างต่อ","text":"ไม่ต้องเสี่ยง","effects":[{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-artist","title":"เวทีชีวิต","body":"วงหมอลำรับนักร้องหางเครื่อง รายการประกวดร้องเพลงก็เปิดรับสมัคร","when":{"age":[15,35],"role":["jobless","farmer","factory","trader","student","construction","office"],"any":[{"counter":{"skill-music":[5,99]}},{"talent":{"music":[2,3]}},{"flag":{"tal-music-province":true}}],"chance":0.3},"major":true,"cooldown":"once","choices":[
    {"id":"molam","label":"เข้าวงหมอลำ","text":"ตระเวนเล่นตามงานบุญทั้งภาค นอนบนรถ","effects":[{"role":"artist"},{"inc":"skill-music"},{"stat":"health","d":-2},{"stat":"happy","d":5},{"pin":"เป็นนักร้องหมอลำ"}]},
    {"id":"contest","label":"ประกวดรายการโทรทัศน์","text":"เดินทางไปกรุงเทพฯ ยืนรอคิวออดิชันทั้งวัน","effects":[{"money":-4,"unit":"wageDay"}],"roll":[{"p":0.3,"text":"คุณเข้ารอบลึก มีค่ายเซ็นสัญญา","effects":[{"role":"artist"},{"move":{"kind":"bangkok"}},{"stat":"happy","d":10},{"pin":"ได้เป็นศิลปิน"}]},{"p":0.7,"text":"ตกรอบแรก","effects":[{"stat":"happy","d":-4,"by":"attach"}]}]},
    {"id":"no","label":"ร้องเพลงเป็นงานอดิเรก","text":"งานประจำมั่นคงกว่า","effects":[{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-designer","title":"รับงานออกแบบ","body":"คนเริ่มจ้างออกแบบโลโก้ ฉลากสินค้า และภาพโปรโมตออนไลน์","when":{"year":[2003,2026],"age":[17,40],"role":["jobless","farmer","factory","trader","office","student"],"any":[{"counter":{"skill-art":[5,99]}},{"talent":{"art":[2,3]}}],"chance":0.3},"major":true,"cooldown":"once","choices":[
    {"id":"agency","label":"สมัครงานบริษัทออกแบบ","text":"มีพอร์ตงานก็สมัครได้แม้ไม่มีวุฒิสายตรง","roll":[{"p":0.55,"text":"ได้งาน คุณเป็นนักออกแบบเต็มตัว","effects":[{"role":"designer"},{"move":{"kind":"bangkok"}},{"stat":"happy","d":6},{"pin":"เป็นนักออกแบบ"}]},{"p":0.45,"text":"ยังไม่ได้ เขาว่าพอร์ตยังบาง","effects":[{"inc":"skill-art"},{"stat":"happy","d":-2}]}]},
    {"id":"free","label":"ฟรีแลนซ์จากบ้าน","text":"รับงานร้านค้าในจังหวัด","effects":[{"role":"designer"},{"stat":"bond","d":2},{"money":-3,"unit":"wageDay"}]},
    {"id":"no","label":"ไม่เอา","text":"วาดไว้ดูเองก็สุขใจ","effects":[{"stat":"happy","d":1}]}
  ]},
  {"id":"job2-creator","title":"ทำคอนเทนต์เต็มตัว","body":"คลิปของคุณมีคนติดตามหลักหมื่น บางเดือนรายได้จากแพลตฟอร์มมากกว่างานประจำ","when":{"year":[2012,2026],"age":[15,45],"any":[{"flag":{"tal-creator":true}},{"talent":{"speech":[1,3]}},{"talent":{"gaming":[2,3]}},{"talent":{"music":[2,3]}},{"talent":{"cooking":[2,3]}}],"noFlag":["job2-creator-tried"],"chance":0.15},"major":true,"cooldown":"once","choices":[
    {"id":"full","label":"ลาออกมาทำเต็มเวลา","text":"ไม่มีเงินเดือน ยอดวิวคือรายได้","effects":[{"role":"creator"},{"flag":"job2-creator-tried"},{"money":-5,"unit":"wageDay"},{"pin":"เป็นครีเอเตอร์"}]},
    {"id":"side","label":"ทำควบงานเดิม","text":"เหนื่อยสองเท่า แต่ไม่เสี่ยง","effects":[{"flag":"job2-creator-tried"},{"stat":"health","d":-2},{"money":4,"unit":"wageDay"}]}
  ]},
  {"id":"job2-rider","title":"ขี่รถส่งของ","body":"แอปส่งอาหารและพัสดุรับคนขับเพิ่ม เลือกเวลาทำงานเองได้","when":{"year":[2019,2026],"age":[18,55],"role":["jobless","factory","trader","construction","farmer","office"],"noFlag":["career-rider"],"chance":0.15},"major":true,"cooldown":"once","choices":[
    {"id":"go","label":"สมัครไรเดอร์","text":"รายได้ตามจำนวนรอบ แดดฝนต้องสู้","effects":[{"role":"rider"},{"money":-5,"unit":"wageDay"},{"pin":"เป็นไรเดอร์"}]},
    {"id":"no","label":"ไม่สมัคร","text":"ถนนในเมืองอันตรายเกินไป","effects":[{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-security","title":"รับสมัคร รปภ.","body":"บริษัทรักษาความปลอดภัยรับคนไม่จำกัดวุฒิ เข้ากะดึกหรือกะเช้า","when":{"age":[20,60],"role":["jobless","farmer","construction","factory"],"chance":0.1},"major":true,"cooldown":"once","choices":[
    {"id":"go","label":"สมัคร","text":"งานไม่หนักแรง แต่เวลานอนกลับหัว","effects":[{"role":"security"},{"stat":"health","d":-1},{"pin":"เป็น รปภ."}]},
    {"id":"no","label":"ไม่เอา","text":"คุณหางานอื่นต่อ","effects":[]}
  ]},
  {"id":"job2-housekeeper","title":"งานแม่บ้าน","body":"โรงแรมและคอนโดในเมืองรับพนักงานทำความสะอาด มีบ้านคนรวยรับแม่บ้านอยู่ประจำด้วย","when":{"age":[18,60],"role":["jobless","farmer","factory","trader"],"chance":0.1},"major":true,"cooldown":"once","choices":[
    {"id":"hotel","label":"แม่บ้านโรงแรม","text":"ได้ทิปบ้าง ยืนเดินทั้งวัน","effects":[{"role":"housekeeper"},{"move":{"kind":"bangkok"}},{"pin":"ทำงานแม่บ้าน"}]},
    {"id":"live","label":"แม่บ้านอยู่ประจำ","text":"มีที่พักกินฟรี แต่ไม่ค่อยได้กลับบ้าน","effects":[{"role":"housekeeper"},{"move":{"kind":"bangkok"}},{"money":5,"unit":"wageDay"},{"cond":"lonely","turns":3},{"pin":"ทำงานแม่บ้าน"}]},
    {"id":"no","label":"ไม่ไป","text":"อยู่บ้านต่อ","effects":[{"stat":"bond","d":1}]}
  ]},
  {"id":"job2-athlete","title":"เป็นนักกีฬาอาชีพ","body":"แมวมองสโมสรและค่ายมวยมาดูคุณ อยากให้มาซ้อมเต็มตัว","when":{"age":[15,22],"any":[{"talent":{"sport":[2,3]}},{"talent":{"muaythai":[2,3]}},{"counter":{"skill-sport":[5,99]}},{"counter":{"skill-muaythai":[5,99]}},{"flag":{"tal-sport-national":true}},{"flag":{"tal-muaythai-national":true}}],"chance":0.4},"major":true,"cooldown":"once","choices":[
    {"id":"club","label":"เข้าสโมสรฟุตบอลหรือวอลเลย์บอล","text":"ซ้อมวันละสองรอบ เรียนไปด้วย","effects":[{"role":"athlete"},{"stat":"health","d":4},{"stat":"know","d":-2},{"inc":"skill-sport"},{"pin":"เป็นนักกีฬาอาชีพ"}]},
    {"id":"muay","label":"เข้าค่ายมวย","text":"ขึ้นชกตามเวทีงานวัดก่อนไปเวทีใหญ่","effects":[{"role":"athlete"},{"stat":"health","d":2},{"inc":"skill-muaythai"},{"pin":"เป็นนักมวยอาชีพ"}],"roll":[{"p":0.2,"text":"คุณชนะติดกันหลายไฟต์ เงินรางวัลส่งให้ที่บ้าน","effects":[{"money":15,"unit":"wageDay"},{"stat":"happy","d":6}]}]},
    {"id":"study","label":"ตั้งใจเรียนก่อน","text":"เล่นกีฬาเป็นงานอดิเรก","effects":[{"stat":"know","d":2},{"stat":"happy","d":-2}]}
  ]},
  {"id":"job2-athlete-retire","title":"แขวนรองเท้า","body":"ร่างกายเริ่มไม่ไหว ถึงเวลาคิดเรื่องหลังเลิกเล่น","when":{"role":"athlete","age":[29,38],"chance":0.4},"major":true,"cooldown":"once","choices":[
    {"id":"coach","label":"เป็นโค้ชเด็ก","text":"รายได้ลดลง แต่ได้ส่งต่อวิชา","effects":[{"role":"teacher"},{"stat":"happy","d":3},{"pin":"เลิกเล่นมาเป็นโค้ช"}]},
    {"id":"shop","label":"เปิดร้านหรือค่ายของตัวเอง","text":"ใช้ชื่อเสียงที่มีดึงลูกค้า","effects":[{"role":"business"},{"money":-30,"unit":"wageDay"}],"roll":[{"p":0.5,"text":"คนมาสมัครเรียนเยอะ","effects":[{"inc":"biz"}]},{"p":0.5,"text":"คนลืมชื่อคุณเร็วกว่าที่คิด","effects":[{"stat":"happy","d":-4}]}]},
    {"id":"guard","label":"ทำงาน รปภ.","text":"งานมั่นคงพอเลี้ยงตัว","effects":[{"role":"security"},{"stat":"happy","d":-3}]}
  ]},
  {"id":"job2-business","title":"อยากเป็นเถ้าแก่","body":"ทำงานกินเงินเดือนมาหลายปี มีเงินเก็บก้อนหนึ่ง","when":{"age":[28,55],"role":["office","factory","engineer","accountant","banker","developer","nurse","pharmacist","designer","trader"],"money":[100000,999999999],"chance":0.1},"major":true,"cooldown":"once","choices":[
    {"id":"open","label":"ลาออกมาทำธุรกิจ","text":"คุณเปิดร้านกาแฟกับคาร์แคร์ในอำเภอ","effects":[{"role":"business"},{"move":"home"},{"money":-80,"unit":"wageDay"}],"roll":[{"p":0.45,"text":"กิจการไปได้ดี","effects":[{"inc":"biz"},{"inc":"biz"},{"stat":"happy","d":6},{"pin":"เป็นเจ้าของกิจการ"}]},{"p":0.35,"text":"พออยู่ได้ เหนื่อยกว่าที่คิด","effects":[{"inc":"biz"},{"stat":"health","d":-2}]},{"p":0.2,"text":"ขาดทุนจนต้องปิด กลับไปหางานประจำ","effects":[{"role":"jobless"},{"cond":"indebted","turns":6},{"stat":"happy","d":-8,"by":"attach"}]}]},
    {"id":"no","label":"เก็บเงินไว้","text":"ความมั่นคงสำคัญกว่า","effects":[{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-switch","title":"อยากเปลี่ยนสายงาน","body":"ทำงานเดิมมานาน คุณเริ่มสงสัยว่านี่คือสิ่งที่อยากทำไปจนแก่ไหม","when":{"age":[33,52],"role":["doctor","nurse","engineer","developer","police","lawyer","pharmacist","accountant","banker","chef","mechanic","artist","creator","rider","security","housekeeper","athlete","designer"],"chance":0.08},"major":true,"cooldown":"once","choices":[
    {"id":"farm","label":"กลับไปทำเกษตรที่บ้าน","text":"รายได้ไม่แน่นอน แต่ได้อยู่กับพ่อแม่","effects":[{"role":"farmer"},{"move":"home"},{"stat":"bond","d":6},{"stat":"happy","d":3},{"pin":"กลับบ้านมาทำเกษตร"}]},
    {"id":"trade","label":"ค้าขายเล็กๆ","text":"เปิดแผงในตลาด","effects":[{"role":"trader"},{"money":-10,"unit":"wageDay"},{"stat":"happy","d":2}]},
    {"id":"code","label":"หัดเขียนโปรแกรมใหม่","text":"คุณลงคอร์สออนไลน์ตอนกลางคืน","when":{"year":[2012,2026]},"effects":[{"inc":"skill-computer","d":3},{"money":-8,"unit":"wageDay"}],"roll":[{"p":0.3,"text":"ได้งานนักพัฒนาซอฟต์แวร์รุ่นเล็ก","effects":[{"role":"developer"},{"pin":"เปลี่ยนสายมาเขียนโปรแกรม"}]},{"p":0.7,"text":"ยากกว่าที่คิด คุณทำงานเดิมต่อ","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"stay","label":"ทนต่อ","text":"อีกไม่กี่ปีก็ลงตัว","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":1}]}
  ]},
  {"id":"job2-dev-dotcom","title":"ฟองสบู่ดอทคอม","body":"ข่าวบริษัทอินเทอร์เน็ตทั่วโลกล้ม โปรเจกต์ที่คุณทำถูกพักไว้","when":{"role":"developer","year":[2001,2002]},"major":true,"cooldown":"once","choices":[
    {"id":"hold","label":"อยู่ต่อแม้ลดเงินเดือน","text":"ช่วงนี้เงินน้อยแต่ยังมีงาน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-2}]},
    {"id":"gov","label":"ไปทำไอทีหน่วยงานรัฐ","text":"เงินน้อยกว่าแต่มั่นคง","effects":[{"role":"civil"},{"stat":"happy","d":1}]}
  ]},
  {"id":"job2-dev-ai","title":"เครื่องมือ AI มาแรง","body":"บริษัทเริ่มใช้ AI ช่วยเขียนโค้ด และประกาศลดคน","when":{"role":"developer","year":[2023,2026],"chance":0.4},"major":true,"cooldown":"once","choices":[
    {"id":"learn","label":"เรียนใช้เครื่องมือใหม่ให้เก่ง","text":"คุณปรับตัวเร็ว","effects":[{"inc":"skill-computer"},{"stat":"know","d":3}],"roll":[{"p":0.75,"text":"คุณรอดจากการลดคน งานเร็วขึ้น","effects":[{"stat":"happy","d":3}]},{"p":0.25,"text":"ถึงอย่างนั้นทีมก็ถูกยุบ","effects":[{"role":"jobless"},{"money":15,"unit":"wageDay"},{"stat":"happy","d":-6,"by":"attach"}]}]},
    {"id":"ignore","label":"ทำงานแบบเดิม","text":"คุณเชื่อว่าประสบการณ์ยังสำคัญ","roll":[{"p":0.45,"text":"คุณถูกเลิกจ้างพร้อมค่าชดเชย","effects":[{"role":"jobless"},{"money":15,"unit":"wageDay"},{"stat":"happy","d":-6,"by":"attach"}]}]},
    {"id":"home","label":"รับงานทางไกล ย้ายกลับอีสาน","text":"เงินเดือนเท่าเดิม ค่าครองชีพถูกลง","effects":[{"move":"home"},{"stat":"bond","d":5},{"cond":"lonely","turns":2}]}
  ]},
  {"id":"job2-eng-abroad","title":"งานวิศวกรต่างแดน","body":"บริษัทรับเหมาข้ามชาติหาวิศวกรไทยไปคุมโครงการในตะวันออกกลาง สัญญาสองปี","when":{"role":"engineer","age":[26,45],"chance":0.2},"major":true,"cooldown":"once","choices":[
    {"id":"go","label":"ไป","text":"เงินเดือนหลายเท่า ร้อนจัด ห่างครอบครัว","effects":[{"move":{"kind":"abroad","country":"กาตาร์"}},{"flag":"job2-abroad"},{"money":60,"unit":"wageDay"},{"stat":"bond","d":-4},{"cond":"homesick","turns":4},{"pin":"ไปเป็นวิศวกรต่างแดน"}]},
    {"id":"stay","label":"อยู่เมืองไทย","text":"เงินน้อยกว่าแต่ได้อยู่กับครอบครัว","effects":[{"stat":"bond","d":3}]}
  ]}
]);
KI.data.personalEvents.push(...[
  {"id":"job2-doc-night","title":"เวรดึกห้องฉุกเฉิน","body":"ตีสามมีคนไข้อุบัติเหตุเข้ามาพร้อมกันหลายราย","when":{"role":"doctor"},"w":10,"cooldown":9,"choices":[
    {"id":"all","label":"อยู่ต่อจนเช้า","text":"คุณช่วยไว้ได้หลายชีวิต แต่แทบยืนไม่ไหว","effects":[{"stat":"health","d":-3},{"stat":"happy","d":3}]},
    {"id":"refer","label":"ส่งต่อเคสหนักไปโรงพยาบาลใหญ่","text":"ปลอดภัยกว่าสำหรับคนไข้ คุณได้พักบ้าง","effects":[{"stat":"health","d":-1}],"roll":[{"p":0.2,"text":"คนไข้หนึ่งรายไปไม่ถึง คุณคิดถึงเรื่องนี้อยู่นาน","effects":[{"stat":"happy","d":-6,"by":"attach"}]}]}
  ]},
  {"id":"job2-doc-clinic","title":"เปิดคลินิกตอนเย็น","body":"ชาวบ้านอยากให้หมอเปิดคลินิกหลังเลิกงาน","when":{"role":"doctor","age":[30,60]},"w":6,"cooldown":"once","choices":[
    {"id":"open","label":"เปิด","text":"รายได้เพิ่มมาก เวลาพักแทบไม่มี","effects":[{"money":-20,"unit":"wageDay"},{"inc":"biz"},{"stat":"health","d":-3},{"stat":"bond","d":-2}]},
    {"id":"no","label":"ไม่เปิด","text":"เก็บเวลาไว้ให้ครอบครัว","effects":[{"stat":"bond","d":3}]}
  ]},
  {"id":"job2-nurse-shift","title":"ควงเวร","body":"พยาบาลในวอร์ดลาออกไปสองคน หัวหน้าขอให้ควงเวรดึกต่อเวรเช้า","when":{"role":"nurse"},"w":10,"cooldown":9,"choices":[
    {"id":"yes","label":"รับควงเวร","text":"ได้ค่าเวรเพิ่ม ร่างกายล้า","effects":[{"money":4,"unit":"wageDay"},{"stat":"health","d":-3}]},
    {"id":"no","label":"ปฏิเสธ","text":"หัวหน้าไม่พอใจ แต่คุณได้นอน","effects":[{"stat":"health","d":1},{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-pharm-day","title":"ลูกค้าขอซื้อยาแรง","body":"ลูกค้าขอซื้อยาปฏิชีวนะโดยไม่บอกอาการ","when":{"role":"pharmacist"},"w":8,"cooldown":12,"choices":[
    {"id":"ask","label":"ซักอาการก่อน","text":"ลูกค้าบ่น แต่คุณแนะนำยาที่เหมาะกว่า","effects":[{"stat":"happy","d":2}]},
    {"id":"sell","label":"ขายให้ไปตามขอ","text":"ได้ยอดขาย แต่ใจไม่สบาย","effects":[{"money":1,"unit":"wageDay"},{"stat":"happy","d":-2}]}
  ]},
  {"id":"job2-eng-site","title":"งานล่าช้า","body":"ผู้รับเหมาขอให้คุณเซ็นผ่านงานที่ยังไม่ได้มาตรฐานเพื่อให้ทันกำหนด","when":{"role":"engineer"},"w":8,"cooldown":12,"choices":[
    {"id":"refuse","label":"ไม่เซ็น สั่งแก้","text":"งานช้าและโดนตำหนิ แต่โครงสร้างปลอดภัย","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":1}]},
    {"id":"sign","label":"เซ็นไปก่อน","text":"ทุกคนพอใจ แต่คุณกังวลทุกครั้งที่ผ่านอาคารนั้น","effects":[{"money":3,"unit":"wageDay"},{"stat":"happy","d":-3},{"flag":"job2-eng-signed"}]}
  ]},
  {"id":"job2-dev-crunch","title":"ปิดโปรเจกต์","body":"ระบบต้องขึ้นจริงสัปดาห์หน้า ทีมทำงานถึงตีสองทุกคืน","when":{"role":"developer"},"w":10,"cooldown":9,"choices":[
    {"id":"push","label":"ลุยจนเสร็จ","text":"งานเสร็จทัน ได้โบนัส แต่หลังพัง","effects":[{"money":8,"unit":"wageDay"},{"stat":"health","d":-3}]},
    {"id":"limit","label":"ขอเลื่อนบางส่วน","text":"หัวหน้าไม่ชอบ แต่คุณยังไหว","effects":[{"stat":"happy","d":1}]},
    {"id":"move","label":"หางานใหม่ที่เงินดีกว่า","text":"คนเขียนโปรแกรมเปลี่ยนงานกันบ่อย","effects":[{"stat":"happy","d":2}],"roll":[{"p":0.6,"text":"ได้งานใหม่ เงินเดือนขึ้น","effects":[{"money":10,"unit":"wageDay"}]},{"p":0.4,"text":"ที่ใหม่วุ่นกว่าเดิม","effects":[{"stat":"happy","d":-3}]}]}
  ]},
  {"id":"job2-dev-app","title":"ไอเดียแอปมือถือ","body":"ยุคสมาร์ตโฟน เพื่อนชวนทำแอปขายของชุมชนในเวลาว่าง","when":{"role":"developer","year":[2011,2019]},"w":8,"cooldown":"once","choices":[
    {"id":"build","label":"ลงมือทำ","text":"เสียเงินค่าเซิร์ฟเวอร์และเวลานอน","effects":[{"money":-8,"unit":"wageDay"},{"stat":"health","d":-1}],"roll":[{"p":0.2,"text":"มีบริษัทมาขอซื้อแอป","effects":[{"money":80,"unit":"wageDay"},{"stat":"happy","d":8}]},{"p":0.8,"text":"คนใช้น้อย ปิดไปเงียบๆ","effects":[{"stat":"know","d":2}]}]},
    {"id":"no","label":"ไม่ทำ","text":"พักผ่อนดีกว่า","effects":[{"stat":"happy","d":1}]}
  ]},
  {"id":"job2-police-duty","title":"เวรตั้งด่าน","body":"คืนวันหยุดยาว ต้องตั้งด่านตรวจคนเมาแล้วขับ","when":{"role":"police"},"w":10,"cooldown":9,"choices":[
    {"id":"strict","label":"ตรวจเข้มทุกคัน","text":"มีคนไม่พอใจ แต่ถนนปลอดภัยขึ้น","effects":[{"stat":"health","d":-1},{"stat":"happy","d":1}]},
    {"id":"relax","label":"ตรวจพอเป็นพิธี","text":"เลิกเร็ว ได้กลับบ้าน","effects":[{"stat":"happy","d":1}],"roll":[{"p":0.2,"text":"เช้ามามีข่าวอุบัติเหตุใหญ่บนเส้นที่คุณดูแล","effects":[{"stat":"happy","d":-5,"by":"attach"}]}]}
  ]},
  {"id":"job2-acc-season","title":"ช่วงปิดงบ","body":"ลูกค้าส่งเอกสารมาเป็นกองในสัปดาห์สุดท้าย","when":{"role":"accountant"},"w":10,"cooldown":9,"choices":[
    {"id":"ot","label":"ทำโอทีจนเสร็จ","text":"ได้เงินเพิ่ม นอนน้อย","effects":[{"money":4,"unit":"wageDay"},{"stat":"health","d":-2}]},
    {"id":"own","label":"แยกออกมารับทำบัญชีเอง","text":"ลูกค้าร้านค้าในจังหวัดเริ่มต้องยื่นภาษีออนไลน์","effects":[{"money":-10,"unit":"wageDay"}],"roll":[{"p":0.5,"text":"ลูกค้าบอกต่อกัน สำนักงานเล็กของคุณอยู่ได้","effects":[{"role":"business"},{"inc":"biz"}]},{"p":0.5,"text":"ลูกค้าน้อย คุณกลับไปทำงานประจำ","effects":[{"stat":"happy","d":-3}]}]}
  ]},
  {"id":"job2-bank-target","title":"เป้ายอดขายประกัน","body":"หัวหน้าสาขากดดันให้ขายประกันออมทรัพย์ให้ลูกค้าผู้สูงอายุ","when":{"role":"banker"},"w":10,"cooldown":9,"choices":[
    {"id":"honest","label":"อธิบายเงื่อนไขตรงๆ","text":"ขายได้น้อยลง โดนตำหนิในที่ประชุม","effects":[{"stat":"happy","d":-1},{"trait":"grit","d":1}]},
    {"id":"push","label":"เร่งปิดยอด","text":"ได้ค่าคอม แต่ลูกค้าบางคนกลับมาต่อว่า","effects":[{"money":6,"unit":"wageDay"},{"stat":"happy","d":-3}]}
  ]},
  {"id":"job2-bank-branch","title":"สาขาถูกยุบ","body":"คนใช้แอปธนาคารมากขึ้น สาขาในอำเภอถูกควบรวม","when":{"role":"banker","year":[2017,2026]},"w":8,"cooldown":"once","choices":[
    {"id":"move","label":"ย้ายไปสาขาในเมือง","text":"เดินทางไกลขึ้น","effects":[{"stat":"happy","d":-2}]},
    {"id":"early","label":"รับเงินออกก่อนกำหนด","text":"ได้เงินก้อน ต้องหางานใหม่","effects":[{"role":"jobless"},{"money":40,"unit":"wageDay"},{"stat":"happy","d":-2}]}
  ]},
  {"id":"job2-chef-burn","title":"มีดบาด ไฟลวก","body":"ครัวร้อนจัด ออเดอร์ล้นทุกคืน","when":{"role":"chef"},"w":10,"cooldown":9,"choices":[
    {"id":"careful","label":"ทำช้าลงแต่ปลอดภัย","text":"เชฟบ่นว่าช้า","effects":[{"stat":"happy","d":-1}]},
    {"id":"fast","label":"เร่งให้ทันออเดอร์","text":"ได้คำชม","effects":[{"stat":"happy","d":2}],"roll":[{"p":0.25,"text":"น้ำมันกระเด็นลวกแขน ต้องหยุดงานหลายวัน","effects":[{"stat":"health","d":-5},{"money":-3,"unit":"wageDay"}]}]}
  ]},
  {"id":"job2-mech-ev","title":"รถไฟฟ้ามาถึง","body":"รถยนต์ไฟฟ้าเริ่มวิ่งในจังหวัด ศูนย์ฝึกเปิดอบรมช่างระบบไฟฟ้า","when":{"role":"mechanic","year":[2021,2026]},"w":8,"cooldown":"once","choices":[
    {"id":"train","label":"ไปอบรม","text":"เสียเงินและเวลา แต่ได้วิชาใหม่","effects":[{"money":-6,"unit":"wageDay"},{"inc":"skill-mechanic","d":2},{"stat":"know","d":3}]},
    {"id":"no","label":"ซ่อมรถน้ำมันต่อ","text":"ลูกค้าเก่ายังเยอะ","effects":[{"stat":"happy","d":1}]}
  ]},
  {"id":"job2-mech-own","title":"ลูกค้าตามมาที่บ้าน","body":"ลูกค้าหลายคนอยากให้คุณซ่อมเองนอกเวลา","when":{"role":"mechanic","age":[25,55]},"w":6,"cooldown":"once","choices":[
    {"id":"open","label":"เปิดอู่ของตัวเอง","text":"ลงทุนเครื่องมือ","effects":[{"role":"business"},{"money":-40,"unit":"wageDay"}],"roll":[{"p":0.6,"text":"อู่มีรถเข้าทุกวัน","effects":[{"inc":"biz"},{"stat":"happy","d":5}]},{"p":0.4,"text":"งานน้อย กลับไปเป็นลูกจ้าง","effects":[{"role":"mechanic"},{"stat":"happy","d":-4}]}]},
    {"id":"no","label":"ทำที่เดิม","text":"มีเงินเดือนแน่นอน","effects":[]}
  ]},
  {"id":"job2-artist-hit","title":"เพลงดังหรือเงียบ","body":"คุณออกเพลงใหม่ ค่ายบอกว่าต้องโปรโมตเองด้วย","when":{"role":"artist"},"w":10,"cooldown":9,"choices":[
    {"id":"tour","label":"ตระเวนออกงานทุกคืน","text":"ได้ใกล้ชิดแฟนเพลง ร่างกายทรุด","effects":[{"stat":"health","d":-3}],"roll":[{"p":0.25,"text":"เพลงดังทั่วภาค คิวงานเต็ม","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":8},{"pin":"มีเพลงดัง"}]},{"p":0.75,"text":"คนฟังบ้าง ไม่ฟังบ้าง","effects":[{"money":5,"unit":"wageDay"}]}]},
    {"id":"rest","label":"รับงานเท่าที่ไหว","text":"รายได้น้อยลง ใจสบาย","effects":[{"stat":"happy","d":1}]},
    {"id":"quit","label":"เลิกร้องเพลง หางานประจำ","text":"ความฝันพักไว้ก่อน","effects":[{"role":"office"},{"stat":"happy","d":-4,"by":"attach"}]}
  ]},
  {"id":"job2-creator-viral","title":"คลิปไวรัล","body":"คลิปหนึ่งของคุณยอดวิวพุ่งข้ามคืน","when":{"role":"creator"},"w":10,"cooldown":9,"choices":[
    {"id":"ride","label":"ทำคลิปต่อเนื่องทุกวัน","text":"แบรนด์ติดต่อมา แต่คุณแทบไม่ได้พัก","effects":[{"stat":"health","d":-2}],"roll":[{"p":0.4,"text":"ได้สปอนเซอร์ก้อนใหญ่","effects":[{"money":30,"unit":"wageDay"},{"stat":"happy","d":6}]},{"p":0.4,"text":"ยอดตกลงเร็ว คุณเครียดกับตัวเลข","effects":[{"stat":"happy","d":-4}]},{"p":0.2,"text":"คนในเน็ตด่าทอคุณหนัก คุณหมดไฟ","effects":[{"stat":"happy","d":-8,"by":"attach"},{"cond":"lonely","turns":3}]}]},
    {"id":"slow","label":"ทำเท่าเดิม","text":"โตช้าแต่ยั่งยืน","effects":[{"money":5,"unit":"wageDay"}]},
    {"id":"quit","label":"เลิกทำ กลับไปทำงานประจำ","text":"คุณอยากมีรายได้แน่นอน","effects":[{"role":"office"},{"stat":"happy","d":1}]}
  ]},
  {"id":"job2-rider-rain","title":"ฝนตกหนักกลางเมือง","body":"ค่ารอบขึ้นช่วงฝนตก ถนนลื่นและมืด","when":{"role":"rider"},"w":10,"cooldown":6,"heavy":true,"choices":[
    {"id":"rush","label":"รีบวิ่งรอบเพิ่ม","text":"ได้เงินมากแต่ขับเร็ว","effects":[{"money":3,"unit":"wageDay"}],"roll":[{"p":0.15,"text":"รถล้มกลางสี่แยก ต้องพักรักษาตัวหลายสัปดาห์","effects":[{"stat":"health","d":-8},{"money":-8,"unit":"wageDay"},{"die":"road","p":0.03}]}]},
    {"id":"wait","label":"จอดหลบฝน","text":"เสียรายได้ช่วงพีค แต่ปลอดภัย","effects":[{"stat":"happy","d":-1}]},
    {"id":"quit","label":"เลิกวิ่ง ไปหางานในร่ม","text":"คุณสมัครเป็น รปภ. ในห้าง","effects":[{"role":"security"},{"stat":"happy","d":-1}]}
  ]},
  {"id":"job2-security-night","title":"กะดึกในป้อม","body":"คืนนี้เงียบมาก มีรถแปลกจอดหน้าหมู่บ้านนาน","when":{"role":"security"},"w":8,"cooldown":9,"choices":[
    {"id":"check","label":"เดินไปตรวจ","text":"แค่คนมารอรับญาติ แต่ลูกบ้านชมว่าใส่ใจ","effects":[{"stat":"happy","d":2}]},
    {"id":"call","label":"แจ้งตำรวจแล้วรอในป้อม","text":"ปลอดภัยกว่า","effects":[{"stat":"health","d":-1}]}
  ]},
  {"id":"job2-housekeeper-day","title":"แม่บ้านเจอของลืม","body":"ทำความสะอาดห้องแล้วเจอกระเป๋าเงินหนาที่แขกลืมไว้","when":{"role":"housekeeper"},"w":8,"cooldown":"once","choices":[
    {"id":"return","label":"ส่งคืนเคาน์เตอร์","text":"แขกให้รางวัลและหัวหน้าชม","effects":[{"money":3,"unit":"wageDay"},{"stat":"happy","d":3}]},
    {"id":"quit","label":"ลาออกไปเปิดร้านซักรีดที่บ้าน","text":"เบื่อเดินทั้งวัน อยากเป็นนายตัวเอง","effects":[{"role":"business"},{"move":"home"},{"money":-20,"unit":"wageDay"}],"roll":[{"p":0.55,"text":"ร้านมีลูกค้าประจำ","effects":[{"inc":"biz"}]},{"p":0.45,"text":"ลูกค้าน้อย รายได้ไม่แน่นอน","effects":[{"stat":"happy","d":-3}]}]}
  ]},
  {"id":"job2-athlete-injury","title":"บาดเจ็บระหว่างแข่ง","body":"เข่าบิดกลางเกม หมอบอกต้องพักยาว","when":{"role":"athlete"},"w":8,"cooldown":12,"choices":[
    {"id":"rest","label":"พักรักษาให้หาย","text":"เสียรายได้หลายเดือน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"health","d":-2},{"stat":"happy","d":-2}]},
    {"id":"play","label":"ฉีดยาแล้วลงต่อ","text":"ทีมต้องการคุณ","effects":[{"money":5,"unit":"wageDay"}],"roll":[{"p":0.4,"text":"อาการหนักขึ้นจนต้องเลิกเล่นถาวร","effects":[{"stat":"health","d":-8},{"role":"jobless"},{"stat":"happy","d":-8,"by":"attach"}]}]}
  ]},
  {"id":"job2-designer-client","title":"ลูกค้าแก้งานรอบที่สิบ","body":"ลูกค้าขอแก้โลโก้อีกครั้ง โดยไม่จ่ายเพิ่ม","when":{"role":"designer"},"w":10,"cooldown":9,"choices":[
    {"id":"fix","label":"แก้ให้","text":"ลูกค้ากลับมาจ้างอีก","effects":[{"stat":"happy","d":-2},{"money":2,"unit":"wageDay"}]},
    {"id":"charge","label":"แจ้งค่าแก้เพิ่ม","text":"ลูกค้าบางรายหายไป แต่คุณมีค่าตัว","effects":[{"stat":"happy","d":2}]}
  ]},
  {"id":"job2-pro-return","title":"กลับมาทำงานที่อีสาน","body":"เพื่อนร่วมรุ่นหลายคนย้ายกลับมาทำงานในเมืองใหญ่ของอีสาน เงินน้อยกว่าแต่ใกล้บ้าน","when":{"loc":"bangkok","role":["engineer","developer","accountant","designer","nurse","pharmacist","banker","chef"],"age":[27,50]},"w":6,"cooldown":"once","choices":[
    {"id":"go","label":"ย้ายกลับ","text":"ได้กินข้าวกับพ่อแม่ทุกสัปดาห์","effects":[{"move":{"kind":"isan","province":"khon-kaen","setting":"urban"}},{"stat":"bond","d":5},{"money":-5,"unit":"wageDay"}]},
    {"id":"stay","label":"อยู่กรุงเทพฯ ต่อ","text":"โอกาสก้าวหน้ามากกว่า","effects":[{"stat":"bond","d":-2},{"money":5,"unit":"wageDay"}]}
  ]}
]);
