// backend/routes/projects.js
// This backend route handles API requests related to club projects.
// It defines the endpoint for retrieving project data from the database.
// This route uses the Project model to fetch project information and send it as a JSON response.
// This setup allows the frontend to access project data via the /api/projects endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The route currently supports fetching all projects.

const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from the database
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" }); // Error handling 
  }
});

module.exports = router; // Export the router to be used in app.js
