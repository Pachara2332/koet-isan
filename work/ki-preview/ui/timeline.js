globalThis.KI = globalThis.KI || {};
(function () {
  function group(log) {
    const groups = [];
    for (const entry of log || []) {
      let year = groups.find(item => item.year === entry.year);
      if (!year) { year = {year:entry.year,entries:[]}; groups.push(year); }
      year.entries.push(entry);
    }
    return groups.sort((a,b)=>a.year-b.year);
  }
  KI.timeline = {group};
})();
