// backend/routes/sig-leads.js
// Serves SIG lead data for the SIGs page (carousel). Data is derived from the Sig model:
// each SIG has a lead name, quote, and avatarId; this route returns them in the shape the frontend expects.

const express = require("express");
const router = express.Router();
const Sig = require("../models/sig");

// GET /api/sig-leads
router.get("/", async (req, res) => {
  try {
    const sigs = await Sig.find().sort({ name: 1 }).lean();
    const leads = sigs.map((sig) => ({
      id: sig._id?.toString() || sig.sig,
      sig: sig.name || sig.sig,
      lead: sig.lead,
      quote: sig.quote || "",
      avatarId: sig.avatarId,
    }));
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch SIG leads" });
  }
});

module.exports = router;
