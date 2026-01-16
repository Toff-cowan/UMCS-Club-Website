// backend/models/sig.js
//  This backend model represents the SIGs in the database that we utilize to display on the section of the frontend pertaining to the
// various SIGs of the club.
// The schema contains the name, icon, and description.
// This model is essential for managing and retrieving SIG data for the UMCS Club Website.
// It allows for structured storage and access to SIG information.
// This setup ensures that SIG data is consistently formatted and easily retrievable for display on the frontend.
// It is built using Mongoose, a popular ODM for MongoDB in Node.js applications.

const mongoose = require("mongoose");

const SigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String // URL or file path
  },
  description: {
    type: String,
    maxlength: 500,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Web', 'Game', 'Cyber', 'AI', 'Robotics', 'Mobile', 'Data']
  }
});

module.exports = mongoose.model("Sig", SigSchema);
