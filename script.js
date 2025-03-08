// Toggle mobile menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Function to close menu
const closeMenu = () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        // Reset to bars icon
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
};

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    // Toggle between bars and times (cross) icon
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    // Check if menu is active and click is outside menu and menu toggle
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        closeMenu();
    }
});

// Close menu when scrolling
window.addEventListener('scroll', () => {
    closeMenu();
});

// Wishlist functionality
let wishlistCount = 0;
const wishlistItems = new Set();

// Function to update wishlist count in header
const updateWishlistCount = () => {
    const wishlistIcon = document.querySelector('a[title="Wishlist"]');
    if (wishlistIcon) {
        // Create or update wishlist count span
        let countSpan = wishlistIcon.querySelector('.wishlist-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.classList.add('wishlist-count');
            wishlistIcon.appendChild(countSpan);
        }
        countSpan.textContent = wishlistCount;
        // Hide count if zero
        countSpan.style.display = wishlistCount > 0 ? 'inline-block' : 'none';
    }
};

// Initialize wishlist buttons
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const heartIcon = button.querySelector('i');
        
        if (wishlistItems.has(productTitle)) {
            // Remove from wishlist
            wishlistItems.delete(productTitle);
            wishlistCount--;
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            button.classList.remove('active');
        } else {
            // Add to wishlist
            wishlistItems.add(productTitle);
            wishlistCount++;
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            button.classList.add('active');
        }
        
        updateWishlistCount();
    });
});

// Cart functionality
let cartCount = 0;
const cartItems = new Set();

// Function to update cart count in header
const updateCartCount = () => {
    const cartIcon = document.querySelector('a[title="Cart"]');
    if (cartIcon) {
        // Create or update cart count span
        let countSpan = cartIcon.querySelector('.cart-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.classList.add('cart-count');
            cartIcon.appendChild(countSpan);
        }
        countSpan.textContent = cartCount;
        // Hide count if zero
        countSpan.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
};

// Initialize add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        if (cartItems.has(productTitle)) {
            // Remove from cart
            cartItems.delete(productTitle);
            cartCount--;
            button.textContent = 'Add to Cart';
            button.classList.remove('active');
        } else {
            // Add to cart
            cartItems.add(productTitle);
            cartCount++;
            button.textContent = 'Remove from Cart';
            button.classList.add('active');
        }
        
        updateCartCount();
    });
});

// Initialize the counts on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateCartCount();
});