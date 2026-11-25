globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"care-elder-parents","title":"พ่อแม่แก่ตัวลง","body":"พ่อแม่อายุเจ็ดสิบกว่าแล้ว เดินช้าลง ลืมกินยาบ่อย พี่น้องต่างมีภาระของตัวเอง ส่วนคุณมีบ้านของตัวเองที่ยังพอมีห้องว่าง","when":{"age":[30,75],"flag":{"elderParent":true,"ownsPersonalHome":true},"noFlag":["parentsWithUs"],"chance":0.35},"cooldown":9,"major":true,
   "choices":[
    {"id":"bring","label":"รับพ่อแม่มาอยู่ด้วยที่บ้าน","text":"ปรับห้องชั้นล่าง ติดราวจับในห้องน้ำ เช้าเย็นได้กินข้าวพร้อมหน้า บ้านอบอุ่นขึ้น แต่ทุกฤดูจะมีค่ากินอยู่และค่ายาของพ่อแม่เพิ่มขึ้น","character":"kind","effects":[{"money":-150,"unit":"wageDay"},{"flag":"parentsWithUs"},{"stat":"bond","d":6},{"stat":"happy","d":2},{"inc":"good"}]},
    {"id":"carer","label":"จ้างคนดูแลที่บ้านเดิม","text":"มีคนคอยดูแลทั้งวัน พ่อแม่ได้อยู่บ้านที่คุ้นเคย แต่ค่าจ้างก็ไม่ใช่น้อย","effects":[{"money":-365,"unit":"wageDay"},{"stat":"bond","d":2}]},
    {"id":"send","label":"ส่งเงินไปให้ทุกเดือน","text":"พ่อแม่มีเงินใช้ แต่ยังต้องดูแลกันเองตามประสา","effects":[{"money":-120,"unit":"wageDay"},{"stat":"bond","d":1}]},
    {"id":"leave","label":"ปล่อยไว้ก่อน ยังพอช่วยเหลือตัวเองได้","text":"ไม่มีค่าใช้จ่ายเพิ่ม แต่ทุกครั้งที่โทรกลับบ้าน เสียงพ่อแม่ดูเหงาลง","effects":[{"stat":"bond","d":-5},{"stat":"happy","d":-2}]}
   ]}
]);
