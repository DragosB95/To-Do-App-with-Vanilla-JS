const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.getElementById("todo-list");
const modalbg = document.querySelector(".modal-bg");
const closeModal = document.querySelector(".modal-close");
const updateTodo = document.querySelector(".update-todo")

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckOrUpdate);

closeModal.addEventListener("click", function(){
    modalbg.classList.remove("active");
})


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

    const updateButton = document.createElement("button");
    updateButton.innerHTML = `<i class="fas fa-pen"></i>`
    updateButton.classList.add("update-button")
    todoDiv.appendChild(updateButton);

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
    if (item.classList[0] === "update-button"){
            modalbg.classList.add("active");
        let updateTodo = document.getElementById("modal-update-btn");
        updateTodo.addEventListener("click", updateItem)
        function updateItem(){
            modalbg.classList.remove("active");
        }
    }
}