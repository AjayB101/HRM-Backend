// models/quizModel.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  courseId:String,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
