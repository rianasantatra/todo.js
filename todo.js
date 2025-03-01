document.addEventListener("DOMContentLoaded", () => {
  // Get all elements
  const todoTitle = document.getElementById("todoTitle");
  const todoDesc = document.getElementById("todoDesc");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");
  const tabButtons = document.querySelectorAll(".tab-btn");

  // Initializing data from localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  let editIndex = null;
  let currentTab = "pending"; // Default tab

  // Rendering todos in HTML based on current tab
  function renderTodos() {
    const filteredTodos = todos.filter((todo) => todo.status === currentTab);
    todoList.innerHTML = filteredTodos
      .map(
        (todo, index) => ` 
          <div class="card todo-item">
            <div class="todo-content">
              <h3>${todo.title}</h3>
              <p>${todo.description}</p>
              <span class="status status-${todo.status}">${
          todo.status === "pending" ? "Pending" : "Completed"
        }</span>
            </div>
            <!-- actions -->
            <div class="todo-actions">
              ${
                todo.status === "pending"
                  ? `<button onclick="completeTodo(${todos.indexOf(
                      todo
                    )})" type="button" class="btn btn-complete"><i class="bi bi-check-lg"></i> Complete</button>
                     <button onclick="editTodo(${todos.indexOf(
                       todo
                     )})" type="button" class="btn btn-edit"><i class="bi bi-pencil"></i> Edit</button>`
                  : ""
              }
              <button onclick="confirmDelete(${todos.indexOf(
                todo
              )})" type="button" class="btn btn-delete"><i class="bi bi-trash"></i> Delete</button>
            </div>
          </div> `
      )
      .join("");
  }
  renderTodos();

  // Add or update todo items
  function handleTodo() {
    const title = todoTitle.value.trim();
    const description = todoDesc.value.trim();
    if (title) {
      if (editIndex !== null) {
        todos[editIndex] = {
          title,
          description,
          status: todos[editIndex].status,
        };
        editIndex = null;
        addBtn.textContent = "Create Task";
      } else {
        todos.push({ title, description, status: "pending" });
      }
      todoTitle.value = "";
      todoDesc.value = "";
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }
  }

  // Mark todo as completed
  window.completeTodo = (todoIndex) => {
    todos[todoIndex].status = "completed";
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  };

  // Delete confirmation with SweetAlert2
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

  // Delete todo items
  function deleteTodo(todoIndex) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  // Edit todo items
  window.editTodo = (todoIndex) => {
    const todoToEdit = todos[todoIndex];
    todoTitle.value = todoToEdit.title || "";
    todoDesc.value = todoToEdit.description || "";
    editIndex = todoIndex;
    addBtn.textContent = "Update";
  };

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentTab = button.getAttribute("data-tab");
      renderTodos();
    });
  });

  addBtn.addEventListener("click", handleTodo);
});
