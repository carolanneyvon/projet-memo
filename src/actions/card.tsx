import DataCard from '../services/DataCard';
import {ActionFunctionArgs} from 'react-router-dom';
import CardInterface from './../Interfaces/CardInterface';
import { v4 as uuidv4 } from 'uuid';

interface ExtendedActionFunctionArgs extends ActionFunctionArgs {
  thematiqueId: number;
  columnId: number;
}


// Ajouter une carte
export const addCardAction = async({request, thematiqueId, columnId}: ExtendedActionFunctionArgs) => {
  console.log(`Dans addCardAction`);
  // chargement des données qui sont issues du formulaire
  const formData = await request.formData();
  const card_question = formData.get("card_question") as string;
  const card_answer = formData.get("card_answer") as string;
  
  // Création d'un identifiant unique pour la nouvelle carte
  const newCard: CardInterface = {
    id: 0,  
    uid: uuidv4(), // Génére un uid
    question: card_question,
    answer: card_answer,
    column: columnId,
    selected: false,
    tid: thematiqueId
  };

  await DataCard.addCard(newCard);
  return null;
}

// export const deleteCardAction = (id: number) => async (dispatch: any) => {
//   try {
//     await DataCard.deleteCard(id);
//     dispatch({ type: 'DELETE_CARD', payload: id });
//   } catch (error) {
//     console.error('Failed to delete card:', error);
//   }
// };

// export const updateCardAction = (id: number, updatedData: any) => async (dispatch: any) => {
//   try {
//     const updatedCard = await DataCard.updateCard(id, updatedData);
//     dispatch({ type: 'UPDATE_CARD', payload: updatedCard });
//   } catch (error) {
//     console.error('Failed to update card:', error);
//   }
// };
