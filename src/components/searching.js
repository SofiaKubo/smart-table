// Инициализация серверного поиска
export function initSearching(searchField) {
  return (query, state) => {
    // Если в поле поиска есть значение — добавляем параметр search в query
    if (state[searchField]) {
      return Object.assign({}, query, {
        search: state[searchField],
      });
    }

    // Если поле поиска пустое — возвращаем query без изменений
    return query;
  };
}
