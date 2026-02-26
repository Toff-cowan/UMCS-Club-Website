// backend/models/event.js
//  This backend model represents the events in the database that we utilize to display on the section of the frontend pertaining to the
// various club events.
// The schema contains the title, image, description and the date they were created in the database.
// This model is essential for managing and retrieving event data for the UMCS Club Website.
// It allows for structured storage and access to event information.
// This setup ensures that event data is consistently formatted and easily retrievable for display on the frontend.
// It is built using Mongoose, a popular ODM for MongoDB in Node.js applications.

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String // URL or file path
  },
  description: {
    type: String,
    maxlength: 500
  },
  date: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Event", EventSchema);
