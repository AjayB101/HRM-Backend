const express=require('express')
const{getAts,createAts,deleteAts,getAtsId}=require('../controllers/AtsController')
const router=express.Router()
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{//declaring the folder path
        callback(null,"./upload")
    },
    filename:(req,file,callback)=>{//giving folder name
        callback(null,file.originalname)
    }
})
const upload=multer({storage:storage})
router.get('/',async(req,res)=>{
    await getAts(req,res)
})
router.post('/createAts',upload.fields([{name:'resume',maxCount:1}]),async(req,res)=>{
    
    await createAts(req.body,res)
})
router.delete('/:id',async(req,res)=>{
    await deleteAts(req,res)
})
router.get('/:id',async(req,res)=>{
    await getAtsId(req,res)
})
module.exports=router