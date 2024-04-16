document.addEventListener("DOMContentLoaded", function () {
  const restaurantContainer = document.querySelector(".card-slider");
  const leftRButton = document.querySelector(".restaurant-arrow-left");
  const rightRButton = document.querySelector(".restaurant-arrow-right");

  function updateButtonState() {
    leftRButton.disabled = restaurantContainer.scrollLeft <= 0;
    rightRButton.disabled =
      restaurantContainer.scrollLeft + restaurantContainer.offsetWidth >=
      restaurantContainer.scrollWidth;
  }

  leftRButton.onclick = function () {
    restaurantContainer.scrollBy({
      left: -restaurantContainer.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  rightRButton.onclick = function () {
    restaurantContainer.scrollBy({
      left: restaurantContainer.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  restaurantContainer.addEventListener("scroll", updateButtonState);
  updateButtonState();
});

var burgerMenu = document.getElementById('burger-menu');

var overlay = document.getElementById('menu');

burgerMenu.addEventListener('click', function() {
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});
// Function to update the cart counter
function updateCartCounter() {
    var cartCounter = document.getElementById('cart-counter');
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartCounter.textContent = cartItems.length;
}

// Call updateCartCounter function to initialize the cart counter
updateCartCounter();

// Function to add a product to the cart
function addToCart(productName, price) {
    // Create a new item object
    var item = {
        name: productName,
        price: price
    };

    // Get the current cart items from local storage or initialize an empty array
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cartItems.push(item);

    // Save the updated cart items to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Update the cart counter
    updateCartCounter();
    // Display the updated cart
    displayCart();
}

// Function to display the items in the cart
function displayCart() {
    var cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear previous content

    // Get the cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Loop through each item and display it in the cart
    cartItems.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.textContent = item.name + ' - ' + item.price;
        cartContainer.appendChild(itemElement);
    });
}

// Call displayCart function when the page loads to show any existing items in the cart
displayCart();

// Add event listeners to "Add to cart" buttons
var addToCartButtons = document.querySelectorAll('.btn-outline-secondary');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var productContainer = event.target.closest('.product__content');
        var productName = productContainer.querySelector('h1').textContent.trim();
        var productPrice = productContainer.querySelector('.product__content_info_price').textContent.trim();
        addToCart(productName, productPrice);
    });
});


