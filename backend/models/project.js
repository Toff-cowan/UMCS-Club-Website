// backend/models/project.js
//  This backend model represents the projects in the database that we utilize to display on the section of the frontend pertaining to the
// various projects created by club members or SIG groups.
// The schema contains the title, image, description, current status and the date it was deployed.
// This model is essential for managing and retrieving event data for the UMCS Club Website.
// It allows for structured storage and access to event information.
// This setup ensures that event data is consistently formatted and easily retrievable for display on the frontend.
// It is built using Mongoose, a popular ODM for MongoDB in Node.js applications.

const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String // URL or file path
  },
  description: {
    type: String,
    maxlength: 800,
    trim: true,  
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'On-hold'],
    default: 'completed'
  },
  sig: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
