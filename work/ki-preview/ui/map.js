globalThis.KI = globalThis.KI || {};
(function () {
  function create(data, state) {
    const shape=data.isanMap;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox',`0 0 ${shape.width} ${shape.height}`);
    svg.setAttribute('class','isan-map');
    svg.setAttribute('role','img');
    const current=state.loc.kind==='isan'?KI.tables.provinceName(data,state.loc.province,state.year):null;
    svg.setAttribute('aria-label',current?`แผนที่ภาคอีสาน จังหวัดที่อยู่ ${current}`:'แผนที่ภาคอีสาน ขณะนี้อยู่นอกภูมิภาค');
    for(const [id,path] of Object.entries(shape.paths)) {
      const province=document.createElementNS('http://www.w3.org/2000/svg','path');
      province.setAttribute('d',path);
      province.setAttribute('data-province',id);
      province.setAttribute('class','map-province'+(current && KI.tables.provinceName(data,id,state.year)===current?' is-current':''));
      const title=document.createElementNS('http://www.w3.org/2000/svg','title');
      title.textContent=KI.tables.provinceName(data,id,state.year);
      province.append(title);svg.append(province);
    }
    return svg;
  }
  KI.map={create};
})();
