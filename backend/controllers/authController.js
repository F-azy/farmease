// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { createUser, getUserByPhone } = require('../models/userModel');

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

async function signup(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fullName, phone, pincode, password } = req.body;

    // check existing
    const existing = await getUserByPhone(phone);
    if (existing) return res.status(409).json({ message: 'Phone number already registered' });

    const password_hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await createUser({
      full_name: fullName,
      phone,
      pincode,
      password_hash,
      is_admin: false,
    });

    // create JWT
    const token = jwt.sign({ userId: user.id, phone: user.phone, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: 'User registered',
      user: { id: user.id, full_name: user.full_name, phone: user.phone, pincode: user.pincode },
      token,
    });
  } catch (err) {
    console.error('signup error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { phone, password } = req.body;
    const user = await getUserByPhone(phone);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, phone: user.phone, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({
      message: 'Login successful',
      user: { id: user.id, full_name: user.full_name, phone: user.phone, pincode: user.pincode },
      token,
    });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// -------------------- NEW --------------------
// Admin login
async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;

    // find admin user by phone (acting as username)
    const user = await getUserByPhone(username);
    if (!user || !user.is_admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid admin credentials' });

    // Optionally: generate JWT token for admin
    const token = jwt.sign({ userId: user.id, phone: user.phone, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({
      success: true,
      message: 'Admin login successful',
      admin: { id: user.id, full_name: user.full_name, phone: user.phone },
      token,
    });
  } catch (err) {
    console.error('adminLogin error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { signup, login, adminLogin };
