const express = require('express');
const multer = require('multer');
const { getAts, createAts, deleteAts, getAtsId } = require('../controllers/AtsController');

const router = express.Router();

// Set up multer storage and file filtering
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.get('/', getAts);
router.post('/createAts', upload.single('resume'), createAts);
router.delete('/:id', deleteAts);
router.get('/:id', getAtsId);

module.exports = router;
