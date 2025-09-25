const express = require("express");
const { getFarmerDashboard } = require("../controllers/dashboardController");
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/", authenticate, getFarmerDashboard);

module.exports = router;
