const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./db');


// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password, dob } = req.body;
    if (!name || !email || !password || !dob) return res.status(400).json({ msg: 'All fields required' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, dob], (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        res.json({ msg: 'User registered successfully' });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'All fields required' });

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ msg: err.message });
        if (results.length === 0) return res.status(400).json({ msg: 'User not found' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Invalid password' });

        res.json({ msg: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
});

module.exports = router;
