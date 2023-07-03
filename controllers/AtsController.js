const mongoose = require("mongoose");
const atsModel=require('../model/Ats')
const getAts = async (req, res) => {
    try {
      const getData = await atsModel.find({});
      res.status(200).json({
        message: `data is fetched successfully from the server`,
        getData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const createAts = async (req, res) => {
    try {
      const recData = new atsModel({
        ...req
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
  }
  const deleteAts=async(req,res)=>{
    const {id} =req.params
    const user=atsModel.findById(id).exec()
    if(!user){
        res.status(400).json({message:`User not found `})
    }
    try {
        await atsModel.deleteOne({ _id: id }).then(data=>{
            res.status(200).json({message:`deleted the user with id ${id}`,data})
        }).catch(err=>res.status(400).json(err))
    } catch (error) {
        res.status(500).json(error)
    }
  }
  const getAtsId=async(req,res)=>{
    const {id} =req.params
    const user=atsModel.findById(id).exec()
    if(!user){
        res.status(400).json({message:`User not found `})
    }
    try {
     await atsModel.findById({_id:id}).then(data=>{
        res.status(200).json({message:`The user is found`,data})
       }).catch(err=>res.status(500).json(err))
    } catch (error) {
       res.status(500).json(error) 
    }
  }
module.exports={
    getAts,
    createAts,
    deleteAts,
    getAtsId
}