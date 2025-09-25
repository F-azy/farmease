// taskRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  submitTask,
  approveTask,
  getAllSubmissions,
} = require("../controllers/taskController");
const { getCategoryTasks } = require("../controllers/categoryController"); // Import from categoryController
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.get("/:categoryId/tasks", authenticate, getCategoryTasks);
router.post("/submit-task", authenticate, upload.single("file"), submitTask);
router.put("/approve/:submissionId", authenticate, approveTask);
router.get("/all", authenticate, getAllSubmissions);

module.exports = router;