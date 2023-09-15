const express = require('express');
const {

  addGoal,
  getGoal,
  getGoals,
  deleteGoal
} = require('../controllers/GoalSetController');


const router = express.Router();


router.post('/addgoal/:employeeId', addGoal);
router.get('/getgoal/:employeeId', getGoal);
router.get('/getgoals', getGoals);
router.delete('/delgoal/:id', deleteGoal);


module.exports = router;