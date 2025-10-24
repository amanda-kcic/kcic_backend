const express = require('express');
const router = express.Router();
const db = require('./db');

// Create post
router.post('/', (req, res) => {
    const { title, subtitle, content } = req.body;
    if (!title || !content) return res.status(400).json({ msg: 'Title and content required' });

    const query = 'INSERT INTO posts (title, subtitle, content) VALUES (?, ?, ?)';
    db.query(query, [title, subtitle, content], (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        res.json({ msg: 'Post created successfully', postId: result.insertId });
    });
});

// Get all posts
router.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ msg: err.message });
        res.json(results);
    });
});

module.exports = router;
