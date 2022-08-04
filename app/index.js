const todoItemTemplate = document.querySelector('[data-todo-item-tamplate]');
const todoContainer = document.querySelector('[data-todo-container]');
const inputAdd = document.querySelector('[data-input-add]');
const buttonAdd = document.querySelector('[data-button-add]');
const buttonDelAll = document.querySelector('[todo__button-del-all]');

const writeLocalStorage = () => {localStorage.setItem('todosList', JSON.stringify(todos))};



let todos = [];

if (localStorage.getItem('todosList')){
	todos = JSON.parse(localStorage.getItem('todosList'));
	appendTodos();
}

const  todayDate = (
	year = new Date().getFullYear(),
	month = new Date().getMonth() + 1,
	day = new Date().getDate(),
    hour = new Date().getHours(),
    min = new Date().getMinutes(),

) => { const dateToDo = new Date(year, month, day, hour, min);
	return `${dateToDo.getDate()}.${dateToDo.getMonth()}.${dateToDo.getFullYear()} -|- ${dateToDo.getHours()}:${dateToDo.getMinutes()}` 
 };



buttonAdd.addEventListener('click', () => {
    const text = inputAdd.value.trim();

    if (text !== '' ) {
        const newTodo = {
            id: todos.length + 1,
            text,
            date: todayDate(),
            checked: false
        }
        todos.push(newTodo);
        inputAdd.value = '';
		  writeLocalStorage();
    };

	 

    inputAdd.focus();
    render();
});


function createTodoItem(id, text, date, checked) {
    const todoItem = document.importNode(todoItemTemplate.content, true);
    const todoText = todoItem.querySelector('[data-todo-title]');
    todoText.textContent = text;
    const todoDate = todoItem.querySelector('[data-todo-date]');
    todoDate.textContent = date;

    const buttonRemove = todoItem.querySelector('[data-button-del]');

    buttonRemove.addEventListener('click', () => {
        todos = todos.filter(todo => todo.id !== id);
		  writeLocalStorage();
        render();
    })

    return todoItem;
};

function clearTodoList() {
    todoContainer.innerHTML = '';
};

function appendTodos() {
    if (todos.length) {
        todos.forEach(el => {
            const todo =  createTodoItem(el.id, el.text, el.date, el.checked);
            todoContainer.append(todo);
        })
    }
    else {
        todoContainer.insertAdjacentHTML('beforeend',
        `<p class="no-task" >No tasks...</p>`
        )
    }
};

function render() {
    clearTodoList();
    appendTodos();
	
};

buttonDelAll.addEventListener('click', () => {
	todos.splice(0, todos.length);
	writeLocalStorage();
	render();
});

// todoContainer.addEventListener('change', function(event) {
// 	let valueLabel = todoContainer.querySelector('[for='+ event.target.getAttribute('id') + ']').innerHTML;
// 	console.log(valueLabel);
// })

render();