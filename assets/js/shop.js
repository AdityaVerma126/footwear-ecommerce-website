const products = [
    { id: 1, name: "Running Sneaker Shoes", category: "men", price: 180.85, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 2, name: "Leather Mens Slipper", category: "men", price: 190.85, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" },
    { id: 3, name: "Simple Fabric Shoe", category: "women", price: 160.85, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a" },
    { id: 4, name: "Air Jordan 7 Retro", category: "sports", price: 170.85, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3" },
    { id: 5, name: "Women's High Heels", category: "women", price: 210.99, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    { id: 6, name: "Men's Casual Loafers", category: "men", price: 145.50, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509" },
    { id: 7, name: "Tennis Shoes", category: "sports", price: 189.99, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
    { id: 8, name: "Women's Sandals", category: "women", price: 99.99, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306" },
   
    { id: 10, name: "Basketball Sneakers", category: "sports", price: 199.99, image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842" },
    { id: 11, name: "Men's Hiking Boots", category: "men", price: 179.99, image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd" },
    { id: 12, name: "Women's Ballet Flats", category: "women", price: 89.99, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    { id: 13, name: "Kids' Velcro Sneakers", category: "kids", price: 59.99, image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2" },
];

const productGrid = document.getElementById('product-grid');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');

function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}?auto=format&fit=crop&w=300&h=300" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        const categoryMatch = category === 'all' || product.category === category;
        const searchMatch = product.name.toLowerCase().includes(searchTerm);
        return categoryMatch && searchMatch;
    });
    
    renderProducts(filteredProducts);
}

function addToCart(productId) {
    // Implement your add to cart functionality here
    console.log(`Product ${productId} added to cart`);
}

categoryFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Initial render
renderProducts(products);
