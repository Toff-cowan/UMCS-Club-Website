// backend/routes/members.js
// This backend route handles API requests related to club members.
// It defines the endpoint for retrieving member data from the database.
// This route uses the Member model to fetch member information and send it as a JSON response.
// This setup allows the frontend to access member data via the /api/members endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The route currently supports fetching all members, sorted by their creation date in descending order.

const express = require("express");
const router = express.Router();
const Member = require("../models/member");

// GET /api/members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});

module.exports = router;
