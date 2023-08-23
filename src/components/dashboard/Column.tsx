import React from 'react';
import Card from './Card';
import ColumnInterface from './../../Interfaces/ColumnInterface';
import CardInterface from './../../Interfaces/CardInterface';

interface ColumnProps {
  column: ColumnInterface;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="column">
      <h3>{column.label}</h3>
      <div className="card-list">
        {/* Vérification que column.cards est bien une liste d'objets CardInterface */}
        {Array.isArray(column.cards) && column.cards.length > 0 ? (
          column.cards.map((card: CardInterface) => (
            <Card key={card.uid} card={card} />
          ))
        ) : (
          <p>Aucune carte disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Column;

