// routes/productRoutes.js
const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadProfile,
  coverPicUpload,
  deleteProfile,
  getEmployeduserdata
} = require('../controllers/EmployeeController');
const employeeController=require('../controllers/EmployeeController')
const validateUser = require('../utils/vaildateUser');
const Employee = require('../model/Employee');
const upload=require('../middleware/multer');
const router = express.Router();

router.get('/allemployee', getAllEmployees);
router.get('/getemployee/:id', getEmployeeById);
router.get('/allemployeduser', getEmployeduserdata);
router.post('/addemployee', createEmployee);
router.put('/updateemployee/:id', updateEmployee);
router.put('/profilepic/:id',upload.single('profile'), uploadProfile);
router.put('/coverpic/:id',upload.single('cover'), coverPicUpload);
router.delete('/deleteemployee/:id', deleteEmployee);
router.post('/signin', validateUser, employeeController.signin);
router.delete('/deleteprofile/:id', deleteProfile);

module.exports = router;
