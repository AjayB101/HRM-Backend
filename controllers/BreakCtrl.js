const attModel = require("../model/AttendanceMdl");
const breakModel = require("../model/BreakMdl");
const getAllData = async (req, res) => {
  try {
    await breakModel
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
    const attData = await breakModel.findById(id)
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
    const attData = new breakModel({
      ...req.body,
    });
    const savedData = await attData.save();
    const parData=await attModel.findByIdAndUpdate(
      req.body.attid,
      { $push: { break: savedData._id } },
      { new: true }
    );
    await parData.save()
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
    const attData = await breakModel.findById(id);
    if (!attData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else if (req.body.break) {
      await breakModel.findByIdAndUpdate(id, {
        $push: { break: req.body.break },
      });
      await attData.save();
    } else {
      await breakModel.findByIdAndUpdate(
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
        const breakData = await breakModel.findById(id);
        if (!breakData) {
            return res.status(400).json({ message: `No Data is Found Having Id ${id}` });
        }
        const attId = breakData.attid;
        console.log(await attModel.findById(attId))
        await attModel.findByIdAndUpdate(attId, { $pull: { break: id } });
        await breakModel.findByIdAndDelete(id);
        return res.status(200).json({ message: `Data with id ${id} has been deleted` });
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
