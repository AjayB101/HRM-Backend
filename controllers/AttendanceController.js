const Attendance = require('../model/AttendanceModel');

exports.createAttendance = async (req, res) => {
  try {
    const { checkInTime, checkOutTime } = req.body;
    const attendance = new Attendance({ checkInTime, checkOutTime });
    await attendance.save();
    res.status(200).send('Attendance record created successfully');
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).send('Error creating attendance record');
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error getting attendance records:', error);
    res.status(500).send('Error getting attendance records');
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInTime, checkOutTime } = req.body;
    await Attendance.findByIdAndUpdate(id, { checkInTime, checkOutTime });
    res.status(200).send('Attendance record updated successfully');
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).send('Error updating attendance record');
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await Attendance.findByIdAndRemove(id);
    res.status(200).send('Attendance record deleted successfully');
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).send('Error deleting attendance record');
  }
};
