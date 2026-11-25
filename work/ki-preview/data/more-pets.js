globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.unshift(...[
  {"id":"pet-farewell","urgent":true,"title":"ลาก่อน {pet}","body":"{pet} อยู่ด้วยกันมาหลายปี วันนี้หลับไปอย่างสงบและไม่ตื่นขึ้นมาอีก บ้านดูเงียบลงกว่าทุกวัน","when":{"flag":{"pet-grief":true}},"cooldown":1,"major":false,
   "choices":[
    {"id":"bury","label":"หาที่ฝังให้อย่างดี","text":"คนในบ้านช่วยกันฝัง {pet} ไว้ใต้ร่มไม้ แล้ววางดอกไม้ไว้ให้","effects":[{"flag":"pet-grief","v":false},{"cond":"grieving","turns":2,"by":"attach"},{"stat":"happy","d":-3,"by":"attach"},{"stat":"bond","d":1}]},
    {"id":"merit","label":"ไปทำบุญตักบาตรอุทิศให้","text":"พระให้พร คนเฒ่าคนแก่บอกว่าความผูกพันดีๆ จะอยู่ในใจไปอีกนาน","effects":[{"flag":"pet-grief","v":false},{"cond":"grieving","turns":1,"by":"attach"},{"stat":"happy","d":-2,"by":"attach"}]},
    {"id":"keep","label":"เก็บปลอกคอไว้เป็นที่ระลึก","text":"ปลอกคอเก่าของ {pet} ถูกแขวนไว้ข้างประตู ทุกครั้งที่เห็นก็ยังคิดถึง","effects":[{"flag":"pet-grief","v":false},{"cond":"grieving","turns":3,"by":"attach"},{"stat":"happy","d":-3,"by":"attach"}]}
   ]}
]);
KI.data.decisions.push(...[
  {"id":"pet-adopt-kid","title":"อยากมีเพื่อนสี่ขา","body":"ช่วงนี้ใจห่อเหี่ยว เห็นเพื่อนเล่นกับหมาแมวที่บ้านแล้วอยากมีบ้าง บ้านข้างๆ เพิ่งมีลูกหมาออกใหม่ ส่วนที่วัดก็มีลูกแมวจรวิ่งเล่นอยู่","when":{"age":[6,14],"stat":{"happy":[0,59]},"noFlag":["pet-has"],"loc":["isan","bangkok"]},"cooldown":12,"major":false,"w":14,
   "choices":[
    {"id":"dog","label":"ขอรับลูกหมาของบ้านข้างๆ มาเลี้ยง","text":"ได้ลูกหมาตัวกลมมาหนึ่งตัว มันวิ่งตามต้อยๆ ไปทุกที่","effects":[{"money":-2,"unit":"wageDay"},{"pet":{"kind":"dog"}},{"stat":"happy","d":3}]},
    {"id":"cat","label":"ขออุ้มลูกแมวจรจากวัดมาเลี้ยง","text":"ลูกแมวขี้อายซุกตัวอยู่ในอ้อมแขนตลอดทางกลับบ้าน","effects":[{"money":-1,"unit":"wageDay"},{"pet":{"kind":"cat"}},{"stat":"happy","d":3}]},
    {"id":"later","label":"ยังไม่ขอดีกว่า","text":"เก็บความอยากไว้ในใจ ไว้โตกว่านี้ค่อยว่ากัน","effects":[]}
   ]},
  {"id":"pet-adopt-adult","title":"บ้านที่เงียบเกินไป","body":"ช่วงนี้ชีวิตเหนื่อยและเหงา กลับถึงบ้านก็เงียบ เพื่อนบ้านทักว่าหมาของเขาเพิ่งออกลูก ถ้าอยากได้ก็มาเลือกไปสักตัว","when":{"age":[15,85],"stat":{"happy":[0,59]},"noFlag":["pet-has"],"loc":["isan","bangkok"]},"cooldown":12,"major":false,"w":12,
   "choices":[
    {"id":"dog","label":"รับลูกหมาของเพื่อนบ้านมาเลี้ยง","text":"ลูกหมาตัวน้อยทำให้บ้านมีเสียงหัวเราะขึ้นมาอีกครั้ง แต่ก็ต้องเจียดเงินซื้อข้าวซื้อยาให้","effects":[{"money":-2,"unit":"wageDay"},{"pet":{"kind":"dog"}},{"stat":"happy","d":3}]},
    {"id":"cat","label":"ไปรับลูกแมวจรที่วัดมาเลี้ยง","text":"หลวงพ่อยิ้มดีใจที่ลูกแมวได้บ้าน มันเลือกนอนบนตักตั้งแต่คืนแรก","effects":[{"money":-1,"unit":"wageDay"},{"pet":{"kind":"cat"}},{"stat":"happy","d":3}]},
    {"id":"market","label":"ซื้อลูกหมาพันธุ์จากตลาดนัดในเมือง","when":{"year":[1995,2040]},"text":"ได้ลูกหมาขนฟูมาหนึ่งตัว ราคาแพงกว่าที่คิด แต่ก็หลงรักตั้งแต่แรกเห็น","effects":[{"money":-12,"unit":"wageDay"},{"pet":{"kind":"dog"}},{"stat":"happy","d":4}]},
    {"id":"later","label":"ยังไม่พร้อมดูแล","text":"รู้ตัวว่ายังไม่มีเวลาและเงินพอจะดูแลอีกหนึ่งชีวิต เลยตัดใจไว้ก่อน","effects":[]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"pet-stray-cat","title":"ลูกแมวหลงมาหน้าบ้าน","body":"คืนฝนตก มีลูกแมวตัวเล็กเปียกโชกมานั่งร้องอยู่หน้าประตู","when":{"age":[6,85],"noFlag":["pet-has"],"loc":["isan","bangkok"]},"cooldown":24,"w":3,
   "choices":[
    {"id":"keep","label":"รับไว้เลี้ยงเอง","text":"เช็ดตัวให้แห้งแล้วหานมให้กิน ลูกแมวตัวนั้นไม่ยอมไปไหนอีกเลย","effects":[{"money":-1,"unit":"wageDay"},{"pet":{"kind":"cat"}},{"stat":"happy","d":2}]},
    {"id":"neighbour","label":"ป้อนนมแล้วพาไปให้ป้าข้างบ้านที่อยากได้แมว","text":"ป้าข้างบ้านดีใจมาก ฝากขนมมาให้เป็นการขอบคุณ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1}]}
   ]},
  {"id":"pet-stray-dog","title":"หมาจรเดินตามกลับบ้าน","body":"ขากลับจากวัด มีหมาจรผอมๆ ตัวหนึ่งเดินตามมาห่างๆ จนถึงหน้าบ้าน","when":{"age":[6,85],"noFlag":["pet-has"],"loc":["isan","bangkok"]},"cooldown":24,"w":3,
   "choices":[
    {"id":"keep","label":"ให้ข้าวแล้วรับไว้เลี้ยง","text":"หมาจรกินข้าวหมดชามแล้วนอนเฝ้าหน้าบ้านตั้งแต่คืนนั้น","effects":[{"money":-2,"unit":"wageDay"},{"pet":{"kind":"dog","age":1}},{"stat":"happy","d":2}]},
    {"id":"feed","label":"ให้ข้าวมื้อหนึ่งแล้วปล่อยไป","text":"มันกินอิ่มแล้วเดินกลับไปทางวัด ใจหนึ่งก็อดเป็นห่วงไม่ได้","effects":[{"stat":"happy","d":1}]}
   ]},
  {"id":"pet-vet","title":"{pet} ไม่สบาย","body":"{pet} นอนซม ไม่ยอมกินข้าวมาสองวันแล้ว","when":{"age":[6,95],"flag":{"pet-has":true},"noFlag":["pet-grief"]},"cooldown":15,"w":6,
   "choices":[
    {"id":"vet","label":"พาไปหาหมอรักษาสัตว์ในอำเภอ","text":"หมอฉีดยาและให้ยากลับมา ไม่กี่วัน {pet} ก็กลับมาวิ่งเล่นได้","effects":[{"money":-6,"unit":"wageDay"},{"stat":"happy","d":2}]},
    {"id":"home","label":"ดูแลเองที่บ้าน ป้อนน้ำป้อนข้าว","text":"เฝ้าดูแลอยู่หลายคืน","effects":[{"stat":"health","d":-1}],
     "roll":[{"p":0.6,"text":"ในที่สุด {pet} ก็ค่อยๆ ลุกขึ้นมากินข้าวได้","effects":[{"stat":"happy","d":1}]},{"p":0.4,"text":"{pet} หายช้าและดูอ่อนแรงลงกว่าเดิม","effects":[{"pet":{"life":-2}},{"stat":"happy","d":-2}]}]}
   ]},
  {"id":"pet-litter","title":"{pet} ออกลูก","body":"{pet} คลอดลูกตัวเล็กๆ ห้าตัวในมุมห้องเก็บของ เสียงร้องดังทั้งคืน","when":{"age":[8,95],"flag":{"pet-has":true},"noFlag":["pet-grief"],"chance":0.5},"cooldown":24,"w":4,
   "choices":[
    {"id":"give","label":"แจกให้เพื่อนบ้านที่อยากเลี้ยง","text":"ลูกๆ ของ {pet} ได้บ้านใหม่ครบทุกตัว เพื่อนบ้านแวะมาขอบคุณ","effects":[{"stat":"bond","d":3},{"stat":"happy","d":1}]},
    {"id":"keep-dog","label":"เก็บลูกหมาไว้เลี้ยงเองหนึ่งตัว","when":{"flag":{"pet-dog":true}},"text":"แจกตัวอื่นไป เหลือตัวเล็กสุดไว้อยู่กับแม่","effects":[{"money":-1,"unit":"wageDay"},{"pet":{"kind":"dog"}},{"stat":"happy","d":2}]},
    {"id":"keep-cat","label":"เก็บลูกแมวไว้เลี้ยงเองหนึ่งตัว","when":{"flag":{"pet-cat":true}},"text":"แจกตัวอื่นไป เหลือตัวที่ซนที่สุดไว้ในบ้าน","effects":[{"money":-1,"unit":"wageDay"},{"pet":{"kind":"cat"}},{"stat":"happy","d":2}]},
    {"id":"spay","label":"แจกลูกแล้วพาแม่ไปทำหมัน","when":{"year":[2000,2040]},"text":"เสียเงินก้อนหนึ่ง แต่ไม่ต้องห่วงว่าจะมีลูกหมาลูกแมวเกินกำลังเลี้ยงอีก","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":2}]}
   ]},
  {"id":"pet-lost","title":"{pet} หายไป","body":"{pet} ออกจากบ้านไปตั้งแต่เมื่อวานแล้วยังไม่กลับ","when":{"age":[6,95],"flag":{"pet-has":true},"noFlag":["pet-grief"]},"cooldown":18,"w":5,
   "choices":[
    {"id":"search","label":"เดินตามหาทั่วหมู่บ้าน ถามเพื่อนบ้าน","text":"เดินจนขาล้า","effects":[{"stat":"health","d":-1}],
     "roll":[{"p":0.85,"text":"แล้วก็เจอ {pet} นอนอยู่ใต้ต้นไม้ท้ายหมู่บ้าน","effects":[{"stat":"happy","d":3}]},{"p":0.15,"text":"หาไม่เจอ แต่สามวันต่อมา {pet} ก็เดินกลับมาเองทั้งที่ผอมลง","effects":[{"stat":"happy","d":1}]}]},
    {"id":"post","label":"ประกาศตามหาในกลุ่มเฟซบุ๊กของหมู่บ้าน","when":{"year":[2012,2040],"age":[13,95]},"text":"มีคนแชร์ต่อกันหลายสิบครั้ง","effects":[],
     "roll":[{"p":0.8,"text":"คนในตำบลถ่ายรูปส่งมาว่าเห็น {pet} อยู่ที่ตลาด รีบไปรับกลับทันที","effects":[{"stat":"bond","d":2},{"stat":"happy","d":2}]},{"p":0.2,"text":"ไม่มีใครเห็น แต่สองวันต่อมา {pet} ก็กลับมาเอง","effects":[{"stat":"happy","d":1}]}]},
    {"id":"wait","label":"รอที่บ้าน เชื่อว่าเดี๋ยวก็กลับ","text":"นั่งรออยู่หน้าบ้านทุกเย็น","effects":[],
     "roll":[{"p":0.7,"text":"เช้าวันที่สาม {pet} ก็กลับมาส่ายหางอยู่หน้าประตู","effects":[{"stat":"happy","d":2}]},{"p":0.3,"text":"{pet} กลับมาพร้อมแผลที่ขา ต้องพักฟื้นอยู่นาน","effects":[{"pet":{"life":-1}},{"stat":"happy","d":-2}]}]}
   ]},
  {"id":"pet-dog-guard","title":"{dog} เห่ากลางดึก","body":"คืนหนึ่ง {dog} เห่าลั่นจนคนในบ้านตื่น พอเปิดไฟดูก็เห็นคนแปลกหน้ารีบเดินหนีออกไปจากรั้ว","when":{"age":[6,95],"flag":{"pet-dog":true},"noFlag":["pet-grief"]},"cooldown":18,"w":5,
   "choices":[
    {"id":"reward","label":"ให้ข้าวเหนียวกับกระดูกไก่เป็นรางวัล","text":"{dog} กินอย่างภูมิใจ ทั้งบ้านชมกันไม่ขาดปาก","effects":[{"stat":"happy","d":3}]},
    {"id":"warn","label":"บอกผู้ใหญ่บ้านให้คนในหมู่บ้านช่วยกันระวัง","text":"เพื่อนบ้านผลัดกันสอดส่องดูแล ซอยนี้ปลอดภัยขึ้น","effects":[{"stat":"bond","d":3},{"trait":"social","d":1}]},
    {"id":"tie","label":"ล่ามไว้ตอนกลางวัน กันไปเห่าใส่คนผ่านทาง","text":"เพื่อนบ้านสบายใจขึ้น แต่ {dog} ดูเหงาอยู่บ้าง","effects":[{"stat":"bond","d":2},{"stat":"happy","d":-1}]}
   ]},
  {"id":"pet-cat-mouse","title":"{cat} นักล่าแห่งยุ้งข้าว","body":"{cat} จับหนูในยุ้งข้าวได้ทีละตัวสองตัว ผู้ใหญ่ในบ้านชมว่าข้าวเสียหายน้อยลง","when":{"age":[6,95],"flag":{"pet-cat":true},"noFlag":["pet-grief"],"setting":"rural","loc":"isan"},"cooldown":15,"w":4,
   "effects":[{"stat":"happy","d":2},{"stat":"bond","d":1}]}
]);
