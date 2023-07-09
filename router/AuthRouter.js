const express = require("express");
const {signup,login,verifyToken}=require('../controllers/AuthenticationController')
const router=express.Router()
//*  Router definition *//
router.post('/createUser',async(req,res)=>{
    await signup (req,res)
})
router.post('/login',async(req,res)=>{
    await login (req,res)
})
router.get('/getdata',verifyToken)
//* Export statements  *//
module.exports=router