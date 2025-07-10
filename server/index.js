require('dotenv').config();
const express = require('express');
const { connect } = require('./database.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to connect to the database for each request
app.use(async (req, res, next) => {
    try {
        req.db = await connect();
        next();
    } catch (err) {
        console.error('Failed to connect to the database', err);
        res.status(500).send('Database connection error');
    }
});

// API endpoint to get all post metadata (for the grid)
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await req.db.all('SELECT id, title, slug, description, image, date FROM posts ORDER BY date DESC');
        res.json(posts);
    } catch (err) {
        console.error('Failed to fetch posts', err);
        res.status(500).send('Error fetching posts');
    }
});

// API endpoint to get a single post by its slug
app.get('/api/posts/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await req.db.get('SELECT * FROM posts WHERE slug = ?', slug);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(`Failed to fetch post: ${req.params.slug}` , err);
        res.status(500).send('Error fetching post');
    }
});

// Close the database connection when the request is finished
app.use((req, res, next) => {
    if (req.db) {
        req.db.close();
    }
    next();
});

app.listen(PORT, () => {
    console.log(`API Server is running and listening on http://localhost:${PORT}`);
});
