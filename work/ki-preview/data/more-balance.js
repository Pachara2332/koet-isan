globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.unshift(...[
  {"id":"debt-collector","title":"เจ้าหนี้มาทวงถึงบ้าน","body":"หนี้พอกจนเกินกำลัง เจ้าหนี้ขับรถมาจอดหน้าบ้าน บอกว่ารอต่อไปไม่ได้แล้ว","when":{"any":[{"flag":{"debtHeavy":true}},{"flag":{"sharkLate":true}}],"age":[18,90]},"cooldown":6,"major":true,"urgent":true,
   "choices":[
    {"id":"sell","label":"ขายของมีค่าที่เหลือทั้งหมด","text":"ทองและที่นาที่เก็บไว้ถูกขายไปใช้หนี้ หนี้ลดลงมาก แต่ไม่เหลืออะไรไว้พึ่งยามลำบาก","when":{"any":[{"flag":{"money-land":true}},{"flag":{"money-gold":true}}]},
     "effects":[{"money":180,"unit":"wageDay"},{"flag":"money-land","v":false},{"flag":"money-gold","v":false},{"stat":"happy","d":-6,"by":"attach"},{"pin":"ขายทรัพย์สินใช้หนี้"}]},
    {"id":"family","label":"ขอให้ญาติช่วยรวมเงินปลดหนี้บางส่วน","text":"ญาติพี่น้องช่วยกันคนละไม้คนละมือ หนี้ก้อนใหญ่เบาลง แต่ทุกงานบุญต่อจากนี้รู้สึกติดค้างเขาอยู่","when":{"any":[{"flag":{"parentsAlive":true}},{"flag":{"hasSiblings":true}}]},
     "effects":[{"money":100,"unit":"wageDay"},{"stat":"bond","d":-8},{"stat":"happy","d":-4,"by":"attach"}]},
    {"id":"abroad-saudi","label":"กู้ค่านายหน้าไปทำงานก่อสร้างซาอุฯ","text":"กู้ค่านายหน้าเพื่อไปทำงานตามสัญญาที่ซาอุดีอาระเบีย ต้องอยู่ไกลบ้านหลายปี","when":{"age":[20,50],"year":[1976,1989]},
     "effects":[{"move":{"kind":"abroad","country":"ซาอุดีอาระเบีย","method":"ผ่านนายหน้าตามสัญญา"}},{"role":"abroad"},{"cond":"homesick","turns":6,"by":"attach"},{"stat":"happy","d":-4},{"pin":"ไปทำงานซาอุฯ ใช้หนี้"}]},
    {"id":"abroad","label":"กู้ค่านายหน้าไปทำงานไต้หวัน","text":"กู้ค่านายหน้าเพื่อไปทำงานตามสัญญาที่ไต้หวัน ต้องอยู่ไกลบ้านหลายปี","when":{"age":[20,50],"year":[1990,2100]},
     "effects":[{"move":{"kind":"abroad","country":"ไต้หวัน","method":"ผ่านนายหน้าตามสัญญา"}},{"role":"abroad"},{"cond":"homesick","turns":6,"by":"attach"},{"stat":"happy","d":-4},{"pin":"ไปทำงานไต้หวันใช้หนี้"}]},
    {"id":"abroad-illegal","label":"ไปเกาหลีใต้แบบผีน้อยเพื่อใช้หนี้","text":"เดินทางแบบนักท่องเที่ยวแล้วอยู่ทำงานโดยไม่มีใบอนุญาต ต้องใช้ชีวิตหลบการตรวจ","when":{"age":[20,50],"year":[2004,2100]},
     "effects":[{"move":{"kind":"abroad","country":"เกาหลีใต้","method":"เข้าแบบนักท่องเที่ยวแล้วอยู่ทำงาน"}},{"role":"abroad"},{"flag":"career-phinoi"},{"cond":"homesick","turns":6,"by":"attach"},{"stat":"happy","d":-5},{"pin":"ไปเกาหลีแบบผีน้อยเพื่อใช้หนี้"}]},
    {"id":"negotiate","label":"ขอเจรจาผ่อนจ่าย","text":"นั่งคุยกับเจ้าหนี้นานหลายชั่วโมง",
     "effects":[{"stat":"happy","d":-2}],
     "roll":[{"p":0.5,"text":"เจ้าหนี้ยอมตัดดอกเบี้ยค้างให้บางส่วน แลกกับการผ่อนทุกเดือนห้ามขาด","effects":[{"money":60,"unit":"wageDay"}]},{"p":0.5,"text":"เจ้าหนี้ไม่ยอม ขู่ว่าจะยึดของถ้าครั้งหน้ายังไม่มีจ่าย","effects":[{"stat":"happy","d":-4},{"stat":"health","d":-2}]}]},
    {"id":"rob","label":"ปล้นเอาเงินไปใช้หนี้","text":"ความจนตรอกผลักให้คุณข่มขู่ชิงเงินคนอื่น","effects":[{"inc":"crime"},{"stat":"bond","d":-6}],
     "roll":[{"p":0.4,"text":"ได้เงินมาใช้หนี้ แต่ความหวาดกลัวและความรู้สึกผิดติดอยู่ในใจ","effects":[{"money":120,"unit":"wageDay"},{"cond":"crime-guilt","turns":6},{"pin":"ปล้นเงินมาใช้หนี้"}]},{"p":0.6,"text":"มีคนแจ้งตำรวจ คุณตกเป็นผู้ต้องหาคดีปล้นทรัพย์","effects":[{"flag":"crime-wanted","v":"major"},{"stat":"happy","d":-8},{"pin":"ถูกแจ้งความคดีปล้น"}]}]},
    {"id":"steal","label":"ลักทรัพย์คนอื่นไปขาย","text":"คุณตัดสินใจเอาทรัพย์สินคนอื่นไปแลกเงิน","effects":[{"inc":"crime"},{"stat":"bond","d":-4}],
     "roll":[{"p":0.55,"text":"ขายของได้เงินมา แต่เจ้าของเดือดร้อนและคุณรู้สึกผิด","effects":[{"money":45,"unit":"wageDay"},{"cond":"crime-guilt","turns":4},{"pin":"ลักทรัพย์มาใช้หนี้"}]},{"p":0.45,"text":"เจ้าของจำได้และแจ้งตำรวจ","effects":[{"flag":"crime-wanted","v":"minor"},{"stat":"happy","d":-6},{"pin":"ถูกแจ้งความคดีลักทรัพย์"}]}]},
    {"id":"temple","label":"ขโมยเงินบริจาคของวัด","text":"คุณเอาเงินบริจาคที่ชาวบ้านร่วมทำบุญไปใช้หนี้","effects":[{"inc":"crime"},{"stat":"bond","d":-8}],
     "roll":[{"p":0.5,"text":"ได้เงินมา แต่เงินที่ชาวบ้านตั้งใจช่วยวัดหายไป และความผิดติดอยู่ในใจ","effects":[{"money":60,"unit":"wageDay"},{"cond":"crime-guilt","turns":6},{"pin":"ขโมยเงินบริจาควัด"}]},{"p":0.5,"text":"คนในวัดพบเรื่องและแจ้งตำรวจ ชุมชนเสียความไว้วางใจ","effects":[{"flag":"crime-wanted","v":"minor"},{"stat":"happy","d":-8},{"pin":"ถูกแจ้งความขโมยเงินวัด"}]}]},
    {"id":"flee","label":"หนีหนี้ไปอยู่ที่อื่น","text":"เก็บของเท่าที่ถือไหวแล้วออกจากบ้านกลางดึก ไม่บอกใครว่าไปอยู่ที่ไหน",
     "effects":[{"move":{"kind":"bangkok"}},{"stat":"bond","d":-12},{"stat":"happy","d":-6},{"flag":"debtFled","v":true}],
     "roll":[{"p":0.12,"text":"คนของเจ้าหนี้ตามมาเจอในอีกไม่กี่เดือน","effects":[{"die":"debt-collector","p":0.35},{"stat":"health","d":-20}]},{"p":0.88,"text":"หนีพ้น แต่ไม่กล้ากลับบ้านไปหลายปี","effects":[{"cond":"homesick","turns":6,"by":"attach"}]}]}
   ]},
  {"id":"health-crisis","title":"สุขภาพทรุดหนัก","body":"ช่วงนี้ร่างกายไม่ไหว เดินไม่กี่ก้าวก็เหนื่อย กินอะไรไม่ลง คนในบ้านเริ่มเป็นห่วง","when":{"stat":{"health":[0,29]},"age":[15,100]},"cooldown":6,"major":true,"urgent":true,
   "choices":[
    {"id":"hospital-old","label":"ไปนอนโรงพยาบาลจังหวัด","text":"หมอให้นอนรักษาหลายวัน ค่ารักษาและค่าเดินทางหมดไปก้อนใหญ่ แต่อาการดีขึ้นชัด","when":{"year":[1970,2001]},
     "effects":[{"money":-45,"unit":"wageDay"},{"stat":"health","d":15},{"uncond":"sick"}]},
    {"id":"hospital","label":"ไปรักษาที่โรงพยาบาลด้วยสิทธิบัตรทอง","text":"ค่ารักษาส่วนใหญ่ใช้สิทธิได้ ที่จ่ายเองคือค่าเดินทาง ค่ากิน และรายได้ที่หายไปช่วงนอนโรงพยาบาล","when":{"year":[2002,2100]},
     "effects":[{"money":-12,"unit":"wageDay"},{"stat":"health","d":15},{"uncond":"sick"}]},
    {"id":"herbs","label":"ต้มยาสมุนไพรกินเองที่บ้าน","text":"ประหยัดเงินได้มาก อาการทุเลาลงบ้าง แต่ยังไม่หายดี",
     "effects":[{"money":-3,"unit":"wageDay"},{"stat":"health","d":6}]},
    {"id":"endure","label":"ฝืนทนไปก่อน ไม่อยากเสียเงิน","text":"ไม่ได้เสียเงิน แต่ร่างกายก็ไม่ได้พัก",
     "effects":[{"stat":"health","d":-3},{"stat":"happy","d":-2}]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"undocumented-wage","title":"ค่าแรงที่ทวงยาก","body":"นายจ้างค้างค่าแรงหลายสัปดาห์ คุณไม่มีใบอนุญาตทำงานและกลัวว่าถ้าร้องเรียนจะถูกส่งกลับ","w":12,"cooldown":9,"when":{"loc":"abroad","any":[{"flag":{"career-phinoi":true}},{"flag":{"wr-illegalKorea":true}}]},
   "choices":[
    {"id":"ask","label":"รวมตัวกับเพื่อนขอค่าแรง","text":"คุณและเพื่อนตัดสินใจทวงค่าแรงที่ค้าง","effects":[{"stat":"happy","d":-2}],"roll":[{"p":0.5,"text":"นายจ้างจ่ายเงินที่ค้างบางส่วน","effects":[{"money":12,"unit":"wageDay"}]},{"p":0.5,"text":"นายจ้างไล่ออกและไม่ยอมจ่าย คุณต้องหางานใหม่","effects":[{"stat":"happy","d":-5},{"stat":"bond","d":-2}]}]},
    {"id":"quiet","label":"ยอมเงียบเพราะกลัวถูกส่งกลับ","text":"คุณยังมีงานทำ แต่ต้องยอมเสียค่าแรงที่ควรได้","effects":[{"stat":"happy","d":-4}]}
   ]},
  {"id":"undocumented-life","title":"ชีวิตที่ต้องคอยหลบ","body":"มีข่าวตรวจแรงงานในละแวกที่พัก เพื่อนร่วมงานบางคนไม่กล้าออกจากห้อง คุณต้องตัดสินใจว่าจะอยู่ต่ออย่างไร","w":12,"cooldown":9,"when":{"loc":"abroad","any":[{"flag":{"career-phinoi":true}},{"flag":{"wr-illegalKorea":true}}]},
   "choices":[
    {"id":"hide","label":"หลบอยู่ในที่พักและหยุดงานชั่วคราว","text":"คุณลดความเสี่ยง แต่ขาดรายได้หลายวัน","effects":[{"money":-4,"unit":"wageDay"},{"stat":"happy","d":-3}]},
    {"id":"help","label":"ติดต่อองค์กรช่วยเหลือแรงงาน","text":"คุณขอคำปรึกษาเรื่องสิทธิและทางเลือกในการกลับบ้าน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":1}]}
   ]},
  {"id":"injury-moto-nohelmet","title":"ล้มรถ ศีรษะกระแทกพื้น","body":"ขี่มอเตอร์ไซค์ไม่ใส่หมวก รถเสียหลักตรงหลุมข้างทาง ศีรษะฟาดพื้นเต็มแรง","w":9,"cooldown":12,"heavy":true,"when":{"age":[16,80],"flag":{"noHelmet":true}},
   "choices":[
    {"id":"hospital","label":"ให้คนแถวนั้นพาส่งโรงพยาบาลทันที","text":"หมอเย็บแผลที่ศีรษะหลายเข็มและให้นอนดูอาการ","effects":[{"money":-6,"unit":"wageDay"},{"stat":"health","d":-10},{"pin":"บาดเจ็บที่ศีรษะจากอุบัติเหตุรถ"}],
     "roll":[{"p":0.05,"text":"สมองกระทบกระเทือนรุนแรง หมอช่วยไว้ไม่ได้","effects":[{"die":"road"}]}]},
    {"id":"home","label":"ลุกขึ้นได้ก็กลับบ้าน ไม่อยากเสียเงิน","text":"คืนนั้นปวดหัวหนักและอาเจียน ต้องนอนซมไปหลายวัน","effects":[{"stat":"health","d":-18},{"cond":"sick","turns":3}],
     "roll":[{"p":0.12,"text":"เลือดออกในสมองโดยไม่รู้ตัว กว่าจะถึงโรงพยาบาลก็สายเกินไป","effects":[{"die":"road"}]}]},
    {"id":"learn","label":"ไปหาหมอ แล้วตั้งใจว่าจะใส่หมวกทุกครั้ง","text":"แผลหายแล้ว หมวกใบใหม่วางอยู่ข้างรถทุกวัน","effects":[{"money":-6,"unit":"wageDay"},{"stat":"health","d":-10},{"flag":"noHelmet","v":false}]}
   ]},
  {"id":"injury-moto-helmet","title":"ล้มรถ แต่หมวกช่วยไว้","body":"ฝนตกถนนลื่น รถล้มไถลไปหลายเมตร หมวกกันน็อกแตกร้าวแต่ศีรษะไม่เป็นอะไร","w":3,"cooldown":18,"when":{"age":[16,75],"noFlag":["noHelmet"],"loc":"isan"},
   "effects":[{"stat":"health","d":-4},{"money":-2,"unit":"wageDay"},{"stat":"happy","d":1}]},
  {"id":"injury-work","title":"บาดเจ็บจากการทำงาน","body":"ทำงานรีบจนพลาด มือถูกเครื่องจักรหนีบ ต้องหยุดงานหลายสัปดาห์","w":7,"cooldown":15,"when":{"age":[16,65],"role":["factory","construction","mechanic"]},
   "choices":[
    {"id":"claim","label":"ยื่นเบิกประกันสังคมและกองทุนเงินทดแทน","text":"ได้ค่ารักษาและค่าจ้างบางส่วนระหว่างหยุดงาน","when":{"year":[1991,2100]},"effects":[{"stat":"health","d":-8},{"money":-3,"unit":"wageDay"}]},
    {"id":"self","label":"จ่ายค่ารักษาเอง แล้วรีบกลับไปทำงาน","text":"แผลหายช้าเพราะไม่ได้พัก","effects":[{"stat":"health","d":-12},{"money":-10,"unit":"wageDay"}]},
    {"id":"rest","label":"ลาพักจนหายดี ยอมขาดรายได้","text":"ร่างกายฟื้นดี แต่เงินเดือนนี้หายไปเกือบหมด","effects":[{"stat":"health","d":-5},{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-2}]}
   ]},
  {"id":"injury-farm","title":"เคียวบาดเท้ากลางนา","body":"ระหว่างเกี่ยวข้าว เคียวพลาดบาดเท้าเป็นแผลลึก เลือดออกไม่หยุด","w":6,"cooldown":15,"when":{"age":[12,75],"role":["farmer"],"season":2},
   "choices":[
    {"id":"clinic","label":"ไปอนามัยฉีดยากันบาดทะยัก","text":"แผลหายสะอาดภายในสองสัปดาห์","effects":[{"stat":"health","d":-3},{"money":-1,"unit":"wageDay"}]},
    {"id":"herb","label":"ใส่ยาสมุนไพรแล้วทำนาต่อ","text":"ประหยัดเงิน แต่แผลอักเสบบวมแดง","effects":[{"stat":"health","d":-8}],
     "roll":[{"p":0.04,"text":"แผลติดเชื้อบาดทะยัก รักษาไม่ทัน","effects":[{"die":"illness"}]}]}
   ]},
  {"id":"family-sibling-loss","title":"น้องจากไปตั้งแต่ยังเล็ก","body":"น้องในบ้านป่วยหนักแล้วจากไป หมอและโรงพยาบาลยังอยู่ไกลเกินกว่าจะพาไปทัน บ้านเงียบลงไปหลายเดือน","w":5,"heavy":true,"cooldown":"once","when":{"year":[1970,1995],"age":[3,14],"flag":{"youngSibling":true}},
   "effects":[{"cond":"grieving","turns":4,"by":"attach"},{"stat":"happy","d":-12,"by":"attach"},{"flag":"siblingLost","v":true}]},
  {"id":"debt-quarrel","title":"ทะเลาะกันเรื่องหนี้","body":"หนี้ที่พอกขึ้นทุกเดือนทำให้คุยกันไม่กี่คำก็มีเรื่อง คืนนี้คนรักถามตรงๆ ว่าจะเอายังไงต่อ","w":14,"cooldown":9,"when":{"flag":{"debtHeavy":true,"partner":true}},
   "choices":[
    {"id":"honest","label":"บอกยอดหนี้ทั้งหมดตามจริง แล้ววางแผนด้วยกัน","text":"บรรยากาศในบ้านตึงไปหลายวัน","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-2}],
     "roll":[{"p":0.2,"text":"สุดท้ายอีกฝ่ายบอกว่ารับไม่ไหวแล้ว ขอแยกทางกัน","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"heartbroken","turns":4,"by":"attach"}]}]},
    {"id":"blame","label":"โทษว่าอีกฝ่ายก็ใช้เงินเปลือง","text":"เสียงดังจนข้างบ้านได้ยิน","effects":[{"stat":"bond","d":-6},{"stat":"happy","d":-3}],
     "roll":[{"p":0.45,"text":"อีกฝ่ายเก็บของกลับบ้านพ่อแม่ และไม่กลับมาอีก","effects":[{"flag":"partner","v":false},{"flag":"married","v":false},{"cond":"heartbroken","turns":4,"by":"attach"}]}]}
   ]}
]);
