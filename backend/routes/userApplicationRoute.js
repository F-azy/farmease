const express = require("express");
const { getApplications, submitApplication } = require("../controllers/userApplicationController");
const router = express.Router();

// Public: get all applications
router.get("/", getApplications);

// User submits form
router.post("/submit", submitApplication);

module.exports = router;
