const express = require("express");
const {signup}=require('../controllers/AuthenticationController')
const router=express.Router()
//Router definition
router.post('/createUser',async(req,res)=>{
    await signup (req,res)
})



//Export statements
module.exports=router