const express = require("express");
const { getApplications, postApplication } = require("../controllers/applicationController");

const router = express.Router();

// Routes
router.get("/", getApplications);
router.post("/new", postApplication);

module.exports = router;
