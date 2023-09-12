// VideoModel.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  moduleId: String, // Added moduleId field
  moduleName: String,
  videoUrls: [String],
});

module.exports = mongoose.model('Video', videoSchema);
