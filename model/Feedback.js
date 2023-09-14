// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  comment: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  
},

{ timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
