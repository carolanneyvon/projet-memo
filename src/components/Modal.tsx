import React, { useState, useEffect } from 'react';
import CardInterface from './../Interfaces/CardInterface';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: { question: string, answer: string }) => void;
  // Pour la mise à jour de la carte
  onUpdateCard?: (cardId: number, updatedData: { question: string; answer: string; }) => void;
  cardToUpdate?: CardInterface | null;
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
  
  const handleSubmit  = () => {
    if (cardToUpdate && onUpdateCard) {
      // Update logic here
      onUpdateCard(cardToUpdate.id, { question, answer });
    } else {
      onSubmit({ question, answer });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="">
      <div className="">
        <button onClick={onClose}>X</button>
        <h3>Créer une carte</h3>
        <div>
          <label>Question :</label>
          <input value={question} onChange={e => setQuestion(e.target.value)} />
        </div>
        <div>
          <label>Réponse :</label>
          <input value={answer} onChange={e => setAnswer(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Valider</button>
        <button onClick={onClose}>Annuler</button>
      </div>
    </div>



  );
};

export default Modal;
