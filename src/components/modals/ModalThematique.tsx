import React, { useState, useEffect } from 'react';
import ThematiqueInterface from './../../Interfaces/ThematiqueInterface';
import { useFetcher } from 'react-router-dom';

interface ModalThematiqueProps {
  isOpen: boolean;
  thematiqueToUpdate?: ThematiqueInterface | null;
  onClose: () => void;
}

const ModalThematique: React.FC<ModalThematiqueProps> = ({ isOpen, thematiqueToUpdate, onClose }) => {
  const [name, setName] = useState<string>('');
  const fetcher = useFetcher();

  const resetForm = () => {
    setName('');
  };

  // Pour récupérer les valeurs lors de la modification
  useEffect(() => {
    if (thematiqueToUpdate) {
      setName(thematiqueToUpdate.name);
    }
  }, [thematiqueToUpdate]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      //fetcher.submit(e.target as HTMLFormElement);

      if(thematiqueToUpdate) {
        // Mise à jour de la thématique
        fetcher.submit(new FormData(e.target as HTMLFormElement), {
          method: "post",
          action: `/update-thematique/${thematiqueToUpdate.id}`
      });
      } else {
        // Ajout de la thématique
        fetcher.submit(new FormData(e.target as HTMLFormElement), {
          method: "post",
          action: "/add-thematique"
      });
      }
      onClose();
      resetForm();
      //Rechargez la page après la soumission
      //NON OPTIMISER mais je n'ai pas réussie à mettre à jour l'état
      window.location.reload(); 

  } catch (error) {
      console.error("Erreur lors de l'ajout de la thématique':", error);
  }
};

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{thematiqueToUpdate ? 'Modifier la Thématique' : 'Ajouter une Thématique'}</h2>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <fetcher.Form action="/add-thematique" method="POST" onSubmit={ (e) => handleSubmit(e) }>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="thematique_name">Nom de la thématique</label>
                <input
                  type="text"
                  className="form-control"
                  id="thematique_name"
                  name="thematique_name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { onClose(); resetForm() }}>Annuler</button>
                <button type="submit" className="btn btn-primary">{thematiqueToUpdate ? "Sauvegarder" : "Ajouter"}</button>
              </div>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

export default ModalThematique;
