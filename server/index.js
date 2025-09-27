const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'API Endpoint Not Found' });
});

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI is not defined! Please check your .env file.");
  process.exit(1);
}

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(uri)
  .then(() => {
    console.log('MongoDB connected');

    // Use PORT from environment or fallback to 5000 for local dev
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
