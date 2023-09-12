const express = require("express");
const { signup, login, verifyToken, getuser,getusers, refreshToken, logout, updateAuth} = require('../controllers/AuthenticationController')
const router = express.Router()
//*  Router definition *//
router.post('/createUser', async (req, res) => {
    await signup(req, res)
})
router.post('/login', async (req, res) => {
    await login(req, res)
})
router.get('/getdata', getuser)
router.get('/getalldata', getusers)
router.get('/refresh', refreshToken, verifyToken, getuser)
router.post('/logout', verifyToken, logout)
router.put('/updateauth/:id', updateAuth)
//* Export statements  *//
module.exports = router