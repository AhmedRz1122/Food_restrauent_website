// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

// ----- In-memory data stores (replace with a real DB in production) -----
let recipes = [
  {
    id: 1,
    name: 'Family Feast Combo',
    category: 'All deals',
    description: '2 Pizzas + 1 Burger + 4 Drinks + Fries',
    price: '$24.99',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80',
  },
];

let users = []; // { id, name, email, passwordHash }
let nextRecipeId = recipes.length + 1;
let nextUserId = 1;

// ----- Middleware -----
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // { id, email }
    next();
  });
}

// ----- Basic route -----
app.get('/', (req, res) => {
  res.send('Recipe Sharing API is running!');
});

// ----- Auth routes -----
// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Name, email and password are required' });
  }

  const existingUser = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: nextUserId++,
      name,
      email,
      passwordHash,
    };
    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required' });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Failed to login' });
  }
});

// Get current authenticated user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
});

// ----- Recipes routes (for AddtoCard) -----
// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Get single recipe by id
app.get('/api/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  res.json(recipe);
});

// Create a new recipe (protected)
app.post('/api/recipes', authenticateToken, (req, res) => {
  const { name, category, description, price, image } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ message: 'Name and price are required for a recipe' });
  }

  const newRecipe = {
    id: nextRecipeId++,
    name,
    category: category || 'Uncategorized',
    description: description || '',
    price,
    image:
      image ||
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
  };

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Delete a recipe by id (protected)
app.delete('/api/recipes/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const deleted = recipes.splice(index, 1)[0];
  res.json({ message: 'Recipe deleted', recipe: deleted });
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});