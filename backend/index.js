/**
 * This file is for loading enviroment variables, set up Express configure CORS (enabled), and attach some routes 
 * 
 */

// Load enviroment  variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// Set the port number for the server to listen on (defaults to 5001 if not set in environment variables)
const port = process.env.PORT || 5001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Use routes and mount them
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Start the server and listen for incoming HTTP requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

