globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"money-baac-loan","title":"กู้ ธ.ก.ส. ลงทุนนา","body":"ปีนี้ปุ๋ยแพง เจ้าหน้าที่ ธ.ก.ส. มาประชุมที่ศาลากลางบ้าน ใครจะกู้ให้รวมกลุ่มค้ำกัน","when":{"role":"farmer","age":[20,60],"season":0,"noCond":["money-loanBaac"],"chance":0.25},"cooldown":15,"major":true,
   "choices":[
    {"id":"borrow","label":"กู้มาซื้อปุ๋ยกับเมล็ดพันธุ์","text":"ได้เงินก้อนมาลงนา ต้องผ่อนคืนทุกฤดูไปอีกหลายปี","effects":[{"money":60,"unit":"wageDay"},{"cond":"money-loanBaac","turns":9},{"flag":"money-baac"}],
     "roll":[{"p":0.6,"text":"ข้าวงามกว่าทุกปี","effects":[{"money":30,"unit":"wageDay"},{"stat":"happy","d":3}]},{"p":0.4,"text":"ฝนทิ้งช่วง ผลผลิตไม่คุ้มทุน","effects":[{"stat":"happy","d":-4}]}]},
    {"id":"no","label":"ทำเท่าที่มี ไม่กู้","text":"ไม่มีหนี้ แต่ใส่ปุ๋ยได้น้อย ข้าวออกพอกิน","effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":1}]}
   ]},
  {"id":"money-village-fund","title":"กองทุนหมู่บ้าน","body":"หมู่บ้านได้เงินกองทุนหนึ่งล้านบาท คณะกรรมการเปิดให้ยื่นกู้ไปลงทุน","when":{"year":[2001,2008],"age":[20,60],"loc":"isan","noCond":["money-loanFund"],"chance":0.3},"cooldown":"once","major":true,
   "choices":[
    {"id":"invest","label":"กู้ไปเลี้ยงวัวหรือเปิดร้านเล็กๆ","text":"เอาเงินไปลงทุน ต้องคืนให้ทันรอบปีเพื่อให้คนอื่นได้กู้ต่อ","effects":[{"money":40,"unit":"wageDay"},{"cond":"money-loanFund","turns":3},{"flag":"money-fund"}],
     "roll":[{"p":0.5,"text":"กิจการไปได้ มีรายได้เสริม","effects":[{"money":35,"unit":"wageDay"},{"stat":"happy","d":3}]},{"p":0.5,"text":"ขายได้น้อย ต้องควักเงินอื่นมาคืน","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"spend","label":"กู้มาใช้จ่ายในบ้านก่อน","text":"ได้ซื้อของที่ค้างไว้ แต่ไม่มีอะไรงอกเงยมาคืน","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":3},{"cond":"money-loanFund","turns":3},{"flag":"money-fund"}]},
    {"id":"skip","label":"ไม่กู้","text":"ปล่อยให้คนอื่นกู้ไป ชีวิตเป็นไปตามเดิม","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"money-bride-price","title":"คุยค่าสินสอด","body":"ผู้ใหญ่สองฝ่ายนั่งคุยเรื่องสินสอดทองหมั้น ตัวเลขที่พูดกันทำให้หลายคนเงียบ","when":{"flag":{"partner":true},"noFlag":["married","money-dowryDone"],"age":[20,40],"partnerYears":[1,10],"chance":0.3},"cooldown":"once","major":true,
   "choices":[
    {"id":"full","label":"จัดเต็มตามที่ผู้ใหญ่ขอ","text":"งานใหญ่ หน้าตาดีทั้งสองฝ่าย แต่เงินเก็บหายไปเกือบหมด","when":{"sex":"m"},"effects":[{"money":-250,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"happy","d":3},{"flag":"money-dowryDone"}]},
    {"id":"borrow","label":"กู้ญาติมาจัดงานให้สมเกียรติ","text":"งานผ่านไปด้วยดี แต่มีหนี้ญาติติดตัวไปอีกนาน","when":{"sex":"m"},"effects":[{"money":-50,"unit":"wageDay"},{"cond":"money-loanCoop","turns":9},{"stat":"bond","d":4},{"flag":"money-dowryDone"}]},
    {"id":"talk","label":"ต่อรองให้พอดีกับฐานะ","text":"ตกลงกันได้ แต่มีคนในหมู่บ้านพูดลับหลังอยู่พักหนึ่ง","effects":[{"money":-80,"unit":"wageDay"},{"stat":"happy","d":-2},{"flag":"money-dowryDone"}]},
    {"id":"give","label":"ให้สินสอดกลับไปตั้งตัวคู่ใหม่","text":"พ่อแม่ฝ่ายหญิงคืนเงินให้ลูกสองคนไว้ตั้งตัว","when":{"sex":"f"},"effects":[{"money":60,"unit":"wageDay"},{"stat":"bond","d":3},{"flag":"money-dowryDone"}]}
   ]},
  {"id":"money-shark-pressure","title":"คนทวงหนี้มาที่บ้าน","body":"คนของเจ้าหนี้นอกระบบมายืนรอหน้าบ้าน พูดเสียงดังให้เพื่อนบ้านได้ยิน","when":{"flag":{"money-loanShark":true},"money":[-999999999,3000],"chance":0.5},"cooldown":6,"major":true,
   "choices":[
    {"id":"pay","label":"ขายของในบ้านจ่ายไปก่อน","text":"เขากลับไป แต่ของที่ใช้ทุกวันหายไปหลายอย่าง","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":-5}]},
    {"id":"police","label":"ไปแจ้งตำรวจและขอไกล่เกลี่ยหนี้","text":"มีบันทึกไว้ เจ้าหนี้ยอมคุยเรื่องดอกเบี้ย แต่ต้องเดินเรื่องหลายรอบ","effects":[{"uncond":"money-loanShark"},{"flag":"money-loanShark","v":false},{"stat":"happy","d":-2},{"cond":"indebted","turns":6}]},
    {"id":"flee","label":"หนีไปทำงานกรุงเทพฯ","text":"ไปตั้งหลักไกลบ้าน แต่ครอบครัวยังต้องรับหน้าแทน","effects":[{"move":{"kind":"bangkok"}},{"role":"construction"},{"stat":"bond","d":-6},{"cond":"homesick","turns":4}]}
   ]},
  {"id":"money-abroad-debt","title":"ไปเมืองนอกใช้หนี้","body":"หนี้พอกจนรายได้ในบ้านไม่พอจ่าย นายหน้าบอกว่าไปทำงานต่างประเทศสองปีก็ปลดหนี้ได้","when":{"money":[-999999999,-1],"age":[22,45],"loc":"isan","year":[1985,2026],"chance":0.3},"cooldown":"once","major":true,
   "choices":[
    {"id":"go","label":"กู้ค่านายหน้าแล้วไป","text":"จากบ้านไปไกล ค่าแรงสูงกว่า แต่ต้องเริ่มจากหนี้ค่านายหน้าก่อน","effects":[{"money":-60,"unit":"wageDay"},{"move":{"kind":"abroad","country":"ไต้หวัน"}},{"role":"abroad"},{"cond":"homesick","turns":6},{"pin":"ไปทำงานต่างประเทศเพื่อใช้หนี้"}],
     "roll":[{"p":0.75,"text":"นายจ้างดี ส่งเงินกลับบ้านได้ทุกเดือน","effects":[{"stat":"happy","d":2}]},{"p":0.25,"text":"งานไม่ตรงที่ตกลงไว้ ต้องอดทนทำต่อ","effects":[{"stat":"happy","d":-6},{"stat":"health","d":-3}]}]},
    {"id":"stay","label":"อยู่บ้าน หางานเสริม","text":"ได้อยู่กับครอบครัว หนี้ลดช้าแต่ไม่ต้องเสี่ยง","effects":[{"stat":"health","d":-3},{"stat":"bond","d":2},{"money":10,"unit":"wageDay"}]}
   ]},
  {"id":"money-land-buy","title":"มีคนขายนาติดกัน","body":"เพื่อนบ้านจะขายนาแปลงติดกันเพราะลูกย้ายไปอยู่กรุงเทพฯ ราคาไม่ถูกแต่ก็ไม่แพง","when":{"age":[28,60],"loc":"isan","money":[30000,999999999],"chance":0.15},"cooldown":"once","major":true,
   "choices":[
    {"id":"buy","label":"ซื้อเก็บไว้","text":"มีที่นาเพิ่ม ความรู้สึกมั่นคงขึ้น แต่เงินเก็บหมดไปกับดิน","effects":[{"money":-400,"unit":"wageDay"},{"flag":"money-land"},{"stat":"happy","d":5},{"pin":"ซื้อที่นาของตัวเอง"}]},
    {"id":"no","label":"เก็บเงินสดไว้","text":"มีเงินไว้ใช้ยามจำเป็น แต่นาแปลงนั้นตกเป็นของคนอื่น","effects":[{"stat":"happy","d":-2}]}
   ]},
  {"id":"money-house-build","title":"สร้างบ้านที่หมู่บ้าน","body":"เงินที่ส่งกลับมาสะสมจนพอจะรื้อบ้านไม้หลังเก่า ปลูกบ้านปูนให้พ่อแม่","when":{"age":[25,55],"money":[60000,999999999],"noFlag":["money-house"],"chance":0.3},"cooldown":"once","major":true,
   "choices":[
    {"id":"big","label":"สร้างบ้านปูนสองชั้น","text":"บ้านใหญ่โตเป็นหน้าเป็นตา พ่อแม่ภูมิใจ เงินเก็บแทบไม่เหลือ","effects":[{"money":-1200,"unit":"wageDay"},{"flag":"money-house"},{"stat":"bond","d":8},{"cond":"proud","turns":4},{"pin":"สร้างบ้านหลังใหม่ให้พ่อแม่"}]},
    {"id":"fix","label":"ซ่อมต่อเติมบ้านเดิม","text":"บ้านน่าอยู่ขึ้น ยังมีเงินเหลือไว้ใช้","effects":[{"money":-300,"unit":"wageDay"},{"flag":"money-house"},{"stat":"bond","d":3}]},
    {"id":"wait","label":"เก็บเงินต่อไปก่อน","text":"พ่อแม่บอกว่าไม่เป็นไร แต่หลังคายังรั่วเหมือนเดิม","effects":[{"stat":"bond","d":-2}]}
   ]},
  {"id":"money-ordination-cost","title":"งานบวชน้องชาย","body":"น้องชายจะบวชทดแทนคุณพ่อแม่ ญาติถามว่าจะจัดงานแบบไหน","when":{"flag":{"hasSiblings":true},"age":[20,40],"noFlag":["money-ordainPaid"],"chance":0.15},"cooldown":"once","major":true,
   "choices":[
    {"id":"big","label":"ช่วยจัดงานใหญ่ มีหมอลำ","text":"คนทั้งหมู่บ้านมาร่วม บุญใหญ่ แต่ค่าใช้จ่ายก้อนโต","effects":[{"money":-120,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":4},{"flag":"money-ordainPaid"}]},
    {"id":"simple","label":"ช่วยงานเรียบง่าย","text":"ได้บุญเท่ากัน มีญาติบางคนบ่นว่าเงียบไปหน่อย","effects":[{"money":-30,"unit":"wageDay"},{"stat":"bond","d":2},{"flag":"money-ordainPaid"}]},
    {"id":"none","label":"บอกว่าช่วงนี้ไม่มีเงิน","text":"ไม่เสียเงิน แต่พ่อแม่ดูผิดหวัง","effects":[{"stat":"bond","d":-5},{"flag":"money-ordainPaid"}]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"money-coop-loan","title":"กู้สหกรณ์หรือญาติ","body":"ค่าใช้จ่ายมาพร้อมกันหลายทาง ญาติที่เป็นสมาชิกสหกรณ์บอกว่าช่วยกู้ให้ได้","w":14,"when":{"age":[20,60],"money":[-999999999,5000],"noCond":["money-loanCoop"]},"cooldown":12,
   "choices":[
    {"id":"coop","label":"กู้ผ่านสหกรณ์","text":"ดอกเบี้ยไม่สูง แต่ต้องผ่อนตรงเวลา และญาติเป็นคนค้ำ","effects":[{"money":50,"unit":"wageDay"},{"cond":"money-loanCoop","turns":9}]},
    {"id":"no","label":"รัดเข็มขัดเอา","text":"ไม่มีหนี้เพิ่ม แต่ต้องงดหลายอย่าง","effects":[{"stat":"happy","d":-3}]}
   ]},
  {"id":"money-loan-shark","title":"เงินด่วนนอกระบบ","body":"ใบปลิวเงินด่วนติดเสาไฟ โทรไปได้เงินวันนี้ ไม่ต้องมีคนค้ำ","w":6,"when":{"age":[18,60],"money":[-999999999,3000],"noFlag":["money-loanShark"]},"cooldown":12,
   "choices":[
    {"id":"take","label":"โทรไปกู้","text":"ได้เงินทันที แต่ดอกเบี้ยรายวันกินรายได้ไปเรื่อยๆ","effects":[{"money":40,"unit":"wageDay"},{"cond":"money-loanShark","turns":9},{"flag":"money-loanShark"}]},
    {"id":"no","label":"ไม่เอา ไปยืมพ่อแม่แทน","text":"ได้เงินก้อนเล็ก แต่ต้องฟังพ่อแม่บ่นยาว","when":{"age":[18,40]},"effects":[{"money":15,"unit":"wageDay"},{"stat":"bond","d":-2},{"flag":"money-owesParents"}]},
    {"id":"tough","label":"อดทนไปก่อน","text":"ลำบากหน่อยแต่ไม่มีหนี้เพิ่ม","effects":[{"stat":"happy","d":-3},{"stat":"health","d":-1}]}
   ]},
  {"id":"money-parents-loan","title":"ยืมเงินพ่อแม่","body":"พ่อแม่รู้ว่าช่วงนี้ขัดสน แม่แอบยื่นเงินที่เก็บไว้จากขายข้าวให้","w":14,"when":{"age":[18,40],"money":[-999999999,0],"noFlag":["money-owesParents"]},"cooldown":12,
   "choices":[
    {"id":"take","label":"รับไว้ก่อน","text":"ผ่านช่วงนี้ไปได้ แต่รู้ว่าเงินนั้นคือเงินเก็บของพ่อแม่","effects":[{"money":25,"unit":"wageDay"},{"flag":"money-owesParents"},{"stat":"happy","d":-1}]},
    {"id":"refuse","label":"ปฏิเสธ บอกว่าจัดการเองได้","text":"แม่ไม่สบายใจ แต่ก็ภูมิใจที่ลูกพยายาม","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-2}]}
   ]},
  {"id":"money-repay-parents","title":"คืนเงินพ่อแม่","body":"ช่วงนี้พอมีเงิน นึกถึงเงินที่เคยยืมพ่อแม่มา","w":14,"when":{"flag":{"money-owesParents":true},"money":[5000,999999999]},"cooldown":6,
   "choices":[
    {"id":"repay","label":"เอาไปคืนพร้อมของฝาก","text":"พ่อแม่ยิ้ม ไม่ได้ทวงแต่ก็ดีใจ","effects":[{"money":-30,"unit":"wageDay"},{"flag":"money-owesParents","v":false},{"stat":"bond","d":5}]},
    {"id":"later","label":"ไว้ก่อน พ่อแม่ไม่ได้ทวง","text":"เงินอยู่ในมือต่อ แต่ค้างใจอยู่ลึกๆ","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"money-sell-gold","title":"ขายทองใช้หนี้","body":"เงินติดลบหลายเดือน สร้อยทองที่เก็บไว้ในตู้คือของมีค่าชิ้นเดียวที่เหลือ","w":8,"when":{"flag":{"money-gold":true},"money":[-999999999,-1]},"cooldown":6,
   "choices":[
    {"id":"sell","label":"เอาไปขายร้านทอง","text":"หนี้เบาลง แต่หลักประกันชิ้นสุดท้ายหายไป","effects":[{"money":90,"unit":"wageDay"},{"flag":"money-gold","v":false},{"stat":"happy","d":-2}]},
    {"id":"pawn","label":"จำนำไว้ก่อน หวังไถ่คืน","text":"ได้เงินน้อยกว่าขาย แต่ยังมีโอกาสได้ทองคืน","effects":[{"money":60,"unit":"wageDay"},{"cond":"indebted","turns":4}]}
   ]},
  {"id":"money-sell-land","title":"ขายนาใช้หนี้","body":"นายหน้ามาถามซื้อที่นา หนี้ที่มีอยู่ทำให้ข้อเสนอฟังดูน่าคิด","w":8,"when":{"flag":{"money-land":true},"money":[-999999999,-1]},"cooldown":"once",
   "choices":[
    {"id":"sell","label":"ขาย","text":"หนี้หมด มีเงินเหลือ แต่ไม่มีนาให้ลูกหลานแล้ว","effects":[{"money":450,"unit":"wageDay"},{"flag":"money-land","v":false},{"stat":"happy","d":-6},{"stat":"bond","d":-3},{"pin":"ขายที่นาใช้หนี้"}]},
    {"id":"keep","label":"ไม่ขาย ทนผ่อนต่อ","text":"ที่ดินยังอยู่ แต่ดอกเบี้ยยังเดิน","effects":[{"cond":"indebted","turns":6},{"stat":"happy","d":-2}]}
   ]},
  {"id":"money-sell-bike","title":"ขายรถมอเตอร์ไซค์","body":"รถคันที่ใช้ทุกวันคือของที่ขายได้เร็วที่สุด","w":14,"when":{"flag":{"money-bike":true},"money":[-999999999,-1]},"cooldown":"once",
   "choices":[
    {"id":"sell","label":"ขายรถ","text":"ได้เงินมาโปะหนี้ ต่อไปต้องขอติดรถคนอื่น","effects":[{"money":80,"unit":"wageDay"},{"flag":"money-bike","v":false},{"stat":"happy","d":-3}]},
    {"id":"keep","label":"เก็บไว้ทำมาหากิน","text":"ยังเดินทางไปทำงานได้ แต่หนี้ยังค้าง","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"money-extra-work","title":"รับงานเสริม","body":"เงินติดลบ มีคนชวนไปรับจ้างตอนเย็นและวันหยุด","w":14,"when":{"age":[16,60],"money":[-999999999,-1]},"cooldown":6,
   "choices":[
    {"id":"work","label":"รับทุกงานที่มี","text":"หนี้ลด แต่ร่างกายล้าจนไม่มีเวลาให้คนที่บ้าน","effects":[{"money":30,"unit":"wageDay"},{"stat":"health","d":-4},{"stat":"bond","d":-2}]},
    {"id":"some","label":"รับแค่พอไหว","text":"เงินเพิ่มนิดหน่อย ยังพอพักได้","effects":[{"money":12,"unit":"wageDay"},{"stat":"health","d":-1}]},
    {"id":"no","label":"ไม่รับ","text":"ได้พัก แต่หนี้ยังคาอยู่","effects":[{"stat":"happy","d":-2}]}
   ]},
  {"id":"money-ask-family","title":"ขอให้ญาติช่วย","body":"ลูกพี่ลูกน้องที่ทำงานต่างประเทศส่งข่าวมาว่าถ้าลำบากให้บอก","w":7,"when":{"age":[18,60],"money":[-999999999,-1]},"cooldown":12,
   "choices":[
    {"id":"ask","label":"ขอยืม","text":"ได้เงินมาประคอง แต่ทุกงานบุญจะรู้สึกติดค้าง","effects":[{"money":40,"unit":"wageDay"},{"cond":"money-loanCoop","turns":6},{"stat":"happy","d":-1}]},
    {"id":"no","label":"ไม่อยากรบกวน","text":"ศักดิ์ศรีอยู่ครบ หนี้ก็อยู่ครบเหมือนกัน","effects":[{"stat":"happy","d":-2}]}
   ]},
  {"id":"money-debt-clinic","title":"คลินิกแก้หนี้","body":"อำเภอจัดงานไกล่เกลี่ยหนี้ ให้ลูกหนี้กับเจ้าหนี้มานั่งคุยกัน","w":14,"when":{"year":[2004,2026],"money":[-999999999,-1],"any":[{"cond":["money-loanBaac","money-loanFund","money-loanShark","money-loanCoop","indebted"]}]},"cooldown":12,
   "choices":[
    {"id":"go","label":"ไปลงทะเบียน","text":"ได้ยืดเวลาผ่อน ยอดต่อตาเบาลง แต่ต้องผ่อนนานขึ้น","effects":[{"uncond":"money-loanShark"},{"uncond":"money-loanBaac"},{"cond":"indebted","turns":9},{"stat":"happy","d":2}]},
    {"id":"no","label":"อายเกินกว่าจะไป","text":"ไม่มีใครรู้เรื่องหนี้ แต่ก็ไม่มีอะไรดีขึ้น","effects":[{"stat":"happy","d":-2}]}
   ]},
  {"id":"money-motorcycle","title":"ซื้อรถมอเตอร์ไซค์","body":"ร้านในตัวอำเภอมีรถรุ่นใหม่ ดาวน์ต่ำ ผ่อนได้","w":7,"when":{"age":[17,50],"year":[1985,2026],"noFlag":["money-bike"]},"cooldown":12,
   "choices":[
    {"id":"cash","label":"จ่ายสด","text":"ได้รถไม่มีหนี้ แต่เงินเก็บหายไปก้อนใหญ่","when":{"money":[20000,999999999]},"effects":[{"money":-180,"unit":"wageDay"},{"flag":"money-bike"},{"stat":"happy","d":5}]},
    {"id":"installment","label":"ดาวน์แล้วผ่อน","text":"ได้รถทันที แต่ต้องผ่อนทุกตาอีกหลายปี","effects":[{"money":-20,"unit":"wageDay"},{"cond":"money-installment","turns":9},{"flag":"money-bike"},{"stat":"happy","d":4}]},
    {"id":"no","label":"ปั่นจักรยานต่อไป","text":"ประหยัด แต่ไปไหนมาไหนลำบาก","effects":[{"stat":"health","d":1},{"stat":"happy","d":-1}]}
   ]},
  {"id":"money-bike-stolen","title":"รถหาย","body":"จอดรถไว้หน้างานวัด กลับมาอีกทีไม่เห็นรถแล้ว","w":3,"when":{"flag":{"money-bike":true}},"cooldown":"once",
   "effects":[{"flag":"money-bike","v":false},{"stat":"happy","d":-6},{"money":-5,"unit":"wageDay"}]},
  {"id":"money-phone","title":"ซื้อมือถือ","body":"คนในหมู่บ้านเริ่มมีมือถือกัน โทรหาลูกหลานที่กรุงเทพฯ ได้ทุกเมื่อ","w":6,"when":{"year":[2000,2011],"age":[15,60],"noFlag":["money-phone"]},"cooldown":9,
   "choices":[
    {"id":"buy","label":"ซื้อเครื่องใหม่","text":"ติดต่อคนไกลได้ง่ายขึ้น แต่มีค่าโทรทุกเดือน","effects":[{"money":-50,"unit":"wageDay"},{"flag":"money-phone"},{"stat":"bond","d":3}]},
    {"id":"used","label":"ซื้อเครื่องมือสอง","text":"ประหยัดกว่า แบตหมดไวไปหน่อย","effects":[{"money":-20,"unit":"wageDay"},{"flag":"money-phone"},{"stat":"bond","d":2}]},
    {"id":"no","label":"ยังไม่จำเป็น","text":"เก็บเงินไว้ แต่ต้องไปโทรตู้สาธารณะเหมือนเดิม","effects":[{"stat":"bond","d":-1}]}
   ]},
  {"id":"money-smartphone","title":"สมาร์ตโฟนเครื่องแรก","body":"ใครๆ ก็ใช้จอสัมผัส ดูคลิป โอนเงิน คุยวิดีโอคอลได้","w":6,"when":{"year":[2012,2026],"age":[13,65],"noFlag":["money-smartphone"]},"cooldown":9,
   "choices":[
    {"id":"cash","label":"ซื้อเงินสด","text":"ได้เครื่องดี เงินเก็บลดไปพอสมควร","effects":[{"money":-40,"unit":"wageDay"},{"flag":"money-smartphone"},{"stat":"happy","d":3},{"stat":"know","d":2}]},
    {"id":"install","label":"ผ่อนรุ่นท็อป","text":"ได้เครื่องที่อยากได้ แต่ผ่อนนานกว่าที่คิด","effects":[{"money":-5,"unit":"wageDay"},{"cond":"money-installment","turns":6},{"flag":"money-smartphone"},{"stat":"happy","d":4}]},
    {"id":"no","label":"ใช้เครื่องเดิม","text":"ประหยัด แต่ตามข่าวในกลุ่มไม่ทัน","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"money-buy-gold","title":"ซื้อทองเก็บ","body":"ราคาทองวันนี้ลงนิดหน่อย แม่บอกว่าทองเป็นเงินเก็บที่ไม่หายไปไหน","w":5,"when":{"age":[20,65],"money":[15000,999999999],"noFlag":["money-gold"]},"cooldown":12,
   "choices":[
    {"id":"buy","label":"ซื้อสร้อยสองสลึง","text":"มีของมีค่าเก็บไว้ ยามลำบากขายได้","effects":[{"money":-80,"unit":"wageDay"},{"flag":"money-gold"},{"stat":"happy","d":2}]},
    {"id":"no","label":"เก็บเงินสดดีกว่า","text":"เงินอยู่ในมือ ใช้ได้ทันทีเมื่อจำเป็น","effects":[]}
   ]},
  {"id":"money-send-home","title":"ส่งเงินให้พ่อแม่","body":"สิ้นเดือนนี้ได้เงินมา แม่โทรมาบอกว่าหลังคารั่วอีกแล้ว","w":8,"when":{"age":[18,50],"loc":["bangkok","abroad"]},"cooldown":6,
   "choices":[
    {"id":"lot","label":"ส่งเกือบหมด","text":"ทางบ้านสบายขึ้น ตัวเองกินมาม่าไปจนสิ้นเดือน","effects":[{"money":-40,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"health","d":-1}]},
    {"id":"some","label":"ส่งพอประมาณ","text":"ช่วยทางบ้านได้บ้าง ยังเหลือไว้ใช้เอง","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"none","label":"เดือนนี้ขอเก็บไว้ก่อน","text":"มีเงินเก็บ แต่วางสายแล้วรู้สึกผิด","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":-1}]}
   ]},
  {"id":"money-tuition","title":"ค่าเทอมของน้องหรือลูก","body":"ใกล้เปิดเทอม ค่าเทอม ค่าชุด ค่ารถ รวมกันเป็นก้อน","w":7,"when":{"age":[22,55],"any":[{"flag":{"hasSiblings":true}},{"childAge":[7,22]}]},"cooldown":9,
   "choices":[
    {"id":"pay","label":"จ่ายให้เต็มที่ เรียนที่ดีๆ","text":"เด็กได้เรียนที่ดี เงินเก็บลดลงมาก","effects":[{"money":-60,"unit":"wageDay"},{"stat":"bond","d":4},{"stat":"happy","d":2}]},
    {"id":"loan","label":"ให้กู้ กยศ.","text":"ภาระในบ้านเบาลง แต่เด็กจะมีหนี้ติดตัวตอนเรียนจบ","when":{"year":[1996,2026]},"effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"near","label":"เรียนใกล้บ้านประหยัดก่อน","text":"ใช้เงินไม่มาก เด็กดูผิดหวังนิดหน่อย","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":-1}]}
   ]},
  {"id":"money-funeral","title":"งานศพญาติ","body":"ญาติผู้ใหญ่เสีย งานจัดหลายคืน มีค่าโลง ค่าอาหาร ค่าหมอลำ","w":4,"heavy":true,"when":{"age":[18,70]},"cooldown":15,
   "choices":[
    {"id":"big","label":"ลงขันก้อนใหญ่","text":"งานสมเกียรติ ญาติชื่นชม แต่เงินเก็บหายไปมาก","effects":[{"money":-50,"unit":"wageDay"},{"stat":"bond","d":5},{"cond":"grieving","turns":2,"by":"attach"}]},
    {"id":"help","label":"ช่วยแรงมากกว่าช่วยเงิน","text":"อยู่ช่วยงานทุกคืน ร่างกายล้าแต่เงินไม่หมด","effects":[{"money":-10,"unit":"wageDay"},{"stat":"health","d":-2},{"stat":"bond","d":3},{"cond":"grieving","turns":2,"by":"attach"}]}
   ]},
  {"id":"money-lottery","title":"หวยงวดนี้","body":"คนในหมู่บ้านคุยเลขเด็ดจากต้นไม้แปลกที่วัด","w":7,"when":{"age":[18,75],"noFlag":["money-lottoHabit"]},"cooldown":9,
   "choices":[
    {"id":"habit","label":"ซื้อทุกงวดจะได้ไม่พลาด","text":"มีความหวังทุกวันที่ 1 และ 16","effects":[{"flag":"money-lottoHabit"},{"money":-3,"unit":"wageDay"},{"stat":"happy","d":2}]},
    {"id":"once","label":"ซื้อเล่นงวดเดียว","text":"ลุ้นสนุกๆ","effects":[{"money":-2,"unit":"wageDay"}],
     "roll":[{"p":0.05,"text":"ถูกเลขท้าย ได้เงินก้อนเล็ก","effects":[{"money":20,"unit":"wageDay"},{"stat":"happy","d":4}]}]},
    {"id":"no","label":"ไม่ซื้อ","text":"เงินอยู่ครบ","effects":[]}
   ]},
  {"id":"money-lottery-draw","title":"ประกาศผลหวย","body":"นั่งฟังผลหวยหน้าทีวีกับกระดาษเลขที่ซื้อไว้","w":10,"when":{"flag":{"money-lottoHabit":true}},"cooldown":2,
   "effects":[{"money":-6,"unit":"wageDay"}],
   "choices":[
    {"id":"keep","label":"งวดหน้าซื้อต่อ","text":"ยังไม่ถูก แต่งวดหน้าอาจเป็นคราวเรา","effects":[{"money":-6,"unit":"wageDay"}],
     "roll":[{"p":0.04,"text":"ถูกรางวัลเลขท้ายสามตัว เลี้ยงข้าวทั้งบ้าน","effects":[{"money":120,"unit":"wageDay"},{"stat":"happy","d":8}]},{"p":0.96,"text":"ไม่ถูกอีกตามเคย","effects":[{"stat":"happy","d":-1}]}]},
    {"id":"quit","label":"เลิกซื้อ","text":"หยุดได้ เงินเหลือมากขึ้น แต่ยังแอบเปิดฟังผลอยู่","effects":[{"flag":"money-lottoHabit","v":false}]}
   ]},
  {"id":"money-chit-fund","title":"ชวนเล่นแชร์","body":"เพื่อนที่ตลาดตั้งวงแชร์ เดือนละครั้ง ใครเปียได้ก่อนได้เงินก้อน","w":5,"when":{"age":[20,60],"noFlag":["money-share"]},"cooldown":15,
   "choices":[
    {"id":"join","label":"เข้าวง","text":"ส่งเงินทุกงวด หวังได้เงินก้อนตอนจำเป็น","effects":[{"flag":"money-share"},{"money":-10,"unit":"wageDay"}],
     "roll":[{"p":0.6,"text":"เปียได้ในงวดที่ต้องใช้เงินพอดี","effects":[{"money":50,"unit":"wageDay"},{"stat":"happy","d":3}]},{"p":0.4,"text":"ท้าวแชร์หายไปพร้อมเงินทั้งวง","effects":[{"money":-40,"unit":"wageDay"},{"stat":"happy","d":-6},{"trait":"social","d":-2}]}]},
    {"id":"no","label":"ปฏิเสธ","text":"ไม่เสี่ยง แต่เพื่อนบางคนดูไม่พอใจ","effects":[{"stat":"bond","d":-1}]}
   ]},
  {"id":"money-savings","title":"เปิดบัญชีเงินฝาก","body":"ธนาคารมาออกหน่วยที่โรงเรียนและตลาด ชวนเปิดบัญชีออมทุกเดือน","w":5,"when":{"age":[12,60],"money":[1000,999999999],"noFlag":["money-saver"]},"cooldown":15,
   "choices":[
    {"id":"save","label":"ฝากทุกเดือน","text":"เงินงอกเงยช้าๆ แต่ต้องอดใจไม่ซื้อของ","effects":[{"flag":"money-saver"},{"money":-10,"unit":"wageDay"},{"trait":"grit","d":2}],
     "roll":[{"p":1,"text":"ผ่านไปหลายเดือน ยอดในสมุดเพิ่มขึ้นทีละนิด","effects":[{"money":13,"unit":"wageDay"}]}]},
    {"id":"no","label":"เก็บไว้ใช้เอง","text":"คล่องตัว แต่เงินหมดไวไม่รู้ตัว","effects":[{"stat":"happy","d":1}]}
   ]},
  {"id":"money-crop-price","title":"ราคาข้าวปีนี้","body":"โรงสีประกาศราคารับซื้อ คนทั้งหมู่บ้านลุ้นกันว่าจะขายตอนนี้หรือเก็บไว้","w":12,"when":{"role":"farmer","season":2},"cooldown":3,
   "choices":[
    {"id":"sell","label":"ขายทันที","text":"ได้เงินแน่นอน ราคาจะขึ้นหรือลงก็เรื่องของมัน","effects":[{"money":10,"unit":"wageDay"}],
     "roll":[{"p":0.4,"text":"ปีนี้ราคาดี","effects":[{"money":20,"unit":"wageDay"},{"stat":"happy","d":3}]},{"p":0.3,"text":"ราคาตกต่ำ ขายแทบไม่คุ้มทุน","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-3}]}]},
    {"id":"hold","label":"เก็บใส่ยุ้งรอราคา","text":"เสี่ยงกว่า ต้องหาเงินอื่นใช้ไปก่อน","effects":[{"money":-5,"unit":"wageDay"}],
     "roll":[{"p":0.5,"text":"ราคาขึ้น ขายได้กำไร","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":4}]},{"p":0.5,"text":"ราคาลง ข้าวบางส่วนมอดกิน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-4}]}]}
   ]},
  {"id":"money-medical-old","title":"ค่ารักษาพยาบาล","body":"คนในบ้านป่วยหนักต้องนอนโรงพยาบาลจังหวัด ยังไม่มีบัตรอะไรช่วยจ่าย","w":7,"when":{"year":[1975,2001],"age":[15,70]},"cooldown":15,
   "choices":[
    {"id":"hospital","label":"รักษาเต็มที่","text":"คนป่วยหายดี แต่ค่าโรงพยาบาลเป็นก้อนโต","effects":[{"money":-100,"unit":"wageDay"},{"stat":"bond","d":4}]},
    {"id":"herb","label":"กลับมารักษาที่บ้านด้วยยาสมุนไพร","text":"ประหยัด แต่หายช้าและทุกคนกังวล","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-5},{"stat":"health","d":-2}]}
   ]},
  {"id":"money-medical-30","title":"ป่วยแต่มีบัตรทอง","body":"คนในบ้านต้องนอนโรงพยาบาล บัตรทองช่วยค่ารักษาหลัก เหลือค่ากินค่าเดินทาง","w":4,"when":{"year":[2002,2026],"age":[15,70]},"cooldown":15,
   "choices":[
    {"id":"public","label":"รักษาตามสิทธิ์ที่โรงพยาบาลรัฐ","text":"เสียเงินไม่มาก แต่ต้องรอคิวนาน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-2}]},
    {"id":"private","label":"ไปโรงพยาบาลเอกชน","text":"ได้ห้องสบาย หมอดูแลไว แต่ค่าใช้จ่ายสูง","effects":[{"money":-90,"unit":"wageDay"},{"stat":"bond","d":3}]}
   ]},
  {"id":"money-relative-trouble","title":"ญาติเดือดร้อน","body":"น้าโทรมาตอนดึก บอกว่าโดนโกงค่านายหน้าไปทำงานต่างประเทศ ขอยืมเงินด่วน","w":5,"when":{"age":[22,60],"money":[5000,999999999]},"cooldown":15,
   "choices":[
    {"id":"lend","label":"ให้ยืม","text":"ญาติผ่านช่วงยากไปได้ ส่วนจะได้คืนเมื่อไหร่ไม่มีใครรู้","effects":[{"money":-50,"unit":"wageDay"},{"stat":"bond","d":5}],
     "roll":[{"p":0.4,"text":"ปีต่อมาน้าเอาเงินมาคืนครบ","effects":[{"money":50,"unit":"wageDay"}]}]},
    {"id":"small","label":"ช่วยเท่าที่ไหว ไม่หวังคืน","text":"เสียไม่มาก ญาติเข้าใจ","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"no","label":"บอกว่าไม่มี","text":"เงินอยู่ครบ แต่งานบุญครั้งหน้าคงเจอหน้ากันยาก","effects":[{"stat":"bond","d":-4}]}
   ]},
  {"id":"money-installment-late","title":"ผ่อนไม่ทัน","body":"ไฟแนนซ์โทรมาเตือนว่าค้างค่างวดสองเดือนแล้ว จะมายึดรถ","w":14,"when":{"cond":["money-installment"],"money":[-999999999,2000]},"cooldown":6,
   "choices":[
    {"id":"borrow","label":"ยืมเพื่อนมาจ่ายงวด","text":"รักษารถไว้ได้ แต่ย้ายหนี้ไปอยู่กับเพื่อน","effects":[{"money":20,"unit":"wageDay"},{"stat":"happy","d":-2}]},
    {"id":"seize","label":"ปล่อยให้ยึด","text":"ไม่ต้องผ่อนต่อ แต่เงินดาวน์กับงวดที่จ่ายไปหายหมด","effects":[{"uncond":"money-installment"},{"flag":"money-bike","v":false},{"stat":"happy","d":-5}]}
   ]}
]);
Object.assign(KI.data.conditions, {
  "money-loanBaac":{"name":"ผ่อน ธ.ก.ส.","icon":"🌾","perTurn":[{"money":-8,"unit":"wageDay"}]},
  "money-loanFund":{"name":"หนี้กองทุนหมู่บ้าน","icon":"🏘️","perTurn":[{"money":-15,"unit":"wageDay"}]},
  "money-loanCoop":{"name":"หนี้ญาติ/สหกรณ์","icon":"🤝","perTurn":[{"money":-6,"unit":"wageDay"}]},
  "money-loanShark":{"name":"หนี้นอกระบบ","icon":"💸","perTurn":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-2}]},
  "money-installment":{"name":"ผ่อนรายงวด","icon":"🧾","perTurn":[{"money":-8,"unit":"wageDay"}]}
});
