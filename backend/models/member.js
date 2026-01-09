// backend/models/member.js
//This backend is a model of the members in the database that we utilize to display on the section of th frontend pertaining to the 
//various members of the club. 

//the schema only contains the name of the member and the date they were created in the database.
const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Member", MemberSchema);
