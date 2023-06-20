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
//to delete employee
const deleteEmployee=async(req,res)=>{
    const{id}=req.params
    const employee=employeeModel.findById(id).exec()
    if(!employee){
       return res.status(400).json({message:`user is not found`})
    }
    try {
        await employeeModel.deleteOne({_id:id}).then(data=>{
            res.status(200).json({message:`Employye is deleted having the id ${id}`,data})
        }).catch((err)=>res.status(400).json(err))
    } catch (error) {
        res.status(500).json(error)
    }
}
//to update employee details
const updateEmployee=async(req,res)=>{
    
    const employee=await employeeModel.findById(req.params.id).exec()
    if(!employee){
        return res.status(400).json({message:`user is not found`})
    }
    try {
       await  employeeModel.findByIdAndUpdate(req.params.id,{$set:req.body}).then(data=>{
        res.status(200).json({message:`Data is updated for the employee having th id ${req.params.id}`,data})
       }).catch((err)=>res.status(400).json(err))
    } catch (error) {
        res.status(500).json(error)
    }
}
//getEmployeeByID
const getEmployeeByID=async(req,res)=>{
    const employee=await employeeModel.findById(req.params.id).exec()
    if(!employee){
        return res.status(400).json({message:`user is not found`})
    }
    try {
        await employeeModel.findOne({_id:req.params.id}).exec().then(data=>{
            res.status(200).json({message:`employee is found having id ${req.params.id}`,data})
        }).catch((err)=>{
            res.status(err)
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports={
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeByID
}