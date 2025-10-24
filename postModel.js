// models/postModel.js
const db = require('../db');

const Post = {
  create: (postData, callback) => {
    const sql = 'INSERT INTO posts (title, subtitle, content, author) VALUES (?, ?, ?, ?)';
    db.query(sql, [postData.title, postData.subtitle, postData.content, postData.author], callback);
  },

  getAll: callback => {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    db.query(sql, callback);
  },
};

module.exports = Post;
