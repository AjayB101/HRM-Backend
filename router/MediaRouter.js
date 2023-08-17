const express = require('express');
const mediaController = require('../controllers/mediaController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }
    callback(null, 'public/videos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== '.mkv' && ext !== '.mp4') {
      return callback(new Error('Only .mkv and .mp4 files are allowed'));
    }

    callback(null, true);
  }
});

const router = express.Router();

router.get('/all', mediaController.getAll);

router.post('/create', upload.fields([
  {
    name: 'videos',
    maxCount: 5
  }
]), mediaController.create);

router.use('/create', async (req, res, next) => {
  try {
    if (req.files && req.files.videos) {
      for (const video of req.files.videos) {
        fs.unlinkSync(video.path); 
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
