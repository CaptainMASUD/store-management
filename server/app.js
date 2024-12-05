const express = require('express');
const cors = require('cors'); // To handle CORS issues
const bodyParser = require('body-parser'); // For parsing JSON and URL-encoded data
const db = require('./config/db');

// Importing routes
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const staffRoutes = require('./routes/staffRoutes');

const app = express();

// Middleware
app.use(cors()); // Enables CORS for all routes
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

// Routes
app.use('/api/auth', authRoutes);         // Authentication routes
app.use('/api/inventory', inventoryRoutes); // Inventory management routes
app.use('/api/staff', staffRoutes);       // Staff-related routes

// Default route
app.get('/', (req, res) => {
  res.send('Store Management System Backend is running...');
});

// Server setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
