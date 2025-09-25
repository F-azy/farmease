const { getFarmersLeaderboard } = require("../models/userModel");

async function getLeaderboard(req, res) {
  try {
    const farmers = await getFarmersLeaderboard();
    res.status(200).json({ farmers });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getLeaderboard };
