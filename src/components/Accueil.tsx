import { useState, useEffect } from 'react';
import ThematiqueInterface from '../Interfaces/ThematiqueInterface';
import Thematique from './Thematique';
import DataThematique from '../services/DataThematique';

const Accueil = () => {
  const [thematiques, setThematiques] = useState<ThematiqueInterface[]>([]);

  useEffect(() => {
    DataThematique.getInstance().loadThematiques()
      .then(loadedThematiques => {
        setThematiques(loadedThematiques);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des thématiques :', error);
      });
  }, []);

  // TEST NOK => Pour mettre a jour l'Accueil 
  // Ajout d'une Thematique
  // const handleAddThematiqueToState = (newThematique: ThematiqueInterface) => {
  //   setThematiques(prevThematiques => [...prevThematiques, newThematique]);
  // };
  
  // Suppression d'une Thematique
  // const handleDeleteThematiqueFromState = (thematiqueId: number) => {
  //   setThematiques(prevThematiques => prevThematiques.filter(thematique => thematique.id !== thematiqueId));
  // };
  
  // Modifier une Thematique
  // const handleUpdateThematiqueInState = (updatedThematique: ThematiqueInterface) => {
  //   setThematiques(prevThematiques => prevThematiques.map(thematique => thematique.id === updatedThematique.id ? updatedThematique : thematique));
  // };
  

  return (
    <div className="mt-5">
    <h2 className="text-center">Liste des thématiques</h2>
    <Thematique 
      // onAddThematique={handleAddThematiqueToState}
      // onDeleteThematique={handleDeleteThematiqueFromState}
      // onUpdateThematique={handleUpdateThematiqueInState} 
    />
    </div>
    );
}

export default Accueil;