const Attendance = require('../model/AttendanceModel');

exports.checkIn = async (req, res) => {
  try {
    const { checkInTime, employeeName, employeeId } = req.body;
    const attendance = new Attendance({
      checkInTime,
      employeeName,
      employeeId
    });
    await attendance.save();
    res.status(200).send('Checked in successfully');
  } catch (error) {
    console.error('Error saving check-in time:', error);
    res.status(500).send('Error saving check-in time');
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { checkOutTime, employeeName, employeeId } = req.body;
    await Attendance.findOneAndUpdate(
      { employeeName, employeeId, checkOutTime: { $exists: false } },
      { checkOutTime }
    );
    res.status(200).send('Checked out successfully');
  } catch (error) {
    console.error('Error updating check-out time:', error);
    res.status(500).send('Error updating check-out time');
  }
};
