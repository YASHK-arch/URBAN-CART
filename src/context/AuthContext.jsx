import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context to share authentication state across the app
export const AuthContext = createContext();

// Provider component that wraps your app and provides auth data
export const AuthProvider = ({ children }) => {

  // Initialize user state from localStorage (runs only once on mount)
  const [user, setUser] = useState(() => {
    try {
      // Try to get saved user data from localStorage
      const saved = localStorage.getItem('uc_user');
      return saved ? JSON.parse(saved) : null; // Parse if exists
    } catch {
      // If parsing fails, return null (no user)
      return null;
    }
  });

  // Sync user state with localStorage whenever user changes
  useEffect(() => {
    if (user) {
      // Save user data to localStorage
      localStorage.setItem('uc_user', JSON.stringify(user));
    } else {
      // Remove user data when logged out
      localStorage.removeItem('uc_user');
    }
  }, [user]);

  // Function to log in a user (stores name & email)
  const login = (name, email) => {
    setUser({ name, email });
  };

  // Function to log out user (clears state)
  const logout = () => {
    setUser(null);
  };

  return (
    // Provide user data and auth functions to all children components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext easily in components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  // Ensure hook is used inside AuthProvider
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');

  return ctx; // Return context (user, login, logout)
};