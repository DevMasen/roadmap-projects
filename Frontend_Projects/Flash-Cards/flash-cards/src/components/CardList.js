import questions from '../data';
import Card from './Card';
export default function CardList({ isHidden, visibleCard }) {
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
