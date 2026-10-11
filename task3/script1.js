function isPositiveSafeInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}

function setTaskCompleted(tasks, id, completed) {
  if (!Array.isArray(tasks)) {
    return { ok: false, error: 'tasks должен быть массивом' };
  }

  if (!isPositiveSafeInteger(id)) {
    return { ok: false, error: 'id должен быть положительным целым числом' };
  }

  if (typeof completed !== 'boolean') {
    return { ok: false, error: 'completed должен быть true или false' };
  }

  const taskExists = tasks.some(task => task.id === id);
  if (!taskExists) {
    return { ok: false, error: 'Задача с таким id не найдена' };
  }

  const newTasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: completed };
    }
    return task;
  });

  return { ok: true, tasks: newTasks };
}

const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];


console.log('Исходный массив (до):', JSON.stringify(demoTasks));

const result1 = setTaskCompleted(demoTasks, 4, true);
console.log('Результат:', JSON.stringify(result1));
console.log('Исходный массив (после):', JSON.stringify(demoTasks));
console.log('Исходная задача id=4 осталась false:', demoTasks.find(t => t.id === 4).completed === false);

const result2 = setTaskCompleted(demoTasks, 777, true);
console.log('Результат:', JSON.stringify(result2));
console.log('Исходный массив не изменился:', demoTasks.length === 4);