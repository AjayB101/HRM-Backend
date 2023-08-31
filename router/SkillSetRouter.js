const express = require('express');
const {
  addSkill,
  getSkill,
  getSkills
} = require('../controllers/SkillSetController');


const router = express.Router();


router.post('/addskill/:employeeId', addSkill);
router.get('/getskill/:employeeId', getSkill);
router.get('/getskills', getSkills);


module.exports = router;