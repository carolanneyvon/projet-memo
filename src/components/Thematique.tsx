import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThematiqueInterface from './../Interfaces/ThematiqueInterface';
import DataThematique from './../services/DataThematique';

interface ThematiqueProps {
}

const Thematique: React.FC<ThematiqueProps> = () => {
  const [thematiques, setThematiques] = useState<ThematiqueInterface[]>([]);

  useEffect(() => {
    // Récupération des données
    const fetchData = async () => {
      try {
        const thematiquesData = await DataThematique.loadThematiques();
        setThematiques(thematiquesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des thématiques :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <ul>
        {thematiques.map(thematique => (
          <li key={thematique.id}>
          <Link to={`/dashboard/${thematique.id}`}>{thematique.name}</Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Thematique;
