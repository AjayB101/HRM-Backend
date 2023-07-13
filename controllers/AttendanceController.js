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
    const attendance = await Attendance.find().sort({ _id: -1 });
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ error: true, message: 'Attendance not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInTime, checkInDate, checkOutTime, checkOutDate } = req.body;

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ error: true, message: 'Attendance not found' });
    }

    attendance.checkInTime = checkInTime;
    attendance.checkInDate = checkInDate;
    attendance.checkOutTime = checkOutTime;
    attendance.checkOutDate = checkOutDate;

    await attendance.save();

    res.status(200).json({ success: true, message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      return res.status(404).json({ error: true, message: 'Attendance not found' });
    }
    res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
