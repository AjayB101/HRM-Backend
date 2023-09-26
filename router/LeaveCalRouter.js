const express=require('express')
const{getCal,createCal,deleteCal,updateCal,getCalByID}=require('../controllers/LeaveCalenderController')
const router=express.Router()
router.get('/getCal',async(req,res)=>{
    await getCal(req,res)
})
router.post('/createCal',async(req,res)=>{
    await createCal(req.body,res)
})
router.delete('/removeCal/:id',async(req,res)=>{
    await deleteCal(req,res)
})
router.put('/updateCal/:id',async(req,res)=>{
    await updateCal(req,res)
})
router.get('/getCal/:id',async(req,res)=>{
    await getCalByID(req,res)
})
module.exports=router
