import {
  displayPhotographer,
  displayMediaByPhotographerId,
  getMediaByPhotographerId,
} from "./index.js";
import {
  totalLikesByPhotographer,
  createMediaElement,
} from "../templates/photographer.js";
import { sortMedia } from "../utils/filter.js";

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Fonction pour afficher les médias triés
async function displaySortedMedia(criteria) {
  const media = await getMediaByPhotographerId(photographerId);
  const sortedMedia = sortMedia(media, criteria);
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = ""; // Clear existing media

  sortedMedia.forEach((media) => {
    const mediaElement = createMediaElement(media);
    mediaContainer.appendChild(mediaElement);
  });
}

// Appeler la fonction displayPhotographer avec l'ID extrait de l'URL
displayPhotographer(photographerId);

// Appel de la fonction pour afficher les médias du photographe
if (photographerId) {
  displayMediaByPhotographerId(photographerId);
}

totalLikesByPhotographer(photographerId);

// Gestionnaire d'événements pour le tri
const filterSelect = document.querySelector("#filter");
filterSelect.addEventListener("change", (event) => {
  displaySortedMedia(event.target.value);
});
