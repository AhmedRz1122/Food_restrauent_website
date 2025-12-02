import React from 'react';
import Slider from '../Components/Slider';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const categories = [
    { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1533089862017-5614ec87e284?auto=format&fit=crop&w=500&q=60', count: '120+ Recipes' },
    { name: 'Lunch', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=60', count: '200+ Recipes' },
    { name: 'Dinner', image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=500&q=60', count: '180+ Recipes' },
    { name: 'Desserts', image: 'https://images.unsplash.com/photo-1563729768-7491b31c7b91?auto=format&fit=crop&w=500&q=60', count: '150+ Recipes' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <Slider />
        
        {/* Welcome Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to RecipeShare</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover delicious recipes from around the world. Share your own culinary creations and join our community of food lovers.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/browse" className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition">
                Explore Recipes
              </Link>
              <Link to="/submit" className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition">
                Share Recipe
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Popular Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link key={cat.name} to={`/category/${cat.name.toLowerCase()}`} className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-xl font-bold text-white mb-1">{cat.name}</h4>
                    <p className="text-gray-200 text-sm">{cat.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
