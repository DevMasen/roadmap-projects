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

//! Global Variables
const dataList = [];

//! Restoring data when website loads
window.addEventListener('load', e => {
	e.preventDefault();
	JSON.parse(localStorage.getItem('dataList')).forEach(data =>
		dataList.push(data)
	);
	renderLanes(dataList);
});

//! Functions
//* Rendering lanes based on dataList
function renderLanes(dataList = []) {
	dataList.forEach(data => {
		addLaneToList(data);
	});
}

//* Async function for fetching data from Reddit API with express server
async function getSubreddit(subreddit = '', limit = 10) {
	try {
		// get response from fetch
		const response = await fetch(
			`/api/r/${encodeURIComponent(subreddit)}?limit=${encodeURIComponent(
				limit
			)}`
		);
		// error on fetching handle
		if (!response.ok) throw new Error(response.status);

		// data fetched from API
		const data = await response.json();

		// not existing subreddits handle
		if (data.data.dist === 0) throw new Error('INVALID Subreddit!');

		// add data to global dataList
		dataList.push(data);

		return data;
	} catch (e) {
		// show error window with proper message
		addLaneErrorContianer.classList.remove('hidden');
		addLaneError.classList.add('open');
		addLaneErrorMessage.textContent = `Error ⚠️ : ${e.message}`;
	}
}

//* Create posts on a subreddit based on subreddit data
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

//* Adding a lane to the page based on subreddit data
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

//* Submiting the adding lane form and add lane to the page
async function handleSubmit(e) {
	e.preventDefault();
	// get subeddit name from input and empty the input
	const subredditName = addLaneInput.value;
	addLaneInput.value = '';

	// hide the add lane form
	addLaneForm.classList.add('hidden');

	// get existing subreddit names and check if the input subreddit is already exist
	const subredditNames = lanesList.querySelectorAll('.subreddit-name');
	const subredditValid = [...subredditNames].every(
		element =>
			element.textContent.trim().toLowerCase() !==
			subredditName.toLowerCase()
	);

	// gaued clause, show error on repeated subreddit
	if (!subredditValid) {
		addLaneErrorContianer.classList.remove('hidden');
		addLaneError.classList.add('open');
		addLaneErrorMessage.textContent = `Error ⚠️ : Subreddit already Exist!`;
		mainOverlay.classList.remove('hidden');
		return;
	}
	// show loader before fetchig data
	mainLoaderContainer.classList.remove('hidden');

	// feching subreddit data
	const subredditData = await getSubreddit(subredditName);

	// hide loader after fetching data
	mainLoaderContainer.classList.add('hidden');

	// gaued clause , no data
	if (!subredditData) return;

	// hide main overlay
	mainOverlay.classList.add('hidden');

	// add subreddit lane to the page
	addLaneToList(subredditData);
}

//! Events
//* clicking add lane button
addLaneBtn.addEventListener('click', () => {
	mainOverlay.classList.remove('hidden');
	addLaneForm.classList.remove('hidden');
});

//* closing open modals on clicking on overlay
mainOverlay.addEventListener('click', () => {
	addLaneForm.classList.add('hidden');
	addLaneErrorContianer.classList.add('hidden');
	addLaneError.classList.remove('open');
	addLaneErrorMessage.textContent = '';
	mainLoaderContainer.classList.add('hidden');
	mainOverlay.classList.add('hidden');
});

//* closing add lane form
closeAddLaneForm.addEventListener('click', () => {
	addLaneForm.classList.add('hidden');
	mainOverlay.classList.add('hidden');
});

//* submiting add lane form
addLaneForm.addEventListener('submit', handleSubmit);

//* handling click events on a subreddit lane
lanesList.addEventListener('click', async function (e) {
	//? click the three dots lane options
	if (e.target.classList.contains('options-btn-img')) {
		// open options list
		e.target.parentElement.parentElement
			.querySelector('.options-list')
			.classList.add('open');

		// open lane body overlay
		e.target.parentElement.parentElement.parentElement.parentElement
			.querySelector('.lane-body-overlay')
			.classList.remove('hidden');

		// cancel scrolling on subreddit lane
		e.target.parentElement.parentElement.parentElement.parentElement.style.overflowY =
			'hidden';
	}

	//? click the refresh button
	else if (e.target.classList.contains('refresh-btn')) {
		// close options list
		e.target.parentElement.parentElement.classList.remove('open');

		// selecting the post list
		const postList =
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.post-list'
			);
		// to empty the post list
		postList.innerHTMl = '';

		// get subreddit name for fetching its data
		const subredditName =
			e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.subreddit-name'
			).textContent;

		// selecting lane overlay
		const laneBodyOverlay =
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.lane-body-overlay'
			);
		// show lane overlay before loading
		laneBodyOverlay.classList.remove('hidden');

		// selecting lane loader
		const laneBodyLoader =
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.lane-body-loader'
			);
		// showing lane loader before loading
		laneBodyLoader.classList.remove('hidden');

		// fetching subreddit data
		const subredditData = await getSubreddit(subredditName);

		// hide lane overlay and loader
		laneBodyOverlay.classList.add('hidden');
		laneBodyLoader.classList.add('hidden');

		// enable the scrolling on subreddit lane
		e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.overflowY =
			'auto';

		// creating new posts and add to the post list
		postList.innerHTMl = createPostItems(subredditData);
	}

	//? click the delete button
	else if (e.target.classList.contains('delete-btn')) {
		// select the lane to delete
		const laneToDelete =
			e.target.parentElement.parentElement.parentElement.parentElement
				.parentElement;
		// delete lane
		laneToDelete.remove();

		// delete lane from dataList
		const laneToDeleteName = laneToDelete
			.querySelector('.subreddit-name')
			.textContent.trim();
		const index = dataList.findIndex(
			data => data.data.children[0].data.subreddit === laneToDeleteName
		);
		if (index !== -1) {
			dataList.splice(index, 1);
		}
	}

	//? click the lane overlay and closing modal tabs
	else if (e.target.classList.contains('lane-body-overlay')) {
		// select lane loader
		const laneBodyLoader =
			e.target.parentElement.querySelector('.lane-body-loader');

		// gaurd clause for loading state
		if (!laneBodyLoader.classList.contains('hidden')) return;

		// close the lane overlay
		e.target.classList.add('hidden');

		// enable the scrolling on subreddit lane
		e.target.parentElement.parentElement.style.overflowY = 'auto';

		// close the options list
		e.target.parentElement.parentElement
			.querySelector('.options-list')
			.classList.remove('open');
	}
});

//! Saving User Data when reload or close the page
window.addEventListener('beforeunload', e => {
	e.preventDefault();
	localStorage.setItem('dataList', JSON.stringify(dataList));
});
