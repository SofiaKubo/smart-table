import { cloneTemplate } from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
  const { tableTemplate, rowTemplate, before, after } = settings;
  const root = cloneTemplate(tableTemplate);

  // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы

  // Добавляем шаблоны ДО таблицы (в обратном порядке)
  before.reverse().forEach((subName) => {
    root[subName] = cloneTemplate(subName);
    root.container.prepend(root[subName].container);
  });

  // Добавляем шаблоны ПОСЛЕ таблицы
  after.forEach((subName) => {
    root[subName] = cloneTemplate(subName);
    root.container.appendChild(root[subName].container);
  });

  // @todo: #1.3 —  обработать события и вызвать onAction()

  // Обработчик изменения полей формы (input, select)
  root.container.addEventListener("change", () => {
    onAction();
  });

  // Обработчик сброса формы (кнопка reset)
  root.container.addEventListener("reset", () => {
    setTimeout(onAction);
  });

  // Обработчик отправки формы (кнопка submit)
  root.container.addEventListener("submit", (e) => {
    e.preventDefault();
    onAction(e.submitter);
  });

  const render = (data) => {
    // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate

    const nextRows = data.map((item) => {
      const row = cloneTemplate(rowTemplate);
      Object.keys(item).forEach((key) => {
        if (row.elements[key]) {
          const el = row.elements[key];
          if (
            el instanceof HTMLInputElement ||
            el instanceof HTMLSelectElement
          ) {
            el.value = item[key] ?? "";
          } else {
            el.textContent = item[key] ?? "";
          }
        }
      });
      return row.container;
    });

    root.elements.rows.replaceChildren(...nextRows);
  };

  return { ...root, render };
}
