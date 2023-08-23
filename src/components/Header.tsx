import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-secondary p-3">
      <div className="d-flex justify-content-center align-items-end">
        <h1 className="text-white m-0 p-0">MeMo</h1>
        <nav>
        <ul>
          <li><Link to="/" >Accueil</Link></li>
          <li><Link to="/login" >Connexion</Link></li>
        </ul>
      </nav>
      </div>
    </header>
  );
}

export default Header;