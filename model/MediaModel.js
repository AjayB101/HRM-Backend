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
    videos: [{ url: { type: String, required: true }, duration: { type: Number, default: 0 } }],
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
