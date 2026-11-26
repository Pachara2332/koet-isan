globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"rich-quit-job","title":"เงินพอแล้ว จะทำงานเดิมต่อไหม","body":"ยอดเงินในบัญชีมากพอจะไม่ต้องทำงานไปอีกหลายสิบปี แต่ทุกเช้าคุณยังออกไปทำงานแบบเดิม ร่างกายเริ่มบอกว่าเหนื่อย คนในบ้านถามว่าจะทำแบบนี้ไปถึงเมื่อไหร่","when":{"age":[25,62],"role":["rider","construction","factory","driver","security","housekeeper","jobless"],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"chance":0.6},"cooldown":8,"major":true,"urgent":true,
   "choices":[
    {"id":"business","label":"ลาออกมาเปิดกิจการของตัวเอง","text":"เช่าทำเลดีเปิดร้านของตัวเอง จ้างลูกน้องสองสามคน เหนื่อยคนละแบบ แต่เป็นนายตัวเอง","effects":[{"role":"business"},{"money":-400,"unit":"wageDay"},{"inc":"biz","d":2},{"stat":"happy","d":4},{"pin":"ลาออกมาเปิดกิจการของตัวเอง"}]},
    {"id":"retire","label":"เกษียณก่อนกำหนด ใช้ชีวิตกับครอบครัว","text":"ตื่นสายได้เป็นครั้งแรกในรอบหลายปี มีเวลาดูแลคนในบ้านและตัวเอง เย็นนั่งกินข้าวพร้อมหน้า","effects":[{"role":"retired"},{"stat":"happy","d":6},{"stat":"bond","d":5},{"stat":"health","d":3},{"pin":"เกษียณก่อนกำหนด"}]},
    {"id":"home","label":"ซื้อบ้านหลังใหญ่ แล้วทำงานต่อแบบไม่หักโหม","text":"ย้ายเข้าบ้านใหม่ ทำงานเฉพาะวันที่อยากทำ","when":{"noFlag":["homeHere"]},"effects":[{"personal":"home-large"},{"stat":"happy","d":5},{"stat":"health","d":2}]},
    {"id":"keep","label":"ทำงานเดิมต่อ เพราะชอบและไม่อยากอยู่เฉย","text":"เพื่อนร่วมงานงงว่าทำไมยังมาทำ คุณยิ้มแล้วบอกว่าอยู่บ้านเฉยๆ แล้วป่วย","effects":[{"stat":"happy","d":1},{"trait":"grit","d":2}]}
   ]},
  {"id":"city-home-buy","title":"ซื้อบ้านในเมืองดีไหม","body":"เช่าที่อยู่ในเมืองมาหลายปี ค่าเช่าที่จ่ายไปรวมกันเกือบเท่าเงินดาวน์บ้านหลังหนึ่งแล้ว เซลส์โครงการใกล้ที่ทำงานโทรมาชวนไปดูบ้านตัวอย่าง","when":{"age":[25,70],"loc":"bangkok","noFlag":["homeHere"],"any":[{"flag":{"status":"mid"}},{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"chance":0.35},"cooldown":6,"major":true,
   "choices":[
    {"id":"small","label":"ผ่อนทาวน์เฮาส์ใกล้ที่ทำงาน","text":"ได้บ้านของตัวเองหลังแรก ผ่อนนานหน่อยแต่ไม่ต้องจ่ายค่าเช่าอีก","effects":[{"personal":"home-small","finance":true},{"stat":"happy","d":4}]},
    {"id":"medium","label":"ซื้อบ้านเดี่ยวในหมู่บ้านจัดสรร","text":"มีสนามหญ้าเล็กๆ ให้ลูกวิ่งเล่น เพื่อนบ้านทักทายกันทุกเช้า","when":{"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"effects":[{"personal":"home-medium"},{"stat":"happy","d":5},{"stat":"bond","d":2}]},
    {"id":"large","label":"ซื้อบ้านหลังใหญ่ด้วยเงินสด","text":"เซ็นสัญญาวันเดียวจบ ไม่ต้องกู้ธนาคาร ย้ายเข้าได้ทันที","when":{"flag":{"status":"wealthy"}},"effects":[{"personal":"home-large"},{"stat":"happy","d":6},{"stat":"bond","d":3}]},
    {"id":"rent","label":"เช่าต่อไปก่อน ยังไม่อยากผูกมัด","text":"ย้ายงานย้ายที่ได้คล่องตัว แต่ทุกเดือนยังต้องจ่ายค่าเช่า","effects":[{"stat":"happy","d":-1}]}
   ]},
  {"id":"shophouse-open","title":"ห้องแถวที่ซื้อไว้","body":"ห้องแถวที่ซื้อไว้ว่างมาสักพัก มีคนมาถามขอเช่าทำร้าน ส่วนคุณเองก็เคยคิดว่าถ้ามีหน้าร้านเป็นของตัวเองคงดี","when":{"age":[20,70],"flag":{"ownsShophouse":true},"noFlag":["shopDecided"]},"cooldown":"once","major":true,"urgent":true,
   "choices":[
    {"id":"open","label":"เปิดร้านเองแล้วลาออกจากงานเดิม","text":"ตกแต่งหน้าร้าน ติดป้ายชื่อตัวเอง วันแรกลูกค้าเป็นญาติกับเพื่อนบ้านเกือบหมด","effects":[{"flag":"shopDecided"},{"flag":"shopOwnRun"},{"role":"business"},{"money":-60,"unit":"wageDay"},{"inc":"biz","d":2},{"stat":"happy","d":4},{"pin":"เปิดร้านในห้องแถวของตัวเอง"}]},
    {"id":"rent","label":"ปล่อยเช่า รับค่าเช่าทุกเดือน","text":"ทำสัญญาเช่าสามปี ได้เงินเข้าบัญชีทุกเดือนโดยไม่ต้องทำอะไร","effects":[{"flag":"shopDecided"},{"flag":"shopRented"},{"stat":"happy","d":2}]},
    {"id":"wait","label":"ปล่อยว่างไว้ รอราคาขึ้นแล้วขาย","text":"ห้องแถวยังว่าง แต่ราคาที่ดินในย่านนั้นขยับขึ้นทุกปี","effects":[{"flag":"shopDecided"}]}
   ]},
  {"id":"rich-family-trip","title":"พาครอบครัวเที่ยวต่างประเทศ","body":"ลูกปิดเทอมยาว คนในบ้านอยากไปเที่ยวไกลกันสักครั้ง ญี่ปุ่นช่วงใบไม้เปลี่ยนสี หรือยุโรปที่เคยเห็นแต่ในทีวี","when":{"age":[28,75],"year":[1995,2026],"flag":{"child":true},"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}],"chance":0.3},"cooldown":5,
   "choices":[
    {"id":"japan","label":"บินไปญี่ปุ่นกันทั้งบ้าน","text":"ลูกตื่นเต้นกับรถไฟความเร็วสูง ทุกคนกินราเมนจนอิ่มแปล้","effects":[{"money":-120,"unit":"wageDay"},{"stat":"happy","d":6},{"stat":"bond","d":5}]},
    {"id":"europe","label":"ทัวร์ยุโรปสองสัปดาห์","text":"เดินจนขาแทบหลุด แต่รูปถ่ายหน้าหอไอเฟลกลายเป็นรูปประจำบ้าน","effects":[{"money":-250,"unit":"wageDay"},{"stat":"happy","d":7},{"stat":"bond","d":5},{"stat":"know","d":2}]},
    {"id":"home","label":"พากลับบ้านเกิด ไปทำบุญกับญาติ","text":"เช่ารถตู้พาทั้งบ้านกลับอีสาน ญาติจัดเลี้ยงต้อนรับ ลูกได้รู้จักรากเหง้า","effects":[{"money":-30,"unit":"wageDay"},{"stat":"bond","d":6},{"stat":"happy","d":3}]}
   ]},
  {"id":"rich-kid-school","title":"โรงเรียนของลูก","body":"ลูกถึงวัยเข้าเรียน เพื่อนในกลุ่มพ่อแม่แนะนำโรงเรียนสองภาษาและโรงเรียนนานาชาติ ค่าเทอมแพงกว่าโรงเรียนรัฐหลายสิบเท่า","when":{"childAge":[5,7],"year":[1995,2026],"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"cooldown":"once",
   "choices":[
    {"id":"inter","label":"ส่งเข้าโรงเรียนนานาชาติ","text":"ลูกพูดอังกฤษคล่องภายในปีเดียว แต่เริ่มพูดภาษาอีสานกับยายไม่ได้","effects":[{"money":-300,"unit":"wageDay"},{"stat":"bond","d":-1},{"stat":"happy","d":2},{"flag":"kidInterSchool"}]},
    {"id":"bilingual","label":"โรงเรียนสองภาษาใกล้บ้าน","text":"ได้ทั้งภาษาและเพื่อนที่โตมาด้วยกันในย่านเดียวกัน","effects":[{"money":-120,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"public","label":"โรงเรียนรัฐดีๆ ให้ลูกโตแบบเราโตมา","text":"ประหยัดเงินไว้ให้ลูกเรียนต่อมหาวิทยาลัย ลูกได้เพื่อนหลากหลาย","effects":[{"stat":"bond","d":3},{"trait":"grit","d":1}]}
   ]}
]);
KI.data.decisions.push(...[
  {"id":"kid-come-home","title":"ลูกอยากกลับมาอยู่ด้วย","body":"ลูกโทรมาหลังรู้ว่าพ่อแม่อยู่บ้านกันเงียบๆ บอกว่าคิดมานานแล้ว อยากพาครอบครัวกลับมาอยู่ด้วยกัน หรือไม่ก็อยากให้ไปอยู่กับเขาในเมือง จะได้ดูแลกันใกล้ๆ","when":{"age":[62,95],"flag":{"child":true},"childAge":[25,70],"noFlag":["kidStays","oldCareSet"],"chance":0.4},"cooldown":8,"major":true,
   "choices":[
    {"id":"back","label":"ให้ลูกพาครอบครัวกลับมาอยู่บ้านเรา","text":"บ้านมีเสียงหลานวิ่งเล่นอีกครั้ง ลูกช่วยดูแลเรื่องหมอและเรื่องเงิน ทุกเย็นได้กินข้าวพร้อมหน้า","effects":[{"flag":"kidStays"},{"flag":"oldCareSet"},{"stat":"happy","d":6},{"stat":"bond","d":6},{"uncond":"lonely"}]},
    {"id":"move","label":"ย้ายไปอยู่กับลูกในเมือง","text":"ห้องนอนใหม่ในบ้านลูก ใกล้โรงพยาบาลใหญ่ คิดถึงบ้านเกิดบ้าง แต่ได้เห็นหลานโตทุกวัน","effects":[{"flag":"kidStays"},{"flag":"oldCareSet"},{"move":{"kind":"isan","setting":"urban"}},{"stat":"happy","d":3},{"stat":"bond","d":5},{"cond":"homesick","turns":2}]},
    {"id":"help","label":"ช่วยเงินลูกสร้างบ้านหลังใหม่ใกล้ๆ กัน","text":"ลูกสร้างบ้านอยู่ห่างกันแค่รั้วเดียว ต่างคนต่างมีพื้นที่ แต่เดินมาหากันได้ทุกวัน","when":{"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]},"effects":[{"money":-400,"unit":"wageDay"},{"flag":"kidStays"},{"flag":"oldCareSet"},{"stat":"happy","d":6},{"stat":"bond","d":7}]},
    {"id":"alone","label":"ขอบใจลูก แต่ยังอยากอยู่เองไปก่อน","text":"ลูกเข้าใจ แต่สัญญาว่าจะโทรหาทุกวัน และกลับมาเยี่ยมทุกเดือน","effects":[{"stat":"bond","d":2},{"trait":"grit","d":1}]}
   ]}
]);
KI.data.personalEvents.push(...[
  {"id":"shop-rent-income","title":"ค่าเช่าห้องแถวเข้าบัญชี","body":"ผู้เช่าห้องแถวโอนค่าเช่ามาตรงเวลาเหมือนทุกครั้ง ร้านของเขาขายดีจนต่อสัญญาไปอีกรอบ","when":{"flag":{"shopRented":true,"ownsShophouse":true},"chance":0.6},"w":12,"cooldown":3,"effects":[{"money":25,"unit":"wageDay"}]}
]);
(function () {
  const rich = {"any":[{"flag":{"status":"rich"}},{"flag":{"status":"wealthy"}}]};
  const fly = {"id":"fly","label":"บินกลับพร้อมครอบครัว แล้วเช่ารถขับเข้าหมู่บ้าน","text":"ไม่ถึงสองชั่วโมงก็ถึงบ้านเกิด ทันกินข้าวเย็นกับญาติ ไม่ต้องติดอยู่บนถนน","when":rich,"effects":[{"money":-12,"unit":"wageDay"},{"stat":"bond","d":5},{"stat":"happy","d":4},{"uncond":"homesick"}]};
  for (const id of ["sea-city-newyear","sea-songkran-home"]) {
    const item = [...KI.data.decisions, ...KI.data.personalEvents].find((x) => x.id === id);
    if (item && item.choices) item.choices.unshift(fly);
  }
})();
(function () {
  const find = (id) => [...KI.data.decisions, ...KI.data.personalEvents].find((x) => x.id === id);
  const addWhen = (id, extra) => {
    const x = find(id);
    if (!x) return;
    const w = x.when = x.when || {};
    if (extra.flag) w.flag = { ...(w.flag || {}), ...extra.flag };
    if (extra.noFlag) w.noFlag = [...[].concat(w.noFlag || []), ...extra.noFlag];
  };
  const addEffect = (id, choiceIds, effect) => {
    const x = find(id);
    if (!x) return;
    for (const c of x.choices || []) if (!choiceIds || choiceIds.includes(c.id)) c.effects = [...(c.effects || []), effect];
  };
  addEffect("legacy-kid-uni", ["send", "loan"], {"flag":"kidUniChoice","v":true});
  addEffect("legacy-kid-uni", ["voc", "work"], {"flag":"kidUniChoice","v":false});
  addEffect("kid-fm-scholar", null, {"flag":"kidUniChoice","v":true});
  addEffect("kid-sp-dropout", ["fund", "nfe"], {"flag":"kidUniChoice","v":false});
  addEffect("fam-child-leaves", ["bless", "fund"], {"flag":"kidAwayChoice"});
  addEffect("legacy-kid-wedding", null, {"flag":"kidWedding"});
  addWhen("legacy-kid-wedding", {"noFlag":["kidMarried"]});
  addWhen("fam-child-leaves", {"noFlag":["kidStudying"]});
  for (const id of ["kid-fm-job", "kid-leave-home", "kid-fm-hardship"]) addWhen(id, {"flag":{"kidHasJob":true}});
  addWhen("kid-ng-nocall", {"flag":{"kidAway":true}});
})();
(function () {
  const all = [...KI.data.decisions, ...KI.data.personalEvents];
  for (const x of all) {
    const ca = x.when && x.when.childAge;
    if (!Array.isArray(ca) || ca[1] > 22) continue;
    const a = Array.isArray(x.when.age) ? x.when.age : [0, 999];
    x.when.age = [a[0], Math.min(a[1], 65)];
  }
  const bribe = all.find((x) => x.id === "pol-bribe");
  const take = bribe && bribe.choices.find((c) => c.id === "take");
  if (take) {
    const caught = take.roll.find((r) => r.p === 0.3) || take.roll[1];
    const settle = {"text":"ป.ป.ช. เริ่มสอบ แต่คุณรู้จักคนในวงการ วิ่งเต้นจนเรื่องเงียบ เสียเงินเคลียร์ก้อนใหญ่ ตำแหน่งยังอยู่ แต่ชื่อเสียงมัวหมองไปบ้าง","effects":[{"money":-200,"unit":"wageDay"},{"inc":"clout","d":-3},{"stat":"happy","d":-3}]};
    const safe = take.roll.find((r) => r !== caught);
    const connected = {"any":[{"trait":{"social":[70,100]}},{"counter":{"clout":[10,999]}}]};
    take.label = "รับซอง (เสี่ยงโดนตรวจสอบ)";
    take.when = {"any":[{"trait":{"social":[0,69]},"counter":{"clout":[0,9]}}]};
    take.roll = [{...safe, "p":0.7}, {...settle, "p":0.12}, {...caught, "p":0.18}];
    bribe.choices.splice(bribe.choices.indexOf(take) + 1, 0, {...take, "id":"take-connected", "label":"รับซอง เส้นสายช่วยเคลียร์ได้ถ้าโดนสอบ", "when":connected, "roll":[{...safe, "p":0.75}, {...settle, "p":0.2}, {...caught, "p":0.05}]});
  }
})();
KI.data.decisions.push(
  {"id":"love-meet","title":"มีคนเข้ามาในชีวิต","body":"ช่วงนี้มีโอกาสได้รู้จักคนใหม่หลายทาง ทั้งที่ทำงาน งานบุญ และในมือถือ คุณเองก็เริ่มคิดว่าอยากมีใครสักคนอยู่ข้างๆ","when":{"age":[19,65],"noFlag":["partner"],"noCond":["heartbroken","grieving"],"chance":0.4},"cooldown":3,"w":18,
   "choices":[
    {"id":"work","label":"ชวนเพื่อนร่วมงานที่คุยถูกคอไปกินข้าว","text":"จากกินข้าวกลางวันด้วยกัน กลายเป็นนัดดูหนังหลังเลิกงาน","when":{"role":["factory","construction","driver","civil","teacher","office","trader","doctor","nurse","engineer","developer","police","lawyer","pharmacist","accountant","banker","chef","mechanic","artist","creator","rider","security","housekeeper","athlete","designer","business","soldier","farmer","abroad","politician"]},"effects":[{"trait":"social","d":1}],"roll":[{"p":0.65,"text":"อีกฝ่ายก็คิดเหมือนกัน คบกันอย่างเปิดเผย","effects":[{"flag":"partner"},{"cond":"inlove","turns":3},{"stat":"happy","d":5}]},{"p":0.35,"text":"อีกฝ่ายมองเป็นแค่เพื่อน ยังคุยกันดีเหมือนเดิม","effects":[{"stat":"happy","d":-1}]}]},
    {"id":"app","label":"ลองแอปหาคู่","text":"ปัดหาคนที่สนใจ คุยแชตอยู่หลายสัปดาห์ก่อนนัดเจอที่ร้านกาแฟ","when":{"year":[2012,9999]},"effects":[],"roll":[{"p":0.55,"text":"ตัวจริงน่ารักกว่าในรูป คุยกันถูกคอจนตกลงคบกัน","effects":[{"flag":"partner"},{"cond":"inlove","turns":3},{"stat":"happy","d":5}]},{"p":0.45,"text":"เจอแล้วไม่ใช่อย่างที่คิด ลบแอปไปก่อน","effects":[{"stat":"happy","d":-2}]}]},
    {"id":"public","label":"ไปงานบุญหรืองานวัดกับเพื่อน","text":"ระหว่างรำวง มีคนมาขอเบอร์ บอกว่าเห็นมาตั้งแต่ต้นงาน","effects":[{"stat":"happy","d":1}],"roll":[{"p":0.5,"text":"โทรคุยกันทุกคืน ไม่นานก็เป็นแฟนกัน","effects":[{"flag":"partner"},{"cond":"inlove","turns":3},{"stat":"happy","d":4}]},{"p":0.5,"text":"คุยกันได้ไม่กี่ครั้งก็เงียบหายไป","effects":[]}]},
    {"id":"friend","label":"ให้เพื่อนแนะนำคนรู้จัก","text":"เพื่อนนัดกินหมูกระทะแล้วพาคนที่อยากแนะนำมาด้วย","effects":[],"roll":[{"p":0.6,"text":"เข้ากันได้ดีเกินคาด เพื่อนแซวว่าต้องเลี้ยงขอบคุณ","effects":[{"flag":"partner"},{"cond":"inlove","turns":3},{"stat":"happy","d":4}]},{"p":0.4,"text":"นิสัยไม่ตรงกัน แต่ก็ได้เพื่อนใหม่","effects":[{"trait":"social","d":1}]}]},
    {"id":"single","label":"ยังไม่อยากมีใคร อยู่คนเดียวสบายใจดี","text":"ใช้เวลากับงาน งานอดิเรก และครอบครัวต่อไป","effects":[{"stat":"happy","d":1}]}
   ]}
);
