import React, { useState } from 'react';
import Card from './Card';
import ColumnInterface from './../../Interfaces/ColumnInterface';
import CardInterface from './../../Interfaces/CardInterface';
import ModalCard from '../modals/ModalCard';
import DataCard from './../../services/DataCard';
import { v4 as uuidv4 } from 'uuid';

interface ColumnProps {
  column: ColumnInterface;
  thematiqueId: number;
  onAddCard: (card: CardInterface) => void;
  onDeleteCard: (cardId: number) => void;
  onUpdateCard: (updatedCard: CardInterface) => void;
  onMove: (card: CardInterface, direction: 'left' | 'right') => void;
  dernierIndex: number;
  columnIndex: number;
}

const Column: React.FC<ColumnProps> = ({ column, thematiqueId, onAddCard, onDeleteCard, onUpdateCard, onMove, dernierIndex}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<CardInterface | null>(null);

  const showModal = (cardToUpdate?: CardInterface) => {
    setModalVisible(true);
    setCurrentCard(cardToUpdate || null);
  };

  // Ajouter une carte
  const handleAddCard = (cardData: { question: string, answer: string }) => {
    console.log("Dans handleAddCard", cardData);
    const newCardData = {
      id:0,
      uid: uuidv4(),
      ...cardData,
      column: column.id,
      selected: false,
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

  // Mettre à jour une carte
  const handleUpdateCard = async (updatedCardData: Partial<CardInterface>) => {
    console.log("Dans handleUpdateCard");
    if (typeof updatedCardData.id !== 'number') {
      throw new Error('ID manquant pour la mise à jour de la carte');
  }
    await DataCard.updateCard(updatedCardData.id, updatedCardData);
    onUpdateCard(updatedCardData as CardInterface);
  };
  
  // Supprimer une carte
  const handleDeleteCard = (cardId: number) => {
    console.log("Dans handleDeleteCard");
    // Sinon faire une nouvelle Modal pour confirmer la suppression
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte?")) {
      DataCard.deleteCard(cardId)
        .then(() => {
          onDeleteCard(cardId);
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de la carte", error);
        });
      }
  };

  // Deplacer une carte
  const onMoveCard = (movedCard: CardInterface, direction: 'left' | 'right') => {
    onMove(movedCard, direction);
  };

  
  return (
    <section className="col">
      <div className="d-flex mb-2 mt-2 align-items-start">
        <button className="btn btn-success me-3" onClick={() => showModal()}>+</button>
        <h3>{column.label}</h3>
      </div>
      <ModalCard 
        isOpen={isModalVisible} 
        onClose={() => { 
          setModalVisible(false);
          // CurrentCard sera à null lors de la fermeture de la modale
          setCurrentCard(null);  
        }} 
        onSubmit={handleAddCard} 
        cardToUpdate ={currentCard}
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
              onUpdate={() => showModal(card)}
              columnIndex={column.id}
              dernierIndex={dernierIndex}
              onMove={onMoveCard}
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