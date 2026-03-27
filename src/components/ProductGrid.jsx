import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error, itemsPerPage = 9, disablePagination = false, darkShadows = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const currentProducts = disablePagination 
      ? products 
      : products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setAnimationClass('');
      setTimeout(() => {
        setCurrentPage(newPage);
        setAnimationClass('animate-fade-in');
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }, 50);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
        {[...Array(itemsPerPage)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl h-[340px] relative overflow-hidden border border-gray-100 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-8 bg-white rounded-2xl text-gray-500 border border-gray-100">
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-8 bg-white rounded-2xl text-gray-500 border border-gray-100">
        <h2 className="text-gray-900 font-bold mb-2">No products found</h2>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full ${animationClass}`}>
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} darkShadows={darkShadows} />
        ))}
      </div>

      {!disablePagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100">
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 font-semibold transition-all hover:bg-gray-50 hover:border-blinkit-green hover:text-blinkit-green disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-800" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaChevronLeft className="text-sm" /> Prev
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1}
                className={`w-9 h-9 flex items-center justify-center rounded-lg font-semibold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-blinkit-green text-white shadow-md shadow-blinkit-green/30' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 font-semibold transition-all hover:bg-gray-50 hover:border-blinkit-green hover:text-blinkit-green disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-800" 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next <FaChevronRight className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
