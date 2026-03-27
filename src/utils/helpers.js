export const formatCurrency = (usdAmount) => {
  // mathematical conversion: 1 USD = 83 INR
  const inrAmount = usdAmount * 83;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(inrAmount);
};

export const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};
