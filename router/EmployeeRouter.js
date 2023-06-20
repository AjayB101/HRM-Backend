const express=require('express')
const { getEmployee,createEmployee } = require('../controllers/EmployeeController')
const router=express.Router()
router.get('/getEmployee',async(req,res)=>{
    await getEmployee(req,res)
})
router.post('/createEmployee',async(req,res)=>{
    await createEmployee(req.body,res)
})
module.exports=router