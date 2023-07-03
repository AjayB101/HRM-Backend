const express = require('express');
const multer = require('multer');
const {
  getAts,
  createAts,
  deleteAts,
  getAtsId
} = require('../controllers/AtsController');

const router = express.Router();

// Set up multer storage and file filter
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
    }
  }
});

// Define routes
router.get('/', getAts);
router.post('/', upload.single('resume'), createAts);
router.delete('/:id', deleteAts);
router.get('/:id', getAtsId);

module.exports = router;
