globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
(function () {
  const find=id=>(KI.data.decisions||[]).find(item=>item.id===id);
  const returned=find('career-returnee-next');
  if(returned)for(const choice of returned.choices)if(choice.id==='invest')choice.requiresFunds=true;
  const pension=find('career-old-work');
  if(pension)pension.when={...pension.when,noFlag:[...(pension.when.noFlag||[]),'retiredFrom']};
  KI.data.personalEvents.push(...[
    {id:'followup-returnee-skills',title:'ประสบการณ์ที่นำกลับบ้าน',body:'หลังกลับจากต่างประเทศ คุณได้พบคนที่กำลังมองหาคนสอนทักษะจากงานที่คุณเคยทำ',when:{age:[20,75],loc:'isan',flag:{'career-returnee':true}},cooldown:'once',w:14,choices:[
      {id:'teach',label:'แบ่งปันความรู้ให้คนในชุมชน',text:'คุณเล่าเรื่องการทำงานและสิ่งที่ได้เรียนรู้ให้คนสนใจฟัง',effects:[{stat:'bond',d:3},{stat:'happy',d:2}]},
      {id:'job',label:'นำทักษะไปหางานใกล้บ้าน',text:'คุณลองติดต่อคนรู้จักและมองหาโอกาสที่เหมาะกับตัวเอง',effects:[{stat:'know',d:2},{stat:'happy',d:1}]}
    ]},
    {id:'followup-adopted-child',title:'บ้านที่ค่อยๆ คุ้นเคย',body:'เด็กที่คุณรับมาเลี้ยงเริ่มคุ้นกับบ้าน แต่ยังมีบางวันที่ไม่มั่นใจ คุณอยากสร้างความไว้วางใจอย่างไร',when:{flag:{adoptedChild:true,child:true},childAge:[2,15]},cooldown:'once',w:16,choices:[
      {id:'listen',label:'หาเวลาฟังและคุยกัน',text:'คุณค่อยๆ ฟังความรู้สึกของลูกโดยไม่เร่งให้เล่า',effects:[{stat:'bond',d:4},{stat:'happy',d:2},{pin:'สร้างความไว้วางใจกับลูก'}]},
      {id:'activity',label:'ชวนทำกิจกรรมที่ลูกสนใจ',text:'การใช้เวลาด้วยกันทำให้บ้านคุ้นเคยขึ้นทีละน้อย',effects:[{stat:'bond',d:3},{stat:'happy',d:2}]}
    ]},
    {id:'followup-child-school',title:'วันสำคัญที่โรงเรียน',body:'โรงเรียนของลูกจัดวันแสดงผลงาน ลูกอยากให้คุณไปดูสิ่งที่ตั้งใจทำ',when:{flag:{child:true},childAge:[6,12]},cooldown:'once',w:12,choices:[
      {id:'attend',label:'จัดเวลาไปดูลูก',text:'ลูกดีใจที่ได้เล่าผลงานให้คุณฟังด้วยตัวเอง',effects:[{stat:'bond',d:3},{stat:'happy',d:2}]},
      {id:'later',label:'ติดภารกิจ แต่ขอดูผลงานที่บ้าน',text:'คุณหาเวลาฟังลูกเล่าในตอนเย็น',effects:[{stat:'bond',d:1}]}
    ]},
    {id:'followup-owned-house',title:'บ้านที่ต้องดูแล',body:'หลังมีบ้านของตัวเอง คุณพบจุดเล็กๆ ที่ควรซ่อมก่อนเสียหายมากขึ้น',when:{age:[18,100],flag:{ownsPersonalHome:true},loc:'isan'},cooldown:'once',w:12,choices:[
      {id:'repair',label:'จ้างช่างมาซ่อม',text:'บ้านได้รับการดูแลและคุณเก็บใบค่าใช้จ่ายไว้',requiresFunds:true,effects:[{money:-8,unit:'wageDay'},{stat:'happy',d:2}]},
      {id:'plan',label:'วางแผนเก็บเงินซ่อมก่อน',text:'คุณจดรายการซ่อมและค่อยๆ วางแผนค่าใช้จ่าย',effects:[{stat:'know',d:1}]}
    ]},
    {id:'followup-owned-car',title:'ดูแลรถที่ใช้อยู่',body:'รถที่มีเริ่มถึงระยะตรวจสภาพ คุณกำลังคิดว่าจะจัดการค่าใช้จ่ายอย่างไร',when:{age:[18,100],any:[{flag:{ownsPersonalCar:true}},{flag:{'wl-car':true}}]},cooldown:'once',w:12,choices:[
      {id:'service',label:'นำรถเข้าตรวจและบำรุงรักษา',text:'คุณจ่ายค่าดูแลรถเพื่อเตรียมพร้อมสำหรับการเดินทาง',requiresFunds:true,effects:[{money:-5,unit:'wageDay'},{stat:'happy',d:1}]},
      {id:'schedule',label:'ตรวจรายการและวางแผนค่าใช้จ่าย',text:'คุณจดสิ่งที่ต้องทำและจัดลำดับก่อนหลัง',effects:[{stat:'know',d:1}]}
    ]},
    {id:'followup-retirement',title:'จังหวะชีวิตหลังหยุดงาน',body:'หลังพักจากงานประจำ คุณมีเวลาให้ตัวเองมากขึ้น และเริ่มจัดตารางชีวิตในแบบใหม่',when:{age:[55,100],role:'retired'},cooldown:'once',w:14,choices:[
      {id:'community',label:'เข้าร่วมกิจกรรมในชุมชน',text:'คุณได้พบคนใหม่และมีกิจกรรมที่รอคอย',effects:[{stat:'happy',d:3},{stat:'bond',d:2}]},
      {id:'rest',label:'จัดเวลาพักและดูแลสุขภาพ',text:'คุณค่อยๆ สร้างกิจวัตรที่เหมาะกับตัวเอง',effects:[{stat:'health',d:2},{stat:'happy',d:1}]}
    ]},
    {id:'followup-disability-access',title:'พื้นที่ที่ใช้งานได้สำหรับทุกคน',body:'คุณพบว่าสถานที่ที่ต้องไปประจำเดินทางหรือเข้าใช้งานไม่สะดวก จึงคิดหาทางปรับให้เหมาะกับตัวเอง',when:{age:[8,100],flag:{physicalDisability:true}},cooldown:'once',w:14,choices:[
      {id:'ask',label:'คุยกับผู้ดูแลสถานที่',text:'คุณอธิบายสิ่งที่เป็นอุปสรรคและขอให้ช่วยหาทางปรับปรุง',effects:[{stat:'bond',d:2},{stat:'happy',d:2}]},
      {id:'plan',label:'วางแผนเส้นทางที่สะดวกกว่า',text:'คุณหาวิธีเดินทางและใช้สถานที่ในแบบที่เหมาะกับตัวเอง',effects:[{stat:'know',d:2}]}
    ]},
    {id:'followup-parent-care',title:'จัดเวลาหลังกลับมาดูแลที่บ้าน',body:'การกลับมาอยู่ใกล้ครอบครัวทำให้คุณต้องจัดเวลาระหว่างการดูแลคนที่บ้านกับชีวิตของตัวเอง',when:{age:[20,85],flag:{'fam-caredHome':true,parentsAlive:true}},cooldown:'once',w:14,choices:[
      {id:'share',label:'คุยแบ่งหน้าที่กับคนใกล้ตัว',text:'คุณลองตกลงหน้าที่และเวลาพักให้ชัดขึ้น',effects:[{stat:'bond',d:3},{stat:'happy',d:2}]},
      {id:'schedule',label:'จัดตารางดูแลและเวลาส่วนตัว',text:'คุณเริ่มกันเวลาไว้พักและทำเรื่องของตัวเอง',effects:[{stat:'health',d:2},{stat:'happy',d:1}]}
    ]}
  ]);
})();
