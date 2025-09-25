const pool = require("../conn");

// 🔹 Get all tasks for a specific category
async function getCategoryTasks(req, res) {
  try {
    const { categoryId } = req.params;
    
    // Add debugging
    console.log("Raw params:", req.params);
    console.log("Extracted categoryId:", categoryId);
    console.log("CategoryId type:", typeof categoryId);
    
    if (!categoryId || categoryId === 'undefined') {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Fetch category info
    const categoryRes = await pool.query(
      "SELECT id, title, description, icon FROM categories WHERE id = $1",
      [parseInt(categoryId)] // Ensure it's parsed as integer
    );
    const category = categoryRes.rows[0];
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Fetch tasks for this category
    const tasksRes = await pool.query(
      "SELECT id, title, points FROM tasks WHERE category_id = $1 ORDER BY id ASC",
      [parseInt(categoryId)] // Ensure it's parsed as integer
    );

    res.json({
      category,
      tasks: tasksRes.rows,
    });
  } catch (err) {
    console.error("getCategoryTasks error:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
}

module.exports = { getCategoryTasks };