import { loadTasks, saveTasks } from "./storage.js";
import { addTask, deleteTask, toggleTask, editTaskText, filterTasks, getCounts } from "./tasks.js";
import { renderTaskList, renderCounts, setActiveFilterBtn } from "./dom.js";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = [...document.querySelectorAll(".filterBtn")];
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

let tasks = loadTasks();
let currentFilter = "all";

const render = () => {
  const visibleTasks = filterTasks(tasks, currentFilter);
  renderTaskList(visibleTasks, taskList, { onToggle, onEdit, onDelete });
  renderCounts(completedCount, pendingCount, getCounts(tasks));
  saveTasks(tasks);
};

const onToggle = (id) => {
  tasks = toggleTask(tasks, id);
  render();
};

const onDelete = (id) => {
  tasks = deleteTask(tasks, id);
  render();
};

const onEdit = (id) => {
  const task = tasks.find((t) => t.id === id);
  const newText = prompt("Edit task:", task.text);

  if (newText?.trim()) {
    tasks = editTaskText(tasks, id, newText.trim());
    render();
  }
};

const handleAddTask = () => {
  const text = taskInput.value.trim();

  if (!text) {
    alert("Please write something first!");
    return;
  }

  tasks = addTask(tasks, text);
  taskInput.value = "";
  render();
};

addBtn.addEventListener("click", handleAddTask);

taskInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter") handleAddTask();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveFilterBtn(filterBtns, btn);
    ({ filter: currentFilter } = btn.dataset);
    render();
  });
});

render();
