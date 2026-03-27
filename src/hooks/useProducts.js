import { useState, useEffect } from 'react';
import { fetchAllProducts, fetchCategories } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);

        // Store case-insensitive distinct category slugs that actually possess products
        const availableCatSlugs = new Set(
          productsData.map(p => {
             const cat = typeof p.category === 'string' ? p.category : (p.category?.slug || p.category?.name || '');
             return cat.toLowerCase();
          })
        );
        
        // Filter the raw API categories to exclude empty ones
        const validCategories = categoriesData.filter(c => {
           const slug = typeof c === 'string' ? c : (c.slug || c.name || '');
           return availableCatSlugs.has(slug.toLowerCase());
        });

        setCategories(['All Products', ...validCategories.map(c => c.name || c)]);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, categories, loading, error };
};
