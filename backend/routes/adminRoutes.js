const express = require("express");
const {
  getAdminDashboard,
  getAllFarmers,
  getFarmerDetails
} = require("../controllers/adminController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Admin protected routes
router.get("/dashboard-stats", authenticate, getAdminDashboard);   // stats cards
router.get("/farmers", authenticate, getAllFarmers);        // list of farmers
router.get("/farmers/:id", authenticate, getFarmerDetails); // single farmer details

module.exports = router;
