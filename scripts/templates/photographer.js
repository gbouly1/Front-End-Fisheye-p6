function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const cityElement = document.createElement("p");
    cityElement.innerHTML = `${city}, ${country}`;
    cityElement.classList.add("cityElement");
    const taglineElement = document.createElement("p");
    taglineElement.innerHTML = tagline;
    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${price}€/jours`;
    priceElement.classList.add("priceElement");
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(cityElement);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);
    return article;
  }
  return { name, picture, getUserCardDOM, city, country, tagline, price };
}
