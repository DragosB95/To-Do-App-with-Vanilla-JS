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

  this.getFromLocalStorage = function() {
    let arrLocalStorageJSON = localStorage.getItem("todos");
    if (arrLocalStorageJSON) {
      let arrLocalStorage = JSON.parse(arrLocalStorageJSON);
      return arrLocalStorage;
    }
    return [];
  }
  this.todosArr = this.getFromLocalStorage();


  this.ReadAll = function(){
    var data ="";

    if (this.todosArr.length > 0){
      for (let i=0; i < this.todosArr.length; i++){
        if (this.todosArr[i].checked == true){
          data += `
          <div class="todo">
            <li class="todo-item completed-todo">
              <p>${this.todosArr[i].name}</p>
              <div class="button-section">
                <button class="complete-button" onclick="app.Check(${i})"><i class="fas fa-check"></i></button>
                <button class="trash-button" onclick="app.Delete(${i})"><i class="fas fa-trash-alt"></i></button>
                <button class="update-button" onclick="app.Edit(${i})" id="update-button"><i class="fas fa-pen"></i></button>
              </div>
            </li>
          </div>
          `
        }else {
          data +=
      `
      <div class="todo">
        <li class="todo-item">
          <p>${this.todosArr[i].name}</p>
          <div class="button-section">
            <button class="complete-button" onclick="app.Check(${i})"><i class="fas fa-check"></i></button>
            <button class="trash-button" onclick="app.Delete(${i})"><i class="fas fa-trash-alt"></i></button>
            <button class="update-button" onclick="app.Edit(${i})" id="update-button"><i class="fas fa-pen"></i></button>
          </div>
        </li>
      </div>
      `
        }
      let newTodo = document.createElement("div");
      newTodo.innerHTML = data;
      todoList.appendChild(newTodo);

      }
      this.Count(this.todosArr.length);
      
      
      return this.element.innerHTML = data;
    } else {
      return this.element.innerHTML = null
    }
  }

  this.Add = function(){
    let userInput = document.querySelector(".todo-input");
    let todo = userInput.value;
    var todoObject = {
      name: todo,
      checked: false
    }
    if (todo){
      this.todosArr.push(todoObject);
      userInput.value = ""
      this.ReadAll();
      this.saveToLocalStorage(this.todosArr);
      
    }
  }

  this.Edit = function(item){
    let modalInput = document.querySelector(".userInput");
    modalInput.value = this.todosArr[item].name;
    //Display the modal
    modalbg.classList.add("active");
    self = this;

    document.getElementById("modal-update-btn").onclick = function(){
      var updatedTaskObj = {
        name :modalInput.value,
        checked: false};
      if (updatedTaskObj){
        self.todosArr.splice(item, 1, updatedTaskObj);
        self.saveToLocalStorage()
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

  this.Check = function(itemIndex){
    let todoObj = this.todosArr[itemIndex];
    if (todoObj.checked === false){
      todoObj.checked = true
    }else {
      todoObj.checked = false
    }
    this.saveToLocalStorage()
    this.ReadAll()
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



  this.deleteFromLocalStorage = function(){
    localStorage.setItem("todos", JSON.stringify(this.todosArr));
  }
}

window.addEventListener("DOMContentLoaded", app.getFromLocalStorage);
app.Count();
app.ReadAll();

