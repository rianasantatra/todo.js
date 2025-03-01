document.addEventListener("DOMContentLoaded", () => {
  // get all elements
  const todoTitle = document.getElementById("todoTitle");
  const todoDesc = document.getElementById("todoDesc");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");

  // initializing data from localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  let editIndex = null;

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
                        <button onclick="confirmDelete(${index})" type="button" class="btn btn-delete"><i class="bi bi-trash"></i> Delete</button>
                    </div>
                </div> `
      )
      .join("");
  }
  renderTodos();

  // add or update todo items
  function handleTodo() {
    const title = todoTitle.value.trim();
    const description = todoDesc.value.trim();
    if (title) {
      if (editIndex !== null) {
        todos[editIndex] = { title, description };
        editIndex = null;
      } else {
        todos.push({ title, description });
      }
      todoTitle.value = "";
      todoDesc.value = "";
    }
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
    location.reload();
  }

  // delete confirmation with SweetAlert2
  window.confirmDelete = (todoIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(todoIndex);
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    });
  };

  // delete todo items
  function deleteTodo(todoIndex) {
    todos.splice(todoIndex, 1);
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // edit todo items
  window.editTodo = (todoIndex) => {
    const todoToEdit = todos[todoIndex];
    todoTitle.value = todoToEdit.title || "";
    todoDesc.value = todoToEdit.description || "";
    editIndex = todoIndex;
    addBtn.textContent = "Update";
  };

  addBtn.addEventListener("click", handleTodo);
});
