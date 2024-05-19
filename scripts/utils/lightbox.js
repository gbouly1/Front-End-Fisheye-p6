let currentIndex = 0;
const imagesArray = [];
console.log(imagesArray);

export function addImageArrayForNextPrevious(image) {
  imagesArray.push(image);
}

// let currentIndex = 0;
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightbox = document.querySelector(".lightbox");
// Sélectionnez tous les éléments d'images de votre template

// Sélectionnez les éléments de la lightbox
const lightboxPrevBtn = document.querySelector(".lightbox-prev");
const lightboxNextBtn = document.querySelector(".lightbox-next");
// const lightboxCloseBtn = document.querySelector(".lightbox-close");

// Gestionnaire d'événements pour le bouton "Précédent"
lightboxPrevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
  updateLightboxContent();
});

// Gestionnaire d'événements pour le bouton "Suivant"
lightboxNextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imagesArray.length;
  updateLightboxContent();
});

// Fermeture de la lightbox
const closeLightbox = document.querySelector(".lightbox-close");
closeLightbox.addEventListener("click", (event) => {
  event.preventDefault();
  lightbox.style.display = "none";
});

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

  lightboxTitle.textContent = media.title;
  lightbox.style.display = "flex";
  console.log(currentIndex);
}

// Update de la lightbox par rapport a son index
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
    img.alt = mediaData;
    img.setAttribute("data-type", "image");
    lightboxImg.appendChild(img);
  } else if (type === "video") {
    const video = document.createElement("video");
    video.src = mediaData;
    video.alt = mediaData;
    video.controls = true;
    video.setAttribute("data-type", "video");
    lightboxImg.appendChild(video);
  }
  lightboxTitle.textContent = media.title;
}
