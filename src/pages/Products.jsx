import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import { FaSlidersH } from 'react-icons/fa';

const Products = () => {
  const location = useLocation();
  const { products, categories, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [showFilters, setShowFilters] = useState(false);
  
  const sidebarRef = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All Products');

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state?.category]);

  useEffect(() => {
    if (!sidebarRef.current) return;
    setSidebarHeight(sidebarRef.current.getBoundingClientRect().height);
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSidebarHeight(entry.contentRect.height);
      }
    });
    observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      let cols = 1;
      if (window.innerWidth >= 1024) cols = 3;
      else if (window.innerWidth >= 640) cols = 2;

      if (window.innerWidth < 1024) {
         setItemsPerPage(cols * 3); // 3 rows default for mobile/tablet
         return;
      }

      if (sidebarHeight > 0) {
        // Use Math.ceil to allow one more row before cutting off, ensuring we maximize grid space
        // Product height is ~340px
        const rowHeight = 340;
        const maxRows = Math.max(1, Math.ceil(sidebarHeight / rowHeight));
        setItemsPerPage(maxRows * cols);
      }
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);
    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, [sidebarHeight]);

  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearchTerm) {
      const lowercasedSearch = debouncedSearchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(lowercasedSearch) ||
        product.description.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (activeCategory !== 'All Products') {
      const lowerActive = activeCategory.toLowerCase();
      if (activeCategory === 'women-essentials') {
        const womenCats = ['womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery', 'beauty', 'skin-care', 'fragrances'];
        result = result.filter(product => womenCats.includes(product.category));
      } else if (activeCategory === 'tech') {
        const techCats = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
        result = result.filter(product => techCats.includes(product.category));
      } else if (activeCategory === 'groceries') {
        result = result.filter(product => product.category === 'groceries');
      } else if (activeCategory === 'furniture') {
        result = result.filter(product => product.category === 'furniture' || product.category === 'home-decoration');
      } else {
        const normalizedActive = lowerActive.replace(/[-_' ]/g, '');
        result = result.filter(product => {
          let cat = '';
          if (typeof product.category === 'string') cat = product.category;
          else if (product.category?.slug) cat = product.category.slug;
          else if (product.category?.name) cat = product.category.name;
          
          const normalizedCat = cat.toLowerCase().replace(/[-_' ]/g, '');
          
          return normalizedCat === normalizedActive || normalizedCat.includes(normalizedActive) || normalizedActive.includes(normalizedCat);
        });
      }
    }

    if (priceRange !== 'all') {
      if (priceRange === '0-100') {
        result = result.filter(product => (product.price * 83) >= 0 && (product.price * 83) <= 100);
      } else if (priceRange === '100-500') {
        result = result.filter(product => (product.price * 83) > 100 && (product.price * 83) <= 500);
      } else if (priceRange === '500-1000') {
        result = result.filter(product => (product.price * 83) > 500 && (product.price * 83) <= 1000);
      } else if (priceRange === '1000-plus') {
        result = result.filter(product => (product.price * 83) > 1000);
      }
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, debouncedSearchTerm, activeCategory, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8 animate-fade-in w-full">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        categories={categories}
        products={products}
        setActiveCategory={setActiveCategory}
      />

      {/* Mobile filter toggle button */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h2 className="text-lg font-black text-gray-800 capitalize tracking-tight">
          {activeCategory === 'All Products' ? 'All Products' : activeCategory}
          <span className="ml-2 text-sm font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {loading ? '...' : filteredProducts.length}
          </span>
        </h2>
        <button
          onClick={() => setShowFilters(f => !f)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
            showFilters
              ? 'bg-blinkit-green text-white border-blinkit-green'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blinkit-green hover:text-blinkit-green'
          }`}
        >
          <FaSlidersH size={13} />
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-start w-full">
        {/* Sidebar — always visible on desktop, collapsible on mobile */}
        <aside
          className={`w-full lg:w-1/4 lg:sticky lg:top-24 z-10 lg:block ${
            showFilters ? 'block' : 'hidden'
          }`}
          ref={sidebarRef}
        >
          <Filters 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={(cat) => { setActiveCategory(cat); setShowFilters(false); }}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </aside>
        
        <section className="w-full lg:w-3/4 flex flex-col">
          {/* Desktop-only heading row */}
          <div className="hidden lg:flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 capitalize tracking-tight">
              {activeCategory === 'All Products' ? 'All Products' : activeCategory}
            </h2>
            <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {loading ? 'Loading...' : `${filteredProducts.length} Results`}
            </span>
          </div>
          
          <ProductGrid products={filteredProducts} loading={loading} error={error} itemsPerPage={itemsPerPage} />
        </section>
      </div>
    </div>
  );
};

export default Products;
