const button = document.querySelector('.button');

const input = document.querySelector('.input-todo');


// input.addEventListener('input', (event) => {
// 	p.textContent = event.target.value;
// 	input.insertAdjacentElement('afterend', p);
// })

button.addEventListener('click', () => {
	const p = document.createElement('p');
	p.textContent = input.value;
	button.insertAdjacentElement('afterend', p);
	input.value = ' ';
})