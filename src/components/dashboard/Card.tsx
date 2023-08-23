import React from 'react';
import CardInterface from './../../Interfaces/CardInterface';
import { Trash, Pencil } from 'react-bootstrap-icons';

interface CardProps {
  card: CardInterface;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <article className=" mb-4 rounded p-3  ">
      <div className="card d-flex gap-3 justify-content-center align-items-center">
        <div className="card-body">
          <h5 className="card-title">{card.question}</h5>
          
          <p className="card-text">{card.answer}</p>
        </div>
        <div className=" gap-3 d-flex my-3 justify-content-around align-items-center">
          <Trash role="button"
          //onClick={() => { onClickDeleteCard(props.index_column, props.index_card) }}
          />
          <button
            // onClick={() => { onClickDeleteCard(props.index_column, props.index_card) }}
            className="btn btn-warning">Proposer une réponse
          </button>
          <Pencil role="button"
            // onClick={() => { onClickUpdateCard(props.index_column, props.index_card) }}
            className="" />
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

