/**
 * Fetches game details from the server based on the game ID.
 * @param {number|string} id - The ID of the game to fetch.
 * @return {Promise<Object>} A promise that resolves to the game details object.
 */
export async function getGameById(id) {
    try {
        const response = await fetch(`https://cms-ca-petter-nikolai-kristoffersen.no/wp-json/wc/store/products/${id}`); // Adjust the URL based on your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const game = await response.json();
        return game;
    } catch (e) {
        console.error('Error fetching game data:', e);
        throw e;
    }
}
