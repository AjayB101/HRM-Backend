const mongoose = require("mongoose");
const recModel = require("../model/RecruitmentModel");
const getRec = async (req, res) => {
  try {
    const getData = recModel.find({});
    res.status(200).json({
      message: `data is fetched successfully from the server`,
      getData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

