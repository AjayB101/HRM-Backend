// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/create', quizController.createQuiz);
router.get('/getall', quizController.getAllQuizzes);
router.put('/update/:id', quizController.updateQuiz);
router.delete('/delete/:id', quizController.deleteQuiz);

module.exports = router;
