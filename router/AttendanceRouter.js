// backend/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController');

router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);

module.exports = router;
