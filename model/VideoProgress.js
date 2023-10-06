const mongoose = require('mongoose');

const videoProgressSchema = new mongoose.Schema({
  userId: String, // You can associate progress with a user if needed
  videoUrl: String, // URL of the video
  progress: Number, // Progress percentage (0-100)
});

module.exports = mongoose.model('VideoProgress', videoProgressSchema);
