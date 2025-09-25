const pool = require("../conn");

async function initSubmissionTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      category_id INT REFERENCES categories(id),
      task_title VARCHAR(255),
      file_url TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      submitted_at TIMESTAMP DEFAULT now()
    );
  `;
  await pool.query(query);
  console.log("✅ Submissions table ready");
}

async function getUserSubmissions(userId) {
  const { rows } = await pool.query(
    `SELECT s.*, c.title as category_title
     FROM submissions s
     JOIN categories c ON s.category_id = c.id
     WHERE user_id = $1
     ORDER BY submitted_at DESC`,
    [userId]
  );
  return rows;
}

module.exports = { initSubmissionTable, getUserSubmissions };
