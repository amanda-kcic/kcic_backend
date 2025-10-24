const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://kcic-frontend.s3-website-us-east-1.amazonaws.com', // Replace with your S3 URL
  methods: ['GET','POST','PUT','DELETE'], // Optional: restrict allowed methods
  credentials: true // If you plan to send cookies (optional)
}));

app.use(express.json());

// Routes
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('✅ KCIC Journal Backend Connected to MySQL Workbench');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
