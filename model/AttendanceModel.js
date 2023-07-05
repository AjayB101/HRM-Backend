const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: String,
  checkOutTime: String,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
