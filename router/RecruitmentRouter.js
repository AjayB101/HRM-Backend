const express=require('express')
const{getRec,createRec}=require('../controllers/RecruitmentController')
const router=express.Router()
router.get('/getRec',async(req,res)=>{
    await getRec(req,res)
})
router.post('/createRec',async(req,res)=>{
    await createRec(req.body,res)
})
module.exports=router
