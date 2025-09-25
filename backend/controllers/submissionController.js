const pool = require("../conn");

const getAllSubmissions = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.application_id, s.user_name, s.email, s.phone, s.comments, s.submitted_date,
              a.app_name
       FROM application_submissions s
       JOIN applications a ON s.application_id = a.id
       ORDER BY s.submitted_date DESC`
    );

    res.json({
      success: true,
      submissions: result.rows, // each row has id, application_id, user_name, email, phone, comments, submitted_date, app_name
    });
  } catch (err) {
    console.error("❌ Error fetching submissions:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
    });
  }
};

module.exports = { getAllSubmissions };
