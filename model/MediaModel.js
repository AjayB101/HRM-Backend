//mediamodel.js

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
      type: Buffer,
      required: true,
    },
    videos: [{ type: Buffer, required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', MediaSchema);
