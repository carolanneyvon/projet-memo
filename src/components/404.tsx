import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '72px' }}>404</h1>
      <p style={{ fontSize: '24px' }}>Page Non trouvée</p>
      <p>La page que vous recherchez a peut-être été supprimée, son nom a changé ou est temporairement indisponible.</p>
      <a href="/" style={{ marginTop: '20px', textDecoration: 'none', color: '#007BFF', cursor: 'pointer' }}>Retour à l'accueil</a>
    </div>
  );
}

export default NotFound;
