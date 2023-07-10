const express = require('express');
const router = express.Router();

const attendanceController = require('../controllers/AttendanceController');

router.get('/', attendanceController.getAllAttendance);
router.post('/create', attendanceController.createAttendance);

module.exports = router;
