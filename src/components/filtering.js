// Работа с фильтрацией данных в таблице
export function initFiltering(elements) {
  /**
   * Заполнение выпадающих списков (select) значениями,
   * полученными с сервера — например, списком продавцов.
   * indexes — объект вида { searchBySeller: {id: 'Имя', ...} }
   */
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        })
      );
    });
  };

  /**
   * Формирование параметров фильтрации для запроса к серверу.
   * Здесь больше нет локальной фильтрации — мы только собираем query.
   */
  const applyFiltering = (query, state, action) => {
    /**
     * Обработка очистки поля фильтра.
     * Кнопка "clear" сбрасывает value у input/select.
     */
    if (action && action.name === "clear") {
      const parent = action.parentElement;
      const control = parent.querySelector("input, select");

      if (control) {
        control.value = "";
      }
    }

    /**
     * Формирование объекта filter[...] для запроса.
     * Находим все input/select внутри фильтра,
     * собираем их значения и превращаем их в query-параметры.
     *
     * Пример:
     *   filter[seller]=Иван Петров
     */
    const filter = {};

    Object.keys(elements).forEach((key) => {
      const el = elements[key];

      if (el && ["INPUT", "SELECT"].includes(el.tagName) && el.value) {
        filter[`filter[${el.name}]`] = el.value;
      }
    });

    // Если фильтры есть — добавляем их в query. Если нет — возвращаем исходный query.
    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
