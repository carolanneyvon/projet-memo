import { useState, useEffect } from 'react';
import Column from './Column';
import DataColumn from './../../services/DataColumn';
import ColumnInterface from './../../Interfaces/ColumnInterface';
import { useParams } from 'react-router-dom';
import CardInterface from './../../Interfaces/CardInterface';
import DataCard from '../../services/DataCard';
import DataThematique from '../../services/DataThematique';


const Dashboard = () => {
  // Récupère l'ID de la thématique depuis les paramètres d'URL
  const { thematiqueId } = useParams<{ thematiqueId: string }>(); 
  const [columns, setColumns] = useState<ColumnInterface[]>([]);
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [thematiqueName, setThematiqueName] = useState<string>('');

  useEffect(() => {
    DataColumn.loadColumns()
      .then(loadedColumns => {
        setColumns(loadedColumns);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des colonnes :', error);
      });
    }, []);

  useEffect(() => {
    // Charge les cartes spécifiques à la thématique
    if (thematiqueId) {
      DataThematique.getInstance().loadThematiqueName(Number(thematiqueId))
        .then(name => {
          if (name) {
            console.log("Nom de la thématique :", name);
            setThematiqueName(name);
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement du nom de la thématique :', error);
        });

      DataCard.loadCardsByThematiqueId(Number(thematiqueId))
      .then(loadedCards => {
        setCards(loadedCards);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des cartes :', error);
      });
    }
  }, [thematiqueId]);

  // Pour mettre a jour Dashboard =
  // Ajout d'une carte
  const handleAddCardToState = (newCard: CardInterface) => {
    setCards(prevCards => [...prevCards, newCard]);
  };
  // Suppression d'une carte
  const handleDeleteCardFromState = (cardId: number) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };
  // Modifier une carte
  const handleUpdateCardInState = (updatedCard: CardInterface) => {
    setCards(prevCards => prevCards.map(card => card.uid === updatedCard.uid ? updatedCard : card));
  };

  return (
    <section className="mx-3">
      <div className="mt-5">
        <h2 className="text-center my-3" >Thématique {thematiqueName ? '=> ' + thematiqueName : ''}</h2>
      </div>
        <div className="row">
        {columns.map(column => {
          const cardsForColumn = cards.filter((card) => card.column === column.id);
          const numericThematiqueId = Number(thematiqueId);

          return (
            <Column 
              key={column.id} 
              column={{ ...column, cards: cardsForColumn }} 
              thematiqueId={numericThematiqueId}
              onAddCard={handleAddCardToState}
              onDeleteCard={handleDeleteCardFromState}
              onUpdateCard={handleUpdateCardInState}
            />
          );
        })}
        </div>
    </section>
  );
};

export default Dashboard;
