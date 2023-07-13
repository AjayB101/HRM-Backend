const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  checkInTime: {
    type: String,
    default: null,
  },
  checkInDate: {
    type: String,
    default: null,
  },
  checkOutTime: {
    type: String,
    default: null,
  },
  checkOutDate: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);