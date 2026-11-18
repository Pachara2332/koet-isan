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

  function paddyPrice(data, year) {
    const rows = data.stats.paddy;
    const first = rows.reduce((a, b) => a.year < b.year ? a : b);
    if (year < first.year) return Math.round(first.value * wageDay(data, year) / wageDay(data, first.year));
    return at(rows, year);
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

  KI.tables = { at, wageDay, paddyPrice, gameCafePrice, annualize, mortality, provinceName };
})();
