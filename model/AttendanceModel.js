const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please Enter Date"],
  },
  clockInTime: {
    type:  String,
   
  },
  clockOutTime: {
    type: String,
  },
 
});

module.exports = mongoose.model('Attendance', attendanceSchema);
