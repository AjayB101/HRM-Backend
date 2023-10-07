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
    type: mongoose.Schema.Types.ObjectId,
    ref:'Goal',
    required:true
  },
  status: {
    type: Number,
    default: 0
  },
  position: {
    type: Number,
  },
});

module.exports = mongoose.model('goaltask', GoalTask);