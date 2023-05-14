import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Zurück zur Homepage</Link>
        </li>
      </ul>
    </nav>
  );
}
