const mongoose = require("mongoose");
const recruitmentSchema = new mongoose.Schema(
  {
    Jobrole: {
      type: String,
      required: true,
    },
    Openings: {
      type: Number,
      required: true,
    },
    Company: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
    Description:{
     type:String,
     required:true
    },
    Requirements:{
     type:String,
     required:true
    },
    Experience: {
      type: String,
      required: true,
    },
    Deadline: {
      type: String,
      required: true,
    },
    Worktype: {
      type: String,
      required: true,
    },
    
    Skills: {
      type: String,
      required: true,
    },
    Education: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports=mongoose.model("recruitments",recruitmentSchema)
