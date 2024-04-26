import { displayPhotographer } from "./index.js";

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Appeler la fonction displayPhotographer avec l'ID extrait de l'URL
displayPhotographer(photographerId);

async function displayMediaByPhotographerId(photographerId) {
  try {
    const mediaData = await getMediaByPhotographerId(photographerId);
    const mediaContainer = document.querySelector(".media-container");

    if (mediaData) {
      mediaData.forEach((media) => {
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

function createMediaElement(media) {
  const { title, image, video, likes, photographerId } = media;
  const mediaElement = document.createElement("div");
  mediaElement.classList.add("media");

  if (image) {
    const img = document.createElement("img");
    img.src = `assets/sample-photos/${photographerId}/${image}`;
    img.alt = title;
    mediaElement.appendChild(img);
  } else if (video) {
    const videoElement = document.createElement("video");
    videoElement.src = `assets/sample-photos/${photographerId}/${video}`;
    videoElement.controls = true;
    mediaElement.appendChild(videoElement);
  }
  const infoMedia = document.createElement("div");
  infoMedia.classList.add("info-media");
  const titleMedia = document.createElement("h3");
  titleMedia.innerHTML = title;
  const likesMedia = document.createElement("p");
  likesMedia.innerHTML = likes;

  infoMedia.appendChild(titleMedia);
  infoMedia.appendChild(likesMedia);

  mediaElement.appendChild(infoMedia);
  return mediaElement;
}
async function getMediaByPhotographerId(photographerId) {
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

// Appel de la fonction pour afficher les médias du photographe
if (photographerId) {
  displayMediaByPhotographerId(photographerId);
}
