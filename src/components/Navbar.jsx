import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/URBAN-CART LOGO.png';
import { FaHeart, FaShoppingCart, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          {/* Brand */}
          <Link to="/" className="text-5xl font-amatic font-bold tracking-widest text-[#FFC107] flex items-center drop-shadow-sm pb-1">
            <img src={logoUrl} alt="UrbanCart" className="h-10 w-auto mr-2 object-contain" />
            Urban<span className="text-blinkit-green ml-1">Cart</span>
          </Link>

          {/* Links */}
          <ul className="hidden md:flex gap-8 items-center list-none">
            <li>
              <Link to="/" className="font-semibold text-gray-600 hover:text-blinkit-green transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/products" className="font-semibold text-gray-600 hover:text-blinkit-green transition-colors">Shop</Link>
            </li>
          </ul>

          {/* Icons & Actions */}
          <div className="flex gap-6 items-center">
            <Link to="/wishlist" className="relative text-gray-700 hover:text-blinkit-green transition-transform hover:scale-110 flex items-center text-xl">
              <FaHeart />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Auth button */}
            {user ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blinkit-green/10 text-blinkit-green font-bold text-sm hover:bg-blinkit-green/20 transition-all"
                >
                  <FaUser className="text-xs" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <FaChevronDown className="text-xs" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-black text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate font-medium">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      id="logout-btn"
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                onClick={() => setShowLoginModal(true)}
                className="font-bold text-gray-700 text-sm hover:text-blinkit-green transition-colors px-3 py-2 rounded-xl hover:bg-gray-50"
              >
                Login
              </button>
            )}

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-transform hover:scale-105 ${
                cartCount > 0
                  ? 'bg-blinkit-green text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:scale-100'
              }`}
            >
              <FaShoppingCart />
              <span>{cartCount > 0 ? `${cartCount} items` : 'My Cart'}</span>
            </Link>
          </div>

        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Close user menu on outside click */}
      {showUserMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
      )}
    </>
  );
};

export default Navbar;
