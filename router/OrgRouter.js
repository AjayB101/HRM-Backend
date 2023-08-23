const express = require('express');
const router=express.Router()
const {getOrgs,createOrg, deleteOrg,updateOrg}=require('../controllers/OrgController')



router.get('/getorgs',getOrgs)
router.post('/createorg',createOrg)
router.delete('/deleteorg/:id',deleteOrg)
router.put('/updateorg/:id',updateOrg)
module.exports=router