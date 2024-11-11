// // server/middlewares/authMiddleware.js
// const jwt = require("jsonwebtoken");
// const connection = require("../db");

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

//   if (!token) return res.status(403).json({ message: "No token provided" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Failed to authenticate token" });
//     req.user = { id: decoded.id }; // Attach user ID to request object
//     next();
//   });
// };

// // Middleware to check if user is the author of the post
// const verifyPostAuthor = (req, res, next) => {
//   const postId = req.params.id;
//   const userId = req.user.id;

//   connection.query('SELECT userId FROM posts WHERE id = ?', [postId], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     if (results.length === 0) return res.status(404).json({ message: 'Post not found' });

//     const post = results[0];
//     if (post.userId !== userId) return res.status(403).json({ message: 'You are not authorized to delete this post' });

//     next();
//   });
// };

// module.exports = { verifyToken, verifyPostAuthor };
// server/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../db'); // Ensure the path to your database module is correct

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = { id: decoded.id }; // Store user ID from token in request
    next(); // Proceed to the next middleware
  });
};

// Middleware to check if user is the author of the post
const verifyPostAuthor = (req, res, next) => {
  const postId = req.params.id; // Get post ID from request parameters
  const userId = req.user.id; // Get user ID from request (set by verifyToken)

  db.query('SELECT user_id FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error while verifying post ownership' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author of the post
    const post = results[0];
    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized: You are not the author of this post' });
    }

    next(); // Proceed to the next middleware if authorized
  });
};

module.exports = { verifyToken, verifyPostAuthor };
