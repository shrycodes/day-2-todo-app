const input = document.querySelector('.inputElement');
const addBtn = document.querySelector('.button');
const list = document.querySelector('.taskList');
const error = document.querySelector('.errorMsg');
const allBtn = document.querySelector('.allBtn');
const doneBtn = document.querySelector('.doneBtn');
const pendingBtn = document.querySelector('.pendingBtn');

function createTask(taskText){

    const li = document.createElement("li")
    
    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("deleteBtn")

    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    span.addEventListener("click", function(){
        li.classList.toggle("done");
        saveTasks();
    })

    span.addEventListener("dblclick", function(){

        const editInput = document.createElement("input")
        editInput.type = "text";
        editInput.value = span.textContent;

        li.replaceChild(editInput, span);
        editInput.focus();

        editInput.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            span.textContent = editInput.value.trim()
            li.replaceChild(span, editInput);
            saveTasks();
        }
    })
    })

    

    deleteBtn.addEventListener('click', function(e){
        e.stopPropagation();

        li.classList.add("fade-out");

        li.addEventListener("transitionend", function(){
            li.remove();
            saveTasks();
        }, {once: true});
    })

}

addBtn.addEventListener("click", function(){

    const taskText = input.value;
   
    if(taskText.trim() === ""){
        input.classList.add("errorBorder")
        error.textContent = "Please enter a task!"
        return;
    }

    input.classList.remove("errorBorder")
    error.textContent = "";

    createTask(taskText)
    saveTasks();

    input.value = "";
})

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addBtn.click();
    }
})

function saveTasks(){

    const tasks = [];

    const allTasks = document.querySelectorAll(".taskList li")

    allTasks.forEach(function (task){

        const text = task.querySelector("span").textContent;
        const completed = task.classList.contains("done");

        tasks.push({
            text: text,
            done: completed
        });
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(task) {

        if (typeof task === "string") {
            createTask(task);
        } else {
            createTask(task.text);

            if (task.done) {
                list.lastElementChild.classList.add("done");
            }
        }

    });
}

loadTasks();

allBtn.addEventListener("click", function(){

    const tasks = list.querySelectorAll("li");

    tasks.forEach(function(task){
        task.style.display = "flex";
    })
})

doneBtn.addEventListener("click", function(){
    
    const tasks = list.querySelectorAll("li")

    tasks.forEach(function(task){

        if(task.classList.contains("done")){
            task.style.display = "flex"
        } else{
            task.style.display = "none";
        }
    })
})

pendingBtn.addEventListener("click", function(){

    const tasks = list.querySelectorAll("li")
    
    tasks.forEach(function(task){

        if(!task.classList.contains("done")){
            task.style.display = "flex"
        } else {
            task.style.display = "none";
        }
    })
})