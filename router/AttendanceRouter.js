const express = require('express');
const attendanceController = require('../controllers/AttendanceController');

const router = express.Router();

router.post('/create', attendanceController.createAttendance);

module.exports = router;
