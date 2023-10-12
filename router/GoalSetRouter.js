const express = require('express');
const {

  addGoal,
  aggregateData,

  getGoals,
  deleteGoal
} = require('../controllers/GoalSetController');


const router = express.Router();


router.post('/addgoal/:employeeId', addGoal);
router.get('/getgoal/:employeeId', aggregateData);
router.get('/getgoals', getGoals);
router.delete('/delgoal/:id', deleteGoal);


module.exports = router;