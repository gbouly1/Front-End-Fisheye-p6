async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes depuis le fichier JSON
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
