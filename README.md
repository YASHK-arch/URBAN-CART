# UrbanCart — E-Commerce Product Explorer & Cart Management App

A complete React-based e-commerce frontend that allows users to browse, search, filter, and purchase products. Built as a solution to **PRD 4 — E-Commerce Product Explorer & Cart Management App**.

🔗 **Live Demo:** [https://yashk-arch.github.io/URBAN-CART/](https://yashk-arch.github.io/URBAN-CART/)

---

## Problem Statement

Modern shopping platforms require strong state management, routing, and UI architecture to deliver a smooth experience. This project builds a complete e-commerce frontend that lets users:

- Browse and explore products
- Search and filter by category, price, and rating
- Sort product listings
- View full product details
- Add/manage items in a cart
- Save items to a wishlist
- Complete a checkout with order summary

---

## Features Implemented

| # | Feature | Status |
|---|---|---|
| 1 | Product Listing (image, title, price, rating, category, add to cart) | ✅ |
| 2 | Product Details Page (gallery, description, add to cart/wishlist) | ✅ |
| 3 | Product Search with debounce | ✅ |
| 4 | Category Filters (sidebar/dropdown) | ✅ |
| 5 | Price / Rating Filters | ✅ |
| 6 | Sorting (price low→high, high→low, rating) | ✅ |
| 7 | Category Tabs for navigation | ✅ |
| 8 | Wishlist — save & view saved products | ✅ |
| 9 | Shopping Cart — add, remove, update quantity | ✅ |
| 10 | Checkout Summary — subtotal, tax, total, order form | ✅ |

---

## Tech Stack

### Core
- **React 19** — component-based UI library
- **Vite 8** — fast build tool with HMR (Hot Module Replacement)
- **React Router DOM v7** — client-side routing

### Styling
- **TailwindCSS 3** — utility-first CSS framework
- **Framer Motion** — animations and page transitions

### State & Data
- **React Context API** — global state (cart, wishlist, auth)
- **Axios** — HTTP client for API calls
- **DummyJSON API** (`https://dummyjson.com`) — live product data

### Forms & Validation
- **React Hook Form** — form state management
- **Yup** — schema-based validation

### UI Libraries
- **Swiper.js** — product/hero carousel
- **React Icons** — icon set
- **React Toastify** — toast notifications
- **UUID** — unique order ID generation

---

## React Concepts Used

### `useState`
Manages local state across the app:
```js
const [cartItems, setCartItems] = useState([])
const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState('all')
```

### `useEffect`
Used to fetch products and react to filter changes:
```js
useEffect(() => {
  fetchProducts()
}, [])
```

### Context API
Three global context providers wrap the entire app:

- **`CartContext`** — stores cart items, exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- **`WishlistContext`** — stores saved items, exposes `toggleWishlist`, `isWishlisted`
- **`AuthContext`** — stores logged-in user `{ name, email }`, exposes `login`, `logout`

```jsx
// main.jsx
<AuthProvider>
  <CartProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </CartProvider>
</AuthProvider>
```

### Custom Hooks
| Hook | Purpose |
|---|---|
| `useProducts()` | Fetches products from API, handles search, filter, sort |
| `useCart()` | Reads from CartContext |
| `useWishlist()` | Reads from WishlistContext |
| `useDebounce(value, delay)` | Delays search input to reduce API/filter calls |

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero carousel + featured products |
| `/products` | Products | Full listing with search, filters, sorting |
| `/products/:id` | ProductDetails | Full product info, gallery, add to cart/wishlist |
| `/cart` | Cart | Cart items, quantities, subtotal |
| `/wishlist` | Wishlist | Saved products |
| `/checkout` | Checkout | Auth-guarded; order form, tax, total, confirmation |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with cart & wishlist badges
│   ├── ProductCard.jsx     # Product tile (image, price, rating, actions)
│   ├── ProductGrid.jsx     # Responsive 1/2/3-col grid layout
│   ├── Filters.jsx         # Category + rating filter panel
│   ├── SearchBar.jsx       # Debounced search input
│   ├── Loader.jsx          # Animated splash/loading screen
│   ├── LoginModal.jsx      # Auth modal (name + email capture)
│   └── ThankYouCard.jsx    # Order success popup with summary
│
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Products.jsx        # Product listing + filters + search
│   ├── ProductDetails.jsx  # Single product full view
│   ├── Cart.jsx            # Cart management
│   ├── Wishlist.jsx        # Saved products
│   └── Checkout.jsx        # Order form + summary (auth-guarded)
│
├── context/
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── AuthContext.jsx
│
├── hooks/
│   ├── useProducts.js
│   ├── useCart.js
│   ├── useWishlist.js
│   └── useDebounce.js
│
├── services/
│   └── api.js              # Axios instance + DummyJSON API calls
│
├── utils/
│   └── helpers.js          # Currency formatting, utility functions
│
├── App.jsx                 # Route definitions
└── main.jsx                # Entry point with all providers
```

---

## API Integration

**Base URL:** `https://dummyjson.com`

| Endpoint | Description |
|---|---|
| `GET /products?limit=100` | Fetch all products |
| `GET /products/categories` | Fetch category list |
| `GET /products/:id` | Fetch single product |

```js
// src/services/api.js
const api = axios.create({ baseURL: 'https://dummyjson.com' })

export const fetchAllProducts  = () => api.get('/products?limit=100')
export const fetchCategories   = () => api.get('/products/categories')
export const fetchProductById  = (id) => api.get(`/products/${id}`)
```

---

## Data Models

**Product**
```json
{ "id", "title", "price", "description", "category", "image", "rating" }
```

**Cart Item**
```json
{ "productId", "quantity", "price" }
```

**Wishlist Item**
```json
{ "productId" }
```

---

## Non-Functional Requirements Met

| Requirement | How |
|---|---|
| Mobile responsive | TailwindCSS — 1/2/3-col grid, fluid layouts |
| Loading states | `Loader.jsx` splash screen + per-component loading indicators |
| API error handling | try/catch in `useProducts` + toast error notifications |
| Smooth animations | Framer Motion — page transitions, cart animations, modal reveal |

---

## Installation & Setup

**Prerequisites:** Node.js ≥ 18, npm

```bash
# 1. Clone the repo
git clone https://github.com/YASHK-arch/URBAN-CART.git
cd URBAN-CART/urban-cart

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## npm Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build + deploy to GitHub Pages |

---

## Evaluation Criteria Coverage

| Criteria | Weight | What was built |
|---|---|---|
| **Feature completeness** | 25% | All 10 features implemented: listing, details, search, filters, price filter, sorting, tabs, wishlist, cart, checkout |
| **React architecture** | 25% | Functional components, custom hooks (`useProducts`, `useCart`, `useWishlist`, `useDebounce`), Context API providers, React Router DOM |
| **State management** | 20% | `useState` + `useEffect` for local state; Context API for global cart, wishlist, auth state |
| **UI design** | 15% | TailwindCSS responsive grid, Framer Motion animations, Swiper carousel, React Toastify, mobile-first layout |
| **Code quality** | 15% | Separation of concerns (pages/components/hooks/context/services), ESLint configured, reusable components, clean API abstraction |
