const { getUserById } = require("../models/userModel");
const { getFarmerCategories, initFarmerProgress } = require("../models/farmerCategoryModel");
const { getUserSubmissions } = require("../models/submissionModel");
const { getUserActivities } = require("../models/activityModel");

async function getFarmerDashboard(req, res) {
  try {
    const userId = req.user.id; // from JWT middleware

    const user = await getUserById(userId);

    // Ensure farmer has entries in farmer_categories
    await initFarmerProgress(userId);

    const categories = await getFarmerCategories(userId);
    const submissions = await getUserSubmissions(userId);
    const activities = await getUserActivities(userId);

    res.json({
      farmer: {
        name: user.full_name,
        phone: user.phone,
        pincode: user.pincode,
        rewardPoints: categories.reduce((sum, c) => sum + c.points, 0)
      },
      categories,
      submissions,
      activities
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getFarmerDashboard };
