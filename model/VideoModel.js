const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  moduleId: String, // Added moduleId field
  moduleName: String,
  videoUrls: [String],
  courseName: String, // Saving courseName in the schema
});

module.exports = mongoose.model('Video', videoSchema);
