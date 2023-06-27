const express=require('express')
const router=express.Router()
const authController=require('../controllers/AuthController')
const { post } = require('./EmployeeRouter')

router.route('/')
    .post()

router.route('/refresh')
    .get()

router.route('/logout')
    .post()

module.exports=router