import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';
import { FaTimes, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';

const ThankYouCard = ({ isOpen, onClose, orderItems = [], subtotal = 0, tax = 0, total = 0, customerName = '' }) => {
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBuyMore = () => {
    onClose();
    navigate('/products');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-10 overflow-hidden animate-fade-in">
        {/* Green top banner */}
        <div className="bg-blinkit-green px-8 pt-8 pb-10 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors text-lg"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 text-white text-5xl mb-4">
            <FaCheckCircle />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {customerName ? `Thank you, ${customerName.split(' ')[0]}! 🎉` : 'Thank You! 🎉'}
          </h2>
          <p className="text-green-100 text-sm mt-1 font-medium">Your order has been placed successfully</p>
          <p className="text-green-100 text-xs mt-1">A confirmation has been sent to your email.</p>
        </div>

        {/* Scallop edge */}
        <div className="relative bg-white -mt-4 rounded-t-3xl">
          <div className="px-8 pt-6 pb-4">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Order Summary</h3>
            <div className="flex flex-col gap-3 max-h-36 overflow-y-auto pr-1">
              {orderItems.map((item, idx) => (
                <div key={item.id ?? idx} className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium line-clamp-1 pr-4">{item.quantity}× {item.title}</span>
                  <span className="font-bold text-gray-900 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-8 border-t border-gray-100 py-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-500 font-medium">
              <span>Subtotal</span><span className="font-bold text-gray-800">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500 font-medium">
              <span>Tax (8%)</span><span className="font-bold text-gray-800">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100 mt-1">
              <span>Total Paid</span>
              <span className="text-blinkit-green text-lg">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="px-8 pb-8 pt-2 flex flex-col gap-3">
            <button
              id="buy-more-btn"
              onClick={handleBuyMore}
              className="w-full bg-blinkit-green text-white font-bold py-4 rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-lg text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <FaShoppingBag /> Buy More
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-500 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouCard;
