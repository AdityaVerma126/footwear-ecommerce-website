document.addEventListener('DOMContentLoaded', function() {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const productId = this.getAttribute('data-product-id');
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.card-title a').textContent;
      const productImage = productCard.querySelector('.card-banner img').src;
      const productPrice = productCard.querySelector('.card-price').textContent;

      addToWishlist(productId, productName, productImage, productPrice);
    });
  });

  function addToWishlist(id, name, image, price) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.some(item => item.id === id)) {
      wishlist.push({ id, name, image, price });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlistCount();
      renderWishlist();
      alert(`${name} has been added to your wishlist!`);
    } else {
      alert(`${name} is already in your wishlist!`);
    }
  }

  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistBadge = document.querySelector('.nav-action-badge[value="5"]');
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlist.length;
      wishlistBadge.setAttribute('value', wishlist.length);
    }
  }

  function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    wishlistContainer.innerHTML = wishlist.map(item => `
      <div class="wishlist-item">
        <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
        <div class="wishlist-item-details">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
      </div>
    `).join('');
  }

  // Initial update of wishlist count and render wishlist
  updateWishlistCount();
  renderWishlist();
});
