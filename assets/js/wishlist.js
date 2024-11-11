document.addEventListener('DOMContentLoaded', function() {
    // Initialize wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Add click event listeners to all "Add to Wishlist" buttons
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the product card element
            const productCard = this.closest('.product-card');
            
            // Get product details
            const productId = this.getAttribute('data-product-id');
            const productName = productCard.querySelector('.card-title a').textContent;
            const productImage = productCard.querySelector('.card-banner img').src;
            const productPrice = productCard.querySelector('.card-price').getAttribute('value');

            // Create product object
            const product = {
                id: productId,
                name: productName,
                image: productImage,
                price: productPrice,
                description: `${productName} - $${productPrice}`
            };

            // Check if product is already in wishlist
            const existingProduct = wishlist.find(item => item.id === productId);
            
            if (!existingProduct) {
                // Add to wishlist
                wishlist.push(product);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert('Product added to wishlist!');
            } else {
                alert('Product is already in your wishlist!');
            }
        });
    });
});
