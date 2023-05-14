import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function IterationAnswers({ iterations, questions }) {
  const { id } = useParams();
  const iteration = iterations.find((iteration) => iteration.id === Number(id));
  const { title, date, answers } = iteration;

  return (
    <div>
      <Navbar />
      <h2>Antworten Übersicht</h2>
      <p>Iteration: {title}</p>
      <p>Erstellt: {date}</p>
      <p>Antworten:</p>
      <ul>
        {answers.map((answer, index) => {
          const question = questions.find((q) => q.id === answer.questionId);
          if (!question) {
            console.error(`Question with ID ${answer.questionId} not found.`);
            return null;
          }
          return (
            <li key={index}>
              <p>Frage: {question.question}</p>
              <ul>
                {answer.answerIds.map((answerId, index) => {
                  const selectedAnswer = question.answers.find(
                    (a) => a.id === answerId,
                  );
                  if (!selectedAnswer) {
                    console.error(
                      `Answer with ID ${answerId} not found for question ${question.id}.`,
                    );
                    return null;
                  }
                  return <li key={index}>{selectedAnswer.text}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
