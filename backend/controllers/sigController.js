const SIG = require('../models/sig');

// Create a new SIG
exports.createSIG = async (req, res) => {
  try {
    const sig = new SIG(req.body);
    await sig.save();
    res.status(201).json({ success: true, data: sig });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all SIGs
exports.getAllSIGs = async (req, res) => {
  try {
    const sigs = await SIG.find().sort({ sig: 1 });
    const sigs = await SIG.find().sort({ sig: 1 });
    res.status(200).json({ success: true, data: sigs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get SIG by ID
exports.getSIGById = async (req, res) => {
  try {
    const sig = await SIG.findById(req.params.id);
    const sig = await SIG.findById(req.params.id);
    if (!sig) {
      return res.status(404).json({ success: false, error: 'SIG not found' });
    }
    res.status(200).json({ success: true, data: sig });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update SIG
exports.updateSIG = async (req, res) => {
  try {
    const sig = await SIG.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!sig) {
      return res.status(404).json({ success: false, error: 'SIG not found' });
    }
    res.status(200).json({ success: true, data: sig });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete SIG
exports.deleteSIG = async (req, res) => {
  try {
    const sig = await SIG.findByIdAndDelete(req.params.id);
    if (!sig) {
      return res.status(404).json({ success: false, error: 'SIG not found' });
    }
    res.status(200).json({ success: true, message: 'SIG deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
