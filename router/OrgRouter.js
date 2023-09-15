const express = require('express');
const router=express.Router()
const {getOrgs,createOrg, deleteOrg,updateOrg}=require('../controllers/OrgController')


router.get('/getorg',async(req,res)=>{
    await getOrgs(req,res)
})
router.post('/createorg',createOrg)
router.delete('/deleteorg/:id/:hrId?',deleteOrg)
router.put('/updateorg/:id',updateOrg)
module.exports=router