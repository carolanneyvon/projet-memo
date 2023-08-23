import React from 'react';

interface CardProps {
  question: string;
  answer: string;
}

function Card({ question, answer }: CardProps) {
  return (
    <div className="card">
      <h4>{question}</h4>
      <p>{answer}</p>
    </div>
  );
}

export default Card;
