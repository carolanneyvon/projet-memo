import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="text-white m-0 p-0">MeMo</h1>
        <nav>
        <ul className="list-unstyled d-flex m-0 p-0">
          <li className="mx-3"><Link to="/" className="text-white text-decoration-none">Accueil</Link></li>
          <li><Link to="/login" className="text-white text-decoration-none">Connexion</Link></li>
        </ul>
      </nav>
      </div>
    </header>
  );
}

export default Header;