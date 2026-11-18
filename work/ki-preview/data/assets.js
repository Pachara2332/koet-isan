globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.assets = {
  "note": "ราคาหุ้นและอสังหาฯ เป็นราคาจำลองของเกม ไม่ใช่ราคาจริง ทิศทางปีวิกฤตอิงเหตุการณ์จริงโดยประมาณ (ต้มยำกุ้ง 2540, วิกฤตการเงินโลก 2551, โควิด 2563) ชื่อย่อหุ้นเป็นชื่อที่ใช้ในปัจจุบัน บางบริษัทเคยใช้ชื่ออื่นในอดีต ปีที่เปิดให้ซื้อในเกมอิงปีเข้าตลาดหลักทรัพย์โดยประมาณ",
  "stockUnit": 100,
  "stocks": [
    { "id": "SCC", "name": "ปูนซิเมนต์ไทย", "sector": "วัสดุก่อสร้าง", "from": 1975, "base": 40, "drift": 0.09, "vol": 0.22 },
    { "id": "BBL", "name": "ธนาคารกรุงเทพ", "sector": "ธนาคาร", "from": 1975, "base": 30, "drift": 0.08, "vol": 0.24 },
    { "id": "KBANK", "name": "ธนาคารกสิกรไทย", "sector": "ธนาคาร", "from": 1976, "base": 30, "drift": 0.09, "vol": 0.26 },
    { "id": "SCB", "name": "ธนาคารไทยพาณิชย์", "sector": "ธนาคาร", "from": 1976, "base": 30, "drift": 0.09, "vol": 0.26 },
    { "id": "ADVANC", "name": "แอดวานซ์ อินโฟร์ เซอร์วิส", "sector": "สื่อสาร", "from": 1991, "base": 60, "drift": 0.12, "vol": 0.3 },
    { "id": "BDMS", "name": "กรุงเทพดุสิตเวชการ", "sector": "โรงพยาบาล", "from": 1991, "base": 20, "drift": 0.11, "vol": 0.25 },
    { "id": "PTT", "name": "ปตท.", "sector": "พลังงาน", "from": 2001, "base": 50, "drift": 0.08, "vol": 0.25 },
    { "id": "CPALL", "name": "ซีพี ออลล์", "sector": "ค้าปลีก", "from": 2003, "base": 20, "drift": 0.12, "vol": 0.24 },
    { "id": "AOT", "name": "ท่าอากาศยานไทย", "sector": "ขนส่ง", "from": 2004, "base": 30, "drift": 0.11, "vol": 0.24 }
  ],
  "stockShocks": { "1997": -0.5, "1998": -0.15, "1999": 0.3, "2008": -0.45, "2009": 0.5, "2020": -0.12 },
  "property": [
    { "id": "land-village", "name": "ที่นา 5 ไร่ในหมู่บ้าน", "grade": "ทำเลธรรมดา", "where": "home", "base": 300, "growth": 0.07, "vol": 0.05, "info": "ราคาขยับช้า ใช้ทำกินหรือให้เช่าทำนาได้" },
    { "id": "land-roadside", "name": "ที่ดินติดถนนสายหลักในอำเภอ", "grade": "ทำเลดี", "where": "home", "base": 380, "growth": 0.09, "vol": 0.07, "info": "ถนนตัดผ่าน ร้านค้าเริ่มมา ราคาขึ้นเร็วกว่าที่นา" },
    { "id": "shophouse", "name": "ห้องแถวในตัวเมือง", "grade": "ทำเลดี", "where": "town", "base": 1300, "growth": 0.08, "vol": 0.08, "info": "ทำร้านค้าเองหรือปล่อยเช่าได้ ราคาสูงแต่มั่นคง" },
    { "id": "land-town", "name": "ที่ดินกลางเมือง ใกล้ตลาดและห้าง", "grade": "ทำเลทอง", "where": "town", "base": 1100, "growth": 0.1, "vol": 0.09, "info": "ทำเลทองของจังหวัด ราคาแพง ขึ้นเร็วเมื่อเมืองโต" },
    { "id": "land-border", "name": "ที่ดินใกล้ด่านชายแดนริมโขง", "grade": "ทำเลกำลังมา", "where": "border", "base": 300, "growth": 0.06, "vol": 0.12, "info": "ขึ้นกับการค้าข้ามแดน ถ้าการค้าคึกคักราคาพุ่ง ถ้าชายแดนตึงเครียดราคาตก", "boost": { "from": 2015, "growth": 0.1 } },
    { "id": "land-korat-rail", "name": "ที่ดินใกล้แนวรถไฟความเร็วสูง โคราช", "grade": "ทำเลกำลังมา", "where": "korat", "from": 2017, "base": 900, "growth": 0.08, "vol": 0.1, "info": "เก็งกำไรว่ารถไฟความเร็วสูงจะมาถึง เสี่ยงถ้าโครงการล่าช้า" },
    { "id": "condo-bkk", "name": "คอนโดใกล้รถไฟฟ้าในกรุงเทพฯ", "grade": "ทำเลทอง", "where": "bangkok", "from": 1999, "base": 2600, "growth": 0.05, "vol": 0.08, "info": "อยู่เองหรือปล่อยเช่าคนทำงาน ใกล้แหล่งงานในเมืองใหญ่" }
  ],
  "propertyShocks": { "1997": -0.25, "1998": -0.12, "2020": -0.05 },
  "borderProvinces": ["nong-khai", "bueng-kan", "nakhon-phanom", "mukdahan", "loei", "ubon-ratchathani"]
};
KI.data.hobbies = [
  { "id": "football", "label": "เตะฟุตบอลกับเพื่อนตอนเย็น", "minAge": 6, "costDays": 0, "effects": [{ "stat": "health", "d": 1 }, { "stat": "bond", "d": 1 }] },
  { "id": "fishing", "label": "ตกปลา หาปลาตามหนองน้ำ", "minAge": 8, "costDays": 0, "effects": [{ "stat": "happy", "d": 1 }, { "stat": "health", "d": 1 }] },
  { "id": "molam", "label": "ไปดูหมอลำ ร้องคาราโอเกะ", "minAge": 12, "costDays": 2, "effects": [{ "stat": "happy", "d": 2 }, { "stat": "bond", "d": 1 }] },
  { "id": "craft", "label": "ทอผ้า จักสาน งานฝีมือ", "minAge": 10, "costDays": 1, "effects": [{ "stat": "know", "d": 1 }, { "stat": "happy", "d": 1 }] },
  { "id": "garden", "label": "ปลูกผัก เลี้ยงไก่หลังบ้าน", "minAge": 10, "costDays": 1, "effects": [{ "stat": "health", "d": 1 }, { "stat": "happy", "d": 1 }] },
  { "id": "reading", "label": "อ่านหนังสือ การ์ตูน นิยาย", "minAge": 8, "costDays": 1, "effects": [{ "stat": "know", "d": 2 }] },
  { "id": "movie", "label": "ดูหนังกลางแปลงงานวัด", "minAge": 6, "to": 1999, "costDays": 0, "effects": [{ "stat": "happy", "d": 2 }] },
  { "id": "phone", "label": "เล่นมือถือ ดูคลิป โซเชียล", "minAge": 10, "from": 2010, "costDays": 2, "effects": [{ "stat": "happy", "d": 2 }, { "stat": "health", "d": -1 }] },
  { "id": "temple", "label": "เข้าวัดฟังธรรม นั่งสมาธิ", "minAge": 6, "costDays": 0, "effects": [{ "stat": "happy", "d": 1 }, { "trait": "attach", "d": -1 }] },
  { "id": "gym", "label": "วิ่ง ออกกำลังกาย", "minAge": 15, "from": 2005, "costDays": 1, "effects": [{ "stat": "health", "d": 2 }] }
];
