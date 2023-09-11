const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  moduleName: String,
  videoUrls: [String],
});

module.exports = mongoose.model('Video', videoSchema);
