// backend/routes/events.js
// This backend route handles API requests related to club events.
// It defines the endpoint for retrieving event data from the database.
// This route uses the Event model to fetch event information and send it as a JSON response.
// This setup allows the frontend to access event data via the /api/events endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The route currently supports fetching all events, sorted by their creation date in descending order.

const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// GET /api/events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events" });
    }
});

module.exports = router;
