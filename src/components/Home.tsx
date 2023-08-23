import { useState, useEffect } from 'react';
import ThematiqueInterface from './../Interfaces/ThematiqueInterface';
import Thematique from './Thematique';
import DataThematique from './../services/DataThematique';

const Home = () => {
  const [thematiques, setThematiques] = useState<ThematiqueInterface[]>([]);

  useEffect(() => {
    DataThematique.loadThematiques()
      .then(loadedThematiques => {
        setThematiques(loadedThematiques);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des thématiques :', error);
      });
  }, []);

  return (
    <div>
    <h2>Page d'accueil</h2>
    <Thematique  />
    </div>
    );
}

export default Home;