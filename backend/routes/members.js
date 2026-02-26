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
const { redactBadWords, hasInappropriateContent } = require("../utils/contentModeration");

const MAX_NAME_LENGTH = 80;

// GET /api/members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});

// POST /api/members – add/update a club member name (with content moderation)
router.post("/", async (req, res) => {
  try {
    let name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    if (name.length > MAX_NAME_LENGTH) {
      return res.status(400).json({ message: "Name is too long." });
    }

    const sanitized = redactBadWords(name);
    if (hasInappropriateContent(name) || !sanitized) {
      return res.status(400).json({ message: "Please enter an appropriate name." });
    }

    // Identify the "user" so they can only have one active name.
    // Prefer a stable client id header from the frontend; fall back to IP.
    const clientIdHeader = req.header("x-member-id");
    const clientId = (clientIdHeader && String(clientIdHeader)) || String(req.ip || "").trim() || undefined;

    let member;
    if (clientId) {
      // If this client has already added a name, update/replace it.
      member = await Member.findOneAndUpdate(
        { clientId },
        { name: sanitized, clientId, createdAt: new Date() },
        { new: true, upsert: true }
      );
    } else {
      member = new Member({ name: sanitized });
      await member.save();
    }

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: "Failed to add member" });
  }
});

module.exports = router;
