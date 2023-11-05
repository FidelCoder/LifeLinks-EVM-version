const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // We'll add an optional userId for future integration
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    text: String,
    image: Buffer,
    tags: [String],
    location: String
});

module.exports = mongoose.model('Post', postSchema);
