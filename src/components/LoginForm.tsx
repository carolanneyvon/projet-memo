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
      <div>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom d'utilisateur:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
  );
}

export default LoginForm;
