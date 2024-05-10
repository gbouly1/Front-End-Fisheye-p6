import { displayPhotographer } from "./index.js";
import { totalLikesByPhotographer } from "../templates/photographer.js";
import { displayMediaByPhotographerId } from "./index.js";

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Appeler la fonction displayPhotographer avec l'ID extrait de l'URL
displayPhotographer(photographerId);

// Appel de la fonction pour afficher les médias du photographe
if (photographerId) {
  displayMediaByPhotographerId(photographerId);
}

totalLikesByPhotographer(photographerId);
