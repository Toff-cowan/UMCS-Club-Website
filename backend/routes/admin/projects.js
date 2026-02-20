const express = require("express");
const router = express.Router();
const Project = require("../../models/project");

// GET /api/admin/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// POST /api/admin/projects
router.post("/", async (req, res) => {
  try {
    const { title, description, image, status, sig, url } = req.body || {};
    if (!title) return res.status(400).json({ message: "Title required" });
    const validStatus = ["Ongoing", "Completed", "On-hold"].includes(status) ? status : "Completed";
    const project = new Project({
      title: title.trim(),
      description: (description || "").trim(),
      image: image || "",
      status: validStatus,
      sig: (sig || "").trim(),
      url: (url || "").trim(),
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project" });
  }
});

// PUT /api/admin/projects/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, image, status, sig, url } = req.body || {};
    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (image !== undefined) updates.image = image;
    if (status !== undefined && ["Ongoing", "Completed", "On-hold"].includes(status)) updates.status = status;
    if (sig !== undefined) updates.sig = (sig || "").trim();
    if (url !== undefined) updates.url = (url || "").trim();

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to update project" });
  }
});

// DELETE /api/admin/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted", id: project._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project" });
  }
});

// DELETE /api/admin/projects/clear - must be before /:id
router.delete("/clear", async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.json({ message: "Projects cleared", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear projects" });
  }
});

module.exports = router;
