const attendanceMdl = require("../model/AttendanceMdl");
const employeeMdl = require("../model/Employee");
const getAllData = async (req, res) => {
  try {
    await attendanceMdl
      .find({})
      .then((data) => {
        return res
          .status(200)
          .json({ message: "Data Has Been Fetched From Server", data });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const attData = await attendanceMdl.findById(id);
    if (!attData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else {
      return res
        .status(200)
        .json({ message: "The Data Has Been From The Server", attData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const createData = async (req, res) => {
  try {
    const attData = new attendanceMdl({
      ...req.body,
    });
    const savedData = await attData.save();
    await employeeMdl.findByIdAndUpdate(
      req.body.employeeId,
      { $push: { clockid: savedData._id } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Data Has Been Stored To The Server", savedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const attData = await attendanceMdl.findById(id);
    if (!attData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else if (req.body.break) {
      await attendanceMdl.findByIdAndUpdate(id, {
        $push: { break: req.body.break },
      });
      await attData.save();
    } else {
      await attendanceMdl.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      await attData.save();
    }
    return res
      .status(200)
      .json({ message: `Data Has Been Updated`, data: attData });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const attData = await attendanceMdl.findById(id);
    if (!attData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else {
      const employeeId = attData.employeeId;
      await employeeMdl.findByIdAndUpdate(employeeId, {
        $pull: { clockid: id },
      });
      await attendanceMdl.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Data Has Been Deleted From Server" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
};
