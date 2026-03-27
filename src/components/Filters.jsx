import React from 'react';

const Filters = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  priceRange, 
  setPriceRange,
  sortBy,
  setSortBy
}) => {
  const priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹100', value: '0-100' },
    { label: '₹100 - ₹500', value: '100-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: 'Over ₹1000', value: '1000-plus' }
  ];

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-fade-in w-full">
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
        <ul className="flex flex-col gap-1.5">
          {categories.map(cat => (
            <li key={cat}>
              <button 
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                  activeCategory === cat 
                    ? 'bg-blinkit-green/10 text-blinkit-green font-bold' 
                    : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All Products' ? 'All Items' : cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range</h3>
        <select 
          value={priceRange} 
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-blinkit-green focus:bg-white transition-colors cursor-pointer appearance-none"
        >
          {priceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sort By</h3>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-blinkit-green focus:bg-white transition-colors cursor-pointer appearance-none"
        >
          <option value="featured">Featured Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </aside>
  );
};

export default Filters;
