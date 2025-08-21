'use strict';
const tabList = document.querySelector('.tab-list');
const tabItems = document.querySelectorAll('.tab-item');

function removeByClassName(nodeList = [], className = '') {
	for (const element of nodeList) {
		element.classList.remove(className);
	}
}

tabList.addEventListener('click', e => {
	const selectedTab = e.target.closest('.tab-item');
	console.log(selectedTab);
	if (selectedTab.classList.contains('open')) {
		selectedTab.classList.remove('open');
		return;
	}
	removeByClassName(tabItems, 'open');
	selectedTab.classList.add('open');
});
