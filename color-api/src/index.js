// src/index.js
const express = require("express"); // Import express
const os = require("os"); // Import os module to get hostname

const app = express(); // Create express app
const port = 80; // App will listen on port 80

const color = "green";
const hostname = os.hostname();

// Read environment variables
const delayStartup = process.env.DELAY_STARTUP === "true";
const failLiveness = process.env.FAIL_LIVENESS === "true";
const failReadiness = process.env.FAIL_READINESS === "true";
// Log the chosen configuration
console.log("Delay Startup:", delayStartup);
console.log("Fail Liveness:", failLiveness);
console.log("Fail Readiness:", failReadiness);

// Define a route
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

app.get("/ready", (req, res) => {
  if (failReadiness && Math.random() < 0.5) {
    return res.sendStatus(503); // Force readiness failure
  }
  return res.send("OK");
});

app.get("/up", (req, res) => {
  return res.send("OK");
});

app.get("/health", (req, res) => {
  if (failLiveness) {
    return res.sendStatus(503); // Force liveness failure
  }
  return res.send("OK");
});

if (delayStartup) {
  const start = Date.now();
  while (Date.now() - start < 60000) {
    // Purposefully block the event loop and execution for 60s
  }
}

// Start server
app.listen(port, () => {
  console.log(`Color API listening on port ${port}`);
});
