// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const pool = require('./conn');
const { initUserTable } = require('./models/userModel');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date() }));
app.use('/api/auth', authRoutes);

// Dashboard and admin routes
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Category and task routes

const taskRoutes = require('./routes/taskRoutes');


app.use("/api/tasks", taskRoutes);

// Static files
app.use("/upload", express.static("public/upload"));

// User authentication
const { authenticate } = require('./middleware/authMiddleware');
app.get('/api/me', authenticate, (req, res) => res.json({ user: req.user }));

// Other routes
const submissionRoutes = require("./routes/submissionRoutes");
app.use("/api/submissions", submissionRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use("/api/applications", applicationRoutes);
app.use("/api/applications", require("./routes/userApplicationRoute"));

// Leaderboard
const { getLeaderboard } = require("./controllers/leaderboardController");
app.get("/api/farmers/leaderboard", authenticate, getLeaderboard);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await initUserTable();
    const { rows } = await pool.query('SELECT NOW()');
    console.log('📦 Postgres connected:', rows[0].now);
  } catch (err) {
    console.error('❌ DB error:', err);
  }
});