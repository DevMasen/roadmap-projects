const darkModeImogi = document.querySelector('.label-text');
const darkModeInput = document.getElementById('darkToggle');

darkModeImogi.textContent = darkModeInput.checked ? '🌛' : '☀️';

darkModeInput.addEventListener('change', () => {
	darkModeImogi.textContent = darkModeInput.checked ? '🌛' : '☀️';
});
