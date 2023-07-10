const express = require('express');
const attendanceController = require('../controllers/AttendanceController');

const router = express.Router();

router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);


module.exports = router;