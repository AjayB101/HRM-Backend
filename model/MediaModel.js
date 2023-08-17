const mongoose=require('mongoose');

const MediaSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  videos:[{type:String, required:true}]
},
{
  timestamps:true
}
);

module.exports=mongoose.model('Media',MediaSchema);
