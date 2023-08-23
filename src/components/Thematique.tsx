import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThematiqueInterface from './../Interfaces/ThematiqueInterface';
import DataThematique from './../services/DataThematique';
import { Trash, Pencil } from 'react-bootstrap-icons';

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
    <div className="d-flex justify-content-center mt-3">
      {thematiques.map(thematique => (
    <div
      key={thematique.id}
      className="d-flex justify-content-center align-items-center bg-info rounded mx-2 p-2"
    >
      <Link 
        to={`/dashboard/${thematique.id}`} 
        className="btn btn-info"
      >
        {thematique.name}
      </Link> |{" "}
      <Trash className="m-2" role="button" />
      <Pencil className="m-2" role="button" />
    </div>
  ))}
    </div>
  );
}

export default Thematique;
