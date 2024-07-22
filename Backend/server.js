const express = require('express');
const mongoose = require('mongoose');
const app = express();
const defaultPort = 3000;
const routes = require('./routes');
const port = process.env.PUBLIC_PORT || defaultPort;
const dotenv = require('dotenv').config();
const connection = process.env.URI;

// Connect to MongoDB
mongoose.connect(connection)
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// define the ping route
app.get('/ping', (req, res) => {
  res.send("Hello");
});

app.use(routes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
