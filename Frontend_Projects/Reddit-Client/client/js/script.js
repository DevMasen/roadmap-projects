'use strict';

//! DOM Elements
const addLaneBtn = document.querySelector('.add-lane-btn');
const addLane = document.querySelector('.add-lane');
const mainOverlay = document.querySelector('.main-overlay');
const addLaneForm = document.querySelector('.add-lane-form');
const addLaneErrorContianer = document.querySelector(
	'.add-lane-error-container'
);
const addLaneError = document.querySelector('.add-lane-error');
const addLaneErrorMessage = document.querySelector('.add-lane-error-message');
const mainLoaderContainer = document.querySelector('.main-loader-container');
const closeAddLaneForm = document.querySelector('.close-add-lane-form');
const addLaneInput = document.querySelector('.add-lane-input');
const lanesList = document.querySelector('.lanes-list');

//! Functions
async function getSubreddit(subreddit = '', limit = 10) {
	try {
		const response = await fetch(
			`/api/r/${encodeURIComponent(subreddit)}?limit=${encodeURIComponent(
				limit
			)}`
		);
		if (!response.ok) throw new Error(response.status);
		const data = await response.json();
		if (data.data.dist === 0) throw new Error('INVALID Subreddit!');
		return data;
	} catch (e) {
		addLaneErrorContianer.classList.remove('hidden');
		addLaneError.classList.add('open');
		addLaneErrorMessage.textContent = `Error ⚠️ : ${e.message}`;
	}
}

function createPostItems(subredditData = {}) {
	let postItems = '';
	subredditData.data.children.forEach(element => {
		postItems =
			postItems +
			`<li class="post-item">
                <a href="${element.data.url}" class="post-link">
                    <div class="post-upv">
                        <img
                            src="./img/arrow-up.png"
                            alt="!"
                            class="upv-icon"
                        />
                        <span class="upv-count">${element.data.ups}</span>
                    </div>
                    <div class="post-title-author">
                        <h4 class="post-title">
                            ${element.data.title}
                        </h4>
                        <p class="post-author">${element.data.author}</p>
                    </div>
                </a>
            </li>`;
	});
	return postItems;
}

function addLaneToList(subredditData = {}) {
	const postItems = createPostItems(subredditData);
	const subredditLaneItem = `
    <li class="subreddit-lane">
        <section class="lane-header">
            <h3 class="lane-header-text">
                <span>/r/</span
                ><span class="subreddit-name"
                    >${subredditData.data.children[0].data.subreddit}</span
                >
            </h3>
            <div class="lane-options">
                <button class="options-btn">
                    <img
                        src="./img/menu-2.png"
                        alt="..."
                        class="options-btn-img"
                    />
                </button>
                <ul class="options-list">
                    <!-- add class "open" -->
                    <li class="option-item">
                        <button class="refresh-btn option-btn">
                            Refresh
                        </button>
                    </li>
                    <li class="option-item">
                        <button class="delete-btn option-btn">
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        </section>
        <section class="lane-body">
            <div class="lane-body-overlay hidden"></div>
            <div class="lane-body-loader hidden"></div>
            <ul class="post-list">${postItems}</ul>
        </section>
    </li>
`;
	lanesList.insertAdjacentHTML('beforeend', subredditLaneItem);
}

async function handleSubmit(e) {
	e.preventDefault();
	const subredditName = addLaneInput.value;
	addLaneInput.value = '';
	addLaneForm.classList.add('hidden');
	const subredditNames = lanesList.querySelectorAll('.subreddit-name');
	const subredditValid = [...subredditNames].every(
		element =>
			element.textContent.trim().toLowerCase() !==
			subredditName.toLowerCase()
	);
	if (!subredditValid) {
		addLaneErrorContianer.classList.remove('hidden');
		addLaneError.classList.add('open');
		addLaneErrorMessage.textContent = `Error ⚠️ : Subreddit already Exist!`;
		mainOverlay.classList.remove('hidden');
		return;
	}
	mainLoaderContainer.classList.remove('hidden');
	const subredditData = await getSubreddit(subredditName);
	mainLoaderContainer.classList.add('hidden');
	if (!subredditData) return;
	mainOverlay.classList.add('hidden');
	addLaneToList(subredditData);
}

//! Events
addLaneBtn.addEventListener('click', () => {
	mainOverlay.classList.remove('hidden');
	addLaneForm.classList.remove('hidden');
});
mainOverlay.addEventListener('click', () => {
	addLaneForm.classList.add('hidden');
	addLaneErrorContianer.classList.add('hidden');
	addLaneError.classList.remove('open');
	addLaneErrorMessage.textContent = '';
	mainLoaderContainer.classList.add('hidden');
	mainOverlay.classList.add('hidden');
});
closeAddLaneForm.addEventListener('click', () => {
	addLaneForm.classList.add('hidden');
	mainOverlay.classList.add('hidden');
});
addLaneForm.addEventListener('submit', handleSubmit);
lanesList.addEventListener('click', async function (e) {
	if (e.target.classList.contains('options-btn-img')) {
		const optionsList =
			e.target.parentElement.parentElement.querySelector('.options-list');
		optionsList.classList.add('open');
		const laneBodyOverlay =
			e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.lane-body-overlay'
			);
		laneBodyOverlay.classList.remove('hidden');
		const subredditLane =
			e.target.parentElement.parentElement.parentElement.parentElement;
		subredditLane.style.overflowY = 'hidden';
	} else if (e.target.classList.contains('refresh-btn')) {
		const optionsList = e.target.parentElement.parentElement;
		optionsList.classList.remove('open');
		const postList =
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.post-list'
			);
		postList.innerHTMl = '';
		const subredditName =
			e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.subreddit-name'
			).textContent;
		const laneBodyOverlay =
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.lane-body-overlay'
			);
		laneBodyOverlay.classList.remove('hidden');
		const laneBodyLoader =
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.lane-body-loader'
			);
		laneBodyLoader.classList.remove('hidden');
		const subredditData = await getSubreddit(subredditName);
		laneBodyOverlay.classList.add('hidden');
		laneBodyLoader.classList.add('hidden');
		const subredditLane =
			e.target.parentElement.parentElement.parentElement.parentElement
				.parentElement;
		subredditLane.style.overflowY = 'auto';
		const postItems = createPostItems(subredditData);
		postList.innerHTMl = postItems;
	} else if (e.target.classList.contains('delete-btn')) {
		const laneToDelete =
			e.target.parentElement.parentElement.parentElement.parentElement
				.parentElement;
		laneToDelete.remove();
	} else if (e.target.classList.contains('lane-body-overlay')) {
		const laneBodyLoader =
			e.target.parentElement.querySelector('.lane-body-loader');
		if (!laneBodyLoader.classList.contains('hidden')) return;
		e.target.classList.add('hidden');
		const subredditLane = e.target.parentElement.parentElement;
		subredditLane.style.overflowY = 'auto';
		const optionsList =
			e.target.parentElement.parentElement.querySelector('.options-list');
		optionsList.classList.remove('open');
	}
});
