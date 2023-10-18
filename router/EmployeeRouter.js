// routes/productRoutes.js
const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadProfile,
} = require('../controllers/EmployeeController');
const employeeController=require('../controllers/EmployeeController')
const validateUser = require('../utils/vaildateUser');
const Employee = require('../model/Employee');
const upload=require('../middleware/multer')
const router = express.Router();

router.get('/allemployee', getAllEmployees);
router.get('/getemployee/:id', getEmployeeById);
router.post('/addemployee', createEmployee);
router.put('/updateemployee/:id', updateEmployee);
router.post('/profilepic',upload.single('profile'), uploadProfile);
router.delete('/deleteemployee/:id', deleteEmployee);
router.post('/signin', validateUser, employeeController.signin);

module.exports = router;
