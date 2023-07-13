const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController');

router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);
router.get('/', attendanceController.getAttendance);


module.exports = router;