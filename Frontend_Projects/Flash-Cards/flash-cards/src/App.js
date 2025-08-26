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
	const [visibleCard, setVisibleCard] = useState(0);
	const [isHidden, setIsHidden] = useState(true);
	function handleShowHide() {
		setIsHidden(!isHidden);
	}
	function handlePrevious() {
		setVisibleCard(cur => cur - 1);
		setIsHidden(true);
	}
	function handleNext() {
		setVisibleCard(cur => cur + 1);
		setIsHidden(true);
	}
	return (
		<div className="container">
			<h1 className="title">Flash Cards</h1>
			<ProgressBar visibleCard={visibleCard} />
			<Slider
				visibleCard={visibleCard}
				isHidden={isHidden}
				onShowHide={handleShowHide}
				onNext={handleNext}
				onPrevious={handlePrevious}
			/>
		</div>
	);
}

function ProgressBar({ visibleCard }) {
	const progressPercentage = Math.ceil(
		((visibleCard + 1) / questions.length) * 100
	);
	return (
		<div className="progress-bar">
			<div
				style={{ width: `${progressPercentage}%` }}
				className="progress"
			>
				{progressPercentage}%
			</div>
			<div className="counter">
				<span>{visibleCard + 1}</span>
				<span>of</span>
				<span>{questions.length}</span>
			</div>
		</div>
	);
}

function Slider({ visibleCard, isHidden, onShowHide, onNext, onPrevious }) {
	return (
		<div className="slider">
			<CardList isHidden={isHidden} visibleCard={visibleCard} />
			<Navigator
				onShowHide={onShowHide}
				onPrevious={onPrevious}
				onNext={onNext}
				isHidden={isHidden}
				visibleCard={visibleCard}
			/>
		</div>
	);
}

function CardList({ isHidden, visibleCard }) {
	return (
		<ul>
			{questions.map(
				(question, index) =>
					index === visibleCard && (
						<Card
							question={question.question}
							answer={question.answer}
							isHidden={isHidden}
							key={question.id}
						/>
					)
			)}
		</ul>
	);
}

function Card({ question, answer, isHidden }) {
	return (
		<li className={`card ${!isHidden ? 'show' : ''}`}>
			<h2 className="question">{question}</h2>
			<p className="answer">{answer}</p>
		</li>
	);
}

function Navigator({ onShowHide, onPrevious, onNext, isHidden, visibleCard }) {
	return (
		<nav className="nav">
			{visibleCard !== 0 && (
				<Button onClick={onPrevious}>⬅️ Previous</Button>
			)}
			<Button onClick={onShowHide}>
				{isHidden ? 'Show Answer' : 'Hide Answer'}
			</Button>
			{visibleCard !== questions.length - 1 && (
				<Button onClick={onNext}>Next ➡️</Button>
			)}
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
