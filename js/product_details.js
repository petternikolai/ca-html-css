import { getGames } from "./getGames.js";

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
    hideLoading();
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      if (id === game.id) {
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
          <img src="${game.image}" alt="${game.description}">
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
        <p class="extra-large-p">$${game.price}</p>
        <a class="cta-add-to-cart" href="#">ADD TO CART</a>
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
              <li>${game.geRating}</li>
            </ul>
          </div>
        </div>
      </div>`;
      }
    }
  } catch (e) {
    console.warn(e);
    alert("Something went wrong. Please refresh!");
  }
}

displayProductDetails();
