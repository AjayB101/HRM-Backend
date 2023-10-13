const mongoose = require('mongoose')
const breakSchema=new mongoose.Schema({
          breakin: {
            type: Date,
          },
          breakout:{
            type:Date
          },
          attid:{
            type:String
          }
},{timestamps:true})
module.exports=mongoose.model('break',breakSchema)