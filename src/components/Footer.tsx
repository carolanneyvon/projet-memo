import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center py-3">
      <Link to="/about">A propos</Link> |{" "}
      <Link to="/">Liste des thématiques</Link>
    </footer>
  );
}

export default Footer;