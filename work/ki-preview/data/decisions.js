globalThis.KI = globalThis.KI || {}; KI.data = KI.data || {};
KI.data.decisions = [
  {"id":"grandchild-arrives","title":"ครอบครัวมีสมาชิกใหม่","body":"ลูกที่เติบโตแล้วมีลูก คุณจะต้อนรับหลานอย่างไร","when":{"childAge":[20,100],"noFlag":["grandchild"]},"major":true,"choices":[{"id":"visit","label":"ไปพบหลาน","text":"คุณได้พบหลานและใช้เวลาด้วยกัน","effects":[{"flag":"grandchild","v":true},{"stat":"bond","d":5},{"stat":"happy","d":3},{"pin":"ได้พบหลาน"}]},{"id":"call","label":"โทรแสดงความยินดี","text":"คุณโทรแสดงความยินดีและนัดเจอกันภายหลัง","effects":[{"flag":"grandchild","v":true},{"stat":"bond","d":2},{"pin":"มีหลาน"}]}]},
  {"id":"grandchild-visit","title":"หลานอยากมาเยี่ยม","body":"หลานและครอบครัวอยากใช้เวลากับคุณ","when":{"flag":{"grandchild":true},"chance":0.3},"cooldown":12,"major":true,"choices":[{"id":"welcome","label":"ชวนมากินข้าวด้วยกัน","text":"บ้านคึกคักด้วยเสียงพูดคุยของครอบครัว","effects":[{"stat":"happy","d":4},{"stat":"bond","d":4},{"money":-2,"unit":"wageDay"}]},{"id":"later","label":"นัดเจอกันวันอื่น","text":"คุณโทรคุยกันและนัดวันใหม่","effects":[{"stat":"bond","d":1}]}]},
  {"id":"grandchild-trip","title":"ไปเที่ยวกับหลาน","body":"วันหยุดนี้หลานว่าง คุณอยากใช้เวลากับหลานแบบไหน","when":{"flag":{"grandchild":true},"chance":0.3},"cooldown":15,"major":true,"choices":[{"id":"trip","label":"พาหลานไปเที่ยว","text":"คุณและหลานได้เที่ยวด้วยกัน","effects":[{"stat":"happy","d":5},{"stat":"bond","d":3},{"money":-4,"unit":"wageDay"}]},{"id":"visit","label":"ไปเยี่ยมหลานที่บ้าน","text":"คุณแวะไปหาหลานและพูดคุยกัน","effects":[{"stat":"happy","d":3},{"stat":"bond","d":3},{"money":-1,"unit":"wageDay"}]},{"id":"rest","label":"พักผ่อนอยู่บ้าน","text":"คุณพักผ่อนและส่งความคิดถึงไปให้หลาน","effects":[{"stat":"health","d":1}]}]},
  {
    "id": "retirement",
    "cooldown": 15,
    "when": {
      "age": [
        60,
        100
      ],
      "any": [
        {
          "role": [
            "farmer",
            "factory",
            "construction",
            "driver",
            "office",
            "trader",
            "abroad",
            "jobless",
            "soldier"
          ]
        },
        {
          "role": "teacher",
          "flag": {
            "governmentTeacher": false
          }
        }
      ]
    },
    "major": true,
    "title": "ถึงเวลาทบทวนเรื่องงาน",
    "body": "อายุมากขึ้นแล้ว จะวางมือ ลดงานลง หรือทำงานต่อไปก็ได้ตามแรงที่มี แต่ถ้าหยุดทำงาน รายได้ประจำก็จะหายไปด้วย",
    "choices": [
      {
        "id": "retire",
        "label": "เกษียณและใช้ชีวิตตามจังหวะของตัวเอง",
        "text": "คุณวางมือจากงานประจำ มีเวลาดูแลตัวเองและครอบครัวมากขึ้น",
        "effects": [
          {
            "role": "retired"
          },
          {
            "pin": "เกษียณจากงาน"
          }
        ]
      },
      {
        "id": "continue",
        "label": "ยังอยากทำงานต่อ",
        "text": "คุณยังทำงานต่อไปตามแรงที่มี รายได้ยังเข้าอยู่",
        "effects": []
      }
    ]
  },
  {
    "id": "enter-p1",
    "title": "ถึงวัยเข้าโรงเรียน",
    "body": "ปีนี้คุณอายุหกขวบ ถึงเวลาเข้าเรียน ป.1 แล้ว วันแรกที่โรงเรียนใกล้เข้ามา คุณจะเริ่มต้นอย่างไร",
    "when": {
      "age": [
        6,
        6
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "books",
        "label": "ให้ที่บ้านช่วยเตรียมสมุดดินสอ",
        "text": "ที่บ้านช่วยหาสมุดดินสอและสอนอ่าน ก ไก่ ไว้ก่อน พอเข้าห้องก็ไม่ตื่นกลัว",
        "effects": [
          {
            "stat": "know",
            "d": 3
          }
        ]
      },
      {
        "id": "friends",
        "label": "ชวนเด็กข้างโต๊ะเป็นเพื่อน",
        "text": "วันแรกคุณชวนเด็กข้างโต๊ะคุย จนได้เพื่อนใหม่กลับบ้าน",
        "effects": [
          {
            "stat": "bond",
            "d": 3
          }
        ]
      }
    ]
  },
  {
    "id": "school-move",
    "title": "ย้ายโรงเรียน",
    "body": "มีโอกาสไปเรียนโรงเรียนในเมืองที่อื่น โดยไปอยู่กับญาติหรืออยู่หอพัก คุณจะเรียนที่เดิมต่อ หรือย้ายไปเรียนที่ไหน",
    "when": {
      "age": [
        9,
        15
      ],
      "noFlag": [
        "awayForSchool",
        "schoolReturned"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "stay",
        "label": "เรียนที่เดิมต่อ",
        "text": "คุณเรียนโรงเรียนเดิมต่อ ได้อยู่กับครอบครัวและเพื่อนกลุ่มเดิม",
        "effects": []
      },
      {
        "id": "loei",
        "label": "ย้ายไปเรียนที่เลย",
        "text": "เก็บกระเป๋าไปเรียนที่เลย ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "loei",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่เลย"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "nong-khai",
        "label": "ย้ายไปเรียนที่หนองคาย",
        "text": "เก็บกระเป๋าไปเรียนที่หนองคาย ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "nong-khai",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่หนองคาย"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "bueng-kan",
        "label": "ย้ายไปเรียนที่บึงกาฬ",
        "text": "เก็บกระเป๋าไปเรียนที่บึงกาฬ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "bueng-kan",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่บึงกาฬ"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "nong-bua-lamphu",
        "label": "ย้ายไปเรียนที่หนองบัวลำภู",
        "text": "เก็บกระเป๋าไปเรียนที่หนองบัวลำภู ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "nong-bua-lamphu",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่หนองบัวลำภู"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "udon-thani",
        "label": "ย้ายไปเรียนที่อุดรธานี",
        "text": "เก็บกระเป๋าไปเรียนที่อุดรธานี ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "udon-thani",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่อุดรธานี"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "sakon-nakhon",
        "label": "ย้ายไปเรียนที่สกลนคร",
        "text": "เก็บกระเป๋าไปเรียนที่สกลนคร ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "sakon-nakhon",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่สกลนคร"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "nakhon-phanom",
        "label": "ย้ายไปเรียนที่นครพนม",
        "text": "เก็บกระเป๋าไปเรียนที่นครพนม ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "nakhon-phanom",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่นครพนม"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "chaiyaphum",
        "label": "ย้ายไปเรียนที่ชัยภูมิ",
        "text": "เก็บกระเป๋าไปเรียนที่ชัยภูมิ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "chaiyaphum",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่ชัยภูมิ"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "khon-kaen",
        "label": "ย้ายไปเรียนที่ขอนแก่น",
        "text": "เก็บกระเป๋าไปเรียนที่ขอนแก่น ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "khon-kaen",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่ขอนแก่น"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "kalasin",
        "label": "ย้ายไปเรียนที่กาฬสินธุ์",
        "text": "เก็บกระเป๋าไปเรียนที่กาฬสินธุ์ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "kalasin",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่กาฬสินธุ์"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "mukdahan",
        "label": "ย้ายไปเรียนที่มุกดาหาร",
        "text": "เก็บกระเป๋าไปเรียนที่มุกดาหาร ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "mukdahan",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่มุกดาหาร"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "maha-sarakham",
        "label": "ย้ายไปเรียนที่มหาสารคาม",
        "text": "เก็บกระเป๋าไปเรียนที่มหาสารคาม ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "maha-sarakham",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่มหาสารคาม"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "roi-et",
        "label": "ย้ายไปเรียนที่ร้อยเอ็ด",
        "text": "เก็บกระเป๋าไปเรียนที่ร้อยเอ็ด ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "roi-et",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่ร้อยเอ็ด"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "yasothon",
        "label": "ย้ายไปเรียนที่ยโสธร",
        "text": "เก็บกระเป๋าไปเรียนที่ยโสธร ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "yasothon",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่ยโสธร"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "amnat-charoen",
        "label": "ย้ายไปเรียนที่อำนาจเจริญ",
        "text": "เก็บกระเป๋าไปเรียนที่อำนาจเจริญ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "amnat-charoen",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่อำนาจเจริญ"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "nakhon-ratchasima",
        "label": "ย้ายไปเรียนที่นครราชสีมา",
        "text": "เก็บกระเป๋าไปเรียนที่นครราชสีมา ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "nakhon-ratchasima",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่นครราชสีมา"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "buriram",
        "label": "ย้ายไปเรียนที่บุรีรัมย์",
        "text": "เก็บกระเป๋าไปเรียนที่บุรีรัมย์ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "buriram",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่บุรีรัมย์"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "surin",
        "label": "ย้ายไปเรียนที่สุรินทร์",
        "text": "เก็บกระเป๋าไปเรียนที่สุรินทร์ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "surin",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่สุรินทร์"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "sisaket",
        "label": "ย้ายไปเรียนที่ศรีสะเกษ",
        "text": "เก็บกระเป๋าไปเรียนที่ศรีสะเกษ ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "sisaket",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่ศรีสะเกษ"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      },
      {
        "id": "ubon-ratchathani",
        "label": "ย้ายไปเรียนที่อุบลราชธานี",
        "text": "เก็บกระเป๋าไปเรียนที่อุบลราชธานี ได้เรียนโรงเรียนในเมือง แต่ต้องห่างบ้าน",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "ubon-ratchathani",
              "setting": "urban"
            }
          },
          {
            "pin": "ย้ายไปเรียนที่อุบลราชธานี"
          },
          {
            "flag": "awayForSchool",
            "v": true
          }
        ]
      }
    ],
    "cooldown": 6
  },
  {
    "id": "school-return",
    "title": "กลับไปเรียนใกล้บ้านไหม",
    "body": "เรียนไกลบ้านมาสักพักแล้ว ครอบครัวถามว่าจะเรียนที่นี่ต่อ หรือกลับมาเรียนใกล้บ้าน",
    "when": {
      "age": [
        11,
        17
      ],
      "edu": {
        "in": [
          "school"
        ]
      },
      "flag": {
        "awayForSchool": true
      }
    },
    "cooldown": 6,
    "major": true,
    "choices": [
      {
        "id": "return",
        "label": "ย้ายกลับไปเรียนใกล้บ้าน",
        "text": "ย้ายกลับมาเรียนใกล้บ้าน ได้อยู่กับครอบครัวอีกครั้ง",
        "effects": [
          {
            "move": "home"
          },
          {
            "flag": "awayForSchool",
            "v": false
          },
          {
            "stat": "bond",
            "d": 4
          },
          {
            "uncond": "homesick"
          },
          {
            "pin": "ย้ายกลับมาเรียนใกล้บ้าน"
          },
          {
            "flag": "schoolReturned",
            "v": true
          }
        ]
      },
      {
        "id": "stay",
        "label": "เรียนที่นี่ต่อไปก่อน",
        "text": "ตั้งใจเรียนที่โรงเรียนเดิมต่อ แม้จะคิดถึงบ้าน",
        "effects": [
          {
            "stat": "know",
            "d": 2
          },
          {
            "cond": "homesick",
            "turns": 2,
            "by": "attach"
          }
        ]
      }
    ]
  },
  {
    "id": "after-m3",
    "title": "หลังจบมัธยมต้น",
    "body": "เส้นทางข้างหน้ามีหลายแบบ และแต่ละทางมีต้นทุนต่างกัน",
    "when": {
      "age": [
        15,
        16
      ],
      "edu": {
        "top": [
          "m3"
        ]
      }
    },
    "major": true,
    "choices": [
      {
        "id": "continue",
        "label": "เรียนมัธยมปลายต่อ",
        "text": "เรียนมัธยมปลายต่อ",
        "effects": [
          {
            "edu": {
              "in": "school",
              "grade": 10
            }
          },
          {
            "role": "student"
          }
        ]
      },
      {
        "id": "voc",
        "label": "เรียนสายอาชีพ (ปวช.)",
        "text": "เริ่มเรียนสายอาชีพ",
        "effects": [
          {
            "edu": {
              "in": "voc",
              "grade": 1,
              "place": "สถานศึกษาอาชีวศึกษา"
            }
          },
          {
            "role": "student"
          },
          {
            "pin": "เริ่มเรียน ปวช."
          }
        ]
      },
      {
        "id": "work",
        "label": "ออกมาทำงานช่วยที่บ้าน",
        "text": "คุณออกจากโรงเรียนมาช่วยที่บ้านทำนาและรับจ้างทั่วไป",
        "effects": [
          {
            "edu": {
              "in": null
            }
          },
          {
            "role": "farmer"
          }
        ]
      }
    ]
  },
  {
    "id": "after-m6",
    "title": "หลังจบมัธยมปลาย",
    "body": "คุณอยากก้าวต่อไปทางไหน",
    "when": {
      "age": [
        18,
        20
      ],
      "edu": {
        "top": [
          "m6"
        ]
      }
    },
    "major": true,
    "choices": [
      {
        "id": "study",
        "label": "เตรียมเรียนต่อมหาวิทยาลัย",
        "text": "เตรียมเรียนต่อมหาวิทยาลัย",
        "effects": [
          {
            "flag": "university",
            "v": true
          }
        ]
      },
      {
        "id": "work",
        "label": "ออกไปหางานทำเลย",
        "text": "คุณเก็บวุฒิ ม.6 ไปยื่นใบสมัครงานหลายที่ รอดูว่าที่ไหนจะเรียกก่อน",
        "effects": [
          {
            "role": "jobless"
          },
          {
            "pin": "เริ่มหางาน"
          }
        ]
      }
    ]
  },
  {
    "id": "after-voc",
    "when": {
      "age": [
        17,
        25
      ],
      "edu": {
        "top": [
          "pvc"
        ]
      }
    },
    "major": true,
    "title": "หลังจบ ปวช.",
    "body": "ทักษะที่เรียนมาเปิดทางให้ทำงานหรือเรียนต่อได้ คุณอยากเลือกเส้นทางไหน",
    "choices": [
      {
        "id": "hvoc",
        "label": "เรียนต่อ ปวส.",
        "text": "เริ่มเรียนต่อ ปวส.",
        "effects": [
          {
            "edu": {
              "in": "hvoc",
              "grade": 1,
              "place": "สถานศึกษาอาชีวศึกษา"
            }
          },
          {
            "role": "student"
          },
          {
            "pin": "เริ่มเรียน ปวส."
          }
        ]
      },
      {
        "id": "work",
        "label": "เริ่มหางาน",
        "text": "เตรียมหางานจากทักษะที่เรียนมา",
        "effects": [
          {
            "role": "jobless"
          }
        ]
      }
    ]
  },
  {
    "id": "after-hvoc",
    "when": {
      "age": [
        19,
        28
      ],
      "edu": {
        "top": [
          "pvs"
        ]
      }
    },
    "major": true,
    "title": "หลังจบ ปวส.",
    "body": "คุณจะนำทักษะไปทำงานหรือศึกษาต่อในระดับปริญญา",
    "choices": [
      {
        "id": "uni",
        "label": "เตรียมเรียนต่อปริญญาตรี",
        "text": "เริ่มหาข้อมูลเรียนต่อ",
        "effects": [
          {
            "flag": "university",
            "v": true
          },
          {
            "role": "jobless"
          }
        ]
      },
      {
        "id": "work",
        "label": "เริ่มหางาน",
        "text": "เตรียมสมัครงาน",
        "effects": [
          {
            "role": "jobless"
          }
        ]
      }
    ]
  },
  {
    "id": "uni-admission",
    "title": "เลือกที่เรียนต่อ",
    "body": "ถึงเวลาเลือกที่เรียนต่อ การไปเรียนไกลบ้านมีทั้งโอกาสและค่าใช้จ่าย คุณจะเลือกเรียนที่ไหน",
    "when": {
      "age": [
        18,
        30
      ],
      "flag": {
        "university": true
      }
    },
    "major": true,
    "choices": [
      {
        "id": "msu",
        "label": "เรียนที่มหาวิทยาลัยมหาสารคาม",
        "text": "เรียนที่มหาวิทยาลัยมหาสารคาม",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "maha-sarakham",
              "setting": "urban"
            }
          },
          {
            "edu": {
              "in": "uni",
              "grade": 1,
              "place": "มหาวิทยาลัยมหาสารคาม"
            }
          },
          {
            "role": "student"
          }
        ],
        "when": {
          "year": [
            1994,
            9999
          ]
        }
      },
      {
        "id": "local",
        "label": "เรียนต่อใกล้บ้าน",
        "text": "คุณเลือกสถาบันในจังหวัด ค่าใช้จ่ายน้อยกว่าและยังกลับบ้านได้บ่อย",
        "effects": [
          {
            "edu": {
              "in": "uni",
              "grade": 1,
              "place": "สถาบันใกล้บ้าน"
            }
          },
          {
            "role": "student"
          }
        ]
      },
      {
        "id": "kku",
        "label": "เรียนที่มหาวิทยาลัยขอนแก่น",
        "text": "ไปเรียนต่อที่ขอนแก่น",
        "effects": [
          {
            "move": {
              "kind": "isan",
              "province": "khon-kaen",
              "setting": "urban"
            }
          },
          {
            "edu": {
              "in": "uni",
              "grade": 1,
              "place": "มหาวิทยาลัยขอนแก่น"
            }
          },
          {
            "role": "student"
          }
        ]
      }
    ]
  },
  {
    "id": "first-job",
    "title": "งานแรก",
    "body": "เมื่อถึงเวลาทำงาน คุณจะเริ่มต้นที่ไหน",
    "when": {
      "age": [
        18,
        35
      ],
      "role": [
        "farmer",
        "jobless"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "bangkok",
        "label": "ไปทำงานออฟฟิศที่กรุงเทพฯ",
        "text": "ไปทำงานออฟฟิศที่กรุงเทพฯ",
        "effects": [
          {
            "move": {
              "kind": "bangkok"
            }
          },
          {
            "role": "office"
          },
          {
            "pin": "เริ่มทำงานที่กรุงเทพฯ"
          }
        ]
      },
      {
        "id": "home",
        "label": "กลับบ้านไปค้าขาย",
        "text": "คุณกลับบ้านเกิด เริ่มค้าขายเล็กๆ น้อยๆ ใกล้ครอบครัว",
        "effects": [
          {
            "move": "home"
          },
          {
            "role": "trader"
          }
        ]
      },
      {
        "id": "factory",
        "label": "หางานโรงงานใกล้ที่อยู่ปัจจุบัน",
        "text": "เริ่มงานในโรงงาน",
        "effects": [
          {
            "role": "factory"
          }
        ]
      },
      {
        "id": "farm",
        "label": "เลือกทำงานเกษตร",
        "text": "เริ่มทำงานเกษตร",
        "effects": [
          {
            "role": "farmer"
          }
        ]
      },
      {
        "id": "civil",
        "label": "สมัครงานราชการ",
        "when": {
          "edu": {
            "top": [
              "ba"
            ]
          }
        },
        "text": "คุณสอบบรรจุได้ เริ่มรับราชการ",
        "effects": [
          {
            "role": "civil"
          },
          {
            "pin": "เริ่มทำงานราชการ"
          }
        ]
      },
      {
        "id": "teacher",
        "label": "สมัครงานครูโรงเรียนของรัฐ",
        "when": {
          "edu": {
            "top": [
              "ba"
            ]
          }
        },
        "text": "เริ่มทำงานสอนในโรงเรียนของรัฐ",
        "effects": [
          {
            "role": "teacher"
          },
          {
            "pin": "เริ่มทำงานสอน"
          },
          {
            "flag": "governmentTeacher",
            "v": true
          }
        ]
      },
      {
        "id": "private-teacher",
        "label": "สมัครงานครูโรงเรียนเอกชน",
        "when": {
          "edu": {
            "top": [
              "ba"
            ]
          }
        },
        "text": "เริ่มทำงานสอนในโรงเรียนเอกชน",
        "effects": [
          {
            "role": "teacher"
          },
          {
            "flag": "governmentTeacher",
            "v": false
          },
          {
            "pin": "เริ่มทำงานสอน"
          }
        ]
      }
    ]
  },
  {
    "id": "school-crush",
    "when": {
      "age": [
        12,
        18
      ],
      "role": "student",
      "edu": {
        "in": [
          "school"
        ],
        "grade": [
          6,
          12
        ]
      },
      "noFlag": [
        "partner",
        "crushUnrequited",
        "crushNotShared"
      ]
    },
    "major": true,
    "title": "ความรู้สึกต่อเพื่อนร่วมชั้น",
    "body": "มีเพื่อนร่วมชั้นคนหนึ่งที่คุณอยากรู้จักมากขึ้น ความรู้สึกนี้อาจเป็นมิตรภาพหรือความชอบก็ได้ คุณอยากทำอย่างไร",
    "choices": [
      {
        "id": "confess",
        "label": "บอกความรู้สึกอย่างสุภาพ",
        "text": "คุณตัดสินใจพูดด้วยความจริงใจ",
        "effects": [],
        "roll": [
          {
            "p": 0.35,
            "text": "อีกฝ่ายบอกว่ารู้สึกดีเช่นกัน ทั้งคู่ค่อย ๆ ทำความรู้จักกัน",
            "effects": [
              {
                "flag": "partner",
                "v": true
              },
              {
                "stat": "happy",
                "d": 8
              },
              {
                "cond": "inlove",
                "turns": 3
              }
            ]
          },
          {
            "p": 0.45,
            "text": "อีกฝ่ายขอบคุณที่บอกความรู้สึก แต่ต้องการเป็นเพื่อนกัน คุณเคารพคำตอบนั้น",
            "effects": [
              {
                "flag": "crushUnrequited",
                "v": true
              },
              {
                "stat": "happy",
                "d": -12,
                "by": "attach"
              },
              {
                "cond": "heartbroken",
                "turns": 3,
                "by": "attach"
              }
            ]
          },
          {
            "p": 0.2,
            "text": "อีกฝ่ายยังไม่แน่ใจและอยากใช้เวลาคิด คุณตกลงให้พื้นที่กัน",
            "effects": [
              {
                "stat": "happy",
                "d": -2,
                "by": "attach"
              }
            ]
          }
        ]
      },
      {
        "id": "wait",
        "label": "เก็บไว้ก่อนและทำความรู้จักกันต่อ",
        "text": "คุณค่อย ๆ ใช้เวลาเรียนรู้กันในฐานะเพื่อน",
        "effects": [
          {
            "flag": "crushNotShared",
            "v": true
          },
          {
            "stat": "bond",
            "d": 2
          }
        ]
      },
      {
        "id": "friend",
        "label": "อยากเป็นเพื่อนกันเฉย ๆ",
        "text": "คุณเลือกรักษาความสัมพันธ์แบบเพื่อน",
        "effects": [
          {
            "stat": "bond",
            "d": 2
          }
        ]
      }
    ]
  },
  {
    "id": "crush-followup",
    "when": {
      "age": [
        13,
        20
      ],
      "flag": {
        "crushNotShared": true
      },
      "noFlag": [
        "partner"
      ]
    },
    "major": true,
    "title": "ความรู้สึกที่ยังไม่ได้บอก",
    "body": "เวลาผ่านไป ความรู้สึกต่อเพื่อนยังอยู่ คุณอยากพูดออกไปหรือให้เวลากับตัวเอง",
    "choices": [
      {
        "id": "confess",
        "label": "บอกความรู้สึกและเคารพคำตอบ",
        "text": "คุณเลือกพูดอย่างตรงไปตรงมา",
        "effects": [
          {
            "flag": "crushNotShared",
            "v": false
          }
        ],
        "roll": [
          {
            "p": 0.35,
            "text": "อีกฝ่ายบอกว่ารู้สึกดีเช่นกัน ทั้งคู่ค่อย ๆ ทำความรู้จักกัน",
            "effects": [
              {
                "flag": "partner",
                "v": true
              },
              {
                "stat": "happy",
                "d": 8
              },
              {
                "cond": "inlove",
                "turns": 3
              }
            ]
          },
          {
            "p": 0.45,
            "text": "อีกฝ่ายขอบคุณที่บอกความรู้สึก แต่ต้องการเป็นเพื่อนกัน คุณเคารพคำตอบนั้น",
            "effects": [
              {
                "flag": "crushUnrequited",
                "v": true
              },
              {
                "stat": "happy",
                "d": -12,
                "by": "attach"
              },
              {
                "cond": "heartbroken",
                "turns": 3,
                "by": "attach"
              }
            ]
          },
          {
            "p": 0.2,
            "text": "อีกฝ่ายยังไม่แน่ใจและอยากใช้เวลาคิด คุณตกลงให้พื้นที่กัน",
            "effects": [
              {
                "stat": "happy",
                "d": -2,
                "by": "attach"
              }
            ]
          }
        ]
      },
      {
        "id": "space",
        "label": "ค่อย ๆ ปล่อยให้เป็นมิตรภาพ",
        "text": "คุณเลือกให้ความสัมพันธ์เป็นไปตามธรรมชาติ",
        "effects": [
          {
            "flag": "crushNotShared",
            "v": false
          },
          {
            "trait": "attach",
            "d": -2
          },
          {
            "stat": "bond",
            "d": 2
          }
        ]
      }
    ]
  },
  {
    "id": "unrequited-crush",
    "when": {
      "age": [
        12,
        22
      ],
      "flag": {
        "crushUnrequited": true
      }
    },
    "major": true,
    "title": "เมื่อความรู้สึกไม่ตรงกัน",
    "body": "คำตอบของอีกฝ่ายอาจทำให้เสียใจ คุณมีสิทธิ์พักใจและยังเคารพขอบเขตของกันและกันได้",
    "choices": [
      {
        "id": "talk",
        "label": "พูดคุยกับเพื่อนหรือคนที่ไว้ใจ",
        "text": "การได้ระบายช่วยให้คุณไม่ต้องอยู่กับความรู้สึกตามลำพัง",
        "effects": [
          {
            "flag": "crushUnrequited",
            "v": false
          },
          {
            "stat": "bond",
            "d": 4
          },
          {
            "stat": "happy",
            "d": 4
          }
        ]
      },
      {
        "id": "space",
        "label": "ให้เวลาตัวเองและเว้นระยะอย่างสุภาพ",
        "text": "คุณให้เวลาตัวเองค่อย ๆ ฟื้นใจ",
        "effects": [
          {
            "flag": "crushUnrequited",
            "v": false
          },
          {
            "trait": "attach",
            "d": -3
          },
          {
            "stat": "health",
            "d": 2
          }
        ]
      },
      {
        "id": "friend",
        "label": "ค่อย ๆ กลับไปเป็นเพื่อนเมื่อพร้อม",
        "text": "คุณเลือกสื่อสารขอบเขตและรักษามิตรภาพ",
        "effects": [
          {
            "flag": "crushUnrequited",
            "v": false
          },
          {
            "stat": "bond",
            "d": 3
          }
        ]
      }
    ]
  },
  {
    "id": "young-relationship",
    "when": {
      "age": [
        15,
        22
      ],
      "role": "student",
      "flag": {
        "partner": true
      },
      "noFlag": [
        "married"
      ],
      "partnerYears": [
        1,
        100
      ]
    },
    "major": true,
    "title": "ความสัมพันธ์กับเวลาเรียน",
    "body": "คุณและคนรักเริ่มมีเวลาว่างไม่ตรงกัน ต่างคนต่างมีเรื่องเรียนและครอบครัวที่ต้องดูแล จะจัดการอย่างไร",
    "choices": [
      {
        "id": "talk",
        "label": "คุยกันและตกลงเวลาที่เหมาะกับทั้งคู่",
        "text": "ทั้งคู่รับฟังความต้องการของกันและกัน",
        "effects": [
          {
            "stat": "bond",
            "d": 5
          },
          {
            "stat": "happy",
            "d": 2
          }
        ]
      },
      {
        "id": "space",
        "label": "ให้พื้นที่กันและทบทวนความรู้สึก",
        "text": "คุณตกลงเว้นเวลาให้กันโดยยังดูแลมิตรภาพ",
        "effects": [
          {
            "stat": "know",
            "d": 2
          }
        ]
      },
      {
        "id": "separate",
        "label": "ตกลงแยกทางกันอย่างสุภาพ",
        "text": "แม้จะเสียใจ คุณทั้งคู่ตัดสินใจเคารพทางเลือกของกันและกัน",
        "effects": [
          {
            "flag": "partner",
            "v": false
          },
          {
            "stat": "happy",
            "d": -16,
            "by": "attach"
          },
          {
            "cond": "heartbroken",
            "turns": 4,
            "by": "attach"
          }
        ]
      }
    ]
  },
  {
    "id": "relationship-distance",
    "when": {
      "age": [
        20,
        65
      ],
      "loc": [
        "bangkok",
        "abroad"
      ],
      "flag": {
        "partner": true
      },
      "partnerYears": [
        1,
        100
      ]
    },
    "major": true,
    "title": "ความรักเมื่ออยู่ไกลกัน",
    "body": "งานทำให้คุณและคนรักมีเวลาพบกันน้อยลง คุณอยากดูแลความสัมพันธ์นี้อย่างไร",
    "choices": [
      {
        "id": "call",
        "label": "จัดเวลาคุยและรับฟังกันสม่ำเสมอ",
        "text": "ทั้งคู่ช่วยกันหาวิธีสื่อสารที่เหมาะกับเวลา",
        "effects": [
          {
            "stat": "bond",
            "d": 4
          }
        ]
      },
      {
        "id": "visit",
        "label": "วางแผนเดินทางไปพบกัน",
        "text": "คุณเดินทางไปใช้เวลาร่วมกันและมีค่าใช้จ่าย",
        "effects": [
          {
            "money": -10,
            "unit": "wageDay"
          },
          {
            "stat": "bond",
            "d": 6
          },
          {
            "stat": "happy",
            "d": 3
          }
        ]
      },
      {
        "id": "reflect",
        "label": "ทบทวนความต้องการของตัวเองก่อน",
        "text": "คุณให้เวลาตัวเองคิดว่าความสัมพันธ์นี้ต้องการอะไร",
        "effects": [
          {
            "stat": "know",
            "d": 2
          }
        ]
      }
    ]
  },
  {
    "id": "first-love",
    "title": "ความรักครั้งแรก",
    "body": "คนคนหนึ่งทำให้วันธรรมดาพิเศษขึ้น คุณอยากทำอย่างไร",
    "when": {
      "age": [
        16,
        30
      ],
      "noFlag": [
        "partner",
        "crushUnrequited",
        "crushNotShared",
        "hasEx"
      ],
      "noCond": [
        "heartbroken"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "open",
        "label": "เปิดใจทำความรู้จัก",
        "text": "คุณเปิดใจคบหากัน วันธรรมดากลายเป็นวันที่รอคอย",
        "effects": [
          {
            "flag": "partner",
            "v": true
          },
          {
            "cond": "inlove",
            "turns": 3
          }
        ]
      },
      {
        "id": "wait",
        "label": "ค่อยเป็นค่อยไป",
        "text": "คุณค่อยๆ ทำความรู้จักกันไปโดยยังไม่เร่งรีบ",
        "effects": [
          {
            "stat": "happy",
            "d": 2
          }
        ]
      }
    ]
  },
  {
    "id": "breakup",
    "title": "ความสัมพันธ์ร้าวราน",
    "body": "ช่วงนี้คุณกับคนรักห่างเหินและทะเลาะกันบ่อย จากสิ่งที่ผ่านมาทั้งหมด คุณจะทำอย่างไรกับความสัมพันธ์นี้",
    "when": {
      "age": [
        18,
        70
      ],
      "flag": {
        "partner": true
      },
      "partnerYears": [
        1,
        100
      ],
      "any": [
        {
          "stat": {
            "bond": [
              0,
              40
            ]
          }
        },
        {
          "flag": {
            "drinker": true
          }
        },
        {
          "cond": [
            "indebted"
          ]
        }
      ],
      "chance": 0.25
    },
    "major": true,
    "choices": [
      {
        "id": "mend",
        "label": "คุยกันตรงๆ ยอมรับส่วนที่ตัวเองพลาด และขอเริ่มใหม่",
        "text": "คุณขอโอกาสแก้ไขสิ่งที่ผ่านมา",
        "effects": [
          {
            "stat": "happy",
            "d": -4
          }
        ],
        "roll": [
          {
            "p": 0.65,
            "text": "อีกฝ่ายยอมให้โอกาส ความสัมพันธ์ค่อยๆ กลับมาดีขึ้น",
            "effects": [
              {
                "stat": "bond",
                "d": 12
              },
              {
                "flag": "drinker",
                "v": false
              }
            ]
          },
          {
            "p": 0.35,
            "text": "อีกฝ่ายตัดสินใจเดินจากไป",
            "effects": [
              {
                "stat": "happy",
                "d": -20,
                "by": "attach"
              },
              {
                "cond": "heartbroken",
                "turns": 4,
                "by": "attach"
              },
              {
                "flag": "partner",
                "v": false
              },
              {
                "flag": "married",
                "v": false
              }
            ]
          }
        ]
      },
      {
        "id": "family",
        "label": "ยุติความสัมพันธ์ แล้วกลับไปหาคนที่ไว้ใจ",
        "text": "ยุติความสัมพันธ์ แล้วกลับไปหาคนที่ไว้ใจ",
        "effects": [
          {
            "stat": "happy",
            "d": -20,
            "by": "attach"
          },
          {
            "cond": "heartbroken",
            "turns": 4,
            "by": "attach"
          },
          {
            "flag": "partner",
            "v": false
          },
          {
            "stat": "bond",
            "d": 5
          },
          {
            "flag": "married",
            "v": false
          }
        ]
      },
      {
        "id": "alone",
        "label": "ยุติความสัมพันธ์ แล้วขอเวลาอยู่เงียบๆ",
        "text": "ยุติความสัมพันธ์ แล้วขอเวลาอยู่เงียบๆ",
        "effects": [
          {
            "stat": "happy",
            "d": -20,
            "by": "attach"
          },
          {
            "cond": "heartbroken",
            "turns": 4,
            "by": "attach"
          },
          {
            "flag": "partner",
            "v": false
          },
          {
            "flag": "married",
            "v": false
          }
        ]
      },
      {
        "id": "work",
        "label": "ยุติความสัมพันธ์ แล้วโหมงานจนแทบไม่ได้พัก",
        "text": "ยุติความสัมพันธ์ แล้วโหมงานจนแทบไม่ได้พัก",
        "when": {
          "trait": {
            "attach": [
              70,
              100
            ]
          }
        },
        "effects": [
          {
            "stat": "happy",
            "d": -20,
            "by": "attach"
          },
          {
            "cond": "heartbroken",
            "turns": 4,
            "by": "attach"
          },
          {
            "flag": "partner",
            "v": false
          },
          {
            "stat": "health",
            "d": -6
          },
          {
            "stat": "know",
            "d": 2
          },
          {
            "flag": "married",
            "v": false
          }
        ]
      },
      {
        "id": "drink",
        "label": "ยุติความสัมพันธ์ แล้วออกไปดื่มให้ลืม",
        "text": "ยุติความสัมพันธ์ แล้วออกไปดื่มให้ลืม",
        "when": {
          "trait": {
            "attach": [
              70,
              100
            ]
          }
        },
        "effects": [
          {
            "stat": "happy",
            "d": -20,
            "by": "attach"
          },
          {
            "cond": "heartbroken",
            "turns": 4,
            "by": "attach"
          },
          {
            "flag": "partner",
            "v": false
          },
          {
            "stat": "health",
            "d": -8
          },
          {
            "flag": "married",
            "v": false
          },
          {
            "flag": "drinker",
            "v": true
          }
        ]
      },
      {
        "id": "reflect",
        "label": "ยุติความสัมพันธ์ แล้วหาเวลาสงบใจ",
        "text": "ยุติความสัมพันธ์ แล้วหาเวลาสงบใจ",
        "when": {
          "trait": {
            "attach": [
              70,
              100
            ]
          }
        },
        "effects": [
          {
            "stat": "happy",
            "d": -20,
            "by": "attach"
          },
          {
            "cond": "heartbroken",
            "turns": 4,
            "by": "attach"
          },
          {
            "flag": "partner",
            "v": false
          },
          {
            "trait": "attach",
            "d": -3
          },
          {
            "flag": "married",
            "v": false
          }
        ]
      }
    ],
    "cooldown": 9
  },
  {
    "id": "after-p6",
    "title": "เรียนต่อหลังประถม",
    "body": "ครอบครัวต้องคิดถึงทั้งการเรียนและค่าใช้จ่าย",
    "when": {
      "age": [
        12,
        14
      ],
      "edu": {
        "top": [
          "p6"
        ]
      }
    },
    "major": true,
    "choices": [
      {
        "id": "continue",
        "label": "เรียนต่อมัธยม",
        "text": "เรียนต่อมัธยม",
        "effects": [
          {
            "stat": "know",
            "d": 2
          }
        ]
      },
      {
        "id": "support",
        "label": "เรียนต่อและขอความช่วยเหลือเรื่องค่าใช้จ่าย",
        "text": "ครอบครัวช่วยกันวางแผนเรียนต่อ",
        "effects": [
          {
            "stat": "bond",
            "d": 2
          }
        ]
      },
      {
        "id": "work",
        "label": "ช่วยครอบครัวทำงาน",
        "text": "ช่วยครอบครัวทำงาน",
        "effects": [
          {
            "edu": {
              "in": null
            }
          },
          {
            "role": "farmer"
          }
        ],
        "when": {
          "year": [
            1970,
            2002
          ]
        }
      }
    ]
  },
  {
    "id": "conscription",
    "title": "เกณฑ์ทหาร",
    "body": "อายุครบยี่สิบเอ็ด หมายเรียกให้ไปตรวจเลือกทหารกองเกินมาถึงบ้าน คุณจะเตรียมตัวอย่างไร",
    "when": {
      "age": [
        21,
        21
      ],
      "sex": "m"
    },
    "major": true,
    "choices": [
      {
        "id": "learn",
        "label": "เตรียมเอกสารและร่างกายให้พร้อม",
        "text": "ศึกษาขั้นตอนและเตรียมเอกสารครบ วันตรวจเลือกจึงไม่ตื่นเต้นมาก",
        "effects": [
          {
            "stat": "know",
            "d": 2
          }
        ]
      },
      {
        "id": "seek",
        "label": "ปรึกษาเรื่องสิทธิผ่อนผัน",
        "text": "ปรึกษาที่บ้านและสัสดีอำเภอเรื่องสิทธิที่มี ได้รู้ขั้นตอนและที่บ้านก็สบายใจขึ้น",
        "effects": [
          {
            "stat": "bond",
            "d": 2
          }
        ]
      }
    ]
  },
  {
    "id": "job-change",
    "title": "เปลี่ยนงาน",
    "body": "งานเดิมเริ่มไม่ตอบโจทย์ คุณอยากก้าวไปทางใด",
    "when": {
      "age": [
        25,
        55
      ],
      "role": [
        "farmer",
        "office",
        "factory",
        "trader",
        "construction",
        "driver"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "stay",
        "label": "อยู่กับงานเดิม",
        "text": "อยู่กับงานเดิม",
        "effects": [
          {
            "stat": "happy",
            "d": 2
          }
        ]
      },
      {
        "id": "trade",
        "label": "เริ่มค้าขาย",
        "text": "เริ่มค้าขาย",
        "effects": [
          {
            "role": "trader"
          },
          {
            "money": -10,
            "unit": "wageDay"
          }
        ]
      },
      {
        "id": "factory",
        "label": "สมัครงานโรงงาน",
        "text": "คุณย้ายไปทำโรงงาน รายได้แน่นอนขึ้นแต่ต้องเข้ากะตามเวลา",
        "effects": [
          {
            "role": "factory"
          }
        ]
      },
      {
        "id": "farm",
        "label": "ทำการเกษตร",
        "text": "ทำการเกษตร",
        "effects": [
          {
            "role": "farmer"
          }
        ]
      }
    ]
  },
  {
    "id": "go-abroad",
    "title": "โอกาสทำงานต่างประเทศ",
    "body": "การเดินทางไกลอาจเพิ่มรายได้ แต่ต้องห่างจากคนที่บ้าน",
    "when": {
      "age": [
        22,
        45
      ],
      "year": [
        2004,
        9999
      ],
      "loc": "isan",
      "role": [
        "farmer",
        "factory",
        "construction",
        "driver",
        "office",
        "trader",
        "jobless"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "go",
        "label": "ไปทำงานไต้หวันผ่านบริษัทจัดหางาน",
        "text": "เดินทางไปทำงานที่ไต้หวันตามสัญญาจัดหางาน",
        "effects": [
          {
            "move": {
              "kind": "abroad",
              "country": "ไต้หวัน",
              "method": "ผ่านบริษัทจัดหางาน"
            }
          },
          {
            "role": "abroad"
          },
          {
            "stat": "bond",
            "d": -5
          }
        ]
      },
      {
        "id": "stay",
        "label": "ทำงานใกล้บ้านต่อ",
        "text": "ทำงานใกล้บ้านต่อ",
        "effects": [
          {
            "stat": "bond",
            "d": 2
          }
        ]
      }
    ]
  },
  {
    "id": "come-home",
    "title": "ทางกลับบ้าน",
    "body": "เมื่ออยู่ไกลบ้านมาระยะหนึ่ง คุณมีโอกาสกลับไปเริ่มต้นใหม่",
    "when": {
      "age": [
        25,
        65
      ],
      "loc": [
        "bangkok",
        "abroad"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "home",
        "label": "กลับไปทำนาที่บ้านเกิด",
        "text": "คุณเก็บของกลับบ้านเกิด มาช่วยที่บ้านทำนาและได้อยู่ใกล้ครอบครัว",
        "effects": [
          {
            "move": "home"
          },
          {
            "role": "farmer"
          },
          {
            "pin": "กลับบ้านเกิด"
          }
        ]
      },
      {
        "id": "stay",
        "label": "อยู่ทำงานต่อ",
        "text": "คุณทำงานต่อในเมือง ห่างบ้านต่อไปอีกพัก",
        "effects": [
          {
            "stat": "bond",
            "d": -2
          }
        ]
      }
    ]
  },
  {
    "id": "marriage",
    "title": "ใช้ชีวิตร่วมกัน",
    "body": "คบกันมาหลายปี คุณและคนรักเริ่มคุยกันว่าจะแต่งงานกันเลยไหม",
    "when": {
      "age": [
        22,
        55
      ],
      "flag": {
        "partner": true
      },
      "noFlag": [
        "married"
      ],
      "partnerYears": [
        2,
        100
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "marry",
        "label": "ตกลงสร้างครอบครัวร่วมกัน",
        "text": "ทั้งคู่ตกลงแต่งงานและเริ่มสร้างครอบครัวด้วยกัน",
        "effects": [
          {
            "flag": "married",
            "v": true
          },
          {
            "stat": "bond",
            "d": 5
          }
        ]
      },
      {
        "id": "wait",
        "label": "ยังไม่รีบตัดสินใจ",
        "text": "ทั้งคู่ตกลงคบกันต่อไปก่อน ยังไม่รีบแต่ง",
        "effects": [
          {
            "stat": "happy",
            "d": 2
          }
        ]
      }
    ],
    "cooldown": 6
  },
  {
    "id": "have-child",
    "title": "สมาชิกใหม่ของครอบครัว",
    "body": "แต่งงานกันมาสักพัก คุณกับคู่ชีวิตเริ่มคุยกันเรื่องมีลูก ซึ่งจะเปลี่ยนชีวิตประจำวันไปทั้งหมด",
    "when": {
      "age": [
        24,
        45
      ],
      "flag": {
        "married": true
      },
      "noFlag": [
        "child"
      ],
      "marriedYears": [
        1,
        100
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "yes",
        "label": "ตกลงมีลูกด้วยกัน",
        "text": "ไม่นานก็มีข่าวดี ลูกคนแรกเกิดมา ค่าใช้จ่ายเพิ่มขึ้นแต่บ้านอบอุ่นขึ้น",
        "effects": [
          {
            "flag": "child",
            "v": true
          },
          {
            "stat": "bond",
            "d": 5
          },
          {
            "money": -15,
            "unit": "wageDay"
          }
        ]
      },
      {
        "id": "no",
        "label": "เลือกยังไม่มีลูก",
        "text": "ทั้งคู่ตกลงว่ายังไม่มีลูกตอนนี้",
        "effects": [
          {
            "stat": "happy",
            "d": 2
          }
        ]
      }
    ],
    "cooldown": 6
  },
  {
    "id": "child-with-grandparents",
    "title": "การดูแลลูก",
    "body": "งานรัดตัวจนแทบไม่มีเวลาดูแลลูก คุณต้องตัดสินใจว่าจะให้ใครเลี้ยงลูก",
    "when": {
      "age": [
        25,
        50
      ],
      "flag": {
        "child": true
      }
    },
    "major": true,
    "choices": [
      {
        "id": "together",
        "label": "เลี้ยงลูกเองใกล้ตัว",
        "text": "คุณจัดเวลาเลี้ยงลูกเอง เหนื่อยและเสียเงินมากขึ้น แต่ได้เห็นลูกโตทุกวัน",
        "effects": [
          {
            "money": -10,
            "unit": "wageDay"
          },
          {
            "stat": "bond",
            "d": 5
          }
        ]
      },
      {
        "id": "help",
        "label": "ฝากปู่ย่าตายายช่วยเลี้ยง",
        "text": "ฝากลูกให้ปู่ย่าตายายช่วยเลี้ยง คุณทำงานได้เต็มที่แต่ได้เจอลูกน้อยลง",
        "effects": [
          {
            "stat": "bond",
            "d": -2
          }
        ]
      }
    ]
  },
  {
    "id": "remit-home",
    "title": "เงินส่งกลับบ้าน",
    "body": "คนที่บ้านมีค่าใช้จ่ายเพิ่มขึ้น คุณจัดการเงินอย่างไร",
    "when": {
      "age": [
        20,
        60
      ],
      "loc": [
        "bangkok",
        "abroad"
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "send",
        "label": "แบ่งเงินส่งกลับบ้าน",
        "text": "แบ่งเงินส่งกลับบ้าน",
        "effects": [
          {
            "money": -15,
            "unit": "wageDay"
          },
          {
            "stat": "bond",
            "d": 5
          }
        ]
      },
      {
        "id": "save",
        "label": "เก็บเงินสำรองไว้ก่อน",
        "text": "เก็บเงินสำรองไว้ก่อน",
        "effects": [
          {
            "stat": "happy",
            "d": -2
          }
        ]
      }
    ]
  },
  {
    "id": "parent-sick",
    "title": "คนในบ้านเจ็บป่วย",
    "body": "ผู้ใหญ่ในบ้านล้มป่วยต้องมีคนดูแลใกล้ชิด ญาติพี่น้องต้องตกลงกันว่าจะช่วยกันอย่างไร",
    "when": {
      "age": [
        30,
        65
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "care",
        "label": "แบ่งเวลาไปช่วยดูแล",
        "text": "คุณแบ่งเวลาและเงินไปช่วยดูแล ผู้ป่วยอุ่นใจที่มีคุณอยู่ใกล้",
        "effects": [
          {
            "money": -10,
            "unit": "wageDay"
          },
          {
            "stat": "bond",
            "d": 4
          }
        ]
      },
      {
        "id": "support",
        "label": "ช่วยวางแผนและติดต่อญาติ",
        "text": "คุณโทรประสานญาติแบ่งเวรเฝ้าไข้ งานเดินต่อได้แต่ใจไม่สงบ",
        "effects": [
          {
            "stat": "happy",
            "d": -3,
            "by": "attach"
          }
        ]
      }
    ]
  },
  {
    "id": "funeral",
    "title": "การสูญเสีย",
    "body": "ญาติผู้ใหญ่ที่สนิทกันจากไป คุณต้องบอกลาและหาทางรับมือกับความเศร้า",
    "when": {
      "age": [
        35,
        75
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "family",
        "label": "อยู่ใกล้ครอบครัว",
        "text": "คุณอยู่กับครอบครัว ช่วยกันประคองใจในวันที่เศร้า",
        "effects": [
          {
            "stat": "happy",
            "d": -12,
            "by": "attach"
          },
          {
            "cond": "grieving",
            "turns": 3,
            "by": "attach"
          },
          {
            "stat": "bond",
            "d": 3
          }
        ]
      },
      {
        "id": "space",
        "label": "ใช้เวลาอยู่กับตัวเอง",
        "text": "คุณขอเวลาอยู่เงียบๆ คนเดียวเพื่อทำใจ",
        "effects": [
          {
            "stat": "happy",
            "d": -12,
            "by": "attach"
          },
          {
            "cond": "grieving",
            "turns": 3,
            "by": "attach"
          }
        ]
      }
    ]
  },
  {
    "id": "inherit-land",
    "title": "ที่ดินของครอบครัว",
    "body": "ที่นาของครอบครัวตกมาถึงรุ่นคุณ พี่น้องนั่งคุยกันว่าจะทำอย่างไรกับที่ดินแปลงนี้",
    "when": {
      "age": [
        35,
        70
      ],
      "loc": "isan"
    },
    "major": true,
    "choices": [
      {
        "id": "farm",
        "label": "ช่วยกันทำนาในที่ดินแปลงนี้",
        "text": "ช่วยกันทำนาในที่ของครอบครัว แล้วแบ่งผลผลิตกัน",
        "effects": [
          {
            "role": "farmer"
          },
          {
            "stat": "bond",
            "d": 3
          }
        ]
      },
      {
        "id": "discuss",
        "label": "ตกลงแบ่งหน้าที่ให้ชัดเจน",
        "text": "ตกลงกันชัดเจนว่าใครดูแลส่วนไหน ลดเรื่องผิดใจกันภายหลัง",
        "effects": [
          {
            "stat": "know",
            "d": 3
          }
        ]
      }
    ]
  },
  {
    "id": "raw-fish",
    "title": "อาหารที่คุ้นเคย",
    "body": "วันนี้ที่บ้านหาปลาน้ำจืดมาได้ ญาติจะทำก้อยปลาดิบกินกันตามแบบที่คุ้นเคย",
    "when": {
      "age": [
        15,
        80
      ],
      "chance": 0.3
    },
    "major": true,
    "choices": [
      {
        "id": "cook",
        "label": "ขอทำปลาให้สุกก่อนกิน",
        "text": "คุณเอาปลาไปทำให้สุก รสชาติต่างไปบ้างแต่ปลอดภัยจากพยาธิ",
        "effects": [
          {
            "stat": "health",
            "d": 2
          },
          {
            "flag": "rawFish",
            "v": false
          }
        ]
      },
      {
        "id": "ask",
        "label": "ถามอนามัยว่ากินอย่างไรให้ปลอดภัย",
        "text": "เจ้าหน้าที่อนามัยบอกว่าปลาน้ำจืดต้องทำให้สุกก่อนกิน คุณจำไว้ทุกมื้อ",
        "effects": [
          {
            "stat": "know",
            "d": 2
          },
          {
            "flag": "rawFish",
            "v": false
          }
        ]
      },
      {
        "id": "raw",
        "label": "กินก้อยปลาดิบแบบที่บ้านกินกันมา",
        "text": "อร่อยแบบที่คุ้นเคย แต่ปลาน้ำจืดดิบอาจมีพยาธิใบไม้ตับ",
        "effects": [
          {
            "stat": "happy",
            "d": 3
          },
          {
            "flag": "rawFish",
            "v": true
          }
        ]
      }
    ],
    "cooldown": 30
  },
  {
    "id": "drinking",
    "title": "งานเลี้ยง",
    "body": "เพื่อนชวนดื่มในงานสังสรรค์",
    "when": {
      "age": [
        20,
        65
      ],
      "chance": 0.3
    },
    "major": true,
    "choices": [
      {
        "id": "decline",
        "label": "เลือกเครื่องดื่มไม่มีแอลกอฮอล์",
        "text": "เลือกเครื่องดื่มไม่มีแอลกอฮอล์",
        "effects": [
          {
            "stat": "health",
            "d": 2
          },
          {
            "flag": "drinker",
            "v": false
          }
        ]
      },
      {
        "id": "drink",
        "label": "ดื่มเล็กน้อย",
        "text": "ดื่มเล็กน้อย",
        "effects": [
          {
            "stat": "happy",
            "d": 2
          },
          {
            "stat": "health",
            "d": -2
          }
        ]
      },
      {
        "id": "heavy",
        "label": "ดื่มหนักกับเพื่อนจนดึก",
        "text": "สนุกกับเพื่อนเต็มที่ แต่ตื่นมาเพลีย และเริ่มดื่มเป็นประจำ",
        "effects": [
          {
            "stat": "happy",
            "d": 4
          },
          {
            "stat": "bond",
            "d": 2
          },
          {
            "stat": "health",
            "d": -4
          },
          {
            "flag": "drinker",
            "v": true
          }
        ]
      }
    ],
    "cooldown": 30
  },
  {
    "id": "helmet",
    "title": "ออกเดินทาง",
    "body": "ต้องออกไปทำธุระในตลาด รถจักรยานยนต์จอดอยู่หน้าบ้าน",
    "when": {
      "age": [
        16,
        80
      ],
      "chance": 0.3
    },
    "major": true,
    "choices": [
      {
        "id": "helmet",
        "label": "สวมหมวกกันน็อกก่อนออกเดินทาง",
        "text": "สวมหมวกกันน็อกก่อนออกเดินทาง",
        "effects": [
          {
            "stat": "health",
            "d": 1
          },
          {
            "flag": "noHelmet",
            "v": false
          }
        ]
      },
      {
        "id": "other",
        "label": "นั่งรถสองแถวไปแทน",
        "text": "จ่ายค่ารถสองแถว ช้ากว่านิดหน่อยแต่ไม่ต้องเสี่ยงขี่รถเอง",
        "effects": [
          {
            "money": -1,
            "unit": "wageDay"
          },
          {
            "flag": "noHelmet",
            "v": false
          }
        ]
      },
      {
        "id": "nohelmet",
        "label": "ขี่ไปเลย ใกล้ๆ เองไม่ต้องใส่หมวก",
        "text": "ถึงที่หมายเร็วดี แต่ไม่มีอะไรป้องกันศีรษะถ้าล้ม",
        "effects": [
          {
            "stat": "happy",
            "d": 1
          },
          {
            "flag": "noHelmet",
            "v": true
          }
        ]
      }
    ],
    "cooldown": 30
  },
  {
    "id": "health-check",
    "title": "ดูแลสุขภาพ",
    "body": "อายุมากขึ้นแล้ว คนในบ้านเตือนให้ไปตรวจสุขภาพบ้าง",
    "when": {
      "age": [
        40,
        90
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "check",
        "label": "ไปตรวจที่โรงพยาบาล",
        "text": "เสียค่ารถและเวลาไปตรวจที่โรงพยาบาล รู้ผลแล้วดูแลตัวเองได้ถูกทาง",
        "effects": [
          {
            "stat": "health",
            "d": 4
          },
          {
            "money": -2,
            "unit": "wageDay"
          }
        ]
      },
      {
        "id": "later",
        "label": "เลื่อนไปก่อน",
        "text": "คุณเลื่อนไปก่อน เพราะยังไม่รู้สึกว่าป่วยอะไร",
        "effects": [
          {
            "stat": "happy",
            "d": 1
          }
        ]
      }
    ]
  },
  {
    "id": "ordain",
    "title": "ช่วงเวลาทบทวนชีวิต",
    "body": "ช่วงนี้งานเบาลง คุณมีโอกาสพักสักระยะเพื่อทบทวนชีวิต",
    "when": {
      "age": [
        20,
        70
      ]
    },
    "major": true,
    "choices": [
      {
        "id": "reflect",
        "label": "นั่งทบทวนชีวิตเงียบๆ ที่บ้าน",
        "text": "คุณใช้เวลาว่างคิดทบทวนว่าอะไรสำคัญ ใจเบาลง",
        "effects": [
          {
            "trait": "attach",
            "d": -3
          },
          {
            "stat": "happy",
            "d": 3
          }
        ]
      },
      {
        "id": "continue",
        "label": "ดำเนินชีวิตตามปกติ",
        "text": "ดำเนินชีวิตตามปกติ",
        "effects": [
          {
            "stat": "happy",
            "d": 1
          }
        ]
      }
    ]
  },
  {"id":"school-friends-activity","title":"เล่นกับเพื่อนหลังเลิกเรียน","body":"เพื่อนชวนใช้เวลาหลังเลิกเรียน คุณอยากทำอะไร","when":{"age":[6,12],"role":"student","chance":0.35},"cooldown":27,"choices":[{"id":"play","label":"เล่นกับเพื่อน","text":"คุณได้วิ่งเล่นและหัวเราะกับเพื่อน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":2}]},{"id":"read","label":"กลับไปอ่านหนังสือ","text":"คุณใช้เวลาฝึกอ่านในสิ่งที่สนใจ","effects":[{"stat":"know","d":3}]}]},
  {"id":"school-club","title":"ชมรมที่อยากลอง","body":"โรงเรียนมีกิจกรรมหลังเลิกเรียนหลายแบบ","when":{"age":[12,18],"role":"student"},"choices":[{"id":"sport","label":"เล่นกีฬา","text":"ได้ฝึกซ้อมและรู้จักเพื่อนใหม่","effects":[{"stat":"health","d":3},{"stat":"bond","d":2}]},{"id":"art","label":"ดนตรีหรือศิลปะ","text":"คุณได้ลองสร้างผลงานของตัวเอง","effects":[{"stat":"happy","d":2},{"stat":"know","d":1}]},{"id":"home","label":"กลับบ้านช่วยครอบครัว","text":"คุณแบ่งเวลาช่วยงานที่บ้าน","effects":[{"stat":"bond","d":3}]}]},
  {"id":"work-new-skill","title":"โอกาสเรียนรู้งานใหม่","body":"คุณมีโอกาสฝึกทักษะที่อาจนำไปใช้ทำงานได้","when":{"age":[18,65],"role":["farmer","factory","construction","driver","office","trader","teacher","civil","abroad"],"chance":0.35},"cooldown":21,"choices":[{"id":"learn","label":"แบ่งเงินไปฝึกทักษะ","text":"คุณนำสิ่งที่เรียนรู้มาลองใช้กับงาน","effects":[{"stat":"know","d":4},{"money":-3,"unit":"wageDay"}]},{"id":"practice","label":"ฝึกกับเพื่อนร่วมงาน","text":"คุณแลกเปลี่ยนความรู้ระหว่างทำงาน","effects":[{"stat":"know","d":2},{"stat":"bond","d":2}]},{"id":"rest","label":"พักผ่อนก่อน","text":"คุณเลือกเก็บแรงไว้สำหรับวันต่อไป","effects":[{"stat":"happy","d":2}]}]},
  {"id":"partner-weekend","title":"วันว่างกับคนรัก","body":"คุณและคนรักมีเวลาว่างตรงกัน","when":{"age":[18,100],"flag":{"partner":true},"chance":0.35},"cooldown":27,"choices":[{"id":"outing","label":"ออกไปเที่ยวด้วยกัน","text":"คุณได้ใช้เวลานอกบ้านด้วยกัน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":3},{"money":-2,"unit":"wageDay"}]},{"id":"home","label":"ทำอาหารกินที่บ้าน","text":"คุณใช้วันธรรมดาด้วยกันอย่างอบอุ่น","effects":[{"stat":"happy","d":2},{"stat":"bond","d":3}]},{"id":"alone","label":"ต่างคนพักผ่อน","text":"คุณให้เวลากันและกันได้พัก","effects":[{"stat":"health","d":1}]}]},
  {"id":"family-day","title":"วันของครอบครัว","body":"ลูกอยากใช้เวลากับคุณในวันหยุด","when":{"age":[24,100],"flag":{"child":true},"chance":0.35},"cooldown":27,"choices":[{"id":"together","label":"ออกไปเที่ยวใกล้บ้าน","text":"คุณและลูกได้ใช้เวลาร่วมกัน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":4},{"money":-2,"unit":"wageDay"}]},{"id":"home","label":"ทำกิจกรรมที่บ้าน","text":"คุณใช้เวลาทำสิ่งเล็ก ๆ ด้วยกัน","effects":[{"stat":"bond","d":3},{"stat":"happy","d":1}]},{"id":"another","label":"นัดกันวันอื่น","text":"วันนี้ยังไม่สะดวก คุณจึงนัดกันใหม่","effects":[]}]},
  {"id":"local-trip","title":"เที่ยวใกล้บ้าน","body":"มีวันว่างหนึ่งวัน คุณอยากใช้เวลาแบบไหน","when":{"age":[18,100],"chance":0.35},"cooldown":30,"choices":[{"id":"market","label":"เดินตลาดและลองของกิน","text":"คุณได้พบผู้คนและของกินที่อยากลอง","effects":[{"stat":"happy","d":2},{"money":-1,"unit":"wageDay"}]},{"id":"nature","label":"ไปเดินเล่นชมธรรมชาติ","text":"คุณได้พักจากกิจวัตรประจำวัน","effects":[{"stat":"happy","d":2},{"stat":"health","d":1}]},{"id":"save","label":"อยู่บ้านเก็บเงิน","text":"คุณใช้เวลาพักและเก็บเงินไว้","effects":[{"stat":"health","d":1}]}]},
  {"id":"elder-community","title":"เพื่อนบ้านชวนทำกิจกรรม","body":"คนในชุมชนชวนมาพบปะกัน","when":{"age":[60,100],"chance":0.35},"cooldown":30,"choices":[{"id":"join","label":"ไปร่วมกิจกรรม","text":"คุณได้พูดคุยและพบเพื่อนเก่า","effects":[{"stat":"happy","d":2},{"stat":"bond","d":3}]},{"id":"call","label":"โทรหาเพื่อนแทน","text":"คุณได้ถามไถ่สารทุกข์สุกดิบกัน","effects":[{"stat":"bond","d":2}]},{"id":"rest","label":"พักอยู่บ้าน","text":"คุณเลือกพักผ่อนตามกำลัง","effects":[{"stat":"health","d":1}]}]},
  {"id":"retirement-hobby","title":"เวลาว่างหลังเกษียณ","body":"ตอนนี้คุณมีเวลาลองทำสิ่งที่ชอบ","when":{"age":[60,100],"role":"retired","chance":0.35},"cooldown":30,"choices":[{"id":"garden","label":"ปลูกต้นไม้","text":"คุณดูแลต้นไม้และค่อย ๆ เห็นมันเติบโต","effects":[{"stat":"happy","d":2},{"stat":"health","d":1}]},{"id":"craft","label":"ทำงานฝีมือ","text":"คุณลองฝึกทักษะและทำของใช้เล็ก ๆ","effects":[{"stat":"happy","d":2},{"stat":"know","d":2}]},{"id":"family","label":"ใช้เวลากับคนใกล้ตัว","text":"คุณได้พูดคุยกับคนที่รัก","effects":[{"stat":"bond","d":3}]}]},
  {"id":"child-play","title":"เวลาเล่นของเด็กน้อย","body":"คนในบ้านชวนใช้เวลาร่วมกัน คุณอยากลองอะไร","when":{"age":[2,2]},"choices":[{"id":"play","label":"เล่นกับคนในบ้าน","text":"ได้เล่นและหัวเราะด้วยกัน","effects":[{"stat":"happy","d":2},{"stat":"bond","d":2}]},{"id":"story","label":"ฟังนิทาน","text":"ได้ฟังเรื่องเล่าก่อนพักผ่อน","effects":[{"stat":"know","d":2}]}]},
  {"id":"child-friends","title":"เพื่อนตัวน้อย","body":"มีเด็กข้างบ้านชวนมาเล่นด้วยกัน","when":{"age":[4,4]},"choices":[{"id":"join","label":"ลองเล่นด้วยกัน","text":"ได้ทำความรู้จักเพื่อนใหม่","effects":[{"stat":"bond","d":2},{"stat":"happy","d":1}]},{"id":"stay","label":"เล่นใกล้คนในบ้าน","text":"ได้เล่นในที่ที่รู้สึกสบายใจ","effects":[{"stat":"happy","d":2}]}]},
  {"id":"child-school-ready","title":"เตรียมตัวเข้าโรงเรียน","body":"อีกไม่นานจะได้เข้าเรียน คุณอยากเตรียมตัวแบบไหน","when":{"age":[5,5]},"choices":[{"id":"read","label":"ลองอ่านและวาดรูป","text":"ได้ฝึกสิ่งใหม่ทีละนิด","effects":[{"stat":"know","d":2}]},{"id":"friends","label":"ทำความรู้จักเพื่อน","text":"ได้ลองพูดคุยกับเด็กวัยเดียวกัน","effects":[{"stat":"bond","d":2}]}]}
];
