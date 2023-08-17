//learn model

const mongoose = require('mongoose');

const LearningSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    image: {
      path: String, // Store the file path
      contentType: String,
    },
    video: {
      path: String, // Store the file path
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningSystem', LearningSchema);
