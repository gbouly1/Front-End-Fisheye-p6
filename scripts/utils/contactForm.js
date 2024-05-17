import { firstName } from "../pages/index.js";

const modalBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close_button");
// on recupère le main et le header pour l'opacité lorsque la modal est open
const headerPage = document.getElementById("header");
const mainPage = document.getElementById("main");
// on recupère les input pour les afficher dans la console
const myForm = document.getElementById("form");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");

// on affiche la modal et applique le style au header et au main
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const nameElement = document.querySelector(".first-name");
  nameElement.textContent = firstName;
  headerPage.classList.add("opacity-fifty");
  mainPage.classList.add("opacity-fifty");
  modal.style.display = "block";
}

modalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayModal();
});

// on ferme la modal et enlève le style du header et main
function closeModal() {
  const modal = document.getElementById("contact_modal");
  headerPage.classList.remove("opacity-fifty");
  mainPage.classList.remove("opacity-fifty");
  modal.style.display = "none";
}

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

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
