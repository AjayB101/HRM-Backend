const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    comment: { 
        type: String, 
        required: true 
      },
    star: { 
        type: Number,
         required: true 
        }

})

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;