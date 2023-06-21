const express=require('express')
const { getEmployee,createEmployee,deleteEmployee,updateEmployee,getEmployeeByID } = require('../controllers/EmployeeController')
const router=express.Router()
router.get('/getEmployee',async(req,res)=>{
    await getEmployee(req,res)
})
router.post('/createEmployee',async(req,res)=>{
    await createEmployee(req.body,res)
})
router.delete('/getEmployee/:id',async(req,res)=>{
await deleteEmployee(req,res)
})
router.put('/getEmployee/:id',async(req,res)=>{
    await updateEmployee(req,res)
})
router.get('/getEmployee/:id',async(req,res)=>{
    await getEmployeeByID(req,res)
})
module.exports=router