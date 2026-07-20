// grabbing elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filterBtn");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

// array of task objects, loaded from local storage (or empty array)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// saves tasks array into local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// adds a new task to the array
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please write something first!");
    return;
  }

  const newTask = {
    id: Date.now(), // using timestamp as a simple unique id
    text: text,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  taskInput.value = "";
  renderTasks();
}

// deletes a task by id
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderTasks();
}

// toggles completed status
function toggleComplete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }
  saveTasks();
  renderTasks();
}

// edits a task's text
function editTask(id) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });

  const newText = prompt("Edit task:", task.text);

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// updates the completed/pending counters
function updateCounts() {
  let completed = 0;
  let pending = 0;

  for (const task of tasks) {
    if (task.completed) {
      completed++;
    } else {
      pending++;
    }
  }

  completedCount.textContent = "Completed: " + completed;
  pendingCount.textContent = "Pending: " + pending;
}

// renders tasks on the page based on current filter
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span class="taskText">${task.text}</span>
      <div class="task-buttons">
        <button class="editBtn">✎</button>
        <button class="deleteBtn">🗑</button>
      </div>
    `;

    // checkbox toggles complete
    li.querySelector("input").addEventListener("change", function () {
      toggleComplete(task.id);
    });

    li.querySelector(".editBtn").addEventListener("click", function () {
      editTask(task.id);
    });

    li.querySelector(".deleteBtn").addEventListener("click", function () {
      deleteTask(task.id);
    });

    taskList.appendChild(li);
  });

  updateCounts();
}

// event listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// initial render on page load
renderTasks();
