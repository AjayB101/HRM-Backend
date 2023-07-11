const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: {
    type: String,
  },
  checkOutTime: {
    type: String,
  },
  employeeName: {
    type: String,
  },
  employeeId: {
    type: String,
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
