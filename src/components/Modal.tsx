import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: { question: string, answer: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handleSubmit = () => {
    onSubmit({ question, answer });
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
