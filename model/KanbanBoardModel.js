const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const boardSchema = new Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GoalSetModel',
  },
  icon: {
    type: String,
    default: '📃'
  },

  description: {
    type: String,
    default: `Add description here
    🟢 You can add multiline description
    🟢 Let's start...`
  },
  position: {
    type: Number
  },
  section: { 
    type: [String],
  }

}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema)