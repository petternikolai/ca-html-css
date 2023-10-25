export async function getGames() {
  const gameHubAPI = "https://api.noroff.dev/api/v1/gamehub";
  const wordPressAPI = "https://cms-ca-petter-nikolai-kristoffersen.no/wp-json/wc/store/products";
  const response = await fetch(wordPressAPI);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw new Error("Failed to get data from the API!");
}

getGames();
