
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const kanbanboardSchema = new mongoose.Schema({

  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'GoalSetModel',    
  },
  lists: [listSchema],  
},

{ timestamps: true }
);

module.exports = mongoose.model('GoalTrack', kanbanboardSchema);
