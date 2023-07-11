const express = require("express");
const { signup, login, verifyToken, getuser, refreshToken, logout, } = require('../controllers/AuthenticationController')
const router = express.Router()
//*  Router definition *//
router.post('/createUser', async (req, res) => {
    await signup(req, res)
})
router.post('/login', async (req, res) => {
    await login(req, res)
})
router.get('/getdata', verifyToken, getuser)
router.get('/refresh', refreshToken, verifyToken, getuser)
router.post('/logout', verifyToken, logout)
//* Export statements  *//
module.exports = router