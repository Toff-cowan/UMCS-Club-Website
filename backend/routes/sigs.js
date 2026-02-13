// backend/routes/sigs.js
// This backend route handles API requests related to club SIGs.
// It defines the endpoint for retrieving SIG data from the database.
// This route uses the SIG model to fetch SIGs information and send it as a JSON response.
// This setup allows the frontend to access SIG data via the /api/sigs endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The route currently supports fetching all SIGs, sorted by their creation date in descending order.

const express = require("express");
const router = express.Router();
const Sig = require("../models/sig");

// GET /api/sigs
router.get("/", async (req, res) => {
    try {
        const sigs = await Sig.find().sort({ name: 1 });
        const sigs = await Sig.find().sort({ sig: 1 });
        res.json(sigs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch sigs" });
    }
});

module.exports = router;
