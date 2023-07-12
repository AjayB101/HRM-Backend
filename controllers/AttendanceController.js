const Attendance = require('../model/AttendanceModel');

exports.checkIn = async (req, res) => {
  try {
    const { checkInTime, checkInDate } = req.body;
    const attendance = new Attendance({ checkInTime, checkInDate });
    await attendance.save();
    res.status(200).json({ message: 'Check-in recorded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { checkOutTime } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { checkOutTime: null },
      { checkOutTime },
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ message: 'No active check-in found.' });
    }
    res.status(200).json({ message: 'Check-out recorded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOne();
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
