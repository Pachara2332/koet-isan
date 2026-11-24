globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"exp-budget","title":"ตั้งงบรายจ่ายในบ้าน","body":"สิ้นเดือนนั่งดูบัญชี เงินเข้าเท่าไหร่ ออกเท่าไหร่ ถึงเวลาตัดสินใจว่าจะใช้ชีวิตแบบไหน","when":{"age":[22,75],"role":["farmer","factory","construction","driver","civil","teacher","office","trader","abroad","soldier","doctor","nurse","engineer","developer","police","lawyer","pharmacist","accountant","banker","chef","mechanic","artist","creator","rider","security","housekeeper","athlete","designer","business","jobless","retired"],"chance":0.3},"cooldown":15,"major":true,"choices":[
    {"id":"frugal","label":"รัดเข็มขัด ใช้เท่าที่จำเป็น","text":"กินข้าวบ้าน งดของฟุ่มเฟือย รายจ่ายลดลงราว 15%","effects":[{"flag":"spendLevel","v":"frugal"},{"stat":"happy","d":-2}]},
    {"id":"normal","label":"ใช้ตามปกติ","text":"ไม่ฟุ่มเฟือย ไม่อดอยาก","effects":[{"flag":"spendLevel","v":false}]},
    {"id":"comfort","label":"ใช้ให้สบาย ชีวิตมีครั้งเดียว","text":"กินร้านบ้าง ซื้อของที่อยากได้บ้าง รายจ่ายเพิ่มราว 30%","effects":[{"flag":"spendLevel","v":"comfort"},{"stat":"happy","d":3}]}]},
  {"id":"exp-sib-tuition","title":"ค่าเทอมของน้อง","body":"น้องคนเล็กที่อายุห่างกันมากกำลังจะขึ้นชั้นใหม่ ค่าเทอม ค่าชุด ค่ารถ รวมกันแล้วไม่น้อย","when":{"age":[20,60],"flag":{"youngSibling":true},"noFlag":["exp-sibDone"],"chance":0.35},"cooldown":9,"major":true,"choices":[
    {"id":"all","label":"จ่ายให้น้องทั้งหมด","text":"โอนเงินไปให้ บอกน้องว่าตั้งใจเรียนก็พอ","effects":[{"money":-25,"unit":"wageDay"},{"stat":"bond","d":5},{"inc":"responsible"},{"stat":"happy","d":1}]},
    {"id":"half","label":"ช่วยพ่อแม่ครึ่งหนึ่ง","text":"แบ่งกันคนละครึ่งกับพ่อแม่","when":{"flag":{"parentsAlive":true}},"effects":[{"money":-12,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"raise","label":"รับน้องมาอยู่ด้วย ดูแลทุกอย่าง","text":"น้องย้ายมาเรียนในเมืองใกล้ที่ทำงาน ห้องแคบลงแต่อุ่นใจ","effects":[{"money":-40,"unit":"wageDay"},{"stat":"bond","d":8},{"stat":"happy","d":-1},{"inc":"responsible"},{"flag":"exp-sibDone"},{"pin":"รับน้องมาเลี้ยงดูส่งเรียน"}]},
    {"id":"no","label":"ไม่มีเงินพอจริงๆ","text":"บอกตรงๆ ว่าตัวเองก็ยังลำบาก","effects":[{"stat":"bond","d":-4}],"roll":[
      {"p":0.4,"text":"น้องต้องออกจากโรงเรียนไปทำงาน","effects":[{"stat":"happy","d":-5,"by":"attach"},{"cond":"crime-guilt","turns":2,"by":"attach"}]}]}]},
  {"id":"exp-orphan-raised","title":"พี่คือพ่อแม่","body":"ตั้งแต่พ่อแม่จากไป พี่คนโตต้องทำงานหนักเพื่อเลี้ยงดูน้อง เย็นนี้พี่กลับบ้านมาด้วยสีหน้าเหนื่อยล้า","when":{"age":[7,17],"flag":{"orphan":true,"elderSibling":true}},"cooldown":9,"major":true,"choices":[
    {"id":"help","label":"ช่วยงานบ้านและหารายได้เล็กๆ น้อยๆ","text":"เก็บผักไปขายตลาดเช้าก่อนไปโรงเรียน","effects":[{"money":2,"unit":"wageDay"},{"stat":"bond","d":4},{"stat":"know","d":-1},{"trait":"grit","d":2}]},
    {"id":"study","label":"ตั้งใจเรียนให้พี่ภูมิใจ","text":"เอาสมุดพกผลการเรียนดีๆ มาให้พี่ดู","effects":[{"stat":"know","d":3},{"stat":"bond","d":3}]},
    {"id":"rebel","label":"ประชดชีวิต ไม่ฟังใคร","text":"หนีเรียนไปเล่นกับเพื่อน พี่ได้แต่ถอนใจ","effects":[{"inc":"naughty"},{"stat":"bond","d":-5},{"stat":"happy","d":1}]}]},
  {"id":"exp-orphan-quit","title":"ออกจากโรงเรียนช่วยพี่","body":"พี่ป่วยทำงานไม่ได้หลายเดือน เงินในบ้านใกล้หมด","when":{"age":[12,17],"flag":{"orphan":true,"elderSibling":true},"edu":{"in":["school"]},"chance":0.4},"cooldown":"once","major":true,"heavy":true,"choices":[
    {"id":"quit","label":"ออกจากโรงเรียนไปทำงาน","text":"รับจ้างทั่วไปในหมู่บ้าน ได้ค่าแรงรายวัน","when":{"age":[15,17]},"effects":[{"edu":{"in":null,"grade":0}},{"role":"farmer"},{"money":8,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":-4},{"pin":"ออกจากโรงเรียนมาช่วยพี่"}]},
    {"id":"temple","label":"ไปขอความช่วยเหลือจากวัด","text":"หลวงพ่อให้กินข้าวที่วัด และฝากเรียนต่อ","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1},{"inc":"good"}]},
    {"id":"school","label":"ขอทุนจากโรงเรียน","text":"ครูพาไปยื่นขอทุนเด็กกำพร้า","effects":[],"roll":[
      {"p":0.6,"text":"ได้ทุนรายปี เรียนต่อได้","effects":[{"stat":"happy","d":4},{"stat":"know","d":2}]},
      {"p":0.4,"text":"ทุนเต็มแล้ว ต้องหาทางอื่น","effects":[{"stat":"happy","d":-3}]}]}]},
  {"id":"exp-repay-elder","title":"ตอบแทนพี่","body":"พี่คนโตที่ช่วยดูแลมาตั้งแต่เด็กอายุมากขึ้นแล้ว ตัวเองทำงานมีรายได้ ถึงเวลาตอบแทนบ้าง","when":{"age":[22,60],"flag":{"elderSibling":true},"chance":0.3},"cooldown":15,"choices":[
    {"id":"money","label":"ส่งเงินให้พี่ทุกเดือน","text":"พี่บอกว่าไม่ต้อง แต่ก็ยิ้มทั้งน้ำตา","effects":[{"money":-20,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":3}]},
    {"id":"house","label":"ซ่อมบ้านให้พี่","text":"เปลี่ยนหลังคาที่รั่วมาหลายปี","effects":[{"money":-35,"unit":"wageDay"},{"stat":"bond","d":8}]},
    {"id":"visit","label":"กลับไปเยี่ยมบ่อยขึ้น","text":"เดินทางกลับไปหาพี่ทุกเทศกาล","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":3}]}]},
  {"id":"exp-send-home","title":"ส่งเงินกลับบ้าน","body":"ที่บ้านโทรมาบอกว่าปีนี้ข้าวไม่ค่อยดี พ่อแม่อายุมากแล้ว","when":{"age":[20,60],"loc":["bangkok","abroad"],"flag":{"parentsAlive":true},"chance":0.4},"cooldown":6,"major":true,"choices":[
    {"id":"lot","label":"ส่งให้ก้อนใหญ่","text":"โอนไปเกือบครึ่งของเงินเก็บเดือนนี้","effects":[{"money":-25,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"happy","d":2}]},
    {"id":"some","label":"ส่งพอประมาณ","text":"ส่งไปพอให้ซื้อข้าวสารกับยา","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"none","label":"เดือนนี้ไม่ไหวจริงๆ","text":"ตัวเองก็ติดค่าเช่าห้องอยู่","effects":[{"stat":"bond","d":-3},{"stat":"happy","d":-2,"by":"attach"}]}]},
  {"id":"exp-parent-hospital","title":"ค่ารักษาพ่อแม่","body":"พ่อหรือแม่ล้มป่วยต้องนอนโรงพยาบาลหลายวัน ค่ายาและค่าห้องพิเศษเริ่มบานปลาย","when":{"age":[25,75],"flag":{"parentsAlive":true},"chance":0.2},"cooldown":12,"major":true,"choices":[
    {"id":"private","label":"ย้ายไปโรงพยาบาลเอกชน","text":"หมอเก่ง ห้องสบาย แต่ใบเสร็จยาวเหยียด","effects":[{"money":-60,"unit":"wageDay"},{"stat":"bond","d":5}],"roll":[{"p":0.8,"text":"อาการดีขึ้นจนกลับบ้านได้","effects":[{"stat":"happy","d":3}]}]},
    {"id":"public","label":"รักษาตามสิทธิ์ที่โรงพยาบาลรัฐ","text":"รอคิวนานแต่แทบไม่ต้องจ่าย ลางานไปเฝ้าไข้","when":{"year":[2002,9999]},"effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":3},{"stat":"health","d":-1}]},
    {"id":"old","label":"รักษาที่โรงพยาบาลอำเภอ จ่ายเอง","text":"ยุคนี้ยังไม่มีบัตรทอง ต้องควักเงินเก็บมาจ่ายเอง","when":{"year":[1970,2001]},"effects":[{"money":-25,"unit":"wageDay"},{"stat":"bond","d":3}]},
    {"id":"sibs","label":"เรียกพี่น้องมาช่วยกันออก","text":"หารกันทุกคน","when":{"flag":{"hasSiblings":true}},"effects":[{"money":-15,"unit":"wageDay"}],"roll":[
      {"p":0.6,"text":"ทุกคนช่วยกันเต็มที่","effects":[{"stat":"bond","d":4}]},
      {"p":0.4,"text":"บางคนบ่ายเบี่ยง จนทะเลาะกัน","effects":[{"stat":"bond","d":-4},{"money":-10,"unit":"wageDay"}]}]}]},
  {"id":"exp-envelopes","title":"ซองงานบุญเดือนนี้","body":"เดือนเดียวมีทั้งงานแต่ง งานบวช และงานศพคนในหมู่บ้าน การ์ดเชิญวางซ้อนกันบนโต๊ะ","when":{"age":[20,85],"chance":0.25},"cooldown":9,"choices":[
    {"id":"all","label":"ไปทุกงาน ใส่ซองเต็มที่","text":"หน้าตาไม่เสียกับใคร","effects":[{"money":-12,"unit":"wageDay"},{"stat":"bond","d":3},{"trait":"social","d":1}]},
    {"id":"some","label":"ไปเฉพาะงานคนสนิท","text":"ฝากซองไปกับเพื่อนสำหรับงานที่เหลือ","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"skip","label":"ไม่ไปสักงาน","text":"ประหยัดเงิน แต่มีคนเริ่มนินทา","effects":[{"stat":"bond","d":-3}]}]},
  {"id":"exp-bike-repair","title":"รถพัง","body":"รถที่ใช้ทุกวันสตาร์ทไม่ติด ช่างบอกว่าต้องเปลี่ยนอะไหล่หลายชิ้น","when":{"age":[18,75],"year":[1985,9999],"chance":0.2},"cooldown":9,"choices":[
    {"id":"fix","label":"ซ่อมให้ดีที่ศูนย์","text":"ใช้อะไหล่แท้ ขับได้อีกหลายปี","effects":[{"money":-10,"unit":"wageDay"}]},
    {"id":"cheap","label":"ซ่อมร้านข้างทางแบบประหยัด","text":"ถูกกว่าครึ่ง แต่ไม่แน่ใจว่าจะทนแค่ไหน","effects":[{"money":-4,"unit":"wageDay"}],"roll":[{"p":0.4,"text":"ผ่านไปไม่นานก็พังอีก","effects":[{"money":-6,"unit":"wageDay"},{"stat":"happy","d":-2}]}]},
    {"id":"new","label":"ดาวน์คันใหม่ ผ่อนเอา","text":"ได้รถใหม่ แต่มีค่างวดทุกเดือน","effects":[{"money":-25,"unit":"wageDay"},{"cond":"money-installment","turns":6},{"stat":"happy","d":3}]},
    {"id":"walk","label":"ไม่ซ่อม อาศัยรถคนอื่น","text":"ขอติดรถเพื่อนบ้านไปทำงาน","effects":[{"stat":"bond","d":-1},{"stat":"happy","d":-2}]}]},
  {"id":"exp-house-repair","title":"บ้านต้องซ่อม","body":"ฝนปีนี้หนัก หลังคารั่วหลายจุด ฝาบ้านไม้เริ่มผุ","when":{"age":[25,85],"setting":"rural","season":1,"chance":0.25},"cooldown":15,"choices":[
    {"id":"full","label":"เปลี่ยนหลังคาและฝาบ้านใหม่","text":"เปลี่ยนเป็นหลังคาเมทัลชีทกับผนังปูน","effects":[{"money":-50,"unit":"wageDay"},{"stat":"happy","d":4},{"stat":"health","d":1}]},
    {"id":"patch","label":"ซ่อมเฉพาะจุดที่รั่ว","text":"ปีนขึ้นหลังคาเองกับเพื่อนบ้าน","effects":[{"money":-8,"unit":"wageDay"}]},
    {"id":"wait","label":"เอากะละมังรองไว้ก่อน","text":"รอให้มีเงินก่อนค่อยว่ากัน","effects":[{"stat":"happy","d":-2},{"stat":"health","d":-1}]}]},
  {"id":"exp-kid-school","title":"ค่าใช้จ่ายเปิดเทอมของลูก","body":"เปิดเทอมใหม่ ลูกต้องการชุดนักเรียน รองเท้า หนังสือ และค่าบำรุงการศึกษา","when":{"childAge":[6,17],"season":1,"chance":0.5},"cooldown":3,"choices":[
    {"id":"new","label":"ซื้อของใหม่ให้ครบ","text":"ลูกยิ้มกว้างตอนลองชุดใหม่","effects":[{"money":-8,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"used","label":"ใช้ของต่อจากพี่หรือญาติ","text":"ชุดเก่าหน่อย แต่ยังใส่ได้","effects":[{"money":-2,"unit":"wageDay"},{"stat":"bond","d":-1}]},
    {"id":"tutor","label":"ซื้อครบ และส่งเรียนพิเศษเพิ่ม","text":"หวังให้ลูกสอบเข้าโรงเรียนดีๆ ได้","effects":[{"money":-20,"unit":"wageDay"},{"stat":"bond","d":1}]}]}
]);
