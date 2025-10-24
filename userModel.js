// models/userModel.js
const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (userData, callback) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const sql = 'INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)';
    db.query(sql, [userData.name, userData.email, hashedPassword, userData.dob], callback);
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },
};

module.exports = User;
