// Checkout page JavaScript

// Retrieve cart data from localStorage
const cartData = JSON.parse(localStorage.getItem("cart"));

// Reference the container where you want to display cart items on the checkout page
const cartContainer = document.getElementById("product-row-2"); // Update the ID accordingly

// Check if the cart is not empty and the cart container exists
if (cartData && cartData.length > 0 && cartContainer) {
  // Initialize the subtotal
  let subtotal = 0;

  // Iterate through cart items and render them
  cartData.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("product-row");

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.description;

    const itemInfo = document.createElement("ul");
    const itemName = document.createElement("li");
    itemName.textContent = item.title;
    // const itemArticleNumber = document.createElement("li");
    // itemArticleNumber.textContent = `Article number: ${item.id}`;
    // const itemStock = document.createElement("li");
    // itemStock.innerHTML = `<i class="fa-solid fa-circle"></i> 50+ in stock`;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${item.price}`;

    // Append elements to the cart item
    itemInfo.appendChild(itemName);
    // itemInfo.appendChild(itemArticleNumber);
    // itemInfo.appendChild(itemStock);
    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemInfo);
    cartItem.appendChild(itemPrice);

    // Append the cart item to the cart container
    cartContainer.appendChild(cartItem);

    // Calculate item subtotal and add it to the total
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
  });

  // Update the subtotal on the checkout page
  const subtotalElement = document.querySelector(".subtotal"); // Update the selector accordingly
  subtotalElement.textContent = ` Subtotal: $${subtotal.toFixed(2)}`;
}
