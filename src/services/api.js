import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchAllProducts = async () => {
  const response = await api.get('/products?limit=100');
  return response.data.products; // DummyJSON wraps products in an array
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  // DummyJSON returns objects: [{slug: '...', name: '...', url: '...'}]
  // We'll map to just names or slugs depending on response. Let's return the raw response for now and handle mapping in the hook if needed.
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
