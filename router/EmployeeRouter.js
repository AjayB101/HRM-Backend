const express=require('express')
const { getEmployee } = require('../controllers/EmployeeController')
const router=express.Router()
router.get('/getEmployee',async(req,res)=>{
    await getEmployee(req,res)
})
module.exports=router