const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    star: { 
        type: Number,
         required: true 
        },
    comment: { 
        type: String, 
        required: true 
      }
})

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;