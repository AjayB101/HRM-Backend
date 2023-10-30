//mediaModel.js

const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
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
      type: String,
      required: true,
    },
    videos: [{ type: String, required: true }],
    quiz:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Quiz'
    }],
    notes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Note'
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', MediaSchema);
