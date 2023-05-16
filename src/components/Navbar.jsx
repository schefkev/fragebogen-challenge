import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-800">
      <ul className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start h-16">
        <li>
          <Link to="/" className="flex items-center text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="text-sm">Zurück zur Homepage</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
