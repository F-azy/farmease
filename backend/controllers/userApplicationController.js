const Application = require("../models/applicationModel");

// Get all applications (for users)
const getApplications = async (req, res) => {
  try {
    const apps = await Application.getAllApplications();
    res.status(200).json({ success: true, data: apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Submit user application
const submitApplication = async (req, res) => {
  try {
    const { application_id, user_name, email, phone, comments } = req.body;

    if (!application_id || !user_name || !email) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const submission = await Application.submitApplication({ application_id, user_name, email, phone, comments });
    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getApplications, submitApplication };
