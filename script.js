const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.getElementById("todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckOrUpdate)


function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`
    completedButton.classList.add("complete-button")
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`
    trashButton.classList.add("trash-button")
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}
function deleteCheckOrUpdate(event){
    var item = event.target;
    if (item.classList[0] === "trash-button"){
        let itemParent = item.parentElement;
        itemParent.classList.add("fadeOut");
        itemParent.addEventListener("transitionend", () => {
            itemParent.remove();
        })
        
    }
    if (item.classList[0] === "complete-button"){
        let itemParent = item.parentElement;
        itemParent.classList.toggle("completed-todo")
    }
}