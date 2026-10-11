function isPositiveSafeInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}

export function createTask(id, title, priority = "medium") {
  if (!isPositiveSafeInteger(id)) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }
  
  if (typeof title !== "string" || title.trim().length === 0 || title.trim().length > 100) {
    return { ok: false, error: "Название должно быть строкой длиной от 1 до 100 символов" };
  }
  
  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    return { ok: false, error: "Недопустимый приоритет" };
  }
  
  return {
    ok: true,
    task: {
      id,
      title: title.trim(),
      completed: false,
      priority
    }
  };
}

export function findTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter(task => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map(task => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  const existingTask = findTaskById(tasks, id);
  if (existingTask) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }
  
  const result = createTask(id, title, priority);
  if (!result.ok) return result;
  
  return {
    ok: true,
    tasks: [...tasks, result.task]
  };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!Array.isArray(tasks)) {
    return { ok: false, error: "tasks должен быть массивом" };
  }
  
  if (!isPositiveSafeInteger(id)) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }
  
  if (typeof completed !== "boolean") {
    return { ok: false, error: "completed должен быть true или false" };
  }
  
  const taskExists = tasks.some(task => task.id === id);
  if (!taskExists) {
    return { ok: false, error: "Задача с таким id не найдена" };
  }
  
  const newTasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed };
    }
    return task;
  });
  
  return { ok: true, tasks: newTasks };
}

export function renameTask(tasks, id, title) {
  if (!isPositiveSafeInteger(id)) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }
  
  if (typeof title !== "string" || title.trim().length === 0 || title.trim().length > 100) {
    return { ok: false, error: "Название должно быть строкой длиной от 1 до 100 символов" };
  }
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return { ok: false, error: "Задача с таким id не найдена" };
  }
  
  const newTasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, title: title.trim() };
    }
    return task;
  });
  
  return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
  if (!isPositiveSafeInteger(id)) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }
  
  const taskExists = tasks.some(task => task.id === id);
  if (!taskExists) {
    return { ok: false, error: "Задача с таким id не найдена" };
  }
  
  const newTasks = tasks.filter(task => task.id !== id);
  return { ok: true, tasks: newTasks };
}