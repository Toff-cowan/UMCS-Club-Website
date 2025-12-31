// backend/routes/events.js
// This backend route handles API requests related to club events.
// It defines the endpoint for retrieving event data from the database.
// This route uses the Event model to fetch event information and send it as a JSON response.
// This setup allows the frontend to access event data via the /api/events endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The route currently supports fetching all events, sorted by their creation date in descending order.

const express = require("express"); // this is the express module
const router = express.Router(); // this is the router for the events route
const Event = require("../models/event"); // this is the model for the events

// GET /api/events
router.get("/", async (req, res) => { // this is the endpoint for the events route
    try {
        const events = await Event.find().sort({ createdAt: -1 }); // this is the query to the database to get the events
        res.json(events); // this is the response to the client
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events" }); // this is the error response to the client
    }
});

module.exports = router; // this is the export of the router
