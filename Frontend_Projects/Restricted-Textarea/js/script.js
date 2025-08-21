'use strict';
const textareaContainer = document.querySelector('.textarea-container');
const messageInput = document.getElementById('message');
const typedLetters = document.getElementById('typed-letters');
const limit = document.getElementById('limit');

const maxLength = +messageInput.getAttribute('maxlength');
let typedLength = 0;
typedLetters.textContent = typedLength;
limit.textContent = maxLength;

messageInput.addEventListener('input', e => {
	typedLength = e.target.value.length;
	typedLetters.textContent = typedLength;
	textareaContainer.classList.remove('reached-limit');
	if (typedLength === maxLength)
		textareaContainer.classList.add('reached-limit');
});
