'use strict';
const dropdownSelected = document.querySelector('.dropdown-selected');
const selectedText = document.querySelector('.selected-text');
const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownSelect = document.querySelector('.dropdown-select');
const options = document.querySelectorAll('.dropdown-option');
dropdownSelected.addEventListener('click', () => {
	dropdownContainer.classList.toggle('open');
});
dropdownSelect.addEventListener('click', e => {
	const selectedItem = e.target.closest('.dropdown-option');
	[...options].map(option => {
		option.classList.remove('selected');
	});
	selectedItem.classList.add('selected');
	selectedText.textContent =
		selectedItem.querySelector('.option-text').textContent;
	dropdownContainer.classList.remove('open');
});
