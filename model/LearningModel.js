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
      data: Buffer,
      contentType: String,
    },
    video: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningSystem', LearningSchema);
