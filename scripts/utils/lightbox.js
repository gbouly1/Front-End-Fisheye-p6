const imagesArray = [];
export function addImageArrayForNextPrevious(image) {
  imagesArray.push(image);
}

// let currentIndex = 0;
const lightboxImg = document.querySelector(".lightbox-img");
const lightbox = document.querySelector(".lightbox");
// Sélectionnez tous les éléments d'images de votre template

// Sélectionnez les éléments de la lightbox
const lightboxPrevBtn = document.querySelector(".lightbox-prev");
const lightboxNextBtn = document.querySelector(".lightbox-next");
// const lightboxCloseBtn = document.querySelector(".lightbox-close");

// // Ajoutez un gestionnaire d'événements à chaque image dans votre template
// images.forEach((image, index) => {
//   image.addEventListener("click", () => {
//     currentIndex = index;
//     openLightbox();
//   });
// });

// Gestionnaire d'événements pour le bouton "Précédent"
lightboxPrevBtn.addEventListener("click", () => {
  console.log(imagesArray);
  // currentIndex = (currentIndex - 1 + images.length) % images.length;
  // lightboxImg.src = images[currentIndex].src;
});

// Gestionnaire d'événements pour le bouton "Suivant"
lightboxNextBtn.addEventListener("click", () => {
  // currentIndex = currentIndex++;
  // lightboxImg.src = imageUrl;
});
const closeLightbox = document.querySelector(".lightbox-close");
closeLightbox.addEventListener("click", (event) => {
  event.preventDefault();
  lightbox.style.display = "none";
});

export function openLightbox(mediaData, type = "image") {
  // Supprimer le contenu précédent de la lightbox
  while (lightboxImg.firstChild) {
    lightboxImg.removeChild(lightboxImg.firstChild);
  }
  console.log(mediaData, type);
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

  // const lightboxContainer = document.querySelector(".lightbox-container");
  // lightboxImg.src = mediaData;
  // lightboxContainer.appendChild(lightboxImg);
  lightbox.style.display = "flex";
}
