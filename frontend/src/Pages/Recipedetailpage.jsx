// src/pages/RecipeDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Star, 
  Bookmark, 
  Share2, 
  Heart, 
  Printer, 
  Flag,
  Clock3,
  Thermometer,
  Timer,
  ChevronLeft,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';
import { useRecipes } from '../context/RecipesContext';

// Base template for detailed recipe data; list data will override top-level fields
const baseRecipeTemplate = {
  name: 'Chicken Biryani',
  category: 'Biryani',
  description:
    'Aromatic basmati rice with succulent chicken pieces, slow-cooked with authentic Indian spices.',
  price: '$15.99',
  originalPrice: '$19.99',
  rating: 4.9,
  prepTime: '35-40 min',
  image:
    'https://images.unsplash.com/photo-1563379091339-03246963d9d6?auto=format&fit=crop&w=1200&q=80',
  popular: true,
  bestseller: true,
  discount: '20% OFF',
  chef: {
    name: 'Chef Rajesh Kumar',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    recipesCount: 47,
  },
  details: {
    prepTime: '30 min',
    cookTime: '40 min',
    totalTime: '1 hr 10 min',
    servings: '4-6 people',
    difficulty: 'Medium',
    calories: '450 per serving',
    cuisine: 'Indian',
    tags: ['Spicy', 'Traditional', 'Festive', 'Main Course', 'Rice'],
  },
  ingredients: [
    '2 cups basmati rice',
    '500g chicken pieces',
    '2 large onions, thinly sliced',
    '2 tomatoes, chopped',
    '1 cup yogurt',
    '4 tbsp biryani masala',
    '1 tsp turmeric powder',
    '2 tsp red chili powder',
    '1 tsp garam masala',
    '4 cloves garlic, minced',
    '2-inch ginger, grated',
    '4 green chilies, slit',
    '1/2 cup mint leaves',
    '1/2 cup coriander leaves',
    '4 tbsp ghee or oil',
    'Whole spices: 4 green cardamoms, 4 cloves, 2 bay leaves, 1-inch cinnamon',
    'Salt to taste',
    'Saffron strands (optional)',
    '1/4 cup milk (for saffron)',
  ],
  instructions: [
    {
      step: 1,
      title: 'Marinate the Chicken',
      description:
        'Mix chicken with yogurt, half of the biryani masala, turmeric, red chili powder, ginger-garlic paste, and salt. Let it marinate for at least 2 hours, preferably overnight.',
    },
    {
      step: 2,
      title: 'Prepare the Rice',
      description:
        'Wash and soak basmati rice for 30 minutes. Boil rice with whole spices until 70% cooked. Drain and set aside.',
    },
    {
      step: 3,
      title: 'Cook the Chicken',
      description:
        'Heat ghee in a large pot. Fry onions until golden brown. Add marinated chicken and cook for 10-15 minutes until the chicken is tender.',
    },
    {
      step: 4,
      title: 'Layer the Biryani',
      description:
        'In a heavy-bottomed pot, layer half of the rice, then the chicken masala, then the remaining rice. Sprinkle mint, coriander, and saffron milk.',
    },
    {
      step: 5,
      title: 'Dum Cooking',
      description:
        'Cover with a tight lid and cook on low heat (dum) for 20-25 minutes. You can seal the edges with dough for better results.',
    },
    {
      step: 6,
      title: 'Rest and Serve',
      description:
        'Let the biryani rest for 10 minutes after cooking. Gently mix before serving with raita and salad.',
    },
  ],
  nutrition: {
    calories: 450,
    protein: '25g',
    carbs: '65g',
    fat: '15g',
    fiber: '3g',
  },
  reviews: [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '2 days ago',
      comment:
        'Absolutely delicious! The flavors were incredible. I followed the recipe exactly and it turned out perfect.',
      likes: 24,
    },
    {
      id: 2,
      user: 'Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 4,
      date: '1 week ago',
      comment:
        'Great recipe! I reduced the chili powder slightly for my kids and they loved it. Will make again!',
      likes: 18,
    },
    {
      id: 3,
      user: 'Priya Sharma',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '3 weeks ago',
      comment: 'As an Indian, I can say this is very authentic! The layering technique is spot on.',
      likes: 42,
    },
  ],
  similarRecipes: [
    {
      id: 2,
      name: 'Vegetable Biryani',
      category: 'Biryani',
      rating: 4.7,
      prepTime: '45 min',
      image:
        'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w-400&q=80',
    },
    {
      id: 5,
      name: 'Chicken Pulao',
      category: 'Pulao',
      rating: 4.6,
      prepTime: '35 min',
      image:
        'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 7,
      name: 'Mutton Biryani',
      category: 'Biryani',
      rating: 4.8,
      prepTime: '60 min',
      image:
        'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80',
    },
  ],
};

const Recipedetailpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foodItems } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Build recipe data from context based on the selected id
  useEffect(() => {
    if (!foodItems || !id) {
      setLoading(false);
      return;
    }

    const fromList = foodItems.find((item) => String(item.id) === String(id));

    if (!fromList) {
      setRecipe(null);
      setLoading(false);
      return;
    }

    const merged = {
      ...baseRecipeTemplate,
      id: fromList.id,
      name: fromList.name,
      category: fromList.category,
      description: fromList.description ?? baseRecipeTemplate.description,
      price: fromList.price ?? baseRecipeTemplate.price,
      originalPrice: fromList.originalPrice ?? baseRecipeTemplate.originalPrice,
      rating: fromList.rating ?? baseRecipeTemplate.rating,
      prepTime: fromList.prepTime ?? baseRecipeTemplate.prepTime,
      image: fromList.image ?? baseRecipeTemplate.image,
      popular: fromList.popular ?? baseRecipeTemplate.popular,
      bestseller: fromList.bestseller ?? baseRecipeTemplate.bestseller,
      discount: fromList.discount ?? baseRecipeTemplate.discount,
    };

    setRecipe(merged);
    setLoading(false);
  }, [id, foodItems]);

  const handleSaveRecipe = () => {
    setIsSaved(!isSaved);
    // In real app, make API call to save/unsave
  };

  const handleLikeRecipe = () => {
    setIsLiked(!isLiked);
    // In real app, make API call to like/unlike
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  const handleShareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: recipe.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Recipes
          </button>
        </div>
      </div>

      {/* Recipe Hero Section */}
      <div className="relative">
        {/* Recipe Image */}
        <div className="h-64 md:h-96 lg:h-[500px] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Recipe Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="container mx-auto">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-orange-600 rounded-full text-sm font-semibold">
                {recipe.category}
              </span>
              {recipe.discount && (
                <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold">
                  {recipe.discount}
                </span>
              )}
              {recipe.bestseller && (
                <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold">
                  🏆 Bestseller
                </span>
              )}
              {recipe.popular && (
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-semibold">
                  Popular
                </span>
              )}
            </div>

            {/* Recipe Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{recipe.name}</h1>

            {/* Recipe Description */}
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl">{recipe.description}</p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-bold">{recipe.rating}</span>
                  <span className="ml-1 text-gray-300">({recipe.reviews?.length || 0} reviews)</span>
                </div>
              </div>

              {/* Prep Time */}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{recipe.prepTime}</span>
              </div>

              {/* Chef Info */}
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                <span>{recipe.chef.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={handleSaveRecipe}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isSaved 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save Recipe'}
              </button>
              
              <button
                onClick={handleLikeRecipe}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current text-red-600' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
              
              <button
                onClick={handleShareRecipe}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                Share
              </button>
              
              <button
                onClick={handlePrintRecipe}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer className="h-5 w-5" />
                Print
              </button>
              
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Flag className="h-5 w-5" />
                Report
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'ingredients'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'instructions'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'nutrition'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Nutrition
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews ({recipe.reviews?.length || 0})
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {activeTab === 'ingredients' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={`ingredient-${index}`}
                          className="mt-1 h-5 w-5 text-orange-600 rounded"
                        />
                        <label
                          htmlFor={`ingredient-${index}`}
                          className="text-gray-700 cursor-pointer select-none"
                        >
                          {ingredient}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Serving Adjuster */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Servings: {recipe.details.servings}</span>
                      <div className="flex items-center gap-2">
                        <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                          -
                        </button>
                        <span className="px-3">4</span>
                        <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Adjust the number of servings and the ingredients will update automatically.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Instructions</h2>
                  <div className="space-y-8">
                    {recipe.instructions.map((instruction) => (
                      <div key={instruction.step} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                            {instruction.step}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {instruction.title}
                          </h3>
                          <p className="text-gray-700">{instruction.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tips Section */}
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">👨‍🍳 Chef's Tips</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• For extra flavor, marinate the chicken overnight</li>
                      <li>• Use aged basmati rice for better aroma and separate grains</li>
                      <li>• Seal the pot with dough during dum cooking for better steam retention</li>
                      <li>• Let the biryani rest for 10 minutes before serving for flavors to meld</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Information</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{recipe.nutrition.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{recipe.nutrition.protein}</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{recipe.nutrition.carbs}</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{recipe.nutrition.fat}</div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Allergens</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Dairy</span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Gluten</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Dietary Information</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">High Protein</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Good Carbs</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
                  
                  {/* Overall Rating */}
                  <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{recipe.rating}</div>
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < Math.floor(recipe.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-gray-600">{recipe.reviews?.length || 0} reviews</div>
                    </div>
                    
                    {/* Rating Distribution */}
                    <div className="flex-1 max-w-md">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2 mb-2">
                          <span className="w-8 text-gray-600">{stars}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400"
                              style={{ width: `${(stars/5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-gray-600 text-right">{(stars/5*100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Review */}
                  <div className="mb-8 p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Rate this Recipe</h3>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="text-2xl focus:outline-none"
                        >
                          {star <= userRating ? '⭐' : '☆'}
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Share your experience with this recipe..."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Submit Review
                    </button>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {recipe.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={review.avatar}
                              alt={review.user}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.user}</h4>
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MessageCircle className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-orange-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({review.likes})</span>
                          </button>
                          <button className="text-gray-600 hover:text-orange-600">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Order Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{recipe.price}</span>
                  {recipe.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">{recipe.originalPrice}</span>
                  )}
                </div>
                <div className="text-green-600 font-semibold mb-4">
                  {recipe.discount} OFF • Limited Time
                </div>
              </div>
              
              <button className="w-full mb-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg">
                Add to Cart
              </button>
              
              <button className="w-full px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                Customize Order
              </button>
              
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Prep Time:</span>
                  <span className="font-medium">{recipe.details.prepTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cook Time:</span>
                  <span className="font-medium">{recipe.details.cookTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Time:</span>
                  <span className="font-medium">{recipe.details.totalTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Servings:</span>
                  <span className="font-medium">{recipe.details.servings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Difficulty:</span>
                  <span className="font-medium">{recipe.details.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cuisine:</span>
                  <span className="font-medium">{recipe.details.cuisine}</span>
                </div>
              </div>
              
              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                  <Timer className="h-4 w-4" />
                  Ready in {recipe.prepTime}
                </div>
                <p className="text-sm text-green-600">Order now for delivery or pickup</p>
              </div>
            </div>

            {/* Chef Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About the Chef</h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={recipe.chef.avatar}
                  alt={recipe.chef.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{recipe.chef.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{recipe.chef.rating} • {recipe.chef.recipesCount} recipes</span>
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Follow Chef
              </button>
            </div>

            {/* Similar Recipes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {recipe.similarRecipes.map((similar) => (
                  <Link
                    key={similar.id}
                    to={`/recipe/${similar.id}`}
                    className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{similar.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{similar.category}</span>
                        <span>•</span>
                        <span>{similar.prepTime}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{similar.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Try This Recipe?</h2>
          <p className="mb-6 text-lg">Order now and get it delivered fresh to your doorstep!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition-colors font-semibold">
              Order Now - {recipe.price}
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipedetailpage;