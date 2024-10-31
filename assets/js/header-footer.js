class SpecialHeader extends HTMLElement {
    constructor() {
        super();
        console.log('SpecialHeader constructor called');
        this.innerHTML = `
            <header class="header slide-in" data-header>
                <div class="container">

      <div class="overlay" data-overlay></div>

      <a href="#" class="logo">
        <img src="images/logo.svg" width="160" height="50" 
        alt="Footcap logo">
      </a>

      <button class="nav-open-btn" data-nav-open-btn 
      aria-label="Open Menu">
        <ion-icon name="menu-outline"></ion-icon>
      </button>

      <nav class="navbar" data-navbar>

        <button class="nav-close-btn" data-nav-close-btn 
        aria-label="Close Menu">
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <a href="#" class="logo">
          <img src="images/logo.svg" width="190" 
          height="50" alt="Footcap logo">
        </a>

        <ul class="navbar-list">

          <li class="navbar-item">
            <a href="#" class="navbar-link">Home</a>
          </li>

          <li class="navbar-item">
            <a href="/about" class="navbar-link" method 
            ="post">About</a>
          </li>

          <li class="navbar-item">
            <a href="#" class="navbar-link">Shop</a>
          </li>

          <li class="navbar-item">
            <a href="/shop" class="navbar-link">Products</a>
          </li>

          <li class="navbar-item">
            <a href="/blog" class="navbar-link">Blog</a>
          </li>

          <li class="navbar-item">
            <a href="/contactus" 
            class="navbar-link">Contact</a>
          </li>

        </ul>

        <ul class="nav-action-list">

          <li>
            <button class="nav-action-btn">
              <ion-icon name="search-outline" 
              aria-hidden="true"></ion-icon>

              <span class="nav-action-text">Search</span>
            </button>
          </li>

          <li>
            <a href="#" class="nav-action-btn">
              <ion-icon name="person-outline" 
              aria-hidden="true"></ion-icon>

              <span class="nav-action-text">Login / 
              Register</span>
            </a>
          </li>

          <li>
            <a href="/wishlist" class="nav-action-btn">
              <ion-icon name="heart-outline" 
              aria-hidden="true"></ion-icon>

              <span class="nav-action-text">Wishlist</span>
              
              <data class="nav-action-badge" value="5" 
              aria-hidden="true">5</data>
            </a>
          </li>

          <li>
            <button class="nav-action-btn">
              <ion-icon name="bag-outline" 
              aria-hidden="true"></ion-icon>

              <data class="nav-action-text" value="318.
              00">Basket: <strong>$318.00</strong></data>

              <data class="nav-action-badge" value="4" 
              aria-hidden="true">4</data>
            </button>
          </li>

        </ul>

      </nav>

    </div>
  


       

            </header>
        `;
    }

    connectedCallback() {
        console.log('SpecialHeader connected to the DOM');
    }
}

// Define the custom element
customElements.define('special-header', SpecialHeader);
console.log('SpecialHeader custom element defined');