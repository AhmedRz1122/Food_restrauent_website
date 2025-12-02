// src/pages/SubmitDetailPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Clock, ChefHat, ArrowLeft, Plus, Trash2, AlertCircle } from 'lucide-react';

const Submitdetailpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    servings: '',
    difficulty: 'Easy',
    category: '',
    cuisine: '',
    ingredients: [''],
    instructions: [''],
    tags: [],
    notes: '',
    image: null,
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories for dropdown
  const categories = [
    'Appetizer', 'Main Course', 'Dessert', 'Breakfast', 'Lunch', 'Dinner',
    'Snack', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Low-Carb', 'Keto',
    'Mediterranean', 'Asian', 'Italian', 'Mexican', 'Indian', 'American'
  ];

  // Cuisine types
  const cuisines = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese',
    'Thai', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Middle Eastern',
    'Vietnamese', 'Korean', 'Brazilian', 'Caribbean', 'African', 'Fusion'
  ];

  // Difficulty levels
  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Add new ingredient field
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  // Handle instruction changes
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({ ...prev, instructions: newInstructions }));
  };

  // Add new instruction field
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  // Remove instruction field
  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, instructions: newInstructions }));
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  // Calculate total time
  const calculateTotalTime = () => {
    const prep = parseInt(formData.prepTime) || 0;
    const cook = parseInt(formData.cookTime) || 0;
    return prep + cook;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.prepTime) newErrors.prepTime = 'Preparation time is required';
    if (!formData.cookTime) newErrors.cookTime = 'Cooking time is required';
    
    // Validate ingredients
    const validIngredients = formData.ingredients.filter(ing => ing.trim());
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    }
    
    // Validate instructions
    const validInstructions = formData.instructions.filter(inst => inst.trim());
    if (validInstructions.length === 0) {
      newErrors.instructions = 'At least one instruction is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Calculate total time
      const totalTime = calculateTotalTime();
      
      // Prepare final data
      const recipeData = {
        ...formData,
        totalTime,
        ingredients: formData.ingredients.filter(ing => ing.trim()),
        instructions: formData.instructions.filter(inst => inst.trim()),
      };

      // Here you would typically send the data to your backend
      console.log('Recipe data to submit:', recipeData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Recipe submitted successfully! It will be reviewed before publishing.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        servings: '',
        difficulty: 'Easy',
        category: '',
        cuisine: '',
        ingredients: [''],
        instructions: [''],
        tags: [],
        notes: '',
        image: null,
      });
      setPreviewImage(null);
      setTagInput('');
      setErrors({});
      
      // Navigate back or to recipe page
      navigate('/my-recipes');
      
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Failed to submit recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Share Your Recipe</h1>
              <p className="text-gray-600 mt-1">Help others discover your culinary masterpiece</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-600">Step 1 of 3</span>
            <span className="text-sm text-gray-500">Basic Info</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full w-1/3"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Recipe Image Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Recipe Image
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Upload Area */}
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Recipe Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Recipe preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Recommended: 1200x800px, JPG, PNG (Max 5MB)
                      </p>
                      <label className="inline-block px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 cursor-pointer transition-colors">
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </>
                  )}
                </div>
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Image Guidelines */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3">Image Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-1"></div>
                    Use high-quality, well-lit photos
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-1"></div>
                    Show the finished dish clearly
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-1"></div>
                    Avoid blurry or dark images
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-1"></div>
                    Show multiple angles if possible
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipe Title */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Classic Beef Lasagna"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your recipe, what makes it special, serving suggestions..."
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Category & Cuisine */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Cuisine (Optional)
                </label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select cuisine type</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              {/* Time Information */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Prep Time (minutes) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      placeholder="e.g., 30"
                      min="0"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.prepTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <Clock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.prepTime && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.prepTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Cook Time (minutes) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleChange}
                      placeholder="e.g., 45"
                      min="0"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.cookTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <Clock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.cookTime && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.cookTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Total Time
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={calculateTotalTime()}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Clock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Servings & Difficulty */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Servings (Optional)
                </label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  placeholder="e.g., 4"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ingredients *</h2>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Ingredient
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="h-6 w-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mr-3 text-sm">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder="e.g., 2 cups all-purpose flour"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {errors.ingredients && (
              <p className="mt-4 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.ingredients}
              </p>
            )}
            
            <div className="mt-6 text-sm text-gray-500">
              <p>💡 Tips: Include measurements, be specific, list in order of use</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Instructions *</h2>
              <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Step
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <span className="h-8 w-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold mt-1">
                        {index + 1}
                      </span>
                      <textarea
                        value={instruction}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        placeholder={`Step ${index + 1}: Describe this step in detail...`}
                        rows="3"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  {formData.instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {errors.instructions && (
              <p className="mt-4 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.instructions}
              </p>
            )}
          </div>

          {/* Tags & Notes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h2>
            
            <div className="space-y-6">
              {/* Tags */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tags (Press Enter to add)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="e.g., healthy, quick, spicy..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                
                {/* Display Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-orange-900"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Notes & Tips (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes, tips, variations, or serving suggestions..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  // Save as draft functionality
                  console.log('Save as draft:', formData);
                  alert('Recipe saved as draft!');
                }}
                className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Save as Draft
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Recipe'
                )}
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Submission Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Please provide accurate measurements and cooking times</li>
                  <li>• Include all necessary ingredients and clear instructions</li>
                  <li>• Your recipe will be reviewed before being published</li>
                  <li>• Make sure you have the rights to share this recipe</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Submitdetailpage;