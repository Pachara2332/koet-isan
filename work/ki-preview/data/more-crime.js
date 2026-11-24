globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.stats.roles.prisoner = { "incomeDays": [0, 0, 0], "costDays": [6, 6, 6], "estimate": true };
Object.assign(KI.data.conditions, {
  "crime-jailed": { "name": "รับโทษในเรือนจำ", "icon": "⛓️", "perTurn": [{ "stat": "happy", "d": -2 }, { "stat": "health", "d": -1 }, { "stat": "bond", "d": -1 }] },
  "crime-guilt": { "name": "รู้สึกผิด", "icon": "😔", "perTurn": [{ "stat": "happy", "d": -2 }] }
});
KI.data.decisions.unshift(...[
  {"id":"crime-release","title":"พ้นโทษออกจากเรือนจำ","body":"วันที่รอคอยมาถึง ประตูเรือนจำเปิดออก โลกข้างนอกเปลี่ยนไปจากวันที่เข้ามา","when":{"role":"prisoner","noCond":["crime-jailed"]},"cooldown":1,"major":true,"choices":[
    {"id":"home","label":"กลับบ้านไปหาครอบครัว","text":"แม่ยืนรออยู่หน้าประตูบ้าน น้ำตาไหลไม่หยุด","when":{"flag":{"parentsAlive":true}},"effects":[{"role":"jobless"},{"move":"home"},{"flag":"crime-inJail","v":false},{"flag":"crime-record"},{"stat":"happy","d":6},{"stat":"bond","d":4},{"pin":"พ้นโทษกลับบ้าน"}]},
    {"id":"new","label":"ไปเริ่มต้นใหม่ในที่ที่ไม่มีใครรู้จัก","text":"ย้ายเข้ากรุงเทพฯ หางานโดยไม่บอกใครเรื่องอดีต","effects":[{"role":"jobless"},{"move":{"kind":"bangkok"}},{"flag":"crime-inJail","v":false},{"flag":"crime-record"},{"stat":"happy","d":3},{"trait":"grit","d":2},{"pin":"พ้นโทษ เริ่มต้นใหม่ที่กรุงเทพฯ"}]},
    {"id":"ordain","label":"บวชล้างใจก่อนกลับบ้าน","text":"ขอบวชที่วัดใกล้บ้าน ตั้งใจเริ่มชีวิตใหม่","when":{"sex":"m"},"effects":[{"role":"monk"},{"move":"home"},{"flag":"crime-inJail","v":false},{"flag":"crime-record"},{"inc":"good"},{"stat":"happy","d":4},{"pin":"พ้นโทษแล้วบวช"}]},
    {"id":"old","label":"กลับไปหาเพื่อนกลุ่มเดิม","text":"เพื่อนเก่ามารับถึงหน้าเรือนจำ พร้อมชวนทำงานแบบเดิม","effects":[{"role":"jobless"},{"move":"home"},{"flag":"crime-inJail","v":false},{"flag":"crime-record"},{"inc":"crime"},{"stat":"happy","d":2},{"pin":"พ้นโทษ กลับไปหาเพื่อนกลุ่มเดิม"}]}]},
  {"id":"crime-arrest-minor","title":"ตำรวจมาถึงบ้าน","body":"ตำรวจถือหมายจับมาถึงบ้าน ข้อหาลักทรัพย์ เพื่อนบ้านยืนมุงดูกันเต็ม","when":{"flag":{"crime-wanted":"minor"},"noFlag":["crime-inJail"]},"cooldown":1,"major":true,"heavy":true,"choices":[
    {"id":"confess","label":"รับสารภาพ ขอความเมตตาจากศาล","text":"รับสารภาพตั้งแต่ชั้นสอบสวน","effects":[{"flag":"crime-wanted","v":false},{"flag":"crime-record"}],"roll":[
      {"p":0.5,"text":"ศาลให้รอลงอาญา คุมประพฤติ แต่มีประวัติติดตัว","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-5},{"stat":"bond","d":-3},{"pin":"ถูกศาลตัดสินให้รอลงอาญา"}]},
      {"p":0.5,"text":"ศาลลดโทษกึ่งหนึ่ง เหลือจำคุกราวหนึ่งปี","effects":[{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":3},{"stat":"happy","d":-10},{"pin":"ติดคุกราวหนึ่งปี"}]}]},
    {"id":"bail","label":"ยื่นประกันตัวแล้วสู้คดี","text":"ครอบครัวรวบรวมเงินมาวางประกัน","when":{"money":[1,999999999]},"effects":[{"money":-30,"unit":"wageDay"},{"flag":"crime-wanted","v":false}],"roll":[
      {"p":0.35,"text":"หลักฐานไม่พอ ศาลยกฟ้อง","effects":[{"stat":"happy","d":6},{"pin":"ศาลยกฟ้อง"}]},
      {"p":0.35,"text":"ศาลให้รอลงอาญาและปรับ","effects":[{"flag":"crime-record"},{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-4}]},
      {"p":0.3,"text":"สู้แล้วแพ้ ศาลไม่ลดโทษ จำคุกสองปี","effects":[{"flag":"crime-record"},{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":6},{"stat":"happy","d":-12},{"pin":"ติดคุกสองปี"}]}]},
    {"id":"flee","label":"หนีออกทางหลังบ้าน","text":"วิ่งหนีเข้าทุ่งไปอย่างไม่คิดชีวิต","effects":[{"inc":"crime"}],"roll":[
      {"p":0.3,"text":"หนีรอดไปหลบอยู่บ้านญาติต่างจังหวัด แต่ต้องคอยหลบตลอด","effects":[{"flag":"crime-wanted","v":false},{"flag":"crime-fugitive"},{"stat":"happy","d":-6},{"stat":"bond","d":-5},{"move":{"kind":"bangkok"}}]},
      {"p":0.7,"text":"ถูกตามจับได้ในอีกไม่กี่วัน โทษหนักขึ้นเพราะหลบหนี","effects":[{"flag":"crime-wanted","v":false},{"flag":"crime-record"},{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":9},{"stat":"happy","d":-12},{"pin":"หนีแล้วถูกจับ ติดคุกสามปี"}]}]}]},
  {"id":"crime-arrest-major","title":"ถูกจับคดีใหญ่","body":"เจ้าหน้าที่หลายนายเข้าจับกุมพร้อมหลักฐาน คดีนี้โทษหนัก ข่าวไปทั่วหมู่บ้าน","when":{"flag":{"crime-wanted":"major"},"noFlag":["crime-inJail"]},"cooldown":1,"major":true,"heavy":true,"choices":[
    {"id":"confess","label":"รับสารภาพ","text":"รับสารภาพเพื่อให้ได้ลดโทษ","effects":[{"flag":"crime-wanted","v":false},{"flag":"crime-record"},{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":12},{"stat":"happy","d":-15},{"stat":"bond","d":-5},{"pin":"ติดคุกสี่ปี"}]},
    {"id":"lawyer","label":"จ้างทนายเก่งๆ สู้คดี","text":"ขายของมีค่าและยืมเงินญาติมาจ้างทนาย","effects":[{"money":-120,"unit":"wageDay"},{"flag":"crime-wanted","v":false},{"flag":"crime-record"}],"roll":[
      {"p":0.25,"text":"ทนายหาช่องโหว่ได้ ศาลยกฟ้องเพราะหลักฐานไม่ชัด","effects":[{"stat":"happy","d":8},{"pin":"รอดคดีใหญ่"}]},
      {"p":0.4,"text":"ได้ลดโทษเหลือสามปี","effects":[{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":9},{"stat":"happy","d":-12},{"pin":"ติดคุกสามปี"}]},
      {"p":0.35,"text":"แพ้คดี ศาลตัดสินจำคุกหกปี","effects":[{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":18},{"stat":"happy","d":-18},{"pin":"ติดคุกหกปี"}]}]},
    {"id":"deny","label":"ปฏิเสธทุกข้อหา สู้เองไม่จ้างทนาย","text":"ยืนยันว่าตัวเองบริสุทธิ์","effects":[{"flag":"crime-wanted","v":false},{"flag":"crime-record"}],"roll":[
      {"p":0.1,"text":"ศาลยกฟ้อง","effects":[{"stat":"happy","d":8}]},
      {"p":0.9,"text":"แพ้คดี ไม่ได้ลดโทษ จำคุกแปดปี","effects":[{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":24},{"stat":"happy","d":-20},{"pin":"ติดคุกแปดปี"}]}]}]}
]);
KI.data.personalEvents.push(...[
  {"id":"crime-teen-steal","title":"เพื่อนชวนขโมยของในร้าน","body":"เพื่อนในกลุ่มชวนแอบหยิบของในร้านสะดวกซื้อ บอกว่าไม่มีใครเห็นหรอก","w":8,"when":{"age":[11,17],"counter":{"naughty":[2,99]},"noFlag":["crime-inJail"]},"cooldown":12,"choices":[
    {"id":"steal","label":"หยิบใส่กระเป๋าแล้วเดินออก","text":"ใจเต้นแรงตอนเดินผ่านแคชเชียร์","effects":[{"inc":"crime"},{"inc":"naughty"}],"roll":[
      {"p":0.6,"text":"รอดไปได้ รู้สึกตื่นเต้นแปลกๆ","effects":[{"money":2,"unit":"wageDay"},{"stat":"happy","d":2}]},
      {"p":0.4,"text":"เจ้าของร้านจับได้ โทรเรียกพ่อแม่มารับ ถูกตีและดุยกใหญ่","effects":[{"stat":"bond","d":-5},{"stat":"happy","d":-5},{"cond":"crime-guilt","turns":2}]}]},
    {"id":"no","label":"ปฏิเสธ แล้วเดินแยกออกมา","text":"เพื่อนหาว่าขี้ขลาด แต่ก็สบายใจกว่า","effects":[{"inc":"good"},{"stat":"bond","d":-1}]},
    {"id":"warn","label":"ห้ามเพื่อนไม่ให้ทำ","text":"เพื่อนบางคนฟัง บางคนไม่พอใจ","effects":[{"inc":"good"},{"trait":"social","d":1}]}]},
  {"id":"crime-moto","title":"โอกาสขโมยรถ","body":"เห็นรถมอเตอร์ไซค์จอดเสียบกุญแจทิ้งไว้หน้าร้าน รุ่นพี่บอกว่ารู้แหล่งรับซื้อ","w":6,"when":{"age":[16,45],"year":[1985,9999],"any":[{"counter":{"crime":[1,99]}},{"counter":{"vice":[3,99]}}],"noFlag":["crime-inJail","crime-wanted"]},"cooldown":12,"heavy":true,"choices":[
    {"id":"take","label":"ขี่ออกไปขาย","text":"ขี่รถออกไปอย่างรวดเร็ว","effects":[{"inc":"crime"},{"money":25,"unit":"wageDay"}],"roll":[
      {"p":0.55,"text":"ขายได้เงินก้อน ไม่มีใครตามมา","effects":[{"stat":"happy","d":2},{"cond":"crime-guilt","turns":2,"by":"attach"}]},
      {"p":0.45,"text":"กล้องวงจรปิดจับภาพไว้ได้ ตำรวจกำลังตามหา","effects":[{"flag":"crime-wanted","v":"minor"}]}]},
    {"id":"tell","label":"บอกเจ้าของให้เก็บกุญแจ","text":"เจ้าของขอบคุณ ยื่นน้ำให้หนึ่งขวด","effects":[{"inc":"good"},{"inc":"crime","d":-1},{"stat":"happy","d":2}]},
    {"id":"walk","label":"เดินผ่านไปเฉยๆ","text":"ไม่อยากยุ่งกับเรื่องนี้","effects":[]}]},
  {"id":"crime-drug","title":"มีคนชวนเดินยา","body":"คนรู้จักเสนอเงินก้อนให้ช่วยขนยาบ้าข้ามจังหวัดแค่รอบเดียว บอกว่าปลอดภัยแน่นอน","w":6,"when":{"age":[17,50],"year":[1995,9999],"any":[{"counter":{"vice":[2,99]}},{"counter":{"crime":[1,99]}},{"flag":{"status":"poor"}}],"noFlag":["crime-inJail","crime-wanted"],"chance":0.5},"cooldown":15,"heavy":true,"choices":[
    {"id":"carry","label":"รับงาน ขนแค่รอบเดียว","text":"ขับรถผ่านด่านตรวจด้วยมือที่เหงื่อแตก","effects":[{"inc":"crime"},{"inc":"risky"}],"roll":[
      {"p":0.6,"text":"ส่งของถึงมือ ได้เงินก้อนใหญ่","effects":[{"money":80,"unit":"wageDay"},{"cond":"crime-guilt","turns":3,"by":"attach"}]},
      {"p":0.4,"text":"ถูกด่านตรวจค้นเจอ ถูกจับคาที่","effects":[{"flag":"crime-wanted","v":"major"}]}]},
    {"id":"no","label":"ปฏิเสธเด็ดขาด","text":"ไม่อยากเอาอนาคตไปเสี่ยง","effects":[{"inc":"good"},{"stat":"happy","d":1}]},
    {"id":"report","label":"แจ้งตำรวจเบาะแส","text":"แจ้งเบาะแสโดยไม่เปิดเผยชื่อ","effects":[{"inc":"good"}],"roll":[
      {"p":0.7,"text":"ตำรวจจับกุมเครือข่ายได้ ไม่มีใครรู้ว่าใครแจ้ง","effects":[{"stat":"happy","d":3}]},
      {"p":0.3,"text":"มีคนสงสัย ถูกขู่จนต้องย้ายไปอยู่ที่อื่นสักพัก","effects":[{"stat":"happy","d":-5},{"move":{"kind":"bangkok"}}]}]}]},
  {"id":"crime-collector","title":"งานทวงหนี้นอกระบบ","body":"เจ้าหนี้เงินกู้นอกระบบชวนไปทำงานทวงหนี้ จ่ายดีแต่ต้องใช้กำลังขู่","w":4,"when":{"age":[18,45],"any":[{"counter":{"risky":[2,99]}},{"counter":{"crime":[1,99]}},{"talent":{"muaythai":[1,3]}}],"noFlag":["crime-inJail","crime-wanted"]},"cooldown":15,"heavy":true,"choices":[
    {"id":"join","label":"รับงาน","text":"ออกตระเวนทวงหนี้ตามบ้าน","effects":[{"inc":"crime"},{"money":30,"unit":"wageDay"},{"stat":"bond","d":-2}],"roll":[
      {"p":0.55,"text":"ได้เงินดี แต่ต้องทนเห็นน้ำตาลูกหนี้","effects":[{"cond":"crime-guilt","turns":2,"by":"attach"}]},
      {"p":0.25,"text":"ลูกหนี้ไปแจ้งความข้อหาข่มขู่ทำร้าย","effects":[{"flag":"crime-wanted","v":"minor"}]},
      {"p":0.2,"text":"ลูกหนี้สู้กลับ บาดเจ็บหนัก","effects":[{"stat":"health","d":-12},{"die":"debt-fight","p":0.08}]}]},
    {"id":"no","label":"ไม่เอา","text":"เงินดีแค่ไหนก็ไม่คุ้ม","effects":[{"inc":"good"}]}]},
  {"id":"crime-embezzle","title":"ช่องโหว่ในบัญชี","body":"เห็นช่องทางแอบโอนเงินของที่ทำงานเข้าบัญชีตัวเอง ทีละนิดไม่มีใครสังเกต","w":5,"when":{"age":[23,60],"role":["office","accountant","banker","civil","business"],"noFlag":["crime-inJail","crime-wanted"],"chance":0.5},"cooldown":18,"choices":[
    {"id":"take","label":"แอบโอนทีละนิด","text":"เงินในบัญชีเพิ่มขึ้นทุกเดือน","effects":[{"inc":"crime"},{"money":60,"unit":"wageDay"}],"roll":[
      {"p":0.5,"text":"ยังไม่มีใครรู้ แต่หลับไม่ค่อยสนิท","effects":[{"cond":"crime-guilt","turns":3}]},
      {"p":0.5,"text":"ฝ่ายตรวจสอบเจอ ถูกไล่ออกและแจ้งความ","effects":[{"role":"jobless"},{"flag":"crime-wanted","v":"major"}]}]},
    {"id":"report","label":"แจ้งหัวหน้าให้ปิดช่องโหว่","text":"หัวหน้าชมว่าซื่อสัตย์","effects":[{"inc":"good"},{"stat":"happy","d":2}],"roll":[{"p":0.3,"text":"ได้ขึ้นเงินเดือนพิเศษ","effects":[{"money":10,"unit":"wageDay"}]}]},
    {"id":"ignore","label":"ทำเป็นไม่เห็น","text":"ไม่ใช่หน้าที่ตัวเอง","effects":[]}]},
  {"id":"crime-den","title":"เปิดบ่อนเล็กๆ","body":"เพื่อนชวนเปิดวงไพ่และรับแทงบอลในบ้าน บอกว่ากินค่าต๋งรายได้ดี","w":4,"when":{"age":[20,60],"counter":{"vice":[2,99]},"noFlag":["crime-inJail","crime-wanted"]},"cooldown":15,"choices":[
    {"id":"open","label":"เปิดเลย","text":"คนมานั่งเล่นทุกคืน","effects":[{"inc":"crime"},{"inc":"vice"},{"money":35,"unit":"wageDay"},{"stat":"bond","d":-3}],"roll":[
      {"p":0.6,"text":"รายได้ดีจนชินกับชีวิตแบบนี้","effects":[]},
      {"p":0.4,"text":"ตำรวจบุกจับกลางดึก","effects":[{"flag":"crime-wanted","v":"minor"}]}]},
    {"id":"no","label":"ปฏิเสธ","text":"ไม่อยากให้บ้านกลายเป็นบ่อน","effects":[{"stat":"bond","d":1}]}]},
  {"id":"crime-jail-fight","title":"มีเรื่องในเรือนจำ","body":"ผู้ต้องขังกลุ่มหนึ่งมาหาเรื่องในโรงอาหาร","w":10,"when":{"role":"prisoner"},"cooldown":6,"heavy":true,"choices":[
    {"id":"fight","label":"สู้กลับ","text":"ไม่ยอมให้ใครข่มเหง","effects":[{"stat":"health","d":-6}],"roll":[
      {"p":0.6,"text":"ได้รับความเกรงใจ แต่โดนลงโทษเพิ่ม","effects":[{"cond":"crime-jailed","turns":3}]},
      {"p":0.4,"text":"บาดเจ็บหนักต้องส่งสถานพยาบาล","effects":[{"stat":"health","d":-10},{"die":"prison-fight","p":0.05}]}]},
    {"id":"avoid","label":"ยอมถอย ไม่มีเรื่อง","text":"เก็บความโกรธไว้ในใจ","effects":[{"stat":"happy","d":-3}]},
    {"id":"guard","label":"แจ้งผู้คุม","text":"ถูกย้ายแดน แต่ปลอดภัยขึ้น","effects":[{"stat":"happy","d":-1}]}]},
  {"id":"crime-jail-study","title":"การศึกษาในเรือนจำ","body":"เรือนจำเปิดให้เรียน กศน. และฝึกอาชีพ","w":10,"when":{"role":"prisoner"},"cooldown":6,"choices":[
    {"id":"study","label":"สมัครเรียน กศน.","text":"อ่านหนังสือทุกเย็นหลังเลิกงาน","effects":[{"stat":"know","d":5},{"inc":"good"},{"stat":"happy","d":2}]},
    {"id":"skill","label":"ฝึกอาชีพช่างหรือทำอาหาร","text":"ได้วิชาติดตัวไว้ใช้หลังพ้นโทษ","effects":[{"inc":"skill-craft"},{"inc":"skill-cooking"},{"flag":"crime-trained"},{"stat":"happy","d":2}]},
    {"id":"no","label":"ไม่สนใจ ปล่อยเวลาผ่านไป","text":"นอนนับวันรอ","effects":[{"stat":"happy","d":-2}]}]},
  {"id":"crime-jail-visit","title":"วันเยี่ยมญาติ","body":"ถึงวันเยี่ยม มองผ่านกระจกไปเห็นหน้าคนที่บ้าน","w":12,"when":{"role":"prisoner","any":[{"flag":{"parentsAlive":true}},{"flag":{"partner":true}},{"flag":{"child":true}}]},"cooldown":3,"choices":[
    {"id":"sorry","label":"ขอโทษ สัญญาว่าจะกลับตัว","text":"น้ำตาไหลทั้งสองฝั่งกระจก","effects":[{"stat":"bond","d":4},{"stat":"happy","d":3},{"inc":"good"}]},
    {"id":"money","label":"ขอให้ฝากเงินเข้าบัญชีในเรือนจำ","text":"คนที่บ้านต้องประหยัดเพื่อส่งเงินให้","effects":[{"stat":"health","d":1},{"stat":"bond","d":-2}]},
    {"id":"refuse","label":"ไม่ออกไปพบ อายเกินไป","text":"นั่งอยู่ในห้องขังคนเดียว","effects":[{"stat":"happy","d":-4,"by":"attach"},{"stat":"bond","d":-3}]}]},
  {"id":"crime-jail-leave","title":"คู่ส่งจดหมายมา","body":"จดหมายจากคู่ชีวิตบอกว่ารอไม่ไหวแล้ว อยากแยกทางกัน","w":8,"when":{"role":"prisoner","flag":{"partner":true},"chance":0.4},"cooldown":9,"choices":[
    {"id":"accept","label":"เซ็นยินยอม ปล่อยเขาไป","text":"ยอมรับว่าเป็นความผิดของตัวเอง","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"heartbroken","turns":4,"by":"attach"},{"stat":"happy","d":-10,"by":"attach"}]},
    {"id":"beg","label":"เขียนจดหมายขอให้รอ","text":"ส่งจดหมายฉบับยาวกลับไป","effects":[],"roll":[
      {"p":0.4,"text":"เขาตอบกลับว่าจะรอ","effects":[{"stat":"bond","d":5},{"stat":"happy","d":5}]},
      {"p":0.6,"text":"ไม่มีจดหมายตอบกลับ ไม่กี่เดือนต่อมาก็ได้ใบหย่า","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"heartbroken","turns":4,"by":"attach"},{"stat":"happy","d":-12,"by":"attach"}]}]}]},
  {"id":"crime-jail-pardon","title":"พระราชทานอภัยโทษ","body":"มีประกาศพระราชทานอภัยโทษ ผู้ต้องขังที่ประพฤติดีได้ลดโทษ","w":4,"when":{"role":"prisoner","cond":["crime-jailed"],"chance":0.5},"cooldown":12,"effects":[{"stat":"happy","d":6}],"choices":[
    {"id":"good","label":"ยื่นเรื่องขอลดโทษ","text":"ผู้คุมรับรองความประพฤติ","when":{"counter":{"good":[1,99]}},"effects":[{"uncond":"crime-jailed"},{"pin":"ได้รับพระราชทานอภัยโทษ"}]},
    {"id":"wait","label":"ตั้งใจประพฤติตัวดีต่อไป","text":"ได้ลดโทษลงบางส่วน","effects":[{"inc":"good"}]}]},
  {"id":"crime-jail-sick","title":"ป่วยในเรือนจำ","body":"ห้องขังแออัด เริ่มมีอาการไอเรื้อรังและไข้","w":5,"when":{"role":"prisoner"},"cooldown":9,"choices":[
    {"id":"clinic","label":"ขอไปสถานพยาบาลเรือนจำ","text":"ได้ยาตามอาการ","effects":[{"stat":"health","d":-3}]},
    {"id":"endure","label":"อดทนไว้","text":"ไม่อยากเป็นภาระใคร","effects":[{"stat":"health","d":-8},{"die":"prison-illness","p":0.04}]}]},
  {"id":"crime-record-job","title":"ประวัติติดตัว","body":"ไปสมัครงานแล้วถูกขอใบตรวจประวัติอาชญากรรม สีหน้าคนสัมภาษณ์เปลี่ยนทันที","w":10,"when":{"age":[18,60],"flag":{"crime-record":true},"role":["jobless","farmer","construction","factory","rider"],"noFlag":["crime-inJail"]},"cooldown":9,"choices":[
    {"id":"honest","label":"เล่าความจริง ขอโอกาสพิสูจน์ตัว","text":"บอกตรงๆ ว่าเคยพลาด","effects":[{"inc":"good"}],"roll":[
      {"p":0.35,"text":"เจ้าของกิจการให้โอกาส ได้งานประจำ","effects":[{"role":"factory"},{"stat":"happy","d":6},{"pin":"ได้งานหลังพ้นโทษ"}]},
      {"p":0.65,"text":"ถูกปฏิเสธอีกครั้ง","effects":[{"stat":"happy","d":-4}]}]},
    {"id":"skill","label":"ใช้วิชาที่ฝึกในเรือนจำ เปิดร้านเล็กๆ เอง","text":"เริ่มรับงานช่างและขายอาหารหน้าบ้าน","when":{"flag":{"crime-trained":true}},"effects":[{"role":"trader"},{"inc":"biz"},{"money":-10,"unit":"wageDay"},{"stat":"happy","d":5},{"pin":"เปิดร้านของตัวเองหลังพ้นโทษ"}]},
    {"id":"labor","label":"รับจ้างรายวันไปก่อน","text":"ไม่มีใครถามประวัติ","effects":[{"role":"construction"},{"stat":"health","d":-2}]},
    {"id":"back","label":"กลับไปทำงานผิดกฎหมายแบบเดิม","text":"หาเงินง่ายกว่า","effects":[{"inc":"crime"}],"roll":[
      {"p":0.5,"text":"ได้เงินมาก้อนหนึ่ง","effects":[{"money":30,"unit":"wageDay"}]},
      {"p":0.5,"text":"ถูกจับซ้ำ โทษหนักกว่าเดิมเพราะทำผิดซ้ำ","effects":[{"flag":"crime-wanted","v":"major"}]}]}]},
  {"id":"crime-fugitive-life","title":"ชีวิตคนหลบหนี","body":"หลบซ่อนตัวมานาน ใจหายทุกครั้งที่เห็นรถตำรวจ","w":10,"when":{"flag":{"crime-fugitive":true},"noFlag":["crime-inJail"]},"cooldown":6,"choices":[
    {"id":"surrender","label":"เข้ามอบตัว","text":"อยากหยุดหนีเสียที","effects":[{"flag":"crime-fugitive","v":false},{"flag":"crime-record"},{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":4},{"stat":"happy","d":2},{"pin":"เข้ามอบตัว"}]},
    {"id":"hide","label":"หลบต่อไป","text":"เปลี่ยนที่อยู่อีกครั้ง","effects":[{"stat":"happy","d":-3},{"stat":"bond","d":-2}],"roll":[
      {"p":0.25,"text":"ถูกจับได้ระหว่างตั้งด่าน","effects":[{"flag":"crime-fugitive","v":false},{"flag":"crime-record"},{"role":"prisoner"},{"flag":"crime-inJail"},{"cond":"crime-jailed","turns":9},{"stat":"happy","d":-10},{"pin":"ถูกจับหลังหลบหนี"}]}]}]}
]);
