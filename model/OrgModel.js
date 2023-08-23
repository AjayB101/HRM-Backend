 const mongoose = require('mongoose')
const orgSchema = new mongoose.Schema({
    hrName:[ 
      { 
         name:{
            type:String
           },
           id:{
            type:String
           }
        }   
    ],
    managerName:{
        type:String 
    }
}) 
module.exports = mongoose.model('organisation',orgSchema)
