
const mongoose = require('mongoose');

const goalsetSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',    
  },
  GoalT: {
    type: String,
    required: true,
  },
  GoalP: {
    type: String,
    required: true,
  },
  GoalW: {
    type: String,
    required: true,
  },
  GoalD: {
    type: String,
    required: true,
  },

  
},

{ timestamps: true }
);

module.exports = mongoose.model('Goal', goalsetSchema);
