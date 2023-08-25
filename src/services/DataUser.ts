import UserInterface from './../Interfaces/UserInterface';

export default class DataUser {
  private static instance: DataUser;
  private url: string = "http://localhost:3001/users";

  private constructor() { }

  /**
* Contrôle l'accès au constructeur pour n'utiliser qu'une seule instance
* C'est le coeur du design patter singleton
* @returns Data
*/
  public static getInstance(): DataUser {
    if (!DataUser.instance) {
      DataUser.instance = new DataUser();
    }
    return DataUser.instance;
  }

  /**
   * Récupère les users via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<UserInterface[]>
   */
  async loadUsers(): Promise<UserInterface[]> {
    return fetch(this.url)
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .catch(error => {
        console.error("Erreur attrapée dans loadUsers", error)
      })
  }

  async loginUser(username: string, password: string): Promise<UserInterface | null> {
    return this.loadUsers()
      .then(users => {
        const user = users.find(user => user.username === username && user.pwd === password);
        return user || null;

      })
      .catch(error => {
        console.error("Erreur attrapée dans loginUser", error);
        throw error;
      });
  }

}
