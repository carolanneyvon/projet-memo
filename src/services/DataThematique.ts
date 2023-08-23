import ThematiqueInterface from './../Interfaces/ThematiqueInterface';

export default class DataThematique {
  static url:string = "http://localhost:3001/terms";

  /**
   * Récupère les terms via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<ThematiqueInterface[]>
   */
  static async loadThematiques():Promise<ThematiqueInterface[]> {
    return fetch(this.url)
    .then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .catch(error => {
      console.error("Erreur attrapée dans loadThematiques", error)
    })
  }

  // Récupère le nom de la thématique 
  static async loadThematiqueName(id: number): Promise<string | null> {
    //return fetch(`${this.url}/${id}`)
    return fetch(this.url + "/" + id)
    .then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .then(thematique => thematique.name)
    .catch(error => {
      console.error("Erreur attrapée dans loadThematiqueName", error);
    });
  }

  
}