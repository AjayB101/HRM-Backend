// routes/productRoutes.js
const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/EmployeeController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
