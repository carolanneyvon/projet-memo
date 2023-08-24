import DataCard from '../services/DataCard';
import {ActionFunctionArgs} from 'react-router-dom';
import CardInterface from './../Interfaces/CardInterface';
//import { v4 as uuidv4 } from 'uuid';

// Mettre à jour une carte
export const updateCardAction = async({ request, params  }: ActionFunctionArgs) => {
  console.log(`Dans updateCardAction`);
  // Données provenant du formulaire
  const formData = await request.formData();
  const cardId = Number(params.cardId);
  const card_question = formData.get("card_question") as string;
  const card_answer = formData.get("card_answer") as string;
  
  const updatedCard: Partial<CardInterface> = {
    question: card_question,
    answer: card_answer,
  };

  await DataCard.updateCard(cardId, updatedCard);
  return null;
}

// Supprimer une carte
export const deleteCardAction = async ({ request }: ActionFunctionArgs) => {
  console.log(`Dans deleteCardAction`);
  // chargement des données qui sont issues du formulaire
  const formData = await request.formData();
  const idCard = formData.get("card_id") as string;

  await DataCard.deleteCard(parseInt(idCard));
  window.location.reload();
  return null;
};


/**---------------------------------------------------------------------------- */
// NON UTILISE DANS LE PROJET, AJOUT DIRECTEMENT GERE PAR LES COMPONENTS 

// interface ExtendedActionFunctionArgs extends ActionFunctionArgs {
//   thematiqueId: number;
//   columnId: number;
// }

// // Ajouter une carte
// export const addCardAction = async({request, thematiqueId, columnId}: ExtendedActionFunctionArgs) => {
//   console.log(`Dans addCardAction`);
//   // chargement des données qui sont issues du formulaire
//   const formData = await request.formData();
//   const card_question = formData.get("card_question") as string;
//   const card_answer = formData.get("card_answer") as string;
  
//   // Création d'un identifiant unique pour la nouvelle carte
//   const newCard: CardInterface = {
//     id: 0,  
//     uid: uuidv4(), // Génére un uid
//     question: card_question,
//     answer: card_answer,
//     column: columnId,
//     selected: false,
//     tid: thematiqueId
//   };

//   await DataCard.addCard(newCard);
//   return null;
// }
/**---------------------------------------------------------------------------- */
