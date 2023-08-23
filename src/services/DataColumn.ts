import ColumnInterface from './../Interfaces/ColumnInterface';

export default class DataColumn {
  static url:string = "http://localhost:3001/columns";
  
  /**
   * Récupère les colonnes via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<ColumnInterface[]>
   */
  static async loadColumns():Promise<ColumnInterface[]> {
    return fetch(this.url)
    .then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .catch(error => {
      console.error("Erreur attrapée dans loadColumns", error)
    })
  }
}