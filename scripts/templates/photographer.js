function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const a = document.createElement("a");
    a.href = "#";
    // on créer la balise article qui va comporter les éléments
    const article = document.createElement("article");

    // on créer 1 par 1 les éléments que l'on va ajouter a notre article
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const cityElement = document.createElement("p");
    cityElement.innerHTML = `${city}, ${country}`;
    cityElement.classList.add("cityElement");
    const taglineElement = document.createElement("p");
    taglineElement.innerHTML = tagline;
    taglineElement.classList.add("taglineElement");
    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${price}€/jours`;
    priceElement.classList.add("priceElement");

    // Ajouter les élément à l'élément article
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(cityElement);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    // on ajoute l'article a la balise a qui va nous permettre de cliquer sur le photographe
    a.appendChild(article);
    return a;
  }
  return { name, picture, getUserCardDOM, city, country, tagline, price };
}
