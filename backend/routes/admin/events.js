const express = require("express");
const router = express.Router();
const Event = require("../../models/event");

// GET /api/admin/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// POST /api/admin/events
router.post("/", async (req, res) => {
  try {
    const { title, description, image, date } = req.body || {};
    if (!title) return res.status(400).json({ message: "Title required" });
    const event = new Event({
      title: title.trim(),
      description: (description || "").trim(),
      image: image || "",
      date: date ? new Date(date) : null,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to create event" });
  }
});

// PUT /api/admin/events/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, image, date } = req.body || {};
    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = (description || "").trim();
    if (image !== undefined) updates.image = image;
    if (date !== undefined) updates.date = date ? new Date(date) : null;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to update event" });
  }
});

// DELETE /api/admin/events/clear - must be before /:id
router.delete("/clear", async (req, res) => {
  try {
    const result = await Event.deleteMany({});
    res.json({ message: "Events cleared", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear events" });
  }
});

// DELETE /api/admin/events/:id
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted", id: event._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;
