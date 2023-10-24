// routes/productRoutes.js
const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadProfile,
  coverPicUpload
} = require('../controllers/EmployeeController');
const employeeController=require('../controllers/EmployeeController')
const validateUser = require('../utils/vaildateUser');
const Employee = require('../model/Employee');
const upload=require('../middleware/multer');
const { verifyToken } = require('../controllers/AuthenticationController');
const router = express.Router();

router.get('/allemployee',verifyToken, getAllEmployees);
router.get('/getemployee/:id',verifyToken, getEmployeeById);
router.post('/addemployee',verifyToken, createEmployee);
router.put('/updateemployee/:id',verifyToken, updateEmployee);
router.put('/profilepic/:id',upload.single('profile'),verifyToken, uploadProfile);
router.put('/coverpic/:id',upload.single('cover'),verifyToken, coverPicUpload);
router.delete('/deleteemployee/:id', verifyToken,deleteEmployee);
router.post('/signin', validateUser, employeeController.signin);

module.exports = router;
