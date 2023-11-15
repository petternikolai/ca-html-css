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
