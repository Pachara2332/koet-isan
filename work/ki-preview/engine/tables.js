globalThis.KI = globalThis.KI || {};
(function () {
  function at(series, year) {
    if (!Array.isArray(series) || series.length === 0) throw new Error('tables: empty series');
    let best = series[0];
    for (const row of series) {
      const d = Math.abs(row.year - year), bd = Math.abs(best.year - year);
      if (d < bd || (d === bd && row.year < best.year)) best = row;
    }
    return best.value;
  }

  function wageDay(data, year) {
    return at(data.stats.wageDay, year);
  }

  function wageScaled(data, rows, year) {
    const first = rows.reduce((a, b) => a.year < b.year ? a : b);
    if (year < first.year) return Math.round(first.value * wageDay(data, year) / wageDay(data, first.year));
    return at(rows, year);
  }

  function paddyPrice(data, year) {
    return wageScaled(data, data.stats.paddy, year);
  }

  function salary(data, year) {
    const rows = data.stats.salary.filter((r) => r.year <= year);
    if (!rows.length) return wageScaled(data, data.stats.salary, year);
    return rows.reduce((a, b) => a.year > b.year ? a : b).value;
  }

  function livingPlace(loc) {
    if (loc.kind === 'bangkok' || loc.kind === 'abroad') return loc.kind;
    return loc.setting === 'rural' ? 'rural' : 'town';
  }

  function livingCost(data, year, place) {
    const l = data.stats.living, cpi = (y) => at(data.stats.cpi, y);
    const rows = [...l.perCapita].sort((a, b) => a.year - b.year).map((r) => ({ year: r.year, real: r.value / cpi(r.year) }));
    const after = rows.findIndex((r) => r.year >= year);
    let real = after < 0 ? rows[rows.length - 1].real : rows[after].real;
    if (after > 0) {
      const a = rows[after - 1], b = rows[after];
      real = a.real + (b.real - a.real) * (year - a.year) / (b.year - a.year);
    }
    return Math.round(real * cpi(year) * l.places[place].value * l.share.value);
  }

  function childWeight(data, age) {
    const band = data.stats.living.child.find((c) => age >= c.from && age <= c.to);
    return band ? band.value : 0;
  }

  function gameCafePrice(state) {
    return state.loc.kind === 'isan' && state.loc.setting === 'rural' ? 10 : 20;
  }

  function annualize(probability, years) {
    if (!Number.isFinite(probability) || probability < 0 || probability > 1 || !Number.isFinite(years) || years <= 0) throw new Error('tables: invalid mortality interval');
    return 1 - Math.pow(1 - probability, 1 / years);
  }

  function mortality(data, age, year, sex) {
    const rows = data.stats && Array.isArray(data.stats.mortality) ? data.stats.mortality : [];
    const specific = rows.filter(row => row.sex === sex && row.sex);
    const generic = rows.filter(row => !row.sex);
    const selected = specific.length ? specific : generic;
    const infant = data.stats && Array.isArray(data.stats.infantMortality) ? data.stats.infantMortality : [];
    if (age === 0 && infant.length && (!selected.length || year < Math.min(...selected.map(row => row.year)))) return at(infant, year) / 1000;
    if (!selected.length) return 0;
    const bands = at(selected.map(row => ({year:row.year,value:row.bands})),year);
    const band = bands.find(item => age >= item.from && age <= item.to);
    return band ? band.q : 0;
  }

  function provinceName(data, provinceId, year) {
    const p = data.places && data.places.provinces && data.places.provinces[provinceId];
    if (!p) return provinceId;
    if (p.parent && typeof p.founded === 'number' && year < p.founded) return provinceName(data, p.parent, year);
    return p.th;
  }

  KI.tables = { at, wageDay, paddyPrice, salary, livingPlace, livingCost, childWeight, gameCafePrice, annualize, mortality, provinceName };
})();
