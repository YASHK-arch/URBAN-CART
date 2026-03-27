import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatCurrency, calculateTotal } from '../utils/helpers';
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty > 0) {
      updateQuantity(id, newQty);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-12 max-w-xl mx-auto border border-gray-100 shadow-sm">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 font-medium">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="bg-blinkit-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-700 transition-colors inline-block tracking-wide">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const subtotal = calculateTotal(cartItems);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={item.id} className={`p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center ${index !== cartItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <Link to={`/products/${item.id}`} className="w-20 h-20 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center p-2">
                  <img src={item.thumbnail || item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                </Link>
                
                <div className="flex-1">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 hover:text-blinkit-green mb-1 transition-colors">{item.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">{item.category}</p>
                  <div className="text-base font-black text-gray-900">{formatCurrency(item.price)}</div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)} className="px-3 py-2 text-gray-500 hover:text-blinkit-green hover:bg-gray-100 transition-colors">
                      <FaMinus size={10} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)} className="px-3 py-2 text-gray-500 hover:text-blinkit-green hover:bg-gray-100 transition-colors">
                      <FaPlus size={10} />
                    </button>
                  </div>
                  
                  <div className="w-20 text-right font-black text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                  
                  <button 
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                    onClick={() => removeFromCart(item.id)}
                    title="Remove from cart"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-2">
            <button className="text-sm font-bold text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-colors tracking-widest uppercase border border-red-100" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Order Summary</h3>
            
            <div className="flex justify-between items-center mb-4 text-gray-600 font-medium text-sm">
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
              <span className="font-bold text-gray-900 text-base">{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center pb-6 text-gray-600 font-medium text-sm border-b border-gray-100">
              <span>Tax (8%)</span>
              <span className="font-bold text-gray-900 text-base">{formatCurrency(tax)}</span>
            </div>
            
            <div className="flex justify-between items-center pt-6 mb-8 text-lg font-black text-gray-900 tracking-tight">
              <span>Total Payment</span>
              <span className="text-blinkit-green text-xl">{formatCurrency(total)}</span>
            </div>
            
            <button 
              className="w-full bg-blinkit-green text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-base tracking-wide flex items-center justify-center gap-2 hover:-translate-y-1"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
