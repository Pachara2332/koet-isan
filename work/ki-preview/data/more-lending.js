globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.personalEvents.push(...[
  {"id":"lend-kid-ask","title":"ลูกขอเงิน","body":"ลูกโทรมาขอเงินบอกว่าเดือนนี้ไม่พอใช้ ค่าห้อง ค่ากินแพงขึ้นทุกอย่าง","w":14,"when":{"flag":{"child":true},"childAge":[18,40],"chance":0.3},"cooldown":9,"choices":[
    {"id":"give","label":"ให้ไปเลย ไม่ต้องคืน","text":"ลูกขอบคุณยกใหญ่","when":{"money":[1000,999999999]},"effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":3},{"inc":"spoil"}]},
    {"id":"lend","label":"ให้ยืม แล้วตกลงกันว่าต้องคืน","text":"ลูกรับปากจะทยอยคืน","when":{"money":[1000,999999999]},"effects":[{"money":-8,"unit":"wageDay"},{"flag":"lend-kid","v":true},{"inc":"firm"}]},
    {"id":"budget","label":"ไม่ให้เงิน แต่ช่วยวางแผนการใช้เงิน","text":"ลูกบ่นนิดหน่อย แต่ได้เรียนรู้","effects":[{"stat":"bond","d":-1},{"inc":"firm"}]},
    {"id":"no","label":"ปฏิเสธ ตัวเองก็ไม่มีเหมือนกัน","text":"ต่างคนต่างต้องดิ้นรน","effects":[{"stat":"bond","d":-3}]}]},
  {"id":"lend-kid-repay","title":"ลูกเอาเงินมาคืน","body":"ลูกโอนเงินที่ยืมไปคืนพร้อมข้อความขอบคุณ","w":20,"when":{"flag":{"lend-kid":true},"counter":{"firm":[2,99]},"chance":0.4},"cooldown":6,"effects":[{"flag":"lend-kid","v":false},{"money":8,"unit":"wageDay"},{"stat":"happy","d":3},{"stat":"bond","d":2}]},
  {"id":"lend-kid-norepay","title":"เงินที่ลูกยืมไปยังไม่ได้คืน","body":"ผ่านไปนานแล้ว ลูกยังไม่พูดถึงเงินที่ยืมไปเลย","w":14,"when":{"flag":{"lend-kid":true},"counter":{"firm":[0,3]},"chance":0.3},"cooldown":9,"choices":[
    {"id":"forgive","label":"ปล่อยไป ถือว่าให้","text":"สบายใจกว่าไปทวงลูก","effects":[{"flag":"lend-kid","v":false},{"stat":"happy","d":-1}]},
    {"id":"remind","label":"เตือนดีๆ ว่ายังไม่ได้คืน","text":"ลูกขอโทษและสัญญาว่าจะคืน","effects":[{"inc":"firm"}],"roll":[{"p":0.5,"text":"เดือนต่อมาลูกโอนมาคืนจริง","effects":[{"flag":"lend-kid","v":false},{"money":8,"unit":"wageDay"}]}]},
    {"id":"angry","label":"ทวงแรงๆ","text":"ได้เงินคืนบางส่วน แต่ลูกไม่ค่อยโทรมาอีก","effects":[{"flag":"lend-kid","v":false},{"money":4,"unit":"wageDay"},{"stat":"bond","d":-5}]}]},
  {"id":"lend-kid-dowry","title":"ลูกขอค่าสินสอด","body":"ลูกจะแต่งงาน มาปรึกษาว่าค่าสินสอดและค่าจัดงานไม่พอ อยากให้พ่อแม่ช่วย","w":16,"when":{"flag":{"child":true},"childAge":[22,38],"chance":0.3},"cooldown":"once","choices":[
    {"id":"full","label":"ออกให้เต็มที่ จัดงานให้สมเกียรติ","text":"งานแต่งใหญ่โต หน้าตาดีในหมู่บ้าน แต่เงินเก็บหายไปเยอะ","when":{"money":[1000,999999999]},"effects":[{"money":-120,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":4},{"pin":"ช่วยค่าสินสอดงานแต่งลูก"}]},
    {"id":"part","label":"ช่วยบางส่วน ที่เหลือให้ลูกหาเอง","text":"ลูกต้องเก็บเงินเพิ่มอีกพัก แต่ก็ได้แต่งตามแผน","when":{"money":[500,999999999]},"effects":[{"money":-40,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"loan","label":"ไปกู้มาให้ลูก","text":"งานแต่งผ่านไปด้วยดี แต่มีหนี้ต้องผ่อน","effects":[{"cond":"indebted","turns":8},{"stat":"bond","d":4}]},
    {"id":"small","label":"ชวนลูกคุยกับฝ่ายโน้นขอลดสินสอด จัดงานเล็กๆ","text":"สองครอบครัวตกลงกันได้ จัดงานพอดีตัว","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":2},{"inc":"firm"}]}]},
  {"id":"lend-relative","title":"ญาติมาขอยืมเงิน","body":"ญาติห่างๆ มาที่บ้าน บอกว่าลูกจะเข้าเรียนต่อ ขอยืมเงินก่อน สัญญาว่าหลังขายข้าวจะคืน","w":14,"when":{"age":[25,80],"money":[1000,999999999],"chance":0.25},"cooldown":12,"choices":[
    {"id":"lend","label":"ให้ยืมตามที่ขอ","text":"ญาติขอบคุณ","effects":[{"money":-15,"unit":"wageDay"},{"flag":"lend-relative","v":true},{"stat":"bond","d":3}]},
    {"id":"half","label":"ให้ครึ่งหนึ่ง ถือว่าช่วย ไม่ต้องคืน","text":"ไม่ต้องห่วงเรื่องทวง ญาติก็พอใจ","effects":[{"money":-7,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"paper","label":"ให้ยืม แต่ขอทำสัญญาเป็นลายลักษณ์อักษร","text":"ญาติหน้าเสียนิดหน่อย แต่เซ็นให้","effects":[{"money":-15,"unit":"wageDay"},{"flag":"lend-relative-paper","v":true},{"stat":"bond","d":-1}]},
    {"id":"no","label":"ปฏิเสธอย่างสุภาพ","text":"ญาติกลับไปเงียบๆ อาจมีคนนินทาบ้าง","effects":[{"stat":"bond","d":-3}]}]},
  {"id":"lend-relative-back","title":"เงินที่ญาติยืมไป","body":"ถึงหน้าเกี่ยวแล้ว ญาติขายข้าวได้ราคาพอสมควร","w":20,"when":{"any":[{"flag":{"lend-relative":true}},{"flag":{"lend-relative-paper":true}}],"season":2,"chance":0.5},"cooldown":3,"choices":[
    {"id":"wait","label":"รอให้ญาติเอามาคืนเอง","text":"รอดูว่าจะเป็นอย่างไร","effects":[],"roll":[{"p":0.5,"text":"ญาติเอาเงินมาคืนครบ","effects":[{"flag":"lend-relative","v":false},{"flag":"lend-relative-paper","v":false},{"money":15,"unit":"wageDay"},{"stat":"bond","d":2}]},{"p":0.5,"text":"ญาติเงียบ ไม่พูดถึงเลย","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"ask","label":"ไปทวงตามสัญญา","text":"เข้าไปคุยที่บ้านญาติ","when":{"flag":{"lend-relative-paper":true}},"effects":[{"flag":"lend-relative-paper","v":false},{"money":12,"unit":"wageDay"},{"stat":"bond","d":-2}]},
    {"id":"forgive","label":"ยกให้ ถือว่าทำบุญ","text":"สบายใจ ญาติซึ้งใจ","effects":[{"flag":"lend-relative","v":false},{"flag":"lend-relative-paper","v":false},{"stat":"bond","d":4},{"stat":"happy","d":1}]}]},
  {"id":"lend-parent","title":"พ่อแม่ขอยืมเงิน","body":"พ่อแม่โทรมาเสียงเกรงใจ บอกว่าต้องจ่ายค่าปุ๋ยและหนี้ ธ.ก.ส. ขอยืมก่อน","w":14,"when":{"age":[22,60],"flag":{"parentsAlive":true},"chance":0.25},"cooldown":12,"choices":[
    {"id":"give","label":"ส่งให้เลย ไม่ต้องคืน","text":"พ่อแม่ดีใจ บอกเพื่อนบ้านว่าลูกกตัญญู","when":{"money":[500,999999999]},"effects":[{"money":-12,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"happy","d":2}]},
    {"id":"part","label":"ส่งให้เท่าที่ไหว","text":"ช่วยได้บางส่วน พ่อแม่เข้าใจ","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"plan","label":"ช่วยพ่อแม่วางแผนปลดหนี้ ไม่ให้กู้เพิ่ม","text":"ใช้เวลาคุยกันนาน แต่ระยะยาวดีกว่า","effects":[{"money":-3,"unit":"wageDay"},{"stat":"know","d":1},{"stat":"bond","d":2},{"inc":"responsible"}]},
    {"id":"no","label":"บอกว่าตัวเองก็ลำบาก","text":"พ่อแม่ไปยืมคนอื่นแทน ใจคอไม่ดี","effects":[{"stat":"bond","d":-4},{"stat":"happy","d":-2,"by":"attach"}]}]},
  {"id":"lend-sibling","title":"พี่น้องขอยืมเงิน","body":"พี่น้องโทรมาขอยืมเงินไปลงทุนเปิดร้าน บอกว่าถ้าไปได้ดีจะคืนพร้อมดอก","w":12,"when":{"age":[22,70],"flag":{"hasSiblings":true},"money":[1000,999999999],"chance":0.2},"cooldown":15,"choices":[
    {"id":"lend","label":"ให้ยืม เชื่อใจพี่น้อง","text":"โอนให้ไป หวังว่าจะไปได้ดี","effects":[{"money":-25,"unit":"wageDay"}],"roll":[{"p":0.5,"text":"ร้านไปได้ดี พี่น้องคืนเงินพร้อมของฝาก","effects":[{"money":30,"unit":"wageDay"},{"stat":"bond","d":4}]},{"p":0.5,"text":"ร้านเจ๊ง เงินไม่ได้คืน แต่ยังเป็นพี่น้องกัน","effects":[{"stat":"happy","d":-4}]}]},
    {"id":"partner","label":"ขอเข้าหุ้นแทนการให้ยืม","text":"กลายเป็นหุ้นส่วนกัน","effects":[{"money":-25,"unit":"wageDay"}],"roll":[{"p":0.45,"text":"ร้านมีกำไร ได้ส่วนแบ่งทุกปี","effects":[{"money":45,"unit":"wageDay"},{"stat":"bond","d":2}]},{"p":0.55,"text":"ร้านขาดทุน ทะเลาะกันเรื่องเงิน","effects":[{"stat":"bond","d":-5}]}]},
    {"id":"small","label":"ให้แค่เท่าที่เสียแล้วไม่เสียดาย","text":"ช่วยได้นิดหน่อย พี่น้องเข้าใจ","effects":[{"money":-6,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"no","label":"ปฏิเสธ เพราะเคยมีเรื่องเงินกันมาก่อน","text":"พี่น้องไม่พอใจอยู่พักหนึ่ง","effects":[{"stat":"bond","d":-3}]}]},
  {"id":"lend-friend-guarantor","title":"เพื่อนขอให้ค้ำประกัน","body":"เพื่อนสนิทจะกู้ซื้อรถ ขอให้ช่วยเซ็นค้ำประกันให้","w":10,"when":{"age":[22,60],"chance":0.15},"cooldown":"once","choices":[
    {"id":"sign","label":"เซ็นค้ำให้ เพราะเป็นเพื่อนกัน","text":"เพื่อนซึ้งใจมาก","effects":[{"stat":"bond","d":2}],"roll":[{"p":0.6,"text":"เพื่อนผ่อนจนหมด ไม่มีปัญหา","effects":[]},{"p":0.4,"text":"เพื่อนหนีหนี้ ธนาคารมาเรียกเก็บจากคุณ","effects":[{"money":-60,"unit":"wageDay"},{"stat":"happy","d":-8,"by":"attach"}]}]},
    {"id":"no","label":"ขอไม่ค้ำ แต่ช่วยหาทางอื่น","text":"เพื่อนเข้าใจบ้าง ไม่เข้าใจบ้าง","effects":[{"stat":"bond","d":-1}]},
    {"id":"cash","label":"ให้ยืมเงินดาวน์บางส่วนแทน","text":"ช่วยได้โดยไม่ต้องเอาชื่อไปผูก","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":1}]}]}
]);
