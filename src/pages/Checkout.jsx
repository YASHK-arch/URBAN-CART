import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, calculateTotal } from '../utils/helpers';
import LoginModal from '../components/LoginModal';
import ThankYouCard from '../components/ThankYouCard';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqlwzpv';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const subtotal = calculateTotal(cartItems);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [showLogin, setShowLogin] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Snapshot of order data — captured before cart is cleared
  const [orderSnapshot, setOrderSnapshot] = useState({ items: [], subtotal: 0, tax: 0, total: 0 });

  // Shipping form state (name + email are auto-filled from auth)
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // ------ Empty cart screen ------
  if (cartItems.length === 0 && !showThankYou) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-12 max-w-xl mx-auto border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">No Items to Checkout</h2>
          <p className="text-gray-500 mb-8 font-medium">Your cart is empty.</p>
          <Link to="/products" className="bg-blinkit-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-700 transition-colors inline-block tracking-wide">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 outline-none focus:border-blinkit-green focus:bg-white focus:ring-2 focus:ring-blinkit-green/20 transition-all";
  const readonlyClasses = "w-full bg-green-50 border border-blinkit-green/30 text-gray-700 text-sm rounded-xl px-4 py-3.5 outline-none cursor-default font-medium";
  const labelClasses = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2";

  // ------ Auth gate ------
  if (!user) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full border border-gray-100 shadow-sm text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Login Required</h2>
            <p className="text-gray-500 font-medium mb-8">
              Please sign in to proceed with your checkout. Your cart is saved!
            </p>
            <button
              id="checkout-login-btn"
              onClick={() => setShowLogin(true)}
              className="w-full bg-blinkit-green text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg text-sm tracking-wide"
            >
              Sign In to Continue
            </button>
            <Link to="/cart" className="block mt-4 text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors">
              ← Back to Cart
            </Link>
          </div>
        </div>

        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </>
    );
  }

  // ------ Build order summary text for email ------
  const buildOrderSummaryText = () => {
    const lines = cartItems.map(
      (item) => `• ${item.quantity}× ${item.title} — ${formatCurrency(item.price * item.quantity)}`
    );
    return lines.join('\n');
  };

  // ------ Handle order submission ------
  const handleCheckout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const orderText = buildOrderSummaryText();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const payload = {
      _subject: `🛒 New Order from UrbanCart — ${user.name}`,
      _replyto: user.email,
      customer_name: user.name,
      customer_email: user.email,
      shipping_address: `${address}, ${city} - ${zip}`,
      order_items: orderText,
      subtotal: formatCurrency(subtotal),
      tax: formatCurrency(tax),
      total: formatCurrency(total),
      order_date: timestamp,
      message: `New order received!\n\nCustomer: ${user.name} <${user.email}>\nAddress: ${address}, ${city} - ${zip}\n\nItems:\n${orderText}\n\nSubtotal: ${formatCurrency(subtotal)}\nTax (8%): ${formatCurrency(tax)}\nTotal: ${formatCurrency(total)}\n\nOrder placed on: ${timestamp}`,
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOrderSnapshot({ items: [...cartItems], subtotal, tax, total });
        clearCart();
        setShowThankYou(true);
      } else {
        const data = await res.json();
        setSubmitError(data?.error || 'Failed to place order. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ------ Main checkout form ------
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Checkout</h1>
          {/* Logged in indicator */}
          <span className="text-xs font-bold text-blinkit-green bg-blinkit-green/10 px-3 py-1.5 rounded-full">
            ✓ Signed in as {user.name.split(' ')[0]}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Left — Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Shipping Information</h2>

              <form className="flex flex-col gap-6" onSubmit={handleCheckout}>
                {/* Auto-filled name */}
                <div>
                  <label className={labelClasses}>Full Name <span className="text-blinkit-green normal-case tracking-normal">(auto-filled)</span></label>
                  <input
                    type="text"
                    className={readonlyClasses}
                    value={user.name}
                    readOnly
                  />
                </div>

                {/* Auto-filled email */}
                <div>
                  <label className={labelClasses}>Email Address <span className="text-blinkit-green normal-case tracking-normal">(auto-filled)</span></label>
                  <input
                    type="email"
                    className={readonlyClasses}
                    value={user.email}
                    readOnly
                  />
                </div>

                <div>
                  <label className={labelClasses}>Shipping Address</label>
                  <input
                    type="text"
                    className={inputClasses}
                    required
                    placeholder="123 Main St"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>City</label>
                    <input
                      type="text"
                      className={inputClasses}
                      required
                      placeholder="New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Zip / PIN Code</label>
                    <input
                      type="text"
                      className={inputClasses}
                      required
                      placeholder="10001"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>

                <h2 className="text-xl font-black text-gray-900 mt-2 mb-1 tracking-tight">Payment Details</h2>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="mb-6">
                    <label className={labelClasses}>Card Number</label>
                    <input
                      type="text"
                      className={`${inputClasses} bg-white`}
                      required
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNum}
                      onChange={(e) => setCardNum(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Expiry Date</label>
                      <input
                        type="text"
                        className={`${inputClasses} bg-white`}
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>CVC</label>
                      <input
                        type="password"
                        maxLength={3}
                        className={`${inputClasses} bg-white`}
                        required
                        placeholder="***"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {submitError && (
                  <p className="text-red-500 text-sm font-medium text-center bg-red-50 rounded-xl py-2 px-4">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  id="place-order-btn"
                  disabled={submitting}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl mt-2 hover:bg-black transition-all shadow-lg text-base tracking-wide flex justify-center items-center gap-2 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    `Place Order — ${formatCurrency(total)}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Order Summary</h3>
              <div className="flex flex-col gap-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium line-clamp-1 pr-4">{item.quantity}× {item.title}</span>
                    <span className="font-bold text-gray-900 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4 text-gray-600 font-medium text-sm pt-4 border-t border-gray-100">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900 text-base">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center pb-6 text-gray-600 font-medium text-sm border-b border-gray-100">
                <span>Tax (8%)</span>
                <span className="font-bold text-gray-900 text-base">{formatCurrency(tax)}</span>
              </div>

              <div className="flex justify-between items-center pt-6 mb-2 text-lg font-black text-gray-900 tracking-tight">
                <span>Total Payment</span>
                <span className="text-blinkit-green text-xl">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Popup */}
      <ThankYouCard
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        orderItems={orderSnapshot.items}
        subtotal={orderSnapshot.subtotal}
        tax={orderSnapshot.tax}
        total={orderSnapshot.total}
        customerName={user?.name || ''}
      />
    </>
  );
};

export default Checkout;
