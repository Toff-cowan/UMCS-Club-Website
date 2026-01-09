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
    const sigs = await SIG.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: sigs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get SIG by ID
exports.getSIGById = async (req, res) => {
  try {
    const sig = await SIG.findById(req.params.id)
      .populate('lead', 'name email') // Assuming lead is a reference to Member
      .populate('members', 'name email');
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

// Add member to SIG
exports.addMemberToSIG = async (req, res) => {
  try {
    const { sigId, memberId } = req.params;
    const sig = await SIG.findByIdAndUpdate(
      sigId,
      { $addToSet: { members: memberId } },
      { new: true }
    );
    if (!sig) {
      return res.status(404).json({ success: false, error: 'SIG not found' });
    }
    res.status(200).json({ success: true, data: sig });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Remove member from SIG
exports.removeMemberFromSIG = async (req, res) => {
  try {
    const { sigId, memberId } = req.params;
    const sig = await SIG.findByIdAndUpdate(
      sigId,
      { $pull: { members: memberId } },
      { new: true }
    );
    if (!sig) {
      return res.status(404).json({ success: false, error: 'SIG not found' });
    }
    res.status(200).json({ success: true, data: sig });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};