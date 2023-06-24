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
const createRec=async(req,res)=>{
  try {
    const recData=new recModel({
      ...req
    })
    await recData.save().then(data=>{
      res.status(200).json({message:`The rec data has been added successfully`,data})
    }).catch((err)=>res.status(400).json(err))
  } catch (error) {
    res.status(500).json(error)
  }
}
module.exports={
  getRec,
  createRec
}
