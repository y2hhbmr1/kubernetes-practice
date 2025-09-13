// src/index.js
const express = require("express"); // Import express
const app = express(); // Create express app
const port = 80; // App will listen on port 80

// Define a route
app.get("/", (req, res) => {
  res.send(`
    <h1 style="color:pink">
      Hello from color-API
    </h1>
  `);
});

// Start server
app.listen(port, () => {
  console.log(`Color API listening on port ${port}`);
});
