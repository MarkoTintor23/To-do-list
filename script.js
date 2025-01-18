class toDoApp {
  constructor() {
    this.taskList = [];
    this.inputField = document.querySelector("#taskInput");
    this.addButton = document.querySelector("#addTaskBtn");
    this.taskListElement = document.querySelector("#taskList"); // ispravljeno

    this.addButton.addEventListener("click", () => {
      const taskName = this.inputField.value.trim();
      if (taskName) {
        this.addTask(taskName);
        this.inputField.value = "";
      }
    });

    this.taskListElement.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("delete-btn")) {
        const taskId = target.dataset.id;
        this.removeTask(taskId);
      } else if (target.classList.contains("complete-btn")) {
        const taskId = target.dataset.id;
        this.toggleComplete(taskId);
      }
    });
  }

  addTask(taskName) {
    const task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false,
    };

    this.taskList.push(task);

    this.renderTask(task);
  }

  removeTask(taskId) {
    this.taskList = this.taskList.filter((task) => task.id !== taskId);

    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    if (taskElement) {
      taskElement.remove();
    }
  }

  toggleComplete(taskId) {
    this.taskList = this.taskList.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });

    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    if (taskElement) {
      taskElement.classList.toggle("completed");
    }
  }

  renderTask(task) {
    const taskElement = document.createElement("li");
    taskElement.dataset.id = task.id;
    taskElement.classList.add("task");

    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.dataset.id = task.id;

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.classList.add("complete-btn");
    completeButton.dataset.id = task.id;

    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(completeButton);

    this.taskListElement.appendChild(taskElement);
  }
}

const app = new toDoApp();
