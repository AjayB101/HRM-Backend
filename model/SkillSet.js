// models/SkillSet.js
const mongoose = require('mongoose');

const skillsetSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
   skillset: {
    type: String,
    required: true,
  },
  current: {
    type: String,
    required: true,
  },
  requi: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('SkillSet', skillsetSchema);
