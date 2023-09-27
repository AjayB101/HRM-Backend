const express=require('express')
const router=express.Router()
const {getAllData,getDataById,createData} =require('../controllers/EventCtrl')

router.get('/getall',async(req,res)=>{
    await getAllData(req,res)
})
router.get('/getbyid/:id',async(req,res)=>{
    await getDataById (req,res)
})
router.post('/create',async(req,res)=>{
    await createData(req,res)
})
module.exports=router