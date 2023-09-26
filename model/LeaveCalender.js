const mongoose = require('mongoose');

const LeaveCalender = new mongoose.Schema({
  start: {
    type: Date,
    required:true
    
  },
    end: {
    type: Date,
    required:true
    
  },
  title: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model('LeaveCalender', LeaveCalender);