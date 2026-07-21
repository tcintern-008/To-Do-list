export const createTask = (text) => ({
  id: Date.now(),
  text,
  completed: false,
});

export const addTask = (tasks, text) => [...tasks, createTask(text)];

export const deleteTask = (tasks, id) => tasks.filter((task) => task.id !== id);

export const toggleTask = (tasks, id) =>
  tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));

export const editTaskText = (tasks, id, newText) =>
  tasks.map((task) => (task.id === id ? { ...task, text: newText } : task));

export const filterTasks = (tasks, filter) => {
  const filters = {
    completed: (task) => task.completed,
    pending: (task) => !task.completed,
    all: () => true,
  };
  return tasks.filter(filters[filter] ?? filters.all);
};

export const getCounts = (tasks) => {
  const completed = tasks.filter((task) => task.completed).length;
  return { completed, pending: tasks.length - completed };
};
