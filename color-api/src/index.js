// src/index.js
const express = require("express"); // Import express
const os = require("os"); // Import os module to get hostname

const app = express(); // Create express app
const port = 80; // App will listen on port 80

// Define a route
const color = "green";
const hostname = os.hostname();

app.get("/", (req, res) => {
  res.send(`
    <h1 style="color:${color};">
      Hello from color-API
    </h1>
    <h2>Hostname: ${hostname}</h2>
  `);
});

app.get("/api", (req, res) => {
  const { format } = req.query;

  if (format === "json") {
    return res.json({
      color,
      hostname,
    });
  } else {
    return res.send(`COLOR : ${color},  Hostname: ${hostname}
    `);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Color API listening on port ${port}`);
});
