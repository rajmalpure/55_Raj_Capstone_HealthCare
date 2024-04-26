const express = require('express');
const app = express();
const defaultPort = 3000;
const port = process.env.PUBLIC_PORT || defaultPort;

// define the ping route
app.get('/ping', (req, res) => {
  res.send("Hello");
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
