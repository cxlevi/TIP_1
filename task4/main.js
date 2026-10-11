import { demoTasks, variantTasks, variantNumber } from "./data.js";
import { findTaskById, setTaskCompleted, removeTask } from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import { renderTaskList, renderSummary, renderEmptyState } from "./task-view.js";

const elements = {
  list: document.querySelector("#task-list"),
  filters: document.querySelector("#task-filters"),
  summary: document.querySelector("#task-summary"),
  empty: document.querySelector("#empty-message"),
  message: document.querySelector("#operation-message"),
  datasetLabel: document.querySelector("#dataset-label"),
};

const isVariant = new URLSearchParams(window.location.search).get("dataset") === "variant";
const initialTasks = isVariant ? variantTasks : demoTasks;
let currentTasks = initialTasks.map((task) => ({ ...task }));
let currentFilter = "all";

elements.datasetLabel.textContent = isVariant
  ? `Индивидуальный вариант: ${variantNumber ?? "не указан"}`
  : "Общий контрольный набор";

function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);

  elements.filters.querySelectorAll("button").forEach(btn => {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });

  renderTaskList(elements.list, visibleTasks);
  renderSummary(elements.summary, currentTasks, visibleTasks.length);
  renderEmptyState(elements.empty, currentTasks.length, visibleTasks.length);
}

function handleTaskListClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const taskCard = button.closest(".task-card");
  if (!taskCard) return;

  const id = Number(taskCard.dataset.taskId);
  if (!Number.isInteger(id) || id <= 0) {
    elements.message.textContent = `Некорректный id задачи: ${taskCard.dataset.taskId}`;
    return;
  }

  const action = button.dataset.action;
  let result;

  if (action === "toggle") {
    const task = findTaskById(currentTasks, id);
    if (!task) return;
    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else if (action === "delete") {
    result = removeTask(currentTasks, id);
  } else {
    return;
  }

  if (result.ok) {
    currentTasks = result.tasks;
    elements.message.textContent = "";
    renderApp();
  } else {
    elements.message.textContent = result.error;
  }
}

function handleFilterClick(event) {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  const filter = button.dataset.filter;
  if (!["all", "pending", "completed"].includes(filter)) return;

  currentFilter = filter;
  elements.message.textContent = "";
  renderApp();
}

elements.list.addEventListener("click", handleTaskListClick);
elements.filters.addEventListener("click", handleFilterClick);

try {
  renderApp();
} catch (error) {
  elements.message.textContent = `Ошибка запуска: ${error.message}`;
  console.error(error);
}