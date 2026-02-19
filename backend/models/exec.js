// backend/models/exec.js
//  This backend model represents the executives in the database that we utilize to display on the section of the frontend pertaining to the
// various executives of the club.
// The schema contains the name, position, image, quote/message, and the date they were created in the database.
// This model is essential for managing and retrieving executive data for the UMCS Club Website.
// It allows for structured storage and access to executive information.
// This setup ensures that executive data is consistently formatted and easily retrievable for display on the frontend.
// It is built using Mongoose, a popular ODM for MongoDB in Node.js applications.
const mongoose = require("mongoose");

const ExecutiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    type: String // URL or file path
  },
  quote: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Executive", ExecutiveSchema);