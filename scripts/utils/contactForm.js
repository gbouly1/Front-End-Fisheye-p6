import { firstName } from "../pages/index.js";

const modalBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close_button");
const headerPage = document.getElementById("header");
const mainPage = document.getElementById("main");
const myForm = document.getElementById("form");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");

const modal = document.getElementById("contact_modal");

// on affiche la modal et applique le style au header et au main
function displayModal() {
  const nameElement = document.querySelector(".first-name");
  nameElement.textContent = firstName;
  headerPage.classList.add("opacity-fifty");
  mainPage.classList.add("opacity-fifty");
  modal.style.display = "block";
  document.addEventListener("keydown", handleKeyDown); // Ajouter l'écouteur d'événements du clavier
}

modalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayModal();
});

// on ferme la modal et enlève le style du header et main
function closeModal() {
  headerPage.classList.remove("opacity-fifty");
  mainPage.classList.remove("opacity-fifty");
  modal.style.display = "none";
  document.removeEventListener("keydown", handleKeyDown); // Supprimer l'écouteur d'événements du clavier
}

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

// Fermeture avec la touche Échappe
function handleKeyDown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    prenom: prenom.value,
    nom: nom.value,
    email: email.value,
    message: message.value,
  };

  console.log(formData);
  closeModal();
});
