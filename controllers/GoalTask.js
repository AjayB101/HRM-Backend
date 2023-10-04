const mongoose = require("mongoose");
const goalTask = require("../model/GoalTask");
const getGoalTask = async (req, res) => {
  try {
    const getData = await goalTask.find({}).populate({path:'goalid',select:'GoalTyp'});
    res.status(200).json({
      message: `data is fetched successfully from the server`,
      getData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createGoalTask = async (req, res) => {
  try {
    const GoalTaskData = new goalTask({
      ...req
    });
    await GoalTaskData
      .save()
      .then((data) => {
        res
          .status(200)
          .json({ message: `The GoalTask data has been added successfully`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteGoalTask = async (req, res) => {
  const { id } = req.params;

  try {
    const user =await goalTask.findById(id).exec();
    if (!user) {
      res.status(400).json({ message: `There is no user with id ${id}` });
    }
    await goalTask
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
const updateGoalTask = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await goalTask.findById(id)
    if (!user) {
      return res.status(400).json({ message: `There is no Data with id ${id}` });
    }
    await goalTask
      .findByIdAndUpdate(id, { $set: req.body },{ new: true })
      .then((data) => {
        res
          .status(200)
          .json({ message: `Data is updated having id ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const getGoalTaskByID = async (req, res) => {
  const { id } = req.params;
  const user = await goalTask.findById(id).populate('goalid');
  if (!user) {
    res.status(400).json({ message: `There is no Data with id ${id}` });
  }
  try {
    await goalTask
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
  getGoalTask,
  createGoalTask,
  deleteGoalTask,
  updateGoalTask,
  getGoalTaskByID,
};
