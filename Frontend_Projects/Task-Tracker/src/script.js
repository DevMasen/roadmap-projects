'use strict';
//! DOM elements selection
const addTaskForm = document.querySelector('.add-task-form');
const addTaskInput = document.querySelector('.add-task-input');
const taskList = document.querySelector('.task-list');
const taskCheckboxes = document.querySelectorAll('.task-checkbox');

//! Data
const tasks = [];

//! Functions
function handleSubmit(e) {
	e.preventDefault();
	const newTask = {
		id: new Date().getTime(),
		checked: false,
		text: addTaskInput.value,
	};
	tasks.push(newTask);
	addTaskInput.value = '';
	renderList();
}

function renderList() {
	taskList.innerHTML = '';
	[...tasks]
		.sort((a, b) => a.checked - b.checked)
		.map(task => {
			const htmlElement = `
            	<li class="task-item" data-id="${task.id}">
					<div class="input-text-container">
						<input
							class="task-checkbox"
							type="checkbox"
							aria-checked="false"
                            ${task.checked ? 'checked' : ''}
						/>
						<span class="task-text${task.checked ? ' task-checked' : ''}"
							>${task.text}</span
						>
					</div>
					<button class="task-delete" type="button">
						<img
							class="delete__img"
							src="../img/icons8-delete-128.png"
							alt="delete"
						/>
					</button>
				</li>
            `;
			taskList.insertAdjacentHTML('beforeend', htmlElement);
		});
}

//! Event Handling

//* preventing from reload page
window.addEventListener('beforeunload', function (e) {
	e.preventDefault();
	e.returnValue = '';
});

//* submit the input
addTaskForm.addEventListener('submit', handleSubmit);

//* making task checked
taskList.addEventListener('click', e => {
	if (e.target.classList.contains('task-checkbox')) {
		const itemId =
			+e.target.parentElement.parentElement.getAttribute('data-id');
		tasks.find(element => element.id === itemId).checked = e.target.checked;
		renderList();
	} else if (
		e.target.classList.contains('task-delete') ||
		e.target.classList.contains('delete__img')
	) {
		const itemId = e.target.classList.contains('task-delete')
			? +e.target.parentElement.getAttribute('data-id')
			: +e.target.parentElement.parentElement.getAttribute('data-id');
		const itemIndex = tasks.findIndex(element => element.id === itemId);
		if (itemIndex !== -1) tasks.splice(itemIndex, 1);
		renderList();
	}
});
