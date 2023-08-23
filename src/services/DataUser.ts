import UserInterface from './../Interfaces/UserInterface';

export default class DataUser {
  static url:string = "http://localhost:3001/users";

  /**
   * Récupère les users via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<UserInterface[]>
   */
  static async loadUsers():Promise<UserInterface[]> {
    return fetch(this.url)
    .then(response => {
      console.log(`Response status : `, response.status);
      return response.json();
    })
    .catch(error => {
      console.error("Erreur attrapée dans loadUsers", error)
    })
  }

  static async loginUser(username: string, password: string): Promise<UserInterface | null> {
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
