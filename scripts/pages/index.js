import {
  photographerTemplate,
  createMediaElement,
} from "../templates/photographer.js";

// On récupère les données des photographes dans le dossier JSON
async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// on affiche les données des photographe sur la page d'accueil
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  if (window.location.pathname !== "/photographer.html") {
    photographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
}

async function init() {
  // Récupère les datas des photographes depuis le fichier JSON
  const photographers = await getPhotographers();
  displayData(photographers);
}
init();

// on récupère les data des photographes en fonction de leur id
export async function getPhotographerById(id) {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    // Trouver le photographe avec l'ID correspondant
    const photographer = data.photographers.find((p) => p.id === parseInt(id));
    if (!photographer) {
      throw new Error("Photographe non trouvé");
    }
    return photographer;
  } catch (error) {
    console.error(error);
    return;
  }
}

export let firstName = "";
// Fonction pour afficher les détails du photographe
export async function displayPhotographer(id) {
  try {
    const photographerData = await getPhotographerById(id);
    const headerSection = document.querySelector(".photograph-header");

    if (photographerData) {
      firstName = photographerData.name;
      const photographerDOM = photographerTemplate(photographerData, false);
      const userCardDOM = photographerDOM.getUserCardDOM();
      headerSection.appendChild(userCardDOM);
    } else {
      console.error("Photographe non trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de l'affichage du photographe :", error);
  }
}

// On récupère les média de chaque photographe en fonction de leur ID
export async function getMediaByPhotographerId(photographerId) {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    const photographer = data.photographers.find(
      (p) => p.id === parseInt(photographerId)
    );
    if (!photographer) {
      throw new Error("Photographe non trouvé");
    }
    const media = data.media.filter(
      (m) => m.photographerId === parseInt(photographerId)
    );
    return media;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Fonction pour afficher les photos de chaque photographes
export async function displayMediaByPhotographerId(photographerId) {
  try {
    const media = await getMediaByPhotographerId(photographerId);
    const mediaContainer = document.querySelector(".media-container");

    if (media) {
      media.forEach((media) => {
        const mediaElement = createMediaElement(media);
        mediaContainer.appendChild(mediaElement);
      });
    } else {
      console.error("Aucun média trouvé pour ce photographe.");
    }
  } catch (error) {
    console.error("Erreur lors de l'affichage des médias :", error);
  }
}
