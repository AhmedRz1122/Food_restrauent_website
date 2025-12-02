// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Menu, X, ChefHat } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Recipes', path: '/browse' },
    { name: 'Submit Recipe', path: '/submit' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo - Left Side */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-800">
                Recipe<span className="text-orange-600">Share</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Center (with proper spacing) */}
          <div className="hidden lg:flex items-center space-x-8 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Center (Desktop) - Adjusted spacing */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 ml-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search recipes, ingredients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions - Right Side */}
          <div className="flex items-center space-x-4 ml-auto lg:ml-0">
            
            {/* Search Icon (Mobile & Tablet) */}
            <button className="lg:hidden p-2">
              <Search className="h-6 w-6 text-gray-600" />
            </button>

            {/* Cart/Bookmark Button */}
            <Link 
              to="/saved" 
              className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors hidden sm:block"
              title="Saved Recipes"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="hidden lg:inline text-gray-700 font-medium">
                    John Doe
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-recipes"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    My Recipes
                  </Link>
                  <Link
                    to="/saved"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    Saved Recipes
                  </Link>
                  <div className="border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 hidden sm:flex">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-orange-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Tablet Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden sm:flex lg:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mb-4 mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Tablet Navigation Links (Medium screens) */}
        <div className="hidden lg:hidden sm:flex items-center justify-center space-x-6 py-4 border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 px-2 py-1 text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                to="/saved" 
                className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                  />
                </svg>
                Saved Recipes
                <span className="ml-auto bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-recipes"
                    className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Recipes
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;