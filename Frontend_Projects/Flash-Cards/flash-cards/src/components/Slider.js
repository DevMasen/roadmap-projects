import CardList from './CardList';
import Navigator from './Navigator';
export default function Slider({
	visibleCard,
	isHidden,
	onShowHide,
	onNext,
	onPrevious,
}) {
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
