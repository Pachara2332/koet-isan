globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"home-move-out","fx":"fireworks","title":"อยากมีบ้านเป็นของตัวเอง","body":"อยู่บ้านพ่อแม่มานาน คนรักเริ่มพูดถึงบ้านของเราเองบ่อยขึ้น อยากมีห้องนอนที่ไม่ต้องเกรงใจใคร","when":{"age":[24,50],"loc":"isan","flag":{"partner":true},"noFlag":["movedOut","ownsPersonalHome"],"chance":0.3},"cooldown":9,"major":true,
   "choices":[
    {"id":"town","label":"ผ่อนทาวน์เฮาส์ในเมือง (ดาวน์ 20% ผ่อนต่อ 15 ปี)","text":"ได้บ้านหลังเล็กในหมู่บ้านจัดสรร ย้ายข้าวของออกจากบ้านพ่อแม่ คืนแรกในบ้านใหม่นอนไม่หลับเพราะตื่นเต้น","effects":[{"personal":"home-small","finance":true},{"stat":"happy","d":5},{"stat":"bond","d":2},{"pin":"ย้ายออกไปอยู่ทาวน์เฮาส์กับคนรัก"}]},
    {"id":"house","label":"ผ่อนบ้านเดี่ยวสำหรับครอบครัว (ดาวน์ 20% ผ่อนต่อ 15 ปี)","text":"บ้านมีสนามหญ้าเล็กๆ หน้าบ้าน ค่างวดหนักแต่คิดว่าคุ้ม","effects":[{"personal":"home-medium","finance":true},{"stat":"happy","d":6},{"stat":"bond","d":2},{"pin":"ย้ายออกไปอยู่บ้านเดี่ยวกับคนรัก"}]},
    {"id":"cash","label":"ซื้อบ้านเดี่ยวหลังใหญ่ด้วยเงินสด","text":"จ่ายครบในงวดเดียว ไม่มีหนี้ บ้านหลังใหญ่ที่สุดในซอย","when":{"money":[5000000,999999999999]},"effects":[{"personal":"home-large"},{"stat":"happy","d":7},{"stat":"bond","d":2},{"pin":"ซื้อบ้านหลังใหญ่ย้ายออกไปอยู่กับคนรัก"}]},
    {"id":"stay","label":"อยู่บ้านพ่อแม่ต่อ เก็บเงินอีกสักพัก","text":"ประหยัดค่าใช้จ่าย พ่อแม่ดีใจที่ลูกหลานยังอยู่ใกล้ แต่คนรักเงียบไปหลายวัน","effects":[{"stat":"bond","d":1},{"stat":"happy","d":-1}]}
   ]},
  {"id":"home-city-work","title":"งานในเมืองใหญ่","body":"เพื่อนที่ไปทำงานในเมืองใหญ่ของภาคอีสานโทรมาบอกว่ามีตำแหน่งว่าง ค่าแรงดีกว่าที่บ้าน แต่ต้องย้ายไปอยู่ห้องเช่าคนเดียว","when":{"age":[20,45],"flag":{"atHomeProvince":true},"role":["jobless","farmer","construction","driver","trader","factory"],"noFlag":["ownsPersonalHome"],"chance":0.2},"cooldown":12,
   "choices":[
    {"id":"khonkaen","label":"ไปทำงานที่ขอนแก่น","text":"ย้ายเข้าห้องเช่าใกล้ที่ทำงาน คิดถึงบ้านทุกคืนแต่ได้เงินมากขึ้น","effects":[{"move":{"kind":"isan","province":"khon-kaen","setting":"urban"}},{"role":"office"},{"stat":"happy","d":1},{"cond":"homesick","turns":2}]},
    {"id":"korat","label":"ไปทำงานที่นครราชสีมา","text":"เมืองใหญ่ใกล้กรุงเทพฯ งานเยอะ รถติดกว่าที่คิด","effects":[{"move":{"kind":"isan","province":"nakhon-ratchasima","setting":"urban"}},{"role":"factory"},{"cond":"homesick","turns":2}]},
    {"id":"udon","label":"ไปทำงานที่อุดรธานี","text":"ได้งานในห้างใหญ่กลางเมือง เพื่อนใหม่เยอะ","effects":[{"move":{"kind":"isan","province":"udon-thani","setting":"urban"}},{"role":"trader"},{"cond":"homesick","turns":2}]},
    {"id":"stay","label":"อยู่บ้านเกิดต่อ","text":"เงินน้อยกว่า แต่ได้อยู่กับครอบครัว","effects":[{"stat":"bond","d":2}]}
   ]},
  {"id":"home-return","title":"คิดถึงบ้านเกิด","body":"ทำงานไกลบ้านมาหลายปี พ่อแม่แก่ลงทุกปี เพื่อนเก่าในหมู่บ้านชวนกลับไปทำกินที่บ้าน","when":{"age":[25,70],"any":[{"loc":"bangkok"},{"loc":"isan","flag":{"atHomeProvince":false}}],"chance":0.2},"cooldown":12,
   "choices":[
    {"id":"home","label":"ลาออกแล้วกลับบ้านเกิด","text":"เก็บข้าวของกลับบ้าน พ่อแม่ยิ้มทั้งวัน รายได้ลดลงแต่ใจสบาย","when":{"role":["jobless","farmer","factory","construction","driver","office","trader","rider","security","housekeeper","chef","mechanic","business","creator","artist","designer","developer"]},"effects":[{"move":"home"},{"role":"farmer"},{"stat":"bond","d":5},{"stat":"happy","d":3},{"uncond":"homesick"},{"pin":"กลับมาอยู่บ้านเกิด"}]},
    {"id":"rest","label":"ย้ายกลับไปใช้ชีวิตบั้นปลายที่บ้านเกิด","text":"กลับไปอยู่ใกล้ญาติพี่น้อง ตื่นเช้ามาเห็นทุ่งนาเหมือนตอนเด็ก","when":{"role":"retired"},"effects":[{"move":"home"},{"stat":"bond","d":4},{"stat":"happy","d":4},{"uncond":"homesick"},{"pin":"กลับมาใช้ชีวิตบั้นปลายที่บ้านเกิด"}]},
    {"id":"visit","label":"ทำงานต่อ แต่กลับบ้านทุกเทศกาล","text":"ค่ารถไปกลับหลายรอบต่อปี แต่ได้เห็นหน้าพ่อแม่บ่อยขึ้น","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"stay","label":"ปักหลักที่นี่ต่อ","text":"ชีวิตที่นี่ลงตัวแล้ว","effects":[{"stat":"happy","d":0}]}
   ]},
  {"id":"home-sibling-bkk","title":"พี่น้องอยากตามมาทำงานด้วย","body":"พี่น้องที่บ้านโทรมาบอกว่าหางานที่บ้านไม่ได้ ขอมาอยู่ห้องเช่าด้วยระหว่างหางานในกรุงเทพฯ","when":{"age":[18,50],"loc":"bangkok","flag":{"hasSiblings":true},"noFlag":["siblingInBkk"],"chance":0.25},"cooldown":12,
   "choices":[
    {"id":"take","label":"ให้มาอยู่ด้วย ช่วยฝากงาน","text":"ห้องแคบลง แต่มีคนกินข้าวด้วยทุกเย็น ไม่เหงาเหมือนเดิม","character":"kind","effects":[{"flag":"siblingInBkk"},{"money":-15,"unit":"wageDay"},{"stat":"bond","d":4},{"stat":"happy","d":2},{"uncond":"homesick"}]},
    {"id":"money","label":"ส่งเงินไปให้แทน บอกว่าห้องไม่พอ","text":"พี่น้องเข้าใจ แต่เสียงดูผิดหวัง","effects":[{"money":-10,"unit":"wageDay"},{"stat":"bond","d":-1}]},
    {"id":"no","label":"บอกให้หางานที่บ้านไปก่อน","text":"วางสายแล้วรู้สึกผิดอยู่หลายวัน","effects":[{"stat":"bond","d":-3}]}
   ]}
]);
