// backend/routes/executive.js
// This backend route handles API requests related to club executives.
// It defines the endpoint for retrieving executive data from the database.
// This route uses the Exec model to fetch executive information and send it as a JSON response.
// This setup allows the frontend to access executive data via the /api/executive endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The route currently supports fetching all executives, sorted by their creation date in descending order.

const express = require("express");
const router = express.Router();
const Member = require("../models/exec");
const Exec = require("../models/exec");

// GET /api/execs
router.get("/", async (req, res) => {
  try {
    const execs = await Exec.find().sort({ createdAt: -1 });
    res.json(execs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch executives" });
  }
});

module.exports = router;
