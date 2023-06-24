const express=require('express')
const{getRec}=require('../controllers/RecruitmentController')
const router=express.Router()
router.get('/getRec',async(req,res)=>{
    await getRec(req,res)
})
module.exports=router
