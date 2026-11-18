globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.conditions = {
  "heartbroken": { "name": "ใจสลาย", "icon": "💔", "perTurn": [{ "stat": "happy", "d": -4 }, { "stat": "health", "d": -1 }] },
  "homesick": { "name": "คิดถึงบ้าน", "icon": "🏡", "perTurn": [{ "stat": "happy", "d": -3 }] },
  "indebted": { "name": "เป็นหนี้", "icon": "💸", "perTurn": [{ "stat": "happy", "d": -2 }, { "money": -3, "unit": "wageDay" }] },
  "sick": { "name": "ป่วยเรื้อรัง", "icon": "🤒", "perTurn": [{ "stat": "health", "d": -4 }, { "stat": "happy", "d": -2 }] },
  "grieving": { "name": "โศกเศร้า", "icon": "🕯️", "perTurn": [{ "stat": "happy", "d": -4 }] },
  "inlove": { "name": "มีความรัก", "icon": "💗", "perTurn": [{ "stat": "happy", "d": 3 }, { "stat": "bond", "d": 1 }] },
  "proud": { "name": "ภูมิใจ", "icon": "🌟", "perTurn": [{ "stat": "happy", "d": 2 }] },
  "lonely": { "name": "เหงา", "icon": "🌧️", "perTurn": [{ "stat": "happy", "d": -2 }, { "stat": "bond", "d": -1 }] }
};
