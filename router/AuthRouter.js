const express = require("express");
const {signup,login,verifyToken,getuser, refreshToken}=require('../controllers/AuthenticationController')
const router=express.Router()
//*  Router definition *//
router.post('/createUser',async(req,res)=>{
    await signup (req,res)
})
router.post('/login',async(req,res)=>{
    await login (req,res)
})
router.get('/getdata',verifyToken,getuser)
router.get('/refresh',refreshToken,verifyToken,getuser)
//* Export statements  *//
module.exports=router