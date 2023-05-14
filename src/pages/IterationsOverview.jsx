import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function IterationsOverview({ showNavbar }) {
  const [iterations, setIterations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIterations =
      JSON.parse(localStorage.getItem('iterations')) || [];
    setIterations(storedIterations);
  }, []);

  const handleIterationClick = (iteration) => {
    navigate(`/iterations/${iteration.id}`);
  };

  const handleIterationDelete = (iteration) => {
    const updatedIterations = iterations.filter(
      (item) => item.id !== iteration.id,
    );
    setIterations(updatedIterations);
    localStorage.setItem('iterations', JSON.stringify(updatedIterations));
    localStorage.removeItem(`iteration-${iteration.id}`);
  };

  return (
    <div>
      {showNavbar && <Navbar />}
      <h2>Iterations Überblick</h2>
      <ul>
        {iterations
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((iteration) => (
            <li key={iteration.id}>
              <p>{iteration.title}</p>
              <p>Erstellt: {iteration.date}</p>
              <p>
                Status:{' '}
                {iteration.completed ? 'Abgeschlossen' : 'Nicht Abgeschlossen'}
              </p>
              {iteration.completed && (
                <button onClick={() => handleIterationClick(iteration)}>
                  Antworten anzeigen
                </button>
              )}
              <button onClick={() => handleIterationDelete(iteration)}>
                Löschen
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
