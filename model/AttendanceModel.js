const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: {
    type: String,
    required: true
  },
  checkOutTime: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
 

});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
