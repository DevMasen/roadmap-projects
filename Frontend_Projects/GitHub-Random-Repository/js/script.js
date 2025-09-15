'use strict';
import langData from './data.js';

//! DOM Elements
const dropdownSelected = document.querySelector('.dropdown-selected');
const selectedText = document.querySelector('.selected-text');
const dropdownContainer = document.querySelector('.dropdown-container');
const dropdownSelect = document.querySelector('.dropdown-select');
const stats = document.querySelector('.stats');
const repoResult = document.querySelector('.repo-result');
const refreshBtn = document.querySelector('.refresh-btn');
const retryBtn = document.querySelector('.retry-btn');
const statsError = document.querySelector('.stats-error');
const repoName = document.querySelector('.repo-name');
const repoLink = document.querySelector('.repo-link');
const repoDescription = document.querySelector('.repo-description');
const langName = document.querySelector('.lang-name');
const starsCount = document.querySelector('.stars-count');
const forksCount = document.querySelector('.forks-count');
const issuesCount = document.querySelector('.issues-count');

//! Global Variables
const numberFormat = new Intl.NumberFormat('en-US');

//! Functions

//* initial language options of dropdown
function initLangData() {
	langData.forEach((lang, index) => {
		const liElement = `
		<li class="dropdown-option" data-id="${index}">
			<span class="option-text">${lang.title}</span>
		</li>
		`;
		dropdownSelect.insertAdjacentHTML('beforeend', liElement);
	});
}

//* updating result box UI
function updateRepoResultUI(langItem) {
	stats.classList.remove('loading');
	stats.classList.add('wait');
	stats.style.display = 'none';
	repoResult.classList.remove('hidden');
	repoName.textContent = langItem.name;
	repoDescription.textContent = langItem.description;
	repoLink.setAttribute('href', langItem.svn_url);
	langName.textContent = langItem.language;
	starsCount.textContent = numberFormat.format(langItem.stargazers_count);
	forksCount.textContent = numberFormat.format(langItem.forks_count);
	issuesCount.textContent = numberFormat.format(langItem.open_issues_count);
	refreshBtn.style.display = 'block';
}

//* updating loading status UI
function updateLoadingUI() {
	stats.style.display = 'flex';
	repoResult.classList.add('hidden');
	dropdownContainer.classList.remove('open');
	refreshBtn.style.display = 'none';
	stats.classList.remove('error');
	stats.classList.remove('wait');
	stats.classList.add('loading');
}

//* updating error status UI
function updateErrorUI(e) {
	statsError.textContent = e.message;
	stats.classList.remove('wait');
	stats.classList.remove('loading');
	stats.classList.add('error');
	retryBtn.style.display = 'block';
}

//* async function for fetching a repository data from api
async function fetchLanguage(lang = '') {
	try {
		const response = await fetch(
			`https://api.github.com/search/repositories?q=language:${lang.toLowerCase()}&per_page=100`,
			{
				method: 'GET',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
					'Accept': 'application/vnd.github+json',
				},
			}
		);
		if (!response.ok)
			throw new Error(
				`Error fetching repository!(code ${response.status})`
			);
		const data = await response.json();
		const randomIndex = Math.floor(Math.random() * 10);
		const randomIndexForAllLanguages = Math.floor(Math.random() * 100);
		const index =
			lang.toLowerCase() === 'all languages'
				? randomIndexForAllLanguages
				: randomIndex;
		const langItem = data.items[index];

		// updating result box UI
		updateRepoResultUI(langItem);
	} catch (e) {
		// updating error status UI
		updateErrorUI(e);
	}
}

//* async function for getting repository data for selected option language
async function getSelectedLangData(e) {
	const selectedItem = e.target.closest('.dropdown-option');
	const selectedLanguage =
		selectedItem.querySelector('.option-text').textContent;

	// update selected option text in dropdown
	selectedText.textContent = selectedLanguage;

	// fetching repository data for selected language and updating UI
	fetchLanguage(selectedLanguage);
}

//* refresh the page for a new repository
function refresh() {
	const selectedLanguage = selectedText.textContent;
	fetchLanguage(selectedLanguage);
	updateLoadingUI();
}

//! Initialization
initLangData();

//! Events
//* opening and closing dropdown on click
dropdownSelected.addEventListener('click', () => {
	dropdownContainer.classList.toggle('open');
});

//* selecting a language for fetching repository data
dropdownSelect.addEventListener('click', e => {
	// get clicked language data
	getSelectedLangData(e);

	// loading status
	updateLoadingUI();
});

//* action on refresh button
refreshBtn.addEventListener('click', refresh);

//* action on retry button
retryBtn.addEventListener('click', () => {
	refresh();
	retryBtn.style.display = 'none';
});
