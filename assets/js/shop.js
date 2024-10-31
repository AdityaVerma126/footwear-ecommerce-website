let products = [];
let categoryFilter;
let searchInput;

async function fetchProducts() {
  try {
    console.log('Fetching products...');
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Fetched ${data.length} products`);
    products = data;
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function renderProducts(products) {
  console.log('Rendering products...');
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) {
    console.error('Product grid not found');
    return;
  }
  
  // Clear existing content
  productGrid.innerHTML = '';
  
  // Create a document fragment to batch DOM operations
  const fragment = document.createDocumentFragment();
  
  products.forEach(product => {
    const productElement = createProductElement(product);
    fragment.appendChild(productElement);
  });
  
  // Append all products at once
  productGrid.appendChild(fragment);
  
  console.log(`Rendered ${products.length} products`);
  
  // Lazy load images after rendering
  lazyLoadImages();
}

function createProductElement(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.innerHTML = `
    <div class="img-placeholder" data-src="${product.image}"></div>
    <h3>${product.name}</h3>
    <p class="category">${product.category}</p>
    <p class="price">$${product.price.toFixed(2)}</p>
    <button class="add-to-cart">Add to Cart</button>
  `;
  return productCard;
}

function lazyLoadImages() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const placeholder = entry.target;
        const img = new Image();
        img.src = placeholder.dataset.src;
        img.onload = () => {
          placeholder.parentNode.replaceChild(img, placeholder);
        };
        observer.unobserve(placeholder);
      }
    });
  });

  document.querySelectorAll('.img-placeholder').forEach(placeholder => {
    imageObserver.observe(placeholder);
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

function initializeFilters() {
  categoryFilter = document.getElementById('category-filter');
  searchInput = document.getElementById('search-input');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
  } else {
    console.error('Category filter not found');
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  } else {
    console.error('Search input not found');
  }
}

function initShop() {
  console.log('Initializing shop...');
  fetchProducts();
  initializeFilters();
}

// Use DOMContentLoaded event to ensure the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShop);
} else {
  initShop();
}

console.log('shop.js loaded');
