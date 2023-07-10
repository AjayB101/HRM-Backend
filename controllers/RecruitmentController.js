const mongoose = require("mongoose");
const recModel = require("../model/RecruitmentModel");
const getRec = async (req, res) => {
  try {
    const getData = await recModel.find({});
    res.status(200).json({
      message: `data is fetched successfully from the server`,
      getData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createRec = async (req, res) => {
  try {
    /*Getting the last data from mongoDb based on decending order */
    const lastRecData=await recModel.findOne().sort({uuid:-1}).limit(1)
    console.log(`lastRecData ${lastRecData} `)
    const lastId=lastRecData?parseInt(lastRecData.uuid.split(';')[1]):0
    console.log(`lastId : ${lastId}`)
    const newId=(lastId+1).toString().padStart(4,0)
    console.log(`newId : ${newId}`)
    const recData = new recModel({
      ...req,uuid:'ID: '+newId
    });
    await recData
      .save()
      .then((data) => {
        res
          .status(200)
          .json({ message: `The rec data has been added successfully`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRec = async (req, res) => {
  const { id } = req.params;
  const user = recModel.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: `There is no user with id ${id}` });
  }
  try {
    await recModel
      .deleteOne({ _id: id })
      .then((data) => {
        res
          .status(200)
          .json({ message: `deleted the user with id ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateRec = async (req, res) => {
  const { id } = req.params;
  const user = recModel.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: `There is no user with id ${id}` });
  }
  try {
    await recModel
      .findByIdAndUpdate(id, { $set: req.body })
      .then((data) => {
        res
          .status(200)
          .json({ message: `User is updated having iid ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const getRecByID = async (req, res) => {
  const { id } = req.params;
  const user = recModel.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: `There is no user with id ${id}` });
  }
  try {
    await recModel
      .findOne({ _id: id })
      .then((data) => {
      res.status(200).json({message:`The user is found`,data})
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getRec,
  createRec,
  deleteRec,
  updateRec,
  getRecByID,
};
