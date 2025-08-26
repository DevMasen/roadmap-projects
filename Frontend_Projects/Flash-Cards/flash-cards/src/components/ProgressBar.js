import questions from '../data.js';
export default function ProgressBar({ visibleCard }) {
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
