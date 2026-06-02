// 🚨 SABSE PEHLE APNI EC2 KI PUBLIC IP YAHA DALO
const BACKEND_IP = "13.232.170.131"; 

let menu = [];
let cart = [];

// 1. Backend API se live food items fetch karna
async function fetchMenu() {
    try {
        const response = await fetch(`http://${BACKEND_IP}:3000/api/menu`);
        menu = await response.json();
        displayMenu();
    } catch (error) {
        console.error("Backend connect nahi ho pa raha hai:", error);
    }
}

// 2. Render Menu
function displayMenu() {
    const grid = document.getElementById('food-grid');
    if(!grid) return;
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
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countEl = document.getElementById('cart-count');
    if(countEl) countEl.innerText = count;

    const cartList = document.getElementById('cart-items');
    if(cartList) {
        cartList.innerHTML = cart.map(item => `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid #eee; padding-bottom:0.5rem;">
                <div>
                    <h4>${item.name}</h4>
                    <small>₹${item.price} x ${item.quantity}</small>
                </div>
                <strong>₹${item.price * item.quantity}</strong>
            </div>
        `).join('');
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalEl = document.getElementById('cart-total');
    if(totalEl) totalEl.innerText = total;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar) sidebar.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("Order Placed Successfully! Your food is being prepared.");
    cart = [];
    updateUI();
    toggleCart();
}

// Initialize - Hardcoded array ke badle server se data mangao
fetchMenu();
