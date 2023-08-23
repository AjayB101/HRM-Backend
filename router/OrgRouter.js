const express = require('express');
const router=express.Router()
const {getOrgs}=require('../controllers/OrgController')



router.get('/getorgs',getOrgs)
module.exports=router