const todoItemTemplate = document.querySelector('[data-todo-item-template]');
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


const todayDate = (date) => {
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hour = date.getHours();
	let min = date.getMinutes();
	min < 10 ? (min = '0' + min) : min;
	return `${day}.${month}.${year} -|- ${hour}:${min}`;
 };
 


buttonAdd.addEventListener('click', () => {
    const text = inputAdd.value.trim();

    if (text !== '' ) {
        const newTodo = {
            id: Date.now(),
            text,
            date: todayDate(new Date()),
            checked: false
        };
        todos.push(newTodo);
        inputAdd.value = '';
		  writeLocalStorage();
		 
    }
	 else {
		alert('Please enter your task!')
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
	 const todoCheck = todoItem.querySelector('[data-todo-checkbox]');
    todoCheck.checked = checked;

	 todoCheck.addEventListener('change', (e) => {
		todos = todos.map( item => {
			 if (item.id === id) {
				  item.checked = e.target.checked;
			 }
			 return item
		});
		writeLocalStorage();
		});
		
    const buttonRemove = todoItem.querySelector('[data-button-del]');

    buttonRemove.addEventListener('click', () => {
        todos = todos.filter(todo => todo.id !== id);
		  writeLocalStorage();
        render();
    });

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


render();