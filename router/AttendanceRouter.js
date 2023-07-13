// attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController');

router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);
router.post('/resetcheckout/:checkOutDate', attendanceController.resetCheckout); // New route for resetting checkout
router.get('/', attendanceController.getAttendance);

module.exports = router;