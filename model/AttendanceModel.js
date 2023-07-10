const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: String,
  checkOutTime: String,
  employeeName: String,
  employeeId: String,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
