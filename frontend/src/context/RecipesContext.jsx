import React, { createContext, useContext } from 'react';

// Static recipes data shared between list and detail pages
const foodItems = [
  {
    id: 1,
    name: 'Family Feast Combo',
    category: 'All deals',
    description: '2 Pizzas + 1 Burger + 4 Drinks + Fries',
    price: '$24.99',
    originalPrice: '$34.99',
    rating: 4.8,
    prepTime: '25-30 min',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80',
    popular: true,
    discount: '28% OFF',
  },
  {
    id: 2,
    name: 'Chicken Supreme Pizza',
    category: 'Pizza',
    description: 'Loaded with chicken, bell peppers, onions & mozzarella',
    price: '$14.99',
    originalPrice: '$18.99',
    rating: 4.7,
    prepTime: '20-25 min',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    popular: true,
    discount: '21% OFF',
  },
  {
    id: 3,
    name: 'Chicken Pulao',
    category: 'Pulao',
    description: 'Fragrant rice cooked with tender chicken pieces and spices',
    price: '$12.99',
    rating: 4.6,
    prepTime: '30-35 min',
    image:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 4,
    name: 'Crispy Chicken Burger',
    category: 'Burger',
    description: 'Crispy chicken fillet with lettuce, mayo & special sauce',
    price: '$9.99',
    originalPrice: '$12.99',
    rating: 4.5,
    prepTime: '15-20 min',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    popular: true,
    discount: '23% OFF',
  },
  {
    id: 5,
    name: 'Chicken Biryani',
    category: 'Biryani',
    description: 'Aromatic basmati rice with succulent chicken pieces',
    price: '$15.99',
    rating: 4.9,
    prepTime: '35-40 min',
    image:
      'https://images.unsplash.com/photo-1563379091339-03246963d9d6?auto=format&fit=crop&w=600&q=80',
    popular: true,
    bestseller: true,
  },
  {
    id: 6,
    name: 'Club Sandwich',
    category: 'Sandwich',
    description: 'Triple-decker sandwich with chicken, bacon & veggies',
    price: '$8.99',
    rating: 4.4,
    prepTime: '10-15 min',
    image:
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 7,
    name: 'Grilled Chicken Platter',
    category: 'Chicken',
    description: 'Grilled chicken served with rice and vegetables',
    price: '$16.99',
    rating: 4.7,
    prepTime: '25-30 min',
    image:
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 8,
    name: 'Savour Krispo Snack Box',
    category: 'Savour Krispo',
    description: 'Assorted crispy snacks with dipping sauces',
    price: '$7.99',
    rating: 4.3,
    prepTime: '5-10 min',
    image:
      'https://images.unsplash.com/photo-1550253009-6c2b6c4cd1b7?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 9,
    name: 'Value Meal',
    category: 'Meals',
    description: 'Burger + Fries + Drink at special price',
    price: '$10.99',
    originalPrice: '$13.99',
    rating: 4.5,
    prepTime: '15-20 min',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    popular: true,
    discount: '21% OFF',
  },
  {
    id: 10,
    name: 'Chocolate Lava Cake',
    category: 'Sweet',
    description: 'Warm chocolate cake with molten center & ice cream',
    price: '$5.99',
    rating: 4.8,
    prepTime: '8-12 min',
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62dadadf?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 11,
    name: 'Fresh Lime Soda',
    category: 'Drinks',
    description: 'Refreshing lime soda with mint',
    price: '$3.99',
    rating: 4.2,
    prepTime: '2-5 min',
    image:
      'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 12,
    name: 'Garlic Bread Sticks',
    category: 'Side Orders',
    description: 'Crispy bread sticks with garlic butter dip',
    price: '$4.99',
    rating: 4.6,
    prepTime: '8-10 min',
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
];

const RecipesContext = createContext({ foodItems });

export const RecipesProvider = ({ children }) => {
  return (
    <RecipesContext.Provider value={{ foodItems }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);


