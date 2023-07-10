const Attendance = require('../model/AttendanceModel');

exports.createAttendance = async (req, res) => {
  try {
    const { checkInTime, checkOutTime } = req.body;
    const attendance = new Attendance({ checkInTime, checkOutTime });
    await attendance.save();
    res.status(200).json({ message: 'Attendance created successfully' });
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
