const headerPage = document.getElementById("header");
const mainPage = document.getElementById("main");

function displayModal() {
  const modal = document.getElementById("contact_modal");
  headerPage.classList.add("opacity-fifty");
  mainPage.classList.add("opacity-fifty");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  headerPage.classList.remove("opacity-fifty");
  mainPage.classList.remove("opacity-fifty");
  modal.style.display = "none";
}
