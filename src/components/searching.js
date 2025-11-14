import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  const compare = createComparison(
    ["skipEmptyTargetValues"], // стандартные правила
    [
      rules.searchMultipleFields(
        // пользовательское правило
        searchField, // имя поля search
        ["date", "customer", "seller"], // поля, по которым идёт поиск
        false // без учета регистра
      ),
    ]
  );

  return (data, state, action) => {
    // @todo: #5.2 — применить компаратор
    return data.filter((row) => compare(row, state));
  };
}
