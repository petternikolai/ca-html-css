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
    const idInteger = parseInt(id);

    const hideLoading = () => {
      loaderContainer.style.display = "none";
    };

    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      console.log(game.id);
      if (idInteger === game.id) {
        const buttonLabel = isInCart(game.id) ? "ADDED TO CART" : "ADD TO CART";
        const buttonColor = isInCart(game.id) ? "green" : "";
        const buttonBorder = isInCart(game.id) ? "none" : "";
        const buttonDisabled = isInCart(game.id) ? "disabled" : "";
        const priceHTML =
          game.prices.sale_price < game.prices.regular_price
            ? `<span class="strikethrough">${game.prices.regular_price}</span> $${game.prices.sale_price}`
            : `${game.prices.regular_price}`;

        productDetailsContainer.innerHTML = `
        <div class="main-content">
        <div>
          <h1 class="no-bottom-margin">${game.name}</h1>
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <p>4,7</p>
          </div>
          <img class="product-details-img" src="${game.images[0].src}" alt="${game.images[0].alt}">
        </div>
        <div class="product-info">
          <div class="top-row">
          </div>
          <div class="summary">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
          </div>
        </div>
      </div>
      <div class="add-to-cart-sticky">
        <p class="extra-large-p">$${priceHTML}</p>
        <button 
          id="cartButton" 
          data-id="${game.id}" 
          data-title="${game.name}" 
          data-price="${game.prices.regular_price}" 
          data-image="${game.images[0].src}" 
          data-description="${game.description}" 
          data-discount="${game.prices.sale_price}" 
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
              <li>${game.attributes[0].terms[0].name}</li>
              <li>${game.attributes[1].terms[0].name}</li>
              <li>${game.attributes[2].terms[0].name}</li>
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

document.addEventListener("DOMContentLoaded", async () => {
  await displayProductDetails();
  demo();
});
