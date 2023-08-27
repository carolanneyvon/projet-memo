import React from 'react';
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
  return (
    <article className=" mb-4 rounded p-3  ">
      <div className="card d-flex gap-3">
        <div className="d-flex justify-content-between">
          <button
            className={`arrowButton ${columnIndex === 1 ? 'hidden' : ''}`}
            onClick={() => onMove(card, 'left')}
            disabled={columnIndex === 1}
          >
            <ChevronLeft />
          </button>
          <button
            className={`arrowButton ${columnIndex === dernierIndex + 1 ? 'hidden' : ''}`}
            onClick={() => onMove(card, 'right')}
            disabled={columnIndex === dernierIndex + 1}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{card.question}</h5>
          <p className="card-text">{card.answer}</p>
        </div>

        <div className=" gap-3 d-flex my-3 justify-content-around align-items-center">
          <Trash role="button" onClick={() => onDelete(card.id)}
          />
          <button
            // onClick={() => { }}
            className="btn btn-warning">Proposer une réponse
          </button>
          <Pencil role="button"
            onClick={() => onUpdate(card)}
            className=""
          />
        </div>
      </div>
    </article>
  );
};

export default Card;

