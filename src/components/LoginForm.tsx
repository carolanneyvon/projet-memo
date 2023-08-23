import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import DataUser from './../services/DataUser';

function LoginForm() {
  const navigate  = useNavigate() as any;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await DataUser.loginUser(username, password);
      
      if (user) {
        console.log("Utilisateur connecté :", user);
        // Utilisateur trouvé, rediriger vers la page home
        navigate('/');
      } else {
        console.log("Identifiants incorrects");
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="w-50">
        <h2 className="text-center mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-3">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
