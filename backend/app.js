// backend/app.js
// Main application file to set up Express app, middleware, and API routes.
// This file configures the Express application, including middleware for CORS and JSON parsing,
// and sets up the API routes for different resources like members, SIGs, projects, executives, and events.
// It serves as the central point for defining how the backend handles incoming requests.
// This setup allows for modular and organized routing of API endpoints.

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
// Enable CORS for all routes
// Parse JSON request bodies
// Parse URL-encoded request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded, if needed

// API Routes
app.use("/api/members", require("./routes/members"));
app.use("/api/sigs", require("./routes/sigs"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/executives", require("./routes/executive"));
app.use("/api/events", require("./routes/events"));
app.use("/api/sig-leads", require("./routes/sig-leads"));
app.use("/api/admin", require("./routes/admin"));

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// 404 for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Central error handler – log and return safe message
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? err.statusCode ?? 500;
  const message = err.message && status < 500 ? err.message : "Internal server error";
  res.status(status).json({ message });
});

module.exports = app;
