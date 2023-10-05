import { getGames } from "./getGames.js";
import { demo, isInCart, onAddToCart } from "./cart.js";

export async function displayProductDetails() {
  try {
    const games = await getGames();
    const productDetailsContainer = document.querySelector(".product-page-row");
    const loaderContainer = document.querySelector(".loader-container");
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    const hideLoading = () => {
      loaderContainer.style.display = "none";
    };

    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      if (id === game.id) {
        const buttonLabel = isInCart(game.id) ? "ADDED TO CART" : "ADD TO CART";
        const buttonColor = isInCart(game.id) ? "green" : "";
        const buttonBorder = isInCart(game.id) ? "none" : "";
        const buttonDisabled = isInCart(game.id) ? "disabled" : "";
        const priceHTML =
          game.discountedPrice < game.price
            ? `<span class="strikethrough">${game.price}</span> $${game.discountedPrice}`
            : `${game.price}`;

        productDetailsContainer.innerHTML = `
        <div class="main-content">
        <div>
          <h1 class="no-bottom-margin">${game.title}</h1>
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <p>4,7</p>
          </div>
          <img class="product-details-img" src="${game.image}" alt="${game.description}">
        </div>
        <div class="product-info">
          <div class="top-row">
          </div>
          <div class="summary">
            <h2>${game.title}</h2>
            <p>${game.description}</p>
          </div>
        </div>
      </div>
      <div class="add-to-cart-sticky">
        <p class="extra-large-p">$${priceHTML}</p>
        <button 
          id="cartButton" 
          data-id="${game.id}" 
          data-title="${game.title}" 
          data-price="${game.price}" 
          data-image="${game.image}" 
          data-description="${game.description}" 
          data-discount="${game.discountedPrice}" 
          style="background-color:${buttonColor};border:${buttonBorder}"
          ${buttonDisabled}>
          ${buttonLabel}
        </button>
        <div class="product-page-row-1">
          <div class="left-list">
            <ul>
              <li>Genre:</li>
              <li>Released:</li>
              <li>Age Rating:</li>
            </ul>
          </div>
          <div class="right-list">
            <ul>
              <li>${game.genre}</li>
              <li>${game.released}</li>
              <li>${game.ageRating}</li>
            </ul>
          </div>
        </div>
      </div>`;

        if (!isInCart(game.id)) {
          const cartButton = document.getElementById("cartButton");
          cartButton.addEventListener("click", onAddToCart);
        }

        hideLoading();
      }
    }
  } catch (e) {
    console.warn(e);
    alert("Something went wrong. Please refresh!");
  }
}

await displayProductDetails();
demo();
