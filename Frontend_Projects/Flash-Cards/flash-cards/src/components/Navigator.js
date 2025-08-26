import questions from '../data';
import Button from './Button';
export default function Navigator({
	onShowHide,
	onPrevious,
	onNext,
	isHidden,
	visibleCard,
}) {
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
