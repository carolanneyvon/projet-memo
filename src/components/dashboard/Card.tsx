import React from 'react';
import CardInterface from './../../Interfaces/CardInterface';

interface CardProps {
  card: CardInterface;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{card.question}</h5>
        <p className="card-text">{card.answer}</p>
      </div>
    </div>
  );
};

export default Card;

