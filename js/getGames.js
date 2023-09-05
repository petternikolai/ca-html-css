export async function getGames() {
  const gameHubAPI = "https://api.noroff.dev/api/v1/gamehub";
  const response = await fetch(gameHubAPI);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw new Error("Failed to get data from the API!");
}

getGames();
