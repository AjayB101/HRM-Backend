const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  employeeName: {
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
  numberOfDays: {
    type: Number,
    required: true
  },
  attachments: {
    data: Buffer,
    contentType: String
  },
  reason: {
    type: String,
    required: true
  },
  reportingto:{
    reporterid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'employee'
    },
    status:{
      type:Boolean,
      default:false
    }
  }
});

const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);

module.exports = LeaveRequest;
