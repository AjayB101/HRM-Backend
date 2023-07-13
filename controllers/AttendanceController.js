// attendanceController.js

const Attendance = require('../model/AttendanceModel');

exports.checkIn = async (req, res) => {
  try {
    const { checkInTime, checkInDate } = req.body;
    const existingAttendance = await Attendance.findOne({ checkInDate });
    if (existingAttendance) {
      return res.status(400).json({ error: true, message: 'You have already checked in today.', isCheckInDone: true });
    }

    const attendance = new Attendance({ checkInTime, checkInDate });
    await attendance.save();
    res.status(200).json({ success: true, message: 'Check-in recorded successfully.', isCheckInDone: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { checkOutTime, checkOutDate } = req.body;
    const existingAttendance = await Attendance.findOne({ checkInDate: checkOutDate });
    if (!existingAttendance || existingAttendance.checkOutTime) {
      return res.status(400).json({ error: true, message: 'You have not checked in today.', isCheckInDone: false });
    }

    existingAttendance.checkOutTime = checkOutTime;
    await existingAttendance.save();

    res.status(200).json({ success: true, message: 'Check-out recorded successfully.', isCheckInDone: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOne().sort({ _id: -1 });
    const isCheckInDone = attendance && attendance.checkInDate === new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
    res.status(200).json({ attendance, isCheckInDone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
