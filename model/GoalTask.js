const mongoose = require('mongoose');

const GoalTask = new mongoose.Schema({
  title: {
    type: String,
    required:true
    
  },
  description: {
    type: String,
    required:true
    
  },
  goalid: {
    type: String,
    required:true
  },
  status: {
    type: String,
    default:'ICEBOX'
  },
});

module.exports = mongoose.model('goaltask', GoalTask);