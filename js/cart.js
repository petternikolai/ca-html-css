import { getGames } from "./getGames.js";
import { displayProductDetails } from "./product_details.js";

function save(key, value) {
  const encodedValue = JSON.stringify(value);
  localStorage.setItem(key, encodedValue);
}

function load(key) {
  const encodedValue = localStorage.getItem(key);
  return JSON.parse(encodedValue);
}

function remove(key) {
  localStorage.removeItem(key);
}

let cart = load("cart") || [];

function onAddToCart(event) {
  const button = event.target;
  const id = button.dataset.id;
  const title = button.dataset.title;
  const price = button.dataset.price;
  const discount = button.dataset.discount;
  const image = button.dataset.image;
  const description = button.dataset.description;

  const itemInCart = cart.find((item) => item.id === id);

  if (itemInCart) {
    alert("Product already in cart");
  } else {
    cart.push({
      id,
      title,
      price,
      discount,
      image,
      description,
      quantity: 1,
    });
  }
  save("cart", cart);
}

export function demo() {
  if (document.body.id === "store") {
    const button = document.querySelector("button[data-id]");
    button.addEventListener("click", onAddToCart);
  }
}

const cartItems = document.querySelector(".grid");

function renderCart() {
  if (document.body.id === "cart") {
    cartItems.innerHTML = `
      <div class="col hidden">
        <p>Item</p>
      </div>
      <div class="col hidden">
        <p>Info</p>
      </div>
      <div class="col hidden">
        <p>Quantity</p>
      </div>
      <div class="col hidden">
        <p>Price</p>
      </div>
      <div class="col hidden">
        <p>Remove from cart</p>
      </div>`;

    const itemsInCart = JSON.parse(localStorage.getItem("cart"));
    let subtotal = 0;
    itemsInCart.forEach((item) => {
      var imageColumn = document.createElement("div");
      imageColumn.classList.add("img-col");
      var image = document.createElement("img");
      image.id = "cart-picture";
      image.src = item.image;
      image.alt = item.description;
      var titleColumn = document.createElement("div");
      titleColumn.classList.add("title-col");
      var title = document.createElement("h4");
      title.innerHTML = item.title;
      var quantityColumn = document.createElement("div");
      quantityColumn.classList.add("quantity-col");
      var quantityContainer = document.createElement("div");
      quantityContainer.classList.add("quantity");
      var decrease = document.createElement("div");
      decrease.classList.add("decrease");
      decrease.innerHTML = "-";
      var quantity = document.createElement("div");
      quantity.classList.add("number");
      quantity.innerHTML = item.quantity;
      var increase = document.createElement("div");
      increase.classList.add("increase");
      increase.innerHTML = "+";
      var priceColumn = document.createElement("div");
      priceColumn.classList.add("price-col");
      var price = document.createElement("p");
      if (item.price !== item.discount) {
        price.innerHTML = "$" + item.discount;
      } else {
        price.innerHTML = "$" + item.price;
      }
      var removeColumn = document.createElement("div");
      removeColumn.classList.add("remove-col");
      var removeAnchorTag = document.createElement("a");
      removeAnchorTag.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

      cartItems.append(imageColumn);
      imageColumn.appendChild(image);
      cartItems.append(titleColumn);
      titleColumn.appendChild(title);
      cartItems.append(quantityColumn);
      quantityColumn.appendChild(quantityContainer);
      quantityContainer.appendChild(decrease);
      quantityContainer.appendChild(quantity);
      quantityContainer.appendChild(increase);
      cartItems.append(priceColumn);
      priceColumn.appendChild(price);
      cartItems.append(removeColumn);
      removeColumn.appendChild(removeAnchorTag);

      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      increase.addEventListener("click", () => incrementQuantity(item.id));
      decrease.addEventListener("click", () => decrementQuantity(item.id));

      removeAnchorTag.addEventListener("click", () =>
        removeItemFromCart(item.id)
      );
    });

    const subtotalElement = document.querySelector(".col-second-last");
    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  }
}

function incrementQuantity(itemId) {
  const cart = load("cart") || [];
  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      item.quantity += 1;
    }
    return item;
  });
  save("cart", updatedCart);
  renderCart();
}

incrementQuantity();

function decrementQuantity(itemId) {
  const cart = load("cart") || [];
  const updatedCart = cart.map((item) => {
    if (item.id === itemId && item.quantity > 1) {
      item.quantity -= 1;
    }
    return item;
  });
  save("cart", updatedCart);
  renderCart();
  // You may want to call renderCart to update the displayed quantity
}

decrementQuantity();

function removeItemFromCart(itemId) {
  const cart = load("cart") || [];
  const updatedCart = cart.filter((item) => item.id !== itemId); // Remove the item
  save("cart", updatedCart);
  renderCart(); // Update the cart and subtotal
}

removeItemFromCart();
