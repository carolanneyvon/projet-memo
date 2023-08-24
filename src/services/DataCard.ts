import CardInterface from './../Interfaces/CardInterface';

export default class DataCard {
  private static instance: DataCard;
  static url: string = "http://localhost:3001/cards";

   /**
   * Contrôle l'accès au constructeur pour n'utiliser qu'une seule instance
   * C'est le coeur du design patter singleton
   * @returns Data
   */
    public static getInstance(): DataCard {
      if (!DataCard.instance) {
        DataCard.instance = new DataCard();
      }
      return DataCard.instance;
    }

  /**
   * Récupère les cartes via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<CardInterface[]>
   */
  static async loadCards(): Promise<CardInterface[]> {
    return fetch(this.url)
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .catch(error => {
        console.error("Erreur attrapée dans loadCards", error)
      })
  }

  // Récupère les cartes en fonction de l'id de la thématique
  static async loadCardsByThematiqueId(thematiqueId: number): Promise<CardInterface[]> {
    return this.loadCards()
      .then(cards => cards.filter(card => card.tid === thematiqueId))
      .catch(error => {
        console.error("Erreur attrapée dans loadCardsByThematiqueId", error);
        throw error;
      });
  }


  // Ajouter une carte
  static async addCard (cardData: any): Promise<CardInterface> {
    return fetch(this.url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(cardData), 
      })
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .catch(error => {
        console.error(`Erreur attrapée dans le addCard : `, error);
      })
  }


  // Supprimer une carte
  static async deleteCard(card_id: number): Promise<void> {
    return fetch(this.url + "/" + card_id,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
      })
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .then((cards) => {
        return cards;
      })
      .catch(error => {
        console.error(`Erreur attrapée dans le deleteCard : `, error);
      })
  }

  // Modifier une carte
  static async updateCard (card_id: number, updatedData: any): Promise<CardInterface> {
    return fetch(this.url + "/" + card_id,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({ updatedData }),
      })
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .catch(error => {
        console.error(`Erreur attrapée dans le updateCard : `, error);
      })
  }

}