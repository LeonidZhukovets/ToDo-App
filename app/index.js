const buttonAdd = document.querySelector('.btn-add');
const input = document.querySelector('.input-todo');

const todayDate = (
	year = new Date().getFullYear(),
	month = new Date().getMonth() + 1,
	day = new Date().getDate()
) => { const dateToDo = new Date(year, month, day);
	return `${dateToDo.getDate()}.${dateToDo.getMonth()}.${dateToDo.getFullYear()}`; };

const todo = document.querySelector('.todo');
const toDos = [];

buttonAdd.addEventListener('click', () => {

	let newToDo = {
		id: 1,
		toDo: input.value,
		isChecked: false,
		date: todayDate()
		};
		
		input.value = '';

		toDos.push(newToDo);
		
		displayMessages();
});

function displayMessages() {
	let displayMessage = '';
	toDos.forEach(function(item, id, date) {
		displayMessage += `
		<li>
		<input type='checkbox' id='${id}'>
		<label for='item_${id}'>${item.toDo} ${todayDate()}</label>
		</li>
		`;
		todo.innerHTML = displayMessage;


		console.log(toDos);
	});
};