//! Interactive Scripts
'strict mode';
const tabList = document.querySelector('.tabs');
const tabItems = tabList.querySelectorAll('.tab');
const contentElements = document.querySelectorAll('.tab-element');

function removeClass(nodeList = null, className = '') {
	if (!nodeList || !className) return;
	for (const node of nodeList) {
		node.classList.remove(className);
	}
}
function changeTab(tab) {
	removeClass(tabItems, 'active-tab');
	tab.classList.add('active-tab');
}
function changeContent(tab) {
	removeClass(contentElements, 'active-element');
	const clickedTabNumber = tab.getAttribute('data-tab-number');
	const elementToDisplay = document.getElementById(
		`tab-element-${clickedTabNumber}`
	);
	elementToDisplay.classList.add('active-element');
}

function handleTabClick(e) {
	const clickedTab = e.target.closest('.tab');

	if (!clickedTab || clickedTab.classList.contains('active-tab')) {
		return;
	}

	changeTab(clickedTab);
	changeContent(clickedTab);
}

tabList.addEventListener('click', e => handleTabClick(e));
