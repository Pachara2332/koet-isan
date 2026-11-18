globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions.push(...[
  {"id":"dis-crop-ins","title":"ประกันภัยข้าวนาปี","body":"เจ้าหน้าที่ ธ.ก.ส. มาชวนทำประกันภัยข้าวนาปี จ่ายเบี้ยไม่กี่บาทต่อไร่ ถ้าน้ำท่วมหรือแล้งจนข้าวเสียหายจะได้เงินชดเชย","when":{"year":[2011,9999],"role":"farmer","season":1,"noFlag":["dis-cropIns"],"chance":0.4},"cooldown":15,"choices":[
    {"id":"buy","label":"ทำประกันไว้","text":"เซ็นใบสมัครที่สาขา ธ.ก.ส. ในอำเภอ","effects":[{"flag":"dis-cropIns"},{"money":-1,"unit":"wageDay"}]},
    {"id":"no","label":"ไม่ทำ เสียดายเงินเบี้ย","text":"ทำนามาทั้งชีวิตยังไม่เคยต้องใช้","effects":[]}]},
  {"id":"dis-flood-field","title":"น้ำท่วมนา","body":"ฝนตกไม่หยุดหลายวัน น้ำล้นตลิ่งเข้าท่วมนา ต้นข้าวที่กำลังออกรวงจมอยู่ใต้น้ำ","when":{"loc":"isan","season":[1,2],"any":[{"role":"farmer"},{"setting":"rural","flag":{"parentsAlive":true}}],"chance":0.07},"cooldown":12,"major":true,"choices":[
    {"id":"claim","label":"ยื่นเคลมประกันภัยข้าว","text":"เจ้าหน้าที่มาถ่ายรูปแปลงนา อีกเดือนเงินชดเชยเข้าบัญชี","when":{"flag":{"dis-cropIns":true}},"effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":-2},{"pin":"น้ำท่วมนา ได้เงินประกันชดเชย"}]},
    {"id":"relief","label":"ลงชื่อรับเงินช่วยเหลือจากรัฐ","text":"รอผู้ใหญ่บ้านรวบรวมรายชื่อ ได้เงินช้าแต่ช่วยได้บ้าง","when":{"year":[1990,9999]},"effects":[{"money":-18,"unit":"wageDay"},{"stat":"happy","d":-4}]},
    {"id":"replant","label":"รอน้ำลดแล้วหว่านใหม่","text":"ลงทุนซื้อเมล็ดพันธุ์อีกรอบ หวังว่าจะทันฤดู","effects":[{"money":-8,"unit":"wageDay"},{"stat":"health","d":-2}],"roll":[
      {"p":0.55,"text":"ข้าวรอบใหม่ขึ้นทัน ได้ผลผลิตครึ่งหนึ่ง","effects":[{"money":8,"unit":"wageDay"}]},
      {"p":0.45,"text":"หมดฤดูก่อน ข้าวรอบใหม่ไม่ทันเกี่ยว","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-4}]}]},
    {"id":"bkk","label":"ไปรับจ้างในเมืองชดเชยรายได้","text":"ฝากนาไว้กับญาติ ขึ้นรถไปทำงานก่อสร้าง","effects":[{"move":{"kind":"bangkok"}},{"role":"construction"},{"money":-15,"unit":"wageDay"},{"cond":"homesick","turns":2,"by":"attach"}]},
    {"id":"loss","label":"ยอมรับความเสียหาย","text":"ปีนี้ไม่มีข้าวขาย ต้องซื้อข้าวกินเป็นครั้งแรก","effects":[{"money":-25,"unit":"wageDay"},{"stat":"happy","d":-6}]}]},
  {"id":"dis-drought-rice","title":"ฝนทิ้งช่วง ข้าวยืนต้นตาย","body":"ฝนไม่ตกมาเกือบเดือน ดินในนาแตกระแหง กล้าข้าวที่เพิ่งปักดำเริ่มเหลืองแห้ง","when":{"loc":"isan","season":1,"any":[{"role":"farmer"},{"setting":"rural","flag":{"parentsAlive":true}}],"chance":0.07},"cooldown":12,"major":true,"choices":[
    {"id":"pump","label":"เช่าเครื่องสูบน้ำจากหนองมาใส่นา","text":"ค่าน้ำมันแพง แต่อาจรักษาข้าวไว้ได้","when":{"year":[1985,9999]},"effects":[{"money":-10,"unit":"wageDay"}],"roll":[
      {"p":0.6,"text":"ข้าวรอด ได้ผลผลิตเกือบเต็ม","effects":[{"money":12,"unit":"wageDay"},{"stat":"happy","d":2}]},
      {"p":0.4,"text":"หนองแห้งก่อน ข้าวตายอยู่ดี","effects":[{"money":-8,"unit":"wageDay"},{"stat":"happy","d":-4}]}]},
    {"id":"claim","label":"ยื่นเคลมประกันภัยข้าว","text":"ได้เงินชดเชยตามจำนวนไร่ที่เสียหาย","when":{"flag":{"dis-cropIns":true}},"effects":[{"money":-5,"unit":"wageDay"},{"stat":"happy","d":-2}]},
    {"id":"pray","label":"ร่วมงานบุญบั้งไฟขอฝน","text":"ทั้งหมู่บ้านช่วยกันจุดบั้งไฟ หวังให้ฝนมา","effects":[{"stat":"bond","d":3},{"trait":"social","d":1}],"roll":[
      {"p":0.4,"text":"ไม่กี่วันต่อมาฝนตกลงมาจริงๆ ข้าวฟื้น","effects":[{"stat":"happy","d":5}]},
      {"p":0.6,"text":"ฝนไม่มา ข้าวเสียหายหนัก","effects":[{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-5}]}]},
    {"id":"cassava","label":"ไถทิ้ง หันไปปลูกมันสำปะหลัง","text":"พืชทนแล้งกว่า แต่ราคาไม่แน่นอน","effects":[{"money":-12,"unit":"wageDay"},{"trait":"grit","d":1}]},
    {"id":"loss","label":"ปล่อยไปตามฟ้าฝน","text":"ปีนี้ได้ข้าวไม่ถึงครึ่ง","effects":[{"money":-20,"unit":"wageDay"},{"stat":"happy","d":-5}]}]},
  {"id":"dis-house-fire","title":"ไฟไหม้บ้าน","body":"กลางดึกมีคนตะโกนว่าไฟไหม้ เปลวไฟลามจากครัวขึ้นไปถึงหลังคา","when":{"age":[8,90],"chance":0.0015},"cooldown":45,"major":true,"heavy":true,"choices":[
    {"id":"save-people","label":"พาคนในบ้านออกมาก่อน","text":"ทุกคนปลอดภัย แต่ข้าวของไหม้เกือบหมด","effects":[{"money":-50,"unit":"wageDay"},{"stat":"happy","d":-10},{"stat":"bond","d":5},{"pin":"บ้านถูกไฟไหม้"}]},
    {"id":"save-stuff","label":"วิ่งกลับเข้าไปเอาโฉนดกับเงินเก็บ","text":"คว้ากล่องเอกสารออกมาได้ทันเวลา","effects":[{"money":-30,"unit":"wageDay"},{"stat":"happy","d":-8},{"pin":"บ้านถูกไฟไหม้"}],"roll":[
      {"p":0.25,"text":"สำลักควันและถูกไฟลวกหนัก","effects":[{"stat":"health","d":-15},{"die":"fire","p":0.15}]}]},
    {"id":"fight","label":"ช่วยเพื่อนบ้านตักน้ำดับไฟ","text":"ทั้งหมู่บ้านมาช่วยกันส่งถังน้ำ","effects":[{"stat":"bond","d":4},{"stat":"health","d":-2}],"roll":[
      {"p":0.5,"text":"ดับได้ทัน เสียหายแค่ครัว","effects":[{"money":-12,"unit":"wageDay"},{"stat":"happy","d":-3}]},
      {"p":0.5,"text":"ไฟแรงเกินไป บ้านไหม้หมดทั้งหลัง","effects":[{"money":-50,"unit":"wageDay"},{"stat":"happy","d":-10}]}]}]},
  {"id":"dis-storm","title":"พายุฤดูร้อน","body":"ลมกระโชกแรงพร้อมลูกเห็บ หลังคาสังกะสีปลิวไปหลายแผ่น ต้นไม้หน้าบ้านหักทับรั้ว","when":{"loc":"isan","season":0,"age":[15,90],"chance":0.05},"cooldown":15,"choices":[
    {"id":"fix","label":"ซ่อมหลังคาใหม่ทั้งหมด","text":"จ้างช่างมามุงหลังคาใหม่ แข็งแรงกว่าเดิม","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":1}]},
    {"id":"self","label":"ขึ้นซ่อมเองกับเพื่อนบ้าน","text":"ประหยัดเงิน แต่ต้องปีนป่ายที่สูง","effects":[{"money":-5,"unit":"wageDay"},{"stat":"bond","d":2}],"roll":[
      {"p":0.08,"text":"พลาดตกจากหลังคา","effects":[{"stat":"health","d":-12},{"die":"fall","p":0.15}]}]},
    {"id":"tarp","label":"เอาผ้าใบคลุมไว้ก่อน","text":"รอเงินช่วยเหลือจาก อบต.","effects":[{"money":-1,"unit":"wageDay"},{"stat":"happy","d":-2}]}]},
  {"id":"dis-cattle","title":"โรคระบาดในวัวควาย","body":"วัวในคอกเริ่มน้ำลายยืด กีบเท้าเป็นแผล ปศุสัตว์อำเภอประกาศว่าโรคปากและเท้าเปื่อยกำลังระบาด","when":{"loc":"isan","setting":"rural","age":[15,85],"chance":0.02},"cooldown":24,"major":true,"choices":[
    {"id":"vet","label":"ตามสัตวแพทย์มาฉีดยา แยกคอก","text":"เสียค่ายาแต่รักษาไว้ได้ส่วนใหญ่","effects":[{"money":-8,"unit":"wageDay"}],"roll":[{"p":0.3,"text":"วัวตายไปหนึ่งตัวอยู่ดี","effects":[{"money":-10,"unit":"wageDay"},{"stat":"happy","d":-2}]}]},
    {"id":"sell","label":"รีบขายก่อนลามทั้งคอก","text":"พ่อค้ากดราคาเหลือครึ่งเดียว","effects":[{"money":-15,"unit":"wageDay"},{"stat":"happy","d":-3}]},
    {"id":"wait","label":"รักษาเองตามวิธีคนเฒ่าคนแก่","text":"ทาสมุนไพรแล้วรอดูอาการ","effects":[],"roll":[
      {"p":0.4,"text":"วัวค่อยๆ หายเอง","effects":[{"stat":"happy","d":2}]},
      {"p":0.6,"text":"ตายไปเกือบครึ่งคอก","effects":[{"money":-30,"unit":"wageDay"},{"stat":"happy","d":-6}]}]}]},
  {"id":"dis-pest","title":"เพลี้ยกระโดดลงนา","body":"ต้นข้าวเริ่มเหลืองเป็นหย่อมๆ พลิกดูโคนต้นเจอเพลี้ยกระโดดสีน้ำตาลเต็มไปหมด","when":{"loc":"isan","season":[1,2],"role":"farmer","year":[1975,9999],"chance":0.05},"cooldown":15,"choices":[
    {"id":"spray","label":"ฉีดยาฆ่าแมลง","text":"ได้ผลเร็ว แต่สูดละอองยาไปเยอะ","effects":[{"money":-6,"unit":"wageDay"},{"stat":"health","d":-3}]},
    {"id":"bio","label":"ใช้วิธีธรรมชาติตามเกษตรอำเภอแนะนำ","text":"ปล่อยน้ำออกจากนา ใช้เชื้อราปราบเพลี้ย","effects":[{"money":-3,"unit":"wageDay"},{"stat":"know","d":2}],"roll":[{"p":0.4,"text":"ช้าไป ข้าวเสียหายบางส่วน","effects":[{"money":-8,"unit":"wageDay"}]}]},
    {"id":"ignore","label":"ปล่อยไว้","text":"หวังว่าเพลี้ยจะไม่ลามมาก","effects":[],"roll":[{"p":0.7,"text":"ลามทั้งแปลง ผลผลิตหายไปครึ่ง","effects":[{"money":-18,"unit":"wageDay"},{"stat":"happy","d":-4}]}]}]}
]);
