export default function Card({ question, answer, isHidden }) {
	return (
		<li className={`card ${!isHidden ? 'show' : ''}`}>
			<h2 className="question">{question}</h2>
			<p className="answer">{answer}</p>
		</li>
	);
}
