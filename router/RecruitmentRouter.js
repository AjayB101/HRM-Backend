const express=require('express')
const{getRec,createRec,deleteRec,updateRec}=require('../controllers/RecruitmentController')
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
router.put('/getRec/:id',async(req,res)=>{
    await updateRec(req,res)
})
module.exports=router
