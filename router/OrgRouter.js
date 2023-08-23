const express = require('express');
const router=express.Router()
const {getOrgs,createOrg}=require('../controllers/OrgController')



router.get('/getorgs',getOrgs)
router.post('/createorg',createOrg)
module.exports=router