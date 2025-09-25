const pool = require("../conn");

// Get all applications
const getAllApplications = async () => {
  const query = `SELECT * FROM applications ORDER BY submitted_date DESC`;
  const { rows } = await pool.query(query);  // use pool.query
  return rows;
};

// Create a new application
const createApplication = async ({ app_name, purpose, key_features, benefits, download_link, support_contact }) => {
  const query = `
    INSERT INTO applications (app_name, purpose, key_features, benefits, download_link, support_contact, submitted_date)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *`;
  
  const values = [app_name, purpose, key_features, benefits, download_link, support_contact];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
// Submit application by user
const submitApplication = async (submission) => {
  const { application_id, user_name, email, phone, comments } = submission;
  const query = `
    INSERT INTO application_submissions (application_id, user_name, email, phone, comments, submitted_date)
    VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *`;
  const values = [application_id, user_name, email, phone, comments];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = { getAllApplications, createApplication, submitApplication };