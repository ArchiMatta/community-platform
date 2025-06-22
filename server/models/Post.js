const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  image: { type: String }, // Optional
  likes: { type: Number, default: 0 }, // Medium-style claps
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
