// backend/controllers/index.js
// This index file aggregates all the individual controllers for easier import elsewhere in the application.
// It imports controllers for managing events, executives, members, projects, and special interest groups (SIGs).
// By exporting them as a single module, it simplifies the process of including these controllers in route definitions or other parts of the backend.
// This setup promotes modularity and organization within the backend codebase.

const eventController = require('./eventController'); // Importing event controller
const executiveController = require('./execController'); // Importing executive controller
const memberController = require('./memberController');  // Importing member controller
const projectController = require('./projectController'); // Importing project controller
const sigController = require('./sigController'); // Importing SIG controller

module.exports = {
  eventController,
  execController,
  memberController,
  projectController,
  sigController
}; // Exporting all controllers as a single module