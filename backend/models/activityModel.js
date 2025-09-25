const pool = require("../conn");

async function initActivityTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS recent_activities (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      icon VARCHAR(10),
      title VARCHAR(255),
      description TEXT,
      bg_color VARCHAR(50),
      created_at TIMESTAMP DEFAULT now()
    );
  `;
  await pool.query(query);
  console.log("✅ Activities table ready");
}

async function getUserActivities(userId) {
  const { rows } = await pool.query(
    `SELECT * FROM recent_activities WHERE user_id=$1 ORDER BY created_at DESC LIMIT 10`,
    [userId]
  );
  return rows;
}

module.exports = { initActivityTable, getUserActivities };
