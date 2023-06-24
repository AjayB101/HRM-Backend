// LeaveRoutes.js

const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/LeaveController');

// Routes for leave requests
router.get('/', leaveRequestController.getAllLeaveRequests);
router.get('/:id', leaveRequestController.getLeaveRequestById);
router.post('/', leaveRequestController.createLeaveRequest);
router.put('/:id', leaveRequestController.updateLeaveRequest);

module.exports = router;
