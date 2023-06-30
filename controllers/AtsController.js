const mongoose = require("mongoose");
const atsModel=require('../model/Ats')
const getAts=async(req,res)=>{
    const data=await atsModel.find({})
}