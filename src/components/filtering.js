import { createComparison, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        return option;
      })
    );
  });

  // @todo: #4.3 — настроить компаратор
  const compare = createComparison(defaultRules);

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const field = action.dataset.field;
      const parent = action.parentElement;
      const input = parent.querySelector("input");

      if (input) {
        input.value = "";
        state[field] = "";
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    // Фильтрация данных
    return data.filter((row) => {
      // Сначала применяем стандартный компаратор
      if (!compare(row, state)) {
        return false;
      }

      // Дополнительная проверка диапазона Total
      if (state.totalFrom || state.totalTo) {
        const total = parseFloat(row.total);

        // Проверка минимума
        if (state.totalFrom && total < parseFloat(state.totalFrom)) {
          return false;
        }

        // Проверка максимума
        if (state.totalTo && total > parseFloat(state.totalTo)) {
          return false;
        }
      }
      return true;
    });
  };
}
