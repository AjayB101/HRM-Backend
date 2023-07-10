const express = require('express');
const attendanceController = require('../controllers/AttendanceController');

const router = express.Router();

router.post('/', attendanceController.createAttendance);
router.get('/', attendanceController.getAttendance);
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
