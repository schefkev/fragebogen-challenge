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
    <div>
      <h1>Security Fragebogen</h1>
      <h4>Neue Iteration erstellen</h4>
      <div>
        <input
          type="text"
          placeholder="Iterations Titel"
          value={title}
          onChange={handleTitleChange}
        />
        <button onClick={handleCreateIteration}>Neue Iteration Starten</button>
      </div>
      <IterationsOverview iterations={iterations} showNavbar={false} />
    </div>
  );
}
