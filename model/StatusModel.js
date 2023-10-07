const mongoose = require('mongoose');

const GoalStatus = new mongoose.Schema({

  status: {
    type: String,
    default:'ICEBOX'
  },
});

module.exports = mongoose.model('goalstatus', GoalStatus);