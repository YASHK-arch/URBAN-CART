import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, categories = [], products = [], setActiveCategory }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const term = searchTerm.toLowerCase();
  const cleanCategories = categories.filter(c => c !== 'All Products');
  const categoryMatches = cleanCategories.filter(c => c.toLowerCase().includes(term));
  const productMatches = products
    .filter(p => p.title.toLowerCase().includes(term))
    .slice(0, 5);

  const hasSuggestions = term.length > 0 && (categoryMatches.length > 0 || productMatches.length > 0);

  const handleSuggestionClick = (value, isCategory = false) => {
    setSearchTerm(value);
    setShowSuggestions(false);
    if (isCategory && setActiveCategory) {
      setActiveCategory(value);
      setSearchTerm(''); 
    }
  };

  return (
    <div className="mb-6 w-full relative z-40" ref={wrapperRef}>
      <div className="relative w-full max-w-2xl mx-auto">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.1rem] z-10" />
        <input 
          type="text" 
          placeholder="Search items..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-white border border-gray-200 text-gray-800 text-base outline-none transition-all duration-200 shadow-sm focus:border-blinkit-green focus:ring-2 focus:ring-blinkit-green/20"
        />
        
        {showSuggestions && hasSuggestions && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col z-50 animate-fade-in">
            {categoryMatches.length > 0 && (
              <div className="flex flex-col">
                <div className="px-4 py-2 text-xs uppercase font-bold text-gray-400 bg-gray-50 border-b border-gray-100">Categories</div>
                {categoryMatches.map(c => (
                  <div 
                    key={c} 
                    className="px-5 py-3 text-sm text-gray-700 cursor-pointer flex items-center gap-3 transition-colors hover:bg-gray-50 hover:text-blinkit-green flex-1 border-b border-gray-50"
                    onClick={() => handleSuggestionClick(c, true)}
                  >
                    <FaSearch className="text-gray-400 text-xs" /> {c}
                  </div>
                ))}
              </div>
            )}
            
            {productMatches.length > 0 && (
              <div className="flex flex-col">
                <div className="px-4 py-2 text-xs uppercase font-bold text-gray-400 bg-gray-50 border-b border-gray-100">Products</div>
                {productMatches.map(p => (
                  <div 
                    key={p.id} 
                    className="px-5 py-3 text-sm text-gray-700 cursor-pointer flex items-center gap-3 transition-colors hover:bg-gray-50 hover:text-blinkit-green border-b border-gray-50"
                    onClick={() => handleSuggestionClick(p.title)}
                  >
                    <FaSearch className="text-gray-400 text-xs" /> <span className="truncate">{p.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
