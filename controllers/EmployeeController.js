const mongoose=require('mongoose')
const employeeModel=require('../model/Employee')
//to get employee from server
const getEmployee=async(req,res)=>{
   try {
    const getData=await employeeModel.find({})
    res.status(200).json({message:`data is fetched successfully from the server`,getData})
   } catch (error) {
    res.status(500).json({error})
   }
}
module.exports={
    getEmployee
}