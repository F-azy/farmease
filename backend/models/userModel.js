// models/userModel.js
const pool = require('../conn');

// 🔹 Auto-create table on startup
async function initUserTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL UNIQUE,
      pincode VARCHAR(10) NOT NULL,
      password_hash TEXT NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await pool.query(query);
  console.log('✅ Users table ready');
}

// 🔹 Insert user
async function createUser({ full_name, phone, pincode, password_hash, is_admin = false }) {
  const sql = `
    INSERT INTO users (full_name, phone, pincode, password_hash, is_admin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, full_name, phone, pincode, is_admin, created_at;
  `;
  const values = [full_name, phone, pincode, password_hash, is_admin];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

// 🔹 Get user by phone
async function getUserByPhone(phone) {
  const { rows } = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
  return rows[0] || null;
}

// 🔹 Get user by id (sanitized)
async function getUserById(id) {
  const { rows } = await pool.query(
    'SELECT id, full_name, phone, pincode, is_admin, created_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

// Get all farmers with their total points and main category
async function getFarmersLeaderboard() {
  const query = `
    SELECT 
      u.id,
      u.full_name AS name,
      u.pincode,
      COALESCE(SUM(fc.points), 0) AS points,
      STRING_AGG(DISTINCT c.title, ', ') AS categories
    FROM users u
    LEFT JOIN farmer_categories fc ON u.id = fc.user_id
    LEFT JOIN categories c ON fc.category_id = c.id
    WHERE u.is_admin = FALSE
    GROUP BY u.id, u.full_name, u.pincode
    ORDER BY points DESC, u.full_name ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  initUserTable,
  createUser,
  getUserByPhone,
  getUserById,
  getFarmersLeaderboard,  // ← new function
};
