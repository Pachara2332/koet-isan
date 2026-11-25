globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const N = [{"inc":"naughty"}], G = [{"inc":"good"}], V = [{"inc":"vice"}], R = [{"inc":"responsible"}];
  const tag = {
    "child-friends/grab": N, "school-friends-activity/pond": N, "sea-khao-chi-kid/eat": N, "sea-khao-chi-kid/friends": N,
    "sea-dam-na-kid/play": N, "sea-harvest-kid/play": N, "fam-grand-morning/sleep": N, "fam-money-order/spend": N,
    "fam-sibling-fight/hold": N, "fam-parent-returns/test": N, "tech-tv-neighbour/go": N, "tech-netcafe/play": N,
    "tech-gamer-grades/keep": N, "tech-hi5/decorate": N, "hl-smoke/smoke": N, "sea-songkran/party": N,
    "sea-temple-fair/go": N, "sea-dam-na/skip": N, "sea-pradap-din/sleep": N, "sea-khao-chi/sleep": N,
    "helmet/nohelmet": N, "sea-songkran-kid/play": N, "sea-phawet-kid/fair": N, "sea-ok-phansa/friends": N, "sea-nang-klang/watch": N, "sea-molam/dance": N,
    "child-friends/share": G, "child-school-ready/help": G, "child-school-ready/count": G, "school-friends-activity/help": G,
    "school-friends-activity/read": G, "sea-khao-chi-kid/help": G, "sea-khao-chi-kid/homework": G, "sea-phawet-kid/listen": G,
    "sea-songkran-kid/elders": G, "sea-songkran-kid/temple": G, "sea-songkran/elders": G, "sea-dam-na-kid/help": G,
    "sea-dam-na-kid/both": G, "sea-harvest-kid/help": G, "fam-grand-morning/help": G, "fam-grand-morning/learn-cook": G,
    "fam-money-order/save": G, "fam-money-order/grand": G, "fam-sibling-fight/sorry": G, "fam-parent-returns/open": G,
    "tech-tv-neighbour/home": G, "tech-tv-neighbour/pay": G, "tech-netcafe/report": G, "tech-netcafe/skip": G,
    "tech-gamer-grades/quit": G, "tech-gamer-grades/deal": G, "sea-plough-buffalo/plough": G, "school-club/home": G,
    "school-club/study": G, "sea-harvest-hand/family": G, "wr-covid-school-2020/help": G, "wr-covid-school-2020/sheet": G,
    "enter-p1/books": G, "enter-p1/brave": G, "sea-cold-morning/help": G, "fam-grand-frail/stay": G, "fam-grand-frail/hospital": G,
    "drinking/heavy": V, "breakup/drink": V, "sea-khao-chi/drink": V, "sea-ok-phansa/drink": V, "sea-lai-ruea-fai/drink": V,
    "sea-ordination/drink": V, "sea-rot-hae/drink": V, "sea-idle/drink": V, "hl-debt-stress/drink": V, "drinker-warning/keep": V,
    "sea-bangfai/bet": V, "money-lottery/habit": V, "money-lottery-draw/keep": V, "remit-home/treat": V, "money-send-home/none": V,
    "money-loan-shark/take": V, "money-smartphone/install": V, "tech-smartphone/install": V, "money-village-fund/spend": V,
    "wr-village-fund-2001/spend": V, "fam-sibling-wedding/skip": V, "money-funeral/skip": V, "money-repay-parents/later": V,
    "hl-quit-smoke/keep": V, "fam-teen-rebel/leave": V,
    "drinker-warning/quit": R, "drinker-warning/less": R, "drinker-warning/help": R, "sea-khao-phansa/quit": R,
    "money-savings/save": R, "money-lottery-draw/quit": R, "money-lottery-draw/save": R, "remit-home/send": R, "remit-home/half": R,
    "money-send-home/some": R, "money-repay-parents/repay": R, "money-repay-parents/care": R, "fam-care-parents/go-home": R,
    "fam-care-parents/sibling-turn": R, "fam-care-parents/bring-parents": R, "parent-sick/care": R, "parent-sick/move": R,
    "wr-30baht-2002/go": R, "fam-parent-pension/send": R, "fam-parent-pension/buy-meds": R, "money-buy-gold/save": R,
    "money-chit-fund/bank": R, "career-kyorsor-pay/pay": R, "money-installment-late/talk": R, "money-shark-pressure/talk": R,
    "money-debt-clinic/go": R, "fam-teen-rebel/talk": R, "fam-teen-phone/rule": R, "family-day/together": R, "family-day/temple": R,
    "hl-quit-smoke/quit": R, "fam-sibling-wedding/labor": R, "money-funeral/small": R, "money-medical-30/take-leave": R,
    "money-medical-30/relay": R, "fam-become-grandparent-carer/take": R, "have-child/save": R, "sea-fishing/school": G, "sea-harvest-hand/study": G
  };
  for (const list of [KI.data.decisions, KI.data.personalEvents]) for (const item of list) for (const c of item.choices || []) if (tag[item.id + "/" + c.id]) c.effects = [...(c.effects || []), ...tag[item.id + "/" + c.id]];
})();
KI.data.personalEvents.push(...[
  {"id":"bhv-scold-kid","title":"โดนดุ","body":"ซนจนข้าวของในบ้านเลอะเทอะ พ่อแม่หรือผู้ใหญ่ในบ้านเรียกมายืนดุเสียงดัง","when":{"age":[4,12],"counter":{"naughty":[2,99]}},"w":14,"cooldown":6,
   "choices":[
    {"id":"sorry","label":"ยอมรับผิดและขอโทษ","text":"ผู้ใหญ่ถอนหายใจ แล้วให้ช่วยเก็บกวาดด้วยกัน","effects":[{"inc":"naughty","d":-1},{"stat":"bond","d":3},{"stat":"happy","d":-1}]},
    {"id":"grandma","label":"ร้องไห้หนีไปบ้านยาย","text":"ยายปลอบแล้วพากลับมาส่งตอนเย็น เรื่องยังไม่จบ","effects":[{"stat":"happy","d":-2},{"stat":"bond","d":-1}]},
    {"id":"argue","label":"เถียงกลับ","text":"ยิ่งเถียงยิ่งโดนหนัก คืนนั้นไม่มีใครคุยด้วย","effects":[{"inc":"naughty"},{"stat":"bond","d":-4},{"stat":"happy","d":-2}]},
    {"id":"sneak","label":"แอบหนีออกไปเล่นต่อ","text":"สนุกได้พักเดียว กลับมาเจอหน้าบึ้งรออยู่ที่ประตู","effects":[{"inc":"naughty"},{"stat":"happy","d":2},{"stat":"bond","d":-5}]}]},
  {"id":"bhv-switch-kid","title":"ไม้เรียวบนฝาบ้าน","body":"ดื้อซ้ำหลายรอบจนผู้ใหญ่ในบ้านหยิบไม้เรียวลงมา ตีเบาๆ ที่น่องสองสามที แล้วสั่งให้คิดดู","when":{"age":[5,12],"counter":{"naughty":[3,99]}},"w":14,"cooldown":9,"heavy":true,
   "choices":[
    {"id":"accept","label":"ยอมรับผิด สัญญาว่าจะไม่ทำอีก","text":"เย็นนั้นแม่เอาข้าวเหนียวมาให้ แล้วนั่งคุยกันเงียบๆ","effects":[{"inc":"naughty","d":-2},{"stat":"happy","d":-3},{"stat":"bond","d":1}]},
    {"id":"cry","label":"ร้องไห้หนีไปบ้านยาย","text":"ยายไม่ดุซ้ำ แต่ถามว่าทำไมต้องให้พ่อแม่เหนื่อยใจ","effects":[{"stat":"happy","d":-4,"by":"attach"},{"stat":"bond","d":-1}]},
    {"id":"argue","label":"เถียงว่าไม่ได้ผิด","text":"บ้านเงียบไปทั้งคืน ต่างคนต่างน้อยใจ","effects":[{"inc":"naughty"},{"stat":"bond","d":-5},{"stat":"happy","d":-3}]},
    {"id":"run","label":"แอบหนีออกจากบ้านตอนค่ำ","text":"เพื่อนบ้านช่วยกันตามหาจนเจอที่ศาลาวัด ผู้ใหญ่ทั้งโกรธทั้งโล่งใจ","effects":[{"inc":"naughty","d":2},{"stat":"bond","d":-6},{"stat":"happy","d":-2}]}]},
  {"id":"bhv-grandma-sent","title":"ส่งไปอยู่บ้านยาย","body":"ผู้ใหญ่ในบ้านบอกว่าดูแลไม่ไหวแล้ว ส่งไปอยู่บ้านยายช่วงปิดเทอมให้ช่วยงาน","when":{"age":[6,12],"counter":{"naughty":[3,99]}},"w":14,
   "choices":[
    {"id":"help","label":"ตั้งใจช่วยยายทำงาน","text":"ตื่นเช้านึ่งข้าว เลี้ยงไก่ ยายชมให้คนทั้งบ้านฟัง","effects":[{"inc":"naughty","d":-2},{"inc":"good"},{"stat":"bond","d":4},{"stat":"happy","d":-1}]},
    {"id":"sulk","label":"งอนไม่พูดกับใคร","text":"ปิดเทอมผ่านไปช้าๆ เหงาและเบื่อ","effects":[{"stat":"happy","d":-4},{"cond":"lonely","turns":2}]},
    {"id":"sneak","label":"แอบเดินกลับบ้านเอง","text":"เดินไกลจนค่ำ ผู้ใหญ่ต้องขี่รถออกตามหา","effects":[{"inc":"naughty"},{"stat":"bond","d":-5},{"stat":"health","d":-2}]}]},
  {"id":"bhv-no-pocket","title":"งดค่าขนม","body":"เพราะเรื่องที่ทำไว้ ผู้ใหญ่ในบ้านประกาศงดค่าขนมไปโรงเรียนหนึ่งเดือน","when":{"age":[6,12],"counter":{"naughty":[2,99]}},"w":14,"cooldown":9,
   "choices":[
    {"id":"chores","label":"ขอช่วยงานบ้านแลกค่าขนมคืน","text":"กวาดลานบ้าน ล้างจาน ผ่านไปสองอาทิตย์ก็ได้ค่าขนมคืน","effects":[{"inc":"naughty","d":-1},{"inc":"good"},{"stat":"bond","d":3}]},
    {"id":"accept","label":"ห่อข้าวเหนียวไปกินเอง","text":"อดขนมบ้าง แต่ก็ผ่านไปได้","effects":[{"stat":"happy","d":-2},{"trait":"grit","d":1}]},
    {"id":"take","label":"แอบหยิบเงินในกระป๋องหน้าหิ้งพระ","text":"ได้ขนมมาไม่กี่วันก็มีคนสังเกตว่าเงินหาย","effects":[{"inc":"naughty","d":2}],
     "roll":[{"p":0.6,"text":"โดนจับได้ ถูกดุหนักกว่าเดิม","effects":[{"stat":"bond","d":-5},{"stat":"happy","d":-3}]}]}]},
  {"id":"bhv-apologise-neighbour","title":"ไปขอโทษข้างบ้าน","body":"ขว้างมะม่วงบ้านข้างๆ จนกระเบื้องแตก ผู้ใหญ่ในบ้านจูงไปที่หน้าบ้านเขา","when":{"age":[5,12],"counter":{"naughty":[2,99]}},"w":14,"cooldown":12,
   "choices":[
    {"id":"sorry","label":"ไหว้ขอโทษเอง","text":"ป้าข้างบ้านยิ้ม บอกว่าคราวหลังขอมะม่วงดีๆ ก็ได้","effects":[{"inc":"naughty","d":-2},{"stat":"bond","d":2},{"stat":"happy","d":-1}]},
    {"id":"hide","label":"หลบอยู่หลังผู้ใหญ่ไม่พูด","text":"ผู้ใหญ่ต้องขอโทษแทนและออกค่ากระเบื้องให้","effects":[{"stat":"bond","d":-2},{"money":-1,"unit":"wageDay"}]},
    {"id":"blame","label":"โทษว่าเพื่อนเป็นคนขว้าง","text":"เพื่อนโกรธ ผู้ใหญ่ก็ไม่เชื่อ","effects":[{"inc":"naughty"},{"stat":"bond","d":-3},{"stat":"happy","d":-2}]}]},
  {"id":"bhv-teacher-cane","title":"ครูหยิบไม้เรียว","body":"หนีเรียนไปเล่นน้ำ วันรุ่งขึ้นครูเรียกออกหน้าห้อง ตีด้วยไม้เรียวที่ฝ่ามือตามธรรมเนียมโรงเรียนสมัยนั้น","when":{"age":[7,12],"year":[1970,1999],"counter":{"naughty":[2,99]}},"w":14,"cooldown":12,"heavy":true,
   "choices":[
    {"id":"accept","label":"ยอมรับและตั้งใจเรียนต่อ","text":"อายเพื่อนอยู่วันหนึ่ง แต่ครูก็ไม่ติดใจเรื่องนี้อีก","effects":[{"inc":"naughty","d":-1},{"stat":"know","d":2},{"stat":"happy","d":-2}]},
    {"id":"tell","label":"กลับไปเล่าให้ที่บ้านฟัง","text":"ผู้ใหญ่ฟังจบแล้วถามว่าไปหนีเรียนทำไม","effects":[{"stat":"happy","d":-2}],
     "roll":[{"p":0.5,"text":"โดนดุซ้ำอีกรอบที่บ้าน","effects":[{"stat":"bond","d":-2}]},{"p":0.5,"text":"ผู้ใหญ่ปลอบแล้วพาไปส่งโรงเรียนเองวันรุ่งขึ้น","effects":[{"stat":"bond","d":2}]}]},
    {"id":"skip","label":"วันต่อมาไม่ไปโรงเรียนอีก","text":"ยิ่งหนียิ่งตามบทเรียนไม่ทัน","effects":[{"inc":"naughty"},{"stat":"know","d":-3}]}]},
  {"id":"bhv-teacher-calls","title":"ครูเชิญผู้ปกครอง","body":"หนีเรียนหลายวันจนครูประจำชั้นโทรหาที่บ้าน ขอให้ผู้ปกครองมาคุยที่โรงเรียน","when":{"age":[7,12],"year":[2000,2026],"counter":{"naughty":[2,99]}},"w":14,"cooldown":12,
   "choices":[
    {"id":"honest","label":"บอกความจริงกับครูและผู้ใหญ่","text":"ตกลงกันว่าจะมาเรียนทุกวัน ครูจะคอยดูให้","effects":[{"inc":"naughty","d":-2},{"stat":"bond","d":2},{"stat":"know","d":1}]},
    {"id":"excuse","label":"แต่งเรื่องว่าไม่สบาย","text":"ครูกับผู้ใหญ่คุยกันแล้วรู้ว่าไม่จริง","effects":[{"inc":"naughty"},{"stat":"bond","d":-4}]},
    {"id":"cry","label":"ร้องไห้ไม่ยอมพูด","text":"ผู้ใหญ่พากลับบ้านเงียบๆ ทั้งทาง","effects":[{"stat":"happy","d":-3},{"stat":"bond","d":-1}]}]},
  {"id":"bhv-kid-night","title":"ค่ำแล้วยังไม่กลับ","body":"ไปเล่นกับเพื่อนจนมืด คนในบ้านเดินถามทั่วหมู่บ้าน ผู้ใหญ่บ้านเกือบประกาศเสียงตามสาย","when":{"age":[8,12],"counter":{"naughty":[4,99]}},"w":14,
   "choices":[
    {"id":"sorry","label":"กลับไปกราบขอโทษ","text":"แม่ร้องไห้ทั้งกอดทั้งดุ คืนนั้นสัญญากันว่าจะกลับก่อนมืด","effects":[{"inc":"naughty","d":-3},{"stat":"bond","d":3},{"stat":"happy","d":-2}]},
    {"id":"shrug","label":"บอกว่าก็แค่เล่นเพลินไป","text":"ผู้ใหญ่เงียบไป ความไว้ใจหายไปมาก","effects":[{"inc":"naughty"},{"stat":"bond","d":-6}]},
    {"id":"friend","label":"ค้างบ้านเพื่อนไปเลยไม่กล้ากลับ","text":"เช้ามาทั้งสองบ้านรู้เรื่อง เพื่อนก็โดนดุไปด้วย","effects":[{"inc":"naughty"},{"stat":"bond","d":-5},{"stat":"happy","d":-3}]}]},
  {"id":"bhv-kid-praise","title":"ผู้ใหญ่ชม","body":"ช่วยงานบ้านโดยไม่ต้องบอกมาหลายวัน ผู้ใหญ่ในบ้านยื่นเงินค่าขนมพิเศษให้","when":{"age":[5,12],"counter":{"good":[3,99]}},"w":14,"cooldown":9,
   "choices":[
    {"id":"snack","label":"ซื้อขนมที่อยากกิน","text":"ขนมอร่อยเป็นพิเศษเพราะได้มาจากความตั้งใจ","effects":[{"stat":"happy","d":4}]},
    {"id":"save","label":"หยอดกระปุกไว้","text":"กระปุกหนักขึ้นอีกนิด","effects":[{"money":1,"unit":"wageDay"},{"stat":"happy","d":1}]},
    {"id":"share","label":"แบ่งให้น้องหรือเพื่อน","text":"ได้รอยยิ้มกลับมาเต็มบ้าน","effects":[{"inc":"good"},{"stat":"bond","d":3},{"stat":"happy","d":2}]}]},
  {"id":"bhv-kid-leader","title":"ครูให้เป็นหัวหน้าห้อง","body":"ครูเห็นว่าตั้งใจเรียนและช่วยเพื่อน จึงเสนอให้เป็นหัวหน้าห้อง","when":{"age":[7,12],"counter":{"good":[3,99]}},"w":14,
   "choices":[
    {"id":"yes","label":"รับหน้าที่","text":"ต้องมาเช้ากว่าเพื่อน แต่รู้สึกภูมิใจ","effects":[{"stat":"know","d":2},{"trait":"social","d":2},{"cond":"proud","turns":2}]},
    {"id":"no","label":"ขอให้เพื่อนเป็นแทน","text":"ยังได้ช่วยครูอยู่เบื้องหลังเหมือนเดิม","effects":[{"stat":"happy","d":1}]}]},
  {"id":"bhv-kid-trust","title":"ยายไว้ใจ","body":"ยายฝากเงินให้ไปซื้อกับข้าวที่ตลาดคนเดียวเป็นครั้งแรก","when":{"age":[6,12],"counter":{"good":[4,99]}},"w":14,
   "choices":[
    {"id":"exact","label":"ซื้อครบ ทอนเงินคืนทุกบาท","text":"ยายเล่าให้ญาติฟังว่าหลานคนนี้พึ่งได้","effects":[{"inc":"good"},{"stat":"bond","d":4}]},
    {"id":"candy","label":"ซื้อของครบ แถมลูกอมให้ตัวเองหนึ่งถุง","text":"ยายหัวเราะ บอกว่าคราวหน้าขอก่อน","effects":[{"stat":"happy","d":3}]}]},
  {"id":"bhv-kid-change","title":"เด็กดื้อที่เปลี่ยนไป","body":"ผู้ใหญ่ในบ้านสังเกตว่าช่วงนี้ซนน้อยลง ช่วยงานมากขึ้น","when":{"age":[8,12],"counter":{"naughty":[2,99],"good":[3,99]}},"w":14,
   "choices":[
    {"id":"keep","label":"ตั้งใจทำต่อไป","text":"บ้านอบอุ่นขึ้น เรื่องเก่าค่อยๆ ถูกลืม","effects":[{"inc":"naughty","d":-2},{"stat":"bond","d":4}]},
    {"id":"shy","label":"เขิน ทำเป็นไม่สนใจ","text":"แต่ในใจก็ดีใจที่มีคนเห็น","effects":[{"stat":"happy","d":2}]}]},
  {"id":"bhv-teen-grounded","title":"ห้ามออกจากบ้าน","body":"ทำเรื่องไว้หลายครั้ง ผู้ใหญ่ในบ้านสั่งห้ามออกไปไหนหลังเลิกเรียนหนึ่งเดือน","when":{"age":[13,19],"counter":{"naughty":[2,99]}},"w":14,"cooldown":9,
   "choices":[
    {"id":"accept","label":"อยู่บ้าน ทำการบ้านช่วยงาน","text":"เดือนนั้นเงียบ แต่เกรดดีขึ้น","effects":[{"inc":"naughty","d":-1},{"stat":"know","d":3},{"stat":"happy","d":-2}]},
    {"id":"sneak","label":"แอบปีนหน้าต่างออกไปหาเพื่อน","text":"ทุกครั้งที่กลับมาต้องย่องเงียบๆ","effects":[{"inc":"naughty"},{"stat":"happy","d":2}],
     "roll":[{"p":0.5,"text":"โดนจับได้ เดือนเดียวกลายเป็นสามเดือน","effects":[{"stat":"bond","d":-5}]}]},
    {"id":"talk","label":"ขอคุยตรงๆ ว่าจะแก้ตัว","text":"ผู้ใหญ่ลดโทษลงครึ่งหนึ่งถ้าทำได้จริง","effects":[{"inc":"naughty","d":-1},{"stat":"bond","d":3}]}]},
  {"id":"bhv-teen-bike","title":"โดนยึดกุญแจรถ","body":"ขี่มอเตอร์ไซค์ไปเที่ยวดึกกลับมาตีหนึ่ง เช้ามากุญแจรถหายไปจากตะปูข้างประตู","when":{"age":[16,19],"year":[1990,2026],"counter":{"naughty":[3,99]}},"w":14,"cooldown":12,
   "choices":[
    {"id":"walk","label":"ปั่นจักรยานไปโรงเรียนแทน","text":"เหนื่อยหน่อย แต่ผู้ใหญ่เห็นว่ายอมรับ","effects":[{"inc":"naughty","d":-1},{"stat":"health","d":2},{"stat":"happy","d":-2}]},
    {"id":"spare","label":"แอบหากุญแจสำรอง","text":"ได้รถคืนแบบลับๆ จนกว่าจะมีคนเห็น","effects":[{"inc":"naughty"},{"stat":"bond","d":-3}]},
    {"id":"deal","label":"ต่อรองว่าจะกลับก่อนสามทุ่ม","text":"ได้กุญแจคืนพร้อมเงื่อนไขชัดเจน","effects":[{"stat":"bond","d":2}]}]},
  {"id":"bhv-teen-phone","title":"โดนยึดมือถือ","body":"เล่นมือถือจนดึกและโกหกเรื่องการบ้าน ผู้ใหญ่ในบ้านยึดเครื่องไปเก็บ","when":{"age":[13,19],"year":[2008,2026],"counter":{"naughty":[2,99]}},"w":14,"cooldown":12,
   "choices":[
    {"id":"accept","label":"ยอมรับ อ่านหนังสือแทน","text":"สองอาทิตย์แรกหงุดหงิด ต่อมานอนหลับดีขึ้น","effects":[{"inc":"naughty","d":-1},{"stat":"know","d":2},{"stat":"health","d":1}]},
    {"id":"rage","label":"ปิดประตูห้องใส่","text":"ทั้งบ้านตึงไปหลายวัน","effects":[{"inc":"naughty"},{"stat":"bond","d":-4}]},
    {"id":"borrow","label":"ยืมเครื่องเพื่อนเล่นแทน","text":"เล่นต่อได้ แต่ต้องคอยระวังตลอด","effects":[{"inc":"naughty"},{"stat":"happy","d":1},{"stat":"know","d":-2}]}]},
  {"id":"bhv-teen-school","title":"ผู้ปกครองถูกเรียกพบ","body":"หนีเรียนกับเพื่อนไปเที่ยวเล่นหลายวันจนชื่อติดบัญชีฝ่ายปกครอง โรงเรียนเรียกผู้ปกครองมาพบ","when":{"age":[13,18],"counter":{"naughty":[3,99]}},"w":14,"cooldown":12,
   "choices":[
    {"id":"sign","label":"เซ็นสัญญาปรับพฤติกรรม","text":"ต้องรายงานตัวกับครูทุกเช้าหนึ่งเทอม","effects":[{"inc":"naughty","d":-2},{"stat":"know","d":2},{"stat":"happy","d":-2}]},
    {"id":"blame","label":"บอกว่าเพื่อนชวน","text":"ผู้ใหญ่ไม่ชอบคำตอบนี้","effects":[{"stat":"bond","d":-3}]},
    {"id":"quit","label":"ขู่ว่าจะเลิกเรียน","text":"ผู้ใหญ่ทั้งโกรธทั้งกลัว เรื่องเรียนกลายเป็นเรื่องทะเลาะทุกวัน","effects":[{"inc":"naughty"},{"stat":"bond","d":-6},{"stat":"know","d":-2}]}]},
  {"id":"bhv-teen-novice","title":"บวชเณรภาคฤดูร้อน","body":"ผู้ใหญ่ในบ้านคุยกับหลวงพ่อ อยากให้ไปบวชเณรช่วงปิดเทอมหน้าร้อน จะได้ใจเย็นลง","when":{"age":[12,16],"sex":"m","season":0,"counter":{"naughty":[3,99]},"noFlag":["real-summerNovice"]},"w":14,
   "choices":[
    {"id":"go","label":"ยอมไปบวชด้วยใจ","text":"ตื่นตีสี่ บิณฑบาต ท่องบทสวด กลับมาใจนิ่งขึ้นจริง","effects":[{"flag":"real-summerNovice"},{"inc":"naughty","d":-3},{"inc":"good"},{"stat":"bond","d":4},{"stat":"know","d":2}]},
    {"id":"grudge","label":"ไปแบบจำใจ","text":"นับวันรอสึก แต่ก็ได้ข้อคิดติดตัวบ้าง","effects":[{"flag":"real-summerNovice"},{"inc":"naughty","d":-1},{"stat":"happy","d":-2}]},
    {"id":"refuse","label":"ไม่ยอมไป","text":"ผู้ใหญ่ผิดหวัง หลวงพ่อบอกว่าไม่เป็นไร ไว้พร้อมค่อยมา","effects":[{"stat":"bond","d":-4}]}]},
  {"id":"bhv-teen-friends","title":"เพื่อนกลุ่มเดิมมีเรื่อง","body":"เพื่อนที่เที่ยวด้วยกันประจำไปมีเรื่องชกต่อยในงานวัด ตำรวจเรียกคนในกลุ่มไปสอบถาม","when":{"age":[14,19],"counter":{"naughty":[3,99]}},"w":14,"heavy":true,
   "choices":[
    {"id":"truth","label":"ไปให้ข้อมูลตามจริง","text":"ไม่ได้ร่วมวง จึงกลับบ้านได้ แต่เพื่อนบางคนไม่พอใจ","effects":[{"inc":"naughty","d":-2},{"stat":"happy","d":-2},{"trait":"social","d":-1}]},
    {"id":"cover","label":"ปกป้องเพื่อน บอกว่าไม่รู้","text":"เพื่อนยังนับเป็นพวก แต่ชื่อเราติดอยู่ในเรื่องด้วย","effects":[{"inc":"naughty"},{"stat":"bond","d":-4}]},
    {"id":"leave","label":"ถอยห่างจากกลุ่มนี้","text":"ช่วงแรกเหงา แต่เรื่องวุ่นวายน้อยลงมาก","effects":[{"inc":"naughty","d":-2},{"cond":"lonely","turns":2},{"stat":"bond","d":2}]}]},
  {"id":"bhv-teen-racing","title":"ตำรวจตักเตือนเรื่องแข่งรถ","body":"ขี่มอเตอร์ไซค์แต่งท่อเสียงดังแข่งกันบนถนนเส้นใหม่ตอนดึก ด่านตำรวจเรียกพร้อมโทรหาผู้ปกครอง","when":{"age":[16,19],"sex":"m","year":[2000,2026],"counter":{"naughty":[3,99]}},"w":14,"heavy":true,
   "choices":[
    {"id":"stop","label":"รับปากเลิกแข่ง เปลี่ยนท่อคืน","text":"ผู้ใหญ่มารับตัวกลับ ระหว่างทางไม่มีใครพูดอะไร","effects":[{"inc":"naughty","d":-2},{"stat":"bond","d":-2},{"money":-3,"unit":"wageDay"}]},
    {"id":"again","label":"รอให้เรื่องเงียบแล้วไปแข่งต่อ","text":"ความเร็วยังเรียกอยู่ทุกคืนวันศุกร์","effects":[{"inc":"naughty","d":2},{"stat":"bond","d":-5},{"die":"road","p":0.03}]},
    {"id":"garage","label":"ไปขอฝึกงานร้านซ่อมรถแทน","text":"ได้แต่งรถอย่างถูกที่ และได้ค่าขนมเพิ่ม","effects":[{"inc":"naughty","d":-1},{"inc":"good"},{"money":2,"unit":"wageDay"}]}]},
  {"id":"bhv-teen-rep","title":"ชื่อเสียงในหมู่บ้าน","body":"แม่ค้าในตลาดเริ่มพูดกันว่าลูกบ้านนี้เกเร บางบ้านไม่ให้ลูกมาเล่นด้วย","when":{"age":[15,19],"counter":{"naughty":[4,99]}},"w":14,
   "choices":[
    {"id":"prove","label":"ไปช่วยงานวัดงานบุญให้คนเห็น","text":"คนเฒ่าคนแก่เริ่มพยักหน้าทักทาย","effects":[{"inc":"naughty","d":-2},{"inc":"good"},{"stat":"happy","d":-1}]},
    {"id":"ignore","label":"ไม่สนใจคำพูดใคร","text":"เสียงซุบซิบไม่หายไปไหน ผู้ใหญ่ในบ้านอายแทน","effects":[{"stat":"bond","d":-3}]},
    {"id":"leave","label":"อยากไปให้พ้นจากหมู่บ้าน","text":"เริ่มคิดเรื่องไปทำงานในเมืองหลังเรียนจบ","effects":[{"stat":"happy","d":-2},{"trait":"attach","d":-2}]}]},
  {"id":"bhv-teen-scold","title":"โดนเทียบกับลูกบ้านอื่น","body":"ผู้ใหญ่ในบ้านบ่นยาวว่าลูกบ้านอื่นเขาช่วยงาน สอบได้ที่ดี ไม่เที่ยวดึกเหมือนเรา","when":{"age":[13,19],"counter":{"naughty":[2,99]}},"w":14,"cooldown":9,
   "choices":[
    {"id":"listen","label":"ฟังเงียบๆ แล้วช่วยงานบ้าน","text":"เสียงบ่นเบาลง พรุ่งนี้มีกับข้าวที่ชอบ","effects":[{"inc":"naughty","d":-1},{"stat":"bond","d":2}]},
    {"id":"argue","label":"เถียงว่าไม่ใช่คนอื่น","text":"ทะเลาะกันจนข้าวเย็นไม่มีใครกิน","effects":[{"inc":"naughty"},{"stat":"bond","d":-4},{"stat":"happy","d":-2}]},
    {"id":"tell","label":"บอกตรงๆ ว่าคำเปรียบเทียบทำให้เจ็บ","text":"ผู้ใหญ่นิ่งไปแล้วพูดว่าเพราะห่วง","effects":[{"stat":"bond","d":1},{"stat":"happy","d":1}]}]},
  {"id":"bhv-teen-trust","title":"ผู้ใหญ่วางใจ","body":"ผู้ใหญ่ในบ้านให้ขับรถไปส่งข้าวที่โรงสีและรับเงินแทน ครั้งแรกที่ไว้ใจขนาดนี้","when":{"age":[16,19],"counter":{"good":[4,99]}},"w":14,
   "choices":[
    {"id":"careful","label":"ทำให้ครบ เอาเงินกลับมาทุกบาท","text":"ต่อจากนั้นงานบ้านเรื่องใหญ่ก็มีชื่อเราอยู่ด้วย","effects":[{"inc":"good"},{"stat":"bond","d":4},{"cond":"proud","turns":2}]},
    {"id":"treat","label":"แวะเลี้ยงก๋วยเตี๋ยวเพื่อนนิดหน่อย","text":"ผู้ใหญ่ไม่ว่า แต่จดไว้ในใจ","effects":[{"stat":"happy","d":3},{"money":-1,"unit":"wageDay"}]}]},
  {"id":"bhv-teen-scholar","title":"ครูแนะนำทุน","body":"ครูแนะแนวเห็นความตั้งใจมาหลายปี จึงเสนอชื่อให้สมัครทุนเรียนดี","when":{"age":[14,18],"counter":{"good":[5,99]}},"w":14,
   "choices":[
    {"id":"apply","label":"เขียนใบสมัครเต็มที่","text":"ถึงจะยังไม่รู้ผล แต่ครูบอกว่าเขียนดีมาก","effects":[{"stat":"know","d":3}],
     "roll":[{"p":0.5,"text":"ได้ทุนมาช่วยค่าเทอม","effects":[{"money":15,"unit":"wageDay"},{"cond":"proud","turns":3}]}]},
    {"id":"pass","label":"ยกโอกาสให้เพื่อนที่ลำบากกว่า","text":"เพื่อนน้ำตาซึม ครูจำเรื่องนี้ได้นาน","effects":[{"inc":"good"},{"stat":"happy","d":2}]}]},
  {"id":"bhv-teen-monk-talk","title":"หลวงพ่อเรียกคุย","body":"หลวงพ่อที่วัดเห็นเดินผ่านทุกเย็นกับกลุ่มเพื่อน จึงเรียกมานั่งคุยใต้ต้นโพธิ์","when":{"age":[15,19],"counter":{"naughty":[3,99]}},"w":14,
   "choices":[
    {"id":"listen","label":"ฟังและรับปากจะเปลี่ยน","text":"กลับบ้านไปไหว้ขอโทษผู้ใหญ่ที่เคยทำให้เสียใจ","effects":[{"inc":"naughty","d":-3},{"stat":"bond","d":4}]},
    {"id":"polite","label":"ฟังพอเป็นพิธี","text":"ลืมไปภายในสองวัน","effects":[{"stat":"happy","d":0}]},
    {"id":"skip","label":"หาเรื่องลุกหนี","text":"เพื่อนหัวเราะ แต่ในใจรู้สึกแปลกๆ","effects":[{"inc":"naughty"}]}]},
  {"id":"bhv-childhood-shadow","title":"ชื่อเก่ายังตามมา","body":"ไปขอทำงานกับคนในหมู่บ้าน เขาลังเลเพราะจำเรื่องสมัยวัยรุ่นได้","when":{"age":[19,28],"counter":{"naughty":[5,99]}},"w":14,
   "choices":[
    {"id":"prove","label":"ขอทดลองงานไม่เอาค่าแรงก่อน","text":"ทำครบหนึ่งอาทิตย์ เขาจ้างต่อ","effects":[{"inc":"naughty","d":-3},{"inc":"responsible"},{"money":-3,"unit":"wageDay"}]},
    {"id":"angry","label":"โกรธที่เขายังจำเรื่องเก่า","text":"ต้องไปหางานที่อื่นไกลกว่าเดิม","effects":[{"stat":"happy","d":-3}]}]},
  {"id":"bhv-spouse-angry","title":"คู่ชีวิตโกรธ","body":"กลับบ้านดึกกลิ่นเหล้าคลุ้งหรือเงินหายไปกับหวยอีกครั้ง คู่ชีวิตนั่งรอพร้อมคำถาม","when":{"age":[20,70],"flag":{"partner":true},"counter":{"vice":[2,99]}},"w":14,"cooldown":9,
   "choices":[
    {"id":"sorry","label":"ขอโทษและสัญญาจะลด","text":"คู่ชีวิตบอกว่าจะรอดูการกระทำ","effects":[{"inc":"vice","d":-1},{"stat":"bond","d":2},{"stat":"happy","d":-2}]},
    {"id":"argue","label":"เถียงว่าเงินตัวเองหามา","text":"ทะเลาะกันจนคนในบ้านได้ยิน","effects":[{"inc":"vice"},{"stat":"bond","d":-6},{"stat":"happy","d":-3}]},
    {"id":"out","label":"ออกไปนอนบ้านเพื่อน","text":"เรื่องยังค้าง และยาวขึ้นทุกครั้ง","effects":[{"stat":"bond","d":-4},{"cond":"lonely","turns":2}]}]},
  {"id":"bhv-gossip","title":"เสียงซุบซิบในหมู่บ้าน","body":"ร้านค้าหน้าหมู่บ้านเริ่มพูดกันว่าเห็นนั่งวงเหล้าทุกวันหรือติดหนี้หวยหลายเจ้า","when":{"age":[20,70],"counter":{"vice":[2,99]}},"w":14,"cooldown":12,
   "choices":[
    {"id":"change","label":"เลิกวงเดิม ไปช่วยงานวัดแทน","text":"คนเริ่มทักทายด้วยรอยยิ้มอีกครั้ง","effects":[{"inc":"vice","d":-2},{"inc":"responsible"},{"stat":"happy","d":-1}]},
    {"id":"ignore","label":"ช่างมัน","text":"เสียงซุบซิบดังขึ้น ญาติเริ่มไม่ชวนไปงาน","effects":[{"stat":"bond","d":-3},{"trait":"social","d":-1}]},
    {"id":"confront","label":"ไปต่อว่าคนที่พูด","text":"มีปากเสียงกันกลางตลาด เรื่องยิ่งดัง","effects":[{"inc":"vice"},{"stat":"happy","d":-3}]}]},
  {"id":"bhv-elders","title":"ผู้ใหญ่ไม่พอใจ","body":"ลุงป้าน้าอาเรียกไปคุยในงานบุญ บอกตรงๆ ว่าพฤติกรรมช่วงนี้ทำให้พ่อแม่อายคนในหมู่บ้าน","when":{"age":[20,50],"counter":{"vice":[2,99]}},"w":14,
   "choices":[
    {"id":"bow","label":"กราบขอโทษผู้ใหญ่","text":"ผู้ใหญ่ผูกแขนให้ อวยพรให้ตั้งตัวใหม่","effects":[{"inc":"vice","d":-2},{"stat":"bond","d":4}]},
    {"id":"defend","label":"แย้งว่าเป็นเรื่องส่วนตัว","text":"ญาติผู้ใหญ่ห่างเหินไปหลายปี","effects":[{"stat":"bond","d":-5}]},
    {"id":"silent","label":"นั่งฟังเงียบๆ ไม่รับปาก","text":"บรรยากาศอึดอัดจนจบงาน","effects":[{"stat":"happy","d":-2}]}]},
  {"id":"bhv-job-drink","title":"ตกงานเพราะเหล้า","body":"มาทำงานสายหลายวันหลังวงเหล้า หัวหน้าเรียกไปคุยเป็นครั้งสุดท้าย","when":{"age":[20,60],"role":["factory","construction","driver","office","trader"],"counter":{"vice":[3,99]}},"w":14,"heavy":true,
   "choices":[
    {"id":"beg","label":"ขอโอกาสสุดท้าย สัญญาจะเลิกดื่ม","text":"หัวหน้าให้ทดลองอีกหนึ่งเดือน","effects":[{"inc":"vice","d":-2},{"stat":"happy","d":-3}],
     "roll":[{"p":0.4,"text":"ทำไม่ได้ตามสัญญา สุดท้ายก็ถูกให้ออก","effects":[{"role":"jobless"},{"stat":"happy","d":-5}]}]},
    {"id":"quit","label":"ลาออกเองก่อนถูกไล่","text":"กลับบ้านมือเปล่า ไม่มีใครถามอะไรสักคำ","effects":[{"role":"jobless"},{"stat":"happy","d":-6},{"stat":"bond","d":-2}]},
    {"id":"rehab","label":"ยอมรับปัญหาและขอลาไปบำบัด","text":"หัวหน้าเห็นใจ ครอบครัวมาช่วยดูแลระหว่างพัก","effects":[{"inc":"vice","d":-3},{"inc":"responsible"},{"money":-10,"unit":"wageDay"},{"stat":"health","d":4}]}]},
  {"id":"bhv-gamble-debt","title":"หนี้จากการพนัน","body":"ซื้อหวยและเล่นไพ่จนติดค้างเจ้ามือหลายงวด เจ้าหนี้เริ่มมาถามถึงบ้าน","when":{"age":[20,70],"counter":{"vice":[3,99]}},"w":14,"heavy":true,
   "choices":[
    {"id":"confess","label":"บอกครอบครัวตามจริง ขอช่วยวางแผนใช้หนี้","text":"เหนื่อยใจทั้งบ้าน แต่มีแผนผ่อนชัดเจน","effects":[{"inc":"vice","d":-3},{"inc":"responsible"},{"money":-15,"unit":"wageDay"},{"stat":"bond","d":-2}]},
    {"id":"chase","label":"เล่นต่อหวังถอนทุน","text":"หนี้งอกขึ้นจนนอนไม่หลับ","effects":[{"inc":"vice","d":2},{"cond":"indebted","turns":8},{"stat":"happy","d":-5}]},
    {"id":"shark","label":"กู้นอกระบบมาจ่ายเงียบๆ","text":"หนี้ย้ายจากที่หนึ่งไปอีกที่หนึ่ง ดอกหนักกว่าเดิม","effects":[{"cond":"indebted","turns":6},{"stat":"happy","d":-3}]}]},
  {"id":"bhv-kids-copy","title":"ลูกทำตาม","body":"เห็นลูกเล่นตั้งวงเหล้าด้วยขวดน้ำกับเพื่อน เลียนแบบท่าทางที่เห็นในบ้านทุกเย็น","when":{"age":[26,70],"flag":{"child":true},"childAge":[4,14],"counter":{"vice":[3,99]}},"w":14,
   "choices":[
    {"id":"stop","label":"ตั้งใจเลิกเพื่อลูก","text":"เย็นต่อมาพาลูกไปเตะบอลแทนวงเหล้า","effects":[{"inc":"vice","d":-3},{"inc":"responsible"},{"stat":"bond","d":4},{"stat":"happy","d":-1}]},
    {"id":"scold","label":"ดุลูกว่าห้ามทำแบบนี้","text":"ลูกงงว่าทำไมผู้ใหญ่ทำได้","effects":[{"stat":"bond","d":-3}]},
    {"id":"laugh","label":"หัวเราะ คิดว่าเด็กเล่น","text":"ภาพนั้นยังค้างอยู่ในหัวหลายวัน","effects":[{"inc":"vice"},{"stat":"happy","d":-1}]}]},
  {"id":"bhv-health-warn","title":"หมอเตือน","body":"ตรวจสุขภาพประจำปี หมอดูผลตับแล้วบอกตรงๆ ว่าถ้ายังใช้ชีวิตแบบนี้จะไม่ไหว","when":{"age":[30,80],"counter":{"vice":[3,99]}},"w":14,"heavy":true,
   "choices":[
    {"id":"follow","label":"ทำตามหมอ เลิกดื่ม","text":"สามเดือนแรกยากที่สุด แต่ผลตรวจรอบหน้าดีขึ้น","effects":[{"inc":"vice","d":-3},{"stat":"health","d":6},{"stat":"happy","d":-2}]},
    {"id":"less","label":"ลดลงบ้าง","text":"ดีกว่าเดิมนิดหนึ่ง","effects":[{"inc":"vice","d":-1},{"stat":"health","d":2}]},
    {"id":"ignore","label":"ไม่เชื่อ ใช้ชีวิตเหมือนเดิม","text":"เหนื่อยง่ายขึ้นเรื่อยๆ","effects":[{"inc":"vice"},{"stat":"health","d":-6},{"die":"liver","p":0.02}]}]},
  {"id":"bhv-family-meeting","title":"ครอบครัวนั่งล้อมวง","body":"คนในครอบครัวนัดกันมาคุย ขอให้เลือกระหว่างครอบครัวกับวงเหล้าวงพนัน","when":{"age":[25,70],"counter":{"vice":[4,99]}},"w":14,"heavy":true,
   "choices":[
    {"id":"family","label":"เลือกครอบครัว ไปบวชหรือบำบัด","text":"น้ำตาทั้งวง แต่เป็นจุดเริ่มต้นใหม่","effects":[{"inc":"vice","d":-4},{"inc":"responsible","d":2},{"stat":"bond","d":6},{"pin":"ตัดสินใจเลิกเหล้าเลิกพนันเพื่อครอบครัว"}]},
    {"id":"walk","label":"ลุกหนีออกจากวง","text":"บ้านแตกเป็นสองฝั่ง ไม่มีใครโทรหาอีกนาน","effects":[{"stat":"bond","d":-10},{"cond":"lonely","turns":4},{"stat":"happy","d":-5}]},
    {"id":"try","label":"รับปากจะพยายาม","text":"ทุกคนยอมให้เวลา แต่ไม่มีครั้งหน้าแล้ว","effects":[{"inc":"vice","d":-2},{"stat":"bond","d":2}]}]},
  {"id":"bhv-amends","title":"เช้าวันที่ตาสว่าง","body":"ตื่นมาหลังคืนที่เมาหนัก เห็นคนในบ้านเก็บกวาดเศษแก้วเงียบๆ","when":{"age":[22,70],"counter":{"vice":[2,99]}},"w":14,"cooldown":15,
   "choices":[
    {"id":"help","label":"ลุกไปช่วยเก็บ แล้วขอโทษ","text":"บ้านกลับมาพูดกันได้ภายในวันนั้น","effects":[{"inc":"vice","d":-2},{"stat":"bond","d":3}]},
    {"id":"sleep","label":"นอนต่อ","text":"ไม่มีใครปลุก และไม่มีใครคุยด้วยทั้งวัน","effects":[{"stat":"bond","d":-3}]}]},
  {"id":"bhv-land-trust","title":"มอบโฉนด","body":"พ่อแม่หรือผู้ใหญ่ในตระกูลเรียกไปคุย บอกว่าจะให้ดูแลที่นาของบ้าน เพราะเห็นว่าพึ่งได้","when":{"age":[30,65],"counter":{"responsible":[4,99]}},"w":14,
   "choices":[
    {"id":"take","label":"รับดูแล ทำกินและแบ่งข้าวให้พี่น้อง","text":"งานหนักขึ้น แต่ทั้งตระกูลไว้ใจ","effects":[{"flag":"bhvLandTrust"},{"stat":"bond","d":5},{"inc":"responsible"},{"pin":"ได้รับความไว้ใจให้ดูแลที่นาของครอบครัว"}]},
    {"id":"share","label":"ขอให้ตกลงกับพี่น้องทุกคนก่อน","text":"ประชุมกันหลายรอบ สุดท้ายทุกคนสบายใจ","effects":[{"stat":"bond","d":3},{"stat":"happy","d":1}]},
    {"id":"decline","label":"ขอปฏิเสธ ยังไม่พร้อม","text":"ผู้ใหญ่เข้าใจ แต่ผิดหวังเล็กน้อย","effects":[{"stat":"bond","d":-1}]}]},
  {"id":"bhv-respect","title":"คนในหมู่บ้านนับถือ","body":"งานบุญปีนี้เจ้าภาพมาขอให้ช่วยดูแลเงินและการจัดงาน เพราะเชื่อว่าซื่อตรง","when":{"age":[28,75],"counter":{"responsible":[5,99]}},"w":14,
   "choices":[
    {"id":"yes","label":"รับหน้าที่","text":"งานเรียบร้อย ทุกบาทมีบัญชี","effects":[{"stat":"happy","d":3},{"trait":"social","d":2},{"cond":"proud","turns":2}]},
    {"id":"help","label":"ช่วยงานแรง แต่ไม่ถือเงิน","text":"ยังเหนื่อยเหมือนกัน แต่สบายใจกว่า","effects":[{"stat":"happy","d":1},{"stat":"health","d":-1}]}]},
  {"id":"bhv-committee","title":"ชวนเป็นกรรมการหมู่บ้าน","body":"ผู้ใหญ่บ้านมาชวนให้เป็นกรรมการหมู่บ้าน ดูแลกองทุนและเรื่องส่วนรวม","when":{"age":[35,70],"counter":{"responsible":[6,99]}},"w":14,
   "choices":[
    {"id":"yes","label":"รับเป็นกรรมการ","text":"ประชุมถี่ เสียเวลาทำกินบ้าง แต่ได้ช่วยคนทั้งหมู่บ้าน","effects":[{"flag":"bhvCommittee"},{"trait":"social","d":3},{"stat":"happy","d":3},{"money":-3,"unit":"wageDay"},{"pin":"ได้เป็นกรรมการหมู่บ้าน"}]},
    {"id":"no","label":"ปฏิเสธอย่างสุภาพ","text":"ยังช่วยงานเท่าที่ทำได้","effects":[{"stat":"happy","d":0}]},
    {"id":"suggest","label":"เสนอชื่อคนรุ่นใหม่แทน","text":"คนหนุ่มสาวได้โอกาส ผู้ใหญ่ชมว่ามองการณ์ไกล","effects":[{"stat":"bond","d":2}]}]},
  {"id":"bhv-kids-well","title":"ลูกโตมาดี","body":"ลูกโทรมาเล่าว่าได้งานประจำ แล้วบอกว่าที่มาถึงวันนี้ได้เพราะเห็นพ่อแม่ทำให้ดู","when":{"age":[40,80],"flag":{"child":true},"counter":{"responsible":[5,99]}},"w":14,
   "choices":[
    {"id":"cry","label":"ยิ้มทั้งน้ำตา","text":"คืนนั้นนอนหลับสบายที่สุดในรอบหลายปี","effects":[{"stat":"happy","d":6},{"stat":"bond","d":4},{"cond":"proud","turns":3}]},
    {"id":"advise","label":"สอนต่อว่าให้เก็บเงินดูแลตัวเอง","text":"ลูกหัวเราะ บอกว่ารู้แล้ว","effects":[{"stat":"bond","d":3},{"stat":"happy","d":3}]}]},
  {"id":"bhv-spouse-thanks","title":"คู่ชีวิตขอบคุณ","body":"คู่ชีวิตพูดขึ้นตอนกินข้าวเย็นว่าดีใจที่เราดูแลบ้านและเก็บเงินไว้ได้","when":{"age":[22,70],"flag":{"partner":true},"counter":{"responsible":[3,99]}},"w":14,"cooldown":15,
   "choices":[
    {"id":"together","label":"บอกว่าเพราะช่วยกันทั้งคู่","text":"มื้อนั้นอร่อยกว่าทุกวัน","effects":[{"stat":"bond","d":4},{"stat":"happy","d":3}]},
    {"id":"trip","label":"ชวนกันไปเที่ยวใกล้ๆ เป็นรางวัล","text":"ได้พักใจ แต่เงินเก็บลดลงนิดหน่อย","effects":[{"stat":"happy","d":5},{"money":-3,"unit":"wageDay"}]}]},
  {"id":"bhv-guarantor","title":"เพื่อนบ้านไว้ใจ","body":"กลุ่มออมทรัพย์ในหมู่บ้านขอให้เป็นคนถือบัญชีและเก็บเงินประจำเดือน","when":{"age":[25,70],"counter":{"responsible":[4,99]}},"w":14,
   "choices":[
    {"id":"yes","label":"รับทำ จดบัญชีละเอียด","text":"ทุกสิ้นเดือนอ่านยอดให้สมาชิกฟังที่ศาลา","effects":[{"inc":"responsible"},{"trait":"social","d":2},{"stat":"happy","d":2}]},
    {"id":"no","label":"ขอไม่รับ กลัวพลาด","text":"กลุ่มเลือกคนอื่น ความไว้ใจยังอยู่","effects":[{"stat":"happy","d":0}]}]}
]);
