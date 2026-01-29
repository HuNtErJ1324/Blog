const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { requireAuth } = require('../middleware/auth');
const config = require('../config/security.config');
const logger = require('../config/logging.config');

const router = express.Router();

const uploadDir = path.join(__dirname, '../public/uploads');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (config.upload.allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: config.upload.maxSize },
  fileFilter,
});

router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    logger.info(`Image uploaded: ${req.file.filename}`);
    res.json({ url: imageUrl });
  } catch (err) {
    logger.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;