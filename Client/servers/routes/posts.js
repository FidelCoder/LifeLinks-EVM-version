const express = require('express');
const router = express.Router();
const multer = require('multer');

// Import the Post model
const Post = require('../models/Post');

// Set up multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to create a post
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { text, tags, location } = req.body;

        const newPost = new Post({
            text,
            image: req.file ? req.file.buffer : null,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            location
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        console.error("Error saving post:", err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

module.exports = router;
