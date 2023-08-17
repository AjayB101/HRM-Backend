//learningRoute

const express = require('express');
const multer = require('multer');
const {
  createLearningEntry,
  getLearningEntries,
  getLearningEntryById,
  updateLearningEntry,
  deleteLearningEntry,
} = require('../controllers/LearningController');

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and MP4 files are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// CRUD routes
router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createLearningEntry);
router.get('/entries', getLearningEntries);
router.get('/entries/:id', getLearningEntryById);
router.put('/entries/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), updateLearningEntry);
router.delete('/entries/:id', deleteLearningEntry);

module.exports = router;
