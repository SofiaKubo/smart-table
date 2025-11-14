import "./fonts/ys-display/fonts.css";
import "./style.css";

import { data as sourceData } from "./data/dataset_1.js";

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
// @todo: подключение

// Исходные данные используемые в render()
const { data, ...indexes } = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
  const state = processFormData(new FormData(sampleTable.container));

  // Преобразуем строковые значения в числа
  const rowsPerPage = parseInt(state.rowsPerPage); // количество строк на странице
  const page = parseInt(state.page ?? 1); // номер страницы (по умолчанию 1)

  return {
    ...state, // все остальные поля остаются как есть
    rowsPerPage, // перезаписываем числовым значением
    page, // перезаписываем числовым значением
  };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
  let state = collectState(); // состояние полей из таблицы
  let result = [...data]; // копируем для последующего изменения

  // @todo: использование
  result = applyFiltering(result, state, action); // применяем фильтрацию
  result = applySorting(result, state, action); // применяем сортировку
  result = applyPagination(result, state, action); // применяем пагинацию

  // Отображаем результат в таблице

  sampleTable.render(result);
}

const sampleTable = initTable(
  {
    tableTemplate: "table",
    rowTemplate: "row",
    before: ["header", "filter"],
    after: ["pagination"],
  },
  render
);

// @todo: инициализация
const applyPagination = initPagination(
  sampleTable.pagination.elements, // передаём сюда элементы пагинации, найденные в шаблоне
  (el, page, isCurrent) => {
    // и колбэк, чтобы заполнять кнопки страниц данными
    const input = el.querySelector("input");
    const label = el.querySelector("span");
    input.value = page;
    input.checked = isCurrent;
    label.textContent = page;
    return el;
  }
);

// Инициализируем сортировку
const applySorting = initSorting([
  // Нам нужно передать сюда массив элементов, которые вызывают сортировку, чтобы изменять их визуальное представление
  sampleTable.header.elements.sortByDate,
  sampleTable.header.elements.sortByTotal,
]);

// Инициализируем фильтрацию
const applyFiltering = initFiltering(sampleTable.filter.elements, {
  // передаём элементы фильтра
  searchBySeller: indexes.sellers, // для элемента с именем searchBySeller устанавливаем массив продавцов
});

const appRoot = document.querySelector("#app");
appRoot.appendChild(sampleTable.container);

render();
