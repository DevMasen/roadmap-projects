'use strict';

//! DOM Elements
const initialUnitInput = document.querySelector('#initial-unit-input');
const dropdownSelectedList = document.querySelectorAll('.dropdown-selected');
const dropdownSelectList = document.querySelectorAll('.dropdown-select');
const sourceUnitDropdown = document.querySelector('.source-unit-dropdown');
const destinationUnitDropdown = document.querySelector(
	'.destination-unit-dropdown'
);

//! Functions
//* verification function on input
function makeNumericInput(input, { decimals = 2, allowNegative = false } = {}) {
	function cleanValue(val) {
		// remove invalid chars
		const invalidRegex = allowNegative ? /[^0-9.\-]/g : /[^0-9.]/g;
		val = val.replace(invalidRegex, '');

		// normalize minus: only one, only at start
		if (allowNegative) {
			const startsWithMinus = val.startsWith('-');
			val = val.replace(/-/g, '');
			if (startsWithMinus) val = '-' + val;
		} else {
			// remove any '-' if negatives not allowed
			val = val.replace(/-/g, '');
		}

		// keep only first dot
		const dotIdx = val.indexOf('.');
		if (dotIdx !== -1) {
			// remove additional dots
			val =
				val.slice(0, dotIdx + 1) +
				val.slice(dotIdx + 1).replace(/\./g, '');
			// limit decimals
			const before = val.slice(0, dotIdx);
			const after = val.slice(dotIdx + 1, dotIdx + 1 + decimals);
			val = before + '.' + after;
			// allow leading dot (".5") — we will convert to "0.5" on blur if you prefer
		}

		return val;
	}

	function onInput(e) {
		const el = e.target;
		const oldVal = el.value;
		const oldPos = el.selectionStart;

		const newVal = cleanValue(oldVal);
		if (newVal === oldVal) return;

		// set cleaned value and roughly restore caret position
		// Compute how many invalid characters were removed to adjust caret
		let removedBeforeCaret = 0;
		for (let i = 0; i < oldPos; i++) {
			if (!allowNegative && /[^0-9.]/.test(oldVal[i]))
				removedBeforeCaret++;
			else if (allowNegative && /[^0-9.\-]/.test(oldVal[i]))
				removedBeforeCaret++;
			// also if an extra dot or extra '-' to the right of caret were removed then it's trickier;
			// this heuristic handles typical cases well.
		}

		el.value = newVal;
		const newPos = Math.max(0, oldPos - removedBeforeCaret);
		try {
			el.setSelectionRange(newPos, newPos);
		} catch (err) {}
	}

	// Better paste handling
	function onPaste(e) {
		e.preventDefault();
		const raw = (e.clipboardData || window.clipboardData).getData('text');
		const cleaned = cleanValue(raw);
		document.execCommand('insertText', false, cleaned);
	}

	// On blur, make ".5" -> "0.5" and drop trailing '.' if present
	function onBlur(e) {
		let v = input.value;
		if (!v) return;
		if (v === '-' && allowNegative) return; // keep lone minus if user intends negative sign
		if (v[0] === '.') v = '0' + v;
		if (v === '.') v = '0';
		if (v[v.length - 1] === '.') v = v.slice(0, -1);
		input.value = v;
	}

	input.addEventListener('input', onInput);
	input.addEventListener('paste', onPaste);
	input.addEventListener('blur', onBlur);
}

//! Initialization
makeNumericInput(initialUnitInput, { decimals: 2, allowNegative: true });

//! Events
//* open and close dropdowns by click
[...dropdownSelectedList].forEach(element =>
	element.addEventListener('click', function () {
		this.parentElement.classList.toggle('open');
	})
);

//* selectiong units
[...dropdownSelectList].forEach(element =>
	element.addEventListener('click', function (e) {
		const selectedItem = e.target.closest('.dropdown-option');
		const allOptions = this.querySelectorAll('.dropdown-option');
		[...allOptions].map(option => {
			option.classList.remove('selected');
		});
		selectedItem.classList.add('selected');
		const selectedText = this.parentElement.querySelector('.selected-text');
		selectedText.textContent =
			selectedItem.querySelector('.option-text').textContent;
		this.parentElement.classList.remove('open');
	})
);
