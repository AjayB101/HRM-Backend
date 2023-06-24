const express=require('express')
const{getRec,createRec,deleteRec}=require('../controllers/RecruitmentController')
const router=express.Router()
router.get('/getRec',async(req,res)=>{
    await getRec(req,res)
})
router.post('/createRec',async(req,res)=>{
    await createRec(req.body,res)
})
router.delete('/getRec/:id',async(req,res)=>{
    await deleteRec(req,res)
})
module.exports=router
