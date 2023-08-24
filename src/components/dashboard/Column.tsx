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
  onAddCard: (card: CardInterface) => void;
  onDeleteCard: (cardId: number) => void;
  onUpdateCard: (updatedCard: CardInterface) => void;
}

const Column: React.FC<ColumnProps> = ({ column, thematiqueId, onAddCard, onDeleteCard, onUpdateCard }) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentCardToUpdate, setCurrentCardToUpdate] = useState<CardInterface | null>(null);


  const showModal = () => {
    setModalVisible(true);
  };

  const showUpdateModal = (cardId: number, updatedData: { question: string; answer: string }) => {
    const card: CardInterface = {
      ...updatedData,
      uid: uuidv4(),
      column: column.id,
      tid: thematiqueId,
      id: cardId,
    };
    setCurrentCardToUpdate(card);
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
      onAddCard(newCard); // informe Dashboard de la nouvelle carte
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout de la carte", error);
    });
  };

  const handleDeleteCard = (cardId: number) => {
    DataCard.deleteCard(cardId)
      .then(() => {
        onDeleteCard(cardId);
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de la carte", error);
      });
  };

  const handleUpdateCard = (cardId: number, updatedData: { question: string, answer: string }) => {
    DataCard.updateCard(cardId, updatedData)
      .then(updatedCard => {
        onUpdateCard(updatedCard);
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de la carte", error);
      });
  };

  return (
    <section className="col">
      <div className="d-flex mb-2 mt-2 align-items-start">
        <button className="btn btn-success me-3" onClick={showModal}>+</button>
        <h3>{column.label}</h3>
      </div>
      <Modal 
        isOpen={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        onSubmit={handleAddCard} 
        cardToUpdate={currentCardToUpdate}
        onUpdateCard={handleUpdateCard}
      />
      <div className="card-list">
        {/* Vérification que column.cards est bien une liste d'objets CardInterface */}
        {Array.isArray(column.cards) && column.cards.length > 0 ? (
          column.cards.map((card: CardInterface) => (
            <Card 
              key={card.uid} 
              card={card}
              onDelete={handleDeleteCard}
              onUpdate={showUpdateModal}
            />
          ))
        ) : (
          <p>Aucune carte disponible.</p>
        )}
      </div>

    </section>
  );
};

export default Column;