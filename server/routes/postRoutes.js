// // server/routes/postRoutes.js
// const express = require('express');
// const { verifyToken, verifyPostAuthor } = require('../middlewares/authMiddleware'); // Authentication middleware
// const db = require('../db');
// const router = express.Router();

// // Create a new post
// router.post('/', verifyToken, (req, res) => {
//   const { title, body, image_url } = req.body;
//   const userId = req.user.id;

//   db.query('INSERT INTO posts (title, body, image_url, userId) VALUES (?, ?, ?, ?)', [title, body, image_url, userId], (err) => {
//     if (err) return res.status(500).json({ message: 'Error creating post' });
//     res.status(201).json({ message: 'Post created successfully' });
//   });
// });

// // Get all posts
// router.get('/', (req, res) => {
//   db.query('SELECT * FROM posts', (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error fetching posts' });
//     res.status(200).json(results);
//   });
// });

// // Get a specific post by ID
// router.get('/:id', (req, res) => {
//   const postId = req.params.id;

//   db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error fetching post' });
//     if (results.length === 0) return res.status(404).json({ message: 'Post not found' });
//     res.status(200).json(results[0]);
//   });
// });

// // Delete a post (only the author can delete)
// router.delete('/:id', verifyToken, verifyPostAuthor, (req, res) => {
//   const postId = req.params.id;

//   db.query('DELETE FROM posts WHERE id = ?', [postId], (err) => {
//     if (err) return res.status(500).json({ message: 'Error deleting post' });
//     res.status(204).send(); // No content
//   });
// });

// module.exports = router;
// server/routes/postRoutes.js
const express = require('express');
const multer = require('multer'); // To handle image uploads
const path = require('path'); // To manage file paths
const { verifyToken,verifyPostAuthor } = require('../middlewares/authMiddleware'); // Authentication middleware
const db = require('../db');
const router = express.Router();

// Set up multer to handle file storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with a timestamp
  },
});

const upload = multer({ storage });

// Create a new post with image upload
router.post('/', verifyToken, upload.single('image'), (req, res) => {
  const { title, body } = req.body;
  console.log('Request Body:', req.body); // Log request body for debugging
  console.log('Uploaded File:', req.file); // Log uploaded file for debugging

  const userId = req.user.id; // Ensure user ID is set correctly
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save image URL if available

  db.query('INSERT INTO posts (title, body, image_url, user_id) VALUES (?, ?, ?, ?)', 
    [title, body, imageUrl, userId], (err) => {
      if (err) {
        console.error('Error creating post:', err); // Log error details
        return res.status(500).json({ message: 'Error creating post', error: err.message });
      }
      res.status(201).json({ message: 'Post created successfully' });
    }
  );
});
// Get all posts
router.get('/', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching posts' });
    res.status(200).json(results);
  });
});

// Get a specific post by ID
router.get('/:id', (req, res) => {
  const postId = req.params.id;

  db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching post' });
    if (results.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(results[0]);
  });
});

// Delete a post
router.delete('/:id', verifyToken, verifyPostAuthor, (req, res) => {
  const postId = req.params.id;

  db.query('DELETE FROM posts WHERE id = ?', [postId], (err) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ message: 'Error deleting post' });
    }
    res.status(204).send(); // No content
  });
});

module.exports = router;
