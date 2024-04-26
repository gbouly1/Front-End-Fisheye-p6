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
