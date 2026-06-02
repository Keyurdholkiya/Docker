// script.js

// 1. Database of food items
const menu = [
    { id: 1, name: "Paneer Butter Masala", price: 280, category: "Main", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400" },
    { id: 2, name: "Cheese Butter Pizza", price: 350, category: "Fast Food", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400" },
    { id: 3, name: "Hyderabadi Biryani", price: 320, category: "Main", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=400" },
    { id: 4, name: "Gulab Jamun (2pc)", price: 80, category: "Dessert", img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400" }
];

let cart = [];

// 2. Render Menu
function displayMenu() {
    const grid = document.getElementById('food-grid');
    grid.innerHTML = menu.map(item => `
        <div class="food-card">
            <img src="${item.img}" alt="${item.name}">
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// 3. Cart Functions
function addToCart(id) {
    const item = menu.find(p => p.id === id);
    const inCart = cart.find(p => p.id === id);

    if (inCart) {
        inCart.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateUI();
}

function updateUI() {
    // Update Cart Count
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;

    // Render Cart Items
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = cart.map(item => `
        <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid #eee; padding-bottom:0.5rem;">
            <div>
                <h4>${item.name}</h4>
                <small>₹${item.price} x ${item.quantity}</small>
            </div>
            <strong>₹${item.price * item.quantity}</strong>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = total;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("Order Placed Successfully! Your food is being prepared.");
    cart = [];
    updateUI();
    toggleCart();
}

// Initialize
displayMenu();