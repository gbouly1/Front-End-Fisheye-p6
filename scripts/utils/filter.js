// logique de tri
export function sortMedia(mediaArray, criteria) {
  switch (criteria) {
    case "Popularité":
      return mediaArray.sort((a, b) => b.likes - a.likes);
    case "Date":
      return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "Titre":
      return mediaArray.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return mediaArray;
  }
}
