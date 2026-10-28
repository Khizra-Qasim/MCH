// ✅ Load homepage products
async function loadHomeProducts() {
  try {
    const res = await fetch("http://localhost:5000/products/home");
    const products = await res.json();
    displayProducts(products);
  } catch (err) {
    console.error("Error loading homepage products:", err);
  }
}

// ✅ Load products by category
async function loadCategory(categoryName) {
  try {
    const res = await fetch(`http://localhost:5000/products/category/${categoryName}`);
    const products = await res.json();
    displayProducts(products);
  } catch (err) {
    console.error("Error loading category:", err);
  }
}

// ✅ Search products
async function searchProducts() {
  const query = document.getElementById("searchInput").value;
  try {
    const res = await fetch(`http://localhost:5000/products/search/${query}`);
    const products = await res.json();
    displayProducts(products);
  } catch (err) {
    console.error("Error searching products:", err);
  }
}

// ✅ Display products
function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(item => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.image_url}" alt="${item.name}" width="150" onclick="showDetails(${item.id})">
      <p><b>Price:</b> Rs.${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// ✅ Show product details
async function showDetails(id) {
  try {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    const product = await res.json();
    const container = document.getElementById("products");

    container.innerHTML = `
      <div class="details">
        <h2>${product.name}</h2>
        <img src="${product.image_url}" width="250">
        <p><b>Price:</b> Rs.${product.price}</p>
        <p><b>Sizes:</b> ${product.sizes}</p>
        <p><b>Colors:</b> ${product.colors}</p>
        <p><b>Type:</b> ${product.type}</p>
        <p><b>Description:</b> ${product.description}</p>
        <button onclick="loadHomeProducts()">Back to Gallery</button>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  } catch (err) {
    console.error("Error loading product details:", err);
  }
}

// ✅ Add to cart
async function addToCart(productId) {
  const userId = 1; // Example: logged-in user ID
  try {
    const res = await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity: 1 })
    });
    const result = await res.json();
    alert(result.message);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

// ✅ View cart
async function viewCart() {
  const userId = 1; // Example: logged-in user ID
  try {
    const res = await fetch(`http://localhost:5000/cart/${userId}`);
    const cartItems = await res.json();
    const container = document.getElementById("cartSection");
    container.classList.remove("hidden");

    // Clear old content
    container.innerHTML = "<h2>Your Cart</h2>";

    if (cartItems.length === 0) {
      container.innerHTML += "<p>Your cart is empty.</p>";
      return;
    }

    cartItems.forEach(item => {
      container.innerHTML += `
        <p>${item.name} - Rs.${item.price} × ${item.quantity}</p>
      `;
    });

    // Add a close button
    container.innerHTML += `<button onclick="hideCart()">Close Cart</button>`;
  } catch (err) {
    console.error("Error loading cart:", err);
  }
}

// ✅ Hide cart
function hideCart() {
  document.getElementById("cartSection").classList.add("hidden");
}

// ✅ Show login form
function showLogin() {
  document.getElementById("loginSection").classList.remove("hidden");
}

// ✅ Hide login form
function hideLogin() {
  document.getElementById("loginSection").classList.add("hidden");
}

// ✅ Login user
async function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await res.json();

    if (result.success) {
      alert("Login successful!");
      hideLogin();
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    console.error("Error logging in:", err);
  }
}

// ✅ Load homepage products when site opens
window.onload = loadHomeProducts;
