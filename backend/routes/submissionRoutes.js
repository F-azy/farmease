const express = require("express");
const { getAllSubmissions } = require("../controllers/submissionController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin route to fetch all submissions
router.get("/", authenticate, getAllSubmissions);

module.exports = router;
