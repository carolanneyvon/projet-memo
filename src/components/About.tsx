const About = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">A propos du projet</h2>
      <p className="text-decoration-underline fs-5">Faire en sorte que les utilisateurs puissent :</p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Se connecter via un formulaire</li>
        <li className="list-group-item">Lire les messages d'erreur (erreur de connexion, ...) dans le body et pas uniquement dans la console</li>
        <li className="list-group-item">Voir, ajouter, modifier, supprimer des cartes (question-réponse) dans les 4 colonnes (A apprendre, Je sais un peu, Je sais bien, Je sais parfaitement)</li>
        <li className="list-group-item">Voir, ajouter, modifier, supprimer des thématiques</li>
        <li className="list-group-item">Voir les cartes dans les 4 colonnes après un clic sur la thématique concernée</li>
      </ul>
      
      <br />
      <p className="text-decoration-underline fs-5">Fonctionnalités avancée (optionnel) :</p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Changer de colonne les questions en cliquant sur les flèches</li>
        <li className="list-group-item">Gestion des formulaires dans des fenêtres modales</li>
        <li className="list-group-item">Cliquer / glisser pour les changements de colonne des cartes</li>
      </ul>

      <br />
      <p className="text-decoration-underline fs-5">Vous utilisez :</p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">json-server</li>
        <li className="list-group-item">react + jsx + bootstrap</li>
        <li className="list-group-item">les hooks de base : useState et useEffect</li>
        <li className="list-group-item">TypeScript (optionnel)</li>
        <li className="list-group-item">Des hooks plus avancés (useRef, useMemo,  useReducer, useContext, ...) (optionnel)</li>
        <li className="list-group-item">Les routes avec react-router-dom (optionnel)</li>
        <li className="list-group-item">Les loaders et les actions de react-router-dom (optionnel)</li>
      </ul>
    </div>
  );
}

export default About;