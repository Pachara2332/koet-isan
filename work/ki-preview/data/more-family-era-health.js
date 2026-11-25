globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"fam-parents-to-bangkok","title":"พ่อแม่จะไปทำงานกรุงเทพฯ","body":"พ่อแม่คุยกันว่าทำนาอย่างเดียวไม่พอใช้หนี้ จะไปทำงานกรุงเทพฯ แล้วฝากเราไว้กับตายาย","when":{"age":[6,10],"loc":"isan","season":0,"noFlag":["fam-raisedByGrand","fam-parentsStayed"],"chance":0.25},"major":true,
   "choices":[
    {"id":"stay-grand","label":"อยู่กับตายายที่บ้าน","text":"พ่อแม่ขึ้นรถทัวร์ไปตอนเช้ามืด เหลือเรากับตายายและเสียงไก่","effects":[{"flag":"fam-raisedByGrand"},{"stat":"happy","d":-6,"by":"attach"},{"money":20,"unit":"wageDay"},{"pin":"พ่อแม่ไปทำงานกรุงเทพฯ อยู่กับตายาย"}]},
    {"id":"beg","label":"ร้องขอให้พ่อแม่อยู่","text":"แม่ตัดสินใจอยู่บ้าน พ่อไปคนเดียว เงินส่งกลับน้อยลงแต่ได้กินข้าวกับแม่ทุกวัน","effects":[{"flag":"fam-parentsStayed"},{"stat":"bond","d":5},{"money":-8,"unit":"wageDay"}]}
   ]},
  {"id":"fam-parent-returns","title":"พ่อแม่กลับมาอยู่บ้าน","body":"หลายปีผ่านไป พ่อแม่เก็บของจากกรุงเทพฯ กลับมาบ้าน คนที่เคยคุยแต่โทรศัพท์มายืนอยู่ตรงหน้า","when":{"age":[12,17],"flag":{"fam-raisedByGrand":true},"chance":0.2},"cooldown":"once",
   "choices":[
    {"id":"open","label":"ค่อยๆ เปิดใจ","text":"ช่วงแรกยังเขิน แต่ได้นั่งกินข้าวด้วยกันทุกเย็น","effects":[{"stat":"bond","d":6},{"stat":"happy","d":3}]},
    {"id":"distant","label":"ยังติดตายายมากกว่า","text":"เรายังวิ่งไปหายายทุกครั้งที่มีเรื่อง พ่อแม่เข้าใจแต่ก็เสียใจ","effects":[{"stat":"bond","d":-3},{"trait":"attach","d":-2}]}
   ]},
  {"id":"fam-ordain-repay","title":"บวชทดแทนคุณก่อนแต่ง","body":"แม่บอกว่าก่อนมีครอบครัวอยากให้บวชสักพรรษา จะได้เกาะชายผ้าเหลือง","when":{"sex":"m","age":[20,28],"season":1,"noFlag":["married","fam-ordained","fam-declinedOrdain"],"chance":0.2},"major":true,
   "choices":[
    {"id":"ordain","label":"บวชหนึ่งพรรษา","text":"ญาติทั้งหมู่บ้านมาแห่นาค แม่ร้องไห้ด้วยความดีใจ แต่ต้องหยุดงานสามเดือน","effects":[{"flag":"fam-ordained"},{"stat":"bond","d":8},{"stat":"happy","d":4},{"money":-25,"unit":"wageDay"},{"pin":"บวชทดแทนคุณพ่อแม่"}]},
    {"id":"short","label":"บวชสั้น 7 วัน","text":"ได้บวชตามที่แม่ขอ แต่สั้นกว่าที่แม่หวัง","effects":[{"flag":"fam-ordained"},{"stat":"bond","d":3},{"money":-8,"unit":"wageDay"}]},
    {"id":"no","label":"บอกแม่ว่ายังไม่พร้อมบวช","text":"แม่บอกไม่เป็นไร แต่เสียงฟังดูเหงา","effects":[{"flag":"fam-declinedOrdain"},{"stat":"bond","d":-4}]}
   ]},
  {"id":"fam-care-parents","title":"พ่อแม่แก่ลง","body":"พี่น้องโทรมาว่าพ่อแม่เริ่มทำนาไม่ไหว ใครสักคนต้องกลับไปดู","when":{"age":[35,50],"loc":["bangkok","abroad"],"noFlag":["fam-caredDecided"],"chance":0.15},"major":true,
   "choices":[
    {"id":"go-home","label":"กลับไปอยู่บ้าน","text":"รายได้ลดลงมาก แต่ได้อยู่ใกล้พ่อแม่ในวันที่เหลือ","effects":[{"flag":"fam-caredDecided"},{"flag":"fam-caredHome"},{"move":"home"},{"role":"farmer"},{"stat":"bond","d":10},{"stat":"happy","d":3},{"pin":"กลับบ้านมาดูแลพ่อแม่"}]},
    {"id":"send-money","label":"อยู่ต่อ ส่งเงินกลับ","text":"ส่งเงินทุกเดือนและโทรหาบ่อยขึ้น พี่น้องรับภาระหน้างานแทน","effects":[{"flag":"fam-caredDecided"},{"money":-30,"unit":"wageDay"},{"stat":"bond","d":-3},{"cond":"homesick","turns":4}]}
   ]},
  {"id":"fam-become-grandparent-carer","title":"ลูกฝากหลานไว้ให้เลี้ยง","body":"ลูกจะไปทำงานกรุงเทพฯ ขอฝากหลานตัวเล็กไว้ที่บ้าน","when":{"age":[45,65],"loc":"isan","noFlag":["fam-raisingGrand"],"flag":{"grandchild":true},"chance":0.15},"major":true,
   "choices":[
    {"id":"take","label":"รับเลี้ยงหลาน","text":"บ้านกลับมามีเสียงเด็กอีกครั้ง เหนื่อยขึ้นแต่ไม่เหงา","effects":[{"flag":"fam-raisingGrand"},{"flag":"grandchild"},{"stat":"happy","d":5},{"stat":"health","d":-3},{"money":-10,"unit":"wageDay"},{"pin":"เลี้ยงหลานแทนลูก"}]},
    {"id":"refuse","label":"บอกว่าเลี้ยงไม่ไหว","text":"ลูกพาหลานไปฝากเนอสเซอรี่ในเมือง ความสัมพันธ์ตึงไปพักหนึ่ง","effects":[{"flag":"grandchild"},{"flag":"fam-raisingGrand","v":false},{"stat":"bond","d":-5},{"stat":"health","d":2}]}
   ]},
  {"id":"fam-land-dispute","title":"แบ่งที่นาไม่ลงตัว","body":"ถึงเวลาแบ่งโฉนดที่นาของครอบครัว พี่น้องนั่งคุยกันแต่ทุกคนมีเหตุผลของตัวเอง","when":{"age":[35,60],"flag":{"hasSiblings":true},"noFlag":["fam-landSettled"],"chance":0.06},"major":true,
   "choices":[
    {"id":"equal","label":"แบ่งเท่ากันทุกคน","text":"แปลงเล็กลงทุกคน แต่ไม่มีใครค้างคาใจ","effects":[{"flag":"fam-landSettled"},{"stat":"bond","d":4},{"money":15,"unit":"wageDay"}]},
    {"id":"carer","label":"ให้คนที่ดูแลพ่อแม่ได้มากกว่า","text":"บางคนไม่พอใจ แต่ส่วนใหญ่ยอมรับว่ายุติธรรม","effects":[{"flag":"fam-landSettled"},{"stat":"bond","d":-2},{"stat":"happy","d":2}]},
    {"id":"fight","label":"สู้เพื่อส่วนของตัวเอง","text":"ได้ที่มากขึ้น แต่พี่น้องบางคนเลิกพูดกันหลายปี","effects":[{"flag":"fam-landSettled"},{"flag":"fam-siblingRift"},{"money":40,"unit":"wageDay"},{"stat":"bond","d":-10},{"stat":"happy","d":-4}]}
   ]},
  {"id":"fam-stop-kids","title":"จะมีลูกอีกไหม","body":"มีลูกแล้ว ญาติถามว่าจะมีอีกคนไหม ขณะที่ค่าเทอมก็แพงขึ้นทุกปี","when":{"flag":{"married":true,"child":true},"age":[25,40],"noFlag":["fam-stopKids"],"chance":0.2},"major":true,
   "choices":[
    {"id":"more","label":"มีอีกคน","text":"บ้านครึกครื้นขึ้น ค่าใช้จ่ายก็ตามมา","effects":[{"flag":"newChild"},{"stat":"happy","d":5},{"money":-20,"unit":"wageDay"},{"stat":"health","d":-2}]},
    {"id":"stop","label":"พอแค่นี้","text":"ตั้งใจเลี้ยงลูกที่มีอยู่ให้ดีที่สุด เงินพอส่งเรียน","effects":[{"flag":"fam-stopKids"},{"money":10,"unit":"wageDay"}]}
   ]},
  {"id":"fam-sibling-quits-school","title":"พี่น้องคนหนึ่งต้องออกจากโรงเรียน","body":"เงินในบ้านพอส่งเรียนต่อได้แค่คนเดียว พ่อแม่ให้พี่น้องคุยกันเอง","when":{"age":[14,16],"flag":{"hasSiblings":true},"wealth":"poor","noFlag":["fam-siblingSacrificed","fam-iSacrificed"],"season":0,"chance":0.35},"major":true,
   "choices":[
    {"id":"me-study","label":"เราเรียนต่อ","text":"พี่น้องไปทำงานโรงงานส่งเงินให้เรา เราติดหนี้บุญคุณก้อนใหญ่","effects":[{"flag":"fam-siblingSacrificed"},{"stat":"know","d":3},{"stat":"happy","d":-3,"by":"attach"}]},
    {"id":"sib-study","label":"ให้พี่น้องเรียนต่อ","text":"เราออกมาช่วยพ่อแม่ทำนาหาเงิน พี่น้องสัญญาว่าจะไม่ลืม","effects":[{"flag":"fam-iSacrificed"},{"role":"farmer"},{"money":10,"unit":"wageDay"},{"stat":"bond","d":6},{"pin":"ออกจากโรงเรียนให้พี่น้องได้เรียน"}]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"fam-grand-morning","w":12,"cooldown":9,"title":"ยายห่อข้าวเหนียวให้","body":"ยายตื่นตีห้ามานึ่งข้าวเหนียว ห่อใส่กล่องให้ไปโรงเรียน","when":{"age":[6,14],"flag":{"fam-raisedByGrand":true}},
   "choices":[
    {"id":"help","label":"ตื่นมาช่วยยาย","text":"ง่วงทั้งวันในห้องเรียน แต่ยายยิ้มกว้าง","effects":[{"stat":"bond","d":4},{"stat":"know","d":-1}]},
    {"id":"sleep","label":"นอนต่ออีกนิด","text":"ได้นอนเต็มอิ่ม ยายทำเองทุกอย่างเหมือนเคย","effects":[{"stat":"health","d":1},{"stat":"bond","d":-1}]}
   ]},
  {"id":"fam-call-from-mom","w":12,"cooldown":6,"title":"แม่โทรมาจากกรุงเทพฯ","body":"ยายตะโกนเรียกให้มารับสาย แม่ถามว่าเรียนเป็นไงบ้าง","when":{"age":[6,17],"year":[1992,2026],"flag":{"fam-raisedByGrand":true}},
   "choices":[
    {"id":"talk","label":"เล่าเรื่องให้ฟังยาวๆ","text":"แม่หัวเราะ บอกว่าเดือนหน้าจะส่งเงินมาซื้อรองเท้าใหม่","effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
    {"id":"short","label":"ตอบสั้นๆ แล้ววิ่งไปเล่น","text":"แม่เงียบไปครู่หนึ่งก่อนวางสาย","effects":[{"stat":"happy","d":1},{"stat":"bond","d":-2}]}
   ]},
  {"id":"fam-money-order","w":10,"cooldown":9,"title":"เงินจากพ่อแม่มาถึง","body":"พ่อแม่ส่งเงินมาก้อนหนึ่ง ตาถามว่าจะเอาไปทำอะไรดี","when":{"age":[10,17],"flag":{"fam-raisedByGrand":true}},
   "choices":[
    {"id":"save","label":"เก็บไว้ค่าเทอม","text":"ตาเอาไปฝากธนาคารให้ ใช้ตอนเปิดเทอม","effects":[{"money":5,"unit":"wageDay"},{"stat":"know","d":1}]},
    {"id":"spend","label":"ซื้อของที่อยากได้","text":"ได้ของใหม่อวดเพื่อน เงินหมดในสัปดาห์เดียว","effects":[{"stat":"happy","d":4}]},
    {"id":"grand","label":"ซื้อยาให้ตา","text":"ตาดุเบาๆ ว่าไม่ต้อง แต่ก็กินยาครบทุกมื้อ","effects":[{"stat":"bond","d":4},{"stat":"happy","d":1}]}
   ]},
  {"id":"fam-sibling-fight","w":10,"cooldown":9,"title":"ทะเลาะกับพี่น้อง","body":"แย่งขนมบ้าง แย่งของเล่นบ้าง วันนี้ลามไปถึงขั้นไม่พูดกัน","when":{"age":[6,17],"flag":{"hasSiblings":true}},
   "choices":[
    {"id":"sorry","label":"ขอโทษก่อน","text":"เสียหน้านิดหน่อย แต่ตกเย็นก็กลับมาเล่นด้วยกัน","effects":[{"stat":"bond","d":3},{"trait":"social","d":1}]},
    {"id":"hold","label":"ไม่ยอม","text":"ชนะเรื่องนี้ แต่บ้านเงียบไปทั้งสัปดาห์","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":1}]}
   ]},
  {"id":"fam-sibling-borrow","w":8,"cooldown":15,"title":"พี่น้องขอยืมเงิน","body":"พี่น้องมาขอยืมเงินไปจ่ายหนี้ที่ถึงกำหนด บอกว่าเดือนหน้าคืน","when":{"age":[22,60],"flag":{"hasSiblings":true},"money":[3000,100000000]},
   "choices":[
    {"id":"lend","label":"ให้ยืม","text":"พี่น้องขอบคุณยกใหญ่","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":3}],
     "roll":[{"p":0.55,"text":"ได้คืนครบตามนัด","effects":[{"money":15,"unit":"wageDay"}]},{"p":0.45,"text":"ผ่านไปหลายเดือนยังไม่ได้คืน ไม่กล้าทวง","effects":[{"stat":"happy","d":-3},{"flag":"fam-siblingOwes"}]}]},
    {"id":"no","label":"ปฏิเสธ","text":"เงินอยู่ครบ แต่บทสนทนาจบแบบห้วนๆ","effects":[{"stat":"bond","d":-4}]}
   ]},
  {"id":"fam-sibling-owes-again","w":8,"cooldown":"once","title":"พี่น้องมาขออีก","body":"พี่น้องที่ยังไม่คืนเงินก้อนเก่า มาขอยืมเพิ่ม","when":{"flag":{"fam-siblingOwes":true}},
   "choices":[
    {"id":"forgive","label":"ยกหนี้เก่าให้ แต่ไม่ให้เพิ่ม","text":"พูดกันตรงๆ ครั้งแรก โล่งใจทั้งสองฝ่าย","effects":[{"flag":"fam-siblingOwes","v":false},{"stat":"happy","d":3}]},
    {"id":"again","label":"ให้อีกเพราะเป็นพี่น้อง","text":"ใจอ่อนอีกครั้ง เงินเก็บหายไปอีกก้อน","effects":[{"money":-15,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"happy","d":-2}]}
   ]},
  {"id":"fam-sibling-wedding","w":8,"cooldown":"once","title":"งานแต่งพี่น้อง","body":"พี่น้องจะแต่งงาน ทางบ้านขอให้ช่วยค่าใช้จ่ายงานแต่ง","when":{"age":[18,40],"flag":{"hasSiblings":true}},
   "choices":[
    {"id":"big","label":"ช่วยเต็มที่","text":"งานออกมาสวย ญาติชมทั้งหมู่บ้าน","effects":[{"money":-25,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":3}]},
    {"id":"small","label":"ช่วยเท่าที่ไหว","text":"ใส่ซองตามกำลัง ช่วยยกของทั้งวัน","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":2}]}
   ]},
  {"id":"fam-sibling-repays","w":10,"cooldown":"once","title":"พี่น้องที่เคยเสียสละ","body":"พี่น้องที่ออกจากโรงเรียนให้เราเรียน ตอนนี้ลำบาก ขอให้ช่วยค่าเทอมลูก","when":{"age":[25,50],"flag":{"fam-siblingSacrificed":true}},
   "choices":[
    {"id":"pay","label":"ส่งค่าเทอมหลานจนจบ","text":"เงินตึงมือหลายปี แต่รู้สึกได้คืนสิ่งที่ค้างในใจ","effects":[{"money":-40,"unit":"wageDay"},{"stat":"bond","d":8},{"stat":"happy","d":4}]},
    {"id":"some","label":"ช่วยบางส่วน","text":"ช่วยได้ครึ่งหนึ่ง พี่น้องเข้าใจ แต่เราเองยังค้างคาใจ","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-2,"by":"attach"}]}
   ]},
  {"id":"fam-sibling-graduates","w":10,"cooldown":"once","title":"พี่น้องรับปริญญา","body":"พี่น้องที่เราออกมาทำงานส่งให้เรียน ใส่ชุดครุยมายืนข้างเรา","when":{"age":[18,30],"flag":{"fam-iSacrificed":true}},"effects":[{"stat":"happy","d":8},{"stat":"bond","d":5},{"cond":"proud","turns":3}]},
  {"id":"fam-grand-frail","w":10,"cooldown":"once","title":"ยายเริ่มหลงลืม","body":"ยายเรียกชื่อเราผิดบ่อยขึ้น บางวันจำไม่ได้ว่ากินข้าวแล้ว","when":{"age":[14,30],"flag":{"fam-raisedByGrand":true}},
   "choices":[
    {"id":"stay","label":"อยู่ใกล้ดูแลยาย","text":"พลาดงานและโอกาสบางอย่าง แต่ได้อยู่กับยายช่วงสุดท้าย","effects":[{"flag":"fam-caredGrand"},{"stat":"bond","d":6},{"stat":"know","d":-2}]},
    {"id":"go","label":"ฝากญาติดูแล แล้วไปทำตามแผน","text":"โทรหาทุกอาทิตย์ แต่เสียงยายเลือนลงทุกครั้ง","effects":[{"stat":"happy","d":-3,"by":"attach"}]}
   ]},
  {"id":"fam-grand-dies","w":10,"cooldown":"once","heavy":true,"title":"ยายจากไป","body":"ยายที่เลี้ยงดูคุณมาจากไปแล้ว ญาติมารวมกันจัดงานที่บ้าน คุณนึกถึงวันที่เคยอยู่กับยาย","when":{"age":[16,40],"flag":{"fam-raisedByGrand":true,"grandmotherPassed":true}},
   "choices":[
    {"id":"cry","label":"ปล่อยให้ตัวเองเสียใจ","text":"ร้องไห้จนหมดแรง แล้วค่อยๆ ลุกขึ้นช่วยจัดงาน","effects":[{"stat":"happy","d":-12,"by":"attach"},{"cond":"grieving","turns":4}]},
    {"id":"busy","label":"ทำงานให้ยุ่งเข้าไว้","text":"ทำทุกอย่างให้เรียบร้อย ความเศร้ามาทีหลังตอนกลางคืน","effects":[{"stat":"happy","d":-8,"by":"attach"},{"stat":"health","d":-2},{"cond":"grieving","turns":2}]}
   ]},
  {"id":"fam-grand-dies-cared","w":14,"cooldown":"once","title":"วันที่ได้ดูแลยาย","body":"คุณนึกถึงเวลาที่เคยอยู่ใกล้และช่วยดูแลยาย ความทรงจำเล็กๆ เหล่านั้นยังอยู่กับคุณ","when":{"flag":{"fam-caredGrand":true}},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
  {"id":"fam-ordained-blessing","w":10,"cooldown":"once","title":"แม่ยังเล่าถึงวันบวช","body":"ทุกครั้งที่มีแขกมาบ้าน แม่หยิบรูปวันบวชมาอวด","when":{"sex":"m","flag":{"fam-ordained":true},"age":[22,45]},"effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
  {"id":"fam-teen-phone","w":8,"cooldown":12,"title":"ลูกวัยรุ่นติดจอ","body":"ลูกขังตัวอยู่ในห้องเล่นโทรศัพท์จนดึก เรียกกินข้าวก็ไม่ออก","when":{"flag":{"child":true},"childAge":[13,18],"year":[2012,2026]},
   "choices":[
    {"id":"rule","label":"ตั้งกติกาเวลาเล่น","text":"ลูกงอนไปหลายวัน แต่เกรดดีขึ้น","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":1}]},
    {"id":"join","label":"ลองเล่นเกมด้วยกัน","text":"แพ้ลูกยับ แต่ได้คุยกันมากขึ้น","effects":[{"stat":"bond","d":4},{"stat":"happy","d":2}]}
   ]},
  {"id":"fam-teen-rebel","w":8,"cooldown":12,"title":"ลูกกลับบ้านดึก","body":"ลูกวัยรุ่นออกไปกับเพื่อน กลับบ้านดึกแล้วไม่บอกว่าไปไหน","when":{"flag":{"child":true},"childAge":[14,18]},
   "choices":[
    {"id":"scold","label":"ดุแรงๆ","text":"ลูกเงียบ เลิกกลับดึกแต่ก็เลิกเล่าอะไรให้ฟัง","effects":[{"stat":"bond","d":-4}]},
    {"id":"talk","label":"นั่งคุยว่าห่วง","text":"ลูกบอกว่าไปช่วยงานบ้านเพื่อน ต่อไปจะบอกก่อนออกจากบ้าน","effects":[{"stat":"bond","d":3},{"stat":"happy","d":-1}]}
   ]},
  {"id":"fam-child-leaves","w":10,"cooldown":"once","title":"ลูกจะไปกรุงเทพฯ","body":"ลูกจบแล้ว อยากไปหางานในกรุงเทพฯ เหมือนที่คนรุ่นก่อนเคยไป","when":{"flag":{"child":true},"childAge":[18,23]},
   "choices":[
    {"id":"bless","label":"ให้พรแล้วปล่อยไป","text":"บ้านเงียบลงทันที แต่ลูกโทรมาทุกอาทิตย์","effects":[{"stat":"happy","d":-4,"by":"attach"},{"flag":"fam-childAway"}]},
    {"id":"ask","label":"ขอให้อยู่ช่วยงานที่บ้าน","text":"ลูกอยู่ต่อ แต่ดูเหมือนยังคิดถึงโอกาสที่ไม่ได้ลอง","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1}]}
   ]},
  {"id":"fam-empty-nest","w":8,"cooldown":12,"title":"บ้านเงียบ","body":"ลูกไปทำงานไกล บ้านที่เคยวุ่นวายเหลือแต่เสียงทีวี","when":{"flag":{"fam-childAway":true},"age":[45,80]},
   "choices":[
    {"id":"temple","label":"ไปช่วยงานวัด","text":"ได้เจอเพื่อนรุ่นเดียวกัน หัวเราะบ่อยขึ้น","effects":[{"stat":"happy","d":4},{"trait":"social","d":1}]},
    {"id":"wait","label":"รอโทรศัพท์จากลูก","text":"วันไหนลูกโทรมาก็ดีใจ วันไหนไม่โทรก็เงียบเหงา","effects":[{"cond":"lonely","turns":3},{"stat":"happy","d":-2}]}
   ]},
  {"id":"fam-grandkid-school","w":10,"cooldown":9,"title":"หลานต้องไปโรงเรียน","body":"หลานที่เราเลี้ยงถึงวัยเรียน ต้องซื้อชุดนักเรียนและหาคนรับส่ง","when":{"flag":{"fam-raisingGrand":true}},
   "choices":[
    {"id":"drive","label":"ขี่มอเตอร์ไซค์ไปส่งเอง","text":"เหนื่อยทุกเช้า แต่หลานกอดเอวแน่น","effects":[{"stat":"bond","d":4},{"stat":"health","d":-1},{"money":-3,"unit":"wageDay"}]},
    {"id":"van","label":"จ้างรถรับส่ง","text":"สบายตัวขึ้น แต่ต้องขอเงินลูกเพิ่ม","effects":[{"money":-6,"unit":"wageDay"},{"stat":"health","d":1}]}
   ]},
  {"id":"fam-divorce-kids","w":10,"cooldown":"once","title":"ลูกถามถึงอีกฝ่าย","body":"ลูกถามว่าทำไมพ่อกับแม่ไม่ได้อยู่ด้วยกันเหมือนบ้านเพื่อน","when":{"flag":{"child":true},"noFlag":["married"],"childAge":[5,15],"chance":0.3},
   "choices":[
    {"id":"honest","label":"อธิบายตรงๆ ตามวัย","text":"ลูกร้องไห้ แต่ไม่ต้องเดาอยู่คนเดียว","effects":[{"stat":"bond","d":3},{"stat":"happy","d":-3,"by":"attach"}]},
    {"id":"share","label":"ให้ลูกไปหาอีกฝ่ายทุกปิดเทอม","text":"ต้องประสานกับอีกฝ่ายบ่อย แต่ลูกยิ้มได้มากขึ้น","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]}
   ]},
  {"id":"fam-parent-pension","w":8,"cooldown":12,"title":"พ่อแม่ขอเงินค่ายา","body":"แม่โทรมาเสียงเกรงใจ ขอเงินไปซื้อยาความดัน","when":{"age":[28,55],"noFlag":["fam-caredHome"]},
   "choices":[
    {"id":"send","label":"โอนให้ทันที","text":"แม่ขอบใจหลายรอบ","effects":[{"money":-6,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"later","label":"ขอสิ้นเดือน","text":"แม่บอกไม่รีบ แต่เราก็รู้ว่าแม่ไม่อยากขอซ้ำ","effects":[{"stat":"bond","d":-2}]}
   ]},
  {"id":"fam-rift-heal","w":8,"cooldown":"once","title":"โอกาสคืนดีกับพี่น้อง","body":"พี่น้องที่ไม่พูดกันตั้งแต่เรื่องที่นา มางานบุญที่บ้าน","when":{"flag":{"fam-siblingRift":true}},
   "choices":[
    {"id":"reach","label":"เข้าไปทักก่อน","text":"เสียฟอร์ม แต่ได้พี่น้องคืนมา","effects":[{"flag":"fam-siblingRift","v":false},{"stat":"bond","d":6},{"stat":"happy","d":3}]},
    {"id":"avoid","label":"ทำเป็นไม่เห็น","text":"งานจบไปอย่างอึดอัด","effects":[{"stat":"happy","d":-3}]}
   ]},

  {"id":"tech-tv-neighbour","w":10,"cooldown":6,"title":"ไปดูทีวีบ้านเพื่อนบ้าน","body":"ทั้งหมู่บ้านมีทีวีไม่กี่เครื่อง คืนนี้มีมวยและละคร เด็กๆ นั่งเต็มลานบ้านเขา","when":{"year":[1975,1989],"loc":"isan","setting":"rural","age":[4,16],"noFlag":["tech-tv"]},
   "choices":[
    {"id":"go","label":"ไปนั่งดูจนจบ","text":"สนุกจนลืมเวลา กลับบ้านดึก ตื่นสายไปโรงเรียน","effects":[{"stat":"happy","d":3},{"trait":"social","d":1},{"stat":"know","d":-1}]},
    {"id":"home","label":"อยู่บ้านทำการบ้าน","text":"วันรุ่งขึ้นเพื่อนคุยกันแต่เรื่องละคร เราฟังไม่รู้เรื่อง","effects":[{"stat":"know","d":2},{"stat":"happy","d":-1}]}
   ]},
  {"id":"tech-own-tv","w":8,"cooldown":"once","title":"บ้านเราจะซื้อทีวี","body":"พ่อคุยว่าจะผ่อนทีวีขาวดำจากร้านในอำเภอ","when":{"year":[1978,1992],"loc":"isan","age":[6,40]},
   "choices":[
    {"id":"buy","label":"ผ่อนซื้อ","text":"บ้านกลายเป็นที่รวมตัวของเพื่อนบ้านทุกคืน","effects":[{"flag":"tech-tv"},{"money":-15,"unit":"wageDay"},{"stat":"happy","d":4},{"trait":"social","d":1}]},
    {"id":"wait","label":"เก็บเงินไว้ก่อน","text":"ยังต้องไปดูบ้านคนอื่น แต่เงินเก็บไม่หาย","effects":[{"money":3,"unit":"wageDay"}]}
   ]},
  {"id":"tech-cassette","w":10,"cooldown":9,"title":"เทปหมอลำม้วนใหม่","body":"รถเร่ขายเทปจอดหน้าวัด มีหมอลำกับลูกทุ่งชุดใหม่เพิ่งออก","when":{"year":[1982,2000],"age":[10,45]},
   "choices":[
    {"id":"buy","label":"ซื้อมาฟัง","text":"เปิดซ้ำจนเทปยืด ร้องตามได้ทุกเพลง","effects":[{"money":-1,"unit":"wageDay"},{"stat":"happy","d":3}]},
    {"id":"copy","label":"ยืมเพื่อนมาอัดต่อ","text":"เสียงแตกนิดหน่อย แต่ไม่เสียเงิน ได้คุยกับเพื่อนเพิ่ม","effects":[{"stat":"happy","d":1},{"trait":"social","d":1}]}
   ]},
  {"id":"tech-payphone","w":8,"cooldown":9,"title":"ตู้โทรศัพท์หน้าหมู่บ้าน","body":"ตู้โทรศัพท์สาธารณะมาตั้งหน้าร้านค้า คิวยาวทุกเย็น","when":{"year":[1990,2003],"age":[10,50]},
   "choices":[
    {"id":"call","label":"ต่อคิวโทรหาญาติในเมือง","text":"เหรียญหมดก่อนคุยจบ แต่ได้ยินเสียงคนไกล","effects":[{"money":-1,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"letter","label":"เขียนจดหมายแทน","text":"ถูกกว่า แต่รอคำตอบเป็นอาทิตย์","effects":[{"stat":"know","d":1},{"stat":"bond","d":1}]}
   ]},
  {"id":"tech-first-mobile","w":10,"cooldown":"once","title":"มือถือเครื่องแรก","body":"มือถือราคาถูกลงจนคนในหมู่บ้านเริ่มมีกัน","when":{"year":[2001,2010],"age":[15,60],"noFlag":["money-phone"]},
   "choices":[
    {"id":"buy","label":"ซื้อเครื่องจอขาวดำ","text":"โทรหาที่บ้านได้ทุกเมื่อ แต่ค่าบัตรเติมเงินกินเงินทุกเดือน","effects":[{"flag":"money-phone"},{"money":-10,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"no","label":"ยังไม่จำเป็น","text":"ใช้ตู้โทรศัพท์ต่อไป ประหยัดเงินได้","effects":[{"money":2,"unit":"wageDay"}]}
   ]},
  {"id":"tech-netcafe","w":10,"cooldown":9,"title":"ร้านเน็ตในอำเภอ","body":"ร้านเกมออนไลน์เปิดใหม่ เพื่อนชวนไปเล่นหลังเลิกเรียนชั่วโมงละไม่กี่บาท","when":{"year":[2002,2012],"age":[11,22]},
   "choices":[
    {"id":"play","label":"ไปเล่นจนร้านปิด","text":"เลเวลขึ้นเร็ว เงินค่าขนมหมด การบ้านไม่ได้ทำ","effects":[{"flag":"tech-gamer"},{"stat":"happy","d":4},{"stat":"know","d":-3},{"money":-2,"unit":"wageDay"}]},
    {"id":"report","label":"ใช้หาข้อมูลทำรายงาน","text":"ได้คะแนนรายงานดี เพื่อนว่าเราน่าเบื่อ","effects":[{"stat":"know","d":3},{"stat":"happy","d":-1}]},
    {"id":"skip","label":"กลับบ้านช่วยงาน","text":"ได้ช่วยที่บ้าน แต่ตกข่าวกลุ่มเพื่อน","effects":[{"stat":"bond","d":2},{"trait":"social","d":-1}]}
   ]},
  {"id":"tech-gamer-grades","w":10,"cooldown":"once","title":"เกรดตกเพราะเกม","body":"ครูเรียกผู้ปกครองมาคุยเรื่องเกรดที่ตกลงทั้งเทอม","when":{"flag":{"tech-gamer":true},"edu":{"in":["school","voc"]}},
   "choices":[
    {"id":"quit","label":"เลิกไปร้านเกม","text":"เบื่อสุดๆ ช่วงแรก แต่เกรดค่อยๆ กลับมา","effects":[{"flag":"tech-gamer","v":false},{"stat":"know","d":4},{"stat":"happy","d":-3}]},
    {"id":"keep","label":"เล่นต่อ แค่เบาลง","text":"บอกว่าจะเบาลง แต่ก็ยังแอบไป","effects":[{"stat":"know","d":-2},{"stat":"bond","d":-3}]}
   ]},
  {"id":"tech-hi5","w":10,"cooldown":"once","title":"แต่งหน้า Hi5","body":"ทุกคนมี Hi5 ใส่เพลง ใส่ภาพกากเพชร แลกคอมเมนต์กัน","when":{"year":[2005,2010],"age":[13,25]},
   "choices":[
    {"id":"decorate","label":"แต่งหน้าโปรไฟล์ทั้งคืน","text":"หน้าเพจวิบวับสุดในกลุ่ม ตาแดงไปเรียน","effects":[{"stat":"happy","d":3},{"trait":"social","d":1},{"stat":"health","d":-1}]},
    {"id":"skip","label":"ไม่สนใจ","text":"ไม่ได้ตามกระแส แต่มีเวลาทำอย่างอื่น","effects":[{"stat":"know","d":1}]}
   ]},
  {"id":"tech-facebook","w":10,"cooldown":"once","title":"สมัคร Facebook","body":"เพื่อนๆ ย้ายจาก Hi5 มา Facebook หมดแล้ว ญาติในกรุงเทพฯ ก็โพสต์รูปทุกวัน","when":{"year":[2009,2015],"age":[13,60]},
   "choices":[
    {"id":"join","label":"สมัครเลย","text":"เจอเพื่อนเก่าที่หายไปหลายปี แต่ก็ไถหน้าฟีดจนดึก","effects":[{"flag":"tech-social"},{"stat":"bond","d":3},{"stat":"happy","d":2},{"stat":"health","d":-1}]},
    {"id":"no","label":"ไม่เอาดีกว่า","text":"ชีวิตเงียบสงบ แต่บางทีไม่รู้ข่าวเพื่อนเลย","effects":[{"trait":"social","d":-1}]}
   ]},
  {"id":"tech-line-family","w":10,"cooldown":"once","title":"กลุ่ม LINE ครอบครัว","body":"ญาติๆ ตั้งกลุ่ม LINE ครอบครัว ส่งสติกเกอร์สวัสดีทุกเช้า","when":{"year":[2012,2026],"age":[15,80]},
   "choices":[
    {"id":"active","label":"ทักทายทุกวัน","text":"รู้สึกใกล้กันแม้อยู่คนละจังหวัด","effects":[{"stat":"bond","d":4}]},
    {"id":"mute","label":"ปิดแจ้งเตือน","text":"โทรศัพท์เงียบขึ้น แต่พลาดข่าวงานบุญไปครั้งหนึ่ง","effects":[{"stat":"happy","d":1},{"stat":"bond","d":-1}]}
   ]},
  {"id":"tech-smartphone","w":10,"cooldown":"once","title":"สมาร์ทโฟนเครื่องแรก","body":"ร้านในตลาดให้ผ่อนสมาร์ทโฟนรายเดือน ดูคลิปได้ วิดีโอคอลได้","when":{"year":[2012,2020],"age":[12,70],"noFlag":["money-smartphone"]},
   "choices":[
    {"id":"install","label":"ผ่อนเครื่องใหม่","text":"วิดีโอคอลหาครอบครัวได้เห็นหน้า แต่ผ่อนอีกเป็นปี","effects":[{"flag":"money-smartphone"},{"money":-12,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"happy","d":2}]},
    {"id":"cheap","label":"ใช้เครื่องมือสองต่อ","text":"ช้าหน่อย แต่ไม่มีหนี้","effects":[{"flag":"money-smartphone"},{"money":-4,"unit":"wageDay"}]}
   ]},
  {"id":"tech-scam-sms","w":8,"cooldown":12,"title":"ข้อความแปลก","body":"มีข้อความบอกว่าบัญชีมีปัญหา ให้กดลิงก์เพื่อยืนยันตัวตน","when":{"year":[2015,2026],"age":[20,80],"flag":{"money-smartphone":true}},
   "choices":[
    {"id":"ignore","label":"ลบทิ้ง แล้วถามคนรู้จัก","text":"คนรู้จักบอกว่าเป็นมิจฉาชีพ โชคดีที่ไม่กด","effects":[{"stat":"know","d":2}]},
    {"id":"click","label":"กดลิงก์ตามที่บอก","text":"กดไปแล้วใจไม่ดี","effects":[],"roll":[{"p":0.5,"text":"เงินในบัญชีหายไปก้อนหนึ่ง","effects":[{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-6}]},{"p":0.5,"text":"ธนาคารโทรมาเตือนทัน อายัดบัญชีไว้ได้","effects":[{"stat":"happy","d":-2}]}]}
   ]},
  {"id":"tech-promptpay","w":8,"cooldown":"once","title":"รับเงินผ่านพร้อมเพย์","body":"คนรอบตัวเริ่มโอนเงินผ่านพร้อมเพย์ ร้านในตลาดติดป้าย QR กันแล้ว มีคนถามว่าโอนให้คุณได้ไหม","when":{"year":[2017,2026],"age":[18,75]},
   "choices":[
    {"id":"use","label":"ผูกพร้อมเพย์ รับเงินผ่าน QR","text":"รับเงินง่ายขึ้น ไม่ต้องหาเงินทอน แต่ต้องคอยเช็คสลิปปลอม","effects":[{"money":4,"unit":"wageDay"},{"stat":"know","d":2}]},
    {"id":"cash","label":"ใช้เงินสดอย่างเดียว","text":"ไม่ต้องเรียนของใหม่ แต่บางครั้งก็พลาดเงินที่คนจะโอนให้","effects":[{"money":-2,"unit":"wageDay"}]}
   ]},
  {"id":"tech-paotang","w":8,"cooldown":"once","title":"แอปเป๋าตัง","body":"มีโครงการคนละครึ่ง ต้องลงแอปเป๋าตังถึงจะใช้สิทธิ์ได้","when":{"year":[2020,2022],"age":[18,80]},
   "choices":[
    {"id":"learn","label":"ให้คนรู้จักช่วยสอน","text":"ใช้เป็นแล้ว ซื้อของถูกลงหลายเดือน","effects":[{"money":5,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"skip","label":"ไม่ลง ยุ่งยาก","text":"ไม่ต้องปวดหัวกับแอป แต่พลาดสิทธิ์ไป","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"tech-live-sell","w":8,"cooldown":"once","title":"ไลฟ์ขายของ","body":"เพื่อนบ้านไลฟ์ขายปลาร้ากับผ้าไหมผ่านโทรศัพท์ ขายได้ทั่วประเทศ","when":{"year":[2018,2026],"age":[18,60],"flag":{"money-smartphone":true}},
   "choices":[
    {"id":"try","label":"ลองไลฟ์ขายของบ้าง","text":"ตื่นเต้นตอนกดไลฟ์ครั้งแรก","effects":[{"money":-5,"unit":"wageDay"},{"trait":"social","d":1}],
     "roll":[{"p":0.4,"text":"มีลูกค้าประจำ ได้รายได้เสริม","effects":[{"money":25,"unit":"wageDay"},{"stat":"happy","d":4}]},{"p":0.6,"text":"คนดูไม่กี่คน ของค้างเต็มบ้าน","effects":[{"stat":"happy","d":-3}]}]},
    {"id":"no","label":"ทำงานแบบเดิม","text":"รายได้คงที่ ไม่เสี่ยง","effects":[]}
   ]},
  {"id":"tech-tiktok","w":8,"cooldown":"once","title":"ทำคลิปลง TikTok","body":"คลิปชีวิตบ้านนาของคนในหมู่บ้านมียอดวิวเป็นแสน","when":{"year":[2019,2026],"age":[13,40],"flag":{"money-smartphone":true}},
   "choices":[
    {"id":"create","label":"ถ่ายคลิปลงทุกวัน","text":"ใช้เวลาวันละหลายชั่วโมง","effects":[{"stat":"know","d":-1},{"trait":"social","d":1}],
     "roll":[{"p":0.25,"text":"คลิปหนึ่งดังขึ้นมา มีคนติดตามเยอะ","effects":[{"money":15,"unit":"wageDay"},{"stat":"happy","d":5}]},{"p":0.75,"text":"ยอดวิวไม่ขยับ เริ่มท้อ","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"watch","label":"ดูอย่างเดียว","text":"สนุกดี แต่บางคืนไถจนตีสอง","effects":[{"stat":"happy","d":2},{"stat":"health","d":-1}]}
   ]},
  {"id":"tech-online-class","w":12,"cooldown":"once","title":"เรียนออนไลน์ช่วงโควิด","body":"โรงเรียนปิด ต้องเรียนผ่านโทรศัพท์ สัญญาณที่บ้านขาดๆ หายๆ","when":{"year":[2020,2021],"edu":{"in":["school","voc","hvoc","uni"]}},
   "choices":[
    {"id":"hill","label":"ไปนั่งเรียนตรงที่สัญญาณดี","text":"เรียนทัน แต่เหนื่อยและเปลืองค่าเน็ต","effects":[{"stat":"know","d":2},{"money":-3,"unit":"wageDay"},{"stat":"health","d":-1}]},
    {"id":"work","label":"ช่วยงานบ้านไปด้วย ดูคลิปย้อนหลัง","text":"ได้ช่วยครอบครัว แต่ตามบทเรียนไม่ทัน","effects":[{"stat":"bond","d":3},{"stat":"know","d":-3}]}
   ]},

  {"id":"hl-diet","w":10,"cooldown":"once","title":"ติดรสจัด","body":"ส้มตำต้องเค็ม น้ำอัดลมต้องมีทุกมื้อ ผงชูรสใส่ทุกหม้อ","when":{"age":[18,35]},
   "choices":[
    {"id":"keep","label":"กินแบบเดิม อร่อยกว่า","text":"อร่อยทุกมื้อ ร่างกายยังไม่บอกอะไร","effects":[{"flag":"hl-saltySweet"},{"stat":"happy","d":2}]},
    {"id":"cut","label":"ลดเค็มลดหวาน","text":"จืดจนบ่นช่วงแรก แต่ค่อยๆ ชิน","effects":[{"flag":"hl-ateLight"},{"stat":"happy","d":-1},{"stat":"health","d":2}]}
   ]},
  {"id":"hl-diet-change","w":8,"cooldown":"once","title":"อสม. มาวัดความดัน","body":"อสม. ในหมู่บ้านมาวัดความดันถึงบ้าน บอกว่าตัวเลขเริ่มสูง","when":{"age":[35,50],"flag":{"hl-saltySweet":true}},
   "choices":[
    {"id":"change","label":"เชื่อ อสม. ปรับการกิน","text":"ลดน้ำปลา ลดน้ำหวาน เดินตอนเย็น","effects":[{"flag":"hl-saltySweet","v":false},{"flag":"hl-ateLight"},{"stat":"health","d":3},{"stat":"happy","d":-1}]},
    {"id":"ignore","label":"ยังไม่รู้สึกอะไร","text":"ขอบคุณ อสม. แล้วก็กินเหมือนเดิม","effects":[{"stat":"happy","d":1}]}
   ]},
  {"id":"hl-diabetes","w":12,"cooldown":"once","title":"หมอบอกเป็นเบาหวาน","body":"ไปตรวจเพราะเหนื่อยง่าย หมอบอกว่าน้ำตาลในเลือดสูงและความดันสูง","when":{"age":[45,80],"flag":{"hl-saltySweet":true}},
   "choices":[
    {"id":"treat","label":"กินยา คุมอาหารจริงจัง","text":"ต้องไปรับยาทุกเดือน แต่อาการค่อยๆ คงที่","effects":[{"flag":"hl-diabetes"},{"flag":"hl-saltySweet","v":false},{"stat":"health","d":-4},{"money":-5,"unit":"wageDay"},{"stat":"happy","d":-3}]},
    {"id":"skip","label":"กินยาบ้างไม่กินบ้าง","text":"ชีวิตไม่ต้องเปลี่ยนมาก แต่ร่างกายทรุดลงเรื่อยๆ","effects":[{"flag":"hl-diabetes"},{"stat":"health","d":-10},{"die":"illness","p":0.03}]}
   ]},
  {"id":"hl-pesticide","w":10,"cooldown":"once","title":"ฉีดยาฆ่าหญ้า","body":"ถึงหน้าฉีดยา คนข้างบ้านฉีดตัวเปล่า บอกว่าใส่หน้ากากแล้วร้อน","when":{"age":[16,60],"role":"farmer"},
   "choices":[
    {"id":"protect","label":"ใส่หน้ากาก ถุงมือ เสื้อแขนยาว","text":"ร้อนและช้ากว่าเดิม","effects":[{"flag":"hl-sprayedSafe"},{"stat":"happy","d":-1},{"money":-2,"unit":"wageDay"}]},
    {"id":"bare","label":"ฉีดตัวเปล่าเหมือนคนอื่น","text":"เสร็จเร็ว ไม่ร้อน แต่ปวดหัวทุกครั้งหลังฉีด","effects":[{"flag":"hl-sprayedBare"},{"stat":"health","d":-2}]},
    {"id":"hire","label":"จ้างคนอื่นฉีดแทน","text":"เสียเงินเพิ่ม แต่ไม่ต้องสัมผัสเอง","effects":[{"money":-6,"unit":"wageDay"}]}
   ]},
  {"id":"hl-pesticide-later","w":10,"cooldown":"once","title":"ผลตรวจเลือด","body":"โรงพยาบาลตรวจสารเคมีในเลือดเกษตรกร ค่าของเราอยู่ในเกณฑ์เสี่ยง","when":{"age":[40,75],"flag":{"hl-sprayedBare":true}},
   "choices":[
    {"id":"stop","label":"เลิกฉีดเอง เปลี่ยนวิธีทำนา","text":"ผลผลิตลดลงบ้าง ร่างกายค่อยๆ ดีขึ้น","effects":[{"flag":"hl-sprayedBare","v":false},{"money":-8,"unit":"wageDay"},{"stat":"health","d":3}]},
    {"id":"go","label":"ทำต่อแบบเดิม","text":"ยังต้องทำกินเหมือนเดิม อาการเรื้อรังเพิ่มขึ้น","effects":[{"stat":"health","d":-8},{"die":"illness","p":0.02}]}
   ]},
  {"id":"hl-smoke","w":8,"cooldown":"once","title":"บุหรี่มวนแรก","body":"ตอนนั่งพักกับเพื่อน เพื่อนยื่นยาเส้นมวนให้ บอกว่าช่วยหายเหนื่อย","when":{"age":[15,30]},
   "choices":[
    {"id":"smoke","label":"สูบตามเพื่อน","text":"เข้ากลุ่มได้ง่าย แต่เริ่มติด","effects":[{"flag":"hl-smoker"},{"trait":"social","d":1},{"stat":"health","d":-2}]},
    {"id":"no","label":"ปฏิเสธ","text":"เพื่อนแซวนิดหน่อย แล้วก็ลืมไป","effects":[{"stat":"health","d":1}]}
   ]},
  {"id":"hl-quit-smoke","w":10,"cooldown":12,"title":"ไอไม่หยุด","body":"ไอเรื้อรังมาหลายเดือน คนใกล้ตัวบอกว่าไม่ชอบกลิ่นบุหรี่","when":{"age":[30,80],"flag":{"hl-smoker":true}},
   "choices":[
    {"id":"quit","label":"ตั้งใจเลิก","text":"หงุดหงิดหลายอาทิตย์ แต่หายใจโล่งขึ้น","effects":[{"flag":"hl-smoker","v":false},{"stat":"happy","d":-3},{"stat":"health","d":5},{"money":3,"unit":"wageDay"}]},
    {"id":"keep","label":"สูบต่อ","text":"ยังช่วยคลายเครียด แต่ปอดแย่ลง","effects":[{"stat":"health","d":-5},{"die":"illness","p":0.02}]}
   ]},
  {"id":"hl-sun-back","w":8,"cooldown":12,"title":"ปวดหลังจากงานหนัก","body":"ทำงานหนักกลางแดดทั้งวัน ตกเย็นหลังแข็งจนลุกไม่ขึ้น","when":{"age":[30,70],"role":["farmer","construction"]},
   "choices":[
    {"id":"rest","label":"พักสองสามวัน","text":"งานช้าลง แต่หลังดีขึ้น","effects":[{"stat":"health","d":3},{"money":-3,"unit":"wageDay"}]},
    {"id":"pills","label":"กินยาแก้ปวดแล้วทำต่อ","text":"งานเสร็จทัน แต่อาการกลับมาบ่อยขึ้น","effects":[{"stat":"health","d":-3}]}
   ]},
  {"id":"hl-exercise","w":8,"cooldown":12,"title":"แอโรบิกลานวัด","body":"ตอนเย็นมีเต้นแอโรบิกที่ลานวัด เพื่อนบ้านชวนไปด้วย","when":{"age":[25,70],"year":[1995,2026],"loc":"isan"},
   "choices":[
    {"id":"join","label":"ไปเต้นทุกเย็น","text":"เหนื่อยแต่สนุก ได้เพื่อนใหม่","effects":[{"stat":"health","d":3},{"trait":"social","d":1}]},
    {"id":"tv","label":"อยู่บ้านดูละคร","text":"ได้พัก แต่ตัวหนักขึ้นเรื่อยๆ","effects":[{"stat":"happy","d":1},{"stat":"health","d":-1}]}
   ]},
  {"id":"hl-30baht","w":10,"cooldown":"once","title":"บัตรทอง 30 บาท","body":"รัฐบาลเริ่มโครงการ 30 บาทรักษาทุกโรค ไปหาหมอได้โดยไม่ต้องกลัวค่ารักษา","when":{"year":[2002,2004],"age":[15,80]},
   "choices":[
    {"id":"checkup","label":"ไปตรวจอาการที่ค้างไว้","text":"รอคิวครึ่งวัน แต่ได้รู้ว่าเป็นอะไรและได้ยา","effects":[{"flag":"hl-goesToDoctor"},{"stat":"health","d":4},{"stat":"happy","d":2}]},
    {"id":"wait","label":"ยังไม่ป่วยหนัก รอไว้ก่อน","text":"ไม่เสียเวลารอคิว ร่างกายยังไหว","effects":[]}
   ]},
  {"id":"hl-healer","w":8,"cooldown":12,"title":"หมอพื้นบ้านหรือโรงพยาบาล","body":"ไข้ไม่ลดหลายวัน ญาติแนะนำหมอพื้นบ้านในหมู่บ้าน โรงพยาบาลอยู่ไกล","when":{"age":[10,80],"loc":"isan","setting":"rural"},
   "choices":[
    {"id":"healer","label":"ไปหาหมอพื้นบ้าน","text":"สบายใจที่ได้ทำพิธี","effects":[{"stat":"happy","d":2}],"roll":[{"p":0.6,"text":"พักผ่อนไม่กี่วันก็หายดี","effects":[{"stat":"health","d":1}]},{"p":0.4,"text":"อาการไม่ดีขึ้น ต้องไปโรงพยาบาลอยู่ดี","effects":[{"stat":"health","d":-4},{"money":-4,"unit":"wageDay"}]}]},
    {"id":"hospital","label":"ไปโรงพยาบาล","text":"เดินทางไกลเสียค่ารถ แต่ได้ยาตรงอาการ","effects":[{"money":-3,"unit":"wageDay"},{"stat":"health","d":3}]}
   ]},
  {"id":"hl-osm","w":6,"cooldown":"once","title":"ถูกชวนเป็น อสม.","body":"ผู้ใหญ่บ้านชวนให้เป็นอาสาสมัครสาธารณสุขประจำหมู่บ้าน ต้องเดินเยี่ยมบ้านและอบรม","when":{"age":[30,60],"loc":"isan"},
   "choices":[
    {"id":"yes","label":"รับเป็น อสม.","text":"เสียเวลางานบ้าง แต่คนทั้งหมู่บ้านรู้จักและไว้ใจ","effects":[{"flag":"hl-osm"},{"stat":"know","d":3},{"trait":"social","d":2},{"money":-3,"unit":"wageDay"},{"pin":"เป็น อสม. ประจำหมู่บ้าน"}]},
    {"id":"no","label":"ขอปฏิเสธ","text":"มีเวลาทำมาหากินเต็มที่","effects":[{"money":2,"unit":"wageDay"}]}
   ]},
  {"id":"hl-debt-stress","w":10,"cooldown":12,"title":"นอนไม่หลับเพราะหนี้","body":"ค่างวดหลายทางชนกัน นอนตาค้างทุกคืน","when":{"cond":["indebted"],"age":[20,80]},
   "choices":[
    {"id":"talk","label":"เล่าให้คนในบ้านฟัง","text":"ยังไม่หายหนี้ แต่ไม่ต้องแบกคนเดียว","effects":[{"stat":"happy","d":3},{"stat":"bond","d":2}]},
    {"id":"clinic","label":"ไปคุยกับหมอที่ รพ.สต.","text":"หมอฟังอย่างตั้งใจ แนะนำวิธีนอนและที่ปรึกษาเรื่องหนี้","effects":[{"stat":"health","d":2},{"stat":"happy","d":2},{"money":-1,"unit":"wageDay"}]},
    {"id":"hold","label":"เก็บไว้คนเดียว","text":"ทำงานหนักขึ้นเพื่อจ่ายหนี้ ร่างกายเริ่มประท้วง","effects":[{"stat":"health","d":-3},{"stat":"happy","d":-3}]}
   ]},
  {"id":"hl-elder-lonely","w":10,"cooldown":12,"title":"วันยาวๆ ของคนแก่","body":"คนใกล้ตัวต่างมีภาระ วันหนึ่งพูดกับคนแทบนับคำได้","when":{"age":[62,90]},
   "choices":[
    {"id":"club","label":"ไปชมรมผู้สูงอายุ","text":"ได้รำวง ได้คุย ได้หัวเราะกับคนรุ่นเดียวกัน","effects":[{"stat":"happy","d":4},{"uncond":"lonely"}]},
    {"id":"call","label":"โทรหาคนรู้จัก","text":"คนรู้จักดีใจที่ได้ยินเสียง และชวนคุยกันนานขึ้น","effects":[{"stat":"bond","d":3},{"stat":"happy","d":2}]},
    {"id":"alone","label":"อยู่เงียบๆ คนเดียว","text":"สงบดี แต่บางวันก็เหงาจับใจ","effects":[{"cond":"lonely","turns":3}]}
   ]}
]);
KI.data.decisions.unshift(...[
  {"id":"family-ask-father","urgent":true,"title":"ทำไมเราไม่มีพ่ออยู่ด้วย","body":"เมื่อเห็นเพื่อนอยู่กับพ่อ คุณนึกสงสัยเรื่องพ่อที่ไม่ได้อยู่ด้วยตั้งแต่ยังเล็ก","when":{"age":[8,18],"flag":{"missingFatherEarly":true}},"cooldown":"once","choices":[{"id":"ask","label":"ถามคนที่เลี้ยงดูเรา","text":"คนที่ดูแลเล่าเรื่องพ่อเท่าที่รู้ และรับฟังความรู้สึกของคุณ","effects":[{"stat":"bond","d":3},{"pin":"ถามเรื่องพ่อกับคนที่ดูแล"}]},{"id":"remember","label":"ขอดูรูปหรือฟังเรื่องของพ่อ","text":"คุณได้เก็บความทรงจำจากเรื่องเล่าของคนในบ้าน","effects":[{"stat":"happy","d":2}]},{"id":"later","label":"ยังไม่พร้อมถาม","text":"คุณเก็บคำถามไว้ก่อน และรู้ว่ากลับมาคุยเมื่อพร้อมได้","effects":[]}]},
  {"id":"family-ask-mother","urgent":true,"title":"ทำไมเราไม่มีแม่อยู่ด้วย","body":"เมื่อเห็นเพื่อนอยู่กับแม่ คุณนึกสงสัยเรื่องแม่ที่ไม่ได้อยู่ด้วยตั้งแต่ยังเล็ก","when":{"age":[8,18],"flag":{"missingMotherEarly":true}},"cooldown":"once","choices":[{"id":"ask","label":"ถามคนที่เลี้ยงดูเรา","text":"คนที่ดูแลเล่าเรื่องแม่เท่าที่รู้ และรับฟังความรู้สึกของคุณ","effects":[{"stat":"bond","d":3},{"pin":"ถามเรื่องแม่กับคนที่ดูแล"}]},{"id":"remember","label":"ขอดูรูปหรือฟังเรื่องของแม่","text":"คุณได้เก็บความทรงจำจากเรื่องเล่าของคนในบ้าน","effects":[{"stat":"happy","d":2}]},{"id":"later","label":"ยังไม่พร้อมถาม","text":"คุณเก็บคำถามไว้ก่อน และรู้ว่ากลับมาคุยเมื่อพร้อมได้","effects":[]}]},
  {"id":"physical-disability-accident","urgent":true,"title":"ชีวิตหลังอุบัติเหตุ","body":"อุบัติเหตุทำให้การเคลื่อนไหวเปลี่ยนไป คุณต้องปรับตัวและวางแผนการใช้ชีวิตต่อ","when":{"flag":{"disabilityAccidentPending":true}},"cooldown":"once","choices":[{"id":"rehab","label":"ขอคำปรึกษาและฝึกฟื้นฟู","text":"คุณเริ่มหาวิธีใช้ชีวิตที่เหมาะกับร่างกายและความต้องการของตัวเอง","effects":[{"flag":"disabilityAccidentPending","v":false},{"stat":"health","d":2},{"pin":"ปรับตัวหลังอุบัติเหตุ"}]},{"id":"family","label":"ขอให้คนใกล้ตัวช่วยวางแผน","text":"คุณกับคนใกล้ตัวช่วยกันหาทางปรับชีวิตประจำวัน","effects":[{"flag":"disabilityAccidentPending","v":false},{"stat":"bond","d":3},{"pin":"ปรับตัวหลังอุบัติเหตุ"}]}]},
  {"id":"fam-father-passed","urgent":true,"title":"พ่อจากไป","body":"พ่อจากไปอย่างสงบ ญาติพี่น้องมารวมกันที่บ้าน จัดงานศพตามประเพณี","when":{"flag":{"parentPassed":"พ่อ"}},"major":true,"choices":[{"id":"near","label":"อยู่ใกล้ครอบครัว ช่วยงานศพจนเสร็จ","text":"ได้ร่วมส่งพ่อเป็นครั้งสุดท้าย และได้อยู่กับคนในบ้าน","effects":[{"flag":"parentPassed","v":false},{"stat":"happy","d":-15,"by":"attach"},{"cond":"grieving","turns":3,"by":"attach"},{"stat":"bond","d":5},{"pin":"พ่อจากไป"}]},{"id":"pay","label":"ออกค่างานศพให้เต็มที่","text":"งานศพสมเกียรติ แต่เงินเก็บหายไปมาก","when":{"age":[20,100]},"effects":[{"flag":"parentPassed","v":false},{"money":-40,"unit":"wageDay"},{"stat":"happy","d":-12,"by":"attach"},{"cond":"grieving","turns":3,"by":"attach"},{"stat":"bond","d":6},{"pin":"พ่อจากไป"}]},{"id":"work","label":"กลับไปทำงานเร็ว เก็บความเศร้าไว้ข้างใน","text":"งานไม่สะดุด แต่ความเศร้ายังค้างอยู่นาน","when":{"age":[18,100]},"effects":[{"flag":"parentPassed","v":false},{"stat":"happy","d":-10,"by":"attach"},{"cond":"grieving","turns":5,"by":"attach"},{"stat":"bond","d":-3},{"pin":"พ่อจากไป"}]}]},
  {"id":"fam-mother-passed","urgent":true,"title":"แม่จากไป","body":"แม่จากไปอย่างสงบ ญาติพี่น้องมารวมกันที่บ้าน จัดงานศพตามประเพณี","when":{"flag":{"parentPassed":"แม่"}},"major":true,"choices":[{"id":"near","label":"อยู่ใกล้ครอบครัว ช่วยงานศพจนเสร็จ","text":"ได้ร่วมส่งแม่เป็นครั้งสุดท้าย และได้อยู่กับคนในบ้าน","effects":[{"flag":"parentPassed","v":false},{"stat":"happy","d":-15,"by":"attach"},{"cond":"grieving","turns":3,"by":"attach"},{"stat":"bond","d":5},{"pin":"แม่จากไป"}]},{"id":"pay","label":"ออกค่างานศพให้เต็มที่","text":"งานศพสมเกียรติ แต่เงินเก็บหายไปมาก","when":{"age":[20,100]},"effects":[{"flag":"parentPassed","v":false},{"money":-40,"unit":"wageDay"},{"stat":"happy","d":-12,"by":"attach"},{"cond":"grieving","turns":3,"by":"attach"},{"stat":"bond","d":6},{"pin":"แม่จากไป"}]},{"id":"work","label":"กลับไปทำงานเร็ว เก็บความเศร้าไว้ข้างใน","text":"งานไม่สะดุด แต่ความเศร้ายังค้างอยู่นาน","when":{"age":[18,100]},"effects":[{"flag":"parentPassed","v":false},{"stat":"happy","d":-10,"by":"attach"},{"cond":"grieving","turns":5,"by":"attach"},{"stat":"bond","d":-3},{"pin":"แม่จากไป"}]}]}
]);
