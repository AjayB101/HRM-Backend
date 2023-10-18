// controllers/quizController.js
const Quiz = require('../model/quizModel');
const mediaModel=require('../model/MediaModel');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
   const savedata= await quiz.save();
    const mediaupdate = await mediaModel.findByIdAndUpdate(
      req.body.courseId,
      {$push:{quiz:savedata._id }},
      {new:true}
    )
    await mediaupdate.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  try {
    const deleteid =await Quiz.findById(req.params.id);
    await  mediaModel.findByIdAndUpdate(deleteid.courseId,{$pull:{quiz:req.params.id}})
    await Quiz.findByIdAndRemove(req.params.id);
    res.status(201).json({message: 'Quiz deleted successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
