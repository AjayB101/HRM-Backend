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
//to create employee
const createEmployee=async(empData,res)=>{
   try {
    const EmployeeCreatedData=new employeeModel({
        ...empData
       })
   await EmployeeCreatedData.save().then(data=>{
      res.status(200).json({message:'Employee created successfully',data})
   }).catch((err)=>res.status(400).json(err))
   } catch (error) {
    res.status(500).json(error)
    console.log(error)
   }
}
module.exports={
    getEmployee,
    createEmployee
}