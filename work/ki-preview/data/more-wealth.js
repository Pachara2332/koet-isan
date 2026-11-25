globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"wl-life-style","title":"ใช้ชีวิตแบบไหน","body":"ที่บ้านมีพร้อม เงินจากครอบครัวและงานของตัวเองพอให้ใช้สบาย ถึงเวลาตั้งหลักว่าจะใช้ชีวิตแบบไหน","when":{"age":[19,26],"season":0,"noFlag":["wl-styleSet"],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"chance":0.35},"cooldown":"once","major":true,"choices":[
    {"id":"simple","label":"อยู่เรียบง่ายแม้มีพร้อม","text":"ใช้ของเดิมจนกว่าจะพัง กินข้าวบ้าน เงินเหลือเก็บทุกเดือน แต่เพื่อนบางกลุ่มว่าเป็นคนงก","effects":[{"flag":"spendLevel","v":"frugal"},{"flag":"wl-styleSet"},{"trait":"grit","d":1},{"stat":"happy","d":-1}]},
    {"id":"normal","label":"ใช้ตามสมควร","text":"ไม่อดไม่เกิน ซื้อของดีเมื่อจำเป็น","effects":[{"flag":"spendLevel","v":false},{"flag":"wl-styleSet"}]},
    {"id":"comfort","label":"ใช้ให้สมฐานะ","text":"ร้านอาหารดีๆ เสื้อผ้าแบรนด์ และทริปเที่ยวบ่อยขึ้น รายจ่ายเพิ่มขึ้นมาก","effects":[{"flag":"spendLevel","v":"comfort"},{"flag":"wl-styleSet"},{"trait":"social","d":1},{"stat":"happy","d":3}]}]}
]);
KI.data.personalEvents.push(...[
  {"id":"wl-kid-school","title":"เลือกโรงเรียนแรก","body":"พ่อแม่มีเงินพอส่งเรียนโรงเรียนเอกชนในตัวเมือง แต่ญาติบอกว่าโรงเรียนใกล้บ้านก็มีเพื่อนเยอะ","w":12,"cooldown":"once","when":{"age":[6,7],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"private","label":"ไปโรงเรียนเอกชนในเมือง","text":"ตื่นเช้าขึ้นรถเข้าเมืองทุกวัน ห้องเรียนอุปกรณ์ครบ ครูดูแลทั่วถึง แต่เพื่อนในหมู่บ้านห่างกันไป","effects":[{"stat":"know","d":4},{"stat":"bond","d":-1},{"flag":"wl-privateSchool"}]},
    {"id":"bilingual","label":"ไปโรงเรียนสองภาษา","text":"เรียนหลายวิชาเป็นภาษาอังกฤษ การบ้านเยอะ แต่เริ่มพูดกับครูต่างชาติได้","when":{"year":[2003,2026]},"effects":[{"stat":"know","d":5},{"stat":"happy","d":-1},{"inc":"skill-language"},{"flag":"wl-privateSchool"}]},
    {"id":"local","label":"เรียนใกล้บ้านกับเพื่อน","text":"ได้เล่นกับเพื่อนทุกเย็น พ่อแม่จ้างครูมาสอนพิเศษที่บ้านแทน","effects":[{"stat":"know","d":2},{"stat":"happy","d":3},{"stat":"bond","d":2}]}]},
  {"id":"wl-kid-ride","title":"รถไปส่งโรงเรียน","body":"ทุกเช้ามีรถของที่บ้านไปส่งถึงหน้าโรงเรียน เพื่อนบางคนเดินมาไกลแล้วมองตาม","w":8,"cooldown":15,"when":{"age":[7,12],"year":[1978,2026],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"share","label":"ชวนเพื่อนบ้านใกล้กันขึ้นรถไปด้วย","text":"รถแน่นทุกเช้า เสียงหัวเราะดังตลอดทาง แม่ของเพื่อนฝากขนมมาขอบใจ","effects":[{"stat":"bond","d":3},{"stat":"happy","d":2},{"inc":"good"}]},
    {"id":"walk","label":"ขอลงปากซอย เดินไปกับเพื่อน","text":"เดินคุยกับเพื่อนช่วงสุดท้าย ไม่มีใครเรียกว่าลูกคุณหนูอีก","effects":[{"stat":"happy","d":2},{"trait":"social","d":1}]},
    {"id":"alone","label":"นั่งรถไปคนเดียวเหมือนเดิม","text":"สบายดี ถึงโรงเรียนก่อนใคร แต่ไม่ค่อยมีเพื่อนคุยตอนเช้า","effects":[{"stat":"happy","d":1},{"trait":"social","d":-1}]}]},
  {"id":"wl-kid-birthday","title":"งานวันเกิด","body":"แม่จะจัดงานวันเกิดให้ มีเค้กก้อนใหญ่และของขวัญกองโต ถามว่าอยากชวนใครบ้าง","w":8,"cooldown":9,"when":{"age":[6,11],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"class","label":"ชวนทั้งห้อง","text":"บ้านเต็มไปด้วยเด็ก เพื่อนที่ไม่ค่อยได้คุยกันก็มาสนิทกันวันนี้","effects":[{"stat":"happy","d":4},{"stat":"bond","d":2},{"trait":"social","d":1}]},
    {"id":"close","label":"ชวนแค่เพื่อนสนิท","text":"งานเล็กแต่อบอุ่น เล่นกันจนค่ำ","effects":[{"stat":"happy","d":2},{"stat":"bond","d":3}]},
    {"id":"temple","label":"ขอเอาเงินจัดงานไปเลี้ยงข้าวเด็กที่วัด","text":"พ่อแม่แปลกใจแต่ยอมตาม หลวงพ่อให้พร เด็กวัดยิ้มกันทั้งโรงครัว","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1},{"inc":"good"}]}]},
  {"id":"wl-kid-lessons","title":"เรียนพิเศษวันหยุด","body":"พ่อแม่อยากให้เรียนอะไรเพิ่มในเมืองทุกเสาร์อาทิตย์ จะเป็นดนตรี ว่ายน้ำ หรือภาษาอังกฤษก็ได้","w":8,"cooldown":12,"when":{"age":[6,12],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"music","label":"เรียนดนตรี","text":"นิ้วเริ่มคล่อง ซ้อมทุกเย็นจนแม่ชม","effects":[{"inc":"skill-music"},{"stat":"know","d":1},{"stat":"happy","d":-1}]},
    {"id":"swim","label":"เรียนว่ายน้ำ","text":"ตัวแข็งแรงขึ้น ไม่กลัวน้ำอีกแล้ว","effects":[{"inc":"skill-sport"},{"stat":"health","d":3}]},
    {"id":"english","label":"เรียนภาษาอังกฤษ","text":"เริ่มอ่านการ์ตูนภาษาอังกฤษออก แต่วันหยุดหายไปครึ่งหนึ่ง","effects":[{"inc":"skill-language"},{"stat":"know","d":3},{"stat":"happy","d":-1}]},
    {"id":"play","label":"ขอวิ่งเล่นกับเพื่อนแทน","text":"วันหยุดได้เล่นเต็มที่ พ่อแม่ดูผิดหวังนิดหน่อย","effects":[{"stat":"happy","d":3},{"stat":"bond","d":-1}]}]},
  {"id":"wl-kid-abroad","title":"เที่ยวต่างประเทศกับครอบครัว","body":"ปิดเทอมใหญ่ พ่อแม่จะพาไปเที่ยวสิงคโปร์ เป็นการนั่งเครื่องบินครั้งแรก","w":6,"cooldown":"once","when":{"age":[8,15],"year":[1988,2026],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"notes","label":"จดทุกอย่างลงสมุด","text":"ตึกสูง รถไฟฟ้า ภาษาที่ไม่คุ้นหู กลับมาเล่าให้ครูฟังได้ทั้งคาบ","effects":[{"stat":"know","d":3},{"stat":"happy","d":4}]},
    {"id":"gifts","label":"ซื้อของฝากเพื่อนทั้งห้อง","text":"กระเป๋าหนักอึ้งด้วยขนมและพวงกุญแจ เพื่อนๆ ตื่นเต้นกันใหญ่","effects":[{"stat":"bond","d":2},{"stat":"happy","d":2},{"trait":"social","d":1}]},
    {"id":"stay","label":"ขออยู่บ้าน ไม่ไปด้วย","text":"พ่อแม่ไปกันเอง ส่วนตัวเองอยู่กับญาติ ช่วยงานบ้านทั้งสัปดาห์","effects":[{"stat":"bond","d":1},{"stat":"happy","d":-1}]}]},
  {"id":"wl-kid-village","title":"ลูกคนมีเงิน","body":"เด็กในหมู่บ้านเรียกว่าลูกเถ้าแก่ บางคนอยากเป็นเพื่อนเพราะของเล่น บางคนไม่ยอมเล่นด้วย","w":7,"cooldown":12,"when":{"age":[8,13],"loc":"isan","any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"share","label":"เอาของเล่นออกมาเล่นด้วยกัน","text":"ลานบ้านกลายเป็นที่รวมเด็ก ของเล่นพังไปบ้าง แต่ได้เพื่อนเพิ่ม","effects":[{"stat":"bond","d":2},{"stat":"happy","d":2},{"trait":"social","d":1}]},
    {"id":"true","label":"เล่นกับคนที่ชอบเราจริงๆ","text":"เพื่อนน้อยลง แต่เป็นเพื่อนที่ไว้ใจได้","effects":[{"stat":"bond","d":1},{"stat":"happy","d":1}]},
    {"id":"inside","label":"ไม่ออกไปเล่นนอกบ้าน","text":"อยู่กับทีวีและของเล่นคนเดียว บ้านใหญ่แต่เงียบ","effects":[{"stat":"happy","d":-2},{"trait":"social","d":-2},{"cond":"lonely","turns":2}]}]},
  {"id":"wl-teen-tutor","title":"เรียนกวดวิชา","body":"พ่อแม่พร้อมจ่ายค่ากวดวิชาในตัวเมืองทุกเสาร์อาทิตย์ หรือจะส่งไปเรียนคอร์สปิดเทอมที่กรุงเทพฯ ก็ได้","w":9,"cooldown":9,"when":{"age":[14,17],"year":[1980,2026],"edu":{"in":["school"]},"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"town","label":"เรียนในเมืองทุกสัปดาห์","text":"นั่งรถเข้าเมืองตั้งแต่เช้า เรียนจนค่ำ คะแนนสอบดีขึ้นแต่เหนื่อยสะสม","effects":[{"stat":"know","d":5},{"stat":"happy","d":-2},{"stat":"health","d":-1}]},
    {"id":"bangkok","label":"ไปคอร์สปิดเทอมที่กรุงเทพฯ","text":"พักบ้านญาติ เรียนในห้องที่มีนักเรียนหลายร้อยคน ได้เห็นโลกกว้างขึ้นแต่คิดถึงบ้าน","effects":[{"stat":"know","d":6},{"stat":"happy","d":1},{"cond":"homesick","turns":1}]},
    {"id":"self","label":"ขออ่านเองที่บ้าน","text":"ประหยัดเวลาเดินทาง ได้พักบ้าง แต่บางบทก็ไม่เข้าใจ","effects":[{"stat":"know","d":2},{"stat":"happy","d":2}]}]},
  {"id":"wl-teen-brand","title":"เพื่อนกลุ่มใหม่","body":"เงินที่พ่อแม่ให้ใช้มากกว่าเพื่อนหลายเท่า มีกลุ่มเพื่อนใหม่ชวนไปเดินห้างและลงรูปในโซเชียลทุกสัปดาห์","w":7,"cooldown":12,"when":{"age":[13,17],"year":[2010,2026],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"follow","label":"ตามกลุ่มเพื่อนใหม่","text":"ของใหม่ทุกเดือน ยอดไลก์เพิ่มขึ้น แต่เพื่อนเก่าเริ่มห่าง","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":3},{"stat":"bond","d":-2},{"flag":"wl-flashy"}]},
    {"id":"some","label":"ไปบ้าง ซื้อเท่าที่ชอบจริง","text":"สนุกพอดี ไม่ต้องอวดใคร","effects":[{"money":-3,"unit":"wageDay"},{"stat":"happy","d":1}]},
    {"id":"save","label":"เก็บเงินไว้ลองลงทุนเอง","text":"เปิดบัญชีเงินฝาก ศึกษาเรื่องเงินจากหนังสือ เพื่อนบางคนว่าแก่เกินวัย","effects":[{"stat":"know","d":2},{"trait":"grit","d":1},{"stat":"happy","d":-1}]}]},
  {"id":"wl-teen-camp","title":"ค่ายภาษาต่างประเทศ","body":"พ่อแม่เสนอส่งไปค่ายภาษาช่วงปิดเทอมที่ออสเตรเลียหนึ่งเดือน พักกับครอบครัวเจ้าบ้าน","w":5,"cooldown":"once","when":{"age":[15,17],"year":[1995,2026],"edu":{"in":["school"]},"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"go","label":"ไปค่าย","text":"สัปดาห์แรกฟังไม่ทัน พอสัปดาห์ที่สามเริ่มคุยกับเพื่อนต่างชาติได้คล่อง","effects":[{"stat":"know","d":5},{"stat":"happy","d":3},{"inc":"skill-language"},{"cond":"homesick","turns":1},{"flag":"wl-campAbroad"}]},
    {"id":"home","label":"ไม่ไป ขออยู่ช่วยงานที่บ้าน","text":"ปิดเทอมนี้ได้อยู่กับพ่อแม่และเรียนรู้งานของครอบครัว","effects":[{"stat":"bond","d":3},{"stat":"know","d":1}]}]},
  {"id":"wl-teen-shop","title":"ช่วยกิจการของที่บ้าน","body":"ปิดเทอม ผู้ใหญ่ที่บ้านให้ไปช่วยดูกิจการของครอบครัว นับของ จดบัญชี และคุยกับลูกค้า","w":8,"cooldown":6,"when":{"age":[15,17],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"learn","label":"ตั้งใจเรียนรู้งาน","text":"เริ่มรู้ว่าของชิ้นไหนกำไรดี ลูกค้าคนไหนจ่ายตรง ผู้ใหญ่แบ่งค่าขนมให้เป็นค่าแรง","effects":[{"stat":"know","d":3},{"stat":"bond","d":2},{"money":3,"unit":"wageDay"},{"flag":"wl-bizTrained"}]},
    {"id":"skip","label":"ช่วยพอเป็นพิธี แล้วไปเที่ยว","text":"ได้เที่ยวกับเพื่อนเต็มที่ แต่ผู้ใหญ่ที่บ้านเริ่มพูดน้อยลง","effects":[{"stat":"happy","d":2},{"stat":"bond","d":-2}]},
    {"id":"elsewhere","label":"ขอไปทำงานพิเศษที่อื่น","text":"อยากรู้ว่าหาเงินเองได้ไหม ได้ค่าแรงไม่มากแต่ภูมิใจ","effects":[{"money":4,"unit":"wageDay"},{"trait":"grit","d":1},{"stat":"bond","d":-1}]}]},
  {"id":"wl-teen-expect","title":"ความหวังของครอบครัว","body":"ญาติผู้ใหญ่พูดในวงข้าวว่าลูกบ้านนี้ต้องเป็นหมอ ไม่ก็ต้องกลับมาดูแลกิจการ ทุกคนหันมามอง","w":7,"cooldown":"once","when":{"age":[15,17],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"promise","label":"รับปากว่าจะทำให้ได้","text":"ทุกคนยิ้ม แต่คืนนั้นนอนไม่หลับ ความคาดหวังหนักกว่าที่คิด","effects":[{"stat":"know","d":2},{"stat":"happy","d":-3},{"flag":"wl-pressure"}]},
    {"id":"honest","label":"บอกตรงๆ ว่ายังไม่รู้ว่าชอบอะไร","text":"วงข้าวเงียบไปพักหนึ่ง ญาติบางคนส่ายหน้า แต่ใจเบาขึ้น","effects":[{"stat":"happy","d":1},{"stat":"bond","d":-2}]},
    {"id":"talk","label":"ขอคุยกับพ่อแม่เรื่องสิ่งที่อยากเรียน","text":"เล่าความฝันของตัวเองให้พ่อแม่ฟังอย่างตั้งใจ","effects":[{"stat":"happy","d":1}],"roll":[
      {"p":0.55,"text":"พ่อแม่ฟังจนจบ แล้วบอกว่าจะสนับสนุนทางที่เลือก","effects":[{"stat":"bond","d":4},{"stat":"happy","d":2}]},
      {"p":0.45,"text":"พ่อแม่ยังอยากให้เลือกทางที่มั่นคงกว่า เรื่องนี้ค้างคาอยู่ในใจ","effects":[{"stat":"bond","d":-2},{"stat":"happy","d":-2,"by":"attach"}]}]}]},
  {"id":"wl-teen-car","title":"รถคันแรก","body":"อายุครบสิบแปด สอบใบขับขี่ได้แล้ว พ่อแม่บอกว่าจะซื้อรถให้หนึ่งคัน ให้เลือกเอง","w":10,"cooldown":"once","when":{"age":[18,19],"year":[1990,2026],"noFlag":["wl-car","ownsPersonalCar"],"any":[{"wealth":"rich"},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"sedan","label":"รถเก๋งคันใหม่","text":"รถใหม่กลิ่นเบาะหนัง เพื่อนชวนไปไหนก็ได้ทุกที่","effects":[{"flag":"wl-car"},{"stat":"happy","d":5},{"trait":"social","d":1}]},
    {"id":"pickup","label":"รถกระบะ ใช้งานที่บ้านได้ด้วย","text":"ขนของให้ที่บ้านได้ พาแม่ไปตลาดทุกเช้าวันเสาร์","effects":[{"flag":"wl-car"},{"stat":"happy","d":3},{"stat":"bond","d":2}]},
    {"id":"cash","label":"ขอเป็นเงินเก็บไว้ก่อน","text":"พ่อแม่ให้เงินก้อนหนึ่งไว้ตั้งตัว ส่วนการเดินทางใช้มอเตอร์ไซค์ไปก่อน","effects":[{"money":60,"unit":"wageDay"},{"trait":"grit","d":1},{"stat":"happy","d":-1}]}]},
  {"id":"wl-car-night","title":"ขับรถเที่ยวกลางคืน","body":"เพื่อนรู้ว่ามีรถ ชวนขับไปนั่งร้านริมน้ำในเมืองจนดึก ทุกคนจะดื่มกัน","w":6,"cooldown":12,"when":{"age":[18,26],"flag":{"wl-car":true}},"choices":[
    {"id":"sober","label":"ไปแต่ไม่ดื่ม เป็นคนขับ","text":"เพื่อนแซวว่าเป็นคนขับประจำ แต่ทุกคนถึงบ้านปลอดภัย","effects":[{"stat":"happy","d":2},{"stat":"bond","d":2}]},
    {"id":"drink","label":"ดื่มด้วยแล้วขับกลับเอง","text":"สนุกเต็มที่ ถนนกลับบ้านมืดและยาวกว่าที่คิด","effects":[{"stat":"happy","d":3},{"inc":"vice"}],"roll":[
      {"p":0.15,"text":"รถเสียหลักลงข้างทาง ตัวรถพังยับ","effects":[{"stat":"health","d":-12},{"money":-30,"unit":"wageDay"},{"stat":"happy","d":-5},{"die":"road","p":0.1}]}]},
    {"id":"no","label":"ไม่ไป","text":"อยู่บ้านเงียบๆ เพื่อนบางคนว่าไม่สนุก","effects":[{"stat":"bond","d":-1},{"stat":"health","d":1}]}]},
  {"id":"wl-merit-host","title":"เจ้าภาพทอดกฐิน","body":"กรรมการวัดมาขอให้เป็นเจ้าภาพกฐินปีนี้ คนทั้งหมู่บ้านรอดูว่าจะจัดใหญ่แค่ไหน","w":8,"cooldown":12,"when":{"age":[30,85],"season":2,"loc":"isan","any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"full","label":"เป็นเจ้าภาพเต็มตัว","text":"ขบวนกลองยาวแห่ยาวทั้งหมู่บ้าน ยอดบริจาคเข้าวัดก้อนใหญ่ ชื่อของครอบครัวถูกพูดถึงไปอีกนาน","effects":[{"money":-80,"unit":"wageDay"},{"stat":"happy","d":4},{"stat":"bond","d":3},{"flag":"wl-meritHost"}]},
    {"id":"shared","label":"ร่วมเป็นเจ้าภาพกับหลายบ้าน","text":"ช่วยกันคนละส่วน งานใหญ่พอดี ทุกบ้านได้บุญ","effects":[{"money":-25,"unit":"wageDay"},{"stat":"happy","d":2},{"stat":"bond","d":2}]},
    {"id":"quiet","label":"บริจาคเงียบๆ ไม่ขึ้นป้ายชื่อ","text":"ฝากเงินกับหลวงพ่อโดยไม่บอกใคร ใจสงบกว่าที่คิด","effects":[{"money":-40,"unit":"wageDay"},{"stat":"happy","d":3}]},
    {"id":"decline","label":"ขอผ่าน ปีนี้มีภาระมาก","text":"กรรมการพยักหน้ารับ แต่เสียงซุบซิบตามมาไม่น้อย","effects":[{"stat":"bond","d":-3}]}]},
  {"id":"wl-rental","title":"ห้องแถวให้เช่า","body":"มีห้องแถวในตัวอำเภอประกาศขาย ถ้าซื้อไว้ปล่อยเช่าจะมีรายได้เข้าทุกเดือน","w":6,"cooldown":12,"when":{"age":[28,65],"year":[1985,2026],"loc":"isan","noFlag":["wl-rentOwned"],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"rent","label":"ซื้อไว้ปล่อยเช่า","text":"ได้ผู้เช่าเป็นร้านขายยากับร้านซ่อมรถ ค่าเช่าเข้าทุกเดือน แต่เงินก้อนหายไป","effects":[{"money":-220,"unit":"wageDay"},{"cond":"wl-rent","turns":45},{"flag":"wl-rentOwned"},{"stat":"happy","d":1}]},
    {"id":"shop","label":"ซื้อแล้วเปิดร้านเอง","text":"ตกแต่งหน้าร้านใหม่ ต้องดูแลเองทุกวัน","effects":[{"money":-220,"unit":"wageDay"},{"inc":"biz"},{"flag":"wl-rentOwned"},{"stat":"happy","d":-1}]},
    {"id":"pass","label":"ไม่ซื้อ เก็บเงินไว้","text":"เงินยังอยู่ครบ","effects":[],"roll":[
      {"p":0.5,"text":"ไม่กี่ปีต่อมาราคาห้องแถวแถวนั้นขึ้นไปมาก นึกเสียดายอยู่เหมือนกัน","effects":[{"stat":"happy","d":-2}]}]}]},
  {"id":"wl-rent-tenant","title":"ผู้เช่าค้างค่าเช่า","body":"ผู้เช่าห้องแถวค้างค่าเช่ามาสามเดือน บอกว่าร้านเงียบตั้งแต่มีห้างเปิดใหม่","w":6,"cooldown":12,"when":{"flag":{"wl-rentOwned":true},"cond":["wl-rent"]},"choices":[
    {"id":"wait","label":"ผ่อนผันให้อีกสักพัก","text":"ผู้เช่าขอบคุณยกใหญ่ ทยอยจ่ายคืนได้บางส่วน","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"evict","label":"ให้ย้ายออก หาคนเช่าใหม่","text":"ห้องว่างอยู่หลายเดือนกว่าจะได้ผู้เช่าใหม่","effects":[{"money":-8,"unit":"wageDay"},{"stat":"happy","d":-1}]},
    {"id":"discount","label":"ลดค่าเช่าให้อยู่ต่อ","text":"รายได้ลดลงนิดหน่อย แต่ห้องไม่ว่าง","effects":[{"money":-4,"unit":"wageDay"},{"stat":"bond","d":1}]}]},
  {"id":"wl-workers","title":"คนงานขอเบิกเงินล่วงหน้า","body":"คนงานที่ช่วยทำนาให้ครอบครัวมาหลายปีขอเบิกค่าแรงล่วงหน้าไปจ่ายค่าเทอมลูก","w":7,"cooldown":9,"when":{"age":[25,70],"role":"farmer","loc":"isan","any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"give","label":"ให้เบิก ไม่คิดดอก","text":"คนงานยกมือไหว้ ทำงานให้อย่างเต็มใจ","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":3},{"inc":"good"}]},
    {"id":"deduct","label":"ให้เบิก แล้วหักจากค่าแรงทีละน้อย","text":"ตกลงกันชัดเจน ทั้งสองฝ่ายสบายใจ","effects":[{"money":-2,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"refuse","label":"ปฏิเสธ กลัวเป็นธรรมเนียม","text":"คนงานเดินกลับไปเงียบๆ","effects":[{"stat":"bond","d":-2}],"roll":[
      {"p":0.3,"text":"หน้าเกี่ยวปีนั้นเขาไปทำงานให้บ้านอื่น ต้องจ้างคนใหม่แพงกว่าเดิม","effects":[{"money":-6,"unit":"wageDay"}]}]}]},
  {"id":"wl-inherit","title":"ใครจะดูแลกิจการต่อ","body":"พ่อแม่เรียกลูกทุกคนมากินข้าว แล้วถามว่าใครจะรับช่วงที่ดินและกิจการของครอบครัว พี่น้องบางคนเริ่มนับว่าใครได้เท่าไหร่","w":6,"cooldown":"once","when":{"age":[35,65],"wealth":"rich","flag":{"hasSiblings":true,"parentsAlive":true}},"choices":[
    {"id":"take","label":"รับดูแลเอง แบ่งรายได้ให้พี่น้องทุกปี","text":"งานหนักขึ้นมาก แต่พ่อแม่วางใจ พี่น้องได้ส่วนแบ่งทุกปี","effects":[{"flag":"wl-heir"},{"money":30,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"happy","d":-2}]},
    {"id":"equal","label":"ขอให้แบ่งเท่ากันทุกคน","text":"ทุกคนพยักหน้า แม้จะมีคนแอบไม่พอใจ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1}]},
    {"id":"cash","label":"ขอส่วนของตัวเองเป็นเงินไปลงทุนเอง","text":"ได้เงินก้อน แต่พี่น้องมองว่าทิ้งครอบครัว","effects":[{"money":80,"unit":"wageDay"},{"stat":"bond","d":-4},{"flag":"wl-cashedOut"}]},
    {"id":"parents","label":"ให้พ่อแม่ตัดสินเอง","text":"พ่อแม่ขอเวลาคิด","effects":[{"stat":"bond","d":1}],"roll":[
      {"p":0.4,"text":"พ่อแม่ยกกิจการให้พี่น้องอีกคน บ้านเงียบไปหลายเดือนเพราะมีคนไม่พอใจ","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":-2,"by":"attach"}]}]}]},
  {"id":"wl-village-status","title":"คนมีหน้ามีตาในหมู่บ้าน","body":"งานบุญ งานศพ หรือสร้างถนนในหมู่บ้าน ชาวบ้านมักมาขอให้ช่วยออกเงินและนั่งหัวโต๊ะ","w":7,"cooldown":12,"when":{"age":[30,75],"loc":"isan","any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"all","label":"ช่วยทุกงานที่มาขอ","text":"ใครก็ทักทายด้วยความเคารพ แต่เงินออกทุกเดือน","effects":[{"money":-30,"unit":"wageDay"},{"stat":"bond","d":4},{"stat":"happy","d":1}]},
    {"id":"public","label":"ช่วยเฉพาะงานส่วนรวม เช่น ถนนและโรงเรียน","text":"ถนนเข้าหมู่บ้านลาดยางเสร็จ เด็กๆ ได้ห้องสมุดใหม่","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":2},{"inc":"good"}]},
    {"id":"together","label":"ออกเงินบางส่วน ให้ทุกบ้านลงแรงด้วย","text":"งานช้ากว่าแต่ทุกคนรู้สึกเป็นเจ้าของ","effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":1},{"trait":"social","d":1}]},
    {"id":"decline","label":"บอกปัดบ้าง","text":"เงินอยู่ครบ แต่มีคนพูดว่าลืมกำพืด","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":1}]}]},
  {"id":"wl-scam","title":"ชวนลงทุนผลตอบแทนสูง","body":"คนรู้จักในเมืองชวนลงทุนธุรกิจที่จ่ายผลตอบแทนทุกเดือนสูงเกินจริง บอกว่าคนมีเงินในจังหวัดลงกันหมดแล้ว","w":6,"cooldown":15,"when":{"age":[30,70],"year":[1995,2026],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"big","label":"ลงก้อนใหญ่","text":"โอนเงินไปพร้อมรอยยิ้มของคนชวน","effects":[{"money":-120,"unit":"wageDay"}],"roll":[
      {"p":0.25,"text":"ได้ผลตอบแทนจริงช่วงแรก แล้วถอนออกมาทันพร้อมกำไร","effects":[{"money":160,"unit":"wageDay"},{"stat":"happy","d":3}]},
      {"p":0.75,"text":"ไม่กี่เดือนต่อมาบริษัทปิดหนี คนชวนติดต่อไม่ได้","effects":[{"stat":"happy","d":-8,"by":"attach"},{"flag":"wl-scammed"}]}]},
    {"id":"small","label":"ลองลงนิดหน่อย","text":"ลงพอให้คนชวนไม่เสียหน้า","effects":[{"money":-25,"unit":"wageDay"}],"roll":[
      {"p":0.2,"text":"ได้คืนพร้อมกำไรเล็กน้อย","effects":[{"money":35,"unit":"wageDay"}]},
      {"p":0.8,"text":"เงินก้อนนั้นหายไปพร้อมบริษัท","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"check","label":"ให้ทนายตรวจเอกสารก่อน","text":"ทนายบอกว่าเข้าข่ายแชร์ลูกโซ่ ถอยออกมาได้ทัน","effects":[{"money":-2,"unit":"wageDay"},{"stat":"know","d":2}]},
    {"id":"no","label":"ปฏิเสธ","text":"คนชวนไม่พอใจ ไม่ค่อยทักทายกันอีก","effects":[{"stat":"bond","d":-1}]}]},
  {"id":"wl-casino","title":"ทริปคาสิโนชายแดน","body":"เพื่อนนักธุรกิจชวนข้ามไปเที่ยวคาสิโนฝั่งชายแดน บอกว่าไปกินข้าวดูโชว์ เล่นนิดหน่อยพอสนุก","w":5,"cooldown":12,"when":{"age":[25,65],"year":[2000,2026],"loc":"isan","any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"heavy","label":"ไปแล้วเล่นเต็มที่","text":"โต๊ะไพ่ไม่มีนาฬิกา รู้ตัวอีกทีฟ้าก็สาง","effects":[{"inc":"vice"}],"roll":[
      {"p":0.3,"text":"โชคเข้าข้าง ได้เงินกลับมาก้อนหนึ่ง","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":3}]},
      {"p":0.7,"text":"เสียไปมากกว่าที่ตั้งใจหลายเท่า","effects":[{"money":-90,"unit":"wageDay"},{"stat":"happy","d":-5}]}]},
    {"id":"limit","label":"ไปกินข้าว ตั้งวงเงินไว้ไม่เกิน","text":"เสียไปพอประมาณ ได้คุยงานกับเพื่อนหลายคน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":2}]},
    {"id":"no","label":"ไม่ไป","text":"เพื่อนว่าไม่เข้าสังคม แต่เงินยังอยู่","effects":[{"stat":"bond","d":-1}]}]},
  {"id":"wl-rival","title":"คู่แข่งมาเปิดใกล้","body":"นักธุรกิจจากจังหวัดอื่นเปิดกิจการแบบเดียวกันห่างไปไม่กี่ร้อยเมตร ตัดราคาจนลูกค้าเริ่มหาย","w":6,"cooldown":15,"when":{"counter":{"biz":[2,6]},"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"price","label":"ลดราคาสู้","text":"กำไรหายไปหลายเดือน","effects":[{"money":-40,"unit":"wageDay"}],"roll":[
      {"p":0.5,"text":"คู่แข่งทนไม่ไหว ปิดร้านไปเอง","effects":[{"stat":"happy","d":3}]},
      {"p":0.5,"text":"คู่แข่งทุนหนากว่า ลูกค้าย้ายไปเรื่อยๆ","effects":[{"inc":"biz","d":-1},{"stat":"happy","d":-3}]}]},
    {"id":"service","label":"ปรับบริการให้ดีกว่า","text":"ฝึกลูกน้องใหม่ ส่งของถึงบ้าน ลูกค้าประจำยังอยู่","effects":[{"money":-20,"unit":"wageDay"},{"stat":"know","d":2}],"roll":[
      {"p":0.6,"text":"ลูกค้าเก่ากลับมา พร้อมพาลูกค้าใหม่มาด้วย","effects":[{"stat":"happy","d":2}]}]},
    {"id":"deal","label":"คุยกันแบ่งตลาด","text":"นั่งกินข้าวด้วยกันแล้วตกลงว่าจะไม่ตัดราคากัน","effects":[{"stat":"happy","d":1}],"roll":[
      {"p":0.3,"text":"ไม่กี่เดือนอีกฝ่ายผิดคำพูด แอบดึงลูกค้ารายใหญ่ไป","effects":[{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-2}]}]},
    {"id":"ignore","label":"ปล่อยไป ทำแบบเดิม","text":"ไม่ทำอะไรเพิ่ม","effects":[],"roll":[
      {"p":0.5,"text":"ยอดขายลดลงจนต้องลดคนงาน","effects":[{"inc":"biz","d":-1},{"stat":"happy","d":-2}]}]}]},
  {"id":"wl-overspend","title":"บิลบัตรเครดิต","body":"สิ้นเดือนบิลบัตรเครดิตหลายใบมาพร้อมกัน ร้านอาหาร ของแต่งบ้าน และนาฬิกาเรือนใหม่ ยอดรวมสูงกว่าที่คิด","w":6,"cooldown":12,"when":{"age":[22,60],"year":[1995,2026],"flag":{"spendLevel":"comfort"},"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"pay","label":"จ่ายเต็มแล้วลดการใช้","text":"เงินก้อนหายไป ต่อจากนี้ใช้จ่ายระวังขึ้น","effects":[{"money":-40,"unit":"wageDay"},{"flag":"spendLevel","v":false},{"stat":"happy","d":-2}]},
    {"id":"min","label":"จ่ายขั้นต่ำไปก่อน","text":"เดือนนี้ผ่านไปได้ แต่ดอกเบี้ยเดินทุกวัน","effects":[{"money":-10,"unit":"wageDay"},{"cond":"indebted","turns":4}]},
    {"id":"sell","label":"ขายของที่ไม่ได้ใช้มาจ่าย","text":"ขายนาฬิกากับของสะสมไปบางส่วน ได้ราคาไม่ดีนัก","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-1}]}]},
  {"id":"wl-wedding","title":"งานเลี้ยงฉลองสมรส","body":"ผู้ใหญ่ทั้งสองฝ่ายอยากจัดงานเลี้ยงฉลองที่โรงแรมในตัวจังหวัด เชิญแขกหลายร้อยคน","w":10,"cooldown":"once","when":{"marriedYears":[0,1],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"choices":[
    {"id":"big","label":"จัดใหญ่ตามที่ผู้ใหญ่ต้องการ","text":"แขกเต็มห้องจัดเลี้ยง ผู้ใหญ่ทั้งสองฝ่ายยิ้มไม่หุบ","effects":[{"money":-120,"unit":"wageDay"},{"stat":"bond","d":4},{"stat":"happy","d":3}],"roll":[
      {"p":0.6,"text":"ซองช่วยงานรวมแล้วได้คืนเกือบครึ่ง","effects":[{"money":60,"unit":"wageDay"}]}]},
    {"id":"small","label":"จัดพอดี เชิญเฉพาะคนสนิท","text":"งานอบอุ่น แต่ญาติบางคนน้อยใจที่ไม่ได้รับเชิญ","effects":[{"money":-40,"unit":"wageDay"},{"stat":"happy","d":2},{"stat":"bond","d":-1}]},
    {"id":"skip","label":"ไม่จัด เก็บเงินไว้เป็นทุน","text":"ทั้งคู่ได้เงินก้อนตั้งตัว แต่ผู้ใหญ่ผิดหวังไม่น้อย","effects":[{"stat":"happy","d":1},{"stat":"bond","d":-3}]}]}
]);
Object.assign(KI.data.conditions, {
  "wl-rent": {"name":"ค่าเช่าห้องแถว","icon":"🏬","perTurn":[{"money":7,"unit":"wageDay"}]}
});
(function () {
  const parents = {"wealth":["poor","mid"]};
  const notRich = {"any":[{"flag":{"status":"poor"}},{"flag":{"status":"mid"}},{"noFlag":["status"],"wealth":["poor","mid"]}]};
  const gate = {
    "wr-middle-east-1982":parents,
    "fam-parents-to-bangkok":parents,
    "real-dad-dry-season":parents,
    "money-send-home":parents,
    "exp-send-home":parents,
    "remit-home":parents,
    "real-app-remit":parents,
    "lend-parent":parents,
    "exp-sib-tuition":parents,
    "fam-sibling-wedding":parents,
    "money-house-build":parents,
    "biz-parents-house":parents,
    "real-lamp-homework":parents,
    "tech-own-tv":parents,
    "life2-house-crowded":parents,
    "real-first-motorbike":{...parents,...notRich},
    "wr-taiwan-1993":notRich,
    "wr-300baht-2013":notRich,
    "wr-kyos-1996":notRich,
    "sea-town-work":notRich,
    "sea-idle":notRich,
    "exp-orphan-quit":notRich,
    "money-tuition":notRich,
    "money-medical-old":notRich,
    "sea-fix-roof":notRich
  };
  for (const list of [KI.data.decisions, KI.data.personalEvents]) for (const item of list) {
    const extra = gate[item.id];
    if (!extra) continue;
    const when = { ...(item.when || {}) };
    if (extra.wealth && !when.wealth) when.wealth = extra.wealth;
    if (extra.any) when.any = when.any ? extra.any.map((sub) => ({ ...sub, any: when.any })) : extra.any;
    item.when = when;
  }
})();
