const LeaveRequest = require('../model/LeaveModel');
const fs = require('fs');
const path = require('path');

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('reportingto.reporterid');
    return res.status(200).json({message:'Data Has Been Fetched from Server',leaveRequests})
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
};

const getLeaveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findById(id).populate('reportingto.reporterid');
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createLeaveRequest = async (req, res) => {
  const { employeeId, employeeName, leaveType, startDate, endDate, numberOfDays, reason,reportingto } = req.body;
  const attachments = req.file; // Access the uploaded file using req.file

  try {
    const newLeaveRequest = new LeaveRequest({
      employeeId,
      employeeName,
      leaveType,
      startDate,
      endDate,
      numberOfDays,
      attachments: {
        data: fs.readFileSync(attachments.path), // Read file data as Buffer
        contentType: attachments.mimetype
      },
      reason,
      reportingto:{
        reporterid:reportingto
      }
    });

    await newLeaveRequest.save();

    fs.unlinkSync(attachments.path);

    res.status(201).json({ message: 'Leave request has been created', newLeaveRequest });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      id,
      {  $set:{'repotingto.status':req.body.reportingto.status} },
      { new: true }
    );
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json({ message: 'Leave request has been updated', leaveRequest });
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
};

module.exports = {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  updateLeaveRequest
};
 