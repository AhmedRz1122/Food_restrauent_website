// src/Components/Footer.jsx
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer Links Data
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Recipes', path: '/browse' },
    { name: 'Submit Recipe', path: '/submit' },
    { name: 'Recipe Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const categories = [
    { name: 'Breakfast', count: 156, path: '/category/breakfast' },
    { name: 'Lunch', count: 234, path: '/category/lunch' },
    { name: 'Dinner', count: 189, path: '/category/dinner' },
    { name: 'Desserts', count: 142, path: '/category/desserts' },
    { name: 'Vegan', count: 98, path: '/category/vegan' },
    { name: 'Quick & Easy', count: 210, path: '/category/quick-easy' },
  ];

  const popularTags = [
    'Pasta', 'Healthy', 'Vegetarian', 'Chicken', 'Dessert', 
    'Quick', 'Italian', 'Asian', 'Mexican', 'Grill', 
    'Baking', 'Smoothie', 'Salad', 'Soup', 'Snack'
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">
                Recipe<span className="text-orange-500">Share</span>
              </span>
            </div>
            <p className="text-gray-400">
              Discover, share, and create amazing recipes with our community of food lovers. 
              From quick meals to gourmet dishes, we have something for every taste.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-r-lg font-medium transition">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Get weekly recipe inspiration and cooking tips
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recipe Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Popular Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.path}
                    className="flex justify-between items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="group-hover:text-orange-500">{category.name}</span>
                    <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full group-hover:bg-orange-500 group-hover:text-white">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                <span className="text-gray-400">
                  123 Food Street, Culinary City<br />
                  RecipeLand, RL 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">hello@recipeshare.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-400 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-pink-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-red-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-6 text-center">Popular Recipe Tags</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to={`/tag/${tag.toLowerCase()}`}
                className="bg-gray-800 hover:bg-orange-600 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {currentYear} RecipeShare. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400 mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by RecipeShare Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;