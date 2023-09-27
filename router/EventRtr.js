const express=require('express')
const router=express.Router()
const {getAllData,getDataById,createData,updateData,deleteData} =require('../controllers/EventCtrl')

router.get('/getall',async(req,res)=>{
    await getAllData(req,res)
})
router.get('/getbyid/:id',async(req,res)=>{
    await getDataById (req,res)
})
router.post('/create',async(req,res)=>{
    await createData(req,res)
})
router.put('/update/:id',async(req,res)=>{
    await updateData(req,res)
})
router.delete('/delete/:id',async(req,res)=>{
    await deleteData(req,res)
})
module.exports=router