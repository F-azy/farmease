import pool from "../conn.js";
import path from "path";

// Submit a task (Farmer)
export const submitTask = async (req, res) => {
  const { category_id, task_title } = req.body;
  const user_id = req.user?.id; // Get user ID from JWT auth

  if (!user_id)
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID" });

  if (!category_id)
    return res
      .status(400)
      .json({ success: false, message: "Category ID is required" });

  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "File is required" });

  const file_url = `/upload/${req.file.filename}`;
  const file_type = req.file.mimetype.startsWith("video") ? "video" : "image";

  try {
    // Insert submission
    await pool.query(
      `INSERT INTO submissions (user_id, category_id, task_title, file_url, file_type)
       VALUES ($1, $2, $3, $4, $5)`,
      [user_id, parseInt(category_id), task_title, file_url, file_type]
    );

    // Optionally update last_activity in farmer_categories
    await pool.query(
      `UPDATE farmer_categories SET last_activity = now() WHERE user_id = $1 AND category_id = $2`,
      [user_id, parseInt(category_id)]
    );

    res.json({ success: true, message: "Task submitted successfully", file_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Submission failed" });
  }
};

// Admin approves a task
export const approveTask = async (req, res) => {
  const { submissionId } = req.params;

  try {
    const { rows } = await pool.query(`SELECT * FROM submissions WHERE id = $1`, [
      submissionId,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Submission not found" });

    const submission = rows[0];

    // Update submission status
    await pool.query(`UPDATE submissions SET status='approved' WHERE id=$1`, [
      submissionId,
    ]);

    // Update points in farmer_categories
    await pool.query(
      `UPDATE farmer_categories
       SET completed_tasks = completed_tasks + 1,
           points = points + $1,
           status = 'completed'
       WHERE user_id=$2 AND category_id=$3`,
      [submission.points || 10, submission.user_id, submission.category_id]
    );

    res.json({ success: true, message: "Task approved and points updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Approval failed" });
  }
};

export const getAllSubmissions = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT s.*, u.full_name, u.phone, c.title as category_name
       FROM submissions s
       JOIN users u ON s.user_id = u.id
       JOIN categories c ON s.category_id = c.id
       ORDER BY s.submitted_at DESC`
    );

    res.json({ success: true, submissions: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch submissions" });
  }
};
