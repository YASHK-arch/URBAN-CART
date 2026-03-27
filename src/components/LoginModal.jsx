import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaTimes, FaUser, FaEnvelope, FaSignInAlt } from 'react-icons/fa';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqlwzpv';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setError('');
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Login: ${name} on UrbanCart`,
          name,
          email,
          _replyto: email,
          action: 'User Login',
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });

      if (res.ok) {
        login(name.trim(), email.trim());
        setName('');
        setEmail('');
        onClose();
      } else {
        const data = await res.json();
        setError(data?.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors text-lg"
          aria-label="Close login modal"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blinkit-green/10 text-blinkit-green text-3xl mb-4">
            <FaUser />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome to UrbanCart</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Sign in to continue shopping</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser />
            </span>
            <input
              type="text"
              id="login-name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 outline-none focus:border-blinkit-green focus:bg-white focus:ring-2 focus:ring-blinkit-green/20 transition-all"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="login-email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 outline-none focus:border-blinkit-green focus:bg-white focus:ring-2 focus:ring-blinkit-green/20 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center bg-red-50 rounded-xl py-2 px-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            id="login-submit-btn"
            className="flex items-center justify-center gap-2 w-full bg-blinkit-green text-white font-bold py-4 rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-lg text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <>
                <FaSignInAlt /> Sign In
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 font-medium">
            Your info is kept safe and only used to personalise your shopping experience.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
