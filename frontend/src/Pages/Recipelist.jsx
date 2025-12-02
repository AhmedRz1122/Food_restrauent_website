import React, { useState } from 'react';
import { FiStar, FiClock, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { GiChickenLeg, GiPizzaSlice, GiHamburger, GiSandwich, GiBowlOfRice } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipesContext';

const Recipelist = () => {
  const [selectedCategory, setSelectedCategory] = useState('All deals');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { foodItems } = useRecipes();

  // Food categories with icons
  const categories = [
    { id: 'all', name: 'All deals', icon: '🔥' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'burger', name: 'Burger', icon: '🍔' },
    { id: 'sandwich', name: 'Sandwich', icon: '🥪' },
    { id: 'pulao', name: 'Pulao', icon: '🍚' },
    { id: 'biryani', name: 'Biryani', icon: '🥘' },
    { id: 'chicken', name: 'Chicken', icon: '🍗' },
    { id: 'savour-krispo', name: 'Savour Krispo', icon: '🥠' },
    { id: 'meals', name: 'Meals', icon: '🍽️' },
    { id: 'sweet', name: 'Sweet', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'side-orders', name: 'Side Orders', icon: '🍟' },
    { id: 'daigh-orders', name: 'Daigh Orders', icon: '🍲' },
    { id: 'wraps', name: 'Wraps', icon: '🌯' },
    { id: 'pasta', name: 'Pasta', icon: '🍝' },
    { id: 'salad', name: 'Salad', icon: '🥗' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'desserts', name: 'Desserts', icon: '🍨' },
  ];

  // foodItems now comes from RecipesContext

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All deals' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  // Toggle favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Sort by options
  const [sortBy, setSortBy] = useState('popular');

  const sortItems = (items) => {
    switch(sortBy) {
      case 'price-low':
        return [...items].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
      case 'price-high':
        return [...items].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
      case 'rating':
        return [...items].sort((a, b) => b.rating - a.rating);
      case 'time':
        return [...items].sort((a, b) => {
          const timeA = parseInt(a.prepTime);
          const timeB = parseInt(b.prepTime);
          return timeA - timeB;
        });
      default:
        return items;
    }
  };

  const sortedItems = sortItems(filteredItems);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Delicious Menu</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our wide range of mouth-watering dishes prepared with the finest ingredients
        </p>
      </div>

      {/* Categories Navigation */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="text-gray-700 font-semibold">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {['popular', 'price-low', 'price-high', 'rating', 'time'].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-2 rounded-full transition ${
                  sortBy === option
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option === 'price-low' ? 'Price: Low to High' :
                 option === 'price-high' ? 'Price: High to Low' :
                 option === 'time' ? 'Preparation Time' :
                 option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="text-gray-600">
          Showing <span className="font-bold text-red-600">{sortedItems.length}</span> items
          {selectedCategory !== 'All deals' && ` in ${selectedCategory}`}
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/recipe/${item.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              
              {/* Discount Badge */}
              {item.discount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {item.discount}
                </div>
              )}
              
              {/* Bestseller Badge */}
              {item.bestseller && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                  🏆 Bestseller
                </div>
              )}
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
              >
                <FiHeart 
                  className={`w-5 h-5 ${
                    favorites.includes(item.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`}
                />
              </button>
              
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  {item.category}
                </span>
                <div className="flex items-center text-gray-600">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.prepTime}</span>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                  <FiStar className="w-4 h-4 mr-1 fill-current" />
                  <span className="font-bold">{item.rating}</span>
                </div>
                <span className="text-gray-500 text-sm ml-2">(200+ reviews)</span>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-gray-500 line-through ml-2">{item.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Navigate to cart page with the selected item
                    navigate('/cart', { state: { recipe: item } });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 flex items-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No items found</h3>
          <p className="text-gray-500">Try selecting a different category or check back later!</p>
        </div>
      )}

      {/* Special Offers Banner */}
      <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Special Weekend Offer!</h2>
            <p className="text-lg">Get 30% off on all orders above $25. Use code: WEEKEND30</p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
            Order Now
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
          <div className="text-gray-600">Menu Items</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">4.8⭐</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">15-30</div>
          <div className="text-gray-600">Minutes Delivery</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
          <div className="text-gray-600">Service Available</div>
        </div>
      </div>
    </div>
  );
};

export default Recipelist;