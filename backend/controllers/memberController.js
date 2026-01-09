// This backend controller manages API requests related to club members.
// It defines functions for creating, retrieving, updating, and deleting member data in the database.
// This controller uses the Member model to interact with member information.
// This setup allows the frontend to perform CRUD operations on member data via the /api/members endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The controller ensures proper handling of member data and error management.

const Member = require('../models/member');

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get members by year/grade
exports.getMembersByYear = async (req, res) => {
  try {
    const members = await Member.find({ year: req.params.year });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get members by SIG
exports.getMembersBySig = async (req, res) => {
  try {
    const members = await Member.find({ sig: req.params.sigId });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update member
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }
    res.status(200).json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};