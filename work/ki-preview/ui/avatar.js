globalThis.KI = globalThis.KI || {};
(function () {
  const NS='http://www.w3.org/2000/svg';
  const OUTLINE='#594638';
  function shape(tag,attrs) {
    const node=document.createElementNS(NS,tag);
    for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));
    return node;
  }
  function path(d,fill,extra) {
    return shape('path',{d,fill,...(extra || {})});
  }
  function create(state) {
    const age=Math.max(0,state.year-state.birthYear);
    const stage=age<3?'baby':age<13?'child':age<20?'teen':age<60?'adult':'elder';
    const seed=Array.from(state.name || '').reduce((sum,char)=>sum+char.codePointAt(0),0);
    const skin=['#bc805e','#cc9170','#daaa84','#e4b795'][seed%4];
    const shadow=['#a9694b','#b77858','#be8768','#ca9272'][seed%4];
    const hair=age>=80?'#e2ded8':age>=70?'#bdb8b1':age>=60?'#948d86':age>=50?'#5f5853':['#302927','#3d302a','#282828'][seed%3];
    const monk=state.role==='monk' || !!(state.edu && state.edu.in==='novice');
    const uniforms={student:'#faf8f1',farmer:'#3e6280',monk:'#ce843a',factory:'#667c8b',construction:'#d49b43',teacher:'#c2aa83',civil:'#b8a17d',office:'#6d778e',soldier:'#75805c',doctor:'#f4f6f8',nurse:'#eef3f6',police:'#6b5a3e',engineer:'#3d5a80',developer:'#4a4e69',chef:'#f7f4ee',mechanic:'#4f5d75',security:'#2f3e46',rider:'#2e8b57',athlete:'#d62828',lawyer:'#2b2d42',banker:'#34495e',accountant:'#5c677d',pharmacist:'#f1f4f6',prisoner:'#b8733a'};
    const outfit=uniforms[state.role] || ['#b75f49','#5e8775','#7a6a8f','#bd8b55'][seed%4];
    const hairstyle=seed%4;
    const sad=(state.conds || []).some(item=>item.id==='heartbroken' || item.id==='grieving');
    const svg=shape('svg',{viewBox:'0 0 240 330',role:'img','aria-label':`ตัวละคร ${state.name} อายุ ${age} ปี`,'data-stage':stage,'data-mood':sad?'sad':'calm','data-hair-style':hairstyle,'data-outfit':outfit});
    svg.append(shape('ellipse',{cx:120,cy:307,rx:68,ry:10,fill:'#3f493b',opacity:'.14'}));
    const figure=shape('g',{class:'avatar-figure',transform:age>=75?'translate(6 14) scale(.95)':stage==='child'?'translate(18 50) scale(.85)':stage==='teen'?'translate(5 15) scale(.96)':'translate(0 0)'});
    const stroke={stroke:OUTLINE,'stroke-width':2.4,'stroke-linejoin':'round','stroke-linecap':'round'};
    if(stage==='baby') {
      figure.append(path('M108 126 L108 150 Q120 157 132 150 L132 126Z',skin,stroke));
      figure.append(shape('ellipse',{cx:101,cy:277,rx:16,ry:12,fill:skin,...stroke}),shape('ellipse',{cx:139,cy:277,rx:16,ry:12,fill:skin,...stroke}));
      figure.append(path('M88 144 Q59 150 58 196 Q55 247 82 268 Q120 290 158 268 Q185 247 182 196 Q181 150 152 144Z','#f0c989',stroke));
      figure.append(path('M62 198 Q73 180 87 187 L105 201 Q112 206 107 214 Q103 220 96 216 L82 207 Q78 221 70 225Z',skin,stroke),path('M178 198 Q167 180 153 187 L135 201 Q128 206 133 214 Q137 220 144 216 L158 207 Q162 221 170 225Z',skin,stroke));
      figure.append(path('M83 242 Q120 261 157 242','none',{stroke:'#d6a96f','stroke-width':2,opacity:'.8'}));
    } else if(monk) {
      figure.append(shape('ellipse',{cx:100,cy:300,rx:14,ry:6,fill:skin,...stroke}),shape('ellipse',{cx:140,cy:300,rx:14,ry:6,fill:skin,...stroke}));
      figure.append(path('M81 144 Q60 150 56 175 L48 296 Q120 306 192 296 L184 175 Q180 150 159 144 L143 137 L97 137Z','#d9822b',stroke));
      figure.append(path('M97 140 L170 236 L156 248 L86 152Z','#c46f1e',{stroke:'#9c5516','stroke-width':1.5}),path('M70 200 Q120 214 170 200','none',{stroke:'#b9661c','stroke-width':2,opacity:'.6'}));
      figure.append(shape('circle',{cx:60,cy:222,r:9,fill:skin,...stroke}),shape('circle',{cx:180,cy:222,r:9,fill:skin,...stroke}));
      figure.append(path('M99 123 L99 144 Q120 160 141 144 L141 123Z',skin,stroke));
    } else {
      const trousers=state.role==='student'?'#465672':state.role==='farmer'?'#465465':'#57545b';
      figure.append(path('M83 218 L80 287 Q87 296 107 291 L120 245 L133 291 Q153 296 160 287 L157 218Z',trousers,stroke));
      figure.append(path('M80 283 Q74 286 71 298 Q70 303 80 303 L105 303 Q110 300 107 290Z','#594c43',stroke),path('M160 283 Q166 286 169 298 Q170 303 160 303 L135 303 Q130 300 133 290Z','#594c43',stroke));
      figure.append(path('M81 144 Q62 150 56 171 L45 211 Q45 221 57 224 Q65 224 68 215 L80 185 L84 224 Q120 234 156 224 L160 185 L172 215 Q175 224 183 224 Q195 221 195 211 L184 171 Q178 150 159 144 L143 137 L97 137Z',outfit,stroke));
      figure.append(shape('circle',{cx:55,cy:219,r:9,fill:skin,...stroke}),shape('circle',{cx:185,cy:219,r:9,fill:skin,...stroke}));
      figure.append(path('M99 123 L99 144 Q120 160 141 144 L141 123Z',skin,stroke));
      if(state.role==='student') {
        figure.append(path('M98 140 L120 156 L108 166 L93 146Z','#e5e8ed',{stroke:'#9da2a7','stroke-width':1.5}),path('M142 140 L120 156 L132 166 L147 146Z','#e5e8ed',{stroke:'#9da2a7','stroke-width':1.5}),path('M120 157 L120 222','none',{stroke:'#b7b9b8','stroke-width':1.5}));
      } else if(state.role==='farmer') {
        figure.append(path('M98 141 Q120 151 142 141 L145 151 Q123 163 98 153Z','#c87b5d',{stroke:'#91563e','stroke-width':1.5}),path('M91 173 L104 173 L104 185 L91 185Z','none',{stroke:'#a9c0c3','stroke-width':1.5,opacity:'.65'}));
      } else {
        figure.append(path('M101 145 Q120 157 139 145','none',{stroke:'#fff8e7','stroke-width':2,opacity:'.5'}),path('M88 210 Q120 217 152 210','none',{stroke:'#443a34','stroke-width':1.5,opacity:'.2'}));
      }
    }
    if(state.sex==='f' && stage!=='baby' && !monk)figure.append(path('M77 79 Q71 26 120 24 Q169 26 163 79 L169 128 Q162 147 143 143 L97 143 Q78 147 71 128Z',hair));
    figure.append(shape('ellipse',{cx:76,cy:89,rx:9,ry:13,fill:skin,...stroke}),shape('ellipse',{cx:164,cy:89,rx:9,ry:13,fill:skin,...stroke}));
    figure.append(path('M77 72 Q77 30 120 30 Q163 30 163 72 L161 101 Q159 131 120 140 Q81 131 79 101Z',skin,stroke));
    const hairlines=[
      'M78 76 Q72 28 120 27 Q165 27 163 75 Q154 61 148 55 Q123 70 94 60 Q84 67 78 76Z',
      'M78 76 Q71 28 120 27 Q166 29 163 75 Q154 57 142 50 Q122 73 86 63Z',
      'M78 76 Q70 32 120 26 Q168 29 163 76 Q156 61 153 52 Q142 66 130 57 Q118 70 106 58 Q94 68 83 62Z',
      'M78 76 Q70 30 120 27 Q166 29 163 75 Q156 58 143 57 Q120 60 103 48 Q94 61 78 76Z'
    ];
    if(monk)figure.append(path('M80 70 Q80 33 120 32 Q160 33 160 70','none',{stroke:'#8f7a6b','stroke-width':1.2,opacity:'.35'}));
    else if(age>=85 && seed%2===0)figure.append(path('M78 76 Q76 62 86 58 Q90 70 80 80Z M162 76 Q164 62 154 58 Q150 70 160 80Z',hair));
    else figure.append(path(hairlines[hairstyle],hair));
    if(!monk)figure.append(path('M89 87 Q97 83 105 87 M135 87 Q143 83 151 87','none',{stroke:hair,'stroke-width':2.1,'stroke-linecap':'round'}));
    figure.append(shape('ellipse',{cx:99,cy:96,rx:3.4,ry:4.4,fill:'#362e29'}),shape('ellipse',{cx:141,cy:96,rx:3.4,ry:4.4,fill:'#362e29'}));
    figure.append(shape('circle',{cx:100,cy:95,r:1,fill:'#fff9ec'}),shape('circle',{cx:142,cy:95,r:1,fill:'#fff9ec'}));
    if(stage!=='baby' && seed%5===0)figure.append(shape('circle',{cx:99,cy:96,r:10,fill:'none',stroke:OUTLINE,'stroke-width':2}),shape('circle',{cx:141,cy:96,r:10,fill:'none',stroke:OUTLINE,'stroke-width':2}),path('M109 95 Q120 91 131 95','none',{stroke:OUTLINE,'stroke-width':2}));
    figure.append(shape('ellipse',{cx:89,cy:109,rx:6,ry:3,fill:'#c97363',opacity:'.25'}),shape('ellipse',{cx:151,cy:109,rx:6,ry:3,fill:'#c97363',opacity:'.25'}));
    figure.append(path('M119 99 Q117 107 121 108','none',{stroke:shadow,'stroke-width':2,'stroke-linecap':'round'}));
    figure.append(path(sad?'M109 122 Q120 115 131 122':'M109 117 Q120 126 131 117','none',{stroke:'#894e42','stroke-width':2.5,'stroke-linecap':'round'}));
    const lines=[];
    if(age>=30)lines.push('M106 66 Q120 62 134 66');
    if(age>=40)lines.push('M84 94 L78 92 M156 94 L162 92','M102 72 Q120 68 138 72');
    if(age>=50)lines.push('M106 106 Q103 114 106 120 M134 106 Q137 114 134 120','M84 98 L78 98 M156 98 L162 98');
    if(age>=60)lines.push('M100 60 Q120 56 140 60','M92 103 Q96 106 100 104 M140 104 Q144 106 148 103');
    if(age>=70)lines.push('M100 124 Q104 130 108 128 M132 128 Q136 130 140 124','M86 112 L94 114 M146 114 L154 112');
    if(age>=80)lines.push('M110 132 Q120 136 130 132','M90 84 Q97 80 104 84 M136 84 Q143 80 150 84');
    if(lines.length)figure.append(path(lines.join(' '),'none',{stroke:shadow,'stroke-width':age>=70?1.8:1.4,'stroke-linecap':'round',opacity:String(Math.min(0.9,0.35+age/150))}));
    if(age>=78 && stage!=='baby')figure.append(path('M190 222 L198 302','none',{stroke:'#6b4a33','stroke-width':5,'stroke-linecap':'round'}),path('M184 222 Q190 214 198 220','none',{stroke:'#6b4a33','stroke-width':5,'stroke-linecap':'round'}));
    if(stage==='baby')figure.append(path('M112 154 Q120 163 128 154','none',{stroke:'#c4915f','stroke-width':2}));
    svg.append(figure);return svg;
  }
  KI.avatar={create};
})();
