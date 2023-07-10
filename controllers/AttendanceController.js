const Attendance = require('../model/AttendanceModel');

exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
