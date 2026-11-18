globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.unshift(...[
  {"id":"legacy-inherit","title":"แบ่งมรดก","body":"ญาติพี่น้องนั่งล้อมวงคุยกัน ถึงเวลาตกลงเรื่องบ้าน ที่นา และเงินที่ผู้ล่วงลับทิ้งไว้","when":{"age":[18,120],"flag":{"inheritDue":true}},"cooldown":1,"major":true,"choices":[
    {"id":"solo","label":"รับมรดกไว้ทั้งหมด","text":"ไม่มีพี่น้องให้แบ่ง ทุกอย่างตกเป็นของเรา","when":{"flag":{"hasSiblings":false}},"effects":[{"inherit":1},{"flag":"inheritDue","v":false},{"stat":"happy","d":1},{"pin":"รับมรดก"}]},
    {"id":"equal","label":"แบ่งเท่ากันทุกคน","text":"พี่น้องตกลงกันได้ด้วยดี","when":{"flag":{"hasSiblings":true}},"effects":[{"inherit":1},{"flag":"inheritDue","v":false},{"stat":"bond","d":3},{"pin":"แบ่งมรดกกับพี่น้อง"}]},
    {"id":"more","label":"ขอส่วนมากกว่า เพราะเป็นคนดูแลมาตลอด","text":"ยกเรื่องที่ตัวเองอยู่ดูแลจนวันสุดท้ายขึ้นมาคุย","when":{"flag":{"hasSiblings":true},"counter":{"responsible":[2,99]}},"effects":[{"flag":"inheritDue","v":false}],"roll":[
      {"p":0.55,"text":"พี่น้องเห็นด้วย ยกส่วนให้มากกว่า","effects":[{"inherit":1.5},{"stat":"happy","d":2}]},
      {"p":0.45,"text":"พี่น้องไม่ยอม ทะเลาะกันกลางวง สุดท้ายแบ่งเท่าเดิม","effects":[{"inherit":1},{"stat":"bond","d":-8},{"stat":"happy","d":-5},{"flag":"legacy-feud"}]}]},
    {"id":"grab","label":"แอบเอาโฉนดไปโอนเป็นชื่อตัวเอง","text":"ได้ทรัพย์สินมากกว่าส่วนของตัวเองหลายเท่า","when":{"flag":{"hasSiblings":true}},"effects":[{"inherit":2.5},{"flag":"inheritDue","v":false},{"stat":"bond","d":-20},{"flag":"legacy-feud"},{"inc":"crime"}],"roll":[
      {"p":0.35,"text":"พี่น้องฟ้องศาล ต้องคืนส่วนเกินพร้อมค่าทนาย","effects":[{"inherit":-1.5},{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-8},{"pin":"ถูกพี่น้องฟ้องเรื่องมรดก"}]}]},
    {"id":"give","label":"ยกส่วนของตัวเองให้พี่น้องที่ลำบากกว่า","text":"เก็บไว้แค่ของที่ระลึกชิ้นเล็กๆ","when":{"flag":{"hasSiblings":true}},"effects":[{"inherit":0.2},{"flag":"inheritDue","v":false},{"stat":"bond","d":8},{"stat":"happy","d":3},{"inc":"good"}]},
    {"id":"land","label":"เก็บบ้านกับที่นาไว้ ไม่ขาย","text":"ได้ที่ดินไว้ทำกินและเป็นที่กลับบ้าน แต่เงินสดได้น้อย","effects":[{"inherit":0.6},{"flag":"inheritDue","v":false},{"flag":"legacy-land"},{"stat":"happy","d":2},{"stat":"bond","d":2},{"pin":"รับที่นามรดกไว้ทำกิน"}]},
    {"id":"temple","label":"ทำบุญถวายวัดส่วนหนึ่งอุทิศให้ผู้ล่วงลับ","text":"สร้างศาลาเล็กๆ ในวัดประจำหมู่บ้าน","effects":[{"inherit":0.7},{"flag":"inheritDue","v":false},{"stat":"happy","d":4},{"inc":"good"}]}]}
]);
KI.data.personalEvents.push(...[
  {"id":"legacy-land-offer","title":"มีคนมาขอซื้อที่นา","body":"นายหน้าจากในเมืองมาขอซื้อที่นามรดก บอกว่าจะทำโครงการ ให้ราคาดีกว่าที่คิด","w":8,"when":{"age":[25,85],"year":[1988,9999],"flag":{"legacy-land":true}},"cooldown":15,"choices":[
    {"id":"sell","label":"ขายเลย ได้เงินก้อนใหญ่","text":"เซ็นสัญญาขายที่ดินผืนสุดท้ายของครอบครัว","effects":[{"money":120,"unit":"wageDay"},{"flag":"legacy-land","v":false},{"stat":"happy","d":2}],"roll":[
      {"p":0.4,"text":"ไม่กี่ปีต่อมาราคาที่แถวนั้นขึ้นหลายเท่า เสียดายอยู่ลึกๆ","effects":[{"stat":"happy","d":-4,"by":"attach"}]}]},
    {"id":"keep","label":"ไม่ขาย ที่นาของพ่อแม่","text":"ทำนาต่อปีละครั้ง พอมีข้าวกินทั้งปี","effects":[{"stat":"bond","d":2},{"money":5,"unit":"wageDay"}]},
    {"id":"rent","label":"แบ่งให้เช่าบางส่วน","text":"ได้ค่าเช่าทุกปี ที่ดินยังเป็นของเรา","effects":[{"money":20,"unit":"wageDay"}]}]},
  {"id":"legacy-feud-mend","title":"พี่น้องที่ไม่ได้คุยกัน","body":"ตั้งแต่เรื่องมรดก พี่น้องก็ไม่ได้มองหน้ากันอีก งานบุญปีนี้ทุกคนต้องมาเจอกันที่วัด","w":10,"when":{"flag":{"legacy-feud":true}},"cooldown":9,"choices":[
    {"id":"sorry","label":"เข้าไปขอโทษก่อน","text":"ยกมือไหว้ขอโทษต่อหน้าญาติทุกคน","effects":[],"roll":[
      {"p":0.6,"text":"พี่น้องยิ้มรับ ความบาดหมางค่อยๆ จางลง","effects":[{"flag":"legacy-feud","v":false},{"stat":"bond","d":10},{"stat":"happy","d":5}]},
      {"p":0.4,"text":"อีกฝ่ายยังไม่พร้อม เดินหนีไป","effects":[{"stat":"happy","d":-3,"by":"attach"}]}]},
    {"id":"share","label":"แบ่งเงินคืนให้ส่วนหนึ่ง","text":"ยื่นซองให้พร้อมบอกว่าไม่อยากเสียพี่น้องไป","when":{"money":[1,999999999]},"effects":[{"money":-30,"unit":"wageDay"},{"flag":"legacy-feud","v":false},{"stat":"bond","d":12},{"inc":"good"}]},
    {"id":"no","label":"ต่างคนต่างอยู่ต่อไป","text":"นั่งคนละมุมศาลา","effects":[{"stat":"bond","d":-2},{"stat":"happy","d":-2}]}]},
  {"id":"legacy-kid-uni","title":"ลูกอยากเรียนมหาวิทยาลัย","body":"ลูกจบ ม.6 แล้ว ถือใบสมัครมหาวิทยาลัยมาให้ดู ตาเป็นประกาย","w":14,"when":{"childAge":[17,19],"age":[30,70]},"cooldown":"once","major":true,"choices":[
    {"id":"send","label":"ส่งเรียนเต็มที่ แม้ต้องรัดเข็มขัด","text":"ขายวัวไปสองตัวเป็นค่าเทอมปีแรก","effects":[{"money":-40,"unit":"wageDay"},{"flag":"legacy-kidGrad"},{"stat":"bond","d":5},{"pin":"ส่งลูกเรียนมหาวิทยาลัย"}],"roll":[
      {"p":0.75,"text":"สี่ปีต่อมา ลูกใส่ชุดครุยถ่ายรูปกับพ่อแม่","effects":[{"stat":"happy","d":8},{"cond":"proud","turns":3}]},
      {"p":0.25,"text":"ลูกเรียนไม่ไหว ลาออกกลางคันกลับมาบ้าน","effects":[{"flag":"legacy-kidGrad","v":false},{"stat":"happy","d":-4}]}]},
    {"id":"loan","label":"ให้ลูกกู้ กยศ. แล้วช่วยค่ากินอยู่","text":"ลูกเรียนได้ แต่จะมีหนี้ติดตัวหลังจบ","when":{"year":[1996,9999]},"effects":[{"money":-10,"unit":"wageDay"},{"flag":"legacy-kidGrad"},{"stat":"bond","d":2}]},
    {"id":"voc","label":"แนะนำให้เรียนสายอาชีพใกล้บ้าน","text":"ค่าใช้จ่ายน้อยกว่า จบเร็วได้ทำงานเร็ว","effects":[{"money":-12,"unit":"wageDay"},{"stat":"bond","d":-1}]},
    {"id":"work","label":"ขอให้ออกมาช่วยหาเงินก่อน","text":"ลูกพับใบสมัครเก็บใส่ลิ้นชัก แล้วไปทำงานกรุงเทพฯ","effects":[{"flag":"legacy-kidAway"},{"stat":"bond","d":-6},{"money":10,"unit":"wageDay"}]}]},
  {"id":"legacy-kid-remit","title":"ลูกส่งเงินกลับบ้าน","body":"ข้อความแจ้งเงินโอนเข้า ลูกที่ทำงานอยู่ไกลส่งเงินมาให้ใช้","w":9,"when":{"age":[40,99],"childAge":[22,60],"any":[{"flag":{"legacy-kidGrad":true}},{"flag":{"legacy-kidAway":true}}]},"cooldown":9,"effects":[{"money":12,"unit":"wageDay"}],"choices":[
    {"id":"save","label":"เก็บไว้เผื่อยามจำเป็น","text":"ฝากธนาคารไว้ทั้งหมด","effects":[{"stat":"happy","d":2}]},
    {"id":"house","label":"เอาไปต่อเติมบ้าน","text":"บ้านมีห้องน้ำในตัวและหลังคาใหม่","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":4}]},
    {"id":"back","label":"บอกลูกให้เก็บไว้ใช้กับครอบครัวตัวเอง","text":"ลูกบอกว่าแม่กับพ่อสำคัญที่สุด แต่ก็ฟัง","effects":[{"money":-12,"unit":"wageDay"},{"stat":"bond","d":4}]}]},
  {"id":"legacy-kid-wedding","title":"ลูกจะแต่งงาน","body":"ลูกพาแฟนมาไหว้ที่บ้าน บอกว่าอยากแต่งงานกันปลายปีนี้","w":12,"when":{"childAge":[21,36],"age":[38,80]},"cooldown":"once","choices":[
    {"id":"big","label":"จัดงานใหญ่ให้สมฐานะ","text":"เลี้ยงทั้งหมู่บ้าน มีหมอลำมาเล่นทั้งคืน","effects":[{"money":-45,"unit":"wageDay"},{"stat":"happy","d":6},{"stat":"bond","d":4},{"pin":"จัดงานแต่งให้ลูก"}]},
    {"id":"simple","label":"จัดเรียบง่าย ผูกแขนในบ้าน","text":"ญาติใกล้ชิดมาร่วมไม่กี่สิบคน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":4},{"stat":"bond","d":2}]},
    {"id":"against","label":"ไม่เห็นด้วยกับคนที่ลูกเลือก","text":"พูดตรงๆ ว่ายังไม่ไว้ใจอีกฝ่าย","effects":[],"roll":[
      {"p":0.5,"text":"ลูกยอมเลื่อนงานออกไปก่อน แต่ไม่ค่อยคุยด้วย","effects":[{"stat":"bond","d":-6}]},
      {"p":0.5,"text":"ลูกแต่งงานโดยไม่มีเราไปร่วม","effects":[{"stat":"bond","d":-12},{"stat":"happy","d":-8,"by":"attach"}]}]}]},
  {"id":"legacy-kid-arrest","title":"ลูกถูกตำรวจจับ","body":"โทรศัพท์ดังกลางดึก ตำรวจบอกว่าลูกถูกจับข้อหายาเสพติดและลักทรัพย์","w":10,"when":{"childAge":[16,30],"any":[{"counter":{"spoil":[4,99]}},{"counter":{"neglect":[3,99]}}],"chance":0.35},"cooldown":"once","heavy":true,"choices":[
    {"id":"bail","label":"วางเงินประกันตัวลูกออกมา","text":"ยืมเงินญาติมาวางประกัน","effects":[{"money":-30,"unit":"wageDay"}],"roll":[
      {"p":0.5,"text":"ลูกสำนึก กลับตัวได้","effects":[{"stat":"bond","d":5}]},
      {"p":0.5,"text":"ลูกกลับไปหาเพื่อนกลุ่มเดิม ถูกจับซ้ำในอีกไม่นาน","effects":[{"stat":"happy","d":-8},{"inc":"spoil"}]}]},
    {"id":"law","label":"ให้ลูกรับผิดตามกฎหมาย","text":"ไปเยี่ยมทุกเดือน แต่ไม่จ่ายเงินช่วย","effects":[{"stat":"happy","d":-6,"by":"attach"},{"stat":"bond","d":-4},{"inc":"firm"}],"roll":[
      {"p":0.6,"text":"พ้นโทษแล้วลูกตั้งใจทำงาน ขอบคุณที่ไม่ปล่อยให้หลงทาง","effects":[{"stat":"bond","d":8}]}]},
    {"id":"ordain","label":"ขอให้ลูกบวชหลังเรื่องจบ","text":"พาลูกเข้าวัดให้หลวงพ่อช่วยขัดเกลา","effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"happy","d":2}]}]},
  {"id":"legacy-grandkid-raise","title":"เลี้ยงหลานให้ลูก","body":"ลูกต้องไปทำงานต่างจังหวัด ขอฝากหลานตัวเล็กไว้ให้ช่วยเลี้ยงที่บ้าน","w":12,"when":{"age":[42,85],"flag":{"grandchild":true},"loc":"isan"},"cooldown":"once","choices":[
    {"id":"yes","label":"รับเลี้ยงหลานเต็มที่","text":"บ้านกลับมามีเสียงเด็กอีกครั้ง","effects":[{"stat":"happy","d":6},{"stat":"bond","d":6},{"stat":"health","d":-2},{"money":4,"unit":"wageDay"},{"pin":"เลี้ยงหลานให้ลูก"}]},
    {"id":"half","label":"เลี้ยงช่วงปิดเทอม","text":"หลานมาอยู่ด้วยเป็นช่วงๆ","effects":[{"stat":"happy","d":3},{"stat":"bond","d":2}]},
    {"id":"no","label":"ปฏิเสธ แก่แล้วเลี้ยงไม่ไหว","text":"ลูกเข้าใจแต่ก็ลำบากขึ้น","effects":[{"stat":"bond","d":-4}]}]},
  {"id":"legacy-old-city","title":"ลูกชวนไปอยู่ด้วย","body":"ลูกไม่อยากให้อยู่บ้านคนเดียว ชวนย้ายไปอยู่คอนโดในเมืองด้วยกัน","w":10,"when":{"age":[65,92],"flag":{"child":true},"loc":"isan"},"cooldown":"once","choices":[
    {"id":"go","label":"ย้ายไปอยู่กับลูก","text":"ห้องสบาย ใกล้โรงพยาบาล แต่ไม่รู้จักใครเลย","effects":[{"move":{"kind":"bangkok"}},{"stat":"health","d":4},{"cond":"lonely","turns":4},{"stat":"bond","d":4},{"pin":"ย้ายไปอยู่กับลูกในเมือง"}]},
    {"id":"stay","label":"ขออยู่บ้านเกิด ใกล้วัดใกล้เพื่อน","text":"ลูกโทรมาถามทุกเย็น","effects":[{"stat":"happy","d":2},{"stat":"health","d":-2}]},
    {"id":"return","label":"ขอให้ลูกกลับมาอยู่บ้านแทน","text":"ลูกลาออกจากงานกลับมาทำสวนที่บ้าน","effects":[{"stat":"bond","d":8},{"stat":"happy","d":5},{"money":-10,"unit":"wageDay"}]}]},
  {"id":"legacy-will","title":"เขียนพินัยกรรม","body":"อายุมากขึ้น เพื่อนรุ่นเดียวกันเริ่มจากไปทีละคน ถึงเวลาคิดว่าจะยกทรัพย์สินให้ใคร","w":10,"when":{"age":[66,95],"flag":{"child":true}},"cooldown":"once","choices":[
    {"id":"equal","label":"แบ่งให้ลูกทุกคนเท่ากัน","text":"ทำพินัยกรรมที่อำเภอ ลูกๆ รับรู้ทุกคน","effects":[{"flag":"legacyWill","v":"equal"},{"stat":"happy","d":2}]},
    {"id":"youngest","label":"ยกบ้านให้ลูกคนเล็กที่อยู่ดูแล","text":"ตามธรรมเนียมอีสาน ลูกคนเล็กได้เรือนพ่อแม่","effects":[{"flag":"legacyWill","v":"youngest"},{"stat":"bond","d":-1}]},
    {"id":"temple","label":"ถวายวัดครึ่งหนึ่ง ที่เหลือแบ่งลูก","text":"หลวงพ่อรับปากจะสร้างกุฏิไว้","effects":[{"flag":"legacyWill","v":"temple"},{"stat":"happy","d":4},{"inc":"good"}]},
    {"id":"none","label":"ยังไม่อยากคิดเรื่องนี้","text":"ปล่อยไว้ให้ลูกตกลงกันเอง","effects":[]}]}
]);
