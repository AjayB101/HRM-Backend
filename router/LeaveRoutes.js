const express = require('express');
const router = express.Router();
const multer = require('multer'); // Require multer here

const { getAllLeaveRequests, getLeaveRequestById, createLeaveRequest, updateLeaveRequest } = require('../controllers/LeaveController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload'); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPEG, and PNG files are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes for leave requests
router.get('/', getAllLeaveRequests);
router.get('/:id', getLeaveRequestById);
router.post('/', upload.single('attachments'), createLeaveRequest); // Use single() for a single file upload
router.put('/:id', updateLeaveRequest);

module.exports = router;
