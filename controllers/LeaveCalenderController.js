const mongoose = require("mongoose");
const calModel = require("../model/LeaveCalender");
const getCal = async (req, res) => {
  try {
    const getData = await calModel.find({});
    res.status(200).json({
      message: `data is fetched successfully from the server`,
      getData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createCal = async (req, res) => {
  try {
    const calData = new calModel({
      ...req
    });
    await calData
      .save()
      .then((data) => {
        res
          .status(200)
          .json({ message: `The calender data has been added successfully`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCal = async (req, res) => {
  const { id } = req.params;
 
  try {
    const user =await calModel.findById(id).exec();
    if (!user) {
      res.status(400).json({ message: `There is no user with id ${id}` });
    }
    await calModel
      .deleteOne({ _id: id })
      .then((data) => {
        res
          .status(200)
          .json({ message: `deleted the data with id ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateCal = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await calModel.findById(id).exec();
    if (!user) {
      res.status(400).json({ message: `There is no Data with id ${id}` });
    }
    await calModel
      .findByIdAndUpdate(id, { $set: req.body },{new:true})
      .then(async (data) => {
        res
          .status(200)
          .json({ message: `Data is updated having id ${id}`, data });
          await calModel.save()
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const getCalByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user =  await calModel.findById(id).exec();
    if (!user) {
      res.status(400).json({ message: `There is no Data with id ${id}` });
    }
    await calModel
      .findOne({ _id: id })
      .then((data) => {
      res.status(200).json({message:`The Data is found`,data})
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getCal,
  createCal,
  deleteCal,
  updateCal,
  getCalByID,
};
