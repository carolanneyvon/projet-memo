import ThematiqueInterface from './../Interfaces/ThematiqueInterface';

export default class DataThematique {
  private static instance: DataThematique;
  private url: string = "http://localhost:3001/terms";

  private constructor() { }

  /**
* Contrôle l'accès au constructeur pour n'utiliser qu'une seule instance
* C'est le coeur du design patter singleton
* @returns Data
*/
  public static getInstance(): DataThematique {
    if (!DataThematique.instance) {
      DataThematique.instance = new DataThematique();
    }
    return DataThematique.instance;
  }

  /**
   * Récupère les terms via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<ThematiqueInterface[]>
   */
  async loadThematiques(): Promise<ThematiqueInterface[]> {
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
  async loadThematiqueName(id: number): Promise<string | null> {
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

  // Ajouter une thématique
  async addThematique(thematique: Partial<ThematiqueInterface>): Promise<ThematiqueInterface> {
    return fetch(this.url, 
      {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(thematique),
    }).then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .catch(error => {
      console.error(`Erreur attrapée dans le addThematique : `, error);
    })
  }

  // Mettre à jour une thématique
  async updateThematique(thematique: Partial<ThematiqueInterface>): Promise<ThematiqueInterface> {
    return fetch(`${this.url}/${thematique.id}`, 
      {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(thematique),
      })
    .then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .catch(error => {
      console.error(`Erreur attrapée dans le updateThematique : `, error);
    })
  }

  // Supprimer une thématique
  async deleteThematique(id: number): Promise<void> {
    return fetch(`${this.url}/${id}`, 
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
    .catch(error => {
      console.error(`Erreur attrapée dans le deleteThematique : `, error);
    })
  }



}