import {
  getPhotographerById,
  getMediaByPhotographerId,
} from "../pages/index.js";
import {
  openLightbox,
  addImageArrayForNextPrevious,
} from "../utils/lightbox.js";

export function photographerTemplate(data, isPhotographerPage = true) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const a = document.createElement("a");
    a.href = "photographer.html?id=" + id;
    a.setAttribute("aria-label", "Voir le profil de " + name);
    // on créer la balise article qui va comporter les éléments
    const article = document.createElement("article");

    // création des éléments pour l'image
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "protrait de " + name);
    img.setAttribute("aria-label", name);
    imgContainer.appendChild(img);

    // création des éléments pour le texte
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const cityElement = document.createElement("p");
    cityElement.innerHTML = `${city}, ${country}`;
    cityElement.classList.add("cityElement");
    const taglineElement = document.createElement("p");
    taglineElement.innerHTML = tagline;
    taglineElement.classList.add("taglineElement");
    infoContainer.appendChild(h2);
    infoContainer.appendChild(cityElement);
    infoContainer.appendChild(taglineElement);

    // Si c'est la page photographe.html on n'affiche pas le prix
    if (isPhotographerPage) {
      const priceElement = document.createElement("p");
      priceElement.innerHTML = `${price}€/jours`;
      priceElement.classList.add("priceElement");
      infoContainer.appendChild(priceElement);
    }
    // Ajouter les élément à l'élément article
    article.appendChild(imgContainer);
    article.appendChild(infoContainer);

    // on ajoute l'article a la balise a qui va nous permettre de cliquer sur le photographe
    a.appendChild(article);
    return a;
  }
  return { name, picture, getUserCardDOM, city, country, tagline, price };
}

// On créer le template des card media
export function createMediaElement(media) {
  const { title, image, video, likes, photographerId } = media;
  const aElement = document.createElement("a");
  aElement.classList.add("a-media");
  aElement.href = "#";

  const mediaElement = document.createElement("div");
  mediaElement.classList.add("media");

  if (image) {
    const img = document.createElement("img");
    const imageUrl = `assets/sample-photos/${photographerId}/${image}`;
    addImageArrayForNextPrevious({ url: imageUrl, title });
    img.src = imageUrl;
    img.alt = title;
    img.setAttribute("data-src", imageUrl);
    img.setAttribute("alt", title + ", miniature");
    img.classList.add("img-media");
    aElement.appendChild(img);
  } else if (video) {
    const videoElement = document.createElement("video");
    const videoUrl = `assets/sample-photos/${photographerId}/${video}`;
    addImageArrayForNextPrevious({ url: videoUrl, title });
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.setAttribute("data-src", videoUrl);
    videoElement.setAttribute("alt", title + ", miniature");
    videoElement.classList.add("video-media");
    aElement.appendChild(videoElement);
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
    // On créer l'addEventListener pour incrémenter les likes et upfates les total likes
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
  heartLikes.setAttribute("alt", "likes");

  divLikes.appendChild(likesMedia);
  aLikes.appendChild(heartLikes);
  divLikes.appendChild(aLikes);

  infoMedia.appendChild(titleMedia);
  infoMedia.appendChild(divLikes);

  mediaElement.appendChild(aElement);
  mediaElement.appendChild(infoMedia);
  // Gestionnaire d'événement pour chaque image miniature
  aElement.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    let type = "image";
    if (target.querySelector("video")) {
      type = "video";
    }
    const imageUrl = target
      .querySelector("img, video")
      .getAttribute("data-src"); // Récupère l'URL de l'image depuis l'attribut de données
    openLightbox(imageUrl, type);
  });
  return mediaElement;
}

// initialiser le total de likes
let totalLikes = 0;
// affichage du nombre total de like
export async function totalLikesByPhotographer(photographerId) {
  try {
    // Récupérer les médias du photographe par son ID
    const media = await getMediaByPhotographerId(photographerId);
    const data = await getPhotographerById(photographerId);

    // Additionner les likes de chaque média
    media.forEach((m) => {
      totalLikes += m.likes;
    });

    // On récupère le main dans la page pour afficher la box en bas a droite de la page avec le total des likes et le prix
    const mainContainer = document.querySelector("#main");

    // On créer la box
    const boxMedia = document.createElement("div");
    boxMedia.classList.add("boxMedia");

    // On créer les élément contenant les likes et le coeur
    const divTotalLikes = document.createElement("div");
    const totalLikesElement = document.createElement("p");
    totalLikesElement.classList.add("total-likes");
    totalLikesElement.innerHTML = totalLikes;
    const hearthElement = document.createElement("img");
    hearthElement.classList.add("hearth-likes-box");
    hearthElement.src = `assets/icons/favorite.png`;

    // on créer l'élément contenant le prix
    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${data.price}€ / jour`;

    divTotalLikes.appendChild(totalLikesElement);
    divTotalLikes.appendChild(hearthElement);
    boxMedia.appendChild(divTotalLikes);
    boxMedia.appendChild(priceElement);

    mainContainer.appendChild(boxMedia);

    return { totalLikes, photographerPrice: data.price };
  } catch (error) {
    console.error("Erreur lors du calcul du total des likes :", error);
    return null;
  }
}
