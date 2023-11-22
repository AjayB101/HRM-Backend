const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  userId: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
