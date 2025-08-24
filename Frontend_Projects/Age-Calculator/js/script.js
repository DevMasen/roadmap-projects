'use strict';
import { DateTime } from '../node_modules/luxon/src/luxon.js';
// console.log(DateTime.now().toLocaleString());

//! DOM elements
const dateBtn = document.querySelector('.date-btn');
const datePicker = document.querySelector('.form__datepicker-container');
const tableBody = document.querySelector('.table-body');
const tableDataElements = tableBody.querySelectorAll('.table-row__td');
const birthDateInput = document.getElementById('birthdate');
const yearSelect = document.querySelector('.year-select');
const monthSelect = document.querySelector('.month-select');
const previousMonthBtn = document.querySelector('.slider--button-1');
const nextMonthBtn = document.querySelector('.slider--button-2');

//! Functions
function addOptionsForYearSelect() {
	let optionHtmlString = '';
	for (let i = 1900; i <= new Date().getFullYear(); i++) {
		optionHtmlString =
			i !== 2022
				? `<option value="${i}">${i}</option>`
				: `<option value="${i}" selected>${i}</option>`;
		yearSelect.insertAdjacentHTML('beforeend', optionHtmlString);
	}
}
function removeStyle(nodeList = [], className = '') {
	for (const element of nodeList) {
		element.classList.remove(className);
	}
}
function setMonthStartDay() {
	const currentMonth = monthSelect.value;
	const currentYear = yearSelect.value;
	const currentDate = new Date(`1 ${currentMonth} ${currentYear}`);
	const monthStartWeekDay = currentDate.getDay();
	const endDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();
	[...tableDataElements].map(element => {
		element.textContent = '';
		element.classList.remove('td-selected');
	});
	[...tableDataElements]
		.slice(monthStartWeekDay, monthStartWeekDay + endDayOfMonth)
		.map((element, i) => {
			element.textContent = i + 1;
		});
}

//! Initializing
addOptionsForYearSelect();

//! Handling Events
dateBtn.addEventListener('click', () => {
	datePicker.classList.toggle('flex');
});
tableBody.addEventListener('click', e => {
	const day = e.target.textContent;
	if (!day) return;
	removeStyle(tableDataElements, 'td-selected');
	e.target.classList.add('td-selected');
	const month = monthSelect.value;
	const year = yearSelect.value;
	const birthDate = new Date(`${day} ${month} ${year}`);
	const dt = DateTime.fromJSDate(birthDate);
	const dtFormatted = dt.toFormat('dd/MM/yyyy');
	birthDateInput.value = dtFormatted;
});
yearSelect.addEventListener('input', setMonthStartDay);
monthSelect.addEventListener('input', setMonthStartDay);
