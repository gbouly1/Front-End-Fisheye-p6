let currentIndex = 0;
export const imagesArray = [];

const main = document.getElementById("main");
const lightboxImg = document.querySelector(".lightbox-img");
lightboxImg.setAttribute("alt", "photo lightbox");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightbox = document.querySelector(".lightbox");

// Sélectionnez les éléments de la lightbox
const closeLightbox = document.querySelector(".lightbox-close");
const lightboxPrevBtn = document.querySelector(".lightbox-prev");
const lightboxNextBtn = document.querySelector(".lightbox-next");

// Vérifie si on est sur la bonne page et que l'id est présent
if (
  window.location.pathname === "/photographer.html" &&
  window.location.search.match(/id=\d+/)
) {
  // Gestionnaire d'événements pour le bouton "Précédent"
  lightboxPrevBtn.addEventListener("click", showPreviousMedia);

  // Gestionnaire d'événements pour le bouton "Suivant"
  lightboxNextBtn.addEventListener("click", showNextMedia);

  closeLightbox.addEventListener("click", (event) => {
    event.preventDefault();
    closeLightboxModal();
  });

  document.addEventListener("keydown", handleKeyDown);
}

function showNextMedia() {
  currentIndex = (currentIndex + 1) % imagesArray.length;
  updateLightboxContent();
}

function showPreviousMedia() {
  currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
  updateLightboxContent();
}

// Fonction pour fermer la lightbox
function closeLightboxModal() {
  lightbox.style.display = "none";
  main.style.display = "block";
}

// Gestionnaire pour les touches du clavier
function handleKeyDown(event) {
  if (lightbox.style.display === "flex") {
    switch (event.key) {
      case "ArrowLeft":
        showPreviousMedia();
        break;
      case "ArrowRight":
        showNextMedia();
        break;
      case "Escape":
        closeLightboxModal();
        break;
      default:
        break;
    }
  }
}

// Ouverture de la lightbox
export function openLightbox(mediaData, type = "image") {
  const media = imagesArray.find((m) => m.url === mediaData);
  currentIndex = imagesArray.indexOf(media);

  // Supprimer le contenu précédent de la lightbox
  while (lightboxImg.firstChild) {
    lightboxImg.removeChild(lightboxImg.firstChild);
  }

  if (type === "image") {
    const img = document.createElement("img");
    img.src = mediaData;
    img.alt = media.title;
    img.setAttribute("data-type", "image");
    lightboxImg.appendChild(img);
  } else if (type === "video") {
    const video = document.createElement("video");
    video.src = mediaData;
    video.alt = media.title;
    video.controls = true;
    video.setAttribute("data-type", "video");
    lightboxImg.appendChild(video);
  }

  main.style.display = "none";
  lightboxTitle.textContent = media.title;
  lightbox.style.display = "flex";
}

// Update de la lightbox par rapport à l'index
function updateLightboxContent() {
  const media = imagesArray[currentIndex];
  const mediaData = media.url;
  const type = mediaData.endsWith(".mp4") ? "video" : "image"; // Assurez-vous que l'extension du fichier vidéo est correcte

  // Supprimer le contenu précédent de la lightbox
  while (lightboxImg.firstChild) {
    lightboxImg.removeChild(lightboxImg.firstChild);
  }

  if (type === "image") {
    const img = document.createElement("img");
    img.src = mediaData;
    img.alt = media.title;
    img.setAttribute("data-type", "image");
    lightboxImg.appendChild(img);
  } else if (type === "video") {
    const video = document.createElement("video");
    video.src = mediaData;
    video.alt = media.title;
    video.controls = true;
    video.setAttribute("data-type", "video");
    lightboxImg.appendChild(video);
  }

  lightboxTitle.textContent = media.title;
}

export function addImageArrayForNextPrevious(image) {
  imagesArray.push(image);
}
