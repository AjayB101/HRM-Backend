// LeaveModel.js

const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
  employeeId:{
    type: String,
    required: true
  },
  employeeName:{
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  document: {
    data: Buffer,
    contentType: String
  }
});

const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);

module.exports = LeaveRequest;
