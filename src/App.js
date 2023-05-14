import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import questions from './components/Questions';
import HomePage from './pages/HomePage';
import IterationAnswers from './pages/IterationAnswers';
import IterationsOverview from './pages/IterationsOverview';
import QuestionsPage from './pages/QuestionsPage';

export default function App() {
  const [iterations, setIterations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIterations =
      JSON.parse(localStorage.getItem('iterations')) || [];
    setIterations(storedIterations);
  }, []);

  const handleIterationCreate = (newIteration) => {
    const updatedIterations = [...iterations, newIteration];
    localStorage.setItem('iterations', JSON.stringify(updatedIterations));
    setIterations(updatedIterations);
  };

  const handleIterationComplete = (selectedAnswers) => {
    const storedIterations =
      JSON.parse(localStorage.getItem('iterations')) || [];
    const lastIteration = storedIterations[storedIterations.length - 1];

    const allQuestionsAnswered = questions.every((question) => {
      return selectedAnswers.some((selectedAnswer) => {
        return selectedAnswer.questionId === question.id;
      });
    });

    if (lastIteration && !lastIteration.completed && allQuestionsAnswered) {
      lastIteration.completed = true;
      lastIteration.answers = selectedAnswers
        .map((selectedAnswer) => {
          const question = questions.find(
            (q) => q.id === parseInt(selectedAnswer.questionId),
          );
          const answer = question.answers.find(
            (a) => a.id === parseInt(selectedAnswer.answerId),
          );
          if (!question) {
            console.error(
              `Question with ID ${selectedAnswer.questionId} not found.`,
            );
            return null;
          }
          if (!answer) {
            console.error(
              `Answer with ID ${selectedAnswer.answerId} not found for question ${question.id}.`,
            );
            return null;
          }
          return { id: answer.id, text: answer.text };
        })
        .filter((answer) => answer !== null);
    } else if (!lastIteration || lastIteration.completed) {
      console.error('No incomplete iteration found');
    }

    localStorage.setItem('iterations', JSON.stringify(storedIterations));
    setIterations(storedIterations);
    navigate('/iterations/view');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            iterations={iterations}
            onIterationCreate={handleIterationCreate}
          />
        }
      />
      <Route
        path="/questions"
        element={
          <QuestionsPage
            questions={questions}
            onComplete={handleIterationComplete}
          />
        }
      />
      <Route
        path="/iterations/:id"
        element={
          <IterationAnswers iterations={iterations} questions={questions} />
        }
      />
      <Route
        path="/iterations/view"
        element={<IterationsOverview iterations={iterations} />}
      />
    </Routes>
  );
}
