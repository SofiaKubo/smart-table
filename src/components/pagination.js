import { getPages } from "../lib/utils.js";

/**
 * Инициализация пагинации.
 * Возвращает две функции:
 *  - applyPagination — формирует параметры limit/page для запроса
 *  - updatePagination — обновляет отображение кнопок и диапазона строк
 */
export const initPagination = (
  { pages, fromRow, toRow, totalRows },
  createPage
) => {
  /**
   * Сохраняем шаблон кнопки страницы и очищаем контейнер.
   * Первый элемент используется как шаблон, затем удаляется.
   */
  const pageTemplate = pages.firstElementChild.cloneNode(true);
  pages.firstElementChild.remove();

  // Хранит количество страниц (нужно для кнопки "last" и проверок)
  let pageCount;

  /**
   * Формирует query-параметры пагинации: limit и page.
   * Здесь мы не изменяем исходный объект query, а возвращаем новый.
   */
  const applyPagination = (query, state, action) => {
    const limit = state.rowsPerPage;
    let page = state.page;

    // Обработка действий пользователя: prev/next/first/last
    if (action) {
      switch (action.name) {
        case "prev":
          page = Math.max(1, page - 1);
          break;
        case "next":
          page = Math.min(pageCount, page + 1);
          break;
        case "first":
          page = 1;
          break;
        case "last":
          page = pageCount;
          break;
      }
    }

    return Object.assign({}, query, {
      limit,
      page,
    });
  };

  /**
   * Отрисовывает пагинатор после получения данных с сервера.
   * Здесь:
   *  - создаются кнопки страниц
   *  - обновляется информация о диапазоне строк
   *  - устанавливается общее количество строк
   */
  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.ceil(total / limit);

    // Получаем список страниц, которые нужно отобразить (например, 5 рядом)
    const visiblePages = getPages(page, pageCount, 5);

    // Перерисовываем кнопки страниц на основе шаблона
    pages.replaceChildren(
      ...visiblePages.map((pageNumber) => {
        const el = pageTemplate.cloneNode(true);
        return createPage(el, pageNumber, pageNumber === page);
      })
    );

    // Обновляем статус пагинации: первая строка, последняя, всего строк
    fromRow.textContent = (page - 1) * limit + 1;
    toRow.textContent = Math.min(page * limit, total);
    totalRows.textContent = total;
  };

  return {
    updatePagination,
    applyPagination,
  };
};
