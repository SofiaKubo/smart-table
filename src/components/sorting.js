import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {
  return (query, state, action) => {
    let field = null;
    let order = null;

    if (action && action.name === "sort") {
      // Запоминаем следующий режим сортировки для нажатой колонки
      action.dataset.value = sortMap[action.dataset.value];
      field = action.dataset.field;
      order = action.dataset.value;

      // Сбрасываем сортировку у остальных колонок
      columns.forEach((column) => {
        if (column.dataset.field !== action.dataset.field) {
          column.dataset.value = "none";
        }
      });
    } else {
      // Определяем текущую активную сортировку (если есть)
      columns.forEach((column) => {
        if (column.dataset.value !== "none") {
          field = column.dataset.field;
          order = column.dataset.value;
        }
      });
    }

    // Формируем параметр сортировки для сервера в виде field:order
    const sort = field && order !== "none" ? `${field}:${order}` : null;

    // Если сортировка задана — добавляем её в query, иначе возвращаем query без изменений
    return sort ? Object.assign({}, query, { sort }) : query;
  };
}
