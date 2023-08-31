const express = require('express');
const {

  addComment,
  getComment,
  getComments
} = require('../controllers/FeedbackController');


const router = express.Router();


router.post('/addcomment/:employeeId', addComment);
router.get('/getcomment/:employeeId', getComment);
router.get('/getcomments', getComments);


module.exports = router;