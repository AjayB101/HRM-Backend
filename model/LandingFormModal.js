const mongoose=require("mongoose");

const LandingForm=new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    phoneno :{
        type:String,
        required:true
    },
    MarkasRead :{
        type:Boolean,
        default:false
    }

})
module.exports=mongoose.model("LandingForm",LandingForm)