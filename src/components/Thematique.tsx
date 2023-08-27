import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThematiqueInterface from './../Interfaces/ThematiqueInterface';
import DataThematique from './../services/DataThematique';
import { Trash, Pencil } from 'react-bootstrap-icons';
import ModalThematique from './modals/ModalThematique';
import { useFetcher } from 'react-router-dom';

interface ThematiqueProps {
  // TEST pour mettre à jour la page d'accueil
  // onAddThematique: (newThematique: ThematiqueInterface) => void;
  // onDeleteThematique: (thematiqueId: number) => void;
  // onUpdateThematique: (updatedThematique: ThematiqueInterface) => void;
}

const Thematique: React.FC<ThematiqueProps> = () => {
  const [thematiques, setThematiques] = useState<ThematiqueInterface[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedThematique, setSelectedThematique] = useState<ThematiqueInterface | null>(null);
  const fetcher = useFetcher();
  const navigate  = useNavigate() as any;
  
  const showModal = (thematiqueToUpdate?: ThematiqueInterface) => {
    setModalOpen(true);
    setSelectedThematique(thematiqueToUpdate || null);
  };

  const onClose = () => {
    setModalOpen(false);
    setSelectedThematique(null);
  }

  const handleDelete = async (thematiqueId: number) => {
    try {
      await fetcher.submit(
        {},
        {
          method: "delete",
          action: `/delete-thematique/${thematiqueId}`
        });
      // OK fonctionne sans passer par l'action
      //await fetch(`http://localhost:3001/terms/${thematiqueId}`, { method: 'DELETE' });

      // Requête pour mettre à jour la liste des thématiques
      const updatedThematiques = thematiques.filter(t => t.id !== thematiqueId);
      setThematiques(updatedThematiques);
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la suppression de la thématique:", error);
    }
  };
  

  useEffect(() => {
    // Récupération des données
    const fetchData = async () => {
      try {
        const thematiquesData = await DataThematique.getInstance().loadThematiques();
        setThematiques(thematiquesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des thématiques :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-3">
      <button className="btn btn-success me-3" onClick={() => showModal()}>+</button>
      <ModalThematique 
                isOpen={isModalOpen} 
                thematiqueToUpdate={selectedThematique} 
                onClose={onClose}
            />
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
      <Trash className="m-2" role="button" onClick={() => handleDelete(thematique.id)} />
      <Pencil className="m-2" role="button" onClick={() => showModal(thematique)} />
    </div>
  ))}
    </div>
  );
}

export default Thematique;
