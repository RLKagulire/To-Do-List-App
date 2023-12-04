const button = document.getElementById("add-button");
const textInput = document.getElementById("input-box");
const orderedList = document.getElementById("listed-tasks");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

button.addEventListener("click", function () {
  const inputValue = textInput.value;
  if (inputValue === "") {
    return;
  } else {
    addTaskToList(inputValue);
    textInput.value = "";
  }
});

function addTaskToList(task) {
  const listedTasks = document.createElement("li");
  orderedList.appendChild(listedTasks);
  listedTasks.innerHTML = `<span class="textInput">${task}</span>
      <span>
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash"></i>
          <i class="fas fa-check-circle"></i>
      </span>`;

  // Add click event to delete icon
  listedTasks.querySelector(".fa-trash").addEventListener("click", function () {
    orderedList.removeChild(listedTasks);
    removeTaskFromLocalStorage(task);
  });

  // Add click event to edit button
  listedTasks.querySelector(".fa-edit").addEventListener("click", function () {
    const editedText = prompt("Edit this task:", task);
    if (editedText !== null && editedText !== "") {
      const textSpan = listedTasks.querySelector(".textInput");
      textSpan.innerText = editedText;
      updateTaskInLocalStorage(task, editedText);
    }
  });

  // Add an event for the checkbox
  const checkboxIcon = listedTasks.querySelector(".fa-check-circle");
  checkboxIcon.addEventListener("click", function () {
    toggleTaskCheck(listedTasks);
  });
}

function toggleTaskCheck(taskItem) {
  taskItem.classList.toggle("checked");
  const isChecked = taskItem.classList.contains("checked");
  const textSpan = taskItem.querySelector(".textInput");

  if (isChecked) {
    textSpan.style.textDecoration = "line-through";
  } else {
    textSpan.style.textDecoration = "none";
  }
}

function updateTaskInLocalStorage(oldTask, newTask) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.indexOf(oldTask);
  if (index > -1) {
    tasks[index] = newTask;
    saveTasksToLocalStorage(tasks);
  }
}

function removeTaskFromLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
  }
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    addTaskToList(task);
  });
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("listedTasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("listedTasks", JSON.stringify(tasks));
}
