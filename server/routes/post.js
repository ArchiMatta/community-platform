const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');
const { likePost } = require('../controllers/postController');


router.post('/', createPost);     // Create post
router.get('/', getAllPosts);     // Get feed
router.post('/:id/like', likePost); // POST /api/posts/:id/like

module.exports = router;
