globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.focus = [
  {
    "id": "study",
    "when": {
      "edu": {
        "in": [
          "school",
          "voc",
          "hvoc",
          "uni",
          "novice"
        ]
      }
    },
    "label": "ตั้งใจเรียน",
    "perSeason": [
      {
        "stat": "know",
        "d": 3
      },
      {
        "stat": "happy",
        "d": -1
      }
    ]
  },
  {
    "id": "health",
    "when": {
      "age": [
        7,
        120
      ]
    },
    "label": "ดูแลสุขภาพ",
    "perSeason": [
      {
        "stat": "health",
        "d": 2
      }
    ]
  },
  {
    "id": "family",
    "when": {
      "age": [
        7,
        120
      ]
    },
    "label": "ช่วยงานบ้านและอยู่กับครอบครัว",
    "perSeason": [
      {
        "stat": "bond",
        "d": 2
      }
    ]
  },
  {
    "id": "friends",
    "when": {
      "age": [
        7,
        120
      ]
    },
    "label": "ใช้เวลากับเพื่อนฝูง",
    "perSeason": [
      {
        "stat": "bond",
        "d": 1
      },
      {
        "stat": "know",
        "d": -1
      },
      {
        "stat": "happy",
        "d": 1
      }
    ]
  },
  {
    "id": "earn",
    "when": {
      "age": [
        15,
        70
      ]
    },
    "label": "หาเงินให้มากขึ้น",
    "perSeason": [
      {
        "money": 10,
        "unit": "wageDay"
      },
      {
        "stat": "health",
        "d": -1
      },
      {
        "stat": "happy",
        "d": -1
      }
    ]
  },
  {
    "id": "care",
    "when": {
      "age": [
        25,
        75
      ]
    },
    "label": "ดูแลพ่อแม่",
    "perSeason": [
      {
        "stat": "bond",
        "d": 3
      },
      {
        "money": -3,
        "unit": "wageDay"
      }
    ]
  },
  {
    "id": "merit",
    "when": {
      "age": [
        40,
        120
      ]
    },
    "label": "เข้าวัดทำบุญ",
    "perSeason": [
      {
        "trait": "attach",
        "d": -1
      }
    ]
  }
];
