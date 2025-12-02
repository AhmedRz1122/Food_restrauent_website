import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const foodItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1920&q=80",
      title: "Gourmet Burger",
      description: "Juicy beef patty with fresh vegetables and special sauce",
      price: "$14.99",
      category: "Burgers"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80",
      title: "Wood Fired Pizza",
      description: "Hand-tossed dough with premium toppings and mozzarella",
      price: "$18.99",
      category: "Pizza"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1920&q=80",
      title: "Fresh Salad Bowl",
      description: "Organic greens with house dressing and roasted nuts",
      price: "$12.99",
      category: "Salads"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80",
      title: "Grilled Steak",
      description: "Premium cut with herb butter and seasonal vegetables",
      price: "$24.99",
      category: "Main Course"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % foodItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + foodItems.length) % foodItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {foodItems.map((item) => (
          <div 
            key={item.id} 
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Background Image */}
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            {/* Food Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32">
              {/* Category Tag */}
              <div className="mb-6">
                <span className="inline-block bg-yellow-500 text-black font-bold px-6 py-2 rounded-full text-sm md:text-base">
                  {item.category}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight">
                {item.title}
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-2xl lg:text-3xl text-gray-200 mb-8 md:mb-12 max-w-2xl lg:max-w-3xl">
                {item.description}
              </p>
              
              {/* Price and CTA */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400">
                    {item.price}
                  </span>
                  <span className="text-gray-300 text-lg">• Serves 2-3 people</span>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    Order Now
                  </button>
                  <button className="border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl transition-all duration-300 backdrop-blur-sm">
                    View Details
                  </button>
                </div>
              </div>
              
              {/* Nutrition Info */}
              <div className="mt-12 md:mt-16 flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white">🔥 450 Calories</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white">⏱️ 20-30 mins</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white">⭐ 4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Larger and more visible */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-4 md:p-5 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-4 md:p-5 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 md:w-96">
        <div className="w-full bg-gray-600/30 backdrop-blur-sm rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / foodItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col gap-2">
        {foodItems.map((item, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="flex items-center gap-3 group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-yellow-500 w-8' 
                  : 'bg-white/50 group-hover:bg-white'
              }`}
            />
            <span className={`text-sm transition-all duration-300 ${
              index === currentSlide 
                ? 'text-white font-bold opacity-100' 
                : 'text-gray-400 opacity-0 group-hover:opacity-100'
            }`}>
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <div className="text-white text-lg">
          <span className="font-bold text-yellow-400">{currentSlide + 1}</span>
          <span className="mx-2">/</span>
          <span>{foodItems.length}</span>
        </div>
      </div>

      {/* Pause/Play Auto Slide */}
      <button 
        onClick={() => {
          // You can implement pause/play functionality here
          console.log('Pause/Play clicked');
        }}
        className="absolute top-8 right-8 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Pause auto-slide"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Fullscreen Toggle */}
      <button 
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        className="absolute top-8 right-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Toggle fullscreen"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Slider;