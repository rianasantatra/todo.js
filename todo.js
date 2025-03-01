document.addEventListener("DOMContentLoaded", () => {
  // get all elements
  const todoTitle = document.getElementById("todoTitle");
  const todoDesc = document.getElementById("todoDesc");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");

  // initializing data from localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // rendering todos in html
  function renderTodos() {
    todoList.innerHTML = todos
      .map(
        (todo, index) => ` <div class="card todo-item">
                    <div class="todo-content">
                        <h3>${todo.title}</h3>
                        <p>${todo.description}</p>
                        <span class="status status-pending">Pending</span>
                    </div>
                    <!-- actions -->
                    <div class="todo-actions">
                        <button onclick="editTodo(${index})" type="button" class="btn btn-edit"><i class="bi bi-pencil"></i> Edit</button>
                        <button onclick="deleteTodo(${index})" type="button" class="btn btn-delete"><i class="bi bi-trash"></i> Delete</button>
                    </div>
                </div> `
      )
      .join("");
  }
  renderTodos();

  // add items to localStorage
  function addTodo() {
    const title = todoTitle.value.trim();
    const description = todoDesc.value.trim();
    if (title) {
      todos.push({
        title,
        description,
      });
      todoTitle.value = "";
      todoDesc.value = "";
    }
    renderTodos();
    // save items to localStorge
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // delete todo items
  window.deleteTodo = (todoIndex) => {
    todos.splice(todoIndex, 1);
    renderTodos();
    // Add this line to update localStorage after deletion
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // edit todo items
  window.editTodo = (todoIndex) => {
    const todoToEdit = todos[todoIndex];
    todoTitle.value = todoToEdit.title || "";
    todoDesc.value = todoToEdit.description || "";
    todos.splice(todoIndex, 1);
    renderTodos();
    // Add this line to update localStorage after editing
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  addBtn.addEventListener("click", addTodo);
});
