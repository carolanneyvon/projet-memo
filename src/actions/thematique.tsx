import DataThematique from '../services/DataThematique';
import { ActionFunctionArgs } from 'react-router-dom';
import ThematiqueInterface from './../Interfaces/ThematiqueInterface';
import { v4 as uuidv4 } from 'uuid';

const data = DataThematique.getInstance();

// Ajouter une thématique
export const addThematiqueAction = async({ request }: ActionFunctionArgs)  => {

    console.log(`Dans addThematiqueAction`);
    const formData = await request.formData();
    const thematique_name = formData.get("thematique_name") as string;
  
    const newThematique: Partial<ThematiqueInterface> = {
      id: 0,
      uid: uuidv4(),
      name: thematique_name,
      open: false,
      selected: false
    };

    await data.addThematique(newThematique);
    return null;
    // POur mettre à jour la page d'accueil avec la nouvelle thématique
    // const addedThematique = await data.addThematique(newThematique);
    // return addedThematique;
}

// Mettre à jour une thématique
export const updateThematiqueAction = async({ request, params }: ActionFunctionArgs) => {
    console.log(`Dans updateThematiqueAction`);
    const formData = await request.formData();
    const thematiqueId = Number(params.thematiqueId);
    const thematique_name = formData.get("thematique_name") as string;

    const updatedThematique: Partial<ThematiqueInterface> = {
        id: thematiqueId,
        name: thematique_name,
    };

    await data.updateThematique(updatedThematique);
    return null;
    // Pour mettre à jour la page d'accueil avec la nouvelle thématique
    // const upThematique = await data.updateThematique(updatedThematique);
    // return upThematique;
}

// Supprimer une thématique
export const deleteThematiqueAction = async({ params }: ActionFunctionArgs) => {
    console.log(`Dans deleteThematiqueAction`);
    const thematiqueId = Number(params.thematiqueId);

    await data.deleteThematique(thematiqueId);
    return null;
    // Pour mettre à jour la page d'accueil avec la nouvelle thématique
    // const deletedThematique = await data.deleteThematique(thematiqueId);
    // return deletedThematique;
}
