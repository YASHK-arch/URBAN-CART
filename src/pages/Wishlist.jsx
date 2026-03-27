import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import ProductCard from '../components/ProductCard';
import { FaHeart } from 'react-icons/fa';

const HeartRain = () => {
  const hearts = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    size: Math.random() * 1.5 + 0.8,
    duration: Math.random() * 2 + 2.5
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <style>
        {`
          @keyframes wishlistHeartFall {
            0% { transform: translateY(-10vh) rotate(-15deg) scale(0.5); opacity: 0; }
            10% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.9; }
            80% { opacity: 0.9; }
            100% { transform: translateY(110vh) rotate(45deg) scale(0.8); opacity: 0; }
          }
        `}
      </style>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute top-[-10%] text-red-500 drop-shadow-md"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animation: `wishlistHeartFall ${h.duration}s ease-in forwards ${h.delay}s`
          }}
        >
          <FaHeart />
        </div>
      ))}
    </div>
  );
};

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-12 max-w-xl mx-auto border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-8">Save items you like to your wishlist to easily find them later.</p>
          <Link to="/products" className="bg-blinkit-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-700 transition-colors inline-block tracking-wide">Explore Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in w-full relative">
      <HeartRain />
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Wishlist</h1>
        <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{wishlist.length} Items</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 w-full">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
