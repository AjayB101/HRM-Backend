const express = require('express');
const router=express.Router()
const {getOrgs,createOrg, deleteOrg}=require('../controllers/OrgController')



router.get('/getorgs',getOrgs)
router.post('/createorg',createOrg)
router.delete('/deleteorg/:id',deleteOrg)
module.exports=router