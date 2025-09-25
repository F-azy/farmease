// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signup, login, adminLogin } = require('../controllers/authController');

/**
 * POST /api/auth/signup
 */
router.post(
  '/signup',
  [
    body('fullName').trim().notEmpty().withMessage('Full name required'),
    body('phone').trim().notEmpty().isMobilePhone('any').withMessage('Valid phone required'),
    body('pincode').trim().notEmpty().isLength({ min: 4, max: 10 }).withMessage('Valid pincode required'),
    body('password').isLength({ min: 6 }).withMessage('Password minimum 6 characters'),
  ],
  signup
);

/**
 * POST /api/auth/login
 */
router.post(
  '/login',
  [
    body('phone').trim().notEmpty().withMessage('Phone required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  login
);

/**
 * POST /api/auth/admin-login
 */
router.post(
  '/admin-login',
  [
    body('username').trim().notEmpty().withMessage('Username required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  adminLogin
);

module.exports = router;
