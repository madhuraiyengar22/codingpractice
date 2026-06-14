require('dotenv').config();          // Load environment variables from .env file
const express = require('express');
const app = express();

const moviesRouter = require('./routes/movies');  // Import the movies router

app.use(express.json());            // Middleware to parse JSON bodies from incoming requests
app.use(express.static('public'));  // Serve UI assets from the public folder

const PORT = process.env.PORT || 3000;     // Use environment variable for port or default to 3000

const logger = (req, res, next) => {                // Middleware function to log request details
    console.log(`${req.method} request received for ${req.url}`);
    next();                                 // Call next() to pass control to the next middleware function
}

app.use(logger);                // Use the logger middleware for all routes 
console.log('Movies router loaded:', moviesRouter);  // Log the loaded movies router to verify it's imported correctly

app.use(moviesRouter);          // Use the movies router for handling movie-related routes

app.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});