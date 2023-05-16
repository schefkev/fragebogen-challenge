import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IterationsOverview from './IterationsOverview';

export default function HomePage({ iterations, onIterationCreate }) {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCreateIteration = (event) => {
    event.preventDefault();
    const newIteration = {
      id: Date.now(),
      title: title,
      date: new Date().toLocaleDateString(),
      completed: false,
      answers: [],
    };
    onIterationCreate(newIteration);
    setTitle('');
    navigate('/questions');
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mt-6">
          Security Fragebogen
        </h1>
        <h3 className="text-lg font-medium mt-6">Neue Iteration erstellen</h3>
        <form className="border rounded-md bg-white shadow-md px-4 py-2 mb-12">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Iterations Titel"
              value={title}
              onChange={handleTitleChange}
              className="bg-transparent outline-none flex-grow"
            />
            <button
              onClick={handleCreateIteration}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 text-center"
            >
              Neue Iteration Starten
            </button>
          </div>
        </form>
      </div>
      <IterationsOverview iterations={iterations} showNavbar={false} />
    </div>
  );
}
