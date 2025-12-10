import "./fonts/ys-display/fonts.css";
import "./style.css";

import { data as sourceData } from "./data/dataset_1.js";

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";
// @todo: подключение

// Исходные данные используемые в render()
const api = initData(sourceData);

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
async function render(action) {
  let state = collectState(); // состояние полей из таблицы
  let query = {}; // объект с параметрами запроса, здесь будут формироваться параметры запроса к серверу

  // Формируем параметры запроса на основе состояния таблицы

  // result = applySearching(result, state, action); // применяем поиск
  query = applyFiltering(query, state, action); // применяем фильтрацию
  // result = applySorting(result, state, action); // применяем сортировку
  query = applyPagination(query, state, action); // обновляем query с учётом пагинации

  const { total, items } = await api.getRecords(query); // запрашиваем данные с собранными параметрами
  updatePagination(total, query); // перерисовываем пагинатор

  // Отображаем результат в таблице
  sampleTable.render(items);
}

const sampleTable = initTable(
  {
    tableTemplate: "table",
    rowTemplate: "row",
    before: ["search", "header", "filter"],
    after: ["pagination"],
  },
  render
);

// @todo: инициализация
const { applyPagination, updatePagination } = initPagination(
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
const { applyFiltering, updateIndexes } = initFiltering(
  sampleTable.filter.elements
);

// Инициализируем поиск
const applySearching = initSearching("search"); // передаём ИМЯ ПОЛЯ 'search'

const appRoot = document.querySelector("#app");
appRoot.appendChild(sampleTable.container);

// Инициализация приложения
async function init() {
  const indexes = await api.getIndexes();

  updateIndexes(sampleTable.filter.elements, {
    searchBySeller: indexes.sellers,
  });
}

init().then(render); // запускаем первый рендер после инициализации
