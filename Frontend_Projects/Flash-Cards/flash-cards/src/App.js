import { useState } from 'react';
import './index.css';
import questions from './data';
export default function App() {
	return (
		<div className="App">
			<FlashCards />
		</div>
	);
}

function FlashCards() {
	return (
		<div className="container">
			<h2 className="title">Flash Cards</h2>
			<ProgressBar />
			<Slider />
		</div>
	);
}

function ProgressBar() {
	return (
		<div className="progress-bar">
			<span className="progress-percentage">X</span>%
			<div className="counter">
				<span className="cur-count">Y</span> of
				<span className="all-count">Z</span>
			</div>
		</div>
	);
}

function Slider() {
	return (
		<div className="slider">
			<CardList />
			<Navigator />
		</div>
	);
}

function CardList() {
	return (
		<ul className="card-list">
			{questions.map(question => (
				<Card question={question.question} answer={question.answer} />
			))}
		</ul>
	);
}

function Card({ question, answer }) {
	return (
		<li className="card">
			<h1 className="question">{question}</h1>
			<p className="answer">{answer}</p>
		</li>
	);
}

function Navigator() {
	const [isHidden, setIsHidden] = useState(true);

	function handlePrevious() {}
	function handleShowHide() {
		setIsHidden(!isHidden);
	}
	function handleNext() {}

	return (
		<nav className="nav">
			<Button onClick={handlePrevious}>
				<img src="" alt="<" /> Previous
			</Button>
			<Button onClick={handleShowHide}>
				{isHidden ? 'Show Answer' : 'Hide Answer'}
			</Button>
			<Button onClick={handleNext}>
				Next <img src="" alt=">" />
			</Button>
		</nav>
	);
}

function Button({ onClick, children }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}
