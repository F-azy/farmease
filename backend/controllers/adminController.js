const pool = require("../conn");

// 🔹 Get Admin Dashboard stats
async function getAdminDashboard(req, res) {
  try {
    // Total farmers
    const farmersRes = await pool.query("SELECT COUNT(*) FROM users WHERE is_admin = false");
    const totalFarmers = parseInt(farmersRes.rows[0].count);

    // Total categories
    const categoriesRes = await pool.query("SELECT COUNT(*) FROM categories");
    const totalCategories = parseInt(categoriesRes.rows[0].count);

    // Total tasks
    const tasksRes = await pool.query("SELECT COUNT(*) FROM tasks");
    const totalTasks = parseInt(tasksRes.rows[0].count);

    // Total points in all tasks
    const pointsRes = await pool.query("SELECT COALESCE(SUM(points),0) AS total_points FROM tasks");
    const totalPoints = parseInt(pointsRes.rows[0].total_points);

    res.json({
      totalFarmers,
      totalCategories,
      totalTasks,
      totalPoints
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// 🔹 Get all farmers with progress + rewards
async function getAllFarmers(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT u.id, u.full_name, u.phone, u.pincode,
             COALESCE(SUM(fc.completed_tasks), 0) as progress,
             COALESCE(SUM(fc.points), 0) as rewards
      FROM users u
      LEFT JOIN farmer_categories fc ON u.id = fc.user_id
      WHERE u.is_admin = false
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("getAllFarmers error:", err);
    res.status(500).json({ message: "Server error fetching farmers" });
  }
}

// 🔹 Get single farmer details
async function getFarmerDetails(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT u.id, u.full_name, u.phone, u.pincode,
              COALESCE(SUM(fc.completed_tasks), 0) as progress,
              COALESCE(SUM(fc.points), 0) as rewards
       FROM users u
       LEFT JOIN farmer_categories fc ON u.id = fc.user_id
       WHERE u.id = $1
       GROUP BY u.id`,
      [id]
    );

    if (!rows[0]) return res.status(404).json({ message: "Farmer not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("getFarmerDetails error:", err);
    res.status(500).json({ message: "Server error fetching farmer details" });
  }
}

module.exports = {
  getAdminDashboard,
  getAllFarmers,
  getFarmerDetails
};
