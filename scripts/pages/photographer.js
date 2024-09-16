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
import {
  imagesArray,
  addImageArrayForNextPrevious,
} from "../utils/lightbox.js";

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Fonction pour afficher les médias triés
async function displaySortedMedia(criteria) {
  const media = await getMediaByPhotographerId(photographerId);
  const sortedMedia = sortMedia(media, criteria);
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.innerHTML = ""; // Clear existing media

  // Reset et mise à jour de imagesArray
  imagesArray.length = 0; // Vider le tableau

  sortedMedia.forEach((media) => {
    const mediaUrl = media.image
      ? `assets/sample-photos/${photographerId}/${media.image}`
      : `assets/sample-photos/${photographerId}/${media.video}`;

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
