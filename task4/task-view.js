import { getTaskStats } from "./task-service.js";

export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = `task-card ${task.completed ? "is-completed" : ""}`;
  li.dataset.taskId = task.id;

  const h3 = document.createElement("h3");
  h3.className = "task-title";
  h3.textContent = task.title;
  
  const meta = document.createElement("div");
  meta.className = "task-meta";
  
  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";
  
  const priorityLabels = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий"
  };
  
  const priority = document.createElement("span");
  priority.className = "task-priority";
  priority.textContent = `Приоритет: ${priorityLabels[task.priority] || task.priority}`;
  
  meta.appendChild(status);
  meta.appendChild(priority);
  
  const actions = document.createElement("div");
  actions.className = "task-actions";
  
  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.setAttribute("aria-pressed", task.completed);
  
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = task.completed ? "Вернуть в работу" : "Выполнена";
  
  toggleBtn.appendChild(toggleLabel);
  
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  
  const deleteLabel = document.createElement("span");
  deleteLabel.className = "action-label";
  deleteLabel.textContent = "Удалить";
  
  deleteBtn.appendChild(deleteLabel);
  
  actions.appendChild(toggleBtn);
  actions.appendChild(deleteBtn);
  
  li.appendChild(h3);
  li.appendChild(meta);
  li.appendChild(actions);
  
  return li;
}

export function renderTaskList(listElement, tasks) {
  listElement.innerHTML = "";
  
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    listElement.appendChild(taskElement);
  });
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
  
  const totalEl = summaryElement.querySelector('[data-stat="total"]');
  const completedEl = summaryElement.querySelector('[data-stat="completed"]');
  const pendingEl = summaryElement.querySelector('[data-stat="pending"]');
  const progressEl = summaryElement.querySelector('[data-stat="progress"]');
  const visibleEl = summaryElement.querySelector('[data-stat="visible"]');
  
  if (totalEl) totalEl.textContent = stats.total;
  if (completedEl) completedEl.textContent = stats.completed;
  if (pendingEl) pendingEl.textContent = stats.pending;
  if (progressEl) progressEl.textContent = `${stats.progress.toFixed(1)}%`;
  if (visibleEl) visibleEl.textContent = visibleCount;
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (total === 0) {
    messageElement.hidden = false;
    messageElement.textContent = "Список задач пуст.";
  } else if (visibleCount === 0) {
    messageElement.hidden = false;
    messageElement.textContent = "Нет задач по выбранному фильтру.";
  } else {
    messageElement.hidden = true;
    messageElement.textContent = "";
  }
}