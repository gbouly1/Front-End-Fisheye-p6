const mediaList = document.querySelectorAll(".media");
const lightbox = document.querySelector(".lightbox");

// Parcourez chaque élément de la NodeList
mediaList.forEach((media) => {
  // Attachez un écouteur d'événements à chaque élément individuel
  media.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("ca marche");
  });
});
