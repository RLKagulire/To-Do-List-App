const button = document.getElementById("add-button");
const textInput = document.getElementById("input-box");
const orderedList = document.getElementById("listed-tasks");
// Load tasks from localStorage on page load
const tasks = JSON.parse(localStorage.getItem("listedTasks")) || [];
tasks.forEach((task) => {
  const listedTasks = document.createElement("li");
  orderedList.appendChild(listedTasks);
  listedTasks.innerHTML = `
        <span class="textInput">${task}</span>
        <span>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash"></i>
            <i class="fas fa-check-circle"></i>
        </span>
    `;
  //Add click event to delete icon
  listedTasks.querySelector(".fa-trash").addEventListener("click", function () {
    orderedList.removeChild(listedTasks);
    removeTaskFromLocalStorage(task);
  });
  //Add click event to edit button
  listedTasks.querySelector(".fa-edit").addEventListener("click", function () {
    const editedText = prompt("Edit this task:", task);
    if (editedText !== null && editedText !== "") {
      const textSpan = listedTasks.querySelector(".textInput");
      textSpan.innerText = editedText;
      const tasks = JSON.parse(localStorage.getItem("listedTasks")) || [];
      const index = tasks.indexOf(inputValue);
      if (index > -1) {
        tasks[index] = newTask;
        localStorage.setItem("listedTasks", JSON.stringify(tasks));
      }
    }
  });
  //Add an event for the checkbox
  listedTasks.querySelector(".fa-check-circle").addEventListener("click", function (e) {
      /*  if (e.target.checked)  */
      const currentTaskValue = listedTasks.dataset.value;
      console.log(currentTaskValue);
      removeTaskFromLocalStorage(currentTaskValue);
      orderedList.removeChild(listedTasks);
    });
});
button.addEventListener("click", function () {
  const inputValue = textInput.value;
  if (inputValue === "") {
    return; // Prevent adding empty tasks,if empty just return
  } else {
    const listedTasks = document.createElement("li");
    orderedList.appendChild(listedTasks);
    textInput.value = ""; // Clear the input box after adding the task
    listedTasks.innerHTML = `<span class="textInput">${inputValue}</span>
          <span>
              <i class="fas fa-edit"></i>
              <i class="fas fa-trash"></i>
              <i class="fas fa-check-circle"></i>
          </span>
      `;
    listedTasks
      .querySelector(".fa-trash")
      .addEventListener("click", function () {
        orderedList.removeChild(listedTasks);
        removeTaskFromLocalStorage(inputValue);
      });
    listedTasks
      .querySelector(".fa-edit")
      .addEventListener("click", function () {
        const editedText = prompt("Edit this task:", inputValue);
        if (editedText !== null && editedText !== "") {
          const textSpan = listedTasks.querySelector(".textInput");
          textSpan.innerText = editedText;
          const tasks = JSON.parse(localStorage.getItem("listedTasks")) || [];
          const index = tasks.indexOf(inputValue);
          if (index > -1) {
            tasks[index] = editedText;
            localStorage.setItem("listedTasks", JSON.stringify(tasks));
          }
        }
      });
  }
  const tasks = JSON.parse(localStorage.getItem("listedTasks")) || [];
  tasks.push(inputValue);
  localStorage.setItem("listedTasks", JSON.stringify(tasks));
});
function removeTaskFromLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("listedTasks")) || [];
  console.log(task);
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
    localStorage.setItem("listedTasks", JSON.stringify(tasks));
  }
}
