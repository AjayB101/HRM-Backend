const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date, required: true },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
