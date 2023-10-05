const cartData = JSON.parse(localStorage.getItem("cart"));
const cartContainer = document.getElementById("product-row-2");

if (cartData && cartData.length > 0 && cartContainer) {
  let subtotal = 0;

  cartData.forEach((item) => {
    const actualPrice =
      item.discount && parseFloat(item.discount) < parseFloat(item.price)
        ? parseFloat(item.discount)
        : parseFloat(item.price);

    const cartItem = document.createElement("div");
    cartItem.classList.add("product-row");

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.description;
    cartItem.appendChild(itemImage);

    const itemInfo = document.createElement("ul");
    cartItem.appendChild(itemInfo);

    const itemName = document.createElement("li");
    itemName.textContent = item.title;
    itemInfo.appendChild(itemName);

    const itemQuantity = document.createElement("li");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;
    itemInfo.appendChild(itemQuantity);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${actualPrice.toFixed(2)}`;
    cartItem.appendChild(itemPrice);

    cartContainer.appendChild(cartItem);

    subtotal += actualPrice * item.quantity;
  });

  const subtotalElement = document.querySelector(".subtotal");
  subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const payNowButton = document.querySelector(".cta-pay-now");

  payNowButton.addEventListener("click", function (event) {
    if (!cartData || cartData.length === 0) {
      alert("The cart is empty!");
      event.preventDefault();
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  });
});
