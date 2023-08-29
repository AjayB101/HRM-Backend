const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  addComment,

} = require('../controllers/FeedbackController');

const employeeController=require('../controllers/FeedbackController')
const validateUser = require('../utils/vaildateUser');
const Employee = require('../model/Feedback');

const router = express.Router();

router.get('/allemployee', getAllEmployees);
router.get('/getemployee/:id', getEmployeeById);
router.post('/addcomment', addComment);

module.exports = router;