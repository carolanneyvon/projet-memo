import React from 'react';
import Card from './Card';
import ColumnInterface from './../../Interfaces/ColumnInterface';
import CardInterface from './../../Interfaces/CardInterface';

interface ColumnProps {
  column: ColumnInterface;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <section className="col">
      <div className="d-flex mb-2 mt-2 align-items-start">
        <button className="btn btn-success me-3">+</button>
        <h3>{column.label}</h3>
      </div>
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

    </section>
  );
};

export default Column;

//onClick={column.onClickShowModal}