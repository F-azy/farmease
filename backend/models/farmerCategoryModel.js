const pool = require("../conn");

async function initFarmerCategoryTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS farmer_categories (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      category_id INT REFERENCES categories(id) ON DELETE CASCADE,
      completed_tasks INT DEFAULT 0,
      total_tasks INT NOT NULL,
      current_step INT DEFAULT 1,
      points INT DEFAULT 0,
      status VARCHAR(20) DEFAULT 'not-started',
      last_activity TIMESTAMP DEFAULT now(),
      UNIQUE(user_id, category_id)
    );
  `;
  await pool.query(query);
  console.log("✅ Farmer categories table ready");
}

async function getFarmerCategories(userId) {
  const { rows } = await pool.query(
    `SELECT 
       fc.id as farmer_category_id,
       fc.user_id,
       fc.category_id,  -- ✅ this is the real category id
       fc.completed_tasks,
       fc.total_tasks,
       fc.current_step,
       fc.points,
       fc.status,
       fc.last_activity,
       c.title,
       c.description,
       c.icon
     FROM farmer_categories fc
     JOIN categories c ON fc.category_id = c.id
     WHERE fc.user_id = $1`,
    [userId]
  );
  return rows;
}


async function initFarmerProgress(userId) {
  // Insert default entries for all categories if not present
  await pool.query(
    `INSERT INTO farmer_categories (user_id, category_id, total_tasks)
     SELECT $1, id, 6 FROM categories
     ON CONFLICT (user_id, category_id) DO NOTHING;`,
    [userId]
  );
}

module.exports = { initFarmerCategoryTable, getFarmerCategories, initFarmerProgress };
