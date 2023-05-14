import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function QuestionsPage({ questions, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    questions.map(() => []),
  );

  const [iterations, setIterations] = useState(
    JSON.parse(localStorage.getItem('iterations')) || [],
  );

  const navigate = useNavigate();

  const handleAnswerSelect = (answerId) => {
    const currentSelectedAnswers = selectedAnswers[currentQuestionIndex];
    const newSelectedAnswers = [...selectedAnswers];
    if (currentSelectedAnswers.includes(answerId)) {
      newSelectedAnswers[currentQuestionIndex] = currentSelectedAnswers.filter(
        (id) => id !== answerId,
      );
    } else {
      newSelectedAnswers[currentQuestionIndex] = [
        ...currentSelectedAnswers,
        answerId,
      ];
    }
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextClick = () => {
    const currentSelectedAnswers = selectedAnswers[currentQuestionIndex];
    if (currentSelectedAnswers.length === 0) {
      alert('Bitte wählen Sie mindestens eine Antwort aus.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const iterationAnswers = questions.map((question, index) => {
        return {
          questionId: question.id,
          answerIds: selectedAnswers[index],
        };
      });

      const iterationsCopy = [...iterations];
      const currentIteration = iterationsCopy[iterationsCopy.length - 1];
      currentIteration.answers = iterationAnswers;
      currentIteration.completed = true;

      setIterations(iterationsCopy);
      localStorage.setItem('iterations', JSON.stringify(iterationsCopy));

      onComplete(iterationAnswers);
    }
  };

  const handleCancelClick = () => {
    if (
      window.confirm(
        'Sind Sie sicher, dass Sie die Iteration abbrechen möchten?',
      )
    ) {
      const storedIterations =
        JSON.parse(localStorage.getItem('iterations')) || [];
      const lastIteration = storedIterations[storedIterations.length - 1];
      if (lastIteration && !lastIteration.completed) {
        lastIteration.completed = false;
        lastIteration.answers = [];
        localStorage.setItem('iterations', JSON.stringify(storedIterations));
        navigate('/iterations/view');
      } else {
        navigate('/');
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Navbar />
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.answers.map((answer) => (
          <li key={answer.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedAnswers[currentQuestionIndex].includes(
                  answer.id,
                )}
                onChange={() => handleAnswerSelect(answer.id)}
              />
              {answer.text}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNextClick}>
        {currentQuestionIndex < questions.length - 1
          ? 'Nächste Frage'
          : 'Iteration beenden'}
      </button>
      <button onClick={handleCancelClick}>Abbrechen</button>
    </div>
  );
}
