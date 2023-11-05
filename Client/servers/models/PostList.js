const mongoose = require('mongoose');
const Post = require('./Post'); // Import the Post model

const postListSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // assuming the likes will reference users who liked the post
    }],
    comments: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        date: { type: Date, default: Date.now }
    }],
    shares: [{
        platform: String, // e.g. 'Facebook', 'Twitter', etc.
        date: { type: Date, default: Date.now }
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // assuming the reposts will reference users who reposted the post
    }]
});

module.exports = mongoose.model('PostList', postListSchema);
