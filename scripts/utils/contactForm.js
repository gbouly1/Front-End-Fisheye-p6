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
  headerPage.classList.add("opacity-fifty");
  mainPage.classList.add("opacity-fifty");
  modal.style.display = "block";
}

// on ferme la modal et enlève le style du header et main
function closeModal() {
  const modal = document.getElementById("contact_modal");
  headerPage.classList.remove("opacity-fifty");
  mainPage.classList.remove("opacity-fifty");
  modal.style.display = "none";
}
