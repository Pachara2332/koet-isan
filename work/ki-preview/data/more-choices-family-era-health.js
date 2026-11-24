globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const add = {
    "fam-father-passed": [{"id":"ordain-fire","label":"บวชหน้าไฟให้พ่อ","text":"คุณโกนหัวห่มผ้าเหลืองหน้าเมรุ ญาติพี่น้องบอกว่าพ่อคงได้บุญ","when":{"sex":"m","age":[15,100]},"effects":[{"flag":"parentPassed","v":false},{"cond":"grieving","turns":2,"by":"attach"},{"stat":"bond","d":5},{"stat":"happy","d":2}]}],
    "fam-mother-passed": [{"id":"ordain-fire","label":"บวชหน้าไฟให้แม่","text":"คุณบวชหน้าไฟส่งแม่ ญาติๆ ยกมือไหว้ด้วยน้ำตา","when":{"sex":"m","age":[15,100]},"effects":[{"flag":"parentPassed","v":false},{"cond":"grieving","turns":2,"by":"attach"},{"stat":"bond","d":5},{"stat":"happy","d":2}]}],
    "fam-parents-to-bangkok": [
      {"id":"go-along","label":"ขอตามไปกรุงเทพฯ ด้วย","text":"คุณได้อยู่กับพ่อแม่ในห้องเช่าแคบๆ แต่ต้องย้ายโรงเรียนและคิดถึงเพื่อนที่บ้าน","effects":[{"flag":"fam-parentsStayed"},{"stat":"bond","d":4},{"stat":"happy","d":-2},{"cond":"homesick","turns":3}]},
      {"id":"aunt","label":"ไปอยู่กับน้าในตัวอำเภอ","text":"น้ารับไปอยู่ใกล้โรงเรียนดีๆ แต่บ้านน้าก็ไม่ใช่บ้านตัวเอง","effects":[{"flag":"fam-raisedByGrand"},{"stat":"know","d":3},{"stat":"bond","d":-3,"by":"attach"}]}
    ],
    "fam-parent-returns": [
      {"id":"test","label":"ทำตัวดื้อใส่ดูว่าจะอยู่จริงไหม","text":"บ้านตึงเครียดอยู่หลายเดือน กว่าทุกคนจะยอมรับกันได้","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":-2},{"trait":"grit","d":1}]},
      {"id":"grand-bridge","label":"ขอให้ยายช่วยเป็นคนกลาง","text":"ยายนั่งเล่าเรื่องเก่าๆ ให้ทั้งสองฝ่ายฟัง ความเงียบในบ้านค่อยๆ หายไป","effects":[{"stat":"bond","d":4},{"stat":"happy","d":2}]}
    ],
    "fam-ordain-repay": [{"id":"money-temple","label":"ไม่บวช แต่ทำบุญใหญ่แทน","text":"คุณทอดผ้าป่าในนามพ่อแม่ ท่านยิ้มแต่ก็ยังแอบเสียดายที่ไม่ได้เห็นลูกห่มผ้าเหลือง","when":{"money":[5000,100000000]},"effects":[{"flag":"fam-declinedOrdain"},{"money":-15,"unit":"wageDay"},{"stat":"bond","d":2}]}],
    "fam-care-parents": [
      {"id":"bring-parents","label":"รับพ่อแม่มาอยู่ด้วย","text":"พ่อแม่ได้อยู่ใกล้ แต่ท่านเหงาเพราะไม่รู้จักใครในเมือง","when":{"loc":"bangkok"},"effects":[{"flag":"fam-caredDecided"},{"stat":"bond","d":4},{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-2}]},
      {"id":"sibling-turn","label":"คุยกับพี่น้องให้ผลัดกันดูแล","text":"ตกลงกันได้ว่าใครกลับเดือนไหน แต่ก็มีเรื่องให้เถียงกันบ้าง","effects":[{"flag":"fam-caredDecided"},{"stat":"bond","d":2},{"money":-10,"unit":"wageDay"}]}
    ],
    "fam-become-grandparent-carer": [
      {"id":"pay-help","label":"รับเลี้ยง แต่ขอค่าเลี้ยงดูรายเดือน","text":"ลูกส่งเงินมาทุกเดือน คุณเลี้ยงหลานได้สบายขึ้นแต่บางทีรู้สึกเหมือนเป็นคนรับจ้าง","effects":[{"flag":"fam-raisingGrand"},{"flag":"grandchild"},{"money":10,"unit":"wageDay"},{"stat":"health","d":-2}]},
      {"id":"part","label":"เลี้ยงช่วงปิดเทอมเท่านั้น","text":"หลานมาเป็นช่วงๆ คุณยังมีแรงทำงานของตัวเอง แต่ลูกต้องหาทางเองที่เหลือ","effects":[{"stat":"bond","d":1},{"stat":"happy","d":2}]}
    ],
    "fam-land-dispute": [
      {"id":"monk","label":"ขอให้หลวงพ่อช่วยไกล่เกลี่ย","text":"หลวงพ่อเรียกพี่น้องมานั่งคุยที่วัด ทุกคนยอมถอยคนละก้าว","effects":[{"flag":"fam-landSettled"},{"stat":"bond","d":3},{"stat":"happy","d":2}]},
      {"id":"sell-split","label":"ขายนาแล้วแบ่งเงิน","text":"ได้เงินก้อนแต่ไม่มีนาให้กลับไปอีก ญาติบางคนเสียดาย","effects":[{"flag":"fam-landSettled"},{"money":60,"unit":"wageDay"},{"stat":"bond","d":-2},{"stat":"happy","d":-2}]}
    ],
    "fam-stop-kids": [{"id":"adopt-niece","label":"ช่วยเลี้ยงหลานญาติแทน","text":"คุณรับหลานญาติมาอยู่ด้วย บ้านคึกคักขึ้นโดยไม่ต้องมีลูกเพิ่ม","effects":[{"flag":"fam-stopKids"},{"stat":"bond","d":3},{"money":-10,"unit":"wageDay"}]}],
    "fam-sibling-quits-school": [
      {"id":"both-work","label":"เรียนไปทำงานไปทั้งคู่","text":"คุณกับพี่น้องรับจ้างหลังเลิกเรียน เหนื่อยแต่ได้เรียนต่อทั้งสองคน","when":{"age":[15,16]},"effects":[{"stat":"health","d":-3},{"stat":"know","d":1},{"stat":"bond","d":3},{"money":5,"unit":"wageDay"}]},
      {"id":"temple-school","label":"ให้พี่น้องไปบวชเณรเรียนที่วัด","text":"วัดรับไปเรียนฟรี ครอบครัวเบาลง แต่พี่น้องต้องห่างบ้าน","when":{"year":[1960,2015]},"effects":[{"flag":"fam-siblingSacrificed"},{"stat":"bond","d":1}]}
    ],
    "fam-grand-morning": [{"id":"learn-cook","label":"ขอให้ยายสอนนึ่งข้าว","text":"ยายสอนวิธีแช่ข้าวและดูไฟ คุณทำได้แต่เช้าวันนั้นไปโรงเรียนสาย","effects":[{"stat":"bond","d":3},{"stat":"know","d":1},{"stat":"happy","d":-1}]}],
    "fam-call-from-mom": [{"id":"ask-home","label":"ถามว่าเมื่อไหร่จะกลับ","text":"แม่เงียบไปนาน แล้วบอกว่าสงกรานต์ เสียงแม่สั่นนิดๆ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-2,"by":"attach"}]}],
    "fam-money-order": [{"id":"invest","label":"ซื้อลูกไก่มาเลี้ยงขาย","text":"ลูกไก่โตบ้างตายบ้าง แต่ได้เงินกลับมาและได้เรียนรู้การค้า","effects":[{"money":2,"unit":"wageDay"},{"stat":"know","d":2},{"trait":"grit","d":1}]}],
    "fam-sibling-fight": [
      {"id":"tell-parent","label":"ไปฟ้องผู้ใหญ่","text":"ผู้ใหญ่ตัดสินให้ แต่พี่น้องหาว่าคุณขี้ฟ้อง","effects":[{"stat":"bond","d":-2},{"stat":"happy","d":1}]},
      {"id":"walk-away","label":"เดินหนีไปเล่นที่อื่น","text":"พอเย็นทั้งคู่ก็ลืมเรื่องไปเอง","effects":[{"stat":"happy","d":1}]}
    ],
    "fam-sibling-borrow": [
      {"id":"give-some","label":"ให้ส่วนหนึ่งแบบไม่ต้องคืน","text":"คุณให้เท่าที่เสียได้ ไม่ต้องตามทวงทีหลัง","effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":2}]},
      {"id":"contract","label":"ให้ยืม แต่เขียนสัญญากันไว้","text":"พี่น้องเซ็นแบบไม่ค่อยพอใจ แต่ก็รู้ว่าต้องคืน","effects":[{"money":-20,"unit":"wageDay"},{"flag":"fam-siblingOwes"},{"stat":"bond","d":-2}]}
    ],
    "fam-sibling-owes-again": [
      {"id":"elder-talk","label":"ให้ญาติผู้ใหญ่ช่วยคุยเรื่องหนี้","text":"ลุงเรียกมานั่งคุย ตกลงผ่อนคืนทีละน้อย ความรู้สึกยังกระอักกระอ่วน","effects":[{"flag":"fam-siblingOwes","v":false},{"money":5,"unit":"wageDay"},{"stat":"bond","d":-1}]},
      {"id":"cut-off","label":"ตัดขาด ไม่คุยเรื่องเงินอีก","text":"คุณไม่เสียเงินเพิ่ม แต่งานบุญปีนั้นไม่มีใครทักกัน","effects":[{"flag":"fam-siblingRift"},{"stat":"bond","d":-4,"by":"attach"}]}
    ],
    "fam-sibling-wedding": [
      {"id":"labor","label":"ไม่มีเงิน แต่ช่วยแรงเต็มที่","text":"คุณยกโต๊ะ ล้างจาน ตั้งเต็นท์ตั้งแต่ตีสี่ เจ้าบ่าวเจ้าสาวจำได้","effects":[{"stat":"bond","d":3},{"stat":"health","d":-1}]},
      {"id":"skip","label":"ไม่ไป อ้างว่าติดงาน","text":"ประหยัดได้แต่ญาติๆ พูดถึงอยู่หลายปี","effects":[{"stat":"bond","d":-4},{"stat":"happy","d":-1,"by":"attach"}]}
    ],
    "fam-sibling-repays": [{"id":"job","label":"ฝากงานให้พี่น้องแทนเงิน","text":"พี่น้องได้งานที่มั่นคงกว่าเดิม ภูมิใจที่ได้ยืนด้วยตัวเอง","effects":[{"stat":"bond","d":3},{"trait":"social","d":1}]}],
    "fam-grand-frail": [
      {"id":"hospital","label":"พายายไปหาหมอที่โรงพยาบาลจังหวัด","text":"หมอให้ยาชะลออาการ ค่ารถค่ายาไม่น้อย แต่ยายจำชื่อคุณได้นานขึ้น","effects":[{"flag":"fam-caredGrand"},{"money":-10,"unit":"wageDay"},{"stat":"bond","d":3}]},
      {"id":"osm","label":"ฝาก อสม. แวะดูยายทุกอาทิตย์","text":"อสม. ช่วยเช็กยาและความดัน คุณยังทำงานต่อได้แต่ใจยังห่วง","effects":[{"stat":"bond","d":1},{"cond":"homesick","turns":2}]}
    ],
    "fam-grand-dies": [
      {"id":"ordain","label":"บวชหน้าไฟให้ยาย","text":"คุณบวชส่งยายตามที่ยายเคยพูดไว้ ใจสงบลงบ้าง","when":{"sex":"m","age":[15,100]},"effects":[{"cond":"grieving","turns":2,"by":"attach"},{"stat":"bond","d":3}]},
      {"id":"merit","label":"ทำบุญร้อยวันให้ยายทุกปี","text":"คุณกลับบ้านทุกปีเพื่อทำบุญให้ยาย ค่าเดินทางหมดไปไม่น้อยแต่ไม่เสียดาย","effects":[{"cond":"grieving","turns":3,"by":"attach"},{"money":-5,"unit":"wageDay"},{"stat":"bond","d":2}]}
    ],
    "fam-teen-phone": [
      {"id":"take","label":"ยึดโทรศัพท์ไปเลย","text":"ลูกไม่พูดด้วยเป็นอาทิตย์ แต่การบ้านเสร็จทันเวลา","effects":[{"stat":"bond","d":-4},{"stat":"happy","d":-1}]},
      {"id":"earn","label":"ชวนลูกใช้มือถือหาเงิน เช่น ขายของออนไลน์","text":"ลูกถ่ายรูปผักในสวนไปขาย ได้เงินบ้างและเห็นว่ามือถือทำอะไรได้มากกว่าเกม","effects":[{"stat":"bond","d":2},{"money":3,"unit":"wageDay"}]}
    ],
    "fam-teen-rebel": [
      {"id":"elder","label":"ให้ตายายช่วยคุย","text":"ลูกยอมฟังตายายมากกว่าพ่อแม่ กลับบ้านเร็วขึ้นบ้าง","effects":[{"stat":"bond","d":1}]},
      {"id":"leave","label":"ปล่อย คิดว่าเดี๋ยวโตเอง","text":"บ้านไม่ทะเลาะกัน แต่คุณไม่รู้เลยว่าลูกไปไหนกับใคร","effects":[{"stat":"bond","d":-2},{"stat":"happy","d":1}]}
    ],
    "fam-child-leaves": [
      {"id":"near","label":"ชวนไปเรียนหรือทำงานในเมืองใกล้ๆ แทน","text":"ลูกไปขอนแก่นแทน กลับบ้านได้ทุกเสาร์อาทิตย์ แต่รายได้น้อยกว่ากรุงเทพฯ","effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
      {"id":"fund","label":"ให้เงินก้อนติดตัวไป","text":"ลูกมีทุนตั้งตัวในเมือง คุณต้องประหยัดไปอีกหลายเดือน","effects":[{"flag":"fam-childAway"},{"money":-20,"unit":"wageDay"},{"stat":"bond","d":3}]}
    ],
    "fam-empty-nest": [
      {"id":"garden","label":"ปลูกผักขายที่ตลาดเช้า","text":"มีเงินเข้าทีละนิด และมีคนให้คุยด้วยทุกเช้า","effects":[{"money":3,"unit":"wageDay"},{"stat":"happy","d":3},{"stat":"health","d":1}]},
      {"id":"video","label":"หัดวิดีโอคอลหาลูก","text":"ภาพกระตุกบ้างแต่ได้เห็นหน้าหลานทุกคืน","when":{"year":[2014,2026]},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]}
    ],
    "fam-grandkid-school": [
      {"id":"walk","label":"ให้หลานเดินไปกับเด็กข้างบ้าน","text":"ประหยัดเงินและหลานโตขึ้น แต่คุณยืนรอหน้าบ้านทุกเย็น","effects":[{"stat":"happy","d":-1},{"trait":"grit","d":1}]},
      {"id":"town","label":"ส่งไปโรงเรียนในเมืองที่ดีกว่า","text":"ค่าเทอมค่ารถแพงขึ้นมาก แต่หลานได้เรียนกับครูที่ดีกว่า","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":1}]}
    ],
    "fam-divorce-kids": [
      {"id":"avoid","label":"เปลี่ยนเรื่องทุกครั้ง","text":"ลูกเลิกถาม แต่ไปฟังเรื่องจากคนอื่นแทน","effects":[{"stat":"bond","d":-3}]},
      {"id":"monk","label":"พาลูกไปคุยกับหลวงพ่อที่วัด","text":"หลวงพ่อเล่าเรื่องการพลัดพรากให้ลูกฟังแบบง่ายๆ ลูกดูสงบลง","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1}]}
    ],
    "fam-parent-pension": [
      {"id":"buy-meds","label":"กลับไปพาไปหาหมอเอง","text":"คุณลางานกลับบ้าน ได้รู้ว่ายาที่พ่อแม่กินอยู่ไม่ตรงกับโรค","effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":4}]},
      {"id":"refuse","label":"บอกว่าตอนนี้ไม่มีให้จริงๆ","text":"พ่อแม่เข้าใจแต่เสียงเงียบไป คุณนอนไม่หลับคืนนั้น","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":-2,"by":"attach"}]}
    ],
    "fam-rift-heal": [
      {"id":"merit","label":"ชวนกันไปทำบุญให้พ่อแม่","text":"ในงานบุญทั้งคู่ได้นั่งข้างกันอีกครั้ง ยังไม่ได้พูดอะไรมาก แต่ก็เริ่มต้นใหม่","effects":[{"flag":"fam-siblingRift","v":false},{"stat":"bond","d":2}]},
      {"id":"gift","label":"ส่งของฝากไปให้หลาน","text":"พี่น้องรับไว้ แล้วโทรมาขอบคุณสั้นๆ","effects":[{"money":-3,"unit":"wageDay"},{"stat":"bond","d":1}]}
    ],
    "tech-tv-neighbour": [{"id":"pay","label":"เอาขนมไปฝากเจ้าของบ้าน","text":"เจ้าของบ้านยิ้มรับ คุณได้ที่นั่งหน้าจอแถวแรก","effects":[{"money":-1,"unit":"wageDay"},{"stat":"happy","d":3},{"trait":"social","d":1}]}],
    "tech-own-tv": [
      {"id":"radio","label":"ซื้อวิทยุแทน ถูกกว่า","text":"บ้านได้ฟังข่าวและหมอลำ ประหยัดเงินไว้ซื้อปุ๋ย","effects":[{"money":-3,"unit":"wageDay"},{"stat":"know","d":1},{"stat":"happy","d":1}]},
      {"id":"charge","label":"ซื้อแล้วเก็บค่าดูจากเพื่อนบ้าน","text":"ได้เงินคืนทีละนิด แต่บางบ้านว่าคุณงก","when":{"age":[18,40]},"effects":[{"money":-15,"unit":"wageDay"},{"money":5,"unit":"wageDay"},{"trait":"social","d":-1}]}
    ],
    "tech-cassette": [{"id":"sell","label":"อัดเทปขายในตลาดนัด","text":"ขายดีอยู่พักหนึ่ง จนมีคนเตือนว่าเป็นของละเมิดลิขสิทธิ์","when":{"age":[15,45]},"effects":[{"money":4,"unit":"wageDay"},{"trait":"grit","d":-1}]}],
    "tech-payphone": [
      {"id":"village-phone","label":"ฝากผู้ใหญ่บ้านประกาศเสียงตามสาย","text":"ญาติโทรกลับมาที่บ้านผู้ใหญ่ ทั้งหมู่บ้านรู้เรื่องของคุณไปด้วย","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]},
      {"id":"skip","label":"ไม่ติดต่อ รอญาติกลับมาเอง","text":"ประหยัดเงิน แต่ข่าวจากเมืองมาถึงช้าไปหลายเดือน","effects":[{"stat":"bond","d":-2}]}
    ],
    "tech-first-mobile": [
      {"id":"share","label":"ใช้เครื่องเดียวกันทั้งบ้าน","text":"ทุกคนผลัดกันใช้ ต้องแย่งกันบ้าง แต่ถูกกว่าซื้อหลายเครื่อง","effects":[{"flag":"tech-mobile"},{"money":-5,"unit":"wageDay"},{"stat":"bond","d":1}]},
      {"id":"business","label":"ซื้อเครื่องไว้รับสายลูกค้า","text":"รับงานได้มากขึ้นเพราะลูกค้าโทรหาได้ทันที","when":{"age":[18,60]},"effects":[{"flag":"tech-mobile"},{"money":-10,"unit":"wageDay"},{"money":12,"unit":"wageDay"}]}
    ],
    "tech-netcafe": [{"id":"work","label":"ขอทำงานเฝ้าร้านเน็ต","text":"ได้ค่าขนมและเรียนรู้คอมพิวเตอร์ แต่กลับบ้านดึกจนยายบ่น","when":{"age":[15,22]},"effects":[{"money":3,"unit":"wageDay"},{"stat":"know","d":2},{"stat":"health","d":-1}]}],
    "tech-gamer-grades": [
      {"id":"deal","label":"ตกลงกับพ่อแม่ เล่นได้เฉพาะวันหยุด","text":"เกรดค่อยๆ ขึ้น และยังได้เล่นกับเพื่อนวันเสาร์","effects":[{"stat":"know","d":2},{"stat":"bond","d":2}]},
      {"id":"pro","label":"ตั้งใจจะเป็นนักแข่งเกม","text":"คุณซ้อมหนักกว่าเดิม เกรดตกต่อ แต่ฝีมือดีขึ้นจริง","effects":[{"stat":"know","d":-3},{"stat":"happy","d":2},{"trait":"grit","d":1}]}
    ],
    "tech-hi5": [{"id":"sell","label":"รับแต่งหน้าให้เพื่อน","text":"เพื่อนจ้างคนละไม่กี่บาท คุณเก่งโค้ดหน้าเว็บขึ้นมาก","effects":[{"money":1,"unit":"wageDay"},{"stat":"know","d":2}]}],
    "tech-facebook": [
      {"id":"sell","label":"สมัครเพื่อเปิดเพจขายของ","text":"มีลูกค้าจากอำเภออื่นทักมา ยอดขายเพิ่มแต่ต้องตอบแชตทั้งคืน","when":{"age":[18,60]},"effects":[{"flag":"tech-social"},{"money":8,"unit":"wageDay"},{"stat":"health","d":-1}]},
      {"id":"family","label":"สมัครไว้ดูรูปคนรู้จัก","text":"ได้เห็นรูปคนรู้จักที่อยู่ไกลโดยไม่ต้องโพสต์อะไร","effects":[{"flag":"tech-social"},{"stat":"bond","d":2}]}
    ],
    "tech-line-family": [
      {"id":"forward","label":"แชร์ข่าวสุขภาพทุกเช้า","text":"บางข่าวเป็นข่าวปลอม คนในกลุ่มแอบขำแต่ก็รู้ว่าคุณห่วง","effects":[{"stat":"bond","d":1},{"stat":"know","d":-1}]},
      {"id":"leave","label":"ออกจากกลุ่มไปเลย","text":"สงบขึ้น แต่พลาดข่าวงานบุญของญาติ","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":1}]}
    ],
    "tech-smartphone": [
      {"id":"wait","label":"ยังใช้เครื่องปุ่มกดต่อ","text":"แบตอยู่ได้เป็นอาทิตย์ แต่รับรูปจากคนรู้จักไม่ได้","effects":[{"stat":"bond","d":-1},{"money":2,"unit":"wageDay"}]},
      {"id":"hand-me","label":"ขอเครื่องเก่าจากคนรู้จัก","text":"ได้เครื่องฟรี คนรู้จักช่วยลงแอปให้","effects":[{"flag":"tech-smartphone"},{"stat":"bond","d":2}]}
    ],
    "tech-scam-sms": [
      {"id":"call-bank","label":"โทรเช็กกับธนาคารเอง","text":"ธนาคารยืนยันว่าเป็นข้อความหลอก คุณช่วยเตือนคนในหมู่บ้านต่อ","effects":[{"stat":"know","d":2},{"trait":"social","d":1}]},
      {"id":"reply","label":"โทรกลับเบอร์ที่ให้มา","text":"ปลายสายพูดเก่งจนคุณเกือบโอนเงิน ได้สติตอนคนรู้จักโทรมาพอดี","effects":[{"money":-3,"unit":"wageDay"},{"stat":"happy","d":-3}]}
    ],
    "tech-promptpay": [
      {"id":"both","label":"รับทั้งสองแบบ","text":"ลูกค้าสะดวก แต่ต้องคอยเช็กยอดในแอปบ่อยๆ ว่าเงินเข้าจริง","effects":[{"money":3,"unit":"wageDay"},{"stat":"know","d":1}]},
      {"id":"fake-slip","label":"เชื่อสลิปที่ลูกค้าโชว์โดยไม่เช็ก","text":"สะดวกดี จนวันหนึ่งพบว่าเงินบางยอดไม่เคยเข้า","effects":[{"money":-4,"unit":"wageDay"},{"stat":"happy","d":-2}]}
    ],
    "tech-paotang": [
      {"id":"self","label":"นั่งหัดเองจากคลิป","text":"ใช้เวลาทั้งคืนแต่ทำสำเร็จ ภูมิใจกับตัวเอง","effects":[{"stat":"know","d":2},{"trait":"grit","d":1},{"money":3,"unit":"wageDay"}]},
      {"id":"neighbor","label":"ฝากเพื่อนบ้านลงทะเบียนให้","text":"ได้สิทธิ์เหมือนกัน แต่ต้องบอกข้อมูลส่วนตัวให้คนอื่นรู้","effects":[{"money":3,"unit":"wageDay"},{"stat":"know","d":-1}]}
    ],
    "tech-live-sell": [
      {"id":"team","label":"ชวนคนรู้จักมาไลฟ์ เราแพ็กของ","text":"ขายได้มากกว่าทำคนเดียว และได้ใช้เวลาด้วยกัน","effects":[{"money":6,"unit":"wageDay"},{"stat":"bond","d":2}]},
      {"id":"buy","label":"ไม่ขาย แต่ดูไลฟ์ซื้อของ","text":"ของถูกหลายชิ้น แต่บางชิ้นไม่จำเป็นเลย","effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":2}]}
    ],
    "tech-tiktok": [
      {"id":"teach","label":"ทำคลิปสอนทำอาหารอีสาน","text":"คนดูไม่มาก แต่ร้านในอำเภอติดต่อมาให้รีวิว","effects":[{"money":3,"unit":"wageDay"},{"stat":"happy","d":2},{"trait":"social","d":1}]},
      {"id":"delete","label":"ลบแอปทิ้ง","text":"นอนหลับเร็วขึ้น แต่คุยเรื่องเดียวกับเพื่อนไม่ค่อยรู้เรื่อง","effects":[{"stat":"health","d":2},{"trait":"social","d":-1}]}
    ],
    "tech-online-class": [
      {"id":"pause","label":"หยุดเรียนไปช่วยงานจนเปิดเทอม","text":"ครอบครัวมีรายได้เพิ่ม แต่กลับไปเรียนตามเพื่อนไม่ทัน","effects":[{"money":5,"unit":"wageDay"},{"stat":"know","d":-4}]},
      {"id":"group","label":"รวมกลุ่มเพื่อนไปเรียนที่บ้านครู","text":"ครูเปิดบ้านให้นั่งเรียน ได้ทั้งความรู้และเพื่อน","effects":[{"stat":"know","d":3},{"stat":"happy","d":2}]}
    ],
    "hl-diet": [
      {"id":"cook-own","label":"ทำกับข้าวกินเองรสอ่อนลง","text":"ใช้เวลามากขึ้นแต่ประหยัดและตัวเบาขึ้น","effects":[{"flag":"hl-ateLight"},{"money":2,"unit":"wageDay"},{"stat":"happy","d":-1}]},
      {"id":"half","label":"กินรสจัดแค่วันหยุด","text":"ยังได้อร่อยบ้าง แต่บางอาทิตย์วันหยุดก็ยาวกว่าที่ตั้งใจ","effects":[{"stat":"happy","d":1},{"stat":"health","d":1}]}
    ],
    "hl-diet-change": [
      {"id":"herb","label":"ต้มยาสมุนไพรกินแทน","text":"ดื่มน้ำใบเตยกับกระเจี๊ยบทุกวัน รู้สึกดีขึ้นแต่ยังไม่ได้ลดเค็ม","effects":[{"stat":"happy","d":1},{"money":-1,"unit":"wageDay"}]},
      {"id":"walk","label":"ออกกำลังแทน แต่ยังกินเหมือนเดิม","text":"ความดันลดลงนิดหน่อย อสม. บอกว่าดีแต่ยังไม่พอ","effects":[{"stat":"health","d":2}]}
    ],
    "hl-diabetes": [
      {"id":"herb","label":"หยุดยา กินสมุนไพรตามคนแนะนำ","text":"เสียเงินไปกับสมุนไพรหลายขวด น้ำตาลยังสูงอยู่","effects":[{"flag":"hl-diabetes"},{"money":-8,"unit":"wageDay"},{"stat":"health","d":-4}]},
      {"id":"group","label":"เข้ากลุ่มผู้ป่วยเบาหวานที่ รพ.สต.","text":"ได้เพื่อนที่เป็นเหมือนกัน แลกสูตรอาหารและเตือนกันกินยา","effects":[{"flag":"hl-diabetes"},{"flag":"hl-saltySweet","v":false},{"stat":"health","d":2},{"trait":"social","d":1}]}
    ],
    "hl-pesticide": [{"id":"organic","label":"เลิกใช้สารเคมี ถอนหญ้าเอง","text":"เหนื่อยกว่าเดิมมากและผลผลิตลดลง แต่ร่างกายไม่ต้องรับสาร","effects":[{"flag":"hl-sprayedSafe"},{"stat":"health","d":1},{"money":-8,"unit":"wageDay"}]}],
    "hl-pesticide-later": [
      {"id":"herb","label":"กินรางจืดล้างพิษตามที่คนบอก","text":"ดื่มทุกวันแต่ยังฉีดเหมือนเดิม ผลตรวจรอบหน้าไม่ดีขึ้นเท่าไร","effects":[{"stat":"health","d":-1},{"money":-1,"unit":"wageDay"}]},
      {"id":"group","label":"ชวนเพื่อนบ้านทำนาลดสารด้วยกัน","text":"ทั้งกลุ่มช่วยกันลงแขกถอนหญ้า ต้นทุนลดลงและได้คุยกันมากขึ้น","effects":[{"flag":"hl-sprayedBare","v":false},{"stat":"health","d":2},{"trait":"social","d":1}]}
    ],
    "hl-smoke": [
      {"id":"once","label":"ลองแค่มวนเดียวพอ","text":"สำลักควันจนน้ำตาไหล ไม่อยากลองอีก","effects":[{"stat":"happy","d":-1}]},
      {"id":"leave","label":"เลี่ยงไปอยู่กับกลุ่มอื่น","text":"เพื่อนบางคนแซวว่าไม่เข้ากลุ่ม คุณได้เพื่อนใหม่แทน","effects":[{"trait":"social","d":-1},{"trait":"grit","d":1}]}
    ],
    "hl-quit-smoke": [
      {"id":"temple","label":"ไปปฏิญาณเลิกบุหรี่ที่วัดช่วงเข้าพรรษา","text":"พระให้ศีล คุณอายที่จะผิดคำสัญญา จึงเลิกได้จริง","effects":[{"flag":"hl-smoker","v":false},{"stat":"health","d":3},{"stat":"happy","d":-1}]},
      {"id":"clinic","label":"ไปคลินิกเลิกบุหรี่ที่โรงพยาบาล","text":"หมอให้คำปรึกษาและนัดติดตาม มีหลุดบ้างแต่ค่อยๆ ลดได้","effects":[{"flag":"hl-smoker","v":false},{"stat":"health","d":2},{"money":-2,"unit":"wageDay"}]}
    ],
    "hl-sun-back": [
      {"id":"massage","label":"ให้หมอนวดพื้นบ้านนวดให้","text":"หลังคลายลงหลายวัน เสียค่านวดไม่มาก","effects":[{"stat":"health","d":2},{"money":-1,"unit":"wageDay"}]},
      {"id":"clinic","label":"ไปหาหมอที่โรงพยาบาล","text":"หมอให้กายภาพและสอนท่ายก ต้องลางานหนึ่งวัน","effects":[{"stat":"health","d":3},{"money":-2,"unit":"wageDay"},{"stat":"know","d":1}]}
    ],
    "hl-exercise": [
      {"id":"lead","label":"อาสาเป็นคนนำเต้น","text":"ทุกคนรอคุณทุกเย็น เหนื่อยแต่มีคนรู้จักเพิ่มขึ้นมาก","effects":[{"stat":"health","d":3},{"trait":"social","d":2}]},
      {"id":"walk","label":"เดินรอบหมู่บ้านคนเดียวแทน","text":"ได้ออกกำลังเงียบๆ ตามจังหวะตัวเอง","effects":[{"stat":"health","d":2},{"stat":"happy","d":1}]}
    ],
    "hl-30baht": [
      {"id":"private","label":"ยังไปคลินิกเอกชนเหมือนเดิม","text":"ไม่ต้องรอคิวนาน แต่จ่ายเองทุกครั้ง","effects":[{"flag":"hl-goesToDoctor"},{"money":-3,"unit":"wageDay"},{"stat":"health","d":2}]},
      {"id":"doubt","label":"ไม่เชื่อว่ายาถูกจะดี","text":"คุณซื้อยาร้านขายของชำกินเอง อาการค้างอยู่อย่างนั้น","effects":[{"stat":"health","d":-2}]}
    ],
    "hl-healer": [
      {"id":"both","label":"ไปทั้งสองที่","text":"หมอพื้นบ้านเป่าให้ แล้วไปโรงพยาบาลต่อ ใจสบายและได้ยาจริง","effects":[{"stat":"health","d":2},{"stat":"happy","d":1},{"money":-2,"unit":"wageDay"}]},
      {"id":"osm","label":"ถาม อสม. ก่อนว่าควรไปไหน","text":"อสม. ดูอาการแล้วส่งไป รพ.สต. ไม่ต้องเดินทางไกล","effects":[{"stat":"health","d":2},{"stat":"know","d":1}]}
    ],
    "hl-osm": [
      {"id":"later","label":"ขอรอให้พร้อมกว่านี้","text":"ผู้ใหญ่บ้านเข้าใจ แต่ตำแหน่งตกไปเป็นของคนอื่น","effects":[{"stat":"happy","d":1}]},
      {"id":"support","label":"ไม่รับ แต่ช่วยงาน อสม. เป็นครั้งคราว","text":"ได้ช่วยเพื่อนบ้านโดยไม่ต้องรับภาระทุกเดือน","effects":[{"trait":"social","d":1},{"stat":"know","d":1}]}
    ],
    "hl-debt-stress": [
      {"id":"monk","label":"ไปนั่งสมาธิที่วัด","text":"หนี้ยังอยู่ แต่ใจนิ่งพอจะวางแผนผ่อนได้","effects":[{"stat":"happy","d":2},{"stat":"health","d":1}]},
      {"id":"drink","label":"ดื่มให้หลับ","text":"หลับได้บางคืน แต่เช้ามาหนักหัวและเงินหมดเร็วขึ้น","effects":[{"stat":"health","d":-3},{"money":-2,"unit":"wageDay"}]}
    ],
    "hl-elder-lonely": [{"id":"temple","label":"ไปนอนวัดถือศีลวันพระ","text":"ได้สวดมนต์กับเพื่อนวัยเดียวกัน วันยาวๆ ผ่านไปเร็วขึ้น","effects":[{"stat":"happy","d":3},{"stat":"health","d":1}]}]
  };
  for (const list of [KI.data.decisions, KI.data.personalEvents]) for (const item of list) if (add[item.id]) item.choices.push(...add[item.id]);
})();
