import React, { useState } from 'react';
import { addThematiqueAction, updateThematiqueAction } from '../../actions/thematique';
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
  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{thematiqueToUpdate ? 'Modifier la Thématique' : 'Ajouter une Thématique'}</h2>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <fetcher.Form action="/add-term" method="POST">
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="thematique_name">Nom de la thématique</label>
                <input
                  type="text"
                  className="form-control"
                  id="thematique_name"
                  name="thematique_name"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { onClose(); resetForm() }}>Annuler</button>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </div>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

export default ModalThematique;


//<button type="submit" className="btn btn-primary">{thematiqueToUpdate ? "Sauvegarder" : "Ajouter"}</button>