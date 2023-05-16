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
    <div className="">
      {showNavbar && <Navbar />}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Iterations Überblick</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {iterations
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((iteration) => (
              <div
                key={iteration.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden p-4 hover:bg-blue-200"
              >
                <p className="text-lg font-medium mt-2 mb-4">
                  {iteration.title}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Erstellt: {iteration.date}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Status:{' '}
                  <span
                    className={`text-sm font-medium ${
                      iteration.completed ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {iteration.completed
                      ? 'Abgeschlossen'
                      : 'Nicht Abgeschlossen'}
                  </span>
                </p>
                {iteration.completed && (
                  <button
                    onClick={() => handleIterationClick(iteration)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md mr-2 hover:bg-blue-700"
                  >
                    Antworten anzeigen
                  </button>
                )}
                <button
                  onClick={() => handleIterationDelete(iteration)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                >
                  Löschen
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
