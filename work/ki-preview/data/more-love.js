globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"love-reconcile","title":"คนเก่ากลับมาคุย","body":"หลังเลิกกันมาได้สักพัก คนเก่าติดต่อมาบอกว่าคิดถึงลูก และอยากลองกลับมาเป็นครอบครัวเดียวกันอีกครั้ง","when":{"age":[22,70],"flag":{"hasEx":true,"child":true},"noFlag":["partner"],"chance":0.2},"cooldown":9,"major":true,"choices":[
    {"id":"back","label":"กลับมาคืนดีกันเพื่อลูก","text":"ทั้งคู่ตกลงลองเริ่มใหม่","effects":[{"stat":"happy","d":2}],"roll":[
      {"p":0.6,"text":"บ้านกลับมาอบอุ่น ลูกยิ้มได้อีกครั้ง","effects":[{"flag":"reconcile","v":true},{"flag":"partner","v":true},{"flag":"married","v":true},{"stat":"bond","d":10},{"stat":"happy","d":8},{"uncond":"heartbroken"},{"pin":"กลับมาคืนดีกับคนเก่า"}]},
      {"p":0.4,"text":"ลองแล้วก็ยังทะเลาะเรื่องเดิม สุดท้ายต่างคนต่างไป","effects":[{"stat":"happy","d":-10,"by":"attach"},{"cond":"heartbroken","turns":2,"by":"attach"}]}]},
    {"id":"coparent","label":"ไม่กลับมาเป็นคู่ แต่ช่วยกันเลี้ยงลูกดีๆ","text":"ตกลงกันได้ด้วยดี ลูกได้เจอทั้งพ่อและแม่","effects":[{"stat":"bond","d":5},{"stat":"happy","d":2}]},
    {"id":"no","label":"ปิดประตูเรื่องเก่า","text":"ใจหายอยู่บ้าง แต่ชัดเจนกับตัวเอง","effects":[{"stat":"happy","d":-2,"by":"attach"},{"trait":"attach","d":-2}]},
    {"id":"time","label":"ขอเวลาคิดอีกสักพัก","text":"ยังไม่ตอบตอนนี้ อาจมีโอกาสคุยกันอีก","effects":[{"stat":"happy","d":-1}]}]},
  {"id":"love-single-check","title":"อยากมีคู่ไหม","body":"ใช้ชีวิตคนเดียวมาระยะหนึ่งแล้ว คนรอบตัวเริ่มถามว่าจะมีใครสักคนไหม","when":{"age":[20,85],"noFlag":["partner"],"any":[{"age":[30,85]},{"flag":{"hasEx":true}}]},"cooldown":9,"major":true,"choices":[
    {"id":"seek","label":"อยากมีคู่ เปิดใจหาคนใหม่","text":"เริ่มออกไปเจอผู้คนมากขึ้น","effects":[{"stat":"happy","d":1}],"roll":[
      {"p":0.55,"text":"ได้เจอคนที่คุยกันถูกคอ ค่อยๆ คบหากัน","effects":[{"flag":"partner","v":true},{"cond":"inlove","turns":3},{"stat":"happy","d":6},{"pin":"เริ่มต้นความรักครั้งใหม่"}]},
      {"p":0.45,"text":"ยังไม่เจอใครที่ใช่ แต่ได้เพื่อนใหม่","effects":[{"stat":"bond","d":2}]}]},
    {"id":"matchmake","label":"ให้ญาติผู้ใหญ่ช่วยแนะนำคนให้","text":"ญาติพาไปรู้จักคนในหมู่บ้านใกล้เคียง","when":{"loc":"isan"},"effects":[{"stat":"bond","d":2}],"roll":[
      {"p":0.5,"text":"ถูกใจกันทั้งสองฝ่าย ผู้ใหญ่ดีใจ","effects":[{"flag":"partner","v":true},{"stat":"happy","d":5}]},
      {"p":0.5,"text":"คุยกันไม่ถูกคอ ต่างคนต่างแยกย้าย","effects":[{"stat":"happy","d":-1}]}]},
    {"id":"app","label":"ลองหาคู่ผ่านแอป","text":"ปัดหาคนในแอปหาคู่","when":{"year":[2013,9999],"age":[20,60]},"effects":[],"roll":[
      {"p":0.4,"text":"นัดเจอแล้วถูกใจ เริ่มคบกัน","effects":[{"flag":"partner","v":true},{"stat":"happy","d":5}]},
      {"p":0.45,"text":"คุยไปมาแล้วเงียบหาย","effects":[{"stat":"happy","d":-2}]},
      {"p":0.15,"text":"เจอโปรไฟล์ปลอมหลอกให้โอนเงิน","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-5}]}]},
    {"id":"single","label":"อยู่คนเดียวแบบนี้ก็มีความสุขดี","text":"เลือกใช้ชีวิตคนเดียวอย่างสบายใจ","effects":[{"stat":"happy","d":3},{"trait":"attach","d":-1}]},
    {"id":"notyet","label":"ยังไม่พร้อม ขอโฟกัสเรื่องอื่นก่อน","text":"ยังไม่คิดเรื่องนี้ตอนนี้","effects":[{"stat":"know","d":1}]}]}
]);
KI.data.personalEvents.push(...[
  {"id":"love-new-meet","title":"เจอคนใหม่โดยบังเอิญ","body":"ในงานบุญประจำปี มีคนหนึ่งเข้ามาชวนคุยอย่างเป็นกันเอง ดูจริงใจ","w":12,"when":{"age":[22,70],"noFlag":["partner"],"flag":{"hasEx":true},"chance":0.25},"cooldown":12,"choices":[
    {"id":"date","label":"ชวนไปกินข้าวด้วยกัน","text":"คุยกันได้นานกว่าที่คิด นัดเจอกันอีกหลายครั้งจนเริ่มคบกัน","effects":[{"flag":"partner","v":true},{"cond":"inlove","turns":3},{"stat":"happy","d":5}]},
    {"id":"friend","label":"คุยเป็นเพื่อนไปก่อน","text":"ได้เพื่อนใหม่ไว้คุยด้วย","effects":[{"stat":"bond","d":2}]},
    {"id":"kids-first","label":"บอกตรงๆ ว่าตอนนี้ขอดูแลลูกก่อน","text":"อีกฝ่ายเข้าใจและให้เกียรติ","when":{"flag":{"child":true}},"effects":[{"stat":"bond","d":3}]},
    {"id":"no","label":"ยังไม่อยากเปิดใจกับใคร","text":"เดินกลับบ้านคนเดียวเงียบๆ","effects":[{"stat":"happy","d":-1,"by":"attach"}]}]}
]);
