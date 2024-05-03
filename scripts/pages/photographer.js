import { displayPhotographer } from "./index.js";
import { getPhotographerById } from "./index.js";

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Appeler la fonction displayPhotographer avec l'ID extrait de l'URL
displayPhotographer(photographerId);

async function displayMediaByPhotographerId(photographerId) {
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

// On créer a card des media
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

  const divLikes = document.createElement("div");
  divLikes.classList.add("div-likes");
  const likesMedia = document.createElement("p");
  likesMedia.innerHTML = likes;
  const aLikes = document.createElement("a");
  aLikes.href = "#";
  aLikes.addEventListener("click", (event) => {
    event.preventDefault();
    media.likes++;
    likesMedia.innerHTML = media.likes;
    aLikes.classList.add("pointer-event-none");
    totalLikes++;
    const updateTotalLikes = document.querySelector(".total-likes");
    updateTotalLikes.innerHTML = totalLikes;
  });
  const heartLikes = document.createElement("img");
  heartLikes.classList.add("hearth-likes");
  heartLikes.src = `assets/icons/vector.png`;
  divLikes.appendChild(likesMedia);
  aLikes.appendChild(heartLikes);
  divLikes.appendChild(aLikes);

  infoMedia.appendChild(titleMedia);
  infoMedia.appendChild(divLikes);

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

// Fonction pour mettre à jour le nombre total de likes
async function updateTotalLikes(photographerId) {
  try {
    let totalLikes = 0;

    const media = await getMediaByPhotographerId(photographerId);

    media.forEach((m) => {
      totalLikes += m.likes;
    });

    const totalLikesElement = document.getElementById("totalLikes");

    if (totalLikesElement) {
      totalLikesElement.innerHTML = totalLikes;
    }

    return totalLikes;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du nombre total de likes :",
      error
    );
    return null;
  }
}

let totalLikes = 0;
// affichage dans la console tu nombre total de like
async function totalLikesByPhotographer(photographerId) {
  try {
    // Récupérer les médias du photographe par son ID
    const media = await getMediaByPhotographerId(photographerId);
    const data = await getPhotographerById(photographerId);

    // Initialiser le total des likes
    // let totalLikes = 0;

    // Additionner les likes de chaque média
    media.forEach((m) => {
      totalLikes += m.likes;
    });

    // On récupère le main dans la page pour afficher la box en bas a droite de la page avec le total des likes et le prix
    const mainContainer = document.querySelector("#main");

    // On créer la box
    const boxMedia = document.createElement("div");
    boxMedia.classList.add("boxMedia");
    // On créer les élément contenant les likes et le prix
    const totalLikesElement = document.createElement("p");
    totalLikesElement.classList.add("total-likes");
    totalLikesElement.innerHTML = totalLikes;
    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${data.price}€ / jour`;

    boxMedia.appendChild(totalLikesElement);
    boxMedia.appendChild(priceElement);
    mainContainer.appendChild(boxMedia);

    return { totalLikes, photographerPrice: data.price };
  } catch (error) {
    console.error("Erreur lors du calcul du total des likes :", error);
    return null;
  }
}

totalLikesByPhotographer(photographerId);
