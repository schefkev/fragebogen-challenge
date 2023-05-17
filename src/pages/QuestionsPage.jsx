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

      if (currentIteration) {
        currentIteration.answers = iterationAnswers;
        currentIteration.completed = true;
      }

      setIterations(iterationsCopy);
      localStorage.setItem('iterations', JSON.stringify(iterationsCopy));

      onComplete(iterationAnswers);
      navigate('/');
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
        navigate('/');
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const nextButtonColor = isLastQuestion ? 'bg-green-500' : 'bg-indigo-500';
  const nextButtonText = isLastQuestion ? 'Iteration beenden' : 'Nächste Frage';

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
            <ul>
              {currentQuestion.answers.map((answer) => (
                <li key={answer.id} className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAnswers[currentQuestionIndex].includes(
                        answer.id,
                      )}
                      onChange={() => handleAnswerSelect(answer.id)}
                      className="mr-2 form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="text-gray-800">{answer.text}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-8">
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg"
              >
                Abbrechen
              </button>
              <button
                onClick={handleNextClick}
                className={`${nextButtonColor} hover:${nextButtonColor.replace(
                  '500',
                  '600',
                )} text-white py-2 px-4 rounded-lg shadow-lg`}
              >
                {nextButtonText}
              </button>
            </div>
          </div>
          <div className="bg-blue-200 px-6 py-4">
            <p className="text-sm text-gray-500">
              Frage {currentQuestionIndex + 1} von {questions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
