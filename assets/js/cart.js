document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.card-action-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            
            // Get product details
            const id = productCard.dataset.productId;
            const name = productCard.querySelector('.card-title').textContent;
            const image = productCard.querySelector('.card-banner img').src;
            const price = productCard.querySelector('.card-price').textContent;
            const category = productCard.querySelector('.card-cat').textContent;

            addToCart(id, name, image, price, category);
        });
    });

    // Initial render
    renderCart();
});

function addToCart(id, name, image, price, category) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push({
        id,
        name,
        image,
        price,
        category,
        quantity: 1,
        size: '40'
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <ion-icon name="cart-outline"></ion-icon>
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart</p>
            </div>
        `;
        calculateAndUpdateSummary();
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-category">${item.category}</p>
                <div class="item-price">${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 'decrease')">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 'increase')">+</button>
                </div>
                <div class="item-controls">
                    <select class="size-select" onchange="updateSize(${index}, this.value)">
                        ${[38,39,40,41,42,43,44].map(size => 
                            `<option value="${size}" ${item.size == size ? 'selected' : ''}>
                                ${size}
                            </option>`
                        ).join('')}
                    </select>
                    <button class="delete-btn" onclick="removeFromCart(${index})">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    calculateAndUpdateSummary();
}

window.updateQuantity = function(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        if (action === 'increase') {
            cart[index].quantity++;
        } else if (action === 'decrease' && cart[index].quantity > 1) {
            cart[index].quantity--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

window.updateSize = function(index, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].size = size;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item at the specified index
    cart.splice(index, 1);
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    renderCart();
    updateCartCount();
    
    // Show feedback
    const feedbackMessage = document.createElement('div');
    feedbackMessage.className = 'feedback-message';
    feedbackMessage.textContent = 'Item removed from cart';
    document.body.appendChild(feedbackMessage);
    
    // Remove feedback message after 2 seconds
    setTimeout(() => {
        feedbackMessage.remove();
    }, 2000);
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartBadge = document.querySelector('.nav-action-badge');
    if (cartBadge) {
        cartBadge.textContent = count;
    }
}

function calculateAndUpdateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 50 ? 0 : 5;
    const total = subtotal + shipping;

    const summarySubtotal = document.querySelector('.summary-subtotal');
    const summaryShipping = document.querySelector('.summary-shipping');
    const summaryTotal = document.querySelector('.total-amount');

    if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (summaryShipping) summaryShipping.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;
}
