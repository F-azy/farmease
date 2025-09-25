const pool = require("../conn");

// 🔹 Initialize categories
async function initCategoryTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      icon VARCHAR(10)
    );
  `;
  await pool.query(query);

  // Seed fixed categories if not exists
  const fixedCategories = [
    { title: "Crop Farming", description: "Learn modern crop cultivation techniques", icon: "🌾" },
    { title: "Poultry Farming", description: "Master poultry management and care", icon: "🐔" },
    { title: "Pisciculture", description: "Explore fish farming opportunities", icon: "🐟" }
  ];

  for (let cat of fixedCategories) {
    await pool.query(
      `INSERT INTO categories (title, description, icon)
       VALUES ($1, $2, $3)
       ON CONFLICT (title) DO NOTHING;`,
      [cat.title, cat.description, cat.icon]
    );
  }

  console.log("✅ Categories table ready with 3 fixed entries");
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id ASC");
  return rows;
}

module.exports = { initCategoryTable, getAllCategories };
