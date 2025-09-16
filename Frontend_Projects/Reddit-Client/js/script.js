'use strict';
const addLaneBtn = document.querySelector('.add-lane-btn');
const addLane = document.querySelector('.add-lane');

addLaneBtn.addEventListener('mouseenter', () => {
	addLane.classList.add('open');
});
addLaneBtn.addEventListener('mouseleave', () => {
	addLane.classList.remove('open');
});

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
                    src="https://img.icons8.com/sf-black-filled/64/ff4500/menu-2.png"
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
        <ul class="post-list">
            <li class="post-item">
                <a href="#" class="post-link">
                    <div class="post-upv">
                        <img
                            src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/ff4500/external-arrow-interface-a2-creatype-glyph-colourcreatype-4.png"
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
        </ul>
    </section>
</li>
`;
