const express = require("express");
const router = express.Router();
const Member = require("../../models/member");

// GET /api/admin/members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});

// POST /api/admin/members (admin can add without content moderation)
router.post("/", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) return res.status(400).json({ message: "Name required" });
    const member = new Member({ name });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to create member" });
  }
});

// PUT /api/admin/members/:id
router.put("/:id", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) return res.status(400).json({ message: "Name required" });
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: { name } },
      { new: true, runValidators: true }
    );
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to update member" });
  }
});

// DELETE /api/admin/members/:id
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted", id: member._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete member" });
  }
});

// DELETE /api/admin/members/clear - must be before /:id
router.delete("/clear", async (req, res) => {
  try {
    const result = await Member.deleteMany({});
    res.json({ message: "Members cleared", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear members" });
  }
});

module.exports = router;
