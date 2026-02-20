const express = require("express");
const router = express.Router();
const Executive = require("../../models/exec");

// GET /api/admin/executives
router.get("/", async (req, res) => {
  try {
    const execs = await Executive.find().sort({ createdAt: -1 });
    res.json(execs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch executives" });
  }
});

// POST /api/admin/executives
router.post("/", async (req, res) => {
  try {
    const { name, position, image, quote } = req.body || {};
    if (!name || !position) {
      return res.status(400).json({ message: "Name and position required" });
    }
    const exec = new Executive({ name: name.trim(), position: position.trim(), image: image || "", quote: (quote || "").trim() });
    await exec.save();
    res.status(201).json(exec);
  } catch (err) {
    res.status(500).json({ message: "Failed to create executive" });
  }
});

// PUT /api/admin/executives/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, position, image, quote } = req.body || {};
    const exec = await Executive.findByIdAndUpdate(
      req.params.id,
      { $set: { name: name?.trim(), position: position?.trim(), image: image || "", quote: (quote || "").trim() } },
      { new: true, runValidators: true }
    );
    if (!exec) return res.status(404).json({ message: "Executive not found" });
    res.json(exec);
  } catch (err) {
    res.status(500).json({ message: "Failed to update executive" });
  }
});

// DELETE /api/admin/executives/clear - must be before /:id
router.delete("/clear", async (req, res) => {
  try {
    const result = await Executive.deleteMany({});
    res.json({ message: "Executives cleared", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear executives" });
  }
});

// DELETE /api/admin/executives/:id
router.delete("/:id", async (req, res) => {
  try {
    const exec = await Executive.findByIdAndDelete(req.params.id);
    if (!exec) return res.status(404).json({ message: "Executive not found" });
    res.json({ message: "Executive deleted", id: exec._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete executive" });
  }
});

module.exports = router;
