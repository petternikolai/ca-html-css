const cartData = JSON.parse(localStorage.getItem("cart"));
const cartContainer = document.getElementById("product-row-2");

if (cartData && cartData.length > 0 && cartContainer) {
  let subtotal = 0;

  cartData.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("product-row");

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.description;

    const itemInfo = document.createElement("ul");
    const itemName = document.createElement("li");
    itemName.textContent = item.title;

    const itemQuantity = document.createElement("li");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${item.price}`;

    itemInfo.appendChild(itemName);
    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemInfo);
    cartItem.appendChild(itemQuantity);
    cartItem.appendChild(itemPrice);

    cartContainer.appendChild(cartItem);

    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
  });

  const subtotalElement = document.querySelector(".subtotal");
  subtotalElement.textContent = ` Subtotal: $${subtotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const payNowButton = document.querySelector(".cta-pay-now");

  payNowButton.addEventListener("click", function (event) {
    if (!cartData || cartData.length === 0) {
      alert("The cart is empty!");
      event.preventDefault();
    } else {
      // Clear the cart data from local storage
      localStorage.setItem("cart", JSON.stringify([]));
    }
  });
});
