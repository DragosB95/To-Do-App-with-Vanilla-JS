const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.getElementById("todo-list");
const modalbg = document.querySelector(".modal-bg");
const closeModalSpan = document.querySelector(".modal-close");
const updateTodo = document.querySelector(".update-todo");

closeModalSpan.addEventListener("click", closeModalBox);


function closeModalBox(){
  modalbg.classList.remove("active")
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
          <button class="complete-button" onclick="app.Check(${i})"><i class="fas fa-check"></i></button>
          <button class="trash-button" onclick="app.Delete(${i})"><i class="fas fa-trash-alt"></i></button>
          <button class="update-button" onclick="app.Edit(${i})" id="update-button"><i class="fas fa-pen"></i></button>
        </li>
      </div>
      `
      let newTodo = document.createElement("div");
      newTodo.innerHTML = data;
      todoList.appendChild(newTodo);

      }
      this.Count(this.todosArr.length);
      
      console.log(this.todosArr);
      
      return this.element.innerHTML = data;
    }else {
      return this.element.innerHTML = null
    }
  }

  this.Add = function(){
    let userInput = document.querySelector(".todo-input");
    let todo = userInput.value;
    if (todo){
      this.todosArr.push(todo.trim());
      userInput.value = ""
      this.ReadAll();
      this.saveToLocalStorage(todo)
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
        self.ReadAll();
        closeModalBox();
      }
    }
    
  }

  this.Delete = function(item){
    this.todosArr.splice(item, 1);
    this.ReadAll()
    this.Count(this.todosArr.length)
    this.deleteFromLocalStorage();
  }

  this.Check = function(item){
    console.log(this.todosArr[item])
  }

  this.Count = function(count){
    let counterParagraph = document.getElementById("counter");
    let name = "Tasks";
    if (count){
      if (count == 1){
        name = "Task";
      }
      counterParagraph.innerHTML = count + " " + name
    }else {
      counterParagraph.innerHTML = "No"+ " " + name;
    }
  }

  this.saveToLocalStorage = function(){
    localStorage.setItem("todos", JSON.stringify(this.todosArr))
  }

  this.getFromLocalStorage = function(){
    let stuff = localStorage.getItem("todos");
    console.log(stuff)
  }

  this.deleteFromLocalStorage = function(){
    localStorage.setItem("todos", JSON.stringify(this.todosArr));
  }
}

app.ReadAll();
app.Count()
window.addEventListener("DOMContentLoaded", app.getFromLocalStorage);

