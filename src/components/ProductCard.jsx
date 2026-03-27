import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product, darkShadows = false }) => {
  const { addToCart, cartItems } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const [isRippling, setIsRippling] = useState(false);

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className={`group bg-white/95 rounded-2xl overflow-hidden relative transition-all duration-300 flex flex-col backdrop-blur-md ${darkShadows ? 'border border-black/10 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_40px_60px_-10px_rgba(0,0,0,0.8)] hover:-translate-y-2' : 'border border-white/40 shadow-lg shadow-gray-200/70 hover:shadow-2xl hover:shadow-gray-300 hover:-translate-y-1'}`}>
      <button 
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur z-20 text-gray-300 hover:text-red-500 hover:bg-white shadow-sm transition-colors flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          if (!isWishlisted) {
            setIsRippling(true);
            setTimeout(() => setIsRippling(false), 500);
          }
          toggleWishlist(product);
        }}
      >
        {isWishlisted ? <FaHeart className="text-red-500 relative z-10" /> : <FaRegHeart className="relative z-10" />}
        {isRippling && (
          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
        )}
      </button>

      <Link to={`/products/${product.id}`} className="flex flex-col h-full cursor-pointer">
        <div className="h-[160px] w-full p-4 flex items-center justify-center overflow-hidden relative bg-white">
          <img 
            src={product.thumbnail || product.image} 
            alt={product.title} 
            loading="lazy" 
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-3 flex flex-col flex-1 border-t border-gray-50">
          <p className="text-[11px] uppercase text-gray-400 font-semibold mb-1 truncate">{product.category}</p>
          <h3 className="text-[13px] font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-blinkit-green transition-colors">{product.title}</h3>
          
          <div className="flex items-center gap-1 text-[11px] bg-green-50 text-blinkit-green px-1.5 py-0.5 rounded font-bold w-fit mt-auto mb-2">
            <FaStar className="text-[10px]" />
            <span>{product.rating}</span>
            <span className="text-gray-500 font-medium tracking-tighter">({product.reviews?.length || product.stock || 0})</span>
          </div>

          <div className="flex items-center justify-between mt-auto gap-2">
            <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">{formatCurrency(product.price)}</span>
            <button 
              className={`px-4 py-1.5 text-xs rounded-lg uppercase border font-bold tracking-wide transition-all ${
                isInCart 
                  ? 'bg-blinkit-green border-blinkit-green text-white cursor-not-allowed' 
                  : 'bg-white border-blinkit-green text-blinkit-green hover:bg-blinkit-green hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                !isInCart && addToCart(product);
              }}
              disabled={isInCart}
            >
              {isInCart ? 'Added' : 'ADD'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
