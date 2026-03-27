import React, { useEffect, useState } from 'react';

const Loader = ({ onLoadingComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 1.5 seconds
    const fadeTimer = setTimeout(() => setIsFading(true), 1500);
    // Unmount after 2.2 seconds (giving 0.7s for fade transition)
    const unmountTimer = setTimeout(() => onLoadingComplete(), 2200);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-blinkit-green flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Container for the pulsing and spinning lemon */}
      <div className="relative animate-bounce">
        <div 
          className="w-24 h-24 bg-yellow-400 border-4 border-yellow-500 shadow-2xl relative animate-spin"
          style={{ 
            borderRadius: '50% 15% 50% 15%', 
            animationDuration: '2s' 
          }}
        >
          {/* Subtle highlight to make it look 3D like a lemon */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-white/50 rounded-full blur-[2px]"></div>
        </div>
      </div>
      
      <h2 className="mt-10 text-white font-black text-3xl tracking-widest drop-shadow-md animate-pulse uppercase">
        Fresh Delivery
      </h2>
      <p className="mt-3 text-green-100 font-semibold text-sm tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
