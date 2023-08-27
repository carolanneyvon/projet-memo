import React, { useState } from 'react';
import CardInterface from './../../Interfaces/CardInterface';
import { Trash, Pencil, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface CardProps {
  card: CardInterface;
  onDelete: (cardId: number) => void;
  onUpdate: (card: CardInterface) => void;
  columnIndex: number;
  dernierIndex: number;
  onMove: (card: CardInterface, direction: 'left' | 'right') => void;
}

const Card: React.FC<CardProps> = ({ card, onDelete, onUpdate, columnIndex, dernierIndex, onMove }) => {
  // État pour gérer la visibilité de la réponse
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const toggleAnswer = () => {
    setIsAnswerVisible(prevVisibility => !prevVisibility);
  };

  return (
    <article className=" mb-4 rounded p-3  ">
      <div className="card d-flex gap-3">
        <div className="d-flex mt-3 align-items-center justify-content-between">
          <button
            className={`arrowButton ${columnIndex === 1 ? 'hidden' : ''}`}
            onClick={() => onMove(card, 'left')}
            disabled={columnIndex === 1}
          >
            <ChevronLeft />
          </button>
          <h5 className="card-title">{card.question}</h5>
          <button
            className={`arrowButton ${columnIndex === dernierIndex + 1 ? 'hidden' : ''}`}
            onClick={() => onMove(card, 'right')}
            disabled={columnIndex === dernierIndex + 1}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="text-center">
          {/* Afficher le texte de la réponse seulement si isAnswerVisible est vrai */}
          {isAnswerVisible && <p className="card-text">{card.answer}</p>}
        </div>

        <div className=" gap-3 d-flex my-3 justify-content-around align-items-center">
          <Trash
            className="icon-hover"
            role="button"
            onClick={() => onDelete(card.id)}
          />
          <button
            onClick={toggleAnswer}
            className={`btn ${isAnswerVisible ? 'btn-secondary' : 'btn-warning'}`}>
            {isAnswerVisible ? 'Cacher la réponse' : 'Montrer la réponse'}
          </button>
          <Pencil
            className="icon-hover"
            role="button"
            onClick={() => onUpdate(card)}
          />
        </div>
      </div>
    </article>
  );
};

export default Card;