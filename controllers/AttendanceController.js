// attendanceController.js
const Attendance = require('../model/AttendanceModel');

exports.checkIn = async (req, res) => {
  try {
    const { checkInTime, checkInDate } = req.body;
    const attendance = new Attendance({ checkInTime, checkInDate });
    await attendance.save();
    res.status(200).json({ success: true, message: 'Check-in recorded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { checkOutTime, checkOutDate } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { checkOutTime: null },
      { checkOutTime, checkOutDate },
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'No active check-in found.' });
    }
    res.status(200).json({ success: true, message: 'Check-out recorded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOne().sort({ _id: -1 });
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
