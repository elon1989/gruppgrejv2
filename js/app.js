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

/* for later */
form.addEventListener('submit', function(event){
    event.preventDefault();
    if(input.value == asd){}
})

/* create a new todo item */
hiddenBtn.addEventListener('click', function(event){
    event.preventDefault();
    hiddenDiv.style.display = "none";

    if(name.value == '' || information.value == '' || time.value == ''){
        console.log('hej')    
    } else {
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
    
    addEvent();

    todos = {
        name: name.value,
        information: information.value,
        time: time.value
    }
    
    todoArray.push(todos);
    
    }
    localStorage.setItem('todos', JSON.stringify(todoArray))
})

/* Show the hidden div */
addTodo.addEventListener('click', function(){
    hiddenDiv.style.display = "flex";
})


/* onload */

document.addEventListener('DOMContentLoaded', function(){
    /*-------------- LOCAL STORAGES ---------------*/
       /* Empty array */
       
       if(localStorage.getItem('todos')){
           todos = JSON.parse(localStorage.getItem('todos'))
       } else {
           todos = [];
       }
     
       let code = '';
       
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
            todoArray.push(todos[i]);
       }
       
       console.log(todoArray)
       todoList.innerHTML = code;
       addEvent();
})

function addEvent(){
    const close = document.querySelectorAll('.purple')

    for(let i=0; i< close.length; i++){
        close[i].addEventListener('click', function(e){
            todoList.removeChild(e.target.parentElement.parentElement);
       
            if(localStorage.getItem('todos')){
                todos = JSON.parse(localStorage.getItem('todos'))
            } else {
                todos = [];
            }
            console.log(todos)
            todoArray.splice([i], 1);
            
            localStorage.setItem('todos', JSON.stringify(todoArray))
        })
    }
}

