'use strict';
import { DateTime } from '../node_modules/luxon/src/luxon.js';

//! Selecting DOM elements
const tableDataElements = document.querySelectorAll('.table-row__td');
const sliderBtns = document.querySelectorAll('.slider-btn');

const birthDateInput = document.getElementById('birthdate');

const dateBtn = document.querySelector('.date-btn');
const datePicker = document.querySelector('.form__datepicker-container');
const tableBody = document.querySelector('.table-body');
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
//* Adding Years between 1936 and current Year to Select as Option
function addYearOptions(element) {
	let optionHtmlString = '';
	for (let i = 1936; i <= new Date().getFullYear(); i++) {
		optionHtmlString =
			i !== 2022
				? `<option value="${i}">${i}</option>`
				: `<option value="${i}" selected>${i}</option>`;
		element.insertAdjacentHTML('beforeend', optionHtmlString);
	}
}

//* remove a style class from each node in a NodeList
function removeStyle(nodeList = [], className = '') {
	for (const element of nodeList) {
		element.classList.remove(className);
	}
}

//* remove the border and cursor style from an element
function setVisible(nodeList) {
	[...nodeList].map(element => {
		if (!element.textContent) {
			element.style.border = 'none';
			element.style.cursor = 'auto';
		} else {
			element.style.border = '1px solid #000';
			element.style.cursor = 'pointer';
		}
	});
}

//* render the month table in datepicker with new month information
function renderMonth(nodeList) {
	const curMonth = monthSelect.value;
	const curYear = yearSelect.value;
	const curDate = new Date(`1 ${curMonth} ${curYear}`);
	const monthStartIndex = curDate.getDay();
	const curMonthLength = new Date(
		curDate.getFullYear(),
		curDate.getMonth() + 1,
		0
	).getDate();
	[...nodeList].map(element => {
		element.textContent = '';
		element.classList.remove('td-selected');
	});
	[...nodeList]
		.slice(monthStartIndex, monthStartIndex + curMonthLength)
		.map((element, i) => {
			element.textContent = i + 1;
		});
	setVisible(tableDataElements);
}

//* Check if a formatted date is valid
function isValidDate(dateStr) {
	const [day, month, year] = dateStr.split('/').map(Number);

	if (!day || !month || !year) return false;

	if (year < 1936 || year > new Date().getFullYear()) return false; // 4-digit year only
	if (month < 1 || month > 12) return false;

	const daysInMonth = new Date(year, month, 0).getDate();
	return day >= 1 && day <= daysInMonth;
}

//* Updating UI when form submitted
function updateUI(days) {
	datePicker.classList.remove('flex');
	output.style.display = 'block';
	resultYears.textContent = Math.floor(days / 365.2425);
	resultMonths.textContent = Math.floor((days % 365) / 29.53);
	resultDays.textContent = (days % 365) % 30;
	birthDateInput.value = '';
	inputContainer.style.border = 'none';
}

//! Initializing
addYearOptions(yearSelect);
setVisible(tableDataElements);

//! Handling Events

//* toggle datepicker
dateBtn.addEventListener('click', () => {
	datePicker.classList.toggle('flex');
});

//* selecting date
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

//* rendering month on month or year changing
yearSelect.addEventListener('input', () => renderMonth(tableDataElements));
monthSelect.addEventListener('input', () => renderMonth(tableDataElements));

//* change month
[...sliderBtns].map(element => {
	element.addEventListener('click', e => {
		const curMonth = monthSelect.value;
		const curMonthIndex = months.indexOf(curMonth);
		const clickedButton =
			e.target.getAttribute('alt') === '<' ? 'previous' : 'next';

		if (curMonthIndex === 0 && clickedButton === 'previous') {
			if (+yearSelect.value <= 1936) return;
			yearSelect.value = +yearSelect.value - 1;
			monthSelect.value = months[11];
		} else if (curMonthIndex === 11 && clickedButton === 'next') {
			if (+yearSelect.value >= new Date().getFullYear()) return;
			yearSelect.value = +yearSelect.value + 1;
			monthSelect.value = months[0];
		} else if (e.target.getAttribute('alt') === '<') {
			monthSelect.value = months[curMonthIndex - 1];
		} else if (e.target.getAttribute('alt') === '>') {
			monthSelect.value = months[curMonthIndex + 1];
		} else return;

		renderMonth(tableDataElements);
	});
});

//* Validating user input on typing
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

//* submit the form and Age Calculation
form.addEventListener('submit', e => {
	e.preventDefault();
	if (!isValidDate(birthDateInput.value)) return;
	const [finalDay, monthIndex, finalYear] = birthDateInput.value.split('/');
	const finalMonth = months[+monthIndex - 1];
	const finalDate = new Date(finalDay + ' ' + finalMonth + ' ' + finalYear);
	const days = Math.ceil(
		(new Date().getTime() - finalDate.getTime()) / 1000 / 60 / 60 / 24
	);
	if (days < 0) return;

	updateUI(days);
});
