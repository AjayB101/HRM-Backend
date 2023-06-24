const mongoose = require("mongoose");
const recruitmentSchema = new mongoose.Schema(
  {
    jobrole: {
      type: String,
      required: true,
    },
    opeanings: {
      type: Number,
      required: true,
    },
    worktype: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location:{
     type:String,
     required:true
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports=mongoose.model("recruitment",recruitmentSchema)
