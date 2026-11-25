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
  function mirror(d) {
    return d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g,(match,x,y)=>`${Math.round((240-Number(x))*10)/10} ${y}`);
  }
  function both(d) {
    return `${d} ${mirror(d)}`;
  }
  function hash(text) {
    let value=2166136261;
    for(const char of text){value^=char.codePointAt(0);value=Math.imul(value,16777619);}
    return value>>>0;
  }
  function random(seed) {
    let value=seed;
    return ()=>{value=(value+0x6d2b79f5)>>>0;let r=Math.imul(value^(value>>>15),1|value);r=(r+Math.imul(r^(r>>>7),61|r))^r;return ((r^(r>>>14))>>>0)/4294967296;};
  }
  function mix(a,b,t) {
    const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);
    const channel=bit=>Math.round(((pa>>bit)&255)*(1-t)+((pb>>bit)&255)*t);
    return '#'+((1<<24)|(channel(16)<<16)|(channel(8)<<8)|channel(0)).toString(16).slice(1);
  }
  function light(color) {
    const value=parseInt(color.slice(1),16);
    return (((value>>16)&255)*0.299+((value>>8)&255)*0.587+(value&255)*0.114)/255;
  }
  function choose(list,value) {
    return list[Math.min(list.length-1,Math.floor(value*list.length))];
  }
  function create(state) {
    const age=Math.max(0,state.year-state.birthYear);
    const stage=age<3?'baby':age<13?'child':age<20?'teen':age<60?'adult':'elder';
    const rand=random(hash(`${state.name || ''}|${state.birthYear}`));
    const roll={};
    ['skin','face','eyes','spread','brows','browWeight','nose','mouth','hair','fringe','hairTone','grey','bald','beard','glasses','build','palette','accent','print','cloth','hat','social','grit','mole','lips','feet'].forEach(key=>{roll[key]=rand();});
    const female=state.sex==='f';
    const role=state.role || '';
    const monk=role==='monk' || !!(state.edu && state.edu.in==='novice');
    const era=state.year<1990?'old':state.year<2005?'mid':'new';
    const rural=!state.loc || state.loc.kind==='isan';
    const status=(state.flags && state.flags.status) || state.wealth || 'mid';
    const conds=(state.conds || []).map(item=>item.id);
    const sad=conds.includes('heartbroken') || conds.includes('grieving');
    const sick=conds.includes('sick');
    const traits=state.traits || {social:roll.social*100,grit:roll.grit*100};
    const social=Number.isFinite(traits.social)?traits.social:50;
    const grit=Number.isFinite(traits.grit)?traits.grit:50;
    const happy=state.stats && Number.isFinite(state.stats.happy)?state.stats.happy:60;
    const mood=sad?'sad':sick?'tired':happy<30 || conds.includes('lonely')?'low':happy>72 || conds.includes('inlove') || conds.includes('proud')?'bright':'calm';
    const expression=mood==='sad'?'frown':mood==='tired' || mood==='low'?'flat':stage==='baby'?'smile':social>68?(mood==='bright' || social>85?'open':'smile'):social<32?(mood==='bright'?'small':'flat'):mood==='bright'?'open':'smile';
    let skin=choose(['#a8704f','#b67a56','#c48862','#cf9870','#d9a780','#e3b892'],roll.skin);
    if(sick)skin=mix(skin,'#d6d0bf',.32);
    const shadow=mix(skin,'#5b3322',.25);
    const base=state.birthYear>=1985 && age>=16 && age<=40 && role!=='student' && roll.hairTone>.82?'#6b4630':choose(['#1e1917','#29211e','#322720','#3a2b22'],roll.hairTone);
    const greyness=Math.min(1,Math.max(0,(age-42-roll.grey*18)/28));
    const hair=stage==='baby'?mix(base,'#6b5a4c',.25):mix(base,'#e6e2dc',greyness*.92);
    const browColor=mix(base,'#d9d4cc',greyness*.6);
    let hairstyle;
    if(monk)hairstyle='none';
    else if(stage==='baby')hairstyle='tuft';
    else if(!female) {
      if(role==='soldier' || role==='police')hairstyle='crew';
      else if(stage==='child' || (role==='student' && age<18))hairstyle=state.year<2013 || roll.hair<.5?'crew':'short';
      else if(age>=45 && roll.bald<(age>=60?.4:.2))hairstyle='bald';
      else if(state.year<1983 && age<40)hairstyle=choose(['long70','side','short'],roll.hair);
      else if(state.birthYear>=1988 && age<36)hairstyle=choose(['spiky','short','side','undercut'],roll.hair);
      else hairstyle=choose(['short','side','crew','part'],roll.hair);
    } else {
      if(stage==='child')hairstyle=role==='student' && state.year<2013?choose(['bob','pony'],roll.hair):choose(['bob','pony','long'],roll.hair);
      else if(role==='student' && age<18 && state.year<2013)hairstyle='bob';
      else if(role==='nurse')hairstyle='bun';
      else if(stage==='elder')hairstyle=choose(['perm','long','perm','perm'],roll.hair);
      else if(['factory','construction','farmer','abroad','soldier'].includes(role))hairstyle=choose(['pony','bun','long'],roll.hair);
      else hairstyle=choose(['long','bun','bob','pony','long'],roll.hair);
    }
    const swept='M78 78 Q72 30 120 27 Q168 30 162 78 Q152 52 120 48 Q88 52 78 78Z';
    const bangs='M78 78 Q72 28 120 26 Q168 28 162 78 Q161 64 154 60 Q120 65 86 60 Q79 64 78 78Z';
    const sidePart='M78 76 Q71 28 120 27 Q166 29 163 75 Q154 57 142 50 Q122 73 86 63Z';
    const shortCut='M78 76 Q72 28 120 27 Q165 27 163 75 Q154 61 148 55 Q123 70 94 60 Q84 67 78 76Z';
    const styles={
      none:[null,null],
      tuft:[null,'M112 36 Q114 22 121 30 Q127 21 130 34 Q121 38 112 36Z'],
      crew:[null,'M79 74 Q76 32 120 30 Q164 32 161 74 Q157 54 120 48 Q83 54 79 74Z'],
      short:[null,shortCut],
      side:[null,sidePart],
      spiky:[null,'M78 76 Q70 32 120 26 Q168 29 163 76 Q156 61 153 52 Q142 66 130 57 Q118 70 106 58 Q94 68 83 62Z'],
      part:[null,'M78 76 Q70 30 120 27 Q166 29 163 75 Q156 58 143 57 Q120 60 103 48 Q94 61 78 76Z'],
      undercut:[null,'M82 66 Q78 26 124 22 Q170 26 158 66 Q154 48 138 46 Q116 58 94 48 Q86 54 82 66Z'],
      long70:['M75 82 Q69 28 120 26 Q171 28 165 82 L167 110 Q160 114 156 104 L84 104 Q80 114 73 110Z',sidePart],
      bald:[null,'M78 84 Q72 58 87 43 Q91 56 89 66 Q82 70 78 84Z M162 84 Q168 58 153 43 Q149 56 151 66 Q158 70 162 84Z'],
      long:['M77 79 Q71 26 120 24 Q169 26 163 79 L169 128 Q162 147 143 143 L97 143 Q78 147 71 128Z',roll.fringe<.5?bangs:sidePart],
      bob:['M73 82 Q69 26 120 24 Q171 26 167 82 L168 116 Q156 122 148 112 L92 112 Q84 122 72 116Z',bangs],
      pony:['M146 40 Q184 48 177 104 Q173 126 160 134 Q167 100 150 62Z',swept],
      bun:['M104 30 Q104 12 120 12 Q136 12 136 30 Q136 42 120 42 Q104 42 104 30Z',swept],
      perm:['M64 86 Q54 26 120 18 Q186 26 176 86 L180 124 Q168 136 156 122 Q146 134 134 124 L106 124 Q94 134 84 122 Q72 136 60 124Z','M78 80 Q66 68 75 54 Q72 37 89 34 Q97 22 111 28 Q120 19 130 28 Q143 22 151 34 Q168 37 165 54 Q174 68 162 80 Q158 62 146 55 Q120 63 94 55 Q82 62 78 80Z'],
    };
    const ma=choose(['#b7473d','#3d5f8f','#4f7f4f','#8a4f8a'],roll.cloth);
    const sinColor=choose(['#5a3d5c','#3d4f6b','#6b3f3a','#4a5a3f','#7a4a2e'],roll.accent);
    const faded=color=>status==='poor'?mix(color,'#d9d3c5',.18):color;
    const casual=choose(era==='old'?['#7c8e9c','#a38769','#879878','#b39a7d','#6e7e93','#c0b398','#9a6f5e']:era==='mid'?['#b9534f','#4f7fb8','#8fae56','#7d64a0','#e08c45','#4aa3b8','#d4b04a']:['#e05a4e','#3f8fd2','#5cb85c','#f0b429','#9b59b6','#20a39e','#ef6f9c','#34495e'],roll.palette);
    const khaki='#a8936a';
    const kit={top:casual,sleeve:'short',neck:'collar',lower:'trousers',lowerColor:'#4c4a52',feet:'shoes',feetColor:'#3f3530',socks:false,hat:null,hatColor:'#f2c230',tie:null,extras:[]};
    const uniforms={engineer:'#3d5a80',developer:'#4a4e69',chef:'#f7f4ee',mechanic:'#4f5d75',security:'#2f3e46',athlete:'#d62828',lawyer:'#2b2d42',banker:'#34495e',accountant:'#5c677d',pharmacist:'#f4f6f8'};
    if(stage==='baby' || monk) {
      kit.neck='none';
    } else if(role==='student' && age>=18) {
      Object.assign(kit,{top:'#fbfaf5',neck:female?'blouse':'collar',lower:female?'skirt':'trousers',lowerColor:'#25252b',feetColor:'#25252b',tie:!female && roll.accent<.4?'#2f3b63':null});
    } else if(role==='student') {
      const shorts=age<13 || roll.palette<.5?'#2f3d63':'#a68b5b';
      Object.assign(kit,{top:'#fbfaf5',neck:female?(age<13?'sailor':'bow'):'collar',lower:female?'skirt':'shorts',lowerColor:female?(age<13 || roll.palette<.6?'#2f3d63':'#26262c'):shorts,feetColor:!female && shorts==='#a68b5b'?'#6b4a33':'#26262c',socks:true});
      kit.extras.push('nametag');
    } else if(role==='farmer') {
      Object.assign(kit,{top:faded(choose(['#3e5a78','#5d6f7c','#7a6450','#4d6b5a','#2f4a6b'],roll.palette)),sleeve:'long',neck:female?'blouse':'collar',lower:female?'sin':roll.cloth<.4?'sarong':'trousers',lowerColor:'#3f4650',feet:era==='new' && roll.feet<.35?'boots':roll.feet<.25?'bare':'sandals',feetColor:'#2f3a33',hat:roll.hat<.65?'straw':female?'wrap':null});
      kit.extras.push(kit.lower==='sarong' || roll.cloth<.6?'maShoulder':'maWaist');
    } else if(role==='politician') {
      const rank=(state.flags||{}).polRank||1;
      if(rank===1)Object.assign(kit,{top:khaki,lower:female?'skirt':'trousers',lowerColor:mix(khaki,'#2a2418',.25),feetColor:'#25252b'});
      else if(rank===2)Object.assign(kit,{top:'#fbfcfd',sleeve:'long',neck:female?'blouse':'collar',lower:female?'skirt':'trousers',lowerColor:'#2f3342',feetColor:'#25252b'});
      else Object.assign(kit,{top:'#23283a',sleeve:'long',neck:female?'blouse':'collar',lower:female?'skirt':'trousers',lowerColor:'#23283a',feetColor:'#1d1d22',tie:female?null:'#8a1c2b'});
      kit.extras.push(...(rank===1?['boards','pockets','badge']:rank===2?['badge']:['badge','gold']));
    } else if(role==='civil' || role==='police' || (role==='teacher' && roll.cloth<.34)) {
      const tone=role==='police'?'#6b5a3e':khaki;
      Object.assign(kit,{top:tone,lower:female && role!=='police'?'skirt':'trousers',lowerColor:mix(tone,'#2a2418',.25),feetColor:'#25252b'});
      kit.extras.push('boards','pockets','badge');
    } else if(role==='teacher') {
      const thai=roll.cloth>.67;
      Object.assign(kit,{top:choose(female?['#f3dfe3','#e2ecf4','#f2ead2','#dfeedd']:['#f6f7f8','#d6e4f0','#efe8d8'],roll.palette),neck:female?'blouse':'collar',lower:female?(thai?'sin':'skirt'):'trousers',lowerColor:female?'#3d3f52':'#3e4250',feetColor:'#25252b'});
    } else if(role==='soldier') {
      Object.assign(kit,{top:'#5b6b45',sleeve:'long',lowerColor:'#56653f',feet:'boots',feetColor:'#26241f',hat:'cap',hatColor:'#4f5e3b'});
      kit.extras.push(state.year>=1980?'camo':'pockets','boards');
    } else if(role==='factory') {
      const tone=choose(['#8fb3cf','#9aa3ab','#d9d2b8','#5b7ea6','#c9d8c5'],roll.palette);
      Object.assign(kit,{top:tone,sleeve:roll.cloth<.5?'long':'short',lowerColor:'#3a4150',feet:era==='old'?'shoes':'sneakers',feetColor:'#2f2f33',hat:roll.hat<.6?'cap':null,hatColor:tone});
      kit.extras.push('patch');
    } else if(role==='construction') {
      Object.assign(kit,{top:faded(choose(['#7a6e60','#5e6b7a','#8a5a44','#6b7a5a','#3f4b5c'],roll.palette)),sleeve:'long',lowerColor:'#4a5266',feet:'boots',feetColor:'#3b322b',hat:'hardhat',hatColor:choose(['#f2c230','#f08a24','#f4f4ef','#3b82c4'],roll.hat)});
      kit.extras.push(roll.cloth<.55?'mask':'scarf');
      if(state.year>=2000)kit.extras.push('reflect');
    } else if(role==='office') {
      Object.assign(kit,{top:choose(female?['#f6f0f2','#dfe8f3','#f3eadb','#e6e0f0']:['#f6f7f8','#cfe0f0','#e9eef5','#f3efe4'],roll.palette),sleeve:state.year>=1990?'long':'short',neck:female?'blouse':'collar',lower:female && roll.cloth<.6?'skirt':'trousers',lowerColor:female?'#3a3d4a':'#3e4250',feetColor:'#25252b',tie:!female && state.year>=1990?choose(['#8b2e3c','#2f4a7a','#4a6b3a','#6a4a7a'],roll.accent):null});
    } else if(role==='rider' && state.year>=2015) {
      Object.assign(kit,{top:choose(['#2e8b57','#d9682b','#c23b3b','#2f5d8a'],roll.palette),sleeve:'long',neck:'zip',lowerColor:'#3e5170',feet:'sneakers',feetColor:'#2f2f33',hat:'helmet',hatColor:choose(['#2b2d33','#e9e6df','#2e8b57','#b23a3a'],roll.hat)});
      kit.extras.push('reflect');
    } else if(role==='nurse') {
      Object.assign(kit,{top:'#fbfcfd',neck:female?'blouse':'collar',lower:female?'skirt':'trousers',lowerColor:'#f4f6f8',feetColor:'#ecebe6',hat:female?'nursecap':null});
    } else if(role==='doctor' || role==='pharmacist') {
      Object.assign(kit,{top:'#fbfcfd',sleeve:'long',neck:'coat',lowerColor:'#3e4250',feetColor:'#25252b',tie:!female && roll.accent<.5?'#2f4a7a':null});
      if(role==='doctor')kit.extras.push('stetho');
    } else if(role==='abroad') {
      Object.assign(kit,{top:choose(['#3d4f6b','#59636e','#2f5d50','#6b5a46'],roll.palette),sleeve:'long',neck:'zip',lowerColor:'#3d4250',feet:'boots',feetColor:'#2e2a26',hat:roll.hat<.5?'cap':null,hatColor:'#3a3f48'});
      kit.extras.push('reflect');
    } else if(role==='prisoner') {
      Object.assign(kit,{top:'#b8733a',neck:'tee',lower:'shorts',lowerColor:'#9a5f30',feet:'sandals'});
    } else if(uniforms[role]) {
      Object.assign(kit,{top:uniforms[role],sleeve:['lawyer','banker'].includes(role)?'long':'short',lowerColor:'#3e4250',feetColor:'#25252b',tie:['lawyer','banker'].includes(role) && !female?'#7a2e3a':null});
      if(role==='chef')kit.extras.push('apron');
    } else if(stage==='elder') {
      Object.assign(kit,{top:faded(choose(female?['#e9dccf','#cdb8d6','#bfd3c4','#e8c9b5','#d8c7a4']:['#f1ede4','#d9d2c0','#c9d3d8','#e6dccb','#b9a58a'],roll.palette)),neck:female?'blouse':roll.accent<.5?'tee':'collar',lower:female?(rural || roll.cloth<.6?'sin':'skirt'):rural && roll.cloth<.6?'sarong':'trousers',lowerColor:'#4a4a52',feet:'sandals'});
      if(roll.hat<.4)kit.extras.push('maShoulder');
    } else if(stage==='child') {
      Object.assign(kit,{top:era==='old'?faded(choose(['#e8e2d2','#c9d6dd','#d9c8ae','#b9c7a8'],roll.palette)):casual,neck:era==='old'?(female?'blouse':'collar'):'tee',lower:female?'skirt':'shorts',lowerColor:era==='old'?'#4f5560':female?choose(['#d05a7a','#3e5170','#7a5aa0'],roll.accent):'#3e5170',feet:era==='old'?(roll.feet<.4?'bare':'sandals'):'sneakers'});
      if(era!=='old')kit.extras.push('print');
    } else {
      const traditional=female && rural && (era==='old' || (age>=35 && roll.cloth<.5));
      Object.assign(kit,{top:faded(casual),neck:era==='old'?(female?'blouse':'collar'):era==='mid'?(roll.print<.5?'polo':'tee'):roll.print<.7?'tee':'collar',lower:!female?(era==='old' && rural && age>=30 && roll.cloth<.3?'sarong':'trousers'):traditional?'sin':era==='old'?'skirt':roll.cloth<.5?'trousers':'skirt',lowerColor:era==='old'?(female?'#5a4a5e':'#4a4a52'):'#3e5170',feet:era==='old'?'sandals':era==='mid'?(roll.feet<.5?'sandals':'shoes'):'sneakers'});
      if(kit.neck==='tee' && era==='new')kit.extras.push('print');
      if(role==='trader' || role==='vendor')kit.extras.push('apron');
      if(role==='driver'){kit.neck='polo';kit.hat='cap';kit.hatColor=choose(['#2f4a7a','#3a3f48','#8b2e3c'],roll.hat);}
      if(role==='rider')kit.extras.push('vest');
    }
    if(kit.lower==='sin')kit.lowerColor=sinColor;
    if(kit.lower==='sarong')kit.lowerColor=ma;
    if(kit.feet==='sneakers')kit.feetColor='#f1efe9';
    if((status==='rich' || status==='wealthy') && age>=20 && !monk && !['student','soldier','prisoner','construction'].includes(role))kit.extras.push('gold');
    const build=stage==='baby' || stage==='child'?1:choose([.92,.97,1,1.04,1.08],roll.build);
    const babyColor=era==='old'?choose(['#efe4cc','#e7dcc6','#dfe6e0'],roll.palette):choose(['#f2b134','#7cc4e6','#f28fa6','#8fd18a','#f6e05e'],roll.palette);
    const outfitColor=stage==='baby'?babyColor:monk?'#d9822b':kit.top;
    const svg=shape('svg',{viewBox:'0 0 240 330',role:'img','aria-label':`ตัวละคร ${state.name} อายุ ${age} ปี`,'data-stage':stage,'data-mood':mood,'data-hair-style':hairstyle,'data-outfit':outfitColor});
    svg.append(shape('ellipse',{cx:120,cy:307,rx:68,ry:10,fill:'#3f493b',opacity:'.14'}));
    const figure=shape('g',{class:'avatar-figure',transform:age>=75?'translate(6 14) scale(.95)':stage==='child'?'translate(18 50) scale(.85)':stage==='teen'?'translate(5 15) scale(.96)':'translate(0 0)'});
    const stroke={stroke:OUTLINE,'stroke-width':2.4,'stroke-linejoin':'round','stroke-linecap':'round'};
    const thin=color=>({stroke:color,'stroke-width':1.5,'stroke-linejoin':'round','stroke-linecap':'round'});
    const line=(d,color,width,extra)=>path(d,'none',{stroke:color,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round',...(extra || {})});
    if(stage==='baby') {
      figure.append(path('M108 126 L108 150 Q120 157 132 150 L132 126Z',skin,stroke));
      figure.append(shape('ellipse',{cx:101,cy:277,rx:16,ry:12,fill:skin,...stroke}),shape('ellipse',{cx:139,cy:277,rx:16,ry:12,fill:skin,...stroke}));
      figure.append(path('M88 144 Q59 150 58 196 Q55 247 82 268 Q120 290 158 268 Q185 247 182 196 Q181 150 152 144Z',babyColor,stroke));
      figure.append(path('M62 198 Q73 180 87 187 L105 201 Q112 206 107 214 Q103 220 96 216 L82 207 Q78 221 70 225Z',skin,stroke),path(mirror('M62 198 Q73 180 87 187 L105 201 Q112 206 107 214 Q103 220 96 216 L82 207 Q78 221 70 225Z'),skin,stroke));
      figure.append(line('M83 242 Q120 261 157 242',mix(babyColor,'#7a5a3a',.3),2,{opacity:'.8'}));
      if(era!=='old')figure.append(path(roll.print<.5?'M120 222 L124 232 L135 232 L126 239 L130 250 L120 243 L110 250 L114 239 L105 232 L116 232Z':'M120 250 Q104 238 110 229 Q116 223 120 231 Q124 223 130 229 Q136 238 120 250Z','#fffaf0',{opacity:'.85'}));
    } else if(monk) {
      const robe=choose(['#d9822b','#c96d22','#b5652c','#8f5a2e'],roll.palette);
      figure.append(shape('ellipse',{cx:100,cy:300,rx:14,ry:6,fill:skin,...stroke}),shape('ellipse',{cx:140,cy:300,rx:14,ry:6,fill:skin,...stroke}));
      const body=shape('g',{transform:`translate(120 0) scale(${build} 1) translate(-120 0)`});
      body.append(path('M81 144 Q60 150 56 175 L48 296 Q120 306 192 296 L184 175 Q180 150 159 144 L143 137 L97 137Z',robe,stroke));
      body.append(path('M97 140 L170 236 L156 248 L86 152Z',mix(robe,'#5a2e10',.15),thin(mix(robe,'#3a1e08',.35))),line('M70 200 Q120 214 170 200',mix(robe,'#5a2e10',.25),2,{opacity:'.6'}));
      body.append(shape('circle',{cx:60,cy:222,r:9,fill:skin,...stroke}),shape('circle',{cx:180,cy:222,r:9,fill:skin,...stroke}));
      figure.append(body,path('M99 123 L99 144 Q120 160 141 144 L141 123Z',skin,stroke));
    } else {
      const body=shape('g',{transform:`translate(120 0) scale(${build} 1) translate(-120 0)`});
      const lowerInk=mix(kit.lowerColor,'#1d1a18',.3);
      const topInk=mix(kit.top,'#1d1a18',.3);
      const topLight=mix(kit.top,'#ffffff',.4);
      const legs=kit.lower==='shorts' || kit.lower==='skirt';
      if(legs)body.append(path(both('M87 250 L88 292 L105 292 L106 250Z'),skin,stroke));
      if(legs && kit.socks)body.append(path(both('M88 276 L88 292 L105 292 L105 276Z'),'#fbfbf8',thin('#c9c9c4')));
      const feet=()=>{
        if(kit.feet==='bare' || kit.feet==='sandals') {
          body.append(path(both('M86 289 Q76 294 74 300 Q74 304 82 304 L104 304 Q108 300 105 289Z'),skin,stroke));
          if(kit.feet==='sandals')body.append(line(both('M73 304 L107 304'),'#4a3a30',3),line(both('M84 295 L95 299 L104 293'),'#6b4a33',2));
        } else if(kit.feet==='boots') {
          body.append(path(both('M82 264 L81 290 Q72 293 71 299 Q70 304 80 304 L106 304 Q109 300 107 290 L106 264Z'),kit.feetColor,stroke));
        } else {
          body.append(path(both('M80 283 Q74 286 71 298 Q70 303 80 303 L105 303 Q110 300 107 290Z'),kit.feetColor,stroke));
          if(kit.feet==='sneakers')body.append(line(both('M72 299 L107 299'),choose(['#d9534f','#3f8fd2','#5a5a5a'],roll.accent),2));
        }
      };
      const garment=()=>{
        if(kit.lower==='trousers') {
          body.append(path('M83 218 L80 287 Q87 296 107 291 L120 245 L133 291 Q153 296 160 287 L157 218Z',kit.lowerColor,stroke),line(both('M95 232 L94 284'),lowerInk,1.4,{opacity:'.35'}));
        } else if(kit.lower==='shorts') {
          body.append(path('M83 216 L80 256 Q93 261 108 257 L120 236 L132 257 Q147 261 160 256 L157 216Z',kit.lowerColor,stroke));
        } else if(kit.lower==='skirt') {
          body.append(path('M84 214 L73 262 Q120 272 167 262 L156 214Z',kit.lowerColor,stroke),line('M100 222 L94 266 M120 224 L120 268 M140 222 L146 266',lowerInk,1.4,{opacity:'.4'}));
        } else {
          body.append(path('M84 214 L79 295 Q120 302 161 295 L156 214Z',kit.lowerColor,stroke));
          if(kit.lower==='sin')body.append(path('M80 280 Q120 287 160 280 L161 295 Q120 302 79 295Z',mix(kit.lowerColor,'#d9b25a',.45),thin(lowerInk)),line('M82 236 Q120 242 158 236 M81 258 Q120 264 159 258',mix(kit.lowerColor,'#f1e6d0',.45),3,{'stroke-dasharray':'7 5',opacity:'.7'}));
          else body.append(line('M82 238 Q120 244 158 238 M81 264 Q120 270 159 264 M102 216 L100 297 M138 216 L140 297','#f1e6d0',2.5,{'stroke-dasharray':'6 6',opacity:'.7'}),line('M120 216 L118 298',lowerInk,1.4,{opacity:'.3'}));
        }
      };
      if(kit.lower==='sin' || kit.lower==='sarong'){feet();garment();}else{garment();feet();}
      body.append(path('M81 144 Q62 150 56 171 L45 211 Q45 221 57 224 Q65 224 68 215 L80 185 L84 224 Q120 234 156 224 L160 185 L172 215 Q175 224 183 224 Q195 221 195 211 L184 171 Q178 150 159 144 L143 137 L97 137Z',kit.top,stroke));
      if(kit.sleeve==='short')body.append(path(both('M51 186 L45 211 Q45 221 57 224 Q65 224 68 215 L78 190Z'),skin,stroke));
      body.append(shape('circle',{cx:55,cy:219,r:9,fill:skin,...stroke}),shape('circle',{cx:185,cy:219,r:9,fill:skin,...stroke}));
      body.append(path('M99 123 L99 144 Q120 160 141 144 L141 123Z',skin,stroke));
      if(kit.neck==='tee')body.append(line('M101 143 Q120 156 139 143',topInk,2));
      else if(kit.neck==='collar' || kit.neck==='bow')body.append(path(both('M98 140 L120 156 L108 166 L93 146Z'),topLight,thin(topInk)),line('M120 157 L120 222',topInk,1.3,{opacity:'.5'}));
      else if(kit.neck==='polo')body.append(path(both('M100 141 L118 152 L110 158 L96 146Z'),topLight,thin(topInk)),line('M120 152 L120 172',topInk,1.3,{opacity:'.6'}));
      else if(kit.neck==='blouse')body.append(path('M100 141 Q108 156 120 154 Q132 156 140 141 Q132 150 120 150 Q108 150 100 141Z',topLight,thin(topInk)),line('M120 156 L120 220',topInk,1.2,{opacity:'.35','stroke-dasharray':'1 9'}));
      else if(kit.neck==='sailor')body.append(path('M97 140 L82 170 Q120 178 158 170 L143 140 L120 162Z','#fbfaf5',{stroke:'#2f3d63','stroke-width':2,'stroke-linejoin':'round'}),path(both('M112 165 L120 170 L112 177Z'),'#2f3d63'));
      else if(kit.neck==='coat')body.append(path('M104 141 L120 178 L136 141Z','#dfe9f3',thin('#9aa8b6')),line(both('M104 141 L114 198'),'#aab3bd',1.6),path(both('M83 216 L79 262 L113 262 L116 222Z'),kit.top,thin('#b9c0c8')));
      else if(kit.neck==='zip')body.append(path('M100 140 Q120 150 140 140 L140 147 Q120 157 100 147Z',topInk),line('M120 152 L120 224',topInk,2));
      if(kit.neck==='bow')body.append(path(both('M113 150 L120 154 L113 159Z'),'#2f3d63'));
      if(kit.tie)body.append(path('M117 148 L123 148 L125 154 L122 192 L120 196 L118 192 L115 154Z',kit.tie,thin(mix(kit.tie,'#000000',.35))));
      const extras={
        nametag:()=>path('M128 172 L146 172 L146 175 L128 175Z','#3b5aa0',{opacity:'.85'}),
        boards:()=>path(both('M66 152 L92 146 L93 152 L68 158Z'),'#3b3628'),
        pockets:()=>path(both('M92 168 L109 168 L109 184 L92 184Z M92 173 L109 173'),'none',thin(topInk)),
        badge:()=>shape('circle',{cx:100,cy:162,r:3,fill:'#d4a62a'}),
        camo:()=>path(both('M90 170 Q98 162 106 170 Q100 178 90 170Z M128 194 Q138 186 148 196 Q138 202 128 194Z M64 186 Q70 180 76 188 Q70 194 64 186Z M96 252 Q104 246 110 254 Q102 260 96 252Z'),'#3e4a2e',{opacity:'.6'}),
        patch:()=>path('M130 168 L146 168 L146 179 L130 179Z','#f4f1e8',thin(topInk)),
        reflect:()=>line('M58 197 L80 199 M84 196 L156 196 M160 199 L182 197','#eaeac8',4,{opacity:'.85'}),
        vest:()=>[path(both('M84 145 L103 141 L114 224 L84 224Z'),'#e8752a',thin('#9a4a1a')),path('M88 176 L104 176 L104 190 L88 190Z','#fffaf0')],
        apron:()=>[path('M98 168 L142 168 L152 264 L88 264Z',choose(['#f1ece2','#8a3b3b','#3d5f6f'],roll.print),thin(OUTLINE)),line('M98 168 L104 144 M142 168 L136 144',OUTLINE,1.6)],
        stetho:()=>[line('M106 146 Q98 176 114 186 M134 146 Q142 176 126 186 M114 186 Q120 196 126 186','#4a4f57',2),shape('circle',{cx:120,cy:196,r:4,fill:'#9aa3ad',stroke:'#4a4f57','stroke-width':1.5})],
        gold:()=>female?line('M104 143 Q120 162 136 143','#d4a62a',1.6):[line('M103 143 Q120 166 137 143','#d4a62a',2.4),shape('circle',{cx:120,cy:162,r:4,fill:'#e2b84a',stroke:'#9a7420','stroke-width':1.2})],
        maShoulder:()=>[path('M92 142 L106 139 L162 220 L148 226Z',ma,thin(mix(ma,'#000000',.35))),line('M99 141 L155 223','#f1e6d0',3,{'stroke-dasharray':'5 5',opacity:'.8'})],
        maWaist:()=>[path('M82 210 Q120 220 158 210 L159 223 Q120 233 81 223Z M144 224 L150 248 L139 246Z',ma,thin(mix(ma,'#000000',.35))),line('M82 216 Q120 226 158 216','#f1e6d0',3,{'stroke-dasharray':'5 5',opacity:'.8'})],
        scarf:()=>path('M98 138 Q120 150 142 138 L144 150 Q120 162 96 150Z',ma,thin(mix(ma,'#000000',.35))),
        print:()=>{const ink=light(kit.top)<.55?'#f5f1e6':'#2e3440';return [path('M108 186 Q108 174 120 174 Q132 174 132 186 Q132 198 120 198 Q108 198 108 186Z',ink,{opacity:'.85'}),line('M82 184 L158 184 M82 196 L158 196',ink,5,{opacity:'.8'}),path('M120 172 L124 182 L135 182 L126 189 L130 200 L120 193 L110 200 L114 189 L105 182 L116 182Z',ink,{opacity:'.85'}),path('M120 198 Q104 186 110 177 Q116 171 120 179 Q124 171 130 177 Q136 186 120 198Z',ink,{opacity:'.85'})][Math.floor(roll.print*4)%4];},
        mask:()=>null
      };
      kit.extras.forEach(name=>{const made=extras[name]();if(made)body.append(...[].concat(made));});
      figure.append(body);
    }
    const back=styles[hairstyle][0], front=styles[hairstyle][1];
    if(back)figure.append(path(back,hair));
    figure.append(shape('ellipse',{cx:76,cy:89,rx:9,ry:13,fill:skin,...stroke}),shape('ellipse',{cx:164,cy:89,rx:9,ry:13,fill:skin,...stroke}));
    const faces=['M77 72 Q77 30 120 30 Q163 30 163 72 L161 101 Q159 131 120 140 Q81 131 79 101Z','M76 74 Q76 30 120 30 Q164 30 164 74 Q166 108 150 126 Q136 139 120 139 Q104 139 90 126 Q74 108 76 74Z','M78 72 Q78 30 120 30 Q162 30 162 72 L162 106 Q160 126 142 134 L120 140 L98 134 Q80 126 78 106Z','M76 70 Q77 30 120 30 Q163 30 164 70 Q163 98 152 116 Q138 136 120 141 Q102 136 88 116 Q77 98 76 70Z'];
    figure.append(path(stage==='baby'?faces[1]:choose(faces,roll.face),skin,stroke));
    if(front)figure.append(path(front,hair,hairstyle==='crew'?{opacity:'.92'}:{}));
    if(monk)figure.append(line('M80 70 Q80 33 120 32 Q160 33 160 70','#8f7a6b',1.2,{opacity:'.35'}));
    const masked=kit.extras.includes('mask') && stage!=='baby' && !monk;
    const spread=Math.round((roll.spread*3-1)*10)/10;
    const eyeType=stage==='baby'?(roll.eyes<.5?0:3):Math.floor(roll.eyes*4)%4;
    const eyes=[99-spread,141+spread];
    if(!monk) {
      const weight=Math.round((1.6+roll.browWeight*1.5+(female?0:.5)+(grit>68?.6:0))*10)/10;
      const arch=(1+roll.brows*4)*(grit>68?.4:grit<32?1.3:1);
      const by=87, inner=by+(grit>68?2:0)+(mood==='sad' || mood==='tired'?-3:0), outer=by+(mood==='sad'?1.5:0)+(grit>68?-1:0);
      const browPath=`M${eyes[0]-10} ${outer} Q${eyes[0]-2} ${Math.round((Math.min(inner,outer)-arch)*10)/10} ${eyes[0]+6} ${inner}`;
      figure.append(line(both(browPath),stage==='baby'?mix(skin,browColor,.4):browColor,stage==='baby'?1.2:weight));
    }
    eyes.forEach(cx=>{
      const cy=96;
      if(eyeType===1)figure.append(path(`M${cx-8} ${cy} Q${cx} ${cy-6} ${cx+8} ${cy} Q${cx} ${cy+5} ${cx-8} ${cy}Z`,'#fbf6ee',thin(OUTLINE)),shape('circle',{cx,cy:cy-.5,r:3.3,fill:'#3a2a22'}),shape('circle',{cx:cx+1,cy:cy-1.5,r:1,fill:'#fff9ec'}));
      else if(eyeType===2)figure.append(line(`M${cx-7} ${cy-1} Q${cx} ${cy-4} ${cx+7} ${cy-1}`,'#362e29',2.6),shape('ellipse',{cx,cy:cy+1,rx:2.8,ry:3,fill:'#362e29'}));
      else if(eyeType===3)figure.append(shape('ellipse',{cx,cy,rx:4.2,ry:5.2,fill:'#362e29'}),shape('circle',{cx:cx+1.3,cy:cy-1.6,r:1.4,fill:'#fff9ec'}),shape('circle',{cx:cx-1.2,cy:cy+1.8,r:.7,fill:'#fff9ec'}));
      else figure.append(shape('ellipse',{cx,cy,rx:3.4,ry:4.4,fill:'#362e29'}),shape('circle',{cx:cx+1,cy:cy-1,r:1,fill:'#fff9ec'}));
      if(mood==='tired')figure.append(path(`M${cx-9} ${cy-7} L${cx+9} ${cy-7} L${cx+9} ${cy-1} Q${cx} ${cy+1} ${cx-9} ${cy-1}Z`,skin),line(`M${cx-6} ${cy+7} Q${cx} ${cy+10} ${cx+6} ${cy+7}`,shadow,1.4,{opacity:'.6'}));
    });
    const glassesChance=age<8?0:age<16?.03:.08+(age>=45?.25:0)+(['office','teacher','doctor','accountant','developer','lawyer','engineer','pharmacist'].includes(role)?.12:0);
    if(stage!=='baby' && roll.glasses<glassesChance) {
      const frame=age>=60 && roll.glasses<.1?'#9a7a3a':'#3a302a';
      const lens=roll.glasses*100%2<1?eyes.map(cx=>`M${cx-9.5} 96 Q${cx-9.5} 86.5 ${cx} 86.5 Q${cx+9.5} 86.5 ${cx+9.5} 96 Q${cx+9.5} 105.5 ${cx} 105.5 Q${cx-9.5} 105.5 ${cx-9.5} 96Z`).join(' '):eyes.map(cx=>`M${cx-10} 89 L${cx+10} 89 L${cx+10} 102 Q${cx+10} 104 ${cx+8} 104 L${cx-8} 104 Q${cx-10} 104 ${cx-10} 102Z`).join(' ');
      figure.append(path(lens,'#ffffff',{'fill-opacity':'.15',stroke:frame,'stroke-width':2,'stroke-linejoin':'round'}),line(`M${eyes[0]+9.5} 95 Q120 91 ${eyes[1]-9.5} 95`,frame,2));
    }
    if(!masked) {
      const blush=sick?0:.2+(mood==='bright'?.12:0)+(conds.includes('inlove')?.15:0)+(stage==='baby' || stage==='child'?.1:0);
      if(blush)figure.append(path(both('M83 109 Q83 106 89 106 Q95 106 95 109 Q95 112 89 112 Q83 112 83 109Z'),'#c97363',{opacity:String(Math.round(blush*100)/100)}));
      const noses=['M119 99 Q117 107 121 108','M116 106 Q120 110 124 106','M113 108 Q116 111 120 109 Q124 111 127 108','M120 96 L118 106 Q120 109 123 107'];
      figure.append(line(stage==='baby'?'M118 106 Q120 108 122 106':choose(noses,roll.nose),shadow,2));
      const width=stage==='baby'?7:9+Math.round(roll.mouth*40)/10, left=120-width, right=120+width;
      const lip=female && age>=18?'#a8524a':'#894e42';
      if(expression==='open')figure.append(path(`M${left} 116 Q120 130 ${right} 116 Q120 120 ${left} 116Z`,'#8c4038',thin(lip)),path(`M${left+2.5} 117 Q120 120 ${right-2.5} 117 L${right-4} 119.5 Q120 122.5 ${left+4} 119.5Z`,'#fffaf0'));
      else figure.append(line(expression==='smile'?`M${left} 117 Q120 126 ${right} 117`:expression==='small'?`M${left+2} 118 Q120 122 ${right-2} 118`:expression==='flat'?`M${left+2} 120 Q120 121.5 ${right-2} 120`:`M${left+1} 122 Q120 115 ${right-1} 122`,lip,2.5));
      if(!female && age>=20 && !monk && !['student','soldier'].includes(role)) {
        if(roll.beard<.18)figure.append(path('M108 112 Q114 109 120 111 Q126 109 132 112 Q126 115 120 113 Q114 115 108 112Z',browColor));
        else if(roll.beard<.28)figure.append(path('M86 108 Q92 132 120 139 Q148 132 154 108 Q150 124 136 130 Q120 134 104 130 Q90 124 86 108Z M108 112 Q120 109 132 112 L132 114 Q120 112 108 114Z',browColor,{opacity:'.2'}));
        else if(roll.beard<.34 && state.year>=2000)figure.append(path('M114 127 Q120 137 126 127 Q120 131 114 127Z',browColor));
      }
      if(roll.mole<.15 && stage!=='baby')figure.append(shape('circle',{cx:134,cy:113,r:1.3,fill:'#5a3a2c',opacity:'.6'}));
    }
    const wear=age+(roll.grey-.5)*8+(role==='farmer' || role==='construction'?4:0);
    const lines=[];
    if(wear>=30)lines.push('M106 66 Q120 62 134 66');
    if(wear>=40)lines.push('M84 94 L78 92 M156 94 L162 92','M102 72 Q120 68 138 72');
    if(wear>=50)lines.push('M106 106 Q103 114 106 120 M134 106 Q137 114 134 120','M84 98 L78 98 M156 98 L162 98');
    if(wear>=60)lines.push('M100 60 Q120 56 140 60','M92 103 Q96 106 100 104 M140 104 Q144 106 148 103');
    if(wear>=70)lines.push('M100 124 Q104 130 108 128 M132 128 Q136 130 140 124','M86 112 L94 114 M146 114 L154 112');
    if(wear>=80)lines.push('M110 132 Q120 136 130 132','M90 84 Q97 80 104 84 M136 84 Q143 80 150 84');
    if(lines.length && stage!=='baby')figure.append(line(lines.join(' '),shadow,age>=70?1.8:1.4,{opacity:String(Math.round(Math.min(0.9,0.35+age/150)*100)/100)}));
    if(masked) {
      const cloth=choose(['#5a6b7a','#7a5a4a','#3d4f6b','#8a8070'],roll.print);
      figure.append(path('M80 100 Q120 110 160 100 L158 118 Q150 138 120 143 Q90 138 82 118Z',cloth,stroke),line('M86 112 Q120 120 154 112 M90 124 Q120 132 150 124',mix(cloth,'#000000',.4),1.4,{opacity:'.4'}));
    }
    const hatInk=mix(kit.hatColor,'#1d1a18',.35);
    if(kit.hat==='straw')figure.append(shape('ellipse',{cx:120,cy:50,rx:64,ry:12,fill:'#e2c27e',stroke:'#9b7a3c','stroke-width':2}),path('M88 50 Q90 18 120 16 Q150 18 152 50Z','#d8b56c',{stroke:'#9b7a3c','stroke-width':2,'stroke-linejoin':'round'}),line('M89 44 Q120 50 151 44','#7a5a2c',3));
    else if(kit.hat==='wrap')figure.append(path('M76 72 Q72 26 120 24 Q168 26 164 72 Q150 56 120 56 Q90 56 76 72Z M160 52 L176 46 L172 62Z',ma,thin(mix(ma,'#000000',.35))),line('M80 60 Q120 44 160 60','#f1e6d0',3,{'stroke-dasharray':'5 5',opacity:'.8'}));
    else if(kit.hat==='hardhat')figure.append(path('M78 64 Q78 22 120 21 Q162 22 162 64Z',kit.hatColor,stroke),path('M70 62 Q120 54 170 62 L170 69 Q120 61 70 69Z',mix(kit.hatColor,'#1d1a18',.15),stroke),line('M120 23 L120 58',hatInk,2,{opacity:'.5'}));
    else if(kit.hat==='cap')figure.append(path('M80 64 Q80 28 120 27 Q160 28 160 64Z',kit.hatColor,stroke),path('M80 62 Q120 74 160 62 Q156 74 120 78 Q84 74 80 62Z',mix(kit.hatColor,'#1d1a18',.2),stroke));
    else if(kit.hat==='helmet')figure.append(path('M72 100 Q68 22 120 18 Q172 22 168 100 L158 102 Q160 64 150 58 L90 58 Q80 64 82 102Z',kit.hatColor,stroke),path('M88 58 Q120 50 152 58 L152 64 Q120 56 88 64Z','#9ab3c4',{opacity:'.9',stroke:hatInk,'stroke-width':1.2}));
    else if(kit.hat==='nursecap')figure.append(path('M100 40 L140 40 L134 26 L106 26Z','#fdfdfd',thin(OUTLINE)),line('M103 34 L137 34','#2f4a7a',2));
    if(age>=78 && stage!=='baby')figure.append(line('M190 222 L198 302','#6b4a33',5),line('M184 222 Q190 214 198 220','#6b4a33',5));
    if(stage==='baby')figure.append(line('M112 154 Q120 163 128 154','#c4915f',2));
    svg.append(figure);return svg;
  }
  function pet(kind) {
    const cat=kind==='cat', fur=cat?'#e0a25a':'#b9824f', dark=cat?'#b8743a':'#7a5233';
    const svg=shape('svg',{viewBox:'0 0 240 330',role:'img','aria-label':cat?'แมว':'หมา'});
    svg.append(
      path(cat?'M176 268 Q222 250 206 196':'M174 262 Q214 240 200 214','none',{stroke:dark,'stroke-width':12,'stroke-linecap':'round'}),
      shape('ellipse',{cx:128,cy:268,rx:56,ry:34,fill:fur,stroke:OUTLINE,'stroke-width':3}),
      shape('rect',{x:88,y:280,width:16,height:34,rx:7,fill:fur,stroke:OUTLINE,'stroke-width':3}),
      shape('rect',{x:146,y:280,width:16,height:34,rx:7,fill:fur,stroke:OUTLINE,'stroke-width':3}),
      cat?path('M66 186 L74 146 L100 176 Z M134 176 L156 146 L162 186 Z',fur,{stroke:OUTLINE,'stroke-width':3,'stroke-linejoin':'round'}):path('M64 190 Q48 196 56 234 Q72 232 80 200 Z M148 200 Q156 232 172 234 Q180 196 164 190 Z',dark,{stroke:OUTLINE,'stroke-width':3}),
      shape('circle',{cx:114,cy:212,r:48,fill:fur,stroke:OUTLINE,'stroke-width':3}),
      shape('circle',{cx:98,cy:206,r:5,fill:OUTLINE}),
      shape('circle',{cx:130,cy:206,r:5,fill:OUTLINE}),
      shape('ellipse',{cx:114,cy:224,rx:cat?5:8,ry:cat?4:6,fill:cat?'#c96a6a':OUTLINE})
    );
    if(cat)svg.append(path('M70 222 L94 226 M70 232 L94 230 M158 222 L134 226 M158 232 L134 230','none',{stroke:OUTLINE,'stroke-width':2}));
    return svg;
  }
  KI.avatar={create,pet};
})();
