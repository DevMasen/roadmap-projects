'use strict';
const rejectBtn = document.querySelector('.reject-cookie-btn');
const acceptBtn = document.querySelector('.accept-cookie-btn');
const cookieModal = document.querySelector('.cookie-consent');

function setCookieConsent(expireDays = 1, isAccepted = false) {
	const now = new Date().getTime();
	const expireTime = now + expireDays * 24 * 60 * 60 * 1000;
	// 1 min = 0.0006944444 day
	const consentObj = {
		value: isAccepted,
		expire: expireTime,
	};
	localStorage.setItem('cookie-consent', JSON.stringify(consentObj));
}
window.addEventListener('load', () => {
	const cookieConsent = localStorage.getItem('cookie-consent');
	const consentObj = JSON.parse(cookieConsent);
	if (!cookieConsent || consentObj?.expire < new Date().getTime()) {
		cookieModal.style.display = 'flex';
		localStorage.removeItem('cookie-consent');
	}
	// console.log(consentObj);
});

rejectBtn.addEventListener('click', () => {
	setCookieConsent(0.000694444, false);
	// 1 minutes expiration
	cookieModal.style.display = 'none';
});

acceptBtn.addEventListener('click', () => {
	setCookieConsent(0.000694444, true);
	// 1 minutes expiration
	cookieModal.style.display = 'none';
});
