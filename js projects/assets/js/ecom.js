let cart = [];

function addToCart(id, name, price) {
    const productIndex = cart.findIndex(item => item.id === id);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    cartItemsContainer.innerHTML = '';
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-dropdown').classList.toggle('active');
}

function checkout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout!');
        cart = [];
        updateCartUI();
        toggleCart();
    } else {
        alert('Your cart is empty!');
    }
}
