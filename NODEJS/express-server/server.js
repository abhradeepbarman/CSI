// Import the express module
const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Another route for the /about URL
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// Route to handle a POST request
app.post('/data', (req, res) => {
    console.log('Request body:', req.body);
    res.send('Data received.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
