const Application = require("../models/applicationModel");

// Get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.getAllApplications();
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Post a new application
const postApplication = async (req, res) => {
  try {
    const { app_name, purpose, key_features, benefits, download_link, support_contact } = req.body;

    if (!app_name || !purpose || !key_features || !benefits) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newApp = await Application.createApplication({
      app_name,
      purpose,
      key_features,
      benefits,
      download_link,
      support_contact,
    });

    res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getApplications, postApplication };
