const Attendance = require('../model/AttendanceModel');

exports.checkIn = async (req, res) => {
  try {
    const currentTime = new Date().toLocaleTimeString();
    const attendance = new Attendance({ checkInTime: currentTime });
    await attendance.save();
    res.status(200).send('Checked in successfully');
  } catch (error) {
    console.error('Error saving check-in time:', error);
    res.status(500).send('Error saving check-in time');
  }
};
exports.checkOut = async (req, res) => {
  try {
    const currentTime = new Date().toLocaleTimeString();
    await Attendance.findOneAndUpdate(
      { checkOutTime: { $exists: false } },
      { checkOutTime: currentTime }
    );
    res.status(200).send('Checked out successfully');
  } catch (error) {
    console.error('Error updating check-out time:', error);
    res.status(500).send('Error updating check-out time');
  }
};