// server/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // MySQL connection
const router = express.Router();
require('dotenv').config();

// Signup route
// Signup route
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
  
    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password and insert the user
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });
  
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
          if (err) return res.status(500).json({ message: 'Error registering user' });
          res.status(201).json({ message: 'User registered successfully' });
        });
      });
    });
  });
  
  
// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user });
    });
  });
});

module.exports = router;
