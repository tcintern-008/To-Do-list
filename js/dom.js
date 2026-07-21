export const renderTaskList = (tasks, listEl, { onToggle, onEdit, onDelete }) => {
  listEl.innerHTML = "";

  tasks.forEach(({ id, text, completed }) => {
    const li = document.createElement("li");
    li.className = completed ? "completed" : "";

    li.innerHTML = `
      <input type="checkbox" ${completed ? "checked" : ""}>
      <span class="taskText">${text}</span>
      <div class="task-buttons">
        <button class="editBtn">✎</button>
        <button class="deleteBtn">🗑</button>
      </div>
    `;

    li.querySelector("input").addEventListener("change", () => onToggle(id));
    li.querySelector(".editBtn").addEventListener("click", () => onEdit(id));
    li.querySelector(".deleteBtn").addEventListener("click", () => onDelete(id));

    listEl.appendChild(li);
  });
};

export const renderCounts = (completedEl, pendingEl, { completed, pending }) => {
  completedEl.textContent = `Completed: ${completed}`;
  pendingEl.textContent = `Pending: ${pending}`;
};

export const setActiveFilterBtn = (filterBtns, clickedBtn) => {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  clickedBtn.classList.add("active");
};
