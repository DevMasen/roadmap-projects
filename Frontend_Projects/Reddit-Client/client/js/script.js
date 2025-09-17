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
		console.log(data);
	} catch (e) {
		addLaneErrorContianer.classList.remove('hidden');
		addLaneError.classList.add('open');
		addLaneErrorMessage.textContent = `Error ⚠️ : ${e.message}`;
	}
}

async function handleSubmit(e) {
	e.preventDefault();
	const subredditName = addLaneInput.value;
	getSubreddit(subredditName);
}

//! Events
addLaneBtn.addEventListener('mouseenter', () => {
	addLane.classList.add('open');
});
addLaneBtn.addEventListener('mouseleave', () => {
	addLane.classList.remove('open');
});
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

const laneHTML = `
<li class="subreddit-lane">
    <section class="lane-header">
        <h3 class="lane-header-text">
            <span>/r/</span
            ><span class="subreddit-name"
                >learnprogramming</span
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
        <section class="lane-body-error hidden">
            <span class="lane-body-error-message">Error!</span>
        </section>
        <ul class="post-list"></ul>
    </section>
</li>
`;
const postHTML = `
<li class="post-item">
    <a href="#" class="post-link">
        <div class="post-upv">
            <img
                src="./img/arrow-up.png"
                alt="!"
                class="upv-icon"
            />
            <span class="upv-count">120</span>
        </div>
        <div class="post-title-author">
            <h4 class="post-title">
                Post title here
            </h4>
            <p class="post-author">sagpedar</p>
        </div>
    </a>
</li>
`;
