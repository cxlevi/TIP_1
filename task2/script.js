function getPendingTasks(tasks) {
  return tasks.filter(task => task.completed === false);
}

const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

const pendingDemo = getPendingTasks(demoTasks);
console.log("Результат:", pendingDemo.map(t => t.id)); 

const pendingEmpty = getPendingTasks([]);
console.log("Результат:", pendingEmpty); 