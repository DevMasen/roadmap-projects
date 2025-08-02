const darkModeImogi = document.querySelector('.label-text');
const darkModeInput = document.getElementById('darkToggle');

darkModeInput.addEventListener('change', e => {
	darkModeImogi.textContent =
		darkModeImogi.textContent === '☀️' ? '🌛' : '☀️';
});
