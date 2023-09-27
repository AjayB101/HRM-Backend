const eventModel = require("../model/EventMdl");

const getAllData = async (req, res) => {
  try {
    const eventDatas = await eventModel
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
    const eventData = await eventModel.findById(id);
    if (!eventData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else {
      return res
        .status(200)
        .json({ message: "The Data Has Been From The Server", eventData });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const createData = async (req, res) => {
  try {
    const eventData = new eventModel({
      ...req.body,
    });
    await eventData
      .save()
      .then((data) => {
        return res
          .status(200)
          .json({ message: "Data Has Been Stored To The Server", data });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const eventData = await eventModel.findById(id);
    if (!eventData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else {
      await eventModel
        .findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then((data) => {
          return res
            .status(200)
            .json({ message: `Data Has Been Updated `, data });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json(err);
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const eventData = await eventModel.findById(id);
    if (!eventData) {
      return res
        .status(400)
        .json({ message: `No Data Has Been Found With The Id ${id}` });
    } else {
      await eventModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Data Has Been Deleted From Server" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { getAllData, getDataById, createData, updateData,deleteData };
