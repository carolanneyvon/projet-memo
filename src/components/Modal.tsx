import React, { useState, useEffect } from 'react';
import CardInterface from './../Interfaces/CardInterface';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: { question: string, answer: string }) => void;
  // Pour la mise à jour de la carte
  cardToUpdate?: CardInterface | null;
  // Pour accepter une partie de CardInterface.
  onUpdateCard?: (cardData:  Partial<CardInterface>) => void;

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, cardToUpdate, onUpdateCard }) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (cardToUpdate) {
      setQuestion(cardToUpdate.question);
      setAnswer(cardToUpdate.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [cardToUpdate]);

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
};


  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log("Dans handleFormSubmit");

    const cardData = { question, answer };
    if (cardToUpdate && onUpdateCard) {
      // Mise à jour de la carte
      onUpdateCard({ ...cardData, id: cardToUpdate.id, uid: cardToUpdate.uid, column: cardToUpdate.column, tid: cardToUpdate.tid });
    } else {
      // Ajout de la carte
      onSubmit(cardData);
    }
    onClose();
    resetForm();
  }
  
  if (!isOpen) return null;

  return (
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h2>{cardToUpdate ? "Mettre à jour la carte" : "Ajouter une carte"}</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form method="post" action={`/add-card`} onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="card_question">Question</label>
                                <input type="text" className="form-control" id="card_question" name="card_question" value={question} onChange={e => setQuestion(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="card_answer">Réponse</label>
                                <input type="text" className="form-control" id="card_answer" name="card_answer" value={answer} onChange={e => setAnswer(e.target.value)}/>
                            </div>
                            <div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { onClose(); resetForm(); }}>Annuler</button>
                                <button type="submit" className="btn btn-primary">{cardToUpdate ? "Sauvegarder" : "Ajouter"}</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Modal;
