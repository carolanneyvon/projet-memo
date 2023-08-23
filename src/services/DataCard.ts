import CardInterface from './../Interfaces/CardInterface';

export default class DataCard {
  static url:string = "http://localhost:3001/cards";
  
  /**
   * Récupère les cartes via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<CardInterface[]>
   */
  static async loadCards():Promise<CardInterface[]> {
    return fetch(this.url)
    .then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .catch(error => {
      console.error("Erreur attrapée dans loadCards", error)
    })
  }

  static async loadCardsByThematiqueId(thematiqueId: number): Promise<CardInterface[]> {
    return this.loadCards()
      .then(cards => cards.filter(card => card.tid === thematiqueId))
      .catch(error => {
        console.error("Erreur attrapée dans loadCardsByThematiqueId", error);
        throw error;
      });
  }  
}