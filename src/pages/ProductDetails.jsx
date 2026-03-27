import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { FaHeart, FaRegHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { formatCurrency } from '../utils/helpers';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, cartItems } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="w-12 h-12 border-4 border-gray-200 border-t-blinkit-green rounded-full animate-spin"></div></div>;
  }

  if (error || !product) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><p className="text-xl text-gray-500 bg-gray-50 rounded-2xl py-12 border border-gray-100">{error || 'Product not found'}</p></div>;
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in w-full">
      <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors tracking-widest uppercase bg-transparent border-0 cursor-pointer" onClick={() => navigate(-1)}>
        <FaArrowLeft className="text-xs" /> Back to Shop
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col lg:flex-row p-6 sm:p-10 gap-10">
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 rounded-2xl p-8 min-h-[300px] lg:min-h-[500px]">
          <img 
            src={product.thumbnail || product.images?.[0] || product.image} 
            alt={product.title} 
            className="max-w-full max-h-[400px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            Home <span className="text-gray-300">/</span> {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-6 text-sm font-bold bg-green-50 text-blinkit-green px-3 py-1.5 rounded-lg w-max">
            <FaStar className="text-sm" />
            <span>{product.rating}</span>
            <span className="text-gray-500 font-medium tracking-tight ml-1">({product.reviews?.length || product.stock || 0} reviews)</span>
          </div>

          <div className="text-4xl font-black text-gray-900 tracking-tight mb-8">
            {formatCurrency(product.price)}
          </div>
          
          <div className="mb-10 text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Product Information</h3>
            <p className="text-base leading-relaxed font-medium">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <button 
              className={`flex-1 py-4 px-6 text-sm sm:text-base font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                isInCart 
                  ? 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed' 
                  : 'bg-blinkit-green text-white border-2 border-blinkit-green hover:bg-green-700 hover:border-green-700 hover:-translate-y-1 shadow-lg shadow-green-600/20'
              }`}
              onClick={() => !isInCart && addToCart(product)}
              disabled={isInCart}
            >
              {isInCart ? 'Added to Cart' : 'ADD TO CART'}
            </button>
            <button 
              className="w-16 h-14 sm:h-16 flex items-center justify-center text-xl rounded-xl border-2 border-gray-100 text-gray-400 bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all hover:-translate-y-1 shadow-sm"
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
