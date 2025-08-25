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
const inputContainer = document.querySelector('.form__input-container');
const error = document.querySelector('.error');
const form = document.querySelector('.form');
const output = document.querySelector('.output');
const resultYears = document.querySelector('.result__years');
const resultMonths = document.querySelector('.result__months');
const resultDays = document.querySelector('.result__days');
//! Data
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

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
	setBorder();
}
function setBorder() {
	[...tableDataElements].map(element => {
		if (!element.textContent) {
			element.style.border = 'none';
			element.style.cursor = 'auto';
		} else {
			element.style.border = '1px solid #000';
			element.style.cursor = 'pointer';
		}
	});
}
function isValidDate(dateStr) {
	const [day, month, year] = dateStr.split('/').map(Number);

	if (!day || !month || !year) return false;

	if (year < 1900 || year > new Date().getFullYear()) return false; // 4-digit year only
	if (month < 1 || month > 12) return false;

	const daysInMonth = new Date(year, month, 0).getDate();
	return day >= 1 && day <= daysInMonth;
}

//! Initializing
addOptionsForYearSelect();
setBorder();

//! Handling Events
dateBtn.addEventListener('click', () => {
	datePicker.classList.toggle('flex');
});
tableBody.addEventListener('click', e => {
	if (!e.target.classList.contains('table-row__td')) return;
	inputContainer.style.border = 'none';
	birthDateInput.style.color = 'black';
	error.style.display = 'none';
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

previousMonthBtn.addEventListener('click', () => {
	const curMonth = monthSelect.value;
	const curMonthIndex = months.indexOf(curMonth);
	if (+yearSelect.value <= 1900 && curMonthIndex === 0) return;
	if (curMonthIndex === 0) {
		yearSelect.value = +yearSelect.value - 1;
		monthSelect.value = months[11];
	} else monthSelect.value = months[curMonthIndex - 1];

	setMonthStartDay();
});
nextMonthBtn.addEventListener('click', () => {
	const curMonth = monthSelect.value;
	const curMonthIndex = months.indexOf(curMonth);
	if (+yearSelect.value >= new Date().getFullYear() && curMonthIndex === 11)
		return;
	if (curMonthIndex === 11) {
		yearSelect.value = +yearSelect.value + 1;
		monthSelect.value = months[0];
	} else monthSelect.value = months[curMonthIndex + 1];

	setMonthStartDay();
});

birthDateInput.addEventListener('input', function (e) {
	datePicker.classList.remove('flex');
	let value = e.target.value;

	// Allow only digits and "/"
	value = value.replace(/[^0-9/]/g, '');

	// Auto-insert slashes
	if (value.length === 2 && !value.includes('/')) {
		value = value + '/';
	} else if (value.length === 5 && value.split('/').length === 2) {
		value = value + '/';
	}

	// Restrict length to dd/MM/yyyy
	value = value.slice(0, 10);
	e.target.value = value;

	// Validate date when full length
	if (value.length === 10) {
		if (!isValidDate(value)) {
			inputContainer.style.border = '2px solid red';
			e.target.style.color = 'red';
			error.style.display = 'block';
			output.style.display = 'none';
		} else {
			inputContainer.style.border = '2px solid green';
			e.target.style.color = 'green';
			error.style.display = 'none';
		}
	} else {
		inputContainer.style.border = '';
		e.target.style.color = 'black';
		error.style.display = 'none';
	}
});

form.addEventListener('submit', e => {
	e.preventDefault();
	if (!isValidDate(birthDateInput.value)) return;
	// const finalBirthDate = new Date(birthDateInput.value);
	const dateElements = birthDateInput.value.split('/');
	const finalDay = dateElements.at(0);
	const finalMonth = months[+dateElements.at(1) - 1];
	const finalYear = dateElements.at(2);
	const finalDate = new Date(finalDay + ' ' + finalMonth + ' ' + finalYear);
	const days = Math.ceil(
		(new Date().getTime() - finalDate.getTime()) / 1000 / 60 / 60 / 24
	);
	if (days < 0) return;

	const displayYears = Math.floor(days / 365.2425);
	const displayMonths = Math.floor((days % 365) / 29.53);
	const displayDays = (days % 365) % 30;
	// const days =
	output.style.display = 'block';
	resultYears.textContent = displayYears;
	resultMonths.textContent = displayMonths;
	resultDays.textContent = displayDays;

	birthDateInput.value = '';
	inputContainer.style.border = 'none';
});
