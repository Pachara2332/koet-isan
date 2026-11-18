globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.unshift(...[
{"id":"wr-middle-east-1982","title":"พ่อจะไปตะวันออกกลาง","body":"ผู้ชายในหมู่บ้านหลายคนไปทำงานก่อสร้างที่ตะวันออกกลาง พ่อบอกว่าจะขายวัวจ่ายนายหน้าแล้วไปบ้าง","when":{"year":[1982,1982],"age":[8,12],"loc":"isan"},"cooldown":"once","major":true,
 "choices":[
  {"id":"support","label":"บอกพ่อว่าไปเถอะ","text":"พ่อขึ้นเครื่องบินครั้งแรกในชีวิต บ้านเงียบลงไปหลายปี","effects":[{"flag":"wr-fatherAbroad"},{"stat":"bond","d":-3},{"cond":"lonely","turns":4}],
   "roll":[{"p":0.7,"text":"พ่อส่งเงินกลับมาทุกเดือน ที่บ้านได้มุงหลังคาสังกะสีใหม่","effects":[{"money":15,"unit":"wageDay"}]},{"p":0.3,"text":"งานไม่ตรงกับที่นายหน้าสัญญา ที่บ้านติดหนี้ค่าหัว","effects":[{"stat":"happy","d":-4}]}]},
  {"id":"beg","label":"ร้องขอให้พ่ออยู่บ้าน","text":"พ่อใจอ่อน อยู่ทำนาต่อ บ้านยังลำบากแต่อยู่พร้อมหน้า","effects":[{"stat":"bond","d":4},{"stat":"happy","d":1}]}]},
{"id":"wr-saudi-visa-1990","title":"พ่อถูกส่งกลับจากซาอุฯ","body":"หลังคดีเพชรซาอุฯ วีซ่าแรงงานไทยไม่ได้ต่อ พ่อกลับบ้านมาพร้อมเงินเก็บก้อนสุดท้าย","when":{"year":[1990,1990],"season":[1,2],"flag":{"wr-fatherAbroad":true}},"cooldown":"once",
 "choices":[
  {"id":"study","label":"ขอเงินก้อนนี้ไปเรียนต่อ","text":"พ่อยอมให้ทุนเรียน แม้ต้องเลื่อนการซ่อมบ้าน","effects":[{"stat":"know","d":3},{"stat":"bond","d":2},{"flag":"wr-fatherFundedStudy"}]},
  {"id":"land","label":"ให้พ่อซื้อที่นาเพิ่ม","text":"ครอบครัวมีที่ทำกินมากขึ้น งานที่บ้านก็มากขึ้นตาม","effects":[{"money":10,"unit":"wageDay"},{"stat":"happy","d":-1}]}]},
{"id":"wr-taiwan-1993","title":"ไต้หวันเปิดรับแรงงาน","body":"นายหน้าชวนไปทำโรงงานที่ไต้หวัน คนในหมู่บ้านเริ่มไปกันเป็นกลุ่ม ค่าหัวไม่ถูก","when":{"year":[1993,1996],"season":0,"age":[21,38],"loc":"isan","role":["farmer","jobless","construction"],"noFlag":["wr-taiwan"],"chance":0.25},"cooldown":"once","major":true,
 "choices":[
  {"id":"go","label":"กู้ ธ.ก.ส. ไปไต้หวัน","text":"เอาโฉนดค้ำกู้ไปจ่ายนายหน้า","effects":[{"money":-50,"unit":"wageDay"},{"cond":"indebted","turns":9},{"flag":"wr-taiwan"},{"move":{"kind":"abroad","country":"ไต้หวัน"}},{"role":"abroad"},{"pin":"ไปทำงานไต้หวัน"}]},
  {"id":"no","label":"ไม่เอาที่นาไปเสี่ยง","text":"เก็บที่นาไว้ ทำมาหากินแถวบ้านต่อ","effects":[{"stat":"happy","d":-1},{"stat":"bond","d":2}]}]},
{"id":"wr-friendship-bridge-1994","title":"สะพานมิตรภาพเปิด","body":"สะพานไทย-ลาวแห่งแรกเปิดที่หนองคาย คนลาวข้ามมาซื้อของ ตลาดริมโขงคึกคักขึ้น","when":{"year":[1994,1994],"season":[0,1],"province":"nong-khai","age":[18,55]},"cooldown":"once",
 "choices":[
  {"id":"trade","label":"ลงทุนเปิดแผงค้าชายแดน","text":"เอาเงินเก็บไปลงของขายคนลาว","effects":[{"money":-25,"unit":"wageDay"},{"role":"trader"},{"flag":"wr-borderTrade"}],
   "roll":[{"p":0.6,"text":"ขายดี ลูกค้าประจำมาจากเวียงจันทน์","effects":[{"money":40,"unit":"wageDay"},{"stat":"happy","d":4}]},{"p":0.4,"text":"แผงเยอะเกิน ทุนคืนช้า","effects":[{"stat":"happy","d":-3}]}]},
  {"id":"no","label":"ทำงานเดิมต่อ","text":"ดูความคึกคักอยู่ห่างๆ ไม่เสี่ยงทุน","effects":[{"stat":"happy","d":1}]}]},
{"id":"wr-pakmun-1994","title":"เขื่อนปากมูลกับปลาที่หายไป","body":"เขื่อนปากมูลสร้างเสร็จ ชาวประมงริมมูลจับปลาได้น้อยลง ชาวบ้านชวนไปร่วมเรียกร้องค่าชดเชย","when":{"year":[1994,1994],"season":2,"province":"ubon-ratchathani","age":[18,65],"role":["farmer","jobless"]},"cooldown":"once",
 "choices":[
  {"id":"join","label":"ร่วมเรียกร้องกับเพื่อนบ้าน","text":"ไปร่วมชุมนุม เสียเวลาทำกินหลายวัน","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":4},{"trait":"social","d":2},{"flag":"wr-pakmunProtest"}]},
  {"id":"leave","label":"เลิกหาปลา ไปหางานในเมือง","text":"ตัดใจจากแม่น้ำ ไปรับจ้างก่อสร้าง","effects":[{"move":{"kind":"bangkok"}},{"role":"construction"},{"stat":"happy","d":-4},{"cond":"homesick","turns":4}]},
  {"id":"wait","label":"รอดูไปก่อน","text":"ทำนาเพิ่มแทนรายได้จากปลา","effects":[{"stat":"happy","d":-2}]}]},
{"id":"wr-pakmun-pay-1995","title":"ได้ค่าชดเชยปากมูล","body":"รัฐบาลตกลงจ่ายค่าชดเชยชาวประมงปากมูล คนที่ร่วมเรียกร้องได้ส่วนแบ่ง","when":{"year":[1995,1995],"season":0,"flag":{"wr-pakmunProtest":true}},"cooldown":"once",
 "choices":[
  {"id":"boat","label":"ซื้อเรือซื้ออวนใหม่","text":"ลงทุนหาปลาต่อ หวังน้ำจะดีขึ้น","effects":[{"money":15,"unit":"wageDay"},{"stat":"happy","d":3}]},
  {"id":"school","label":"เก็บไว้ส่งลูกเรียน","text":"เงินก้อนนี้กลายเป็นทุนการศึกษา","effects":[{"money":30,"unit":"wageDay"},{"stat":"bond","d":3}]}]},
{"id":"wr-kyos-1996","title":"กองทุนกู้ยืมเพื่อการศึกษาเริ่มปล่อยกู้","body":"ครูแนะแนวบอกว่าปีนี้มีเงินกู้เรียนต่อ เรียนจบแล้วค่อยผ่อนคืน","when":{"year":[1996,1996],"age":[17,18],"loc":"isan","edu":{"in":["school"]}},"cooldown":"once",
 "choices":[
  {"id":"loan","label":"กู้ไปเรียนมหาวิทยาลัย","text":"เซ็นสัญญากู้ เตรียมสอบเข้า","effects":[{"flag":"wr-studentLoan"},{"stat":"know","d":3},{"stat":"happy","d":3}]},
  {"id":"work","label":"ไม่อยากเป็นหนี้ ออกไปทำงาน","text":"ช่วยที่บ้านหาเงินก่อน","effects":[{"money":10,"unit":"wageDay"},{"stat":"happy","d":-2}]}]},
{"id":"wr-tomyum-1997","title":"วิกฤตต้มยำกุ้ง","body":"ค่าเงินบาทลอยตัว บริษัทปิดตัวกันเป็นแถว หัวหน้าเรียกไปบอกว่าเดือนหน้าอาจไม่มีงาน","when":{"year":[1997,1997],"season":2,"loc":"bangkok","role":["factory","construction","office","driver"],"age":[17,55]},"cooldown":"once","major":true,
 "choices":[
  {"id":"home","label":"กลับไปทำนาที่บ้าน","text":"เก็บข้าวของขึ้นรถทัวร์กลับอีสาน ที่นายังเลี้ยงปากท้องได้","effects":[{"move":"home"},{"role":"farmer"},{"flag":"wr-lostJob"},{"stat":"bond","d":4},{"stat":"happy","d":-5,"by":"-grit"},{"pin":"ตกงานยุคต้มยำกุ้ง กลับบ้าน"}]},
  {"id":"stay","label":"อยู่ต่อ ยอมลดเงินเดือน","text":"ทนทำงานชั่วโมงมากขึ้นแลกกับเงินที่น้อยลง","effects":[{"money":-15,"unit":"wageDay"},{"stat":"health","d":-3},{"stat":"happy","d":-3}],
   "roll":[{"p":0.5,"text":"บริษัทรอดมาได้ งานยังอยู่","effects":[{"trait":"grit","d":2}]},{"p":0.5,"text":"สุดท้ายบริษัทก็ปิด ต้องตกงานอยู่ดี","effects":[{"role":"jobless"},{"flag":"wr-lostJob"},{"stat":"happy","d":-5}]}]},
  {"id":"stall","label":"เอาเงินชดเชยมาขายของ","text":"เปิดแผงขายส้มตำข้างทาง เริ่มจากศูนย์","effects":[{"role":"trader"},{"money":-10,"unit":"wageDay"},{"flag":"wr-lostJob"},{"trait":"grit","d":2}]}]},
{"id":"wr-tomyum-debt-1998","title":"หนี้บ้านช่วงวิกฤต","body":"ดอกเบี้ยพุ่ง บ้านที่ผ่อนในเมืองเริ่มผ่อนไม่ไหว","when":{"year":[1998,1998],"season":0,"loc":"bangkok","role":["office","civil","teacher"],"age":[25,50],"chance":0.4},"cooldown":"once",
 "choices":[
  {"id":"sell","label":"ขายบ้านขาดทุน","text":"ยอมเจ็บครั้งเดียว ไปเช่าห้องอยู่แทน","effects":[{"money":-30,"unit":"wageDay"},{"stat":"happy","d":-5}]},
  {"id":"hold","label":"กัดฟันผ่อนต่อ","text":"ตัดรายจ่ายทุกอย่างเพื่อรักษาบ้าน","effects":[{"cond":"indebted","turns":9},{"stat":"health","d":-2}]}]},
{"id":"wr-lostjob-1999","title":"ตั้งหลักหลังตกงาน","body":"กลับมาอยู่บ้านได้ปีกว่า เพื่อนเก่าโทรมาบอกว่าโรงงานในเมืองเริ่มรับคนอีกแล้ว","when":{"year":[1999,2000],"season":0,"flag":{"wr-lostJob":true},"loc":"isan"},"cooldown":"once",
 "choices":[
  {"id":"back","label":"กลับเข้าเมืองอีกรอบ","text":"เริ่มใหม่ที่โรงงานด้วยค่าแรงเริ่มต้น","effects":[{"move":{"kind":"bangkok"}},{"role":"factory"},{"stat":"bond","d":-3},{"cond":"homesick","turns":3}]},
  {"id":"stay","label":"ปักหลักบ้านเกิด","text":"ขยายนา เลี้ยงไก่ อยู่กับครอบครัว","effects":[{"stat":"bond","d":5},{"stat":"happy","d":2},{"money":-5,"unit":"wageDay"}]}]},
{"id":"wr-village-fund-2001","title":"กองทุนหมู่บ้านละล้าน","body":"หมู่บ้านได้เงินกองทุนก้อนใหญ่ เปิดให้ชาวบ้านกู้ดอกเบี้ยต่ำ","when":{"year":[2001,2001],"season":2,"loc":"isan","age":[20,60]},"cooldown":"once",
 "choices":[
  {"id":"invest","label":"กู้มาเลี้ยงวัว","text":"ซื้อลูกวัวมาสองตัว หวังขายได้กำไร","effects":[{"money":20,"unit":"wageDay"},{"flag":"wr-villageFund"},{"flag":"wr-fundInvest"}]},
  {"id":"spend","label":"กู้มาซื้อมอเตอร์ไซค์","text":"ได้รถใหม่ขี่ไปไร่สบายขึ้น แต่ต้องผ่อนคืน","effects":[{"stat":"happy","d":5},{"flag":"wr-villageFund"},{"flag":"wr-fundSpend"}]},
  {"id":"no","label":"ไม่กู้","text":"กลัวเป็นหนี้ ปล่อยให้คนอื่นกู้ไป","effects":[{"stat":"happy","d":-1}]}]},
{"id":"wr-village-fund-repay-2003","title":"ถึงเวลาคืนกองทุน","body":"กรรมการกองทุนหมู่บ้านมาทวงเงินกู้งวดสุดท้าย","when":{"year":[2003,2003],"season":2,"flag":{"wr-villageFund":true}},"cooldown":"once",
 "choices":[
  {"id":"pay","label":"ขายของที่ซื้อมาไปคืน","text":"คืนครบ ไม่มีใครค่อนขอดได้","effects":[{"money":-20,"unit":"wageDay"},{"stat":"bond","d":2}]},
  {"id":"loan","label":"กู้นอกระบบมาโปะ","text":"คืนกองทุนได้ แต่หนี้ย้ายไปอยู่กับเจ้าหนี้รายใหม่","effects":[{"cond":"indebted","turns":9},{"stat":"happy","d":-3}]}]},
{"id":"wr-30baht-2002","title":"บัตรทอง 30 บาท","body":"แม่ป่วยเรื้อรังมานาน ตอนนี้มีบัตรทองรักษาได้ในราคา 30 บาท แต่ต้องไปรอคิวโรงพยาบาลอำเภอตั้งแต่เช้ามืด","when":{"year":[2002,2002],"season":[0,1],"loc":"isan","age":[18,50],"chance":0.3},"cooldown":"once",
 "choices":[
  {"id":"go","label":"ลางานพาแม่ไปรักษา","text":"เสียค่าแรงหลายวันแต่แม่ได้ตรวจจริงจัง","effects":[{"money":-4,"unit":"wageDay"},{"stat":"bond","d":5}]},
  {"id":"herb","label":"รักษาสมุนไพรต่อ","text":"ไม่ต้องเสียงาน แต่แม่ยังทรงๆ ทรุดๆ","effects":[{"stat":"bond","d":-2},{"stat":"happy","d":-2}]}]},
{"id":"wr-birdflu-2004","title":"ไข้หวัดนกระบาด","body":"เจ้าหน้าที่ประกาศทำลายไก่ในรัศมีที่พบโรค ไก่ที่เลี้ยงไว้ขายก็อยู่ในเขต","when":{"year":[2004,2004],"season":0,"loc":"isan","role":["farmer","trader"],"age":[18,65]},"cooldown":"once",
 "choices":[
  {"id":"report","label":"ให้เจ้าหน้าที่ทำลาย รับค่าชดเชย","text":"เสียไก่ทั้งเล้า ได้ค่าชดเชยบางส่วน","effects":[{"money":-8,"unit":"wageDay"},{"stat":"happy","d":-4}]},
  {"id":"hide","label":"แอบขายไก่ออกไปก่อน","text":"ได้เงินคืนเร็ว แต่เพื่อนบ้านไม่พอใจ","effects":[{"money":5,"unit":"wageDay"},{"stat":"bond","d":-4}],
   "roll":[{"p":0.3,"text":"ป่วยเป็นไข้หลังจับไก่ที่ตาย","effects":[{"cond":"sick","turns":2},{"stat":"health","d":-8}]}]}]},
{"id":"wr-eps-korea-2004","title":"เกาหลีเปิดระบบ EPS","body":"เกาหลีใต้รับแรงงานผ่านรัฐ ต้องสอบภาษาเกาหลีก่อน ค่าใช้จ่ายถูกกว่านายหน้าเถื่อนมาก","when":{"year":[2004,2006],"season":2,"loc":"isan","age":[18,38],"noFlag":["wr-korea"],"chance":0.3},"cooldown":"once","major":true,
 "choices":[
  {"id":"study","label":"ตั้งใจเรียนภาษาเกาหลี","text":"ท่องศัพท์ทุกคืนหลังเลิกงาน แล้วไปสอบที่ขอนแก่น","effects":[{"money":-5,"unit":"wageDay"},{"stat":"know","d":2}],
   "roll":[{"p":0.5,"text":"สอบผ่าน ได้ไปโรงงานที่เกาหลี","effects":[{"flag":"wr-korea"},{"move":{"kind":"abroad","country":"เกาหลีใต้"}},{"role":"abroad"},{"cond":"homesick","turns":6},{"pin":"ไปทำงานเกาหลีถูกกฎหมาย"}]},{"p":0.5,"text":"สอบไม่ผ่านรอบนี้","effects":[{"stat":"happy","d":-4,"by":"-grit"}]}]},
  {"id":"illegal","label":"ไปแบบผีน้อย ไม่ต้องสอบ","text":"เข้าไปแบบนักท่องเที่ยวแล้วอยู่ต่อ ได้เงินเร็วแต่ต้องหลบตลอด","effects":[{"money":-20,"unit":"wageDay"},{"flag":"wr-korea"},{"flag":"wr-illegalKorea"},{"move":{"kind":"abroad","country":"เกาหลีใต้"}},{"role":"abroad"},{"cond":"homesick","turns":6}]},
  {"id":"no","label":"อยู่บ้าน","text":"ไม่ไกลบ้านขนาดนั้น","effects":[{"stat":"bond","d":2}]}]},
{"id":"wr-illegal-korea-caught","title":"ตรวจคนเข้าเมืองบุกโรงงาน","body":"เจ้าหน้าที่เกาหลีบุกตรวจโรงงานที่แอบทำงานอยู่","when":{"flag":{"wr-illegalKorea":true},"loc":"abroad","chance":0.15},"cooldown":"once","major":true,
 "choices":[
  {"id":"run","label":"วิ่งหนี","text":"หนีออกประตูหลัง ไปหาโรงงานใหม่","effects":[{"stat":"health","d":-3},{"stat":"happy","d":-4}],"roll":[{"p":0.5,"text":"รอดไปได้อีกรอบ","effects":[]},{"p":0.5,"text":"ถูกจับและส่งกลับ","effects":[{"move":"home"},{"role":"jobless"},{"flag":"wr-illegalKorea","v":false}]}]},
  {"id":"give","label":"ยอมมอบตัว","text":"ถูกส่งกลับบ้านพร้อมเงินที่เก็บได้","effects":[{"move":"home"},{"role":"farmer"},{"flag":"wr-illegalKorea","v":false},{"stat":"bond","d":3}]}]},
{"id":"wr-mukdahan-bridge-2006","title":"สะพานมิตรภาพแห่งที่ 2","body":"สะพานมุกดาหาร-สะหวันนะเขตเปิด รถบรรทุกข้ามไปถึงเวียดนามได้ ลานจอดรถขนส่งต้องการคนงาน","when":{"year":[2006,2007],"season":[0,2],"province":"mukdahan","age":[18,50]},"cooldown":"once",
 "choices":[
  {"id":"truck","label":"ไปเป็นคนขับรถขนส่งข้ามแดน","text":"ห่างบ้านทีละหลายวัน แต่รายได้ดีกว่าเดิม","effects":[{"role":"driver"},{"money":10,"unit":"wageDay"},{"stat":"bond","d":-2},{"flag":"wr-borderTrade"}]},
  {"id":"shop","label":"เปิดร้านข้าวใกล้ด่าน","text":"ลงทุนตั้งร้าน หวังลูกค้าคนขับรถ","effects":[{"role":"trader"},{"money":-20,"unit":"wageDay"},{"flag":"wr-borderTrade"}],"roll":[{"p":0.6,"text":"ร้านติดตลาด","effects":[{"money":35,"unit":"wageDay"}]},{"p":0.4,"text":"ทำเลไม่ดี ขาดทุน","effects":[{"stat":"happy","d":-4}]}]},
  {"id":"no","label":"ทำงานเดิม","text":"ไม่เปลี่ยนชีวิตเพราะสะพาน","effects":[]}]},
{"id":"wr-preah-vihear-2008","title":"ชายแดนพระวิหารตึงเครียด","body":"มีการปะทะใกล้ปราสาทพระวิหาร ทางอำเภอประกาศให้ชาวบ้านใกล้แนวชายแดนอพยพไปศูนย์พักพิง","heavy":true,"when":{"year":[2008,2008],"season":2,"province":"sisaket"},"cooldown":"once",
 "choices":[
  {"id":"go","label":"อพยพไปศูนย์พักพิงทันที","text":"ทิ้งนาที่กำลังจะเกี่ยว ไปนอนศูนย์พักพิงหลายคืน","effects":[{"money":-8,"unit":"wageDay"},{"stat":"happy","d":-4},{"flag":"wr-evacuated"}]},
  {"id":"stay","label":"อยู่เฝ้าบ้านเฝ้าข้าว","text":"เกี่ยวข้าวทันเวลา แต่นอนไม่หลับทุกคืน","effects":[{"stat":"health","d":-3},{"stat":"happy","d":-5,"by":"attach"}]}]},
{"id":"wr-border-2011","title":"ปะทะชายแดนรอบใหม่","body":"เสียงปืนดังจากแนวชายแดนอีกครั้ง โรงเรียนปิด ชาวบ้านถูกสั่งให้อพยพ","heavy":true,"when":{"year":[2011,2011],"season":0,"province":["sisaket","surin","buriram"]},"cooldown":"once",
 "choices":[
  {"id":"go","label":"พาครอบครัวไปศูนย์พักพิง","text":"ปลอดภัย แต่ต้องอยู่อย่างแออัดหลายวัน","effects":[{"stat":"happy","d":-4},{"stat":"bond","d":2},{"flag":"wr-evacuated"}]},
  {"id":"volunteer","label":"เป็นอาสาช่วยที่ศูนย์","text":"ทำครัวกลาง แจกของ ได้เห็นน้ำใจคนมากมาย","when":{"age":[16,70]},"effects":[{"stat":"health","d":-2},{"trait":"social","d":3},{"stat":"bond","d":4}]},
  {"id":"relative","label":"ไปอาศัยญาติในเมือง","text":"สบายกว่าศูนย์ แต่เกรงใจญาติ","effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":-2}]}]},
{"id":"wr-flood-2011","title":"มหาอุทกภัย 2554","body":"น้ำเริ่มท่วมนาและถนนในหมู่บ้าน ข้าวที่ปลูกไว้กำลังจมน้ำ","when":{"year":[2011,2011],"season":1,"province":["bueng-kan","nakhon-phanom","nong-khai","sakon-nakhon","udon-thani","khon-kaen"]},"cooldown":"once",
 "choices":[
  {"id":"save","label":"ขนข้าวของขึ้นที่สูง ช่วยเพื่อนบ้าน","text":"เหนื่อยแทบขาดใจ แต่ของสำคัญรอด","effects":[{"stat":"health","d":-3},{"stat":"bond","d":4},{"money":-5,"unit":"wageDay"}]},
  {"id":"replant","label":"รีบปลูกข้าวใหม่หลังน้ำลด","text":"ลงทุนซ้ำ หวังเก็บเกี่ยวทันปลายปี","when":{"role":"farmer"},"effects":[{"money":-12,"unit":"wageDay"}],"roll":[{"p":0.5,"text":"ข้าวรุ่นใหม่ให้ผลพอใช้","effects":[{"money":15,"unit":"wageDay"}]},{"p":0.5,"text":"น้ำมาอีกรอบ เสียทุนซ้ำ","effects":[{"stat":"happy","d":-6}]}]},
  {"id":"leave","label":"เข้าเมืองหางานรอน้ำลด","text":"ทิ้งนาไว้ ไปรับจ้างชั่วคราว","effects":[{"money":8,"unit":"wageDay"},{"stat":"bond","d":-2},{"move":{"kind":"bangkok"}},{"role":"construction"}]}]},
{"id":"wr-rice-pledge-2014","title":"เงินจำนำข้าวไม่มา","body":"เอาข้าวไปจำนำไว้หลายเดือนแล้ว แต่ยังไม่ได้เงิน ทั้งที่ค่าปุ๋ยค่าเช่านาถึงกำหนดจ่าย","when":{"year":[2014,2014],"season":0,"loc":"isan","role":"farmer","age":[20,70]},"cooldown":"once",
 "choices":[
  {"id":"loan","label":"กู้นอกระบบมาจ่ายก่อน","text":"ดอกโหด แต่ไม่เสียหน้าเจ้าของนา","effects":[{"cond":"indebted","turns":6},{"stat":"happy","d":-3}]},
  {"id":"join","label":"รวมกลุ่มเรียกร้องเงิน","text":"ไปยื่นหนังสือที่ศาลากลางกับเพื่อนชาวนา","effects":[{"money":-3,"unit":"wageDay"},{"stat":"bond","d":3},{"trait":"social","d":2}]},
  {"id":"work","label":"ไปรับจ้างในเมืองระหว่างรอ","text":"ได้เงินหมุนพอประทัง แต่บ้านขาดคน","effects":[{"money":10,"unit":"wageDay"},{"stat":"bond","d":-3},{"stat":"health","d":-2}]}]},
{"id":"wr-rubber-2013","title":"ราคายางตกต่ำ","body":"สวนยางที่เพิ่งเริ่มกรีดได้ ราคายางตกจนแทบไม่คุ้มค่ากรีด เพื่อนชาวสวนชวนไปประท้วง","when":{"year":[2013,2013],"season":1,"province":"bueng-kan","role":"farmer"},"cooldown":"once",
 "choices":[
  {"id":"cut","label":"โค่นยางปลูกมันสำปะหลังแทน","text":"เปลี่ยนพืช เสียเงินลงทุนเก่าไป","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-3},{"flag":"wr-cutRubber"}]},
  {"id":"keep","label":"กรีดต่อ รอราคาฟื้น","text":"รายได้หดลงหลายปี","effects":[{"money":-10,"unit":"wageDay"},{"trait":"grit","d":2}]},
  {"id":"protest","label":"ไปร่วมประท้วง","text":"ร่วมเรียกร้องราคากับเพื่อนชาวสวน","effects":[{"money":-3,"unit":"wageDay"},{"stat":"bond","d":3}]}]},
{"id":"wr-300baht-2013","title":"ค่าแรง 300 บาทถึงอีสาน","body":"ค่าแรงขั้นต่ำในจังหวัดขึ้นเป็น 300 บาท โรงงานใกล้บ้านประกาศรับคน","when":{"year":[2013,2013],"season":0,"loc":"isan","role":["farmer","jobless","construction"],"age":[18,40],"chance":0.5},"cooldown":"once",
 "choices":[
  {"id":"factory","label":"ไปทำโรงงานใกล้บ้าน","text":"ไม่ต้องไปกรุงเทพฯ ก็ได้ค่าแรงเท่ากัน","effects":[{"role":"factory"},{"stat":"bond","d":2},{"stat":"happy","d":2}]},
  {"id":"farm","label":"ทำนาต่อ","text":"อิสระกว่า แต่ค่าจ้างแรงงานช่วยดำนาก็แพงขึ้น","effects":[{"money":-4,"unit":"wageDay"}]}]},
{"id":"wr-sez-2015","title":"เขตเศรษฐกิจพิเศษชายแดน","body":"จังหวัดเป็นเขตเศรษฐกิจพิเศษ ราคาที่ดินริมถนนใหญ่ขยับขึ้น มีคนมาขอซื้อที่นาของครอบครัว","when":{"year":[2015,2015],"province":["mukdahan","nakhon-phanom","nong-khai"],"age":[25,70],"chance":0.4},"cooldown":"once",
 "choices":[
  {"id":"sell","label":"ขายที่ได้เงินก้อน","text":"ได้เงินก้อนใหญ่ แต่ที่นาของพ่อแม่ไม่อยู่แล้ว","effects":[{"money":80,"unit":"wageDay"},{"stat":"bond","d":-3},{"flag":"wr-soldLand"}]},
  {"id":"keep","label":"เก็บไว้ให้ลูกหลาน","text":"ไม่ขาย ทำกินต่อไป","effects":[{"stat":"bond","d":2}]},
  {"id":"rent","label":"แบ่งให้เช่าทำโกดัง","text":"ได้รายได้รายเดือน แต่สัญญาผูกยาว","effects":[{"money":20,"unit":"wageDay"},{"flag":"wr-borderTrade"}]}]},
{"id":"wr-sakon-flood-2017","title":"น้ำท่วมสกลนคร","body":"พายุเซินกาทำให้น้ำท่วมตัวเมืองสกลนคร บ้านชั้นล่างจมน้ำ","when":{"year":[2017,2017],"season":1,"province":"sakon-nakhon"},"cooldown":"once",
 "choices":[
  {"id":"boat","label":"เอาเรือออกไปช่วยเพื่อนบ้าน","text":"พายเรือส่งข้าวส่งน้ำทั้งวัน","effects":[{"stat":"health","d":-3},{"stat":"bond","d":5},{"die":"drown","p":0.005}]},
  {"id":"guard","label":"เฝ้าข้าวของในบ้าน","text":"ของเสียหายน้อยลง","effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":-3}]}]},
{"id":"wr-ubon-flood-2019","title":"น้ำท่วมอุบลฯ หนักในรอบ 17 ปี","body":"แม่น้ำมูลล้น น้ำเข้าบ้านเร็วกว่าที่คิด ต้องตัดสินใจว่าจะขนอะไรไปก่อน","when":{"year":[2019,2019],"season":1,"province":"ubon-ratchathani"},"cooldown":"once",
 "choices":[
  {"id":"evac","label":"ไปศูนย์อพยพเลย","text":"คนปลอดภัย แต่ของในบ้านเสียหายมาก","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-4}]},
  {"id":"stay","label":"อยู่ชั้นสองเฝ้าบ้าน","text":"ของรอด แต่ไฟดับน้ำประปาไม่ไหลหลายวัน","effects":[{"money":-5,"unit":"wageDay"},{"stat":"health","d":-4}]}]},
{"id":"wr-covid-2020","title":"โควิด-19 ปิดเมือง","body":"ร้านและโรงงานปิด นายจ้างให้หยุดงานไม่มีกำหนด รถทัวร์กลับอีสานเต็มทุกเที่ยว","when":{"year":[2020,2020],"season":0,"loc":["bangkok","abroad"],"role":["factory","construction","office","driver","trader","abroad"],"age":[17,60]},"cooldown":"once","major":true,
 "choices":[
  {"id":"home","label":"กลับบ้านเกิด","text":"กลับไปกักตัวที่บ้าน ช่วยพ่อแม่ทำนา","effects":[{"move":"home"},{"role":"farmer"},{"flag":"wr-covidHome"},{"stat":"bond","d":5},{"money":-5,"unit":"wageDay"},{"pin":"กลับบ้านช่วงโควิด"}]},
  {"id":"stay","label":"อยู่ห้องเช่ารอเปิดเมือง","text":"จ่ายค่าห้องต่อโดยไม่มีรายได้","effects":[{"money":-20,"unit":"wageDay"},{"cond":"lonely","turns":3},{"stat":"happy","d":-4}]},
  {"id":"rider","label":"ไปขับไรเดอร์ส่งอาหาร","text":"มีรายได้รายวัน แต่เสี่ยงทั้งโรคทั้งถนน","when":{"loc":"bangkok"},"effects":[{"role":"driver"},{"money":5,"unit":"wageDay"},{"stat":"health","d":-2},{"die":"road","p":0.005}]}]},
{"id":"wr-covid-school-2020","title":"เรียนออนไลน์","body":"โรงเรียนปิด ครูให้เรียนผ่านมือถือ แต่บ้านมีมือถือเครื่องเดียว สัญญาณก็ไม่ค่อยดี","when":{"year":[2020,2021],"season":1,"age":[8,17],"edu":{"in":["school"]},"loc":"isan"},"cooldown":"once",
 "choices":[
  {"id":"try","label":"ปีนขึ้นที่สูงหาสัญญาณมาเรียน","text":"เรียนทันเพื่อน แต่เหนื่อยและง่วงทุกวัน","effects":[{"stat":"know","d":3},{"stat":"health","d":-2}]},
  {"id":"help","label":"ช่วยงานบ้านงานนาแทน","text":"พ่อแม่สบายขึ้น แต่บทเรียนตามไม่ทัน","effects":[{"stat":"know","d":-4},{"stat":"bond","d":4}]},
  {"id":"friend","label":"ไปเรียนบ้านเพื่อนที่มีไวไฟ","text":"ได้เรียนกับเพื่อน แต่บางวันก็เล่นเกมกันแทน","effects":[{"stat":"know","d":1},{"stat":"happy","d":3}]}]},
{"id":"wr-covid-home-2021","title":"จะกลับเข้าเมืองไหม","body":"กลับมาอยู่บ้านเกือบปีแล้ว เพื่อนเก่าบอกว่างานในเมืองเริ่มกลับมา","when":{"year":[2021,2022],"season":2,"flag":{"wr-covidHome":true},"loc":"isan"},"cooldown":"once",
 "choices":[
  {"id":"back","label":"กลับเข้าเมือง","text":"รายได้ดีกว่า แต่ต้องห่างบ้านอีกครั้ง","effects":[{"move":{"kind":"bangkok"}},{"role":"factory"},{"stat":"bond","d":-3}]},
  {"id":"online","label":"ไลฟ์ขายของจากบ้าน","text":"ขายปลาแดกกับผ้าทอแม่ทางออนไลน์","effects":[{"role":"trader"},{"money":-5,"unit":"wageDay"}],"roll":[{"p":0.4,"text":"มีลูกค้าประจำทั่วประเทศ","effects":[{"money":25,"unit":"wageDay"},{"stat":"happy","d":5}]},{"p":0.6,"text":"ยอดขายไม่ค่อยขยับ","effects":[{"stat":"happy","d":-2}]}]},
  {"id":"farm","label":"ทำนาทำสวนต่อ","text":"อยู่บ้านกับพ่อแม่อย่างถาวร","effects":[{"stat":"bond","d":4},{"stat":"happy","d":2}]}]},
{"id":"wr-laos-china-rail-2021","title":"รถไฟลาว-จีนถึงเวียงจันทน์","body":"รถไฟลาว-จีนเปิด สินค้าจีนไหลผ่านมาถึงริมโขงฝั่งหนองคาย คนรู้จักชวนทำธุรกิจนำเข้าผลไม้","when":{"year":[2021,2022],"season":2,"province":"nong-khai","age":[20,55]},"cooldown":"once",
 "choices":[
  {"id":"trade","label":"ลงทุนทำนำเข้าส่งออก","text":"ต้องหัดภาษาจีนและเอกสารศุลกากร","effects":[{"money":-30,"unit":"wageDay"},{"role":"trader"},{"flag":"wr-borderTrade"},{"stat":"know","d":2}],"roll":[{"p":0.5,"text":"ธุรกิจเดินได้ดี","effects":[{"money":60,"unit":"wageDay"}]},{"p":0.5,"text":"ติดปัญหาเอกสาร ของเสียหาย","effects":[{"cond":"indebted","turns":6}]}]},
  {"id":"no","label":"ไม่เสี่ยง","text":"ทำงานเดิมต่อ","effects":[]}]},
{"id":"wr-israel-2023","title":"ข่าวจากอิสราเอล","body":"มีข่าวแรงงานไทยในอิสราเอลได้รับผลกระทบจากความรุนแรง คนในครอบครัวที่ทำงานอยู่ที่นั่นยังติดต่อได้","heavy":true,"when":{"year":[2023,2023],"season":2,"province":["udon-thani","nong-khai","nong-bua-lamphu","khon-kaen"],"age":[18,70],"chance":0.3},"cooldown":"once",
 "choices":[
  {"id":"return","label":"ขอให้กลับบ้านทันที","text":"ญาติกลับมาตามเที่ยวบินอพยพ ปลอดภัย แต่หนี้ค่าเดินทางยังค้าง","effects":[{"stat":"bond","d":4},{"cond":"indebted","turns":6}]},
  {"id":"stay","label":"ปล่อยให้เขาตัดสินใจเอง","text":"ญาติเลือกทำงานต่อ ทุกคืนต้องโทรถามข่าว","effects":[{"stat":"happy","d":-5,"by":"attach"},{"money":10,"unit":"wageDay"}]}]},
{"id":"wr-border-2025","title":"ปะทะชายแดนไทย-กัมพูชา","body":"เกิดการปะทะตามแนวชายแดน ทางการสั่งอพยพชาวบ้านหลายอำเภอไปศูนย์พักพิง","heavy":true,"when":{"year":[2025,2025],"season":1,"province":["sisaket","surin","buriram","ubon-ratchathani"]},"cooldown":"once","major":true,
 "choices":[
  {"id":"go","label":"อพยพตามประกาศ","text":"พาคนในบ้านไปศูนย์พักพิง ทิ้งนาที่เพิ่งดำ","effects":[{"stat":"happy","d":-4},{"money":-8,"unit":"wageDay"},{"flag":"wr-evacuated"}]},
  {"id":"volunteer","label":"ไปเป็นอาสาที่ศูนย์พักพิง","text":"ช่วยทำครัวและดูแลผู้สูงอายุ","when":{"age":[16,65]},"effects":[{"stat":"health","d":-2},{"stat":"bond","d":5},{"trait":"social","d":2}]},
  {"id":"farcity","label":"ไปพักกับญาติต่างจังหวัด","text":"ห่างไกลเสียงปืน แต่ห่วงบ้านตลอด","effects":[{"money":-6,"unit":"wageDay"},{"cond":"homesick","turns":2}]}]},
{"id":"wr-evacuated-again","title":"ต้องอพยพอีกครั้ง","body":"ชายแดนกลับมาตึงเครียด เคยอพยพมาแล้ว รอบนี้จะทำอย่างไร","heavy":true,"when":{"year":[2025,2025],"season":2,"flag":{"wr-evacuated":true},"province":["sisaket","surin","buriram","ubon-ratchathani"]},"cooldown":"once",
 "choices":[
  {"id":"ready","label":"เตรียมกระเป๋าไว้ อพยพทันที","text":"รอบนี้พร้อมกว่าเดิม ลูกหลานไม่ตื่นกลัวเท่าครั้งก่อน","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":2}]},
  {"id":"move","label":"ย้ายไปตั้งหลักที่อื่นถาวร","text":"ไปอยู่ขอนแก่น เริ่มชีวิตใหม่ห่างชายแดน","effects":[{"move":{"kind":"isan","province":"khon-kaen","setting":"urban"}},{"money":-15,"unit":"wageDay"},{"cond":"homesick","turns":4}]}]},
{"id":"wr-bueng-kan-bridge-2025","title":"สะพานมิตรภาพแห่งที่ 5","body":"สะพานบึงกาฬ-บอลิคำไซเปิด การค้าข้ามโขงกำลังจะคึกคัก","when":{"year":[2025,2026],"season":[0,2],"province":"bueng-kan","age":[18,60],"chance":0.5},"cooldown":"once",
 "choices":[
  {"id":"trade","label":"เปิดร้านรับฝากส่งของข้ามแดน","text":"ลงทุนตั้งร้านใกล้ด่าน","effects":[{"money":-20,"unit":"wageDay"},{"role":"trader"},{"flag":"wr-borderTrade"}],"roll":[{"p":0.55,"text":"ลูกค้าเริ่มเยอะ","effects":[{"money":30,"unit":"wageDay"}]},{"p":0.45,"text":"ยังเงียบกว่าที่หวัง","effects":[{"stat":"happy","d":-3}]}]},
  {"id":"no","label":"รอดูคนอื่นก่อน","text":"ไม่รีบลงทุน","effects":[]}]}
]);
