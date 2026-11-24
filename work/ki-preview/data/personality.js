globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  KI.data.personalEvents.push(...[
    {id:'character-kind-neighbour',title:'คนในชุมชนมาขอคำปรึกษา',body:'ที่ผ่านมา คุณมักรับฟังและช่วยเหลือคนอื่น วันนี้คนในชุมชนมาขอคำปรึกษาเรื่องที่เขากำลังลำบาก',when:{age:[18,100],personality:'kind',loc:'isan'},cooldown:'once',w:16,choices:[
      {id:'listen',label:'รับฟังและช่วยคิดหาทางออก',text:'คุณรับฟังโดยไม่ตัดสิน และช่วยกันมองหาความช่วยเหลือที่เหมาะสม',character:'kind',effects:[{stat:'bond',d:3},{stat:'happy',d:2}]},
      {id:'boundary',label:'รับฟัง แต่บอกขอบเขตที่ช่วยไหว',text:'คุณบอกตามตรงว่าช่วยได้แค่ไหน แล้วชวนหาคนอื่นที่อาจช่วยต่อได้',effects:[{stat:'bond',d:1}]}
    ]},
    {id:'character-kind-student',title:'เพื่อนขอความช่วยเหลือ',body:'เพื่อนจำได้ว่าคุณเคยช่วยคนอื่น จึงมาขอให้ช่วยอธิบายเรื่องที่เรียนไม่เข้าใจ',when:{age:[8,18],personality:'kind',role:'student'},cooldown:'once',w:16,choices:[
      {id:'teach',label:'ช่วยอธิบายเท่าที่ทำได้',text:'คุณกับเพื่อนช่วยกันทบทวนจนเข้าใจมากขึ้น',character:'kind',effects:[{stat:'bond',d:3},{stat:'know',d:1}]},
      {id:'later',label:'บอกว่าวันนี้ไม่สะดวก',text:'คุณบอกเพื่อนตามตรงและชวนไปถามครู',effects:[{stat:'happy',d:1}]}
    ]},
    {id:'character-kind-opportunity',title:'โอกาสที่ต้องเลือก',body:'คนรู้จักเห็นว่าคุณคอยช่วยเหลือผู้อื่น จึงชวนร่วมกิจกรรมของชุมชน แต่คุณเองก็มีภาระต้องจัดการ',when:{age:[20,90],personality:'kind'},cooldown:'once',w:14,choices:[
      {id:'join',label:'ช่วยเท่าที่มีเวลา',text:'คุณร่วมกิจกรรมในส่วนที่ไหว และยังแบ่งเวลาให้ตัวเอง',character:'kind',effects:[{stat:'bond',d:3},{stat:'happy',d:1}]},
      {id:'rest',label:'พักและจัดการภาระของตัวเองก่อน',text:'คุณปฏิเสธอย่างสุภาพและพักโดยไม่ต้องรู้สึกผิด',effects:[{stat:'health',d:2}]}
    ]},
    {id:'character-harm-repair',title:'ความไว้ใจที่ต้องสร้างใหม่',body:'หลังจากที่คุณเคยตัดสินใจเอาเปรียบหรือทำร้ายผู้อื่น คนใกล้ตัวเริ่มระวังและอยากเห็นว่าคุณจะทำอย่างไรต่อ',when:{age:[15,100],personality:'harmful'},cooldown:'once',w:16,choices:[
      {id:'change',label:'ยอมรับสิ่งที่ทำและเริ่มแก้ไข',text:'คุณรับผิดชอบต่อการกระทำ และเข้าใจว่าความไว้ใจต้องใช้เวลาสร้างใหม่',character:'kind',effects:[{stat:'bond',d:2},{pin:'เริ่มเปลี่ยนแปลงตัวเอง'}]},
      {id:'ignore',label:'ไม่สนใจและเดินหน้าต่อ',text:'คุณเลือกไม่พูดถึงเรื่องที่ผ่านมา คนใกล้ตัวยังรักษาระยะห่าง',effects:[{stat:'bond',d:-2}]}
    ]},
    {id:'character-mixed-crossroads',title:'สิ่งที่อยากเป็นต่อจากนี้',body:'เมื่อมองย้อนกลับไป คุณพบว่าบางครั้งเคยช่วยเหลือผู้อื่น และบางครั้งก็เคยเลือกเอาเปรียบ ถึงเวลาคิดว่าจากนี้จะทำอย่างไร',when:{age:[18,100],personality:'mixed'},cooldown:'once',w:12,choices:[
      {id:'change',label:'ตั้งใจรับฟังและรับผิดชอบมากขึ้น',text:'คุณเลือกเริ่มจากการกระทำเล็กๆ ที่ทำได้จริง',character:'kind',effects:[{stat:'happy',d:1}]},
      {id:'reflect',label:'ทบทวนตัวเองไปก่อน',text:'คุณยังไม่รีบสรุปว่าตัวเองเป็นคนแบบไหน',effects:[{stat:'happy',d:1}]}
    ]}
  ]);
  const kindChoices={
    'child-friends':['share'], 'school-friends-activity':['help'], 'fam-grand-morning':['help'],
    'fam-care-parents':['go-home','sibling-turn','bring-parents'], 'parent-sick':['care','move'],
    'crime-teen-steal':['warn'], 'crime-moto':['tell'], 'crime-drug':['report'],
    'followup-returnee-skills':['teach'], 'followup-adopted-child':['listen','activity'],
    'followup-child-school':['attend'], 'followup-parent-care':['share']
  };
  for(const item of [...KI.data.decisions,...KI.data.personalEvents])for(const choice of item.choices||[]) {
    if((kindChoices[item.id]||[]).includes(choice.id))choice.character='kind';
  }
})();
