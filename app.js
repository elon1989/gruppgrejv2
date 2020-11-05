const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const form = document.querySelector('.search-container');
const input = document.querySelector('.input');
const todoList = document.querySelector('.todo-container');
const addTodo = document.querySelector('.add-todo-btn');
const hiddenDiv = document.querySelector('.hidden-container');
const hiddenBtn  = document.querySelector('.hidden-btn');
const todoArray = [];

let name = document.querySelector('.name');    
let information = document.querySelector('.information');    
let time = document.querySelector('.time'); 


/* Dates */
let d = new Date();

document.querySelector('.month').innerHTML = months[d.getMonth()];
document.querySelector('.year').innerHTML = d.getFullYear();
document.querySelector('.date').innerHTML = d.getDate();
document.querySelector('.day').innerHTML = days[d.getDay()];

/* Search function */
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    for(let i=0; i < todoArray.length; i++){
        if(input.value == todoArray[i].name){
            alert(`The name of the todo is: ${todoArray[i].name}, the information inside the todo is: ${todoArray[i].information} and the time you should to it: ${todoArray[i].time}`)
        }
    }
})

/* create a new todo item */
hiddenBtn.addEventListener('click', function(event){
    /* Remove normal behaviour */
    event.preventDefault();
    /* Remove the hidden box */
    hiddenDiv.style.display = "none";
    /* check if any of the values is empty then send a error message */
    if(name.value == '' || information.value == '' || time.value == ''){
        alert('You need to fill out all the forms!');
    } else {
            /* If all the forms are full print the HTML with the values from the Object */
        todoList.innerHTML += `
        <div class="todo-item">
            <div class="line"></div>
            <div class="nameInfo">
                <h3 class="todo-title">${name.value}</h3>
                <p class="todo-info">${information.value}</p>
            </div>
            <div class="rating">
                <div class="time">${time.value}</div>
                <div class="stars">***</div>
                <div class="purple"></div>
            </div>
        </div>
        `;
        /* Start another function */
        addEvent();
        
        /* Give values to the todos */
        todos = {
            name: name.value,
            information: information.value,
            time: time.value
        }
        /* Push the new todo item into an Array */
        todoArray.push(todos);
    }
    /* Update the array inside the local storage */
    localStorage.setItem('todos', JSON.stringify(todoArray))
})

/* Show the hidden div */
addTodo.addEventListener('click', function(){
    hiddenDiv.style.display = "flex";
})


/* onload */

document.addEventListener('DOMContentLoaded', function(){
    /*-------------- LOCAL STORAGES ---------------*/
       if(localStorage.getItem('todos')){
           todos = JSON.parse(localStorage.getItem('todos'))
       } else {
           todos = [];
       }
     
       let code = '';
       
       /* Go through all of the Objects inside the localstorage and then print them */
       for(let i=0; i<todos.length; i++){
            code += `
            <div class="todo-item">
                <div class="line"></div>
                <div class="nameInfo">
                    <h3 class="todo-title">${todos[i].name}</h3>
                    <p class="todo-info">${todos[i].information}</p>
                </div>
                <div class="rating">
                    <div class="time">${todos[i].time}</div>
                    <div class="stars">***</div>
                    <div class="purple"></div>
                </div>
            </div>`
            /* Push the todos inside the Array */
            todoArray.push(todos[i]);
       }
       
       todoList.innerHTML = code;
       /* start the next function */
       addEvent();
})

/* Function to give the todos functions */
function addEvent(){
    const close = document.querySelectorAll('.purple')

    /* A loop to go through all the created divs */
    for(let i=0; i< close.length; i++){
        /* Give all the purple buttons a function */
        close[i].addEventListener('click', function(e){
            /* if clicked remove grandparent element (the whole todo) */
            todoList.removeChild(e.target.parentElement.parentElement);
            /* get data from localstorage */
            if(localStorage.getItem('todos')){
                todos = JSON.parse(localStorage.getItem('todos'))
            } else {
                todos = [];
            }
            /* remove the todo from the array */
            todoArray.splice([i], 1);
            /* Update the localstorage */
            localStorage.setItem('todos', JSON.stringify(todoArray))
        })
    }
}

