// backend/models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: {
    type: String,
    default: null,
  },
  checkOutTime: {
    type:String,
    default: null,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
