const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the post route
const postRoutes = require('./routes/posts');

// Import the PostList route
const postListRoutes = require('./routes/postslist');  // Adjust the path accordingly

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://ScrachyLinks:J6W7muccX5nTa3dM@cluster0.ncbteqe.mongodb.net/';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Use the imported post route
app.use('/post', postRoutes);

// Use the imported PostList route
app.use('/postlist', postListRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
