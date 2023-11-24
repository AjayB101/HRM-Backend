
const {createData,getDataById,getData,deleteData}=require('../controllers/Procruitment')
const express=require('express')
const upload = require('../middleware/multer')
const router=express.Router()


router.get('/getall',async(req,res)=>{
    await getData(req,res)
})
router.get('getbyid/:id',async(req,res)=>{
    await getDataById(req,res)
})
router.post('/createdata',upload.single('attachments'),async(req,res)=>{
    await createData(req,res)
})
router.delete('/deletedata/:id',async(req,res)=>{
    await deleteData(req,res)
})
module.exports=router