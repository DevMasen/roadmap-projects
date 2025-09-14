'use strict';
import langData from './data.js';

// DOM Elements
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

// Global Variables
const numberFormat = new Intl.NumberFormat('en-US');
const randomIndex = Math.floor(Math.random() * 10);
const randomIndexForAllLanguages = Math.floor(Math.random() * 100);

// Functions
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

async function getSelectedLangData(e) {
	const selectedItem = e.target.closest('.dropdown-option');
	const selectedLanguage =
		selectedItem.querySelector('.option-text').textContent;

	// update ui
	selectedText.textContent = selectedLanguage;

	// Fetching repo data
	try {
		const response = await fetch(
			`https://api.github.com/search/repositories?q=language:${selectedLanguage.toLowerCase()}ppp&per_page=100`,
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
		const index =
			selectedLanguage.toLowerCase() === 'all languages'
				? randomIndexForAllLanguages
				: randomIndex;
		const langItem = data.items[index];

		// updating ui
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
		issuesCount.textContent = numberFormat.format(
			langItem.open_issues_count
		);
		refreshBtn.style.display = 'block';
	} catch (e) {
		// update ui
		statsError.textContent = e.message;
		stats.classList.remove('wait');
		stats.classList.remove('loading');
		stats.classList.add('error');
		retryBtn.style.display = 'block';
	}
}

function handleRefresh() {}
function handleRetry() {}

// Initialization
initLangData();

// Events
dropdownSelected.addEventListener('click', () => {
	dropdownContainer.classList.toggle('open');
});
dropdownSelect.addEventListener('click', e => {
	getSelectedLangData(e);

	// update ui
	stats.style.display = 'flex';
	repoResult.classList.add('hidden');
	dropdownContainer.classList.remove('open');
	refreshBtn.style.display = 'none';
	stats.classList.remove('error');
	stats.classList.remove('wait');
	stats.classList.add('loading');
});
refreshBtn.addEventListener('click', handleRefresh);
retryBtn.addEventListener('click', handleRetry);
