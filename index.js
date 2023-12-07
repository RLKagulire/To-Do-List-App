document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      addTask();
  }
});

function addTask() {
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() !== '') {
      const task = taskInput.value.trim();
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${task}</span>
          <span class="icons" onclick="editTask(this)"><i class="fas fa-edit"></i></span>
          <span class="icons" onclick="completeTask(this)"><i class="fas fa-check"></i></span>
          <span class="icons" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></span>
      `;
      taskList.appendChild(li);
      saveTaskToLocalStorage(taskList);
      taskInput.value = '';
  }
}

function editTask(element) {
  const li = element.parentElement;
  const span = li.querySelector('span');
  
    const editedTask = prompt('Edit Task:', span.textContent);

  if (editedTask !== null) {
      span.textContent = editedTask;
      saveTaskToLocalStorage(document.getElementById('taskList'));
  }
}

function completeTask(element) {
  const li = element.parentElement;
  li.classList.toggle('completed');
  saveTaskToLocalStorage(document.getElementById('taskList'));
}

function deleteTask(element) {
  const li = element.parentElement;
  li.remove();
  saveTaskToLocalStorage(document.getElementById('taskList'));
}

function saveTaskToLocalStorage(taskList) {
  const tasks = [];
  taskList.childNodes.forEach((li) => {
      const taskText = li.querySelector('span').textContent;
      tasks.push({ text: taskText, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => {
      const li = document.createElement('li');
      if (task.completed) {
          li.classList.add('completed');
      }
      li.innerHTML = `
          <span>${task.text}</span>
          <span class="icons" onclick="editTask(this)"><i class="fas fa-edit"></i></span>
          <span class="icons" onclick="completeTask(this)"><i class="fas fa-check"></i></span>
          <span class="icons" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></span>
      `;
      taskList.appendChild(li);
  });
}
