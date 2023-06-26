// routes/productRoutes.js
const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  signin,
} = require('../controllers/EmployeeController');
const employeeController=require('../controllers/EmployeeController')
const validateUser = require('../utils/vaildateUser');
const Employee = require('../model/Employee');

const router = express.Router();

router.get('/allemployee', getAllEmployees);
router.get('/getemployee/:id', getEmployeeById);
router.post('/addemployee', createEmployee);
router.put('/updateemployee/:id', updateEmployee);
router.delete('/deleteemployee/:id', deleteEmployee);
router.post('/signin', validateUser, employeeController.signin);

module.exports = router;
