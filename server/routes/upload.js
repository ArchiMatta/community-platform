const express = require('express');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

router.post('/', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
