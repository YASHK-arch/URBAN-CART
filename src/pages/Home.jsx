import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import womenImg from '../assets/women.png';

const Home = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const featuredProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    // Sort by rating (highest first) and take top 6
    const sorted = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return sorted.slice(0, 6);
  }, [products]);

  const handlePromoClick = (category) => {
    navigate('/products', { state: { category } });
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Wallpaper */}
      <div
        className="fixed inset-0 z-[-1] opacity-70 pointer-events-none"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/010/777/888/non_2x/seamless-food-pattern-doodle-food-background-food-illustration-free-vector.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">      {/* Main Hero Banner */}
        <section className="bg-amber-50 rounded-3xl overflow-hidden mb-12 relative flex items-center justify-between animate-fade-in min-h-[400px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] ring-1 ring-gray-900/5">
          <div className="p-8 md:p-14 lg:p-20 z-10 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Stock up on <br /><span className="text-blinkit-green">daily essentials</span>
            </h1>
            <p className="text-gray-700 mb-10 text-lg md:text-xl font-medium">Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more delivered</p>
            <Link to="/products" className="bg-blinkit-green text-white font-black px-10 py-4 rounded-xl hover:bg-green-700 hover:-translate-y-1 transition-all inline-block shadow-lg shadow-green-600/30 text-lg tracking-wide">
              Shop Now
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-3/4 md:w-1/2 before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-50 before:to-transparent z-0">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
              alt="Fresh Groceries"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Promo Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div
            className="rounded-2xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.7)] transition-all group relative overflow-hidden h-[180px] flex flex-col justify-center bg-cover bg-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] bg-gray-900 ring-1 ring-gray-900/5"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url('https://www.tastingtable.com/img/gallery/13-most-affordable-grocery-stores-in-2023/l-intro-1679073677.jpg')` }}
            onClick={() => handlePromoClick('groceries')}
          >
            <div className="relative z-10 w-11/12 lg:w-full">
              <h3 className="text-3xl font-amatic font-bold text-white mb-0 leading-none drop-shadow-md tracking-wider">Buy fresh groceries</h3>
              <p className="text-sm text-gray-300 mb-5 font-medium drop-shadow-md line-clamp-2">Farm-fresh vegetables & fruits delivered fast</p>
              <button className="bg-white/20 border-2 border-white/50 text-white backdrop-blur-sm text-xs font-bold px-5 py-2 rounded-lg group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transition-all uppercase tracking-widest w-max shadow-sm">Order Now</button>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.7)] transition-all group relative overflow-hidden h-[180px] flex flex-col justify-center bg-cover bg-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] bg-gray-900 ring-1 ring-gray-900/5"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url('https://www.realsimple.com/thmb/Y1-yOFqoCkVTcdlyIHiD0bDmn04=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/furniture-trends-2023-freelance-roundup-tout-e8aa7574166e45e491e95abdee770e9d.jpg')` }}
            onClick={() => handlePromoClick('furniture')}
          >
            <div className="relative z-10 w-11/12 lg:w-full">
              <h3 className="text-3xl font-amatic font-bold text-white mb-0 leading-none drop-shadow-md tracking-wider">High Quality Furniture</h3>
              <p className="text-sm text-gray-300 mb-5 font- medium drop-shadow-md line-clamp-2">Premium aesthetics for modern homes</p>
              <button className="bg-white/20 border-2 border-white/50 text-white backdrop-blur-sm text-xs font-bold px-5 py-2 rounded-lg group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transition-all uppercase tracking-widest w-max shadow-sm">Explore</button>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.7)] transition-all group relative overflow-hidden h-[180px] flex flex-col justify-center bg-cover bg-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] bg-gray-900 ring-1 ring-gray-900/5"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${womenImg})` }}
            onClick={() => handlePromoClick('women-essentials')}
          >
            <div className="relative z-10 w-11/12 lg:w-full">
              <h3 className="text-3xl font-amatic font-bold text-white mb-0 leading-none drop-shadow-md tracking-wider">Women's Essentials</h3>
              <p className="text-sm text-gray-300 mb-5 font-medium drop-shadow-md line-clamp-2">Perfumes & beauty products</p>
              <button className="bg-white/20 border-2 border-white/50 text-white backdrop-blur-sm text-xs font-bold px-5 py-2 rounded-lg group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transition-all uppercase tracking-widest w-max shadow-sm">Shop Now</button>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.7)] transition-all group relative overflow-hidden h-[180px] flex flex-col justify-center bg-cover bg-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] bg-gray-900 ring-1 ring-gray-900/5"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url('https://www.amd.com/content/dam/amd/en/images/products/laptops/2201103-amd-advantage-laptop-generic-tile-logo.jpg')` }}
            onClick={() => handlePromoClick('tech')}
          >
            <div className="relative z-10 w-11/12 lg:w-full">
              <h3 className="text-3xl font-amatic font-bold text-white mb-0 leading-none drop-shadow-md tracking-wider">Premium Tech</h3>
              <p className="text-sm text-gray-300 mb-5 font-medium drop-shadow-md line-clamp-2">Mobile accesories, laptops, speakers & more</p>
              <button className="bg-white/20 border-2 border-white/50 text-white backdrop-blur-sm text-xs font-bold px-5 py-2 rounded-lg group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transition-all uppercase tracking-widest w-max shadow-sm">Discover</button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section
          className="animate-fade-in mb-20 p-8 lg:p-12 relative overflow-visible z-20 bg-cover bg-center"
          style={{
            animationDelay: '0.2s',
            backgroundImage: `linear-gradient(rgba(8, 160, 69, 0.5), rgba(8, 160, 69, 0.7)), url('https://cdnb.artstation.com/p/assets/images/images/035/222/275/large/mia-yang-pscq-beifen511.jpg?1614412210')`,
            borderRadius: '40px 10px 50px 20px', // Paintbrush aesthetic radii
            boxShadow: 'inset -20px -25px 50px rgba(0,0,0,0.8), inset 0px 5px 20px rgba(0,0,0,0.4), 25px 35px 50px -10px rgba(0,0,0,0.7)',
            borderRight: '2px solid rgba(0,0,0,0.6)',
            borderBottom: '4px solid rgba(0,0,0,0.8)'
          }}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[white]">
            <h2 className="text-6xl font-amatic font-bold text-white tracking-widest drop-shadow-sm mt-2">Bestsellers</h2>
            <Link to="/products" className="bg-white text-[#08A045] rounded-full px-6 py-2 font-black text-xs tracking-widest uppercase hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all shadow-md">See all</Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} error={error} disablePagination={true} darkShadows={true} />
        </section>
      </div>
    </div>
  );
};

export default Home;
