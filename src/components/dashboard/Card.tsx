import React from 'react';
import CardInterface from './../../Interfaces/CardInterface';
import { Trash, Pencil } from 'react-bootstrap-icons';

interface CardProps {
  card: CardInterface;
  onDelete: (cardId: number) => void;
  onUpdate: (cardId: number, updatedData: { question: string; answer: string }) => void;
}

const Card: React.FC<CardProps> = ({ card, onDelete, onUpdate }) => {
  return (
    <article className=" mb-4 rounded p-3  ">
      <div className="card d-flex gap-3 justify-content-center align-items-center">
        <div className="card-body">
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
            onClick={() => onUpdate(card.id, { question: card.question, answer: card.answer })}
            className="" 
          />
        </div>
      </div>
    </article>
  );
};

export default Card;

// <h5 onClick={() => { setAnswerShown(!is_answer_shown) }}>{props.card.question}</h5>
// {is_answer_shown && (
//   <p>{props.card.reponse}</p>
// )}

