import React, { useState } from 'react';
import Card from './Card';
import ColumnInterface from './../../Interfaces/ColumnInterface';
import CardInterface from './../../Interfaces/CardInterface';
import Modal from './../Modal';
import DataCard from './../../services/DataCard';
import { v4 as uuidv4 } from 'uuid';

interface ColumnProps {
  column: ColumnInterface;
  thematiqueId: number;
}

const Column: React.FC<ColumnProps> = ({ column, thematiqueId }) => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleAddCard = (cardData: { question: string, answer: string }) => {
    console.log("Dans handleAddCard", cardData);
    const newCardData = {
      ...cardData,
      uid: uuidv4(),
      column: column.id,
      tid: thematiqueId
    };
    console.log("Nouvelles carte :", newCardData);

    DataCard.addCard(newCardData)
    .then(newCard => {
      console.log("Carte ajoutée :", newCard);
      setCards([...cards, newCard]);
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout de la carte", error);
    });
  };

  return (
    <section className="col">
      <div className="d-flex mb-2 mt-2 align-items-start">
        <button className="btn btn-success me-3" onClick={showModal}>+</button>
        <h3>{column.label}</h3>
      </div>
      <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)} onSubmit={handleAddCard} />
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