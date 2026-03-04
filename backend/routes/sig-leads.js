// backend/routes/sig-leads.js
// Serves SIG lead data for the SIGs page (carousel). Only executives whose position matches a SIG
// (from the Sig model) are returned — e.g. "Web Development", "AI Development". President, VP, etc. are excluded.

const express = require("express");
const router = express.Router();
const Executive = require("../models/exec");
const Sig = require("../models/sig");

function hashToAvatarId(str) {
  if (!str) return 1;
  let n = 0;
  for (let i = 0; i < str.length; i++) n = (n * 31 + str.charCodeAt(i)) >>> 0;
  return (n % 70) + 1;
}

function normalize(s) {
  return (s && String(s).trim().toLowerCase()) || "";
}

// GET /api/sig-leads
router.get("/", async (req, res) => {
  try {
    const [sigs, execs] = await Promise.all([
      Sig.find().sort({ name: 1, sig: 1 }).lean(),
      Executive.find().sort({ createdAt: -1 }).lean(),
    ]);

    const sigNamesSet = new Set();
    const sigByName = new Map();
    for (const sig of sigs) {
      const name = (sig.name && String(sig.name).trim()) || (sig.sig && String(sig.sig).trim());
      if (name) {
        sigNamesSet.add(normalize(name));
        sigByName.set(normalize(name), { id: sig._id?.toString(), displayName: name });
      }
    }

    const leads = [];
    for (const exec of execs) {
      const positionNorm = normalize(exec.position);
      if (!positionNorm || !sigNamesSet.has(positionNorm)) continue;

      const sigInfo = sigByName.get(positionNorm);
      leads.push({
        id: exec._id?.toString(),
        sigId: sigInfo?.id ?? exec._id?.toString(),
        sig: (sigInfo?.displayName || (exec.position && String(exec.position).trim()) || "").trim(),
        lead: exec.name ? String(exec.name).trim() : "SIG Lead",
        quote: exec.quote ? String(exec.quote).trim() : "",
        image: exec.image && String(exec.image).trim() ? exec.image : null,
        avatarId: hashToAvatarId(exec._id?.toString()),
      });
    }

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch SIG leads" });
  }
});

module.exports = router;
