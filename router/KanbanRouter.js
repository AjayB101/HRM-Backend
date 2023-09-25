const express = require('express');

const {



  getOnek,
  createk,
  getAllk,
  updatePositionk
} = require('../controllers/KanbanBoardController');


const router = express.Router();



// router.put('/sec/:sectionId', updateb);
router.get('/getb/:boardId', getOnek);
router.delete('/delboard/:boardId', deletek);


module.exports = router;