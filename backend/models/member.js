// backend/models/member.js
//This backend is a model of the members in the database that we utilize to display on the section of th frontend pertaining to the 
//various members of the club. 

//the schema contains the name of the member, a per-client identifier so each user can only
//have one active name at a time, and the date they were created/last updated in the database.
const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  clientId: {
    type: String,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Member", MemberSchema);
