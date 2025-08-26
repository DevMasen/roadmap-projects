import { useState } from 'react';
import ProgressBar from './ProgressBar';
import Slider from './Slider';
export default function FlashCards() {
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
