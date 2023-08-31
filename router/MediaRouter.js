// mediaRouter.js

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
    if (!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images');
    }
    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }
    callback(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (req, file, callback) {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.mkv' && ext !== '.mp4') {
    return callback(new Error('Only .jpg, .jpeg, .png, .mkv, and .mp4 files are allowed'));
  }
  callback(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2 GB limit
});

const router = express.Router();

router.post(
  '/create',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'videos', maxCount: 10 },
  ]),
  mediaController.create
);

router.get('/getAll', mediaController.getAll);
router.get('/get/:id', mediaController.getById);
router.put('/update/:id', mediaController.updateById);
router.delete('/delete/:id', mediaController.deleteById);

module.exports = router;
