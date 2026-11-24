globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push({
  id:'partner-join-abroad',title:'คนรักอยากมาทำงานด้วย',
  body:'หลังคุณไปทำงานต่างประเทศ คนรักอยากสมัครงานและเตรียมเอกสารเพื่อมาทำงานในประเทศเดียวกัน คุณทั้งคู่คุยกันว่าจะจัดการอย่างไร',
  when:{loc:'abroad',role:'abroad',flag:{partnerCanJoinAbroad:true}},cooldown:12,w:20,
  choices:[
    {id:'join',label:'ช่วยกันเตรียมตัวให้มาทำงานด้วย',text:'คุณช่วยออกค่าเตรียมตัว คนรักสมัครงานและเดินทางมาทำงานในประเทศเดียวกัน',requiresFunds:true,effects:[{money:-15,unit:'wageDay'},{flag:'partnerJoinAbroad'},{stat:'bond',d:4},{pin:'คนรักมาทำงานต่างประเทศด้วย'}]},
    {id:'wait',label:'ยังไม่พร้อม ขอคุยกันอีกครั้งภายหลัง',text:'คุณทั้งคู่ตัดสินใจอยู่คนละที่ไปก่อน และวางแผนอนาคตร่วมกัน',effects:[{stat:'bond',d:1}]}
  ]
});
