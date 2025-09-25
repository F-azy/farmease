const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controllers/leaderboardController");
const { authenticate } = require("../middleware/authMiddleware");

// GET /api/farmers/leaderboard
router.get("/farmers/leaderboard", authenticate, getLeaderboard);

module.exports = router;
