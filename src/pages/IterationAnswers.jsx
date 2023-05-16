import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function IterationAnswers({ iterations, questions }) {
  const { id } = useParams();
  const iteration = iterations.find((iteration) => iteration.id === Number(id));
  const { title, date, answers } = iteration;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Übersicht der Antworten</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4">
            <p className="text-gray-600 mb-2">Iteration: {title}</p>
            <p className="text-gray-600 mb-2">Erstellt: {date}</p>
            <p className="text-gray-600 mb-4">Antworten:</p>
            <ul>
              {answers.map((answer, index) => {
                const question = questions.find(
                  (q) => q.id === answer.questionId,
                );
                if (!question) {
                  console.error(
                    `Question with ID ${answer.questionId} not found.`,
                  );
                  return null;
                }
                return (
                  <li key={index} className="mb-4">
                    <p className="text-lg font-medium mb-2">
                      {question.question}
                    </p>
                    <ul className="list-disc ml-4">
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
                        return (
                          <li key={index} className="text-gray-600 mb-1">
                            {selectedAnswer.text}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
