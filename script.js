let todoArr = [];

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.getElementById("todo-list");
const modalbg = document.querySelector(".modal-bg");
const closeModal = document.querySelector(".modal-close");
const updateTodo = document.querySelector(".update-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckOrUpdate);

closeModal.addEventListener("click", function () {
  modalbg.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", readAllTodos);

function readAllTodos() {
  todoArr.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.id = todo.id;

    if(todo.checked == true) {
        todoDiv.classList.add("completed-todo")
    }

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.name;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    const updateButton = document.createElement("button");
    updateButton.innerHTML = `<i class="fas fa-pen"></i>`;
    updateButton.classList.add("update-button");
    todoDiv.appendChild(updateButton);

    todoList.appendChild(todoDiv);


  });
}

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = Math.random().toString(36).substr(2, 9);

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  let newToDoText = newTodo.innerText;
  let newToDoList = [];
  newToDoList.push(newToDoText);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  const updateButton = document.createElement("button");
  updateButton.innerHTML = `<i class="fas fa-pen"></i>`;
  updateButton.classList.add("update-button");
  todoDiv.appendChild(updateButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";

  let todoItem = {
    id: todoDiv.id,
    name: newTodo.innerText,
    checked: false
  }

  todoArr.push(todoItem)

  console.log(todoArr)
}


function deleteCheckOrUpdate(event) {
  var item = event.target;
  if (item.classList[0] === "trash-button") {
    let itemParent = item.parentElement;
    itemParent.classList.add("fadeOut");
    itemParent.addEventListener("transitionend", () => {
      itemParent.remove();
    });
  }
  if (item.classList[0] === "complete-button") {
    let itemParent = item.parentElement;
    itemParent.classList.toggle("completed-todo");
  }
  /* Update the selected todo */
  if (item.classList[0] === "update-button") {
    // Open modal for edit
    modalbg.classList.add("active");
    let updateTodo = document.getElementById("modal-update-btn");

    updateTodo.addEventListener("click", updateItem);

    function updateItem(id) {
      
      modalbg.classList.remove("active");
    }
  }
}

var app = new function(){
  this.element = document.querySelector(".todo-list");
  this.todosArr = [];


  this.ReadAll = function(){
    var data ="";

    if (this.todosArr.length > 0){
      for (let i=0; i < this.todosArr.length; i++){
      data +=
      `
      <div class="todo">
        <li class="todo-item">${this.todosArr[i]}
          <button onclick="app.Check(${i})"><i class="fas fa-check"></i></button>
          <button onclick="app.Delete(${i})"><i class="fas fa-trash-alt"></i></button>
          <button onclick="app.Edit(`+ i +`)" id="modal-update-btn"><i class="fas fa-pen"></i></button>
        </li>
      </div>
      `
      todoList.appendChild(data);
      }
      this.Count(this.todosArr.length);
      return this.element.innerHTML = data;
      
    }
  }

  this.Add = function(){
    let userInput = document.querySelector(".todo-input");
    let todo = userInput.value;
    if (todo){
      this.todosArr.push(todo.trim());
      userInput.value = ""
      this.ReadAll();
    }
  }

  this.Edit = function(item){
    let modalInput = document.querySelector(".userInput");
    modalInput.value = this.todosArr[item];
    //Display the modal
    modalbg.classList.add("active");
    self = this

    document.getElementById("modal-update-btn").onclick = function(){
      var task = modalInput.value;
      if (task){
        self.todosArr.splice(item, 1, task.trim())
        self.ReadAll()
      }
    }

    
  }

  this.Delete = function(item){
    this.todosArr.splice(item, 1);
    this.ReadAll()
  }

  this.Check = function(item){

  }

  this.Count = function(count){
    
  }
}

app.ReadAll()
