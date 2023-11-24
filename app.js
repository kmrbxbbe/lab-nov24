const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Static files directory for HTML, CSS, JS
app.use(express.static('views'));

// Routes
app.use('/items', itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});