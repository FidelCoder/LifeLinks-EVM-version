const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');  // Import the Post model
const PostList = require('../models/PostList');  // Import the PostList model

// GET route to fetch all posts with their interactions
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().lean(); 
        const interactionsList = await PostList.find().lean();

        const postsWithInteractions = posts.map(post => {
            const interactions = interactionsList.find(interaction => interaction.postId.toString() === post._id.toString());
            return {
                ...post,
                interactions: interactions || {}  // If no interactions exist for a post
            };
        });

        res.json(postsWithInteractions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// POST route to like a post
router.post('/:postId/like', async (req, res) => {
    try {
        const userId = req.body.userId;
        const interactions = await PostList.findOne({ postId: req.params.postId });

        if (!interactions) {
            return res.status(404).json({ error: 'Interactions not found for the post' });
        }

        if (interactions.likes.includes(userId)) {
            interactions.likes.pull(userId);
        } else {
            interactions.likes.push(userId);
        }

        await interactions.save();
        res.json(interactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to like post' });
    }
});

// POST route to add a comment to a post
router.post('/:postId/comment', async (req, res) => {
    try {
        const userId = req.body.userId;
        const text = req.body.text;

        const interactions = await PostList.findOne({ postId: req.params.postId });

        if (!interactions) {
            return res.status(404).json({ error: 'Interactions not found for the post' });
        }

        interactions.comments.push({ userId, text });
        await interactions.save();

        res.json(interactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// POST route to share a post
router.post('/:postId/share', async (req, res) => {
    try {
        const platform = req.body.platform;
        const interactions = await PostList.findOne({ postId: req.params.postId });

        if (!interactions) {
            return res.status(404).json({ error: 'Interactions not found for the post' });
        }

        interactions.shares.push({ platform });
        await interactions.save();

        res.json(interactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to share post' });
    }
});

// POST route to repost a post
router.post('/:postId/repost', async (req, res) => {
    try {
        const userId = req.body.userId;
        const interactions = await PostList.findOne({ postId: req.params.postId });

        if (!interactions) {
            return res.status(404).json({ error: 'Interactions not found for the post' });
        }

        if (!interactions.reposts.includes(userId)) {
            interactions.reposts.push(userId);
            await interactions.save();
        }

        res.json(interactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to repost post' });
    }
});

module.exports = router;
