// backend/controllers/execController.js
// This backend controller manages API requests related to club executive members.
// It defines functions for creating, retrieving, updating, and deleting executive member data in the database.
// This controller uses the Executive model to interact with executive member information.
// This setup allows the frontend to perform CRUD operations on executive member data via the /api/executives endpoint.
// It is built using Express, a popular web framework for Node.js applications.
// The controller ensures proper handling of executive member data and error management.
const Executive = require('../models/exec');

// Create a new executive member
exports.createExecutive = async (req, res) => {
  try {
    const executive = new Executive(req.body);
    await executive.save();
    res.status(201).json({ success: true, data: executive });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all executives
exports.getAllExecutives = async (req, res) => {
  try {
    const executives = await Executive.find().sort({ position: 1, name: 1 });
    res.status(200).json({ success: true, data: executives });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get executives by position
exports.getExecutivesByPosition = async (req, res) => {
  try {
    const executives = await Executive.find({ position: req.params.position });
    res.status(200).json({ success: true, data: executives });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update executive
exports.updateExecutive = async (req, res) => {
  try {
    const executive = await Executive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!executive) {
      return res.status(404).json({ success: false, error: 'Executive not found' });
    }
    res.status(200).json({ success: true, data: executive });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete executive
exports.deleteExecutive = async (req, res) => {
  try {
    const executive = await Executive.findByIdAndDelete(req.params.id);
    if (!executive) {
      return res.status(404).json({ success: false, error: 'Executive not found' });
    }
    res.status(200).json({ success: true, message: 'Executive deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};