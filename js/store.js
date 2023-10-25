import { getGames } from "./getGames.js";

export async function displayGames() {
  try {
    const games = await getGames();
    const largeGameContainer = document.querySelector(".game-preview-large");
    const gamesContainer = document.querySelector(".game-preview-small");
    const winterSaleContainer = document.querySelector(".winter-sale-flex-row");
    const loaderContainer = document.querySelector(".loader-container");
    const mobileContainer = document.querySelector(".store-s2-mobile");

    // Large Game Preview //

    const largeGameAnchor = document.createElement("a");
    largeGameAnchor.href = `/products/product_details.html?id=${games[0].id}`;

    const largeImage = document.createElement("img");
    largeImage.src = games[0].images[0].src;
    largeImage.alt = games[0].images[0].alt;

    largeGameContainer.appendChild(largeGameAnchor).appendChild(largeImage);

    // Small Game Preview //

    for (let i = 0; i < 6; i++) {
      const game = games[i];
      const gameList = document.createElement("ul");
      const gameListItem = document.createElement("li");
      gameListItem.classList.add("background");
      const gameLiAnchor = document.createElement("a");
      gameLiAnchor.href = `/products/product_details.html?id=${game.id}`;
      const smallImage = document.createElement("img");
      smallImage.src = game.images[0].src;
      smallImage.alt = game.images[0].alt;
      const gameTitle = document.createElement("p");
      gameTitle.innerHTML = game.name;

      gamesContainer
        .appendChild(gameList)
        .appendChild(gameListItem)
        .appendChild(gameLiAnchor)
        .appendChild(smallImage);
      gameLiAnchor.appendChild(gameTitle);

      // Mobile //

      mobileContainer.innerHTML += `
          <div class="winter-sale-elements">
            <a href="/products/product_details.html?id=${game.id}">
              <img src="${game.images[0].src}" alt="${game.images[0].alt}">
            </a>
            <p>${game.name}</p>
          </div>`;

      if (game === games[0]) {
        const gameListItem = document.createElement("li");
        gameListItem.classList.add("background-active");
        gamesContainer
          .appendChild(gameList)
          .appendChild(gameListItem)
          .appendChild(gameLiAnchor)
          .appendChild(smallImage);
        gameLiAnchor.appendChild(gameTitle);
      }
    }

    // Winter Sale Section //

    for (let i = 6; i < 9; i++) {
      const game = games[i];
      const discount = Math.round(
        100 - (game.prices.sale_price / game.prices.regular_price) * 100
      );

      winterSaleContainer.innerHTML += `
    <div class="winter-sale-elements">
          <a href="/products/product_details.html?id=${game.id}">
            <img src="${game.images[0].src}" alt="${game.images[0].alt}">
          </a>
          <p>${game.name}<br><br></p>
          <div class="flex-row">
            <p class="discount-percentage">-${discount}%</p>
            <div class="prices">
              <p class="discount" style="text-decoration: line-through">
                $${game.prices.regular_price}
              </p>
              <p>$${game.prices.sale_price}</p>
            </div>
          </div>
        </div>`;
    }
    const hideLoading = () => {
      loaderContainer.style.display = "none";
    };
    hideLoading();
  } catch (e) {
    console.warn(e);
    alert("Something went wrong. Please refresh!");
  }
}

displayGames();
