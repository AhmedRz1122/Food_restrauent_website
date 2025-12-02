import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronLeft, 
  Clock, 
  ChefHat, 
  Tag,
  Shield,
  CreditCard,
  Truck,
  Package,
  X
} from 'lucide-react';

const AddtoCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get recipe from navigation state or use mock data
  const recipeFromState = location.state?.recipe;
  
  const [cart, setCart] = useState(() => {
    // Check if there's an item passed from RecipeList
    if (recipeFromState) {
      return [{
        ...recipeFromState,
        quantity: 1,
        specialInstructions: '',
        selectedAddons: [],
        selectedSize: 'Regular',
        selectedSpiceLevel: 'Medium'
      }];
    }
    // Otherwise check localStorage for existing cart
    const savedCart = localStorage.getItem('foodCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    type: 'delivery', // 'delivery' or 'pickup'
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    instructions: '',
    scheduled: false,
    scheduleDate: '',
    scheduleTime: ''
  });
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [tipAmount, setTipAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Food sizes
  const sizes = [
    { id: 'small', name: 'Small', price: 0 },
    { id: 'regular', name: 'Regular', price: 0 },
    { id: 'large', name: 'Large', price: 3.99 },
    { id: 'family', name: 'Family', price: 7.99 }
  ];
  
  // Spice levels
  const spiceLevels = [
    { id: 'mild', name: 'Mild' },
    { id: 'medium', name: 'Medium' },
    { id: 'spicy', name: 'Spicy' },
    { id: 'extra-spicy', name: 'Extra Spicy' }
  ];
  
  // Add-ons options
  const addons = [
    { id: 'extra-cheese', name: 'Extra Cheese', price: 1.99 },
    { id: 'extra-sauce', name: 'Extra Sauce', price: 0.99 },
    { id: 'extra-meat', name: 'Extra Meat', price: 2.99 },
    { id: 'extra-veggies', name: 'Extra Vegetables', price: 1.49 },
    { id: 'side-salad', name: 'Side Salad', price: 3.99 },
    { id: 'garlic-bread', name: 'Garlic Bread', price: 2.99 },
    { id: 'fries', name: 'French Fries', price: 2.49 },
    { id: 'drink', name: 'Soft Drink', price: 1.99 }
  ];
  
  // Tip options
  const tipOptions = [
    { amount: 0, label: 'No Tip' },
    { amount: 2, label: '$2' },
    { amount: 5, label: '$5' },
    { amount: 10, label: '$10' },
    { amount: 15, label: '15%' },
    { amount: 20, label: '20%' },
    { amount: 'custom', label: 'Custom' }
  ];
  
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace('$', ''));
      const sizePrice = sizes.find(s => s.name === item.selectedSize)?.price || 0;
      const addonsPrice = item.selectedAddons.reduce((addonTotal, addonId) => {
        const addon = addons.find(a => a.id === addonId);
        return addonTotal + (addon?.price || 0);
      }, 0);
      
      return total + ((itemPrice + sizePrice + addonsPrice) * item.quantity);
    }, 0);
  };
  
  // Calculate taxes (8% tax rate)
  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };
  
  // Calculate delivery fee
  const calculateDeliveryFee = () => {
    return deliveryInfo.type === 'delivery' ? 2.99 : 0;
  };
  
  // Calculate service fee
  const calculateServiceFee = () => {
    return calculateSubtotal() * 0.05;
  };
  
  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const deliveryFee = calculateDeliveryFee();
    const serviceFee = calculateServiceFee();
    
    return subtotal + tax + deliveryFee + serviceFee + tipAmount - discount;
  };
  
  // Update quantity
  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + change);
    setCart(newCart);
  };
  
  // Remove item from cart
  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };
  
  // Update size
  const updateSize = (index, size) => {
    const newCart = [...cart];
    newCart[index].selectedSize = size;
    setCart(newCart);
  };
  
  // Update spice level
  const updateSpiceLevel = (index, level) => {
    const newCart = [...cart];
    newCart[index].selectedSpiceLevel = level;
    setCart(newCart);
  };
  
  // Toggle addon
  const toggleAddon = (index, addonId) => {
    const newCart = [...cart];
    const currentAddons = newCart[index].selectedAddons;
    
    if (currentAddons.includes(addonId)) {
      newCart[index].selectedAddons = currentAddons.filter(id => id !== addonId);
    } else {
      newCart[index].selectedAddons = [...currentAddons, addonId];
    }
    
    setCart(newCart);
  };
  
  // Update special instructions
  const updateInstructions = (index, instructions) => {
    const newCart = [...cart];
    newCart[index].specialInstructions = instructions;
    setCart(newCart);
  };
  
  // Handle delivery info change
  const handleDeliveryChange = (field, value) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle customer info change
  const handleCustomerChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };
  
  // Apply coupon
  const applyCoupon = () => {
    const coupon = appliedCoupon.trim().toUpperCase();
    
    if (coupon === 'WELCOME10') {
      setDiscount(calculateSubtotal() * 0.10);
      alert('Coupon applied! 10% discount added.');
    } else if (coupon === 'FIRSTORDER') {
      setDiscount(5);
      alert('Coupon applied! $5 discount added.');
    } else if (coupon === 'SAVE15') {
      setDiscount(calculateSubtotal() * 0.15);
      alert('Coupon applied! 15% discount added.');
    } else if (coupon) {
      alert('Invalid coupon code');
      setAppliedCoupon('');
      setDiscount(0);
    }
  };
  
  // Checkout
  const handleCheckout = () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    
    if (deliveryInfo.type === 'delivery' && !deliveryInfo.address) {
      alert('Please provide your delivery address');
      return;
    }
    
    // Prepare order data
    const orderData = {
      cart,
      customerInfo,
      deliveryInfo,
      paymentMethod,
      tipAmount,
      discount,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      deliveryFee: calculateDeliveryFee(),
      serviceFee: calculateServiceFee(),
      total: calculateTotal(),
      orderDate: new Date().toISOString(),
      orderId: `ORD${Date.now()}`
    };
    
    console.log('Order placed:', orderData);
    
    // Save to localStorage
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    
    // Clear cart
    localStorage.removeItem('foodCart');
    
    // Navigate to confirmation page
    navigate('/order-confirmation', { state: { order: orderData } });
  };
  
  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('foodCart', JSON.stringify(cart));
  }, [cart]);
  
  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add delicious food items from our menu to get started!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-semibold"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 mb-4 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart</h1>
              <p className="text-gray-600 mt-2">
                {cart.length} item{cart.length !== 1 ? 's' : ''} • Review your order
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">{cart.length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items & Options */}
          <div className="lg:w-2/3 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              
              {cart.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-600 hover:text-red-800 text-sm mt-2 flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, 1)}
                            className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-gray-700">
                          {item.price} each
                        </div>
                      </div>
                      
                      {/* Size Selection */}
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Select Size</h4>
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size.id}
                              onClick={() => updateSize(index, size.name)}
                              className={`px-4 py-2 rounded-lg border transition-colors ${
                                item.selectedSize === size.name
                                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                            >
                              {size.name}
                              {size.price > 0 && (
                                <span className="ml-1 text-sm">+${size.price}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Spice Level */}
                      {item.category.toLowerCase().includes('spicy') || 
                       item.category.toLowerCase().includes('indian') ||
                       item.category.toLowerCase().includes('biryani') ? (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Spice Level</h4>
                          <div className="flex flex-wrap gap-2">
                            {spiceLevels.map((level) => (
                              <button
                                key={level.id}
                                onClick={() => updateSpiceLevel(index, level.name)}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                  item.selectedSpiceLevel === level.name
                                    ? 'border-red-600 bg-red-50 text-red-700'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                {level.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      
                      {/* Add-ons */}
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Add Extra Toppings/Sides</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {addons.map((addon) => (
                            <label
                              key={addon.id}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                                item.selectedAddons.includes(addon.id)
                                  ? 'border-orange-600 bg-orange-50'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={item.selectedAddons.includes(addon.id)}
                                onChange={() => toggleAddon(index, addon.id)}
                                className="h-4 w-4 text-orange-600 rounded"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{addon.name}</div>
                                <div className="text-sm text-gray-600">+${addon.price.toFixed(2)}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Special Instructions */}
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Special Instructions</h4>
                        <textarea
                          value={item.specialInstructions}
                          onChange={(e) => updateInstructions(index, e.target.value)}
                          placeholder="Any special requests or allergies? (e.g., no onions, extra sauce, etc.)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Delivery/Pickup Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Options</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Delivery Type */}
                <div>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => handleDeliveryChange('type', 'delivery')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        deliveryInfo.type === 'delivery'
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Truck className="h-6 w-6 mb-2" />
                      <div className="font-bold text-gray-900">Delivery</div>
                      <div className="text-sm text-gray-600">30-45 min • $2.99</div>
                    </button>
                    
                    <button
                      onClick={() => handleDeliveryChange('type', 'pickup')}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        deliveryInfo.type === 'pickup'
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Package className="h-6 w-6 mb-2" />
                      <div className="font-bold text-gray-900">Pickup</div>
                      <div className="text-sm text-gray-600">15-25 min • No fee</div>
                    </button>
                  </div>
                  
                  {/* Schedule Order */}
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="scheduleOrder"
                      checked={deliveryInfo.scheduled}
                      onChange={(e) => handleDeliveryChange('scheduled', e.target.checked)}
                      className="h-4 w-4 text-orange-600 rounded"
                    />
                    <label htmlFor="scheduleOrder" className="text-gray-700">
                      Schedule this order for later
                    </label>
                  </div>
                  
                  {deliveryInfo.scheduled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={deliveryInfo.scheduleDate}
                          onChange={(e) => handleDeliveryChange('scheduleDate', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={deliveryInfo.scheduleTime}
                          onChange={(e) => handleDeliveryChange('scheduleTime', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Delivery Address */}
                {deliveryInfo.type === 'delivery' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Delivery Address</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={deliveryInfo.address}
                        onChange={(e) => handleDeliveryChange('address', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Apartment/Suite"
                          value={deliveryInfo.apartment}
                          onChange={(e) => handleDeliveryChange('apartment', e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={deliveryInfo.city}
                          onChange={(e) => handleDeliveryChange('city', e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={deliveryInfo.zipCode}
                        onChange={(e) => handleDeliveryChange('zipCode', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <textarea
                        placeholder="Delivery instructions (e.g., call when arriving, leave at door)"
                        value={deliveryInfo.instructions}
                        onChange={(e) => handleDeliveryChange('instructions', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                        rows="2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleCustomerChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerChange('phone', e.target.value)}
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Items List */}
                <div className="space-y-3 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {item.quantity} × {item.name}
                        </div>
                        <div className="text-gray-600 text-xs mt-1">
                          Size: {item.selectedSize}
                          {item.selectedSpiceLevel && ` • Spice: ${item.selectedSpiceLevel}`}
                          {item.selectedAddons.length > 0 && (
                            <div className="mt-1">
                              Add-ons: {item.selectedAddons.length}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="font-medium text-gray-900">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={appliedCoupon}
                      onChange={(e) => setAppliedCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Try: WELCOME10 (10% off) • FIRSTORDER ($5 off)
                  </div>
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${calculateDeliveryFee().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">${calculateServiceFee().toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                {/* Tip Selection */}
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Add a Tip</h3>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {tipOptions.map((tip, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (tip.amount === 'custom') {
                            const customTip = prompt('Enter custom tip amount:');
                            if (customTip && !isNaN(customTip)) {
                              setTipAmount(parseFloat(customTip));
                            }
                          } else {
                            setTipAmount(tip.amount);
                          }
                        }}
                        className={`px-3 py-2 rounded-lg border transition-colors ${
                          (tip.amount === 'custom' && tipAmount > 0 && !tipOptions.some(t => t.amount === tipAmount)) ||
                          tipAmount === tip.amount
                            ? 'border-orange-600 bg-orange-50 text-orange-700'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {tip.label}
                      </button>
                    ))}
                  </div>
                  {tipAmount > 0 && (
                    <div className="text-sm text-gray-600 text-center">
                      Thank you for your generosity! 🙏
                    </div>
                  )}
                </div>
                
                {/* Total */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Including all fees and taxes
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-orange-600"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Pay securely with your card</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-orange-600"
                    />
                    <div className="h-5 w-5 flex items-center justify-center">💵</div>
                    <div className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-orange-600"
                    />
                    <div className="h-5 w-5 flex items-center justify-center text-blue-600">P</div>
                    <div className="flex-1">
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-gray-600">Pay with your PayPal account</div>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Order Notes & Safety */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Safe & Contactless Delivery</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Our delivery partners follow all safety guidelines. You can opt for contactless delivery.
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: 30-45 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4" />
                    <span>Freshly prepared • Quality guaranteed</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-bold text-lg shadow-lg"
              >
                Place Order • ${calculateTotal().toFixed(2)}
              </button>
              
              <div className="text-center text-sm text-gray-500">
                By placing your order, you agree to our Terms of Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtoCard;