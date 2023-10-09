const mongoose = require('mongoose');

const attendanceModel = new mongoose.Schema({
  checkInTime: {
    type: Date,
    
  },
  checkOutTime: {
    type: Date,
    
  },
  date: {
    type: Date,
   required:true,
  },
  employeeId:{
    type:String,
    required:true
  },
  authId:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Attendance2.0', attendanceModel);