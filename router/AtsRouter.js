const express=require('express')
const{getAts,createAts,deleteAts,getAtsId}=require('../controllers/AtsController')
const router=express.Router()
router.get('/',async(req,res)=>{
    await getAts(req,res)
})
router.post('/createAts',async(req,res)=>{
    await createAts(req.body,res)
})
router.delete('/:id',async(req,res)=>{
    await deleteAts(req,res)
})
router.get('/:id',async(req,res)=>{
    await getAtsId(req,res)
})
module.exports=router