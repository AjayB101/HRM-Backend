// routes/productRoutes.js
const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  signin,
} = require('../controllers/EmployeeController');
const employeeController=require('../controllers/EmployeeController')
const validateUser = require('../utils/vaildateUser');
const Employee = require('../model/Employee');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/signin', validateUser, employeeController.signin);

module.exports = router;
